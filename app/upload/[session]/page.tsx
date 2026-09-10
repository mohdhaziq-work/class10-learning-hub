"use client";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/* Phone upload page — opened by scanning the Smart Board QR code.
   Picks any file and streams it to the board, which auto-opens it. */

interface Item {
  id: number;
  name: string;
  size: number;
  pct: number;
  status: "waiting" | "sending" | "sent" | "failed";
}

let nextId = 1;
const fmtSize = (b: number) =>
  b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;

export default function UploadPage({ params }: { params: { session: string } }) {
  const sid = params.session || "";
  const valid = /^[A-Za-z0-9-]{8,64}$/.test(sid);
  const [items, setItems] = useState<Item[]>([]);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);
  const queueRef = useRef<File[]>([]);

  const patch = (id: number, p: Partial<Item>) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, ...p } : it)));

  const pump = () => {
    if (busyRef.current) return;
    const file = queueRef.current.shift();
    if (!file) return;
    busyRef.current = true;
    const id = nextId++;
    setItems((arr) => [...arr, { id, name: file.name, size: file.size, pct: 0, status: "sending" }]);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/board-upload?session=${encodeURIComponent(sid)}`);
    xhr.setRequestHeader("x-filename", encodeURIComponent(file.name).slice(0, 200));
    xhr.setRequestHeader("x-mime", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) patch(id, { pct: Math.round((e.loaded / e.total) * 100) });
    };
    const done = (ok: boolean) => {
      patch(id, { status: ok ? "sent" : "failed", pct: ok ? 100 : 0 });
      busyRef.current = false;
      pump();
    };
    xhr.onload = () => done(xhr.status >= 200 && xhr.status < 300);
    xhr.onerror = () => done(false);
    xhr.ontimeout = () => done(false);
    xhr.send(file);
  };

  const addFiles = (list: FileList | File[] | null) => {
    if (!list || !valid) return;
    const arr = Array.from(list);
    if (!arr.length) return;
    queueRef.current.push(...arr);
    pump();
  };

  if (!valid) {
    return (
      <div className="min-h-screen bg-slate-100 grid place-items-center p-5">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <span className="w-14 h-14 rounded-2xl bg-slate-900 text-white grid place-items-center mx-auto">
            <Icon name="alertTriangle" size={26} />
          </span>
          <h1 className="text-xl font-extrabold tracking-tight mt-4">Invalid code</h1>
          <p className="text-slate-500 text-sm mt-1.5">
            This link is incomplete. Please scan the QR code on the Smart Board again.
          </p>
        </div>
      </div>
    );
  }

  const sent = items.filter((i) => i.status === "sent").length;

  return (
    <div className="min-h-screen bg-slate-100 grid place-items-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 max-w-md w-full">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl grid place-items-center text-white flex-none" style={{ background: "#1a73e8" }}>
            <Icon name="upload" size={24} />
          </span>
          <div className="min-w-0">
            <h1 className="text-[19px] font-extrabold tracking-tight leading-tight">Send to Smart Board</h1>
            <p className="text-slate-500 text-[13px]">Files open on the board automatically</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="font-mono text-[12px] font-bold bg-slate-100 rounded-lg px-2.5 py-1.5">
            {sid.slice(0, 8).toUpperCase()}
          </span>
          {sent > 0 && (
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-1.5">
              <Icon name="check" size={14} /> {sent} sent
            </span>
          )}
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          className={`mt-4 w-full rounded-2xl border-2 border-dashed p-7 text-center transition active:scale-[0.99] ${
            drag ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50"
          }`}
        >
          <Icon name="plus" size={30} className="mx-auto text-slate-400" />
          <p className="font-extrabold text-[15px] mt-2">Choose files</p>
          <p className="text-slate-500 text-[12.5px] mt-0.5">PDF • Images • Video • Audio • Documents</p>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />

        {items.length > 0 && (
          <div className="mt-4 grid gap-2.5">
            {items.map((it) => (
              <div key={it.id} className="rounded-xl border border-slate-200 px-3.5 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    name={it.status === "sent" ? "checkCircle" : it.status === "failed" ? "alertTriangle" : "loader"}
                    size={17}
                    className={`flex-none ${it.status === "sent" ? "text-emerald-600" : it.status === "failed" ? "text-red-500" : "text-slate-400 animate-spin"}`}
                  />
                  <p className="font-bold text-[13.5px] truncate flex-1">{it.name}</p>
                  <span className="text-[11.5px] font-bold text-slate-400 flex-none">{fmtSize(it.size)}</span>
                </div>
                {it.status === "sending" && (
                  <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${it.pct}%`, background: "#1a73e8" }} />
                  </div>
                )}
                {it.status === "failed" && (
                  <p className="text-[12px] font-bold text-red-500 mt-1">Failed — check internet and try again</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-3 text-[12.5px] text-slate-500 font-medium leading-relaxed">
          Keep this tab open until sending finishes. The board opens each file by itself. Max 250 MB per file.
        </div>
      </div>
    </div>
  );
}
