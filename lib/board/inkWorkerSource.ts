/* Self-contained background-thread ink engine (OffscreenCanvas worker).
   Owns ONLY the live stroke layer; the main thread keeps the committed static
   canvas, so a worker failure can never lose ink (commit reads the pool). */
export const INK_WORKER_SOURCE = `
"use strict";
let cv = null, ctx = null;
let dpr = 1, panX = 0, panY = 0, zoom = 1;
let st = null;                 /* {color,size,alpha,opacity} */
let p0x=0,p0y=0,p1x=0,p1y=0,has=false;

function xform(){ ctx.setTransform(dpr*zoom,0,0,dpr*zoom,dpr*panX,dpr*panY); }
function clearAll(){ if(!ctx) return; ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height); has=false; }
function widthFor(dist, pressure){
  const base = st.size;
  if (pressure > 0 && pressure !== 0.5) return base * (0.3 + 0.7 * Math.min(1, pressure * 1.5));
  return Math.max(base * (1 - 0.62 * Math.min(dist / 26, 1)), 0.7);
}
function seg(x, y, pressure){
  /* quadratic through midpoints; velocity-tapered chisel width */
  const dist = Math.hypot(x - p1x, y - p1y);
  const w = widthFor(dist, pressure);
  ctx.strokeStyle = st.color; ctx.globalAlpha = st.alpha * st.opacity;
  ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = w;
  ctx.beginPath();
  if (has) {
    ctx.moveTo((p0x + p1x) / 2, (p0y + p1y) / 2);
    ctx.quadraticCurveTo(p1x, p1y, (p1x + x) / 2, (p1y + y) / 2);
  } else {
    ctx.moveTo(x, y); ctx.lineTo(x + 0.01, y + 0.01);
  }
  ctx.stroke();
  p0x = p1x; p0y = p1y; p1x = x; p1y = y; has = true;
}

self.onmessage = function (e) {
  const d = e.data;
  if (d.t === "init") { cv = d.canvas; ctx = cv.getContext("2d", { desynchronized: true }); }
  else if (d.t === "size") { if (cv) { cv.width = d.w; cv.height = d.h; } dpr = d.dpr; clearAll(); }
  else if (d.t === "view") { panX = d.px; panY = d.py; zoom = d.z; }
  else if (d.t === "clear") { clearAll(); }
  else if (d.t === "down") { st = d.style; xform(); clearAll(); xform();
    p1x = d.x; p1y = d.y; p0x = d.x; p0y = d.y; has = false;
    ctx.fillStyle = st.color; ctx.globalAlpha = st.alpha * st.opacity;
    ctx.beginPath(); ctx.arc(d.x, d.y, st.size / 2, 0, 7); ctx.fill();
    has = true; }
  else if (d.t === "batch") { if (!ctx || !st) return; xform();
    const b = d.buf, n = d.n;
    for (let i = 0; i < n; i++) seg(b[i*3], b[i*3+1], b[i*3+2]); }
  else if (d.t === "end") { if (!ctx || !st || !has) return; xform();
    ctx.strokeStyle = st.color; ctx.globalAlpha = st.alpha * st.opacity;
    ctx.lineCap = "round"; ctx.lineWidth = Math.max(st.size * 0.5, 0.7);
    ctx.beginPath(); ctx.moveTo((p0x + p1x) / 2, (p0y + p1y) / 2); ctx.lineTo(p1x, p1y); ctx.stroke(); }
};
`;
