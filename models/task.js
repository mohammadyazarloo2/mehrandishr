import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:'0'
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;
