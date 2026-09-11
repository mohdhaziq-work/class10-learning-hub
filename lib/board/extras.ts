/* Smart Board extras — pure helpers: shape recognition, zoom-to-fit,
   confetti, lesson templates. No DOM/framework deps (confetti excepted). */
import type { BoardObject } from "./engine";

const uid = (): string => "x" + Math.random().toString(36).slice(2, 9);

/* ================= Shape recognition (doodle → perfect shape) =================
   Heuristic classifier on a finished freehand stroke: line / circle / ellipse /
   rect / triangle. Returns null when the ink should stay as ink. */
export interface RecognizedShape { shape: string; x1: number; y1: number; x2: number; y2: number }

export function recognizeShape(pts: { x: number; y: number }[]): RecognizedShape | null {
  const n = pts.length;
  if (n < 12) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pts) { if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y; if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y; }
  const w = maxX - minX, h = maxY - minY;
  const diag = Math.hypot(w, h);
  if (diag < 28) return null;

  const A = pts[0], B = pts[n - 1];
  const box = (shape: string): RecognizedShape => ({ shape, x1: minX, y1: minY, x2: maxX, y2: maxY });

  /* not closed → maybe a straight line */
  const closed = Math.hypot(A.x - B.x, A.y - B.y) < Math.max(30, diag * 0.24);
  if (!closed) {
    let dMax = 0;
    const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1;
    for (const p of pts) dMax = Math.max(dMax, Math.abs((p.x - A.x) * dy - (p.y - A.y) * dx) / len);
    if (dMax < Math.max(7, diag * 0.07)) return { shape: "line", x1: A.x, y1: A.y, x2: B.x, y2: B.y };
    return null;
  }

  /* closed → circle / ellipse by radial variance around centroid */
  let cx = 0, cy = 0;
  for (const p of pts) { cx += p.x; cy += p.y; }
  cx /= n; cy /= n;
  const rs = pts.map((p) => Math.hypot(p.x - cx, p.y - cy));
  const rMean = rs.reduce((a, b) => a + b, 0) / n;
  const rStd = Math.sqrt(rs.reduce((a, r) => a + (r - rMean) * (r - rMean), 0) / n);
  const aspect = w / (h || 1);
  if (rStd / rMean < 0.17) return box(aspect > 0.78 && aspect < 1.28 ? "circle" : "ellipse");

  /* corner count on resampled polyline */
  const m = 34, step = (n - 1) / m;
  const P: { x: number; y: number }[] = [];
  for (let i = 0; i <= m; i++) P.push(pts[Math.round(i * step)]);
  let corners = 0, i = 1;
  while (i < P.length - 1) {
    const a1 = Math.atan2(P[i].y - P[i - 1].y, P[i].x - P[i - 1].x);
    const a2 = Math.atan2(P[i + 1].y - P[i].y, P[i + 1].x - P[i].x);
    let turn = a2 - a1;
    while (turn > Math.PI) turn -= 2 * Math.PI;
    while (turn < -Math.PI) turn += 2 * Math.PI;
    if (Math.abs(turn) > 0.85) { corners++; i += 3; } else i++;
  }
  if (corners === 3) return box("triangle");
  if (corners === 4 || corners === 5) return box(aspect > 0.8 && aspect < 1.25 ? "roundRect" : "rect");
  return null;
}

