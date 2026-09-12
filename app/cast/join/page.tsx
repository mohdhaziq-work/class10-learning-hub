"use client";
/* SCREEN CAST — SENDER (phone or laptop).
   • Laptop/PC (Chrome/Edge): cast your entire screen — full WebRTC screen share.
   • Phone: browsers are not allowed to capture the phone screen (Android/iOS both
     block it) — so phones get CAMERA CAST instead: the camera goes live on the
     big screen, front/back switchable. Peer-to-peer + encrypted either way. */
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import "../cast.css";

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

type Status = "init" | "ready" | "starting" | "live" | "lost" | "ended" | "error";
type Mode = "screen" | "camera";

export default function CastSender() {
  return (
    <Suspense fallback={<div className="cast-root sender"><header className="cast-head"><div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div></header><main className="cast-sender-main"><div className="cast-spin" /></main></div>}>
      <CastSenderInner />
    </Suspense>
  );
}

function CastSenderInner() {
  const params = useSearchParams();
  const sid = (params.get("sid") || "").toLowerCase();
  const [status, setStatus] = useState<Status>("init");
  const [mode, setMode] = useState<Mode>("screen");
  const [canScreen, setCanScreen] = useState(true);
  const [canCamera, setCanCamera] = useState(true);
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [err, setErr] = useState("");
  const [secs, setSecs] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wakeRef = useRef<any>(null);
  const stopRef = useRef(false);
  const modeRef = useRef<Mode>("screen");

  useEffect(() => {
    const scr = !!navigator.mediaDevices?.getDisplayMedia;
    const cam = !!navigator.mediaDevices?.getUserMedia && (window.isSecureContext !== false);
    setCanScreen(scr);
    setCanCamera(cam);
    setMode(scr ? "screen" : "camera"); /* phones fall back to camera automatically */
    modeRef.current = scr ? "screen" : "camera";
    if (!sid) { setErr("No cast code in this link — scan the QR code on the TV screen."); setStatus("error"); return; }
    fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: "join", sid }) })
      .then((r) => r.json())
      .then((j) => { if (!j.ok) { setErr(j.error === "session not found" ? "This cast session is over — ask the TV to show a new QR." : String(j.error || "could not join")); setStatus("error"); } else setStatus("ready"); })
      .catch(() => { setErr("Network problem — check your internet and rescan."); setStatus("error"); });
  }, [sid]);

  useEffect(() => () => { cleanup(); }, []);

  function cleanup() {
    stopRef.current = true;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    pcRef.current?.close();
    pcRef.current = null;
    wakeRef.current?.release?.().catch(() => { /* released */ });
    wakeRef.current = null;
  }

  async function endCasting(notify = true) {
    if (notify && sid) fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: "end", sid, from: "sender" }) }).catch(() => { /* already gone */ });
    cleanup();
    setStatus("ended");
  }

  const post = (body: any) => fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());

  /* ---------- shared: wire the stream to the viewer over WebRTC ---------- */
  async function beginSession(stream: MediaStream) {
    streamRef.current = stream;
    if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => { /* muted autoplay */ }); }
    if ((navigator as any).wakeLock) wakeRef.current = await (navigator as any).wakeLock.request("screen").catch(() => null); /* keep the phone awake */

    const pc = new RTCPeerConnection(ICE);
    pcRef.current = pc;
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));
    const cands: any[] = [];
    pc.onicecandidate = (e) => { if (e.candidate) cands.push({ type: "cand", cand: e.candidate.toJSON() }); };
    let iceTimer: any = 0;
    const flush = async () => { if (cands.length) { await post({ a: "sig", sid, from: "sender", msgs: cands.splice(0) }); } };
    pc.onicegatheringstatechange = () => { if (pc.iceGatheringState === "complete") { clearTimeout(iceTimer); flush(); } };
    iceTimer = setTimeout(flush, 1200);
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") setStatus("live");
      else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") setStatus((s) => (s === "ended" ? s : "lost"));
    };
    stream.getVideoTracks()[0].addEventListener("ended", () => endCasting()); /* system stop (screen cast) */

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await post({ a: "sig", sid, from: "sender", msgs: [{ type: "offer", sdp: { type: offer.type, sdp: offer.sdp } }] });

    stopRef.current = false;
    let after = 0;
    const poll = async () => {
      if (stopRef.current) return;
      try {
        const r = await fetch(`/api/cast?sid=${sid}&from=sender&after=${after}`);
        const j = await r.json();
        if (!j.ok) { if (String(j.error).includes("not found")) { endCasting(false); return; } }
        else {
          after = j.msgs.length ? j.msgs[j.msgs.length - 1].id : after;
          for (const m of j.msgs) {
            if (m.msg.type === "answer") await pcRef.current?.setRemoteDescription(new RTCSessionDescription(m.msg.sdp));
            else if (m.msg.type === "cand") await pcRef.current?.addIceCandidate(m.msg.cand).catch(() => { /* stale */ });
            else if (m.msg.type === "bye") { endCasting(false); return; }
          }
        }
      } catch { /* transient — keep going */ }
      if (!stopRef.current) setTimeout(poll, pcRef.current?.connectionState === "connected" ? 3000 : 350);
    };
    poll();
  }

  /* ---------- mode 1: screen cast (laptop / desktop browsers) ---------- */
  async function startCast() {
    if (!navigator.mediaDevices?.getDisplayMedia) { setMode("camera"); return; }
    setStatus("starting");
    modeRef.current = "screen";
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30, max: 60 } },
        audio: true, /* screen audio when the device allows it */
      });
    } catch {
      try { stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30, max: 60 } } }); }
      catch (e: any) {
        if (e?.name === "NotAllowedError") setErr("Permission denied — allow screen recording when asked, then try again.");
        else setErr("Could not start screen sharing. Try Chrome or Edge on a computer.");
        setStatus("error");
        return;
      }
    }
    beginSession(stream).catch(() => { setErr("Could not connect to the TV — reload both pages and try again."); setStatus("error"); });
  }

  /* ---------- mode 2: camera cast (phones — browsers can't capture the phone screen) ---------- */
  async function startCameraCast() {
    setStatus("starting");
    modeRef.current = "camera";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
        audio: false,
      });
      beginSession(stream).catch(() => { setErr("Could not connect to the TV — reload both pages and try again."); setStatus("error"); });
    } catch (e: any) {
      if (e?.name === "NotAllowedError") setErr("Camera permission denied — allow camera access when asked, then try again.");
      else setErr("Could not open the camera on this device. Open the link directly in Chrome (not inside another app).");
      setStatus("error");
    }
  }

  /* flip front/back camera without breaking the live connection */
  async function flipCamera() {
    const pc = pcRef.current;
    const old = streamRef.current;
    if (!pc || !old) return;
    const next = facing === "environment" ? "user" : "environment";
    try {
      const ns = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: next }, width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }, audio: false,
      });
      const nt = ns.getVideoTracks()[0];
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");
      if (sender) await sender.replaceTrack(nt); /* seamless — no re-negotiation */
      else pc.addTrack(nt, ns);
      streamRef.current = ns;
      if (videoRef.current) { videoRef.current.srcObject = ns; videoRef.current.play().catch(() => { /* muted autoplay */ }); }
      old.getTracks().forEach((t) => t.stop());
      setFacing(next);
    } catch { /* flip not possible on this device — ignore */ }
  }

  useEffect(() => {
    if (status !== "live") return;
    setSecs(0);
    const iv = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [status]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const liveLabel = status === "live" ? `● LIVE ${mm}:${ss}` : status === "lost" ? "Connection lost" : status === "ready" ? "Ready" : status === "starting" ? "Starting…" : status === "ended" ? "Ended" : "…";
  const liveColor = status === "live" ? "green" : status === "lost" || status === "error" ? "red" : "gray";

  return (
    <div className="cast-root sender">
      <header className="cast-head">
        <div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div>
        <span className={`cast-badge c-${liveColor}`}>{liveLabel}</span>
      </header>

      <main className="cast-sender-main">
        {status === "init" && <div className="cast-spin" />}

        {status === "ready" && canScreen && (
          <div className="cast-start-card">
            <div className="cast-start-ico"><Icon name="cast" size={44} /></div>
            <h2>Cast this screen to the TV</h2>
            <p>Tap start, choose <b>Entire screen</b> (or a single app/window), press <b>Share</b>. Your screen appears on the big screen instantly — live and encrypted, peer-to-peer.</p>
            <button className="cast-btn big" onClick={startCast}><Icon name="cast" size={22} /> Start Casting</button>
            <small>Works best in Chrome or Edge on a computer.</small>
          </div>
        )}

        {status === "ready" && !canScreen && canCamera && (
          <div className="cast-start-card">
            <div className="cast-start-ico"><Icon name="image" size={44} /></div>
            <h2>Camera Cast to the TV</h2>
            <p>Phone browsers cannot capture the phone screen (Android &amp; iPhone both block it) — <b>but your camera can go live on the big screen</b>. Perfect for showing a notebook, diagram, or experiment to the whole class.</p>
            <button className="cast-btn big" onClick={startCameraCast}><Icon name="image" size={22} /> Start Camera Cast</button>
            {mode === "camera" && <small>Starting with the back camera — you can flip it while live.</small>}
          </div>
        )}

        {status === "ready" && !canScreen && !canCamera && (
          <div className="cast-start-card">
            <div className="cast-start-ico bad"><Icon name="alertTriangle" size={44} /></div>
            <h2>Open this link in a real browser</h2>
            <p>It looks like this page opened inside another app&apos;s mini-browser, which blocks camera and screen access. Open it in <b>Chrome</b> and try again.</p>
            <button className="cast-btn light" onClick={() => location.reload()}><Icon name="refreshCw" size={17} /> Reload in browser</button>
            <small>Tip: tap the ⋮ menu → <b>Open in Chrome</b>, or copy the link and paste it in Chrome.</small>
          </div>
        )}

        {status === "starting" && <div className="cast-start-card"><div className="cast-spin" /><h2>Starting…</h2><p>{modeRef.current === "camera" ? "Allow the camera when the phone asks." : "Allow screen recording when asked."}</p></div>}

        {(status === "live" || status === "lost") && (
          <div className="cast-sender-live">
            <video ref={videoRef} autoPlay playsInline muted className={modeRef.current === "camera" ? "cam" : ""} />
            <p>{status === "live" ? (modeRef.current === "camera" ? "Your camera is on the big screen" : "Your screen is on the big screen") : "Reconnecting…"}</p>
            <div className="cast-live-row">
              {modeRef.current === "camera" && (
                <button className="cast-btn light sm" onClick={flipCamera}><Icon name="refreshCw" size={17} /> Flip camera</button>
              )}
              <button className="cast-btn danger sm" onClick={() => endCasting()}><Icon name="x" size={18} /> Stop</button>
            </div>
          </div>
        )}

        {status === "ended" && (
          <div className="cast-start-card">
            <div className="cast-start-ico ok"><Icon name="checkCircle" size={44} /></div>
            <h2>Cast ended</h2>
            <p>You can close this page now.</p>
          </div>
        )}

        {status === "error" && (
          <div className="cast-start-card">
            <div className="cast-start-ico bad"><Icon name="alertTriangle" size={44} /></div>
            <h2>Cannot cast</h2>
            <p>{err}</p>
            <Link href="/" className="cast-btn light">Back to Learning Hub</Link>
          </div>
        )}
      </main>
    </div>
  );
}
