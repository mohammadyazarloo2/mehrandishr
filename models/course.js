import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    thumbnail: String,
    price: Number,
    duration: String,
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    type: {
      type: String,
      enum: ["recorded", "live"],
      default: "recorded",
    },
    topics: [
      {
        title: String,
        description: String,
        order: Number,
        duration: String,
        videoUrl: String,
      },
    ],
    features: [String],
    instructor: {
      name: String,
      avatar: String,
      bio: String,
    },
    enrollmentType: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
