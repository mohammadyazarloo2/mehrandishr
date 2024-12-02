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
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  },
  { timestamps: true }
);

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;
