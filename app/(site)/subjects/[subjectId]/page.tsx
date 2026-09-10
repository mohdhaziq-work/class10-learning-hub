import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SUBJECTS, getSubject } from "@/lib/syllabus";
import SubjectChapters from "@/components/subject/SubjectChapters";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subjectId: s.id }));
}

export async function generateMetadata({ params }: { params: { subjectId: string } }): Promise<Metadata> {
  const sub = getSubject(params.subjectId);
  if (!sub) return {};
  return { title: `${sub.icon} ${sub.name} — Chapters`, description: sub.tagline };
}

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const sub = getSubject(params.subjectId);
  if (!sub) notFound();
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="text-[13.5px] font-semibold text-ink-mute dark:text-slate-400 mt-5 mb-2">
        <Link href="/" className="hover:text-brand-600">Home</Link> › {sub.name}
      </div>
      <h1 className="text-3xl font-black tracking-tight">{sub.icon} {sub.name} <span className="text-base font-semibold text-ink-mute dark:text-slate-400">{sub.hindi}</span></h1>
      <p className="text-slate-600 dark:text-slate-300 mt-1 mb-4 max-w-2xl">{sub.tagline}</p>
      <SubjectChapters sub={sub} />
    </div>
  );
}
