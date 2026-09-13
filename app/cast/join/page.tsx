"use client";
/* SCREEN CAST — SENDER page.
   • Laptop/PC (Chrome/Edge): cast the entire screen right from the browser.
   • Android phone: browsers are not allowed to capture the phone screen (Android
     blocks it for every website) — the free Screen Cast app does the real screen
     cast. This page hands off: install the app once, open it with the TV code.
   • iPhone: app not available yet — honest message. */
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import "../cast.css";

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

type Status = "init" | "ready" | "starting" | "live" | "lost" | "ended" | "error";

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
  const [canScreen, setCanScreen] = useState(true);
  const [hasMedia, setHasMedia] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [err, setErr] = useState("");
  const [secs, setSecs] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wakeRef = useRef<any>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    setCanScreen(typeof navigator.mediaDevices?.getDisplayMedia === "function");
    setHasMedia(!!navigator.mediaDevices);
    const ua = navigator.userAgent || "";
    const uad = (navigator as any).userAgentData;
    const isIosUa = /iPhone|iPad|iPod/i.test(ua)
      || (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 0)
      || uad?.platform === "iOS";
    /* Chrome Android in 'Desktop site' mode sends a Linux UA with no 'Android' —
       treat any touch device that is not iOS (and can't screen-share in-browser)
       as Android, so the app-install card still shows */
    const looksAndroid = /Android/i.test(ua) || uad?.platform === "Android"
      || ((navigator.maxTouchPoints || 0) > 0 && !isIosUa);
    setIsIOS(!looksAndroid);
    if (!sid) { setErr("No cast code in this link — scan the QR code on the TV screen."); setStatus("error"); return; }
    if (typeof navigator.mediaDevices?.getDisplayMedia === "function") {
      fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: "join", sid }) })
        .then((r) => r.json())
        .then((j) => { if (!j.ok) { setErr(j.error === "session not found" ? "This cast session is over — ask the TV to show a new QR." : String(j.error || "could not join")); setStatus("error"); } else setStatus("ready"); })
        .catch(() => { setErr("Network problem — check your internet and rescan."); setStatus("error"); });
    } else {
      setStatus("ready"); /* phone: no join needed — the app does the talking */
    }
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

  async function startCast() {
    if (typeof navigator.mediaDevices?.getDisplayMedia !== "function") return;
    setStatus("starting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30, max: 60 } },
        audio: true,
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
    streamRef.current = stream;
    if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => { /* muted autoplay */ }); }
    if ((navigator as any).wakeLock) wakeRef.current = await (navigator as any).wakeLock.request("screen").catch(() => null);

    const pc = new RTCPeerConnection(ICE);
    pcRef.current = pc;
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));
    /* QUALITY: lock bitrate high — crisp 1080p text, never blur (drop fps instead) */
    try {
      const vs = pc.getSenders().find((x) => x.track?.kind === "video");
      if (vs) {
        const prm = vs.getParameters();
        if (!prm.encodings?.length) prm.encodings = [{}];
        prm.encodings[0].maxBitrate = 12_000_000;
        (prm.encodings[0] as any).minBitrate = 4_000_000; /* chromium-only in the typings */
        (prm.encodings[0] as any).maxFramerate = 60;
        try { (prm as any).degradationPreference = "maintain-resolution"; } catch { /* unsupported */ }
        await vs.setParameters(prm).catch(() => { /* keep defaults */ });
      }
    } catch { /* older browser */ }
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
    stream.getVideoTracks()[0].addEventListener("ended", () => endCasting());

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

  useEffect(() => {
    if (status !== "live") return;
    setSecs(0);
    const iv = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [status]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const badgeText = status === "live" ? `● LIVE ${mm}:${ss}` : status === "lost" ? "Connection lost" : status === "ready" ? "Ready" : status === "starting" ? "Starting…" : status === "ended" ? "Ended" : "…";
  const badgeColor = status === "live" ? "green" : status === "lost" || status === "error" ? "red" : "gray";

  /* hand the code to the installed app — intent link (Android) */
  const openInApp = () => {
    const url = `intent://${location.host}/cast/join?sid=${sid}#Intent;scheme=https;package=com.class10hub.caster;S.browser_fallback_url=${encodeURIComponent(location.href)};end`;
    location.href = url;
  };

  const phoneApp = !canScreen && hasMedia && !isIOS;

  return (
    <div className="cast-root sender">
      <header className="cast-head">
        <div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div>
        <span className={`cast-badge c-${badgeColor}`}>{badgeText}</span>
      </header>

      <main className="cast-sender-main">
        {status === "init" && <div className="cast-spin" />}

        {/* ---------- laptop / desktop: real screen cast from the browser ---------- */}
        {status === "ready" && canScreen && (
          <div className="cast-start-card">
            <div className="cast-start-ico"><Icon name="cast" size={44} /></div>
            <h2>Cast this screen to the TV</h2>
            <p>Tap start, choose <b>Entire screen</b> (or a single app/window), press <b>Share</b>. Your screen appears on the big screen instantly — live and encrypted, peer-to-peer.</p>
            <button className="cast-btn big" onClick={startCast}><Icon name="cast" size={22} /> Start Casting</button>
            <small>Works best in Chrome or Edge on a computer.</small>
          </div>
        )}

        {/* ---------- Android phone: hand off to the Screen Cast app ---------- */}
        {status === "ready" && phoneApp && (
          <div className="cast-start-card">
            <div className="cast-start-ico"><Icon name="cast" size={44} /></div>
            <h2>Cast this phone&apos;s screen</h2>
            <p>No browser is allowed to capture a phone&apos;s screen — that&apos;s an Android rule for every website. The free <b>Screen Cast app</b> does it. Install once, then every cast is one tap.</p>
            <div className="cast-steps">
              <div className="cast-step"><b>1</b><span>Install the app (~10 MB) — Chrome may ask to allow installs, allow it once</span></div>
              <div className="cast-step"><b>2</b><span>Open the app — it fills this code automatically, or type it:</span></div>
              <div className="cast-code-big">{sid}</div>
              <div className="cast-step"><b>3</b><span>Press <b>Start Casting</b> in the app — allow screen recording</span></div>
            </div>
            <a className="cast-btn big" href="/caster.apk" download><Icon name="download" size={20} /> Install Screen Cast app</a>
            <button className="cast-btn light sm" onClick={openInApp}><Icon name="cast" size={17} /> App installed? Open it with this code</button>
            <small>Everything is peer-to-peer and encrypted — your screen never touches any server.</small>
          </div>
        )}

        {/* ---------- iPhone: honest message ---------- */}
        {status === "ready" && !canScreen && hasMedia && isIOS && (
          <div className="cast-start-card">
            <div className="cast-start-ico bad"><Icon name="alertTriangle" size={44} /></div>
            <h2>iPhone screen cast — coming soon</h2>
            <p>iPhone does not allow any website to capture its screen, and the cast app is Android-only for now. Cast from an <b>Android phone</b> or any <b>laptop / PC</b> instead.</p>
          </div>
        )}

        {/* ---------- in-app browser ---------- */}
        {status === "ready" && !hasMedia && (
          <div className="cast-start-card">
            <div className="cast-start-ico bad"><Icon name="alertTriangle" size={44} /></div>
            <h2>Open this link in a real browser</h2>
            <p>This page opened inside another app&apos;s mini-browser. Copy the link and open it in <b>Chrome</b>.</p>
            <div className="cast-code-big">{sid}</div>
            <button className="cast-btn light" onClick={() => location.reload()}><Icon name="refreshCw" size={17} /> Reload</button>
          </div>
        )}

        {status === "starting" && <div className="cast-start-card"><div className="cast-spin" /><h2>Starting…</h2><p>Allow screen recording when asked.</p></div>}

        {(status === "live" || status === "lost") && (
          <div className="cast-sender-live">
            <video ref={videoRef} autoPlay playsInline muted />
            <p>{status === "live" ? "Your screen is on the big screen" : "Reconnecting…"}</p>
            <div className="cast-live-row">
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
