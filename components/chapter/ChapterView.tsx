"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChapterFound } from "@/lib/syllabus";
import { chapterDetail, autoDetail, type ChapterDetail, type QuizQ } from "@/lib/content";
import { useMergedDetail } from "@/lib/overrides";
import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";
import MindMapInteractive from "@/components/chapter/MindMapInteractive";
import ActivityArt from "@/components/chapter/ActivityArt";
import { EXTRA_QUIZ } from "@/lib/content/quizExtra";
import { SST_MCQ } from "@/lib/content/sstMcq";
import { FORMULA_GUIDE } from "@/lib/content/formulaGuide";
import { ACTIVITIES } from "@/lib/content/activities";

const TABMETA: Record<string, { label: string; icon: string }> = {
 slides: { label: "Slides", icon: "presentation" },
 mindmap: { label: "Mind Map", icon: "brain" },
 flow: { label: "Flow", icon: "listOrdered" },
 timeline: { label: "Timeline", icon: "clock" },
 notes: { label: "Notes", icon: "notebookPen" },
 formulas: { label: "Formulas", icon: "sigma" },
 examples: { label: "Examples", icon: "lightbulb" },
 diagrams: { label: "Diagrams", icon: "flaskConical" },
 activities: { label: "Activities", icon: "flask" },
 words: { label: "Words", icon: "languages" },
 quiz: { label: "Quiz", icon: "puzzle" },
 pyq: { label: "PYQ", icon: "trophy" },
};

function PHead({ icon, children }: { icon: string; children: React.ReactNode }) {
 return (
 <h3 className="text-[18px] font-extrabold tracking-tight flex items-center gap-2.5 mb-3.5">
 <span className="w-9 h-9 rounded-xl grid place-items-center text-white bg-slate-900 flex-none">
 <Icon name={icon} size={18} />
 </span>
 {children}
 </h3>
 );
}

/* ---------------- Slides ---------------- */
function Slides({ slides }: { slides: NonNullable<ChapterDetail["slides"]> }) {
 const [i, setI] = useState(0);
 const [auto, setAuto] = useState(false);
 const n = slides.length || 1;
 useEffect(() => {
 if (!auto || slides.length < 2) return;
 const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4000);
 return () => clearInterval(t);
 }, [auto, slides.length]);
 useEffect(() => {
 const f = (e: KeyboardEvent) => {
 if (!slides.length) return;
 if (e.key === "ArrowRight") setI((x) => (x + 1) % slides.length);
 if (e.key === "ArrowLeft") setI((x) => (x - 1 + slides.length) % slides.length);
 };
 window.addEventListener("keydown", f);
 return () => window.removeEventListener("keydown", f);
 }, [slides.length]);
 const s = slides[i] || {};
 return (
 <div>
 <div className="slide-stage" key={i}>
 {s.kicker && <p className="slide-kicker">{s.kicker} · Slide {i + 1}/{n}</p>}
 <h2 className="slide-title">{s.title || "Slide"}</h2>
 <ul className="slide-points">
 {(s.points || []).map((p, k) => <li key={k}>{p}</li>)}
 </ul>
 {s.formula && <div className="formula-big">{s.formula}</div>}
 </div>
 <div className="flex items-center gap-2 mt-4 flex-wrap">
 <button onClick={() => setI((i - 1 + n) % n)} className="btn-g btn-g-white text-sm" aria-label="Previous slide">
 <Icon name="chevronLeft" size={17} /> Prev
 </button>
 <button onClick={() => setI((i + 1) % n)} className="btn-g btn-g-white text-sm" aria-label="Next slide">
 Next <Icon name="chevronRight" size={17} />
 </button>
 <button onClick={() => setAuto(!auto)} className={`btn-g text-sm ${auto ? "btn-g-blue" : "btn-g-white"}`}>
 <Icon name={auto ? "pause" : "play"} size={16} /> {auto ? "Stop" : "Auto-play"}
 </button>
 <button onClick={() => (document.querySelector(".slide-stage") as HTMLElement)?.requestFullscreen?.()} className="btn-g btn-g-white text-sm">
 <Icon name="maximize" size={16} /> Full screen
 </button>
 <div className="flex gap-1.5 ml-auto">
 {slides.map((_, k) => (
 <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
 className={`rounded-full transition-all ${k === i ? "bg-slate-900 " : "bg-slate-300 "}`}
 style={{ width: k === i ? 26 : 9, height: 9 }} />
 ))}
 </div>
 </div>
 <p className="text-[12.5px] text-ink-mute mt-3 flex items-center gap-1.5">
 <Icon name="keyboard" size={15} /> Tip: use the ← → keys to change slides, F11 for full screen
 </p>
 </div>
 );
}

