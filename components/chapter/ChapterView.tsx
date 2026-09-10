"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChapterFound } from "@/lib/syllabus";
import { chapterDetail, autoDetail, type ChapterDetail, type QuizQ } from "@/lib/content";
import { useMergedDetail } from "@/lib/overrides";
import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

const TABMETA: Record<string, { label: string; icon: string }> = {
  slides: { label: "Slides", icon: "presentation" },
  mindmap: { label: "Mind Map", icon: "brain" },
  flow: { label: "Flow", icon: "listOrdered" },
  timeline: { label: "Timeline", icon: "clock" },
  notes: { label: "Notes", icon: "notebookPen" },
  formulas: { label: "Formulas", icon: "sigma" },
  examples: { label: "Examples", icon: "lightbulb" },
  diagrams: { label: "Activities", icon: "flaskConical" },
  words: { label: "Words", icon: "languages" },
  quiz: { label: "Quiz", icon: "puzzle" },
  pyq: { label: "PYQ", icon: "trophy" },
};

function PHead({ icon, children, color }: { icon: string; children: React.ReactNode; color: string }) {
  return (
    <h3 className="font-display text-[18px] font-extrabold tracking-tight flex items-center gap-2.5 mb-3.5">
      <span className="w-9 h-9 rounded-xl grid place-items-center text-white flex-none" style={{ background: color }}>
        <Icon name={icon} size={18} />
      </span>
      {children}
    </h3>
  );
}

/* ---------------- Slides ---------------- */
function Slides({ slides, color }: { slides: NonNullable<ChapterDetail["slides"]>; color: string }) {
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
              className="rounded-full transition-all"
              style={{ width: k === i ? 26 : 9, height: 9, background: k === i ? color : "#c9ced6" }} />
          ))}
        </div>
      </div>
      <p className="text-[12.5px] text-ink-mute dark:text-slate-500 mt-3 flex items-center gap-1.5">
        <Icon name="keyboard" size={15} /> Tip: ← → keys se slides badlo, F11 se poori screen
      </p>
    </div>
  );
}

