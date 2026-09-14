"use client";
/* Board PYQs — chapter-wise CBSE previous year questions.
   Maths (all 14 chapters). Every question opens on the Smart Board too. */
import { useMemo, useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PYQ_MATHS, PYQ_CHAPTERS, PYQ_TOTAL, type Pyq } from "@/lib/content/pyq";
import { Icon } from "@/components/ui/Icon";

export default function PyqPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-ink-mute">Loading PYQs…</div>}>
      <PyqInner />
    </Suspense>
  );
}

function PyqInner() {
  const params = useSearchParams();
  const [chKey, setChKey] = useState<string>("maths-0-0");
  const [filter, setFilter] = useState<number>(0); /* 0 = all, else marks */
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const c = params.get("ch");
    if (c && PYQ_MATHS[c]) setChKey(c);
  }, [params]);

  const ch = PYQ_CHAPTERS.find((x) => x.key === chKey)!;
  const list: Pyq[] = PYQ_MATHS[chKey] || [];

  const shown = useMemo(
    () => (filter ? list.filter((p) => p.m === filter) : list),
    [list, filter]
  );

  const marksCount = (m: number) => list.filter((p) => p.m === m).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* header */}
      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Board PYQs — Class 10 Maths</span>
      </nav>

      <div className="flex items-start gap-3 flex-wrap">
        <span className="w-12 h-12 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
          <Icon name="book" size={24} />
        </span>
        <div className="flex-1 min-w-[240px]">
          <h1 className="text-xl sm:text-[26px] font-extrabold tracking-tight leading-tight">
            Previous Year Questions — <span style={{ color: "#1a73e8" }}>Maths</span>
          </h1>
          <p className="text-ink-mute text-sm mt-0.5">
            Real CBSE board questions, chapter-wise ({PYQ_TOTAL}+ questions, CBSE 2019–2026). Solve on the Smart Board, check the answer, match with any PYQ site.
          </p>
        </div>
        <Link href={`/smart-board?pyq=${chKey}`} className="btn-g btn-g-dark text-[14px]">
          <Icon name="squarePen" size={16} /> Whole chapter → Board
        </Link>
      </div>

      {/* chapter chips */}
      <div className="flex gap-2 mt-6 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "thin" }}>
        {PYQ_CHAPTERS.map((c) => (
          <button
            key={c.key}
            onClick={() => { setChKey(c.key); setFilter(0); setOpen({}); }}
            className={`flex-none text-left px-4 py-2.5 rounded-2xl border transition ${
              c.key === chKey
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 hover:border-slate-400"
            }`}
          >
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-[.14em] opacity-70">
              Ch {c.n} · {(PYQ_MATHS[c.key] || []).length} Qs
            </span>
            <span className="block text-[13.5px] font-bold mt-0.5 whitespace-nowrap">{c.name}</span>
          </button>
        ))}
      </div>

      {/* chapter bar */}
      <div className="flex items-end justify-between flex-wrap gap-3 mt-4">
        <div>
          <div className="eyebrow">{ch.unit}</div>
          <h2 className="text-lg font-extrabold tracking-tight">Chapter {ch.n}: {ch.name}</h2>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-3 py-1.5 rounded-full text-[12.5px] font-bold border transition ${
                filter === m ? "bg-slate-900 text-white border-slate-900" : "bg-white text-ink-mute border-slate-200 hover:border-slate-400"
              }`}
            >
              {m === 0 ? `All ${list.length}` : `${m}m · ${marksCount(m)}`}
            </button>
          ))}
        </div>
      </div>

      {/* questions */}
      <div className="mt-4 grid gap-3 pb-16">
        {shown.length === 0 && (
          <div className="text-ink-mute text-sm border border-dashed border-slate-300 rounded-2xl p-6 text-center">
            No {filter}-mark questions tagged in this chapter yet.
          </div>
        )}
        {shown.map((p, i) => {
          const idx = list.indexOf(p);
          const id = `${chKey}-${idx}`;
          const isOpen = !!open[id];
          return (
            <div key={id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white grid place-items-center text-[12.5px] font-extrabold flex-none mt-0.5">
                  {idx + 1}
                </span>
                <p className="flex-1 text-[15px] leading-relaxed text-ink">{p.q}</p>
              </div>
              <div className="flex items-center gap-2 mt-3 ml-10 flex-wrap">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{p.y}</span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">{p.m} mark{p.m > 1 ? "s" : ""}</span>
                <button
                  onClick={() => setOpen({ ...open, [id]: !isOpen })}
                  className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition"
                >
                  {isOpen ? "Hide answer" : "Answer"}
                </button>
                <Link
                  href={`/smart-board?pyq=${chKey}.${idx}`}
                  className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition inline-flex items-center gap-1.5"
                >
                  <Icon name="squarePen" size={13} /> Solve on Board
                </Link>
              </div>
              {isOpen && (
                <div className="ml-10 mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-[14px] leading-relaxed text-ink">
                  <b className="text-[11px] font-mono uppercase tracking-[.14em] text-ink-mute block mb-1">Solution</b>
                  {p.ans}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
