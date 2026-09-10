import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "🖊️ Smart Board",
  description: "Advanced classroom smart board: PDF/DOCX kholo, annotate karo, split whiteboard, maths graph plotter. Free.",
};

const SmartBoard = dynamic(() => import("@/components/board/SmartBoard"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100vh", display: "grid", placeItems: "center", background: "#0b1020", color: "#eef1ff", fontSize: 18, fontWeight: 700 }}>
      🖊️ Smart Board load ho raha hai…
    </div>
  ),
});

export default function SmartBoardPage() {
  return (
    <Suspense fallback={<div style={{ height: "100vh", display: "grid", placeItems: "center", background: "#0b1020", color: "#fff" }}>Loading…</div>}>
      <SmartBoard />
    </Suspense>
  );
}
