"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SUBJECTS, getChapter, chapterKey } from "@/lib/syllabus";
import { chapterDetail, type ChapterDetail, type Slide, type QuizQ, type Formula, type Word } from "@/lib/content";
import { getLocalOverride, saveOverride, deleteOverride } from "@/lib/overrides";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { Icon } from "@/components/ui/Icon";

const input = "w-full bg-white dark:bg-black/30 border border-[#e1e3e6] dark:border-[#444746] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 transition";

const TABS: { id: string; icon: string }[] = [
  { id: "slides", icon: "presentation" },
  { id: "notes", icon: "notebookPen" },
  { id: "formulas", icon: "sigma" },
  { id: "quiz", icon: "puzzle" },
  { id: "pyq", icon: "trophy" },
  { id: "words", icon: "languages" },
  { id: "mindmap+flow", icon: "gitBranch" },
];

const blankSlide: Slide = { kicker: "", title: "", points: [""], formula: "" };
const blankQuiz: QuizQ = { q: "", options: ["", "", "", ""], answer: 0, why: "" };

export default function AdminPanel() {
  const [s, setS] = useState("maths");
  const [g, setG] = useState(0);
  const [c, setC] = useState(0);
  const key = chapterKey(s, g, c);
  const found = getChapter(s, g, c);
  const [tab, setTab] = useState("slides");
  const [detail, setDetail] = useState<ChapterDetail>({});
  const [msg, setMsg] = useState("");
  const [mmJson, setMmJson] = useState("");
  const [flowJson, setFlowJson] = useState("");

  useEffect(() => {
    const d = getLocalOverride(key) || chapterDetail(key) || {};
    setDetail(JSON.parse(JSON.stringify(d)));
    setMmJson(d.mindmap ? JSON.stringify(d.mindmap, null, 1) : "");
    setFlowJson(d.flowchart ? JSON.stringify(d.flowchart, null, 1) : "");
    setMsg("");
  }, [key]);

  const sub = useMemo(() => SUBJECTS.find((x) => x.id === s)!, [s]);
  const patch = (p: Partial<ChapterDetail>) => setDetail((d) => ({ ...d, ...p }));
  const upd = <T,>(arr: T[] | undefined, i: number, v: T): T[] => {
    const a = [...(arr || [])]; a[i] = v; return a;
  };
  const del = <T,>(arr: T[] | undefined, i: number): T[] => (arr || []).filter((_, k) => k !== i);

  async function save() {
    let d: ChapterDetail = { ...detail };
    try {
      if (mmJson.trim()) d.mindmap = JSON.parse(mmJson);
      else delete d.mindmap;
      if (flowJson.trim()) d.flowchart = JSON.parse(flowJson);
      else delete d.flowchart;
    } catch {
      setMsg("Mindmap/Flow JSON me error hai — pehle fix karo");
      return;
    }
    /* khaali entries saaf karo */
    d.slides = (d.slides || []).filter((x) => x.title?.trim() || x.points?.some((p) => p.trim()));
    d.notes = (d.notes || []).filter((x) => x.trim());
    d.formulas = (d.formulas || []).filter((x) => x.name?.trim() || x.expr?.trim());
    d.quiz = (d.quiz || []).filter((x) => x.q?.trim());
    d.pyq = (d.pyq || []).filter((x) => x.trim());
    d.words = (d.words || []).filter((x) => x.w?.trim());
    setDetail(d);
    const where = await saveOverride(key, d);
    setMsg(where === "cloud" ? "Cloud (Firebase) me save ho gaya — sab devices par dikhega!" : "Is device par save ho gaya (Firebase connect karo to cloud me jayega)");
  }

  if (!found) return <p>Chapter nahi mila.</p>;

  return (
    <div className="grid gap-4 lg:grid-cols-[290px_1fr] items-start">
      {/* picker */}
      <div className="card-g p-4 sm:p-5 h-fit lg:sticky lg:top-20">
        <h3 className="font-display font-extrabold text-[16px] flex items-center gap-2 mb-3">
          <Icon name="bookOpen" size={18} className="text-brand-600" /> Chapter chuno
        </h3>
        <label className="grid gap-1.5 text-[12px] font-bold text-ink-mute dark:text-slate-400 mb-2.5">
          SUBJECT
          <select value={s} onChange={(e) => { setS(e.target.value); setG(0); setC(0); }} className={`${input} font-semibold`}>
            {SUBJECTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-[12px] font-bold text-ink-mute dark:text-slate-400 mb-2.5">
          GROUP
          <select value={g} onChange={(e) => { setG(+e.target.value); setC(0); }} className={`${input} font-semibold`}>
            {sub.groups.map((gr, i) => <option key={i} value={i}>{gr.label}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-[12px] font-bold text-ink-mute dark:text-slate-400">
          CHAPTER
          <select value={c} onChange={(e) => setC(+e.target.value)} className={`${input} font-semibold`}>
            {sub.groups[g].chapters.map((ch, i) => <option key={i} value={i}>Ch {ch.n}: {ch.title}</option>)}
          </select>
        </label>
        <div className="mt-3.5 grid gap-2">
          {chapterDetail(key)
            ? <span className="flex items-center gap-2 text-[12.5px] font-bold px-3 py-2 rounded-xl bg-g-green/15 text-g-green"><Icon name="star" size={15} /> Built-in content hai</span>
            : <span className="flex items-center gap-2 text-[12.5px] font-bold px-3 py-2 rounded-xl bg-g-amber/20 text-[#7a4a00] dark:text-g-amber"><Icon name="info" size={15} /> Auto-guide mode</span>}
          {getLocalOverride(key) && <span className="flex items-center gap-2 text-[12.5px] font-bold px-3 py-2 rounded-xl bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200"><Icon name="penLine" size={15} /> Teacher override active</span>}
          <span className={`flex items-center gap-2 text-[12.5px] font-bold px-3 py-2 rounded-xl ${isFirebaseConfigured ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-white/10 text-ink-mute dark:text-slate-400"}`}>
            <Icon name={isFirebaseConfigured ? "cloud" : "cloudOff"} size={15} /> {isFirebaseConfigured ? "Firebase connected" : "Local mode (Firebase off)"}
          </span>
        </div>
        <Link href={`/chapter/${s}/${g}/${c}`} className="btn-g btn-g-white text-sm w-full justify-center mt-3.5">
          <Icon name="eye" size={17} /> Chapter dekho
        </Link>
      </div>

      {/* editor */}
      <div className="card-g p-4 sm:p-5">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <h3 className="font-display font-extrabold text-[17px] flex items-center gap-2">
            <Icon name="pencil" size={19} className="text-brand-600" /> Edit: Ch {found.ch.n} — {found.ch.title}
          </h3>
          <span className="ml-auto flex gap-2 flex-wrap">
            <button onClick={save} className="btn-g btn-g-blue text-sm"><Icon name="save" size={16} /> Save</button>
            <button onClick={() => { if (confirm("Teacher override delete karein? (Built-in wapas aa jayega)")) { deleteOverride(key); setDetail(chapterDetail(key) || {}); setMsg("Override delete — built-in content active"); } }} className="btn-g btn-g-white text-sm">
              <Icon name="trash2" size={16} /> Reset
            </button>
          </span>
        </div>
        {msg && <div className="flex items-center gap-2 text-sm font-bold bg-brand-50 dark:bg-white/5 border border-brand-100 dark:border-white/10 rounded-xl px-3.5 py-2.5 mb-3"><Icon name="checkCircle" size={17} className="text-brand-600 flex-none" /> {msg}</div>}

        <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`chip-f flex-none ${tab === t.id ? "on" : ""}`}>
              <Icon name={t.icon} size={15} /> {t.id}
            </button>
          ))}
        </div>

        {/* SLIDES */}
        {tab === "slides" && (
          <div className="space-y-3">
            {(detail.slides || []).map((sl, i) => (
              <div key={i} className="rounded-2xl border border-[#e1e3e6] dark:border-[#444746] bg-slate-50/60 dark:bg-black/20 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <b className="text-sm font-display">Slide {i + 1}</b><span className="flex-1" />
                  <button onClick={() => patch({ slides: del(detail.slides, i) })} className="flex items-center gap-1 text-[12.5px] font-bold text-g-red hover:underline">
                    <Icon name="trash2" size={14} /> Delete
                  </button>
                </div>
                <input value={sl.kicker || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, kicker: e.target.value }) })} placeholder="Kicker — e.g. Concept 1" className={input} />
                <input value={sl.title || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, title: e.target.value }) })} placeholder="Title" className={`${input} font-bold`} />
                <textarea value={(sl.points || []).join("\n")} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, points: e.target.value.split("\n") }) })} placeholder={"Points — har line me ek\nJaise ye doosra point"} rows={3} className={`${input} font-mono`} />
                <input value={sl.formula || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, formula: e.target.value }) })} placeholder="Formula / highlight (optional)" className={`${input} font-mono`} />
              </div>
            ))}
            <button onClick={() => patch({ slides: [...(detail.slides || []), { ...blankSlide, points: [""] }] })} className="flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-200 font-bold text-sm py-3 hover:bg-brand-50 dark:hover:bg-white/5 transition">
              <Icon name="plus" size={17} /> Slide add karo
            </button>
          </div>
        )}

        {/* NOTES */}
        {tab === "notes" && (
          <div>
            <p className="text-[12.5px] text-ink-mute dark:text-slate-400 mb-1.5 flex items-center gap-1.5"><Icon name="info" size={14} /> Har line = ek note point. <b>&lt;b&gt;bold&lt;/b&gt;</b> HTML chalega.</p>
            <textarea value={(detail.notes || []).join("\n")} onChange={(e) => patch({ notes: e.target.value.split("\n") })} rows={10} className={`${input} font-mono`} />
          </div>
        )}

        {/* FORMULAS */}
        {tab === "formulas" && (
          <div className="space-y-2">
            {(detail.formulas || []).map((f: Formula, i: number) => (
              <div key={i} className="flex gap-2">
                <input value={f.name} onChange={(e) => patch({ formulas: upd(detail.formulas, i, { ...f, name: e.target.value }) })} placeholder="Naam" className={input} />
                <input value={f.expr} onChange={(e) => patch({ formulas: upd(detail.formulas, i, { ...f, expr: e.target.value }) })} placeholder="Expression — e.g. a = bq + r" className={`${input} font-mono`} />
                <button onClick={() => patch({ formulas: del(detail.formulas, i) })} className="w-11 grid place-items-center rounded-xl text-g-red hover:bg-g-red/10 transition flex-none" aria-label="Delete">
                  <Icon name="x" size={17} />
                </button>
              </div>
            ))}
            <button onClick={() => patch({ formulas: [...(detail.formulas || []), { name: "", expr: "" }] })} className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200 hover:underline">
              <Icon name="plus" size={16} /> Formula
            </button>
          </div>
        )}

        {/* QUIZ */}
        {tab === "quiz" && (
          <div className="space-y-3">
            {(detail.quiz || []).map((q, i) => (
              <div key={i} className="rounded-2xl border border-[#e1e3e6] dark:border-[#444746] bg-slate-50/60 dark:bg-black/20 p-4 space-y-2.5">
                <div className="flex items-center gap-2"><b className="text-sm font-display">Q{i + 1}</b><span className="flex-1" />
                  <button onClick={() => patch({ quiz: del(detail.quiz, i) })} className="flex items-center gap-1 text-[12.5px] font-bold text-g-red hover:underline">
                    <Icon name="trash2" size={14} /> Delete
                  </button></div>
                <input value={q.q} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, q: e.target.value }) })} placeholder="Sawaal" className={`${input} font-bold`} />
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((o, oi) => (
                    <input key={oi} value={o} onChange={(e) => { const op = [...q.options]; op[oi] = e.target.value; patch({ quiz: upd(detail.quiz, i, { ...q, options: op }) }); }} placeholder={`Option ${oi + 1}`} className={input} />
                  ))}
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <label className="text-[12.5px] font-bold flex items-center gap-1.5">Sahi jawab:
                    <select value={q.answer} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, answer: +e.target.value }) })} className={input} style={{ maxWidth: 150 }}>
                      {q.options.map((_, oi) => <option key={oi} value={oi}>Option {oi + 1}</option>)}
                    </select>
                  </label>
                  <input value={q.why || ""} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, why: e.target.value }) })} placeholder="Samjhaya (why) — optional" className={`${input} flex-1 min-w-[180px]`} />
                </div>
              </div>
            ))}
            <button onClick={() => patch({ quiz: [...(detail.quiz || []), JSON.parse(JSON.stringify(blankQuiz))] })} className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200 hover:underline">
              <Icon name="plus" size={16} /> Question
            </button>
          </div>
        )}

        {/* PYQ */}
        {tab === "pyq" && (
          <div>
            <p className="text-[12.5px] text-ink-mute dark:text-slate-400 mb-1.5">Har line = ek PYQ.</p>
            <textarea value={(detail.pyq || []).join("\n")} onChange={(e) => patch({ pyq: e.target.value.split("\n") })} rows={8} className={`${input} font-mono`} />
          </div>
        )}

        {/* WORDS */}
        {tab === "words" && (
          <div className="space-y-2">
            {(detail.words || []).map((w: Word, i: number) => (
              <div key={i} className="grid sm:grid-cols-3 gap-2">
                <input value={w.w} onChange={(e) => patch({ words: upd(detail.words, i, { ...w, w: e.target.value }) })} placeholder="Word" className={`${input} font-bold`} />
                <input value={w.m} onChange={(e) => patch({ words: upd(detail.words, i, { ...w, m: e.target.value }) })} placeholder="Matlab" className={input} />
                <div className="flex gap-2">
                  <input value={w.u} onChange={(e) => patch({ words: upd(detail.words, i, { ...w, u: e.target.value }) })} placeholder="Example sentence" className={input} />
                  <button onClick={() => patch({ words: del(detail.words, i) })} className="w-11 grid place-items-center rounded-xl text-g-red hover:bg-g-red/10 transition flex-none" aria-label="Delete">
                    <Icon name="x" size={17} />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => patch({ words: [...(detail.words || []), { w: "", m: "", u: "" }] })} className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200 hover:underline">
              <Icon name="plus" size={16} /> Word
            </button>
          </div>
        )}

        {/* MINDMAP + FLOW */}
        {tab === "mindmap+flow" && (
          <div className="space-y-3">
            <div>
              <p className="text-[12.5px] font-bold mb-1.5 flex items-center gap-1.5"><Icon name="brain" size={15} /> Mindmap JSON <span className="font-normal text-ink-mute">(khaali = no mindmap)</span></p>
              <textarea value={mmJson} onChange={(e) => setMmJson(e.target.value)} rows={8} spellCheck={false}
                placeholder={'{"central": "Chapter naam", "branches": [{"label": "Part 1", "color": "#2563eb", "children": ["a", "b"]}]}'}
                className={`${input} font-mono text-xs`} />
            </div>
            <div>
              <p className="text-[12.5px] font-bold mb-1.5 flex items-center gap-1.5"><Icon name="listOrdered" size={15} /> Flowchart JSON <span className="font-normal text-ink-mute">(type: "" / "decision" / "result")</span></p>
              <textarea value={flowJson} onChange={(e) => setFlowJson(e.target.value)} rows={6} spellCheck={false}
                placeholder={'[{"title": "Step 1", "desc": "..."}, {"title": "Faisla?", "type": "decision"}]'}
                className={`${input} font-mono text-xs`} />
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4 flex-wrap">
          <button onClick={save} className="btn-g btn-g-blue text-sm"><Icon name="save" size={16} /> Save chapter</button>
          <button onClick={() => {
            const blob = new Blob([JSON.stringify({ key, detail }, null, 2)], { type: "application/json" });
            const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${key}.json`; a.click();
          }} className="btn-g btn-g-white text-sm"><Icon name="download" size={16} /> Export JSON</button>
          <label className="btn-g btn-g-white text-sm cursor-pointer"><Icon name="upload" size={16} /> Import JSON
            <input type="file" accept=".json" hidden onChange={(e) => {
              const f = e.target.files?.[0]; if (!f) return;
              const rd = new FileReader();
              rd.onload = () => {
                try {
                  const j = JSON.parse(String(rd.result));
                  const d = (j.detail || j) as ChapterDetail;
                  setDetail(d);
                  setMmJson(d.mindmap ? JSON.stringify(d.mindmap, null, 1) : "");
                  setFlowJson(d.flowchart ? JSON.stringify(d.flowchart, null, 1) : "");
                  setMsg("JSON load ho gaya — Save dabao");
                } catch { setMsg("JSON samajh nahi aaya"); }
              };
              rd.readAsText(f);
            }} />
          </label>
        </div>
      </div>
    </div>
  );
}
