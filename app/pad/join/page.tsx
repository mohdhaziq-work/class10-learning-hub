"use client";
/* PHONE PAD — the phone becomes a wireless writing tablet + FULL MOUSE
   for the Smart Board on the laptop/TV. Input goes over a peer-to-peer
   WebRTC DataChannel (no server hop) — that's the no-delay part.
   Draw mode: the whole pad IS the board (absolute, like a graphics tablet).
   Cursor mode: full touchpad+mouse — move (adjustable speed + pointer
   acceleration), Left/Mid/Right buttons, drag lock, 2-finger scroll with
   momentum, 2-finger tap = right click, hold = drag, shortcuts. */
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./pad.css";

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

export default function PadJoin() {
  return (
    <Suspense fallback={<div className="pad-root"><main className="pad-main"><div className="pad-spin" /></main></div>}>
      <PadInner />
    </Suspense>
  );
}

function PadInner() {
  const params = useSearchParams();
  const sid = (params.get("sid") || "").toLowerCase();
  const [status, setStatus] = useState<"init" | "ready" | "live" | "lost" | "error">("init");
  const [err, setErr] = useState("");
  const [mode, setMode] = useState<"draw" | "cursor">("draw");
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#dc2626");
  const [size, setSize] = useState(4);
  const [sens, setSens] = useState(1);          /* cursor speed 0.4–3× */
  const [accel, setAccel] = useState(true);     /* pointer acceleration */
  const [dragLock, setDragLock] = useState(false);
  const ctrlRef = useRef<RTCDataChannel | null>(null);
  const inputRef = useRef<RTCDataChannel | null>(null);
  const modeRef = useRef<"draw" | "cursor">("draw");
  const sensRef = useRef(1);
  const accelRef = useRef(true);
  const dragLockRef = useRef(false);
  const carry = useRef({ x: 0, y: 0 });          /* sub-pixel remainder — nothing is lost, slow moves stay smooth */
  const scrollT = useRef(0);
  const scrollV = useRef(0);
  const momRaf = useRef(0);
  const pointers = useRef<Map<number, { x: number; y: number; t: number; lt: number; moved: number }>>(new Map());
  const longPress = useRef<any>(0);
  const dragging = useRef(false);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => {
    try {
      const s = +(localStorage.getItem("padSens") || 1);
      if (s >= 0.4 && s <= 3) { setSens(s); sensRef.current = s; }
      const a = localStorage.getItem("padAccel") !== "0";
      setAccel(a); accelRef.current = a;
    } catch { /* private mode */ }
  }, []);
  useEffect(() => { try { localStorage.setItem("padSens", String(sens)); } catch { /* noop */ } }, [sens]);
  useEffect(() => { try { localStorage.setItem("padAccel", accel ? "1" : "0"); } catch { /* noop */ } }, [accel]);

  const send = (o: any, chan: "input" | "ctrl" = "input") => {
    const dc = (chan === "ctrl" ? ctrlRef.current : inputRef.current) || ctrlRef.current;
    if (dc && dc.readyState === "open") { try { dc.send(JSON.stringify(o)); } catch { /* full */ } }
  };
  const sendCmd = (c: string, v?: any) => send({ c, v }, "ctrl");
  const buzz = (ms: number) => { try { (navigator as any).vibrate?.(ms); } catch { /* no haptics */ } };

  useEffect(() => {
    if (!sid) { setErr("No pad code in this link — scan the QR from the board page."); setStatus("error"); return; }
    let stopped = false;
    let after = 0;
    const post = (b: any) => fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }).then((r) => r.json());

    (async () => {
      try {
        const j = await post({ a: "join", sid });
        if (!j.ok) { setErr(j.error === "session not found" ? "This pad session is over — open the Phone Pad on the board again." : String(j.error || "join failed")); setStatus("error"); return; }
        const pc = new RTCPeerConnection(ICE);
        const ctrl = pc.createDataChannel("ctrl", { ordered: true });
        const input = pc.createDataChannel("input", { ordered: false, maxRetransmits: 0 }); /* cursor moves must never queue */
        ctrlRef.current = ctrl;
        inputRef.current = input;
        const alive = () => { if (!stopped) setStatus("live"); };
        ctrl.onopen = alive;
        input.onopen = alive;
        pc.onconnectionstatechange = () => {
          if (pc.connectionState === "connected") { if (!stopped) setStatus("live"); }
          if ((pc.connectionState === "failed" || pc.connectionState === "disconnected") && !stopped) setStatus("lost");
        };
        const cands: any[] = [];
        pc.onicecandidate = (e) => { if (e.candidate) cands.push({ type: "cand", cand: e.candidate.toJSON() }); };
        let iceTimer: any = 0;
        const flush = async () => { if (cands.length) { await post({ a: "sig", sid, from: "sender", msgs: cands.splice(0) }); } };
        pc.onicegatheringstatechange = () => { if (pc.iceGatheringState === "complete") { clearTimeout(iceTimer); flush(); } };
        iceTimer = setTimeout(flush, 1200);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await post({ a: "sig", sid, from: "sender", msgs: [{ type: "offer", sdp: { type: offer.type, sdp: offer.sdp } }] });
        setStatus("ready");

        const poll = async () => {
          if (stopped) return;
          try {
            const r = await fetch(`/api/cast?sid=${sid}&from=sender&after=${after}`);
            const j2 = await r.json();
            if (!j2.ok) { if (String(j2.error || "").includes("not found")) { setStatus("lost"); stopped = true; return; } }
            else {
              if (j2.msgs.length) after = j2.msgs[j2.msgs.length - 1].id;
              for (const m of j2.msgs) {
                if (m.msg.type === "answer") await pc.setRemoteDescription(new RTCSessionDescription(m.msg.sdp));
                else if (m.msg.type === "cand") await pc.addIceCandidate(m.msg.cand).catch(() => { /* stale */ });
                else if (m.msg.type === "bye") { setStatus("lost"); stopped = true; return; }
              }
            }
          } catch { /* transient */ }
          if (!stopped) setTimeout(poll, ctrlRef.current?.readyState === "open" ? 2500 : 350);
        };
        poll();
        if ((navigator as any).wakeLock) (navigator as any).wakeLock.request("screen").catch(() => null); /* keep the phone awake */
      } catch (e: any) {
        setErr("Could not connect — " + String(e?.message || e));
        setStatus("error");
      }
    })();
    return () => { stopped = true; };
  }, [sid]);

  /* ---------------- pad event handling ---------------- */
  /* full-rate samples: browsers coalesce pointer moves — we take every one */
  const coalesced = (e: React.PointerEvent): PointerEvent[] => {
    const ne = e.nativeEvent as any;
    const evs: any[] = ne.getCoalescedEvents ? ne.getCoalescedEvents() : [];
    return evs && evs.length ? evs : [ne];
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    cancelAnimationFrame(momRaf.current); scrollV.current = 0; /* new touch stops scroll momentum */
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY, t: Date.now(), lt: e.timeStamp || performance.now(), moved: 0 });
    if (modeRef.current === "draw") {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      send({ p: [0, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] }, "ctrl");
    } else {
      if (pointers.current.size === 1) {
        /* long-press = drag (press and hold) */
        clearTimeout(longPress.current);
        longPress.current = setTimeout(() => {
          if (pointers.current.size === 1 && pointers.current.get(e.pointerId) && pointers.current.get(e.pointerId)!.moved < 14) {
            dragging.current = true;
            send({ k: [0, 1] }, "ctrl");
          }
        }, 210);
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    if (!p) return;
    const list = coalesced(e);
    if (modeRef.current === "draw" && pointers.current.size === 1) {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const pts: [number, number][] = [];
      for (const ev of list) {
        p.x = ev.clientX; p.y = ev.clientY;
        pts.push([(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height]);
      }
      send({ P: pts }, "ctrl"); /* ordered+reliable: ink points must never drop — that was the choppiness */
    } else if (modeRef.current === "cursor") {
      if (pointers.current.size === 1) {
        if (p.moved > 14) clearTimeout(longPress.current);
        const dxs: number[] = [], dys: number[] = [];
        for (const ev of list) {
          const dx = ev.clientX - p.x, dy = ev.clientY - p.y;
          const t = ev.timeStamp || performance.now();
          const dt = Math.max(4, t - p.lt); p.lt = t;
          p.moved += Math.hypot(dx, dy); p.x = ev.clientX; p.y = ev.clientY;
          if (!dx && !dy) continue;
          /* pointer acceleration: slow = surgical precision, fast flick = full speed */
          const speed = Math.hypot(dx, dy) / dt; /* px per ms */
          const gain = sensRef.current * (accelRef.current ? 1 + 0.8 * Math.min(1, Math.max(0, (speed - 0.25) / 1.5)) : 1);
          carry.current.x += dx * gain; carry.current.y += dy * gain;
          const ix = Math.trunc(carry.current.x), iy = Math.trunc(carry.current.y);
          if (ix || iy) { carry.current.x -= ix; carry.current.y -= iy; dxs.push(ix); dys.push(iy); }
        }
        if (dxs.length) send(dxs.length === 1 ? { m: [dxs[0], dys[0]] } : { M: dxs.map((v, i) => [v, dys[i]]) });
      } else if (pointers.current.size === 2) {
        /* two-finger scroll, natural direction */
        const t = e.timeStamp || performance.now();
        const dt = Math.max(4, t - (scrollT.current || t - 8)); scrollT.current = t;
        let sdx = 0, sdy = 0;
        for (const ev of list) { sdx += ev.clientX - p.x; sdy += ev.clientY - p.y; p.x = ev.clientX; p.y = ev.clientY; }
        const ex = -sdx * 1.15, ey = -sdy * 1.15;
        if (Math.round(ex) || Math.round(ey)) send({ s: [Math.round(ex), Math.round(ey)] });
        scrollV.current = 0.75 * scrollV.current + 0.25 * (ey / dt);
      }
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    pointers.current.delete(e.pointerId);
    if (!p) return;
    if (modeRef.current === "draw" && pointers.current.size === 0) {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      send({ p: [2, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] }, "ctrl");
    } else if (modeRef.current === "cursor") {
      const quick = Date.now() - p.t < 240 && p.moved < 12;
      if (dragging.current) { dragging.current = false; send({ k: [0, 2] }, "ctrl"); return; }
      if (pointers.current.size === 1 && quick) {
        /* second finger still down → two-finger tap = right click */
        send({ k: [2, 0] }, "ctrl"); buzz(12);
        pointers.current.clear();
        return;
      }
      if (pointers.current.size === 0) {
        /* flick = momentum scroll keeps gliding */
        if (Math.abs(scrollV.current) > 0.18) {
          let v = scrollV.current; let last = performance.now();
          const step = (now: number) => {
            const dt = now - last; last = now;
            v *= Math.pow(0.994, dt);
            if (Math.abs(v) < 0.05) return;
            const dy = v * dt;
            if (dy) send({ s: [0, Math.round(dy)] });
            momRaf.current = requestAnimationFrame(step);
          };
          momRaf.current = requestAnimationFrame(step);
          scrollV.current = 0;
          return;
        }
        scrollV.current = 0;
        if (quick) { send({ k: [0, 0] }, "ctrl"); buzz(8); } /* tap = left click */
      }
    }
  };

  /* ---------------- full-mouse buttons ---------------- */
  const mouseBtn = (btn: number) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      buzz(btn === 0 ? 10 : 14);
      send({ k: [btn, 1] }, "ctrl"); /* hold Left + move finger on the pad = REAL drag */
    },
    onPointerUp: (e: React.PointerEvent) => { e.preventDefault(); send({ k: [btn, 2] }, "ctrl"); },
    onPointerCancel: () => send({ k: [btn, 2] }, "ctrl"),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });
  const toggleDrag = () => {
    const nd = !dragLockRef.current;
    dragLockRef.current = nd; setDragLock(nd);
    send({ k: [0, nd ? 1 : 2] }, "ctrl");
    buzz(nd ? 20 : 8);
  };
  const switchMode = (m: "draw" | "cursor") => {
    if (mode === m) return;
    if (dragLockRef.current) { dragLockRef.current = false; setDragLock(false); send({ k: [0, 2] }, "ctrl"); }
    carry.current = { x: 0, y: 0 }; scrollV.current = 0;
    setMode(m);
  };

  /* ---------------- shortcuts (board keyboard shortcuts, fired from the phone) ---------------- */
  const scKey = (key: string, ctrl = false) => { buzz(8); sendCmd("key", { key, ctrl }); };
  const scTool = (t: string, key: string) => { setTool(t); scKey(key); };

  const pickTool = (t: string) => { setTool(t); sendCmd(t); };
  const pickColor = (c: string) => { setColor(c); sendCmd("color", c); };
  const pickSize = (z: number) => { setSize(z); sendCmd("size", z); };

  const connected = status === "live";
  const badge = status === "live" ? "● CONNECTED" : status === "ready" ? "Connecting…" : status === "lost" ? "Disconnected" : status === "error" ? "Error" : "…";

  return (
    <div className="pad-root">
      <header className="pad-head">
        <div className="pad-brand">Phone Pad</div>
        <div className={`pad-mode ${mode === "draw" ? "on" : ""}`} onClick={() => switchMode("draw")}>✏️ Draw</div>
        <div className={`pad-mode ${mode === "cursor" ? "on" : ""}`} onClick={() => switchMode("cursor")}>🖱 Mouse</div>
        <span className={`pad-badge ${connected ? "ok" : ""}`}>{badge}</span>
      </header>

      {status === "error" ? (
        <main className="pad-main pad-center">
          <b>Cannot connect</b>
          <p>{err}</p>
          <Link href="/" className="pad-link">Back to Learning Hub</Link>
        </main>
      ) : (
        <>
          <main
            className={`pad-area ${mode === "cursor" ? "cursor" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onContextMenu={(e) => e.preventDefault()}
          >
            {mode === "draw" ? (
              <div className="pad-hint">
                <b>The pad is the board</b>
                <span>Finger kheencho — board par likha jayega (poora pad = poora board)</span>
              </div>
            ) : (
              <div className="pad-hint">
                <b>Touchpad + Mouse</b>
                <span>Tap = click · hold Left + move = drag · 2-finger scroll · 2-finger tap = right click · Speed neeche</span>
              </div>
            )}
            {status === "lost" && <div className="pad-overlay">Disconnected — board par Phone Pad dobara kholo</div>}
          </main>

          {mode === "draw" && (
            <footer className="pad-tools">
              <div className="pad-row">
                {[
                  ["pen", "Pen"], ["highlighter", "High"], ["eraser", "Erase"], ["select", "Move"], ["pan", "Pan"],
                ].map(([t, l]) => (
                  <button key={t} className={`pad-t ${tool === t ? "on" : ""}`} onClick={() => pickTool(t)}>{l}</button>
                ))}
              </div>
              <div className="pad-row">
                {["#111827", "#dc2626", "#2563eb", "#16a34a"].map((c) => (
                  <button key={c} className={`pad-c ${color === c ? "on" : ""}`} style={{ background: c }} onClick={() => pickColor(c)} />
                ))}
                {[2, 6, 14].map((z) => (
                  <button key={z} className={`pad-t ${size === z ? "on" : ""}`} onClick={() => pickSize(z)}>{z === 2 ? "S" : z === 6 ? "M" : "B"}</button>
                ))}
                <span className="pad-gap" />
                <button className="pad-t" onClick={() => sendCmd("undo")}>↶</button>
                <button className="pad-t" onClick={() => sendCmd("redo")}>↷</button>
                <button className="pad-t" onClick={() => sendCmd("page", -1)}>◀</button>
                <button className="pad-t" onClick={() => sendCmd("page", 1)}>▶</button>
              </div>
            </footer>
          )}

          {mode === "cursor" && (
            <footer className="pad-tools">
              <div className="pad-row pad-mouse">
                <button id="padBtnL" className="pad-m" {...mouseBtn(0)}>Left</button>
                <button id="padBtnM" className="pad-m" {...mouseBtn(1)}>Mid</button>
                <button id="padBtnR" className="pad-m" {...mouseBtn(2)}>Right</button>
                <button id="padBtnDrag" className={`pad-m ${dragLock ? "on" : ""}`} onClick={toggleDrag}>{dragLock ? "Drag ✓" : "Drag"}</button>
              </div>
              <div className="pad-row">
                <button id="padScUndo" className="pad-t" onClick={() => scKey("z", true)}>↶ Undo</button>
                <button id="padScRedo" className="pad-t" onClick={() => scKey("y", true)}>↷ Redo</button>
                <button id="padScPen" className={`pad-t ${tool === "pen" ? "on" : ""}`} onClick={() => scTool("pen", "p")}>✏️ Pen</button>
                <button id="padScErase" className={`pad-t ${tool === "eraser" ? "on" : ""}`} onClick={() => scTool("eraser", "e")}>🧽 Erase</button>
              </div>
              <div className="pad-row pad-set">
                <span className="pad-lab">SPEED</span>
                <input id="padSens" className="pad-slider" type="range" min="0.4" max="3" step="0.05" value={sens}
                  onChange={(e) => { const v = +e.target.value; sensRef.current = v; setSens(v); }} />
                <span className="pad-val">{sens.toFixed(2)}×</span>
                <button id="padAccel" className={`pad-chip ${accel ? "on" : ""}`} onClick={() => setAccel(!accel)} title="Pointer acceleration — slow = precise, flick = fast">⚡</button>
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
}
