import mongoose from "mongoose";

const gameWordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  translate: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  sound: {
    type: String
  },
  category: {
    type: String,
    enum: ['fruits', 'animals', 'programming', 'house', 'clothes'],
    required: true
  },
  level: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

export default mongoose.models.GameWord || mongoose.model("GameWord", gameWordSchema);
