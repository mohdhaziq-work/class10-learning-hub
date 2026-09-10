import Link from "next/link";
import { SUBJECTS, totalChapters } from "@/lib/syllabus";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-[#e1e3e6] dark:border-[#444746] bg-white dark:bg-[#1e1f20] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl grid place-items-center text-white bg-gradient-to-br from-brand-600 to-[#9334e6]">
              <Icon name="graduationCap" size={22} />
            </span>
            <span className="font-display font-extrabold text-lg tracking-tight">Class 10 Learning Hub</span>
          </div>
          <p className="text-sm text-ink-mute dark:text-slate-400 mt-3 leading-relaxed">
            Free digital classroom for smart boards — slides, mind maps, quizzes and an advanced Smart Board. No login, no fees, works on every device.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200">
              <Icon name="layers" size={14} /> {totalChapters()} chapters
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200">
              <Icon name="layoutGrid" size={14} /> {SUBJECTS.length} subjects
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200">
              <Icon name="zap" size={14} /> Free forever
            </span>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[.12em] text-ink-mute dark:text-slate-400 mb-3">Subjects</h4>
          <div className="grid gap-1">
            {SUBJECTS.map((s) => (
              <Link key={s.id} href={`/subjects/${s.id}`} className="flex items-center gap-2.5 text-sm py-1.5 text-ink-soft dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 font-medium">
                <span style={{ color: s.color }} className="flex"><Icon name={s.icon} size={16} /></span> {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[.12em] text-ink-mute dark:text-slate-400 mb-3">Teachers</h4>
          <div className="grid gap-1 text-sm font-medium">
            <Link href="/smart-board" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-brand-600"><Icon name="squarePen" size={16} /> Smart Board</Link>
            <Link href="/smart-board?layout=split" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-brand-600"><Icon name="columns2" size={16} /> Split View</Link>
            <Link href="/smart-board?bg=graph" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-brand-600"><Icon name="activity" size={16} /> Graph Board</Link>
            <Link href="/admin" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-brand-600"><Icon name="shieldCheck" size={16} /> Admin Panel</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e1e3e6] dark:border-[#444746]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center gap-1.5 text-[13px] text-ink-mute dark:text-slate-500">
          Crafted for classrooms <Icon name="heart" size={14} className="text-g-red" /> NCERT Class 10 syllabus
        </div>
      </div>
    </footer>
  );
}
