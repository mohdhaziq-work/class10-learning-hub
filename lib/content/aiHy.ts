/* AI (417) Half Yearly kit - index: counts, teacher's list of 15 most likely from the 50 solved,
   and the download links. Everything else lives in the sibling aiHy* files. */
import { AI_HY_BLUEPRINT, AI_HY_META, AI_HY_PORTION, AI_HY_STRATEGY, AI_HY_BP_TOTALS } from "./aiHyBlueprint";
import { AI_HY_PAPER_A1 } from "./aiHyPaperA";
import { AI_HY_PAPER_A2 } from "./aiHyPaperA2";
import { AI_HY_PAPER_B_SHORT, AI_HY_PAPER_B_MID, AI_HY_PAPER_B_LONG } from "./aiHyPaperB";
import { AI_HY_OBQ_A } from "./aiHyObqA";
import { AI_HY_OBQ_B } from "./aiHyObqB";
import { AI_HY_OBQ_C } from "./aiHyObqC";
import { AI_HY_OBQ_D } from "./aiHyObqD";
import { AI_HY_OBQ_E } from "./aiHyObqE";
import { AI_HY_OBQ_F } from "./aiHyObqF";
import { AI_HY_OBQ_G } from "./aiHyObqG";
import { AI_HY_EXPECTED_A } from "./aiHyExpected";
import { AI_HY_EXPECTED_B } from "./aiHyExpectedB";
import { AI_OLD_SECTION_A, AI_OLD_SECTION_B, AI_OLD_PAPER_META } from "./aiHyOldPaper";

export const AI_HY = {
  meta: AI_HY_META,
  blueprint: AI_HY_BLUEPRINT,
  totals: AI_HY_BP_TOTALS,
  portion: AI_HY_PORTION,
  strategy: AI_HY_STRATEGY,
  paperA: [...AI_HY_PAPER_A1, ...AI_HY_PAPER_A2],
  paperB: { short: AI_HY_PAPER_B_SHORT, mid: AI_HY_PAPER_B_MID, long: AI_HY_PAPER_B_LONG },
  obq: [...AI_HY_OBQ_A, ...AI_HY_OBQ_B, ...AI_HY_OBQ_C, ...AI_HY_OBQ_D, ...AI_HY_OBQ_E, ...AI_HY_OBQ_F, ...AI_HY_OBQ_G],
  expected: [...AI_HY_EXPECTED_A, ...AI_HY_EXPECTED_B],
  oldPaper: { meta: AI_OLD_PAPER_META, sectionA: AI_OLD_SECTION_A, sectionB: AI_OLD_SECTION_B },
};

/* ---- counts used on the pages and in the PDFs ---- */
export const AI_HY_PAPER_OBQ = AI_HY_PAPER_A1.flatMap((s) => s.items).length + AI_HY_PAPER_A2.flatMap((s) => s.items).length; // 30
export const AI_HY_PAPER_SUBJECTIVE = AI_HY_PAPER_B_SHORT.length + AI_HY_PAPER_B_MID.length + AI_HY_PAPER_B_LONG.length; // 16
export const AI_HY_OBQ_TOTAL =
  AI_HY_OBQ_A.length + AI_HY_OBQ_B.length + AI_HY_OBQ_C.length +
  AI_HY_OBQ_D.length + AI_HY_OBQ_E.length + AI_HY_OBQ_F.length + AI_HY_OBQ_G.length; // 190
export const AI_HY_EXPECTED_TOTAL = AI_HY_EXPECTED_A.length + AI_HY_EXPECTED_B.length; // 51
export const AI_HY_OLD_TOTAL = AI_OLD_SECTION_A.length + AI_OLD_SECTION_B.length; // 21
export const AI_HY_HOT_TOTAL = [...AI_HY_EXPECTED_A, ...AI_HY_EXPECTED_B].filter((q) => q.hot).length;

/* Six unit-wise sets of 30 (each unit) plus a 10-question rapid-fire set.
   "from" is the running question number used on the page and in the PDF. */
export const AI_HY_OBQ_SETS: { id: string; title: string; unit: string; from: number; items: typeof AI_HY_OBQ_A }[] = (() => {
  const raw: { id: string; title: string; unit: string; items: typeof AI_HY_OBQ_A }[] = [
    { id: "part-a-1", title: "Communication Skills", unit: "Part A - Unit 1", items: [...AI_HY_OBQ_A.slice(0, 15), ...AI_HY_OBQ_D.slice(0, 15)] },
    { id: "part-a-2", title: "Self Management Skills", unit: "Part A - Unit 2", items: [...AI_HY_OBQ_A.slice(15), ...AI_HY_OBQ_D.slice(15)] },
    { id: "part-a-3", title: "ICT Skills", unit: "Part A - Unit 3", items: [...AI_HY_OBQ_B.slice(0, 15), ...AI_HY_OBQ_E.slice(0, 15)] },
    { id: "part-b-1", title: "AI Project Cycle and Ethical Framework", unit: "Part B - Unit 1", items: [...AI_HY_OBQ_B.slice(15), ...AI_HY_OBQ_E.slice(15)] },
    { id: "part-b-2", title: "Advanced Concepts of Modelling", unit: "Part B - Unit 2", items: [...AI_HY_OBQ_C.slice(0, 15), ...AI_HY_OBQ_F.slice(0, 15)] },
    { id: "part-b-3", title: "Evaluating Model", unit: "Part B - Unit 3", items: [...AI_HY_OBQ_C.slice(15), ...AI_HY_OBQ_F.slice(15)] },
    { id: "rapid", title: "Rapid fire - full forms and number questions", unit: "All units", items: AI_HY_OBQ_G },
  ];
  let n = 0;
  return raw.map((r) => {
    const from = n;
    n += r.items.length;
    return { ...r, from };
  });
})();

