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
    title: 'Feedants Classical Dance',
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
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      mediaUrl: 'https://example.com/judge_intro.mp4'
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
        name: 'Riya Shah',
        rank: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
      },
      {
        name: 'Aarav Mehta',
        rank: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'
      },
      {
        name: 'Neha Verma',
        rank: '2nd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200'
      },
      {
        name: 'Ishita Chouhan',
        rank: '3rd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200'
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

  console.log('\n=== RE-SEEDED WITH 6 REWARDS & PREVIOUS WINNERS ===');
  console.log(`Competition ID: ${competition._id}`);
  console.log(`User A (Registered): ${userA._id}`);
  console.log(`User B (Unregistered): ${userB._id}`);
  console.log('==================================================\n');

  process.exit(0);
}

seed();