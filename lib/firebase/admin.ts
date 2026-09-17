"use client";
/* Admin identity = Firebase Google sign-in with the owner email.
   Sign-in is optional for everyone; only this account unlocks admin surfaces
   (board SPEED/REC/CLIPS tools and the /admin-devices dashboard). */
import { isFirebaseConfigured } from "./config";
import { getFirebaseAuth } from "./db";

export const ADMIN_EMAIL = "mohdhaziq1962@gmail.com";

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && email.trim().toLowerCase() === ADMIN_EMAIL;
}

/* Subscribe to "is this browser signed in as the admin". Fires immediately
   with the current state. Returns an unsubscribe function. */
export function watchAdmin(cb: (isAdmin: boolean, email: string | null) => void): () => void {
  if (!isFirebaseConfigured) {
    cb(false, null);
    return () => undefined;
  }
  let unsub: (() => void) | null = null;
  import("firebase/auth").then(({ onAuthStateChanged }) => {
    const a = getFirebaseAuth();
    if (!a) { cb(false, null); return; }
    unsub = onAuthStateChanged(a, (u) => cb(isAdminEmail(u?.email), u?.email || null));
  }).catch(() => cb(false, null));
  return () => { if (unsub) unsub(); };
}

export async function signInWithGoogle(): Promise<{ ok: boolean; message: string }> {
  if (!isFirebaseConfigured) return { ok: false, message: "Firebase is not configured on this deployment" };
  try {
    const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
    const a = getFirebaseAuth() || getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(a, provider);
    if (isAdminEmail(cred.user.email)) return { ok: true, message: "Signed in as admin" };
    return { ok: false, message: "Signed in, but this Google account is not the admin" };
  } catch {
    return { ok: false, message: "Google sign-in was cancelled or blocked" };
  }
}

export async function signOutAdmin(): Promise<void> {
  try {
    const { getAuth, signOut } = await import("firebase/auth");
    const a = getFirebaseAuth();
    if (a) await signOut(a);
  } catch { /* noop */ }
}
