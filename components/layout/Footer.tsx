import Link from "next/link";
import { SUBJECTS, totalChapters } from "@/lib/syllabus";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-[#30363d] bg-white dark:bg-[#0d1117] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl grid place-items-center text-white bg-slate-900 dark:bg-white dark:text-slate-900">
              <Icon name="graduationCap" size={20} />
            </span>
            <span className="font-extrabold text-[16.5px] tracking-tight">Class 10 Learning Hub</span>
          </div>
          <p className="text-sm text-ink-mute dark:text-slate-400 mt-3 leading-relaxed">
            A free digital classroom for smart boards — slides, mind maps, quizzes, and an advanced Smart Board. No login, no fees, works on every device.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-ink-soft dark:text-slate-300">
              <Icon name="layers" size={14} /> {totalChapters()} chapters
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-ink-soft dark:text-slate-300">
              <Icon name="layoutGrid" size={14} /> {SUBJECTS.length} subjects
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-ink-soft dark:text-slate-300">
              <Icon name="zap" size={14} /> Free forever
            </span>
          </div>
        </div>
        <div>
          <h4 className="eyebrow mb-3">Subjects</h4>
          <div className="grid gap-1">
            {SUBJECTS.map((s) => (
              <Link key={s.id} href={`/subjects/${s.id}`} className="flex items-center gap-2.5 text-sm py-1.5 text-ink-soft dark:text-slate-300 hover:text-black dark:hover:text-white font-medium transition">
                <Icon name={s.icon} size={16} className="text-ink-mute dark:text-slate-500" /> {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow mb-3">Teachers</h4>
          <div className="grid gap-1 text-sm font-medium">
            <Link href="/smart-board" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-black dark:hover:text-white transition"><Icon name="squarePen" size={16} className="text-ink-mute dark:text-slate-500" /> Smart Board</Link>
            <Link href="/smart-board?layout=split" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-black dark:hover:text-white transition"><Icon name="columns2" size={16} className="text-ink-mute dark:text-slate-500" /> Split View</Link>
            <Link href="/smart-board?bg=graph" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-black dark:hover:text-white transition"><Icon name="activity" size={16} className="text-ink-mute dark:text-slate-500" /> Graph Board</Link>
            <Link href="/admin" className="flex items-center gap-2.5 py-1.5 text-ink-soft dark:text-slate-300 hover:text-black dark:hover:text-white transition"><Icon name="shieldCheck" size={16} className="text-ink-mute dark:text-slate-500" /> Admin Panel</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center gap-1.5 text-[13px] text-ink-mute dark:text-slate-500">
          Crafted for classrooms <Icon name="heart" size={13} className="text-slate-300 dark:text-slate-600" /> NCERT Class 10 syllabus
        </div>
      </div>
    </footer>
  );
}
