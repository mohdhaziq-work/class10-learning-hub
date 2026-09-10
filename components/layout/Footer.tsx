import Link from "next/link";
import { SUBJECTS } from "@/lib/syllabus";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151d33] mt-14">
      <div className="max-w-6xl mx-auto px-5 py-9 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="font-extrabold mb-2">🎓 Class 10 Learning Hub</h4>
          <p className="text-sm text-ink-mute dark:text-slate-400">Free digital classroom — smart board par chalane ke liye banaya gaya. Koi login nahi, koi fees nahi.</p>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-ink-mute dark:text-slate-400 mb-2">Subjects</h4>
          {SUBJECTS.map((s) => (
            <Link key={s.id} href={`/subjects/${s.id}`} className="block text-sm py-0.5 text-slate-600 dark:text-slate-300 hover:text-brand-600">{s.icon} {s.name}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-ink-mute dark:text-slate-400 mb-2">Teachers</h4>
          <Link href="/smart-board" className="block text-sm py-0.5 text-slate-600 dark:text-slate-300 hover:text-brand-600">🖊️ Smart Board</Link>
          <Link href="/smart-board?layout=split" className="block text-sm py-0.5 text-slate-600 dark:text-slate-300 hover:text-brand-600">↔️ Split View</Link>
          <Link href="/admin" className="block text-sm py-0.5 text-slate-600 dark:text-slate-300 hover:text-brand-600">👨‍🏫 Admin — content edit karo</Link>
        </div>
      </div>
      <div className="text-center text-xs text-ink-mute dark:text-slate-500 pb-6 px-5">Made with ❤️ for classrooms • Free forever • NCERT Class 10 syllabus ke anusaar</div>
    </footer>
  );
}
