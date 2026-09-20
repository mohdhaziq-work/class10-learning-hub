import type { Metadata } from "next";
import Link from "next/link";
import {
  SST_IMP_CHAPTERS,
  SST_IMP_HOT,
  SST_IMP_TOTAL,
  SST_IMP_HOT_TOTAL,
  type IMPQ,
} from "@/lib/content/sstImportant";

export const metadata: Metadata = {
  title: "Class 10 SST Half Yearly — Most Expected Questions (Chapter & Topic Wise)",
  description:
    "Half Yearly SST most expected questions for all 11 chapters of the portion — History Ch 1-2, Geography Ch 1-4, Political Science Ch 1-3, Economics Ch 1-2. Topic-wise questions of every type with model answers, and the highest-chance questions marked out separately.",
};

const BOARD_LINK =
  "/smart-board?web=%2Fembed%2Fsst-expected&layout=split&name=SST%20Most%20Expected%20Questions";

const TYPE_LABEL: Record<IMPQ["type"], string> = {
  VSA: "Very Short",
  SA: "Short",
  LA: "Long",
  CASE: "Case Based",
  MAP: "Map",
  HOTS: "HOTS",
};

function TypeChip({ q }: { q: IMPQ }) {
  return (
    <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
      {TYPE_LABEL[q.type]} · {q.marks} marks
    </span>
  );
}

function HotBadge() {
  return (
    <span className="rounded-full bg-[#e8f0fe] px-2 py-0.5 font-mono text-[9.5px] font-extrabold uppercase tracking-[.1em] text-[#1a73e8]">
      Must do
    </span>
  );
}

export default function SSTMostExpected() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        Class 10 SST · Half Yearly portion · All chapters, topic-wise
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Most Expected Questions — SST Half Yearly
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        {SST_IMP_TOTAL} questions across all 11 chapters of the portion, arranged chapter-wise and topic-wise, each
        with a full-marks model answer.{" "}
        <strong className="font-bold text-ink">{SST_IMP_HOT_TOTAL} questions are marked “Must do”</strong> — these are
        the ones that repeat most often in this portion, so revise them first if time is short. Every question shows
        the chapter and the topic it belongs to.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={BOARD_LINK} className="rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          Practice on the Smart Board
        </Link>
        <Link
          href="/important-questions/sst-blueprint"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Blueprint model paper
        </Link>
        <Link
          href="/important-questions/sst"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          Solved previous paper
        </Link>
      </div>

      {/* ---------------- MUST DO SHORTLIST ---------------- */}
      <section className="mt-10">
        <h2 className="text-[15px] font-extrabold uppercase tracking-[.08em] text-ink">
          Must do — highest chance questions
        </h2>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          If you have only a few hours, do these first. Full answers are below in their chapters.
        </p>
        <ol className="mt-4 overflow-hidden rounded-xl border border-[#dadce0] bg-white">
          {SST_IMP_HOT.map((h, i) => (
            <li
              key={h.id}
              className={`flex gap-3 px-3 py-2 text-[13px] leading-snug ${i % 2 ? "bg-[#fcfcfd]" : "bg-white"}`}
            >
              <span className="w-6 shrink-0 font-mono text-[10.5px] font-bold text-[#1a73e8]">{i + 1}.</span>
              <span className="flex-1">
                <span className="font-semibold text-ink">{h.q}</span>
                <span className="mt-0.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-mute">
                  {h.subject} Ch {h.ch} · {h.topic} · {TYPE_LABEL[h.type]} · {h.marks} marks
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- CHAPTER WISE ---------------- */}
      {SST_IMP_CHAPTERS.map((c) => (
        <section key={c.key} className="mt-12">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="text-[16px] font-extrabold text-ink">
              {c.subject} · Chapter {c.ch} — {c.title}
            </h2>
            <p className="mt-1 text-[12.5px] text-ink-mute">{c.blurb}</p>
          </div>

          {c.topics.map((t) => (
            <div key={t.name} className="mt-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">{t.name}</h3>
              {t.qs.map((q) => (
                <article key={q.id} className="mt-3 rounded-xl border border-[#e8eaed] bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeChip q={q} />
                    {q.hot && <HotBadge />}
                    <span className="ml-auto rounded-full border border-[#e8eaed] px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">
                      {q.topic}
                    </span>
                  </div>
                  <h4 className="mt-2 text-[14.5px] font-bold leading-snug text-ink">{q.q}</h4>
                  <p className="mt-2 whitespace-pre-line rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
                    <span className="mr-1 font-bold text-[#188038]">Ans.</span>
                    {q.ans}
                  </p>
                </article>
              ))}
            </div>
          ))}
        </section>
      ))}

      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">How to use this list in the last hours</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>First read the “Must do” list above — those {SST_IMP_HOT_TOTAL} questions cover the biggest part of the paper.</li>
          <li>Then go chapter by chapter below and write the answers yourself, then compare with the model answer.</li>
          <li>For 5-mark answers, remember the points, not the words — write 4 to 5 clear points and underline keywords.</li>
          <li>Practise the map questions from the Blueprint model paper — History map 2 marks, Geography map 3 marks.</li>
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
