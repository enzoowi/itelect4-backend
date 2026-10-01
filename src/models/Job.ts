import { Schema, model } from "mongoose";
import type { JobDoc } from "../types/index";

const jobSchema = new Schema<JobDoc>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: 100
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  budget: { 
    type: Number,
    required: [true, "Budget is required"],
    min: [10, "Minimum budget is 10"],
    max: [10000, "Maximum budget is 10000"]
  },

  status: {
    type: String,
    enum: {
      values: ["Open", "InProgress", "Completed", "Cancelled"],
      message: "Status must be Open, InProgress, Completed, or Cancelled"
    },
    default: "Open"
  }
});

jobSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Job = model<JobDoc>("Job", jobSchema);
