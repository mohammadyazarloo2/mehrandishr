import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
      ref: "BlogCategory",
      default: "0",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BlogCategory ||
  mongoose.model("BlogCategory", CategorySchema);
