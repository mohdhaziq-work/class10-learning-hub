import type { Metadata } from "next";
import Link from "next/link";
import {
  BP_META,
  BP_BLUEPRINT,
  BP_SECTIONS,
  BP_MAP_PRACTICE,
  type BPQ,
} from "@/lib/content/sst-blueprint-hy";

export const metadata: Metadata = {
  title: "Class 10 SST Half Yearly — Blueprint Model Paper (38 Questions, 80 Marks)",
  description:
    "Half Yearly SST model paper built exactly to the school blue print — section A History, B Geography, C Political Science, D Economics — with every question type (MCQ, very short, short, long, case-based, map work), chapter and topic tags, and NCERT-style model answers.",
};

const BOARD_LINK =
  "/smart-board?web=%2Fembed%2Fsst-blueprint&layout=split&name=SST%20Blueprint%20Paper";

const TYPE_LABEL: Record<BPQ["type"], string> = {
  MCQ: "MCQ",
  VSA: "Very Short Answer",
  SA: "Short Answer",
  LA: "Long Answer",
  CASE: "Case Based",
  MAP: "Map Work",
};

function TypeTag({ q }: { q: BPQ }) {
  return (
    <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
      {TYPE_LABEL[q.type]}
    </span>
  );
}

function ChTag({ ch, topic }: { ch: string; topic: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#1a73e8]">{ch}</span>
      <span className="rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">
        {topic}
      </span>
    </span>
  );
}

function Answer({ text }: { text: string }) {
  return (
    <p className="mt-2 whitespace-pre-line rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
      <span className="mr-1 font-bold text-[#188038]">Ans.</span>
      {text}
    </p>
  );
}

function Question({ q }: { q: BPQ }) {
  return (
    <article className="mt-6 rounded-xl border border-[#e8eaed] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">Q{q.n}</span>
        <TypeTag q={q} />
        <span className="font-mono text-[10.5px] font-bold text-ink-mute">{q.marks} marks</span>
        <span className="ml-auto">
          <ChTag ch={q.ch} topic={q.topic} />
        </span>
      </div>

      <h3 className="mt-2 whitespace-pre-line text-[14.5px] font-bold leading-snug text-ink">{q.q}</h3>

      {q.extract && (
        <blockquote className="mt-3 rounded-lg border border-[#e8eaed] bg-[#f8f9fa] p-3 text-[13px] italic leading-relaxed text-[#3c4043]">
          {q.extract}
        </blockquote>
      )}

      {q.opts && !q.subs && (
        <ul className="mt-2 grid gap-1 pl-5 text-[13px] text-[#3c4043] sm:grid-cols-2">
          {q.opts.map((o, i) => (
            <li key={i}>
              ({["a", "b", "c", "d"][i]}) {o}
            </li>
          ))}
        </ul>
      )}

      {q.subs && (
        <div className="mt-3 space-y-3">
          {q.subs.map((s, i) => (
            <div key={i} className="border-t border-dashed border-[#e8eaed] pt-3">
              <p className="text-[13.5px] font-bold leading-snug text-ink">
                ({["i", "ii", "iii", "iv"][i]}) {s.q}
                <span className="ml-2 font-mono text-[10px] font-bold text-ink-mute">{s.marks} mark{s.marks > 1 ? "s" : ""}</span>
              </p>
              <Answer text={s.a} />
            </div>
          ))}
        </div>
      )}

      {q.ans && !q.subs && <Answer text={q.ans} />}

      {q.alt && (
        <>
          <p className="mt-4 text-center font-mono text-[11px] font-extrabold tracking-[.2em] text-ink-mute">OR</p>
          <div className="mt-3 rounded-xl border border-dashed border-[#dadce0] bg-[#f8f9fa] p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">Q{q.n.replace("(a)", "(b)")}</span>
              <span className="font-mono text-[10.5px] font-bold text-ink-mute">{q.marks} marks</span>
              <span className="ml-auto">
                <ChTag ch={q.alt.ch} topic={q.alt.topic} />
              </span>
            </div>
            <h3 className="mt-2 text-[14.5px] font-bold leading-snug text-ink">{q.alt.q}</h3>
            <Answer text={q.alt.ans} />
          </div>
        </>
      )}
    </article>
  );
}

