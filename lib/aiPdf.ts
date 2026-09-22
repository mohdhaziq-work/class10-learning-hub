/* PDF builders for the AI Half Yearly kit (pdfkit + DejaVu fonts so that check marks,
   middle dots and dashes render). Five documents: paper, answers, mcq, expected, old.
   Used by /api/ai/pdf/[doc] - the same PDF the Smart Board opens in split view. */
import PDFDocument from "pdfkit";
import path from "node:path";
import { AI_HY, AI_HY_TOP15, AI_HY_SECOND15, AI_HY_OBQ_SETS, AI_HY_TOTAL_LINES } from "@/lib/content/aiHy";
import { shuffleItems } from "@/lib/aiShuffle";
import { AI_PYQ_MATCH, AI_PYQ_NO_MATCH, AI_PYQ_INSIGHTS } from "@/lib/content/aiHyPyqMatch";

const FONTS = path.join(process.cwd(), "fonts");
const LETTER = ["a", "b", "c", "d"];

type Doc = PDFKit.PDFDocument;

function newDoc(): Doc {
  const d = new PDFDocument({
    size: "A4",
    margins: { top: 56, bottom: 56, left: 50, right: 50 },
    bufferPages: true,
  });
  d.registerFont("reg", path.join(FONTS, "DejaVuSans.ttf"));
  d.registerFont("bold", path.join(FONTS, "DejaVuSans-Bold.ttf"));
  d.font("reg");
  return d;
}

function head(d: Doc, eyebrow: string, title: string, sub: string) {
  d.rect(0, 0, d.page.width, 9).fill("#1a73e8");
  d.moveDown(1.2);
  d.font("bold").fontSize(9).fillColor("#1a73e8").text(eyebrow.toUpperCase(), { characterSpacing: 1.1 });
  d.moveDown(0.35);
  d.font("bold").fontSize(20).fillColor("#111827").text(title, { lineGap: 3 });
  d.moveDown(0.25);
  d.font("reg").fontSize(10).fillColor("#5f6368").text(sub, { lineGap: 2 });
  d.moveDown(0.5);
  d.moveTo(d.page.margins.left, d.y).lineTo(d.page.width - d.page.margins.right, d.y).strokeColor("#e5e7eb").stroke();
  d.moveDown(0.8);
}

function h2(d: Doc, text: string) {
  if (d.y > d.page.height - 150) d.addPage();
  d.moveDown(0.5);
  d.font("bold").fontSize(13.5).fillColor("#111827").text(text, { lineGap: 2 });
  d.moveDown(0.3);
}

function label(d: Doc, text: string) {
  d.font("bold").fontSize(8).fillColor("#1a73e8").text(text.toUpperCase(), { characterSpacing: 0.8, lineGap: 1 });
  d.moveDown(0.15);
}

function qText(d: Doc, text: string, size = 10.5) {
  d.font("reg").fontSize(size).fillColor("#111827").text(text, { lineGap: 2.5 });
}

function note(d: Doc, text: string) {
  d.font("reg").fontSize(9.5).fillColor("#5f6368").text(text, { lineGap: 2 });
}

function option(d: Doc, text: string, correct: boolean) {
  d.font(correct ? "bold" : "reg")
    .fontSize(10)
    .fillColor(correct ? "#146c2e" : "#3c4043")
    .text(`${text}${correct ? "   [correct]" : ""}`, { lineGap: 1.5, indent: 10 });
}

function gap(d: Doc, h = 0.6) {
  d.moveDown(h);
}

function footer(d: Doc) {
  const range = d.bufferedPageRange();
  const total = range.count;
  for (let i = range.start; i < range.start + range.count; i++) {
    d.switchToPage(i);
    /* writing below the bottom margin would otherwise push a fresh blank page */
    const bottom = d.page.margins.bottom;
    d.page.margins.bottom = 0;
    d.font("reg").fontSize(8).fillColor("#9aa0a6").text(
      `Class 10 Learning Hub  ·  AI (417) Half Yearly kit  ·  page ${i + 1} of ${total}`,
      d.page.margins.left,
      d.page.height - 34,
      {
        width: d.page.width - d.page.margins.left - d.page.margins.right,
        align: "center",
        lineBreak: false,
      }
    );
    d.page.margins.bottom = bottom;
  }
}

