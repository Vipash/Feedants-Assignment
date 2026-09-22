const registerForCompetition = async (req, res) => {
  const { competitionId } = req.params;
  const userId = req.headers['x-user-id']; // Or req.user.id

  if (!userId) {
    return res.status(401).json({ success: false, message: 'User ID is required' });
  }

  // 1. Check if user is already registered (fast-fail)
  const existingRegistration = await Registration.findOne({ competitionId, userId });
  if (existingRegistration) {
    return res.status(409).json({ success: false, message: 'You are already registered for this competition' });
  }

  const now = new Date();

  // 2. ATOMIC STEP: Increment bookedSpots ONLY IF under totalCapacity and within registration dates
  const updatedCompetition = await Competition.findOneAndUpdate(
    {
      _id: competitionId,
      isActive: true,
      registrationStartDate: { $lte: now },
      registrationEndDate: { $gte: now },
      $expr: { $lt: ['$bookedSpots', '$totalCapacity'] } // Guarantees capacity safety
    },
    {
      $inc: { bookedSpots: 1 }
    },
    {
      new: true
    }
  );

  if (!updatedCompetition) {
    // Check reason for failure to provide accurate response code
    const comp = await Competition.findById(competitionId);
    if (!comp) return res.status(404).json({ success: false, message: 'Competition not found' });
    if (now > comp.registrationEndDate) {
      return res.status(400).json({ success: false, message: 'Registration window has closed' });
    }
    return res.status(409).json({ success: false, message: 'Competition is fully booked' });
  }

  // 3. Create registration record
  try {
    const registration = await Registration.create({
      competitionId,
      userId,
      paymentStatus: 'COMPLETED',
      status: 'CONFIRMED'
    });

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      data: {
        registration,
        remainingSpots: updatedCompetition.totalCapacity - updatedCompetition.bookedSpots
      }
    });
  } catch (error) {
    // If registration creation fails (e.g., unique index violation), rollback the spot decrement
    await Competition.findByIdAndUpdate(competitionId, { $inc: { bookedSpots: -1 } });
    
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Registration already exists' });
    }
    return res.status(500).json({ success: false, message: 'Registration processing failed' });
  }
};