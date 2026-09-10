"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SUBJECTS } from "@/lib/syllabus";
import { Icon } from "@/components/ui/Icon";

interface Hit { s: string; g: number; c: number; sub: string; color: string; icon: string; title: string; hi: string }

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const hits: Hit[] = useMemo(() => {
    if (q.trim().length < 2) return [];
    const needle = q.trim().toLowerCase();
    const out: Hit[] = [];
    SUBJECTS.forEach((s) =>
      s.groups.forEach((gr, gi) =>
        gr.chapters.forEach((c, ci) => {
          if (`${c.title} ${c.hi || ""} ${s.name}`.toLowerCase().includes(needle))
            out.push({ s: s.id, g: gi, c: ci, sub: s.name, color: s.color, icon: s.icon, title: `Ch ${c.n}: ${c.title}`, hi: c.hi || "" });
        })
      )
    );
    return out.slice(0, 8);
  }, [q]);

  return (
    <div className="relative max-w-2xl mx-auto -mt-7 z-10 px-4 sm:px-6">
      <div className="flex items-center gap-3 bg-white dark:bg-[#1e1f20] border border-[#e1e3e6] dark:border-[#444746] rounded-full shadow-lift pl-5 pr-2 py-2 focus-within:border-brand-600 transition">
        <Icon name="search" size={20} className="text-ink-mute dark:text-slate-400" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search any chapter… try triangles, nationalism, NLP"
          className="flex-1 bg-transparent outline-none text-[15px] py-2 placeholder:text-ink-mute dark:placeholder:text-slate-500"
          aria-label="Search chapters"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear"
            className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-ink-mute">
            <Icon name="x" size={17} />
          </button>
        )}
      </div>
      {open && q.trim().length >= 2 && (
        <div className="absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2 bg-white dark:bg-[#1e1f20] border border-[#e1e3e6] dark:border-[#444746] rounded-2xl shadow-pop overflow-hidden max-h-80 overflow-y-auto">
          {hits.length ? hits.map((h) => (
            <Link key={`${h.s}-${h.g}-${h.c}`} href={`/chapter/${h.s}/${h.g}/${h.c}`}
              className="group flex gap-3 items-center px-4 py-3 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5">
              <span className="w-9 h-9 rounded-xl grid place-items-center text-white flex-none" style={{ background: h.color }}>
                <Icon name={h.icon} size={17} />
              </span>
              <span className="min-w-0"><b className="text-sm block truncate">{h.title}</b>
                <small className="text-ink-mute dark:text-slate-400">{h.sub}{h.hi ? ` · ${h.hi}` : ""}</small></span>
              <Icon name="arrowUpRight" size={16} className="ml-auto text-ink-mute opacity-0 group-hover:opacity-100 transition" />
            </Link>
          )) : (
            <div className="flex items-center gap-2.5 px-5 py-4 text-sm text-ink-mute">
              <Icon name="search" size={17} /> No chapter found — check spelling
            </div>
          )}
        </div>
      )}
    </div>
  );
}
