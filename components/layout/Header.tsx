"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

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
      className="w-10 h-10 grid place-items-center rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition"
      title="Dark / Light" aria-label="Toggle theme"
    >
      <Icon name={dark ? "sun" : "moon"} size={19} />
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-[#30363d] bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2.5 mr-2" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 rounded-xl grid place-items-center text-white bg-slate-900 dark:bg-white dark:text-slate-900">
            <Icon name="graduationCap" size={20} />
          </span>
          <span className="font-extrabold text-[16.5px] tracking-tight leading-none">
            Class 10 Hub
            <small className="block font-mono text-[9.5px] font-semibold text-ink-mute dark:text-slate-400 tracking-[.16em] uppercase mt-1">Smart Learning</small>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="ml-auto hidden md:flex items-center gap-1 text-[14.5px] font-medium">
          <Link href="/#subjects" className="px-4 py-2 rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition">Subjects</Link>
          <Link href="/admin" className="px-4 py-2 rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition">Admin</Link>
          <Link href="/smart-board" className="ml-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition">
            <Icon name="squarePen" size={16} /> Smart Board
          </Link>
          <span className="w-px h-6 bg-slate-200 dark:bg-[#30363d] mx-1.5" />
          <ThemeToggle />
        </nav>

        {/* mobile */}
        <div className="ml-auto flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu"
            className="w-10 h-10 grid place-items-center rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition">
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-[#161b22] border-b border-slate-200 dark:border-[#30363d] shadow-pop px-4 py-3 space-y-1 animate-fadeUp">
          {[
            { href: "/#subjects", icon: "layoutGrid", label: "Subjects" },
            { href: "/smart-board", icon: "squarePen", label: "Smart Board" },
            { href: "/admin", icon: "shieldCheck", label: "Admin" },
          ].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] text-ink dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10">
              <Icon name={l.icon} size={19} className="text-ink-mute dark:text-slate-400" /> {l.label}
              <Icon name="chevronRight" size={16} className="ml-auto text-ink-mute" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
