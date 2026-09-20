/* MOST EXPECTED QUESTIONS — index (Half Yearly SST, all 11 chapters of the portion)
   History Ch 1-2 · Geography Ch 1-4 · Political Science Ch 1-3 · Economics Ch 1-2

   These are the questions that have the highest chance of coming in the paper,
   selected topic-wise (the patterns that repeat in this portion year after
   year). `hot: true` on a question = the ones to revise first. */

import type { IMPChapter, IMPQ } from "./sstImportantTypes";
import { IMP_HISTORY_1 } from "./sstImpHistory1";
import { IMP_HISTORY_2 } from "./sstImpHistory2";
import { IMP_GEO_1, IMP_GEO_2 } from "./sstImpGeo12";
import { IMP_GEO_3, IMP_GEO_4 } from "./sstImpGeo34";
import { IMP_CIVICS_1, IMP_CIVICS_2 } from "./sstImpCivics12";
import { IMP_CIVICS_3 } from "./sstImpCivics3";
import { IMP_ECO_1, IMP_ECO_2 } from "./sstImpEconomics";

export type { IMPChapter, IMPQ, IMPType, IMPTopic } from "./sstImportantTypes";

export const SST_IMP_CHAPTERS: IMPChapter[] = [
  IMP_HISTORY_1,
  IMP_HISTORY_2,
  IMP_GEO_1,
  IMP_GEO_2,
  IMP_GEO_3,
  IMP_GEO_4,
  IMP_CIVICS_1,
  IMP_CIVICS_2,
  IMP_CIVICS_3,
  IMP_ECO_1,
  IMP_ECO_2,
];

export interface IMPHotRow {
  id: string;
  subject: string;
  ch: number;
  chTitle: string;
  topic: string;
  type: IMPQ["type"];
  marks: number;
  q: string;
}

/* every question flagged as highest-chance, in chapter order */
export const SST_IMP_HOT: IMPHotRow[] = SST_IMP_CHAPTERS.flatMap((c) =>
  c.topics.flatMap((t) =>
    t.qs
      .filter((q) => q.hot)
      .map((q) => ({
        id: q.id,
        subject: c.subject,
        ch: c.ch,
        chTitle: c.title,
        topic: q.topic,
        type: q.type,
        marks: q.marks,
        q: q.q,
      }))
  )
);

export const SST_IMP_TOTAL = SST_IMP_CHAPTERS.reduce(
  (a, c) => a + c.topics.reduce((b, t) => b + t.qs.length, 0),
  0
);

export const SST_IMP_HOT_TOTAL = SST_IMP_HOT.length;

export const SST_IMP_SUBJECTS = ["History", "Geography", "Political Science", "Economics"] as const;

export function impChapterCount(subject: string) {
  return SST_IMP_CHAPTERS.filter((c) => c.subject === subject).reduce(
    (a, c) => a + c.topics.reduce((b, t) => b + t.qs.length, 0),
    0
  );
}
