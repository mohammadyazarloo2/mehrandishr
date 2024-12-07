import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  parentId: {
    type: String,
    ref: 'BlogCategory',
    default: "0"
  }
}, {
  timestamps: true
});

export default mongoose.models.BlogCategory || mongoose.model('BlogCategory', CategorySchema);