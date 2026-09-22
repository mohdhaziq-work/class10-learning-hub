import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_HY, AI_HY_TOTAL_LINES } from "@/lib/content/aiHy";

export const metadata: Metadata = {
  title: "Class 10 AI Half Yearly 2025-26 (old school paper) — full solved",
  description:
    "The school's own AI (417) half yearly paper of 2025-26, solved question by question: Section A objective 24 marks with the correct option, Section B subjective 26 marks with model answers.",
  alternates: { canonical: "/important-questions/ai-oldpaper" },
  openGraph: {
    title: "Class 10 AI Half Yearly 2025-26 — full solved paper",
    description:
      "Every question of the school's last AI half yearly paper, with the correct MCQ option and 20-30 / 50-80 word model answers.",
    url: "/important-questions/ai-oldpaper",
    type: "website",
  },
};

const BOARD_URL =
  "/smart-board?pdf=%2Fapi%2Fai%2Fpdf%2Fold&name=AI%20Old%20Half%20Yearly%20Solved&layout=split";

export default function AIOldPaperPage() {
  const { meta, sectionA, sectionB } = AI_HY.oldPaper;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "Class 10 AI (417) half yearly 2025-26 school paper - solved",
            description:
              "The school's own AI half yearly paper of 2025-26 with every question answered - Section A objective 24 marks and Section B subjective 26 marks.",
            url: absoluteUrl("/important-questions/ai-oldpaper"),
            educationalLevel: "Class 10",
            learningResourceType: "solved question paper",
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "Old Half Yearly Solved", path: "/important-questions/ai-oldpaper" },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4 flex-wrap">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition">
          <Icon name="home" size={15} /> Home
        </Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/subjects/ai" className="hover:text-black transition">
          Artificial Intelligence
        </Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Old Half Yearly Solved</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">{meta.exam} · {meta.max} · {meta.time}</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          AI Half Yearly 2025-26 — the school&apos;s own paper, fully solved
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          Last year&apos;s paper is the best sample of what this school actually asks - and it follows
          the same pattern as the new blue print. All {AI_HY_TOTAL_LINES.old} questions are here with
          the correct MCQ option and a model answer. {meta.note}
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href={BOARD_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Open solved paper on the Smart Board
          </Link>
          <a href="/api/ai/pdf/old" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Download PDF
          </a>
          <Link href="/important-questions/ai-blueprint" className="btn-g btn-g-white text-[15px]">
            <Icon name="fileText" size={18} /> New blue print model paper
          </Link>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Section A — Objective type questions (24 marks)
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          The blue print for 2026-27 covers Part A Units 1-3, but this paper also asked questions from
          Entrepreneurial Skills and Green Skills (Part A Units 4-5). That is why the expected
          questions page also keeps a safety net on entrepreneurship and sustainable development.
        </p>
        <div className="mt-5 space-y-4">
          {sectionA.map((q) => (
            <div key={q.n} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="font-mono text-[12px] font-bold text-brand-600">Question {q.n}</p>
              <p className="text-[14.5px] font-medium mt-2 whitespace-pre-line leading-relaxed">{q.q}</p>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-mute">Answers</p>
                <p className="text-[14px] text-ink-soft mt-2 whitespace-pre-line leading-relaxed">{q.ans}</p>
                {q.note && (
                  <p className="text-[12.5px] text-ink-mute mt-2">
                    <span className="font-mono text-[11px] uppercase tracking-[.14em]">Note </span>
                    {q.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Section B — Subjective type questions (26 marks)
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          Q6 to Q10 - answer any three, 20-30 words. Q11 to Q16 - answer any four, 20-30 words. Q17 to
          Q21 - answer any three, 50-80 words. Sample questions answered below in exactly that length.
        </p>
        <div className="mt-5 space-y-3">
          {sectionB.map((q) => (
            <details key={q.n} className="bg-white border border-slate-200 rounded-2xl p-5 open:shadow-pop">
              <summary className="cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[12px] font-bold text-brand-600 shrink-0 mt-1">Q{q.n}</span>
                  <p className="text-[15px] font-semibold leading-snug whitespace-pre-line">{q.q}</p>
                </div>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-mute">
                  Model answer
                </p>
                <p className="text-[14.5px] text-ink-soft mt-2 leading-relaxed">{q.ans}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 grid sm:grid-cols-3 gap-3">
        {[
          { href: "/important-questions/ai-blueprint", t: "Model paper (2026-27)", s: "The new blue print, solved - 21 questions, 50 marks" },
          { href: "/important-questions/ai-mcq", t: "Objective practice bank", s: "90 MCQs unit-wise with answers" },
          { href: "/important-questions/ai", t: "50 solved questions", s: "The long answer bank your teacher referred to" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lift transition"
          >
            <p className="font-bold text-[15px]">{l.t}</p>
            <p className="text-[13px] text-ink-mute mt-1">{l.s}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-brand-600">
              Open <Icon name="arrowUpRight" size={14} />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
