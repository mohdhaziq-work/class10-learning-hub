import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, app: "class10-learning-hub", version: "2.0.0", time: new Date().toISOString() });
}
