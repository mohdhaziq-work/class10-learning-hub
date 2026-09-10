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
            className="reveal group card-g overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-200">
            {/* labs-style gradient thumb */}
            <div className="h-32 relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${s.color}, ${s.color}d9 60%, #1f1f1f22)` }}>
              <div className="absolute -right-8 -top-10 w-44 h-44 rounded-full bg-white/15" />
              <div className="absolute right-10 -bottom-14 w-36 h-36 rounded-full bg-white/10" />
              <div className="absolute left-5 bottom-4 w-14 h-14 rounded-2xl grid place-items-center bg-white/20 backdrop-blur border border-white/30 text-white">
                <Icon name={s.icon} size={30} />
              </div>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-white bg-black/25 backdrop-blur px-3 py-1.5 rounded-full">
                <Icon name="layers" size={13} /> {n} chapters
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-extrabold text-[19px] tracking-tight flex items-baseline gap-2 flex-wrap">
                {s.name}
                <span className="font-semibold text-ink-mute dark:text-slate-400 text-[13px]">{s.hindi}</span>
              </h3>
              <p className="text-[13.5px] text-ink-mute dark:text-slate-400 mt-1 leading-relaxed min-h-[42px]">{s.tagline}</p>
              <div className="flex items-center justify-between text-[13px] font-bold mt-3">
                <span className="inline-flex items-center gap-1.5 text-ink-soft dark:text-slate-300">
                  <Icon name="barChart" size={15} className="text-ink-mute" /> {pct}% complete
                </span>
                <span className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-300 font-bold">
                  Open <Icon name="arrowRight" size={15} className="group-hover:translate-x-1 transition" />
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 mt-2 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: s.color }} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
