// Official CBSE Class X board papers (full papers, all sets) —
// direct links to cbse.gov.in downloads for 2022–2026 (Main + Compartment),
// plus subject-wise archive mirrors for 2011–2021.

const BASE = "https://www.cbse.gov.in/cbsenew/";

export interface PaperEntry {
  label: string; // e.g. "Mathematics Standard"
  url: string; // absolute
  kind: "zip" | "pdf";
}

export interface BoardExam {
  year: number;
  kind: "main" | "compartment";
  title: string;
  // key => entries (most subjects have exactly one entry)
  papers: Record<string, PaperEntry>;
}

type Row = [key: string, label: string, rel: string];

const e = (label: string, rel: string): PaperEntry => ({
  label,
  url: BASE + rel,
  kind: rel.endsWith(".pdf") ? "pdf" : "zip",
});

function exam(year: number, kind: "main" | "compartment", title: string, rows: Row[]): BoardExam {
  const papers: Record<string, PaperEntry> = {};
  for (const [key, label, rel] of rows) papers[key] = e(label, rel);
  return { year, kind, title, papers };
}

export const BOARD_EXAMS: BoardExam[] = [
  exam(2026, "main", "Class X Examination 2026", [
    ["maths", "Mathematics Basic & Standard (all sets)", "question-paper/2026/X/Mathematics_Standard.zip"],
    ["science", "Science (all sets)", "question-paper/2026/X/Science.zip"],
    ["sst", "Social Science (all sets)", "question-paper/2026/X/Social_Science.zip"],
    ["english", "English Language & Literature (all sets)", "question-paper/2026/X/English_Language_Literature.zip"],
    ["englishComm", "English Communicative (all sets)", "question-paper/2026/X/English_communicative.zip"],
    ["hindi", "Hindi Course B (all sets)", "question-paper/2026/X/Hindi_Course_B_UPD.zip"],
    ["hindiA", "Hindi Course A (all sets)", "question-paper/2026/X/Hindi_Course_A_UPD.zip"],
  ]),
  exam(2026, "compartment", "Class X Second Board Examination 2026", [
    ["maths", "Mathematics Standard", "question-paper/2026-COMPTT/Second_Board_X/Mathmatics_Std.zip"],
    ["mathsBasic", "Mathematics Basic", "question-paper/2026-COMPTT/Second_Board_X/Mathmatics_Basic.zip"],
    ["science", "Science", "question-paper/2026-COMPTT/Second_Board_X/Science.zip"],
    ["sst", "Social Science", "question-paper/2026-COMPTT/Second_Board_X/Social_Science.zip"],
    ["english", "English Literature", "question-paper/2026-COMPTT/Second_Board_X/English_L_&_L.zip"],
    ["englishComm", "English Communicative", "question-paper/2026-COMPTT/Second_Board_X/English_Comm.zip"],
    ["hindi", "Hindi Course B", "question-paper/2026-COMPTT/Second_Board_X/Hindi_Coursse_B.zip"],
    ["hindiA", "Hindi Course A", "question-paper/2026-COMPTT/Second_Board_X/Hindi_Coursse_A.zip"],
  ]),
  exam(2025, "main", "Class X Examination 2025", [
    ["maths", "Mathematics Standard (all sets)", "question-paper/2025/X/041_Mathematics_Standard.zip"],
    ["mathsBasic", "Mathematics Basic (all sets)", "question-paper/2025/X/241_Mathematics_Basic.zip"],
    ["science", "Science (all sets)", "question-paper/2025/X/086_Science.zip"],
    ["sst", "Social Science (all sets)", "question-paper/2025/X/087_Social_Science.zip"],
    ["english", "English Language & Literature (all sets)", "question-paper/2025/X/184_English_Language_and_Literature.zip"],
    ["englishComm", "English Communicative (all sets)", "question-paper/2025/X/1_eng_communicative.pdf"],
    ["hindi", "Hindi Course B (all sets)", "question-paper/2025/X/085_Hindi_Course_B.zip"],
    ["hindiA", "Hindi Course A (all sets)", "question-paper/2025/X/002_Hindi_Course_A.zip"],
  ]),
  exam(2025, "compartment", "Class X Compartment Examination 2025", [
    ["maths", "Mathematics Standard", "question-paper/2025-COMPTT/X/Maths_Standard.zip"],
    ["mathsBasic", "Mathematics Basic", "question-paper/2025-COMPTT/X/Maths_Basic.zip"],
    ["science", "Science", "question-paper/2025-COMPTT/X/Science.zip"],
    ["sst", "Social Science", "question-paper/2025-COMPTT/X/Social_Science.zip"],
    ["english", "English Literature", "question-paper/2025-COMPTT/X/English_L&L.zip"],
    ["englishComm", "English Communicative", "question-paper/2025-COMPTT/X/English_Communicative.zip"],
    ["hindi", "Hindi Course B", "question-paper/2025-COMPTT/X/Hindi_Course_B.zip"],
    ["hindiA", "Hindi Course A", "question-paper/2025-COMPTT/X/Hindi_Course_A.zip"],
  ]),
  exam(2024, "main", "Class X Examination 2024", [
    ["maths", "Mathematics Standard (all sets)", "question-paper/2024/X/MATHEMATICS_STANDARD.zip"],
    ["mathsBasic", "Mathematics Basic (all sets)", "question-paper/2024/X/MATHEMATICS_BASIC.zip"],
    ["science", "Science (all sets)", "question-paper/2024/X/SCIENCE.zip"],
    ["sst", "Social Science (all sets)", "question-paper/2024/X/SOCIAL_SCIENCE.zip"],
    ["english", "English Literature (all sets)", "question-paper/2024/X/ENGLISH_L&L.zip"],
    ["englishComm", "English Communicative (all sets)", "question-paper/2024/X/English_Communicative.zip"],
    ["hindi", "Hindi Course B (all sets)", "question-paper/2024/X/HINDI_B.zip"],
    ["hindiA", "Hindi Course A (all sets)", "question-paper/2024/X/HINDI_A.zip"],
  ]),
  exam(2024, "compartment", "Class X Compartment Examination 2024", [
    ["maths", "Mathematics Standard", "question-paper/2024-COMPTT/X/MATHEMATICS_STANDARD.zip"],
    ["mathsBasic", "Mathematics Basic", "question-paper/2024-COMPTT/X/MATHEMATICS_BASIC.zip"],
    ["science", "Science", "question-paper/2024-COMPTT/X/SCIENCE.zip"],
    ["sst", "Social Science", "question-paper/2024-COMPTT/X/SOCIAL_SCIENCE.zip"],
    ["english", "English Literature", "question-paper/2024-COMPTT/X/ENGLISH_L&L.zip"],
    ["englishComm", "English Communicative", "question-paper/2024-COMPTT/X/English_Communitive.zip"],
    ["hindi", "Hindi Course B", "question-paper/2024-COMPTT/X/HINDI_B.zip"],
    ["hindiA", "Hindi Course A", "question-paper/2024-COMPTT/X/HINDI_A.zip"],
  ]),
  exam(2023, "main", "Class X Examination 2023", [
    ["maths", "Mathematics Standard (all sets)", "question-paper/2023/X/MATHEMATICS_STANDARD.zip"],
    ["mathsBasic", "Mathematics Basic (all sets)", "question-paper/2023/X/MATHEMATICS_BASIC.zip"],
    ["science", "Science (all sets)", "question-paper/2023/X/SCIENCE.zip"],
    ["sst", "Social Science (all sets)", "question-paper/2023/X/SOCIAL_SCIENCE.zip"],
    ["english", "English Language & Literature (all sets)", "question-paper/2023/X/English_Language_Literature.zip"],
    ["hindi", "Hindi Course B (all sets)", "question-paper/2023/X/HINDI_B.zip"],
    ["hindiA", "Hindi Course A (all sets)", "question-paper/2023/X/HINDI_A.zip"],
  ]),
  exam(2023, "compartment", "Class X Compartment Examination 2023", [
    ["maths", "Mathematics Standard", "question-paper/2023-COMPTT/X/Maths_Standard.zip"],
    ["mathsBasic", "Mathematics Basic", "question-paper/2023-COMPTT/X/Maths_Basic.zip"],
    ["science", "Science", "question-paper/2023-COMPTT/X/Science.zip"],
    ["sst", "Social Science", "question-paper/2023-COMPTT/X/Social_Science.zip"],
    ["english", "English Literature", "question-paper/2023-COMPTT/X/English_Lan_Lit.zip"],
    ["hindi", "Hindi Course B", "question-paper/2023-COMPTT/X/Hindi_B.zip"],
    ["hindiA", "Hindi Course A", "question-paper/2023-COMPTT/X/Hindi_A.zip"],
  ]),
  exam(2022, "main", "Class X Examination 2022", [
    ["maths", "Mathematics Standard (all sets)", "question-paper/2022/X/Math_S.zip"],
    ["mathsBasic", "Mathematics Basic (all sets)", "question-paper/2022/X/Math_B.zip"],
    ["science", "Science (all sets)", "question-paper/2022/X/Scince.zip"],
    ["sst", "Social Science (all sets)", "question-paper/2022/X/SST.zip"],
    ["english", "English Language & Literature (all sets)", "question-paper/2022/X/English_&_Lit.zip"],
    ["hindi", "Hindi Course B (all sets)", "question-paper/2022/X/Hindi_B.zip"],
    ["hindiA", "Hindi Course A (all sets)", "question-paper/2022/X/Hindi_A.zip"],
  ]),
  exam(2022, "compartment", "Class X Compartment Examination 2022", [
    ["maths", "Mathematics Standard", "question-paper/2022-COMPTT/X/MATHEMATICS_STD.zip"],
    ["mathsBasic", "Mathematics Basic", "question-paper/2022-COMPTT/X/MATHEMATICS_BASIC.zip"],
    ["science", "Science", "question-paper/2022-COMPTT/X/SCIENCE.zip"],
    ["sst", "Social Science", "question-paper/2022-COMPTT/X/SOCIAL_SCIENCE.zip"],
    ["english", "English Literature", "question-paper/2022-COMPTT/X/English_language_and_Literature.zip"],
    ["hindi", "Hindi Course B", "question-paper/2022-COMPTT/X/HINDI-B.zip"],
    ["hindiA", "Hindi Course A", "question-paper/2022-COMPTT/X/HINDI_A.zip"],
  ]),
];

