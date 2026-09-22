/* Class 10 AI (417) — Half Yearly 2026-27 kit: shared types.
   Blue print: 21 questions / 50 marks, Section A objective (24) + Section B subjective (26). */

export interface AiObqItem {
  q: string;
  o: [string, string, string, string];
  a: number; // index of the correct option
  why: string;
}

export interface AiObqSet {
  id: string; // "A1" ... "A5"
  heading: string; // "Question 1 — Answer any four"
  unit: string;
  pick: string; // "Any 4 out of 6"
  marks: number; // marks per item = 1
  items: AiObqItem[];
}

export interface AiBankQ {
  n: number;
  q: string;
  ans: string;
  unit: string;
  marks: number; // expected marks of this question in the paper
  hot?: boolean;
  tag?: string;
}

export interface AiBpRow {
  section: string; // "A" | "B"
  unit: string;
  ques: string; // "Q1" | "Q6-Q10" ...
  type: string;
  given: string; // "6 given, any 4"
  per: string; // "1 x 4" style marking
  marks: number;
}

export interface AiOldQ {
  n: number;
  sec: string; // "A" | "B"
  q: string;
  ans: string;
  note?: string; // for parts that were not fully legible in the photo
}
