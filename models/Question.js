import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamCategory',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correct: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
