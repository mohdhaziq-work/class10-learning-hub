"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ChapterFound } from "@/lib/syllabus";
import { chapterDetail, autoDetail, type ChapterDetail, type QuizQ } from "@/lib/content";
import { useMergedDetail } from "@/lib/overrides";
import { useProgress } from "@/lib/progress";

/* ---------------- Slides ---------------- */
function Slides({ slides }: { slides: NonNullable<ChapterDetail["slides"]> }) {
  const [i, setI] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const go = useCallback((d: number) => setI((v) => (v + d + slides.length) % slides.length), [slides.length]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);
  const sl = slides[i];
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
      <div ref={stageRef} className="slide-stage">
        <div className="text-xs font-extrabold tracking-[.14em] uppercase text-indigo-300 relative">{sl.kicker}</div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight my-2 relative">{sl.title}</h2>
        <ul className="list-disc pl-5 text-[15px] sm:text-[17px] leading-8 text-indigo-100 relative">
          {(sl.points || []).map((p, k) => <li key={k}>{p}</li>)}
        </ul>
        {sl.formula && <div className="formula-big relative">{sl.formula}</div>}
      </div>
      <div className="flex gap-2.5 items-center mt-3.5 flex-wrap no-print">
        <button onClick={() => go(-1)} className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card">← Prev</button>
        <button onClick={() => go(1)} className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card">Next →</button>
        <button onClick={() => { const el = stageRef.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); }}
          className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card">⛶ Fullscreen (Smart Board)</button>
        <span className="text-[13px] font-bold text-ink-mute dark:text-slate-400">Slide {i + 1} / {slides.length}</span>
        <div className="flex gap-1.5 ml-auto">
          {slides.map((_, d) => (
            <i key={d} onClick={() => setI(d)} className={`h-[9px] rounded-full cursor-pointer transition-all ${d === i ? "w-6 bg-brand-600" : "w-[9px] bg-slate-300 dark:bg-slate-600"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Quiz ---------------- */
function Quiz({ quiz }: { quiz: QuizQ[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answered = Object.keys(picked).length;
  const score = Object.entries(picked).filter(([qi, oi]) => quiz[+qi].answer === oi).length;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
      <h3 className="font-extrabold text-lg mb-3">❓ Self-Test Quiz ({quiz.length} questions)</h3>
      {quiz.map((q, qi) => (
        <div key={qi} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-3">
          <h4 className="font-bold text-[15.5px] mb-2.5">Q{qi + 1}. {q.q}</h4>
          <div className="grid gap-2">
            {q.options.map((o, oi) => {
              const done = picked[qi] !== undefined;
              const right = q.answer === oi;
              const mine = picked[qi] === oi;
              return (
                <button key={oi} disabled={done} onClick={() => setPicked({ ...picked, [qi]: oi })}
                  className={`text-left font-semibold text-[14.5px] rounded-[11px] px-3.5 py-2.5 border-[1.5px] transition bg-white dark:bg-slate-800
                    ${done && right ? "border-green-600 bg-green-50 dark:bg-green-950" : done && mine ? "border-red-600 bg-red-50 dark:bg-red-950" : "border-slate-300 dark:border-slate-600 hover:border-brand-600"}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked[qi] !== undefined && q.why && (
            <div className="text-[13.5px] bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 mt-2">💡 {q.why}</div>
          )}
        </div>
      ))}
      {answered === quiz.length && (
        <div className="rounded-xl p-4 text-center font-extrabold text-[17px] text-white bg-gradient-to-br from-brand-600 to-violet-600">
          {score / quiz.length >= 0.8 ? `🎉 ${score}/${quiz.length} — Excellent! Chapter pakka!`
            : score / quiz.length >= 0.5 ? `👍 ${score}/${quiz.length} — Good! Galtiyan revise karo.`
            : `📚 ${score}/${quiz.length} — Notes dobara padho, phir retry karo!`}
        </div>
      )}
      <button onClick={() => setPicked({})} className="mt-3 text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600">🔄 Retry quiz</button>
    </div>
  );
}