/* Deterministic option shuffle.
   Content banks conventionally store the correct option first (answer: 0), so
   without this the correct choice was almost always displayed as option A and
   a student could score full marks by always tapping A. The order is derived
   from the question text itself, so it is stable across re-renders (options
   never jump while a student is answering) yet varied across questions. */
function optionOrder(seed: string, n: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  let s = h >>> 0;
  const rnd = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  return idx;
}

/* ---------------- Quiz ---------------- */
function Quiz({ quiz }: { quiz: QuizQ[] }) {
 const [ans, setAns] = useState<Record<number, number>>({});
 const [done, setDone] = useState(false);
 const [topic, setTopic] = useState("__all");
 /* stable shuffled option order per question (see optionOrder above) */
 const orders = useMemo(() => quiz.map((q) => optionOrder(q.q, q.options.length)), [quiz]);
 /* every question that carries a topic can be practised topic by topic */
 const topics = useMemo(
 () => Array.from(new Set(quiz.map((q) => q.topic).filter(Boolean))) as string[],
 [quiz],
 );
 if (!quiz.length) return <p className="text-ink-mute text-sm">The quiz is being prepared.</p>;
 /* answers are stored against the ORIGINAL index, so switching topics never
    wipes what the student has already marked. */
 const rows = quiz.map((q, i) => ({ q, i })).filter((r) => topic === "__all" || r.q.topic === topic);
 const score = rows.filter((r) => ans[r.i] === r.q.answer).length;
 return (
 <div>
 {topics.length > 1 && (
 <div className="mb-4">
 <p className="eyebrow mb-2">Practise by topic</p>
 <div className="flex flex-wrap gap-2">
 {["__all", ...topics].map((tp) => {
 const on = topic === tp;
 const n = tp === "__all" ? quiz.length : quiz.filter((q) => q.topic === tp).length;
 return (
 <button key={tp} onClick={() => { setTopic(tp); setDone(false); }}
 className={`text-[12.5px] font-semibold px-3.5 py-2 rounded-full border transition ${on ? "border-[#1a73e8] bg-[#1a73e8]/[.08] text-[#1a73e8]" : "border-slate-300 text-ink-soft hover:border-slate-500"}`}>
 {tp === "__all" ? `All topics (${n})` : `${tp} (${n})`}
 </button>
 );
 })}
 </div>
 </div>
 )}
 {rows.map(({ q, i }, n) => {
 const picked = ans[i];
 const ok = done && picked === q.answer;
 const bad = done && picked !== undefined && picked !== q.answer;
 return (
 <div key={i} className={`rounded-2xl border-2 p-4 sm:p-5 mb-3.5 transition ${ok ? "border-g-green bg-g-green/[.06]" : bad ? "border-g-red bg-g-red/[.05]" : "border-slate-200 "}`}>
 {q.topic && (
 <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[.12em] text-ink-mute bg-slate-100 rounded-full px-2.5 py-1 mb-2">
 <Icon name="target" size={12} /> {q.topic}
 </span>
 )}
 <p className="font-bold text-[15.5px] leading-snug">Q{n + 1}. {q.q}</p>
 <div className="grid gap-2 mt-3 sm:grid-cols-2">
 {orders[i].map((orig, k) => (
 <button key={orig} disabled={done}
 onClick={() => setAns({ ...ans, [i]: orig })}
 className={`flex items-center gap-2.5 text-left text-[14px] font-medium px-4 py-2.5 rounded-xl border-2 transition ${picked === orig
 ? "border-slate-900 bg-slate-100 "
 : "border-slate-200 hover:border-slate-400"}`}>
 <span className="w-6 h-6 rounded-full grid place-items-center text-[12px] font-bold bg-slate-200 flex-none">
 {String.fromCharCode(65 + k)}
 </span>
 {q.options[orig]}
 </button>
 ))}
 </div>
 {done && (
 <p className={`flex items-center gap-2 text-[13.5px] font-bold mt-3 ${ok ? "text-g-green" : "text-g-red"}`}>
 <Icon name={ok ? "checkCircle" : "xCircle"} size={17} />
 {ok ? "Correct!" : picked === undefined ? `Not answered — correct: ${q.options[q.answer]}` : `Correct answer: ${q.options[q.answer]}`}
 </p>
 )}
 {done && q.why && (
 <p className="flex gap-2 text-[13.5px] text-ink-soft mt-2 bg-slate-50 rounded-xl px-3.5 py-2.5">
 <Icon name="lightbulb" size={16} className="flex-none mt-0.5 text-gold" /> {q.why}
 </p>
 )}
 </div>
 );
 })}
 {!done ? (
 <button onClick={() => setDone(true)} className="btn-g btn-g-blue text-[15px] px-7 py-3">
 <Icon name="check" size={18} /> Check answers
 </button>
 ) : (
 <div className="rounded-2xl p-5 text-center text-white bg-slate-900 ">
 <Icon name={score / rows.length >= 0.8 ? "award" : score / rows.length >= 0.5 ? "target" : "bookOpen"} size={34} className="mx-auto" />
 <p className="text-[22px] font-extrabold mt-1">Score: {score} / {rows.length}</p>
 <p className="opacity-80 text-[14px] font-medium">
 {score / rows.length >= 0.8 ? "Excellent — board-ready!" : score / rows.length >= 0.5 ? "Good — revise once more." : "Review the slides, then try again."}
 </p>
 <button onClick={() => { setAns({}); setDone(false); }} className="btn-g bg-white/20 hover:bg-white/30 text-sm mt-3">
 <Icon name="refreshCw" size={16} /> Try again
 </button>
 </div>
 )}
 </div>
 );
}

