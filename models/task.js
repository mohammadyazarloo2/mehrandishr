import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'completed']
  },
  priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high']
  },
  dueDate: {
      type: Date,
      required: true
  },
  assignedTo: {
      type: String
  }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", taskSchema);