/* ================= Zoom-to-fit ================= */
export function fitBoard(objects: BoardObject[], cw: number, ch: number, pad = 70): { zoom: number; x: number; y: number } | null {
  if (!objects.length) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const grow = (x: number, y: number) => { if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y; };
  for (const o of objects) {
    if (o.type === "stroke" && o.points) o.points.forEach((p) => grow(p.x, p.y));
    else if (o.type === "shape") { grow(o.x1 || 0, o.y1 || 0); grow(o.x2 || 0, o.y2 || 0); }
    else if (o.type === "text") { grow(o.x || 0, o.y || 0); grow((o.x || 0) + (o._w || 260), (o.y || 0) + (o.fontSize || 20) * 1.4); }
    else { grow(o.x || 0, o.y || 0); grow((o.x || 0) + (o.w || 160), (o.y || 0) + (o.h || 100)); }
  }
  const bw = Math.max(40, maxX - minX), bh = Math.max(40, maxY - minY);
  const zoom = Math.min(4, Math.max(0.3, Math.min((cw - pad * 2) / bw, (ch - pad * 2) / bh)));
  return { zoom, x: cw / 2 - (minX + bw / 2) * zoom, y: ch / 2 - (minY + bh / 2) * zoom };
}

/* ================= Confetti (FigJam-style celebration) ================= */
export function confettiBurst(root: HTMLElement) {
  const cv = document.createElement("canvas");
  cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:400";
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  root.appendChild(cv);
  const ctx = cv.getContext("2d");
  if (!ctx) { cv.remove(); return; }
  ctx.scale(dpr, dpr);
  const colors = ["#1a73e8", "#c9a227", "#141414", "#188038", "#9334e6", "#e37400"];
  const parts = Array.from({ length: 90 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 160,
    y: innerHeight * 0.42,
    vx: (Math.random() - 0.5) * 11,
    vy: -6 - Math.random() * 7,
    w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
    rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)],
  }));
  const t0 = performance.now();
  const anim = (t: number) => {
    const p = Math.min(1, (t - t0) / 1500);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = 1 - p * p;
    for (const q of parts) {
      q.x += q.vx; q.y += q.vy; q.vy += 0.32; q.rot += q.vr;
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot);
      ctx.fillStyle = q.c; ctx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); ctx.restore();
    }
    if (p < 1) requestAnimationFrame(anim); else cv.remove();
  };
  requestAnimationFrame(anim);
}

/* ================= Templates ================= */
const T = (x: number, y: number, text: string, fontSize = 20, color = "#141414"): BoardObject =>
  ({ id: uid(), type: "text", x, y, text, fontSize, color });
const S = (shape: string, x1: number, y1: number, x2: number, y2: number, color = "#3c4043", size = 2.5): BoardObject =>
  ({ id: uid(), type: "shape", shape, x1, y1, x2, y2, color, size, opacity: 100 });
const N = (x: number, y: number, text: string, bg = "#fff9c4", w = 190, h = 104): BoardObject =>
  ({ id: uid(), type: "sticky", x, y, w, h, text, bg });

export interface Template { id: string; name: string; desc: string; build: (w: number, h: number) => BoardObject[] }

