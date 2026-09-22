require('dotenv').config();
const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const User = require('../models/User');
const Registration = require('../models/Registration');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing collections
    await Competition.deleteMany({});
    await User.deleteMany({});
    await Registration.deleteMany({});

    // Create Test Users
    const userA = await User.create({
      name: 'Ananya Sharma',
      email: 'ananya@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=32',
      referralCode: 'ANANYA99'
    });

    const userB = await User.create({
      name: 'Rohan Mehta',
      email: 'rohan@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      referralCode: 'ROHAN100'
    });

    // Date math relative to execution time
    const now = new Date();
    const registrationStart = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const registrationEnd = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);   // 5 days left
    const submissionStart = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);   // Starts tomorrow
    const submissionEnd = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);  // 10 days left
    const resultDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);     // 14 days left

    // Create Seed Competition
    const competition = await Competition.create({
      title: 'Feedants Classical Dance',
      category: 'Dance',
      tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
      entryFee: 99,
      prizePool: 1500,
      totalCapacity: 20,
      bookedSpots: 1, // 1 spot taken by default -> 19 spots remaining
      judge: {
        name: 'Manju Dubey',
        title: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      registrationStartDate: registrationStart,
      registrationEndDate: registrationEnd,
      submissionStartDate: submissionStart,
      submissionEndDate: submissionEnd,
      resultDate: resultDate,
      description: 'Showcase your Kathak, Bharatanatyam, or classical dance form performance to win exciting cash rewards and certificates.',
      judgingParameters: [
        { parameter: 'Technique & Rhythm (Taal)', weightage: 40 },
        { parameter: 'Expressions (Abhinaya)', weightage: 30 },
        { parameter: 'Costume & Presentation', weightage: 30 }
      ],
      rulesAndEligibility: [
        'Video length must be between 60 to 180 seconds.',
        'Solo performances only.',
        'Unedited continuous shot video is required.'
      ],
      rewards: [
        { rankTitle: '1st Winner', amount: 800 },
        { rankTitle: '2nd Winner', amount: 400 },
        { rankTitle: '3rd Winner', amount: 300 }
      ],
      isActive: true
    });

    // Seed 1 existing registration for User A
    await Registration.create({
      competitionId: competition._id,
      userId: userA._id,
      status: 'CONFIRMED',
      paymentStatus: 'COMPLETED'
    });

    console.log(`
=== SEED COMPLETE ===
Competition ID: ${competition._id}
User A (Registered): ${userA._id}
User B (Unregistered): ${userB._id}
Remaining Spots: ${competition.totalCapacity - competition.bookedSpots}
=====================
    `);

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();