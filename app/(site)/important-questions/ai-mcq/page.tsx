import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_HY, AI_HY_OBQ_SETS, AI_HY_TOTAL_LINES } from "@/lib/content/aiHy";
import { shuffleItems } from "@/lib/aiShuffle";

export const metadata: Metadata = {
  title: `Class 10 AI Half Yearly — ${AI_HY_TOTAL_LINES.obq} Objective Questions with Answers (417)`,
  description: `The full objective bank for the Class 10 AI (417) half yearly - ${AI_HY_TOTAL_LINES.obq} unit-wise MCQs covering Communication, Self Management, ICT, AI Project Cycle, Modelling and Model Evaluation, each with the correct option and a one-line reason.`,
  alternates: { canonical: "/important-questions/ai-mcq" },
  openGraph: {
    title: `Class 10 AI Half Yearly — ${AI_HY_TOTAL_LINES.obq} Objective Questions with Answers`,
    description: `Section A of the AI half yearly is 24 objective marks. Practise all ${AI_HY_TOTAL_LINES.obq} MCQs unit-wise with answers and reasons.`,
    url: "/important-questions/ai-mcq",
    type: "website",
  },
};

const BOARD_URL =
  "/smart-board?pdf=%2Fapi%2Fai%2Fpdf%2Fmcq&name=AI%20Objective%20Practice%20Bank&layout=split";

const LETTER = ["a", "b", "c", "d"];

export default function AIMcqPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `Class 10 AI (417) objective practice bank - ${AI_HY_TOTAL_LINES.obq} MCQs with answers`,
            description:
              `${AI_HY_TOTAL_LINES.obq} objective questions for the AI half yearly, unit-wise, with the correct option and a one-line reason for each.`,
            url: absoluteUrl("/important-questions/ai-mcq"),
            educationalLevel: "Class 10",
            learningResourceType: "question bank with answers",
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "Objective Practice Bank", path: "/important-questions/ai-mcq" },
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
        <span className="text-ink font-semibold">Objective Practice Bank</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">Section A practice · {AI_HY_TOTAL_LINES.obq} MCQs</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          AI Half Yearly — objective practice bank
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          Section A of the paper alone is {AI_HY.totals.sectionA} marks of every unit - the cheapest
          marks in the paper. This bank has {AI_HY_TOTAL_LINES.obq} objective questions: 30 for each
          of the six units plus a 10-question rapid-fire set, including the assertion-reason type,
          each with the correct option and a one-line reason. Cover the reason, attempt the question,
          then check.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href={BOARD_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Solve on the Smart Board
          </Link>
          <a href="/api/ai/pdf/mcq" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Download PDF
          </a>
          <Link href="/important-questions/ai-blueprint" className="btn-g btn-g-white text-[15px]">
            <Icon name="fileText" size={18} /> Model paper
          </Link>
        </div>
      </div>

      <div className="space-y-10 mt-12">
        {AI_HY_OBQ_SETS.map((set, si) => (
          <section key={set.id}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {si + 1}. {set.title}
              </h2>
              <span className="font-mono text-[11.5px] text-ink-mute">
                {set.unit} · {set.items.length} questions
              </span>
            </div>
            <ol className="mt-4 space-y-3">
              {shuffleItems(set.items).map((it, idx) => (
                <li key={idx} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <p className="text-[15px] font-medium">
                    {`${set.from + idx + 1}. ${it.q}`}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-1.5 mt-3">
                    {it.o.map((opt, oi) => (
                      <p
                        key={oi}
                        className={
                          oi === it.a
                            ? "text-[13.5px] rounded-lg px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold"
                            : "text-[13.5px] rounded-lg px-3 py-1.5 text-ink-soft"
                        }
                      >
                        {`(${LETTER[oi]}) ${opt}`}
                        {oi === it.a && <span className="ml-2 font-mono text-[11px]">(correct)</span>}
                      </p>
                    ))}
                  </div>
                  <p className="text-[13px] text-ink-mute mt-2">
                    <span className="font-mono text-[11px] uppercase tracking-[.14em]">Reason </span>
                    {it.why}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-14 grid sm:grid-cols-3 gap-3">
        {[
          { href: "/important-questions/ai-blueprint", t: "Model paper", s: "The whole 50-mark paper, solved" },
          { href: "/important-questions/ai-expected", t: "Most expected questions", s: "51 unit-wise questions with answers" },
          { href: "/important-questions/ai-oldpaper", t: "Old half yearly solved", s: "The school's 2025-26 paper with answers" },
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
