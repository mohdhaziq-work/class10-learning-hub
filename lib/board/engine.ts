/* ============================================================================
   SMART BOARD ENGINE v2 — TypeScript class, React-safe (mount/unmount clean).
   PDF (pdfjs-dist) • DOCX (mammoth) • TXT • Images • Split view • Shapes •
   Maths tools • Class widgets • Auto-save • Touch ready
   ========================================================================== */
import * as pdfjsLib from "pdfjs-dist";
import QRCode from "qrcode";

export interface EngineOpts { layout?: string; bg?: string; pdfUrl?: string; pdfName?: string; webUrl?: string; webName?: string }
import { recognizeShape, fitBoard, confettiBurst, TEMPLATES } from "./extras";
import { RemotePad } from "./pad";
import { putFile, getFile, listFiles, deleteFile, touchFile, fmtSize, fmtWhen } from "./files";
import { INK_WORKER_SOURCE } from "./inkWorkerSource";
import { startRecording, startFromStream, stopRecording, isRecording, supportsScreenShare, listRecordings, deleteRecording, type RecordingMeta } from "./recorder";
import { watchAdmin, signInWithGoogle, signOutAdmin, ADMIN_EMAIL } from "@/lib/firebase/admin";
import { uploadClip } from "@/lib/clipShare";
import { fsUpsertClasswork } from "@/lib/firebase/vault";
/* set true on verified high-end boards to enable the OffscreenCanvas worker */
const INK_WORKER_ENABLED = false;

export type BgKind = "white" | "black" | "grid" | "graph" | "ruled" | "dotted";

function uid(): string { return "o" + Math.random().toString(36).slice(2, 9); }

/* ---------- vector object model ---------- */
export interface BoardObject {
  id: string; type: "stroke" | "shape" | "text" | "sticky" | "image" | "erase";
  tool?: string; kind?: string; points?: { x: number; y: number; w?: number }[];
  shape?: string; x1?: number; y1?: number; x2?: number; y2?: number;
  x?: number; y?: number; w?: number; h?: number;
  text?: string; fontSize?: number; weight?: number; bg?: string; src?: string; img?: HTMLImageElement;
  color?: string; size?: number; opacity?: number; fill?: boolean; efill?: string; /* pixel eraser paints this surface color */ dashed?: boolean; rot?: number;
  _w?: number; _h?: number;
}

class Store {
  objects: BoardObject[] = [];
  undo: BoardObject[][] = [];
  redo: BoardObject[][] = [];
  /* snap = native deep clone (no giant JSON strings): keeps stroke-start cost low
     and avoids GC pauses mid-stroke on busy boards */
  private snap(): BoardObject[] {
    const out = new Array(this.objects.length);
    for (let i = 0; i < this.objects.length; i++) {
      const c = { ...(this.objects[i] as object) } as Record<string, unknown>;
      delete c.img; /* live Image handles are not cloneable — src survives */
      out[i] = c;
    }
    const sc = (globalThis as { structuredClone?: (v: unknown) => unknown }).structuredClone;
    return (typeof sc === "function" ? sc(out) : JSON.parse(JSON.stringify(out))) as BoardObject[];
  }
  pushHistory() { this.undo.push(this.snap()); if (this.undo.length > 60) this.undo.shift(); this.redo.length = 0; }
  doUndo(): boolean {
    if (!this.undo.length) return false;
    this.redo.push(this.snap());
    this.objects = rehydrate(this.undo.pop() as BoardObject[]);
    return true;
  }
  doRedo(): boolean {
    if (!this.redo.length) return false;
    this.undo.push(this.snap());
    this.objects = rehydrate(this.redo.pop() as BoardObject[]);
    return true;
  }
}

function rehydrate(arr: BoardObject[]): BoardObject[] {
  return (arr || []).map((o) => {
    if (o.type === "image" && o.src && !o.img) {
      const im = new Image(); im.src = o.src; o.img = im;
      im.onload = () => window.dispatchEvent(new CustomEvent("sb-board-dirty"));
    }
    return o;
  });
}

/* ==========================================================================
   DRAWING PRIMITIVES
   ========================================================================== */
function applyStyle(ctx: CanvasRenderingContext2D, o: BoardObject) {
  ctx.globalAlpha = (o.opacity ?? 100) / 100;
  ctx.strokeStyle = o.color || "#111";
  ctx.fillStyle = o.color || "#111";
  ctx.lineWidth = o.size || 3;
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.setLineDash(o.dashed ? [10, 8] : []);
}
function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, lw: number) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = Math.max(10, lw * 3.2);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42));
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42)); ctx.stroke();
  ctx.beginPath(); ctx.arc(x2, y2, lw * 0.7, 0, 7); ctx.fill();
}
function starPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, oR: number, iR: number) {
  let rot = (Math.PI / 2) * 3; const step = Math.PI / spikes;
  ctx.moveTo(cx, cy - oR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * oR, cy + Math.sin(rot) * oR); rot += step;
    ctx.lineTo(cx + Math.cos(rot) * iR, cy + Math.sin(rot) * iR); rot += step;
  }
  ctx.closePath();
}
function bracketPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  w = Math.max(w, 20); h = Math.max(h, 30);
  ctx.moveTo(x + w, y); ctx.bezierCurveTo(x + w * 0.4, y, x + w * 0.4, y + h * 0.3, x, y + h * 0.38);
  ctx.bezierCurveTo(x + w * 0.4, y + h * 0.42, x + w * 0.4, y + h * 0.58, x, y + h * 0.62);
  ctx.bezierCurveTo(x + w * 0.4, y + h * 0.7, x + w * 0.4, y + h, x + w, y + h);
}
function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxW: number, font: string): string[] {
  ctx.save(); ctx.font = font;
  const words = String(text).split(/\s+/), lines: string[] = []; let cur = "";
  words.forEach((w) => {
    const t = cur ? cur + " " + w : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
  });
  if (cur) lines.push(cur);
  ctx.restore();
  return lines.length ? lines : [""];
}
function drawSticky(ctx: CanvasRenderingContext2D, o: BoardObject) {
  const W = o.w || 230;
  const lines = wrapLines(ctx, String(o.text || ""), W - 24, "14px ui-sans-serif,system-ui,Arial");
  const H = Math.max(70, lines.length * 20 + 34);
  o._w = W; o._h = H;
  ctx.save();
  ctx.globalAlpha = 1; ctx.setLineDash([]);
  ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
  ctx.fillStyle = o.bg || "#fef08a";
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(o.x || 0, o.y || 0, W, H, 6); ctx.fill(); }
  else ctx.fillRect(o.x || 0, o.y || 0, W, H);
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "#713f12"; ctx.font = "800 11px ui-sans-serif,system-ui,Arial";
  ctx.fillText("NOTE", (o.x || 0) + 10, (o.y || 0) + 18);
  ctx.fillStyle = "#422006"; ctx.font = "600 14px ui-sans-serif,system-ui,Arial";
  lines.forEach((ln, i) => ctx.fillText(ln, (o.x || 0) + 12, (o.y || 0) + 40 + i * 20));
  ctx.restore();
}
function drawShape(ctx: CanvasRenderingContext2D, o: BoardObject) {
  const x = Math.min(o.x1 || 0, o.x2 || 0), y = Math.min(o.y1 || 0, o.y2 || 0);
  const w = Math.abs((o.x2 || 0) - (o.x1 || 0)), h = Math.abs((o.y2 || 0) - (o.y1 || 0));
  const s = o.shape || "rect";
  ctx.beginPath();
  const fillIt = o.fill && !["line", "arrow", "tick", "cross", "bracket"].includes(s);
  const finish = () => { if (fillIt) { ctx.globalAlpha = ((o.opacity ?? 100) / 100) * 0.25; ctx.fill(); ctx.globalAlpha = (o.opacity ?? 100) / 100; } ctx.stroke(); };
  if (s === "line") { ctx.moveTo(o.x1 || 0, o.y1 || 0); ctx.lineTo(o.x2 || 0, o.y2 || 0); ctx.stroke(); }
  else if (s === "arrow") { drawArrow(ctx, o.x1 || 0, o.y1 || 0, o.x2 || 0, o.y2 || 0, o.size || 3); }
  else if (s === "rect") { ctx.rect(x, y, Math.max(w, 2), Math.max(h, 2)); finish(); }
  else if (s === "roundRect") {
    if (ctx.roundRect) ctx.roundRect(x, y, Math.max(w, 2), Math.max(h, 2), Math.min(18, Math.min(w, h) / 3));
    else ctx.rect(x, y, Math.max(w, 2), Math.max(h, 2)); finish();
  }
  else if (s === "circle") { const r = Math.max(Math.min(w, h) / 2, 2); ctx.arc(x + w / 2, y + h / 2, r, 0, 7); finish(); }
  else if (s === "ellipse") { ctx.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, 2), Math.max(h / 2, 2), 0, 0, 7); finish(); }
  else if (s === "triangle") { ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); finish(); }
  else if (s === "diamond") { ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h / 2); ctx.lineTo(x + w / 2, y + h); ctx.lineTo(x, y + h / 2); ctx.closePath(); finish(); }
  else if (s === "star") { starPath(ctx, x + w / 2, y + h / 2, 5, Math.max(Math.min(w, h) / 2, 4), Math.max(Math.min(w, h) / 4.5, 2)); finish(); }
  else if (s === "tick") { ctx.lineWidth = Math.max(o.size || 4, 5); ctx.moveTo(x + w * 0.1, y + h * 0.55); ctx.lineTo(x + w * 0.42, y + h * 0.85); ctx.lineTo(x + w * 0.95, y + h * 0.08); ctx.stroke(); }
  else if (s === "cross") { ctx.moveTo(x, y); ctx.lineTo(x + w, y + h); ctx.moveTo(x + w, y); ctx.lineTo(x, y + h); ctx.stroke(); }
  else if (s === "bracket") { bracketPath(ctx, x, y, w, h); ctx.stroke(); }
  else if (s === "pentagon" || s === "hexagon") {
    const n = s === "pentagon" ? 5 : 6, cx = x + w / 2, cy = y + h / 2, r = Math.max(Math.min(w, h) / 2, 3);
    for (let k = 0; k <= n; k++) { const a = -Math.PI / 2 + (k * 2 * Math.PI) / n; const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a) * (h / w || 1); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.closePath(); finish();
  }
  else if (s === "semicircle") { ctx.arc(x + w / 2, y + h, Math.max(w / 2, 2), Math.PI, 0); ctx.closePath(); finish(); }
  else if (s === "cube") {
    const d = Math.min(w, h) * 0.32;
    ctx.rect(x, y + d, w - d, h - d); ctx.moveTo(x + d, y + d); ctx.lineTo(x + d, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h - d); ctx.lineTo(x + w - d, y + h - d);
    ctx.moveTo(x + w - d, y + d); ctx.lineTo(x + w, y);
    ctx.stroke();
  }
  else if (s === "cylinder") {
    const ry = Math.max(h * 0.14, 4);
    ctx.ellipse(x + w / 2, y + ry, w / 2, ry, 0, 0, 7);
    ctx.moveTo(x, y + ry); ctx.lineTo(x, y + h - ry);
    ctx.moveTo(x + w, y + ry); ctx.lineTo(x + w, y + h - ry);
    ctx.ellipse(x + w / 2, y + h - ry, w / 2, ry, 0, 0, Math.PI);
    ctx.stroke();
  }
  else if (s === "cone") {
    const ry = Math.max(h * 0.14, 4);
    ctx.moveTo(x + w / 2, y); ctx.lineTo(x, y + h - ry); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h - ry);
    ctx.ellipse(x + w / 2, y + h - ry, w / 2, ry, 0, 0, Math.PI);
    ctx.stroke();
  }
  else if (s === "sphere") { const r = Math.max(Math.min(w, h) / 2, 2); ctx.arc(x + w / 2, y + h / 2, r, 0, 7); ctx.ellipse(x + w / 2, y + h / 2, r, r * 0.35, 0, 0, 7); ctx.stroke(); }
}
/* ink pen: velocity-shaped width — fast = thin, slow = thick (deterministic from points) */
function inkWidths(o: BoardObject): number[] {
  const p = o.points || [], base = Math.max(o.size || 4, 1.6);
  const ws = p.map((pt, i) => {
    if (pt.w != null) return base * (0.3 + 0.7 * Math.min(1, pt.w * 1.5)); /* stylus pressure */
    return i === 0 ? base : base * (1 - 0.62 * Math.min(Math.hypot(pt.x - p[i - 1].x, pt.y - p[i - 1].y) / 26, 1));
  });
  for (let k = 0; k < 2; k++) for (let i = 1; i < ws.length - 1; i++) ws[i] = (ws[i - 1] + ws[i] * 2 + ws[i + 1]) / 4;
  return ws;
}
function drawInkStroke(ctx: CanvasRenderingContext2D, o: BoardObject) {
  const p = o.points || [], ws = inkWidths(o);
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  for (let i = 0; i < p.length - 1; i++) {
    ctx.lineWidth = Math.max((ws[i] + ws[i + 1]) / 2, 0.7);
    ctx.beginPath();
    ctx.moveTo(i === 0 ? p[0].x : (p[i - 1].x + p[i].x) / 2, i === 0 ? p[0].y : (p[i - 1].y + p[i].y) / 2);
    ctx.quadraticCurveTo(p[i].x, p[i].y, (p[i].x + p[i + 1].x) / 2, (p[i].y + p[i + 1].y) / 2);
    ctx.stroke();
  }
}
function pathSmooth(ctx: CanvasRenderingContext2D, p: { x: number; y: number }[]) {
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i].x + p[i + 1].x) / 2, my = (p[i].y + p[i + 1].y) / 2;
    ctx.quadraticCurveTo(p[i].x, p[i].y, mx, my);
  }
  ctx.lineTo(p[p.length - 1].x, p[p.length - 1].y);
}
/* size multiplier per pen kind */
function penSizeFor(kind: string, size: number): number {
  const m: Record<string, number> = { ball: 1, marker: 2.2, ink: 1, text: 1, shape: 1 };
  const k = m[kind] || 1;
  return k > 1.3 ? Math.max(Math.round(size * k), 6) : Math.round(size * k);
}
/* current board surface color — pixel-eraser "auto" fills resolve to this at
   draw time, so erased areas always match the background, even after a change */
