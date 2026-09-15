import { PYQ_CHAPTERS, PYQ_MATHS } from "@/lib/content/pyq";

export interface PyqChapterSeo {
  key: string;
  n: number;
  name: string;
  unit: string;
  slug: string;
  path: string;
  count: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PYQ_MATHS_SEO: PyqChapterSeo[] = PYQ_CHAPTERS.map((c) => {
  const slug = `chapter-${c.n}-${slugify(c.name)}`;
  return {
    ...c,
    slug,
    path: `/pyq/maths/${slug}`,
    count: (PYQ_MATHS[c.key] || []).length,
  };
});

export function getPyqChapterBySlug(slug: string): PyqChapterSeo | undefined {
  return PYQ_MATHS_SEO.find((c) => c.slug === slug);
}

export function getPyqChapterByKey(key: string): PyqChapterSeo | undefined {
  return PYQ_MATHS_SEO.find((c) => c.key === key);
}


/* EduRev chapter-wise PYQ pages (external reference, opened in the board's web pane). */
export const EDUREV_MATHS: string[] = [
  "https://edurev.in/t/169340/CBSE-Previous-Year-Questions-Real-Numbers",
  "https://edurev.in/t/169355/CBSE-Previous-Year-Questions-Polynomials",
  "https://edurev.in/t/169357/CBSE-Previous-Year-Questions-Pair-of-Linear-Equations-in-Two-Variables",
  "https://edurev.in/t/169375/Previous-Year-Questions-Quadratic-Equations",
  "https://edurev.in/t/169397/Previous-Year-Questions-Arithmetic-Progressions",
  "https://edurev.in/t/169392/Previous-Year-Questions-Triangles",
  "https://edurev.in/t/169389/Previous-Year-Questions-Coordinate-Geometry",
  "https://edurev.in/t/169393/Previous-Year-Questions-Introduction-to-Trigonometry",
  "https://edurev.in/t/169398/Previous-Year-Questions-Some-Applications-Of-Trigonometry",
  "https://edurev.in/t/169399/Previous-Year-Questions-Circles",
  "https://edurev.in/t/169384/Previous-Year-Questions-Areas-Related-to-Circles",
  "https://edurev.in/t/169358/Previous-Year-Questions-Surface-Areas--Volumes",
  "https://edurev.in/t/169356/Previous-Year-Questions-Statistics",
  "https://edurev.in/t/169344/Previous-Year-Questions-Probability",
];

export function eduRevHref(chapterNumber: number): string | undefined {
  return EDUREV_MATHS[chapterNumber - 1];
}


/* EduRev chapter-wise PYQ pages for every subject (opened via clean-reader proxy in the board's web pane). */
export const EDUREV_CHAPTERS: Record<string, (string | null)[]> = {
  science: [
    "https://edurev.in/t/168985/Previous-Year-Questions-Chemical-Reactions--Equations",
    "https://edurev.in/t/168984/Previous-Year-Questions-with-Solutions-Acids-Bases--Salts",
    "https://edurev.in/t/168986/Previous-Year-Questions-Metals--Nonmetals",
    "https://edurev.in/t/91740/Previous-Year-Questions-Carbon--its-Compounds--1",
    "https://edurev.in/t/168995/Previous-Year-Questions-Life-Processes",
    "https://edurev.in/t/169006/Previous-Year-Questions-Control--Coordination",
    "https://edurev.in/t/169008/Previous-Year-Questions-How-do-Organisms-Reproduce",
    "https://edurev.in/t/169009/Previous-Year-Questions-Heredity",
    "https://edurev.in/t/169042/Previous-Year-Questions-Light--Reflection--Refraction",
    "https://edurev.in/t/169046/Previous-Year-Questions-The-Human-Eye--Colorful-World",
    "https://edurev.in/t/169051/Previous-Year-Questions-Electricity",
    "https://edurev.in/t/169045/Previous-Year-Questions-Magnetic-Effects-of-Electric-Current",
    "https://edurev.in/t/169047/Previous-Year-Questions-Our-Environment"
  ],
  sst: [
    "https://edurev.in/t/169069/Previous-Year-Questions-The-Rise-of-Nationalism-in-Europe",
    "https://edurev.in/t/169090/Previous-Year-Questions-Nationalism-in-India",
    "https://edurev.in/t/169105/Previous-Year-Questions-The-Making-of-a-Global-World",
    "https://edurev.in/t/169111/Previous-Year-Questions-The-Age-of-Industrialisation",
    "https://edurev.in/t/169083/Previous-Year-Questions-Print-Culture--the-Modern-World",
    "https://edurev.in/t/169082/Previous-Year-Questions-Resources--Development",
    "https://edurev.in/t/286019/Previous-Year-Questions-Forest-and-Wildlife-Resources",
    "https://edurev.in/t/169098/Previous-Year-Questions-Water-Resources",
    "https://edurev.in/t/169100/Previous-Year-Questions-Agriculture",
    "https://edurev.in/t/169104/Previous-Year-Questions-Minerals--Energy-Resources",
    "https://edurev.in/t/169114/Previous-Year-Questions-Manufacturing-Industries",
    "https://edurev.in/t/169119/Previous-Year-Questions-Lifelines-of-National-Economy",
    "https://edurev.in/t/169077/Previous-Year-Questions-PowerSharing",
    "https://edurev.in/t/169091/Previous-Year-Questions-Federalism",
    "https://edurev.in/t/169096/Previous-Year-Questions-Gender-Religion--Caste",
    "https://edurev.in/t/169085/Previous-Year-Questions-Political-Parties",
    "https://edurev.in/t/169108/Previous-Year-Questions-Outcomes-of-Democracy",
    "https://edurev.in/t/169112/Previous-Year-Questions-Development",
    "https://edurev.in/t/169115/Previous-Year-Questions-Sectors-of-the-Indian-Economy",
    "https://edurev.in/t/169116/Previous-Year-Questions-Money--Credit",
    "https://edurev.in/t/169117/Previous-Year-Questions-Globalisation--the-Indian-Economy",
    "https://edurev.in/t/169122/Previous-Year-Questions-Consumer-Rights"
  ],
  english: [
    "https://edurev.in/t/298872/Previous-Year-Questions-A-Letter-to-God",
    "https://edurev.in/t/298873/Previous-Year-Questions-Nelson-Mandela--Long-Walk-to-Freedom",
    "https://edurev.in/t/298874/Previous-Year-Questions-Two-Stories-about-Flying",
    "https://edurev.in/t/298875/Previous-Year-Questions-From-the-Diary-of-Anne-Frank",
    "https://edurev.in/t/298876/Previous-Year-Questions-Glimpses-of-India",
    "https://edurev.in/t/298877/Previous-Year-Questions-Mijbil-the-Otter",
    "https://edurev.in/t/298878/Previous-Year-Questions-Madam-Rides-the-Bus",
    "https://edurev.in/t/298904/Previous-Year-Questions-The-Sermon-at-Benares",
    "https://edurev.in/t/298905/Previous-Year-Questions-The-Proposal",
    "https://edurev.in/t/300383/Previous-Year-Questions-Dust-of-Snow",
    "https://edurev.in/t/300384/Previous-Year-Questions-Fire-and-Ice",
    "https://edurev.in/t/300385/Previous-Year-Questions-A-Tiger-in-the-Zoo",
    "https://edurev.in/t/300386/Previous-Year-Questions-How-to-Tell-Wild-Animals",
    "https://edurev.in/t/300387/Previous-Year-Questions-The-Ball-Poem",
    "https://edurev.in/t/300388/Previous-Year-Questions-Amanda",
    "https://edurev.in/t/300389/Previous-Year-Questions-The-Trees",
    "https://edurev.in/t/440628/Previous-Year-Questions-Fog",
    "https://edurev.in/t/300390/Previous-Year-Questions-The-Tale-of-Custard-the-Dragon",
    "https://edurev.in/t/300391/Previous-Year-Questions-For-Anne-Gregory",
    "https://edurev.in/t/298906/Previous-Year-Questions-A-Triumph-of-Surgery",
    "https://edurev.in/t/298907/Previous-Year-Questions-The-Thiefs-Story",
    "https://edurev.in/t/298908/Previous-Year-Questions-The-Midnight-Visitor",
    "https://edurev.in/t/298909/Previous-Year-Questions-A-Question-of-Trust",
    "https://edurev.in/t/300378/Previous-Year-Questions-Footprints-without-Feet",
    "https://edurev.in/t/300379/Previous-Year-Questions-The-Making-of-a-Scientist",
    "https://edurev.in/t/300380/Previous-Year-Questions-The-Necklace",
    "https://edurev.in/t/300381/Previous-Year-Questions-Bholi",
    "https://edurev.in/t/300382/Previous-Year-Questions-The-Book-that-saved-the-Earth"
  ],
  hindi: [
    null,
    "https://edurev.in/t/486191/CBSE-Previous-Year-Questions--",
    "https://edurev.in/t/486193/CBSE-Previous-Year-Questions-",
    "https://edurev.in/t/486196/CBSE-Previous-Year-Questions-----",
    "https://edurev.in/t/486198/CBSE-Previous-Year-Questions-----",
    "https://edurev.in/t/486203/CBSE-Previous-Year-Questions-",
    "https://edurev.in/t/486205/CBSE-Previous-Year-Questions---",
    "https://edurev.in/t/486209/CBSE-Previous-Year-Questions--",
    "https://edurev.in/t/486212/CBSE-Previous-Year-Questions--",
    "https://edurev.in/t/486213/CBSE-Previous-Year-Questions----",
    "https://edurev.in/t/486217/CBSE-Previous-Year-Questions---",
    "https://edurev.in/t/486220/CBSE-Previous-Year-Questions-",
    "https://edurev.in/t/486225/CBSE-Previous-Year-Questions---",
    "https://edurev.in/t/486230/CBSE-Previous-Year-Questions---",
    "https://edurev.in/t/486231/CBSE-Previous-Year-Questions----"
  ],
};

export function eduRevHrefFor(subjectId: string, flatIndex: number): string | undefined {
  if (subjectId === "maths") return EDUREV_MATHS[flatIndex];
  const arr = EDUREV_CHAPTERS[subjectId];
  return arr ? (arr[flatIndex] || undefined) : undefined;
}

export function eduRevBoardHrefFor(subjectId: string, flatIndex: number, title: string): string | undefined {
  const u = eduRevHrefFor(subjectId, flatIndex);
  if (!u) return undefined;
  return `/smart-board?web=${encodeURIComponent(u)}&name=${encodeURIComponent(`EduRev PYQs — ${title}`)}`;
}

export function eduRevBoardHref(chapterNumber: number, title: string): string | undefined {
  const u = eduRevHref(chapterNumber);
  if (!u) return undefined;
  return `/smart-board?web=${encodeURIComponent(u)}&name=${encodeURIComponent(`EduRev PYQs — Ch ${chapterNumber} ${title}`)}`;
}
export function pyqChapterHref(key: string): string | undefined {
  return getPyqChapterByKey(key)?.path;
}
