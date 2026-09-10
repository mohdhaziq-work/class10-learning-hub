import { NextResponse } from "next/server";
import { SUBJECTS, totalChapters } from "@/lib/syllabus";

/* Poora syllabus JSON me — mobile app / future integrations ke liye */
export async function GET() {
  const slim = SUBJECTS.map((s) => ({
    id: s.id, name: s.name, hindi: s.hindi, icon: s.icon, color: s.color,
    tagline: s.tagline, features: s.features,
    groups: s.groups.map((g) => ({ label: g.label, chapters: g.chapters })),
  }));
  return NextResponse.json({ totalChapters: totalChapters(), subjects: slim });
}
