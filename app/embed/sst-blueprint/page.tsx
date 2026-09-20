import type { Metadata } from "next";
import { BP_META, BP_BLUEPRINT, BP_SECTIONS, type BPQ } from "@/lib/content/sst-blueprint-hy";

export const metadata: Metadata = {
  title: "SST Half Yearly Blueprint Paper — board sheet",
  robots: { index: false, follow: false },
};

const TYPE_SHORT: Record<BPQ["type"], string> = {
  MCQ: "MCQ",
  VSA: "VSA",
  SA: "Short",
  LA: "Long",
  CASE: "Case",
  MAP: "Map",
};

/* Compact sheet for the Smart Board split view — blueprint paper with the
   chapter and topic of every question, answers behind a click. */
export default function SSTBlueprintEmbed() {
  const totalQ = BP_BLUEPRINT.reduce((a, s) => a + s.totalQ, 0);
  const totalM = BP_BLUEPRINT.reduce((a, s) => a + s.totalMarks, 0);

  return (
    <main
      style={{
        fontFamily: "Inter,ui-sans-serif,system-ui,Arial",
        background: "#ffffff",
        color: "#202124",
        padding: "14px 14px 40px",
        maxWidth: 780,
        margin: "0 auto",
      }}
    >
      <p
        style={{
          fontFamily: "ui-monospace,Menlo,Consolas,monospace",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "#5f6368",
          margin: 0,
        }}
      >
        {BP_META.school} · {BP_META.exam} · Class 10 SST · M.M. {BP_META.mm}
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>
        Half Yearly SST — blueprint paper with model answers
      </h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        {totalQ} questions, {totalM} marks — section by section as per the blue print. Each question shows its chapter
        and topic. Read the question, then write the answer yourself on the whiteboard beside this sheet; click to
        check.
      </p>

      {/* blue print summary strip */}
      <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
        {BP_BLUEPRINT.map((s) => (
          <div
            key={s.key}
            style={{
              border: "1px solid #dadce0",
              borderRadius: 10,
              padding: "7px 10px",
              background: "#f8f9fa",
              fontSize: 11.5,
              lineHeight: 1.5,
            }}
          >
            <strong style={{ fontSize: 12 }}>
              Section {s.key} — {s.subject}
            </strong>
            <span style={{ color: "#5f6368" }}> · {s.chapters} · </span>
            <strong>{s.totalMarks} marks</strong>
            <div style={{ color: "#3c4043", marginTop: 2 }}>
              {s.rows.map((r) => `${r.type.replace(" Questions", "").replace(" Question", "")} — ${r.count} × ${r.each}`).join(" · ")}
            </div>
          </div>
        ))}
      </div>

      {BP_SECTIONS.map((s) => (
        <section key={s.key} style={{ marginTop: 20 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 800,
              margin: 0,
              padding: "6px 0",
              borderBottom: "2px solid #202124",
            }}
          >
            {s.label}
          </h2>
          <p style={{ fontSize: 11.5, color: "#5f6368", margin: "4px 0 0" }}>{s.blurb}</p>

          {s.qs.map((q) => (
            <details
              key={q.n}
              style={{
                border: "1px solid #dadce0",
                borderRadius: 10,
                padding: "8px 12px",
                marginTop: 9,
                background: "#f8f9fa",
              }}
            >
              <summary style={{ cursor: "pointer", fontSize: 13.5, fontWeight: 600, lineHeight: 1.45 }}>
                <span
                  style={{
                    display: "inline-block",
                    minWidth: 46,
                    marginRight: 6,
                    fontFamily: "ui-monospace,Menlo,Consolas,monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1a73e8",
                  }}
                >
                  Q{q.n}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    marginRight: 6,
                    padding: "1px 5px",
                    borderRadius: 4,
                    border: "1px solid #dadce0",
                    background: "#ffffff",
                    fontFamily: "ui-monospace,Menlo,Consolas,monospace",
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "#5f6368",
                  }}
                >
                  {TYPE_SHORT[q.type]} · {q.marks}
                </span>
                {q.q.split("\n")[0]}
                <span style={{ display: "block", marginTop: 3, fontSize: 10.5, color: "#1a73e8", fontWeight: 700 }}>
                  {q.ch} · {q.topic}
                </span>
              </summary>

              {q.extract && (
                <p
                  style={{
                    margin: "8px 0 0",
                    padding: "8px 10px",
                    background: "#ffffff",
                    border: "1px solid #e8eaed",
                    borderRadius: 8,
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    fontStyle: "italic",
                    color: "#3c4043",
                  }}
                >
                  {q.extract}
                </p>
              )}

              {q.opts && !q.subs && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12.5, lineHeight: 1.7 }}>
                  {q.opts.map((o, i) => (
                    <li key={i} style={{ color: "#3c4043" }}>
                      ({["a", "b", "c", "d"][i]}) {o}
                    </li>
                  ))}
                </ul>
              )}

              {q.subs ? (
                <div style={{ marginTop: 8 }}>
                  {q.subs.map((sub, i) => (
                    <div key={i} style={{ borderTop: "1px dashed #dadce0", paddingTop: 8, marginTop: 8 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, lineHeight: 1.45 }}>
                        ({["i", "ii", "iii", "iv"][i]}) {sub.q}{" "}
                        <span style={{ fontSize: 10.5, color: "#5f6368" }}>{sub.marks}m</span>
                      </p>
                      <p
                        style={{
                          margin: "6px 0 0",
                          padding: "8px 10px",
                          background: "#ffffff",
                          border: "1px solid #e8eaed",
                          borderLeft: "3px solid #188038",
                          borderRadius: 8,
                          fontSize: 12.5,
                          lineHeight: 1.65,
                          color: "#202124",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {sub.a}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    margin: "8px 0 2px",
                    padding: "8px 10px",
                    background: "#ffffff",
                    border: "1px solid #e8eaed",
                    borderLeft: "3px solid #188038",
                    borderRadius: 8,
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: "#202124",
                    whiteSpace: "pre-line",
                  }}
                >
                  {q.ans}
                </p>
              )}

              {q.alt && (
                <div
                  style={{
                    marginTop: 10,
                    border: "1px dashed #dadce0",
                    borderRadius: 10,
                    padding: "8px 10px",
                    background: "#f1f3f4",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 10.5, fontWeight: 800, letterSpacing: ".16em", color: "#5f6368" }}>
                    OR
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 700, lineHeight: 1.45 }}>{q.alt.q}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 10.5, color: "#1a73e8", fontWeight: 700 }}>
                    {q.alt.ch} · {q.alt.topic}
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      padding: "8px 10px",
                      background: "#ffffff",
                      border: "1px solid #e8eaed",
                      borderLeft: "3px solid #188038",
                      borderRadius: 8,
                      fontSize: 12.5,
                      lineHeight: 1.65,
                      color: "#202124",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {q.alt.ans}
                  </p>
                </div>
              )}
            </details>
          ))}
        </section>
      ))}
    </main>
  );
}
