import type { Metadata } from "next";
import { PERIODIC_META, PERIODIC_SECTIONS } from "@/lib/content/sst-periodic2";

export const metadata: Metadata = {
  title: "SST Periodic II Solutions — board sheet",
  robots: { index: false, follow: false },
};

const LETTERS = ["a", "b", "c", "d"];

/* Compact solutions sheet for the Smart Board split view — the school paper
   with every answer, so the student can hide the answer and write it first. */
export default function SSTPeriodic2Embed() {
  const totalQ = PERIODIC_SECTIONS.reduce((a, s) => a + s.qs.length, 0);

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
        {PERIODIC_META.school} · {PERIODIC_META.exam} · Class 10 SST · M.M. {PERIODIC_META.mm}
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>
        Periodic Exam II — paper with answers
      </h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        {totalQ} questions, 15 marks. Read a question, answer it on the whiteboard beside this sheet, then open it to
        check. The correct option is highlighted; the trap in each question is noted.
      </p>

      {PERIODIC_SECTIONS.map((s) => (
        <section key={s.label} style={{ marginTop: 20 }}>
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
                    minWidth: 30,
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
                    color: "#5f6368",
                  }}
                >
                  {q.marks}m
                </span>
                {q.q.split("\n")[0]}
                <span style={{ display: "block", marginTop: 3, fontSize: 10.5, color: "#1a73e8", fontWeight: 700 }}>
                  {q.ch} · {q.topic}
                </span>
              </summary>

              {q.opts && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 0, listStyle: "none", fontSize: 12.5, lineHeight: 1.7 }}>
                  {q.opts.map((o, i) => {
                    const isRight = q.correct === LETTERS[i];
                    return (
                      <li
                        key={i}
                        style={{
                          marginTop: 3,
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: isRight ? "1px solid #188038" : "1px solid #e8eaed",
                          background: isRight ? "#e6f4ea" : "#ffffff",
                          fontWeight: isRight ? 700 : 400,
                          color: isRight ? "#0d652d" : "#3c4043",
                        }}
                      >
                        ({LETTERS[i]}) {o}
                        {isRight && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontFamily: "ui-monospace,Menlo,Consolas,monospace",
                              fontSize: 9.5,
                              textTransform: "uppercase",
                              letterSpacing: ".08em",
                            }}
                          >
                            correct
                          </span>
                        )}
                      </li>
                    );
                  })}
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

              {q.caution && (
                <p
                  style={{
                    margin: "6px 0 2px",
                    padding: "7px 10px",
                    background: "#fef7e0",
                    border: "1px solid #fce8b2",
                    borderRadius: 8,
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "#7a5c00",
                  }}
                >
                  <strong>Trap. </strong>
                  {q.caution}
                </p>
              )}
            </details>
          ))}
        </section>
      ))}
    </main>
  );
}
