const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Dance' },
  tags: [{ type: String }], // e.g., ["Dance", "Multi-Win", "Winners get certificate"]
  entryFee: { type: Number, required: true, min: 0 },
  prizePool: { type: Number, required: true, min: 0 },
  
  // Capacity and Concurrency Controls
  totalCapacity: { type: Number, required: true },
  bookedSpots: { type: Number, default: 0, min: 0 },
  
  // Judge Spotlight
  judge: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: String },
    avatarUrl: { type: String },
    mediaUrl: { type: String }
  },

  // Lifecycle Timestamps
  registrationStartDate: { type: Date, required: true },
  registrationEndDate: { type: Date, required: true },
  submissionStartDate: { type: Date, required: true },
  submissionEndDate: { type: Date, required: true },
  resultDate: { type: Date, required: true },

  // Content & Details
  description: { type: String },
  judgingParameters: [{ parameter: String, weightage: Number }],
  rulesAndEligibility: [{ type: String }],
  
  // Itemized Rewards
  rewards: [
    {
      rankTitle: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],

  // Previous Winners Carousel
  previousWinners: [
    {
      name: { type: String },
      rank: { type: String },
      avatarUrl: { type: String },
      videoUrl: { type: String }
    }
  ],

  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for remaining spots
competitionSchema.virtual('remainingSpots').get(function () {
  return Math.max(0, this.totalCapacity - this.bookedSpots);
});

// Compound index for querying active competitions within date ranges
competitionSchema.index({ isActive: 1, registrationEndDate: 1 });

module.exports = mongoose.model('Competition', competitionSchema);