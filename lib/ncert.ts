/* Official NCERT chapter PDFs (ncert.nic.in/textbook/pdf, Reprint 2026-27).
   Every filename below was verified HTTP 200 and title-checked (Sep 2026).
   Key: "<subject>-<group>-<chapter>" (0-based, same as chapterKey).
   A chapter with NO entry has no official chapter PDF (removed from the
   rationalised book) — the UI simply hides the NCERT buttons for it. */

export const NCERT_BASE = "https://ncert.nic.in/textbook/pdf";

const pad = (n: number) => String(n).padStart(2, "0");
const MAP: Record<string, string> = {};
const seq = (key: (i: number) => string, prefix: string, count: number) => {
  for (let i = 0; i < count; i++) MAP[key(i)] = `${prefix}${pad(i + 1)}.pdf`;
};

/* Sequential books */
seq((i) => `maths-0-${i}`, "jemh1", 14); // Real Numbers … Probability
seq((i) => `science-0-${i}`, "jesc1", 13); // Chemical Reactions … Our Environment
seq((i) => `sst-0-${i}`, "jess3", 5); // History (incl. Industrialisation)
seq((i) => `sst-1-${i}`, "jess1", 7); // Geography
seq((i) => `sst-2-${i}`, "jess4", 5); // Civics = jess4
seq((i) => `sst-3-${i}`, "jess2", 5); // Economics = jess2 (incl. Consumer Rights)
seq((i) => `english-0-${i}`, "jeff1", 9); // First Flight prose → unit N
seq((i) => `english-2-${i}`, "jefp1", 9); // Footprints Without Feet

/* First Flight poetry → unit PDF that contains the poem.
   (Animals was removed from the book — no entry for english-1-6.) */
const POEMS: Record<number, string> = {
  0: "jeff101.pdf", 1: "jeff101.pdf", 2: "jeff102.pdf", 3: "jeff103.pdf",
  4: "jeff103.pdf", 5: "jeff104.pdf", 7: "jeff105.pdf", 8: "jeff106.pdf",
  9: "jeff107.pdf", 10: "jeff108.pdf",
};
for (const [c, f] of Object.entries(POEMS)) MAP[`english-1-${c}`] = f;

/* Kshitij (current book: poetry 101–106, prose 107–112) */
MAP["hindi-0-0"] = "jhks107.pdf";
MAP["hindi-0-1"] = "jhks108.pdf";
MAP["hindi-0-2"] = "jhks109.pdf";
MAP["hindi-1-0"] = "jhks101.pdf";
MAP["hindi-1-1"] = "jhks102.pdf";
MAP["hindi-1-2"] = "jhks103.pdf";
MAP["hindi-1-3"] = "jhks104.pdf";
MAP["hindi-1-4"] = "jhks105.pdf";

/* Kritika (current book: 3 chapters) */
MAP["hindi-2-0"] = "jhkr101.pdf";
MAP["hindi-2-2"] = "jhkr102.pdf";
MAP["hindi-2-3"] = "jhkr103.pdf";

export interface NcertPdf {
  file: string;
  direct: string;
  name: string;
}

/** Official NCERT PDF for a chapter, or null when the book has none. */
export function ncertPdf(key: string, chapterTitle: string): NcertPdf | null {
  const file = MAP[key];
  if (!file) return null;
  return {
    file,
    direct: `${NCERT_BASE}/${file}`,
    name: `${chapterTitle} (NCERT).pdf`,
  };
}

/** Smart Board deep-link that auto-loads this chapter's PDF. */
export function boardHref(key: string, chapterTitle: string): string | null {
  const p = ncertPdf(key, chapterTitle);
  if (!p) return null;
  return `/smart-board?pdf=${encodeURIComponent(p.direct)}&name=${encodeURIComponent(p.name)}`;
}
