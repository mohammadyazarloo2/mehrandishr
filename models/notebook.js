import mongoose, { Schema, models } from "mongoose";

const notbookeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    textNote: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NoteBook = models.NoteBook || mongoose.model("NoteBook", notbookeSchema);

export default NoteBook;
