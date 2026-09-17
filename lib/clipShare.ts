"use client";
/* Share a diagnostic clip via the site's own free relay (/api/clip).
   Returns an absolute public URL the AI can fetch and inspect frame-by-frame. */
import { getFirebaseAuth } from "./firebase/db";

export async function uploadClip(blob: Blob, _label: string): Promise<string> {
  const auth = getFirebaseAuth();
  const user = auth?.currentUser;
  if (!user) throw new Error("Sign in first");
  const token = await user.getIdToken();
  const res = await fetch("/api/clip", {
    method: "POST",
    headers: { "Content-Type": "video/webm", "x-clip-token": token },
    body: blob,
  });
  if (!res.ok) throw new Error(`upload ${res.status}`);
  const { id } = (await res.json()) as { id: string };
  return `${window.location.origin}/api/clip?id=${id}`;
}
