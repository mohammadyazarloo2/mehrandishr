import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام برند الزامی است"],
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    createdAt: {
      type: String,
      default: () => new Date().toLocaleDateString("fa-IR"),
    },
    keywords: {
      type: String,
      validate: {
        validator: function(value) {
          const keywords = value.split(',').map(k => k.trim());
          return keywords.length <= 10;
        },
        message: 'حداکثر 10 کلیدواژه با کاما (,) از هم جدا کنید'
      }
    },
    metaTitle: {
      type: String,
      maxlength: 60
    },
    metaDescription: {
      type: String,
      maxlength: 160
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

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;
