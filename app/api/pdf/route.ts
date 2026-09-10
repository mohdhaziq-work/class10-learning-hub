import { NextRequest, NextResponse } from "next/server";

/* Same-origin proxy for official NCERT textbook PDFs.
   The Smart Board fetches through here so the browser never hits
   CORS blocks. Only ncert.nic.in/textbook/pdf/*.pdf is allowed. */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u") || "";
  let url: URL;
  try {
    url = new URL(u);
  } catch {
    return new NextResponse("Bad URL", { status: 400 });
  }
  const okHost = url.protocol === "https:" && url.hostname === "ncert.nic.in";
  const okPath = url.pathname.startsWith("/textbook/pdf/") && url.pathname.endsWith(".pdf");
  if (!okHost || !okPath) {
    return new NextResponse("Only official NCERT textbook PDFs are allowed", { status: 403 });
  }
  try {
    const upstream = await fetch(url.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (Class10-Learning-Hub; student board)" },
    });
    if (!upstream.ok || !upstream.body) {
      return new NextResponse("NCERT download failed — try again", { status: 502 });
    }
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    const base = url.pathname.split("/").pop() || "chapter.pdf";
    headers.set("Content-Disposition", `inline; filename="${base}"`);
    const len = upstream.headers.get("content-length");
    if (len) headers.set("Content-Length", len);
    headers.set("Cache-Control", "public, max-age=86400");
    return new NextResponse(upstream.body, { headers });
  } catch {
    return new NextResponse("NCERT download failed — try again", { status: 502 });
  }
}
