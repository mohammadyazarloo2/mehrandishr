import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    sub: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    views: {
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
  },
  { timestamps: true }
);

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;
