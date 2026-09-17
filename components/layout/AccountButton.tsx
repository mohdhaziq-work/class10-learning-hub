"use client";
/* Google account button — portfolio-style. Any account can sign in (progress
   syncs across devices on that email); the owner account additionally gets
   admin surfaces + the developer drawer. */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { watchAdmin, signInWithGoogle, signOutAdmin } from "@/lib/firebase/admin";
import { isFirebaseConfigured } from "@/lib/firebase/config";

function GoogleG() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function AccountButton() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const un = watchAdmin((is, email) => {
      setAdmin(is);
      if (is && email) setUser({ name: email.split("@")[0], email });
    });
    const un2 = import("firebase/auth").then(({ onAuthStateChanged }) => {
      import("@/lib/firebase/db").then(({ getFirebaseAuth }) => {
        const a = getFirebaseAuth();
        if (a) onAuthStateChanged(a, (u) => {
          setUser(u && !u.isAnonymous ? { name: u.displayName || (u.email || "").split("@")[0], email: u.email || "" } : null);
        });
      });
    }).catch(() => undefined);
    const onDown = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => { un(); void un2; document.removeEventListener("pointerdown", onDown); };
  }, []);

  if (!isFirebaseConfigured) return null;

  if (!user) {
    return (
      <button onClick={() => void signInWithGoogle()} title="Sign in with Google (optional)"
        className="inline-flex items-center gap-2 rounded-full font-semibold border border-slate-200 bg-white px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50 transition">
        <GoogleG /> Sign in
      </button>
    );
  }

  return (
    <div className="relative" ref={boxRef}>
      <button onClick={() => setOpen(!open)} title={user.email}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1 pr-3 py-1 hover:bg-slate-50 transition">
        <span className={`w-7 h-7 rounded-full grid place-items-center text-white text-[12px] font-extrabold ${admin ? "bg-emerald-600" : "bg-[#1a73e8]"}`}>
          {(user.name[0] || "S").toUpperCase()}
        </span>
        <span className="hidden sm:block text-[13px] font-semibold text-slate-700 max-w-[110px] truncate">{user.name}</span>
        <Icon name="chevronDown" size={14} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-2xl border border-slate-200 bg-white shadow-pop p-2 z-50 animate-fadeUp">
          <div className="px-3 py-2">
            <p className="text-[13px] font-bold text-slate-800 truncate">{user.name}</p>
            <p className="text-[11.5px] text-ink-mute truncate">{user.email}</p>
            <p className={`mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2 py-0.5 ${admin ? "bg-emerald-50 text-emerald-700" : "bg-[#e8f0fe] text-[#1a73e8]"}`}>
              <Icon name={admin ? "shieldCheck" : "cloud"} size={12} /> {admin ? "Admin / Developer" : "Progress sync on"}
            </p>
          </div>
          <div className="h-px bg-slate-100 my-1" />
          {admin && (
            <>
              <Link href="/admin-devices" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-100">
                <Icon name="radio" size={15} className="text-ink-mute" /> Live devices & teachers
              </Link>
              <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-100">
                <Icon name="penLine" size={15} className="text-ink-mute" /> Content editor
              </Link>
              <button onClick={() => { setDrawer(true); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-100">
                <Icon name="braces" size={15} className="text-ink-mute" /> Developer tools
              </button>
              <div className="h-px bg-slate-100 my-1" />
            </>
          )}
          <button onClick={() => { setOpen(false); void signOutAdmin(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-red-600 hover:bg-red-50">
            <Icon name="x" size={15} /> Sign out
          </button>
        </div>
      )}

      {drawer && admin && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[70]" onClick={() => setDrawer(false)} />
          <aside className="fixed right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-[80] shadow-pop p-5 overflow-y-auto animate-fadeUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-[16px] flex items-center gap-2"><Icon name="braces" size={17} /> Developer</h3>
              <button onClick={() => setDrawer(false)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-slate-100"><Icon name="x" size={16} /></button>
            </div>
            <p className="text-[12px] text-ink-mute mb-4">Admin-only tools. Board-side diagnostics live in Smart Board → MENU.</p>
            {[
              { href: "/admin-devices", icon: "radio", t: "Live devices & teacher authorization", d: "Permanent ledger on Firestore" },
              { href: "/classwork", icon: "galleryHorizontal", t: "Student classwork archive", d: "Teacher-synced board snapshots" },
              { href: "/admin", icon: "penLine", t: "Content editor", d: "Chapter slides / notes / quiz" },
              { href: "/smart-board", icon: "squarePen", t: "Smart Board (SPEED / REC / CLIPS in MENU)", d: "Latency HUD, screen recording, share-with-AI" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block rounded-xl border border-slate-200 p-3 mb-2 hover:border-[#1a73e8]/40 hover:bg-[#1a73e8]/5 transition">
                <span className="flex items-center gap-2 text-[13.5px] font-bold text-slate-800"><Icon name={l.icon} size={15} className="text-[#1a73e8]" /> {l.t}</span>
                <span className="block text-[11.5px] text-ink-mute mt-0.5">{l.d}</span>
              </Link>
            ))}
            <div className="rounded-xl bg-slate-50 p-3 text-[11.5px] text-ink-mute">
              Firebase: {isFirebaseConfigured ? "connected" : "not configured"} · Admin gate: signed-in owner email
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
