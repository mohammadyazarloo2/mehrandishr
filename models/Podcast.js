import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  audioUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PodcastsCategory',
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PodcastsCategory'
  }],
  tags: [String],
  listens: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Podcast = mongoose.models.Podcast || mongoose.model('Podcast', podcastSchema);
export default Podcast;