export default function SSTBlueprintPaper() {
  const totalQ = BP_BLUEPRINT.reduce((a, s) => a + s.totalQ, 0);
  const totalM = BP_BLUEPRINT.reduce((a, s) => a + s.totalMarks, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        {BP_META.school} · {BP_META.exam} · {BP_META.cls} {BP_META.subject}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        SST Half Yearly — Blueprint Model Paper
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        This paper is not a guess — it is built line by line from the school's own blue print. Every section, every
        question type, every question count and every mark is exactly what the blue print says:{" "}
        <strong className="font-bold text-ink">
          {totalQ} questions and {totalM} marks
        </strong>
        . Each question carries the chapter and the topic it comes from, so a question that belongs to History's very
        short answer stays in Section A only, and no subject is given a type it does not have in the blue print.{" "}
        <span className="font-mono text-[11px] font-bold text-ink-mute">
          Time {BP_META.time} · M.M. {BP_META.mm}
        </span>
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={BOARD_LINK}
          className="rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white"
        >
          Practice on the Smart Board
        </Link>
        <Link
          href="/important-questions/sst-expected"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Most expected questions (all chapters)
        </Link>
        <Link
          href="/important-questions/sst"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Previous year solved paper
        </Link>
      </div>

      {/* ---------------- THE BLUE PRINT ---------------- */}
      <section className="mt-10">
        <h2 className="text-[15px] font-extrabold uppercase tracking-[.08em] text-ink">The Blue Print</h2>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          Portion: History Ch 01 &amp; 02 · Geography Ch 01 to 04 · Political Science Ch 01 to 03 · Economics Ch 01 to 02
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#dadce0]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f8f9fa] text-[10.5px] font-bold uppercase tracking-wider text-ink-mute">
                <th className="px-3 py-2">Section / Subject</th>
                <th className="px-3 py-2">Question Type</th>
                <th className="px-3 py-2 text-center">No. of Ques</th>
                <th className="px-3 py-2 text-center">Marks</th>
              </tr>
            </thead>
            <tbody>
              {BP_BLUEPRINT.map((s) =>
                s.rows.map((r, i) => (
                  <tr
                    key={s.key + r.type}
                    className={`align-top text-[12.5px] ${i === 0 ? "border-t border-[#dadce0]" : ""} ${
                      i % 2 ? "bg-white" : "bg-[#fcfcfd]"
                    }`}
                  >
                    {i === 0 && (
                      <td rowSpan={s.rows.length + 1} className="border-r border-[#e8eaed] px-3 py-2">
                        <span className="block font-extrabold text-ink">
                          {s.key}. {s.subject}
                        </span>
                        <span className="mt-0.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a73e8]">
                          {s.chapters}
                        </span>
                      </td>
                    )}
                    <td className="px-3 py-2 text-[#3c4043]">{r.type}</td>
                    <td className="px-3 py-2 text-center font-mono font-bold text-ink">{r.count}</td>
                    <td className="px-3 py-2 text-center font-mono font-bold text-ink">{r.marks}</td>
                  </tr>
                ))
              )}
              {BP_BLUEPRINT.map((s) => (
                <tr key={s.key + "-tot"} className="border-t border-dashed border-[#dadce0] bg-[#f8f9fa] text-[12px]">
                  <td className="px-3 py-1.5 pl-8 font-bold text-ink-mute">Total — {s.subject}</td>
                  <td className="px-3 py-1.5 font-mono font-bold text-ink">{s.totalQ} questions</td>
                  <td className="px-3 py-1.5 text-center font-mono font-extrabold text-ink">{s.totalMarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink bg-[#f8f9fa] text-[13px]">
                <td colSpan={2} className="px-3 py-2 text-right font-extrabold uppercase tracking-wide text-ink">
                  Grand Total
                </td>
                <td className="px-3 py-2 text-center font-mono font-extrabold text-ink">{totalQ}</td>
                <td className="px-3 py-2 text-center font-mono font-extrabold text-ink">{totalM} Marks</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] text-ink-mute">
          Reading the table: History has one Very Short Answer and a 2-mark map, Political Science has two Very Short
          Answers and no map, Geography has no Very Short Answer and a 3-mark map, and Economics has no map, no case
          study and three short answers. The questions below follow exactly this distribution.
        </p>
      </section>

      {/* ---------------- THE PAPER ---------------- */}
      {BP_SECTIONS.map((s) => (
        <section key={s.key} className="mt-12">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="text-[16px] font-extrabold text-ink">{s.label}</h2>
            <p className="mt-1 text-[12.5px] text-ink-mute">{s.blurb}</p>
          </div>
          <p className="mt-2 font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-ink-mute">
            {s.qs.length} printed questions in this section
          </p>
          {s.qs.map((q) => (
            <Question key={q.n} q={q} />
          ))}
        </section>
      ))}

      {/* ---------------- MAP PRACTICE ---------------- */}
      <section className="mt-12">
        <h2 className="text-[15px] font-extrabold uppercase tracking-[.08em] text-ink">Map Work — Practice List</h2>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          The map questions above are of 2 marks (History) and 3 marks (Geography). These are the places that keep
          coming back in this portion — practise all of them on an outline map of India.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#dadce0] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">History — Nationalism in India</h3>
            <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-[#3c4043]">
              {BP_MAP_PRACTICE.history.map((m) => (
                <li key={m} className="border-b border-dashed border-[#e8eaed] pb-1.5 last:border-0">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#dadce0] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Geography — Dams, Soil and Crops</h3>
            <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-[#3c4043]">
              {BP_MAP_PRACTICE.geography.map((m) => (
                <li key={m} className="border-b border-dashed border-[#e8eaed] pb-1.5 last:border-0">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">How to use this paper</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>Attempt the paper first — 3 hours, no answers. Write the answers on paper or on the Smart Board.</li>
          <li>Then check each answer here: the answer boxes carry the full-marks points in the order they should be written.</li>
          <li>For the map questions, draw the outline of India and label only the places asked — do not mark extra places.</li>
          <li>Two long answers have an OR choice, exactly like the school paper. Prepare both choices.</li>
        </ol>
        <Link
          href={BOARD_LINK}
          className="mt-4 inline-block rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white"
        >
          Open beside the Smart Board
        </Link>
      </div>
    </main>
  );
}
