import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { PYQ_TOTAL } from "@/lib/content/pyq";
import { BoardPapersSection } from "@/components/pyq/BoardPapersSection";
import { BOARD_EXAMS } from "@/lib/content/board-papers";
import { PYQ_MATHS_SEO, getPyqChapterByKey } from "@/lib/pyqSeo";
import { SUBJECTS } from "@/lib/syllabus";

export const metadata: Metadata = {
  title: "Class 10 PYQs — CBSE Previous Year Questions Chapter-wise",
  description:
    "Free Class 10 PYQs: CBSE board previous year questions chapter-wise with answers, PDF download and Smart Board solving - plus official Class 10 board papers 2022-2026, all sets including compartment exams.",
  alternates: { canonical: "/pyq" },
  openGraph: {
    title: "Class 10 PYQs — CBSE Previous Year Questions Chapter-wise",
    description:
      "Free Class 10 PYQs: CBSE board previous year questions chapter-wise with answers, PDF download and Smart Board solving.",
    url: "/pyq",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What are Class 10 PYQs?",
    a: "PYQs are Previous Year Questions asked in the CBSE Class 10 board exam. Practising them chapter-wise helps you understand the exam pattern, repeated concepts and marks distribution.",
  },
  {
    q: "Are these Class 10 Maths PYQs chapter-wise?",
    a: "Yes. Every Maths chapter has its own PYQ page with real board questions, year tags, marks tags, answers, PDF download and Smart Board solving.",
  },
  {
    q: "Can I download Class 10 PYQ PDFs?",
    a: "Yes. Each chapter page has a Download PDF button. You can download the full chapter PYQ set or a single question PDF.",
  },
  {
    q: "Which years are covered?",
    a: "The current Maths PYQ bank covers CBSE board questions from 2011 to 2026, including recent board papers and classic repeated questions.",
  },
  {
    q: "Is this free?",
    a: "Yes. Class 10 Learning Hub is free forever, with no login required.",
  },
  {
    q: "Where can I download official Class 10 board papers with all sets?",
    a: "This page links the official CBSE Class X papers (2022-2026) directly from cbse.gov.in - every set of every year, including Compartment and Second Board exams. For 2011-2021, we link the same official papers archived year-wise with all sets.",
  },
];

export default function PyqPage({
  searchParams,
}: {
  searchParams?: { ch?: string };
}) {
  const legacy = searchParams?.ch ? getPyqChapterByKey(searchParams.ch) : undefined;
  if (legacy) redirect(legacy.path);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "Class 10 PYQs — CBSE Previous Year Questions",
            url: absoluteUrl("/pyq"),
            description:
              "Free Class 10 PYQs: CBSE board previous year questions chapter-wise with answers, marks-wise filter, PDF download and Smart Board solving.",
            educationalLevel: "Class 10",
            learningResourceType: ["previous year questions", "board exam practice"],
            provider: organizationJsonLd(),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Class 10 Maths PYQ Chapters",
            url: absoluteUrl("/pyq/maths"),
            itemListElement: PYQ_MATHS_SEO.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Class 10 Maths Chapter ${c.n} ${c.name} PYQs`,
              url: absoluteUrl(c.path),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Official CBSE Class X Board Papers 2022-2026 (all sets, main + compartment)",
            url: absoluteUrl("/pyq"),
            itemListElement: BOARD_EXAMS.map((ex, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${ex.title}${ex.kind === "compartment" ? " — Compartment" : ""}`,
              url: absoluteUrl("/pyq"),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "PYQs", path: "/pyq" },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition">
          <Icon name="home" size={15} /> Home
        </Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">PYQs</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">CBSE Board Exam Practice</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          Class 10 PYQs — Previous Year Questions
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          Practise real CBSE board questions chapter-wise. Each PYQ page includes the question,
          year, marks, answer, PDF download and one-click Smart Board solving. No login, free forever.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href="/pyq/maths" className="btn-g btn-g-dark text-[15px]">
            <Icon name="calculator" size={18} /> Class 10 Maths PYQs
          </Link>
          <Link href="/smart-board" className="btn-g btn-g-white text-[15px]">
            <Icon name="squarePen" size={18} /> Open Smart Board
          </Link>
        </div>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-8 max-w-xl">
          {[
            { v: `${PYQ_TOTAL}`, l: "Maths PYQs" },
            { v: "14", l: "Maths chapters" },
            { v: "2011-26", l: "Board years" },
            { v: "PDF", l: "Download" },
          ].map((s) => (
            <div key={s.l} className="border-t-2 border-slate-900 pt-3">
              <dd className="text-[28px] font-extrabold tracking-tight leading-none">{s.v}</dd>
              <dt className="text-[12.5px] font-medium text-ink-mute mt-1.5">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      <BoardPapersSection />

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight">Class 10 Maths chapter-wise PYQs</h2>
        <p className="text-ink-soft mt-2 max-w-3xl text-[15px]">
          Open a chapter to see its full PYQ bank. Search terms like “Class 10 Maths PYQs”,
          “Class 10 chapter wise PYQ”, “Maths previous year questions” and “CBSE Class 10 PYQ PDF”
          all lead to these chapter pages.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {PYQ_MATHS_SEO.map((c) => (
            <Link
              key={c.key}
              href={c.path}
              className="card-g p-5 hover:shadow-lift hover:-translate-y-0.5 transition"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-ink-mute">
                Chapter {c.n} · {c.count} questions
              </p>
              <h3 className="font-bold text-[16px] mt-1.5">{c.name}</h3>
              <p className="text-[13px] text-ink-mute mt-1">{c.unit}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight">Every subject, chapter-wise PYQs</h2>
        <p className="text-ink-soft mt-2 max-w-3xl text-[15px]">
          Maths has a full built-in PYQ bank. Science, Social Science, English and Hindi open
          chapter-wise CBSE PYQ pages inside the Smart Board reading pane (via EduRev) with the
          whiteboard side-by-side for solving.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {SUBJECTS.filter((x) => x.id !== "ai").map((sub) => {
            const chapters = sub.groups.reduce((a, g) => a + g.chapters.length, 0);
            return (
              <Link key={sub.id} href={sub.id === "maths" ? "/pyq/maths" : `/subjects/${sub.id}`} className="pyq-sub group">
                <span className="pyq-sub-ic" style={{ color: sub.color }}><Icon name={sub.icon} size={22} /></span>
                <h3 className="font-bold text-[16px] mt-3">{sub.name}</h3>
                <p className="text-[12.5px] text-ink-mute mt-1">{chapters} chapters · PYQs in Smart Board</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-brand-600">
                  {sub.id === "maths" ? "Open PYQ bank" : "Open chapters"} <Icon name="arrowUpRight" size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight">PYQ FAQs</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="bg-white border border-slate-200 rounded-2xl p-4 open:shadow-pop">
              <summary className="font-bold text-[15px] cursor-pointer">{f.q}</summary>
              <p className="text-[14px] text-ink-soft mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
