import { NextRequest, NextResponse } from "next/server";
import { upsert, remove, get } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Client heartbeat: create/refresh a tracked session, or say goodbye. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad body" }, { status: 400 }); }
  const sid = String(b.session_id || "").slice(0, 64);
  if (!sid) return NextResponse.json({ error: "missing session_id" }, { status: 400 });
  if (b.bye) { remove(sid); return NextResponse.json({ ok: true }); }
  const s = upsert({
    session_id: sid,
    device_type: b.device_type,
    operating_system: b.operating_system,
    browser_name: b.browser_name,
    screen: b.screen,
    page: b.page,
  });
  return NextResponse.json({ ok: true, authorized: s.is_teacher_authorized });
}

/* A client asking about its own authorization flag. */
export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get("sid") || "";
  const s = get(sid);
  return NextResponse.json({ exists: !!s, authorized: !!s?.is_teacher_authorized });
}
