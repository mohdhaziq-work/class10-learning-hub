"use client";
/* SCREEN CAST — RECEIVER (the TV / laptop / projector).
   Open this page on the big screen, scan the QR with your phone,
   and the phone's screen appears here — live, peer-to-peer, encrypted. */
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Icon } from "@/components/ui/Icon";
import "./cast.css";

const ICE: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };

type Status = "init" | "waiting" | "connecting" | "live" | "lost" | "ended" | "error";

export default function CastReceiver() {
  const [status, setStatus] = useState<Status>("init");
  const [sid, setSid] = useState("");
  const [joinUrl, setJoinUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState("");
  const [tapHint, setTapHint] = useState(false);
  const [blackWarn, setBlackWarn] = useState(false);
  const blackN = useRef(0);
  const [err, setErr] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const probeRef = useRef<HTMLCanvasElement | null>(null);
  const sidRef = useRef("");
  const stopRef = useRef(false);

  const post = useCallback(async (body: any) => {
    const r = await fetch("/api/cast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return r.json();
  }, []);

  const sendSigs = useCallback(async (msgs: any[]) => {
    if (!msgs.length || !sidRef.current) return;
    await post({ a: "sig", sid: sidRef.current, from: "viewer", msgs });
  }, [post]);

  /* mobile browsers block autoplay without a tap — retry forever + show a hint */
  const playVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.srcObject) return;
    v.muted = true;
    v.play().catch(() => { setTapHint(true); });
  }, []);

  const teardown = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const handleOffer = useCallback(async (sdp: RTCSessionDescriptionInit) => {
    teardown();
    const pc = new RTCPeerConnection(ICE);
    pcRef.current = pc;
    setStatus("connecting");
    const cands: any[] = [];
    pc.onicecandidate = (e) => { if (e.candidate) cands.push({ type: "cand", cand: e.candidate.toJSON() }); };
    let iceTimer: any = 0;
    const flush = () => sendSigs(cands.splice(0));
    pc.onicegatheringstatechange = () => { if (pc.iceGatheringState === "complete") { clearTimeout(iceTimer); flush(); } };
    iceTimer = setTimeout(flush, 1200); /* trickle early, complete fires later anyway */
    pc.ontrack = (e) => {
      /* LATENCY: don't let the jitter buffer buffer — show frames as they arrive */
      try { (e.receiver as any).playoutDelayHint = 0; } catch { /* unsupported */ }
      try { (e.receiver as any).jitterBufferTarget = 0; } catch { /* unsupported */ }
      if (videoRef.current && e.streams[0]) {
        videoRef.current.srcObject = e.streams[0];
        playVideo();
      }
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") setStatus("live");
      else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") setStatus((s) => (s === "ended" ? s : "lost"));
    };
    await pc.setRemoteDescription(sdp);
    const ans = await pc.createAnswer();
    await pc.setLocalDescription(ans);
    await sendSigs([{ type: "answer", sdp: { type: ans.type, sdp: ans.sdp } }]);
  }, [sendSigs, teardown]);

  /* session + poll loop */
  useEffect(() => {
    let timer: any = 0;
    let after = 0;
    let alive = true;
    stopRef.current = false;
    (async () => {
      try {
        const j = await post({ a: "create" });
        if (!alive || !j.ok) throw new Error(j.error || "could not create session");
        sidRef.current = j.sid;
        setSid(j.sid);
        const url = `${location.origin}/cast/join?sid=${j.sid}`;
        setJoinUrl(url);
        setStatus("waiting");
        QRCode.toCanvas(document.getElementById("castQr") as HTMLCanvasElement, url, { width: 232, margin: 1, color: { dark: "#0b1220", light: "#ffffff" } }).catch(() => { /* qr fail → link still shown */ });
      } catch (e: any) { setErr(String(e.message || e)); setStatus("error"); return; }

      const poll = async () => {
        if (!alive) return;
        try {
          const r = await fetch(`/api/cast?sid=${sidRef.current}&from=viewer&after=${after}`);
          const j = await r.json();
          if (!j.ok) { if (String(j.error).includes("not found")) { setStatus("ended"); return; } }
          else {
            after = j.msgs.length ? j.msgs[j.msgs.length - 1].id : after;
            for (const m of j.msgs) {
              const msg = m.msg;
              if (msg.type === "offer") { await handleOffer(msg.sdp); }
              else if (msg.type === "cand") { pcRef.current?.addIceCandidate(msg.cand).catch(() => { /* stale candidate */ }); }
              else if (msg.type === "joined") { /* phone is in */ }
              else if (msg.type === "bye") { teardown(); setStatus("ended"); return; }
            }
          }
        } catch { /* transient network hiccup — keep polling */ }
        if (!stopRef.current) timer = setTimeout(poll, pcRef.current?.connectionState === "connected" ? 3000 : 350);
      };
      poll();
    })();
    return () => { alive = false; stopRef.current = true; clearTimeout(timer); teardown(); };
  }, [handleOffer, teardown, post]);

  /* live stats: resolution + fps */
  useEffect(() => {
    const iv = setInterval(async () => {
      const pc = pcRef.current;
      if (!pc || pc.connectionState !== "connected") { setStats(""); return; }
      try {
        const st = await pc.getStats();
        let res = "", fps = "";
        st.forEach((r: any) => {
          if (r.type === "inbound-rtp" && r.kind === "video") {
            if (r.frameWidth) res = `${r.frameWidth}×${r.frameHeight}`;
            if (r.framesPerSecond) fps = `${Math.round(r.framesPerSecond)} fps`;
          }
        });
        setStats([res, fps].filter(Boolean).join(" · "));
        /* black-screen watchdog: playing + decoding but picture pure black for ~4s */
        const v = videoRef.current;
        if (v && !v.paused && v.videoWidth > 0) {
          try {
            if (!probeRef.current) { const c = document.createElement("canvas"); c.width = 16; c.height = 9; probeRef.current = c; }
            const px = probeRef.current.getContext("2d")!;
            px.drawImage(v, 0, 0, 16, 9);
            const d = px.getImageData(0, 0, 16, 9).data;
            let sum = 0;
            for (let i = 0; i < d.length; i += 4) sum += d[i] + d[i + 1] + d[i + 2];
            if (sum < 40) { blackN.current++; if (blackN.current >= 3) setBlackWarn(true); }
            else { blackN.current = 0; setBlackWarn(false); }
          } catch { /* not decodable yet */ }
        } else blackN.current = 0;
      } catch { /* stats not ready */ }
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  /* keep retrying play + keep the receiving device awake while live */
  useEffect(() => {
    if (status !== "live" && status !== "lost") { setTapHint(false); return; }
    const iv = setInterval(() => {
      const v = videoRef.current;
      if (v && v.srcObject) { if (v.paused) { playVideo(); } else setTapHint(false); }
    }, 700);
    let wl: any = null;
    const reqWl = () => { if ((navigator as any).wakeLock && document.visibilityState === "visible") (navigator as any).wakeLock.request("screen").then((w: any) => { wl = w; }).catch(() => { /* denied */ }); };
    reqWl();
    const vis = () => { if (document.visibilityState === "visible") { playVideo(); reqWl(); } };
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(iv); document.removeEventListener("visibilitychange", vis); try { wl?.release?.(); } catch { /* gone */ } };
  }, [status, playVideo]);

  const stopCasting = async () => {
    stopRef.current = true;
    await post({ a: "end", sid: sidRef.current, from: "viewer" }).catch(() => { /* already gone */ });
    teardown();
    setStatus("ended");
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(joinUrl); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked */ }
  };

  const goFull = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen().then(() => {
      playVideo();
      try { (screen.orientation as any)?.lock?.("landscape").catch(() => { /* not allowed — fine */ }); } catch { /* unsupported */ }
    }).catch(() => { /* denied */ });
  };

  const badge = {
    init: { t: "Setting up…", c: "gray" },
    waiting: { t: "Waiting for phone…", c: "amber" },
    connecting: { t: "Connecting…", c: "amber" },
    live: { t: "● LIVE", c: "green" },
    lost: { t: "Connection lost — reconnecting", c: "red" },
    ended: { t: "Cast ended", c: "gray" },
    error: { t: "Something went wrong", c: "red" },
  }[status];

  return (
    <div className="cast-root">
      <header className="cast-head">
        <Link href="/" className="cast-back" title="Back to Learning Hub"><Icon name="arrowLeft" size={18} /></Link>
        <div className="cast-brand"><Icon name="cast" size={22} /><b>Screen Cast</b></div>
        <span className={`cast-badge c-${badge.c}`}>{badge.t}</span>
      </header>

      <main className="cast-main">
        <div className={`cast-stage ${status === "live" || status === "lost" ? "showing" : ""}`} ref={stageRef} onClick={playVideo}>
          <video ref={videoRef} autoPlay playsInline muted onPlaying={() => setTapHint(false)} onLoadedMetadata={playVideo} onCanPlay={playVideo} />
          {status !== "live" && status !== "lost" && (
            <div className="cast-placeholder">
              {status === "waiting" || status === "init" ? <><Icon name="cast" size={54} /><p>The big screen is ready.<br />Scan the QR from your phone to start casting.</p></> : null}
              {status === "connecting" ? <><span className="cast-spin" /><p>Connecting to phone…</p></> : null}
              {status === "ended" ? <><Icon name="checkCircle" size={54} /><p>Cast ended.<br />Scan again from a phone to cast once more.</p>
                <button className="cast-btn light" onClick={() => location.reload()}><Icon name="refreshCw" size={17} /> New QR</button></> : null}
              {status === "error" ? <><Icon name="alertTriangle" size={54} /><p>{err}</p></> : null}
            </div>
          )}
          {blackWarn && status === "live" && (
            <div className="cast-black-warn" onClick={() => setBlackWarn(false)}>
              <Icon name="alertTriangle" size={20} />
              <span>Picture is coming in black — the app being shared may block recording. If it stays black, press Stop on the phone and try <b>Camera&nbsp;Cast</b> instead. <u>Dismiss</u></span>
            </div>
          )}
          {tapHint && (status === "live" || status === "lost") && (
            <div className="cast-tap-hint" onClick={playVideo}><Icon name="play" size={20} /> Tap to show video</div>
          )}
          {(status === "live" || status === "lost") && (
            <div className="cast-live-bar">
              <span className="cast-stats">{stats}</span>
              <button className="cast-iconbtn" onClick={goFull} title="Fullscreen (double-tap video also works)"><Icon name="maximize" size={18} /></button>
              <button className="cast-iconbtn danger" onClick={stopCasting} title="Stop casting"><Icon name="x" size={18} /></button>
            </div>
          )}
        </div>

        <aside className="cast-side">
          <div className="cast-qr-card">
            <h3>Cast from your phone</h3>
            <ol>
              <li>Scan this QR with the <b>casting phone</b></li>
              <li>Android: install the tiny <b>Cast app</b> (one time) and press Start</li>
              <li>Laptop / PC: press <b>Start Casting</b> right in the browser</li>
            </ol>
            <div className="cast-qr-wrap"><canvas id="castQr" width={232} height={232} /></div>
            <div className="cast-code">Code <b>{sid || "…"}</b></div>
            <div className="cast-link-row">
              <span className="cast-link">{joinUrl}</span>
              <button className="cast-iconbtn" onClick={copyLink} title="Copy link">{copied ? <Icon name="check" size={16} /> : <Icon name="share2" size={16} />}</button>
            </div>
            <p className="cast-note">Peer-to-peer &amp; end-to-end encrypted — your screen never touches any server. Keep both devices on the same Wi-Fi for the best quality.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
