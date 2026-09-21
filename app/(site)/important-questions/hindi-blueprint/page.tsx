import type { Metadata } from "next";
import Link from "next/link";
import { HINDI_META, HINDI_PORTION, HINDI_BLUEPRINT, HINDI_SECTIONS, HINDI_PASSAGES } from "@/lib/content/hindiBlueprintHy";
import { HINDI_GRAMMAR, HINDI_GRAMMAR_RULES } from "@/lib/content/hindiBpGrammar";
import {
  HINDI_PADYA_GADY,
  HINDI_PADYA_KAVYA,
  HINDI_GADYA_SHORT,
  HINDI_KAVYA_SHORT,
  HINDI_KRITIKA_LONG,
} from "@/lib/content/hindiBpLiterature";
import { HINDI_WRITING, HINDI_FORMATS } from "@/lib/content/hindiBpWriting";
import type { HNPassage, HNLitQ } from "@/lib/content/hindiTypes";

export const metadata: Metadata = {
  title: "Class 10 Hindi Half Yearly — Blueprint Model Paper (80 अंक)",
  description:
    "हिंदी (कोर्स-A) अर्धवार्षिक परीक्षा का ब्लू-प्रिंट आधारित मॉडल पेपर — अपठित गद्यांश व काव्यांश, व्याकरण (वाक्य भेद, वाच्य, पद परिचय, अलंकार), पाठ्यपुस्तक के प्रश्न और रचनात्मक लेखन, सभी के मॉडल उत्तर और शब्द-सीमा के साथ।",
};

const BOARD_LINK = "/smart-board?web=%2Fembed%2Fhindi-blueprint&layout=split&name=Hindi%20Blueprint%20Paper";

const LETTERS = ["(क)", "(ख)", "(ग)", "(घ)"];

function Ans({ text, ok }: { text: string; ok?: boolean }) {
  return (
    <p
      className={`mt-2 whitespace-pre-line rounded-lg border p-3 text-[13px] leading-relaxed text-ink ${
        ok ? "border-[#ceead6] border-l-[3px] border-l-[#188038] bg-[#f6fdf8]" : "border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white"
      }`}
    >
      <span className="mr-1 font-bold text-[#188038]">उत्तर.</span>
      {text}
    </p>
  );
}

