/* ============================================================================
   SMART BOARD ENGINE v2 — TypeScript class, React-safe (mount/unmount clean).
   PDF (pdfjs-dist) • DOCX (mammoth) • TXT • Images • Split view • Shapes •
   Maths tools • Laser • Class widgets • Auto-save • Touch ready
   ========================================================================== */
import * as pdfjsLib from "pdfjs-dist";
import QRCode from "qrcode";

export interface EngineOpts { layout?: string; bg?: string; pdfUrl?: string; pdfName?: string }
export type BgKind = "white" | "black" | "grid" | "graph" | "ruled" | "dotted";

function uid(): string { return "o" + Math.random().toString(36).slice(2, 9); }

/* ---------- vector object model ---------- */
export interface BoardObject {
  id: string; type: "stroke" | "shape" | "text" | "sticky" | "image";
  tool?: string; points?: { x: number; y: number }[];
  shape?: string; x1?: number; y1?: number; x2?: number; y2?: number;
  x?: number; y?: number; w?: number; h?: number;
  text?: string; fontSize?: number; bg?: string; src?: string; img?: HTMLImageElement;
  color?: string; size?: number; opacity?: number; fill?: boolean; dashed?: boolean;
  _w?: number; _h?: number;
}

class Store {
  objects: BoardObject[] = [];
  undo: string[] = [];
  redo: string[] = [];
  private snap(): string {
    return JSON.stringify(this.objects.map((o) => { const c: Record<string, unknown> = { ...o }; delete c.img; return c; }));
  }
  pushHistory() { this.undo.push(this.snap()); if (this.undo.length > 60) this.undo.shift(); this.redo.length = 0; }
  doUndo(): boolean {
    if (!this.undo.length) return false;
    this.redo.push(this.snap());
    this.objects = rehydrate(JSON.parse(this.undo.pop() as string));
    return true;
  }
  doRedo(): boolean {
    if (!this.redo.length) return false;
    this.undo.push(this.snap());
    this.objects = rehydrate(JSON.parse(this.redo.pop() as string));
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
}
function drawObject(ctx: CanvasRenderingContext2D, o: BoardObject) {
  ctx.save();
  applyStyle(ctx, o);
  if (o.type === "stroke") {
    if (o.tool === "highlighter") ctx.globalAlpha = Math.min(ctx.globalAlpha, 0.45);
    const p = o.points || [];
    if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0].x, p[0].y, (o.size || 3) / 2, 0, 7); ctx.fill(); }
    else if (p.length > 1) {
      ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
      ctx.stroke();
    }
  }
  else if (o.type === "shape") drawShape(ctx, o);
  else if (o.type === "text") {
    ctx.font = `700 ${o.fontSize || 32}px ui-sans-serif,system-ui,"Noto Sans",Arial`;
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
function bbox(o: BoardObject): BBox {
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
function hitTest(objects: BoardObject[], x: number, y: number): { obj: BoardObject; idx: number } | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    const b = bbox(objects[i]);
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return { obj: objects[i], idx: i };
  }
  return null;
}
function moveObject(o: BoardObject, dx: number, dy: number) {
  if (o.type === "stroke") (o.points || []).forEach((p) => { p.x += dx; p.y += dy; });
  else if (o.type === "shape") { o.x1 = (o.x1 || 0) + dx; o.y1 = (o.y1 || 0) + dy; o.x2 = (o.x2 || 0) + dx; o.y2 = (o.y2 || 0) + dy; }
  else { o.x = (o.x || 0) + dx; o.y = (o.y || 0) + dy; }
}
function safeFn(expr: string): (x: number, m: typeof Math) => number {
  let e = " " + expr + " ";
  const map: Record<string, string> = { sin: "Math.sin", cos: "Math.cos", tan: "Math.tan", sqrt: "Math.sqrt", abs: "Math.abs", pow: "Math.pow", log: "Math.log", exp: "Math.exp", PI: "Math.PI", E: "Math.E", floor: "Math.floor", ceil: "Math.ceil" };
  Object.keys(map).forEach((k) => { e = e.replace(new RegExp("([^A-Za-z0-9_\\.])" + k + "(?![A-Za-z0-9_])", "g"), "$1" + map[k]); });
  return new Function("x", "Math", `return (${e})`) as (x: number, m: typeof Math) => number;
}

/* ==========================================================================
   ENGINE CLASS
   ========================================================================== */
interface PdfPage { num: number; wrap: HTMLElement; base: HTMLCanvasElement; annot: HTMLCanvasElement; actx: CanvasRenderingContext2D; rendered: boolean; dirty: boolean; rendering: boolean; scale: number }

