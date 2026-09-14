/* Board PYQs (Previous Year Questions) — chapter-wise, real CBSE board questions.
   Maths first (all 14 chapters, 2026-27 syllabus). More subjects coming. */
import { PYQ_A } from "./pyq-maths-a";
import { PYQ_B } from "./pyq-maths-b";

export interface Pyq {
  q: string;      /* the question exactly as asked in the board paper */
  y: string;      /* year(s), e.g. "CBSE 2023, 2020" */
  m: number;      /* marks */
  ans: string;    /* concise answer / key steps */
}

export const PYQ_MATHS: Record<string, Pyq[]> = { ...PYQ_A, ...PYQ_B };

export const PYQ_CHAPTERS: { key: string; n: number; name: string; unit: string }[] = [
  { key: "maths-0-0", n: 1, name: "Real Numbers", unit: "Number Systems" },
  { key: "maths-0-1", n: 2, name: "Polynomials", unit: "Algebra" },
  { key: "maths-0-2", n: 3, name: "Pair of Linear Equations in Two Variables", unit: "Algebra" },
  { key: "maths-0-3", n: 4, name: "Quadratic Equations", unit: "Algebra" },
  { key: "maths-0-4", n: 5, name: "Arithmetic Progressions", unit: "Algebra" },
  { key: "maths-0-5", n: 6, name: "Triangles", unit: "Geometry" },
  { key: "maths-0-6", n: 7, name: "Coordinate Geometry", unit: "Geometry" },
  { key: "maths-0-7", n: 8, name: "Introduction to Trigonometry", unit: "Trigonometry" },
  { key: "maths-0-8", n: 9, name: "Some Applications of Trigonometry", unit: "Trigonometry" },
  { key: "maths-0-9", n: 10, name: "Circles", unit: "Geometry" },
  { key: "maths-0-10", n: 11, name: "Areas Related to Circles", unit: "Mensuration" },
  { key: "maths-0-11", n: 12, name: "Surface Areas and Volumes", unit: "Mensuration" },
  { key: "maths-0-12", n: 13, name: "Statistics", unit: "Statistics & Probability" },
  { key: "maths-0-13", n: 14, name: "Probability", unit: "Statistics & Probability" },
];

/* board strings for the Smart Board (one line per question) */
export function pyqBoardLines(chKey: string, only?: number): string[] {
  const ch = PYQ_CHAPTERS.find((c) => c.key === chKey);
  const list = PYQ_MATHS[chKey] || [];
  if (!ch) return list.map((p) => p.q);
  const pick = only != null ? [list[only]].filter(Boolean) : list;
  return pick.map((p, i) => `Q${(only != null ? only : i) + 1}. ${p.q}  [${p.y} • ${p.m}m]`);
}

export const PYQ_TOTAL = Object.values(PYQ_MATHS).reduce((a, b) => a + b.length, 0);
