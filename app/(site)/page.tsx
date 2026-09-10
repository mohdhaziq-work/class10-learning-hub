import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import SubjectGrid from "@/components/home/SubjectGrid";
import { totalChapters } from "@/lib/syllabus";
import { totalQuizQuestions } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

function SectionHead({ overline, title, sub }: { overline: string; title: string; sub: string }) {
 return (
 <div className="max-w-2xl mb-8">
 <p className="eyebrow">{overline}</p>
 <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mt-2">{title}</h2>
 <p className="text-ink-soft mt-2.5 text-[15.5px] leading-relaxed">{sub}</p>
 </div>
 );
}

const BOARD_TILES = [
 { icon: "penLine", t: "PDF / DOCX annotate", d: "Write over any book" },
 { icon: "columns2", t: "Split doc + board", d: "Question left, solution right" },
 { icon: "activity", t: "Graph plotter", d: "sin, cos, parabola instantly" },
 { icon: "shapes", t: "Maths shapes", d: "Triangles to protractors" },
];

const STEPS = [
 { n: "01", t: "Pick a subject", d: "Maths, Science, SST, English, Hindi, AI — NCERT aligned." },
 { n: "02", t: "Open a chapter", d: "Slides, notes, mind maps, and examples in every chapter." },
 { n: "03", t: "Practise with quizzes", d: "MCQs and board PYQs to lock in your preparation." },
 { n: "04", t: "Teach on the board", d: "Open any PDF on the Smart Board and explain in class." },
];

const FEATURES = [
 { icon: "presentation", t: "Smart Slides", d: "Every chapter as auto-playing slides — full-screen on smart boards." },
 { icon: "gitBranch", t: "Mind Maps & Flows", d: "Tough topics simplified into diagrams and step-by-step flows." },
 { icon: "puzzle", t: "Quizzes & PYQs", d: "MCQ practice plus previous years' board questions." },
 { icon: "notebookPen", t: "Revision Notes", d: "2-minute notes, formulas, and key words before exams." },
 { icon: "barChart", t: "Progress Tracking", d: "See which chapters are done and which remain." },
 { icon: "cloud", t: "Teacher Content", d: "Teacher updates sync across devices with Firebase." },
];

