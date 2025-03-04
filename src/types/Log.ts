import { Project } from "@/types/Project";

export interface Log {
  _id?: string;
  project_id: string;
  logType: string;
  subTopic: string;
  description: string;
  date?: string;
}

export interface LogPopulated extends Omit<Log, "project_id"> {
  _id: string;
  project_id: Project;
  date: string;
  createdAt: string;
  updatedAt: string;
}
