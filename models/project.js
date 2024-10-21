import mongoose, { Schema, models } from "mongoose";

const projectSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default:'',
    },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", projectSchema);

export default Project;