/* ---------------- Main view ---------------- */
const TAB_LABELS: Record<string, string> = {
  slides: "📊 Slides", mindmap: "🗺️ Mind Map", flow: "🔀 Flow Chart", timeline: "⏳ Timeline",
  notes: "📝 Notes", formulas: "🧮 Formulas", examples: "✏️ Examples", diagrams: "🔬 Activities",
  words: "🔤 Word Bank", quiz: "❓ Quiz", pyq: "📌 PYQs",
};

export default function ChapterView({ found, prevHref, nextHref }: { found: ChapterFound; prevHref: string | null; nextHref: string | null }) {
  const { sub, group, ch, key } = found;
  const builtin = chapterDetail(key);
  const { detail, source } = useMergedDetail(key, builtin);
  const { toggle, isDone } = useProgress();
  const D: ChapterDetail = detail || autoDetail(ch.title, sub.name, ch.n);
  const isAuto = !detail;

  const tabs = [
    "slides",
    ...(sub.features.includes("mindmap") && D.mindmap ? ["mindmap"] : []),
    ...(sub.features.includes("flow") && D.flowchart?.length ? ["flow"] : []),
    ...(D.timeline?.length ? ["timeline"] : []),
    "notes",
    ...(sub.features.includes("formulas") && D.formulas?.length ? ["formulas"] : []),
    ...(D.examples?.length ? ["examples"] : []),
    ...(D.diagrams?.length ? ["diagrams"] : []),
    ...(D.words?.length ? ["words"] : []),
    "quiz",
    ...(D.pyq?.length ? ["pyq"] : []),
  ];
  const [tab, setTab] = useState("slides");
  const done = isDone(key);

  return (
    <>
      <div className="flex gap-2.5 flex-wrap mb-2 no-print">
        {prevHref ? <Link href={prevHref} className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">← Prev chapter</Link> : <span />}
        {nextHref && <Link href={nextHref} className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">Next chapter →</Link>}
        <button onClick={() => toggle(key)} className={`text-[13px] font-bold px-3.5 py-2 rounded-lg ${done ? "bg-green-600 text-white" : "text-white bg-gradient-to-br from-brand-600 to-violet-600"}`}>{done ? "✓ Completed" : "Mark complete"}</button>
        <Link href="/smart-board" className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600">🖊️ Smart Board par padhao</Link>
        {source !== "builtin" && <span className="text-xs font-bold px-3 py-2 rounded-lg bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">👨‍🏫 Teacher content ({source === "cloud" ? "cloud" : "this device"})</span>}
      </div>

      <div className="sticky top-[65px] z-20 py-2.5 border-b border-slate-200 dark:border-slate-700 flex gap-2 overflow-x-auto bg-slate-100/90 dark:bg-[#0d1222]/90 backdrop-blur no-print">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`tabpill border-slate-300 dark:border-slate-600 ${tab === t ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {tab === "slides" && <Slides slides={D.slides || []} />}

        {tab === "mindmap" && D.mindmap && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-2">🗺️ Mind Map — poora chapter ek nazar me</h3>
            <div className="mm-wrap"><div className="mm">
              <div className="mm-center">{D.mindmap.central}</div><div className="mm-trunk" />
              <div className="mm-branches">
                {D.mindmap.branches.map((b, i) => (
                  <div key={i} className="mm-branch bg-slate-50 dark:bg-slate-900/60" style={{ ["--bc" as string]: b.color || "#4f46e5" }}>
                    <h4>{b.label}</h4>
                    <ul className="text-slate-600 dark:text-slate-300">{(b.children || []).map((k, j) => <li key={j}>{k}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div></div>
            <div className="mt-3 border-l-4 border-brand-600 bg-brand-50 dark:bg-indigo-950 rounded-r-xl px-4 py-3 text-sm">
              <b>Classroom tip:</b> Smart board par kholo → branches ko ek-ek karke cover karke bachchon se puchho. <Link href="/smart-board" className="text-brand-600 font-bold">Smart Board me kholo 🖊️</Link>
            </div>
          </div>
        )}

        {tab === "flow" && D.flowchart && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">🔀 Flow Chart — step by step</h3>
            <div className="flow">
              {D.flowchart.map((f, i) => (
                <div key={i} className="w-full flex flex-col items-center">
                  {i > 0 && <div className="farrow">⬇</div>}
                  <div className={`fnode bg-slate-50 dark:bg-slate-900/60 ${f.type || ""}`}><h4 className="font-extrabold text-[15.5px]">{f.title}</h4><p className="text-[13.5px] text-slate-600 dark:text-slate-300 m-0">{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "timeline" && D.timeline && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">⏳ Timeline — dates pakki karo</h3>
            <div className="timeline">
              {D.timeline.map((t, i) => (
                <div key={i} className="tl-item"><b className="text-brand-600 dark:text-indigo-300">{t.y}</b><p className="text-[14.5px] text-slate-600 dark:text-slate-300 mt-0.5">{t.t}</p></div>
              ))}
            </div>
          </div>
        )}

        {tab === "notes" && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">📝 Exam-ready Notes</h3>
            <ul className="grid gap-2.5">
              {(D.notes || []).map((n, i) => (
                <li key={i} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[15px] [&_b]:text-brand-600" dangerouslySetInnerHTML={{ __html: n }} />
              ))}
            </ul>
            <div className="flex gap-2 mt-3 no-print">
              <button onClick={() => window.print()} className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600">🖨️ Print notes</button>
              <Link href="/smart-board" className="text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600">Smart Board par padhao 🖊️</Link>
            </div>
          </div>
        )}

        {tab === "formulas" && D.formulas && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">🧮 Formula Bank</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {D.formulas.map((f, i) => (
                <div key={i} className="form-card"><small className="block text-indigo-300 font-sans font-bold text-xs mb-1.5 uppercase tracking-wider">{f.name}</small><div className="text-[19px]">{f.expr}</div></div>
              ))}
            </div>
          </div>
        )}

        {tab === "examples" && D.examples?.map((e, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg">✏️ {e.title}</h3>
            <ol className="list-decimal pl-6 mt-2 space-y-1.5 text-[15px]">{e.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
            <div className="mt-3 border-l-4 border-brand-600 bg-brand-50 dark:bg-indigo-950 rounded-r-xl px-4 py-3 text-sm"><b>Answer:</b> {e.answer}</div>
          </div>
        ))}

        {tab === "diagrams" && D.diagrams?.map((d, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg">🔬 {d.title}</h3>
            <p className="text-[15px] text-slate-600 dark:text-slate-300 mt-1">{d.desc}</p>
            {d.label && <div className="inline-block mt-2 font-mono bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-600 px-4 py-2 rounded-lg">⚗️ {d.label}</div>}
          </div>
        ))}

        {tab === "words" && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">🔤 Word Bank</h3>
            <ul className="grid gap-2.5">
              {(D.words || []).map((w, i) => (
                <li key={i} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[15px]">
                  <b className="text-brand-600">{w.w}</b> — {w.m}<br /><span className="text-ink-mute dark:text-slate-400 text-[13.5px]">Ex: {w.u}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "quiz" && <Quiz quiz={D.quiz || []} />}

        {tab === "pyq" && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-extrabold text-lg mb-3">📌 Previous Year Questions (practice)</h3>
            <ul className="grid gap-2.5">
              {(D.pyq || []).map((p, i) => (
                <li key={i} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[15px]">📝 {p}</li>
              ))}
            </ul>
            <div className="mt-3 border-l-4 border-brand-600 bg-brand-50 dark:bg-indigo-950 rounded-r-xl px-4 py-3 text-sm"><b>Tip:</b> Har PYQ ko timer lagakar likho — phir NCERT se match karo.</div>
          </div>
        )}

        {isAuto && (
          <div className="rounded-2xl p-5 border-2 border-dashed border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-sm">
            <b>👨‍🏫 Teachers:</b> Is chapter ka full content abhi auto-guide mode me hai. <Link href="/admin" className="text-brand-600 font-bold underline">Admin panel</Link> se slides, notes aur quiz bharo — turant sabko dikhega.
          </div>
        )}
      </div>

      <div className="text-xs text-ink-mute dark:text-slate-500 mt-3">Group: {group.label}</div>
    </>
  );
}
