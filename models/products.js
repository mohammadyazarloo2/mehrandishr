import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Features'
  }],
  image: {
    type: String
  }
}, {
  timestamps: true
});

const Products = mongoose.models.Products || mongoose.model("Products", productSchema);
export default Products;