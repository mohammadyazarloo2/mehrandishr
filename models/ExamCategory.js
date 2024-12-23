import mongoose from 'mongoose';

const ExamCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamCategory',
    default: null
  }
}, { timestamps: true });

export default mongoose.models.ExamCategory || mongoose.model('ExamCategory', ExamCategorySchema);
