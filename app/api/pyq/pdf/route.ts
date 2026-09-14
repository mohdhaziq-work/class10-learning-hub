import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { PYQ_MATHS, PYQ_CHAPTERS } from "@/lib/content/pyq";

/* Generates a printable PDF of a chapter's board PYQs (optionally one question).
   The Smart Board opens this in its FILE viewer (like NCERT PDFs); ?dl=1 downloads. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FONTS = path.join(process.cwd(), "fonts");

export async function GET(req: NextRequest) {
  const chKey = req.nextUrl.searchParams.get("ch") || "";
  const nStr = req.nextUrl.searchParams.get("n");
  const dl = req.nextUrl.searchParams.get("dl") === "1";
  const ch = PYQ_CHAPTERS.find((c) => c.key === chKey);
  const all = PYQ_MATHS[chKey] || [];
  if (!ch || all.length === 0) return new NextResponse("Chapter not found", { status: 404 });
  const list = nStr != null ? [all[Math.max(0, Math.min(all.length - 1, parseInt(nStr, 10) || 0))]].filter(Boolean) : all;

  const doc = new PDFDocument({ size: "A4", margins: { top: 60, bottom: 60, left: 54, right: 54 }, bufferPages: true });
  doc.registerFont("reg", path.join(FONTS, "DejaVuSans.ttf"));
  doc.registerFont("bold", path.join(FONTS, "DejaVuSans-Bold.ttf"));

  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((res) => doc.on("end", () => res(Buffer.concat(chunks))));

  /* ---------- header ---------- */
  doc.rect(0, 0, doc.page.width, 10).fill("#1a73e8");
  doc.moveDown(1.4);
  doc.font("bold").fontSize(9.5).fillColor("#1a73e8").text("CLASS 10 LEARNING HUB  ·  CBSE PREVIOUS YEAR QUESTIONS", { characterSpacing: 1.2 });
  doc.moveDown(0.4);
  doc.font("bold").fontSize(23).fillColor("#111827").text(`Chapter ${ch.n}: ${ch.name}`, { lineGap: 3 });
  doc.font("reg").fontSize(10.5).fillColor("#5f6368").text(
    `${list.length} board question${list.length > 1 ? "s" : ""}  ·  Unit: ${ch.unit}  ·  Answer key at the end`, { lineGap: 2 });
  doc.moveDown(0.6);
  const ruleY = doc.y;
  doc.moveTo(54, ruleY).lineTo(doc.page.width - 54, ruleY).lineWidth(1).strokeColor("#e5e7eb").stroke();
  doc.moveDown(1);

  /* ---------- questions ---------- */
  list.forEach((p, i) => {
    if (doc.y > doc.page.height - 130) doc.addPage();
    doc.font("bold").fontSize(11.5).fillColor("#111827").text(`Q${i + 1}.  `, { continued: true, lineGap: 3 });
    doc.font("reg").fillColor("#111827").text(p.q, { continued: true, lineGap: 3 });
    doc.font("bold").fontSize(9).fillColor("#1a73e8").text(`   [${p.y} · ${p.m}m]`, { lineGap: 3 });
    doc.moveDown(0.55);
  });

  /* ---------- answer key ---------- */
  doc.addPage();
  doc.rect(0, 0, doc.page.width, 10).fill("#111827");
  doc.moveDown(1.2);
  doc.font("bold").fontSize(16).fillColor("#111827").text("Answer Key", { characterSpacing: 0.5 });
  doc.font("reg").fontSize(9.5).fillColor("#5f6368").text("Concise solutions — show full steps in the exam for full marks.");
  doc.moveDown(0.8);
  list.forEach((p, i) => {
    if (doc.y > doc.page.height - 110) doc.addPage();
    doc.font("bold").fontSize(10.5).fillColor("#1a73e8").text(`A${i + 1}.  `, { continued: true, lineGap: 3 });
    doc.font("reg").fontSize(10).fillColor("#111827").text(p.ans, { lineGap: 3 });
    doc.moveDown(0.5);
  });

  /* ---------- footers ---------- */
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.font("reg").fontSize(8).fillColor("#9aa0a6").text(
      `class10-learning-hub.onrender.com  ·  Chapter ${ch.n} PYQs  ·  Page ${i + 1} of ${range.count}`,
      54, doc.page.height - 42, { lineBreak: false });
  }

  doc.end();
  const buf = await done;
  const filename = `class10-maths-ch${ch.n}-pyqs.pdf`;
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${dl ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
