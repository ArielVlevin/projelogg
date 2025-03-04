import mongoose, { Schema, model, models } from "mongoose";

const LogSchema = new Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    logType: { type: String, enum: ["feature", "bugfix"], required: true },
    subTopic: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default models.Log || model("Log", LogSchema);
