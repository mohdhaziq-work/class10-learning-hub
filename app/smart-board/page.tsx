import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "./board.css";

export const metadata: Metadata = {
 title: "Smart Board — Free Online Whiteboard for Class 10 Teaching | Class 10 Learning Hub",
 description:
  "Free online smart board for teachers and students: open PDFs and annotate, split whiteboard + notes view, maths graph plotter, shapes, sticky notes, timers and more. Works on smart boards, laptops, tablets and phones.",
 keywords: [
  "smart board online free",
  "online whiteboard for teaching",
  "annotate pdf online free",
  "class 10 smart board",
  "maths graph plotter online",
  "virtual blackboard for teachers",
 ],
 alternates: { canonical: "/smart-board" },
 openGraph: {
  title: "Smart Board — Free Online Whiteboard for Class 10 Teaching",
  description:
   "Open PDFs and annotate, split whiteboard + notes, maths graph plotter, shapes, sticky notes and timers. Free, works on any device.",
  url: "/smart-board",
  type: "website",
 },
 robots: { index: true, follow: true },
};

function Loading() {
 return (
  <div style={{ height: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(180deg,#fbfcfe 0%,#f2f6ff 100%)" }}>
   <div style={{ textAlign: "center", color: "#0f172a" }}>
    <div
     style={{
      width: 64,
      height: 64,
      margin: "0 auto 18px",
      borderRadius: 18,
      background: "linear-gradient(135deg,#1a73e8,#5aa2f8)",
      display: "grid",
      placeItems: "center",
      boxShadow: "0 10px 30px rgba(26,115,232,.35)",
     }}
    >
     <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="m7 10 3 2 4-5" />
     </svg>
    </div>
    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: ".2px" }}>Smart Board</div>
    <div style={{ fontSize: 13.5, color: "#5f6b7a", marginTop: 4 }} className="animate-pulse">
     Preparing your board…
    </div>
   </div>
  </div>
 );
}

const SmartBoard = dynamic(() => import("@/components/board/SmartBoard"), { ssr: false, loading: Loading });

const boardJsonLd = {
 "@context": "https://schema.org",
 "@type": "SoftwareApplication",
 name: "Smart Board — Class 10 Learning Hub",
 applicationCategory: "EducationalApplication",
 operatingSystem: "Web",
 url: "https://class10-learning-hub.onrender.com/smart-board",
 description:
  "Free online smart board for Class 10 teaching and revision: PDF annotation, split whiteboard, maths graph plotter, shapes, sticky notes, timers and past-year practice.",
 offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

const breadcrumbJsonLd = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://class10-learning-hub.onrender.com" },
  { "@type": "ListItem", position: 2, name: "Smart Board", item: "https://class10-learning-hub.onrender.com/smart-board" },
 ],
};

export default function SmartBoardPage() {
 return (
  <>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boardJsonLd) }} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
   <Suspense fallback={<Loading />}>
    <SmartBoard />
   </Suspense>
  </>
 );
}