export default function HomePage() {
 return (
 <div>
 {/* ---------- HERO ---------- */}
 <section className="border-b border-slate-200 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 grid gap-12 lg:grid-cols-[1.05fr_.95fr] items-center">
 <div>
 <span className="inline-flex items-center gap-2 text-[12px] font-mono font-medium px-4 py-2 rounded-full bg-white border border-slate-200 text-ink-soft ">
 <span className="w-2 h-2 rounded-full bg-gold" />
 FREE FOREVER · NO LOGIN · EVERY DEVICE
 </span>
 <h1 className="text-[40px] leading-[1.05] sm:text-[60px] font-extrabold tracking-tight mt-6">
 Class 10, taught <span style={{ color: "#1a73e8" }}>the smart way.</span>
 </h1>
 <p className="text-ink-soft text-[16.5px] sm:text-lg leading-relaxed mt-5 max-w-xl">
 NCERT chapters as smart slides, quizzes, and revision notes — plus a powerful Smart Board for classrooms. From phone to projector.
 </p>
 <div className="flex gap-3 mt-8 flex-wrap">
 <Link href="/smart-board" className="btn-g btn-g-dark text-[15px]">
 <Icon name="squarePen" size={18} /> Open Smart Board
 </Link>
 <Link href="#subjects" className="btn-g btn-g-white text-[15px]">
 <Icon name="layoutGrid" size={18} /> Browse subjects
 </Link>
 </div>
 <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 max-w-xl">
 {[
 { v: `${totalChapters()}`, l: "Chapters" },
 { v: "6", l: "Subjects" },
 { v: `${totalQuizQuestions()}+`, l: "Quiz questions" },
 { v: "100%", l: "Free" },
 ].map((s) => (
 <div key={s.l} className="border-t-2 border-slate-900 pt-3">
 <dd className="text-[30px] font-extrabold tracking-tight leading-none">{s.v}</dd>
 <dt className="text-[12.5px] font-medium text-ink-mute mt-1.5">{s.l}</dt>
 </div>
 ))}
 </dl>
 </div>

 {/* product preview card */}
 <div className="relative hidden md:block">
 <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lift">
 <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200 ">
 <span className="w-2.5 h-2.5 rounded-full bg-slate-300 " />
 <span className="w-2.5 h-2.5 rounded-full bg-slate-300 " />
 <span className="w-2.5 h-2.5 rounded-full bg-slate-300 " />
 <span className="ml-2 font-mono text-[11.5px] font-medium text-ink-mute tracking-wider">SMART BOARD — LIVE</span>
 </div>
 <svg viewBox="0 0 400 220" className="w-full block bg-[#0d1117]" role="img" aria-label="Graph preview">
 <defs>
 <pattern id="hg" width="20" height="20" patternUnits="userSpaceOnUse">
 <path d="M20 0H0v20" fill="none" stroke="#ffffff10" strokeWidth="1" />
 </pattern>
 </defs>
 <rect width="400" height="220" fill="url(#hg)" />
 <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff40" strokeWidth="1.5" />
 <line x1="60" y1="0" x2="60" y2="220" stroke="#ffffff40" strokeWidth="1.5" />
 <path d="M60 150 C 110 150, 110 60, 160 60 S 210 150, 260 150 S 310 60, 360 60" fill="none" stroke="#8ab4f8" strokeWidth="3" strokeLinecap="round" />
 <path d="M100 200 Q 200 40 320 190" fill="none" stroke="#7ee2a8" strokeWidth="3" strokeLinecap="round" />
 <circle cx="160" cy="60" r="16" fill="none" stroke="#c9a227" strokeWidth="2.5" />
 <text x="70" y="170" fill="#ffffff70" fontSize="13" fontWeight="600" fontFamily="monospace">y = sin x</text>
 </svg>
 <div className="flex items-center justify-between px-5 py-4">
 <div>
 <p className="font-extrabold text-[16px] tracking-tight">Smart Board</p>
 <p className="text-[13px] text-ink-mute ">Annotate PDFs · split view · graph plotter</p>
 </div>
 <Link href="/smart-board" className="inline-flex items-center gap-1.5 text-sm font-semibold flex-none hover:gap-2.5 transition-all" style={{ color: "#1a73e8" }}>
 Try it now <Icon name="arrowRight" size={16} />
 </Link>
 </div>
 </div>
 </div>
 </div>
 </section>

 <div className="py-8"><SearchBar /></div>

 <main className="max-w-7xl mx-auto px-4 sm:px-6">
 {/* ---------- SUBJECTS ---------- */}
 <section id="subjects" className="pt-6 scroll-mt-20">
 <SectionHead overline="Subjects" title="Pick a subject, start learning"
 sub="Six subjects, one hub. Every chapter opens the same powerful study view — on any screen." />
 <SubjectGrid />
 </section>

 {/* ---------- BOARD BANNER ---------- */}
 <section className="mt-16 rounded-3xl overflow-hidden bg-coal text-white">
 <div className="grid gap-10 lg:grid-cols-2 p-8 sm:p-12 items-center">
 <div>
 <p className="font-mono text-[11.5px] font-medium uppercase tracking-[.18em] text-slate-400">For teachers</p>
 <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mt-3">A real smart board. Zero cost.</h2>
 <p className="text-slate-400 mt-3 text-[15.5px] leading-relaxed max-w-md">
 Open any PDF or Word file, write over it, split the screen, plot maths graphs — built for classroom projectors and touch boards.
 </p>
 <div className="flex gap-3 mt-7 flex-wrap">
 <Link href="/smart-board" className="btn-g bg-white text-slate-900 hover:bg-slate-200 text-[15px]">
 <Icon name="squarePen" size={18} /> Launch Smart Board
 </Link>
 <Link href="/smart-board?layout=split" className="btn-g text-[15px] border border-white/25 text-white hover:bg-white/10">
 <Icon name="columns2" size={18} /> Split view
 </Link>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-3.5">
 {BOARD_TILES.map((b) => (
 <div key={b.t} className="rounded-2xl bg-white/[.06] border border-white/10 p-5">
 <Icon name={b.icon} size={22} className="text-slate-300" />
 <p className="font-bold text-[14.5px] mt-3">{b.t}</p>
 <p className="text-[13px] text-slate-400 mt-0.5">{b.d}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ---------- HOW ---------- */}
 <section className="pt-16">
 <SectionHead overline="How it works" title="From chapter to classroom in 4 steps" sub="Students revise at home. Teachers present in class. Same content, everywhere." />
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {STEPS.map((s) => (
 <div key={s.n} className="reveal card-g p-6">
 <p className="font-mono text-[13px] font-semibold text-ink-mute ">{s.n}</p>
 <h3 className="font-bold text-[16.5px] tracking-tight mt-2.5">{s.t}</h3>
 <p className="text-[13.5px] text-ink-mute mt-1.5 leading-relaxed">{s.d}</p>
 </div>
 ))}
 </div>
 </section>

 {/* ---------- FEATURES ---------- */}
 <section className="pt-16">
 <SectionHead overline="Inside every chapter" title="One chapter, many ways to learn" sub="Switch views with one tap — whatever suits the topic, and the class." />
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {FEATURES.map((f) => (
 <div key={f.t} className="reveal card-g p-6 flex gap-4 hover:shadow-lift hover:-translate-y-0.5 transition">
 <span className="w-11 h-11 rounded-xl grid place-items-center bg-slate-100 text-slate-700 flex-none">
 <Icon name={f.icon} size={22} />
 </span>
 <span><b className="font-bold text-[15.5px] tracking-tight block">{f.t}</b>
 <small className="text-[13.5px] text-ink-mute leading-relaxed block mt-1">{f.d}</small></span>
 </div>
 ))}
 </div>
 </section>

 {/* ---------- CTA ---------- */}
 <section className="my-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center">
 <p className="font-mono text-[11.5px] font-medium uppercase tracking-[.18em] text-slate-400 ">Get started</p>
 <h2 className="text-[26px] sm:text-[34px] font-extrabold tracking-tight mt-3">Ready for smarter classes?</h2>
 <p className="text-slate-400 mt-2 text-[15.5px]">Open a chapter, or launch the board — it takes five seconds.</p>
 <div className="flex gap-3 justify-center mt-7 flex-wrap">
 <Link href="/subjects/maths" className="btn-g bg-white text-slate-900 hover:bg-slate-200 text-[15px]">
 <Icon name="bookOpen" size={18} /> Start with Maths
 </Link>
 <Link href="/smart-board" className="btn-g text-[15px] border border-white/30 hover:bg-white/10 ">
 <Icon name="squarePen" size={18} /> Open Smart Board
 </Link>
 </div>
 </section>
 </main>
 </div>
 );
}
