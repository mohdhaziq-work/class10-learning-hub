import type { Metadata } from "next";
import EnglishBlueprintView from "@/components/english/EnglishBlueprintView";

export const metadata: Metadata = {
  title: "Class 10 English Half Yearly — Blue Print + Chapter Summaries (80 Marks)",
  description:
    "School blue print for the English half-yearly (80 marks) with exam-ready revision packs for every chapter: detailed summaries, characters, themes, extract lines with meanings and marks-sized Q&A for First Flight prose, poetry and Footprints Without Feet, plus grammar and writing crash notes.",
};

export default function Page() {
  return <EnglishBlueprintView />;
}
