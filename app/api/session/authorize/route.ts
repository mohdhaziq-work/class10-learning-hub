import { NextRequest, NextResponse } from "next/server";
import { setAuthorized } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Admin action: flip a device's teacher-authorization flag (streams live to the device). */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad body" }, { status: 400 }); }
  const sid = String(b.session_id || "").slice(0, 64);
  if (!sid) return NextResponse.json({ error: "missing session_id" }, { status: 400 });
  const ok = setAuthorized(sid, !!b.authorized);
  return NextResponse.json({ ok });
}
