import { NextRequest, NextResponse } from "next/server";
import { AI_PDF_DOCS, AI_PDF_TITLES, buildAiPdf } from "@/lib/aiPdf";

/* Generates the AI Half Yearly kit PDFs (model paper, answer key, objective bank,
   most expected questions, solved old paper). The Smart Board opens the same URL in
   its FILE viewer; ?dl=1 forces a download instead of inline view. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { doc: string } }) {
  const doc = params.doc;
  if (!(AI_PDF_DOCS as readonly string[]).includes(doc)) {
    return new NextResponse("Document not found", { status: 404 });
  }
  const dl = req.nextUrl.searchParams.get("dl") === "1";
  const buf = await buildAiPdf(doc);
  const filename = `${(AI_PDF_TITLES[doc] || "AI-Half-Yearly").replace(/\s+/g, "-")}.pdf`;
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${dl ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
