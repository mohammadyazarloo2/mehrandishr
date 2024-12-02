import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);
export default Analytics;
