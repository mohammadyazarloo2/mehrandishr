import mongoose, { Schema, models } from "mongoose";
// خب میخوام طبق همین ساختار مواردی رو اضافه کنم مثل قرار دادن سرفصل ها و توضیحات سرفصل همراه با ویدیدو انها 
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    barcode: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
      },
    ],
    // New fields for chapters and videos
    chapters: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      videoUrl: {
        type: String,
        required: true
      },
      duration: {
        type: Number, // Video duration in minutes
        required: true
      },
      order: {
        type: Number, // To maintain chapter sequence
        required: true
      }
    }],
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: "Features",
      },
    ],
  },
  { timestamps: true }
);

const Products = models.Products || mongoose.model("Products", productsSchema);

export default Products;
