/* Shared types for the "Most Expected Questions" banks (Half Yearly SST).
   `hot: true` = question with the highest chance of appearing in the paper. */

export type IMPType = "VSA" | "SA" | "LA" | "CASE" | "MAP" | "HOTS";

export interface IMPQ {
  id: string;
  type: IMPType;
  marks: number;
  topic: string;
  q: string;
  ans: string;
  hot?: boolean;
}

export interface IMPTopic {
  name: string;
  qs: IMPQ[];
}

export interface IMPChapter {
  key: string; /* chapter key used by the quizzes, e.g. sst-0-0 */
  subject: string;
  ch: number;
  title: string;
  blurb: string;
  topics: IMPTopic[];
}
