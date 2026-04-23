import mongoose from "mongoose";

const { Schema } = mongoose;
const applicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    companyName: { type: String, required: [true, "enter the company name"] },
    roleTitle: { type: String, required: [true, "enter the role title"] },
    jobLocation: { type: String, required: [true, "enter the job location"] },
    status: {
      type: String,
      required: [true, "select a status"],
      default: "Applied",
    },
    appliedDate: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true },
);
export const Application = mongoose.model("app", applicationSchema);
