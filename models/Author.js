import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  avatar: String,
  bio: String,
  expertise: [String],
  socialLinks: {
    website: String,
    twitter: String,
    linkedin: String,
    github: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Author || mongoose.model('Author', AuthorSchema);