import type { Metadata } from "next";
import Link from "next/link";
import { HINDI_IMP_UNITS, HINDI_IMP_HOT, HINDI_IMP_TOTAL, HINDI_IMP_HOT_TOTAL } from "@/lib/content/hindiImp";
import { HINDI_IMP_VYAKARAN as HINDI_IMP_VYAKARAN_TOPICS, HINDI_IMP_LEKHAN } from "@/lib/content/hindiImpVyakaran";
import type { HNImpQ } from "@/lib/content/hindiTypes";

export const metadata: Metadata = {
  title: "Class 10 Hindi Half Yearly — Most Expected Questions (सभी पाठ, व्याकरण व लेखन)",
  description:
    "हिंदी (कोर्स-A) अर्धवार्षिक के सबसे संभावित प्रश्न — क्षितिज भाग-2 (गद्य व काव्य), कृतिका भाग-2, व्याकरण (वाक्य भेद, वाच्य, पद परिचय, अलंकार) और रचनात्मक लेखन, सभी के मॉडल उत्तर और 'Must do' चिह्न के साथ।",
};

const BOARD_LINK = "/smart-board?web=%2Fembed%2Fhindi-expected&layout=split&name=Hindi%20Most%20Expected";

function HotBadge() {
  return (
    <span className="rounded-full bg-[#e8f0fe] px-2 py-0.5 font-mono text-[9.5px] font-extrabold uppercase tracking-[.1em] text-[#1a73e8]">
      Must do
    </span>
  );
}

function Q({ q }: { q: HNImpQ }) {
  return (
    <article className="mt-4 rounded-xl border border-[#e8eaed] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
          {q.marks} अंक
        </span>
        {q.hot && <HotBadge />}
        <span className="ml-auto rounded-full border border-[#e8eaed] bg-white px-2 py-0.5 text-[10.5px] font-semibold text-ink-mute">
          {q.topic}
        </span>
      </div>
      <h3 className="mt-2 text-[14px] font-bold leading-snug text-ink">{q.q}</h3>
      <p className="mt-2 whitespace-pre-line rounded-lg border border-[#e8eaed] border-l-[3px] border-l-[#188038] bg-white p-3 text-[13px] leading-relaxed text-ink">
        <span className="mr-1 font-bold text-[#188038]">उत्तर.</span>
        {q.ans}
      </p>
    </article>
  );
}

