import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { PYQ_TOTAL } from "@/lib/content/pyq";
import { PYQ_MATHS_SEO } from "@/lib/pyqSeo";

export const metadata: Metadata = {
  title: "Class 10 Maths PYQs — Chapter-wise CBSE Previous Year Questions",
  description:
    "Class 10 Maths PYQs chapter-wise: real CBSE previous year questions with answers, marks-wise filter, PDF download and Smart Board solving for all 14 chapters.",
  alternates: { canonical: "/pyq/maths" },
  openGraph: {
    title: "Class 10 Maths PYQs — Chapter-wise CBSE Previous Year Questions",
    description:
      "Class 10 Maths PYQs chapter-wise with answers, PDF download and Smart Board solving for all 14 chapters.",
    url: "/pyq/maths",
    type: "website",
  },
};

export default function PyqMathsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Class 10 Maths PYQs",
            description:
              "Chapter-wise CBSE Class 10 Mathematics previous year questions with answers, PDF download and Smart Board solving.",
            url: absoluteUrl("/pyq/maths"),
            educationalLevel: "Class 10",
            teaches: PYQ_MATHS_SEO.map((c) => c.name).join(", "),
            provider: organizationJsonLd(),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Class 10 Maths PYQ Chapters",
            itemListElement: PYQ_MATHS_SEO.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Class 10 Maths Chapter ${c.n} ${c.name} PYQs`,
              url: absoluteUrl(c.path),
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "PYQs", path: "/pyq" },
            { name: "Maths", path: "/pyq/maths" },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/pyq" className="flex items-center gap-1 hover:text-black transition">PYQs</Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Maths</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">Mathematics · CBSE 2011-2026</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          Class 10 Maths PYQs
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          Chapter-wise CBSE previous year questions for Class 10 Mathematics. Every chapter includes
          real board questions, answers, year and marks tags, PDF download and Smart Board practice.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <a href="/api/pyq/pdf?ch=maths-0-0&dl=1" className="btn-g btn-g-dark text-[15px]" target="_blank" rel="noopener noreferrer">
            <Icon name="fileText" size={18} /> Sample PYQ PDF
          </a>
          <Link href="/smart-board" className="btn-g btn-g-white text-[15px]">
            <Icon name="squarePen" size={18} /> Smart Board
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-10 pb-4">
        {PYQ_MATHS_SEO.map((c) => (
          <Link key={c.key} href={c.path} className="card-g p-5 hover:shadow-lift hover:-translate-y-0.5 transition">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-ink-mute">
                Chapter {c.n} · {c.count} Qs
              </p>
              <Icon name="chevronRight" size={16} className="text-ink-mute" />
            </div>
            <h2 className="font-bold text-[16.5px] mt-1.5">{c.name}</h2>
            <p className="text-[13px] text-ink-mute mt-1">{c.unit}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8 max-w-3xl pb-10">
        <h2 className="text-2xl font-extrabold tracking-tight">How to use Maths PYQs</h2>
        <ol className="list-decimal ml-5 mt-4 space-y-2 text-[15px] text-ink-soft">
          <li>Pick the chapter you have just finished.</li>
          <li>Attempt questions without looking at the answer.</li>
          <li>Match your answer with the given solution.</li>
          <li>Download the chapter PDF for offline practice.</li>
          <li>Use Smart Board to solve questions in class.</li>
        </ol>
      </section>
    </div>
  );
}
