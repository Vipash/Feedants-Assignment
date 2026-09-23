const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED'],
    default: 'CONFIRMED'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'SIMULATED', 'FAILED'],
    default: 'SIMULATED'
  },
  submission: {
    mediaUrl: { type: String },
    submittedAt: { type: Date },
    status: {
      type: String,
      enum: ['NOT_SUBMITTED', 'SUBMITTED', 'ACCEPTED'],
      default: 'NOT_SUBMITTED'
    }
  }
}, { timestamps: true });

// CRITICAL: Prevent duplicate registrations at the database engine level
registrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);