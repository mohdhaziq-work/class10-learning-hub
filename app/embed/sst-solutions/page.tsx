import type { Metadata } from "next";
import { SST_PAPER_META, SST_SECTIONS } from "@/lib/content/sst-halfyearly";

export const metadata: Metadata = {
  title: "SST Half Yearly Solutions — board sheet",
  robots: { index: false, follow: false },
};

/* Compact solutions sheet for the Smart Board split view — the school paper
   with full-marks model answers beside the whiteboard while practising. */
export default function SSTSolutionsEmbed() {
  return (
    <main
      style={{
        fontFamily: "Inter,ui-sans-serif,system-ui,Arial",
        background: "#ffffff",
        color: "#202124",
        padding: "14px 14px 40px",
        maxWidth: 760,
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
        {SST_PAPER_META.school} · {SST_PAPER_META.exam} · Class 10 SST · M.M. {SST_PAPER_META.mm}
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>
        Half Yearly SST — paper with model answers
      </h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        Read a question, hide this sheet's answer, and write it on the whiteboard beside it.
        Answers follow the NCERT marking style.
      </p>
      {SST_SECTIONS.map((s) => (
        <section key={s.label} style={{ marginTop: 18 }}>
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
                marginTop: 8,
                background: "#f8f9fa",
              }}
            >
              <summary style={{ cursor: "pointer", fontSize: 13.5, fontWeight: 600, lineHeight: 1.45 }}>
                <span
                  style={{
                    display: "inline-block",
                    minWidth: 44,
                    marginRight: 8,
                    fontFamily: "ui-monospace,Menlo,Consolas,monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1a73e8",
                  }}
                >
                  Q{q.n}
                </span>
                {q.q}
                <span style={{ float: "right", fontSize: 10.5, color: "#5f6368", fontWeight: 700 }}>{q.marks} marks</span>
              </summary>
              {q.opts && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12.5, lineHeight: 1.7 }}>
                  {q.opts.map((o, i) => (
                    <li key={i} style={{ color: "#3c4043" }}>
                      ({["a", "b", "c", "d"][i]}) {o}
                    </li>
                  ))}
                </ul>
              )}
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
            </details>
          ))}
        </section>
      ))}
    </main>
  );
}
