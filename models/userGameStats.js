import mongoose from "mongoose";

const userGameStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalGamesPlayed: {
    type: Number,
    default: 0
  },
  highestScore: {
    type: Number,
    default: 0
  },
  totalScore: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  totalMistakes: {
    type: Number,
    default: 0
  },
  highestLevel: {
    type: Number,
    default: 1
  },
  totalTimeSpent: {
    type: Number,
    default: 0 // در ثانیه
  },
  achievements: [{
    type: {
      type: String,
      enum: ['FIRST_GAME', 'NO_MISTAKES', 'SPEED_MASTER', 'LEVEL_MASTER']
    },
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastPlayed: {
    type: Date
  }
}, { timestamps: true });
