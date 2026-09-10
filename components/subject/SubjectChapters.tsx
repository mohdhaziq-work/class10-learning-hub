"use client";
import Link from "next/link";
import type { Subject, ChapterRef } from "@/lib/syllabus";
import { chapterKey } from "@/lib/syllabus";
import { useProgress } from "@/lib/progress";
import { chapterDetail } from "@/lib/content";
import { getLocalOverride } from "@/lib/overrides";
import { Icon } from "@/components/ui/Icon";

function Card({ s, gi, ci, ch }: { s: Subject; gi: number; ci: number; ch: ChapterRef }) {
  const { toggle, isDone } = useProgress();
  const key = chapterKey(s.id, gi, ci);
  const done = isDone(key);
  const full = !!chapterDetail(key);
  const over = !!getLocalOverride(key);
  return (
    <div className={`reveal card-g p-4 flex gap-3.5 items-start hover:shadow-lift hover:-translate-y-0.5 transition ${done ? "ring-2 ring-slate-900 dark:ring-slate-100" : ""}`}>
      <Link href={`/chapter/${s.id}/${gi}/${ci}`} aria-label={ch.title}
        className="w-12 h-12 rounded-xl grid place-items-center font-extrabold text-[19px] flex-none bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-100">
        {ch.n}
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/chapter/${s.id}/${gi}/${ci}`} className="font-bold text-[15.5px] leading-snug block hover:text-brand-600 transition">
          {ch.title}
        </Link>
        {ch.hi && <p className="text-[13px] text-ink-mute dark:text-slate-400 mt-0.5 truncate">{ch.hi}</p>}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {full
            ? <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900"><Icon name="star" size={12} /> Full content</span>
            : <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900"><Icon name="info" size={12} /> Auto guide</span>}
          {over && <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200"><Icon name="penLine" size={12} /> Teacher</span>}
        </div>
      </div>
      <button
        onClick={() => toggle(key)}
        title={done ? "Mark as not done" : "Mark done"}
        aria-label={done ? "Mark as not done" : "Mark done"}
        className={`w-10 h-10 rounded-full grid place-items-center flex-none border-2 transition ${done
          ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900"
          : "border-slate-200 dark:border-[#30363d] text-transparent hover:border-slate-900 dark:hover:border-white"}`}
      >
        <Icon name="check" size={18} strokeWidth={3} />
      </button>
    </div>
  );
}

export default function SubjectChapters({ sub }: { sub: Subject }) {
  const { pct, tick } = useProgress(sub.id);
  const total = sub.groups.reduce((a, g) => a + g.chapters.length, 0);
  const doneCount = Math.round((pct / 100) * total);

  return (
    <div key={tick}>
      {/* progress banner */}
      <div className="card-g p-4 sm:p-5 mb-7">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="w-12 h-12 rounded-xl grid place-items-center text-white bg-slate-900 dark:bg-white dark:text-slate-900 flex-none">
            <Icon name="barChart" size={24} />
          </span>
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-baseline justify-between gap-2">
              <b className="text-[16px] tracking-tight">Syllabus progress</b>
              <span className="font-mono text-[12.5px] text-ink-mute dark:text-slate-400">{doneCount} of {total} · {pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 mt-2 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "#1a73e8" }} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3.5 flex-wrap">
          <Link href="/smart-board" className="btn-g btn-g-white text-[13.5px]">
            <Icon name="squarePen" size={17} /> Open Smart Board
          </Link>
          <Link href="/smart-board?bg=graph" className="btn-g btn-g-white text-[13.5px]">
            <Icon name="activity" size={17} /> Graph Board
          </Link>
          <Link href="/admin" className="btn-g btn-g-white text-[13.5px]">
            <Icon name="shieldCheck" size={17} /> Edit content
          </Link>
        </div>
      </div>

      {sub.groups.map((g, gi) => (
        <section key={g.label} className="mb-8">
          <div className="flex items-center gap-2.5 mb-3.5">
            <h2 className="text-[19px] sm:text-[21px] font-extrabold tracking-tight">{g.label}</h2>
            <span className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900">
              <Icon name="layers" size={13} /> {g.chapters.length}
            </span>
          </div>
          <div className="grid gap-3.5 md:grid-cols-2">
            {g.chapters.map((ch, ci) => (
              <Card key={ch.n} s={sub} gi={gi} ci={ci} ch={ch} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
