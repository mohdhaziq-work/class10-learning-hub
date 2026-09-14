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

export function pyqChapterHref(key: string): string | undefined {
  return getPyqChapterByKey(key)?.path;
}