export default function HindiMostExpected() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[.16em] text-ink-mute">
        कक्षा 10 हिंदी (कोर्स-A) · अर्धवार्षिक परीक्षा · सभी पाठ, व्याकरण और लेखन
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">सबसे संभावित प्रश्न — हिंदी अर्धवार्षिक</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">
        पूरे पाठ्यक्रम से {HINDI_IMP_TOTAL} प्रश्न — क्षितिज भाग-2 के गद्य और काव्य, कृतिका भाग-2 के दोनों पाठ, व्याकरण के
        चारों खंड और रचनात्मक लेखन। हर प्रश्न का उत्तर अंकों के अनुसार ही लिखा गया है।{" "}
        <strong className="font-bold text-ink">{HINDI_IMP_HOT_TOTAL} प्रश्न “Must do” हैं</strong> — यदि समय कम है तो पहले
        यही दोहराइए।
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={BOARD_LINK} className="rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          स्मार्ट बोर्ड पर अभ्यास करें
        </Link>
        <Link
          href="/important-questions/hindi-blueprint"
          className="rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-bold text-ink"
        >
          ब्लू-प्रिंट मॉडल पेपर
        </Link>
      </div>

      {/* Must do shortlist */}
      <section className="mt-10">
        <h2 className="text-[15px] font-extrabold uppercase tracking-[.08em] text-ink">
          Must do — {HINDI_IMP_HOT_TOTAL} प्रश्न (सबसे अधिक संभावना)
        </h2>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          ये प्रश्न बोर्ड के पुराने प्रश्न-पत्रों और अर्धवार्षिक परीक्षाओं में बार-बार आते हैं — इन्हें उत्तर सहित याद कीजिए।
        </p>
        <ol className="mt-3 space-y-1.5 rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-4 text-[13px] leading-relaxed text-[#3c4043]">
          {HINDI_IMP_HOT.map((h) => (
            <li key={h.id} className="border-b border-dashed border-[#e8eaed] pb-1.5 last:border-0">
              {h.q}{" "}
              <span className="text-[11px] text-ink-mute">
                — {h.unit}, {h.topic}, {h.marks} अंक
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* क्षितिज गद्य + काव्य + कृतिका */}
      {HINDI_IMP_UNITS.map((u) => (
        <section key={u.key} className="mt-12">
          <div className="border-b-2 border-ink pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#1a73e8]">{u.book}</span>
              <h2 className="text-[16px] font-extrabold text-ink">{u.title}</h2>
              <span className="ml-auto text-[12px] font-semibold text-ink-mute">{u.author}</span>
            </div>
            <p className="mt-1 text-[12.5px] text-ink-mute">{u.blurb}</p>
          </div>
          {u.topics.map((t) => (
            <div key={t.name} className="mt-5">
              <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-[.14em] text-ink-mute">{t.name}</h3>
              {t.qs.map((q) => (
                <Q key={q.id} q={q} />
              ))}
            </div>
          ))}
        </section>
      ))}

      {/* व्याकरण */}
      <section className="mt-12">
        <div className="border-b-2 border-ink pb-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#1a73e8]">खंड ख · 16 अंक</span>
          <h2 className="mt-0.5 text-[16px] font-extrabold text-ink">व्याकरण — सबसे संभावित प्रश्न</h2>
          <p className="mt-1 text-[12.5px] text-ink-mute">
            चारों खंडों में पाँच-पाँच प्रश्न आते हैं, किन्हीं चार के उत्तर देने होते हैं। प्रत्येक उत्तर एक पंक्ति में — भेद या
            अलंकार का नाम + कारण।
          </p>
        </div>
        {HINDI_IMP_VYAKARAN_TOPICS.map((g) => (
          <div key={g.topic} className="mt-6">
            <h3 className="text-[14px] font-extrabold text-ink">{g.topic}</h3>
            <p className="mt-1 text-[12px] text-ink-mute">{g.note}</p>
            {g.items.map((q) => (
              <Q key={q.id} q={q} />
            ))}
          </div>
        ))}
      </section>

      {/* रचनात्मक लेखन */}
      <section className="mt-12">
        <div className="border-b-2 border-ink pb-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#1a73e8]">खंड घ · 20 अंक</span>
          <h2 className="mt-0.5 text-[16px] font-extrabold text-ink">रचनात्मक लेखन — संभावित विषय</h2>
          <p className="mt-1 text-[12.5px] text-ink-mute">
            मॉडल उत्तर और फॉर्मेट ब्लू-प्रिंट मॉडल पेपर पेज पर हैं। यहाँ वे विषय दिए हैं जो इस परीक्षा में सबसे अधिक आते हैं।
          </p>
        </div>
        {HINDI_IMP_LEKHAN.map((l) => (
          <article key={l.type} className="mt-6 rounded-xl border border-[#dadce0] bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[14px] font-extrabold text-ink">{l.type}</h3>
              <span className="rounded border border-[#dadce0] bg-[#f8f9fa] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ink-mute">
                {l.marks} अंक · {l.limit}
              </span>
            </div>
            <ul className="mt-2 grid gap-1.5 text-[13px] leading-relaxed text-[#3c4043] sm:grid-cols-2">
              {l.topics.map((t) => (
                <li key={t} className="rounded-lg border border-[#e8eaed] bg-[#fcfcfd] px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-[#7a5c00]">
              {l.tips.map((t) => (
                <li key={t} className="rounded-lg border border-[#fce8b2] bg-[#fef7e0] px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="mt-12 rounded-xl border border-[#dadce0] bg-white p-5">
        <h2 className="text-[15px] font-extrabold text-ink">तीन दिन की रणनीति</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-relaxed text-ink-mute">
          <li>पहले दिन — क्षितिज के चारों गद्य पाठ और चारों काव्य पाठ: “Must do” प्रश्न उत्तर सहित याद कीजिए।</li>
          <li>दूसरे दिन — कृतिका के दोनों पाठ (50-60 शब्द के दीर्घ उत्तर) और व्याकरण के चारों खंडों के नियम।</li>
          <li>तीसरे दिन — एक अनुच्छेद, एक पत्र, एक स्ववृत्त और एक विज्ञापन लिखकर अभ्यास; फिर पूरा ब्लू-प्रिंट मॉडल पेपर 3 घंटे में हल कीजिए।</li>
          <li>परीक्षा में उत्तर लिखते समय शब्द-सीमा और क्रम (भूमिका-मुख्य-उपसंहार) का पालन कीजिए — यही अंक देता है।</li>
        </ol>
        <Link href={BOARD_LINK} className="mt-4 inline-block rounded-lg bg-[#1a73e8] px-4 py-2 text-[13px] font-bold text-white">
          स्मार्ट बोर्ड के साथ खोलें
        </Link>
      </div>
    </main>
  );
}
