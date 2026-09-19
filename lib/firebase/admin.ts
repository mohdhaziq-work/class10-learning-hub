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

/* Android WebViews (our APK) cannot open Firebase popups — window.open is dead
   there. Detect the shell (or a blocked popup) and use the full-page redirect
   flow instead, which works everywhere a normal link works. */
function looksLikeWebView(): boolean {
  try { return /Class10HubApp|; wv\)|Android.*Version\//i.test(navigator.userAgent); } catch { return false; }
}

export async function signInWithGoogle(): Promise<{ ok: boolean; message: string }> {
  if (!isFirebaseConfigured) return { ok: false, message: "Firebase is not configured on this deployment" };
  const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } = await import("firebase/auth");
  const provider = () => {
    const pr = new GoogleAuthProvider();
    pr.setCustomParameters({ prompt: "select_account" });
    return pr;
  };
  try {
    if (looksLikeWebView()) {
      await signInWithRedirect(getFirebaseAuth() || getAuth(), provider());
      return { ok: true, message: "Opening Google sign-in..." };
    }
    const cred = await signInWithPopup(getFirebaseAuth() || getAuth(), provider());
    if (isAdminEmail(cred.user.email)) return { ok: true, message: "Signed in as admin — developer tools unlocked" };
    return { ok: true, message: "Signed in — your progress now syncs on every device" };
  } catch (err) {
    const code = String((err as { code?: string })?.code || "");
    if (code.includes("popup") || code.includes("operation-not-supported") || code.includes("unauthorized-domain")) {
      try {
        await signInWithRedirect(getFirebaseAuth() || getAuth(), provider());
        return { ok: true, message: "Opening Google sign-in..." };
      } catch { /* fall through */ }
    }
    return { ok: false, message: "Google sign-in was cancelled or blocked" };
  }
}

/* After the redirect flow bounces back, Firebase needs this once on boot to
   finish the sign-in and fire onAuthStateChanged. */
export async function completePendingSignIn(): Promise<void> {
  if (!isFirebaseConfigured) return;
  try {
    const { getRedirectResult } = await import("firebase/auth");
    const a = getFirebaseAuth();
    if (a) await getRedirectResult(a);
  } catch { /* no pending redirect */ }
}

export async function signOutAdmin(): Promise<void> {
  try {
    const { getAuth, signOut } = await import("firebase/auth");
    const a = getFirebaseAuth();
    if (a) await signOut(a);
  } catch { /* noop */ }
}
