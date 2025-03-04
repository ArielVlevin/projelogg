export interface Log {
  _id?: string;
  project_id: string;
  logType: string;
  subTopic: string;
  description: string;
  date?: string;
}
