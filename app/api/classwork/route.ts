import { NextRequest, NextResponse } from "next/server";
import { approvalForSession, archiveClasswork, classworkList } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Secure conditional auto-save gateway: the server re-verifies the device's
   persistent approval (via its session's device_uuid) before accepting any
   board into the public archive. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad body" }, { status: 400 }); }
  const sid = String(b.session_id || "").slice(0, 64);
  if (approvalForSession(sid) !== "AUTHORIZED_TEACHER") {
    return NextResponse.json({ ok: false, blocked: true, reason: "device not authorized" }, { status: 403 });
  }
  const png = String(b.png || "").slice(0, 900_000);
  if (!png.startsWith("data:image/")) return NextResponse.json({ error: "bad image" }, { status: 400 });
  archiveClasswork({ session_id: sid, device: b.device || "Authorized board", png });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ entries: classworkList() });
}
