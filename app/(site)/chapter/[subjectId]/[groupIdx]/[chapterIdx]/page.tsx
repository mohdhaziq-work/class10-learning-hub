import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChapter, allChapterKeys } from "@/lib/syllabus";
import { chapterDetail } from "@/lib/content";
import ChapterView from "@/components/chapter/ChapterView";

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
    description: `${f.sub.name} Chapter ${f.ch.n}: ${f.ch.title} — slides, notes, quiz aur revision. ${f.ch.hi || ""}`,
  };
}

export default function ChapterPage({ params }: { params: { subjectId: string; groupIdx: string; chapterIdx: string } }) {
  const f = getChapter(params.subjectId, +params.groupIdx, +params.chapterIdx);
  if (!f) notFound();
  const { sub } = f;
  const g = +params.groupIdx, c = +params.chapterIdx;

  /* prev / next across groups */
  const flat: { gi: number; ci: number }[] = [];
  sub.groups.forEach((gr, gi) => gr.chapters.forEach((_cc, ci) => flat.push({ gi, ci })));
  const idx = flat.findIndex((x) => x.gi === g && x.ci === c);
  const prev = flat[idx - 1], next = flat[idx + 1];
  const href = (p: { gi: number; ci: number } | undefined) =>
    p ? `/chapter/${sub.id}/${p.gi}/${p.ci}` : null;

  const isAuto = !chapterDetail(f.key);
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="text-[13.5px] font-semibold text-ink-mute dark:text-slate-400 mt-5 mb-2">
        <Link href="/" className="hover:text-brand-600">Home</Link> ›{" "}
        <Link href={`/subjects/${sub.id}`} className="hover:text-brand-600">{sub.icon} {sub.name}</Link> › Ch {f.ch.n}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Chapter {f.ch.n}: {f.ch.title}</h1>
        {isAuto && <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">Auto guide — full content jald</span>}
      </div>
      <p className="text-ink-mute dark:text-slate-400 mt-1 mb-4">{f.ch.hi || ""}</p>
      <ChapterView found={f} prevHref={href(prev)} nextHref={href(next)} />
    </div>
  );
}
