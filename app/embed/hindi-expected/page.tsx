import type { Metadata } from "next";
import { HINDI_IMP_UNITS, HINDI_IMP_HOT, HINDI_IMP_TOTAL, HINDI_IMP_HOT_TOTAL } from "@/lib/content/hindiImp";
import { HINDI_IMP_VYAKARAN, HINDI_IMP_LEKHAN } from "@/lib/content/hindiImpVyakaran";

export const metadata: Metadata = {
  title: "Hindi Most Expected — board sheet",
  robots: { index: false, follow: false },
};

const H2: React.CSSProperties = { fontSize: 13, fontWeight: 800, margin: 0, padding: "6px 0", borderBottom: "2px solid #202124" };
const H3: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, margin: "14px 0 2px", color: "#1a73e8" };
const A: React.CSSProperties = { marginTop: 4, borderLeft: "3px solid #188038", background: "#f6fdf8", padding: "6px 8px", fontSize: 12.5, lineHeight: 1.55, color: "#202124" };
const Q: React.CSSProperties = { marginTop: 8, fontSize: 12.5, fontWeight: 700, lineHeight: 1.5 };
const Meta: React.CSSProperties = { fontSize: 10.5, color: "#5f6368", fontWeight: 600 };

export default function HindiExpectedEmbed() {
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
        कक्षा 10 हिंदी · अर्धवार्षिक · सबसे संभावित प्रश्न
      </p>
      <h1 style={{ fontSize: 19, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.01em" }}>Most expected — सभी पाठ, व्याकरण और लेखन</h1>
      <p style={{ fontSize: 12.5, color: "#5f6368", margin: 0, lineHeight: 1.5 }}>
        {HINDI_IMP_TOTAL} प्रश्न। {HINDI_IMP_HOT_TOTAL} प्रश्न MUST DO हैं। प्रश्न पढ़िए, उत्तर बोर्ड पर लिखिए, फिर खोलकर मिलाइए।
      </p>

      <section style={{ marginTop: 16 }}>
        <h2 style={H2}>Must do — {HINDI_IMP_HOT_TOTAL} प्रश्न</h2>
        <ol style={{ margin: "8px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.6, color: "#3c4043" }}>
          {HINDI_IMP_HOT.map((h) => (
            <li key={h.id} style={{ marginBottom: 5 }}>
              {h.q}{" "}
              <span style={{ color: "#5f6368", fontSize: 10.5 }}>
                — {h.unit}, {h.topic}, {h.marks} अंक
              </span>
            </li>
          ))}
        </ol>
      </section>

      {HINDI_IMP_UNITS.map((u) => (
        <section key={u.key} style={{ marginTop: 22 }}>
          <h2 style={H2}>
            {u.book} · {u.title} <span style={{ fontWeight: 600, fontSize: 11, color: "#5f6368" }}>({u.author})</span>
          </h2>
          {u.topics.map((t) => (
            <div key={t.name}>
              <p style={H3}>{t.name}</p>
              {t.qs.map((q) => (
                <div key={q.id}>
                  <p style={Q}>
                    {q.q} <span style={Meta}>· {q.marks} अंक{q.hot ? " · MUST DO" : ""}</span>
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
      ))}

      <section style={{ marginTop: 22 }}>
        <h2 style={H2}>व्याकरण — सबसे संभावित प्रश्न (16 अंक)</h2>
        {HINDI_IMP_VYAKARAN.map((g) => (
          <div key={g.topic}>
            <p style={H3}>{g.topic}</p>
            {g.items.map((q) => (
              <div key={q.id}>
                <p style={Q}>
                  {q.q} <span style={Meta}>· 1 अंक{q.hot ? " · MUST DO" : ""}</span>
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
        <h2 style={H2}>रचनात्मक लेखन — संभावित विषय (20 अंक)</h2>
        {HINDI_IMP_LEKHAN.map((l) => (
          <div key={l.type}>
            <p style={H3}>
              {l.type} <span style={Meta}>· {l.marks} अंक · {l.limit}</span>
            </p>
            <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 12.5, lineHeight: 1.6, color: "#3c4043" }}>
              {l.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 12, lineHeight: 1.5, color: "#7a5c00" }}>
              {l.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
