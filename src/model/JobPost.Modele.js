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
        label: {
          type: String,
          required: true,
        },
        date: {
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
        date: {
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

    answerkeyLink: [
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

    AdmissionLink: [
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

    multiChild: [
      {
        postname: {
          type: String,
        },
        qualification: [
          {
            type: String,
          },
        ],
      },
    ],

    multiGrandChild: [
      {
        title: {
          type: String,
        },
        titleChild: [
          {
            titleChildName: {
              type: String,
            },
            titleGrandChild: [
              {
                type: String,
              },
            ],
          },
        ],
      },
    ],

    multiGrandChild2: [
      {
        title: {
          type: String,
        },
        titleChild: [
          {
            titleChildName: {
              type: String,
            },
            titleGrandChild: [
                {
                    label:{
                        type: String,
                    },
                    post: {
                        type: String,
                    }
                }
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobPost = models?.JobPost || model("JobPost", jobPostSchema);

export default JobPost;
