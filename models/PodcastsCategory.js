import mongoose from "mongoose";

const podcastsCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    icon: String,
    order: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// رابطه مجازی با پادکست‌ها
// PodcastsCategory.virtual("podcasts", {
//   ref: "Podcast",
//   localField: "_id",
//   foreignField: "categories",
// });

const PodcastsCategory =
  mongoose.models.PodcastsCategory ||
  mongoose.model("PodcastsCategory", podcastsCategory);
export default PodcastsCategory;