function PassageBlock({ p }: { p: HNPassage }) {
  return (
    <article className="mt-6 rounded-xl border border-[#e8eaed] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न {p.n}</span>
        <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
          {p.kind}
        </span>
        <span className="font-mono text-[10.5px] font-bold text-ink-mute">{p.marks} अंक</span>
        <span className="ml-auto font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#1a73e8]">{p.source}</span>
      </div>
      <blockquote className="mt-3 whitespace-pre-line rounded-lg border border-[#e8eaed] bg-[#f8f9fa] p-3 text-[13.5px] leading-relaxed text-[#3c4043]">
        {p.extract}
      </blockquote>
      <div className="mt-3 space-y-3">
        {p.items.map((it, i) => (
          <div key={i} className="border-t border-dashed border-[#e8eaed] pt-3">
            <p className="text-[13.5px] font-bold leading-snug text-ink">
              ({i + 1}) {it.q}
              <span className="ml-2 font-mono text-[10px] font-bold text-ink-mute">{it.marks} अंक</span>
            </p>
            {it.opts && (
              <ul className="mt-2 grid gap-1 pl-1 text-[13px] text-[#3c4043] sm:grid-cols-2">
                {it.opts.map((o, j) => (
                  <li
                    key={j}
                    className={
                      it.correct === j
                        ? "flex items-start gap-1.5 rounded border border-[#ceead6] bg-[#e6f4ea] px-2 py-1 font-bold text-[#0d652d]"
                        : "flex items-start gap-1.5 px-2 py-1"
                    }
                  >
                    <span>{LETTERS[j]}</span>
                    <span>{o}</span>
                    {it.correct === j && (
                      <span className="ml-auto shrink-0 font-mono text-[9.5px] font-extrabold uppercase tracking-wider text-[#188038]">Correct</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <Ans text={it.ans} />
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg border border-[#fce8b2] bg-[#fef7e0] p-3 text-[12.5px] leading-relaxed text-[#7a5c00]">
        <span className="mr-1 font-bold">ध्यान दें.</span>
        {p.tip}
      </p>
    </article>
  );
}

function LitBlock({ q }: { q: HNLitQ }) {
  return (
    <article className="mt-6 rounded-xl border border-[#e8eaed] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न {q.n}</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#1a73e8]">{q.book}</span>
        <span className="rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">{q.ch}</span>
        <span className="rounded-full border border-[#e8eaed] bg-[#f8f9fa] px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">{q.topic}</span>
      </div>
      <h3 className="mt-2 text-[14.5px] font-bold leading-snug text-ink">{q.q}</h3>
      <Ans text={q.ans} />
      {q.alt && (
        <>
          <p className="mt-4 text-center font-mono text-[11px] font-extrabold tracking-[.2em] text-ink-mute">अथवा</p>
          <div className="mt-3 rounded-xl border border-dashed border-[#dadce0] bg-[#f8f9fa] p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">{q.alt.ch}</span>
              <span className="rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">{q.alt.topic}</span>
            </div>
            <h3 className="mt-2 text-[14.5px] font-bold leading-snug text-ink">{q.alt.q}</h3>
            <Ans text={q.alt.ans} />
          </div>
        </>
      )}
    </article>
  );
}

function SectionHead({ k }: { k: string }) {
  const s = HINDI_SECTIONS.find((x) => x.k === k)!;
  return (
    <div className="border-b-2 border-ink pb-2">
      <h2 className="text-[16px] font-extrabold text-ink">{s.label}</h2>
      <p className="mt-1 text-[12.5px] text-ink-mute">{s.blurb}</p>
      <p className="mt-2 font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-ink-mute">
        {s.marks} अंक · {s.qs} प्रश्न-संख्या
      </p>
    </div>
  );
}

export default function HindiBlueprintPaper() {
  const totalM = HINDI_BLUEPRINT.reduce((a, r) => a + r.marks, 0);
  const kTotals = ["क", "ख", "ग", "घ"].map((k) => ({
    k,
    marks: HINDI_BLUEPRINT.filter((r) => r.k === k).reduce((a, r) => a + r.marks, 0),
    rows: HINDI_BLUEPRINT.filter((r) => r.k === k).length,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        {HINDI_META.school} · {HINDI_META.exam}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        हिंदी (कोर्स-A) अर्धवार्षिक — ब्लू-प्रिंट मॉडल पेपर
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        यह पेपर अनुमान नहीं है — यह आपके विद्यालय के ब्लू-प्रिंट की हर पंक्ति से बनाया गया है। हर खंड, हर प्रश्न-प्रकार, हर
        उपप्रश्न की संख्या और हर अंक वही है जो ब्लू-प्रिंट में छपा है:{" "}
        <strong className="font-bold text-ink">{HINDI_META.rows} पंक्तियाँ · कुल {totalM} अंक</strong>। हर प्रश्न के साथ
        पाठ/अध्याय और शब्द-सीमा दी गई है, और हर उत्तर उतना ही लंबा है जितने अंक माँगे गए हैं।{" "}
        <span className="font-mono text-[11px] font-bold text-ink-mute">
          समय {HINDI_META.time} · पूर्णांक {HINDI_META.mm}
        </span>
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={BOARD_LINK} className="rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          स्मार्ट बोर्ड पर अभ्यास करें
        </Link>
        <Link
          href="/important-questions/hindi-expected"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          सबसे संभावित प्रश्न (सभी पाठ)
        </Link>
        <Link href="/important-questions/sst-blueprint" className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink">
          SST का मॉडल पेपर
        </Link>
      </div>

      {/* ---------------- ब्लू-प्रिंट ---------------- */}
      <section className="mt-10">
        <h2 className="text-[15px] font-extrabold uppercase tracking-[.08em] text-ink">विस्तृत प्रश्न-पत्र ब्लू-प्रिंट</h2>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          निर्धारित पाठ्यपुस्तकें: क्षितिज भाग-2 (गद्य व काव्य) · कृतिका भाग-2 · व्याकरण
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#dadce0] bg-white p-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a73e8]">क्षितिज गद्य</p>
            <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-[#3c4043]">
              {HINDI_PORTION.gadya.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#dadce0] bg-white p-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a73e8]">क्षितिज काव्य</p>
            <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-[#3c4043]">
              {HINDI_PORTION.kavya.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#dadce0] bg-white p-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a73e8]">कृतिका व व्याकरण</p>
            <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-[#3c4043]">
              {HINDI_PORTION.kritika.map((x) => (
                <li key={x}>{x}</li>
              ))}
              <li className="font-semibold text-ink">{HINDI_PORTION.vyakaran[0]}</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#dadce0]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f8f9fa] text-[10.5px] font-bold uppercase tracking-wider text-ink-mute">
                <th className="px-2 py-2">खंड</th>
                <th className="px-2 py-2">प्र.</th>
                <th className="px-2 py-2">विषय / अध्याय</th>
                <th className="px-2 py-2">प्रश्न-प्रकार</th>
                <th className="px-2 py-2 text-center">उपप्रश्न</th>
                <th className="px-2 py-2 text-center">अंक</th>
                <th className="px-2 py-2">विकल्प / निर्देश</th>
              </tr>
            </thead>
            <tbody>
              {HINDI_BLUEPRINT.map((r, i) => (
                <tr key={r.k + r.n} className={`align-top text-[12px] ${i % 2 ? "bg-white" : "bg-[#fcfcfd]"}`}>
                  <td className="px-2 py-2 text-center font-extrabold text-ink">{r.k}</td>
                  <td className="px-2 py-2 font-mono font-bold text-ink">{r.n}</td>
                  <td className="px-2 py-2 text-[#3c4043]">{r.chapter}</td>
                  <td className="px-2 py-2 text-[#3c4043]">{r.type}</td>
                  <td className="px-2 py-2 text-center text-[#3c4043]">{r.subs}</td>
                  <td className="px-2 py-2 text-center font-mono font-extrabold text-ink">{r.marks}</td>
                  <td className="px-2 py-2 text-[#3c4043]">{r.rule}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {kTotals.map((t) => (
                <tr key={t.k} className="border-t border-dashed border-[#dadce0] bg-[#f8f9fa] text-[11.5px]">
                  <td colSpan={5} className="px-2 py-1.5 text-right font-bold text-ink-mute">
                    खंड {t.k} — {t.rows} पंक्तियाँ
                  </td>
                  <td className="px-2 py-1.5 text-center font-mono font-extrabold text-ink">{t.marks}</td>
                  <td />
                </tr>
              ))}
              <tr className="border-t-2 border-ink bg-[#f8f9fa] text-[13px]">
                <td colSpan={5} className="px-2 py-2 text-right font-extrabold uppercase tracking-wide text-ink">
                  कुल योग (Grand Total)
                </td>
                <td className="px-2 py-2 text-center font-mono font-extrabold text-ink">{totalM}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] text-ink-mute">
          पढ़ने का ढंग: खंड क में केवल 2 प्रश्न हैं पर 14 अंक — दोनों अनिवार्य हैं। खंड ख में चारों में पाँच-पाँच प्रश्न आएँगे,
          किन्हीं चार के उत्तर देने हैं (कुल 16 अंक)। खंड ग पूरा पाठ्यपुस्तक का है — 30 अंक। खंड घ में हर प्रश्न में दो विषय,
          एक चुनना है — पूरे 20 अंक यहीं से मिलते हैं।
        </p>
      </section>

      {/* ---------------- खंड क — अपठित बोध ---------------- */}
      <section className="mt-12">
        <SectionHead k="क" />
        {HINDI_PASSAGES.map((p) => (
          <PassageBlock key={p.n} p={p} />
        ))}
      </section>

      {/* ---------------- खंड ख — व्याकरण ---------------- */}
      <section className="mt-12">
        <SectionHead k="ख" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HINDI_GRAMMAR_RULES.map((r) => (
            <div key={r.topic} className="rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-4">
              <h3 className="text-[13px] font-extrabold text-ink">{r.topic}</h3>
              <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-[#3c4043]">
                {r.rule.map((x) => (
                  <li key={x} className="border-b border-dashed border-[#e8eaed] pb-1.5 last:border-0">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {HINDI_GRAMMAR.map((g) => (
          <div key={g.n} className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न {g.n}</span>
              <h3 className="text-[14px] font-extrabold text-ink">{g.topic}</h3>
              <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
                5 में से 4 · 4 अंक
              </span>
            </div>
            {g.questions.map((q) => (
              <article key={q.n} className="mt-4 rounded-xl border border-[#e8eaed] bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-extrabold text-[#1a73e8]">({q.n})</span>
                  <span className="rounded-full border border-[#e8eaed] bg-[#f8f9fa] px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">
                    {q.topic}
                  </span>
                  <span className="ml-auto font-mono text-[10px] font-bold text-ink-mute">1 अंक</span>
                </div>
                <h4 className="mt-2 text-[13.5px] font-bold leading-snug text-ink">{q.q}</h4>
                <Ans text={q.ans} />
              </article>
            ))}
          </div>
        ))}
      </section>

      {/* ---------------- खंड ग — पाठ्यपुस्तक ---------------- */}
      <section className="mt-12">
        <SectionHead k="ग" />
        <PassageBlock p={HINDI_PADYA_GADY} />

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e8eaed] pb-2">
            <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न 5</span>
            <h3 className="text-[14px] font-extrabold text-ink">क्षितिज गद्य — लघु उत्तरीय</h3>
            <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
              4 में से 3 · प्रत्येक 2 अंक · 25-30 शब्द
            </span>
          </div>
          {HINDI_GADYA_SHORT.map((q) => (
            <LitBlock key={q.n} q={q} />
          ))}
        </div>

        <div className="mt-10">
          <PassageBlock p={HINDI_PADYA_KAVYA} />
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e8eaed] pb-2">
            <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न 7</span>
            <h3 className="text-[14px] font-extrabold text-ink">क्षितिज काव्य — लघु उत्तरीय</h3>
            <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
              4 में से 3 · प्रत्येक 2 अंक · 25-30 शब्द
            </span>
          </div>
          {HINDI_KAVYA_SHORT.map((q) => (
            <LitBlock key={q.n} q={q} />
          ))}
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e8eaed] pb-2">
            <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न 8</span>
            <h3 className="text-[14px] font-extrabold text-ink">कृतिका भाग-2 — दीर्घ उत्तरीय</h3>
            <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
              3 में से 2 · प्रत्येक 4 अंक · 50-60 शब्द
            </span>
          </div>
          {HINDI_KRITIKA_LONG.map((q) => (
            <LitBlock key={q.n} q={q} />
          ))}
        </div>
      </section>

      {/* ---------------- खंड घ — रचनात्मक लेखन ---------------- */}
      <section className="mt-12">
        <SectionHead k="घ" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HINDI_FORMATS.map((f) => (
            <div key={f.type} className="rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[13px] font-extrabold text-ink">{f.type}</h3>
                <span className="ml-auto font-mono text-[10px] font-bold text-ink-mute">
                  {f.marks} अंक · {f.limit}
                </span>
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-[12.5px] leading-relaxed text-[#3c4043]">
                {f.skeleton.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {HINDI_WRITING.map((w) => (
          <article key={w.n} className="mt-6 rounded-xl border border-[#e8eaed] bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[12px] font-extrabold text-[#1a73e8]">प्रश्न {w.n}</span>
              <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
                {w.type}
              </span>
              <span className="font-mono text-[10.5px] font-bold text-ink-mute">
                {w.marks} अंक · {w.limit}
              </span>
            </div>
            <h3 className="mt-2 text-[14px] font-bold leading-snug text-ink">{w.topic}</h3>
            <p className="mt-2 whitespace-pre-line rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
              <span className="mr-1 font-bold text-[#188038]">मॉडल उत्तर.</span>
              {w.model}
            </p>
            <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-[#7a5c00]">
              {w.tips.map((t) => (
                <li key={t} className="rounded-lg border border-[#fce8b2] bg-[#fef7e0] px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* ---------------- रणनीति ---------------- */}
      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">इस पेपर का उपयोग कैसे करें</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>पहले पूरा पेपर 3 घंटे में हल कीजिए — उत्तर देखे बिना। लिखते समय घड़ी देखिए।</li>
          <li>शब्द-सीमा कभी कम न कीजिए: लघु के 25-30 और दीर्घ के 50-60 शब्द लिखने पर ही पूरे अंक मिलते हैं।</li>
          <li>खंड ख में पाँचों प्रश्न पढ़िए, फिर अपने पक्के चार चुनिए — अनुमान से गलत उत्तर से बचिए।</li>
          <li>काव्यांश/गद्यांश में उत्तर अंश (extract) की पंक्तियों से ही दीजिए, अपनी ओर से कुछ जोड़िए नहीं।</li>
          <li>फिर यहाँ से जाँचिए — हर उत्तर में वही बिंदु हैं जो पूरे अंक दिलाते हैं।</li>
        </ol>
        <Link href={BOARD_LINK} className="mt-4 inline-block rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          स्मार्ट बोर्ड के साथ खोलें
        </Link>
      </div>

      <p className="mt-8 text-[12.5px] leading-relaxed text-ink-mute">
        अभ्यास के लिए आगे देखिए:{" "}
        <Link href="/important-questions/hindi-expected" className="font-bold text-[#1a73e8]">
          सबसे संभावित प्रश्न (सभी पाठ, व्याकरण और लेखन)
        </Link>{" "}
        — इसमें हर पाठ के सबसे अधिक बार आने वाले प्रश्न अलग से चिह्नित हैं।
      </p>
    </main>
  );
}
