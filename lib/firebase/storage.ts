"use client";
/* Clip sharing — admin uploads a screen recording to Firebase Storage and
   gets a public link to paste into the AI chat for frame-by-frame diagnosis. */
import { isFirebaseConfigured } from "./config";
import { getFirebaseAuth } from "./db";

export async function uploadClip(blob: Blob, label: string): Promise<string> {
  if (!isFirebaseConfigured) throw new Error("Firebase not configured");
  const a = getFirebaseAuth();
  if (!a?.currentUser) throw new Error("Sign in first");
  const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
  const st = getStorage();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const r = ref(st, `recordings/${id}.webm`);
  await uploadBytes(r, blob, { contentType: "video/webm", customMetadata: { label } });
  return getDownloadURL(r);
}
