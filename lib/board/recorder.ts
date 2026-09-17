/* ==========================================================================
   Screen recorder — admin diagnostic clips.
   Hardware-accelerated capture via getDisplayMedia + MediaRecorder runs off
   the main thread, so writing on the board stays smooth while recording.
   Clips persist in IndexedDB on the device itself (no server upload needed).
   ========================================================================== */

const DB_NAME = "sb-recordings";
const STORE = "recs";

export interface RecordingMeta {
  id: string;
  name: string;
  ts: number;
  dur: number; /* seconds */
  size: number; /* bytes */
  blob: Blob;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const rq = indexedDB.open(DB_NAME, 1);
    rq.onupgradeneeded = () => {
      if (!rq.result.objectStoreNames.contains(STORE)) rq.result.createObjectStore(STORE, { keyPath: "id" });
    };
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
}

function store(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

export async function saveRecording(rec: RecordingMeta): Promise<void> {
  const db = await openDB();
  return new Promise((res, rej) => {
    const r = store(db, "readwrite").put(rec);
    r.onsuccess = () => res();
    r.onerror = () => rej(r.error);
  });
}

export async function listRecordings(): Promise<RecordingMeta[]> {
  try {
    const db = await openDB();
    return await new Promise<RecordingMeta[]>((res) => {
      const r = store(db, "readonly").getAll() as IDBRequest<RecordingMeta[]>;
      r.onsuccess = () => res((r.result || []).sort((a, b) => b.ts - a.ts));
      r.onerror = () => res([]);
    });
  } catch {
    return [];
  }
}

export async function deleteRecording(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((res) => {
    const r = store(db, "readwrite").delete(id);
    r.onsuccess = () => res();
    r.onerror = () => res();
  });
}

/* ---------------- live capture session ---------------- */

let mr: MediaRecorder | null = null;
let chunks: Blob[] = [];
let startTs = 0;
let activeMime = "";

export function isRecording(): boolean {
  return !!mr && mr.state !== "inactive";
}

export function supportsScreenShare(): boolean {
  return !!navigator.mediaDevices?.getDisplayMedia && typeof MediaRecorder !== "undefined";
}

/* Full screen / tab / window capture (desktop browsers). */
export async function startRecording(): Promise<void> {
  if (isRecording()) return;
  if (!navigator.mediaDevices?.getDisplayMedia) throw new Error("unsupported");
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: 30, width: { ideal: 1920 }, height: { ideal: 1080 } },
    audio: false,
  });
  await startFromStream(stream);
}

/* Core: record any MediaStream to the clip library. */
export async function startFromStream(stream: MediaStream): Promise<void> {
  if (isRecording()) return;
  activeMime = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
    .find((m) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m)) || "";
  const opts: MediaRecorderOptions = { videoBitsPerSecond: 3_500_000 };
  if (activeMime) opts.mimeType = activeMime;
  mr = new MediaRecorder(stream, opts);
  chunks = [];
  startTs = Date.now();
  mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  mr.onstop = async () => {
    const dur = Math.round((Date.now() - startTs) / 1000);
    const blob = new Blob(chunks, { type: activeMime || "video/webm" });
    chunks = [];
    stream.getTracks().forEach((t) => t.stop());
    const rec: RecordingMeta = {
      id: `rec-${Date.now()}`,
      name: `Board recording — ${new Date().toLocaleString([], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}`,
      ts: Date.now(),
      dur,
      size: blob.size,
      blob,
    };
    mr = null;
    try { await saveRecording(rec); } catch { /* storage full — clip is lost */ }
    window.dispatchEvent(new CustomEvent("sb-rec-saved", { detail: rec }));
  };
  /* user pressed "Stop sharing" in the browser UI */
  stream.getVideoTracks()[0]?.addEventListener("ended", () => stopRecording());
  mr.start(2000);
}

export function stopRecording(): void {
  if (mr && mr.state !== "inactive") mr.stop();
}
