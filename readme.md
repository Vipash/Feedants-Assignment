# Feedants — Competition Details Screen (Full-Stack Module)
[![CI Pipeline](https://github.com/Vipash/Feedants-Assignment/actions/workflows/ci.yml/badge.svg)](https://github.com/Vipash/Feedants-Assignment/actions/workflows/ci.yml)


A production-grade, highly scalable Competition Details module built with **React Native (Expo)**, **Node.js / Express**, and **MongoDB Atlas**. Designed to handle real-world competition lifecycles, race-condition-free spot reservations under high concurrency, and multi-state participant flows.

---

## 🏗️ System Architecture

```text
feedants-competition-module/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Business logic, lifecycle engine, and atomic spot locking
│   ├── models/             # Strict Mongoose schemas (Competition, User, Registration)
│   ├── routes/             # REST endpoints (with Express route-ordering safeguards)
│   ├── scripts/            # Seed data and concurrency stress-test harnesses
│   ├── app.js              # Express middleware and configuration
│   └── server.js           # Server listener
└── mobile-app/
    ├── src/
    │   ├── components/     # Modular UI (Header, PricingCard, ImportantDates, Winners, etc.)
    │   ├── config/         # API base client with LAN routing configuration
    │   └── utils/          # Bilingual translation dictionaries (ENG / हिंदी)
    └── App.js              # Root state orchestrator, user switcher modal & tab router

```

---

## ✨ Key Features & Highlights

1. **Race-Condition-Safe Atomic Booking**:
* Spot reservation uses MongoDB document-level atomic queries (`$expr: { $lt: ['$bookedSpots', '$totalCapacity'] }`).
* Mathematically prevents overselling even when hundreds of users submit payment/registration simultaneously.


2. **Dynamic Lifecycle State Machine**:
* The competition lifecycle (`UPCOMING`, `REGISTRATION_OPEN`, `SUBMISSION_OPEN`, `EVALUATION`, `COMPLETED`) is calculated on the server using authoritative server time, preventing client-side clock tampering.


3. **Participant State Context**:
* The Call-To-Action (CTA) automatically mutates (`Register Now` → `Upload Submission` → `Submission Uploaded`) based on the active participant's database record.


4. **Built-In Evaluator Switcher**:
* Includes a non-intrusive User Switcher Modal:
* Toggle between pre-seeded registered and unregistered participants.
* Generate realistic guest participants on the fly.
* Reset demo state back to `1/20 Booked` with a single click.




5. **Full Internationalization (i18n)**:
* Dynamic bilingual toggle (**ENG** / **हिंदी**) that seamlessly translates titles, metrics, countdowns, tabs, and action labels.


6. **Pixel-Fidelity Layout**:
* $2 \times 2$ Important Dates matrix, horizontal previous winners carousel, full 6-tier reward distribution, side-by-side refund/payment trust cards, referral engine, and bottom navigation bar.



---

## ⚡ Concurrency Stress Test Verification

An automated stress test script (`backend/scripts/test-concurrency.js`) fires 30 simultaneous registration requests across 30 distinct users against the remaining 19 spots using `Promise.all`:

```text
--- STARTING CONCURRENCY STRESS TEST ---
Current spots remaining: 19 (Total: 20, Booked: 1)
Created 30 simulated concurrent users.
Firing 30 simultaneous registration requests...

--- TEST RESULTS ---
Successful Registrations (HTTP 201): 19
Rejected (HTTP 409 - Sold Out): 11
Other Unexpected Errors: 0

Database Final Verification:
Final bookedSpots in DB: 20/20
Actual Registration documents in DB: 20
✅ PASSED: No overselling occurred! Atomic locking works as designed.

```

---

## 🚀 Setup & Running Instructions

### 1. Prerequisites

* **Node.js**: `v18+`
* **Database**: MongoDB Atlas cluster or local MongoDB instance
* **Mobile Client**: Expo Go app on physical iOS or Android device (or an emulator)

### 2. Backend Setup

```bash
cd backend
npm install

```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/feedants?retryWrites=true&w=majority

```

Seed the database with test data:

```bash
npm run seed

```

*(Optional)* Run the concurrency test to verify database locking mechanics:

```bash
npm run test:concurrency

```

Start the development server:

```bash
npm run dev

```

### 3. Mobile App Setup

```bash
cd mobile-app
npm install

```

Configure your computer's local network IP in `mobile-app/src/config/api.js`:

```javascript
export const API_BASE_URL = 'http://<YOUR_LOCAL_IP>:5000/api/v1/competitions';

```

Start the Expo bundler:

```bash
npx expo start

```

Scan the generated QR code using the **Expo Go** app on your device.

---

## 📌 Important Assumptions Made

* **Identity Context**: In place of a full SMS/OTP authentication gate, user identity is communicated via the `x-user-id` HTTP header. A built-in user switcher modal enables testing multiple registration and submission states.
* **Payment Processing**: Given the 48-hour scope, entry fees (₹99) are captured through an atomic two-step reservation/confirmation state machine rather than a live Razorpay webhook pipeline.
* **Authoritative Server Time**: Client clocks can drift or be altered; all eligibility deadlines and countdown milestones are derived exclusively from MongoDB server timestamps.

---

## 🧠 Major Technical Decisions

### MongoDB Atomic Operations vs. Application-Level Locking

* **Problem**: Traditional `findOne()` followed by `comp.bookedSpots += 1; await comp.save()` causes severe race conditions under concurrent load.
* **Solution**: Implemented `Competition.findOneAndUpdate()` with an atomic precondition:
`$expr: { $lt: ['$bookedSpots', '$totalCapacity'] }`.
MongoDB's WiredTiger storage engine handles locking at the document layer, guaranteeing zero spot over-allocation.

### Compound Unique Index for Duplicate Prevention

The `Registration` schema defines a compound index `{ competitionId: 1, userId: 1 }` with `{ unique: true }`. Even if a user double-taps "Register", the second write is rejected at the database engine level.

### Dynamic Primary Route (`/primary`)

To eliminate 404 errors caused by hardcoded database ObjectIDs across re-seedings, `/primary` resolves the active competition dynamically on the backend.

---

## ⚖️ Trade-offs Considered

* **MongoDB Atomic Operators vs. Redis Distributed Lock (Redlock)**:
* *Trade-off*: A Redis lock offers lower latency for high-throughput counters, but introduces additional infrastructure requirements and distributed failure modes.
* *Resolution*: For capacity management up to thousands of concurrent users, MongoDB's single-document atomic operations provide ACID-compliant consistency with zero additional infrastructure.


* **Client-Side Polling vs. WebSockets**:
* *Trade-off*: WebSockets provide instant push notifications for spot changes, but increase battery consumption and require persistent socket management.
* *Resolution*: Implemented optimistic client updates paired with pull-to-refresh. In full production, Server-Sent Events (SSE) would serve as a lightweight notification channel for spot updates.



---

## 📈 Production Improvements & Next Steps

1. **Read-Through Caching with Redis**: Cache `GET /competitions/primary` responses with a 5-second TTL to absorb read traffic spikes during promotional events.
2. **Asynchronous Registration Queue (BullMQ / AWS SQS)**: Offload secondary post-registration tasks (confirmation emails, referral credit allocation, invoice generation) to background worker jobs.
3. **Real Razorpay Webhook Integration**: Attach verified HMAC-SHA256 signature validation with idempotent event ID caching to support live payment settlements.

```

```