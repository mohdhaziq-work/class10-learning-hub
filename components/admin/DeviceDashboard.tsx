"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface S {
  session_id: string;
  device_type: string;
  operating_system: string;
  browser_name: string;
  screen: string;
  page: string;
  opened_at: number;
  last_active: number;
  is_teacher_authorized: boolean;
}

const fmt = (t: number) => new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function DeviceDashboard() {
  const [sessions, setSessions] = useState<S[]>([]);
  const [live, setLive] = useState(false);
  const [, force] = useState(0);

  useEffect(() => {
    const es = new EventSource("/api/session/stream");
    es.onopen = () => setLive(true);
    es.onerror = () => setLive(false);
    es.onmessage = (e) => {
      try {
        const m = JSON.parse(e.data);
        if (m.type === "snapshot") setSessions(m.sessions || []);
      } catch { /* ignore */ }
    };
    const tick = setInterval(() => force((x) => x + 1), 15_000); /* refresh idle/active dots */
    return () => { es.close(); clearInterval(tick); };
  }, []);

  const authorize = async (s: S, v: boolean) => {
    setSessions((cur) => cur.map((x) => (x.session_id === s.session_id ? { ...x, is_teacher_authorized: v } : x)));
    await fetch("/api/session/authorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: s.session_id, authorized: v }),
    }).catch(() => undefined);
  };

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <span className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-bold border ${live ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"}`}>
          <span className={`w-2 h-2 rounded-full ${live ? "bg-emerald-500" : "bg-amber-500"}`} /> {live ? "Live feed connected" : "Reconnecting…"}
        </span>
        <span className="text-[13px] font-semibold text-ink-mute">{sessions.length} device{sessions.length === 1 ? "" : "s"} in pool · silent sessions drop after 2 minutes</span>
      </div>

      {sessions.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-ink-mute text-sm">
          No active sessions right now. Open the site on any phone, laptop or smart board and it will appear here instantly.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sessions.map((s) => {
          const idle = Date.now() - s.last_active > 60_000;
          return (
            <div key={s.session_id} className={`dev-card${s.is_teacher_authorized ? " auth" : ""}`}>
              <div className="flex items-center gap-2.5">
                <span className={`dev-dot ${idle ? "idle" : "on"}`} title={idle ? "Idle" : "Active now"} />
                <b className="text-[14.5px]">{s.device_type}</b>
                <span className="ml-auto font-mono text-[11px] text-ink-mute">{s.session_id.slice(0, 8)}</span>
              </div>
              <div className="dev-meta">
                <span><Icon name="monitorSmartphone" size={14} /> {s.operating_system}</span>
                <span><Icon name="globe" size={14} /> {s.browser_name}</span>
                {s.screen && <span><Icon name="scan" size={14} /> {s.screen}</span>}
              </div>
              <div className="dev-meta">
                <span>Entered {fmt(s.opened_at)}</span>
                <span>Last beat {fmt(s.last_active)}</span>
              </div>
              <div className="mt-3.5">
                {s.is_teacher_authorized ? (
                  <button onClick={() => authorize(s, false)} className="dev-btn on">
                    <Icon name="shieldCheck" size={15} /> Authorized Teacher Board — revoke
                  </button>
                ) : (
                  <button onClick={() => authorize(s, true)} className="dev-btn">
                    <Icon name="shieldCheck" size={15} /> Authorize as Teacher Board
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
