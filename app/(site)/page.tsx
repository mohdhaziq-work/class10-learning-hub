import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import SubjectGrid from "@/components/home/SubjectGrid";
import { totalChapters } from "@/lib/syllabus";
import { totalQuizQuestions } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

function SectionHead({ overline, title, sub }: { overline: string; title: string; sub: string }) {
  return (
    <div className="max-w-2xl mb-7">
      <p className="text-[12px] font-bold uppercase tracking-[.14em] text-brand-600 dark:text-brand-300">{overline}</p>
      <h2 className="font-display text-[26px] sm:text-[34px] font-extrabold tracking-tight mt-1.5">{title}</h2>
      <p className="text-ink-soft dark:text-slate-300 mt-2 text-[15px] leading-relaxed">{sub}</p>
    </div>
  );
}

const BOARD_TILES = [
  { icon: "penLine", t: "PDF / DOCX annotate", d: "Dil ki kitaab par likho" },
  { icon: "columns2", t: "Split doc + board", d: "Sawaal ek taraf, hal dusri" },
  { icon: "activity", t: "Graph plotter", d: "sin, cos, parabola turant" },
  { icon: "shapes", t: "Maths shapes", d: "Triangle se protractor tak" },
];

const STEPS = [
  { icon: "layoutGrid", t: "Subject chuno", d: "Maths, Science, SST, English, Hindi, AI — NCERT + KIPS ke saath." },
  { icon: "layers", t: "Chapter kholo", d: "Har chapter me slides, notes, mind maps aur examples." },
  { icon: "puzzle", t: "Quiz se practice", d: "MCQ quiz aur board PYQs se taiyari pakki karo." },
  { icon: "squarePen", t: "Board par padhao", d: "Smart Board par PDF kholkar class me samjhao." },
];

const FEATURES = [
  { icon: "presentation", c: "#0b57d0", t: "Smart Slides", d: "Har chapter, auto-playing slides me — smart board par full-screen." },
  { icon: "gitBranch", c: "#9334e6", t: "Mind Maps & Flows", d: "Mushkil topics aasaan diagrams aur step-flows me." },
  { icon: "puzzle", c: "#e37400", t: "Quizzes & PYQs", d: "MCQ practice aur pichhle saalon ke board sawaal." },
  { icon: "notebookPen", c: "#188038", t: "Revision Notes", d: "2-minute notes, formulas aur key words — exam se pehle." },
  { icon: "barChart", c: "#b3261e", t: "Progress Tracking", d: "Kaun sa chapter hua, kaun bacha — sab dikhta hai." },
  { icon: "cloud", c: "#00696b", t: "Teacher Overrides", d: "Teacher ka content sab devices par — Firebase sync ke saath." },
];

