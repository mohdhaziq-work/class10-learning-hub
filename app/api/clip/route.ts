import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile, readFile, readdir, stat, unlink } from "fs/promises";
import path from "path";

/* Free clip relay — diagnostic screen recordings ride on the existing Render
   web service (no Firebase Storage / no Blaze). Ephemeral by design: clips
   live until the next deploy and are capped in count/size. Soft auth: the
   POST carries the caller's Firebase ID token; we decode it and accept only
   the owner email (diagnostic tooling, not a public dropbox). */

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BYTES = 30 * 1024 * 1024;
const KEEP = 12;
const ADMIN_EMAIL = "mohdhaziq1962@gmail.com";

function clipDir() {
  return process.env.CLIP_DIR || "/tmp/clips";
}

function decodeJwtEmail(token: string): { email: string; exp: number } | null {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    return { email: String(payload.email || "").toLowerCase(), exp: Number(payload.exp || 0) };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-clip-token") || "";
  const who = token ? decodeJwtEmail(token) : null;
  if (!who || who.email !== ADMIN_EMAIL || who.exp * 1000 < Date.now()) {
    return NextResponse.json({ error: "admin sign-in required" }, { status: 403 });
  }
  const type = req.headers.get("content-type") || "";
  if (!type.includes("video/")) return NextResponse.json({ error: "video only" }, { status: 415 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (!buf.length || buf.length > MAX_BYTES) return NextResponse.json({ error: "size" }, { status: 413 });

  const dir = clipDir();
  await mkdir(dir, { recursive: true });
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  await writeFile(path.join(dir, `${id}.webm`), buf);

  /* keep only the newest KEEP clips */
  try {
    const files = (await readdir(dir)).filter((f) => f.endsWith(".webm"));
    const withTime = await Promise.all(files.map(async (f) => ({ f, t: (await stat(path.join(dir, f))).mtimeMs })));
    withTime.sort((a, b) => b.t - a.t);
    for (const old of withTime.slice(KEEP)) await unlink(path.join(dir, old.f)).catch(() => undefined);
  } catch { /* best effort */ }

  return NextResponse.json({ id });
}

export async function GET(req: NextRequest) {
  const id = (req.nextUrl.searchParams.get("id") || "").replace(/[^a-z0-9]/g, "");
  if (!id) return NextResponse.json({ error: "bad id" }, { status: 400 });
  try {
    const buf = await readFile(path.join(clipDir(), `${id}.webm`));
    return new NextResponse(buf, {
      headers: { "Content-Type": "video/webm", "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return NextResponse.json({ error: "gone (clips are ephemeral)" }, { status: 404 });
  }
}