/* ---------- 1. question paper ---------- */
function buildPaper(d: Doc) {
  head(
    d,
    "S.K. Presidency Public School · Half Yearly 2026-27",
    "Artificial Intelligence (417) — Model Question Paper",
    `Class 10  ·  Time: ${AI_HY.meta.time}  ·  Maximum Marks: ${AI_HY.meta.max}  ·  built exactly on the school blue print (21 questions, Section A 24 marks + Section B 26 marks)`
  );
  label(d, "General instructions");
  note(
    d,
    "Section A has 5 objective questions - attempt the number asked in each (4 in Q1, 5 in Q2 to Q5). Section B has 16 subjective questions - attempt Q6 to Q10 any 3, Q11 to Q16 any 4 and Q17 to Q21 any 3. Write 2-mark answers in 20-30 words and 4-mark answers in 50-80 words."
  );
  gap(d, 0.8);
  h2(d, `Section A — Objective type questions (${AI_HY.totals.sectionA} marks)`);
  AI_HY.paperA.forEach((set) => {
    gap(d, 0.4);
    d.font("bold").fontSize(11.5).fillColor("#111827").text(set.heading);
    note(d, `${set.unit}  ·  ${set.pick}`);
    gap(d, 0.2);
    shuffleItems(set.items).forEach((it, i) => {
      qText(d, `${i + 1}. ${it.q}`);
      it.o.forEach((o, oi) => option(d, `(${LETTER[oi]}) ${o}`, false));
      gap(d, 0.35);
    });
  });
  h2(d, `Section B — Subjective type questions (${AI_HY.totals.sectionB} marks)`);
  const groups: { title: string; items: typeof AI_HY.paperB.short }[] = [
    { title: "Q6 to Q10 — Answer any three (3 x 2 = 6). Answer in 20-30 words.", items: AI_HY.paperB.short },
    { title: "Q11 to Q16 — Answer any four (4 x 2 = 8). Answer in 20-30 words.", items: AI_HY.paperB.mid },
    { title: "Q17 to Q21 — Answer any three (3 x 4 = 12). Answer in 50-80 words.", items: AI_HY.paperB.long },
  ];
  groups.forEach((g) => {
    h2(d, g.title);
    g.items.forEach((q) => {
      d.font("reg").fontSize(10.5).fillColor("#111827").text(`${q.n}. ${q.q}`, { lineGap: 2.5 });
      gap(d, 0.45);
    });
  });
}

/* ---------- 2. answer key ---------- */
function buildAnswers(d: Doc) {
  head(
    d,
    "Model paper · answer key",
    "AI Half Yearly — complete answer key",
    `Every question of the model paper with the correct option, the reason and a model answer written to the blue print word limits.`
  );
  h2(d, `Section A — Objective answers (${AI_HY.totals.sectionA} marks)`);
  AI_HY.paperA.forEach((set) => {
    gap(d, 0.4);
    d.font("bold").fontSize(11.5).fillColor("#111827").text(set.heading);
    note(d, `${set.unit}  ·  ${set.pick}`);
    gap(d, 0.2);
    shuffleItems(set.items).forEach((it, i) => {
      qText(d, `${i + 1}. ${it.q}`);
      option(d, `(${LETTER[it.a]}) ${it.o[it.a]}`, true);
      note(d, `Reason: ${it.why}`);
      gap(d, 0.4);
    });
  });
  const groups: { title: string; items: typeof AI_HY.paperB.short }[] = [
    { title: "Q6 to Q10 — any three (3 x 2 = 6), 20-30 words", items: AI_HY.paperB.short },
    { title: "Q11 to Q16 — any four (4 x 2 = 8), 20-30 words", items: AI_HY.paperB.mid },
    { title: "Q17 to Q21 — any three (3 x 4 = 12), 50-80 words", items: AI_HY.paperB.long },
  ];
  groups.forEach((g) => {
    h2(d, `Section B — ${g.title}`);
    g.items.forEach((q) => {
      d.font("bold").fontSize(10.5).fillColor("#111827").text(`${q.n}. ${q.q}`, { lineGap: 2.5 });
      gap(d, 0.2);
      label(d, "Model answer");
      note(d, q.ans);
      gap(d, 0.7);
    });
  });
}

/* ---------- 3. objective practice bank ---------- */
function buildMcq(d: Doc) {
  head(
    d,
    `Section A practice · ${AI_HY_TOTAL_LINES.obq} questions`,
    "AI Half Yearly — objective practice bank",
    "Six unit-wise sets of 15 MCQs, including assertion-reason items. The correct option is printed in bold with the reason."
  );
  AI_HY_OBQ_SETS.forEach((set, si) => {
    h2(d, `${si + 1}. ${set.title}  (${set.unit})`);
    shuffleItems(set.items).forEach((it, idx) => {
      qText(d, `${set.from + idx + 1}. ${it.q}`);
      it.o.forEach((o, oi) => option(d, `(${LETTER[oi]}) ${o}`, oi === it.a));
      note(d, `Reason: ${it.why}`);
      gap(d, 0.45);
    });
  });
}

/* ---------- 4. most expected questions ---------- */
function buildExpected(d: Doc) {
  head(
    d,
    "Half yearly · most expected",
    "AI — most expected questions with answers",
    `${AI_HY_TOTAL_LINES.expected} unit-wise questions, answers sized to the marks. ${AI_HY_TOTAL_LINES.hot} questions are marked HIGHEST CHANCE.`
  );
  label(d, "Must do first — 15 of the 50 solved questions");
  AI_HY_TOP15.forEach((t) => {
    d.font("bold").fontSize(10).fillColor("#111827").text(`Q${t.ref} · ${t.q}`, { lineGap: 1.5 });
    note(d, `Why: ${t.why}`);
    gap(d, 0.35);
  });
  gap(d, 0.6);
  label(d, "Next 15 (one more day)");
  AI_HY_SECOND15.forEach((t) => {
    d.font("reg").fontSize(10).fillColor("#3c4043").text(`Q${t.ref} · ${t.q}`, { lineGap: 1.5 });
  });
  const parts = ["Part A", "Part B"];
  parts.forEach((part) => {
    h2(d, part === "Part A" ? "Part A — Employability Skills" : "Part B — AI subject");
    AI_HY.expected
      .filter((q) => q.unit.startsWith(part))
      .forEach((q) => {
        d.font("bold").fontSize(10.5).fillColor("#111827").text(`${q.n}. ${q.q}`, { lineGap: 2.5 });
        note(d, `${q.unit} · ${q.marks} marks${q.hot ? " · HIGHEST CHANCE" : ""}`);
        gap(d, 0.2);
        label(d, `Model answer (${q.marks === 4 ? "50-80" : "20-30"} words)`);
        note(d, q.ans);
        gap(d, 0.7);
      });
  });
}

