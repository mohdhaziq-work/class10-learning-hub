import { PYQ_CHAPTERS, PYQ_MATHS } from "@/lib/content/pyq";

export interface PyqChapterSeo {
  key: string;
  n: number;
  name: string;
  unit: string;
  slug: string;
  path: string;
  count: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PYQ_MATHS_SEO: PyqChapterSeo[] = PYQ_CHAPTERS.map((c) => {
  const slug = `chapter-${c.n}-${slugify(c.name)}`;
  return {
    ...c,
    slug,
    path: `/pyq/maths/${slug}`,
    count: (PYQ_MATHS[c.key] || []).length,
  };
});

export function getPyqChapterBySlug(slug: string): PyqChapterSeo | undefined {
  return PYQ_MATHS_SEO.find((c) => c.slug === slug);
}

export function getPyqChapterByKey(key: string): PyqChapterSeo | undefined {
  return PYQ_MATHS_SEO.find((c) => c.key === key);
}


/* EduRev chapter-wise PYQ pages (external reference, opened in the board's web pane). */
export const EDUREV_MATHS: string[] = [
  "https://edurev.in/t/169340/CBSE-Previous-Year-Questions-Real-Numbers",
  "https://edurev.in/t/169355/CBSE-Previous-Year-Questions-Polynomials",
  "https://edurev.in/t/169357/CBSE-Previous-Year-Questions-Pair-of-Linear-Equations-in-Two-Variables",
  "https://edurev.in/t/169375/Previous-Year-Questions-Quadratic-Equations",
  "https://edurev.in/t/169397/Previous-Year-Questions-Arithmetic-Progressions",
  "https://edurev.in/t/169392/Previous-Year-Questions-Triangles",
  "https://edurev.in/t/169389/Previous-Year-Questions-Coordinate-Geometry",
  "https://edurev.in/t/169393/Previous-Year-Questions-Introduction-to-Trigonometry",
  "https://edurev.in/t/169398/Previous-Year-Questions-Some-Applications-Of-Trigonometry",
  "https://edurev.in/t/169399/Previous-Year-Questions-Circles",
  "https://edurev.in/t/169384/Previous-Year-Questions-Areas-Related-to-Circles",
  "https://edurev.in/t/169358/Previous-Year-Questions-Surface-Areas--Volumes",
  "https://edurev.in/t/169356/Previous-Year-Questions-Statistics",
  "https://edurev.in/t/169344/Previous-Year-Questions-Probability",
];

export function eduRevHref(chapterNumber: number): string | undefined {
  return EDUREV_MATHS[chapterNumber - 1];
}

export function eduRevBoardHref(chapterNumber: number, title: string): string | undefined {
  const u = eduRevHref(chapterNumber);
  if (!u) return undefined;
  return `/smart-board?web=${encodeURIComponent(u)}&name=${encodeURIComponent(`EduRev PYQs — Ch ${chapterNumber} ${title}`)}`;
}
export function pyqChapterHref(key: string): string | undefined {
  return getPyqChapterByKey(key)?.path;
}
