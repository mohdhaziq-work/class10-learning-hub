"use client";
import Link from "next/link";
import { SUBJECTS } from "@/lib/syllabus";
import { useProgress, subjectPct } from "@/lib/progress";

export default function SubjectGrid() {
  const { tick } = useProgress();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" key={tick}>
      {SUBJECTS.map((s) => {
        const n = s.groups.reduce((a, g) => a + g.chapters.length, 0);
        const pct = subjectPct(s.id);
        return (
          <Link key={s.id} href={`/subjects/${s.id}`}
            className="reveal group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card hover:shadow-lift hover:-translate-y-1 transition overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-1.5" style={{ background: s.color }} />
            <div className="w-13 h-13 text-3xl w-[52px] h-[52px] grid place-items-center rounded-2xl mb-3" style={{ background: `${s.color}22` }}>{s.icon}</div>
            <h3 className="font-extrabold text-lg leading-tight">{s.name} <span className="font-semibold text-ink-mute dark:text-slate-400 text-xs">{s.hindi}</span></h3>
            <p className="text-[13px] text-ink-mute dark:text-slate-400 min-h-[40px] mt-1">{s.tagline}</p>
            <div className="flex justify-between text-[13px] font-bold mt-2"><span>{n} chapters</span><span>{pct}% ✓</span></div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 mt-1.5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${s.color}, #7c3aed)` }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
