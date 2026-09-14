import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { PYQ_MATHS } from "@/lib/content/pyq";
import { PYQ_MATHS_SEO, getPyqChapterBySlug, eduRevBoardHref } from "@/lib/pyqSeo";

export function generateStaticParams() {
  return PYQ_MATHS_SEO.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ch = getPyqChapterBySlug(params.slug);
  if (!ch) return {};
  const title = `${ch.name} PYQs — Class 10 Maths Chapter ${ch.n}`;
  const description = `Class 10 Maths Chapter ${ch.n} ${ch.name} PYQs: CBSE previous year questions with answers, marks-wise filter, PDF download and Smart Board solving.`;
  return {
    title,
    description,
    alternates: { canonical: ch.path },
    openGraph: { title, description, url: ch.path, type: "article" },
  };
}

export default function PyqChapterPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { marks?: string };
}) {
  const ch = getPyqChapterBySlug(params.slug);
  if (!ch) notFound();
  const all = PYQ_MATHS[ch.key] || [];
  const marksParam = Number(searchParams?.marks || 0);
  const marks = [1, 2, 3, 4, 5].includes(marksParam) ? marksParam : 0;
  const shown = marks ? all.filter((p) => p.m === marks) : all;
  const totalMarks = all.reduce((a, p) => a + p.m, 0);
  const idx = PYQ_MATHS_SEO.findIndex((c) => c.key === ch.key);
  const prev = PYQ_MATHS_SEO[idx - 1];
  const next = PYQ_MATHS_SEO[idx + 1];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${ch.name} PYQs — Class 10 Maths Chapter ${ch.n}`,
            description: `CBSE Class 10 Maths Chapter ${ch.n} ${ch.name} previous year questions with answers and PDF download.`,
            url: absoluteUrl(ch.path),
            educationalLevel: "Class 10",
            learningResourceType: ["previous year questions", "board exam practice"],
            teaches: ch.name,
            about: { "@type": "Thing", name: "Mathematics" },
            isPartOf: { "@type": "Course", name: "Class 10 Maths PYQs", url: absoluteUrl("/pyq/maths") },
            provider: organizationJsonLd(),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "PYQs", path: "/pyq" },
            { name: "Maths", path: "/pyq/maths" },
            { name: `Chapter ${ch.n}: ${ch.name}`, path: ch.path },
          ]),
        ]}
      />

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-5 flex-wrap">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/pyq" className="hover:text-black transition">PYQs</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/pyq/maths" className="hover:text-black transition">Maths</Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Ch {ch.n}</span>
      </nav>

      {/* ---------- board-paper sheet ---------- */}
      <div className="qp-sheet">
        <div className="qp-head">
          <div className="qp-code">
            <span>Mathematics (041)</span>
            <span>Class X · Chapter {ch.n}</span>
          </div>
          <h1 className="qp-title">
            {ch.name} — Previous Year Questions
          </h1>
          <div className="qp-meta">
            <span>{all.length} questions</span>
            <span className="qp-dot" />
            <span>{totalMarks} marks total</span>
            <span className="qp-dot" />
            <span>CBSE 2011-2026</span>
          </div>
        </div>

        <div className="qp-instructions">
          <b>General instructions:</b>
          <ol>
            <li>All questions are previous year CBSE board questions; every question is compulsory in practice.</li>
            <li>Marks against each question are tagged — practise with the same weightage.</li>
            <li>Attempt on paper or on the Smart Board first, then open the answer to self-check.</li>
            <li>Use the PDF download for offline, exam-style practice.</li>
          </ol>
        </div>

        {/* marks filter */}
        <div className="flex gap-1.5 flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((m) => {
            const count = m === 0 ? all.length : all.filter((p) => p.m === m).length;
            const active = marks === m;
            const href = m === 0 ? ch.path : `${ch.path}?marks=${m}`;
            return (
              <Link
                key={m}
                href={href}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold border transition ${
                  active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-ink-mute border-slate-300 hover:border-slate-500"
                }`}
              >
                {m === 0 ? `All · ${count}` : `${m} mark${m > 1 ? "s" : ""} · ${count}`}
              </Link>
            );
          })}
        </div>

        {/* questions */}
        <div className="qp-list">
          {shown.length === 0 && (
            <div className="text-ink-mute text-sm border border-dashed border-slate-300 rounded-xl p-6 text-center">
              No {marks}-mark questions tagged in this chapter yet.
            </div>
          )}
          {shown.map((p) => {
            const qIndex = all.indexOf(p);
            return (
              <article key={`${ch.key}-${qIndex}`} className="qp-q">
                <div className="qp-qrow">
                  <span className="qp-num">Q{qIndex + 1}.</span>
                  <p className="qp-text">{p.q}</p>
                  <span className="qp-marks">[{p.m}]</span>
                </div>
                <div className="qp-tags">
                  <span className="qp-year">{p.y}</span>
                  <details className="qp-ans">
                    <summary>Answer</summary>
                    <div className="qp-ans-body">{p.ans}</div>
                  </details>
                  <Link
                    href={`/smart-board?pdf=${encodeURIComponent(`/api/pyq/pdf?ch=${ch.key}&n=${qIndex}`)}&name=${encodeURIComponent(`Class 10 Maths Ch ${ch.n} Q${qIndex + 1}.pdf`)}`}
                    className="qp-board"
                  >
                    <Icon name="squarePen" size={13} /> Solve on Board
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="qp-foot">
          <span>End of Chapter {ch.n} question set</span>
          <div className="flex gap-2">
            {eduRevBoardHref(ch.n, ch.name) && (
            <Link href={eduRevBoardHref(ch.n, ch.name)!} className="btn-g btn-g-dark text-[13.5px]">
              <Icon name="squarePen" size={16} /> EduRev PYQs + Whiteboard
            </Link>
          )}
          <a href={`/api/pyq/pdf?ch=${ch.key}&dl=1`} target="_blank" rel="noopener noreferrer" className="btn-g btn-g-white text-[13.5px]">
              <Icon name="fileText" size={16} /> Download PDF
            </a>
            <Link
              href={`/smart-board?pdf=${encodeURIComponent(`/api/pyq/pdf?ch=${ch.key}`)}&name=${encodeURIComponent(`Class 10 Maths Ch ${ch.n} PYQs.pdf`)}`}
              className="btn-g btn-g-white text-[13.5px]"
            >
              <Icon name="squarePen" size={16} /> Open in Board
            </Link>
          </div>
        </div>
      </div>

      {/* prev / next */}
      <div className="flex items-center justify-between gap-3 py-8 flex-wrap">
        {prev ? (
          <Link href={prev.path} className="btn-g btn-g-white text-[14px]">
            <Icon name="chevronLeft" size={16} /> Ch {prev.n}: {prev.name}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={next.path} className="btn-g btn-g-white text-[14px]">
            Ch {next.n}: {next.name} <Icon name="chevronRight" size={16} />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
