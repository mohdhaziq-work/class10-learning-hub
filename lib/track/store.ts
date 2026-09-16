/* Persistent device-tracking vault (local-first — no external DB required).

   Two pools:
   - LIVE sessions: heartbeat every 30s, pruned after 2 silent minutes.
   - device_history_logs: PERMANENT ledger — never dropped on tab close or
     heartbeat loss. Keyed by device_uuid (client localStorage fingerprint),
     so the same smart board keeps one identity forever. Approval status
     (PENDING / AUTHORIZED_TEACHER / REVOKED) persists to a JSON vault file
     on the server so delayed admin authorization survives restarts. */

import fs from "fs";
import path from "path";

export type ApprovalStatus = "PENDING" | "AUTHORIZED_TEACHER" | "REVOKED";

export interface TrackedSession {
  session_id: string;
  device_uuid: string;
  device_type: string;
  operating_system: string;
  browser_name: string;
  screen: string;
  page: string;
  opened_at: number;
  last_active: number;
}

export interface DeviceLog {
  device_uuid: string;
  session_id: string;
  device_metadata: {
    operating_system: string;
    browser_name: string;
    device_type: string;
    screen: string;
  };
  first_connection_time: number;
  last_seen_time: number;
  approval_status: ApprovalStatus;
}

export interface ClassworkEntry {
  id: string;
  session_id: string;
  device: string;
  saved_at: number;
  png: string;
}

const G = globalThis as unknown as {
  __track?: {
    sessions: Map<string, TrackedSession>;
    history: Map<string, DeviceLog>;
    classwork: ClassworkEntry[];
    listeners: Set<() => void>;
    persistT?: ReturnType<typeof setTimeout>;
  };
};

function store() {
  if (!G.__track) {
    const t = { sessions: new Map<string, TrackedSession>(), history: new Map<string, DeviceLog>(), classwork: [] as ClassworkEntry[], listeners: new Set<() => void>() };
    G.__track = t;
    loadVault();
  }
  return G.__track!;
}

/* ---------------- persistent vault file ---------------- */
const VAULT = path.join(process.cwd(), ".data", "device_history_logs.json");

function loadVault() {
  try {
    const raw = fs.readFileSync(VAULT, "utf8");
    const j = JSON.parse(raw) as { history?: DeviceLog[]; classwork?: ClassworkEntry[] };
    for (const h of j.history || []) store_historySet(h);
    store_classworkSet(j.classwork || []);
  } catch { /* first boot — empty vault */ }
}

function schedulePersist() {
  const t = store();
  if (t.persistT) return;
  t.persistT = setTimeout(() => {
    t.persistT = undefined;
    try {
      fs.mkdirSync(path.dirname(VAULT), { recursive: true });
      fs.writeFileSync(VAULT, JSON.stringify({
        history: [...store().history.values()],
        classwork: store().classwork,
      }));
    } catch { /* ephemeral FS full/unwritable — live memory still authoritative */ }
  }, 800);
}
function store_historySet(h: DeviceLog) { store().history.set(h.device_uuid, h); }
function store_classworkSet(c: ClassworkEntry[]) { store().classwork = c; }

export const STALE_MS = 120_000; /* live pool only — history never prunes */

export function prune() {
  const t = store();
  const now = Date.now();
  for (const [id, s] of t.sessions) if (now - s.last_active > STALE_MS) t.sessions.delete(id);
}

export function touch(p: {
  session_id: string; device_uuid: string;
  device_type?: string; operating_system?: string; browser_name?: string; screen?: string; page?: string;
}) {
  const t = store();
  const now = Date.now();
  /* live session */
  const oldS = t.sessions.get(p.session_id);
  t.sessions.set(p.session_id, {
    session_id: p.session_id,
    device_uuid: p.device_uuid,
    device_type: p.device_type || oldS?.device_type || "Unknown",
    operating_system: p.operating_system || oldS?.operating_system || "Unknown",
    browser_name: p.browser_name || oldS?.browser_name || "Unknown",
    screen: p.screen || oldS?.screen || "",
    page: p.page || oldS?.page || "",
    opened_at: oldS?.opened_at || now,
    last_active: now,
  });
  /* permanent ledger */
  const old = t.history.get(p.device_uuid);
  t.history.set(p.device_uuid, {
    device_uuid: p.device_uuid,
    session_id: p.session_id,
    device_metadata: {
      operating_system: p.operating_system || old?.device_metadata.operating_system || "Unknown",
      browser_name: p.browser_name || old?.device_metadata.browser_name || "Unknown",
      device_type: p.device_type || old?.device_metadata.device_type || "Unknown",
      screen: p.screen || old?.device_metadata.screen || "",
    },
    first_connection_time: old?.first_connection_time || now,
    last_seen_time: now,
    approval_status: old?.approval_status || "PENDING",
  });
  schedulePersist();
  notify();
  return t.history.get(p.device_uuid)!;
}

export function byeSession(id: string) {
  if (store().sessions.delete(id)) notify();
}

export function liveList(): TrackedSession[] {
  prune();
  return [...store().sessions.values()].sort((a, b) => b.last_active - a.last_active);
}

/* Historical ledger, indexed by last_seen_time (most recent first) */
export function historyList(): DeviceLog[] {
  return [...store().history.values()].sort((a, b) => b.last_seen_time - a.last_seen_time);
}

export function approvalFor(deviceUuid: string): ApprovalStatus | null {
  return store().history.get(deviceUuid)?.approval_status ?? null;
}

export function approvalForSession(sessionId: string): ApprovalStatus | null {
  const s = store().sessions.get(sessionId);
  if (s) return approvalFor(s.device_uuid);
  return null;
}

export function setApproval(deviceUuid: string, status: ApprovalStatus): boolean {
  const h = store().history.get(deviceUuid);
  if (!h) return false;
  h.approval_status = status;
  h.last_seen_time = Math.max(h.last_seen_time, Date.now());
  schedulePersist();
  notify();
  return true;
}

/* ---------------- classwork archive ---------------- */
export function archiveClasswork(e: Omit<ClassworkEntry, "id" | "saved_at">) {
  const t = store();
  t.classwork.unshift({ ...e, id: Math.random().toString(36).slice(2, 10), saved_at: Date.now() });
  if (t.classwork.length > 40) t.classwork.length = 40;
  schedulePersist();
  notify();
}
export function classworkList() { return store().classwork; }

/* ---------------- live push (SSE) ---------------- */
export function subscribe(fn: () => void) {
  const t = store();
  t.listeners.add(fn);
  return () => t.listeners.delete(fn);
}
function notify() { for (const fn of store().listeners) fn(); }
