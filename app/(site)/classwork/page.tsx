"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { fsListClasswork, fsDeleteClasswork } from "@/lib/firebase/vault";
import { watchAdmin } from "@/lib/firebase/admin";

interface E { id: string; device: string; saved_at: number; png: string }

export default function ClassworkPage() {
  const [entries, setEntries] = useState<E[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const un = watchAdmin((is) => setAdmin(is));
    const load = () => fsListClasswork().then((l) => { setEntries(l as E[]); setLoaded(true); }).catch(() => setLoaded(true));
    void load();
    const t = setInterval(() => void load(), 6_000);
    return () => { un(); clearInterval(t); };
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mt-5 mb-6 flex items-center gap-4">
        <span className="w-14 h-14 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
          <Icon name="galleryHorizontal" size={26} />
        </span>
        <div>
          <h1 className="text-2xl sm:text-[32px] font-extrabold tracking-tight">Student Classwork Archive</h1>
          <p className="text-ink-soft mt-1 max-w-2xl text-[15px]">
            Boards auto-synced from teacher-authorized devices and saved permanently.
            Any student can view; only authorized teachers can publish.
          </p>
        </div>
      </div>
      {!loaded && <p className="text-ink-mute text-sm">Loading…</p>}
      {loaded && entries.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-ink-mute text-sm">
          No classwork yet. Authorize a device from the Live Devices panel and its board snapshots will appear here.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-10">
        {entries.map((e) => (
          <figure key={e.id} className="cw-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.png} alt="Board snapshot" loading="lazy" />
            <figcaption>
              <b>{e.device}</b>
              <span>{new Date(e.saved_at).toLocaleString()}</span>
              {admin && (
                <button onClick={() => void fsDeleteClasswork(e.id).then(() => fsListClasswork().then((l) => setEntries(l as E[])))}
                  className="ml-auto text-[11px] font-bold text-red-600 hover:underline">Remove</button>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
