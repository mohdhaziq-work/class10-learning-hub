"use client";
import Link from "next/link";
import { useState } from "react";
import {
  EN_BP_META,
  EN_BP_SECTIONS,
  EN_BP_LIT_ROWS,
  EN_BP_SYLLABUS,
  EN_BP_CHAPTERS,
  EN_BP_GRAMMAR,
  EN_BP_WRITING,
  type EnChapter,
} from "@/lib/content/englishBlueprint";

function chapterHref(key: string) {
  const [, g, i] = key.split("-");
  return `/chapter/english/${g}/${i}`;
}

function MarkChip({ t }: { t: string }) {
  return (
    <span className="shrink-0 rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink-mute">
      {t}
    </span>
  );
}

function QaItem({ q, a, marks, kind }: { q: string; a: string; marks: number; kind: string }) {
  return (
    <details className="group rounded-lg border border-[#e8eaed] bg-white">
      <summary className="flex cursor-pointer list-none items-start gap-2 p-3 text-[13px] font-bold leading-snug text-ink [&::-webkit-details-marker]:hidden">
        <span className="mt-0.5 shrink-0 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#1a73e8]">{kind}</span>
        <span className="flex-1">{q}</span>
        <span className="shrink-0 rounded bg-[#e8f0fe] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#1a73e8]">{marks}M</span>
        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-mute transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <p className="whitespace-pre-line border-t border-dashed border-[#e8eaed] p-3 text-[13px] leading-relaxed text-[#3c4043]">
        <span className="mr-1 font-bold text-[#188038]">Ans.</span>
        {a}
      </p>
    </details>
  );
}

