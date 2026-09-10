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
      <Icon name={dark ? "sun" : "moon"} size={20} />
    </button>
  );
}

const LINKS = [
  { href: "/#subjects", icon: "layoutGrid", label: "Subjects" },
  { href: "/smart-board", icon: "squarePen", label: "Smart Board" },
  { href: "/admin", icon: "shieldCheck", label: "Admin" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#e1e3e6] dark:border-[#444746] bg-white/90 dark:bg-[#131314]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2.5 mr-2" onClick={() => setOpen(false)}>
          <span className="w-10 h-10 rounded-2xl grid place-items-center text-white shadow-card bg-gradient-to-br from-brand-600 to-[#9334e6]">
            <Icon name="graduationCap" size={22} />
          </span>
          <span className="font-display font-extrabold text-[17px] tracking-tight leading-none">
            Class 10 Hub
            <small className="block text-[10px] font-bold text-ink-mute dark:text-slate-400 tracking-[.14em] uppercase mt-0.5">Smart Learning</small>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="ml-auto hidden md:flex items-center gap-1 text-sm font-medium">
          {LINKS.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2 rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition">
              <Icon name={l.icon} size={17} /> {l.label}
            </Link>
          ))}
          <Link href="/admin" className="flex items-center gap-2 px-4 py-2 rounded-full text-ink-soft dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition">
            <Icon name="shieldCheck" size={17} /> Admin
          </Link>
          <span className="w-px h-6 bg-[#e1e3e6] dark:bg-[#444746] mx-1" />
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
        <nav className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-[#1e1f20] border-b border-[#e1e3e6] dark:border-[#444746] shadow-pop px-4 py-3 space-y-1 animate-fadeUp">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-[15px] text-ink dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10">
              <Icon name={l.icon} size={20} className="text-brand-600 dark:text-brand-300" /> {l.label}
              <Icon name="chevronRight" size={16} className="ml-auto text-ink-mute" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
