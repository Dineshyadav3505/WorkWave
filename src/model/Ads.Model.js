import mongoose, { Schema, model, models } from "mongoose";

const adsSchema = new Schema(
  {
    ads: {
      type: String,
      required: true,
    },

    expireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Ads = models?.Ads || model("Ads", adsSchema);

export default Ads;
