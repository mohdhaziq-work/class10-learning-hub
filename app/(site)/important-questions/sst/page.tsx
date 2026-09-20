import type { Metadata } from "next";
import Link from "next/link";
import { SST_PAPER_META, SST_SECTIONS } from "@/lib/content/sst-halfyearly";

export const metadata: Metadata = {
  title: "Class 10 SST Half Yearly Paper 2025-26 — Solved (SK Presidency Public School)",
  description:
    "Full solved paper: SK Presidency Public School Half Yearly Exam 2025-26, Class 10 Social Science (SST). All 37 questions — MCQs, short and long answers, case-based and map work — with NCERT-aligned model answers.",
};

const BOARD_LINK =
  "/smart-board?web=%2Fembed%2Fsst-solutions&layout=split&name=SST%20Half-Yearly%20Solutions";

export default function SSTHalfYearlySolved() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        {SST_PAPER_META.school} · {SST_PAPER_META.exam}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Class 10 SST Half Yearly 2025-26 — Solved Paper
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        {SST_PAPER_META.subject} · Max marks {SST_PAPER_META.mm} · Time {SST_PAPER_META.time}. Every question of the
        school paper with a full-marks model answer, NCERT-aligned. Use{" "}
        <Link href={BOARD_LINK} className="font-semibold text-[#1a73e8] underline">
          Practice on the Smart Board
        </Link>{" "}
        to keep this sheet beside the whiteboard and write each answer yourself.
      </p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-ink-mute">
        Preparing for the next exam? Use the{" "}
        <Link href="/important-questions/sst-blueprint" className="font-semibold text-[#1a73e8] underline">
          blue print model paper
        </Link>{" "}
        (38 questions, 80 marks, exactly as the school paper) and the{" "}
        <Link href="/important-questions/sst-expected" className="font-semibold text-[#1a73e8] underline">
          most expected questions of every chapter
        </Link>
        .
      </p>

      {SST_SECTIONS.map((s) => (
        <section key={s.label} className="mt-10">
          <h2 className="border-b-2 border-ink pb-1 text-[15px] font-extrabold text-ink">{s.label}</h2>
          <p className="mt-1 text-[12px] text-ink-mute">{s.blurb}</p>
          {s.qs.map((q) => (
            <article key={q.n} className="mt-5">
              <h3 className="text-[14px] font-bold leading-snug text-ink">
                <span className="mr-2 font-mono text-[11px] font-bold text-[#1a73e8]">Q{q.n}</span>
                {q.q}
                <span className="ml-2 text-[10.5px] font-bold text-ink-mute">[{q.marks} marks]</span>
              </h3>
              {q.opts && (
                <ul className="mt-2 grid gap-1 pl-5 text-[13px] text-[#3c4043] sm:grid-cols-2">
                  {q.opts.map((o, i) => (
                    <li key={i}>
                      ({["a", "b", "c", "d"][i]}) {o}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
                <span className="mr-1 font-bold text-[#188038]">Ans.</span> {q.ans}
              </p>
            </article>
          ))}
        </section>
      ))}

      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">How to use this sheet</h2>
        <ol className="mt-2 list-decimal pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>Read the question, then write your own answer on paper or the Smart Board.</li>
          <li>Compare with the model answer — check the points, order and keywords.</li>
          <li>For map questions, locate each place on an outline map and label it.</li>
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
