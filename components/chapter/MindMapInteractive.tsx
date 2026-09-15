"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Mindmap } from "@/lib/content/types";

/* NotebookLM-style node mind map: radial branches, tap a node to expand its
   children, zoom controls, connector lines rendered in SVG. */
export default function MindMapInteractive({ data }: { data: Mindmap }) {
 const [open, setOpen] = useState<number | null>(0);
 const [zoom, setZoom] = useState(1);
 const n = Math.max(data.branches.length, 1);

 const pos = (i: number) => {
  const a = (i / n) * 2 * Math.PI - Math.PI / 2;
  return { x: 50 + 37 * Math.cos(a), y: 50 + 39 * Math.sin(a) };
 };

 return (
  <div className="mmx">
   <div className="mmx-bar">
    <button onClick={() => setZoom((z) => Math.max(0.7, Math.round((z - 0.15) * 100) / 100))} title="Zoom out">
     <Icon name="minus" size={15} />
    </button>
    <span>{Math.round(zoom * 100)}%</span>
    <button onClick={() => setZoom((z) => Math.min(1.8, Math.round((z + 0.15) * 100) / 100))} title="Zoom in">
     <Icon name="plus" size={15} />
    </button>
    <span className="mmx-hint">Tap any node to expand it</span>
   </div>
   <div className="mmx-canvas" style={{ transform: `scale(${zoom})` }}>
    <svg className="mmx-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
     {data.branches.map((b, i) => {
      const p = pos(i);
      return (
       <line
        key={i}
        x1="50"
        y1="50"
        x2={p.x}
        y2={p.y}
        stroke={b.color || "#1a73e8"}
        strokeWidth={open === i ? 1.1 : 0.5}
        strokeDasharray={open === i ? "none" : "2 2"}
        opacity={open === i ? 0.9 : 0.4}
       />
      );
     })}
    </svg>
    <div className="mmx-center">{data.central}</div>
    {data.branches.map((b, i) => {
     const p = pos(i);
     return (
      <button
       key={i}
       className={`mmx-node${open === i ? " on" : ""}`}
       style={{ left: `${p.x}%`, top: `${p.y}%`, ["--bc" as string]: b.color || "#1a73e8" }}
       onClick={() => setOpen(open === i ? null : i)}
      >
       {b.label}
      </button>
     );
    })}
    {open != null && data.branches[open] && (
     <div className="mmx-kids" style={{ ["--bc" as string]: data.branches[open].color || "#1a73e8" }}>
      <h5>{data.branches[open].label}</h5>
      <ul>
       {(data.branches[open].children || []).map((c, j) => (
        <li key={j}>{c}</li>
       ))}
      </ul>
     </div>
    )}
   </div>
  </div>
 );
}
