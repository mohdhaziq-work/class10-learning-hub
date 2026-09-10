"use client";
/* Teacher content overrides — saved from the Admin panel.
   Priority: Firestore remote > localStorage > built-in content. */
import { useEffect, useState } from "react";
import type { ChapterDetail } from "./content";
import { getRemoteOverride, saveRemoteOverride } from "./firebase/store";

const KEY = "c10-overrides-v1";

function loadLocal(): Record<string, ChapterDetail> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function getLocalOverride(key: string): ChapterDetail | null {
  if (typeof window === "undefined") return null;
  return loadLocal()[key] || null;
}

export async function saveOverride(key: string, detail: ChapterDetail): Promise<"cloud" | "local"> {
  const all = loadLocal();
  all[key] = detail;
  localStorage.setItem(KEY, JSON.stringify(all));
  const ok = await saveRemoteOverride(key, detail);
  return ok ? "cloud" : "local";
}

export function deleteOverride(key: string) {
  const all = loadLocal();
  delete all[key];
  localStorage.setItem(KEY, JSON.stringify(all));
}

/* Merged detail for chapter pages: built-in + local + remote */
export function useMergedDetail(key: string, builtin: ChapterDetail | null) {
  const [detail, setDetail] = useState<ChapterDetail | null>(() => getLocalOverride(key) || builtin);
  const [source, setSource] = useState<"builtin" | "local" | "cloud">(
    getLocalOverride(key) ? "local" : "builtin"
  );
  useEffect(() => {
    setDetail(getLocalOverride(key) || builtin);
    setSource(getLocalOverride(key) ? "local" : "builtin");
    getRemoteOverride(key).then((remote) => {
      if (remote) {
        setDetail(remote);
        setSource("cloud");
      }
    });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return { detail, source };
}
