"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SUBJECTS, getChapter, chapterKey } from "@/lib/syllabus";
import { chapterDetail, type ChapterDetail, type Slide, type QuizQ, type Formula, type Word } from "@/lib/content";
import { getLocalOverride, saveOverride, deleteOverride } from "@/lib/overrides";
import { isFirebaseConfigured } from "@/lib/firebase/config";

const input = "w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-600";
const btn = "text-[13px] font-bold px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:shadow-card transition";
const btnP = "text-[13px] font-bold px-4 py-2 rounded-lg text-white bg-gradient-to-br from-brand-600 to-violet-600 hover:-translate-y-px transition";

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
      setMsg("⚠️ Mindmap/Flow JSON me error hai — pehle fix karo");
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
    setMsg(where === "cloud" ? "☁️ Cloud (Firebase) me save ho gaya — sab devices par dikhega!" : "💾 Is device par save ho gaya (Firebase connect karo to cloud me jayega)");
  }

  if (!found) return <p>Chapter nahi mila.</p>;
  const tabs = ["slides", "notes", "formulas", "quiz", "pyq", "words", "mindmap+flow"];

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      {/* picker */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-card h-fit lg:sticky lg:top-20">
        <h3 className="font-extrabold mb-2">📚 Chapter chuno</h3>
        <label className="text-xs font-bold">Subject</label>
        <select value={s} onChange={(e) => { setS(e.target.value); setG(0); setC(0); }} className={`${input} mt-1 mb-2`}>
          {SUBJECTS.map((x) => <option key={x.id} value={x.id}>{x.icon} {x.name}</option>)}
        </select>
        <label className="text-xs font-bold">Group</label>
        <select value={g} onChange={(e) => { setG(+e.target.value); setC(0); }} className={`${input} mt-1 mb-2`}>
          {sub.groups.map((gr, i) => <option key={i} value={i}>{gr.label}</option>)}
        </select>
        <label className="text-xs font-bold">Chapter</label>
        <select value={c} onChange={(e) => setC(+e.target.value)} className={`${input} mt-1`}>
          {sub.groups[g].chapters.map((ch, i) => <option key={i} value={i}>Ch {ch.n}: {ch.title}</option>)}
        </select>
        <div className="mt-3 text-xs space-y-1.5">
          <div className={`font-bold px-2.5 py-1.5 rounded-lg ${chapterDetail(key) ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>
            {chapterDetail(key) ? "★ Built-in content hai" : "○ Auto-guide mode"}
          </div>
          {getLocalOverride(key) && <div className="font-bold px-2.5 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">👨‍🏫 Teacher override active</div>}
          <div className={`font-bold px-2.5 py-1.5 rounded-lg ${isFirebaseConfigured ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
            {isFirebaseConfigured ? "☁️ Firebase connected" : "💾 Local mode (Firebase off)"}
          </div>
        </div>
        <Link href={`/chapter/${s}/${g}/${c}`} className={`${btn} block text-center mt-3`}>👁️ Chapter dekho</Link>
      </div>

      {/* editor */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-card">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <h3 className="font-extrabold text-lg">✏️ Edit: Ch {found.ch.n} — {found.ch.title}</h3>
          <span className="ml-auto" />
          <button onClick={save} className={btnP}>💾 Save</button>
          <button onClick={() => { if (confirm("Teacher override delete karein? (Built-in wapas aa jayega)")) { deleteOverride(key); setDetail(chapterDetail(key) || {}); setMsg("🗑️ Override delete — built-in content active"); } }} className={btn}>🗑️ Reset</button>
        </div>
        {msg && <div className="text-sm font-bold bg-brand-50 dark:bg-indigo-950 border border-brand-100 dark:border-indigo-800 rounded-lg px-3 py-2 mb-3">{msg}</div>}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 border-b border-slate-200 dark:border-slate-700">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`tabpill border-slate-300 dark:border-slate-600 text-xs ${tab === t ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent" : "bg-slate-50 dark:bg-slate-900"}`}>{t}</button>
          ))}
        </div>

        {/* SLIDES */}
        {tab === "slides" && (
          <div className="space-y-3">
            {(detail.slides || []).map((sl, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
                <div className="flex gap-2">
                  <b className="text-sm">Slide {i + 1}</b><span className="flex-1" />
                  <button onClick={() => patch({ slides: del(detail.slides, i) })} className="text-xs font-bold text-red-600">Delete ✕</button>
                </div>
                <input value={sl.kicker || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, kicker: e.target.value }) })} placeholder="Kicker — e.g. Concept 1" className={input} />
                <input value={sl.title || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, title: e.target.value }) })} placeholder="Title" className={`${input} font-bold`} />
                <textarea value={(sl.points || []).join("\n")} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, points: e.target.value.split("\n") }) })} placeholder={"Points — har line me ek\nJaise ye doosra point"} rows={3} className={`${input} font-mono`} />
                <input value={sl.formula || ""} onChange={(e) => patch({ slides: upd(detail.slides, i, { ...sl, formula: e.target.value }) })} placeholder="Formula / highlight (optional)" className={`${input} font-mono`} />
              </div>
            ))}
            <button onClick={() => patch({ slides: [...(detail.slides || []), { ...blankSlide, points: [""] }] })} className={btn}>＋ Slide add karo</button>
          </div>
        )}

        {/* NOTES */}
        {tab === "notes" && (
          <div>
            <p className="text-xs text-ink-mute mb-1">Har line = ek note point. <b>&lt;b&gt;bold&lt;/b&gt;</b> HTML chalega.</p>
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
                <button onClick={() => patch({ formulas: del(detail.formulas, i) })} className="text-red-600 font-bold px-2">✕</button>
              </div>
            ))}
            <button onClick={() => patch({ formulas: [...(detail.formulas || []), { name: "", expr: "" }] })} className={btn}>＋ Formula</button>
          </div>
        )}

        {/* QUIZ */}
        {tab === "quiz" && (
          <div className="space-y-3">
            {(detail.quiz || []).map((q, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
                <div className="flex gap-2"><b className="text-sm">Q{i + 1}</b><span className="flex-1" />
                  <button onClick={() => patch({ quiz: del(detail.quiz, i) })} className="text-xs font-bold text-red-600">Delete ✕</button></div>
                <input value={q.q} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, q: e.target.value }) })} placeholder="Sawaal" className={`${input} font-bold`} />
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((o, oi) => (
                    <input key={oi} value={o} onChange={(e) => { const op = [...q.options]; op[oi] = e.target.value; patch({ quiz: upd(detail.quiz, i, { ...q, options: op }) }); }} placeholder={`Option ${oi + 1}`} className={input} />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-xs font-bold">Sahi jawab:</label>
                  <select value={q.answer} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, answer: +e.target.value }) })} className={input} style={{ maxWidth: 140 }}>
                    {q.options.map((_, oi) => <option key={oi} value={oi}>Option {oi + 1}</option>)}
                  </select>
                  <input value={q.why || ""} onChange={(e) => patch({ quiz: upd(detail.quiz, i, { ...q, why: e.target.value }) })} placeholder="Samjhaya (why) — optional" className={input} />
                </div>
              </div>
            ))}
            <button onClick={() => patch({ quiz: [...(detail.quiz || []), JSON.parse(JSON.stringify(blankQuiz))] })} className={btn}>＋ Question</button>
          </div>
        )}

        {/* PYQ */}
        {tab === "pyq" && (
          <div>
            <p className="text-xs text-ink-mute mb-1">Har line = ek PYQ.</p>
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
                  <button onClick={() => patch({ words: del(detail.words, i) })} className="text-red-600 font-bold px-2">✕</button>
                </div>
              </div>
            ))}
            <button onClick={() => patch({ words: [...(detail.words || []), { w: "", m: "", u: "" }] })} className={btn}>＋ Word</button>
          </div>
        )}

        {/* MINDMAP + FLOW */}
        {tab === "mindmap+flow" && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold mb-1">🗺️ Mindmap JSON <span className="font-normal text-ink-mute">(khaali = no mindmap)</span></p>
              <textarea value={mmJson} onChange={(e) => setMmJson(e.target.value)} rows={8} spellCheck={false}
                placeholder={'{"central": "Chapter naam", "branches": [{"label": "Part 1", "color": "#2563eb", "children": ["a", "b"]}]}'}
                className={`${input} font-mono text-xs`} />
            </div>
            <div>
              <p className="text-xs font-bold mb-1">🔀 Flowchart JSON <span className="font-normal text-ink-mute">(type: "" / "decision" / "result")</span></p>
              <textarea value={flowJson} onChange={(e) => setFlowJson(e.target.value)} rows={6} spellCheck={false}
                placeholder={'[{"title": "Step 1", "desc": "..."}, {"title": "Faisla?", "type": "decision"}]'}
                className={`${input} font-mono text-xs`} />
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4 flex-wrap">
          <button onClick={save} className={btnP}>💾 Save chapter</button>
          <button onClick={() => {
            const blob = new Blob([JSON.stringify({ key, detail }, null, 2)], { type: "application/json" });
            const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${key}.json`; a.click();
          }} className={btn}>📥 Export JSON</button>
          <label className={`${btn} cursor-pointer`}>📤 Import JSON
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
                  setMsg("📤 JSON load ho gaya — Save dabao");
                } catch { setMsg("⚠️ JSON samajh nahi aaya"); }
              };
              rd.readAsText(f);
            }} />
          </label>
        </div>
      </div>
    </div>
  );
}
