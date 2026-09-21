import type { Metadata } from "next";
import { HINDI_META, HINDI_BLUEPRINT, HINDI_PASSAGES } from "@/lib/content/hindiBlueprintHy";
import { HINDI_GRAMMAR } from "@/lib/content/hindiBpGrammar";
import { HINDI_PADYA_GADY, HINDI_PADYA_KAVYA, HINDI_GADYA_SHORT, HINDI_KAVYA_SHORT, HINDI_KRITIKA_LONG } from "@/lib/content/hindiBpLiterature";
import { HINDI_WRITING } from "@/lib/content/hindiBpWriting";

export const metadata: Metadata = {
  title: "Hindi Half Yearly — blueprint paper sheet",
  robots: { index: false, follow: false },
};

const L = ["(क)", "(ख)", "(ग)", "(घ)"];
const H2: React.CSSProperties = { fontSize: 13, fontWeight: 800, margin: 0, padding: "6px 0", borderBottom: "2px solid #202124" };
const H3: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, margin: "14px 0 2px", color: "#202124" };
const A: React.CSSProperties = { marginTop: 4, borderLeft: "3px solid #188038", background: "#f6fdf8", padding: "6px 8px", fontSize: 12.5, lineHeight: 1.55, color: "#202124" };
const Q: React.CSSProperties = { marginTop: 8, fontSize: 12.5, fontWeight: 700, lineHeight: 1.5 };
const Meta: React.CSSProperties = { fontSize: 10.5, color: "#5f6368", fontWeight: 600 };

