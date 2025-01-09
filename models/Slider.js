import mongoose from "mongoose"

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0,
  },
  keywords: {
    type: String,
    validate: {
      validator: function (value) {
        const keywords = value.split(",").map((k) => k.trim());
        return keywords.length <= 10;
      },
      message: "حداکثر 10 کلیدواژه با کاما (,) از هم جدا کنید",
    },
  },
  metaTitle: {
    type: String,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    maxlength: 160,
  },
}, {
  timestamps: true
})

const Slider = mongoose.models.Slider || mongoose.model("Slider", sliderSchema)

export default Slider
