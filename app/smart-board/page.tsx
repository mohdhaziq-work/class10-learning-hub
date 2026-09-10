import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "./board.css";

export const metadata: Metadata = {
 title: "Smart Board",
 description: "Advanced classroom smart board: open PDFs, annotate, split whiteboard, maths graph plotter. Free.",
};

function Loading() {
 return (
 <div style={{ height: "100vh", display: "grid", placeItems: "center", background: "#0b1020", color: "#eef1ff", fontSize: 18, fontWeight: 700 }}>
 <span className="animate-pulse">Loading Smart Board…</span>
 </div>
 );
}

const SmartBoard = dynamic(() => import("@/components/board/SmartBoard"), { ssr: false, loading: Loading });

export default function SmartBoardPage() {
 return (
 <Suspense fallback={<Loading />}>
 <SmartBoard />
 </Suspense>
 );
}
