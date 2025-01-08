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
