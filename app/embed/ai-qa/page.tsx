import type { Metadata } from "next";
import { AI_IMPORTANT, AI_IMPORTANT_UNITS } from "@/lib/content/ai-important";

export const metadata: Metadata = {
  title: "AI Important Questions — board sheet",
  robots: { index: false, follow: false },
};

/* Compact question sheet rendered inside the Smart Board split view,
   so the questions + answers sit beside the whiteboard while practising. */
export default function AIQAEmbedPage() {
  return (
    <main
      style={{
        fontFamily: "Inter,ui-sans-serif,system-ui,Arial",
        background: "#ffffff",
        color: "#202124",
        padding: "14px 14px 40px",
        maxWidth: 720,
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
        CBSE 417 · Class 10 AI · {AI_IMPORTANT.length} important long answers
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>
        Important Questions — read, then write on the board
      </h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        Tap a question to open its full-marks answer. Keep this sheet open and practise writing
        each answer on the whiteboard beside it.
      </p>
      {AI_IMPORTANT_UNITS.map((u) => (
        <section key={u.label} style={{ marginTop: 18 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 800,
              margin: 0,
              padding: "6px 0",
              borderBottom: "2px solid #202124",
            }}
          >
            {u.label}
          </h2>
          {AI_IMPORTANT.filter((q) => q.n >= u.from && q.n <= u.to).map((q) => (
            <details
              key={q.n}
              style={{
                border: "1px solid #dadce0",
                borderRadius: 10,
                marginTop: 8,
                background: "#fff",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "9px 12px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  lineHeight: 1.35,
                }}
              >
                {q.n}. {q.q}
              </summary>
              <p
                style={{
                  margin: 0,
                  padding: "0 12px 11px",
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "#3c4043",
                }}
              >
                <b style={{ color: "#188038" }}>Answer: </b>
                {q.a}
              </p>
            </details>
          ))}
        </section>
      ))}
    </main>
  );
}
