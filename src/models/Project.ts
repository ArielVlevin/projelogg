import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    // אפשר להוסיף עוד שדות: description, owner, וכו'.
  },
  {
    timestamps: true,
  }
);

export default models.Project || model("Project", ProjectSchema);