/* ---------------- Quiz ---------------- */
function Quiz({ quiz, color }: { quiz: QuizQ[]; color: string }) {
  const [ans, setAns] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  if (!quiz.length) return <p className="text-ink-mute text-sm">Quiz abhi taiyaar ho raha hai.</p>;
  const score = quiz.filter((q, i) => ans[i] === q.answer).length;
  return (
    <div>
      {quiz.map((q, i) => {
        const picked = ans[i];
        const ok = done && picked === q.answer;
        const bad = done && picked !== undefined && picked !== q.answer;
        return (
          <div key={i} className={`rounded-2xl border-2 p-4 sm:p-5 mb-3.5 transition ${ok ? "border-g-green bg-g-green/[.06]" : bad ? "border-g-red bg-g-red/[.05]" : "border-[#e1e3e6] dark:border-[#444746]"}`}>
            <p className="font-bold text-[15.5px] leading-snug">Q{i + 1}. {q.q}</p>
            <div className="grid gap-2 mt-3 sm:grid-cols-2">
              {q.options.map((o, k) => (
                <button key={k} disabled={done}
                  onClick={() => setAns({ ...ans, [i]: k })}
                  className={`flex items-center gap-2.5 text-left text-[14px] font-medium px-4 py-2.5 rounded-xl border-2 transition ${picked === k
                    ? "border-brand-600 bg-brand-50 dark:bg-brand-600/20 text-brand-700 dark:text-brand-100"
                    : "border-[#e1e3e6] dark:border-[#444746] hover:border-brand-300"}`}>
                  <span className="w-6 h-6 rounded-full grid place-items-center text-[12px] font-bold bg-slate-100 dark:bg-white/10 flex-none">
                    {String.fromCharCode(65 + k)}
                  </span>
                  {o}
                </button>
              ))}
            </div>
            {done && (
              <p className={`flex items-center gap-2 text-[13.5px] font-bold mt-3 ${ok ? "text-g-green" : "text-g-red"}`}>
                <Icon name={ok ? "checkCircle" : "xCircle"} size={17} />
                {ok ? "Sahi jawab!" : picked === undefined ? `Jawab nahi diya — sahi: ${q.options[q.answer]}` : `Sahi jawab: ${q.options[q.answer]}`}
              </p>
            )}
            {done && q.why && (
              <p className="flex gap-2 text-[13.5px] text-ink-soft dark:text-slate-300 mt-2 bg-slate-50 dark:bg-black/30 rounded-xl px-3.5 py-2.5">
                <Icon name="lightbulb" size={16} className="flex-none mt-0.5 text-g-amber" /> {q.why}
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
        <div className="rounded-2xl p-5 text-center text-white" style={{ background: `linear-gradient(120deg, ${color}, ${color}bb)` }}>
          <Icon name={score / quiz.length >= 0.8 ? "award" : score / quiz.length >= 0.5 ? "target" : "bookOpen"} size={34} className="mx-auto" />
          <p className="font-display text-[22px] font-extrabold mt-1">Score: {score} / {quiz.length}</p>
          <p className="text-white/90 text-[14px] font-medium">
            {score / quiz.length >= 0.8 ? "Excellent — board-ready!" : score / quiz.length >= 0.5 ? "Good — ek aur revision karo." : "Slides dobara dekho, phir try karo."}
          </p>
          <button onClick={() => { setAns({}); setDone(false); }} className="btn-g bg-white/20 text-white hover:bg-white/30 text-sm mt-3">
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
      <Icon name="checkCircle" size={18} /> Thanks — teacher tak pahunch gaya.
    </p>
  );
  return (
    <form className="flex gap-2 mt-6" onSubmit={(e) => {
      e.preventDefault();
      if (!txt.trim()) return;
      fetch("/api/bug-report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: txt }) }).catch(() => {});
      setSent(true);
    }}>
      <div className="flex items-center gap-2.5 flex-1 bg-white dark:bg-[#1e1f20] border border-[#e1e3e6] dark:border-[#444746] rounded-full pl-4 pr-2 py-1.5 focus-within:border-brand-600 transition">
        <Icon name="flag" size={16} className="text-ink-mute flex-none" />
        <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Koi galti dikhi? Yahan likho…"
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
          className={`btn-g text-sm ${done ? "text-white" : "btn-g-white"}`}
          style={done ? { background: "#188038" } : undefined}>
          <Icon name="check" size={16} strokeWidth={3} /> {done ? "Done" : "Mark done"}
        </button>
        <Link href="/smart-board" className="btn-g btn-g-dark text-sm sm:ml-auto">
          <Icon name="squarePen" size={16} /> Open in Board
        </Link>
        {source !== "builtin" && (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-full bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200">
            <Icon name="cloud" size={15} /> Teacher content ({source === "cloud" ? "cloud" : "this device"})
          </span>
        )}
      </div>

      {/* labs filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`chip-f ${active === t ? "on" : ""}`}
            style={active === t ? { background: sub.color, borderColor: sub.color } : undefined}>
            <Icon name={TABMETA[t]?.icon || "dot"} size={15} /> {TABMETA[t]?.label || t}
          </button>
        ))}
      </div>

      {/* panels */}
      <div className="mt-2">
        {active === "slides" && <Slides slides={D.slides || []} color={sub.color} />}

        {active === "mindmap" && D.mindmap && (
          <div>
            <PHead icon="brain" color={sub.color}>Mind Map — poora chapter ek nazar me</PHead>
            <div className="mm-wrap"><div className="mm">
              <div className="mm-center" style={{ background: sub.color }}>{D.mindmap.central}</div>
              <div className="mm-trunk" />
              <div className="mm-branches">
                {D.mindmap.branches.map((b, i) => (
                  <div key={i} className="mm-branch" style={{ ["--bc" as string]: b.color || sub.color }}>
                    <h4>{b.label}</h4>
                    <ul>{(b.children || []).map((k, j) => <li key={j}>{k}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div></div>
            <div className="mt-3 rounded-2xl border-l-4 px-4 py-3 text-sm bg-brand-50 dark:bg-white/5" style={{ borderColor: sub.color }}>
              <b>Classroom tip:</b> Smart board par kholo, branches ko ek-ek karke cover karke bachchon se puchho.
              {" "}<Link href="/smart-board" className="font-bold text-brand-600 dark:text-brand-300 inline-flex items-center gap-1">Smart Board me kholo <Icon name="arrowRight" size={14} /></Link>
            </div>
          </div>
        )}

        {active === "flow" && D.flowchart && (
          <div>
            <PHead icon="listOrdered" color={sub.color}>Flow Chart — step by step</PHead>
            <div className="max-w-xl mx-auto">
              {D.flowchart.map((f, i) => (
                <div key={i}>
                  <div className="flex gap-3.5 items-start bg-white dark:bg-[#1e1f20] border-2 border-[#e1e3e6] dark:border-[#444746] rounded-2xl p-4 shadow-card"
                    style={f.type === "decision" ? { borderColor: "#e37400", borderStyle: "dashed" } : f.type === "result" ? { borderColor: "#146c2e" } : undefined}>
                    <span className="w-9 h-9 rounded-xl grid place-items-center text-white font-display font-extrabold flex-none" style={{ background: sub.color }}>{i + 1}</span>
                    <span><b className="block text-[15px]">{f.title}</b>
                      {f.desc && <small className="text-ink-mute dark:text-slate-400 text-[13.5px]">{f.desc}</small>}
                      {f.type === "decision" && <small className="block text-[11.5px] font-extrabold uppercase tracking-wider text-g-amber mt-1">Decision point</small>}
                      {f.type === "result" && <small className="block text-[11.5px] font-extrabold uppercase tracking-wider text-g-green mt-1">Result</small>}
                    </span>
                  </div>
                  {i < D.flowchart!.length - 1 && <div className="flex justify-center py-1.5"><Icon name="chevronDown" size={22} style={{ color: sub.color }} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "timeline" && D.timeline && (
          <div>
            <PHead icon="clock" color={sub.color}>Timeline — dates pakki karo</PHead>
            <div className="max-w-2xl">
              {D.timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-4 h-4 rounded-full border-[3px] flex-none mt-1.5 bg-white dark:bg-[#1e1f20]" style={{ borderColor: sub.color }} />
                    {i < D.timeline!.length - 1 && <span className="w-[2.5px] flex-1 rounded" style={{ background: `${sub.color}55` }} />}
                  </div>
                  <div className="pb-6">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold px-3 py-1 rounded-full text-white" style={{ background: sub.color }}>
                      <Icon name="calendar" size={13} /> {t.y}
                    </span>
                    <p className="text-[14.5px] text-ink-soft dark:text-slate-300 mt-1.5">{t.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "notes" && (
          <div>
            <PHead icon="notebookPen" color={sub.color}>Exam-ready Notes</PHead>
            <div className="grid gap-2.5">
              {(D.notes || []).map((n, i) => (
                <div key={i} className="bg-white dark:bg-[#1e1f20] border border-[#e1e3e6] dark:border-[#444746] rounded-2xl px-4 py-3 text-[14.5px] shadow-card [&_b]:text-brand-600 dark:[&_b]:text-brand-300" dangerouslySetInnerHTML={{ __html: n }} />
              ))}
            </div>
            <div className="flex gap-2 mt-3.5 flex-wrap">
              <button onClick={() => window.print()} className="btn-g btn-g-white text-sm"><Icon name="printer" size={16} /> Print notes</button>
              <Link href="/smart-board" className="btn-g btn-g-white text-sm"><Icon name="squarePen" size={16} /> Smart Board par padhao</Link>
            </div>
          </div>
        )}

        {active === "formulas" && D.formulas && (
          <div>
            <PHead icon="sigma" color={sub.color}>Formula Bank</PHead>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {D.formulas.map((f, i) => (
                <div key={i} className="form-card">
                  <small className="block font-sans font-bold text-xs mb-1.5 uppercase tracking-wider opacity-80">{f.name}</small>
                  <div className="text-[19px]">{f.expr}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "examples" && D.examples?.map((e, i) => (
          <div key={i} className="card-g p-4 sm:p-5 mb-3.5">
            <p className="font-display font-extrabold text-[16px] flex gap-2.5 items-start">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-[13px] font-extrabold flex-none" style={{ background: sub.color }}>{i + 1}</span>
              {e.title}
            </p>
            <ol className="list-decimal pl-12 mt-2.5 space-y-1.5 text-[14.5px] text-ink-soft dark:text-slate-300">
              {e.steps.map((s, j) => <li key={j}>{s}</li>)}
            </ol>
            <div className="mt-3 ml-5 rounded-r-xl border-l-4 px-4 py-2.5 text-[14px] bg-brand-50 dark:bg-white/5" style={{ borderColor: sub.color }}>
              <b>Answer:</b> {e.answer}
            </div>
          </div>
        ))}

        {active === "diagrams" && D.diagrams?.map((d, i) => (
          <div key={i} className="card-g p-4 sm:p-5 mb-3.5">
            <p className="font-display font-extrabold text-[16px] flex items-center gap-2">
              <Icon name="penTool" size={18} style={{ color: sub.color }} /> {d.title}
            </p>
            <p className="text-[14px] text-ink-mute dark:text-slate-400 mt-1.5">{d.desc}</p>
            {d.label && <div className="inline-block mt-2.5 font-mono text-[13px] bg-slate-100 dark:bg-black/40 border border-dashed border-slate-300 dark:border-slate-600 px-4 py-2 rounded-xl">{d.label}</div>}
            <div>
              <Link href="/smart-board" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-600 dark:text-brand-300 mt-2.5">
                <Icon name="squarePen" size={15} /> Draw this on the board <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          </div>
        ))}

        {active === "words" && (
          <div>
            <PHead icon="languages" color={sub.color}>Word Bank</PHead>
            <div className="card-g divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
              {(D.words || []).map((w, i) => (
                <div key={i} className="px-4 py-3 text-[14.5px]">
                  <b style={{ color: sub.color }}>{w.w}</b> — {w.m}
                  <br /><span className="text-ink-mute dark:text-slate-400 text-[13.5px]">Ex: {w.u}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "quiz" && (
          <div>
            <PHead icon="puzzle" color={sub.color}>Self-Test Quiz ({(D.quiz || []).length} questions)</PHead>
            <Quiz quiz={D.quiz || []} color={sub.color} />
          </div>
        )}

        {active === "pyq" && (
          <div>
            <PHead icon="trophy" color={sub.color}>Previous Year Questions (practice)</PHead>
            <div className="grid gap-2.5">
              {(D.pyq || []).map((p, i) => (
                <div key={i} className="flex gap-3 bg-white dark:bg-[#1e1f20] border border-[#e1e3e6] dark:border-[#444746] rounded-2xl px-4 py-3 text-[14.5px] shadow-card">
                  <Icon name="penLine" size={17} className="flex-none mt-0.5" style={{ color: sub.color }} /> {p}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border-l-4 px-4 py-3 text-sm bg-brand-50 dark:bg-white/5" style={{ borderColor: sub.color }}>
              <b>Tip:</b> Har PYQ ko timer lagakar likho — phir NCERT se match karo.
            </div>
          </div>
        )}

        {isAuto && (
          <div className="rounded-2xl border-2 border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/60 dark:bg-white/5 p-4 sm:p-5 mt-5 flex gap-3">
            <Icon name="info" size={22} className="text-brand-600 dark:text-brand-300 flex-none mt-0.5" />
            <p className="text-[14px] text-ink-soft dark:text-slate-300">
              <b>Auto guide:</b> is chapter ka poora smart content abhi taiyaar ho raha hai.
              Teacher ho? <Link href="/admin" className="font-bold text-brand-600 dark:text-brand-300 underline underline-offset-2">Admin panel</Link> se asli content bhar do — turant sabko dikhega.
            </p>
          </div>
        )}
      </div>

      <BugRow />
    </div>
  );
}
