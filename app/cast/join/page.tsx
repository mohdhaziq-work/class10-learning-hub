"use client";
/* SCREEN CAST — SENDER (the phone).
   Open the QR link, tap Start, pick "Entire screen" — your phone appears
   on the TV/laptop instantly. Peer-to-peer + encrypted. */
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import "../cast.css";

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

type Status = "init" | "ready" | "starting" | "live" | "lost" | "ended" | "error";

function CastSenderInner() {
  const params = useSearchParams();
  const sid = (params.get("sid") || "").toLowerCase();
  const [status, setStatus] = useState<Status>("init");
  const [err, setErr] = useState("");
  const [secs, setSecs] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wakeRef = useRef<any>(null);
  const stopRef = useRef(false);

  useEffect(() => {
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

  async function startCast() {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setErr("This browser cannot share its screen. Use Chrome on Android, or a laptop — iPhones are not supported.");
      setStatus("error");
      return;
    }
    setStatus("starting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30, max: 60 } },
        audio: true, /* screen audio when the device allows it */
      });
    } catch (e: any) {
      try { stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30, max: 60 } } }); }
      catch (e2: any) {
        if (e2?.name === "NotAllowedError" || e?.name === "NotAllowedError") setErr("Permission denied — allow screen recording when asked, then try again.");
        else setErr("Could not start screen sharing on this device. Try Chrome on Android.");
        setStatus("error");
        return;
      }
    }
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
    stream.getVideoTracks()[0].addEventListener("ended", () => endCasting()); /* user pressed Stop in the system bar */

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await post({ a: "sig", sid, from: "sender", msgs: [{ type: "offer", sdp: { type: offer.type, sdp: offer.sdp } }] });

    /* poll for the viewer's answer + candidates */
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

  useEffect(() => {
    if (status !== "live") return;
    setSecs(0);
    const iv = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [status]);

  const post = (body: any) => fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="cast-root sender">
      <header className="cast-head">
        <div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div>
        <span className={`cast-badge c-${status === "live" ? "green" : status === "lost" ? "red" : status === "error" ? "red" : "gray"}`}>
          {status === "live" ? `● LIVE ${mm}:${ss}` : status === "lost" ? "Connection lost" : status === "ready" ? "Ready" : status === "starting" ? "Starting…" : status === "ended" ? "Ended" : "…"}
        </span>
      </header>

      <main className="cast-sender-main">
        {status === "init" && <div className="cast-spin" />}

        {status === "ready" && (
          <div className="cast-start-card">
            <div className="cast-start-ico"><Icon name="cast" size={44} /></div>
            <h2>Cast this phone to the big screen</h2>
            <p>Tap start, choose <b>Entire screen</b> (or any app), press <b>Start now</b>. Your screen appears on the TV instantly — live and encrypted, peer-to-peer.</p>
            <button className="cast-btn big" onClick={startCast}><Icon name="cast" size={22} /> Start Casting</button>
            <small>Tip: turn the phone sideways and the TV fills side-ways too. Keep the phone unlocked — it stays awake while casting.</small>
          </div>
        )}

        {status === "starting" && <div className="cast-start-card"><div className="cast-spin" /><h2>Starting…</h2><p>Allow screen recording when the phone asks.</p></div>}

        {(status === "live" || status === "lost") && (
          <div className="cast-sender-live">
            <video ref={videoRef} autoPlay playsInline muted />
            <p>{status === "live" ? "Your screen is on the big screen" : "Reconnecting…"}</p>
            <button className="cast-btn danger" onClick={() => endCasting()}><Icon name="x" size={18} /> Stop Casting</button>
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

export default function CastSender() {
  return (
    <Suspense fallback={<div className="cast-root sender"><header className="cast-head"><div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div></header><main className="cast-sender-main"><div className="cast-spin" /></main></div>}>
      <CastSenderInner />
    </Suspense>
  );
}
