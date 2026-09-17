"use client";
/* Lazy Firebase init — only when env is configured. Never crashes. */
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, signInAnonymously, Auth } from "firebase/auth";
import { firebaseConfig, isFirebaseConfigured } from "./config";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function getFirebaseAuth(): Auth | null {
  getDb();
  return auth;
}

export function getDb(): Firestore | null {
  if (!isFirebaseConfigured) return null;
  try {
    if (!app) {
      app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
    }
    return db;
  } catch {
    return null;
  }
}

/* UID for progress sync: a signed-in Google account wins (same email on any
   device sees the same data), otherwise anonymous per-device UID. */
let uidPromise: Promise<string | null> | null = null;
let uidOverride: string | null = null;
export function setUidOverride(v: string | null) { uidOverride = v; uidPromise = null; }
export function ensureUid(): Promise<string | null> {
  if (!uidPromise) {
    uidPromise = (async () => {
      try {
        const d = getDb();
        if (!d || !auth) return null;
        if (uidOverride) return uidOverride;
        if (auth.currentUser && !auth.currentUser.isAnonymous) return auth.currentUser.uid;
        if (auth.currentUser) return auth.currentUser.uid;
        const cred = await signInAnonymously(auth);
        return cred.user.uid;
      } catch {
        return null;
      }
    })();
  }
  return uidPromise;
}