function ChapterPack({ ch, open, onToggle }: { ch: EnChapter; open: boolean; onToggle: () => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#e8eaed] bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left hover:bg-[#f8f9fa]"
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e8eaed] bg-[#f8f9fa] font-mono text-[13px] font-extrabold text-[#1a73e8]">
          {ch.num}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-bold leading-tight text-ink">{ch.title}</span>
          <span className="mt-0.5 block font-mono text-[10.5px] font-bold uppercase tracking-wider text-ink-mute">
            {ch.author} · {ch.book === "Footprints" ? "Footprints Without Feet" : ch.book === "Poetry" ? "First Flight — Poem" : "First Flight — Prose"}
          </span>
        </span>
        <span className="hidden shrink-0 sm:block">
          <MarkChip t={`${ch.qa.length} Q&A`} />
        </span>
        <svg className={`h-4 w-4 shrink-0 text-ink-mute transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {open && (
        <div className="border-t border-[#e8eaed] p-4 sm:p-5">
          {/* Summary */}
          <h4 className="font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">Summary — read this first (2-3 min)</h4>
          <div className="mt-2 space-y-2">
            {ch.summary.map((s, i) => (
              <p key={i} className="flex gap-2 text-[13.5px] leading-relaxed text-[#3c4043]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a73e8]" />
                <span>{s}</span>
              </p>
            ))}
          </div>

          {/* Characters */}
          {ch.characters && ch.characters.length > 0 && (
            <>
              <h4 className="mt-5 font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">Characters</h4>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {ch.characters.map((c) => (
                  <div key={c.n} className="rounded-lg border border-[#e8eaed] bg-[#f8f9fa] p-2.5">
                    <p className="text-[12.5px] font-bold text-ink">{c.n}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-[#5f6368]">{c.d}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Themes */}
          <h4 className="mt-5 font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">Themes / Message</h4>
          <ul className="mt-2 space-y-1">
            {ch.themes.map((t, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-[#3c4043]">
                <span className="mr-1.5 font-bold text-[#188038]">•</span>
                {t}
              </li>
            ))}
          </ul>

          {/* Extracts */}
          {ch.extracts.length > 0 && (
            <>
              <h4 className="mt-5 font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">Extract lines likely in exam (with meaning)</h4>
              <div className="mt-2 space-y-2">
                {ch.extracts.map((e, i) => (
                  <div key={i} className="rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#1a73e8] bg-[#f8f9fa] p-3">
                    <p className="text-[13px] font-semibold italic leading-snug text-ink">“{e.line}”</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5f6368]">{e.meaning}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Q&A */}
          <h4 className="mt-5 font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-[#1a73e8]">Expected questions — tap a question for the model answer</h4>
          <div className="mt-2 space-y-2">
            {ch.qa.map((qa, i) => (
              <QaItem key={i} q={qa.q} a={qa.a} marks={qa.marks} kind={qa.kind} />
            ))}
          </div>

          <Link
            href={chapterHref(ch.key)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#dadce0] bg-white px-3 py-1.5 text-[12px] font-bold text-[#1a73e8] hover:bg-[#e8f0fe]"
          >
            Open full chapter — slides, notes, words, quiz
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      )}
    </article>
  );
}

const BOOKS: { id: EnChapter["book"]; label: string; note: string }[] = [
  { id: "Prose", label: "First Flight — Prose", note: "Blue print: chapters 1, 2, 3, 4, 5, 9" },
  { id: "Poetry", label: "First Flight — Poetry", note: "Blue print: poems 3, 5, 7, 9, 10" },
  { id: "Footprints", label: "Footprints Without Feet", note: "Blue print: stories 1, 2, 3, 4, 7, 8" },
];

export default function EnglishBlueprintView() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      {/* Header */}
      <header className="pt-8">
        <p className="font-mono text-[10.5px] font-extrabold uppercase tracking-[.16em] text-[#1a73e8]">Class 10 · {EN_BP_META.exam}</p>
        <h1 className="mt-1 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-[30px]">
          English Half-Yearly Blue Print
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#5f6368]">
          Your school blue print, exactly as copied — {EN_BP_META.mm} marks, {EN_BP_META.time}. Every chapter in it has a
          revision pack below: tap a chapter to open its summary, characters, themes, extract lines and expected Q&A.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a73e8] px-3.5 py-2 text-[12.5px] font-bold text-white hover:bg-[#1765cc]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8V3h8v5M6 14H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2m-8-2h8v5H6v-5Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Print / Save as PDF
          </button>
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-ink-mute">
            Paper tomorrow? Read summaries twice, Q&A once.
          </span>
        </div>
      </header>

      {/* Marks scheme */}
      <section className="mt-8" id="scheme">
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">Marks scheme — 80</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {EN_BP_SECTIONS.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e8eaed] bg-white p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13.5px] font-bold text-ink">{s.label}</p>
                <span className="rounded bg-[#e8f0fe] px-1.5 py-0.5 font-mono text-[10.5px] font-extrabold text-[#1a73e8]">{s.marks}M</span>
              </div>
              <p className="mt-0.5 font-mono text-[10.5px] font-bold text-ink-mute">{s.calc}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#5f6368]">{s.blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#e8eaed] bg-white">
          <p className="border-b border-[#e8eaed] bg-[#f8f9fa] px-3.5 py-2 font-mono text-[10.5px] font-extrabold uppercase tracking-[.14em] text-ink-mute">
            Literature breakup — 40M
          </p>
          {EN_BP_LIT_ROWS.map((r) => (
            <div key={r.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-[#f1f3f4] px-3.5 py-2 last:border-0">
              <span className="w-44 text-[12.5px] font-bold text-ink">{r.label}</span>
              <span className="font-mono text-[11px] font-extrabold text-[#1a73e8]">{r.calc}</span>
              <span className="min-w-0 flex-1 basis-full text-[11.5px] leading-snug text-[#5f6368] sm:basis-auto">{r.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus */}
      <section className="mt-8" id="syllabus">
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">Syllabus in the blue print</h2>
        <div className="mt-3 space-y-1.5 rounded-xl border border-[#e8eaed] bg-white p-3.5">
          {[EN_BP_SYLLABUS.prose, EN_BP_SYLLABUS.poetry, EN_BP_SYLLABUS.fwf, EN_BP_SYLLABUS.grammar, EN_BP_SYLLABUS.writing].map((s, i) => (
            <p key={i} className="text-[13px] font-semibold leading-relaxed text-[#3c4043]">
              <span className="mr-1.5 font-bold text-[#1a73e8]">—</span>
              {s}
            </p>
          ))}
          <p className="pt-1 text-[11.5px] leading-snug text-[#5f6368]">
            Chapter numbers follow your school's book order — same as this site's English chapters. Match by title if a number looks different.
          </p>
        </div>
      </section>

      {/* Chapter packs */}
      <section className="mt-8" id="chapters">
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">Chapter packs — tap to open</h2>
        {BOOKS.map((b) => (
          <div key={b.id} className="mt-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[14px] font-extrabold text-ink">{b.label}</h3>
              <span className="font-mono text-[10.5px] font-bold text-ink-mute">{b.note}</span>
            </div>
            <div className="mt-2 space-y-2.5">
              {EN_BP_CHAPTERS.filter((c) => c.book === b.id).map((ch) => (
                <ChapterPack key={ch.key} ch={ch} open={openKey === ch.key} onToggle={() => setOpenKey(openKey === ch.key ? null : ch.key)} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Grammar crash */}
      <section className="mt-10" id="grammar">
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">Grammar crash — 10 marks (modals, speech, editing, prepositions)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Modals</h3>
            <ul className="mt-2 space-y-1.5">
              {EN_BP_GRAMMAR.modals.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">• {m}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Reported speech</h3>
            <ul className="mt-2 space-y-1.5">
              {EN_BP_GRAMMAR.speech.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">• {m}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Editing (omission)</h3>
            <ul className="mt-2 space-y-1.5">
              {EN_BP_GRAMMAR.editing.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">• {m}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Prepositions — pairs that are asked</h3>
            <ul className="mt-2 space-y-1.5">
              {EN_BP_GRAMMAR.prepositions.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">• {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Writing + strategy */}
      <section className="mt-10" id="writing">
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">Writing section — 10 marks</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Formal letter — exact format</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-4">
              {EN_BP_WRITING.letter.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">{m}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-[#e8eaed] bg-white p-4">
            <h3 className="text-[13px] font-extrabold text-ink">Analytical paragraph</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-4">
              {EN_BP_WRITING.analytical.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-[#3c4043]">{m}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[#ceead6] bg-[#f6fdf8] p-4">
          <h3 className="text-[13px] font-extrabold text-[#0d652d]">Tomorrow's paper — how to score 80%</h3>
          <ul className="mt-2 space-y-1.5">
            {EN_BP_WRITING.strategy.map((m, i) => (
              <li key={i} className="text-[12.5px] leading-relaxed text-[#1e4620]">• {m}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
