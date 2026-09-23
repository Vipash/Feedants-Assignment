if (!globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto;
}

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');

// Base API URL
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api/v1/competitions';

async function runConcurrencyTest() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedants_db';

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected to:', mongoUri);
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    process.exit(1);
  }

  console.log('--- STARTING CONCURRENCY STRESS TEST ---');

  // Fetch latest created competition dynamically
  const comp = await Competition.findOne().sort({ createdAt: -1 });

  if (!comp) {
    console.error('❌ Seed competition not found in database. Run "npm run seed" first.');
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`Targeting Competition: "${comp.title}" (ID: ${comp._id})`);

  const initialBooked = comp.bookedSpots;
  const remaining = comp.totalCapacity - initialBooked;
  console.log(`Current spots remaining: ${remaining} (Total: ${comp.totalCapacity}, Booked: ${initialBooked})`);

  // Create 30 temporary test users in bulk for speed
  const userDocs = [];
  for (let i = 1; i <= 30; i++) {
    userDocs.push({
      name: `Stress Tester ${i}`,
      email: `stress_tester_${Date.now()}_${i}_${Math.random().toString(36).substring(7)}@test.com`,
      referralCode: `STRESS${i}_${Math.floor(Math.random() * 10000)}`
    });
  }

  const testUsers = await User.insertMany(userDocs);
  console.log(`Created ${testUsers.length} simulated concurrent users.`);

  console.log(`Firing ${testUsers.length} simultaneous registration requests...`);

  // Fire requests simultaneously using fetch
  const results = await Promise.all(
    testUsers.map(async (user) => {
      try {
        const res = await fetch(`${BASE_URL}/${comp._id}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user._id.toString()
          },
          body: JSON.stringify({ competitionId: comp._id.toString() })
        });

        const body = await res.json().catch(() => ({}));

        return {
          status: res.status,
          body,
          userId: user._id
        };
      } catch (error) {
        return {
          status: 500,
          error: error.message,
          userId: user._id
        };
      }
    })
  );

  const successful = results.filter((r) => r.status === 201 || r.status === 200);
  const conflicts = results.filter((r) => r.status === 409 || r.status === 400);
  const otherErrors = results.filter((r) => r.status !== 201 && r.status !== 200 && r.status !== 409 && r.status !== 400);

  console.log('\n--- TEST RESULTS ---');
  console.log(`Successful Registrations (HTTP 201/200): ${successful.length}`);
  console.log(`Rejected (HTTP 409/400 - Capacity Full / Duplicate): ${conflicts.length}`);
  console.log(`Other Unexpected Errors: ${otherErrors.length}`);

  if (otherErrors.length > 0) {
    console.log('Sample unexpected response:', otherErrors[0]);
  }

  // Fetch updated competition state and total registration records from DB
  const freshComp = await Competition.findById(comp._id);
  const actualRegistrations = await Registration.countDocuments({ competitionId: comp._id });

  console.log(`\nDatabase Final Verification:`);
  console.log(`Final bookedSpots in DB: ${freshComp.bookedSpots}/${freshComp.totalCapacity}`);
  console.log(`Actual Registration documents in DB: ${actualRegistrations}`);

  const testUserIds = testUsers.map((u) => u._id);

  // Validate atomic locking integrity
  if (freshComp.bookedSpots <= freshComp.totalCapacity && freshComp.bookedSpots === actualRegistrations) {
    console.log('✅ PASSED: No overselling occurred! Atomic locking works as designed.');
  } else {
    console.error('❌ FAILED: Overselling or state drift detected!');
    // Cleanup before exiting on failure so test data isn't left in DB
    await Registration.deleteMany({ userId: { $in: testUserIds } });
    await User.deleteMany({ _id: { $in: testUserIds } });
    await Competition.findByIdAndUpdate(comp._id, { bookedSpots: initialBooked });
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log('\nCleaning up stress test data...');
  await Registration.deleteMany({ userId: { $in: testUserIds } });
  await User.deleteMany({ _id: { $in: testUserIds } });
  
  // Restore initial bookedSpots count
  await Competition.findByIdAndUpdate(comp._id, { bookedSpots: initialBooked });
  console.log('Cleanup complete.');

  await mongoose.disconnect();
  process.exit(0);
}

runConcurrencyTest().catch(async (err) => {
  console.error('Unhandled script error:', err);
  await mongoose.disconnect();
  process.exit(1);
});