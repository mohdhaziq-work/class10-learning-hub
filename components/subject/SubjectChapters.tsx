"use client";
import Link from "next/link";
import type { Subject } from "@/lib/syllabus";
import { chapterKey } from "@/lib/syllabus";
import { chapterDetail } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { getLocalOverride } from "@/lib/overrides";

export default function SubjectChapters({ sub }: { sub: Subject }) {
  const { toggle, isDone, pct } = useProgress(sub.id);
  return (
    <>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card flex gap-4 items-center flex-wrap mb-2">
        <div className="flex-1 min-w-[220px]">
          <div className="flex justify-between text-xs font-extrabold tracking-wider"><span>SYLLABUS PROGRESS</span><span>{pct}%</span></div>
          <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 mt-1.5 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: sub.color }} />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/smart-board" className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card">🖊️ Smart Board kholo</Link>
          <Link href="/smart-board?bg=graph" className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card">📐 Graph Board</Link>
        </div>
      </div>

      {sub.groups.map((g, gi) => (
        <div key={gi}>
          <h2 className="mt-7 mb-3 font-extrabold text-[17px] flex items-center gap-2.5">{g.label}<span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /></h2>
          <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {g.chapters.map((c, ci) => {
              const key = chapterKey(sub.id, gi, ci);
              const full = !!chapterDetail(key) || !!getLocalOverride(key);
              const done = isDone(key);
              return (
                <div key={ci} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex gap-3.5 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition">
                  <Link href={`/chapter/${sub.id}/${gi}/${ci}`} className="flex gap-3.5 flex-1 min-w-0">
                    <div className="w-[46px] h-[46px] flex-none rounded-[13px] grid place-items-center font-extrabold text-[17px]" style={{ background: `${sub.color}22`, color: sub.color }}>{c.n}</div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-[15.5px] leading-snug">{c.title}</h3>
                      {c.hi && <small className="text-ink-mute dark:text-slate-400 text-xs">{c.hi}</small>}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${full ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"}`}>{full ? "★ Full content" : "Auto guide"}</span>
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Slides</span>
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Quiz</span>
                      </div>
                    </div>
                  </Link>
                  <div className="self-start">
                    <button onClick={() => toggle(key)}
                      className={`text-[11.5px] font-extrabold px-3 py-1 rounded-full border-[1.5px] whitespace-nowrap transition ${done ? "bg-green-600 border-green-600 text-white" : "border-slate-300 dark:border-slate-600 text-ink-mute dark:text-slate-400"}`}>
                      {done ? "✓ Done" : "Done?"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
