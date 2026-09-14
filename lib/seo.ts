export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://class10-learning-hub.onrender.com";
export const SITE_NAME = "Class 10 Learning Hub";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.svg"),
    description:
      "Free Class 10 study hub for CBSE/NCERT: smart slides, notes, quizzes, PYQs and an advanced classroom Smart Board.",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
