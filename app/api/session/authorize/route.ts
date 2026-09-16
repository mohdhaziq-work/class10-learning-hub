import { NextRequest, NextResponse } from "next/server";
import { setApproval, type ApprovalStatus } from "@/lib/track/store";

export const dynamic = "force-dynamic";

/* Permanent state mutation on the device vault: PENDING -> AUTHORIZED_TEACHER
   or REVOKED. Streams live to any connected dashboards/boards. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad body" }, { status: 400 }); }
  const dev = String(b.device_uuid || "").slice(0, 64);
  if (!dev) return NextResponse.json({ error: "missing device_uuid" }, { status: 400 });
  const status: ApprovalStatus = b.status === "REVOKED" ? "REVOKED" : "AUTHORIZED_TEACHER";
  const ok = setApproval(dev, status);
  return NextResponse.json({ ok });
}
