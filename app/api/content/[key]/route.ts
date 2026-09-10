import { NextResponse } from "next/server";
import { chapterDetail, autoDetail } from "@/lib/content";
import { getChapter } from "@/lib/syllabus";

/* GET /api/content/maths-0-0 → chapter detail (built-in ya auto fallback) */
export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const [s, g, c] = params.key.split("-");
  const found = getChapter(s, parseInt(g || "0", 10), parseInt(c || "0", 10));
  if (!found) return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  const builtin = chapterDetail(found.key);
  const detail = builtin || autoDetail(found.ch.title, found.sub.name, found.ch.n);
  return NextResponse.json({
    key: found.key,
    subject: found.sub.id,
    chapter: found.ch.n,
    title: found.ch.title,
    source: builtin ? "builtin" : "auto",
    detail,
  });
}