export default function HindiBlueprintEmbed() {
  const totalM = HINDI_BLUEPRINT.reduce((a, r) => a + r.marks, 0);
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
      <p style={{ fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#5f6368", margin: 0 }}>
        कक्षा 10 हिंदी (कोर्स-A) · अर्धवार्षिक
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>ब्लू-प्रिंट मॉडल पेपर — {totalM} अंक</h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        {HINDI_META.rows} पंक्तियाँ ब्लू-प्रिंट से ज्यों-की-त्यों। पहले पेपर हल करें, फिर उत्तर खोलकर जाँचें। शब्द-सीमा का पालन: लघु 25-30, दीर्घ 50-60, लेखन 120/100/80/40-50 शब्द।
      </p>

      <section style={{ marginTop: 16 }}>
        <h2 style={H2}>खंड क — अपठित बोध (14 अंक)</h2>
        {HINDI_PASSAGES.map((p) => (
          <div key={p.n}>
            <p style={{ ...H3, marginTop: 12 }}>
              प्रश्न {p.n} — {p.kind} · {p.source} · {p.marks} अंक
            </p>
            <blockquote style={{ margin: "4px 0 0", background: "#f8f9fa", border: "1px solid #e8eaed", padding: "8px 10px", fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-line", color: "#3c4043" }}>
              {p.extract}
            </blockquote>
            {p.items.map((it, i) => (
              <div key={i}>
                <p style={Q}>
                  ({i + 1}) {it.q} <span style={Meta}>· {it.marks} अंक</span>
                </p>
                {it.opts && (
                  <ol style={{ margin: "3px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.55, color: "#3c4043" }}>
                    {it.opts.map((o, j) => (
                      <li key={j} style={{ fontWeight: it.correct === j ? 800 : 400, color: it.correct === j ? "#0d652d" : "#3c4043" }}>
                        {L[j]} {o}
                        {it.correct === j ? "  (सही)" : ""}
                      </li>
                    ))}
                  </ol>
                )}
                <div style={A}>
                  <b style={{ color: "#188038" }}>उत्तर. </b>
                  {it.ans}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 style={H2}>खंड ख — व्याकरण (16 अंक)</h2>
        {HINDI_GRAMMAR.map((g) => (
          <div key={g.n}>
            <p style={H3}>
              प्रश्न {g.n} — {g.topic} <span style={Meta}>· 5 में से 4 · 4 अंक</span>
            </p>
            {g.questions.map((q) => (
              <div key={q.n}>
                <p style={Q}>
                  ({q.n}) {q.q}
                </p>
                <div style={A}>
                  <b style={{ color: "#188038" }}>उत्तर. </b>
                  {q.ans}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 style={H2}>खंड ग — पाठ्यपुस्तक (30 अंक)</h2>

        <p style={H3}>
          प्रश्न 4 — पठित गद्यांश (MCQ) · {HINDI_PADYA_GADY.source} · 5 अंक
        </p>
        <blockquote style={{ margin: "4px 0 0", background: "#f8f9fa", border: "1px solid #e8eaed", padding: "8px 10px", fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-line", color: "#3c4043" }}>
          {HINDI_PADYA_GADY.extract}
        </blockquote>
        {HINDI_PADYA_GADY.items.map((it, i) => (
          <div key={i}>
            <p style={Q}>
              ({i + 1}) {it.q}
            </p>
            <ol style={{ margin: "3px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.55, color: "#3c4043" }}>
              {(it.opts ?? []).map((o, j) => (
                <li key={j} style={{ fontWeight: it.correct === j ? 800 : 400, color: it.correct === j ? "#0d652d" : "#3c4043" }}>
                  {L[j]} {o}
                  {it.correct === j ? "  (सही)" : ""}
                </li>
              ))}
            </ol>
          </div>
        ))}

        <p style={H3}>प्रश्न 5 — क्षितिज गद्य लघु उत्तरीय · 4 में से 3 · 25-30 शब्द</p>
        {HINDI_GADYA_SHORT.map((q) => (
          <div key={q.n}>
            <p style={Q}>
              ({q.n}) {q.q} <span style={Meta}>· {q.ch}</span>
            </p>
            <div style={A}>
              <b style={{ color: "#188038" }}>उत्तर. </b>
              {q.ans}
            </div>
          </div>
        ))}

        <p style={H3}>
          प्रश्न 6 — पठित काव्यांश (MCQ) · {HINDI_PADYA_KAVYA.source} · 5 अंक
        </p>
        <blockquote style={{ margin: "4px 0 0", background: "#f8f9fa", border: "1px solid #e8eaed", padding: "8px 10px", fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-line", color: "#3c4043" }}>
          {HINDI_PADYA_KAVYA.extract}
        </blockquote>
        {HINDI_PADYA_KAVYA.items.map((it, i) => (
          <div key={i}>
            <p style={Q}>
              ({i + 1}) {it.q}
            </p>
            <ol style={{ margin: "3px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.55, color: "#3c4043" }}>
              {(it.opts ?? []).map((o, j) => (
                <li key={j} style={{ fontWeight: it.correct === j ? 800 : 400, color: it.correct === j ? "#0d652d" : "#3c4043" }}>
                  {L[j]} {o}
                  {it.correct === j ? "  (सही)" : ""}
                </li>
              ))}
            </ol>
          </div>
        ))}

        <p style={H3}>प्रश्न 7 — क्षितिज काव्य लघु उत्तरीय · 4 में से 3 · 25-30 शब्द</p>
        {HINDI_KAVYA_SHORT.map((q) => (
          <div key={q.n}>
            <p style={Q}>
              ({q.n}) {q.q} <span style={Meta}>· {q.ch}</span>
            </p>
            <div style={A}>
              <b style={{ color: "#188038" }}>उत्तर. </b>
              {q.ans}
            </div>
          </div>
        ))}

        <p style={H3}>प्रश्न 8 — कृतिका दीर्घ उत्तरीय · 3 में से 2 · 50-60 शब्द</p>
        {HINDI_KRITIKA_LONG.map((q) => (
          <div key={q.n}>
            <p style={Q}>
              ({q.n}) {q.q} <span style={Meta}>· {q.ch}</span>
            </p>
            <div style={A}>
              <b style={{ color: "#188038" }}>उत्तर. </b>
              {q.ans}
            </div>
            {q.alt && (
              <>
                <p style={{ textAlign: "center", fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: 11, fontWeight: 800, letterSpacing: ".2em", color: "#5f6368", margin: "8px 0 2px" }}>अथवा</p>
                <p style={Q}>{q.alt.q}</p>
                <div style={A}>
                  <b style={{ color: "#188038" }}>उत्तर. </b>
                  {q.alt.ans}
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 style={H2}>खंड घ — रचनात्मक लेखन (20 अंक)</h2>
        {HINDI_WRITING.map((w) => (
          <div key={w.n}>
            <p style={H3}>
              प्रश्न {w.n} — {w.type} <span style={Meta}>· {w.marks} अंक · {w.limit}</span>
            </p>
            <p style={Q}>{w.topic}</p>
            <div style={{ ...A, whiteSpace: "pre-line" }}>
              <b style={{ color: "#188038" }}>मॉडल. </b>
              {w.model}
            </div>
            <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.55, color: "#7a5c00" }}>
              {w.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
