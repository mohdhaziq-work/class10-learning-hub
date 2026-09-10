import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import * as path from "path";
import * as os from "os";
import { randomUUID } from "crypto";

/* Phone → Smart Board file drop.
   POST ?session=SID with raw bytes (headers x-filename, x-mime).
   GET  ?session=SID&since=TS lists newly arrived files (board polls this).
   Files live in the OS temp dir and are swept after 3 hours. */

export const dynamic = "force-dynamic";

const ROOT = path.join(os.tmpdir(), "c10-board-uploads");
const MAX_FILE = 250 * 1024 * 1024;
const MAX_FILES = 30;
const MAX_AGE = 3 * 3600 * 1000;

const okSid = (s: string) => /^[A-Za-z0-9-]{8,64}$/.test(s);

async function sweep() {
  try {
    const now = Date.now();
    const sids = await fs.readdir(ROOT);
    for (const sid of sids) {
      if (!okSid(sid)) continue;
      try {
        const dir = path.join(ROOT, sid);
        const st = await fs.stat(dir);
        if (now - st.mtimeMs > MAX_AGE) await fs.rm(dir, { recursive: true, force: true });
      } catch {
        /* gone */
      }
    }
  } catch {
    /* no uploads yet */
  }
}

export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get("session") || "";
  if (!okSid(sid)) return NextResponse.json({ error: "bad session" }, { status: 400 });
  await sweep();
  const since = +(req.nextUrl.searchParams.get("since") || 0);
  const dir = path.join(ROOT, sid);
  const files: { id: string; name: string; size: number; mime: string; time: number }[] = [];
  try {
    const names = await fs.readdir(dir);
    for (const n of names) {
      if (!n.endsWith(".json")) continue;
      try {
        const m = JSON.parse(await fs.readFile(path.join(dir, n), "utf8"));
        if (m && m.time > since && m.id) files.push(m);
      } catch {
        /* skip corrupt meta */
      }
    }
  } catch {
    /* no such session yet */
  }
  files.sort((a, b) => a.time - b.time);
  return NextResponse.json({ files });
}

export async function POST(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get("session") || "";
  if (!okSid(sid)) return NextResponse.json({ error: "bad session" }, { status: 400 });
  const rawName = req.headers.get("x-filename") || "file";
  let name = "file";
  try {
    name = decodeURIComponent(rawName).replace(/[\\/:*?"<>|]/g, "_").slice(0, 120) || "file";
  } catch {
    /* keep default */
  }
  const mime = (req.headers.get("x-mime") || "application/octet-stream").slice(0, 100);
  if (!req.body) return NextResponse.json({ error: "empty body" }, { status: 400 });
  await sweep();
  const dir = path.join(ROOT, sid);
  await fs.mkdir(dir, { recursive: true });
  const existing = (await fs.readdir(dir)).filter((n) => n.endsWith(".json"));
  if (existing.length >= MAX_FILES) {
    return NextResponse.json({ error: "too many files in this session" }, { status: 413 });
  }
  const fid = randomUUID().replace(/-/g, "");
  const fp = path.join(dir, fid + ".bin");
  /* stream straight to disk (no memory blowup on big videos) with a size cap */
  const reader = req.body.getReader();
  const fh = await fs.open(fp, "w");
  let got = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      got += value.length;
      if (got > MAX_FILE) {
        await fh.close();
        await fs.unlink(fp).catch(() => {});
        return NextResponse.json({ error: "file too big (max 250 MB)" }, { status: 413 });
      }
      await fh.write(value);
    }
  } finally {
    try {
      await fh.close();
    } catch {
      /* noop */
    }
  }
  try {
    const now = new Date();
    await fs.utimes(dir, now, now);
  } catch {
    /* noop */
  }
  const meta = { id: fid, name, size: got, mime, time: Date.now() };
  await fs.writeFile(path.join(dir, fid + ".json"), JSON.stringify(meta));
  return NextResponse.json({ ok: true, file: meta });
}
