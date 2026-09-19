/* ENGINE v3 — layered renderer.
   Three canvases, three jobs:
     static  committed objects (redrawn only on structural change)
     live    the in-progress stroke, painted incrementally INSIDE the input
             event (never a full-stroke redraw mid-stroke), cleared at
             stroke start/end
     fx      transient overlays: brush ring, lasso preview, adaptive bridge,
             latency HUD (repainted on rAF while needed)

   Hard rules learned the expensive way:
   - NO desynchronized hint. On several Android Chrome builds the desync
     overlay plane presents solid black while code-side composites look fine.
     It is worth at most one composite frame; not worth a black board.
   - DPR capped at 2: crisp ink without 4x overdraw on phone SoCs.
   - Eraser is a destination-out punch so ANY surface style shows through. */

import type { Pt, StrokeStyle } from "./types";

export interface LayerStack {
  staticC: HTMLCanvasElement;
  liveC: HTMLCanvasElement;
  fxC: HTMLCanvasElement;
}

export class LayeredRenderer {
  readonly DPR = Math.min(2, (typeof devicePixelRatio !== "undefined" && devicePixelRatio) || 1);
  sctx: CanvasRenderingContext2D;
  lctx: CanvasRenderingContext2D;
  fctx: CanvasRenderingContext2D;
  pan = { x: 0, y: 0 };
  zoom = 1;

  constructor(private stack: LayerStack) {
    this.sctx = stack.staticC.getContext("2d")!;
    this.lctx = stack.liveC.getContext("2d")!;
    this.fctx = stack.fxC.getContext("2d")!;
  }

  resize(w: number, h: number): void {
    for (const c of [this.stack.staticC, this.stack.liveC, this.stack.fxC]) {
      c.width = Math.max(1, Math.round(w * this.DPR));
      c.height = Math.max(1, Math.round(h * this.DPR));
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
  }

  toWorld(cx: number, cy: number): Pt {
    return { x: (cx - this.pan.x) / this.zoom, y: (cy - this.pan.y) / this.zoom };
  }

  private xf(ctx: CanvasRenderingContext2D): void {
    ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    ctx.translate(this.pan.x, this.pan.y);
    ctx.scale(this.zoom, this.zoom);
  }

  private style(ctx: CanvasRenderingContext2D, st: StrokeStyle): void {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash(st.dashed ? [st.size * 2, st.size * 1.6] : []);
    ctx.strokeStyle = st.color;
    ctx.fillStyle = st.color;
    ctx.lineWidth = Math.max(st.size, 1);
  }

  /* ---------------- live (wet) layer ---------------- */

  clearLive(): void {
    const c = this.stack.liveC;
    this.lctx.setTransform(1, 0, 0, 1, 0, 0);
    this.lctx.clearRect(0, 0, c.width, c.height);
  }

  /** one incremental segment, synchronous inside the input event */
  wetSegment(a: Pt, b: Pt, st: StrokeStyle): void {
    const ctx = this.lctx;
    this.xf(ctx);
    this.style(ctx, st);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  /* ---------------- static (dry) layer ---------------- */

  clearStatic(): void {
    const c = this.stack.staticC;
    this.sctx.setTransform(1, 0, 0, 1, 0, 0);
    this.sctx.clearRect(0, 0, c.width, c.height);
  }

  /** exact commit: polyline through the hardware samples, zero invention */
  commitStroke(pts: Pt[], st: StrokeStyle): void {
    if (pts.length === 0) return;
    const ctx = this.sctx;
    this.xf(ctx);
    this.style(ctx, st);
    if (pts.length === 1) {
      /* tap = instant dot */
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, Math.max(st.size, 1) / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    const lp = pts[pts.length - 1];
    ctx.lineTo(lp.x, lp.y);
    ctx.stroke();
  }

  /** destination-out punch: erases ink, keeps every surface style intact */
  eraseAt(p: Pt, radius: number): void {
    for (const ctx of [this.sctx, this.lctx]) {
      this.xf(ctx);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ---------------- fx (transient) layer ---------------- */

  clearFx(): void {
    const c = this.stack.fxC;
    this.fctx.setTransform(1, 0, 0, 1, 0, 0);
    this.fctx.clearRect(0, 0, c.width, c.height);
  }

  /** adaptive bridge for sparse input ONLY — same colour as the stroke so it
      reads as ink; never drawn when the OS already delivers fast samples */
  bridge(from: Pt, to: Pt, st: StrokeStyle, alpha: number): void {
    const ctx = this.fctx;
    this.xf(ctx);
    this.style(ctx, st);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}