export const TEMPLATES: Template[] = [
  { id: "mindmap", name: "Mind Map", desc: "Central idea + 4 branches with connectors",
    build: (w, h) => { const cx = w / 2, cy = h / 2;
      return [
        T(cx - 70, 28, "Mind map", 26),
        N(cx - 95, cy - 52, "Central idea", "#dbe8fd"),
        N(w * 0.1, h * 0.12, "Branch 1"), N(w * 0.68, h * 0.12, "Branch 2"),
        N(w * 0.1, h * 0.72, "Branch 3"), N(w * 0.68, h * 0.72, "Branch 4"),
        S("line", cx - 95, cy, w * 0.1 + 95, h * 0.12 + 52, "#9aa3af"),
        S("line", cx + 95, cy, w * 0.68, h * 0.12 + 52, "#9aa3af"),
        S("line", cx - 95, cy, w * 0.1 + 95, h * 0.72 + 52, "#9aa3af"),
        S("line", cx + 95, cy, w * 0.68, h * 0.72 + 52, "#9aa3af"),
      ]; } },
  { id: "lesson", name: "Lesson Plan", desc: "Objective to homework in 5 steps",
    build: (w) => [
      T(40, 30, "Lesson plan — Topic: ____", 26),
      N(40, 90, "Objective"), N(40, 210, "Warm-up / recap"),
      N(40, 330, "New concept — explain"), N(40, 450, "Practice — board work"),
      N(40, 570, "Homework / next class"),
      S("line", 40, 84, w - 40, 84, "#1a73e8", 3),
    ] },
  { id: "kanban", name: "Kanban Board", desc: "To do / Doing / Done columns",
    build: (w, h) => [
      T(w * 0.06, 30, "To do", 20, "#b3261e"), T(w * 0.39, 30, "Doing", 20, "#b06000"), T(w * 0.72, 30, "Done", 20, "#146c2e"),
      S("line", w / 3, 70, w / 3, h - 40, "#9aa3af"), S("line", w * 2 / 3, 70, w * 2 / 3, h - 40, "#9aa3af"),
      N(w * 0.06, 90, "Task 1"), N(w * 0.06, 210, "Task 2"),
      N(w * 0.39, 90, "In progress", "#ffd9a0"),
      N(w * 0.72, 90, "Finished!", "#d3f3d9"),
    ] },
  { id: "quiz", name: "Quiz Time", desc: "3 question cards for class polls",
    build: (w) => [
      T(40, 26, "Quick Quiz", 26),
      S("roundRect", 40, 84, w - 60, 224, "#141414", 2), T(60, 104, "Q1.", 18, "#1a73e8"),
      S("roundRect", 40, 244, w - 60, 384, "#141414", 2), T(60, 264, "Q2.", 18, "#1a73e8"),
      S("roundRect", 40, 404, w - 60, 544, "#141414", 2), T(60, 424, "Q3.", 18, "#1a73e8"),
    ] },
  { id: "timeline", name: "Timeline", desc: "6 event points on one line",
    build: (w) => { const y = 260, gap = (w - 120) / 5;
      const out: BoardObject[] = [T(40, 40, "Timeline", 26), S("line", 60, y, w - 60, y, "#3c4043", 3)];
      for (let i = 0; i < 6; i++) {
        const x = 60 + gap * i;
        out.push(S("circle", x - 9, y - 9, x + 9, y + 9, "#1a73e8", 3));
        out.push(T(x - 34, y + 22, `Event ${i + 1}`, 14, "#6b7280"));
      }
      return out; } },
  { id: "vocab", name: "Vocabulary Bank", desc: "Word + meaning grid (2 × 3)",
    build: (w) => { const out: BoardObject[] = [T(40, 26, "Vocabulary bank", 26)];
      const cw2 = (w - 140) / 2;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
        const x = 60 + c * (cw2 + 20), y = 90 + r * 150;
        out.push(S("roundRect", x, y, x + cw2, y + 130, "#141414", 2));
        out.push(T(x + 16, y + 14, r === 0 && c === 0 ? "Word — Meaning" : "____ — ____", 16));
      }
      return out; } },
  { id: "checklist", name: "Checklist", desc: "8 tick-box rows for revision",
    build: (w) => { const out: BoardObject[] = [T(40, 26, "Revision checklist", 26)];
      for (let i = 0; i < 8; i++) { const y = 92 + i * 62;
        out.push(S("rect", 48, y, 88, y + 40, "#141414", 2.5));
        out.push(S("line", 108, y, w - 60, y, "#e5e7eb", 2));
        out.push(T(112, y + 8, i === 0 ? "Chapter / topic" : "", 15, "#6b7280"));
      }
      return out; } },
  { id: "planner", name: "Weekly Planner", desc: "Mon to Sun column headers",
    build: (w, h) => { const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const gap = (w - 80) / 7, out: BoardObject[] = [T(40, 22, "Week plan", 24)];
      days.forEach((d, i) => { const x = 40 + i * gap;
        out.push(S("roundRect", x, 80, x + gap - 14, h - 60, i >= 5 ? "#9aa3af" : "#1a73e8", 2));
        out.push(T(x + 12, 92, d, 17, i >= 5 ? "#6b7280" : "#1a73e8"));
      });
      return out; } },
];
