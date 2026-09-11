/* Chapter detail content — typed. Key: "<subject>-<group>-<chapter>" (0-based).
   Data lives in lib/content/*.ts subject files; built-in polished chapters win. */
import type { ChapterDetail, QuizQ } from "./content/types";
import { CHAPTER_DETAILS as BUILTIN } from "./content/builtin";
import { ENGLISH } from "./content/english";
import { FOOTPRINTS } from "./content/footprints";
import { HINDI } from "./content/hindi";
import { MATHS } from "./content/maths";
import { SCIENCE } from "./content/science";
import { SST_HISTORY } from "./content/sst-history";
import { SST_GEOGRAPHY } from "./content/sst-geography";
import { SST_CIVICS } from "./content/sst-civics";
import { SST_ECONOMICS } from "./content/sst-economics";
import { AI } from "./content/ai";
import { AI_PARTB1 } from "./content/ai-partb1";
import { AI_PARTB2 } from "./content/ai-partb2";
import { AI_PARTB3 } from "./content/ai-partb3";

export type { Slide, MindmapBranch, Mindmap, FlowNode, Formula, Example, Diagram, TimelineItem, Word, QuizQ, ChapterDetail } from "./content/types";

const FILES: Record<string, ChapterDetail>[] = [ENGLISH, FOOTPRINTS, HINDI, MATHS, SCIENCE, SST_HISTORY, SST_GEOGRAPHY, SST_CIVICS, SST_ECONOMICS, AI, AI_PARTB1, AI_PARTB2, AI_PARTB3];

export const CHAPTER_DETAILS: Record<string, ChapterDetail> = Object.assign({}, ...FILES, BUILTIN);

export function chapterDetail(key: string): ChapterDetail | null {
  return CHAPTER_DETAILS[key] || null;
}

export function totalQuizQuestions(): number {
  return Object.values(CHAPTER_DETAILS).reduce((a, d) => a + (d.quiz?.length || 0), 0);
}

/* Auto fallback when detail is not filled — never an empty page */
export function autoDetail(chTitle: string, subName: string, chN: number): ChapterDetail {
  return {
    slides: [
      { kicker: `${subName} • Ch ${chN}`, title: chTitle,
        points: ["Read the NCERT line by line — every heading is a concept", "Write difficult words and terms in your notebook", "Draw this chapter's mind map yourself — you will remember it faster"],
        formula: "Teacher: fill full slides from the Admin panel" },
      { kicker: "Study plan", title: "How to study? (The smart way)",
        points: ["Step 1: Read the full chapter once", "Step 2: Highlight the important points", "Step 3: Take the quiz and revise your mistakes"] },
      { kicker: "Exam tips", title: "How to score full marks?",
        points: ["Write answers with heading + points + diagram/example", "In numericals: formula → steps → unit → answer", "Revision: cover this chapter twice in the last 7 days"] },
    ],
    notes: [
      `<b>${chTitle}</b> — build your own points from NCERT reading.`,
      "Write a 2-line summary of every heading in your notebook.",
      "Revise diagrams, formulas, and dates on a separate page.",
      "Always practise previous board questions (PYQs).",
    ],
    quiz: [
      { q: `What should be the main focus for the chapter "${chTitle}"?`, options: ["Only rote learning", "Concepts + NCERT + practice", "Only guidebooks", "Study before the exam"], answer: 1, why: "Concepts + NCERT + practice = solid marks." },
      { q: "What is the best way to revise?", options: ["Reading once", "Write + speak + quiz yourself", "Listening to friends", "Staying up all night"], answer: 1, why: "Active recall (writing/speaking/quizzing) builds the fastest memory." },
    ],
  };
}