let ERASE_SURFACE = "#ffffff";
export function setEraseSurface(c: string) { ERASE_SURFACE = c; }
function drawObject(ctx: CanvasRenderingContext2D, o: BoardObject) {
  ctx.save();
  if (o.rot) {
    const b = rawBbox(o), cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    ctx.translate(cx, cy); ctx.rotate((o.rot * Math.PI) / 180); ctx.translate(-cx, -cy);
  }
  applyStyle(ctx, o);
  if (o.type === "erase") {
    /* pixel eraser v2: paints the surface color (fill) like a real eraser;
       legacy objects without fill punch transparent holes */
    const p = o.points || [], sz = o.size || 28;
    if (o.efill) {
      ctx.globalCompositeOperation = "source-over";
      const c = o.efill === "auto" ? ERASE_SURFACE : o.efill;
      ctx.strokeStyle = c; ctx.fillStyle = c;
    } else {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000"; ctx.fillStyle = "#000";
    }
    ctx.lineWidth = sz; ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0].x, p[0].y, sz / 2, 0, 7); ctx.fill(); }
    else if (p.length > 1) {
      ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }
  else if (o.type === "stroke") {
    const kind = o.tool === "highlighter" ? "highlighter" : (o.kind || "ball");
    if (kind === "highlighter") ctx.globalAlpha = Math.min(ctx.globalAlpha, 0.45);
    else if (kind === "marker") ctx.globalAlpha = Math.min(ctx.globalAlpha, 0.55);
    const p = o.points || [];
    if (kind === "ink" && p.length > 2) drawInkStroke(ctx, o);
    else if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0].x, p[0].y, (o.size || 3) / 2, 0, 7); ctx.fill(); }
    else if (p.length === 2) { ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y); ctx.lineTo(p[1].x, p[1].y); ctx.stroke(); }
    else if (p.length > 1) { pathSmooth(ctx, p); ctx.stroke(); } /* silky quadratic smoothing */
  }
  else if (o.type === "shape") drawShape(ctx, o);
  else if (o.type === "text") {
    ctx.font = `${o.weight || 700} ${o.fontSize || 32}px ui-sans-serif,system-ui,"Noto Sans",Arial`;
    String(o.text || "").split("\n").forEach((ln, i) => ctx.fillText(ln, o.x || 0, (o.y || 0) + i * (o.fontSize || 32) * 1.25));
  }
  else if (o.type === "sticky") drawSticky(ctx, o);
  else if (o.type === "image") {
    if (o.img && o.img.complete && o.img.naturalWidth) {
      ctx.globalAlpha = (o.opacity ?? 100) / 100; ctx.setLineDash([]);
      ctx.drawImage(o.img, o.x || 0, o.y || 0, o.w || 100, o.h || 100);
    }
  }
  ctx.restore();
}
interface BBox { x: number; y: number; w: number; h: number }
function rawBbox(o: BoardObject): BBox {
  if (o.type === "stroke") {
    const xs = (o.points || [{ x: 0, y: 0 }]).map((p) => p.x), ys = (o.points || [{ x: 0, y: 0 }]).map((p) => p.y);
    return { x: Math.min(...xs) - 8, y: Math.min(...ys) - 8, w: Math.max(...xs) - Math.min(...xs) + 16, h: Math.max(...ys) - Math.min(...ys) + 16 };
  }
  if (o.type === "shape") return { x: Math.min(o.x1 || 0, o.x2 || 0) - 8, y: Math.min(o.y1 || 0, o.y2 || 0) - 8, w: Math.abs((o.x2 || 0) - (o.x1 || 0)) + 16, h: Math.abs((o.y2 || 0) - (o.y1 || 0)) + 16 };
  if (o.type === "text") {
    const fs = o.fontSize || 32, lines = String(o.text || "").split("\n");
    const longest = Math.max(...lines.map((l) => l.length), 1);
    return { x: (o.x || 0) - 6, y: (o.y || 0) - fs - 6, w: longest * fs * 0.62 + 12, h: lines.length * fs * 1.25 + 12 };
  }
  if (o.type === "sticky") return { x: o.x || 0, y: o.y || 0, w: o._w || 230, h: o._h || 90 };
  if (o.type === "image") return { x: o.x || 0, y: o.y || 0, w: o.w || 0, h: o.h || 0 };
  return { x: 0, y: 0, w: 0, h: 0 };
}
function bbox(o: BoardObject): BBox {
  const b = rawBbox(o);
  if (!o.rot) return b;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2, r = (o.rot * Math.PI) / 180;
  const cs = Math.cos(r), sn = Math.sin(r);
  const pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x, b.y + b.h], [b.x + b.w, b.y + b.h]].map(([px, py]) => {
    const dx = px - cx, dy = py - cy;
    return [cx + dx * cs - dy * sn, cy + dx * sn + dy * cs];
  });
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}
function hitTest(objects: BoardObject[], x: number, y: number): { obj: BoardObject; idx: number } | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    const b = bbox(objects[i]);
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return { obj: objects[i], idx: i };
  }
  return null;
}
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
/* precise eraser hit-testing: distance to the actual stroke line, not its bounding box */
function hitErase(objects: BoardObject[], x: number, y: number, r: number): { obj: BoardObject; idx: number } | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    const o = objects[i];
    if (o.type === "erase") continue;
    if (o.type === "stroke") {
      const p = o.points || [], tol = r + (o.size || 4) / 2;
      let hit = p.length === 1 ? Math.hypot(x - p[0].x, y - p[0].y) <= tol : false;
      if (!hit) for (let j = 0; j < p.length - 1; j++) if (segDist(x, y, p[j].x, p[j].y, p[j + 1].x, p[j + 1].y) <= tol) { hit = true; break; }
      if (hit) return { obj: o, idx: i };
    } else {
      const b = bbox(o);
      if (x >= b.x - r && x <= b.x + b.w + r && y >= b.y - r && y <= b.y + b.h + r) return { obj: o, idx: i };
    }
  }
  return null;
}
/* point-in-polygon (ray casting) */
function pip(poly: { x: number; y: number }[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
/* forgiving lasso: a stroke is "inside" when MOST of it (>=60% of points) is inside;
   one word of a sentence can be erased without trapping every last pixel of the loop */
function objectInsidePoly(o: BoardObject, poly: { x: number; y: number }[]): boolean {
  if (o.type === "stroke") {
    const pts = o.points || [];
    if (!pts.length) return false;
    let inside = 0;
    for (const q of pts) if (pip(poly, q.x, q.y)) inside++;
    return inside / pts.length >= 0.6;
  }
  const b = bbox(o);
  return pip(poly, b.x + b.w / 2, b.y + b.h / 2); /* center inside = inside */
}
function moveObject(o: BoardObject, dx: number, dy: number) {
  if (o.type === "stroke") (o.points || []).forEach((p) => { p.x += dx; p.y += dy; });
  else if (o.type === "shape") { o.x1 = (o.x1 || 0) + dx; o.y1 = (o.y1 || 0) + dy; o.x2 = (o.x2 || 0) + dx; o.y2 = (o.y2 || 0) + dy; }
  else { o.x = (o.x || 0) + dx; o.y = (o.y || 0) + dy; }
}
function scaleObject(o: BoardObject, k: number, ax: number, ay: number) {
  const fx = (v: number) => ax + (v - ax) * k, fy = (v: number) => ay + (v - ay) * k;
  if (o.type === "stroke" || o.type === "erase") { (o.points || []).forEach((pt) => { pt.x = fx(pt.x); pt.y = fy(pt.y); }); o.size = Math.max(1, (o.size || 4) * k); }
  else if (o.type === "shape") { o.x1 = fx(o.x1 || 0); o.y1 = fy(o.y1 || 0); o.x2 = fx(o.x2 || 0); o.y2 = fy(o.y2 || 0); o.size = Math.max(1, (o.size || 3) * k); }
  else if (o.type === "text") { o.x = fx(o.x || 0); o.y = fy(o.y || 0); o.fontSize = Math.max(8, (o.fontSize || 32) * k); }
  else if (o.type === "sticky") { o.x = fx(o.x || 0); o.y = fy(o.y || 0); o._w = Math.max(60, (o._w || 230) * k); o._h = Math.max(40, (o._h || 90) * k); }
  else if (o.type === "image") { o.x = fx(o.x || 0); o.y = fy(o.y || 0); o.w = Math.max(20, (o.w || 100) * k); o.h = Math.max(20, (o.h || 100) * k); }
}
function cloneObj(o: BoardObject): BoardObject {
  const c: BoardObject = { ...o, id: uid() };
  if (o.points) c.points = o.points.map((pt) => ({ ...pt }));
  return c;
}
function rectsIntersect(a: BBox, r: BBox): boolean { return a.x < r.x + r.w && a.x + a.w > r.x && a.y < r.y + r.h && a.y + a.h > r.y; }
function safeFn(expr: string): (x: number, m: typeof Math) => number {
  let e = " " + expr + " ";
  const map: Record<string, string> = { sin: "Math.sin", cos: "Math.cos", tan: "Math.tan", sqrt: "Math.sqrt", abs: "Math.abs", pow: "Math.pow", log: "Math.log", exp: "Math.exp", PI: "Math.PI", E: "Math.E", floor: "Math.floor", ceil: "Math.ceil" };
  Object.keys(map).forEach((k) => { e = e.replace(new RegExp("([^A-Za-z0-9_\\.])" + k + "(?![A-Za-z0-9_])", "g"), "$1" + map[k]); });
  return new Function("x", "Math", `return (${e})`) as (x: number, m: typeof Math) => number;
}

/* ==========================================================================
   ENGINE CLASS
   ========================================================================== */
interface PdfPage { num: number; wrap: HTMLElement; base: HTMLCanvasElement; annot: HTMLCanvasElement; actx: CanvasRenderingContext2D; rendered: boolean; dirty: boolean; rendering: boolean; scale: number; cssScale: number }

const LS_KEY = "sb-session-v2";
const COLORS = ["#111827", "#ffffff", "#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#ec4899", "#facc15", "#14b8a6", "#92400e", "#6b7280"];
const PEN_COLORS = ["#111827", "#ffffff", "#dc2626", "#ea580c", "#f59e0b", "#facc15", "#16a34a", "#10b981", "#14b8a6", "#0ea5e9", "#2563eb", "#4f46e5", "#7c3aed", "#ec4899", "#92400e", "#6b7280"];
const HL_COLORS = ["#fde047", "#86efac", "#5eead4", "#93c5fd", "#c4b5fd", "#f9a8d4", "#fdba74", "#fca5a5"];
const TOOLS_KEY = "sb-tools-v1";
const MATHS = ["√", "π", "θ", "α", "β", "γ", "Δ", "∑", "∫", "∞", "±", "×", "÷", "≠", "≤", "≥", "°", "²", "³", "½", "∠", "⊥", "∥", "∴", "∵", "∈", "∪", "∩", "φ", "λ"];
const STICKY_COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#e9d5ff", "#fed7aa"];

export class BoardEngine {
  private root: HTMLElement;
  private cleanups: (() => void)[] = [];
  private destroyed = false;

  /* tool state */
  private tool = "pen"; private shape = "rect";
  private color = "#dc2626"; private size = 4; private opacity = 100;
  private fill = false; private dashed = false; private hlColor = "#facc15";
  private penKind: "ball" | "marker" | "ink" | "text" | "shape" = "ball";
  private hlSize = 24;
  private eraserMode: "stroke" | "pixel" | "area" = "stroke";
  private eraserSize = 28;
  private customColors: string[] = [];
  private erasedThisDrag = false;
  private layout: "doc" | "split" | "board" = "split";
  private docReadOnly = true; /* left pane is view-only; annotation lives on the whiteboard */
  private docZoom = 1; private boardZoom = 1; private boardPan = { x: 40, y: 40 };
  private bg: BgKind = "graph"; private bgColor = ""; private gridScale = 1; private textSize = 34; private stickyColor = "#fef08a";
  private active: { kind: "board" | "doc"; page: number | null } = { kind: "board", page: null };

  /* stores */
  private boardPages: Store[] = [new Store()];
  private boardPage = 0;
  private get boardStore(): Store { return this.boardPages[this.boardPage] || this.boardPages[0]; }
  private docStores: Record<string, Record<number, Store>> = {};
  private doc: { kind: "pdf" | "html" | "image" | "video" | "audio" | "file" | "web"; key: string; name: string } | null = null;

  /* pdf */
  private pdfDoc: any = null; private pages: PdfPage[] = [];
  private fitScale = 1.2; private currentPage = 1; private totalPages = 0;
  private pageObserver: IntersectionObserver | null = null;

  /* board canvas */
  private boardScroll!: HTMLElement; private boardCanvas!: HTMLCanvasElement; private bctx!: CanvasRenderingContext2D;
  private boardLive!: HTMLCanvasElement; private lctx!: CanvasRenderingContext2D; private liveRaf = 0;
  private boardRectC: DOMRect | null = null; private dirtySave = false;
  private boardFx!: HTMLCanvasElement; private fctx!: CanvasRenderingContext2D;
  private inkWorker: Worker | null = null;
  /* zero-allocation hot path: pooled stroke vectors (x, y, pressure triples) */
  private strokePool = new Float32Array(16384); private workerBuf = new Float32Array(16384);
  private liveIdx = 1; private liveHas = false; private lp0x = 0; private lp0y = 0; private lp1x = 0; private lp1y = 0;
  private touchPending: { x: number; y: number; pr: number } | null = null; private palmPointer = -1; private palmErased = false;
  /* pen latency diagnostic (MENU > Pen latency test) */
  private latencyOn = false; private latencyEl: HTMLElement | null = null;
  private latIn: number[] = []; private latDraw: number[] = [];
  private latPendingT0 = 0; private latLastHud = 0;
  /* admin device features: latency tool + screen recording */
  private adminOn = false; private recTimer = 0; private recStartTs = 0;
  private adminUnsub: (() => void) | null = null; private boardRecRaf = 0;
  private lastShareUrl = "";
  private boardW = 800; private boardH = 600; private DPR = 1;
  /* board = 3 layers: bgC (background+pattern) + inkC (all ink; erases punch holes) -> visible canvas */
  private inkC: HTMLCanvasElement | null = null; private inkX: CanvasRenderingContext2D | null = null;
  private bgC: HTMLCanvasElement | null = null; private bgX: CanvasRenderingContext2D | null = null;
  private compRaf = 0;
  private lasso: { x: number; y: number }[] | null = null;
  private docErasePreview: { page: number; pts: { x: number; y: number }[] } | null = null;
  private brushRing: HTMLElement | null = null;
  private textPenPending: { surface: "board" | "doc"; page: number | null; strokes: BoardObject[] } | null = null;
  private textPenT: ReturnType<typeof setTimeout> | null = null;
  private ocrBusy = false;
  private replayN: number | null = null; private replayTimer: ReturnType<typeof setInterval> | null = null;
  private shapeAI = true; private funWired = false;
  private pad: RemotePad | null = null;
  private padCursorEl: HTMLElement | null = null;
  private boardDraft: BoardObject | null = null;
  private selected: { surface: "board" | "doc"; page?: number; obj: BoardObject } | null = null;
  private selMulti: BoardObject[] | null = null;
  private marquee: { x: number; y: number }[] | null = null; /* lasso select loop */
  private rotateSel: { c: { x: number; y: number }; a0: number; r0: number } | null = null;
  private resizeSel: { ax: number; ay: number; d0: number } | null = null;
  private dragSel: any = null; private pinch: { d: number; z: number } | null = null;
  private pointers = new Map<number, { x: number; y: number }>();

  /* annot */
  private annotDraft: { page: number; obj: BoardObject } | null = null;
  private htmlAnnot: { box: HTMLElement; cv: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null = null;
  private pendingAnchor: { surface: "board" | "doc"; page?: number; x: number; y: number } | null = null;
  private editingObj: { store: Store; obj: BoardObject; surface: "board" | "doc"; page?: number } | null = null;

  private textColor = "#141414";

  /* widgets */
  private timerInt: ReturnType<typeof setInterval> | null = null;
  private timerLeft = 300; private attendance: Record<string, boolean> = {};
  private saveT: ReturnType<typeof setTimeout> | null = null;
  private toastH: ReturnType<typeof setTimeout> | null = null;

  constructor(root: HTMLElement, opts: EngineOpts = {}) {
    this.root = root;
    if (opts.layout === "doc" || opts.layout === "split" || opts.layout === "board") this.layout = opts.layout;
    if (opts.bg && ["white", "black", "grid", "graph", "ruled", "dotted"].includes(opts.bg)) this.bg = opts.bg as BgKind;
    try {
      const saved = JSON.parse(localStorage.getItem("sb-bg-prefs") || "{}") as { bg?: BgKind; color?: string; grid?: number };
      if (saved.bg && !opts.bg) this.bg = saved.bg;
      if (saved.color) this.bgColor = saved.color;
      if (typeof saved.grid === "number" && saved.grid >= 50 && saved.grid <= 200) this.gridScale = saved.grid / 100;
    } catch { /* first run */ }

    (pdfjsLib as any).GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    this.boardScroll = this.$("#boardScroll");
    this.boardCanvas = this.$("#boardCanvas");
    /* desynchronized + opaque static layer: ink blits straight toward the
       hardware frame buffer, skipping the compositor timeline and alpha-blend */
    this.bctx = this.boardCanvas.getContext("2d")!;
    this.boardLive = this.$("#boardLive");
    this.boardFx = this.$("#boardFx");
    this.fctx = this.boardFx.getContext("2d")!;
    /* Dual-threaded pipeline is implemented but DISABLED by default: on
       low-end classroom SoCs the cross-thread messaging + extra compositor
       layer cost more than they save, and it caused live-ink mapping bugs.
       The tuned steady state is main-thread incremental pooled rendering.
       Flip INK_WORKER_ENABLED on known fast boards to re-evaluate. */
    if (INK_WORKER_ENABLED) {
      try {
        if (typeof Worker !== "undefined" && "transferControlToOffscreen" in HTMLCanvasElement.prototype) {
          const off = this.boardLive.transferControlToOffscreen();
          this.inkWorker = new Worker(URL.createObjectURL(new Blob([INK_WORKER_SOURCE], { type: "text/javascript" })));
          this.inkWorker.postMessage({ t: "init", canvas: off }, [off]);
        }
      } catch { this.inkWorker = null; }
    }
    if (!this.inkWorker) this.lctx = this.boardLive.getContext("2d")!;
    /* Chrome can drop canvas GPU contexts during aggressive flex re-sizes.
       The vector store (boardStore.objects) is the source of truth, so a
       restore is just: preventDefault + full history repaint. */
    for (const cv of [this.boardCanvas, this.boardLive]) {
      cv.addEventListener("contextlost", (e) => { e.preventDefault(); }, false);
      cv.addEventListener("contextrestored", () => { if (!this.destroyed) this.renderBoard(); }, false);
    }
    this.cleanups.push(() => this.stopUpPoll());
    this.cleanups.push(() => { if (this.textPenT) clearTimeout(this.textPenT); });

    this.loadTools();
    this.buildToolPops();
    this.buildMathSyms();
    this.buildStickyColors();
    this.wireToolbar();
    this.wireBoard();
    this.wireDoc();
    this.wireModals();
    this.wireWidgets();
    this.wireExport();
    this.wirePages();
    this.wireDocPinch();
    this.wireLiveSync();
    this.wireUpload();
    this.wirePad();
    this.wireFiles();
    this.wireShade();
    this.wireMeasure();
    this.wireKeys();
    this.setLayout(this.layout);
    (this.$("#bgSelect") as HTMLSelectElement).value = this.bg;
    this.setTool("pen");
    this.sizeBoard();
    this.setActive("board", null);
    this.renderBoard();
    /* boot sequence: the "Preparing your board" screen stays as the ONLY screen
       until the whiteboard is fully painted; only then the session restores and
       heavy docs (PDF / EduRev iframes) load — no more laggy first seconds */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (this.destroyed) return;
      const ov = this.$("#bootOverlay"); if (ov) ov.remove();
      setTimeout(() => {
        if (this.destroyed) return;
        this.restore();
        this.setLayout(this.layout);
        if (opts.pdfUrl) this.openPdfFromUrl(opts.pdfUrl, opts.pdfName || "NCERT chapter.pdf");
        if (opts.webUrl) this.openWeb(opts.webUrl, opts.webName || "Reference page");
        else this.refreshEmpty();
      }, 250);
    }));
    let roRaf = 0;
    const ro = new ResizeObserver(() => {
      if (roRaf) return;
      roRaf = requestAnimationFrame(() => { roRaf = 0; if (!this.destroyed) this.sizeBoard(); });
    });
    ro.observe(this.boardScroll);
    this.cleanups.push(() => { cancelAnimationFrame(roRaf); ro.disconnect(); });

    let rzT: ReturnType<typeof setTimeout>;
    this.on(window, "resize", () => { clearTimeout(rzT); rzT = setTimeout(() => { if (this.doc?.kind === "pdf") this.computeFit(); }, 300); });
    this.on(window, "sb-board-dirty", () => this.renderBoard());
    this.on(window, "pagehide", () => this.flushSave());
    this.on(document, "visibilitychange", () => { if (document.visibilityState === "hidden") this.flushSave(); });
    if (!localStorage.getItem("sb-help-seen")) {
      setTimeout(() => { if (!this.destroyed) { this.openModal("mHelp"); localStorage.setItem("sb-help-seen", "1"); } }, 500);
    }
  }

  /* ==========================================================================
     REMOTE PHONE PAD — phone as a writing tablet + touchpad (WebRTC DataChannel)
     ========================================================================== */
  private wirePad() {
    const btn = this.$("#btnPad") as HTMLElement | null;
    if (!btn) return;
    btn.onclick = () => { this.openModal("mPad"); this.padStart(); };
    const stop = this.$("#padStop") as HTMLElement | null;
    if (stop) stop.onclick = () => { this.padStop(); this.toast("Phone pad disconnected"); };
    this.cleanups.push(() => this.padStop());
  }
  private padStart() {
    if (this.pad) return;
    const qr = this.$("#padQr") as HTMLCanvasElement | null;
    if (!qr) return;
    this.pad = new RemotePad({
      pointer: (ph, x, y) => this.padPointer(ph, x, y),
      command: (c, v) => this.padCommand(c, v),
      cursorMove: (dx, dy) => this.padCursorMove(dx, dy),
      cursorClick: (b, ph) => this.padCursorClick(b, ph),
      cursorScroll: (dx, dy) => this.padCursorScroll(dx, dy),
      status: (st) => {
        const el = this.$("#padStatus") as HTMLElement | null;
        if (!el) return;
        el.textContent = st === "live" ? "● Connected — the phone is your pad now" : st === "waiting" ? "Waiting for phone — scan the QR…" : st === "lost" ? "Phone disconnected" : "Off";
        el.style.color = st === "live" ? "#188038" : st === "lost" ? "#b3261e" : "";
      },
    }, qr, (code) => { const el = this.$("#padCode"); if (el) el.textContent = code; });
    this.pad.open();
  }
  private padStop() {
    if (this.pad) { this.pad.close(); this.pad = null; }
    if (this.padCursorRaf) { cancelAnimationFrame(this.padCursorRaf); this.padCursorRaf = 0; }
    this.padHeldBtns = []; this.padCursorPend = { dx: 0, dy: 0 }; this.padCursorPos = { x: -1, y: -1 };
    if (this.padCursorEl) { this.padCursorEl.remove(); this.padCursorEl = null; }
  }
  /* phone draw-tablet events -> synthetic pointer events straight into the board engine */
  private padPointer(ph: "down" | "move" | "up", nx: number, ny: number) {
    if (ph === "down" && this.layout === "doc") this.setLayout("split"); /* board must be visible */
    const cv = this.boardCanvas;
    const r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = r.left + Math.min(1, Math.max(0, nx)) * r.width;
    const y = r.top + Math.min(1, Math.max(0, ny)) * r.height;
    const t = ph === "down" ? "pointerdown" : ph === "move" ? "pointermove" : "pointerup";
    cv.dispatchEvent(new PointerEvent(t, {
      pointerId: 990099, pointerType: "touch", isPrimary: true,
      buttons: ph === "up" ? 0 : 1, clientX: x, clientY: y, bubbles: true, cancelable: true,
    }));
  }
  private padCommand(c: string, v?: any) {
    if (["pen", "highlighter", "eraser", "select", "pan"].includes(c)) { this.setTool(c); this.toast("Phone pad: " + c); }
    else if (c === "color") { this.color = String(v); this.syncPenPop(); this.saveTools(); }
    else if (c === "size") { this.size = Math.min(40, Math.max(1, +v || 4)); this.syncPenPop(); this.saveTools(); }
    else if (c === "key") {
      const kk = String(v?.key || "");
      const init: any = { key: kk, ctrlKey: !!v?.ctrl, shiftKey: !!v?.shift, altKey: !!v?.alt, metaKey: false, bubbles: true, cancelable: true };
      window.dispatchEvent(new KeyboardEvent("keydown", init));
      window.dispatchEvent(new KeyboardEvent("keyup", init));
    }
    else if (c === "undo") this.doUndo();
    else if (c === "redo") this.doRedo();
    else if (c === "page") {
      const target = this.boardPage + (+v || 0);
      if (target >= this.boardPages.length) this.addBoardPage(); /* forward past the end = new page, like the + button */
      else this.gotoBoardPage(target);
    }
  }
  private padCursorPos = { x: -1, y: -1 };
  private padCursorRaf = 0;
  private padCursorPend = { dx: 0, dy: 0 };
  private padHeldBtns: number[] = [];
  private padDownAt = { x: 0, y: 0 };
  /* moves are folded into ONE animation frame and painted with a GPU
     transform (no left/top layout writes) — buttery smooth even at 120 Hz input */
  private padCursorMove(dx: number, dy: number) {
    this.padCursorPend.dx += dx; this.padCursorPend.dy += dy;
    if (this.padCursorPos.x < 0) this.padCursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if (!this.padCursorEl) {
      this.padCursorEl = document.createElement("div");
      this.padCursorEl.id = "padCursor";
      this.padCursorEl.style.cssText = "position:fixed;left:0;top:0;z-index:9999;pointer-events:none;width:22px;height:22px;will-change:transform;display:none";
      this.padCursorEl.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 2l16 8.5-7 1.5L9.5 20z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
      this.root.appendChild(this.padCursorEl);
      this.cleanups.push(() => this.padCursorEl?.remove());
    }
    if (!this.padCursorRaf) this.padCursorRaf = requestAnimationFrame(this.padCursorFrame);
  }
  private padCursorFrame = () => {
    this.padCursorRaf = 0;
    const { dx, dy } = this.padCursorPend; this.padCursorPend.dx = 0; this.padCursorPend.dy = 0;
    const el = this.padCursorEl;
    if (!el) return;
    this.padCursorPos.x = Math.min(window.innerWidth - 2, Math.max(2, this.padCursorPos.x + dx));
    this.padCursorPos.y = Math.min(window.innerHeight - 2, Math.max(2, this.padCursorPos.y + dy));
    el.style.display = "block";
    el.style.transform = "translate3d(" + (this.padCursorPos.x - 2).toFixed(1) + "px," + (this.padCursorPos.y - 2).toFixed(1) + "px,0)";
    /* a phone mouse button is held -> the page sees real pointermove too:
       dragging, board-pen drawing, text selection — everything works */
    if (this.padHeldBtns.length) this.padCursorDispatch("move");
  };
  private padBtnMask() { return this.padHeldBtns.reduce((a, b) => a + (1 << b), 0); }
  private padCursorDispatch(kind: "move" | "down" | "up", btn = 0) {
    const { x, y } = this.padCursorPos;
    if (x < 0) return;
    const target = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!target) return;
    const base = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window };
    const mask = this.padBtnMask();
    if (kind === "move") {
      target.dispatchEvent(new PointerEvent("pointermove", { ...base, pointerId: 990100, pointerType: "mouse", isPrimary: true, buttons: mask }));
      target.dispatchEvent(new MouseEvent("mousemove", { ...base, buttons: mask }));
    } else if (kind === "down") {
      target.dispatchEvent(new PointerEvent("pointerdown", { ...base, pointerId: 990100, pointerType: "mouse", isPrimary: true, buttons: mask, button: btn }));
      target.dispatchEvent(new MouseEvent("mousedown", { ...base, buttons: mask, button: btn }));
    } else {
      target.dispatchEvent(new PointerEvent("pointerup", { ...base, pointerId: 990100, pointerType: "mouse", isPrimary: true, buttons: mask, button: btn }));
      target.dispatchEvent(new MouseEvent("mouseup", { ...base, buttons: mask, button: btn }));
    }
  }
  /* FULL MOUSE — btn 0=left 1=middle 2=right; phase 1=press 2=release 0=full click */
  private padCursorClick(btn: number, phase: number) {
    if (this.padCursorPos.x < 0) this.padCursorMove(0, 0);
    if (phase === 1) {
      if (!this.padHeldBtns.includes(btn)) this.padHeldBtns.push(btn);
      this.padDownAt = { ...this.padCursorPos };
      this.padCursorDispatch("down", btn);
    } else if (phase === 2) {
      this.padHeldBtns = this.padHeldBtns.filter((b) => b !== btn);
      const moved = Math.hypot(this.padCursorPos.x - this.padDownAt.x, this.padCursorPos.y - this.padDownAt.y);
      this.padCursorDispatch("up", btn);
      if (moved < 9) {
        const { x, y } = this.padCursorPos;
        const target = document.elementFromPoint(x, y) as HTMLElement | null;
        if (target) {
          const base = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window, button: btn };
          if (btn === 2) target.dispatchEvent(new MouseEvent("contextmenu", base));
          if (btn === 1) target.dispatchEvent(new MouseEvent("auxclick", base));
          target.dispatchEvent(new MouseEvent("click", base));
        }
      }
    } else { this.padCursorClick(btn, 1); this.padCursorClick(btn, 2); }
  }
  /* real wheel: the page gets a wheel event first (zoom/custom handlers),
     then the nearest scrollable thing under the cursor scrolls */
  private padCursorScroll(dx: number, dy: number) {
    if (!dx && !dy) return;
    const { x, y } = this.padCursorPos;
    let target: any = x >= 0 ? document.elementFromPoint(x, y) : document.body;
    if (target) {
      const wv = new WheelEvent("wheel", { deltaX: dx, deltaY: dy, clientX: x, clientY: y, bubbles: true, cancelable: true, view: window });
      target.dispatchEvent(wv);
      if (wv.defaultPrevented) return;
    }
    let node: any = target;
    while (node && node !== document.body && node !== document.documentElement) {
      const st = getComputedStyle(node);
      if ((dy && /(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight) ||
          (dx && /(auto|scroll|overlay)/.test(st.overflowX) && node.scrollWidth > node.clientWidth)) {
        if (dy) node.scrollTop += dy;
        if (dx) node.scrollLeft += dx;
        return;
      }
      node = node.parentElement;
    }
    window.scrollBy(dx, dy);
  }

  destroy() {
    if (this.adminUnsub) { this.adminUnsub(); this.adminUnsub = null; }
    if (this.boardRecRaf) { cancelAnimationFrame(this.boardRecRaf); this.boardRecRaf = 0; }
    this.destroyed = true;
    if (this.timerInt) clearInterval(this.timerInt);
    if (this.saveT) clearTimeout(this.saveT);
    if (this.toastH) clearTimeout(this.toastH);
    if (this.liveRaf) cancelAnimationFrame(this.liveRaf);
    this.pageObserver?.disconnect();
    this.cleanups.forEach((fn) => { try { fn(); } catch { /* noop */ } });
    this.cleanups = [];
  }

  /* ---------- dom helpers ---------- */
  private $(sel: string): any { return this.root.querySelector(sel); }
  private $all(sel: string): any[] { return Array.from(this.root.querySelectorAll(sel)); }
  private on(t: Window | Document | HTMLElement, ev: string, fn: (e: any) => void, opts?: any) {
    t.addEventListener(ev, fn as EventListener, opts);
    this.cleanups.push(() => t.removeEventListener(ev, fn as EventListener, opts));
  }
  private toast(msg: string) {
    const el = this.$("#sbToast");
    el.textContent = msg; el.classList.add("show");
    if (this.toastH) clearTimeout(this.toastH);
    if (this.liveRaf) cancelAnimationFrame(this.liveRaf);
    this.toastH = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------- stores ---------- */
  private docStore(page: number): Store {
    const k = this.doc ? this.doc.key : "__none__";
    this.docStores[k] = this.docStores[k] || {};
    if (!this.docStores[k][page]) this.docStores[k][page] = new Store();
    return this.docStores[k][page];
  }
  private activeStore(): Store {
    if (this.active.kind === "doc" && this.doc && this.active.page) return this.docStore(this.active.page);
    return this.boardStore;
  }
  private setActive(kind: "board" | "doc", page: number | null) {
    if (this.docReadOnly) { kind = "board"; page = null; }
    this.active = { kind, page };
    (this.$("#targetLbl") as HTMLElement).innerHTML = kind === "doc" ? `<span style="display:inline-block;width:8px;height:8px;border-radius:99px;background:#22c55e;margin-right:6px"></span>Page ${page}` : `<span style="display:inline-block;width:8px;height:8px;border-radius:99px;background:#a855f7;margin-right:6px"></span>Board`;
    this.$all(".pane-head").forEach((h: HTMLElement) => (h.style.boxShadow = ""));
    const head = this.$(kind === "doc" ? "#paneDoc .pane-head" : "#paneBoard .pane-head");
    if (head) head.style.boxShadow = "inset 0 -3px 0 var(--sb-accent)";
  }

  /* ==========================================================================
     WHITEBOARD
     ========================================================================== */
  private worldPt = { x: 0, y: 0 }; /* pre-allocated — hot path never allocates */
  private lastPt: { x: number; y: number } | null = null; /* pointer position, drawn as a marker while recording */
  private inkPt: { x: number; y: number } | null = null; /* where ink actually lands */
  private toWorld(cx: number, cy: number) {
    return { x: (cx - this.boardPan.x) / this.boardZoom, y: (cy - this.boardPan.y) / this.boardZoom };
  }
  private toWorldInto(cx: number, cy: number) {
    this.worldPt.x = (cx - this.boardPan.x) / this.boardZoom;
    this.worldPt.y = (cy - this.boardPan.y) / this.boardZoom;
    return this.worldPt;
  }
  private sizeBoard() {
    const r = this.boardScroll.getBoundingClientRect();
    this.boardW = Math.max(300, r.width); this.boardH = Math.max(300, r.height);
    this.DPR = Math.min(2, window.devicePixelRatio || 1);
    this.boardRectC = null;
    this.clampView();
    this.boardCanvas.width = this.boardW * this.DPR;
    this.boardCanvas.height = this.boardH * this.DPR;
    this.boardCanvas.style.width = this.boardW + "px";
    this.boardCanvas.style.height = this.boardH + "px";
    if (!this.inkWorker) {
      this.boardLive.width = this.boardCanvas.width;
      this.boardLive.height = this.boardCanvas.height;
    }
    /* CSS size must ALWAYS track the container — in worker mode the element
       delegates its bitmap to the OffscreenCanvas, and without explicit CSS
       dimensions it renders at raw buffer-pixel size (DPR× too large), which
       shifted live ink to the right of the stylus until commit. */
    this.boardLive.style.width = this.boardW + "px";
    this.boardLive.style.height = this.boardH + "px";
    this.boardFx.width = this.boardCanvas.width;
    this.boardFx.height = this.boardCanvas.height;
    this.boardFx.style.width = this.boardW + "px";
    this.boardFx.style.height = this.boardH + "px";
    if (this.inkWorker) this.inkWorker.postMessage({ t: "size", w: this.boardCanvas.width, h: this.boardCanvas.height, dpr: this.DPR });
    if (!this.inkC || !this.bgC) {
      this.inkC = document.createElement("canvas"); this.inkX = this.inkC.getContext("2d")!;
      this.bgC = document.createElement("canvas"); this.bgX = this.bgC.getContext("2d")!;
    }
    this.inkC.width = this.bgC.width = this.boardCanvas.width;
    this.inkC.height = this.bgC.height = this.boardCanvas.height;
    /* width/height assignment resets context state — re-assert immediately */
    for (const c of [this.bctx, this.lctx, this.fctx, this.inkX, this.bgX]) {
      if (!c) continue;
      c.imageSmoothingEnabled = true;
      (c as any).imageSmoothingQuality = "high";
      c.lineCap = "round";
      c.lineJoin = "round";
    }
    this.renderBoard();
  }
  private renderBoard() {
    setEraseSurface(this.surfaceColor());
    if (this.destroyed) return;
    if (this.inkWorker) this.inkWorker.postMessage({ t: "view", px: this.boardPan.x, py: this.boardPan.y, z: this.boardZoom });
    const z = this.boardZoom, px = this.boardPan.x, py = this.boardPan.y;
    /* background layer */
    const bx = this.bgX;
    if (bx && this.bgC) {
      bx.setTransform(1, 0, 0, 1, 0, 0);
      bx.clearRect(0, 0, this.bgC.width, this.bgC.height);
      bx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
      const bgc: Record<string, string> = { white: "#ffffff", black: "#0d1526", grid: "#ffffff", graph: "#ffffff", ruled: "#fffef5", dotted: "#ffffff" };
      bx.fillStyle = this.bgColor || bgc[this.bg] || "#fff";
      bx.fillRect(0, 0, this.boardW, this.boardH);
      this.drawBoardPattern(bx, z, px, py);
    }
    /* ink layer — erase objects punch holes here, the background below stays intact */
    const ix = this.inkX;
    if (ix && this.inkC) {
      ix.setTransform(1, 0, 0, 1, 0, 0);
      ix.clearRect(0, 0, this.inkC.width, this.inkC.height);
      ix.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
      ix.save();
      ix.translate(px, py); ix.scale(z, z);
      (this.replayN === null ? this.boardStore.objects : this.boardStore.objects.slice(0, this.replayN)).forEach((o) => drawObject(ix, o));
      ix.restore();
    }
    this.compositeVisible();
  }
  /* visible board = background + ink, two fast GPU blits */
  private compositeVisible() {
    setEraseSurface(this.surfaceColor());
    if (this.destroyed) return;
    const ctx = this.bctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);
    if (this.bgC) ctx.drawImage(this.bgC, 0, 0);
    if (this.inkC) ctx.drawImage(this.inkC, 0, 0);
    {
      const z = this.boardZoom;
      ctx.save();
      ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
      ctx.translate(this.boardPan.x, this.boardPan.y); ctx.scale(z, z);
      if (this.marquee && this.marquee.length > 1) {
        ctx.globalAlpha = 1; ctx.setLineDash([6, 5]); ctx.strokeStyle = "#1a73e8"; ctx.lineWidth = 1.5 / z;
        ctx.fillStyle = "rgba(26,115,232,.08)";
        ctx.beginPath(); ctx.moveTo(this.marquee[0].x, this.marquee[0].y);
        for (let i = 1; i < this.marquee.length; i++) ctx.lineTo(this.marquee[i].x, this.marquee[i].y);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      } else if (this.selObjs().length) {
        const b = this.selBounds();
        ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#1a73e8"; ctx.lineWidth = 2 / z;
        ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
        ctx.setLineDash([]);
        const hs = 10 / z;
        for (const c of this.selCorners(b)) {
          ctx.fillStyle = "#fff"; ctx.strokeStyle = "#1a73e8"; ctx.lineWidth = 1.5 / z;
          ctx.fillRect(c.x - hs / 2, c.y - hs / 2, hs, hs); ctx.strokeRect(c.x - hs / 2, c.y - hs / 2, hs, hs);
        }
        if (this.selObjs().length === 1) {
          const rh2 = this.rotHandle(b, z);
          ctx.setLineDash([]); ctx.strokeStyle = "#1a73e8"; ctx.lineWidth = 1.5 / z;
          ctx.beginPath(); ctx.moveTo(b.x + b.w / 2, b.y - 6); ctx.lineTo(rh2.x, rh2.y); ctx.stroke();
          ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(rh2.x, rh2.y, 7 / z, 0, 7); ctx.fill(); ctx.stroke();
        }
      }
      ctx.restore();
    }
    this.syncSelBar();
    this.drawLive();
  }
  private scheduleComposite() {
    if (this.compRaf || this.destroyed) return;
    this.compRaf = requestAnimationFrame(() => { this.compRaf = 0; this.compositeVisible(); });
  }
  /* exact visible board surface color — the pixel eraser paints this */
  private surfaceColor(): string {
    const def: Record<string, string> = { white: "#ffffff", black: "#0d1526", grid: "#ffffff", graph: "#ffffff", ruled: "#fffef5", dotted: "#ffffff" };
    return this.bgColor || def[this.bg] || "#ffffff";
  }
  /* live pixel-erase: paint the segment straight into the ink layer */
  private eraseInkSegment(a: { x: number; y: number }, b: { x: number; y: number }) {
    const ctx = this.inkX;
    if (!ctx || !this.boardDraft) return;
    ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    ctx.save();
    ctx.translate(this.boardPan.x, this.boardPan.y);
    ctx.scale(this.boardZoom, this.boardZoom);
    const fill = this.boardDraft.efill ? this.surfaceColor() : undefined;
    ctx.globalCompositeOperation = fill ? "source-over" : "destination-out";
    ctx.strokeStyle = fill || "#000"; ctx.lineWidth = this.boardDraft.size || 28; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    ctx.restore();
  }

  /* ---------- LIVE STROKE LAYER — zero-lag drawing ----------
     Static canvas: committed objects, redrawn only on real changes.
     Live canvas: ONLY the stroke being drawn — cleared + 1 object per frame.
     Pen moves NEVER trigger a full-board redraw, so speed stays constant
     no matter how full the board is. */
  private startStroke(tool: string, w: { x: number; y: number }, pr: number) {
    this.boardStore.pushHistory();
    this.boardDraft = {
      id: uid(), type: "stroke", tool, kind: tool === "pen" ? this.penKind : undefined,
      points: [pr > 0 && pr !== 0.5 ? { x: w.x, y: w.y, w: pr } : { x: w.x, y: w.y }],
      color: tool === "highlighter" ? this.hlColor : this.color,
      size: tool === "highlighter" ? this.hlSize : penSizeFor(this.penKind, this.size), opacity: this.opacity,
    };
    this.inkPt = { x: w.x, y: w.y };
    this.latPendingT0 = performance.now();
    this.drawLive(); /* synchronous first paint — no one-frame rAF wait on contact */
  }
  private scheduleLive() {
    if (this.liveRaf || this.destroyed) return;
    this.liveRaf = requestAnimationFrame(() => { this.liveRaf = 0; this.drawLive(); });
  }
  /* ---------------- admin device features ---------------- */
  private startAdminWatch() {
    /* admin = signed in with the owner Google account (Firebase). Tools and
       recording controls exist only on that signed-in session. */
    const apply = (on: boolean, email: string | null) => {
      if (on === this.adminOn) return;
      this.adminOn = on;
      for (const id of ["#btnRec", "#btnRecordings", "#btnSignOut"]) {
        const b = this.$(id) as HTMLElement | null;
        if (b) b.style.display = on ? "" : "none";
      }
      const ah = this.$("#mpAdminSec") as HTMLElement | null;
      if (ah) ah.style.display = on ? "" : "none";
      const si = this.$("#btnSignIn") as HTMLElement | null;
      if (si) si.style.display = on ? "none" : "";
      const who = this.$("#adminWho") as HTMLElement | null;
      if (who) who.textContent = on ? `Signed in as ${email || ADMIN_EMAIL}` : `Sign in with Google to unlock admin tools (${ADMIN_EMAIL})`;
      if (!on) {
        if (isRecording()) stopRecording();
        const pill = this.$("#recPill") as HTMLElement | null; if (pill) pill.hidden = true;
      }
    };
    this.adminUnsub = watchAdmin(apply);
  }
  private async toggleRec() {
    if (!this.adminOn) return;
    if (isRecording()) { stopRecording(); this.toast("Saving recording…"); return; }
    let started = false;
    if (supportsScreenShare()) {
      try { await startRecording(); started = true; } catch { started = false; }
    }
    if (!started) {
      /* phones & unsupported browsers: record the board canvas itself */
      try { await this.startBoardCapture(); started = true; this.toast("Recording the board"); }
      catch { this.toast("Recording not supported on this browser"); return; }
    }
    this.recStartTs = Date.now();
    const pill = this.$("#recPill") as HTMLElement | null; if (pill) pill.hidden = false;
    const tick = () => {
      const sec = Math.floor((Date.now() - this.recStartTs) / 1000);
      const t = this.$("#recTime");
      if (t) t.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
    };
    tick();
    this.recTimer = window.setInterval(tick, 500);
  }
  private async startBoardCapture() {
    /* composite static + live layers onto an offscreen canvas and record it —
       works everywhere captureStream exists, incl. phones without getDisplayMedia */
    if (typeof HTMLCanvasElement === "undefined" || !("captureStream" in HTMLCanvasElement.prototype)) throw new Error("no captureStream");
    const src = this.boardLive;
    /* lightweight diagnostic capture: 0.75 scale + 30fps cap — the old
       full-res every-frame composite was itself causing the stalls the
       user felt while recording on phones */
    const rec = document.createElement("canvas");
    rec.width = Math.max(2, Math.round(src.width * 0.75));
    rec.height = Math.max(2, Math.round(src.height * 0.75));
    const rctx = rec.getContext("2d");
    if (!rctx) throw new Error("no ctx");
    let last = 0;
    const loop = (t: number) => {
      this.boardRecRaf = requestAnimationFrame(loop);
      if (t - last < 33) return; /* 30fps cap — halves the composite load */
      last = t;
      rctx.clearRect(0, 0, rec.width, rec.height);
      rctx.drawImage(this.boardCanvas, 0, 0, rec.width, rec.height);
      rctx.drawImage(this.boardLive, 0, 0, rec.width, rec.height);
    };
    loop(performance.now());
    const stream = rec.captureStream(30);
    const origStop = stopRecording;
    await startFromStream(stream);
    /* cancel the composite loop when the recorder stops */
    window.addEventListener("sb-rec-saved", () => { if (this.boardRecRaf) { cancelAnimationFrame(this.boardRecRaf); this.boardRecRaf = 0; } }, { once: true });
    void origStop;
  }
  private async openRecordings() {
    this.openModal("mRecordings");
    const list = this.$("#recList") as HTMLElement; if (!list) return;
    const player = this.$("#recPlayer") as HTMLVideoElement;
    const recs = await listRecordings();
    list.textContent = "";
    if (!recs.length) {
      const d = document.createElement("div");
      d.className = "rec-empty";
      d.textContent = "No recordings yet. Start one with MENU > REC — pick the screen or this tab, write normally, then Stop.";
      list.appendChild(d);
      return;
    }
    for (const r of recs) {
      const row = document.createElement("div"); row.className = "rec-row";
      const meta = document.createElement("div"); meta.className = "rec-meta";
      const b = document.createElement("b"); b.textContent = r.name;
      const sub = document.createElement("span");
      sub.textContent = `${Math.floor(r.dur / 60)}m ${r.dur % 60}s · ${(r.size / 1048576).toFixed(1)} MB · saved on this device`;
      meta.appendChild(b); meta.appendChild(sub);
      const acts = document.createElement("div"); acts.className = "rec-acts";
      const mk = (label: string, fn: () => void) => {
        const btn = document.createElement("button"); btn.className = "rec-btn"; btn.textContent = label;
        btn.onclick = fn; acts.appendChild(btn); return btn;
      };
      mk("Play", () => {
        if (player.src) URL.revokeObjectURL(player.src);
        player.src = URL.createObjectURL(r.blob);
        player.style.display = "block";
        void player.play();
        player.scrollIntoView({ block: "nearest" });
      });
      const dl = mk("Download", () => undefined);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(r.blob);
      a.download = `${r.name.replace(/[^a-z0-9]+/gi, "-")}.webm`;
      dl.onclick = () => a.click();
      const shareBtn = mk("Share", () => undefined);
      shareBtn.onclick = () => {
        shareBtn.disabled = true; shareBtn.textContent = "Uploading…";
        uploadClip(r.blob, r.name).then(async (url) => {
          shareBtn.textContent = "Link copied";
          try { await navigator.clipboard.writeText(url); } catch { /* user copies manually */ }
          this.lastShareUrl = url;
          const sh = this.$("#recShareUrl") as HTMLElement | null;
          if (sh) { sh.textContent = url; sh.style.display = "block"; }
          this.toast("Link copied — paste it in the AI chat");
          setTimeout(() => { shareBtn.disabled = false; shareBtn.textContent = "Share"; }, 1500);
        }).catch(() => {
          shareBtn.disabled = false; shareBtn.textContent = "Share";
          this.toast("Upload failed — check connection and try again");
        });
      };
      mk("Delete", () => {
        if (!window.confirm("Delete this recording?")) return;
        void deleteRecording(r.id).then(() => void this.openRecordings());
      });
      row.appendChild(meta); row.appendChild(acts);
      list.appendChild(row);
    }
  }
  toggleLatency() {
    this.latencyOn = !this.latencyOn;
    this.latIn = []; this.latDraw = []; this.latPendingT0 = 0;
    if (this.latencyEl) this.latencyEl.hidden = !this.latencyOn;
    if (this.latencyOn) this.toast("Write on the board — numbers update live");
    else this.toast("Latency test off");
  }
  private updateLatencyHud(force = false) {
    if (!this.latencyOn || !this.latencyEl) return;
    const now = performance.now();
    if (!force && now - this.latLastHud < 100) return;
    this.latLastHud = now;
    const avg = (a: number[]) => a.length ? a.reduce((x, v) => x + v, 0) / a.length : 0;
    const i = avg(this.latIn), dr = avg(this.latDraw);
    const est = i + dr + (1000 / 60); /* honest estimate: + one display frame */
    const t = this.latencyEl.querySelector("#latText");
    if (t) t.textContent = `INPUT ${i.toFixed(1)} ms  |  DRAW ${dr.toFixed(1)} ms  |  EST ${Math.round(est)} ms`;
    this.latencyEl.dataset.grade = est < 35 ? "a" : est < 60 ? "b" : est < 90 ? "c" : "d";
    const ip = this.lastPt, kp = this.inkPt;
    const e1 = this.latencyEl.querySelector("#latInPos"), e2 = this.latencyEl.querySelector("#latInkPos");
    if (e1 && ip) e1.textContent = `FINGER  x ${Math.round(ip.x)}   y ${Math.round(ip.y)}`;
    if (e2 && kp) {
      const gap = ip && this.boardDraft ? `   gap ${Math.abs(kp.x - ip.x).toFixed(1)}, ${Math.abs(kp.y - ip.y).toFixed(1)}` : "";
      e2.textContent = `INK     x ${Math.round(kp.x)}   y ${Math.round(kp.y)}${gap}`;
    }
  }
  private drawLive() {
    setEraseSurface(this.surfaceColor());
    const ctx = this.lctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.boardLive.width, this.boardLive.height);
    if ((isRecording() || this.latencyOn) && this.lastPt) {
      const z = this.boardZoom;
      ctx.save();
      ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
      ctx.translate(this.boardPan.x, this.boardPan.y); ctx.scale(z, z);
      ctx.globalAlpha = 0.9; ctx.setLineDash([]);
      ctx.strokeStyle = "#ea4335"; ctx.lineWidth = 2 / z;
      ctx.beginPath(); ctx.arc(this.lastPt.x, this.lastPt.y, 16 / z, 0, 7); ctx.stroke();
      ctx.fillStyle = "#ea4335";
      ctx.beginPath(); ctx.arc(this.lastPt.x, this.lastPt.y, 2.5 / z, 0, 7); ctx.fill();
      if (this.latencyOn && this.inkPt) {
        ctx.strokeStyle = "#188038"; ctx.lineWidth = 1.5 / z;
        ctx.beginPath(); ctx.arc(this.inkPt.x, this.inkPt.y, 6 / z, 0, 7); ctx.stroke();
      }
      ctx.restore();
    }
    if (this.lasso && this.lasso.length > 1) { /* lasso-eraser loop preview */
      ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
      ctx.save();
      ctx.translate(this.boardPan.x, this.boardPan.y);
      ctx.scale(this.boardZoom, this.boardZoom);
      const z = this.boardZoom;
      ctx.beginPath();
      ctx.moveTo(this.lasso[0].x, this.lasso[0].y);
      for (let i = 1; i < this.lasso.length; i++) ctx.lineTo(this.lasso[i].x, this.lasso[i].y);
      ctx.closePath();
      ctx.globalAlpha = 0.12; ctx.fillStyle = "#dc2626"; ctx.fill();
      ctx.globalAlpha = 1; ctx.setLineDash([7 / z, 5 / z]);
      ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1.5 / z;
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (!this.boardDraft || this.boardDraft.type === "erase") return;
    ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    ctx.save();
    ctx.translate(this.boardPan.x, this.boardPan.y);
    ctx.scale(this.boardZoom, this.boardZoom);
    drawObject(ctx, this.boardDraft);
    ctx.restore();
    if (this.latencyOn && this.latPendingT0) {
      const d = performance.now() - this.latPendingT0; this.latPendingT0 = 0;
      if (d < 400) { this.latDraw.push(d); if (this.latDraw.length > 60) this.latDraw.shift(); }
      this.updateLatencyHud();
    }
  }
  /* paint just the newest object straight onto the static canvas — no full redraw */
  private paintIncremental() {
    this.drawLive(); /* clears the live layer */
    const o = this.boardStore.objects[this.boardStore.objects.length - 1];
    if (!o) return;
    const ctx = this.inkX || this.bctx;
    ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    ctx.save();
    ctx.translate(this.boardPan.x, this.boardPan.y);
    ctx.scale(this.boardZoom, this.boardZoom);
    drawObject(ctx, o);
    ctx.restore();
    this.compositeVisible();
  }
  private drawBoardPattern(ctx: CanvasRenderingContext2D, z: number, px: number, py: number) {
    ctx.save(); ctx.lineWidth = 1;
    const step = (this.bg === "graph" ? 28 : this.bg === "grid" ? 44 : this.bg === "ruled" ? 36 : 30) * z * this.gridScale;
    if (this.bg === "grid" || this.bg === "graph") {
      ctx.strokeStyle = this.bg === "graph" ? "#bfdbfe" : "#e2e8f0";
      ctx.beginPath();
      for (let x = px % step; x < this.boardW; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, this.boardH); }
      for (let y = py % step; y < this.boardH; y += step) { ctx.moveTo(0, y); ctx.lineTo(this.boardW, y); }
      ctx.stroke();
      if (this.bg === "graph") {
        ctx.strokeStyle = "#93c5fd"; ctx.lineWidth = 1.6; ctx.beginPath();
        const ax = px % (step * 5), ay = py % (step * 5);
        for (let x = ax; x < this.boardW; x += step * 5) { ctx.moveTo(x, 0); ctx.lineTo(x, this.boardH); }
        for (let y = ay; y < this.boardH; y += step * 5) { ctx.moveTo(0, y); ctx.lineTo(this.boardW, y); }
        ctx.stroke();
      }
    } else if (this.bg === "ruled") {
      ctx.strokeStyle = "#cbd5e1"; ctx.beginPath();
      for (let y = py % step; y < this.boardH; y += step) { ctx.moveTo(0, y); ctx.lineTo(this.boardW, y); }
      ctx.stroke();
      ctx.strokeStyle = "#fca5a5"; ctx.beginPath(); ctx.moveTo(64, 0); ctx.lineTo(64, this.boardH); ctx.stroke();
    } else if (this.bg === "dotted") {
      ctx.fillStyle = "#cbd5e1";
      for (let x = px % step; x < this.boardW; x += step) for (let y = py % step; y < this.boardH; y += step) ctx.fillRect(x, y, 2, 2);
    } else if (this.bg === "black") {
      ctx.strokeStyle = "#ffffff10"; ctx.beginPath();
      for (let x = px % (40 * z); x < this.boardW; x += 40 * z) { ctx.moveTo(x, 0); ctx.lineTo(x, this.boardH); }
      for (let y = py % (40 * z); y < this.boardH; y += 40 * z) { ctx.moveTo(0, y); ctx.lineTo(this.boardW, y); }
      ctx.stroke();
    }
    ctx.restore();
  }

  private wireBoard() {
    const cv = this.boardCanvas;
    /* Pixel-exact for EVERY input type. A per-input nudge (finger ink shifted
       up-left) read as a visible offset on large smart boards — built-in
       whiteboard apps land ink exactly under the tip, so we do the same. */
    const off = (_ev: PointerEvent): readonly [number, number] => [0, 0] as const;
    this.on(cv, "pointerdown", (e: PointerEvent) => {
      try { cv.setPointerCapture(e.pointerId); } catch { /* noop */ }
      this.boardRectC = cv.getBoundingClientRect(); /* cache for the whole stroke — no layout thrash on move */
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const p = [...this.pointers.values()];
        this.pinch = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), z: this.boardZoom };
        this.boardDraft = null; return;
      }
      /* object awareness (SMART/BenQ/Promethean parity): a broad flat contact
         is a duster — it erases whatever it rubs, never inks */
      if (e.pointerType === "touch" && (((e as any).width || 0) > 26 || ((e as any).height || 0) > 26)) { this.palmPointer = e.pointerId; this.palmErased = false; return; }
      /* select-drag snapshot */
      if (this.tool === "select") {
        const r0 = cv.getBoundingClientRect();
        const w0 = this.toWorld(e.clientX - r0.left, e.clientY - r0.top);
        if (hitTest(this.boardStore.objects, w0.x, w0.y)) this.boardStore.pushHistory();
      }
      this.setActive("board", null);
      const r = cv.getBoundingClientRect();
      const [ox, oy] = off(e);
      this.boardStroke(e, this.toWorld(e.clientX - r.left - ox, e.clientY - r.top - oy), "down");
    });
    this.on(cv, "pointermove", (e: PointerEvent) => {
      /* debug aid: while recording, a red ring shows exactly where the input is —
         compare it with the ink to verify alignment */
      { const rr = this.boardRectC || cv.getBoundingClientRect(); this.lastPt = this.toWorld(e.clientX - rr.left, e.clientY - rr.top); if (isRecording() || this.latencyOn) { this.scheduleLive(); this.updateLatencyHud(); } }
      if (e.pointerId === this.palmPointer) {
        const r = this.boardRectC || cv.getBoundingClientRect();
        const w = this.toWorld(e.clientX - r.left, e.clientY - r.top);
        const hit = hitErase(this.boardStore.objects, w.x, w.y, 34 / this.boardZoom);
        if (hit) {
          if (!this.palmErased) { this.boardStore.pushHistory(); this.palmErased = true; }
          this.boardStore.objects.splice(hit.idx, 1);
          this.renderBoard(); this.scheduleSave();
        }
        return;
      }
      if (this.pinch && this.pointers.has(e.pointerId)) {
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const p = [...this.pointers.values()];
        const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        this.boardZoom = this.pinch.z * d / this.pinch.d; this.clampView();
        this.renderBoard(); return;
      }
      if (!this.pointers.has(e.pointerId)) return;
      const r = this.boardRectC || cv.getBoundingClientRect();
      /* High-frequency digitizers: pull EVERY hardware sub-sample between frames
         (getCoalescedEvents) and pipe straight into the ink path — zero allocations. */
      const coalesce = this.tool === "pen" || this.tool === "highlighter" || this.tool === "eraser";
      if (coalesce && (e as any).getCoalescedEvents) {
        const gce = (e as any).getCoalescedEvents() as PointerEvent[];
        if (gce.length > 1) {
          for (let i = 0; i < gce.length; i++) {
            const ev = gce[i];
            const [ox, oy] = off(ev);
            this.boardStroke(ev, this.toWorldInto(ev.clientX - r.left - ox, ev.clientY - r.top - oy), "move");
          }
          return;
        }
      }
      const [ox2, oy2] = off(e);
      this.boardStroke(e, this.toWorldInto(e.clientX - r.left - ox2, e.clientY - r.top - oy2), "move");
    });
    const up = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (e.pointerId === this.palmPointer) { this.palmPointer = -1; this.palmErased = false; }
      if (this.pointers.size < 2) this.pinch = null;
      if (this.pointers.size === 0) this.boardStroke(e, null, "up");
    };
    this.on(cv, "pointerup", up);
    this.on(cv, "pointercancel", up);
    this.on(this.boardScroll, "wheel", (e: WheelEvent) => {
      e.preventDefault();
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const before = this.toWorld(mx, my);
      this.boardZoom = this.boardZoom * (e.deltaY < 0 ? 1.1 : 0.9); this.clampView();
      this.boardPan.x = mx - before.x * this.boardZoom;
      this.boardPan.y = my - before.y * this.boardZoom;
      this.renderBoard();
    }, { passive: false });
    this.on(cv, "dblclick", (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const w = this.toWorld(e.clientX - r.left, e.clientY - r.top);
      const hit = hitTest(this.boardStore.objects, w.x, w.y);
      if (!hit) return;
      if (hit.obj.type === "text") { this.editingObj = { store: this.boardStore, obj: hit.obj, surface: "board" }; (this.$("#textInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mText"); this.syncTextModal(hit.obj); }
      if (hit.obj.type === "sticky") { this.editingObj = { store: this.boardStore, obj: hit.obj, surface: "board" }; (this.$("#stickyInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mSticky"); }
    });
  }

  private boardStroke(e: PointerEvent, w: { x: number; y: number } | null, phase: "down" | "move" | "up") {
    if (this.latencyOn) {
      const d = performance.now() - e.timeStamp;
      if (d >= 0 && d < 400) { this.latIn.push(d); if (this.latIn.length > 60) this.latIn.shift(); }
    }
    const tool = this.tool;
    if (phase === "down") { this.hidePops(); this.erasedThisDrag = false; }
    if (tool === "pan") {
      if (phase === "down") this.dragSel = { x: e.clientX, y: e.clientY, px: this.boardPan.x, py: this.boardPan.y };
      else if (phase === "move" && this.dragSel) { this.boardPan.x = this.dragSel.px + (e.clientX - this.dragSel.x); this.boardPan.y = this.dragSel.py + (e.clientY - this.dragSel.y); this.clampView(); this.renderBoard(); }
      else if (phase === "up") this.dragSel = null;
      return;
    }
    if (tool === "select") {
      if (phase === "down" && w) {
        /* rotate handle first (single selection) */
        if (this.selObjs().length === 1) {
          const b0 = this.selBounds(); const h = this.rotHandle(b0, this.boardZoom);
          if (Math.hypot(w.x - h.x, w.y - h.y) <= 12 / this.boardZoom) {
            const c = { x: b0.x + b0.w / 2, y: b0.y + b0.h / 2 };
            this.rotateSel = { c, a0: Math.atan2(w.y - c.y, w.x - c.x), r0: this.selObjs()[0].rot || 0 };
            this.boardStore.pushHistory(); return;
          }
        }
        /* resize corners */
        if (this.selObjs().length) {
          const hs = this.selCorners(this.selBounds());
          const h = hs.find((c) => Math.hypot(w.x - c.x, w.y - c.y) <= 12 / this.boardZoom);
          if (h) { this.resizeSel = { ax: h.ax, ay: h.ay, d0: Math.max(8, Math.hypot(h.x - h.ax, h.y - h.ay)) }; this.boardStore.pushHistory(); return; }
        }
        const hit = hitTest(this.boardStore.objects, w.x, w.y);
        if (hit) {
          const inSel = this.selObjs().includes(hit.obj);
          if (!inSel) { this.selMulti = null; this.selected = { surface: "board", obj: hit.obj }; }
          this.boardStore.pushHistory();
          this.dragSel = { sx: w.x, sy: w.y };
        } else {
          /* empty space -> free-form LASSO multi-select */
          this.selected = null; this.selMulti = null;
          this.marquee = [{ x: w.x, y: w.y }];
        }
        this.renderBoard(); this.syncSelBar();
      } else if (phase === "move" && w) {
        if (this.rotateSel) {
          const o = this.selObjs()[0];
          if (o) {
            const a = Math.atan2(w.y - this.rotateSel.c.y, w.x - this.rotateSel.c.x);
            o.rot = this.rotateSel.r0 + ((a - this.rotateSel.a0) * 180) / Math.PI;
            this.renderBoard(); this.syncSelBar();
          }
        } else if (this.resizeSel) {
          const d = Math.max(8, Math.hypot(w.x - this.resizeSel.ax, w.y - this.resizeSel.ay));
          const k = d / this.resizeSel.d0; this.resizeSel.d0 = d;
          this.selObjs().forEach((o) => scaleObject(o, k, this.resizeSel!.ax, this.resizeSel!.ay));
          this.renderBoard(); this.syncSelBar();
        } else if (this.dragSel) {
          const os = this.selObjs(); const dx = w.x - this.dragSel.sx, dy = w.y - this.dragSel.sy;
          os.forEach((o) => moveObject(o, dx, dy));
          this.dragSel.sx = w.x; this.dragSel.sy = w.y; this.renderBoard(); this.syncSelBar();
        } else if (this.marquee) {
          const lp = this.marquee, lastP = lp[lp.length - 1];
          if (Math.hypot(w.x - lastP.x, w.y - lastP.y) >= 2) { lp.push({ x: w.x, y: w.y }); this.renderBoard(); }
        }
      } else if (phase === "up") {
        if (this.rotateSel) { this.rotateSel = null; this.scheduleSave(); this.renderBoard(); this.syncSelBar(); }
        else if (this.resizeSel) { this.resizeSel = null; this.scheduleSave(); this.renderBoard(); this.syncSelBar(); }
        else if (this.dragSel) { this.dragSel = null; this.scheduleSave(); this.syncSelBar(); }
        else if (this.marquee) {
          const poly = this.marquee; this.marquee = null;
          if (poly.length > 2) {
            const hits = this.boardStore.objects.filter((o) => o.type !== "erase" && objectInsidePoly(o, poly));
            if (hits.length === 1) { this.selected = { surface: "board", obj: hits[0] }; this.selMulti = null; }
            else if (hits.length > 1) { this.selMulti = hits; this.selected = null; }
          }
          this.renderBoard(); this.syncSelBar();
        }
      }
      return;
    }
    if (tool === "eraser") {
      if (this.eraserMode === "pixel") {
        /* rub like a real eraser — raster holes in the ink layer, recorded as objects so undo/save/reload all work */
        if (phase === "down" && w) {
          this.boardStore.pushHistory();
          this.boardDraft = { id: uid(), type: "erase", points: [{ x: w.x, y: w.y }], size: this.eraserSize / this.boardZoom, efill: "auto" };
          this.eraseInkSegment(w, w);
          this.scheduleComposite();
        } else if (phase === "move" && w && this.boardDraft && this.boardDraft.type === "erase") {
          const pts = this.boardDraft.points!;
          const last = pts[pts.length - 1];
          if (Math.hypot(w.x - last.x, w.y - last.y) >= 1.5) {
            pts.push({ x: w.x, y: w.y });
            this.eraseInkSegment(last, w);
            this.scheduleComposite();
          }
        } else if (phase === "up" && this.boardDraft && this.boardDraft.type === "erase") {
          this.boardStore.objects.push(this.boardDraft);
          this.boardDraft = null;
          this.compositeVisible(); this.scheduleSave();
          requestAnimationFrame(() => { if (!this.destroyed && !this.boardDraft) this.compositeVisible(); });
        }
        return;
      }
      if (this.eraserMode === "area") {
        /* LASSO — draw any loop (circle, square, free shape); everything fully inside is erased in one undo step */
        if (phase === "down" && w) { this.lasso = [{ x: w.x, y: w.y }]; this.scheduleLive(); }
        else if (phase === "move" && w && this.lasso) {
          const lp = this.lasso, lastP = lp[lp.length - 1];
          if (Math.hypot(w.x - lastP.x, w.y - lastP.y) >= 2) { lp.push({ x: w.x, y: w.y }); this.scheduleLive(); }
        } else if (phase === "up" && this.lasso) {
          const poly = this.lasso; this.lasso = null; this.scheduleLive();
          if (poly.length > 2) {
            const victims = this.boardStore.objects.filter((o) => o.type !== "erase" && objectInsidePoly(o, poly));
            if (victims.length) {
              this.boardStore.pushHistory();
              this.boardStore.objects = this.boardStore.objects.filter((o) => o.type === "erase" || !objectInsidePoly(o, poly));
              this.renderBoard(); this.scheduleSave();
            }
          }
        }
        return;
      }
      /* stroke eraser — precise tap/rub, whole object deleted */
      if (phase !== "up" && w) {
        const hit = hitErase(this.boardStore.objects, w.x, w.y, Math.max(this.eraserSize * 0.5, 6) / this.boardZoom);
        if (hit) {
          if (!this.erasedThisDrag) { this.boardStore.pushHistory(); this.erasedThisDrag = true; }
          this.boardStore.objects.splice(hit.idx, 1);
          this.renderBoard(); this.scheduleSave();
        }
      } else if (phase === "up") this.erasedThisDrag = false;
      return;
    }
    if (tool === "text" || tool === "sticky") {
      if (phase === "down" && w) { this.pendingAnchor = { surface: "board", x: w.x, y: w.y }; this.openModal(tool === "text" ? "mText" : "mSticky"); }
      return;
    }
    if (phase === "up" && this.touchPending && (tool === "pen" || tool === "highlighter")) {
      /* plain tap = dot: commit a single-point stroke right where touched */
      const tp = this.touchPending; this.touchPending = null;
      this.startStroke(tool, tp, tp.pr);
    } else if (phase === "up") this.touchPending = null;
    if (phase === "down" && w) {
      if ((tool === "pen" || tool === "highlighter") && (e as PointerEvent).pointerType === "touch") {
        /* finger: deliberate 4px glide required before inking (no accidental marks) */
        this.touchPending = { x: w.x, y: w.y, pr: (e as PointerEvent).pressure || 0 };
        return;
      }
      if (tool === "pen" || tool === "highlighter") {
        this.startStroke(tool, w, (e as PointerEvent).pressure || 0);
      } else {
        this.boardStore.pushHistory();
        this.boardDraft = {
          id: uid(), type: "shape", shape: this.shape, x1: w.x, y1: w.y, x2: w.x, y2: w.y,
          color: this.color, size: this.size, opacity: this.opacity, fill: this.fill, dashed: this.dashed,
        };
      }
    } else if (phase === "move" && w && !this.boardDraft && this.touchPending && (tool === "pen" || tool === "highlighter")) {
      const tp = this.touchPending;
      if (Math.hypot(w.x - tp.x, w.y - tp.y) * this.boardZoom < 4) return;
      this.touchPending = null;
      this.startStroke(tool, tp, tp.pr);
    }
    if (phase === "move" && w && this.boardDraft) {
      if (this.boardDraft.type === "stroke") {
        this.latPendingT0 = performance.now();
        const pts = this.boardDraft.points!;
        const last = pts[pts.length - 1];
        if (Math.hypot(w.x - last.x, w.y - last.y) >= 1.25) {
          /* stylus pressure (0..1) captured per point — real calligraphy on tablets */
          const pr = (e as PointerEvent).pressure;
          pts.push(pr && pr > 0 && pr !== 0.5 ? { x: w.x, y: w.y, w: pr } : { x: w.x, y: w.y });
          this.inkPt = { x: w.x, y: w.y };
        }
      } else { this.boardDraft.x2 = w.x; this.boardDraft.y2 = w.y; }
      this.scheduleLive(); /* live layer only — never a full redraw mid-stroke */
    } else if (phase === "up" && this.boardDraft) {
      let replaced = false;
      if (this.boardDraft.type === "shape" && Math.abs((this.boardDraft.x2 || 0) - (this.boardDraft.x1 || 0)) < 4 && Math.abs((this.boardDraft.y2 || 0) - (this.boardDraft.y1 || 0)) < 4) {
        this.boardStore.undo.pop();
      } else {
        this.boardStore.objects.push(this.boardDraft);
        if (this.shapeAI && this.boardDraft.type === "stroke" && this.boardDraft.tool === "pen" && this.boardDraft.kind === "shape" && (this.boardDraft.points?.length || 0) > 8) {
          const rec = recognizeShape(this.boardDraft.points!);
          if (rec) { this.boardStore.objects[this.boardStore.objects.length - 1] = {
            id: this.boardDraft.id, type: "shape", shape: rec.shape,
            x1: rec.x1, y1: rec.y1, x2: rec.x2, y2: rec.y2,
            color: this.boardDraft.color, size: Math.max(this.boardDraft.size || 4, 3), opacity: this.boardDraft.opacity,
          }; replaced = true; }
        }
      }
      const committed = this.boardDraft;
      this.boardDraft = null;
      if (replaced) this.renderBoard(); else this.paintIncremental();
      if (committed && committed.type === "stroke" && committed.kind === "text") this.registerTextPenStroke(committed, "board", null);
      this.scheduleSave();
      /* belt & braces: one guaranteed paint on the next frame */
      requestAnimationFrame(() => { if (!this.destroyed && !this.boardDraft) this.paintIncremental(); });
    }
  }

  /* ==========================================================================
     DOCUMENT VIEWER
     ========================================================================== */
  private renderScale() { return this.fitScale * this.docZoom; }

  private setDocEmpty(show: boolean, html?: string) {
    let em = this.$("#docEmpty") as HTMLElement | null;
    const sc = this.$("#docScroll") as HTMLElement;
    if (show) {
      if (!em) { em = document.createElement("div"); em.className = "doc-empty"; em.id = "docEmpty"; sc.prepend(em); }
      if (html) em.innerHTML = html;
      em.style.display = "block";
    } else if (em) em.style.display = "none";
  }

  private wireDoc() {
    this.$("#btnOpen").onclick = () => (this.$("#fileInput") as HTMLInputElement).click();
    this.$("#fileInput").onchange = (e: Event) => {
      const inp = e.target as HTMLInputElement;
      if (inp.files && inp.files[0]) this.openFile(inp.files[0]);
      inp.value = "";
    };
    const sc = this.$("#docScroll") as HTMLElement;
    ["dragover", "dragenter"].forEach((ev) => this.on(sc, ev, (e: DragEvent) => { e.preventDefault(); sc.classList.add("drop-hint"); }));
    ["dragleave", "drop"].forEach((ev) => this.on(sc, ev, (e: DragEvent) => { e.preventDefault(); sc.classList.remove("drop-hint"); }));
    this.on(sc, "drop", (e: DragEvent) => {
      const f = e.dataTransfer?.files?.[0];
      if (f) this.openFile(f);
    });

    this.pageObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const pg = this.pages.find((p) => p.wrap === en.target);
        if (!pg) return;
        if (pg.dirty || !pg.rendered) this.renderPdfPage(pg);
        this.currentPage = pg.num; this.updatePgLabel();
        this.$all("#thumbs canvas").forEach((c: HTMLCanvasElement) => c.classList.toggle("on", +(c.dataset.p || 0) === pg.num));
      });
    }, { root: sc, rootMargin: "400px 0px" });

    this.$("#btnThumbs").onclick = () => (this.$("#thumbs") as HTMLElement).classList.toggle("show");
    this.$("#pgPrev").onclick = () => {
      if (this.doc?.kind === "pdf" && this.currentPage > 1) {
        const pg = this.pages[this.currentPage - 2];
        if (pg) pg.wrap.scrollIntoView({ behavior: "smooth" });
      }
    };
    this.$("#pgNext").onclick = () => {
      if (this.doc?.kind === "pdf" && this.currentPage < this.totalPages) {
        const pg = this.pages[this.currentPage];
        if (pg) pg.wrap.scrollIntoView({ behavior: "smooth" });
      }
    };
    this.$("#btnZoomIn").onclick = () => this.setZoom(this.docZoom + 0.2);
    this.$("#btnZoomOut").onclick = () => this.setZoom(this.docZoom - 0.2);
    this.$("#btnFit").onclick = () => {
      this.docZoom = 1; this.$("#zoomLbl").textContent = "100%";
      if (this.doc?.kind === "pdf") this.computeFit(); else this.applyHtmlZoom();
    };
    this.$("#btnFitBoard").onclick = () => {
      const f = fitBoard(this.boardStore.objects, this.boardW, this.boardH);
      if (!f) { this.toast("Draw something first"); return; }
      this.boardZoom = f.zoom; this.boardPan.x = f.x; this.boardPan.y = f.y; this.clampView(); this.renderBoard();
    };
    this.$("#btnReplay").onclick = () => this.openReplay();
    this.$("#btnTemplates").onclick = () => this.openModal("mTemplates");
    const rSlider = this.$("#replaySlider") as HTMLInputElement;
    rSlider.oninput = () => { this.stopReplayTimer(); this.replayN = +rSlider.value; this.updateReplayPos(); this.renderBoard(); };
    this.$("#replayPlay").onclick = () => {
      if (this.replayTimer) { this.stopReplayTimer(); (this.$("#replayPlay") as HTMLElement).textContent = "Play"; return; }
      const speed = +((this.$("#replaySpeed") as HTMLSelectElement).value || 14);
      let i = this.replayN ?? 0;
      if (i >= this.boardStore.objects.length) i = 0;
      (this.$("#replayPlay") as HTMLElement).textContent = "Pause";
      this.replayTimer = setInterval(() => {
        i = Math.min(this.boardStore.objects.length, i + 1);
        this.replayN = i; rSlider.value = String(i); this.updateReplayPos(); this.renderBoard();
        if (i >= this.boardStore.objects.length) { this.stopReplayTimer(); (this.$("#replayPlay") as HTMLElement).textContent = "Play"; }
      }, Math.max(16, Math.round(1000 / speed)));
    };
    this.$("#replayClose").onclick = () => { this.closeModal(this.$("#mReplay") as HTMLElement); this.stopReplay(); };
    const calcOut = this.$("#calcOut") as HTMLElement;
    let calcExpr = "";
    this.$all("#calcGrid button").forEach((b: HTMLElement) => (b.onclick = () => {
      const k = b.dataset.k || "";
      if (k === "C") calcExpr = "";
      else if (k === "DEL") calcExpr = calcExpr.slice(0, -1);
      else if (k === "=") {
        try {
          const safe = calcExpr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
          if (!/^[0-9+\-*/(). ]*$/.test(safe) || !safe.trim()) throw new Error("bad");
          const v = Function(`"use strict"; return (${safe})`)();
          calcExpr = typeof v === "number" && isFinite(v) ? String(Math.round(v * 1e10) / 1e10) : "Error";
        } catch { calcExpr = "Error"; }
      } else calcExpr += k;
      calcOut.textContent = calcExpr || "0";
    }));
    this.$("#btnCalc").onclick = () => { calcOut.textContent = calcExpr || "0"; this.openModal("mCalc"); };
    this.$all("#tplGrid button").forEach((b: HTMLElement) => (b.onclick = () => {
      const tpl = TEMPLATES.find((t) => t.id === b.dataset.tpl);
      if (!tpl) return;
      this.boardStore.pushHistory();
      this.boardStore.objects.push(...tpl.build(this.boardW, this.boardH));
      this.closeModal(this.$("#mTemplates") as HTMLElement);
      this.setLayout("board"); this.renderBoard(); this.scheduleSave();
      this.toast(`Template added: ${tpl.name}`);
    }));
  }

  private openFile(file: File) {
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    const key = file.name +"::"+ file.size;
    this.doc = { kind: "pdf", key, name: file.name };
    (this.$("#fileName") as HTMLElement).textContent = " " + file.name;
    this.pages = [];
    (this.$("#thumbs") as HTMLElement).innerHTML = "";
    (this.$("#thumbs") as HTMLElement).classList.remove("show");
    this.$all("#docScroll .page-wrap, #docScroll .doc-html").forEach((n: HTMLElement) => n.remove());
    this.htmlAnnot = null;
    if (ext === "pdf") this.openPdf(file);
    else if (ext === "docx") this.openDocx(file);
    else if (["txt", "md"].includes(ext)) this.openText(file);
    else if (["png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(ext)) this.openImage(file);
    else if (["mp4", "webm", "ogv", "mov", "m4v"].includes(ext)) this.openVideo(URL.createObjectURL(file), file.name);
    else if (["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac"].includes(ext)) this.openAudio(URL.createObjectURL(file), file.name);
    else this.openGeneric(URL.createObjectURL(file), file.name, file.size);
    if (this.layout === "board") this.setLayout("split");
    /* cache the file on this device — no re-uploading next time */
    if (!["mp4","webm","ogv","mov","m4v","mp3","wav","ogg","oga","m4a","aac","flac"].includes(ext)) {
      putFile(file.name, file, file.type).catch(() => {});
    }
  }

  private async openPdf(file: File) {
    this.setDocEmpty(true, `<h2>Opening PDF…</h2><p>${this.esc(file.name)}</p>`);
    try {
      const buf = await file.arrayBuffer();
      await this.loadPdfBuffer(buf);
    } catch (err) {
      console.error(err);
      this.setDocEmpty(true, `<h2>Could not open PDF</h2><p>The file may be corrupt. Try another file.</p>`);
    }
  }

  /* Load a PDF from a URL with a live download-progress bar (NCERT chapters) */
  async openPdfFromUrl(url: string, name: string) {
    this.resetDocViewer(name, url, "pdf");
    try {
      const buf = await this.fetchBytes(url, "Loading PDF…", name);
      await this.loadPdfBuffer(buf.buffer);
      /* phone scans / uploads: keep a copy on this device */
      if (!url.startsWith("/api/pdf") && !url.includes("ncert.nic.in")) {
        putFile(name, new Blob([buf], { type: "application/pdf" }), "application/pdf").catch(() => {});
      }
    } catch (err) {
      console.error(err);
      this.setDocEmpty(true, `<h2>Could not load PDF</h2><p>Check your internet connection and try again.</p>`);
    }
  }

  private esc(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  private async loadPdfBuffer(buf: ArrayBuffer) {
    this.pdfDoc = await (pdfjsLib as any).getDocument({ data: buf }).promise;
    this.totalPages = this.pdfDoc.numPages;
    if (this.doc) this.doc.kind = "pdf";
    this.setDocEmpty(false);
    this.computeFit();
    for (let n = 1; n <= this.totalPages; n++) this.buildPageShell(n);
    this.buildThumbs();
    this.currentPage = 1; this.updatePgLabel();
    this.toast(`${this.totalPages} pages loaded — start writing!`);
  }

  private computeFit() {
    if (!this.pdfDoc) return;
    this.pdfDoc.getPage(1).then((p: any) => {
      if (this.destroyed) return;
      const v = p.getViewport({ scale: 1 });
      const sc = this.$("#docScroll") as HTMLElement;
      const avail = Math.max(320, sc.clientWidth - 70);
      this.fitScale = avail / v.width;
      this.pages.forEach((pg) => { pg.dirty = true; });
      this.renderVisiblePages();
    });
  }

  private buildPageShell(n: number) {
    const wrap = document.createElement("div");
    wrap.className = "page-wrap";
    wrap.innerHTML = `<div class="page-no">Page ${n}</div>`;
    const base = document.createElement("canvas");
    const annot = document.createElement("canvas");
    annot.className = "annot";
    wrap.appendChild(base); wrap.appendChild(annot);
    (this.$("#docScroll") as HTMLElement).appendChild(wrap);
    const pg: PdfPage = { num: n, wrap, base, annot, actx: annot.getContext("2d")!, rendered: false, dirty: true, rendering: false, scale: 1, cssScale: 1 };
    this.pages.push(pg);
    this.pageObserver?.observe(wrap);
    this.wireAnnotCanvas(annot, n, () => pg.cssScale, null);
  }

  private async renderPdfPage(pg: PdfPage) {
    if (!this.pdfDoc || pg.rendering || this.destroyed) return;
    pg.rendering = true; pg.dirty = false;
    try {
      const page = await this.pdfDoc.getPage(pg.num);
      const css = this.renderScale();
      const dpr = Math.min(2.5, window.devicePixelRatio || 1); /* crisp text on hi-DPI + projectors */
      const scale = css * dpr;
      const vp = page.getViewport({ scale });
      const cssVp = page.getViewport({ scale: css });
      pg.scale = scale; pg.cssScale = css;
      pg.base.width = Math.floor(vp.width); pg.base.height = Math.floor(vp.height);
      pg.base.style.width = cssVp.width + "px"; pg.base.style.height = cssVp.height + "px";
      pg.annot.width = Math.floor(vp.width); pg.annot.height = Math.floor(vp.height);
      pg.annot.style.width = cssVp.width + "px"; pg.annot.style.height = cssVp.height + "px";
      pg.wrap.style.width = cssVp.width + "px"; pg.wrap.style.height = cssVp.height + "px";
      await page.render({ canvasContext: pg.base.getContext("2d"), viewport: vp }).promise;
      pg.rendered = true;
      this.redrawAnnot(pg);
    } catch (err: any) { if (!err || err.name !== "RenderingCancelledException") console.error(err); }
    pg.rendering = false;
    if (pg.dirty && !this.destroyed) this.renderPdfPage(pg);
  }

  private renderVisiblePages() {
    const sc = this.$("#docScroll") as HTMLElement;
    const sr = sc.getBoundingClientRect();
    this.pages.forEach((pg) => {
      const r = pg.wrap.getBoundingClientRect();
      if (r.bottom > sr.top - 400 && r.top < sr.bottom + 400 && (pg.dirty || !pg.rendered)) this.renderPdfPage(pg);
    });
  }

  private redrawAnnot(pg: PdfPage) {
    const ctx = pg.actx, sc = pg.scale || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pg.annot.width, pg.annot.height);
    ctx.save(); ctx.scale(sc, sc);
    this.docStore(pg.num).objects.forEach((o) => drawObject(ctx, o));
    if (this.annotDraft && this.annotDraft.page === pg.num) drawObject(ctx, this.annotDraft.obj);
    if (this.docErasePreview && this.docErasePreview.page === pg.num && this.docErasePreview.pts.length > 1) {
      const d = this.docErasePreview.pts;
      ctx.beginPath(); ctx.moveTo(d[0].x, d[0].y);
      for (let i = 1; i < d.length; i++) ctx.lineTo(d[i].x, d[i].y);
      ctx.closePath();
      ctx.globalAlpha = 0.12; ctx.fillStyle = "#dc2626"; ctx.setLineDash([]); ctx.fill();
      ctx.globalAlpha = 1; ctx.setLineDash([7, 5]); ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
    if (this.selected && this.selected.surface === "doc" && this.selected.page === pg.num) {
      const b = bbox(this.selected.obj);
      ctx.save(); ctx.scale(sc, sc);
      ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2;
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
      ctx.restore();
    }
    this.drawLive();
  }

  private annotPos(canvas: HTMLCanvasElement, e: PointerEvent | MouseEvent, scale: number, zoomCss: number, rect?: DOMRect | null) {
    const r = rect || canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / zoomCss / scale, y: (e.clientY - r.top) / zoomCss / scale };
  }

  private wireAnnotCanvas(canvas: HTMLCanvasElement, pageNum: number, scaleFn: (() => number) | null, zoomCssFn: (() => number) | null) {
    let drawing = false, selDrag: { sx: number; sy: number } | null = null;
    let erasing = false, erasedAny = false;
    let lasso: { x: number; y: number }[] | null = null;
    let rect: DOMRect | null = null;
    let raf = 0;
    const sched = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; this.refreshAnnot(pageNum); }); };
    this.on(canvas, "pointerdown", (e: PointerEvent) => {
      if (this.docReadOnly) return; /* split/board layouts: doc stays view-only */
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch { /* noop */ }
      rect = canvas.getBoundingClientRect(); /* cached for the whole stroke */
      this.setActive("doc", pageNum);
      const sc = scaleFn ? scaleFn() : 1, zc = zoomCssFn ? zoomCssFn() : 1;
      const p = this.annotPos(canvas, e, sc, zc);
      const store = this.docStore(pageNum);
      this.hidePops();
      if (this.tool === "pan") return;
      if (this.tool === "select") {
        const hit = hitTest(store.objects, p.x, p.y);
        this.selected = hit ? { surface: "doc", page: pageNum, obj: hit.obj } : null;
        selDrag = hit ? { sx: p.x, sy: p.y } : null;
        if (hit) store.pushHistory();
        this.refreshAnnot(pageNum); return;
      }
      if (this.tool === "eraser") {
        if (this.eraserMode === "pixel") {
          store.pushHistory();
          this.annotDraft = { page: pageNum, obj: { id: uid(), type: "erase", points: [p], size: this.eraserSize / sc } };
          drawing = true; return;
        }
        if (this.eraserMode === "area") {
          lasso = [{ x: p.x, y: p.y }];
          this.docErasePreview = { page: pageNum, pts: [{ x: p.x, y: p.y }] };
          sched(); return;
        }
        const hit = hitErase(store.objects, p.x, p.y, Math.max(this.eraserSize * 0.5, 6) / (sc * zc));
        if (hit) { store.pushHistory(); erasedAny = true; store.objects.splice(hit.idx, 1); this.refreshAnnot(pageNum); this.scheduleSave(); }
        erasing = true; return;
      }
      if (this.tool === "text" || this.tool === "sticky") {
        this.pendingAnchor = { surface: "doc", page: pageNum, x: p.x, y: p.y };
        this.openModal(this.tool === "text" ? "mText" : "mSticky"); return;
      }
      store.pushHistory();
      if (this.tool === "pen" || this.tool === "highlighter") {
        const rawSize = this.tool === "highlighter" ? this.hlSize / sc : penSizeFor(this.penKind, this.size) / sc;
        this.annotDraft = {
          page: pageNum,
          obj: {
            id: uid(), type: "stroke", tool: this.tool, kind: this.tool === "pen" ? this.penKind : undefined, points: [p],
            color: this.tool === "highlighter" ? this.hlColor : this.color,
            size: Math.max(rawSize, 0.6), opacity: this.opacity,
          },
        };
      } else {
        this.annotDraft = {
          page: pageNum,
          obj: {
            id: uid(), type: "shape", shape: this.shape, x1: p.x, y1: p.y, x2: p.x, y2: p.y,
            color: this.color, size: Math.max(this.size / sc, 0.8), opacity: this.opacity, fill: this.fill, dashed: this.dashed,
          },
        };
      }
      drawing = true;
    });
    this.on(canvas, "pointermove", (e: PointerEvent) => {
      const sc = scaleFn ? scaleFn() : 1, zc = zoomCssFn ? zoomCssFn() : 1;
      const rc = rect || (rect = canvas.getBoundingClientRect());
      const store = this.docStore(pageNum);
      const posOf = (ev: PointerEvent) => this.annotPos(canvas, ev, sc, zc, rc);
      /* high-frequency pens: every coalesced point, batched to one repaint per frame */
      const gce = (e as any).getCoalescedEvents ? (e as any).getCoalescedEvents() as PointerEvent[] : [];
      const stroking = drawing && this.annotDraft && this.annotDraft.page === pageNum && this.annotDraft.obj.type === "stroke";
      const evs = (gce && gce.length && stroking) ? gce : [e];
      for (const ev of evs) {
        const p = posOf(ev);
        if (lasso) {
          const lp = lasso, lastP = lp[lp.length - 1];
          if (Math.hypot(p.x - lastP.x, p.y - lastP.y) >= 2 / (sc * zc)) {
            lp.push({ x: p.x, y: p.y });
            if (this.docErasePreview) this.docErasePreview.pts.push({ x: p.x, y: p.y });
          }
          sched(); continue;
        }
        if (erasing) {
          const hit = hitErase(store.objects, p.x, p.y, Math.max(this.eraserSize * 0.5, 6) / (sc * zc));
          if (hit) { if (!erasedAny) { store.pushHistory(); erasedAny = true; } store.objects.splice(hit.idx, 1); sched(); this.scheduleSave(); }
          continue;
        }
        if (selDrag && this.selected) {
          moveObject(this.selected.obj, p.x - selDrag.sx, p.y - selDrag.sy);
          selDrag.sx = p.x; selDrag.sy = p.y; sched(); continue;
        }
        if (!drawing || !this.annotDraft || this.annotDraft.page !== pageNum) continue;
        const o = this.annotDraft.obj;
        if (o.type === "stroke" || o.type === "erase") {
          const pts = o.points!;
          const last = pts[pts.length - 1];
          if (Math.hypot(p.x - last.x, p.y - last.y) >= (o.type === "erase" ? 1.5 : 0.75) / (sc * zc)) {
            const pr = ev.pressure;
            pts.push(pr && pr > 0 && pr !== 0.5 ? { x: p.x, y: p.y, w: pr } : { x: p.x, y: p.y });
          }
        } else { o.x2 = p.x; o.y2 = p.y; }
        sched();
      }
    });
    const up = () => {
      drawing = false; erasing = false; erasedAny = false;
      if (lasso) {
        const poly = lasso; lasso = null; this.docErasePreview = null;
        const st = this.docStore(pageNum);
        if (poly.length > 2) {
          const victims = st.objects.filter((o) => o.type !== "erase" && objectInsidePoly(o, poly));
          if (victims.length) {
            st.pushHistory();
            st.objects = st.objects.filter((o) => o.type === "erase" || !objectInsidePoly(o, poly));
            this.scheduleSave();
          }
        }
        this.refreshAnnot(pageNum);
      }
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (this.annotDraft && this.annotDraft.page === pageNum) {
        const o = this.annotDraft.obj;
        const tiny = o.type === "shape" && Math.abs((o.x2 || 0) - (o.x1 || 0)) < 3 && Math.abs((o.y2 || 0) - (o.y1 || 0)) < 3;
        if (tiny) this.docStore(pageNum).undo.pop();
        else {
          const st = this.docStore(pageNum);
          let finalObj: BoardObject = o;
          if (o.type === "stroke" && o.kind === "shape" && (o.points?.length || 0) > 8) {
            const rec = recognizeShape(o.points!);
            if (rec) finalObj = { id: o.id, type: "shape", shape: rec.shape, x1: rec.x1, y1: rec.y1, x2: rec.x2, y2: rec.y2, color: o.color, size: Math.max(o.size || 4, 3), opacity: o.opacity };
          }
          st.objects.push(finalObj);
          if (finalObj.type === "stroke" && finalObj.kind === "text") this.registerTextPenStroke(finalObj, "doc", pageNum);
        }
        this.annotDraft = null; this.refreshAnnot(pageNum); this.scheduleSave();
      }
      if (selDrag) this.scheduleSave();
      selDrag = null;
    };
    this.on(canvas, "pointerup", up);
    this.on(canvas, "pointercancel", up);
    this.on(canvas, "dblclick", (e: MouseEvent) => {
      const sc = scaleFn ? scaleFn() : 1, zc = zoomCssFn ? zoomCssFn() : 1;
      const p = this.annotPos(canvas, e, sc, zc);
      const hit = hitTest(this.docStore(pageNum).objects, p.x, p.y);
      if (!hit) return;
      if (hit.obj.type === "text") { this.editingObj = { store: this.docStore(pageNum), obj: hit.obj, surface: "doc", page: pageNum }; (this.$("#textInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mText"); this.syncTextModal(hit.obj); }
      if (hit.obj.type === "sticky") { this.editingObj = { store: this.docStore(pageNum), obj: hit.obj, surface: "doc", page: pageNum }; (this.$("#stickyInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mSticky"); }
    });
  }

  private refreshAnnot(pageNum: number) {
    if (this.doc?.kind === "pdf") {
      const pg = this.pages.find((p) => p.num === pageNum);
      if (pg && pg.rendered) this.redrawAnnot(pg);
    } else if (this.doc && (this.doc.kind === "html" || this.doc.kind === "image")) {
      this.redrawHtmlAnnot();
    }
  }

  private buildThumbs() {
    const thumbs = this.$("#thumbs") as HTMLElement;
    thumbs.innerHTML = "";
    const frag = document.createDocumentFragment();
    this.pages.forEach((pg) => {
      const c = document.createElement("canvas");
      c.dataset.p = String(pg.num); c.width = 100; c.height = 140;
      c.title = "Page " + pg.num;
      c.onclick = () => pg.wrap.scrollIntoView({ behavior: "smooth", block: "start" });
      const cap = document.createElement("div");
      cap.className = "tcap"; cap.textContent = String(pg.num);
      frag.appendChild(c); frag.appendChild(cap);
    });
    thumbs.appendChild(frag);
    let i = 0;
    const next = () => {
      if (this.destroyed || i >= this.pages.length || !this.pdfDoc) return;
      const pg = this.pages[i++];
      this.pdfDoc.getPage(pg.num).then((page: any) => {
        const c = thumbs.querySelector(`canvas[data-p="${pg.num}"]`) as HTMLCanvasElement | null;
        if (!c) { next(); return; }
        const vp = page.getViewport({ scale: 100 / page.getViewport({ scale: 1 }).width });
        c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
        page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise.finally(() => requestAnimationFrame(next));
      }).catch(() => requestAnimationFrame(next));
    };
    next();
  }

  private async openDocx(file: File) {
    this.setDocEmpty(true, `<h2>Opening DOCX…</h2>`);
    try {
      const mammoth = ((await import("mammoth/mammoth.browser")) as any).default || ((await import("mammoth/mammoth.browser")) as any);
      const buf = await file.arrayBuffer();
      const res = await mammoth.convertToHtml({ arrayBuffer: buf });
      if (this.doc) this.doc.kind = "html";
      this.totalPages = 1; this.currentPage = 1;
      this.setDocEmpty(false);
      this.mountHtmlDoc(res.value || "<p><i>Khaali document</i></p>");
      this.updatePgLabel(); this.toast("DOCX ready — highlight and write!");
    } catch (err) {
      console.error(err);
      this.setDocEmpty(true, `<h2>Could not open DOCX</h2><p>Save old .doc files as .docx first.</p>`);
    }
  }

  private async openText(file: File) {
    const t = await file.text();
    const esc = t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    if (this.doc) this.doc.kind = "html";
    this.totalPages = 1; this.currentPage = 1;
    this.setDocEmpty(false);
    this.mountHtmlDoc(`<pre style="white-space:pre-wrap;font-family:inherit;font-size:16px">${esc}</pre>`);
    this.updatePgLabel(); this.toast("Text ready!");
  }

  private openImage(file: File) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (this.doc) this.doc.kind = "image";
      this.totalPages = 1; this.currentPage = 1;
      this.setDocEmpty(false);
      this.mountHtmlDoc(`<img src="${url}" style="width:100%;display:block;border-radius:4px">`);
      this.addSendToBoard(url);
      this.updatePgLabel(); this.toast("Image ready — draw on it!");
    };
    img.onerror = () => this.toast("Could not open the image");
    img.src = url;
  }

  private openVideo(src: string, name: string) {
    if (this.doc) this.doc.kind = "video";
    this.totalPages = 1; this.currentPage = 1;
    this.setDocEmpty(false);
    this.mountHtmlDoc(
      `<div style="background:#000;border-radius:6px;overflow:hidden">` +
      `<video controls playsinline preload="metadata" src="${src}" style="width:100%;max-height:62vh;display:block;background:#000"></video></div>` +
      `<p style="font-size:13.5px;color:#475569;margin:10px 2px 0"><b>${this.esc(name)}</b> — use the whiteboard beside it for notes.</p>`,
      false);
    this.updatePgLabel(); this.toast("Video ready!");
  }

  private openAudio(src: string, name: string) {
    if (this.doc) this.doc.kind = "audio";
    this.totalPages = 1; this.currentPage = 1;
    this.setDocEmpty(false);
    this.mountHtmlDoc(
      `<div style="text-align:center;padding:26px 10px 8px">` +
      `<div style="font-size:13px;font-weight:800;letter-spacing:.08em;color:#6366f1;margin-bottom:12px">AUDIO</div>` +
      `<div style="font-weight:800;font-size:17px;margin-bottom:14px">${this.esc(name)}</div>` +
      `<audio controls preload="metadata" src="${src}" style="width:100%"></audio></div>`,
      false);
    this.updatePgLabel(); this.toast("Audio ready!");
  }

  private openGeneric(url: string, name: string, size?: number) {
    if (this.doc) this.doc.kind = "file";
    this.totalPages = 1; this.currentPage = 1;
    this.setDocEmpty(false);
    const kb = size ? ` • ${Math.max(1, Math.round(size / 1024))} KB` : "";
    this.mountHtmlDoc(
      `<div style="text-align:center;padding:30px 12px">` +
      `<div style="font-size:13px;font-weight:800;letter-spacing:.08em;color:#6366f1;margin-bottom:12px">FILE</div>` +
      `<div style="font-weight:800;font-size:17px;margin-bottom:6px">${this.esc(name)}</div>` +
      `<div style="font-size:13px;color:#64748b;margin-bottom:16px">Preview is not available for this type${kb}</div>` +
      `<a href="${url}" download="${this.esc(name)}" style="display:inline-block;background:#1a73e8;color:#fff;font-weight:800;font-size:14.5px;padding:12px 26px;border-radius:11px;text-decoration:none">Download file</a></div>`,
      false);
    this.updatePgLabel();
  }

  private resetDocViewer(name: string, key: string, kind: "pdf" | "html" | "image" | "video" | "audio" | "file" | "web") {
    if (this.layout === "board") this.setLayout("split");
    this.doc = { kind, key, name };
    (this.$("#fileName") as HTMLElement).textContent = " " + name;
    this.pages = [];
    (this.$("#thumbs") as HTMLElement).innerHTML = "";
    (this.$("#thumbs") as HTMLElement).classList.remove("show");
    this.$all("#docScroll .page-wrap, #docScroll .doc-html").forEach((n: HTMLElement) => n.remove());
    this.setDocEmpty(false);
    this.htmlAnnot = null;
  }

  /* Download bytes with a live progress bar in the doc pane */
  private async fetchBytes(url: string, title: string, name: string): Promise<Uint8Array<ArrayBuffer>> {
    const safe = this.esc(name);
    const bar = (pct: number | null, kb: number) => {
      const label = pct === null ? `${kb} KB downloaded…` : `${pct}% downloaded`;
      const w = pct === null ? 100 : pct;
      this.setDocEmpty(true, `<h2>${title}</h2><p>${safe}</p>` +
        `<div style="height:6px;border-radius:99px;background:#e2e8f0;max-width:300px;margin:12px auto 6px;overflow:hidden">` +
        `<div style="height:100%;width:${w}%;background:#1a73e8;border-radius:99px;transition:width .2s"></div></div>` +
        `<p style="font-size:13px">${label}</p>`);
    };
    bar(0, 0);
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error("download failed");
    const total = +(res.headers.get("content-length") || 0);
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let got = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); got += value.length;
      bar(total ? Math.min(99, Math.round((got / total) * 100)) : null, Math.round(got / 1024));
    }
    const buf: Uint8Array<ArrayBuffer> = new Uint8Array(new ArrayBuffer(got));
    let off = 0;
    for (const c of chunks) { buf.set(c, off); off += c.length; }
    return buf;
  }

  /* Open a phone-uploaded file by URL — any type, automatic */
  async openRemoteFile(url: string, name: string) {
    const ext = (name.split(".").pop() || "").toLowerCase();
    if (ext === "pdf") { await this.openPdfFromUrl(url, name); return; }
    if (["mp4", "webm", "ogv", "mov", "m4v"].includes(ext)) { this.resetDocViewer(name, url, "video"); this.openVideo(url, name); return; }
    if (["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac"].includes(ext)) { this.resetDocViewer(name, url, "audio"); this.openAudio(url, name); return; }
    if (["docx", "txt", "md", "png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(ext)) {
      this.resetDocViewer(name, url, "html");
      try {
        const buf = await this.fetchBytes(url, "Receiving file…", name);
        this.openFile(new File([buf], name));
      } catch (err) {
        console.error(err);
        this.setDocEmpty(true, `<h2>Could not open file</h2><p>Check your internet connection and try again.</p>`);
      }
      return;
    }
    this.resetDocViewer(name, url, "file");
    this.openGeneric(url, name);
  }

  private mountHtmlDoc(inner: string, annot = true) {
    this.$all("#docScroll .doc-html").forEach((n: HTMLElement) => n.remove());
    if (!document.getElementById("docHtmlStyle")) {
      const st = document.createElement("style");
      st.id = "docHtmlStyle";
      st.textContent = `.doc-html-inner h1{font-size:24px}.doc-html-inner h2{font-size:20px}.doc-html-inner table{border-collapse:collapse;width:100%}.doc-html-inner td,.doc-html-inner th{border:1px solid #cbd5e1;padding:6px 10px}.doc-html-inner img{max-width:100%}`;
      document.head.appendChild(st);
    }
    const box = document.createElement("div");
    box.className = "doc-html"; box.id = "docHtmlBox";
    box.innerHTML = `<div class="doc-html-inner">${inner}</div>`;
    const cv = document.createElement("canvas");
    cv.className = "annot";
    (this.$("#docScroll") as HTMLElement).appendChild(box);
    if (!annot) { this.htmlAnnot = null; requestAnimationFrame(() => this.applyHtmlZoom()); return; }
    box.appendChild(cv);
    this.htmlAnnot = { box, cv, ctx: cv.getContext("2d")! };
    requestAnimationFrame(() => { this.sizeHtmlAnnot(); this.applyHtmlZoom(); });
    const ro = new ResizeObserver(() => this.sizeHtmlAnnot());
    ro.observe(box.querySelector(".doc-html-inner") as HTMLElement);
    this.cleanups.push(() => ro.disconnect());
    const img = box.querySelector("img");
    if (img) img.onload = () => this.sizeHtmlAnnot();
    this.wireAnnotCanvas(cv, 1, null, () => this.docZoom);
  }

  private sizeHtmlAnnot() {
    if (!this.htmlAnnot) return;
    const inner = this.htmlAnnot.box.querySelector(".doc-html-inner") as HTMLElement;
    const w = inner.offsetWidth, h = inner.offsetHeight;
    if (!w || !h) return;
    this.htmlAnnot.cv.width = w; this.htmlAnnot.cv.height = h;
    this.htmlAnnot.cv.style.width = w + "px"; this.htmlAnnot.cv.style.height = h + "px";
    this.redrawHtmlAnnot();
  }

  private redrawHtmlAnnot() {
    if (!this.htmlAnnot) return;
    const ctx = this.htmlAnnot.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.htmlAnnot.cv.width, this.htmlAnnot.cv.height);
    this.docStore(1).objects.forEach((o) => drawObject(ctx, o));
    if (this.annotDraft && this.annotDraft.page === 1) drawObject(ctx, this.annotDraft.obj);
    if (this.docErasePreview && this.docErasePreview.page === 1 && this.docErasePreview.pts.length > 1) {
      const d = this.docErasePreview.pts;
      ctx.save();
      ctx.beginPath(); ctx.moveTo(d[0].x, d[0].y);
      for (let i = 1; i < d.length; i++) ctx.lineTo(d[i].x, d[i].y);
      ctx.closePath();
      ctx.globalAlpha = 0.12; ctx.fillStyle = "#dc2626"; ctx.setLineDash([]); ctx.fill();
      ctx.globalAlpha = 1; ctx.setLineDash([7, 5]); ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
    }
    if (this.selected && this.selected.surface === "doc") {
      const b = bbox(this.selected.obj);
      ctx.save(); ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2;
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12); ctx.restore();
    }
  }

  private webSrc(url: string): string {
    try { const u = new URL(url); if (/edurev\.in$/i.test(u.hostname)) return "/api/web-proxy?url=" + encodeURIComponent(url); } catch { /* direct frame */ }
    return url;
  }
  private applyHtmlZoom() {
    /* CSS zoom re-rasterizes the whole iframe every step (the EduRev lag).
       transform:scale is compositor-only; the iframe is re-sized once per
       finished step so text stays crisp. */
    const box = this.$("#docHtmlBox") as HTMLElement | null;
    if (!box) return;
    const z = this.docZoom;
    const st = box.style as unknown as Record<string, string>;
    st.transition = "transform .12s ease-out";
    st.transformOrigin = "0 0";
    st.transform = z === 1 ? "" : `scale(${z})`;
    st.width = z === 1 ? "" : `${100 / z}%`;
    const ifr = box.querySelector("iframe");
    if (ifr) {
      ifr.style.width = z === 1 ? "100%" : `${100 / z}%`;
      ifr.style.height = z === 1 ? "calc(100vh - 230px)" : `calc((100vh - 230px) / ${z})`;
    }
  }

  private updatePgLabel() {
    this.$("#pgLbl").textContent = this.totalPages ? `${this.currentPage} / ${this.totalPages}`: "– / –";
  }

  private wireDocPinch() {
    const sc = this.$("#docScroll") as HTMLElement;
    const pts = new Map<number, { x: number; y: number }>();
    let pinch: { d: number; z: number } | null = null;
    this.on(sc, "pointerdown", (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: this.docZoom };
      }
    });
    this.on(sc, "pointermove", (e: PointerEvent) => {
      if (!pts.has(e.pointerId) || !pinch) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.d > 0) this.setZoom(pinch.z * (d / pinch.d));
      e.preventDefault();
    });
    const end = (e: PointerEvent) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
    this.on(sc, "pointerup", end); this.on(sc, "pointercancel", end);
    this.on(sc, "wheel", (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      this.setZoom(this.docZoom * (e.deltaY < 0 ? 1.1 : 0.9));
    }, { passive: false } as AddEventListenerOptions);
  }
  private webZoomT = 0;
  private setZoom(z: number) {
    this.docZoom = Math.min(3, Math.max(0.5, Math.round(z * 10) / 10));
    this.$("#zoomLbl").textContent = Math.round(this.docZoom * 100) + "%";
    if (this.doc?.kind === "pdf") { this.pages.forEach((p) => (p.dirty = true)); this.renderVisiblePages(); }
    else { clearTimeout(this.webZoomT); this.webZoomT = window.setTimeout(() => this.applyHtmlZoom(), 120); }
  }

  /* ==========================================================================
     TOOLBAR / LAYOUT / DIVIDER
     ========================================================================== */
  /* ---------- tool flyouts: pen / highlighter / eraser / shape style ---------- */
  private loadTools() {
    try {
      const j = JSON.parse(localStorage.getItem(TOOLS_KEY) || "{}");
      if (["ball", "marker", "ink", "text", "shape"].includes(j.penKind)) this.penKind = j.penKind;
      if (typeof j.color === "string") this.color = j.color;
      if (typeof j.size === "number") this.size = Math.min(40, Math.max(1, j.size));
      if (Array.isArray(j.customColors)) this.customColors = j.customColors.filter((c: unknown) => typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c as string)).slice(0, 8);
      if (typeof j.hlColor === "string") this.hlColor = j.hlColor;
      if (typeof j.hlSize === "number") this.hlSize = Math.min(60, Math.max(8, j.hlSize));
      if (j.eraserMode === "stroke" || j.eraserMode === "pixel" || j.eraserMode === "area") this.eraserMode = j.eraserMode;
      if (typeof j.eraserSize === "number") this.eraserSize = Math.min(140, Math.max(6, j.eraserSize));
      if (typeof j.fill === "boolean") this.fill = j.fill;
      if (typeof j.dashed === "boolean") this.dashed = j.dashed;
    } catch { /* fresh device */ }
  }
  private saveTools() {
    try {
      localStorage.setItem(TOOLS_KEY, JSON.stringify({
        penKind: this.penKind, color: this.color, size: this.size, customColors: this.customColors,
        hlColor: this.hlColor, hlSize: this.hlSize, eraserMode: this.eraserMode, eraserSize: this.eraserSize,
        fill: this.fill, dashed: this.dashed,
      }));
    } catch { /* private mode */ }
  }
  private pushCustomColor(c: string) {
    this.customColors = [c, ...this.customColors.filter((x) => x !== c)].slice(0, 8);
  }
  private swBtn(c: string, on: boolean, cb: (c: string) => void, small?: boolean) {
    const b = document.createElement("button");
    b.className = "sw" + (on ? " on" : "") + (small ? " sm" : "");
    b.style.background = c; b.title = c;
    b.onclick = () => cb(c);
    return b;
  }
  private buildToolPops() {
    this.$all(".tp-x").forEach((b: HTMLElement) => (b.onclick = (e: Event) => { e.stopPropagation(); this.hidePops(); }));
    /* PEN */
    this.$all("#penKindSeg button").forEach((b: HTMLElement) => (b.onclick = () => {
      this.penKind = ((b as HTMLButtonElement).dataset.kind as "ball" | "marker" | "ink" | "text" | "shape") || "ball";
      if (this.penKind === "text") fetch("/api/ocr", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ warm: true }) }).catch(() => { /* offline ok */ });
      this.syncPenPop(); this.saveTools();
    }));
    const cg = this.$("#penColorGrid") as HTMLElement | null;
    if (cg) PEN_COLORS.forEach((c) => cg.appendChild(this.swBtn(c, c === this.color, (cc) => { this.color = cc; this.syncPenPop(); this.saveTools(); })));
    const cust = this.$("#penCustom") as HTMLInputElement | null;
    if (cust) cust.oninput = () => { this.color = cust.value; this.pushCustomColor(cust.value); this.syncPenPop(); this.saveTools(); };
    const hex = this.$("#penHex") as HTMLInputElement | null;
    if (hex) hex.onchange = () => {
      const v = hex.value.trim().toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(v)) { this.color = v; this.pushCustomColor(v); this.syncPenPop(); this.saveTools(); }
      else hex.value = this.color;
    };
    this.$all("#penSizes button").forEach((b: HTMLElement) => (b.onclick = () => { this.size = +((b as HTMLButtonElement).dataset.s || 4); this.syncPenPop(); this.saveTools(); }));
    const rng = this.$("#penSizeRange") as HTMLInputElement | null;
    if (rng) rng.oninput = () => { this.size = +rng.value; this.syncPenPop(); this.saveTools(); };
    /* HIGHLIGHTER */
    const hg = this.$("#hlColorGrid") as HTMLElement | null;
    if (hg) HL_COLORS.forEach((c) => hg.appendChild(this.swBtn(c, c === this.hlColor, (cc) => { this.hlColor = cc; this.syncHlPop(); this.saveTools(); })));
    this.$all("#hlSizes button").forEach((b: HTMLElement) => (b.onclick = () => { this.hlSize = +((b as HTMLButtonElement).dataset.s || 24); this.syncHlPop(); this.saveTools(); }));
    /* ERASER */
    this.$all("#eraserModeSeg button").forEach((b: HTMLElement) => (b.onclick = () => {
      this.eraserMode = ((b as HTMLButtonElement).dataset.mode as "stroke" | "pixel" | "area") || "stroke";
      this.syncEraserPop(); this.updateBrushRing(); this.saveTools();
    }));
    this.$all("#eraserSizes button").forEach((b: HTMLElement) => (b.onclick = () => { this.eraserSize = +((b as HTMLButtonElement).dataset.s || 28); this.syncEraserPop(); this.updateBrushRing(); this.saveTools(); }));
    /* SHAPE style (inside the shape menu) */
    const sg = this.$("#shapeColorGrid") as HTMLElement | null;
    if (sg) COLORS.slice(0, 10).forEach((c) => sg.appendChild(this.swBtn(c, c === this.color, (cc) => { this.color = cc; this.syncPenPop(); this.syncShapeStyle(); this.saveTools(); })));
    this.syncPenPop(); this.syncHlPop(); this.syncEraserPop(); this.syncShapeStyle();
  }
  /* ---------- TEXT PEN: handwriting -> typed text via server OCR ---------- */
  private registerTextPenStroke(o: BoardObject, surface: "board" | "doc", page: number | null) {
    if (!this.textPenPending || this.textPenPending.surface !== surface || this.textPenPending.page !== page) this.textPenPending = { surface, page, strokes: [] };
    this.textPenPending.strokes.push(o);
    if (this.textPenT) clearTimeout(this.textPenT);
    this.textPenT = setTimeout(() => { this.textPenT = null; this.convertTextPen(); }, 1400);
  }
  /* render just these strokes, black on white, upscaled — the best input for OCR */
  private strokesToDataUrl(strokes: BoardObject[]): string | null {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    strokes.forEach((o) => (o.points || []).forEach((p) => { x1 = Math.min(x1, p.x); y1 = Math.min(y1, p.y); x2 = Math.max(x2, p.x); y2 = Math.max(y2, p.y); }));
    if (!isFinite(x1) || x2 - x1 < 4) return null;
    const pad = 20, w = x2 - x1, h = Math.max(y2 - y1, 14); /* flat single-line writing still gets a usable canvas */
    const scale = Math.min(4, Math.max(1.6, 140 / Math.max(h, 10)));
    const cv = document.createElement("canvas");
    cv.width = Math.round((w + pad * 2) * scale);
    cv.height = Math.round((h + pad * 2) * scale);
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.scale(scale, scale); ctx.translate(pad - x1, pad - y1);
    ctx.strokeStyle = "#000"; ctx.fillStyle = "#000";
    ctx.lineWidth = Math.max(3, h * 0.055);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    strokes.forEach((o) => {
      const p = o.points || [];
      if (!p.length) return;
      if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0].x, p[0].y, ctx.lineWidth / 2, 0, 7); ctx.fill(); }
      else { pathSmooth(ctx, p); ctx.stroke(); }
    });
    return cv.toDataURL("image/png");
  }
  private async convertTextPen() {
    const pend = this.textPenPending;
    if (!pend || this.destroyed) return;
    if (this.ocrBusy) { this.textPenT = setTimeout(() => { this.textPenT = null; this.convertTextPen(); }, 700); return; }
    this.textPenPending = null;
    if (this.textPenT) { clearTimeout(this.textPenT); this.textPenT = null; }
    const store = pend.surface === "board" ? this.boardStore : this.docStore(pend.page || 1);
    const strokes = pend.strokes.filter((st) => store.objects.includes(st));
    if (!strokes.length) return;
    const img = this.strokesToDataUrl(strokes);
    if (!img) return;
    this.ocrBusy = true;
    this.toast("Reading your writing…");
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 20000);
      const res = await fetch("/api/ocr", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ img }), signal: ctl.signal });
      clearTimeout(to);
      const j = await res.json();
      const text = String(j.text || "").replace(/[ \t]+/g, " ").trim();
      if (!text) { this.toast("Could not read it — try writing bigger and clearer"); return; }
      let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
      strokes.forEach((o) => (o.points || []).forEach((p) => { x1 = Math.min(x1, p.x); y1 = Math.min(y1, p.y); x2 = Math.max(x2, p.x); y2 = Math.max(y2, p.y); }));
      const lines = text.split("\n").filter((l) => l.trim());
      const fontSize = Math.min(110, Math.max(16, Math.round((y2 - y1) / Math.max(lines.length, 1))));
      store.pushHistory(); /* undo brings the handwriting back */
      strokes.forEach((st) => { const i = store.objects.indexOf(st); if (i >= 0) store.objects.splice(i, 1); });
      store.objects.push({ id: uid(), type: "text", text, x: x1, y: y1 + fontSize * 0.92, fontSize, color: strokes[0].color || "#111827", opacity: 100 });
      if (pend.surface === "board") this.renderBoard(); else this.refreshAnnot(pend.page || 1);
      this.scheduleSave();
      this.toast("Recognised: " + text.split("\n")[0].slice(0, 30));
    } catch {
      this.toast("Text service not reachable — your writing stays as it is");
    } finally {
      this.ocrBusy = false;
    }
  }

  private syncPenPop() {
    this.$all("#penKindSeg button").forEach((b: HTMLElement) => b.classList.toggle("on", (b as HTMLButtonElement).dataset.kind === this.penKind));
    const kh = this.$("#penKindHint") as HTMLElement | null;
    if (kh) kh.textContent = ({
      ball: "Ballpoint — smooth everyday pen, fast and clean.",
      marker: "Marker — broad tip, softly translucent. Great over PDFs.",
      ink: "Ink — calligraphy: slow = thick, fast = thin. Stylus pressure works too.",
      text: "Text pen — write by hand and it becomes typed computer text (English letters & numbers). Write big and clear, then lift the pen for a moment.",
      shape: "Shape pen — draw a rough circle, square, triangle or line and it snaps into a perfect shape.",
    } as Record<string, string>)[this.penKind] || "";
    this.$all("#penColorGrid .sw").forEach((x: HTMLElement) => x.classList.toggle("on", (x as HTMLButtonElement).title === this.color));
    const cust = this.$("#penCustom") as HTMLInputElement | null;
    if (cust) cust.value = this.color;
    const hex = this.$("#penHex") as HTMLInputElement | null;
    if (hex) hex.value = this.color;
    const rng = this.$("#penSizeRange") as HTMLInputElement | null;
    if (rng) rng.value = String(this.size);
    const lbl = this.$("#penSizeVal") as HTMLElement | null;
    if (lbl) lbl.textContent = String(this.size);
    this.$all("#penSizes button").forEach((b: HTMLElement) => b.classList.toggle("on", +((b as HTMLButtonElement).dataset.s || 0) === this.size));
    const ss = this.$("#shapeSize") as HTMLInputElement | null;
    if (ss) ss.value = String(this.size);
    const dot = this.$("#penColorDot") as HTMLElement | null;
    if (dot) dot.style.background = this.color;
    const rec = this.$("#penRecents") as HTMLElement | null;
    if (rec) {
      rec.innerHTML = "";
      rec.style.display = this.customColors.length ? "flex" : "none";
      this.customColors.forEach((c) => rec.appendChild(this.swBtn(c, c === this.color, (cc) => { this.color = cc; this.syncPenPop(); this.saveTools(); }, true)));
    }
    this.drawToolPreview("#penPreview", this.penKind === "marker" ? Math.max(Math.round(this.size * 2.2), 8) : this.size, this.color, this.penKind);
  }
  private syncHlPop() {
    this.$all("#hlColorGrid .sw").forEach((x: HTMLElement) => x.classList.toggle("on", (x as HTMLButtonElement).title === this.hlColor));
    this.$all("#hlSizes button").forEach((b: HTMLElement) => b.classList.toggle("on", +((b as HTMLButtonElement).dataset.s || 0) === this.hlSize));
    this.drawToolPreview("#hlPreview", this.hlSize, this.hlColor, "highlighter");
  }
  private syncEraserPop() {
    this.$all("#eraserModeSeg button").forEach((b: HTMLElement) => b.classList.toggle("on", (b as HTMLButtonElement).dataset.mode === this.eraserMode));
    this.$all("#eraserSizes button").forEach((b: HTMLElement) => b.classList.toggle("on", +((b as HTMLButtonElement).dataset.s || 0) === this.eraserSize));
    const hints: Record<string, string> = {
      stroke: "Tap or rub over any stroke, shape, text or note — the whole object is deleted in one tap. Bigger size = easier tapping.",
      pixel: "Rub like a real eraser — only the part you touch is erased. Works on the board and on PDF pages.",
      area: "Lasso — draw any loop (circle, square, any shape). Everything fully inside the loop is erased in one go.",
    };
    const h = this.$("#eraserHint") as HTMLElement | null;
    if (h) h.textContent = hints[this.eraserMode] || "";
  }
  private syncShapeStyle() {
    this.$all("#shapeColorGrid .sw").forEach((x: HTMLElement) => x.classList.toggle("on", (x as HTMLButtonElement).title === this.color));
    const fc = this.$("#fillChk") as HTMLInputElement | null;
    if (fc) fc.checked = this.fill;
    const dc = this.$("#dashChk") as HTMLInputElement | null;
    if (dc) dc.checked = this.dashed;
    const ss = this.$("#shapeSize") as HTMLInputElement | null;
    if (ss) ss.value = String(this.size);
  }
  private drawToolPreview(sel: string, size: number, color: string, kind: string) {
    const cv = this.$(sel) as HTMLCanvasElement | null;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    const pts: { x: number; y: number }[] = [];
    const w = cv.width, h = cv.height;
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      pts.push({ x: 12 + t * (w - 24), y: h / 2 + Math.sin(t * Math.PI * 2) * Math.max(2, h / 2 - Math.max(size, 10) / 2 - 5) });
    }
    drawObject(ctx, { id: "preview", type: "stroke", tool: kind === "highlighter" ? "highlighter" : "pen", kind: kind === "highlighter" ? undefined : kind, points: pts, color, size, opacity: 100 });
    /* preview uses its own seed so grain looks stable while switching kinds */
  }

  private buildMathSyms() {
    const symBox = this.$("#mathSyms") as HTMLElement;
    const textSyms = this.$("#textSyms") as HTMLElement;
    MATHS.forEach((m) => {
      const b1 = document.createElement("button"); b1.textContent = m;
      b1.onclick = () => this.insertMathSymbol(m);
      symBox.appendChild(b1);
      const b2 = document.createElement("button"); b2.textContent = m;
      b2.onclick = () => { const t = this.$("#textInput") as HTMLTextAreaElement; t.value += m; t.focus(); };
      textSyms.appendChild(b2);
    });
  }

  private buildStickyColors() {
    const tcols = ["#141414", "#1a73e8", "#b3261e", "#188038", "#7c3aed", "#b45309"];
    const tbox = this.$("#textColors") as HTMLElement | null;
    if (tbox) {
      tbox.innerHTML = tcols.map((c) => `<button class="sw${c === this.textColor ? " on" : ""}" data-c="${c}" style="background:${c}" title="${c}"></button>`).join("");
      tbox.querySelectorAll(".sw").forEach((b) => (b as HTMLElement).onclick = () => {
        this.textColor = (b as HTMLElement).dataset.c!;
        tbox.querySelectorAll(".sw").forEach((x) => x.classList.remove("on"));
        (b as HTMLElement).classList.add("on");
      });
    }
    const box = this.$("#stickyColors") as HTMLElement;
    STICKY_COLORS.forEach((c) => {
      const b = document.createElement("button");
      b.className = "sw" + (c === this.stickyColor ? " on" : "");
      b.style.background = c;
      b.onclick = () => {
        this.stickyColor = c;
        this.$all("#stickyColors .sw").forEach((x: HTMLElement) => x.classList.remove("on"));
        b.classList.add("on");
      };
      box.appendChild(b);
    });
  }

  /* ---- advanced selection: multi via marquee, resize handles, floating bar ---- */
  private selObjs(): BoardObject[] {
    if (this.selMulti && this.selMulti.length) return this.selMulti;
    if (this.selected && this.selected.surface === "board") return [this.selected.obj];
    return [];
  }
  private selBounds(): BBox {
    const objs = this.selObjs();
    if (!objs.length) return { x: 0, y: 0, w: 0, h: 0 };
    let b = bbox(objs[0]);
    for (let i = 1; i < objs.length; i++) {
      const q = bbox(objs[i]);
      const x = Math.min(b.x, q.x), y = Math.min(b.y, q.y);
      b = { x, y, w: Math.max(b.x + b.w, q.x + q.w) - x, h: Math.max(b.y + b.h, q.y + q.h) - y };
    }
    return b;
  }
  private selCorners(b: BBox) {
    const r = { x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 };
    return [
      { x: r.x, y: r.y, ax: r.x + r.w, ay: r.y + r.h },
      { x: r.x + r.w, y: r.y, ax: r.x, ay: r.y + r.h },
      { x: r.x, y: r.y + r.h, ax: r.x + r.w, ay: r.y },
      { x: r.x + r.w, y: r.y + r.h, ax: r.x, ay: r.y },
    ];
  }
  /* fixed canvas like a physical whiteboard: zoom never below fit(100%),
     pan never beyond the board edges */
  private clampView() {
    this.boardZoom = Math.min(6, Math.max(1, this.boardZoom));
    const W = this.boardW, H = this.boardH, z = this.boardZoom;
    this.boardPan.x = Math.min(0, Math.max(W * (1 - z), this.boardPan.x));
    this.boardPan.y = Math.min(0, Math.max(H * (1 - z), this.boardPan.y));
  }
  private rotHandle(b: BBox, z: number) { return { x: b.x + b.w / 2, y: b.y - 6 - 26 / z }; }
  private syncSelBar() {
    const bar = this.$("#selBar") as HTMLElement | null; if (!bar) return;
    const objs = this.selObjs();
    if (!objs.length || this.tool !== "select" || this.marquee || this.resizeSel || this.rotateSel) { bar.style.display = "none"; return; }
    const pb = this.$("#paneBoard") as HTMLElement | null; if (!pb) { bar.style.display = "none"; return; }
    const b = this.selBounds(); const z = this.boardZoom;
    let ox = 0, oy = 0; let n: HTMLElement | null = this.boardCanvas;
    while (n && n !== pb) { ox += n.offsetLeft; oy += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
    const left = Math.max(6, Math.min(ox + b.x * z + this.boardPan.x, pb.clientWidth - 150));
    let top = oy + b.y * z + this.boardPan.y - 46;
    if (top < 6) top = oy + (b.y + b.h) * z + this.boardPan.y + 12;
    bar.style.display = "flex"; bar.style.left = left + "px"; bar.style.top = top + "px";
  }
  private setTool(t: string) {
    if (this.textPenPending || this.textPenT) { /* switching tools finishes the text-pen conversion right away */
      if (this.textPenT) { clearTimeout(this.textPenT); this.textPenT = null; }
      this.convertTextPen();
    }
    this.tool = t;
    this.$all(".tool[data-tool]").forEach((b: HTMLElement) => b.classList.toggle("on", b.dataset.tool === t));
    (this.$("#toolShapes") as HTMLElement).classList.toggle("on", !["select", "pan", "pen", "highlighter", "eraser", "text", "sticky"].includes(t));
    this.boardCanvas.style.cursor = t === "pan" ? "grab" : t === "select" ? "default" : "crosshair";
    if (t !== "select") {
      /* selection outlines must vanish the moment another tool is chosen */
      if (this.selected || this.selMulti || this.marquee || this.resizeSel) {
        this.selected = null; this.selMulti = null; this.marquee = null; this.resizeSel = null; this.rotateSel = null;
        this.renderBoard();
        try { this.refreshAnnot(this.currentPage); } catch { /* noop */ }
      }
      const bar = this.$("#selBar") as HTMLElement | null; if (bar) bar.style.display = "none";
    }
    this.hidePops();
    this.updateBrushRing();
  }

  private hidePops() {
    ["#shapePop", "#mathPop", "#penPop", "#hlPop", "#eraserPop", "#menuPop"].forEach((s) => {
      const el = this.$(s) as HTMLElement | null;
      if (el) el.classList.remove("show");
    });
  }

  /* flyout opens right next to its tool button — never at the top of the screen */
  private showToolPop(t: string, btn: HTMLElement) {
    const id = t === "pen" ? "#penPop" : t === "highlighter" ? "#hlPop" : "#eraserPop";
    const pop = this.$(id) as HTMLElement | null;
    if (!pop) return;
    this.hidePops();
    pop.classList.add("show");
    const r = btn.getBoundingClientRect();
    const pw = pop.offsetWidth || 264, ph = pop.offsetHeight || 320;
    if (r.top > window.innerHeight * 0.5) {
      /* bottom dock — flyout opens ABOVE the button, centered on it */
      pop.style.left = Math.max(8, Math.min(r.left + r.width / 2 - pw / 2, window.innerWidth - pw - 8)) + "px";
      pop.style.top = Math.max(8, r.top - ph - 10) + "px";
    } else if (window.matchMedia("(max-width:900px)").matches) {
      pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - pw - 8)) + "px";
      pop.style.top = r.bottom + 8 + "px";
    } else {
      pop.style.left = r.right + 8 + "px";
      pop.style.top = Math.min(Math.max(8, r.top - 24), Math.max(8, window.innerHeight - ph - 8)) + "px";
    }
  }

  private updateBrushRing() {
    const ring = this.brushRing || (this.brushRing = this.root.querySelector("#brushRing") as HTMLElement | null);
    if (!ring) return;
    const show = this.tool === "eraser" && this.eraserMode === "pixel";
    ring.style.display = show ? "block" : "none";
    ring.style.width = ring.style.height = this.eraserSize + "px";
  }

  private paintShapeGrid() {
    this.$all("#shapeGrid button").forEach((b: HTMLElement) => b.classList.toggle("on", (b as HTMLButtonElement).dataset.shape === this.shape));
  }

  private insertMathSymbol(m: string) {
    this.boardStore.pushHistory();
    const cx = (this.boardW / 2 - this.boardPan.x) / this.boardZoom;
    const cy = (this.boardH / 2 - this.boardPan.y) / this.boardZoom;
    this.boardStore.objects.push({ id: uid(), type: "text", text: m, x: cx, y: cy, fontSize: 54, color: this.color, opacity: 100 });
    this.renderBoard(); this.scheduleSave(); this.setActive("board", null);
  }

  private wireToolbar() {
    this.$all(".tool[data-tool]").forEach((b: HTMLElement) => (b.onclick = () => {
      const t = (b as HTMLButtonElement).dataset.tool || "pen";
      const popId = t === "pen" ? "#penPop" : t === "highlighter" ? "#hlPop" : t === "eraser" ? "#eraserPop" : null;
      const wasOpen = !!popId && !!(this.$(popId) as HTMLElement | null)?.classList.contains("show");
      this.setTool(t);
      if (popId && !wasOpen) this.showToolPop(t, b);
    }));
    /* pixel-eraser brush ring follows the pointer on the board */
    this.brushRing = this.root.querySelector("#brushRing") as HTMLElement | null;
    this.on(this.boardScroll, "pointermove", (e: PointerEvent) => {
      const ring = this.brushRing;
      if (!ring || ring.style.display === "none") return;
      const r = this.boardScroll.getBoundingClientRect();
      ring.style.left = e.clientX - r.left + "px";
      ring.style.top = e.clientY - r.top + "px";
    });
    this.on(this.boardScroll, "pointerleave", () => { if (this.brushRing) this.brushRing.style.display = "none"; });
    this.on(this.boardScroll, "pointerenter", () => this.updateBrushRing());
    this.$("#toolShapes").onclick = (e: MouseEvent) => {
      e.stopPropagation();
      const r = (this.$("#toolShapes") as HTMLElement).getBoundingClientRect();
      const pop = this.$("#shapePop") as HTMLElement;
      if (r.top > window.innerHeight * 0.5) {
        pop.style.left = Math.max(8, Math.min(r.left + r.width / 2 - (pop.offsetWidth || 300) / 2, window.innerWidth - (pop.offsetWidth || 300) - 8)) + "px";
        pop.style.top = Math.max(8, r.top - (pop.offsetHeight || 340) - 10) + "px";
      } else {
        pop.style.left = r.right + 8 + "px";
        pop.style.top = Math.min(r.top, window.innerHeight - 320) + "px";
      }
      pop.classList.toggle("show");
      (this.$("#mathPop") as HTMLElement).classList.remove("show");
      this.paintShapeGrid();
      this.syncShapeStyle();
    };
    this.$("#shapeGrid").onclick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest("button") as HTMLButtonElement | null;
      if (!b) return;
      this.shape = b.dataset.shape || "rect";
      this.setTool("shape"); this.paintShapeGrid();
      (this.$("#shapePop") as HTMLElement).classList.remove("show");
      (this.$("#toolShapes") as HTMLElement).classList.add("on");
      this.toast("Shape: " + this.shape + " — drag to draw");
    };
    this.on(document, "click", (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".pop") && !t.closest("#toolShapes") && !t.closest("#toolMath") && !t.closest(".sb-dock") && !t.closest(".sb-side") && !t.closest("#btnMenu")) this.hidePops();
    });
    this.$("#toolMath").onclick = (e: MouseEvent) => {
      e.stopPropagation();
      const r = (this.$("#toolMath") as HTMLElement).getBoundingClientRect();
      const pop = this.$("#mathPop") as HTMLElement;
      if (r.top > window.innerHeight * 0.5) {
        pop.style.left = Math.max(8, Math.min(r.left + r.width / 2 - (pop.offsetWidth || 340) / 2, window.innerWidth - (pop.offsetWidth || 340) - 8)) + "px";
        pop.style.top = Math.max(8, r.top - (pop.offsetHeight || 300) - 10) + "px";
      } else {
        pop.style.left = r.right + 8 + "px";
        pop.style.top = Math.max(8, Math.min(r.top - 120, window.innerHeight - 380)) + "px";
      }
      pop.classList.toggle("show");
      (this.$("#shapePop") as HTMLElement).classList.remove("show");
    };
    const menuBtn = this.$("#btnMenu") as HTMLElement | null;
    if (menuBtn) menuBtn.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      this.hidePops();
      const p = this.$("#menuPop") as HTMLElement;
      const r = menuBtn.getBoundingClientRect();
      p.classList.toggle("show");
      if (p.classList.contains("show")) {
        p.style.left = Math.max(8, Math.min(r.left, window.innerWidth - (p.offsetWidth || 280) - 8)) + "px";
        p.style.top = Math.max(8, r.top - (p.offsetHeight || 220) - 10) + "px";
      }
    };
    const menuPop = this.$("#menuPop") as HTMLElement | null;
    if (menuPop) menuPop.onclick = () => setTimeout(() => menuPop.classList.remove("show"), 80);
    this.$("#btnGraph").onclick = () => { this.hidePops(); this.openModal("mGraph"); setTimeout(() => this.drawGraphPreview(), 50); };

    this.$("#toolClear").onclick = () => {
      const isBoard = this.active.kind !== "doc";
      if (!confirm(isBoard ? "Delete all whiteboard work?" : `Delete all drawings on page ${this.active.page}?`)) return;
      const st = this.activeStore();
      st.pushHistory(); st.objects = [];
      this.editingObj = null; this.selected = null;
      if (isBoard) this.renderBoard(); else this.refreshAnnot(this.active.page || 1);
      this.scheduleSave(); this.toast("Cleared");
    };

    this.$("#btnUndo").onclick = () => this.doUndo();
    this.$("#btnRedo").onclick = () => this.doRedo();
    const selAct = (id: string, fn: () => void) => { const b = this.$(id); if (b) b.onclick = (ev: MouseEvent) => { ev.stopPropagation(); fn(); }; };
    selAct("#selDup", () => {
      const objs = this.selObjs(); if (!objs.length) return; this.boardStore.pushHistory();
      const clones = objs.map((o) => { const c = cloneObj(o); moveObject(c, 16, 16); return c; });
      this.boardStore.objects.push(...clones);
      this.selMulti = clones.length > 1 ? clones : null;
      this.selected = clones.length === 1 ? { surface: "board", obj: clones[0] } : null;
      this.renderBoard(); this.scheduleSave();
    });
    selAct("#selDel", () => {
      const objs = this.selObjs(); if (!objs.length) return; this.boardStore.pushHistory();
      this.boardStore.objects = this.boardStore.objects.filter((o) => !objs.includes(o));
      this.selected = null; this.selMulti = null; this.renderBoard(); this.scheduleSave();
    });
    selAct("#selFront", () => {
      const objs = this.selObjs(); if (!objs.length) return; this.boardStore.pushHistory();
      this.boardStore.objects = this.boardStore.objects.filter((o) => !objs.includes(o)).concat(objs);
      this.renderBoard(); this.scheduleSave();
    });
    selAct("#selBack", () => {
      const objs = this.selObjs(); if (!objs.length) return; this.boardStore.pushHistory();
      this.boardStore.objects = objs.concat(this.boardStore.objects.filter((o) => !objs.includes(o)));
      this.renderBoard(); this.scheduleSave();
    });

    (this.$("#fillChk") as HTMLInputElement).onchange = (e: Event) => { this.fill = (e.target as HTMLInputElement).checked; this.saveTools(); };
    (this.$("#dashChk") as HTMLInputElement).onchange = (e: Event) => { this.dashed = (e.target as HTMLInputElement).checked; this.saveTools(); };
    (this.$("#shapeSize") as HTMLInputElement).oninput = (e: Event) => { this.size = +(e.target as HTMLInputElement).value; this.syncPenPop(); this.saveTools(); };
    (this.$("#bgSelect") as HTMLSelectElement).onchange = (e: Event) => {
      this.bg = (e.target as HTMLSelectElement).value as BgKind;
      const def: Record<string, string> = { white: "#ffffff", black: "#0d1526", grid: "#ffffff", graph: "#ffffff", ruled: "#fffef5", dotted: "#ffffff" };
      this.bgColor = def[this.bg] || "#ffffff"; this.syncBgSwatches(); this.saveBgPrefs();
      this.renderBoard(); this.scheduleSave();
    };
    const gIn = this.$("#gridSize") as HTMLInputElement | null;
    if (gIn) gIn.oninput = () => { this.gridScale = Math.min(2, Math.max(0.5, (+gIn.value || 100) / 100)); this.saveBgPrefs(); this.syncBgSwatches(); this.renderBoard(); };
    const cr = this.$("#btnCanvasReset") as HTMLElement | null;
    if (cr) cr.onclick = () => { this.boardZoom = 1; this.boardPan = { x: 0, y: 0 }; this.clampView(); this.renderBoard(); this.toast("Canvas view reset"); };
    this.wireBgSwatches(); this.syncBgSwatches();

    this.$all("#layoutGroup .sb-btn").forEach((b: HTMLElement) => (b.onclick = () => this.setLayout((b as HTMLButtonElement).dataset.layout as "doc" | "split" | "board")));

    /* divider */
    const div = this.$("#divider") as HTMLElement;
    const docPane = this.$("#paneDoc") as HTMLElement;
    const boardPane = this.$("#paneBoard") as HTMLElement;
    let drag = false; let dragRaf = 0;
    this.on(div, "pointerdown", (e: PointerEvent) => { drag = true; (document.querySelector(".sb-root") as HTMLElement).classList.add("sb-dragging"); try { div.setPointerCapture(e.pointerId); } catch { /* noop */ } });
    this.on(div, "pointermove", (e: PointerEvent) => {
      if (!drag || dragRaf) return;
      const x = e.clientX;
      dragRaf = requestAnimationFrame(() => {
        dragRaf = 0;
        const r = (this.$(".sb-work") as HTMLElement).getBoundingClientRect();
        const d = Math.min(0.85, Math.max(0.15, (x - r.left) / r.width));
        docPane.style.flex = d.toFixed(3); boardPane.style.flex = (1 - d).toFixed(3);
      });
    });
    this.on(div, "pointerup", () => { drag = false; (document.querySelector(".sb-root") as HTMLElement).classList.remove("sb-dragging"); this.sizeBoard(); if (this.doc?.kind === "pdf") this.computeFit(); });

    this.$("#btnFull").onclick = async () => {
      const el = document.documentElement as unknown as { requestFullscreen?: () => Promise<void>; webkitRequestFullscreen?: () => void };
      const so = screen.orientation as unknown as { type?: string; lock?: (o: string) => Promise<void>; unlock?: () => void };
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          so.unlock?.();
          this.toast("Fullscreen off");
          return;
        }
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else { this.toast("Fullscreen not supported on this browser"); return; }
        /* stay in the orientation the teacher is holding — no sensor flip */
        if (so.type) so.lock?.(so.type).catch(() => undefined);
        this.toast("Fullscreen on");
      } catch { this.toast("Fullscreen blocked by browser"); }
    };
    const btnLat = this.$("#btnLatency"); if (btnLat) btnLat.onclick = () => this.toggleLatency();
    const latHud = this.$("#latencyHud"); if (latHud) this.latencyEl = latHud as HTMLElement;
    const btnRec = this.$("#btnRec"); if (btnRec) btnRec.onclick = () => { void this.toggleRec(); };
    const btnRecStop = this.$("#btnRecStop"); if (btnRecStop) btnRecStop.onclick = () => { void this.toggleRec(); };
    const btnRecs = this.$("#btnRecordings"); if (btnRecs) btnRecs.onclick = () => { void this.openRecordings(); };
    const btnRecClose = this.$("#btnRecClose"); if (btnRecClose) btnRecClose.onclick = () => this.closeModal(this.$("#mRecordings") as HTMLElement);
    const mExport = this.$("#mExport"); if (mExport) mExport.onclick = () => (this.$("#btnExport") as HTMLElement).click();
    const mClear = this.$("#mClear"); if (mClear) mClear.onclick = () => (this.$("#toolClear") as HTMLElement).click();
    const mAddPage = this.$("#mAddPage"); if (mAddPage) mAddPage.onclick = () => (this.$("#btnBoardAdd") as HTMLElement).click();
    const btnSignIn = this.$("#btnSignIn"); if (btnSignIn) btnSignIn.onclick = () => { void signInWithGoogle().then((r) => this.toast(r.message)); };
    const btnSignOut = this.$("#btnSignOut"); if (btnSignOut) btnSignOut.onclick = () => { void signOutAdmin().then(() => this.toast("Signed out")); };
    this.on(window, "sb-rec-saved", () => {
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = 0; }
      const pill = this.$("#recPill") as HTMLElement | null; if (pill) pill.hidden = true;
      this.toast("Recording saved — MENU > CLIPS");
    });
    this.startAdminWatch();
    this.$("#btnSave").onclick = () => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(this.collectSession())); this.toast("Saved"); }
      catch { this.toast("Save failed — the board has large images"); }
    };
    this.$("#btnWidgets").onclick = () => { this.openModal("mClass"); this.renderAttendance(); this.wireFunOnce(); };
    this.$("#btnExport").onclick = () => this.openModal("mExport");
  }

  private saveBgPrefs() {
    try { localStorage.setItem("sb-bg-prefs", JSON.stringify({ bg: this.bg, color: this.bgColor, grid: Math.round(this.gridScale * 100) })); } catch { /* private mode */ }
  }
  private wireBgSwatches() {
    const cols = ["#ffffff", "#fffef5", "#eef4ff", "#eefaf0", "#fff0f3", "#f5f0ff", "#0d1526"];
    const box = this.$("#bgColors") as HTMLElement | null;
    if (!box) return;
    box.innerHTML = cols.map((c) => `<button class="sw${c === (this.bgColor || "#ffffff") ? " on" : ""}" data-c="${c}" style="background:${c};border:1px solid #d7dde6" title="${c}"></button>`).join("") +
      `<input type="color" value="${this.bgColor || "#ffffff"}" title="Custom background color" style="width:30px;height:30px;border:1px solid #d7dde6;border-radius:8px;padding:0;background:#fff;cursor:pointer" />`;
    box.querySelectorAll(".sw").forEach((b) => (b as HTMLElement).onclick = () => {
      this.bgColor = (b as HTMLElement).dataset.c!; this.syncBgSwatches(); this.saveBgPrefs(); this.renderBoard();
    });
    const inp = box.querySelector("input") as HTMLInputElement;
    if (inp) inp.onchange = () => { this.bgColor = inp.value; this.syncBgSwatches(); this.saveBgPrefs(); this.renderBoard(); };
  }
  private syncBgSwatches() {
    this.$all("#bgColors .sw").forEach((x) => x.classList.toggle("on", (x as HTMLElement).dataset.c === this.bgColor));
    const g = this.$("#gridSize") as HTMLInputElement | null;
    if (g) { g.value = String(Math.round(this.gridScale * 100)); const v = this.$("#gridVal"); if (v) v.textContent = Math.round(this.gridScale * 100) + "%"; }
  }

  /* ---------- whiteboard pages ---------- */
  private updateBoardPgLabel() {
    const el = this.$("#boardPgLbl") as HTMLElement | null;
    if (el) el.textContent = `Board ${this.boardPage + 1}/${this.boardPages.length}`;
  }
  private gotoBoardPage(i: number) {
    const n = Math.min(this.boardPages.length - 1, Math.max(0, i));
    if (n === this.boardPage) { this.updateBoardPgLabel(); return; }
    this.boardPage = n;
    this.selected = null; this.boardDraft = null;
    this.setActive("board", null);
    this.renderBoard(); this.updateBoardPgLabel(); this.scheduleSave();
  }
  private addBoardPage() {
    if (this.boardPages.length >= 50) { this.toast("Too many pages (max 50)"); return; }
    this.boardPages.push(new Store());
    this.gotoBoardPage(this.boardPages.length - 1);
    this.toast(`Board page ${this.boardPage + 1}`);
  }
  private dupBoardPage() {
    if (this.boardPages.length >= 50) { this.toast("Too many pages (max 50)"); return; }
    const clone = new Store();
    try { clone.objects = JSON.parse(JSON.stringify(this.boardStore.objects)); } catch { clone.objects = []; }
    this.boardPages.splice(this.boardPage + 1, 0, clone);
    this.gotoBoardPage(this.boardPage + 1);
    this.toast(`Duplicated as page ${this.boardPage + 1}`);
  }
  private delBoardPage() {
    if (this.boardPages.length <= 1) { this.toast("At least one board page is needed"); return; }
    this.boardPages.splice(this.boardPage, 1);
    this.gotoBoardPage(this.boardPage);
    this.toast(`Page removed (${this.boardPages.length} left)`);
  }
  private wirePages() {
    this.$("#btnBoardPrev").onclick = () => this.gotoBoardPage(this.boardPage - 1);
    this.$("#btnBoardNext").onclick = () => this.gotoBoardPage(this.boardPage + 1);
    this.$("#btnBoardAdd").onclick = () => this.addBoardPage();
    const dup = this.$("#btnBoardDup"); if (dup) dup.onclick = () => this.dupBoardPage();
    const del = this.$("#btnBoardDel"); if (del) del.onclick = () => this.delBoardPage();
    this.updateBoardPgLabel();
  }

  private setLayout(l: "doc" | "split" | "board") {
    this.layout = l;
    this.root.dataset.layout = l;
    /* file-only layout revives the whiteboard tools ON the file (pen/eraser/etc
       annotate the doc); split/board keep the doc view-only */
    this.docReadOnly = l !== "doc";
    this.$all("#docScroll canvas.annot").forEach((c: HTMLElement) => { c.style.display = this.docReadOnly ? "none" : ""; });
    this.$all("#layoutGroup .sb-btn").forEach((b: HTMLElement) => b.classList.toggle("on", (b as HTMLButtonElement).dataset.layout === l));
    /* Divider drags write inline flex ratios; layout CSS must win again or the
       surviving pane freezes at its previous split width (the 50% lock bug). */
    (this.$("#paneDoc") as HTMLElement).style.flex = "";
    (this.$("#paneBoard") as HTMLElement).style.flex = "";
    /* Two measurement passes: immediately, and after the browser finishes the
       flex reflow — the canvas buffer must absorb the new viewport bounds. */
    requestAnimationFrame(() => { if (!this.destroyed) { this.sizeBoard(); if (this.doc?.kind === "pdf") this.computeFit(); if (!this.docReadOnly) this.refreshAnnot(this.currentPage); } });
    setTimeout(() => { if (!this.destroyed) { this.sizeBoard(); if (this.doc?.kind === "pdf") this.computeFit(); } }, 250);
  }

  private doUndo() {
    const st = this.activeStore();
    if (st.doUndo()) {
      this.selected = null;
      if (this.active.kind === "doc") this.refreshAnnot(this.active.page || 1); else this.renderBoard();
      this.scheduleSave();
    } else this.toast("Nothing to undo");
  }
  private doRedo() {
    const st = this.activeStore();
    if (st.doRedo()) {
      this.selected = null;
      if (this.active.kind === "doc") this.refreshAnnot(this.active.page || 1); else this.renderBoard();
      this.scheduleSave();
    } else this.toast("Nothing to redo");
  }

  /* ==================== Replay / Spotlight / Fun ==================== */
  private openReplay() {
    this.stopReplay();
    const n = this.boardStore.objects.length;
    const slider = this.$("#replaySlider") as HTMLInputElement;
    slider.max = String(n); slider.value = String(n);
    this.replayN = n; this.updateReplayPos(); this.renderBoard();
    this.openModal("mReplay");
  }
  private updateReplayPos() {
    (this.$("#replayPos") as HTMLElement).textContent = `${this.replayN ?? 0} / ${this.boardStore.objects.length}`;
  }
  private stopReplayTimer() { if (this.replayTimer) { clearInterval(this.replayTimer); this.replayTimer = null; } }
  private stopReplay() {
    this.stopReplayTimer();
    const btn = this.$("#replayPlay") as HTMLElement | null;
    if (btn) btn.textContent = "Play";
    if (this.replayN !== null) { this.replayN = null; this.renderBoard(); }
  }
  private wireFunOnce() {
    if (this.funWired) return; this.funWired = true;
    this.$("#btnDice").onclick = () => {
      let t = 0;
      const iv = setInterval(() => {
        t++;
        (this.$("#die1") as HTMLElement).textContent = String(1 + Math.floor(Math.random() * 6));
        (this.$("#die2") as HTMLElement).textContent = String(1 + Math.floor(Math.random() * 6));
        if (t > 12) {
          clearInterval(iv); confettiBurst(this.root);
          this.toast(`Dice: ${(this.$("#die1") as HTMLElement).textContent} + ${(this.$("#die2") as HTMLElement).textContent}`);
        }
      }, 65);
    };
    this.$("#btnSpin").onclick = () => this.spinWheel();
    let sa = +(localStorage.getItem("sb.score.a") || 0), sb = +(localStorage.getItem("sb.score.b") || 0);
    const paint = () => {
      (this.$("#scA") as HTMLElement).textContent = String(sa);
      (this.$("#scB") as HTMLElement).textContent = String(sb);
    };
    const keep = () => { localStorage.setItem("sb.score.a", String(sa)); localStorage.setItem("sb.score.b", String(sb)); };
    this.$("#scAplus").onclick = () => { sa++; keep(); paint(); };
    this.$("#scAminus").onclick = () => { sa--; keep(); paint(); };
    this.$("#scBplus").onclick = () => { sb++; keep(); paint(); };
    this.$("#scBminus").onclick = () => { sb--; keep(); paint(); };
    this.$("#scReset").onclick = () => { sa = 0; sb = 0; keep(); paint(); };
    paint();
  }
  private spinWheel() {
    const cv = this.$("#spinCanvas") as HTMLCanvasElement;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const raw = (this.$("#pickerList") as HTMLTextAreaElement).value.split("\n").map((s) => s.trim()).filter(Boolean);
    const names = raw.length ? raw : ["1", "2", "3", "4", "5", "6"];
    const n = names.length, cx = 120, cy = 120, R = 112, seg = (Math.PI * 2) / n;
    const draw = (rot: number, hi: number) => {
      ctx.clearRect(0, 0, 240, 240);
      for (let i = 0; i < n; i++) {
        const a0 = rot + i * seg, a1 = rot + (i + 1) * seg;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath();
        ctx.fillStyle = i % 2 ? "#f1f4f9" : "#ffffff"; ctx.fill();
        ctx.strokeStyle = "#e5e7eb"; ctx.stroke();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate((a0 + a1) / 2);
        ctx.fillStyle = "#141414"; ctx.font = "700 13px Inter, system-ui, sans-serif"; ctx.textAlign = "right";
        ctx.fillText(names[i].slice(0, 14), R - 12, 5); ctx.restore();
      }
      if (hi >= 0) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, rot + hi * seg, rot + (hi + 1) * seg); ctx.closePath();
        ctx.fillStyle = "rgba(26,115,232,.25)"; ctx.fill();
      }
      ctx.beginPath(); ctx.moveTo(cx, cy - R - 2); ctx.lineTo(cx - 10, cy - R - 20); ctx.lineTo(cx + 10, cy - R - 20); ctx.closePath();
      ctx.fillStyle = "#1a73e8"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = "#141414"; ctx.fill();
    };
    draw(0, -1);
    const rot0 = Math.random() * Math.PI * 2;
    const total = 5 + Math.random() * 3, dur = 3200, t0 = performance.now();
    const anim = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      const r = rot0 + total * Math.PI * 2 * ease;
      draw(r, -1);
      if (p < 1) requestAnimationFrame(anim);
      else {
        let norm = (-Math.PI / 2 - r) % (Math.PI * 2); if (norm < 0) norm += Math.PI * 2;
        const idx = Math.floor(norm / seg) % n;
        draw(r, idx); confettiBurst(this.root); this.toast(`Spinner: ${names[idx]}`);
      }
    };
    requestAnimationFrame(anim);
  }

  /* ==========================================================================
     MODALS
     ========================================================================== */
  private syncTextModal(o: { color?: string; weight?: number; fontSize?: number }) {
    const bold = this.$("#textBold") as HTMLInputElement | null;
    if (bold) bold.checked = (o.weight || 700) !== 500;
    if (o.color) {
      this.textColor = o.color;
      this.$all("#textColors .sw").forEach((x) => x.classList.toggle("on", (x as HTMLElement).dataset.c === o.color));
    }
  }
  private openModal(id: string) { (this.$("#" + id) as HTMLElement).classList.add("show"); }
  private closeModal(el: HTMLElement) { el.classList.remove("show"); }

  private wireModals() {
    this.$all("[data-close]").forEach((b: HTMLElement) => (b.onclick = () => this.closeModal(b.closest(".modal") as HTMLElement)));
    this.$all(".modal").forEach((m: HTMLElement) => this.on(m, "click", (e: MouseEvent) => { if (e.target === m) this.closeModal(m); }));

    /* text */
    this.$("#textOk").onclick = () => {
      const v = ((this.$("#textInput") as HTMLTextAreaElement).value || "").trim();
      if (!v) { this.toast("Write something first!"); return; }
      const fs = +(this.$("#textSize") as HTMLInputElement).value;
      if (this.editingObj) {
        this.editingObj.store.pushHistory();
        this.editingObj.obj.text = v; this.editingObj.obj.fontSize = fs;
        this.editingObj.obj.color = this.textColor; this.editingObj.obj.weight = (this.$("#textBold") as HTMLInputElement).checked ? 700 : 500;
        if (this.editingObj.surface === "doc") this.refreshAnnot(this.editingObj.page || 1); else this.renderBoard();
        this.editingObj = null;
      } else if (this.pendingAnchor) {
        const a = this.pendingAnchor;
        if (a.surface === "doc" && a.page) {
          const sc = this.doc?.kind === "pdf" ? this.pages.find((p) => p.num === a.page)?.scale || 1 : 1;
          const st = this.docStore(a.page); st.pushHistory();
          st.objects.push({ id: uid(), type: "text", text: v, x: a.x, y: a.y, fontSize: fs / sc, color: this.textColor, weight: (this.$("#textBold") as HTMLInputElement).checked ? 700 : 500, opacity: 100 });
          this.refreshAnnot(a.page);
        } else {
          this.boardStore.pushHistory();
          this.boardStore.objects.push({ id: uid(), type: "text", text: v, x: a.x, y: a.y, fontSize: fs / this.boardZoom, color: this.textColor, weight: (this.$("#textBold") as HTMLInputElement).checked ? 700 : 500, opacity: 100 });
          this.renderBoard();
        }
        this.pendingAnchor = null;
      }
      (this.$("#textInput") as HTMLTextAreaElement).value = "";
      this.closeModal(this.$("#mText"));
      this.scheduleSave();
    };

    /* sticky */
    this.$("#stickyOk").onclick = () => {
      const v = ((this.$("#stickyInput") as HTMLTextAreaElement).value || "").trim();
      if (!v) { this.toast("Note is empty!"); return; }
      if (this.editingObj) {
        this.editingObj.store.pushHistory();
        this.editingObj.obj.text = v; this.editingObj.obj.bg = this.stickyColor;
        if (this.editingObj.surface === "doc") this.refreshAnnot(this.editingObj.page || 1); else this.renderBoard();
        this.editingObj = null;
      } else if (this.pendingAnchor) {
        const a = this.pendingAnchor;
        if (a.surface === "doc" && a.page) {
          const sc = this.doc?.kind === "pdf" ? this.pages.find((p) => p.num === a.page)?.scale || 1 : 1;
          const st = this.docStore(a.page); st.pushHistory();
          st.objects.push({ id: uid(), type: "sticky", text: v, x: a.x, y: a.y, w: 230 / sc, bg: this.stickyColor, color: "#111", opacity: 100 });
          this.refreshAnnot(a.page);
        } else {
          this.boardStore.pushHistory();
          this.boardStore.objects.push({ id: uid(), type: "sticky", text: v, x: a.x, y: a.y, w: 230 / this.boardZoom, bg: this.stickyColor, color: "#111", opacity: 100 });
          this.renderBoard();
        }
        this.pendingAnchor = null;
      }
      (this.$("#stickyInput") as HTMLTextAreaElement).value = "";
      this.closeModal(this.$("#mSticky"));
      this.scheduleSave();
    };

    /* graph */
    this.$("#graphPlot").onclick = () => this.drawGraphPreview();
    this.on(this.$("#graphFn"), "keydown", (e: KeyboardEvent) => { if (e.key === "Enter") this.drawGraphPreview(); });
    this.$("#graphToBoard").onclick = () => {
      if (!this.drawGraphPreview()) return;
      const url = (this.$("#graphCanvas") as HTMLCanvasElement).toDataURL("image/png");
      const img = new Image();
      img.onload = () => {
        this.boardStore.pushHistory();
        const wWorld = 520, hWorld = 520 * (img.height / img.width);
        const cx = (this.boardW / 2 - this.boardPan.x) / this.boardZoom - wWorld / 2;
        const cy = (this.boardH / 2 - this.boardPan.y) / this.boardZoom - hWorld / 2;
        this.boardStore.objects.push({ id: uid(), type: "image", src: url, img, x: cx, y: cy, w: wWorld, h: hWorld, opacity: 100 });
        this.renderBoard(); this.scheduleSave();
        this.closeModal(this.$("#mGraph"));
        if (this.layout === "doc") this.setLayout("split");
        this.setActive("board", null);
        this.toast("Graph added to the board!");
      };
      img.src = url;
    };
  }

  private drawGraphPreview(): boolean {
    const cv = this.$("#graphCanvas") as HTMLCanvasElement;
    const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    const ox = W / 2, oy = H / 2, unit = 34;
    ctx.strokeStyle = "#0f172a14"; ctx.lineWidth = 1; ctx.beginPath();
    for (let x = ox % unit; x < W; x += unit) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = oy % unit; y < H; y += unit) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
    ctx.strokeStyle = "#475569"; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
    ctx.fillStyle = "#64748b"; ctx.font = "12px sans-serif";
    ctx.fillText("x", W - 14, oy - 8); ctx.fillText("y", ox + 8, 14); ctx.fillText("O", ox + 6, oy + 15);
    const expr = ((this.$("#graphFn") as HTMLInputElement).value || "").trim() || "x";
    let f: (x: number, m: typeof Math) => number;
    try { f = safeFn(expr); f(0, Math); }
    catch { ctx.fillStyle = "#f87171"; ctx.font = "15px sans-serif"; ctx.fillText("Could not parse function — e.g. x*x-4", 20, 30); return false; }
    ctx.strokeStyle = (this.$("#graphColor") as HTMLSelectElement).value;
    ctx.lineWidth = 3; ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 8;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= W; px += 2) {
      const x = (px - ox) / unit;
      let y: number;
      try { y = f(x, Math); } catch { started = false; continue; }
      if (typeof y !== "number" || !isFinite(y)) { started = false; continue; }
      const py = oy - y * unit;
      if (py < -H || py > 2 * H) { started = false; continue; }
      if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = "#111827"; ctx.font = "700 15px sans-serif";
    ctx.fillText("y = " + expr, 14, H - 14);
    return true;
  }

  /* ==========================================================================
     CLASS WIDGETS
     ========================================================================== */
  private beep() {
    try {
      const AC = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      const ac = new AC();
      [0, 0.25, 0.5].forEach((t, i) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.value = i === 2 ? 880 : 660; o.type = "sine";
        g.gain.setValueAtTime(0.001, ac.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.4, ac.currentTime + t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.22);
        o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 0.25);
      });
    } catch { /* noop */ }
  }
  private paintTimer() {
    const m = String(Math.floor(this.timerLeft / 60)).padStart(2, "0");
    const s = String(this.timerLeft % 60).padStart(2, "0");
    this.$("#timerFace").textContent = `${m}:${s}`;
  }
  private attNames(): string[] {
    return ((this.$("#pickerList") as HTMLTextAreaElement).value || "").split("\n").map((x: string) => x.trim()).filter(Boolean);
  }
  private renderAttendance() {
    const box = this.$("#attList") as HTMLElement;
    const names = this.attNames();
    box.innerHTML = names.length ? "" : `<p style="color:var(--sb-muted)">Add names in the Picker first — the same list appears here.</p>`;
    names.forEach((n) => {
      const lb = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = this.attendance[n] !== false;
      cb.onchange = () => { this.attendance[n] = cb.checked; this.paintAttCount(); this.scheduleSave(); };
      lb.appendChild(cb); lb.appendChild(document.createTextNode(n));
      box.appendChild(lb);
    });
    this.paintAttCount();
  }
  private paintAttCount() {
    const names = this.attNames(), p = names.filter((n) => this.attendance[n] !== false).length;
    (this.$("#attCount") as HTMLElement).textContent = names.length ? `Present: ${p}/${names.length} • Absent: ${names.length - p}`: "";
  }

  private wireWidgets() {
    const tabs: Record<string, string> = { tabTimer: "paneTimer", tabPicker: "panePicker", tabAtt: "paneAtt", tabFun: "paneFun" };
    Object.keys(tabs).forEach((id) => {
      this.$("#" + id).onclick = () => {
        Object.keys(tabs).forEach((k) => { (this.$("#" + k) as HTMLElement).classList.remove("on"); (this.$("#" + tabs[k]) as HTMLElement).style.display = "none"; });
        (this.$("#" + id) as HTMLElement).classList.add("on");
        (this.$("#" + tabs[id]) as HTMLElement).style.display = "block";
      };
    });
    this.paintTimer();
    this.$("#timerStart").onclick = () => {
      if (this.timerInt) { clearInterval(this.timerInt); this.timerInt = null; (this.$("#timerStart") as HTMLElement).textContent = "Resume"; return; }
      this.timerLeft = Math.max(5, (+(this.$("#timerMin") as HTMLInputElement).value || 5) * 60);
      this.paintTimer();
      (this.$("#timerStart") as HTMLElement).textContent = "Pause";
      this.timerInt = setInterval(() => {
        this.timerLeft--; this.paintTimer();
        if (this.timerLeft <= 0) {
          if (this.timerInt) clearInterval(this.timerInt);
          this.timerInt = null;
          (this.$("#timerStart") as HTMLElement).textContent = "Start";
          this.beep(); this.toast("Time's up!");
        }
      }, 1000);
    };
    this.$("#timerReset").onclick = () => {
      if (this.timerInt) clearInterval(this.timerInt);
      this.timerInt = null;
      (this.$("#timerStart") as HTMLElement).textContent = "Start";
      this.timerLeft = (+(this.$("#timerMin") as HTMLInputElement).value || 5) * 60;
      this.paintTimer();
    };
    this.$("#pickerGo").onclick = () => {
      const names = this.attNames();
      if (!names.length) { this.toast("Add names first!"); return; }
      let n = 0;
      const iv = setInterval(() => {
        (this.$("#pickerName") as HTMLElement).textContent = " " + names[Math.floor(Math.random() * names.length)];
        if (++n > 12) { clearInterval(iv); this.beep(); }
      }, 90);
      this.scheduleSave();
    };
    this.on(this.$("#pickerList"), "input", () => { this.renderAttendance(); this.scheduleSave(); });
    this.$("#attAll").onclick = () => { this.attNames().forEach((n) => (this.attendance[n] = true)); this.renderAttendance(); this.scheduleSave(); };
    this.$("#attNone").onclick = () => { this.attendance = {}; this.renderAttendance(); this.scheduleSave(); };
  }

  /* ==========================================================================
     EXPORT / SAVE / RESTORE
     ========================================================================== */
  private download(url: string, name: string) {
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  }
  private wireExport() {
    this.$("#exBoardPng").onclick = () => {
      const cv = document.createElement("canvas");
      cv.width = this.boardW; cv.height = this.boardH;
      const ctx = cv.getContext("2d")!;
      const bgc: Record<string, string> = { white: "#fff", black: "#0d1526", grid: "#fff", graph: "#fff", ruled: "#fffef5", dotted: "#fff" };
      setEraseSurface(this.surfaceColor());
      ctx.fillStyle = this.surfaceColor(); ctx.fillRect(0, 0, this.boardW, this.boardH);
      ctx.save();
      ctx.translate(this.boardPan.x, this.boardPan.y); ctx.scale(this.boardZoom, this.boardZoom);
      this.boardStore.objects.forEach((o) => drawObject(ctx, o));
      ctx.restore();
      this.download(cv.toDataURL("image/png"), "smart-board.png");
      this.toast("Board PNG downloaded");
    };
    this.$("#exPagePng").onclick = () => {
      if (!this.doc || this.doc.kind !== "pdf") { this.toast("Open a PDF first"); return; }
      const pg = this.pages.find((p) => p.num === this.currentPage);
      if (!pg || !pg.rendered) { this.toast("Page is still loading"); return; }
      const cv = document.createElement("canvas");
      cv.width = pg.base.width; cv.height = pg.base.height;
      const ctx = cv.getContext("2d")!;
      ctx.drawImage(pg.base, 0, 0); ctx.drawImage(pg.annot, 0, 0);
      this.download(cv.toDataURL("image/png"), `page-${this.currentPage}.png`);
      this.toast(`Page ${this.currentPage} PNG downloaded`);
    };
    this.$("#exJson").onclick = () => {
      const data = this.collectSession();
      this.download("data:application/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(data)), "smart-board-session.json");
      this.toast("Session downloaded");
    };
    this.$("#exImportBtn").onclick = () => (this.$("#exImport") as HTMLInputElement).click();
    this.$("#exImport").onchange = (e: Event) => {
      const inp = e.target as HTMLInputElement;
      const f = inp.files?.[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try { this.applySession(JSON.parse(String(rd.result))); this.toast("Session loaded!"); }
        catch { this.toast("Could not read the file"); }
      };
      rd.readAsText(f); inp.value = "";
    };
    this.$("#exPrint").onclick = () => window.print();
    this.$("#exWipe").onclick = () => {
      if (!confirm("EVERYTHING (board + PDF drawings + lists) will be deleted. Sure?")) return;
      this.boardPages = [new Store()]; this.boardPage = 0; this.updateBoardPgLabel();
      Object.keys(this.docStores).forEach((k) => delete this.docStores[k]);
      this.attendance = {}; (this.$("#pickerList") as HTMLTextAreaElement).value = "";
      localStorage.removeItem(LS_KEY);
      this.renderBoard();
      this.pages.forEach((p) => { if (p.rendered) this.redrawAnnot(p); });
      this.redrawHtmlAnnot();
      this.closeModal(this.$("#mExport"));
      this.toast("Everything deleted");
    };
  }

  private collectSession() {
    const strip = (o: BoardObject) => { const c: Record<string, unknown> = { ...o }; delete c.img; return c; };
    const docs: Record<string, Record<string, unknown[]>> = {};
    Object.keys(this.docStores).forEach((k) => {
      docs[k] = {};
      Object.keys(this.docStores[k]).forEach((p) => { docs[k][p] = this.docStores[k][Number(p)].objects.filter((o) => !(o.type === "stroke" && o.kind === "fade")).map(strip); });
    });
    return {
      v: 3, bg: this.bg, boards: this.boardPages.map((s) => s.objects.filter((o) => !(o.type === "stroke" && o.kind === "fade")).map(strip)), boardPage: this.boardPage, docs,
      names: (this.$("#pickerList") as HTMLTextAreaElement).value,
      attendance: this.attendance, timerMin: (this.$("#timerMin") as HTMLInputElement).value,
    };
  }
  private liveSyncOn = false;
  private lastCloudSync = 0;
  private wireLiveSync() {
    const chip = this.$("#liveChip") as HTMLElement | null;
    const apply = (on: boolean) => {
      this.liveSyncOn = on;
      if (chip) chip.style.display = on ? "inline-flex" : "none";
    };
    apply(!!(window as any).__sbLive);
    window.addEventListener("sb-live", ((e: CustomEvent) => apply(!!e.detail?.authorized)) as EventListener);
  }
  /* Secure conditional auto-save: only teacher-authorized sessions may write to
     the public classwork archive (server re-verifies the flag as well). */
  private maybeCloudSync() {
    if (!this.liveSyncOn) return;
    const now = Date.now();
    if (now - this.lastCloudSync < 5_000) return; /* near-instant: 5s after last commit */
    this.lastCloudSync = now;
    try {
      const dev = localStorage.getItem("sb-device-uuid") || "";
      const png = this.boardCanvas.toDataURL("image/png");
      void fsUpsertClasswork(dev ? dev.slice(0, 8) : "board", png);
    } catch { /* canvas tainted or storage blocked */ }
  }
  private scheduleSave() {
    this.dirtySave = true;
    if (this.saveT) clearTimeout(this.saveT);
    this.saveT = setTimeout(() => {
      this.saveT = null;
      const run = () => {
        try { localStorage.setItem(LS_KEY, JSON.stringify(this.collectSession())); this.dirtySave = false; } catch { /* quota full */ }
        this.maybeCloudSync();
      };
      /* stringify off the interaction path — never stutters a stroke */
      if (typeof (window as any).requestIdleCallback === "function") (window as any).requestIdleCallback(run, { timeout: 2000 });
      else run();
    }, 1400);
  }
  private flushSave() {
    if (!this.dirtySave) return;
    if (this.saveT) { clearTimeout(this.saveT); this.saveT = null; }
    try { localStorage.setItem(LS_KEY, JSON.stringify(this.collectSession())); this.dirtySave = false; } catch { /* quota full */ }
  }
  private applySession(d: any) {
    if (!d) return;
    if (d.bg) { this.bg = d.bg; (this.$("#bgSelect") as HTMLSelectElement).value = d.bg; }
    if (Array.isArray(d.boards) && d.boards.length) {
      this.boardPages = d.boards.map((arr: BoardObject[]) => { const st = new Store(); st.objects = rehydrate(arr || []); return st; });
      this.boardPage = Math.min(Math.max(0, d.boardPage || 0), this.boardPages.length - 1);
    } else {
      this.boardPages = [new Store()];
      this.boardPages[0].objects = rehydrate(d.board || []);
      this.boardPage = 0;
    }
    this.updateBoardPgLabel();
    Object.keys(d.docs || {}).forEach((k) => {
      this.docStores[k] = {};
      Object.keys(d.docs[k]).forEach((p) => {
        const st = new Store(); st.objects = rehydrate(d.docs[k][p]); this.docStores[k][Number(p)] = st;
      });
    });
    if (d.names !== undefined) (this.$("#pickerList") as HTMLTextAreaElement).value = d.names;
    this.attendance = d.attendance || {};
    if (d.timerMin) (this.$("#timerMin") as HTMLInputElement).value = d.timerMin;
    this.renderBoard();
    this.pages.forEach((p) => { if (p.rendered) this.redrawAnnot(p); });
    this.redrawHtmlAnnot(); this.renderAttendance(); this.paintTimer();
  }
  private restore() {
    try {
      const prev = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (!prev) return;
      this.applySession(prev);
      if (((prev.boards && prev.boards.some((a: unknown[]) => a && a.length)) || (prev.board && prev.board.length)) || prev.names) {
        setTimeout(() => { if (!this.destroyed) this.toast("Previous work restored!"); }, 600);
      }
    } catch { /* noop */ }
  }

  /* ==========================================================================
     KEYBOARD
     ========================================================================== */
  /* ---------- saved files (IndexedDB) — no re-uploading ---------- */
  private wireFiles() {
    const b = this.$("#btnFiles");
    if (b) b.onclick = () => { this.openModal("mFiles"); this.renderFiles(); };
  }

  private async renderFiles() {
    const list = this.$("#fileList") as HTMLElement | null;
    if (!list) return;
    const files = await listFiles();
    const note = this.$("#filesNote") as HTMLElement | null;
    if (note) note.textContent = files.length
      ? `${files.length} file(s) saved on this device — tap to open instantly`
      : "Files you open or upload are saved here automatically.";
    if (!files.length) {
      list.innerHTML = `<div class="up-empty">No saved files yet — open one from your device or phone.</div>`;
      return;
    }
    list.innerHTML = files.map((f) => {
      const ext = (f.name.split(".").pop() || "?").toUpperCase().slice(0, 4);
      return `<div class="fl-row" data-id="${this.esc(f.id)}">
        <span class="fl-ext">${this.esc(ext)}</span>
        <div class="fl-meta"><b title="${this.esc(f.name)}">${this.esc(f.name)}</b><span>${fmtSize(f.size)} · ${fmtWhen(f.openedAt)}</span></div>
        <button class="fl-del" data-del="${this.esc(f.id)}" title="Remove from saved files">✕</button>
      </div>`;
    }).join("");
    this.$all("#fileList .fl-row").forEach((row: HTMLElement) => {
      row.onclick = (e: MouseEvent) => {
        const del = (e.target as HTMLElement).closest("[data-del]");
        const id = (del as HTMLElement | null)?.dataset.del || row.dataset.id || "";
        if (del) { deleteFile(id).then(() => { this.renderFiles(); this.refreshEmpty(); }); }
        else this.openSaved(id);
      };
    });
  }

  private async openSaved(id: string) {
    const f = await getFile(id);
    if (!f) { this.toast("File not found — it may have been removed."); return; }
    this.closeModal(this.$("#mFiles") as HTMLElement);
    this.openFile(new File([f.blob], f.name, { type: f.type || "application/octet-stream" }));
    touchFile(id).catch(() => {});
  }

  /* recent files shown right inside the empty document pane */
  private async refreshEmpty() {
    if (this.doc) return;
    const em = this.$("#docEmpty") as HTMLElement | null;
    if (!em) return;
    const files = (await listFiles()).slice(0, 8);
    em.style.display = "block";
    em.innerHTML = `
      <div class="big">📂</div>
      <h2>Open a file — or pick a saved one</h2>
      <p>Tap <b>Saved files</b> on the left rail, or open from your device / phone.<br />
      Everything you open is kept on this device — no re-uploading.</p>
      <div class="fl-quick">
        <button id="emptyOpenBtn">📁 Open from device</button>
        <button id="emptyPhoneBtn">📱 Upload from phone</button>
      </div>
      ${files.length ? `<div class="fl-chips">${files.map((f) =>
        `<button class="fl-chip" data-id="${this.esc(f.id)}"><b>${this.esc(f.name)}</b><span>${fmtSize(f.size)}</span></button>`).join("")}</div>` : ""}`;
    (em.querySelector("#emptyOpenBtn") as HTMLElement | null)?.addEventListener("click", () =>
      (this.$("#fileInput") as HTMLInputElement).click());
    (em.querySelector("#emptyPhoneBtn") as HTMLElement | null)?.addEventListener("click", () => this.openUpload());
    this.$all("#docEmpty .fl-chip").forEach((c: HTMLElement) =>
      c.addEventListener("click", () => this.openSaved(c.dataset.id || "")));
  }


  /* ---------- external reference page (e.g. EduRev PYQs) + whiteboard ---------- */
  private openWeb(url: string, name: string) {
    if (!/^https:\/\//.test(url)) return;
    this.resetDocViewer(name, url, "web");
    this.mountHtmlDoc(
      `<div class="web-bar">
         <span>Source: ${this.esc(name)}</span>
         <a class="web-open" href="${this.esc(url)}" target="_blank" rel="noopener noreferrer">Open full page</a>
       </div>
       <iframe class="web-frame" src="${this.webSrc(url)}" title="${this.esc(name)}" loading="lazy"
          style="width:100%;height:calc(100vh - 230px);min-height:480px;border:0;border-radius:10px;background:#fff;display:block"></iframe>`,
      true
    );
    const inner = this.$("#docHtmlBox .doc-html-inner") as HTMLElement | null;
    if (inner) { inner.style.padding = "12px"; inner.style.lineHeight = "1.4"; }
    const box = this.$("#docHtmlBox") as HTMLElement | null;
    if (box) { box.style.width = "100%"; }
    if (this.layout === "board") this.setLayout("split");
  }
  /* ---------- phone upload via QR ---------- */
  private upSid = "";
  private upTimer: ReturnType<typeof setInterval> | null = null;
  private upSince = 0;
  private upAutoOpened = false;
  private upSeen = new Set<string>();

  private wireUpload() {
    this.$("#btnUpload").onclick = () => this.openUpload();
    this.$("#upDone").onclick = () => { this.stopUpPoll(); this.closeModal(this.$("#mUpload")); };
  }

  private stopUpPoll() {
    if (this.upTimer) { clearInterval(this.upTimer); this.upTimer = null; }
  }

  private async openUpload() {
    this.stopUpPoll();
    this.upSid = (window.crypto && "randomUUID" in window.crypto)
      ? window.crypto.randomUUID()
      : "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 14);
    this.upSince = 0; this.upAutoOpened = false; this.upSeen = new Set();
    const url = window.location.origin + "/upload/" + this.upSid;
    (this.$("#upUrl") as HTMLElement).textContent = url;
    (this.$("#upCode") as HTMLElement).textContent = "Code " + this.upSid.slice(0, 8).toUpperCase();
    (this.$("#upList") as HTMLElement).innerHTML = `<div class="up-empty">No files yet — upload from your phone.</div>`;
    (this.$("#upStatus") as HTMLElement).textContent = "Waiting for your phone…";
    try { await QRCode.toCanvas(this.$("#qrCanvas") as HTMLCanvasElement, url, { width: 220, margin: 1 }); }
    catch { /* URL text is still shown */ }
    this.openModal("mUpload");
    this.pollUpload();
    this.upTimer = setInterval(() => this.pollUpload(), 2000);
  }

  private fileUrl(id: string) { return `/api/board-file/${id}?session=${this.upSid}`; }

  private async pollUpload() {
    if (!this.upSid || this.destroyed) return;
    let files: { id: string; name: string; size: number; mime: string; time: number }[] = [];
    try {
      const r = await fetch(`/api/board-upload?session=${this.upSid}&since=${this.upSince}`);
      if (!r.ok) return;
      files = (await r.json()).files || [];
    } catch { return; }
    if (!files.length) return;
    this.upSince = Math.max(this.upSince, ...files.map((f) => f.time));
    const fresh = files.filter((f) => !this.upSeen.has(f.id));
    fresh.forEach((f) => this.upSeen.add(f.id));
    if (!fresh.length) return;
    const list = this.$("#upList") as HTMLElement;
    const empty = list.querySelector(".up-empty");
    if (empty) empty.remove();
    (this.$("#upStatus") as HTMLElement).textContent = `${this.upSeen.size} file(s) received`;
    fresh.forEach((f) => {
      const row = document.createElement("button");
      row.className = "up-file";
      row.innerHTML = `<b>${this.esc(f.name)}</b><span>${Math.max(1, Math.round(f.size / 1024))} KB — tap to open</span>`;
      row.onclick = () => this.openRemoteFile(this.fileUrl(f.id), f.name);
      list.prepend(row);
    });
    if (!this.upAutoOpened) {
      this.upAutoOpened = true;
      const f = fresh[fresh.length - 1];
      this.toast(`Received ${f.name} — opening!`);
      this.openRemoteFile(this.fileUrl(f.id), f.name);
    } else {
      this.toast(`${fresh.length} more file(s) received — tap to open`);
    }
  }

  /* ---------- screen shade (quiz mode) ---------- */
  private wireShade() {
    const shade = this.$("#shade") as HTMLElement;
    const handle = this.$("#shadeHandle") as HTMLElement;
    const work = this.$(".sb-work") as HTMLElement;
    const btn = this.$("#toolShade") as HTMLElement;
    btn.onclick = () => {
      const hidden = shade.style.display === "none" || !shade.style.display;
      if (hidden) { shade.style.display = "block"; shade.style.height = "100%"; btn.classList.add("on"); }
      else { shade.style.display = "none"; btn.classList.remove("on"); }
    };
    let drag = false;
    this.on(handle, "pointerdown", (e: PointerEvent) => { drag = true; try { handle.setPointerCapture(e.pointerId); } catch { /* noop */ } e.preventDefault(); });
    this.on(handle, "pointermove", (e: PointerEvent) => {
      if (!drag) return;
      const r = work.getBoundingClientRect();
      shade.style.height = Math.min(r.height, Math.max(70, e.clientY - r.top)) + "px";
    });
    this.on(handle, "pointerup", () => { drag = false; });
    this.on(shade, "dblclick", (e: Event) => {
      if ((e.target as HTMLElement).closest("#shadeHandle")) return;
      shade.style.display = "none"; btn.classList.remove("on");
    });
  }

  /* ---------- ruler + protractor overlays ---------- */
  private proAngle = 0;
  private wireMeasure() {
    this.buildRuler();
    this.buildProtractor();
    this.wireWidget("toolRuler", "ruler");
    this.wireWidget("toolProtractor", "protractor");
    const pro = this.$("#protractor") as HTMLElement;
    const applyPro = () => { pro.style.transform = `rotate(${this.proAngle}deg)`; };
    this.on(pro, "dblclick", () => { this.proAngle = (this.proAngle + 15) % 360; applyPro(); });
    this.on(pro, "wheel", (e: WheelEvent) => {
      e.preventDefault();
      const snap = (this.$("#proSnap") as HTMLInputElement | null)?.checked !== false;
      const d = snap ? 15 : 1;
      this.proAngle = (this.proAngle + (e.deltaY < 0 ? d : -d) + 360) % 360;
      const inp = this.$("#proAngleIn") as HTMLInputElement | null; if (inp) inp.value = String(this.proAngle);
      applyPro();
    }, { passive: false } as AddEventListenerOptions);
    const inp = this.$("#proAngleIn") as HTMLInputElement | null;
    if (inp) inp.onchange = () => { this.proAngle = ((+inp.value || 0) % 360 + 360) % 360; applyPro(); };
    /* ruler: wheel = rotate, drag right edge = resize */
    const ruler = this.$("#ruler") as HTMLElement;
    let rrot = 0;
    this.on(ruler, "wheel", (e: WheelEvent) => {
      e.preventDefault();
      rrot = (rrot + (e.deltaY < 0 ? 5 : -5) + 360) % 360;
      ruler.style.transform = `rotate(${rrot}deg)`;
    }, { passive: false } as AddEventListenerOptions);
    this.on(ruler, "pointerdown", (e: PointerEvent) => {
      const r = ruler.getBoundingClientRect();
      if (e.clientX < r.right - 26) return; /* body = move (handled by wireWidget) */
      e.stopPropagation();
      const sw = ruler.offsetWidth, sx = e.clientX;
      const mv = (ev: PointerEvent) => { ruler.style.width = Math.max(220, sw + ev.clientX - sx) + "px"; };
      const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
      window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
    });
  }
  private wireWidget(btnId: string, wId: string) {
    const btn = this.$("#" + btnId) as HTMLElement;
    const w = this.$("#" + wId) as HTMLElement;
    btn.onclick = () => {
      const on = !w.classList.contains("show");
      w.classList.toggle("show", on);
      btn.classList.toggle("on", on);
    };
    let drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
    this.on(w, "pointerdown", (e: PointerEvent) => {
      drag = true; sx = e.clientX; sy = e.clientY; ox = w.offsetLeft; oy = w.offsetTop;
      try { w.setPointerCapture(e.pointerId); } catch { /* noop */ }
      e.preventDefault();
    });
    this.on(w, "pointermove", (e: PointerEvent) => {
      if (!drag) return;
      w.style.left = ox + e.clientX - sx + "px";
      w.style.top = oy + e.clientY - sy + "px";
    });
    this.on(w, "pointerup", () => { drag = false; });
  }
  private buildRuler() {
    const ticks = this.$("#rulerTicks") as HTMLElement;
    const nums = this.$("#rulerNums") as HTMLElement;
    const px = 37.8;
    let t = "", n = "";
    for (let cm = 0; cm <= 15; cm++) {
      for (let mm = 0; mm < 10 && cm * 10 + mm <= 150; mm++) {
        const x = (cm * 10 + mm) * (px / 10);
        const tall = mm === 0;
        t += `<i style="left:${x.toFixed(1)}px;height:${tall ? 16 : mm === 5 ? 11 : 7}px"></i>`;
      }
      n += `<span style="left:${(cm * px).toFixed(1)}px">${cm}</span>`;
    }
    ticks.innerHTML = t; nums.innerHTML = n;
  }
  private buildProtractor() {
    const svg = this.$("#protractorSvg") as unknown as SVGSVGElement;
    const cx = 130, cy = 140, r = 118;
    const P = (deg: number, rr: number): [string, string] => {
      const a = (180 - deg) * (Math.PI / 180);
      return [(cx + rr * Math.cos(a)).toFixed(1), (cy - rr * Math.sin(a)).toFixed(1)];
    };
    let s = `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="rgba(99,102,241,.12)" stroke="#eef1ff" stroke-width="2"/>`;
    s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#eef1ff" stroke-width="2"/>`;
    for (let d = 0; d <= 180; d += 5) {
      const big = d % 15 === 0;
      const [x1, y1] = P(d, r), [x2, y2] = P(d, big ? r - 16 : r - 9);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${big ? "#facc15" : "#9aa6c7"}" stroke-width="${big ? 2.5 : 1}"/>`;
      if (big) {
        const [lx, ly] = P(d, r - 28);
        s += `<text x="${lx}" y="${ly}" fill="#eef1ff" font-size="11" font-weight="800" text-anchor="middle" dominant-baseline="middle">${d}</text>`;
      }
    }
    s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 14}" stroke="#f87171" stroke-width="3"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#f87171"/>`;
    svg.innerHTML = s;
  }

  /* ---------- image -> whiteboard ---------- */
  private addSendToBoard(src: string) {
    const box = this.$("#docHtmlBox") as HTMLElement | null;
    if (!box) return;
    box.querySelectorAll(".send-board").forEach((n) => n.remove());
    const b = document.createElement("button");
    b.className = "send-board";
    b.textContent = "Send to Board";
    b.onclick = (e: MouseEvent) => { e.stopPropagation(); this.placeImageOnBoard(src); };
    box.appendChild(b);
  }
  private placeImageOnBoard(src: string) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const rast = Math.min(1, 1600 / Math.max(img.width, img.height));
      const rw = Math.max(1, Math.round(img.width * rast)), rh = Math.max(1, Math.round(img.height * rast));
      const cv = document.createElement("canvas"); cv.width = rw; cv.height = rh;
      cv.getContext("2d")!.drawImage(img, 0, 0, rw, rh);
      let dataUrl = "";
      try { dataUrl = cv.toDataURL("image/jpeg", 0.85); }
      catch { this.toast("This image cannot be placed"); return; }
      const z = this.boardZoom;
      const vw = this.boardW / z, vh = this.boardH / z;
      const target = Math.min(vw, vh) * 0.7;
      const k = Math.min(target / Math.max(img.width, img.height), 1);
      const w = Math.max(20, Math.round(img.width * k)), h = Math.max(20, Math.round(img.height * k));
      const cxw = (this.boardW / 2 - this.boardPan.x) / z, cyw = (this.boardH / 2 - this.boardPan.y) / z;
      const o: BoardObject = { id: uid(), type: "image", src: dataUrl, x: Math.round(cxw - w / 2), y: Math.round(cyw - h / 2), w, h };
      const im = new Image(); im.src = dataUrl; o.img = im;
      im.onload = () => this.renderBoard();
      this.boardStore.pushHistory();
      this.boardStore.objects.push(o);
      if (this.layout === "doc") this.setLayout("split");
      this.setActive("board", null);
      this.renderBoard(); this.scheduleSave();
      this.toast("Image placed — use MOVE to drag it");
    };
    img.onerror = () => this.toast("Could not place the image");
    img.src = src;
  }

  private wireKeys() {
    this.on(window, "keydown", (e: KeyboardEvent) => {
      const tag = ((e.target as HTMLElement)?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.ctrlKey || e.metaKey) {
        const k = e.key.toLowerCase();
        if (k === "z" && !e.shiftKey) { e.preventDefault(); this.doUndo(); }
        else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); this.doRedo(); }
        else if (k === "s") { e.preventDefault(); (this.$("#btnSave") as HTMLElement).click(); }
        return;
      }
      const k = e.key.toLowerCase();
      const map: Record<string, string> = { v: "select", h: "pan", p: "pen", m: "highlighter", e: "eraser", t: "text", s: "sticky" };
      if (map[k]) { this.setTool(map[k]); return; }
      if (k === "l") { this.shape = "line"; this.setTool("shape"); this.paintShapeGrid(); }
      else if (k === "r") { this.shape = "rect"; this.setTool("shape"); this.paintShapeGrid(); }
      else if (k === "c") { this.shape = "circle"; this.setTool("shape"); this.paintShapeGrid(); }
      else if (k === "a") { this.shape = "arrow"; this.setTool("shape"); this.paintShapeGrid(); }
      else if (k === "f") (this.$("#btnFull") as HTMLElement).click();
      else if (k === "1") this.setLayout("doc");
      else if (k === "2") this.setLayout("split");
      else if (k === "3") this.setLayout("board");
      else if (e.key === "ArrowRight") (this.$("#pgNext") as HTMLElement).click();
      else if (e.key === "ArrowLeft") (this.$("#pgPrev") as HTMLElement).click();
      else if ((e.key === "Delete" || e.key === "Backspace") && (this.selMulti || this.selected)) {
        if (this.selMulti && this.selMulti.length) {
          this.boardStore.pushHistory();
          const ids = new Set(this.selMulti.map((o) => o.id));
          this.boardStore.objects = this.boardStore.objects.filter((o) => !ids.has(o.id));
          this.selMulti = null; this.renderBoard(); this.scheduleSave();
        } else {
          const st = this.selected!.surface === "doc" && this.selected!.page ? this.docStore(this.selected!.page) : this.boardStore;
          st.pushHistory();
          const id = this.selected!.obj.id;
          st.objects = st.objects.filter((o) => o.id !== id);
          this.selected = null;
          if (this.active.kind === "doc") this.refreshAnnot(this.active.page || 1); else this.renderBoard();
          this.scheduleSave();
        }
      }
      else if (e.key === "[") this.gotoBoardPage(this.boardPage - 1);
      else if (e.key === "]") this.gotoBoardPage(this.boardPage + 1);
      else if (e.key === "Escape") { this.$all(".modal.show").forEach((m: HTMLElement) => this.closeModal(m)); this.hidePops(); this.stopUpPoll(); this.stopReplay(); }
    });
  }
}
