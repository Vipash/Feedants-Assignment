if (!globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto;
}

require('dotenv').config();
const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const User = require('../models/User');
const Registration = require('../models/Registration');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB for seeding...');

  await Registration.deleteMany({});
  await Competition.deleteMany({});
  await User.deleteMany({});

  const userA = await User.create({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    referralCode: 'ANANYA10',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  });

  const userB = await User.create({
    name: 'Rohit Mehta',
    email: 'rohit@example.com',
    referralCode: 'ROHIT10',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  });

  const now = new Date();
  const competition = await Competition.create({
    title: 'Feedants - Classical Dance Event',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    entryFee: 99,
    prizePool: 1500,
    totalCapacity: 20,
    bookedSpots: 1, // Only 19 spots left
    judge: {
      name: 'Manju Dubey',
      title: 'Professional Kathak Dancer',
      experience: '12+ Years of Experience',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300', // Authentic formal portrait
      mediaUrl: 'https://www.youtube.com/watch?v=5CvwgC-WQlo'
    },
    registrationStartDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    registrationEndDate: new Date(now.getTime() + 1.25 * 24 * 60 * 60 * 1000), // ~1d 6h
    submissionStartDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    submissionEndDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
    resultDate: new Date(now.getTime() + 22 * 24 * 60 * 60 * 1000),
    description: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    judgingParameters: [
      { parameter: 'Rhythm & Timing (Taal)', weightage: 30 },
      { parameter: 'Expressions & Abhinaya (Bhava)', weightage: 30 },
      { parameter: 'Footwork & Grace (Angika)', weightage: 25 },
      { parameter: 'Costume & Presentation', weightage: 15 }
    ],
    rulesAndEligibility: [
      'Open to all age categories and experience levels.',
      'Video submission must be between 2 to 5 minutes.',
      'Only raw uncut performance videos will be accepted.',
      'Video must clearly show full-body movements and expressions.'
    ],
    rewards: [
      { rankTitle: '1st Winner', amount: 550 },
      { rankTitle: '2nd Winner', amount: 300 },
      { rankTitle: '3rd Winner', amount: 240 },
      { rankTitle: '4th Winner', amount: 200 },
      { rankTitle: '5th Winner', amount: 130 },
      { rankTitle: '6th Winner', amount: 80 }
    ],
    previousWinners: [
      {
        name: 'Riya Parashar',
        rank: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1707198134558-202f99242d15?w=300'
      },
      {
        name: 'Vinod Kumar',
        rank: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300'
      },
      {
        name: 'Neha Choudhary',
        rank: '2nd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300'
      },
      {
        name: 'Ishita Dhariwal',
        rank: '3rd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
      }
    ]
  });

  // User A already registered
  await Registration.create({
    competitionId: competition._id,
    userId: userA._id,
    paymentStatus: 'COMPLETED',
    status: 'CONFIRMED'
  });

  console.log('\n=== RE-SEEDED WITH UPDATED AUTHENTIC IMAGE URLS ===');
  console.log(`Competition ID: ${competition._id}`);
  console.log(`User A (Registered): ${userA._id}`);
  console.log(`User B (Unregistered): ${userB._id}`);
  console.log('==================================================\n');

  process.exit(0);
}

seed();