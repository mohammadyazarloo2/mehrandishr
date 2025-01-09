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
