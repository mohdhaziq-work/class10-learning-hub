"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <button
      onClick={() => {
        const d = !dark;
        setDark(d);
        document.documentElement.classList.toggle("dark", d);
        localStorage.setItem("c10-theme", d ? "dark" : "light");
      }}
      className="w-10 h-10 grid place-items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg hover:shadow-card transition"
      title="Dark / Light"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-[#151d33]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <span className="w-10 h-10 rounded-xl grid place-items-center text-white text-xl bg-gradient-to-br from-brand-600 to-violet-600 shadow-card">🎓</span>
          <span>Class 10 Hub
            <small className="block text-[11px] font-semibold text-ink-mute dark:text-slate-400 tracking-widest uppercase leading-none">Smart Learning + Board</small>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-1.5 text-sm font-semibold">
          <Link href="/#subjects" className="hidden sm:inline-block px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Subjects</Link>
          <Link href="/admin" className="hidden sm:inline-block px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">👨‍🏫 Admin</Link>
          <Link href="/smart-board" className="px-4 py-2 rounded-xl text-white bg-gradient-to-br from-brand-600 to-violet-600 shadow-card hover:-translate-y-px transition">🖊️ Smart Board</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
