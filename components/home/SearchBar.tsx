"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SUBJECTS } from "@/lib/syllabus";
import { PYQ_MATHS_SEO } from "@/lib/pyqSeo";
import { Icon } from "@/components/ui/Icon";

interface Hit {
  href: string;
  icon: string;
  title: string;
  sub: string;
  keywords: string;
}

const GLOBAL_HITS: Hit[] = [
  {
    href: "/pyq",
    icon: "trophy",
    title: "Class 10 PYQs — Previous Year Questions",
    sub: "CBSE board exam practice",
    keywords:
      "pyq pyqs previous year questions cbse board class 10th chapter wise all subjects pdf maths",
  },
  {
    href: "/pyq/maths",
    icon: "calculator",
    title: "Class 10 Maths PYQs — Chapter-wise",
    sub: "Mathematics previous year questions",
    keywords:
      "maths mathematics pyq pyqs previous year questions cbse board class 10th chapter wise",
  },
  {
    href: "/smart-board",
    icon: "squarePen",
    title: "Smart Board",
    sub: "Annotate PDFs and teach",
    keywords: "smart board whiteboard pdf annotate draw classroom teacher",
  },
];

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const hits: Hit[] = useMemo(() => {
    if (q.trim().length < 2) return [];
    const needle = q.trim().toLowerCase();
    const out: Hit[] = [];

    GLOBAL_HITS.forEach((h) => {
      if (`${h.title} ${h.sub} ${h.keywords}`.toLowerCase().includes(needle)) out.push(h);
    });

    PYQ_MATHS_SEO.forEach((c) => {
      const title = `Ch ${c.n}: ${c.name} PYQs`;
      const keywords = `pyq pyqs maths mathematics previous year questions cbse board class 10th chapter wise chapter ${c.n} ${c.name} ${c.unit}`;
      if (`${title} ${keywords}`.toLowerCase().includes(needle)) {
        out.push({
          href: c.path,
          icon: "trophy",
          title,
          sub: `Maths PYQ · ${c.unit}`,
          keywords,
        });
      }
    });

    SUBJECTS.forEach((s) =>
      s.groups.forEach((gr, gi) =>
        gr.chapters.forEach((c, ci) => {
          const title = `Ch ${c.n}: ${c.title}`;
          const keywords = `${s.name} ${s.id} ${gr.label} ${c.title} ${c.hi || ""} chapter notes slides quiz`;
          if (`${title} ${keywords}`.toLowerCase().includes(needle)) {
            out.push({
              href: `/chapter/${s.id}/${gi}/${ci}`,
              icon: s.icon,
              title,
              sub: `${s.name}${c.hi ? ` · ${c.hi}` : ""}`,
              keywords,
            });
          }
        })
      )
    );

    return out.slice(0, 10);
  }, [q]);

  return (
    <div className="relative max-w-2xl mx-auto z-10 px-4 sm:px-6">
      <div className="flex items-center gap-3 bg-white border border-slate-300 rounded-full shadow-card pl-5 pr-2 py-2 focus-within:border-slate-900 transition">
        <Icon name="search" size={20} className="text-ink-mute " />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search chapters or PYQs — try Maths PYQ, Triangles, NLP"
          className="flex-1 bg-transparent outline-none text-[15px] py-2 placeholder:text-ink-mute "
          aria-label="Search chapters and PYQs"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear"
            className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 text-ink-mute">
            <Icon name="x" size={17} />
          </button>
        )}
      </div>
      {open && q.trim().length >= 2 && (
        <div className="absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-pop overflow-hidden max-h-80 overflow-y-auto">
          {hits.length ? hits.map((h) => (
            <Link key={h.href} href={h.href}
              className="group flex gap-3 items-center px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 ">
              <span className="w-9 h-9 rounded-lg grid place-items-center bg-slate-100 text-slate-600 flex-none">
                <Icon name={h.icon} size={17} />
              </span>
              <span className="min-w-0"><b className="text-sm block truncate">{h.title}</b>
                <small className="text-ink-mute ">{h.sub}</small></span>
              <Icon name="arrowUpRight" size={16} className="ml-auto text-ink-mute opacity-0 group-hover:opacity-100 transition" />
            </Link>
          )) : (
            <div className="flex items-center gap-2.5 px-5 py-4 text-sm text-ink-mute">
              <Icon name="search" size={17} /> No result found — try “Maths PYQ” or a chapter name
            </div>
          )}
        </div>
      )}
    </div>
  );
}
