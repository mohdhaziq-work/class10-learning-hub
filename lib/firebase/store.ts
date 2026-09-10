"use client";
/* Firestore helpers — overrides (teacher content), progress sync, bug reports.
   Har function best-effort: Firebase na ho to null/false, app local chalti rahe. */
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb, ensureUid } from "./db";
import type { ChapterDetail } from "@/lib/content";

export async function getRemoteOverride(key: string): Promise<ChapterDetail | null> {
  try {
    const db = getDb();
    if (!db) return null;
    const snap = await getDoc(doc(db, "chapterContent", key));
    if (!snap.exists()) return null;
    const data = snap.data() as { detail?: ChapterDetail };
    return data.detail || null;
  } catch {
    return null;
  }
}

export async function saveRemoteOverride(key: string, detail: ChapterDetail): Promise<boolean> {
  try {
    const db = getDb();
    if (!db) return false;
    await setDoc(doc(db, "chapterContent", key), { detail, updatedAt: serverTimestamp() });
    return true;
  } catch {
    return false;
  }
}

export async function pushProgress(map: Record<string, boolean>): Promise<void> {
  try {
    const db = getDb();
    if (!db) return;
    const uid = await ensureUid();
    if (!uid) return;
    await setDoc(doc(db, "progress", uid), { map, updatedAt: serverTimestamp() }, { merge: true });
  } catch { /* silent — local hi source of truth */ }
}

export async function pullProgress(): Promise<Record<string, boolean> | null> {
  try {
    const db = getDb();
    if (!db) return null;
    const uid = await ensureUid();
    if (!uid) return null;
    const snap = await getDoc(doc(db, "progress", uid));
    if (!snap.exists()) return null;
    return (snap.data() as { map?: Record<string, boolean> }).map || null;
  } catch {
    return null;
  }
}

export async function reportBug(payload: { page: string; message: string; contact?: string }): Promise<boolean> {
  try {
    const db = getDb();
    if (!db) return false;
    await addDoc(collection(db, "bugReports"), { ...payload, createdAt: serverTimestamp(), status: "new" });
    return true;
  } catch {
    return false;
  }
}
