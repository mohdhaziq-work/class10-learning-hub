"use client";
/* Progress store — localStorage first, Firestore sync best-effort.
   React hook + plain functions dono. */
import { useCallback, useEffect, useState } from "react";
import { getSubject, chapterKey } from "./syllabus";
import { pushProgress, pullProgress } from "./firebase/store";

const KEY = "c10-progress-v2";

function load(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function save(p: Record<string, boolean>) {
  localStorage.setItem(KEY, JSON.stringify(p));
  pushProgress(p);
}

export function isDone(key: string): boolean {
  if (typeof window === "undefined") return false;
  return !!load()[key];
}
export function toggleDone(key: string): boolean {
  const p = load();
  if (p[key]) delete p[key];
  else p[key] = true;
  save(p);
  window.dispatchEvent(new CustomEvent("c10-progress", { detail: { key, done: !!p[key] } }));
  return !!p[key];
}
export function subjectPct(subId: string): number {
  const sub = getSubject(subId);
  if (!sub) return 0;
  const p = typeof window === "undefined" ? {} : load();
  let total = 0, done = 0;
  sub.groups.forEach((gr, gi) =>
    gr.chapters.forEach((_ch, ci) => {
      total++;
      if (p[chapterKey(subId, gi, ci)]) done++;
    })
  );
  return total ? Math.round((done / total) * 100) : 0;
}
export function overallPct(): { done: number; total: number } {
  const p = typeof window === "undefined" ? {} : load();
  let total = 0;
  const { SUBJECTS } = require("./syllabus") as typeof import("./syllabus");
  SUBJECTS.forEach((s) => s.groups.forEach((g) => (total += g.chapters.length)));
  return { done: Object.keys(p).length, total };
}

/* Cloud se ek baar merge (local jeetta hai — classroom me wahi sahi) */
export function mergeCloudOnce() {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem("c10-cloud-merged")) return;
  sessionStorage.setItem("c10-cloud-merged", "1");
  pullProgress().then((cloud) => {
    if (!cloud) return;
    const local = load();
    const merged = { ...cloud, ...local };
    localStorage.setItem(KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent("c10-progress", { detail: { merged: true } }));
  });
}

export function useProgress(subId?: string) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    mergeCloudOnce();
    const fn = () => setTick((t) => t + 1);
    window.addEventListener("c10-progress", fn);
    return () => window.removeEventListener("c10-progress", fn);
  }, []);
  const toggle = useCallback((key: string) => toggleDone(key), []);
  return {
    tick,
    toggle,
    isDone: (key: string) => (tick >= 0 ? isDone(key) : false),
    pct: subId ? subjectPct(subId) : 0,
  };
}
