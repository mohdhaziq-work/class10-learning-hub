import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { PYQ_MATHS } from "@/lib/content/pyq";
import { PYQ_MATHS_SEO, getPyqChapterBySlug } from "@/lib/pyqSeo";

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
  const idx = PYQ_MATHS_SEO.findIndex((c) => c.key === ch.key);
  const prev = PYQ_MATHS_SEO[idx - 1];
  const next = PYQ_MATHS_SEO[idx + 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

      <nav className="flex items-center gap-1.5 text-[13.5px] font-medium text-ink-mute mt-5 mb-4 flex-wrap">
        <Link href="/" className="flex items-center gap-1 hover:text-black transition"><Icon name="home" size={15} /> Home</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/pyq" className="hover:text-black transition">PYQs</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/pyq/maths" className="hover:text-black transition">Maths</Link>
        <Icon name="chevronRight" size={14} />
        <span className="text-ink font-semibold">Ch {ch.n}</span>
      </nav>

      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">{ch.unit} · CBSE Board Questions</p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Class 10 Maths Chapter {ch.n}: {ch.name} PYQs
          </h1>
          <p className="text-ink-soft mt-3 text-[15.5px] leading-relaxed">
            {all.length} previous year questions with answers for {ch.name}. Filter by marks,
            download the chapter PYQ PDF, or open it on the Smart Board for classroom practice.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <a href={`/api/pyq/pdf?ch=${ch.key}&dl=1`} target="_blank" rel="noopener noreferrer" className="btn-g btn-g-dark text-[14px]">
            <Icon name="fileText" size={16} /> Download PDF
          </a>
          <Link
            href={`/smart-board?pdf=${encodeURIComponent(`/api/pyq/pdf?ch=${ch.key}`)}&name=${encodeURIComponent(`Class 10 Maths Ch ${ch.n} PYQs.pdf`)}`}
            className="btn-g btn-g-white text-[14px]"
          >
            <Icon name="squarePen" size={16} /> Open in Board
          </Link>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap mt-6">
        {[0, 1, 2, 3, 4, 5].map((m) => {
          const count = m === 0 ? all.length : all.filter((p) => p.m === m).length;
          const active = marks === m;
          const href = m === 0 ? ch.path : `${ch.path}?marks=${m}`;
          return (
            <Link
              key={m}
              href={href}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold border transition ${
                active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-ink-mute border-slate-200 hover:border-slate-400"
              }`}
            >
              {m === 0 ? `All ${count}` : `${m} mark${m > 1 ? "s" : ""} · ${count}`}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 pb-8">
        {shown.length === 0 && (
          <div className="text-ink-mute text-sm border border-dashed border-slate-300 rounded-2xl p-6 text-center">
            No {marks}-mark questions tagged in this chapter yet.
          </div>
        )}
        {shown.map((p, i) => {
          const qIndex = all.indexOf(p);
          return (
            <details key={`${ch.key}-${qIndex}`} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 open:shadow-pop">
              <summary className="cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 text-white grid place-items-center text-[12.5px] font-extrabold flex-none mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-[15px] leading-relaxed text-ink">{p.q}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{p.y}</span>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                        {p.m} mark{p.m > 1 ? "s" : ""}
                      </span>
                      <span className="text-[11px] font-bold text-ink-mute">Tap for answer</span>
                    </div>
                  </div>
                </div>
              </summary>
              <div className="ml-10 mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-[14px] leading-relaxed text-ink">
                <b className="text-[11px] font-mono uppercase tracking-[.14em] text-ink-mute block mb-1">Answer</b>
                {p.ans}
              </div>
              <div className="ml-10 mt-3">
                <Link
                  href={`/smart-board?pdf=${encodeURIComponent(`/api/pyq/pdf?ch=${ch.key}&n=${qIndex}`)}&name=${encodeURIComponent(`Class 10 Maths Ch ${ch.n} Q${qIndex + 1}.pdf`)}`}
                  className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition inline-flex items-center gap-1.5"
                >
                  <Icon name="squarePen" size={13} /> Solve on Board
                </Link>
              </div>
            </details>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 py-6 mb-10 flex-wrap">
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
