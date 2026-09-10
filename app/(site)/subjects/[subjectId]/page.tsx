import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SUBJECTS, getSubject } from "@/lib/syllabus";
import SubjectChapters from "@/components/subject/SubjectChapters";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subjectId: s.id }));
}

export async function generateMetadata({ params }: { params: { subjectId: string } }): Promise<Metadata> {
  const sub = getSubject(params.subjectId);
  if (!sub) return {};
  return { title: `${sub.name} — All Chapters`, description: `${sub.tagline} Class 10 ${sub.name} chapters with slides, notes and quizzes.` };
}

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const sub = getSubject(params.subjectId);
  if (!sub) notFound();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute dark:text-slate-400 mt-5 mb-3">
        <Link href="/" className="flex items-center gap-1 hover:text-brand-600"><Icon name="home" size={15} /> Home</Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink dark:text-slate-200 font-semibold">{sub.name}</span>
      </nav>
      <div className="flex items-center gap-4 flex-wrap">
        <span className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-lift" style={{ background: `linear-gradient(135deg, ${sub.color}, ${sub.color}bb)` }}>
          <Icon name={sub.icon} size={28} />
        </span>
        <div>
          <h1 className="font-display text-2xl sm:text-[32px] font-extrabold tracking-tight leading-none">{sub.name} <span className="text-base font-semibold text-ink-mute dark:text-slate-400">{sub.hindi}</span></h1>
          <p className="text-ink-soft dark:text-slate-300 mt-1.5 max-w-2xl text-[15px]">{sub.tagline}</p>
        </div>
      </div>
      <div className="mt-4"><SubjectChapters sub={sub} /></div>
    </div>
  );
}
