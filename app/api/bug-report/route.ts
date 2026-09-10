import { NextResponse } from "next/server";

/* Bug report API — client seedha Firestore bhi likh sakta hai;
   ye route validation + acknowledgement deta hai. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const page = String(body.page || "").slice(0, 200);
    const message = String(body.message || "").slice(0, 2000);
    const contact = String(body.contact || "").slice(0, 120);
    if (!message.trim() || !page.trim()) {
      return NextResponse.json({ ok: false, error: "page aur message zaroori hain" }, { status: 400 });
    }
    /* Note: asli storage client-side Firestore se hoti hai (lib/firebase/store.reportBug)
       taaki bina service-account ke free tier par chale. */
    return NextResponse.json({ ok: true, received: { page, contact: contact || null, at: new Date().toISOString() } });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}
