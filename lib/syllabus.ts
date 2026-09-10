/* Full NCERT Class 10 syllabus — typed, framework-free.
   The Admin panel / API / pages all read data from here. */

export interface ChapterRef { n: number; title: string; hi?: string }
export interface SubjectGroup { label: string; chapters: ChapterRef[] }
export interface Subject {
  id: string; name: string; hindi: string; icon: string; color: string;
  tagline: string; features: string[]; groups: SubjectGroup[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "maths", name: "Mathematics", hindi: "गणित", icon: "calculator", color: "#0b57d0",
    tagline: "Formulas, solved examples, and practice — the strongest Maths preparation.",
    features: ["slides", "formulas", "examples", "notes", "quiz", "pyq"],
    groups: [{
      label: "All Chapters", chapters: [
        { n: 1,  title: "Real Numbers", hi: "Euclid's lemma, HCF & LCM" },
        { n: 2,  title: "Polynomials", hi: "Zeroes, coefficients & graphs" },
        { n: 3,  title: "Pair of Linear Equations in Two Variables", hi: "Elimination, substitution & cross-multiplication" },
        { n: 4,  title: "Quadratic Equations", hi: "Factorisation, formula & nature of roots" },
        { n: 5,  title: "Arithmetic Progressions", hi: "nth term, sum & applications" },
        { n: 6,  title: "Triangles", hi: "Similarity, Pythagoras & areas" },
        { n: 7,  title: "Coordinate Geometry", hi: "Distance, section & midpoint formulae" },
        { n: 8,  title: "Introduction to Trigonometry", hi: "Ratios, standard values & identities" },
        { n: 9,  title: "Some Applications of Trigonometry", hi: "Heights & distances" },
        { n: 10, title: "Circles", hi: "Tangents & theorems" },
        { n: 11, title: "Areas Related to Circles", hi: "Sectors, segments & combinations" },
        { n: 12, title: "Surface Areas and Volumes", hi: "Solids, frustum & conversions" },
        { n: 13, title: "Statistics", hi: "Mean, median, mode & graphs" },
        { n: 14, title: "Probability", hi: "Classical & experimental probability" },
      ]
    }]
  },
  {
    id: "science", name: "Science", hindi: "विज्ञान", icon: "flaskConical", color: "#188038",
    tagline: "Diagrams, flowcharts, activities, and mind maps make Science easy.",
    features: ["slides", "mindmap", "flow", "notes", "formulas", "diagrams", "quiz", "pyq"],
    groups: [{
      label: "All Chapters", chapters: [
        { n: 1,  title: "Chemical Reactions and Equations", hi: "Equations, types & balancing" },
        { n: 2,  title: "Acids, Bases and Salts", hi: "Properties, pH & everyday uses" },
        { n: 3,  title: "Metals and Non-metals", hi: "Properties, extraction & corrosion" },
        { n: 4,  title: "Carbon and its Compounds", hi: "Bonding, homologous series & soaps" },
        { n: 5,  title: "Life Processes", hi: "Nutrition, respiration & excretion" },
        { n: 6,  title: "Control and Coordination", hi: "Nervous system & plant hormones" },
        { n: 7,  title: "How do Organisms Reproduce?", hi: "Asexual, sexual & reproductive health" },
        { n: 8,  title: "Heredity", hi: "Mendel, traits & evolution basics" },
        { n: 9,  title: "Light – Reflection and Refraction", hi: "Mirrors, lenses & power" },
        { n: 10, title: "The Human Eye and the Colourful World", hi: "Defects, dispersion & scattering" },
        { n: 11, title: "Electricity", hi: "Ohm's law, circuits & heating effect" },
        { n: 12, title: "Magnetic Effects of Electric Current", hi: "Field, motors & induction" },
        { n: 13, title: "Our Environment", hi: "Ecosystems, ozone & waste" },
      ]
    }]
  },
  {
    id: "sst", name: "Social Science", hindi: "सामाजिक विज्ञान", icon: "globe", color: "#e37400",
    tagline: "Timelines, maps, charts, and key concepts across History, Geography, Civics, and Economics.",
    features: ["slides", "mindmap", "flow", "timeline", "notes", "quiz", "pyq"],
    groups: [
      { label: "History — India and the Contemporary World II", chapters: [
        { n: 1, title: "The Rise of Nationalism in Europe", hi: "French Revolution to unification" },
        { n: 2, title: "Nationalism in India", hi: "Non-cooperation to Quit India" },
        { n: 3, title: "The Making of a Global World", hi: "Trade, industrialisation & depression" },
        { n: 4, title: "Print Culture and the Modern World", hi: "Press, reform & nationalism" },
      ]},
      { label: "Geography — Contemporary India II", chapters: [
        { n: 1, title: "Resources and Development", hi: "Types, planning & conservation" },
        { n: 2, title: "Forest and Wildlife Resources", hi: "Flora, fauna & conservation" },
        { n: 3, title: "Water Resources", hi: "Scarcity, harvesting & dams" },
        { n: 4, title: "Agriculture", hi: "Types, patterns & reforms" },
        { n: 5, title: "Minerals and Energy Resources", hi: "Ores, power & conservation" },
        { n: 6, title: "Manufacturing Industries", hi: "Agro, mineral & liberalisation" },
        { n: 7, title: "Lifelines of National Economy", hi: "Transport, communication & tourism" },
      ]},
      { label: "Political Science — Democratic Politics II", chapters: [
        { n: 1, title: "Power Sharing", hi: "Horizontal, federal & social" },
        { n: 2, title: "Federalism", hi: "Features & Indian practice" },
        { n: 3, title: "Gender, Religion and Caste", hi: "Equality, communalism & secular state" },
        { n: 4, title: "Political Parties", hi: "Functions, types & reforms" },
        { n: 5, title: "Outcomes of Democracy", hi: "Accountability, dignity & quality" },
      ]},
      { label: "Economics — Understanding Economic Development", chapters: [
        { n: 1, title: "Development", hi: "Goals, income & sustainability" },
        { n: 2, title: "Sectors of the Indian Economy", hi: "Primary, secondary & tertiary" },
        { n: 3, title: "Money and Credit", hi: "Banks, SHGs & loans" },
        { n: 4, title: "Globalisation and the Indian Economy", hi: "MNCs, WTO & impact on India" },
      ]},
    ]
  },
  {
    id: "english", name: "English", hindi: "अंग्रेज़ी", icon: "bookOpen", color: "#9334e6",
    tagline: "Summaries, theme charts, word banks, and Q&A — First Flight + Footprints.",
    features: ["slides", "mindmap", "flow", "notes", "words", "quiz", "pyq"],
    groups: [
      { label: "First Flight — Prose", chapters: [
        { n: 1, title: "A Letter to God", hi: "G.L. Fuentes" },
        { n: 2, title: "Nelson Mandela: Long Walk to Freedom", hi: "Nelson Mandela" },
        { n: 3, title: "Two Stories About Flying", hi: "Liam O'Flaherty / Frederick Forsyth" },
        { n: 4, title: "From the Diary of Anne Frank", hi: "Anne Frank" },
        { n: 5, title: "Glimpses of India", hi: "Coorg • Tea from Assam • Goa" },
        { n: 6, title: "Mijbil the Otter", hi: "Gavin Maxwell" },
        { n: 7, title: "Madam Rides the Bus", hi: "Vallikannan" },
        { n: 8, title: "The Sermon at Benares", hi: "Betty Renshaw" },
        { n: 9, title: "The Proposal", hi: "Anton Chekhov (Play)" },
      ]},
      { label: "First Flight — Poetry", chapters: [
        { n: 1, title: "Dust of Snow", hi: "Robert Frost" },
        { n: 2, title: "Fire and Ice", hi: "Robert Frost" },
        { n: 3, title: "A Tiger in the Zoo", hi: "Leslie Norris" },
        { n: 4, title: "How to Tell Wild Animals", hi: "Carolyn Wells" },
        { n: 5, title: "The Ball Poem", hi: "John Berryman" },
        { n: 6, title: "Amanda!", hi: "Robin Klein" },
        { n: 7, title: "Animals", hi: "Walt Whitman" },
        { n: 8, title: "The Trees", hi: "Adrienne Rich" },
        { n: 9, title: "Fog", hi: "Carl Sandburg" },
        { n: 10, title: "The Tale of Custard the Dragon", hi: "Ogden Nash" },
        { n: 11, title: "For Anne Gregory", hi: "W.B. Yeats" },
      ]},
      { label: "Footprints Without Feet — Supplementary", chapters: [
        { n: 1, title: "A Triumph of Surgery", hi: "James Herriot" },
        { n: 2, title: "The Thief's Story", hi: "Ruskin Bond" },
        { n: 3, title: "The Midnight Visitor", hi: "Robert Arthur" },
        { n: 4, title: "A Question of Trust", hi: "Victor Canning" },
        { n: 5, title: "Footprints Without Feet", hi: "H.G. Wells" },
        { n: 6, title: "The Making of a Scientist", hi: "Robert W. Peterson" },
        { n: 7, title: "The Necklace", hi: "Guy de Maupassant" },
        { n: 8, title: "Bholi", hi: "K.A. Abbas" },
        { n: 9, title: "The Book That Saved the Earth", hi: "Claire Boiko (Play)" },
      ]},
    ]
  },
  {
    id: "hindi", name: "Hindi", hindi: "हिन्दी", icon: "languages", color: "#b3261e",
    tagline: "Summaries, difficult words, and question practice — Kshitij + Kritika.",
    features: ["slides", "mindmap", "notes", "words", "quiz", "pyq"],
    groups: [
      { label: "Kshitij — Prose", chapters: [
        { n: 1, title: "नेताजी का चश्मा", hi: "Swayam Prakash" },
        { n: 2, title: "बालगोबिन भगत", hi: "Ramvriksha Benipuri" },
        { n: 3, title: "लखनवी अंदाज़", hi: "Yashpal" },
        { n: 4, title: "मानवीय करुणा की दिव्या चमक", hi: "Sarveshwar Dayal Saxena" },
        { n: 5, title: "तोप", hi: "Viren Dangwal" },
        { n: 6, title: "कर चले हम फ़िदा", hi: "Kaifi Azmi" },
      ]},
      { label: "Kshitij — Poetry", chapters: [
        { n: 1, title: "सूर के पद", hi: "Surdas" },
        { n: 2, title: "राम-लक्ष्मण-परशुराम संवाद", hi: "Tulsidas" },
        { n: 3, title: "आत्मकथ्य", hi: "Jaishankar Prasad" },
        { n: 4, title: "उत्साह", hi: "Suryakant Tripathi 'Nirala'" },
        { n: 5, title: "यह दंतुरित मुसकान", hi: "Nagarjuna" },
        { n: 6, title: "छाया मत छूना", hi: "Girija Kumar Mathur" },
        { n: 7, title: "कन्यादान", hi: "Rituraj" },
        { n: 8, title: "मधुर-मधुर मेरे दीपक जल", hi: "Mahadevi Verma" },
        { n: 9, title: "पर्वत प्रदेश में पावस", hi: "Sumitranandan Pant" },
        { n: 10, title: "मनुष्यता", hi: "Maithilisharan Gupt" },
      ]},
      { label: "Kritika — Supplementary Reader", chapters: [
        { n: 1, title: "माता का अंचल", hi: "Shivpujan Sahay" },
        { n: 2, title: "जॉर्ज पंचम की नाक", hi: "Kamleshwar" },
        { n: 3, title: "साना-साना हाथ जोड़ि", hi: "Mridula Garg" },
        { n: 4, title: "मैं क्यों लिखता हूँ", hi: "Agyeya" },
        { n: 5, title: "स्त्री-शिक्षा के विरोधी कुतर्कों का खंडन", hi: "Mahavir Prasad Dwivedi" },
      ]},
    ]
  },
  {
    id: "ai", name: "Artificial Intelligence", hindi: "कृत्रिम बुद्धिमत्ता", icon: "bot", color: "#00696b",
    tagline: "AI Project Cycle, Modelling, Computer Vision, NLP, and Python — future-ready with the KIPS book (CBSE 417).",
    features: ["slides", "mindmap", "flow", "notes", "quiz", "pyq"],
    groups: [
      { label: "Part A — Employability Skills", chapters: [
        { n: 1, title: "Communication Skills-II", hi: "Methods, feedback, barriers, writing" },
        { n: 2, title: "Self-Management Skills-II", hi: "Stress management, working independently" },
        { n: 3, title: "ICT Skills-II", hi: "OS, file operations, computer security" },
        { n: 4, title: "Entrepreneurial Skills-II", hi: "Entrepreneurship as a career" },
        { n: 5, title: "Green Skills-II", hi: "Sustainable development" },
      ]},
      { label: "Part B — AI Project Cycle & Modelling", chapters: [
        { n: 1, title: "AI Project Cycle: Data Acquisition", hi: "Data, sources, features, datasets" },
        { n: 2, title: "AI Project Cycle: Data Exploration", hi: "Data visualisation & charts" },
        { n: 3, title: "AI Project Cycle: Modelling", hi: "Rule-based, supervised, unsupervised, clustering" },
        { n: 4, title: "Neural Networks", hi: "ANN, how AI makes decisions" },
        { n: 5, title: "AI Project Cycle: Evaluation", hi: "Train-test split, accuracy & error" },
      ]},
      { label: "Part B — Data, Vision & Language", chapters: [
        { n: 1, title: "Statistical Data", hi: "Data handling foundations" },
        { n: 2, title: "Computer Vision", hi: "Pixels, OpenCV, convolution, CNN" },
        { n: 3, title: "Natural Language Processing", hi: "Chatbots, tokenisation, NLTK, LLMs" },
      ]},
      { label: "Part B — Advanced Python", chapters: [
        { n: 1, title: "Python Basics Recap", hi: "Syntax, lists, tuples" },
        { n: 2, title: "Tools for AI: Jupyter & Anaconda", hi: "Notebook, virtual environments" },
        { n: 3, title: "Working with Notebook Documents", hi: "Hands-on AI with Python" },
      ]},
    ]
  },
];

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}
export function chapterKey(s: string, g: number, c: number): string {
  return `${s}-${g}-${c}`;
}
export interface ChapterFound {
  sub: Subject; group: SubjectGroup; ch: ChapterRef; key: string;
  groupIndex: number; chapterIndex: number;
}
export function getChapter(s: string, g: number, c: number): ChapterFound | null {
  const sub = getSubject(s);
  if (!sub || !sub.groups[g]) return null;
  const group = sub.groups[g];
  const ch = group.chapters[c];
  if (!ch) return null;
  return { sub, group, ch, key: chapterKey(s, g, c), groupIndex: g, chapterIndex: c };
}
export function allChapterKeys(): { s: string; g: number; c: number; key: string }[] {
  const out: { s: string; g: number; c: number; key: string }[] = [];
  SUBJECTS.forEach((sub) =>
    sub.groups.forEach((gr, gi) =>
      gr.chapters.forEach((_ch, ci) => out.push({ s: sub.id, g: gi, c: ci, key: chapterKey(sub.id, gi, ci) }))
    )
  );
  return out;
}
export function totalChapters(): number {
  return SUBJECTS.reduce((a, s) => a + s.groups.reduce((b, g) => b + g.chapters.length, 0), 0);
}
