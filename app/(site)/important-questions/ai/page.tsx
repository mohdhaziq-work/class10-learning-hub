import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_IMPORTANT, AI_IMPORTANT_UNITS, AI_IMPORTANT_TOTAL } from "@/lib/content/ai-important";

export const metadata: Metadata = {
  title: "Class 10 AI Important Questions — 50 Long Answers (417) with Solutions",
  description:
    "CBSE Class 10 Artificial Intelligence (417) important questions with full exam-ready long answers. 50 questions covering Communication, Self-Management, ICT, AI Project Cycle, Modelling and Evaluation - free, with Smart Board practice.",
  alternates: { canonical: "/important-questions/ai" },
  openGraph: {
    title: "Class 10 AI Important Questions — 50 Long Answers (417)",
    description:
      "All 50 important long-answer questions for CBSE Class 10 AI (417) with perfect exam-ready answers, unit-wise. Free forever.",
    url: "/important-questions/ai",
    type: "website",
  },
};

const BOARD_PRACTICE_URL =
  "/smart-board?web=%2Fembed%2Fai-qa&name=AI%20Important%20Questions&layout=split";

export default function AIImportantQuestionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "Class 10 AI (417) Important Questions with Answers",
            description:
              "50 important long-answer questions for CBSE Class 10 Artificial Intelligence with full exam-ready answers, organised unit-wise.",
            url: absoluteUrl("/important-questions/ai"),
            educationalLevel: "Class 10",
            learningResourceType: "important questions with solutions",
            teaches: AI_IMPORTANT_UNITS.map((u) => u.label).join(", "),
            provider: organizationJsonLd(),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "50 Important Questions - Class 10 Artificial Intelligence",
            url: absoluteUrl("/important-questions/ai"),
            numberOfItems: AI_IMPORTANT_TOTAL,
            itemListElement: AI_IMPORTANT.map((q) => ({
              "@type": "ListItem",
              position: q.n,
              name: q.q,
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "Important Questions", path: "/important-questions/ai" },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition">
          <Icon name="home" size={15} /> Home
        </Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/subjects/ai" className="hover:text-black transition">
          Artificial Intelligence
        </Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Important Questions</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">CBSE 417 · Exam-ready answers</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          Class 10 AI Important Questions
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          All {AI_IMPORTANT_TOTAL} important long-answer questions of Artificial Intelligence (417),
          unit-wise, each with a full-marks answer - definition, explanation, examples and the
          points examiners look for. Read them here, or open the same sheet beside the whiteboard
          and practise writing answers on the Smart Board.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href={BOARD_PRACTICE_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Practise on Smart Board (split view)
          </Link>
          <Link href="/subjects/ai" className="btn-g btn-g-white text-[15px]">
            <Icon name="bot" size={18} /> AI chapters
          </Link>
        </div>
        <dl className="grid grid-cols-3 gap-5 mt-8 max-w-md">
          {[
            { v: `${AI_IMPORTANT_TOTAL}`, l: "Long answers" },
            { v: `${AI_IMPORTANT_UNITS.length}`, l: "Units covered" },
            { v: "417", l: "CBSE code" },
          ].map((s) => (
            <div key={s.l} className="border-t-2 border-slate-900 pt-3">
              <dd className="text-[28px] font-extrabold tracking-tight leading-none">{s.v}</dd>
              <dt className="text-[12.5px] font-medium text-ink-mute mt-1.5">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      {AI_IMPORTANT_UNITS.map((u) => (
        <section key={u.label} className="mt-12">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{u.label}</h2>
          <p className="font-mono text-[11.5px] text-ink-mute mt-1">
            Questions {u.from}–{u.to}
          </p>
          <div className="mt-4 space-y-3">
            {AI_IMPORTANT.filter((q) => q.n >= u.from && q.n <= u.to).map((q) => (
              <details
                key={q.n}
                className="bg-white border border-slate-200 rounded-2xl p-5 open:shadow-pop"
              >
                <summary className="flex gap-3 cursor-pointer list-none">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white grid place-items-center text-[12px] font-extrabold flex-none">
                    {q.n}
                  </span>
                  <span className="font-bold text-[15.5px] leading-snug pt-0.5">{q.q}</span>
                </summary>
                <div className="mt-4 pl-0 sm:pl-10">
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">{q.a}</p>
                  <a
                    href={`${BOARD_PRACTICE_URL}`}
                    className="inline-flex items-center gap-1.5 mt-3 text-[12.5px] font-bold text-brand-600 hover:underline"
                  >
                    <Icon name="squarePen" size={14} /> Write this answer on the Smart Board
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight">How to score full marks</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Start with the definition", "Examiners award the first mark for a correct one-line definition. Every answer below opens with one."],
            ["Explain in short sentences", "Two to four lines of explanation after the definition cover the understanding marks."],
            ["Always give an example", "Wherever the question says give an example, one real example is compulsory - most answers below include one."],
            ["End with the significance", "A closing line on importance or application secures the final mark in long answers."],
          ].map(([t, d]) => (
            <div key={t} className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="font-bold text-[14.5px]">{t}</p>
              <p className="text-[13px] text-ink-soft mt-1 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
