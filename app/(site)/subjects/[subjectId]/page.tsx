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
 const total = sub.groups.reduce((a, g) => a + g.chapters.length, 0);
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4">
 <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
 <Icon name="chevronRight" size={14} />
 <span className="text-ink font-semibold">{sub.name}</span>
 </nav>
 <div className="flex items-center gap-4 flex-wrap">
 <span className="w-14 h-14 rounded-2xl grid place-items-center text-white bg-slate-900 ">
 <Icon name={sub.icon} size={28} />
 </span>
 <div>
 <h1 className="text-2xl sm:text-[32px] font-extrabold tracking-tight leading-none">{sub.name}</h1>
 <p className="font-mono text-[12px] text-ink-mute mt-1.5">{total} chapters · slides, notes & quizzes</p>
 <p className="text-ink-soft mt-1 max-w-2xl text-[15px]">{sub.tagline}</p>
 </div>
 </div>
 <div className="mt-5"><SubjectChapters sub={sub} /></div>
 </div>
 );
}