const LS_KEY = "sb-session-v2";
const COLORS = ["#111827", "#ffffff", "#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#ec4899", "#facc15", "#14b8a6", "#92400e", "#6b7280"];
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
  private layout: "doc" | "split" | "board" = "split";
  private docZoom = 1; private boardZoom = 1; private boardPan = { x: 40, y: 40 };
  private bg: BgKind = "graph"; private textSize = 34; private stickyColor = "#fef08a";
  private active: { kind: "board" | "doc"; page: number | null } = { kind: "board", page: null };

  /* stores */
  private boardPages: Store[] = [new Store()];
  private boardPage = 0;
  private get boardStore(): Store { return this.boardPages[this.boardPage] || this.boardPages[0]; }
  private docStores: Record<string, Record<number, Store>> = {};
  private doc: { kind: "pdf" | "html" | "image" | "video" | "audio" | "file"; key: string; name: string } | null = null;

  /* pdf */
  private pdfDoc: any = null; private pages: PdfPage[] = [];
  private fitScale = 1.2; private currentPage = 1; private totalPages = 0;
  private pageObserver: IntersectionObserver | null = null;

  /* board canvas */
  private boardScroll!: HTMLElement; private boardCanvas!: HTMLCanvasElement; private bctx!: CanvasRenderingContext2D;
  private boardW = 800; private boardH = 600; private DPR = 1;
  private boardDraft: BoardObject | null = null;
  private selected: { surface: "board" | "doc"; page?: number; obj: BoardObject } | null = null;
  private dragSel: any = null; private pinch: { d: number; z: number } | null = null;
  private pointers = new Map<number, { x: number; y: number }>();

  /* annot */
  private annotDraft: { page: number; obj: BoardObject } | null = null;
  private htmlAnnot: { box: HTMLElement; cv: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null = null;
  private pendingAnchor: { surface: "board" | "doc"; page?: number; x: number; y: number } | null = null;
  private editingObj: { store: Store; obj: BoardObject; surface: "board" | "doc"; page?: number } | null = null;

  /* laser trail */
  private trail: { x: number; y: number; t: number }[] = [];
  private trailCv!: HTMLCanvasElement; private trailCtx!: CanvasRenderingContext2D;
  private laserDot!: HTMLElement;

  /* widgets */
  private timerInt: ReturnType<typeof setInterval> | null = null;
  private timerLeft = 300; private attendance: Record<string, boolean> = {};
  private saveT: ReturnType<typeof setTimeout> | null = null;
  private toastH: ReturnType<typeof setTimeout> | null = null;

  constructor(root: HTMLElement, opts: EngineOpts = {}) {
    this.root = root;
    if (opts.layout === "doc" || opts.layout === "split" || opts.layout === "board") this.layout = opts.layout;
    if (opts.bg && ["white", "black", "grid", "graph", "ruled", "dotted"].includes(opts.bg)) this.bg = opts.bg as BgKind;

    (pdfjsLib as any).GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    this.boardScroll = this.$("#boardScroll");
    this.boardCanvas = this.$("#boardCanvas");
    this.bctx = this.boardCanvas.getContext("2d")!;
    this.laserDot = this.$("#laser");
    this.trailCv = document.createElement("canvas");
    this.trailCv.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:149";
    document.body.appendChild(this.trailCv);
    this.trailCtx = this.trailCv.getContext("2d")!;
    this.cleanups.push(() => this.trailCv.remove());
    this.cleanups.push(() => this.stopUpPoll());

    this.buildSwatches();
    this.buildMathSyms();
    this.buildStickyColors();
    this.wireToolbar();
    this.wireBoard();
    this.wireDoc();
    this.wireLaser();
    this.wireModals();
    this.wireWidgets();
    this.wireExport();
    this.wirePages();
    this.wireUpload();
    this.wireShade();
    this.wireMeasure();
    this.wireKeys();
    this.restore();

    this.setLayout(this.layout);
    (this.$("#bgSelect") as HTMLSelectElement).value = this.bg;
    this.setTool("pen");
    this.sizeBoard();
    this.setActive("board", null);
    if (opts.pdfUrl) this.openPdfFromUrl(opts.pdfUrl, opts.pdfName || "NCERT chapter.pdf");
    this.sizeTrail();
    this.laserLoop();
    const ro = new ResizeObserver(() => this.sizeBoard());
    ro.observe(this.boardScroll);
    this.cleanups.push(() => ro.disconnect());

    let rzT: ReturnType<typeof setTimeout>;
    this.on(window, "resize", () => { this.sizeTrail(); clearTimeout(rzT); rzT = setTimeout(() => { if (this.doc?.kind === "pdf") this.computeFit(); }, 300); });
    this.on(window, "sb-board-dirty", () => this.renderBoard());
    if (!localStorage.getItem("sb-help-seen")) {
      setTimeout(() => { if (!this.destroyed) { this.openModal("mHelp"); localStorage.setItem("sb-help-seen", "1"); } }, 500);
    }
  }

  destroy() {
    this.destroyed = true;
    if (this.timerInt) clearInterval(this.timerInt);
    if (this.saveT) clearTimeout(this.saveT);
    if (this.toastH) clearTimeout(this.toastH);
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
    this.active = { kind, page };
    (this.$("#targetLbl") as HTMLElement).innerHTML = kind === "doc" ? `<span style="display:inline-block;width:8px;height:8px;border-radius:99px;background:#22c55e;margin-right:6px"></span>Page ${page}` : `<span style="display:inline-block;width:8px;height:8px;border-radius:99px;background:#a855f7;margin-right:6px"></span>Board`;
    this.$all(".pane-head").forEach((h: HTMLElement) => (h.style.boxShadow = ""));
    const head = this.$(kind === "doc" ? "#paneDoc .pane-head" : "#paneBoard .pane-head");
    if (head) head.style.boxShadow = "inset 0 -3px 0 var(--sb-accent)";
  }

  /* ==========================================================================
     WHITEBOARD
     ========================================================================== */
  private toWorld(cx: number, cy: number) {
    return { x: (cx - this.boardPan.x) / this.boardZoom, y: (cy - this.boardPan.y) / this.boardZoom };
  }
  private sizeBoard() {
    const r = this.boardScroll.getBoundingClientRect();
    this.boardW = Math.max(300, r.width); this.boardH = Math.max(300, r.height);
    this.DPR = Math.min(2, window.devicePixelRatio || 1);
    this.boardCanvas.width = this.boardW * this.DPR;
    this.boardCanvas.height = this.boardH * this.DPR;
    this.boardCanvas.style.width = this.boardW + "px";
    this.boardCanvas.style.height = this.boardH + "px";
    this.renderBoard();
  }
  private renderBoard() {
    if (this.destroyed) return;
    const z = this.boardZoom, px = this.boardPan.x, py = this.boardPan.y;
    const ctx = this.bctx;
    ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    const bgc: Record<string, string> = { white: "#ffffff", black: "#0d1526", grid: "#ffffff", graph: "#ffffff", ruled: "#fffef5", dotted: "#ffffff" };
    ctx.fillStyle = bgc[this.bg] || "#fff";
    ctx.fillRect(0, 0, this.boardW, this.boardH);
    this.drawBoardPattern(ctx, z, px, py);
    ctx.save();
    ctx.translate(px, py); ctx.scale(z, z);
    this.boardStore.objects.forEach((o) => drawObject(ctx, o));
    if (this.boardDraft) drawObject(ctx, this.boardDraft);
    ctx.restore();
    if (this.selected && this.selected.surface === "board") {
      const b = bbox(this.selected.obj);
      ctx.save();
      ctx.translate(px, py); ctx.scale(z, z);
      ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2 / z;
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
      ctx.restore();
    }
  }
  private drawBoardPattern(ctx: CanvasRenderingContext2D, z: number, px: number, py: number) {
    ctx.save(); ctx.lineWidth = 1;
    const step = (this.bg === "graph" ? 28 : this.bg === "grid" ? 44 : this.bg === "ruled" ? 36 : 30) * z;
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
    this.on(cv, "pointerdown", (e: PointerEvent) => {
      try { cv.setPointerCapture(e.pointerId); } catch { /* noop */ }
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const p = [...this.pointers.values()];
        this.pinch = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), z: this.boardZoom };
        this.boardDraft = null; return;
      }
      /* select-drag snapshot */
      if (this.tool === "select") {
        const r0 = cv.getBoundingClientRect();
        const w0 = this.toWorld(e.clientX - r0.left, e.clientY - r0.top);
        if (hitTest(this.boardStore.objects, w0.x, w0.y)) this.boardStore.pushHistory();
      }
      this.setActive("board", null);
      const r = cv.getBoundingClientRect();
      this.boardStroke(e, this.toWorld(e.clientX - r.left, e.clientY - r.top), "down");
    });
    this.on(cv, "pointermove", (e: PointerEvent) => {
      if (this.pinch && this.pointers.has(e.pointerId)) {
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const p = [...this.pointers.values()];
        const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        this.boardZoom = Math.min(4, Math.max(0.3, this.pinch.z * d / this.pinch.d));
        this.renderBoard(); return;
      }
      if (!this.pointers.has(e.pointerId)) return;
      const r = cv.getBoundingClientRect();
      this.boardStroke(e, this.toWorld(e.clientX - r.left, e.clientY - r.top), "move");
    });
    const up = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
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
      this.boardZoom = Math.min(4, Math.max(0.3, this.boardZoom * (e.deltaY < 0 ? 1.1 : 0.9)));
      this.boardPan.x = mx - before.x * this.boardZoom;
      this.boardPan.y = my - before.y * this.boardZoom;
      this.renderBoard();
    }, { passive: false });
    this.on(cv, "dblclick", (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const w = this.toWorld(e.clientX - r.left, e.clientY - r.top);
      const hit = hitTest(this.boardStore.objects, w.x, w.y);
      if (!hit) return;
      if (hit.obj.type === "text") { this.editingObj = { store: this.boardStore, obj: hit.obj, surface: "board" }; (this.$("#textInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mText"); }
      if (hit.obj.type === "sticky") { this.editingObj = { store: this.boardStore, obj: hit.obj, surface: "board" }; (this.$("#stickyInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mSticky"); }
    });
  }

  private boardStroke(e: PointerEvent, w: { x: number; y: number } | null, phase: "down" | "move" | "up") {
    const tool = this.tool;
    if (tool === "pan") {
      if (phase === "down") this.dragSel = { x: e.clientX, y: e.clientY, px: this.boardPan.x, py: this.boardPan.y };
      else if (phase === "move" && this.dragSel) { this.boardPan.x = this.dragSel.px + (e.clientX - this.dragSel.x); this.boardPan.y = this.dragSel.py + (e.clientY - this.dragSel.y); this.renderBoard(); }
      else if (phase === "up") this.dragSel = null;
      return;
    }
    if (tool === "select") {
      if (phase === "down" && w) {
        const hit = hitTest(this.boardStore.objects, w.x, w.y);
        this.selected = hit ? { surface: "board", obj: hit.obj } : null;
        this.dragSel = hit ? { sx: w.x, sy: w.y } : null;
        this.renderBoard();
      } else if (phase === "move" && w && this.dragSel && this.selected) {
        moveObject(this.selected.obj, w.x - this.dragSel.sx, w.y - this.dragSel.sy);
        this.dragSel.sx = w.x; this.dragSel.sy = w.y; this.renderBoard();
      } else if (phase === "up") { if (this.dragSel) this.scheduleSave(); this.dragSel = null; }
      return;
    }
    if (tool === "eraser") {
      if (phase !== "up" && w) {
        const hit = hitTest(this.boardStore.objects, w.x, w.y);
        if (hit) { this.boardStore.pushHistory(); this.boardStore.objects.splice(hit.idx, 1); this.renderBoard(); this.scheduleSave(); }
      }
      return;
    }
    if (tool === "laser") return;
    if (tool === "text" || tool === "sticky") {
      if (phase === "down" && w) { this.pendingAnchor = { surface: "board", x: w.x, y: w.y }; this.openModal(tool === "text" ? "mText" : "mSticky"); }
      return;
    }
    if (phase === "down" && w) {
      this.boardStore.pushHistory();
      if (tool === "pen" || tool === "highlighter") {
        this.boardDraft = {
          id: uid(), type: "stroke", tool, points: [{ x: w.x, y: w.y }],
          color: tool === "highlighter" ? this.hlColor : this.color,
          size: tool === "highlighter" ? Math.max(this.size * 3, 14) : this.size, opacity: this.opacity,
        };
      } else {
        this.boardDraft = {
          id: uid(), type: "shape", shape: this.shape, x1: w.x, y1: w.y, x2: w.x, y2: w.y,
          color: this.color, size: this.size, opacity: this.opacity, fill: this.fill, dashed: this.dashed,
        };
      }
    } else if (phase === "move" && w && this.boardDraft) {
      if (this.boardDraft.type === "stroke") this.boardDraft.points!.push({ x: w.x, y: w.y });
      else { this.boardDraft.x2 = w.x; this.boardDraft.y2 = w.y; }
      this.renderBoard();
    } else if (phase === "up" && this.boardDraft) {
      if (this.boardDraft.type === "shape" && Math.abs((this.boardDraft.x2 || 0) - (this.boardDraft.x1 || 0)) < 4 && Math.abs((this.boardDraft.y2 || 0) - (this.boardDraft.y1 || 0)) < 4) {
        this.boardStore.undo.pop();
      } else this.boardStore.objects.push(this.boardDraft);
      this.boardDraft = null; this.renderBoard(); this.scheduleSave();
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
      const buf = await this.fetchBytes(url, "Loading NCERT PDF…", name);
      await this.loadPdfBuffer(buf.buffer);
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
    const pg: PdfPage = { num: n, wrap, base, annot, actx: annot.getContext("2d")!, rendered: false, dirty: true, rendering: false, scale: 1 };
    this.pages.push(pg);
    this.pageObserver?.observe(wrap);
    this.wireAnnotCanvas(annot, n, () => pg.scale, null);
  }

  private async renderPdfPage(pg: PdfPage) {
    if (!this.pdfDoc || pg.rendering || this.destroyed) return;
    pg.rendering = true; pg.dirty = false;
    try {
      const page = await this.pdfDoc.getPage(pg.num);
      const scale = this.renderScale();
      const vp = page.getViewport({ scale });
      pg.scale = scale;
      pg.base.width = Math.floor(vp.width); pg.base.height = Math.floor(vp.height);
      pg.base.style.width = vp.width + "px"; pg.base.style.height = vp.height + "px";
      pg.annot.width = Math.floor(vp.width); pg.annot.height = Math.floor(vp.height);
      pg.annot.style.width = vp.width + "px"; pg.annot.style.height = vp.height + "px";
      pg.wrap.style.width = vp.width + "px"; pg.wrap.style.height = vp.height + "px";
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
    ctx.restore();
    if (this.selected && this.selected.surface === "doc" && this.selected.page === pg.num) {
      const b = bbox(this.selected.obj);
      ctx.save(); ctx.scale(sc, sc);
      ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2;
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
      ctx.restore();
    }
  }

  private annotPos(canvas: HTMLCanvasElement, e: PointerEvent | MouseEvent, scale: number, zoomCss: number) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / zoomCss / scale, y: (e.clientY - r.top) / zoomCss / scale };
  }

  private wireAnnotCanvas(canvas: HTMLCanvasElement, pageNum: number, scaleFn: (() => number) | null, zoomCssFn: (() => number) | null) {
    let drawing = false, selDrag: { sx: number; sy: number } | null = null;
    let erasing = false;
    this.on(canvas, "pointerdown", (e: PointerEvent) => {
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch { /* noop */ }
      this.setActive("doc", pageNum);
      const sc = scaleFn ? scaleFn() : 1, zc = zoomCssFn ? zoomCssFn() : 1;
      const p = this.annotPos(canvas, e, sc, zc);
      const store = this.docStore(pageNum);
      if (this.tool === "pan" || this.tool === "laser") return;
      if (this.tool === "select") {
        const hit = hitTest(store.objects, p.x, p.y);
        this.selected = hit ? { surface: "doc", page: pageNum, obj: hit.obj } : null;
        selDrag = hit ? { sx: p.x, sy: p.y } : null;
        if (hit) store.pushHistory();
        this.refreshAnnot(pageNum); return;
      }
      if (this.tool === "eraser") {
        const hit = hitTest(store.objects, p.x, p.y);
        if (hit) { store.pushHistory(); store.objects.splice(hit.idx, 1); this.refreshAnnot(pageNum); this.scheduleSave(); }
        erasing = true; return;
      }
      if (this.tool === "text" || this.tool === "sticky") {
        this.pendingAnchor = { surface: "doc", page: pageNum, x: p.x, y: p.y };
        this.openModal(this.tool === "text" ? "mText" : "mSticky"); return;
      }
      store.pushHistory();
      if (this.tool === "pen" || this.tool === "highlighter") {
        const rawSize = this.tool === "highlighter" ? Math.max(this.size * 3, 14) / sc : this.size / sc;
        this.annotDraft = {
          page: pageNum,
          obj: {
            id: uid(), type: "stroke", tool: this.tool, points: [p],
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
      const p = this.annotPos(canvas, e, sc, zc);
      const store = this.docStore(pageNum);
      if (erasing) {
        const hit = hitTest(store.objects, p.x, p.y);
        if (hit) { store.objects.splice(hit.idx, 1); this.refreshAnnot(pageNum); this.scheduleSave(); }
        return;
      }
      if (selDrag && this.selected) {
        moveObject(this.selected.obj, p.x - selDrag.sx, p.y - selDrag.sy);
        selDrag.sx = p.x; selDrag.sy = p.y; this.refreshAnnot(pageNum); return;
      }
      if (!drawing || !this.annotDraft || this.annotDraft.page !== pageNum) return;
      const o = this.annotDraft.obj;
      if (o.type === "stroke") o.points!.push(p);
      else { o.x2 = p.x; o.y2 = p.y; }
      this.refreshAnnot(pageNum);
    });
    const up = () => {
      drawing = false; erasing = false;
      if (this.annotDraft && this.annotDraft.page === pageNum) {
        const o = this.annotDraft.obj;
        const tiny = o.type === "shape" && Math.abs((o.x2 || 0) - (o.x1 || 0)) < 3 && Math.abs((o.y2 || 0) - (o.y1 || 0)) < 3;
        if (tiny) this.docStore(pageNum).undo.pop();
        else this.docStore(pageNum).objects.push(o);
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
      if (hit.obj.type === "text") { this.editingObj = { store: this.docStore(pageNum), obj: hit.obj, surface: "doc", page: pageNum }; (this.$("#textInput") as HTMLTextAreaElement).value = hit.obj.text || ""; this.openModal("mText"); }
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

  private resetDocViewer(name: string, key: string, kind: "pdf" | "html" | "image" | "video" | "audio" | "file") {
    if (this.layout === "board") this.setLayout("split");
    this.doc = { kind, key, name };
    (this.$("#fileName") as HTMLElement).textContent = " " + name;
    this.pages = [];
    (this.$("#thumbs") as HTMLElement).innerHTML = "";
    (this.$("#thumbs") as HTMLElement).classList.remove("show");
    this.$all("#docScroll .page-wrap, #docScroll .doc-html").forEach((n: HTMLElement) => n.remove());
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
    if (this.selected && this.selected.surface === "doc") {
      const b = bbox(this.selected.obj);
      ctx.save(); ctx.globalAlpha = 1; ctx.setLineDash([8, 6]); ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2;
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12); ctx.restore();
    }
  }

  private applyHtmlZoom() {
    const box = this.$("#docHtmlBox") as HTMLElement | null;
    if (box) (box.style as unknown as Record<string, string>).zoom = String(this.docZoom);
  }

  private updatePgLabel() {
    this.$("#pgLbl").textContent = this.totalPages ? `${this.currentPage} / ${this.totalPages}`: "– / –";
  }

  private setZoom(z: number) {
    this.docZoom = Math.min(3, Math.max(0.5, Math.round(z * 10) / 10));
    this.$("#zoomLbl").textContent = Math.round(this.docZoom * 100) + "%";
    if (this.doc?.kind === "pdf") { this.pages.forEach((p) => (p.dirty = true)); this.renderVisiblePages(); }
    else this.applyHtmlZoom();
  }

  /* ==========================================================================
     TOOLBAR / LAYOUT / DIVIDER
     ========================================================================== */
  private buildSwatches() {
    const box = this.$("#swatches") as HTMLElement;
    COLORS.forEach((c) => {
      const b = document.createElement("button");
      b.className = "sw" + (c === this.color ? " on" : "");
      b.style.background = c; b.title = c;
      b.onclick = () => {
        this.color = c;
        this.$all("#swatches .sw").forEach((x: HTMLElement) => x.classList.remove("on"));
        b.classList.add("on");
        if (this.tool === "highlighter" && c !== "#ffffff") this.hlColor = c;
      };
      box.appendChild(b);
    });
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

  private setTool(t: string) {
    this.tool = t;
    this.$all("#rail .tool[data-tool]").forEach((b: HTMLElement) => b.classList.toggle("on", b.dataset.tool === t));
    (this.$("#toolShapes") as HTMLElement).classList.toggle("on", !["select", "pan", "pen", "highlighter", "eraser", "text", "sticky", "laser"].includes(t));
    this.boardCanvas.style.cursor = t === "pan" ? "grab" : t === "select" ? "default" : t === "laser" ? "none" : "crosshair";
    this.hidePops();
  }

  private hidePops() {
    (this.$("#shapePop") as HTMLElement).classList.remove("show");
    (this.$("#mathPop") as HTMLElement).classList.remove("show");
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
    this.$all("#rail .tool[data-tool]").forEach((b: HTMLElement) => (b.onclick = () => this.setTool(b.dataset.tool || "pen")));
    this.$("#toolShapes").onclick = (e: MouseEvent) => {
      e.stopPropagation();
      const r = (this.$("#toolShapes") as HTMLElement).getBoundingClientRect();
      const pop = this.$("#shapePop") as HTMLElement;
      pop.style.left = r.right + 8 + "px";
      pop.style.top = Math.min(r.top, window.innerHeight - 320) + "px";
      pop.classList.toggle("show");
      (this.$("#mathPop") as HTMLElement).classList.remove("show");
      this.paintShapeGrid();
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
      if (!t.closest(".pop") && !t.closest("#toolShapes") && !t.closest("#toolMath")) this.hidePops();
    });
    this.$("#toolMath").onclick = (e: MouseEvent) => {
      e.stopPropagation();
      const r = (this.$("#toolMath") as HTMLElement).getBoundingClientRect();
      const pop = this.$("#mathPop") as HTMLElement;
      pop.style.left = r.right + 8 + "px";
      pop.style.top = Math.max(8, Math.min(r.top - 120, window.innerHeight - 380)) + "px";
      pop.classList.toggle("show");
      (this.$("#shapePop") as HTMLElement).classList.remove("show");
    };
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

    (this.$("#penSize") as HTMLInputElement).oninput = (e: Event) => {
      this.size = +(e.target as HTMLInputElement).value;
      this.$("#penSizeLbl").textContent = String(this.size);
    };
    (this.$("#penOpacity") as HTMLInputElement).oninput = (e: Event) => { this.opacity = +(e.target as HTMLInputElement).value; };
    (this.$("#fillChk") as HTMLInputElement).onchange = (e: Event) => { this.fill = (e.target as HTMLInputElement).checked; };
    (this.$("#dashChk") as HTMLInputElement).onchange = (e: Event) => { this.dashed = (e.target as HTMLInputElement).checked; };
    (this.$("#bgSelect") as HTMLSelectElement).onchange = (e: Event) => {
      this.bg = (e.target as HTMLSelectElement).value as BgKind;
      this.renderBoard(); this.scheduleSave();
    };

    this.$all("#layoutGroup .sb-btn").forEach((b: HTMLElement) => (b.onclick = () => this.setLayout((b as HTMLButtonElement).dataset.layout as "doc" | "split" | "board")));

    /* divider */
    const div = this.$("#divider") as HTMLElement;
    const docPane = this.$("#paneDoc") as HTMLElement;
    const boardPane = this.$("#paneBoard") as HTMLElement;
    let drag = false;
    this.on(div, "pointerdown", (e: PointerEvent) => { drag = true; try { div.setPointerCapture(e.pointerId); } catch { /* noop */ } });
    this.on(div, "pointermove", (e: PointerEvent) => {
      if (!drag) return;
      const r = (this.$(".sb-work") as HTMLElement).getBoundingClientRect();
      const d = Math.min(0.85, Math.max(0.15, (e.clientX - r.left) / r.width));
      docPane.style.flex = d.toFixed(3); boardPane.style.flex = (1 - d).toFixed(3);
    });
    this.on(div, "pointerup", () => { drag = false; this.sizeBoard(); if (this.doc?.kind === "pdf") this.computeFit(); });

    this.$("#btnFull").onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => this.toast("Fullscreen not allowed"));
    };
    this.$("#btnSave").onclick = () => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(this.collectSession())); this.toast("Saved"); }
      catch { this.toast("Save failed — the board has large images"); }
    };
    this.$("#btnWidgets").onclick = () => { this.openModal("mClass"); this.renderAttendance(); };
    this.$("#btnExport").onclick = () => this.openModal("mExport");
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
  private wirePages() {
    this.$("#btnBoardPrev").onclick = () => this.gotoBoardPage(this.boardPage - 1);
    this.$("#btnBoardNext").onclick = () => this.gotoBoardPage(this.boardPage + 1);
    this.$("#btnBoardAdd").onclick = () => this.addBoardPage();
    this.updateBoardPgLabel();
  }

  private setLayout(l: "doc" | "split" | "board") {
    this.layout = l;
    this.root.dataset.layout = l;
    this.$all("#layoutGroup .sb-btn").forEach((b: HTMLElement) => b.classList.toggle("on", (b as HTMLButtonElement).dataset.layout === l));
    setTimeout(() => { if (!this.destroyed) { this.sizeBoard(); if (this.doc?.kind === "pdf") this.computeFit(); } }, 80);
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

  /* ==========================================================================
     LASER
     ========================================================================== */
  private sizeTrail() { this.trailCv.width = window.innerWidth; this.trailCv.height = window.innerHeight; }
  private laserLoop() {
    if (this.destroyed) return;
    this.trailCtx.clearRect(0, 0, this.trailCv.width, this.trailCv.height);
    const now = performance.now();
    this.trail = this.trail.filter((p) => now - p.t < 700);
    this.trail.forEach((p) => {
      const a = 1 - (now - p.t) / 700;
      this.trailCtx.globalAlpha = a;
      this.trailCtx.fillStyle = "#ef4444";
      this.trailCtx.beginPath(); this.trailCtx.arc(p.x, p.y, 5 * a + 2, 0, 7); this.trailCtx.fill();
    });
    this.trailCtx.globalAlpha = 1;
    requestAnimationFrame(() => this.laserLoop());
  }
  private wireLaser() {
    this.on(window, "pointermove", (e: PointerEvent) => {
      if (this.tool !== "laser") { this.laserDot.style.display = "none"; return; }
      this.laserDot.style.display = "block";
      this.laserDot.style.left = e.clientX + "px"; this.laserDot.style.top = e.clientY + "px";
      if (e.buttons) this.trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    });
    this.on(window, "pointerdown", (e: PointerEvent) => {
      if (this.tool === "laser") this.trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    });
  }

  /* ==========================================================================
     MODALS
     ========================================================================== */
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
        if (this.editingObj.surface === "doc") this.refreshAnnot(this.editingObj.page || 1); else this.renderBoard();
        this.editingObj = null;
      } else if (this.pendingAnchor) {
        const a = this.pendingAnchor;
        if (a.surface === "doc" && a.page) {
          const sc = this.doc?.kind === "pdf" ? this.pages.find((p) => p.num === a.page)?.scale || 1 : 1;
          const st = this.docStore(a.page); st.pushHistory();
          st.objects.push({ id: uid(), type: "text", text: v, x: a.x, y: a.y, fontSize: fs / sc, color: this.color, opacity: 100 });
          this.refreshAnnot(a.page);
        } else {
          this.boardStore.pushHistory();
          this.boardStore.objects.push({ id: uid(), type: "text", text: v, x: a.x, y: a.y, fontSize: fs / this.boardZoom, color: this.color, opacity: 100 });
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
    ctx.fillStyle = "#0a0f24"; ctx.fillRect(0, 0, W, H);
    const ox = W / 2, oy = H / 2, unit = 34;
    ctx.strokeStyle = "#ffffff14"; ctx.lineWidth = 1; ctx.beginPath();
    for (let x = ox % unit; x < W; x += unit) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = oy % unit; y < H; y += unit) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
    ctx.strokeStyle = "#64748b"; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
    ctx.fillStyle = "#94a3b8"; ctx.font = "12px sans-serif";
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
    ctx.fillStyle = "#e2e8f0"; ctx.font = "700 15px sans-serif";
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
    const tabs: Record<string, string> = { tabTimer: "paneTimer", tabPicker: "panePicker", tabAtt: "paneAtt" };
    Object.keys(tabs).forEach((id) => {
      this.$("#" + id).onclick = () => {
        Object.keys(tabs).forEach((k) => { (this.$("#" + k) as HTMLElement).classList.remove("primary"); (this.$("#" + tabs[k]) as HTMLElement).style.display = "none"; });
        (this.$("#" + id) as HTMLElement).classList.add("primary");
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
      ctx.fillStyle = bgc[this.bg] || "#fff"; ctx.fillRect(0, 0, this.boardW, this.boardH);
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
      Object.keys(this.docStores[k]).forEach((p) => { docs[k][p] = this.docStores[k][Number(p)].objects.map(strip); });
    });
    return {
      v: 3, bg: this.bg, boards: this.boardPages.map((s) => s.objects.map(strip)), boardPage: this.boardPage, docs,
      names: (this.$("#pickerList") as HTMLTextAreaElement).value,
      attendance: this.attendance, timerMin: (this.$("#timerMin") as HTMLInputElement).value,
    };
  }
  private scheduleSave() {
    if (this.saveT) clearTimeout(this.saveT);
    this.saveT = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(this.collectSession())); } catch { /* quota full */ }
    }, 800);
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
    this.on(pro, "dblclick", () => {
      this.proAngle = (this.proAngle + 15) % 360;
      pro.style.transform = `rotate(${this.proAngle}deg)`;
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
      const max = 900, sc = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * sc)), h = Math.max(1, Math.round(img.height * sc));
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d")!.drawImage(img, 0, 0, w, h);
      let dataUrl = "";
      try { dataUrl = cv.toDataURL("image/jpeg", 0.85); }
      catch { this.toast("This image cannot be placed"); return; }
      const o: BoardObject = { id: uid(), type: "image", src: dataUrl, x: 60, y: 60, w, h };
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
      else if ((e.key === "Delete" || e.key === "Backspace") && this.selected) {
        const st = this.selected.surface === "doc" && this.selected.page ? this.docStore(this.selected.page) : this.boardStore;
        st.pushHistory();
        const id = this.selected.obj.id;
        st.objects = st.objects.filter((o) => o.id !== id);
        this.selected = null;
        if (this.active.kind === "doc") this.refreshAnnot(this.active.page || 1); else this.renderBoard();
        this.scheduleSave();
      }
      else if (e.key === "[") this.gotoBoardPage(this.boardPage - 1);
      else if (e.key === "]") this.gotoBoardPage(this.boardPage + 1);
      else if (e.key === "Escape") { this.$all(".modal.show").forEach((m: HTMLElement) => this.closeModal(m)); this.hidePops(); this.stopUpPoll(); }
    });
  }
}