/* ---- the teacher's list: 15 of the 50 solved questions most likely to come.
   Chosen from the 50 solved questions by the blue print weightage, the school's own
   2025-26 paper and how often CBSE asks them. Question numbers refer to the 50 list. ---- */
export const AI_HY_TOP15: { ref: number; q: string; unit: string; why: string }[] = [
  { ref: 6, q: "What is a communication cycle?", unit: "Part A - Communication", why: "The whole Part A Unit 1 is built around this cycle; it also feeds the 4-mark questions." },
  { ref: 8, q: "Common barriers to effective communication", unit: "Part A - Communication", why: "Asked in the school's own 2025-26 paper (4-mark) and in most CBSE sets." },
  { ref: 9, q: "The 7 Cs of effective communication", unit: "Part A - Communication", why: "Came as a full 4-mark question last year - learn all seven with one word each." },
  { ref: 11, q: "What is stress?", unit: "Part A - Self Management", why: "The base definition for every stress question in Section A and B." },
  { ref: 13, q: "Techniques for managing stress", unit: "Part A - Self Management", why: "Highest-frequency 2-mark question of Unit 2; combine with a healthy lifestyle." },
  { ref: 16, q: "What is self-motivation?", unit: "Part A - Self Management", why: "Paired with self-awareness and self-regulation - a favourite MCQ and 2-mark item." },
  { ref: 22, q: "Difference between a file and a folder", unit: "Part A - ICT", why: "ICT Unit 3 basics; also the file extension and shortcut MCOs come from the same topic." },
  { ref: 26, q: "What is the AI Project Cycle?", unit: "Part B - Unit 1", why: "The spine of Part B Unit 1 - a 4-mark question is almost certain here." },
  { ref: 28, q: "What is problem scoping?", unit: "Part B - Unit 1", why: "First stage of the cycle; the 4Ws canvas and problem statement template hang on it." },
  { ref: 30, q: "The three domains of AI with examples", unit: "Part B - Unit 1", why: "MCQ plus short answer in every part B set - Data Science, CV, NLP." },
  { ref: 33, q: "What is AI bias? Give an example", unit: "Part B - Unit 1 (Ethics)", why: "Ethical framework is a full section of the blue print; bias is its most asked point." },
  { ref: 35, q: "Difference between AI, Machine Learning and Deep Learning", unit: "Part B - Unit 1", why: "Classic 4-mark comparison - draw the three circles if words fall short." },
  { ref: 39, q: "Difference between supervised and unsupervised learning", unit: "Part B - Unit 2", why: "Modelling unit's most asked comparison, with one algorithm each." },
  { ref: 44, q: "What is model evaluation and why is it needed?", unit: "Part B - Unit 3", why: "Unit 3 is only about this - always worth marks in Section B." },
  { ref: 49, q: "Precision, recall and F1 score with formulas", unit: "Part B - Unit 3", why: "Formulas are exact marks; comes with the confusion matrix in the 4-mark slot." },
];

export const AI_HY_SECOND15: { ref: number; q: string }[] = [
  { ref: 2, q: "Different methods of communication" },
  { ref: 7, q: "What is feedback and why is it important" },
  { ref: 10, q: "How body language affects communication" },
  { ref: 12, q: "Common causes of stress among students" },
  { ref: 15, q: "What is self-awareness" },
  { ref: 21, q: "What is a file and what is a folder" },
  { ref: 25, q: "Why is computer maintenance important" },
  { ref: 27, q: "Major stages of the AI Project Cycle" },
  { ref: 29, q: "Why problem scoping is important" },
  { ref: 31, q: "What is an ethical framework in AI" },
  { ref: 34, q: "What is Artificial Intelligence" },
  { ref: 38, q: "What is supervised learning, with an example" },
  { ref: 42, q: "What is an Artificial Neural Network" },
  { ref: 46, q: "What is train-test split" },
  { ref: 48, q: "What is a confusion matrix - TP, TN, FP, FN" },
];

/* ---- downloads: every sheet has a PDF at /api/ai/pdf/<doc> ---- */
export const AI_HY_PDFS: { doc: string; title: string; note: string }[] = [
  { doc: "paper", title: "Model question paper - 50 marks", note: "The whole paper in the school's layout. Print it and solve it in 2 hours." },
  { doc: "answers", title: "Model paper - answer key", note: "Every question of the model paper with the model answer and the correct MCQ option." },
  { doc: "mcq", title: `Objective practice bank - ${AI_HY_OBQ_TOTAL} MCQs`, note: "Unit-wise MCQs with the correct option and a one-line reason." },
  { doc: "expected", title: "Most expected questions with answers", note: "51 subject questions, unit-wise, answers sized to the marks." },
  { doc: "old", title: "Old half yearly 2025-26 - solved", note: "The school's own last-year paper, every question answered." },
];

export const AI_HY_TOTAL_LINES = {
  paperObq: AI_HY_PAPER_OBQ,
  paperSubjective: AI_HY_PAPER_SUBJECTIVE,
  obq: AI_HY_OBQ_TOTAL,
  expected: AI_HY_EXPECTED_TOTAL,
  old: AI_HY_OLD_TOTAL,
  hot: AI_HY_HOT_TOTAL,
};
