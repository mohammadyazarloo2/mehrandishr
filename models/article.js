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
