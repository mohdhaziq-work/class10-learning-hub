import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_HY, AI_HY_TOP15, AI_HY_PDFS } from "@/lib/content/aiHy";
import { shuffleItems } from "@/lib/aiShuffle";

export const metadata: Metadata = {
  title: "Class 10 AI Half Yearly — Blue Print Model Paper (50 marks, solved)",
  description:
    "The school's AI (417) Half Yearly blue print turned into a full solved model paper: 21 questions, 2 sections, Section A objective 24 marks and Section B subjective 26 marks, with every answer and the blue print table on the page.",
  alternates: { canonical: "/important-questions/ai-blueprint" },
  openGraph: {
    title: "Class 10 AI Half Yearly — Blue Print Model Paper (50 marks)",
    description:
      "21 questions / 50 marks exactly as the school's blue print: objective Section A (24) and subjective Section B (26), fully solved, with the blue print table.",
    url: "/important-questions/ai-blueprint",
    type: "website",
  },
};

const BOARD_URL =
  "/smart-board?pdf=%2Fapi%2Fai%2Fpdf%2Fpaper&name=AI%20Half%20Yearly%20Model%20Paper&layout=split";

const LETTER = ["a", "b", "c", "d"];

export default function AIBlueprintPage() {
  const paperB = [
    ...AI_HY.paperB.short,
    ...AI_HY.paperB.mid,
    ...AI_HY.paperB.long,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "Class 10 Artificial Intelligence (417) Half Yearly - blue print model paper with answers",
            description:
              "Full solved model paper built from the school's AI Half Yearly blue print: 21 questions, 50 marks, Section A objective 24 marks and Section B subjective 26 marks, with the blue print table, unit-wise portion and a 3-day strategy.",
            url: absoluteUrl("/important-questions/ai-blueprint"),
            educationalLevel: "Class 10",
            learningResourceType: "model question paper with solutions",
            teaches: AI_HY.portion.map((p) => p.unit).join(", "),
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "Half Yearly Model Paper", path: "/important-questions/ai-blueprint" },
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
        <span className="text-ink font-semibold">Half Yearly Model Paper</span>
      </nav>

      {/* ---------- hero ---------- */}
      <div className="max-w-3xl">
        <p className="eyebrow">School blue print · AI 417 · 50 marks</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          AI Half Yearly — blue print model paper, fully solved
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          This is the school&apos;s AI blue print turned into a real paper. {AI_HY.meta.questions}{" "}
          questions, {AI_HY.meta.max} marks, {AI_HY.meta.time}: Section A objective{" "}
          {AI_HY.totals.sectionA} marks (Q1 any 4 of 6, Q2 to Q5 any 5 of 6 each) and Section B
          subjective {AI_HY.totals.sectionB} marks (Q6 to Q10 any 3 of 5, Q11 to Q16 any 4 of 6, Q17
          to Q21 any 3 of 5). Every question carries its model answer, every MCQ its correct option
          and reason, and every answer is written to the word limit printed in the blue print.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href={BOARD_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Solve it on the Smart Board
          </Link>
          <a href="/api/ai/pdf/paper" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Question paper PDF
          </a>
          <a href="/api/ai/pdf/answers" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Answer key PDF
          </a>
        </div>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-8 max-w-2xl">
          {[
            { v: `${AI_HY.meta.questions}`, l: "Questions" },
            { v: `${AI_HY.meta.max}`, l: "Marks" },
            { v: `${AI_HY.totals.sectionA}`, l: "Section A objective" },
            { v: `${AI_HY.totals.sectionB}`, l: "Section B subjective" },
          ].map((s) => (
            <div key={s.l} className="border-t-2 border-slate-900 pt-3">
              <dd className="text-[26px] font-extrabold tracking-tight leading-none">{s.v}</dd>
              <dt className="text-[12.5px] font-medium text-ink-mute mt-1.5">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- blue print table ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          The blue print, exactly as the school gave it
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          {AI_HY.totals.attempts}. Nothing has been added or removed from the pattern - the model
          paper below follows this table question by question.
        </p>
        <div className="mt-5 overflow-x-auto bg-white border border-slate-200 rounded-2xl">
          <table className="w-full text-[13.5px] min-w-[720px]">
            <thead>
              <tr className="text-left border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 font-semibold">Section</th>
                <th className="px-4 py-3 font-semibold">Unit</th>
                <th className="px-4 py-3 font-semibold">Question</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Choice</th>
                <th className="px-4 py-3 font-semibold">Marking</th>
                <th className="px-4 py-3 font-semibold text-right">Marks</th>
              </tr>
            </thead>
            <tbody>
              {AI_HY.blueprint.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="px-4 py-3 font-mono text-[12px] text-ink-mute">{r.section}</td>
                  <td className="px-4 py-3 font-medium">{r.unit}</td>
                  <td className="px-4 py-3 font-mono text-[12.5px]">{r.ques}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.type}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.given}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.per}</td>
                  <td className="px-4 py-3 text-right font-bold">{r.marks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-900">
                <td className="px-4 py-3 font-bold" colSpan={6}>
                  Grand Total
                </td>
                <td className="px-4 py-3 text-right font-extrabold">{AI_HY.meta.max}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ---------- portion ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Portion — what to study</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          {AI_HY.portion.map((p) => (
            <div key={p.unit} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-ink-mute">
                {p.part}
              </p>
              <h3 className="font-bold text-[16px] mt-1.5">{p.unit}</h3>
              <ul className="mt-3 space-y-1.5">
                {p.topics.map((t) => (
                  <li key={t} className="text-[13.5px] text-ink-soft flex gap-2">
                    <span className="text-brand-600 shrink-0 mt-[2px]">·</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Section A ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Section A — Objective type questions ({AI_HY.totals.sectionA} marks)
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          In the real paper you answer only the number asked (4 in Q1, 5 in Q2 to Q5). Here all items
          are solved, so you know the correct option for every one of them. The correct option is
          ticked in green with the reason.
        </p>

        <div className="space-y-8 mt-6">
          {AI_HY.paperA.map((set) => (
            <div key={set.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="font-bold text-[16.5px]">{set.heading}</h3>
                  <span className="font-mono text-[11.5px] text-ink-mute">{set.pick}</span>
                </div>
                <p className="text-[13px] text-ink-mute mt-1">{set.unit}</p>
              </div>
              <ol className="divide-y divide-slate-100">
                {shuffleItems(set.items).map((it, idx) => (
                  <li key={idx} className="px-5 py-4">
                    <p className="text-[14.5px] font-medium whitespace-pre-line">
                      {`${idx + 1}. ${it.q}`}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-1.5 mt-2.5">
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
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Section B ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Section B — Subjective type questions ({AI_HY.totals.sectionB} marks)
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          2-mark answers are written in 20-30 words and 4-mark answers in 50-80 words - the word
          limits printed in the blue print. Write the same amount in the exam: extra lines earn
          nothing and eat your time.
        </p>

        {[
          { title: "Q6 to Q10 — Answer any three (3 x 2 = 6), in 20-30 words", items: AI_HY.paperB.short },
          { title: "Q11 to Q16 — Answer any four (4 x 2 = 8), in 20-30 words", items: AI_HY.paperB.mid },
          { title: "Q17 to Q21 — Answer any three (3 x 4 = 12), in 50-80 words", items: AI_HY.paperB.long },
        ].map((grp) => (
          <div key={grp.title} className="mt-6">
            <h3 className="text-[15px] font-bold">{grp.title}</h3>
            <div className="mt-3 space-y-3">
              {grp.items.map((q) => (
                <details key={q.n} className="bg-white border border-slate-200 rounded-2xl p-5 open:shadow-pop">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[12px] font-bold text-brand-600 shrink-0 mt-1">
                        Q{q.n}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold leading-snug">{q.q}</p>
                        <p className="font-mono text-[11px] text-ink-mute mt-1.5">
                          {q.marks} marks · {q.tag}{" "}
                          {q.hot ? "· highest chance" : ""}
                        </p>
                      </div>
                    </div>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-mute">
                      Model answer
                    </p>
                    <p className="text-[14.5px] text-ink-soft mt-2 leading-relaxed whitespace-pre-line">
                      {q.ans}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ---------- top 15 from the 50 ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Also revise these 15 from the 50 solved questions
        </h2>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          Your teacher said about 15 questions will come from the 50 solved list. These are the 15
          with the highest chance - open the{" "}
          <Link href="/important-questions/ai" className="text-brand-600 font-semibold">
            50 solved questions
          </Link>{" "}
          for the full answers.
        </p>
        <ol className="grid sm:grid-cols-2 gap-3 mt-5">
          {AI_HY_TOP15.map((t) => (
            <li key={t.ref} className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="font-mono text-[11px] text-brand-600 font-bold">Q{t.ref} of the 50</p>
              <p className="text-[14px] font-semibold mt-1">{t.q}</p>
              <p className="text-[12.5px] text-ink-mute mt-1.5">{t.why}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- strategy ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">How to score 50/50</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          {AI_HY.strategy.map((s) => (
            <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-[15.5px]">{s.title}</h3>
              <ul className="mt-3 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="text-[13.5px] text-ink-soft flex gap-2">
                    <Icon name="check" size={14} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- downloads ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Download everything (PDF)</h2>
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          {AI_HY_PDFS.map((d) => (
            <a
              key={d.doc}
              href={`/api/ai/pdf/${d.doc}`}
              download
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lift transition flex items-start gap-3"
            >
              <Icon name="download" size={18} />
              <div>
                <p className="font-semibold text-[15px]">{d.title}</p>
                <p className="text-[13px] text-ink-mute mt-1">{d.note}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- cross links ---------- */}
      <section className="mt-14 grid sm:grid-cols-3 gap-3">
        {[
          { href: "/important-questions/ai-expected", t: "Most expected questions", s: "51 unit-wise questions with answers, plus the 15-of-50 list" },
          { href: "/important-questions/ai-mcq", t: "Objective practice bank", s: "90 MCQs with the correct option and reason" },
          { href: "/important-questions/ai-oldpaper", t: "Old half yearly solved", s: "The school's own 2025-26 paper with full answers" },
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
