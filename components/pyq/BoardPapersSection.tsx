"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  BOARD_EXAMS,
  BOARD_OFFICIAL_INDEX_URL,
  BOARD_SUBJECT_TABS,
  LEGACY_BOARD_SUBJECT_LINKS,
} from "@/lib/content/board-papers";

export function BoardPapersSection() {
  const [tab, setTab] = useState("maths");
  const active = BOARD_SUBJECT_TABS.find((t) => t.id === tab) ?? BOARD_SUBJECT_TABS[0];
  const legacy = LEGACY_BOARD_SUBJECT_LINKS.find((l) => l.id === tab);
  const years = [...new Set(BOARD_EXAMS.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <section className="mt-12">
      <p className="eyebrow">Direct from cbse.gov.in</p>
      <h2 className="text-2xl font-extrabold tracking-tight mt-2">
        Official board papers — every set, every year
      </h2>
      <p className="text-ink-soft mt-2 max-w-3xl text-[15px]">
        Full {active.label} board papers straight from the official CBSE archive: all sets of
        every year from 2022 to 2026, including Compartment and Second Board examinations.
        Each download is the exact paper CBSE released.
      </p>

      <div className="flex gap-2 mt-5 flex-wrap">
        {BOARD_SUBJECT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "px-4 py-2 rounded-full text-[13.5px] font-semibold border transition " +
              (tab === t.id
                ? "bg-slate-900 text-white border-slate-900 shadow-pop"
                : "bg-white text-ink-soft border-slate-200 hover:border-slate-400")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {years.map((year) => {
          const rows = BOARD_EXAMS.filter((e) => e.year === year);
          return rows.map((ex) => {
            const entries = active.keys
              .map((k) => ex.papers[k])
              .filter(Boolean);
            if (!entries.length) return null;
            return (
              <div key={ex.title} className="card-g p-5 hover:shadow-lift transition">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-[15.5px]">{ex.title}</h3>
                  <span
                    className={
                      "text-[10.5px] font-bold uppercase tracking-[.12em] px-2 py-1 rounded-md " +
                      (ex.kind === "main"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700")
                    }
                  >
                    {ex.kind === "main" ? "Main" : "Compartment"}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {entries.map((p) => (
                    <a
                      key={p.url}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[13.5px] font-semibold text-ink hover:border-brand-600 hover:text-brand-600 transition"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <Icon name="fileText" size={15} />
                        <span className="truncate">{p.label}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-mute shrink-0">
                        {p.kind === "zip" ? "ZIP · all sets" : "PDF"}
                        <Icon name="download" size={13} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          });
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-bold text-[15px]">2011–2021 {active.label} papers (all sets)</p>
            <p className="text-[13px] text-ink-soft mt-1 max-w-2xl">
              CBSE no longer hosts papers older than 2022 on its website, so these link to the
              same official papers archived year-wise on EduRev. Open the year you want, then the
              set (Set 1, Set 2, Compartment, Delhi, All India).
            </p>
          </div>
          {legacy && (
            <a
              href={legacy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-g btn-g-dark text-[14px] shrink-0"
            >
              Browse 2011–2021 <Icon name="externalLink" size={15} />
            </a>
          )}
        </div>
      </div>

      <p className="text-[12.5px] text-ink-mute mt-4 flex items-center gap-1.5">
        <Icon name="shieldCheck" size={14} />
        Source:{" "}
        <a
          href={BOARD_OFFICIAL_INDEX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-600 hover:underline"
        >
          cbse.gov.in — Previous Years&apos; Question Papers
        </a>
      </p>
    </section>
  );
}
