import mongoose from "mongoose";

const gameHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameType: {
    type: String,
    enum: ['keyboard'],
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  mistakes: {
    type: Number,
    required: true,
    default: 0
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  completedWords: [{
    word: String,
    timeSpent: Number
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number // در ثانیه
  }
}, { timestamps: true });


const GameHistory = mongoose.models.GameHistory || mongoose.model('GameHistory', gameHistorySchema);

export default GameHistory;
