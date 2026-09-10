import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSubject, getChapter, allChapterKeys } from "@/lib/syllabus";
import { chapterDetail } from "@/lib/content";
import ChapterView from "@/components/chapter/ChapterView";
import { Icon } from "@/components/ui/Icon";
import { ncertPdf, boardHref } from "@/lib/ncert";

export function generateStaticParams() {
 return allChapterKeys().map((k) => ({
 subjectId: k.s, groupIdx: String(k.g), chapterIdx: String(k.c),
 }));
}

export async function generateMetadata({ params }: { params: { subjectId: string; groupIdx: string; chapterIdx: string } }): Promise<Metadata> {
 const f = getChapter(params.subjectId, +params.groupIdx, +params.chapterIdx);
 if (!f) return {};
 return {
 title: `Ch ${f.ch.n}: ${f.ch.title} — ${f.sub.name}`,
 description: `${f.sub.name} Chapter ${f.ch.n}: ${f.ch.title} — slides, notes, quiz and revision. ${f.ch.hi || ""}`,
 };
}

export default function ChapterPage({ params }: { params: { subjectId: string; groupIdx: string; chapterIdx: string } }) {
 const f = getChapter(params.subjectId, +params.groupIdx, +params.chapterIdx);
 if (!f) notFound();
 const { sub } = f;
 const g = +params.groupIdx, c = +params.chapterIdx;

 const flat: { gi: number; ci: number }[] = [];
 sub.groups.forEach((gr, gi) => gr.chapters.forEach((_cc, ci) => flat.push({ gi, ci })));
 const idx = flat.findIndex((x) => x.gi === g && x.ci === c);
 const prev = flat[idx - 1], next = flat[idx + 1];
 const href = (p: { gi: number; ci: number } | undefined) =>
 p ? `/chapter/${sub.id}/${p.gi}/${p.ci}` : null;

 const isAuto = !chapterDetail(f.key);
 const pdf = ncertPdf(f.key, f.ch.title);
 const bHref = boardHref(f.key, f.ch.title);
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4 flex-wrap">
 <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
 <Icon name="chevronRight" size={14} />
 <Link href={`/subjects/${sub.id}`} className="flex items-center gap-1 hover:text-black transition">
 <Icon name={getSubject(sub.id)?.icon || "book"} size={15} /> {sub.name}
 </Link>
 <Icon name="chevronRight" size={14} />
 <span className="text-ink font-semibold">Ch {f.ch.n}</span>
 </nav>
 <div className="flex items-center gap-3 flex-wrap">
 <span className="w-12 h-12 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
 <Icon name={sub.icon} size={24} />
 </span>
 <div>
 <h1 className="text-xl sm:text-[26px] font-extrabold tracking-tight leading-tight">Chapter {f.ch.n}: {f.ch.title}</h1>
 <p className="text-ink-mute text-sm">{f.ch.hi || ""}</p>
 </div>
 {isAuto && (
 <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ">
 <Icon name="info" size={13} /> Auto guide
 </span>
 )}
 </div>
 {pdf && bHref && (
 <div className="flex gap-2 mt-4 flex-wrap">
 <a href={pdf.direct} target="_blank" rel="noopener noreferrer" className="btn-g btn-g-blue text-[13.5px]">
 <Icon name="fileText" size={17} /> NCERT PDF
 </a>
 <Link href={bHref} className="btn-g btn-g-white text-[13.5px]">
 <Icon name="squarePen" size={17} /> Open in Board
 </Link>
 </div>
 )}
 <div className="mt-4"><ChapterView found={f} prevHref={href(prev)} nextHref={href(next)} /></div>
 </div>
 );
}
