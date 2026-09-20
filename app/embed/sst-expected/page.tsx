import type { Metadata } from "next";
import { SST_IMP_CHAPTERS, SST_IMP_HOT, SST_IMP_TOTAL, SST_IMP_HOT_TOTAL } from "@/lib/content/sstImportant";

export const metadata: Metadata = {
  title: "SST Most Expected Questions — board sheet",
  robots: { index: false, follow: false },
};

const TYPE_SHORT: Record<string, string> = {
  VSA: "VSA",
  SA: "Short",
  LA: "Long",
  CASE: "Case",
  MAP: "Map",
  HOTS: "HOTS",
};

/* Compact sheet for the Smart Board split view — chapter-wise, topic-wise most
   expected questions with the model answer behind a click. */
export default function SSTExpectedEmbed() {
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
        Class 10 SST · Half Yearly · Most expected
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>
        Most expected questions — all chapters
      </h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        {SST_IMP_TOTAL} questions, chapter-wise and topic-wise. {SST_IMP_HOT_TOTAL} are marked MUST DO — the ones with
        the highest chance. Read the question, write the answer on the whiteboard beside this sheet, then open it to
        check.
      </p>

      {/* must-do shortlist */}
      <section style={{ marginTop: 16 }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 800,
            margin: 0,
            padding: "6px 0",
            borderBottom: "2px solid #202124",
          }}
        >
          Must do — {SST_IMP_HOT_TOTAL} questions (highest chance)
        </h2>
        <ol style={{ margin: "8px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.6, color: "#3c4043" }}>
          {SST_IMP_HOT.map((h) => (
            <li key={h.id} style={{ marginBottom: 5 }}>
              {h.q}{" "}
              <span style={{ color: "#5f6368", fontSize: 10.5 }}>
                — {h.subject} Ch {h.ch}, {h.topic}, {TYPE_SHORT[h.type]} {h.marks}m
              </span>
            </li>
          ))}
        </ol>
      </section>

      {SST_IMP_CHAPTERS.map((c) => (
        <section key={c.key} style={{ marginTop: 22 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 800,
              margin: 0,
              padding: "6px 0",
              borderBottom: "2px solid #202124",
            }}
          >
            {c.subject} Ch {c.ch} — {c.title}
          </h2>

          {c.topics.map((t) => (
            <div key={t.name} style={{ marginTop: 10 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "ui-monospace,Menlo,Consolas,monospace",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#1a73e8",
                }}
              >
                {t.name}
              </p>
              {t.qs.map((q) => (
                <details
                  key={q.id}
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
                    {q.hot && (
                      <span
                        style={{
                          display: "inline-block",
                          marginRight: 6,
                          padding: "1px 6px",
                          borderRadius: 999,
                          background: "#e8f0fe",
                          color: "#1a73e8",
                          fontSize: 9.5,
                          fontWeight: 800,
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                        }}
                      >
                        Must do
                      </span>
                    )}
                    {q.q}
                  </summary>
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
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
