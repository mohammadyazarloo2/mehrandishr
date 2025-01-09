import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: String,
    },
    tags: [String],
    summary: String,
    content: {
      type: String,
      required: true,
    },
    podcast: {
      url: String,
      duration: String,
      size: String,
    },
    tableOfContents: [String],
    relatedArticles: [Number],
    excerpt: String,
    image: String,
    category: String,
    readTime: String,
    views: {
      type: Number,
      default: 0,
    },
    date: String,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    keywords: {
      type: String,
      validate: {
        validator: function (value) {
          // حداکثر 10 کلیدواژه با کاما
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

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