export default function HomePage() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="g-mesh border-b border-white/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-14 grid gap-10 lg:grid-cols-[1.05fr_.95fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-[#e1e3e6] dark:border-white/10 shadow-card text-ink-soft dark:text-slate-200">
              <Icon name="sparkles" size={15} className="text-brand-600 dark:text-brand-300" />
              Free forever · No login · Every device
            </span>
            <h1 className="font-display text-[38px] leading-[1.04] sm:text-[56px] font-extrabold tracking-tight mt-5">
              Class 10, taught <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-[#9334e6] to-[#188038]">the smart way.</span>
            </h1>
            <p className="text-ink-soft dark:text-slate-300 text-[16.5px] sm:text-lg leading-relaxed mt-4 max-w-xl">
              NCERT chapters as smart slides, quizzes and revision notes — plus a powerful Smart Board for classrooms. From phone to projector.
            </p>
            <div className="flex gap-3 mt-7 flex-wrap">
              <Link href="/smart-board" className="btn-g btn-g-dark text-[15px] px-7 py-3.5">
                <Icon name="squarePen" size={19} /> Open Smart Board
              </Link>
              <Link href="#subjects" className="btn-g btn-g-white text-[15px] px-7 py-3.5">
                <Icon name="layoutGrid" size={19} /> Browse subjects
              </Link>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-9 max-w-xl">
              {[
                { icon: "layers", v: `${totalChapters()}+`, l: "Chapters" },
                { icon: "layoutGrid", v: "6", l: "Subjects" },
                { icon: "puzzle", v: `${totalQuizQuestions()}+`, l: "Quiz questions" },
                { icon: "zap", v: "100%", l: "Free" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-brand-200 dark:border-white/15 pl-3">
                  <dt className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-ink-mute dark:text-slate-400">
                    <Icon name={s.icon} size={14} /> {s.l}
                  </dt>
                  <dd className="font-display text-[26px] font-extrabold tracking-tight">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* labs-style experiment card */}
          <div className="relative hidden md:block">
            <div className="rounded-[28px] overflow-hidden shadow-lift border border-white/50 dark:border-white/10 bg-gradient-to-br from-brand-600 via-[#7c3aed] to-[#188038] p-[1.5px]">
              <div className="rounded-[26px] overflow-hidden bg-white dark:bg-[#1e1f20]">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-[#e1e3e6] dark:border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-g-red" /><span className="w-2.5 h-2.5 rounded-full bg-g-yellow" /><span className="w-2.5 h-2.5 rounded-full bg-g-green" />
                  <span className="ml-2 text-[12.5px] font-semibold text-ink-mute dark:text-slate-400 flex items-center gap-1.5">
                    <Icon name="squarePen" size={14} /> Smart Board — live
                  </span>
                </div>
                <svg viewBox="0 0 400 220" className="w-full block bg-[#0b1020]" role="img" aria-label="Graph preview">
                  <defs>
                    <pattern id="hg" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M20 0H0v20" fill="none" stroke="#ffffff14" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="400" height="220" fill="url(#hg)" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff55" strokeWidth="1.5" />
                  <line x1="60" y1="0" x2="60" y2="220" stroke="#ffffff55" strokeWidth="1.5" />
                  <path d="M60 150 C 110 150, 110 60, 160 60 S 210 150, 260 150 S 310 60, 360 60" fill="none" stroke="#8ab4f8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M100 200 Q 200 40 320 190" fill="none" stroke="#81c995" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" />
                  <circle cx="160" cy="60" r="16" fill="none" stroke="#f28b82" strokeWidth="3" />
                  <path d="M176 60 L 225 35" stroke="#f28b82" strokeWidth="2.5" />
                  <path d="M225 35 l-11 2 M225 35 l-4 10" stroke="#f28b82" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="232" y="38" fill="#f28b82" fontSize="14" fontWeight="700">maxima</text>
                  <text x="70" y="170" fill="#ffffff88" fontSize="13" fontWeight="600">y = sin x</text>
                </svg>
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-display font-extrabold text-[17px]">Smart Board</p>
                    <p className="text-[13px] text-ink-mute dark:text-slate-400">Annotate PDFs · split view · graph plotter</p>
                  </div>
                  <Link href="/smart-board" className="btn-g btn-g-blue text-sm flex-none">
                    Try it now <Icon name="arrowRight" size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-16 hidden lg:flex items-center gap-2 bg-white dark:bg-[#2a2b2e] rounded-2xl shadow-lift px-4 py-2.5 text-[13px] font-bold animate-floaty">
              <Icon name="activity" size={16} className="text-brand-600" /> Graph plotter
            </div>
            <div className="absolute -right-3 bottom-24 hidden lg:flex items-center gap-2 bg-white dark:bg-[#2a2b2e] rounded-2xl shadow-lift px-4 py-2.5 text-[13px] font-bold animate-floaty" style={{ animationDelay: "1.2s" }}>
              <Icon name="penLine" size={16} className="text-g-green" /> PDF annotate
            </div>
          </div>
        </div>
      </section>

      <SearchBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ---------- SUBJECTS ---------- */}
        <section id="subjects" className="pt-12 scroll-mt-20">
          <SectionHead overline="Subjects" title="Pick a subject, start learning"
            sub="Six subjects, one hub. Every chapter opens the same powerful study view — on any screen." />
          <SubjectGrid />
        </section>

        {/* ---------- BOARD BANNER ---------- */}
        <section className="mt-14 rounded-[28px] overflow-hidden bg-[#131314] text-white relative">
          <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(500px 260px at 15% 10%, #0b57d055, transparent), radial-gradient(500px 260px at 90% 90%, #9334e655, transparent)" }} />
          <div className="relative grid gap-8 lg:grid-cols-2 p-7 sm:p-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[12.5px] font-bold px-4 py-2 rounded-full bg-white/10 border border-white/15">
                <Icon name="presentation" size={15} /> For teachers
              </span>
              <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold tracking-tight mt-4">A real smart board. Zero cost.</h2>
              <p className="text-slate-300 mt-3 text-[15.5px] leading-relaxed max-w-md">
                Open any PDF or Word file, write over it, split the screen, plot maths graphs — built for classroom projectors and touch boards.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <Link href="/smart-board" className="btn-g bg-white text-ink hover:bg-slate-100 text-[15px] px-7 py-3.5">
                  <Icon name="squarePen" size={19} /> Launch Smart Board
                </Link>
                <Link href="/smart-board?layout=split" className="btn-g text-[15px] px-7 py-3.5 border border-white/25 text-white hover:bg-white/10">
                  <Icon name="columns2" size={19} /> Split view
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {BOARD_TILES.map((b) => (
                <div key={b.t} className="rounded-2xl bg-white/[.07] border border-white/10 p-4 sm:p-5 hover:bg-white/10 transition">
                  <span className="w-10 h-10 rounded-xl grid place-items-center bg-white/10"><Icon name={b.icon} size={20} /></span>
                  <p className="font-bold text-[14.5px] mt-3">{b.t}</p>
                  <p className="text-[13px] text-slate-400 mt-0.5">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- HOW ---------- */}
        <section className="pt-14">
          <SectionHead overline="How it works" title="From chapter to classroom in 4 steps" sub="Students revise at home. Teachers present in class. Same content, everywhere." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.t} className="reveal card-g p-5 relative overflow-hidden">
                <span className="font-display text-[44px] font-extrabold text-slate-100 dark:text-white/10 absolute right-3 top-1 select-none">{i + 1}</span>
                <span className="w-11 h-11 rounded-2xl grid place-items-center text-white bg-gradient-to-br from-brand-600 to-[#9334e6]"><Icon name={s.icon} size={22} /></span>
                <h3 className="font-display font-bold text-[16.5px] mt-3">{s.t}</h3>
                <p className="text-[13.5px] text-ink-mute dark:text-slate-400 mt-1 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FEATURES ---------- */}
        <section className="pt-14">
          <SectionHead overline="Inside every chapter" title="One chapter, many ways to learn" sub="Switch views with one tap — whatever suits the topic, and the class." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.t} className="reveal card-g p-5 flex gap-4 hover:shadow-lift hover:-translate-y-0.5 transition">
                <span className="w-12 h-12 rounded-2xl grid place-items-center text-white flex-none" style={{ background: f.c }}>
                  <Icon name={f.icon} size={24} />
                </span>
                <span><b className="font-display font-bold text-[16px] block">{f.t}</b>
                  <small className="text-[13.5px] text-ink-mute dark:text-slate-400 leading-relaxed block mt-1">{f.d}</small></span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="my-14 rounded-[28px] bg-gradient-to-r from-brand-600 via-[#4a6cf7] to-[#9334e6] text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -left-16 -top-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="relative">
            <h2 className="font-display text-[26px] sm:text-[34px] font-extrabold tracking-tight">Ready for smarter classes?</h2>
            <p className="text-white/85 mt-2 text-[15.5px]">Open a chapter, or launch the board — it takes five seconds.</p>
            <div className="flex gap-3 justify-center mt-6 flex-wrap">
              <Link href="/subjects/maths" className="btn-g bg-white text-brand-700 hover:bg-slate-100 text-[15px] px-7 py-3.5">
                <Icon name="bookOpen" size={19} /> Start with Maths
              </Link>
              <Link href="/smart-board" className="btn-g text-[15px] px-7 py-3.5 border-2 border-white/60 text-white hover:bg-white/10">
                <Icon name="squarePen" size={19} /> Open Smart Board
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
