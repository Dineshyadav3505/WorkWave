import InformationSection from "@/components/Form/OtherDetails";
import mongoose, { Schema, model, models } from "mongoose";

const jobPostSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    postName: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    notificationLink: {
      type: String,
      required: true,
    },

    importantDates: [
      {
        label: {
          type: String,
        },
        date: {
          type: String,
        },
      },
    ],

    applicationFee: [
      {
        cast: {
          type: String,
        },
        fees: {
          type: String,
        },
      },
    ],

    ageLimit: [
      {
        label: {
          type: String,
        },
        age: {
          type: String,
        },
      },
    ],

    applyLink: [
      {
        label: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    resultLink: [
      {
        label: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    admitCardLink: [
      {
        label: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    answerKeyLink: [
      {
        label: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    admissionLink: [
      {
        label: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    InformationSection: [{
      Information:[
        {
          value: {
            type: String,
          },
        }
      ]
    }],

    state: {
      type: String,
    },

    beginDate: {
      type: Date,
      required: true,
    },

    lastDate: {
      type: Date,
    },

    totalPost: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobPost = models?.JobPost || model("JobPost", jobPostSchema);

export default JobPost;




