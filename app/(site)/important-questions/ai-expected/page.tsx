import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { AI_HY, AI_HY_TOP15, AI_HY_SECOND15, AI_HY_TOTAL_LINES, AI_HY_PDFS } from "@/lib/content/aiHy";

export const metadata: Metadata = {
  title: "Class 10 AI Half Yearly — Most Expected Questions with Answers (417)",
  description:
    "Most expected AI (417) Half Yearly questions with model answers: 51 questions across Communication, Self Management, ICT, AI Project Cycle, Modelling and Model Evaluation, plus the 15 most likely questions from the 50 solved list.",
  alternates: { canonical: "/important-questions/ai-expected" },
  openGraph: {
    title: "Class 10 AI Half Yearly — Most Expected Questions",
    description:
      "51 unit-wise expected questions with mark-sized answers, the top-15 shortlist from the 50 solved questions, and a 3-day revision plan for the AI half yearly.",
    url: "/important-questions/ai-expected",
    type: "website",
  },
};

const BOARD_URL =
  "/smart-board?pdf=%2Fapi%2Fai%2Fpdf%2Fexpected&name=AI%20Most%20Expected%20Questions&layout=split";

/* group the expected questions by their unit string, keeping the order they appear in */
function groupUnits(part: string) {
  const list = AI_HY.expected.filter((q) => q.unit.startsWith(part));
  const map: { unit: string; qs: typeof list }[] = [];
  list.forEach((q) => {
    const found = map.find((m) => m.unit === q.unit);
    if (found) found.qs.push(q);
    else map.push({ unit: q.unit, qs: [q] });
  });
  return map;
}

export default function AIExpectedPage() {
  const parts = ["Part A", "Part B"];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: "Class 10 AI (417) Half Yearly - most expected questions with answers",
            description:
              "Most expected questions for the Class 10 AI half yearly, unit-wise, with model answers sized to the marks, the top-15 shortlist from the 50 solved questions, and a 3-day revision plan.",
            url: absoluteUrl("/important-questions/ai-expected"),
            educationalLevel: "Class 10",
            learningResourceType: "important questions with solutions",
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Artificial Intelligence", path: "/subjects/ai" },
            { name: "Most Expected Questions", path: "/important-questions/ai-expected" },
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
        <span className="text-ink font-semibold">Most Expected Questions</span>
      </nav>

      <div className="max-w-3xl">
        <p className="eyebrow">AI 417 · Half yearly · Highest chance first</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2">
          AI Half Yearly — most expected questions with answers
        </h1>
        <p className="text-ink-soft mt-4 text-[16px] leading-relaxed">
          {AI_HY_TOTAL_LINES.expected} questions covering all six units of the half yearly portion,
          each with a model answer written to the marks - 20-30 words for 2 marks and 50-80 words for
          4 marks. The {AI_HY_TOTAL_LINES.hot} questions marked{" "}
          <span className="font-semibold text-ink">highest chance</span> are the ones to do first.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link href={BOARD_URL} className="btn-g btn-g-dark text-[15px]">
            <Icon name="squarePen" size={18} /> Practise on the Smart Board
          </Link>
          <a href="/api/ai/pdf/expected" download className="btn-g btn-g-white text-[15px]">
            <Icon name="download" size={18} /> Download PDF
          </a>
          <Link href="/important-questions/ai-blueprint" className="btn-g btn-g-white text-[15px]">
            <Icon name="fileText" size={18} /> Blue print model paper
          </Link>
        </div>
      </div>

      {/* ---------- 15 of the 50 ---------- */}
      <section className="mt-12">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Must do: 15 of the 50 solved questions
          </h2>
          <span className="font-mono text-[11px] text-ink-mute uppercase tracking-[.14em]">
            teacher&apos;s pick · highest chance
          </span>
        </div>
        <p className="text-[14.5px] text-ink-soft mt-2 max-w-3xl">
          Around 15 questions will come from the 50 solved list. Do these 15 first - they also carry
          most of the marks in Section B.
        </p>
        <ol className="grid sm:grid-cols-2 gap-3 mt-5">
          {AI_HY_TOP15.map((t) => (
            <li key={t.ref} className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-brand-600">Q{t.ref}</span>
                <span className="font-mono text-[10.5px] text-ink-mute uppercase tracking-[.12em]">
                  of the 50
                </span>
              </div>
              <p className="text-[14.5px] font-semibold mt-1.5">{t.q}</p>
              <p className="text-[12.5px] text-ink-mute mt-1.5">{t.why}</p>
              <p className="text-[11.5px] text-ink-mute mt-2">{t.unit}</p>
            </li>
          ))}
        </ol>

        <details className="mt-4 bg-white border border-slate-200 rounded-2xl p-5">
          <summary className="cursor-pointer list-none font-bold text-[15px]">
            Next 15 - do these if you have one more day
          </summary>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {AI_HY_SECOND15.map((t) => (
              <li key={t.ref} className="text-[13.5px] text-ink-soft flex gap-2">
                <span className="font-mono text-[11.5px] text-ink-mute shrink-0">Q{t.ref}</span>
                <span>{t.q}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* ---------- expected by unit ---------- */}
      {parts.map((part) => (
        <section key={part} className="mt-14">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {part === "Part A" ? "Part A — Employability Skills" : "Part B — AI subject"}
          </h2>
          <div className="space-y-8 mt-5">
            {groupUnits(part).map((g) => (
              <div key={g.unit}>
                <h3 className="font-bold text-[16px]">{g.unit}</h3>
                <p className="font-mono text-[11.5px] text-ink-mute mt-1">
                  {g.qs.length} questions · answers sized to the marks
                </p>
                <div className="mt-3 space-y-3">
                  {g.qs.map((q) => (
                        <details key={q.n} className="bg-white border border-slate-200 rounded-2xl p-5 open:shadow-pop">
                          <summary className="cursor-pointer list-none">
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-[12px] font-bold text-brand-600 shrink-0 mt-1">
                                {q.n}
                              </span>
                              <div>
                                <p className="text-[15px] font-semibold leading-snug">{q.q}</p>
                                <p className="font-mono text-[11px] text-ink-mute mt-1.5">
                                  {q.unit} · {q.marks} marks{q.tag ? ` · ${q.tag}` : ""}
                                  {q.hot ? " · highest chance" : ""}
                                </p>
                              </div>
                            </div>
                          </summary>
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="font-mono text-[11px] uppercase tracking-[.14em] text-ink-mute">
                              Model answer ({q.marks === 4 ? "50-80" : "20-30"} words)
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
          </div>
        </section>
      ))}

      {/* ---------- downloads ---------- */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Download (PDF)</h2>
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
    </div>
  );
}
