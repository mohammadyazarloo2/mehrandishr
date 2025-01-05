import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    general: {
      siteName: String,
      siteUrl: String,
      logo: {
        light: String,
        dark: String,
      },
      favicon: String,
      description: String,
      keywords: [String],
      defaultLanguage: {
        type: String,
        default: "fa",
      },
    },
    contact: {
      email: String,
      phone: String,
      address: String,
      socials: {
        instagram: String,
        telegram: String,
        whatsapp: String,
        linkedin: String,
      },
      hero: {
        title: String,
        subtitle: String,
      },
      info: [
        {
          icon: String,
          title: String,
          content: String,
        },
      ],
      form: {
        title: String,
        nameLabel: String,
        emailLabel: String,
        subjectLabel: String,
        messageLabel: String,
        submitButton: String,
      },
    },
    appearance: {
      theme: {
        type: String,
        default: "light",
      },
      primaryColor: String,
      secondaryColor: String,
      fontFamily: String,
    },
    seo: {
      googleAnalyticsId: String,
      googleTagManagerId: String,
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
    },
    features: {
      blog: {
        enabled: Boolean,
        commentsEnabled: Boolean,
        postsPerPage: Number,
      },
      newsletter: {
        enabled: Boolean,
        provider: String,
      },
    },
    about: {
      hero: {
        title: String,
        subtitle: String,
        backgroundImage: String,
      },
      stats: [
        {
          icon: String,
          count: String,
          label: String,
        },
      ],
      vision: {
        image: String,
        title: String,
        content: String,
        features: [String],
      },
      team: [
        {
          name: String,
          role: String,
          image: String,
          socialLinks: {
            twitter: String,
            linkedin: String,
            github: String,
          },
        },
      ],
      features: [
        {
          icon: String,
          title: String,
          desc: String,
          color: String,
        },
      ],
      content: {
        history: {
          title: String,
          content: String,
        },
        mission: {
          title: String,
          content: String,
        },
        values: {
          title: String,
          content: String,
        },
      },
      gallery: [
        {
          image: String,
          alt: String,
        },
      ],
      productionAreas: [
        {
          name: String,
          products: [String],
        },
      ],
      productionProcess: [
        {
          title: String,
          desc: String,
          icon: String,
        },
      ],
      parallaxSection: {
        backgroundImage: String,
        title: String,
      },
      timeline: [
        {
          year: String,
          title: String,
          description: String,
        },
      ],
    },
    testimonials: {
      title: String,
      subtitle: String,
      items: [
        {
          name: String,
          role: String,
          avatar: String,
          content: String,
          rating: Number,
          date: Date,
          video: {
            thumbnailUrl: String,
            videoUrl: String,
            duration: String,
            views: {
              type: Number,
              default: 0,
            },
          },
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
          },
          featured: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    videoTestimonials: [
      {
        id: Number,
        name: String,
        role: String,
        thumbnail: String,
        videoUrl: String,
        duration: String,
        views: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
