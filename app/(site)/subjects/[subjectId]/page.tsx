import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SUBJECTS, getSubject } from "@/lib/syllabus";
import SubjectChapters from "@/components/subject/SubjectChapters";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
 return SUBJECTS.map((s) => ({ subjectId: s.id }));
}

export async function generateMetadata({ params }: { params: { subjectId: string } }): Promise<Metadata> {
 const sub = getSubject(params.subjectId);
 if (!sub) return {};
 const path = `/subjects/${sub.id}`;
 const title = `Class 10 ${sub.name} — All Chapters`;
 const description = `${sub.tagline} Free Class 10 ${sub.name} chapters with NCERT-aligned slides, notes, quizzes and Smart Board support.`;
 return {
 title,
 description,
 alternates: { canonical: path },
 openGraph: { title, description, url: path, type: "website" },
 };
}

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
 const sub = getSubject(params.subjectId);
 if (!sub) notFound();
 const total = sub.groups.reduce((a, g) => a + g.chapters.length, 0);
 const path = `/subjects/${sub.id}`;
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <JsonLd
 data={[
 {
 "@context": "https://schema.org",
 "@type": "Course",
 name: `Class 10 ${sub.name}`,
 description: `${sub.tagline} Free Class 10 ${sub.name} chapters with slides, notes, quizzes and Smart Board support.`,
 url: absoluteUrl(path),
 educationalLevel: "Class 10",
 inLanguage: sub.id === "hindi" ? "hi" : "en",
 teaches: sub.groups.map((g) => g.label).join(", "),
 provider: organizationJsonLd(),
 },
 breadcrumbJsonLd([
 { name: "Home", path: "/" },
 { name: sub.name, path },
 ]),
 ]}
 />
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
 {sub.id === "ai" && (
 <Link
 href="/important-questions/ai"
 className="mt-6 flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lift hover:-translate-y-0.5 transition"
 >
 <div>
 <p className="font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-ink-mute">Board exam prep</p>
 <h2 className="font-bold text-[17px] mt-1">50 Important Questions — full long answers (417)</h2>
 <p className="text-[13px] text-ink-soft mt-1">Every important long answer, unit-wise, with exam-ready solutions. Open beside the whiteboard in split view.</p>
 </div>
 <span className="flex items-center gap-1 text-[13px] font-bold text-brand-600 shrink-0">Open <Icon name="arrowUpRight" size={15} /></span>
 </Link>
 )}
 {sub.id === "sst" && (
 <Link
 href="/important-questions/sst"
 className="mt-6 flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lift hover:-translate-y-0.5 transition"
 >
 <div>
 <p className="font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-ink-mute">School paper · solved</p>
 <h2 className="font-bold text-[17px] mt-1">Half Yearly SST 2025-26 — full solved paper</h2>
 <p className="text-[13px] text-ink-soft mt-1">All 37 questions of the school paper with NCERT model answers. Open beside the whiteboard in split view and practise.</p>
 </div>
 <span className="flex items-center gap-1 text-[13px] font-bold text-brand-600 shrink-0">Open <Icon name="arrowUpRight" size={15} /></span>
 </Link>
 )}
 </div>
 );
}
