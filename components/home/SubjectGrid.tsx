"use client";
import Link from "next/link";
import { SUBJECTS } from "@/lib/syllabus";
import { useProgress, subjectPct } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

export default function SubjectGrid() {
  const { tick } = useProgress();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={tick}>
      {SUBJECTS.map((s) => {
        const n = s.groups.reduce((a, g) => a + g.chapters.length, 0);
        const pct = subjectPct(s.id);
        return (
          <Link key={s.id} href={`/subjects/${s.id}`}
            className="reveal group card-g p-6 hover:shadow-lift hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200">
            <div className="flex items-start justify-between">
              <span className="w-12 h-12 rounded-xl grid place-items-center bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                <Icon name={s.icon} size={24} />
              </span>
              <span className="font-mono text-[12px] font-medium text-ink-mute dark:text-slate-400">{n} chapters</span>
            </div>
            <h3 className="font-extrabold text-[20px] tracking-tight mt-4">{s.name}</h3>
            <p className="text-[13.5px] text-ink-mute dark:text-slate-400 mt-1.5 leading-relaxed min-h-[42px]">{s.tagline}</p>
            <div className="flex items-center justify-between text-[12.5px] font-semibold mt-4">
              <span className="font-mono font-medium text-ink-mute dark:text-slate-400">{pct}% complete</span>
              <span className="inline-flex items-center gap-1.5 text-ink dark:text-slate-100 font-semibold">
                Open <Icon name="arrowRight" size={15} className="group-hover:translate-x-1 transition" />
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mt-2 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "#1a73e8" }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
