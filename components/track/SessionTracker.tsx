"use client";
import { useEffect } from "react";

/* Persistent device tracker:
   - device_uuid: permanent fingerprint in localStorage (survives reboots)
   - session_id:  per-tab UUID in sessionStorage, 30s heartbeat + bye beacon
   - every beat refreshes last_seen_time in the permanent ledger
   - 15s approval handshake by device_uuid; result cached in localStorage so an
     authorized board unlocks instantly on next boot (server stays authoritative) */

function detect() {
  const ua = navigator.userAgent;
  const os = /Windows/i.test(ua) ? "Windows"
    : /Android/i.test(ua) ? "Android"
    : /iPhone|iPad|iPod/i.test(ua) ? "iOS"
    : /Mac/i.test(ua) ? "macOS"
    : /CrOS/i.test(ua) ? "ChromeOS"
    : /Linux/i.test(ua) ? "Linux" : "Unknown";
  const browser = /Edg\//i.test(ua) ? "Edge"
    : /Firefox/i.test(ua) ? "Firefox"
    : /Chrome\//i.test(ua) ? "Chrome"
    : /Safari\//i.test(ua) ? "Safari" : "Unknown";
  const device = /SmartTV|Smart-TV|WebTV|Tizen|AppleTV/i.test(ua) ? "Smart TV / Projector"
    : /iPad|Tablet|Android(?!.*Mobile)/i.test(ua) ? "Tablet"
    : /Mobi|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop";
  return { os, browser, device, screen: `${screen.width}x${screen.height}` };
}

export default function SessionTracker() {
  useEffect(() => {
    let dev = localStorage.getItem("sb-device-uuid");
    if (!dev || dev.length < 8) {
      dev = crypto?.randomUUID ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("sb-device-uuid", dev);
    }
    let sid = sessionStorage.getItem("sb-sid");
    if (!sid || sid.length < 8) {
      sid = crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("sb-sid", sid);
    }
    const meta = detect();

    /* instant unlock from the cached handshake; the poll corrects it */
    let authorized = localStorage.getItem("sb-live-auth") === "1";
    (window as any).__sbLive = authorized;

    let lastBeat = 0;
    const beat = (bye = false) => {
      lastBeat = Date.now();
      fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid, device_uuid: dev, ...meta, page: location.pathname, bye }),
        keepalive: bye,
      }).catch(() => undefined);
    };

    const pollAuth = () =>
      fetch(`/api/session?device=${encodeURIComponent(dev!)}`)
        .then((r) => r.json())
        .then((j) => {
          const now = !!j.authorized;
          try { localStorage.setItem("sb-live-auth", now ? "1" : "0"); } catch { /* private mode */ }
          if (now !== authorized) {
            authorized = now;
            (window as any).__sbLive = now;
            window.dispatchEvent(new CustomEvent("sb-live", { detail: { authorized: now } }));
          }
        })
        .catch(() => undefined);

    beat();
    pollAuth();
    const hb = setInterval(() => beat(), 30_000);
    const pa = setInterval(pollAuth, 15_000);
    /* canvas/teaching activity also refreshes last_seen (throttled to 60s) */
    const onAct = () => { if (Date.now() - lastBeat > 60_000) beat(); };
    window.addEventListener("pointerdown", onAct, { passive: true });
    const bye = () => beat(true);
    window.addEventListener("pagehide", bye);
    return () => {
      clearInterval(hb);
      clearInterval(pa);
      window.removeEventListener("pointerdown", onAct);
      window.removeEventListener("pagehide", bye);
    };
  }, []);
  return null;
}

export function getSid() {
  try { return sessionStorage.getItem("sb-sid") || ""; } catch { return ""; }
}
