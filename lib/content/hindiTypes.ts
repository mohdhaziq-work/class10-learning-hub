/* Shared types for the Class 10 HINDI (Course A) Half Yearly kit.
   Blueprint taken line by line from the school's Hindi blue print (80 marks).

   ANSWER RULE (standing project rule): every answer is only as long as its marks
   demand — 1 mark = one line, grammar = one line, 25-30 शब्द = one or two
   sentences, 50-60 शब्द = two to three points, and writing tasks follow the
   word limit printed in the blue print (120 / 100 / 80 / 40-50 शब्द). */

export interface HNBlueRow {
  k: string; /* खंड — क / ख / ग / घ */
  n: string; /* प्रश्न क्रमांक */
  chapter: string;
  type: string;
  subs: string; /* number of sub-questions */
  marks: number;
  rule: string; /* विकल्प / निर्देश */
}

export interface HNPassageItem {
  q: string;
  marks: number;
  opts?: string[];
  correct?: number;
  ans: string;
}

export interface HNPassage {
  n: string;
  kind: string; /* अपठित गद्यांश / अपठित काव्यांश */
  marks: number;
  source: string;
  extract: string;
  items: HNPassageItem[];
  tip: string;
}

export interface HNGramQ {
  n: string;
  topic: string;
  q: string;
  ans: string;
}

export interface HNLitQ {
  n: string;
  book: string;
  ch: string;
  topic: string;
  q: string;
  ans: string;
  alt?: { ch: string; topic: string; q: string; ans: string };
}

export interface HNWriting {
  n: string;
  type: string;
  marks: number;
  limit: string;
  topic: string;
  model: string;
  tips: string[];
}

export interface HNImpQ {
  id: string;
  marks: number;
  topic: string;
  q: string;
  ans: string;
  hot?: boolean;
}

export interface HNImpTopic {
  name: string;
  qs: HNImpQ[];
}

export interface HNImpUnit {
  key: string;
  book: string;
  title: string;
  author: string;
  blurb: string;
  topics: HNImpTopic[];
}
