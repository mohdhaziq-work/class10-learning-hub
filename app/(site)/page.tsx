import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import SubjectGrid from "@/components/home/SubjectGrid";
import Reveal from "@/components/ui/Reveal";
import { totalChapters } from "@/lib/syllabus";
import { totalQuizQuestions } from "@/lib/content";

export default function HomePage() {
  const chapters = totalChapters();
  const quiz = totalQuizQuestions();
  return (
    <>
      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-[radial-gradient(900px_340px_at_12%_-40px,rgba(124,58,237,.16),transparent),radial-gradient(800px_320px_at_90%_-30px,rgba(79,70,229,.16),transparent)]">
        <div className="max-w-6xl mx-auto px-5 pt-14 pb-12 grid gap-8 lg:grid-cols-[1.25fr_.9fr] items-center">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 bg-brand-50 dark:bg-indigo-950 text-brand-600 dark:text-indigo-300 font-extrabold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full">✨ 100% Free • No login • Smart-board ready</span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mt-4">
              Class 10 ki <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-600">smart padhai</span>, ab ek hi jagah.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-xl">
              Saare subjects — <b>Maths, Science, SST, English, Hindi</b> — chapter-wise slides, mind maps, flow charts, formulas aur quizzes ke saath. Aur teachers ke liye ek <b>super-advanced Smart Board</b>.
            </p>
            <div className="flex gap-3 flex-wrap mt-6">
              <Link href="#subjects" className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-br from-brand-600 to-violet-600 shadow-lift hover:-translate-y-px transition">📚 Padhna shuru karo</Link>
              <Link href="/smart-board" className="px-6 py-3 rounded-xl font-bold border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:shadow-card transition">🖊️ Smart Board kholo</Link>
            </div>
            <div className="flex gap-7 flex-wrap mt-7">
              {[["97+", "Chapters"], ["5", "Subjects"], [`${quiz}+`, "Quiz questions"], ["₹0", "Hamesha free"]].map(([b, s]) => (
                <div key={s}><b className="block text-2xl tracking-tight">{b}</b><span className="text-[13px] font-semibold text-ink-mute dark:text-slate-400">{s}</span></div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[20px] shadow-lift p-5 lg:rotate-1 animate-fadeUp">
            <h3 className="font-extrabold">🖊️ Smart Board — live jhalak</h3>
            <p className="text-[13px] text-ink-mute dark:text-slate-400 mb-3">Ek side PDF, ek side board. Maths ke liye graph + formulas.</p>
            <div className="rounded-xl bg-[#101736] border border-[#2a3568] p-4 text-[#dfe6ff] font-mono text-[13px] min-h-[150px] leading-7">
              <div><span className="text-amber-200">Q.</span> HCF(135, 225) = ?</div>
              <div>225 = 135 × 1 + <span className="text-amber-200">90</span></div>
              <div>135 = 90 × 1 + <span className="text-amber-200">45</span></div>
              <div>90 = 45 × 2 + 0</div>
              <div><span className="text-green-300">∴ HCF = 45 ✅</span></div>
              <div className="mt-2"><span className="text-fuchsia-300">HCF × LCM = a × b</span> ★ yaad rakho</div>
            </div>
            <Link href="/smart-board" className="mt-4 block text-center px-4 py-2.5 rounded-xl font-bold text-white bg-gradient-to-br from-brand-600 to-violet-600">Try Smart Board →</Link>
          </div>
        </div>
      </section>

      <SearchBar />

      <div className="max-w-6xl mx-auto px-5">
        {/* SUBJECTS */}
        <section id="subjects" className="pt-12">
          <div className="reveal mb-4"><h2 className="text-2xl font-black tracking-tight">📚 Subjects</h2>
            <p className="text-ink-mute dark:text-slate-400 text-[15px]">Apna subject chuno → chapter kholo → slides se padho, quiz se test karo. ({chapters} chapters)</p></div>
          <SubjectGrid />
        </section>

        {/* BOARD BANNER */}
        <section className="reveal mt-10 rounded-[22px] p-9 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center text-white shadow-lift relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
          <div>
            <h2 className="text-3xl font-black tracking-tight">🖊️ Smart Board — classroom ka hero</h2>
            <p className="text-indigo-200 mt-2 max-w-xl">Teacher PDF / DOCX / photo kholkar padhayein, us par hi circle-tick-draw karein, aur saath me alag whiteboard par solve karayein. Pen, shapes, text, sticky notes, laser, maths graph, timer — sab kuch free.</p>
            <div className="flex gap-2.5 flex-wrap mt-5">
              <Link href="/smart-board" className="px-5 py-2.5 rounded-xl font-bold bg-white text-indigo-900 hover:-translate-y-px transition">Open Smart Board →</Link>
              <Link href="/smart-board?layout=split" className="px-5 py-2.5 rounded-xl font-bold border border-white/40 hover:bg-white/10 transition">Split View (PDF + Board)</Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["📂 PDF + DOCX", "↔️ Split view", "✏️ Pen + Highlighter", "⬛ Shapes", "📝 Sticky notes", "🔴 Laser", "📐 Graph plotter", "√ Maths symbols", "⏱️ Timer", "💾 Auto-save", "👆 Touch ready", "🖨️ Print"].map((t) => (
              <span key={t} className="bg-white/10 border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </section>

        {/* HOW */}
        <section className="pt-12">
          <div className="reveal mb-4"><h2 className="text-2xl font-black tracking-tight">🏫 Classroom me kaise use karein?</h2>
            <p className="text-ink-mute dark:text-slate-400 text-[15px]">Smart board / projector par 4 easy steps.</p></div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {[["1", "Chapter kholo", "Subject → Chapter → Slides tab → Fullscreen. Badi screen par sabko dikhega."],
              ["2", "Board par samjhao", "Smart Board me NCERT PDF kholo, highlight karo, side board par numerical solve karo."],
              ["3", "Test lo", "Chapter ka Quiz kholo — bachche haath uthakar jawab dein, phir score dekho."],
              ["4", "Progress dekho", "Padhaya hua chapter Done ✓ mark karo — poore subject ka % dikhega."],
            ].map(([n, h, p]) => (
              <div key={n} className="reveal relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 pl-16 shadow-card">
                <span className="absolute left-4 top-4 w-9 h-9 rounded-xl grid place-items-center font-black text-white bg-gradient-to-br from-brand-600 to-violet-600">{n}</span>
                <h4 className="font-extrabold">{h}</h4><p className="text-[13.5px] text-slate-600 dark:text-slate-300">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="pt-12">
          <div className="reveal mb-4"><h2 className="text-2xl font-black tracking-tight">⚡ Har subject, uski zaroorat ke hisaab se</h2>
            <p className="text-ink-mute dark:text-slate-400 text-[15px]">Maths me formulas, Science me diagrams, SST me timelines — faltu cheezein nahi.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["📐", "Maths — formula first", "No faltu flowcharts. Slides, formula bank, solved examples, quiz. Board me graph + function plotter."],
              ["🔬", "Science — visual learning", "Mind maps, flow charts, activities, equation bank. Diagram-based revision."],
              ["🌍", "SST — story + dates", "Timelines, event flowcharts, mind maps, map points. Dates ratne ka dard khatm."],
              ["📖", "English / Hindi — language smart", "Summary slides, theme charts, word banks, character maps, Q&A practice."],
            ].map(([i, h, p]) => (
              <div key={h} className="reveal bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-card">
                <div className="text-3xl">{i}</div><h3 className="font-extrabold mt-2">{h}</h3><p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{p}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Reveal />
    </>
  );
}
