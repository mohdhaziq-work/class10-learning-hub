export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= SCREEN CAST — signaling relay =================
   WebRTC does the heavy lifting (peer-to-peer, DTLS-SRTP encrypted, sub-second).
   This route only relays offer/answer/ICE between the viewer (TV/laptop)
   and the sender (phone), plus presence. Everything lives in memory —
   nothing about your screen ever touches the server.

   Session lifetime: created by the viewer, GC'd when the viewer stops
   polling (>25s idle) or after 4h max. */

type Role = "viewer" | "sender";
type Sig = { id: number; from: Role; msg: any; t: number };
type Peer = { lastSeen: number; mbox: Sig[] };
type CastSession = { sid: string; created: number; viewer: Peer; sender: Peer | null; ended: boolean };

const sessions = new Map<string, CastSession>();
const ALPHA = "abcdefghjkmnpqrstuvwxyz23456789"; /* no 0/o/1/l/i — easy to read aloud */
const MAX_SESSIONS = 60;
const MBOX_CAP = 240;
const VIEWER_IDLE_MS = 25_000;
const MAX_AGE_MS = 4 * 60 * 60 * 1000;
let sigId = 1;

function gc(now: number) {
  for (const [sid, s] of sessions) {
    if (now - s.viewer.lastSeen > VIEWER_IDLE_MS || now - s.created > MAX_AGE_MS) sessions.delete(sid);
  }
  while (sessions.size > MAX_SESSIONS) sessions.delete(sessions.keys().next().value as string);
}
function newSid(): string {
  let sid = "";
  for (let i = 0; i < 6; i++) sid += ALPHA[Math.floor(Math.random() * ALPHA.length)];
  return sessions.has(sid) ? newSid() : sid;
}
function push(s: CastSession, to: Role, msg: any) {
  const peer = to === "viewer" ? s.viewer : s.sender;
  if (!peer) return;
  peer.mbox.push({ id: sigId++, from: to === "viewer" ? "sender" : "viewer", msg, t: Date.now() });
  if (peer.mbox.length > MBOX_CAP) peer.mbox.splice(0, peer.mbox.length - MBOX_CAP);
}
function peerOnline(p: Peer | null, now: number) { return !!p && now - p.lastSeen < 8000; }

export async function POST(req: Request) {
  let b: any;
  try { b = await req.json(); } catch { return Response.json({ ok: false, error: "bad json" }, { status: 400 }); }
  const now = Date.now();
  gc(now);

  if (b?.a === "create") {
    const sid = newSid();
    sessions.set(sid, { sid, created: now, viewer: { lastSeen: now, mbox: [] }, sender: null, ended: false });
    return Response.json({ ok: true, sid });
  }

  const sid = String(b?.sid || "");
  const s = sessions.get(sid);
  if (!s) return Response.json({ ok: false, error: "session not found" }, { status: 404 });

  if (b?.a === "join") {
    if (s.ended) return Response.json({ ok: false, error: "session ended" }, { status: 410 });
    if (!s.sender) s.sender = { lastSeen: now, mbox: [] };
    else s.sender.lastSeen = now;
    push(s, "viewer", { type: "joined" });
    return Response.json({ ok: true });
  }

  const from: Role = b?.from === "sender" ? "sender" : "viewer";
  const peer = from === "viewer" ? s.viewer : s.sender;
  if (!peer) return Response.json({ ok: false, error: "not joined" }, { status: 404 });
  peer.lastSeen = now;

  if (b?.a === "sig") {
    const msgs = Array.isArray(b?.msgs) ? b.msgs.slice(0, 40) : [];
    msgs.forEach((m: any) => push(s, from === "viewer" ? "sender" : "viewer", m));
    return Response.json({ ok: true });
  }
  if (b?.a === "end") {
    s.ended = true;
    push(s, "viewer", { type: "bye" });
    push(s, "sender", { type: "bye" });
    setTimeout(() => sessions.delete(sid), 10_000);
    return Response.json({ ok: true });
  }
  return Response.json({ ok: false, error: "unknown action" }, { status: 400 });
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const sid = u.searchParams.get("sid") || "";
  const from: Role = u.searchParams.get("from") === "sender" ? "sender" : "viewer";
  const after = +(u.searchParams.get("after") || 0);
  const now = Date.now();
  gc(now);

  const s = sessions.get(sid);
  if (!s) return Response.json({ ok: false, error: "session not found" }, { status: 404 });
  const peer = from === "viewer" ? s.viewer : s.sender;
  if (!peer) return Response.json({ ok: false, error: "not joined" }, { status: 404 });
  peer.lastSeen = now;

  const msgs = peer.mbox.filter((m) => m.id > after).map((m) => ({ id: m.id, msg: m.msg }));
  return Response.json({
    ok: true,
    msgs,
    ended: s.ended,
    peerOnline: peerOnline(from === "viewer" ? s.sender : s.viewer, now),
  });
}
