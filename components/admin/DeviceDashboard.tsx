"use client";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface Live { session_id: string; device_uuid: string; last_active: number; page: string }
interface Log {
  device_uuid: string;
  session_id: string;
  device_metadata: { operating_system: string; browser_name: string; device_type: string; screen: string };
  ip?: string;
  geo?: string;
  source?: "live" | "backfill";
  first_connection_time: number;
  last_seen_time: number;
  approval_status: "PENDING" | "AUTHORIZED_TEACHER" | "REVOKED";
}

type Filter = "all" | "pending" | "approved";

const fmt = (t: number) => new Date(t).toLocaleString([], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
const ago = (t: number) => {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (m < 1440) return `${Math.floor(m / 60)}h ago`;
  return `${Math.floor(m / 1440)}d ago`;
};

export default function DeviceDashboard() {
  const [live, setLive] = useState<Live[]>([]);
  const [history, setHistory] = useState<Log[]>([]);
  const [connected, setConnected] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [, force] = useState(0);
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  /* admin-only page: visible on an authorized (admin) device, or once opened
     with the access key (?key=class10-admin) which unlocks this browser */
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("key");
    let auth = false;
    try {
      auth = localStorage.getItem("sb-live-auth") === "1" || localStorage.getItem("sb-admin-unlock") === "1";
      if (key === "class10-admin") { localStorage.setItem("sb-admin-unlock", "1"); auth = true; }
    } catch { /* private mode */ }
    setUnlocked(auth);
  }, []);

  useEffect(() => {
    const es = new EventSource("/api/session/stream");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      try {
        const m = JSON.parse(e.data);
        if (m.type === "snapshot") { setLive(m.sessions || []); setHistory(m.history || []); }
      } catch { /* ignore */ }
    };
    const tick = setInterval(() => force((x) => x + 1), 20_000);
    return () => { es.close(); clearInterval(tick); };
  }, []);

  const rows = useMemo(() => {
    /* vault arrives pre-sorted by last_seen_time desc (today's board on top) */
    const base = filter === "pending" ? history.filter((h) => h.approval_status === "PENDING")
      : filter === "approved" ? history.filter((h) => h.approval_status === "AUTHORIZED_TEACHER")
      : history;
    return base;
  }, [history, filter]);

  const setStatus = async (deviceUuid: string, status: "AUTHORIZED_TEACHER" | "REVOKED") => {
    setHistory((cur) => cur.map((h) => (h.device_uuid === deviceUuid ? { ...h, approval_status: status } : h)));
    await fetch("/api/session/authorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_uuid: deviceUuid, status }),
    }).catch(() => undefined);
  };

  const liveUuids = new Set(live.map((l) => l.device_uuid));

  if (unlocked === null) return null;
  if (!unlocked) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center max-w-xl mx-auto mt-8">
        <div className="w-12 h-12 rounded-2xl grid place-items-center bg-slate-900 text-white mx-auto mb-4">
          <Icon name="shieldCheck" size={22} />
        </div>
        <h2 className="text-lg font-extrabold tracking-tight">Admin access only</h2>
        <p className="text-ink-soft text-sm mt-2">
          This dashboard lists every connected device, so it is locked to admin devices.
          Open it once on an authorized device, or use the access key link you received.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <span className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-bold border ${connected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"}`}>
          <span className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-500" : "bg-amber-500"}`} /> {connected ? "Live feed connected" : "Reconnecting…"}
        </span>
        <div className="seg-row" style={{ display: "inline-flex", gap: 6 }}>
          {([["all", "All devices"], ["pending", "Pending approval"], ["approved", "Approved teachers"]] as [Filter, string][]).map(([f, label]) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`f-chip${filter === f ? " on" : ""}`}>{label}</button>
          ))}
        </div>
        <span className="text-[13px] font-semibold text-ink-mute ml-auto">{history.length} device{history.length === 1 ? "" : "s"} in permanent ledger · sorted by last active</span>
      </div>

      {rows.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-ink-mute text-sm">
          {history.length === 0
            ? "No devices logged yet. Open the site on any phone, laptop or smart board — it joins the permanent ledger instantly and stays forever."
            : "Nothing matches this filter."}
        </div>
      )}

      {(() => {
        const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0);
        const groups: [string, string, Log[]][] = [
          ["Active This Morning / Today", "every device seen since midnight", rows.filter((r) => r.last_seen_time >= +dayStart)],
          ["Historical Connections", "complete ledger since the platform's first day", rows.filter((r) => r.last_seen_time < +dayStart)],
        ];
        return groups.filter(([, , g]) => g.length > 0).map(([title, sub, g]) => (
          <section key={title} className="mb-8">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-[17px] font-extrabold tracking-tight">{title}</h3>
              <span className="text-[12.5px] font-semibold text-ink-mute">{sub} · {g.length}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {g.map((h) => {
          const online = liveUuids.has(h.device_uuid);
          const approved = h.approval_status === "AUTHORIZED_TEACHER";
          return (
            <div key={h.device_uuid} className={`dev-card${approved ? " auth" : ""}`}>
              <div className="flex items-center gap-2.5">
                <span className={`dev-dot ${online ? "on" : "idle"}`} title={online ? "Online now" : "Offline"} />
                <b className="text-[14.5px]">{h.device_metadata.device_type}</b>
                <span className="ml-auto font-mono text-[11px] text-ink-mute">{h.device_uuid.slice(0, 8)}</span>
              </div>
              <div className="dev-meta">
                <span><Icon name="monitorSmartphone" size={14} /> {h.device_metadata.operating_system}</span>
                <span><Icon name="globe" size={14} /> {h.device_metadata.browser_name}</span>
                {h.device_metadata.screen && <span><Icon name="scan" size={14} /> {h.device_metadata.screen}</span>}
              </div>
              <div className="dev-meta">
                <span>First seen {fmt(h.first_connection_time)}</span>
                <span>Last active {ago(h.last_seen_time)}</span>
              </div>
              <div className="dev-meta">
                {h.ip && <span className="font-mono" style={{ fontSize: 11.5 }}>{h.ip}</span>}
                {h.geo ? <span><Icon name="mapPin" size={14} /> {h.geo}</span> : h.ip ? <span>geo resolving…</span> : null}
                {h.source === "backfill" && <span>backfilled</span>}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`st-chip ${approved ? "ok" : h.approval_status === "REVOKED" ? "no" : "wait"}`}>
                  {approved ? "Authorized teacher" : h.approval_status === "REVOKED" ? "Revoked" : "Pending approval"}
                </span>
                {approved && <span className="st-chip" style={{ background: "#e8f0fe", color: "#1a73e8" }}>Admin device</span>}
                {online && <span className="st-chip live">Online now</span>}
              </div>
              <div className="mt-3.5">
                {approved ? (
                  <button onClick={() => setStatus(h.device_uuid, "REVOKED")} className="dev-btn on">
                    <Icon name="shieldCheck" size={15} /> Authorized — revoke device
                  </button>
                ) : (
                  <button onClick={() => setStatus(h.device_uuid, "AUTHORIZED_TEACHER")} className="dev-btn">
                    <Icon name="shieldCheck" size={15} /> Authorize Device
                  </button>
                )}
              </div>
            </div>
              );
              })}
            </div>
          </section>
        ));
      })()}
    </div>
  );
}
