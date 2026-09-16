/* Live device-tracking store (server-side, local-first — no external DB needed).
   Sessions heartbeat every 30s; anything silent for 2 minutes is pruned.
   Kept on globalThis so HMR/dev restarts do not split the store. */

export interface TrackedSession {
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
    classwork: ClassworkEntry[];
    listeners: Set<() => void>;
  };
};

function store() {
  if (!G.__track) G.__track = { sessions: new Map(), classwork: [], listeners: new Set() };
  return G.__track;
}

export const STALE_MS = 120_000; /* 2 minutes without a heartbeat = dead session */

export function prune() {
  const t = store();
  const now = Date.now();
  let changed = false;
  for (const [id, s] of t.sessions) {
    if (now - s.last_active > STALE_MS) {
      t.sessions.delete(id);
      changed = true;
    }
  }
  if (changed) notify();
}

export function upsert(p: { session_id: string; device_type?: string; operating_system?: string; browser_name?: string; screen?: string; page?: string }) {
  const t = store();
  const now = Date.now();
  const old = t.sessions.get(p.session_id);
  const next: TrackedSession = {
    session_id: p.session_id,
    device_type: p.device_type || old?.device_type || "Unknown",
    operating_system: p.operating_system || old?.operating_system || "Unknown",
    browser_name: p.browser_name || old?.browser_name || "Unknown",
    screen: p.screen || old?.screen || "",
    page: p.page || old?.page || "",
    opened_at: old?.opened_at || now,
    last_active: now,
    is_teacher_authorized: old?.is_teacher_authorized ?? false,
  };
  t.sessions.set(p.session_id, next);
  notify();
  return next;
}

export function remove(id: string) {
  const t = store();
  if (t.sessions.delete(id)) notify();
}

export function get(id: string) {
  prune();
  return store().sessions.get(id);
}

export function list(): TrackedSession[] {
  prune();
  return [...store().sessions.values()].sort((a, b) => b.last_active - a.last_active);
}

export function setAuthorized(id: string, v: boolean) {
  const t = store();
  const s = t.sessions.get(id);
  if (!s) return false;
  s.is_teacher_authorized = v;
  s.last_active = Date.now();
  notify();
  return true;
}

/* ---- classwork archive (authorized boards only) ---- */
export function archiveClasswork(e: Omit<ClassworkEntry, "id" | "saved_at">) {
  const t = store();
  t.classwork.unshift({ ...e, id: Math.random().toString(36).slice(2, 10), saved_at: Date.now() });
  if (t.classwork.length > 40) t.classwork.length = 40;
  notify();
}

export function classworkList() {
  return store().classwork;
}

/* ---- live push (SSE) ---- */
export function subscribe(fn: () => void) {
  const t = store();
  t.listeners.add(fn);
  return () => t.listeners.delete(fn);
}
function notify() {
  for (const fn of store().listeners) fn();
}
