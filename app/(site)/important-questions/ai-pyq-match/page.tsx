import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_PYQ_MATCH, AI_PYQ_NO_MATCH, AI_PYQ_INSIGHTS } from "@/lib/content/aiHyPyqMatch";
import { AI_OLD_PAPER_META } from "@/lib/content/aiHyOldPaper";

export const metadata: Metadata = {
  title: "AI Half Yearly — school paper 2025-26 questions that match the 50 solved",
  description:
    "Question-by-question match between the school's own AI (417) half yearly paper of 2025-26 and the teacher's 50 solved questions: which school-paper questions are already covered, and which topics are not in the 50 at all.",
  alternates: { canonical: "/important-questions/ai-pyq-match" },
  openGraph: {
    title: "School paper vs the 50 solved questions — AI Half Yearly",
    description:
      "The school's 2025-26 AI paper questions matched one by one with the 50 solved questions, plus the topics the school asks that are not in the 50.",
    url: "/important-questions/ai-pyq-match",
    type: "website",
  },
};

const BOARD_URL =
  "/smart-board?pdf=%2Fapi%2Fai%2Fpdf%2Fmatch&name=AI%20School%20Paper%20vs%2050%20Solved&layout=split";

export default function AIPyqMatchPage() {
  const matched34 = new Set<number>();
  AI_PYQ_MATCH.forEach((m) => m.ref.forEach((r) => matched34.add(r)));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "AI half yearly - school paper questions matched with the 50 solved questions",
            description:
              "Every question of the school's own AI (417) half yearly paper of 2025-26 that already exists in the teacher's 50 solved questions, plus the topics the school asks that are not in that list.",
            url: absoluteUrl("/important-questions/ai-pyq-match"),
            educationalLevel: "Class 10",
            learningResourceType: "exam preparation sheet",
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "School paper vs 50 solved", path: "/important-questions/ai-pyq-match" },
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
        <span className="text-ink font-semibold">School paper vs 50 solved</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">{AI_OLD_PAPER_META.exam} · matched with the 50 solved</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          School paper ke jo questions 50 solved me already hain
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          The school&apos;s own AI half yearly paper (2025-26) was compared question by question
          with the teacher&apos;s 50 solved questions. Only genuine matches are listed - where the
          school asks the same thing, the number of the 50 is given so you revise the right answer
          from there. Everything that was <span className="font-semibold text-ink">not</span> found
          in the 50 is listed below that, with the nearest question where one exists.
        </p>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-8 max-w-2xl">
          {[
            { v: `${AI_PYQ_MATCH.length}`, l: "Matched items" },
            { v: `${matched34.size}`, l: "Of the 50 covered" },
            { v: `${AI_PYQ_NO_MATCH.length}`, l: "Not in the 50" },
            { v: "21", l: "School paper questions" },
          ].map((s) => (
            <div key={s.l} className="border-t-2 border-slate-900 pt-3">
              <dd className="text-[26px] font-extrabold tracking-tight leading-none">{s.v}</dd>
              <dt className="text-[12.5px] font-medium text-ink-mute mt-1.5">{s.l}</dt>
            </div>
          ))}
        </dl>
        <div className="flex gap-3 mt-6 flex-wrap">
          <a href="/api/ai/pdf/match" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Download this list (PDF)
          </a>
          <Link href={BOARD_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Open on the Smart Board
          </Link>
          <Link href="/important-questions/ai" className="btn-g btn-g-white text-[15px]">
            <Icon name="fileText" size={18} /> The 50 solved questions
          </Link>
        </div>
      </div>

      {/* ---------- matched table ---------- */}
      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Matched: school paper → 50 solved
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          Each row says where it came in the school paper, what was asked, and which numbers of the
          50 solved questions answer it. Marks in the school paper are shown so you know how big the
          match is.
        </p>
        <div className="mt-5 overflow-x-auto bg-white border border-slate-200 rounded-2xl">
          <table className="w-full text-[13.5px] min-w-[760px]">
            <thead>
              <tr className="text-left border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 font-semibold">In the school paper</th>
                <th className="px-4 py-3 font-semibold">What was asked</th>
                <th className="px-4 py-3 font-semibold">Marks</th>
                <th className="px-4 py-3 font-semibold">50-solved question</th>
                <th className="px-4 py-3 font-semibold">Why it matches</th>
              </tr>
            </thead>
            <tbody>
              {AI_PYQ_MATCH.map((m, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-4 py-3 font-mono text-[12px] text-ink-mute whitespace-nowrap">{m.where}</td>
                  <td className="px-4 py-3 font-medium">{m.label}</td>
                  <td className="px-4 py-3 text-ink-soft">{m.marks || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="flex flex-wrap gap-1.5">
                      {m.ref.map((r) => (
                        <Link
                          key={r}
                          href="/important-questions/ai"
                          className="font-mono text-[11.5px] font-bold text-brand-600 border border-brand-100 bg-brand-50 rounded-md px-1.5 py-0.5"
                        >
                          #{r}
                        </Link>
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{m.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- not in the 50 ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          The school asked these, but they are NOT in the 50 solved
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          Nothing was invented for these - they simply do not appear in the 50 solved list. Where a
          closely related question exists, its number is written; otherwise the topic is covered in
          the 190-question MCQ bank and the most expected set.
        </p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {AI_PYQ_NO_MATCH.map((n, i) => (
            <li key={i} className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-[14px] font-medium">{n.label}</p>
              {n.nearest && (
                <p className="text-[12.5px] text-ink-mute mt-1.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[.14em]">Nearest </span>
                  {n.nearest}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- insights ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          What this comparison tells you
        </h2>
        <div className="mt-5 space-y-3">
          {AI_PYQ_INSIGHTS.map((t, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-3">
              <Icon name="info" size={17} />
              <p className="text-[14.5px] text-ink-soft leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- cross links ---------- */}
      <section className="mt-14 grid sm:grid-cols-3 gap-3">
        {[
          { href: "/important-questions/ai-oldpaper", t: "Old paper solved", s: "All 21 questions of the school's 2025-26 paper with answers" },
          { href: "/important-questions/ai", t: "50 solved questions", s: "The full long-answer bank, unit-wise" },
          { href: "/important-questions/ai-blueprint", t: "Blue print model paper", s: "The 2026-27 paper, fully solved" },
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
