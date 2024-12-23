import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    progress: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ExamCategory",
        },
        level: String,
        highestScore: Number,
      },
    ],
  },

  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
