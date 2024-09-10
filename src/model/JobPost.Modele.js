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
          required: true,
        },
        date: {
          type: Date,
        },
      },
    ],

    applicationFee: [
      {
        cast: {
          type: String,
          required: true,
        },
        fees: {
          type: Date,
        },
      },
    ],

    ageLimit: [
      {
        label: {
          type: String,
          required: true,
        },
        age: {
          type: Date,
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
          validate: {
            validator: function (v) {
              return /^https?:\/\//.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
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
          validate: {
            validator: function (v) {
              return /^https?:\/\//.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
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
          validate: {
            validator: function (v) {
              return /^https?:\/\//.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
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
          validate: {
            validator: function (v) {
              return /^https?:\/\//.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
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
          validate: {
            validator: function (v) {
              return /^https?:\/\//.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
        },
      },
    ],


    InformationSection : [
      {
        informationName: {
          type: String,
        },
        informationArray: [
          {
            informationLabel: {
              type: String,
            },
            informationDetails: [
              {
                type: String,
              },
            ],
          },
        ],
      },
    ],

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

    totalPost:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const JobPost = models?.JobPost || model("JobPost", jobPostSchema);

export default JobPost;
