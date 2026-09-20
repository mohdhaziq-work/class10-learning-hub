import type { Metadata } from "next";
import Link from "next/link";
import { PERIODIC_META, PERIODIC_SECTIONS, type P2Q } from "@/lib/content/sst-periodic2";

export const metadata: Metadata = {
  title: "Class 10 SST II Periodic Exam 2026-27 — Solved Paper (15 Marks)",
  description:
    "Full solved paper: SK Presidency Public School II Periodic Exam 2026-27, Class 10 Social Science — all 28 questions of Section A History, B Geography, C Political Science and D Economics with correct options, model answers and the trap in every question.",
};

const BOARD_LINK =
  "/smart-board?web=%2Fembed%2Fsst-periodic2&layout=split&name=SST%20Periodic%20II%20Solutions";

const LETTERS = ["a", "b", "c", "d"];

function Question({ q }: { q: P2Q }) {
  return (
    <article className="mt-6 rounded-xl border border-[#e8eaed] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">Q{q.n}</span>
        <span className="font-mono text-[10.5px] font-bold text-ink-mute">{q.marks} marks</span>
        {q.map && (
          <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
            Map
          </span>
        )}
        <span className="ml-auto inline-flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#1a73e8]">{q.ch}</span>
          <span className="rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">
            {q.topic}
          </span>
        </span>
      </div>

      <h3 className="mt-2 whitespace-pre-line text-[14.5px] font-bold leading-snug text-ink">{q.q}</h3>

      {q.opts && (
        <ul className="mt-2 grid gap-1 text-[13px] sm:grid-cols-2">
          {q.opts.map((o, i) => {
            const isRight = q.correct === LETTERS[i];
            return (
              <li
                key={i}
                className={`rounded-lg border px-2.5 py-1.5 ${
                  isRight
                    ? "border-[#188038] bg-[#e6f4ea] font-bold text-[#0d652d]"
                    : "border-[#e8eaed] bg-white text-[#3c4043]"
                }`}
              >
                ({LETTERS[i]}) {o}
                {isRight && <span className="ml-1 font-mono text-[10px] uppercase tracking-wider">Correct</span>}
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-2 whitespace-pre-line rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
        <span className="mr-1 font-bold text-[#188038]">Ans.</span>
        {q.ans}
      </p>

      {q.caution && (
        <p className="mt-2 rounded-lg border border-[#fce8b2] bg-[#fef7e0] p-3 text-[12.5px] leading-relaxed text-[#7a5c00]">
          <span className="mr-1 font-bold">Trap.</span>
          {q.caution}
        </p>
      )}
    </article>
  );
}

export default function SSTPeriodic2Solved() {
  const totalQ = PERIODIC_SECTIONS.reduce((a, s) => a + s.qs.length, 0);
  const totalM = PERIODIC_SECTIONS.reduce((a, s) => a + s.marks, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        {PERIODIC_META.school} · {PERIODIC_META.exam} · {PERIODIC_META.cls} {PERIODIC_META.subject}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        II Periodic Exam — SST Solved Paper
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        All <strong className="font-bold text-ink">{totalQ} questions / {totalM} marks</strong> of the school paper,
        with the correct option for every MCQ, a full-marks model answer for every written question, the map answers
        place by place, and the trap in each question marked out. Use{" "}
        <Link href={BOARD_LINK} className="font-semibold text-[#1a73e8] underline">
          Practice on the Smart Board
        </Link>{" "}
        to keep this sheet beside the whiteboard. Time {PERIODIC_META.time} · M.M. {PERIODIC_META.mm}.
      </p>

      <div className="mt-5 rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-4">
        <h2 className="font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-ink-mute">
          General instructions (as printed)
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] leading-relaxed text-[#3c4043]">
          {PERIODIC_META.instructions.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={BOARD_LINK} className="rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          Practice on the Smart Board
        </Link>
        <Link
          href="/important-questions/sst-expected"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Most expected questions
        </Link>
        <Link
          href="/important-questions/sst-blueprint"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Half yearly blue print paper
        </Link>
        <Link
          href="/important-questions/sst"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Half yearly solved paper
        </Link>
      </div>

      {PERIODIC_SECTIONS.map((s) => (
        <section key={s.label} className="mt-12">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="text-[16px] font-extrabold text-ink">{s.label}</h2>
            <p className="mt-1 text-[12.5px] text-ink-mute">{s.blurb}</p>
          </div>
          <p className="mt-2 font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-ink-mute">
            {s.qs.length} questions · {s.marks} marks in this section
          </p>
          {s.qs.map((q) => (
            <Question key={q.n} q={q} />
          ))}
        </section>
      ))}

      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">Revise the traps in this paper</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>Chronology of Gandhian movements: Champaran 1917 → Ahmedabad Feb 1918 → Kheda 1918 → Rowlatt 1919 → Salt 1930.</li>
          <li>Permanent forests (reserved + protected) — largest area is with <strong className="text-ink">Madhya Pradesh</strong>, not Himachal Pradesh.</li>
          <li>Sri Lanka 1956 — the official language made <strong className="text-ink">Sinhala</strong> only, that is what started the conflict.</li>
          <li>India's GDP — <strong className="text-ink">tertiary</strong> sector; employment — <strong className="text-ink">primary</strong> sector.</li>
          <li>World Bank report → per-capita income only; UNDP Human Development Report → income + health + education.</li>
          <li>Union List → currency, communication, defence. State List → police, agriculture, irrigation. Concurrent → education, forest, marriage.</li>
        </ul>
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
