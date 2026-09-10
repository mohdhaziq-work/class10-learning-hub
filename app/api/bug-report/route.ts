import { NextResponse } from "next/server";

/* Bug report API — the client can also write to Firestore directly;
   this route provides validation + acknowledgement. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const page = String(body.page || "").slice(0, 200);
    const message = String(body.message || "").slice(0, 2000);
    const contact = String(body.contact || "").slice(0, 120);
    if (!message.trim() || !page.trim()) {
      return NextResponse.json({ ok: false, error: "page and message are required" }, { status: 400 });
    }
    /* Note: actual storage happens via client-side Firestore (lib/firebase/store.reportBug)
       so it runs on the free tier without a service account. */
    return NextResponse.json({ ok: true, received: { page, contact: contact || null, at: new Date().toISOString() } });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}
