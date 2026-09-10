"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { SUBJECTS } from "@/lib/syllabus";

interface Hit { s: string; g: number; c: number; sub: string; color: string; title: string; hi: string }

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits: Hit[] = useMemo(() => {
    if (q.trim().length < 2) return [];
    const needle = q.trim().toLowerCase();
    const out: Hit[] = [];
    SUBJECTS.forEach((s) =>
      s.groups.forEach((gr, gi) =>
        gr.chapters.forEach((c, ci) => {
          if (`${c.title} ${c.hi || ""} ${s.name}`.toLowerCase().includes(needle))
            out.push({ s: s.id, g: gi, c: ci, sub: s.name, color: s.color, title: `Ch ${c.n}: ${c.title}`, hi: c.hi || "" });
        })
      )
    );
    return out.slice(0, 8);
  }, [q]);

  return (
    <div ref={boxRef} className="relative max-w-2xl mx-auto -mt-6 z-10 px-5">
      <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lift pl-4 pr-2 py-2">
        <span className="text-xl">🔍</span>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Chapter dhoondo… e.g. triangles, nationalism, letter to god"
          className="flex-1 bg-transparent outline-none text-base py-2"
        />
      </div>
      {open && q.trim().length >= 2 && (
        <div className="absolute left-5 right-5 top-full mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl shadow-lift overflow-hidden max-h-80 overflow-y-auto">
          {hits.length ? hits.map((h) => (
            <Link key={`${h.s}-${h.g}-${h.c}`} href={`/chapter/${h.s}/${h.g}/${h.c}`}
              className="flex gap-3 items-center px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: h.color }} />
              <span><b className="text-sm">{h.title}</b><br /><small className="text-ink-mute dark:text-slate-400">{h.sub}{h.hi ? ` • ${h.hi}` : ""}</small></span>
            </Link>
          )) : <div className="px-4 py-3 text-sm">Koi chapter nahi mila — spelling check karo 🔍</div>}
        </div>
      )}
    </div>
  );
}
