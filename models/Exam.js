import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamCategory',
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    userAnswer: Number,
    isCorrect: Boolean,
    score: Number
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
