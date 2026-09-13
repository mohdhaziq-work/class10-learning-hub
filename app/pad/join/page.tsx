"use client";
/* PHONE PAD — the phone becomes a wireless writing tablet + touchpad
   for the Smart Board on the laptop/TV. Input events go over a
   peer-to-peer WebRTC DataChannel (no server hop) — that's the no-delay part.
   Draw mode: the whole pad IS the board (absolute, like a graphics tablet).
   Cursor mode: classic touchpad — move, tap to click, two fingers to scroll. */
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
  const ctrlRef = useRef<RTCDataChannel | null>(null);
  const inputRef = useRef<RTCDataChannel | null>(null);
  const modeRef = useRef<"draw" | "cursor">("draw");
  const pointers = useRef<Map<number, { x: number; y: number; t: number; moved: number }>>(new Map());
  const lastCursor = useRef<{ x: number; y: number } | null>(null);
  const longPress = useRef<any>(0);
  const dragging = useRef(false);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  const send = (o: any, chan: "input" | "ctrl" = "input") => {
    const dc = (chan === "ctrl" ? ctrlRef.current : inputRef.current) || ctrlRef.current;
    if (dc && dc.readyState === "open") { try { dc.send(JSON.stringify(o)); } catch { /* full */ } }
  };
  const sendCmd = (c: string, v?: any) => send({ c, v }, "ctrl");

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
        const input = pc.createDataChannel("input", { ordered: false, maxRetransmits: 0 }); /* moves must never queue */
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
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY, t: Date.now(), moved: 0 });
    if (modeRef.current === "draw") {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      send({ p: [0, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] }, "ctrl");
      lastCursor.current = null;
    } else {
      lastCursor.current = { x: e.clientX, y: e.clientY };
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
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.moved += Math.hypot(dx, dy);
    p.x = e.clientX; p.y = e.clientY;
    if (modeRef.current === "draw" && pointers.current.size === 1) {
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      send({ p: [1, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] }); /* unreliable channel — zero queue */
    } else if (modeRef.current === "cursor") {
      if (pointers.current.size === 1) {
        if (p.moved > 14) clearTimeout(longPress.current);
        send({ m: [Math.round(dx * 2.1), Math.round(dy * 2.1)] }); /* touchpad speed */
      } else if (pointers.current.size === 2) {
        send({ s: [Math.round(-dx * 1.4), Math.round(-dy * 1.4)] }); /* two-finger scroll */
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
        send({ k: [2, 0] }, "ctrl");
        pointers.current.clear();
        return;
      }
      if (pointers.current.size === 0 && quick) send({ k: [0, 0] }, "ctrl"); /* tap = left click */
    }
  };

  const pickTool = (t: string) => { setTool(t); sendCmd(t); };
  const pickColor = (c: string) => { setColor(c); sendCmd("color", c); };
  const pickSize = (z: number) => { setSize(z); sendCmd("size", z); };

  const connected = status === "live";
  const badge = status === "live" ? "● CONNECTED" : status === "ready" ? "Connecting…" : status === "lost" ? "Disconnected" : status === "error" ? "Error" : "…";

  return (
    <div className="pad-root">
      <header className="pad-head">
        <div className="pad-brand">Phone Pad</div>
        <div className={`pad-mode ${mode === "draw" ? "on" : ""}`} onClick={() => setMode("draw")}>✏️ Draw</div>
        <div className={`pad-mode ${mode === "cursor" ? "on" : ""}`} onClick={() => setMode("cursor")}>🖱 Cursor</div>
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
                <b>Touchpad</b>
                <span>Tap = click · hold + move = drag · 2 fingers = scroll · 2-finger tap = right click</span>
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
        </>
      )}
    </div>
  );
}
