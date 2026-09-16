"use client";
import { useEffect } from "react";

/* Anonymous live-session tracker: UUID v4 in sessionStorage, heartbeat every 30s,
   goodbye beacon on tab close, and a 15s poll for the teacher-authorization flag.
   When authorized, the Smart Board switches on its live classwork auto-save. */

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
    let sid = sessionStorage.getItem("sb-sid");
    if (!sid || sid.length < 8) {
      sid = (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem("sb-sid", sid);
    }
    const meta = detect();
    let authorized = false;

    const beat = (bye = false) =>
      fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid, ...meta, page: location.pathname, bye }),
        keepalive: bye,
      }).catch(() => undefined);

    const pollAuth = () =>
      fetch(`/api/session?sid=${encodeURIComponent(sid!)}`)
        .then((r) => r.json())
        .then((j) => {
          const now = !!j.authorized;
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
    const bye = () => beat(true);
    window.addEventListener("pagehide", bye);
    return () => {
      clearInterval(hb);
      clearInterval(pa);
      window.removeEventListener("pagehide", bye);
    };
  }, []);
  return null;
}

export function getSid() {
  try { return sessionStorage.getItem("sb-sid") || ""; } catch { return ""; }
}