// Subject tabs and which paper keys each tab collects.
export const BOARD_SUBJECT_TABS: { id: string; label: string; keys: string[] }[] = [
  { id: "maths", label: "Mathematics", keys: ["maths", "mathsBasic"] },
  { id: "science", label: "Science", keys: ["science"] },
  { id: "sst", label: "Social Science", keys: ["sst"] },
  { id: "english", label: "English", keys: ["english", "englishComm"] },
  { id: "hindi", label: "Hindi", keys: ["hindi", "hindiA"] },
];

// 2011–2021: CBSE removed its own archive for these years, so we link the
// official papers mirrored year-wise (with all sets) on EduRev's Past Year Papers course.
export const LEGACY_BOARD_SUBJECT_LINKS: { id: string; label: string; url: string }[] = [
  { id: "maths", label: "Mathematics", url: "https://edurev.in/courses/16540_Past-Year-Papers-For-Class-10?chapter=16542" },
  { id: "science", label: "Science", url: "https://edurev.in/courses/16540_Past-Year-Papers-For-Class-10?chapter=16541" },
  { id: "sst", label: "Social Science", url: "https://edurev.in/courses/16540_Past-Year-Papers-For-Class-10?chapter=16544" },
  { id: "english", label: "English", url: "https://edurev.in/courses/16540_Past-Year-Papers-For-Class-10?chapter=16543" },
  { id: "hindi", label: "Hindi", url: "https://edurev.in/courses/16540_Past-Year-Papers-For-Class-10?chapter=16545" },
];

export const BOARD_OFFICIAL_INDEX_URL = "https://www.cbse.gov.in/cbsenew/question-paper.html";
