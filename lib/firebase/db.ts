"use client";
/* Lazy Firebase init — sirf jab env configured ho. Kabhi crash nahi. */
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, signInAnonymously, Auth } from "firebase/auth";
import { firebaseConfig, isFirebaseConfigured } from "./config";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

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

/* Anonymous login — har device/student ko stable UID (progress sync ke liye) */
let uidPromise: Promise<string | null> | null = null;
export function ensureUid(): Promise<string | null> {
  if (!uidPromise) {
    uidPromise = (async () => {
      try {
        const d = getDb();
        if (!d || !auth) return null;
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
