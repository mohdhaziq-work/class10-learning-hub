import type { MetadataRoute } from "next";
import { SUBJECTS, allChapterKeys } from "@/lib/syllabus";
import { PYQ_MATHS_SEO } from "@/lib/pyqSeo";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://class10-learning-hub.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/smart-board`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/pyq`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/pyq/maths`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  PYQ_MATHS_SEO.forEach((c) =>
    urls.push({
      url: `${SITE}${c.path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  SUBJECTS.forEach((s) =>
    urls.push({ url: `${SITE}/subjects/${s.id}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 })
  );

  allChapterKeys().forEach((k) =>
    urls.push({
      url: `${SITE}/chapter/${k.s}/${k.g}/${k.c}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return urls;
}
