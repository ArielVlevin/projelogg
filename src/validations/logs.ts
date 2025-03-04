import { z } from "zod";

// נגדיר סכמת ולידציה עם Zod.
// הדרישות: project_id, logType (feature/bugfix), subTopic, description
// date? אפשר להפוך לאופציונלי/קבוע אוטומטית בסכמה

export const logSchema = z.object({
  project_id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
  logType: z.enum(["feature", "bugfix"]),
  subTopic: z.string().min(1, "subTopic is required"),
  description: z.string().min(1, "description is required"),
});
