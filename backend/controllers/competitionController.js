// backend/controllers/competitionController.js
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const User = require('../models/User');

// Helper to compute lifecycle state
const computeLifecycleStatus = (competition) => {
  const now = new Date();
  if (now < competition.registrationStartDate) return 'UPCOMING';
  if (now <= competition.registrationEndDate) return 'REGISTRATION_OPEN';
  if (now <= competition.submissionEndDate) return 'SUBMISSION_OPEN';
  if (now <= competition.resultDate) return 'EVALUATION';
  return 'COMPLETED';
};

// 1. GET Competition Details with dynamic user state
exports.getCompetitionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'];

    const competition = await Competition.findById(id).lean();
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    const lifecycleStatus = computeLifecycleStatus(competition);
    const remainingSpots = Math.max(0, competition.totalCapacity - competition.bookedSpots);

    // Resolve user-specific participation state if userId provided
    let userState = {
      isRegistered: false,
      hasSubmitted: false,
      registrationId: null,
      submission: null,
      status: 'UNREGISTERED'
    };

    if (userId) {
      const registration = await Registration.findOne({
        competitionId: id,
        userId: userId
      }).lean();

      if (registration) {
        const hasSubmitted = registration.submission?.status === 'SUBMITTED';
        userState = {
          isRegistered: true,
          hasSubmitted,
          registrationId: registration._id,
          submission: registration.submission || null,
          status: hasSubmitted ? 'SUBMITTED' : 'REGISTERED'
        };
      }
    }

    // Dynamic CTA (Call-to-Action) resolution for the frontend action bar
    let actionState = {
      label: 'Register Now',
      action: 'REGISTER',
      enabled: true
    };

    if (userState.isRegistered) {
      if (lifecycleStatus === 'REGISTRATION_OPEN' || lifecycleStatus === 'SUBMISSION_OPEN') {
        if (userState.hasSubmitted) {
          actionState = { label: 'Submission Uploaded', action: 'VIEW_SUBMISSION', enabled: true };
        } else {
          actionState = { label: 'Upload Submission', action: 'SUBMIT', enabled: true };
        }
      } else if (lifecycleStatus === 'EVALUATION') {
        actionState = { label: 'Under Evaluation', action: 'NONE', enabled: false };
      } else if (lifecycleStatus === 'COMPLETED') {
        actionState = { label: 'View Results', action: 'VIEW_RESULTS', enabled: true };
      }
    } else {
      if (remainingSpots <= 0) {
        actionState = { label: 'Competition Full', action: 'NONE', enabled: false };
      } else if (lifecycleStatus !== 'REGISTRATION_OPEN') {
        actionState = { label: 'Registration Closed', action: 'NONE', enabled: false };
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...competition,
        remainingSpots,
        lifecycleStatus,
        userState,
        actionState,
        serverTime: new Date()
      }
    });
  } catch (error) {
    console.error('Error in getCompetitionDetails:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching competition' });
  }
};

// 2. ATOMIC REGISTRATION (High concurrency safe)
exports.registerForCompetition = async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ success: false, message: 'x-user-id header is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fast-fail check for existing registration
    const existing = await Registration.findOne({ competitionId: id, userId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User is already registered for this competition' });
    }

    const now = new Date();

    // ATOMIC LOCK & INCREMENT
    // Prevents race condition: Only increments if bookedSpots < totalCapacity
    const competition = await Competition.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        registrationStartDate: { $lte: now },
        registrationEndDate: { $gte: now },
        $expr: { $lt: ['$bookedSpots', '$totalCapacity'] }
      },
      { $inc: { bookedSpots: 1 } },
      { new: true }
    );

    if (!competition) {
      const checkComp = await Competition.findById(id);
      if (!checkComp) return res.status(404).json({ success: false, message: 'Competition not found' });
      if (now > checkComp.registrationEndDate) {
        return res.status(400).json({ success: false, message: 'Registration has closed' });
      }
      return res.status(409).json({ success: false, message: 'Competition is fully booked' });
    }

    // Create Registration Record
    try {
      const registration = await Registration.create({
        competitionId: id,
        userId,
        status: 'CONFIRMED',
        paymentStatus: 'COMPLETED'
      });

      return res.status(201).json({
        success: true,
        message: 'Successfully registered!',
        data: {
          registration,
          remainingSpots: competition.totalCapacity - competition.bookedSpots,
          bookedSpots: competition.bookedSpots
        }
      });
    } catch (err) {
      // Rollback the increment if registration insertion failed (e.g., unique key collision)
      await Competition.findByIdAndUpdate(id, { $inc: { bookedSpots: -1 } });
      if (err.code === 11000) {
        return res.status(409).json({ success: false, message: 'User is already registered' });
      }
      throw err;
    }
  } catch (error) {
    console.error('Error in registerForCompetition:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// 3. SUBMISSION HANDLING
exports.submitEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['x-user-id'];
  const { mediaUrl } = req.body;

  if (!userId) return res.status(401).json({ success: false, message: 'User ID required' });
  if (!mediaUrl) return res.status(400).json({ success: false, message: 'Media URL is required' });

  try {
    const registration = await Registration.findOne({ competitionId: id, userId });
    if (!registration) {
      return res.status(403).json({ success: false, message: 'You must register before submitting' });
    }

    registration.submission = {
      mediaUrl,
      submittedAt: new Date(),
      status: 'SUBMITTED'
    };
    await registration.save();

    return res.status(200).json({
      success: true,
      message: 'Submission uploaded successfully',
      data: registration
    });
  } catch (error) {
    console.error('Error in submitEntry:', error);
    return res.status(500).json({ success: false, message: 'Error submitting entry' });
  }
};

// 4. USERS LIST (Convenience endpoint for UI User-Switcher)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email referralCode avatarUrl');
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving users' });
  }
};

// 5. CREATE A NEW GUEST UNREGISTERED USER ON THE FLY
exports.createGuestUser = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const guestNumber = userCount + 1;
    const user = await User.create({
      name: `Guest User ${guestNumber}`,
      email: `guest_${Date.now()}_${guestNumber}@feedants.com`,
      referralCode: `GUEST${guestNumber}_${Math.floor(100 + Math.random() * 900)}`
    });

    return res.status(201).json({ success: true, message: 'New user created', data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create guest user' });
  }
};

// 6. RESET DEMO STATE (Instantly resets spots to 1/20 and Rohit Mehta to unregistered)
exports.resetDemo = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Find the primary seeded competition
    const comp = await Competition.findById(id);
    if (!comp) return res.status(404).json({ success: false, message: 'Competition not found' });

    // 2. Find Ananya Sharma (User A)
    const userA = await User.findOne({ email: 'ananya@example.com' });
    
    // 3. Remove all registrations for this competition EXCEPT User A
    if (userA) {
      await Registration.deleteMany({ competitionId: id, userId: { $ne: userA._id } });
      // Reset User A's submission back to pending
      await Registration.findOneAndUpdate(
        { competitionId: id, userId: userA._id },
        { 'submission.status': 'NOT_SUBMITTED', 'submission.mediaUrl': null }
      );
      // Reset booked spots to 1
      comp.bookedSpots = 1;
      await comp.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Demo state reset successfully: 1/20 spots booked, User B unregistered'
    });
  } catch (error) {
    console.error('Error resetting demo:', error);
    return res.status(500).json({ success: false, message: 'Failed to reset demo state' });
  }
};