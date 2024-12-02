import mongoose, { Schema, models } from "mongoose";

const featuresSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Features = models.Features || mongoose.model("Features", featuresSchema);

export default Features;
