"use client";
/* Permanent device/teacher/classwork ledger on Firestore — survives every
   Render redeploy (the old .data file was ephemeral). Public read; writes
   restricted by Firestore rules (admin email for approvals/deletes). */
import { doc, getDoc, setDoc, getDocs, collection, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "./db";

export type ApprovalStatus = "AUTHORIZED_TEACHER" | "REVOKED" | "PENDING";

export interface DeviceDoc {
  uuid: string;
  os: string;
  browser: string;
  device_type: string;
  screen: string;
  first_seen: number;
  last_seen: number;
}

export async function fsGetApproval(uuid: string): Promise<ApprovalStatus> {
  try {
    const db = getDb();
    if (!db) return "PENDING";
    const s = await getDoc(doc(db, "approvals", uuid));
    if (!s.exists()) return "PENDING";
    const st = String((s.data() as { status?: string }).status || "PENDING");
    return st === "AUTHORIZED_TEACHER" ? "AUTHORIZED_TEACHER" : st === "REVOKED" ? "REVOKED" : "PENDING";
  } catch {
    return "PENDING";
  }
}

export async function fsSetApproval(uuid: string, status: "AUTHORIZED_TEACHER" | "REVOKED"): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("no firebase");
  await setDoc(doc(db, "approvals", uuid), { status, updatedAt: serverTimestamp() });
}

export async function fsUpsertDevice(uuid: string, meta: { os: string; browser: string; device_type: string; screen: string }): Promise<void> {
  try {
    const db = getDb();
    if (!db) return;
    const ref = doc(db, "devices", uuid);
    const s = await getDoc(ref);
    if (s.exists()) await setDoc(ref, { ...meta, last_seen: Date.now() }, { merge: true });
    else await setDoc(ref, { ...meta, first_seen: Date.now(), last_seen: Date.now() });
  } catch { /* best effort */ }
}

export async function fsListDevices(): Promise<DeviceDoc[]> {
  try {
    const db = getDb();
    if (!db) return [];
    const snap = await getDocs(collection(db, "devices"));
    return snap.docs.map((d) => ({ uuid: d.id, ...(d.data() as Omit<DeviceDoc, "uuid">) }))
      .sort((a, b) => (b.last_seen || 0) - (a.last_seen || 0));
  } catch {
    return [];
  }
}

export interface ClassworkEntry { id: string; device: string; saved_at: number; png: string }

export async function fsAddClasswork(device: string, png: string): Promise<boolean> {
  try {
    const db = getDb();
    if (!db) return false;
    await addDoc(collection(db, "classwork"), { device, png, saved_at: Date.now() });
    return true;
  } catch {
    return false;
  }
}

export async function fsListClasswork(): Promise<ClassworkEntry[]> {
  try {
    const db = getDb();
    if (!db) return [];
    const snap = await getDocs(collection(db, "classwork"));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClassworkEntry, "id">) }))
      .sort((a, b) => (b.saved_at || 0) - (a.saved_at || 0));
  } catch {
    return [];
  }
}

export async function fsDeleteClasswork(id: string): Promise<void> {
  try {
    const db = getDb();
    if (db) await deleteDoc(doc(db, "classwork", id));
  } catch { /* admin-only rule */ }
}
