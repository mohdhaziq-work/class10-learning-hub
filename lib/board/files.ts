/* Saved files — IndexedDB store so teachers never re-upload the same file.
   Phone scans / local opens are cached on the device; LRU caps keep it tidy. */

export interface SavedFileMeta { id: string; name: string; size: number; type: string; savedAt: number; openedAt: number }
export interface SavedFileRec extends SavedFileMeta { blob: Blob }

const DB_NAME = "sb-files";
const STORE = "files";
export const MAX_FILES = 24;
export const MAX_TOTAL = 220 * 1024 * 1024; /* 220 MB */
export const MAX_SINGLE = 60 * 1024 * 1024; /* skip files over 60 MB (videos etc.) */

export const fileId = (name: string, size: number) => `${name}::${size}`;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") { reject(new Error("no idb")); return; }
    const rq = indexedDB.open(DB_NAME, 1);
    rq.onupgradeneeded = () => { if (!rq.result.objectStoreNames.contains(STORE)) rq.result.createObjectStore(STORE, { keyPath: "id" }); };
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error || new Error("idb open failed"));
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const rq = fn(t.objectStore(STORE));
    rq.onsuccess = () => resolve(rq.result as T);
    rq.onerror = () => reject(rq.error || new Error("idb request failed"));
    t.oncomplete = () => db.close();
  });
}

/** Save (or re-touch) a file. Returns the meta, or null when skipped/unavailable. */
export async function putFile(name: string, blob: Blob, type = ""): Promise<SavedFileMeta | null> {
  try {
    if (!blob || blob.size > MAX_SINGLE) return null;
    const now = Date.now();
    const rec: SavedFileRec = { id: fileId(name, blob.size), name, size: blob.size, type: type || blob.type || "", savedAt: now, openedAt: now, blob };
    await tx("readwrite", (s) => s.put(rec) as unknown as IDBRequest<IDBValidKey>);
    await enforceCaps();
    return { id: rec.id, name: rec.name, size: rec.size, type: rec.type, savedAt: rec.savedAt, openedAt: rec.openedAt };
  } catch { return null; }
}

/** All saved files, most recently opened first. */
export async function listFiles(): Promise<SavedFileMeta[]> {
  try {
    const all = await tx<SavedFileRec[]>("readonly", (s) => s.getAll() as unknown as IDBRequest<SavedFileRec[]>);
    return (all || [])
      .map(({ blob: _blob, ...m }) => m)
      .sort((a, b) => b.openedAt - a.openedAt);
  } catch { return []; }
}

export async function getFile(id: string): Promise<SavedFileRec | null> {
  try { return (await tx<SavedFileRec | undefined>("readonly", (s) => s.get(id) as unknown as IDBRequest<SavedFileRec | undefined>)) || null; }
  catch { return null; }
}

export async function touchFile(id: string) {
  try {
    const rec = await getFile(id);
    if (rec) { rec.openedAt = Date.now(); await tx("readwrite", (s) => s.put(rec) as unknown as IDBRequest<IDBValidKey>); }
  } catch { /* noop */ }
}

export async function deleteFile(id: string) {
  try { await tx("readwrite", (s) => s.delete(id) as unknown as IDBRequest<undefined>); } catch { /* noop */ }
}

/** Keep the newest files under both caps; delete the stalest first. */
async function enforceCaps() {
  try {
    const all = await tx<SavedFileRec[]>("readonly", (s) => s.getAll() as unknown as IDBRequest<SavedFileRec[]>);
    if (!all) return;
    const sorted = [...all].sort((a, b) => b.openedAt - a.openedAt);
    let total = 0;
    const doomed: string[] = [];
    sorted.forEach((f, i) => {
      total += f.size;
      if (i >= MAX_FILES || total > MAX_TOTAL) doomed.push(f.id);
    });
    for (const id of doomed) await deleteFile(id);
  } catch { /* noop */ }
}

export function fmtSize(bytes: number) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return Math.max(1, Math.round(bytes / 1024)) + " KB";
}

export function fmtWhen(ts: number) {
  const d = new Date(ts);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return sameDay ? `today ${t}` : d.toLocaleDateString([], { day: "numeric", month: "short" });
}
