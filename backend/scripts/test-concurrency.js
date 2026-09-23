if (!globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto;
}

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');

const BASE_URL = 'http://localhost:5000/api/v1/competitions';

async function runConcurrencyTest() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('--- STARTING CONCURRENCY STRESS TEST ---');

  const comp = await Competition.findOne().sort({ createdAt: -1 });
  if (!comp) {
    console.error('Seed competition not found. Run "npm run seed" first.');
    process.exit(1);
  }

  console.log(`Targeting Competition: "${comp.title}" (ID: ${comp._id})`);

  const remaining = comp.totalCapacity - comp.bookedSpots;
  console.log(`Current spots remaining: ${remaining} (Total: ${comp.totalCapacity}, Booked: ${comp.bookedSpots})`);

  // Create 30 temporary test users
  const testUsers = [];
  for (let i = 1; i <= 30; i++) {
    const email = `stress_tester_${Date.now()}_${i}@test.com`;
    const user = await User.create({
      name: `Tester ${i}`,
      email,
      referralCode: `STRESS${i}_${Math.floor(Math.random() * 10000)}`
    });
    testUsers.push(user);
  }
  console.log(`Created ${testUsers.length} simulated concurrent users.`);

  console.log(`Firing ${testUsers.length} simultaneous registration requests...`);

  // Fire requests simultaneously using fetch
  const results = await Promise.all(
    testUsers.map(user =>
      fetch(`${BASE_URL}/${comp._id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user._id.toString()
        }
      }).then(async res => ({
        status: res.status,
        body: await res.json(),
        userId: user._id
      }))
    )
  );

  const successful = results.filter(r => r.status === 201);
  const conflicts = results.filter(r => r.status === 409);
  const otherErrors = results.filter(r => r.status !== 201 && r.status !== 409);

  console.log('\n--- TEST RESULTS ---');
  console.log(`Successful Registrations (HTTP 201): ${successful.length}`);
  console.log(`Rejected (HTTP 409 - Sold Out / Already Registered): ${conflicts.length}`);
  console.log(`Other Unexpected Errors: ${otherErrors.length}`);

  // DB Verification
  const freshComp = await Competition.findById(comp._id);
  const actualRegistrations = await Registration.countDocuments({ competitionId: comp._id });

  console.log(`\nDatabase Final Verification:`);
  console.log(`Final bookedSpots in DB: ${freshComp.bookedSpots}/${freshComp.totalCapacity}`);
  console.log(`Actual Registration documents in DB: ${actualRegistrations}`);

  if (freshComp.bookedSpots <= freshComp.totalCapacity && freshComp.bookedSpots === actualRegistrations) {
    console.log('✅ PASSED: No overselling occurred! Atomic locking works as designed.');
  } else {
    console.error('❌ FAILED: Overselling or state drift detected!');
  }

  // Cleanup test users and test registrations
  console.log('\nCleaning up stress test data...');
  const testUserIds = testUsers.map(u => u._id);
  await Registration.deleteMany({ userId: { $in: testUserIds } });
  await User.deleteMany({ _id: { $in: testUserIds } });
  await Competition.findByIdAndUpdate(comp._id, { bookedSpots: comp.bookedSpots }); // restore initial count
  console.log('Cleanup complete.');

  process.exit(0);
}

runConcurrencyTest().catch(err => {
  console.error(err);
  process.exit(1);
});