/* ---------------- Bug row ---------------- */
function BugRow() {
 const [sent, setSent] = useState(false);
 const [txt, setTxt] = useState("");
 if (sent) return (
 <p className="flex items-center gap-2 text-[14px] font-semibold text-g-green mt-6">
 <Icon name="checkCircle" size={18} /> Thanks — sent to the teacher.
 </p>
 );
 return (
 <form className="flex gap-2 mt-6" onSubmit={(e) => {
 e.preventDefault();
 if (!txt.trim()) return;
 fetch("/api/bug-report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: txt }) }).catch(() => {});
 setSent(true);
 }}>
 <div className="flex items-center gap-2.5 flex-1 bg-white border border-slate-300 rounded-full pl-4 pr-2 py-1.5 focus-within:border-slate-900 transition">
 <Icon name="flag" size={16} className="text-ink-mute flex-none" />
 <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Spotted a mistake? Write it here…"
 className="flex-1 bg-transparent outline-none text-sm min-w-0" maxLength={300} />
 <button className="btn-g btn-g-blue text-[13px] !py-2 flex-none"><Icon name="send" size={15} /> Send</button>
 </div>
 </form>
 );
}

/* ---------------- Main ---------------- */
export default function ChapterView({ found, prevHref, nextHref }: { found: ChapterFound; prevHref: string | null; nextHref: string | null }) {
 const { sub, ch, key } = found;
 const builtin = chapterDetail(key);
 const { detail, source } = useMergedDetail(key, builtin);
 const { toggle, isDone } = useProgress();
 const D: ChapterDetail = detail || autoDetail(ch.title, sub.name, ch.n);
 const isAuto = !detail;

 /* Slides tab temporarily deactivated platform-wide (Slides renderer preserved for reinstatement). */
 const acts = ACTIVITIES[key] || D.activities;
 const tabs = [
 ...(sub.features.includes("mindmap") && D.mindmap ? ["mindmap"] : []),
 ...(sub.features.includes("flow") && D.flowchart?.length ? ["flow"] : []),
 ...(D.timeline?.length ? ["timeline"] : []),
 ...(sub.id === "maths" ? [] : ["notes"]),
 ...(sub.features.includes("formulas") && (D.formulas?.length || FORMULA_GUIDE[key]?.length) ? ["formulas"] : []),
 ...(D.examples?.length ? ["examples"] : []),
 ...(acts?.length ? ["activities"] : []),
 ...(D.diagrams?.length ? ["diagrams"] : []),
 ...(D.words?.length ? ["words"] : []),
 "quiz",
 ...(sub.id === "maths" ? [] : D.pyq?.length ? ["pyq"] : []),
 ];
 const [tab, setTab] = useState("slides");
 const active = tabs.includes(tab) ? tab : tabs[0];
 const done = isDone(key);

 return (
 <div>
 {/* action row */}
 <div className="flex items-center gap-2 flex-wrap mb-4">
 {prevHref
 ? <Link href={prevHref} className="btn-g btn-g-white text-sm"><Icon name="arrowLeft" size={16} /> Prev</Link>
 : <span className="btn-g btn-g-white text-sm opacity-40 pointer-events-none"><Icon name="arrowLeft" size={16} /> Prev</span>}
 {nextHref
 ? <Link href={nextHref} className="btn-g btn-g-white text-sm"><Icon name="arrowRight" size={16} /> Next</Link>
 : <span className="btn-g btn-g-white text-sm opacity-40 pointer-events-none"><Icon name="arrowRight" size={16} /> Next</span>}
 <button onClick={() => toggle(key)}
 className={`btn-g text-sm ${done ? "btn-g-dark" : "btn-g-white"}`}>
 <Icon name="check" size={16} strokeWidth={3} /> {done ? "Done" : "Mark done"}
 </button>
 <Link href="/smart-board" className="btn-g btn-g-dark text-sm sm:ml-auto">
 <Icon name="squarePen" size={16} /> Open in Board
 </Link>
 {source !== "builtin" && (
 <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-full bg-brand-50 text-brand-700 ">
 <Icon name="cloud" size={15} /> Teacher content ({source === "cloud" ? "cloud" : "this device"})
 </span>
 )}
 </div>

 {/* filter chips */}
 <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
 {tabs.map((t) => (
 <button key={t} onClick={() => setTab(t)} className={`chip-f ${active === t ? "on" : ""}`}>
 <Icon name={TABMETA[t]?.icon || "dot"} size={15} /> {TABMETA[t]?.label || t}
 </button>
 ))}
 </div>

 {/* panels */}
 <div className="mt-2">
 {active === "slides" && <Slides slides={D.slides || []} />}

 {active === "mindmap" && D.mindmap && (
 <div>
 <PHead icon="brain">Mind Map — explore node by node</PHead>
 <MindMapInteractive data={D.mindmap} />
 <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
 <b>Classroom tip:</b> open it on the smart board, cover the branches one by one, and ask the class.
 {" "}<Link href="/smart-board" className="font-bold text-brand-600 inline-flex items-center gap-1">Open in Smart Board <Icon name="arrowRight" size={14} /></Link>
 </div>
 </div>
 )}

 {active === "flow" && D.flowchart && (
 <div>
 <PHead icon="listOrdered">Flow Chart — step by step</PHead>
 <div className="max-w-xl mx-auto">
 {D.flowchart.map((f, i) => (
 <div key={i}>
 <div className="flex gap-3.5 items-start bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-card"
 style={f.type === "decision" ? { borderColor: "#e37400", borderStyle: "dashed" } : f.type === "result" ? { borderColor: "#146c2e" } : undefined}>
 <span className="w-9 h-9 rounded-xl grid place-items-center text-white bg-slate-900 font-extrabold flex-none">{i + 1}</span>
 <span><b className="block text-[15px]">{f.title}</b>
 {f.desc && <small className="text-ink-mute text-[13.5px]">{f.desc}</small>}
 {f.type === "decision" && <small className="block text-[11.5px] font-extrabold uppercase tracking-wider text-amber-700 mt-1">Decision point</small>}
 {f.type === "result" && <small className="block text-[11.5px] font-extrabold uppercase tracking-wider text-g-green mt-1">Result</small>}
 </span>
 </div>
 {i < D.flowchart!.length - 1 && <div className="flex justify-center py-1.5"><Icon name="chevronDown" size={22} className="text-slate-300 " /></div>}
 </div>
 ))}
 </div>
 </div>
 )}

 {active === "timeline" && D.timeline && (
 <div>
 <PHead icon="clock">Timeline — master the dates</PHead>
 <div className="max-w-2xl">
 {D.timeline.map((t, i) => (
 <div key={i} className="flex gap-4">
 <div className="flex flex-col items-center">
 <span className="w-4 h-4 rounded-full border-[3px] border-slate-900 flex-none mt-1.5 bg-white " />
 {i < D.timeline!.length - 1 && <span className="w-[2.5px] flex-1 rounded bg-slate-200 " />}
 </div>
 <div className="pb-6">
 <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold px-3 py-1 rounded-full bg-slate-900 text-white ">
 <Icon name="calendar" size={13} /> {t.y}
 </span>
 <p className="text-[14.5px] text-ink-soft mt-1.5">{t.t}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {active === "notes" && (
 <div>
 <PHead icon="notebookPen">Exam-ready Notes</PHead>
 <div className="pw-stack">
 {(D.notes || []).map((n, i) => (
 <div key={i} className="pw-note">
 <span className="pw-no">{String(i + 1).padStart(2, "0")}</span>
 <div className="pw-body" dangerouslySetInnerHTML={{ __html: n }} />
 </div>
 ))}
 </div>
 <div className="flex gap-2 mt-3.5 flex-wrap">
 <button onClick={() => window.print()} className="btn-g btn-g-white text-sm"><Icon name="printer" size={16} /> Print notes</button>
 <Link href="/smart-board" className="btn-g btn-g-white text-sm"><Icon name="squarePen" size={16} /> Teach on Smart Board</Link>
 </div>
 </div>
 )}

 {active === "formulas" && D.formulas && (
 <div>
 <PHead icon="sigma">Formula Bank — with application guide</PHead>
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
 {(D.formulas || []).map((f, i) => (
 <div key={i} className="form-card">
 <small className="block font-sans font-bold text-xs mb-1.5 uppercase tracking-wider opacity-70">{f.name}</small>
 <div className="text-[19px]">{f.expr}</div>
 {f.use && <p className="form-use">{f.use}</p>}
 </div>
 ))}
 </div>
 {(FORMULA_GUIDE[key] || []).length > 0 && (
 <div className="mt-5">
 <h3 className="font-extrabold text-[17px] tracking-tight mb-3">How &amp; where to apply — chapter guide</h3>
 <div className="grid gap-3 sm:grid-cols-2">
 {FORMULA_GUIDE[key].map((g, i) => (
 <div key={i} className="fg-card">
 <b className="fg-t">{g.t}</b>
 <p>{g.use}</p>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 )}

 {active === "examples" && D.examples?.map((e, i) => (
 <div key={i} className="card-g p-4 sm:p-5 mb-3.5">
 <p className="font-extrabold text-[16px] tracking-tight flex gap-2.5 items-start">
 <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white bg-slate-900 text-[13px] font-extrabold flex-none">{i + 1}</span>
 {e.title}
 </p>
 <ol className="list-decimal pl-12 mt-2.5 space-y-1.5 text-[14.5px] text-ink-soft ">
 {e.steps.map((s, j) => <li key={j}>{s}</li>)}
 </ol>
 <div className="mt-3 ml-5 rounded-r-xl border-l-4 border-slate-900 bg-slate-50 px-4 py-2.5 text-[14px]">
 <b>Answer:</b> {e.answer}
 </div>
 </div>
 ))}

 {active === "activities" && acts && (
 <div>
 <PHead icon="flask">NCERT Activities — visual lab</PHead>
 <div className="grid gap-4 lg:grid-cols-2">
 {acts.map((a, i) => (
 <div key={i} className="act-card">
 <div className="act-head"><span className="act-no">Activity {i + 1}</span><h3>{a.title}</h3></div>
 <ActivityArt art={a.art} />
 {a.aim && <p className="act-aim"><b>Aim:</b> {a.aim}</p>}
 <ol className="act-steps">{a.steps.map((st, j) => <li key={j}>{st}</li>)}</ol>
 {a.observe && <div className="act-box"><b>Observe:</b> {a.observe}</div>}
 {a.conclusion && <div className="act-box ok"><b>Conclusion:</b> {a.conclusion}</div>}
 </div>
 ))}
 </div>
 </div>
 )}

 {active === "diagrams" && D.diagrams?.map((d, i) => (
 <div key={i} className="card-g p-4 sm:p-5 mb-3.5">
 <p className="font-extrabold text-[16px] tracking-tight flex items-center gap-2">
 <Icon name="penTool" size={18} className="text-ink-mute" /> {d.title}
 </p>
 <p className="text-[14px] text-ink-mute mt-1.5">{d.desc}</p>
 {d.label && <div className="inline-block mt-2.5 font-mono text-[13px] bg-slate-100 border border-dashed border-slate-300 px-4 py-2 rounded-xl">{d.label}</div>}
 <div>
 <Link href="/smart-board" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-600 mt-2.5">
 <Icon name="squarePen" size={15} /> Draw this on the board <Icon name="arrowRight" size={14} />
 </Link>
 </div>
 </div>
 ))}

 {active === "words" && (
 <div>
 <PHead icon="languages">Word Bank</PHead>
 <div className="card-g divide-y divide-slate-100 overflow-hidden">
 {(D.words || []).map((w, i) => (
 <div key={i} className="px-4 py-3 text-[14.5px]">
 <b className="text-slate-900 ">{w.w}</b> — {w.m}
 <br /><span className="text-ink-mute text-[13.5px]">Ex: {w.u}</span>
 </div>
 ))}
 </div>
 </div>
 )}

 {active === "quiz" && (
 <div>
 <PHead icon="puzzle">Self-Test Quiz ({(D.quiz || []).length + (EXTRA_QUIZ[key] || []).length + (SST_MCQ[key] || []).length} questions)</PHead>
 <Quiz quiz={[...(D.quiz || []), ...(EXTRA_QUIZ[key] || []), ...(SST_MCQ[key] || [])]} />
 </div>
 )}

 {active === "pyq" && (
 <div>
 <PHead icon="trophy">Previous Year Questions (practice)</PHead>
 <div className="grid gap-2.5">
 {(D.pyq || []).map((p, i) => (
 <div key={i} className="flex gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[14.5px] shadow-card">
 <Icon name="penLine" size={17} className="flex-none mt-0.5 text-ink-mute" /> {p}
 </div>
 ))}
 </div>
 <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
 <b>Tip:</b> write every PYQ with a timer — then match it against the NCERT.
 </div>
 </div>
 )}

 {isAuto && (
 <div className="rounded-2xl border-2 border-dashed border-slate-300 p-4 sm:p-5 mt-5 flex gap-3">
 <Icon name="info" size={22} className="text-ink-mute flex-none mt-0.5" />
 <p className="text-[14px] text-ink-soft ">
 <b>Auto guide:</b> full smart content for this chapter is being prepared.
 Are you a teacher? Fill in the real content from the <Link href="/admin" className="font-bold text-brand-600 underline underline-offset-2">Admin panel</Link> — everyone will see it instantly.
 </p>
 </div>
 )}
 </div>

 <BugRow />
 </div>
 );
}
