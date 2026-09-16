import { NextRequest, NextResponse } from "next/server";
import { touch, byeSession, approvalFor, approvalForSession } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Client heartbeat: refresh the LIVE pool AND the permanent device ledger.
   Closing a tab never drops the ledger row. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad body" }, { status: 400 }); }
  const sid = String(b.session_id || "").slice(0, 64);
  const dev = String(b.device_uuid || "").slice(0, 64);
  if (!sid) return NextResponse.json({ error: "missing session_id" }, { status: 400 });
  if (b.bye) { byeSession(sid); return NextResponse.json({ ok: true }); }
  if (!dev) return NextResponse.json({ error: "missing device_uuid" }, { status: 400 });
  const fwd = req.headers.get("x-forwarded-for") || "";
  const ip = (fwd.split(",")[0] || req.headers.get("x-real-ip") || "").trim().slice(0, 45);
  const log = touch({
    session_id: sid,
    device_uuid: dev,
    device_type: b.device_type,
    operating_system: b.operating_system,
    browser_name: b.browser_name,
    screen: b.screen,
    page: b.page,
    ip,
    legacy_first_seen: typeof b.legacy_first_seen === "number" ? b.legacy_first_seen : undefined,
  });
  return NextResponse.json({ ok: true, authorized: log.approval_status === "AUTHORIZED_TEACHER", status: log.approval_status });
}

/* Authorization lookup — by persistent device fingerprint (whiteboard handshake)
   or by transient session id. */
export async function GET(req: NextRequest) {
  const dev = req.nextUrl.searchParams.get("device");
  const sid = req.nextUrl.searchParams.get("sid");
  const status = dev ? approvalFor(dev) : sid ? approvalForSession(sid) : null;
  return NextResponse.json({ exists: status !== null, status, authorized: status === "AUTHORIZED_TEACHER" });
}
