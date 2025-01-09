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
  keywords: {
    type: String,
    validate: {
      validator: function (value) {
        const keywords = value.split(",").map((k) => k.trim());
        return keywords.length <= 10;
      },
      message: "حداکثر 10 کلیدواژه با کاما (,) از هم جدا کنید",
    },
  },
  metaTitle: {
    type: String,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    maxlength: 160,
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