/* ---------- 5. old school paper solved ---------- */
function buildOld(d: Doc) {
  head(
    d,
    "School paper · solved",
    "AI Half Yearly 2025-26 — full solution",
    `${AI_HY.oldPaper.meta.exam} · ${AI_HY.oldPaper.meta.max} · ${AI_HY.oldPaper.meta.time}. Same pattern as the 2026-27 blue print.`
  );
  note(d, AI_HY.oldPaper.meta.note);
  gap(d, 0.6);
  h2(d, "Section A — objective (24 marks), answers given");
  AI_HY.oldPaper.sectionA.forEach((q) => {
    d.font("bold").fontSize(10.5).fillColor("#111827").text(`Question ${q.n}`, { lineGap: 2 });
    qText(d, q.q);
    gap(d, 0.2);
    label(d, "Answers");
    note(d, q.ans);
    if (q.note) {
      gap(d, 0.15);
      note(d, `Note: ${q.note}`);
    }
    gap(d, 0.7);
  });
  h2(d, "Section B — subjective (26 marks), model answers");
  AI_HY.oldPaper.sectionB.forEach((q) => {
    d.font("bold").fontSize(10.5).fillColor("#111827").text(`${q.n}. ${q.q}`, { lineGap: 2.5 });
    gap(d, 0.2);
    label(d, "Model answer");
    note(d, q.ans);
    gap(d, 0.7);
  });
}

/* ---------- 6. school paper vs the 50 solved ---------- */
function buildMatch(d: Doc) {
  head(
    d,
    "School paper 2025-26 · matched with the 50 solved",
    "Which school-paper questions already exist in the 50 solved",
    "Only genuine matches are listed. The left column is the school's own paper (2025-26), the number is the question of the 50 solved list that answers the same thing."
  );
  label(d, `Matched items (${AI_PYQ_MATCH.length})`);
  AI_PYQ_MATCH.forEach((m) => {
    d.font("bold").fontSize(10.5).fillColor("#111827").text(`${m.where}: ${m.label}`, { lineGap: 2 });
    note(d, `50 solved question${m.ref.length > 1 ? "s" : ""}: ${m.ref.map((r) => "#" + r).join(", ")}${m.marks ? `  ·  ${m.marks} mark(s) in the school paper` : ""}`);
    note(d, `Why: ${m.why}`);
    gap(d, 0.45);
  });
  h2(d, `Not in the 50 solved (${AI_PYQ_NO_MATCH.length}) - study these from the 190 MCQ bank and the expected set`);
  AI_PYQ_NO_MATCH.forEach((n) => {
    d.font("reg").fontSize(10).fillColor("#111827").text(`- ${n.label}`, { lineGap: 1.5 });
    if (n.nearest) note(d, `   Nearest: ${n.nearest}`);
  });
  h2(d, "What this comparison tells you");
  AI_PYQ_INSIGHTS.forEach((t) => {
    d.font("reg").fontSize(10).fillColor("#3c4043").text(`- ${t}`, { lineGap: 2 });
    gap(d, 0.3);
  });
}

export const AI_PDF_DOCS = ["paper", "answers", "mcq", "expected", "old", "match"] as const;
export type AiPdfDoc = (typeof AI_PDF_DOCS)[number];

export function buildAiPdf(doc: string): Promise<Buffer> {
  if (!(AI_PDF_DOCS as readonly string[]).includes(doc)) {
    return Promise.reject(new Error("unknown-doc"));
  }
  const d = newDoc();
  const chunks: Buffer[] = [];
  d.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((res) => d.on("end", () => res(Buffer.concat(chunks))));
  if (doc === "paper") buildPaper(d);
  else if (doc === "answers") buildAnswers(d);
  else if (doc === "mcq") buildMcq(d);
  else if (doc === "expected") buildExpected(d);
  else if (doc === "match") buildMatch(d);
  else buildOld(d);
  footer(d);
  d.end();
  return done;
}

export const AI_PDF_TITLES: Record<string, string> = {
  paper: "AI Half Yearly Model Paper",
  answers: "AI Half Yearly Answer Key",
  mcq: "AI Objective Practice Bank",
  expected: "AI Most Expected Questions",
  old: "AI Half Yearly 2025-26 Solved",
  match: "AI School Paper vs 50 Solved",
};
