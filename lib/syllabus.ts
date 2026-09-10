/* Full NCERT Class 10 syllabus — typed, framework-free.
   Admin panel / API / pages sab yahi se data lete hain. */

export interface ChapterRef { n: number; title: string; hi?: string }
export interface SubjectGroup { label: string; chapters: ChapterRef[] }
export interface Subject {
  id: string; name: string; hindi: string; icon: string; color: string;
  tagline: string; features: string[]; groups: SubjectGroup[];
}

export const SUBJECTS: Subject[] = [
  {
    id: "maths", name: "Mathematics", hindi: "गणित", icon: "calculator", color: "#0b57d0",
    tagline: "Formulas, solved examples aur practice — sabse strong Maths taiyaari.",
    features: ["slides", "formulas", "examples", "notes", "quiz", "pyq"],
    groups: [{
      label: "All Chapters", chapters: [
        { n: 1,  title: "Real Numbers", hi: "वास्तविक संख्याएँ" },
        { n: 2,  title: "Polynomials", hi: "बहुपद" },
        { n: 3,  title: "Pair of Linear Equations in Two Variables", hi: "दो चर वाले रैखिक समीकरण" },
        { n: 4,  title: "Quadratic Equations", hi: "द्विघात समीकरण" },
        { n: 5,  title: "Arithmetic Progressions", hi: "समांतर श्रेढ़ियाँ" },
        { n: 6,  title: "Triangles", hi: "त्रिभुज" },
        { n: 7,  title: "Coordinate Geometry", hi: "निर्देशांक ज्यामिति" },
        { n: 8,  title: "Introduction to Trigonometry", hi: "त्रिकोणमिति का परिचय" },
        { n: 9,  title: "Some Applications of Trigonometry", hi: "त्रिकोणमिति के अनुप्रयोग" },
        { n: 10, title: "Circles", hi: "वृत्त" },
        { n: 11, title: "Areas Related to Circles", hi: "वृत्तों से संबंधित क्षेत्रफल" },
        { n: 12, title: "Surface Areas and Volumes", hi: "पृष्ठीय क्षेत्रफल और आयतन" },
        { n: 13, title: "Statistics", hi: "सांख्यिकी" },
        { n: 14, title: "Probability", hi: "प्रायिकता" },
      ]
    }]
  },
  {
    id: "science", name: "Science", hindi: "विज्ञान", icon: "flaskConical", color: "#188038",
    tagline: "Diagrams, flow charts, activities aur mind maps ke saath Science easy.",
    features: ["slides", "mindmap", "flow", "notes", "formulas", "diagrams", "quiz", "pyq"],
    groups: [{
      label: "All Chapters", chapters: [
        { n: 1,  title: "Chemical Reactions and Equations", hi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
        { n: 2,  title: "Acids, Bases and Salts", hi: "अम्ल, क्षारक एवं लवण" },
        { n: 3,  title: "Metals and Non-metals", hi: "धातु एवं अधातु" },
        { n: 4,  title: "Carbon and its Compounds", hi: "कार्बन एवं उसके यौगिक" },
        { n: 5,  title: "Life Processes", hi: "जैव प्रक्रम" },
        { n: 6,  title: "Control and Coordination", hi: "नियंत्रण एवं समन्वय" },
        { n: 7,  title: "How do Organisms Reproduce?", hi: "जीव जनन कैसे करते हैं?" },
        { n: 8,  title: "Heredity", hi: "आनुवंशिकता" },
        { n: 9,  title: "Light – Reflection and Refraction", hi: "प्रकाश – परावर्तन तथा अपवर्तन" },
        { n: 10, title: "The Human Eye and the Colourful World", hi: "मानव नेत्र तथा रंगबिरंगा संसार" },
        { n: 11, title: "Electricity", hi: "विद्युत" },
        { n: 12, title: "Magnetic Effects of Electric Current", hi: "विद्युत धारा के चुंबकीय प्रभाव" },
        { n: 13, title: "Our Environment", hi: "हमारा पर्यावरण" },
      ]
    }]
  },
  {
    id: "sst", name: "Social Science", hindi: "सामाजिक विज्ञान", icon: "globe", color: "#e37400",
    tagline: "History timelines, Geo maps, Civics charts, Economics concepts.",
    features: ["slides", "mindmap", "flow", "timeline", "notes", "quiz", "pyq"],
    groups: [
      { label: " History — India and the Contemporary World II", chapters: [
        { n: 1, title: "The Rise of Nationalism in Europe", hi: "यूरोप में राष्ट्रवाद का उदय" },
        { n: 2, title: "Nationalism in India", hi: "भारत में राष्ट्रवाद" },
        { n: 3, title: "The Making of a Global World", hi: "भूमंडलीकृत विश्व का बनना" },
        { n: 4, title: "Print Culture and the Modern World", hi: "मुद्रण संस्कृति और आधुनिक विश्व" },
      ]},
      { label: " Geography — Contemporary India II", chapters: [
        { n: 1, title: "Resources and Development", hi: "संसाधन एवं विकास" },
        { n: 2, title: "Forest and Wildlife Resources", hi: "वन एवं वन्यजीव संसाधन" },
        { n: 3, title: "Water Resources", hi: "जल संसाधन" },
        { n: 4, title: "Agriculture", hi: "कृषि" },
        { n: 5, title: "Minerals and Energy Resources", hi: "खनिज तथा ऊर्जा संसाधन" },
        { n: 6, title: "Manufacturing Industries", hi: "विनिर्माण उद्योग" },
        { n: 7, title: "Lifelines of National Economy", hi: "राष्ट्रीय अर्थव्यवस्था की जीवनरेखाएँ" },
      ]},
      { label: " Political Science — Democratic Politics II", chapters: [
        { n: 1, title: "Power Sharing", hi: "सत्ता की साझेदारी" },
        { n: 2, title: "Federalism", hi: "संघवाद" },
        { n: 3, title: "Gender, Religion and Caste", hi: "जाति, धर्म और लैंगिक मसले" },
        { n: 4, title: "Political Parties", hi: "राजनीतिक दल" },
        { n: 5, title: "Outcomes of Democracy", hi: "लोकतंत्र के परिणाम" },
      ]},
      { label: " Economics — Understanding Economic Development", chapters: [
        { n: 1, title: "Development", hi: "विकास" },
        { n: 2, title: "Sectors of the Indian Economy", hi: "भारतीय अर्थव्यवस्था के क्षेत्रक" },
        { n: 3, title: "Money and Credit", hi: "मुद्रा और साख" },
        { n: 4, title: "Globalisation and the Indian Economy", hi: "वैश्वीकरण और भारतीय अर्थव्यवस्था" },
      ]},
    ]
  },
  {
    id: "english", name: "English", hindi: "अंग्रेज़ी", icon: "bookOpen", color: "#9334e6",
    tagline: "Summaries, theme charts, word banks aur Q&A — First Flight + Footprints.",
    features: ["slides", "mindmap", "flow", "notes", "words", "quiz", "pyq"],
    groups: [
      { label: " First Flight — Prose", chapters: [
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
      { label: " First Flight — Poetry", chapters: [
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
      { label: " Footprints Without Feet — Supplementary", chapters: [
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
    tagline: "सारांश, कठिन शब्द, प्रश्न-अभ्यास — क्षितिज + कृतिका।",
    features: ["slides", "mindmap", "notes", "words", "quiz", "pyq"],
    groups: [
      { label: " क्षितिज — गद्य खंड", chapters: [
        { n: 1, title: "नेताजी का चश्मा", hi: "स्वयं प्रकाश" },
        { n: 2, title: "बालगोबिन भगत", hi: "रामवृक्ष बेनीपुरी" },
        { n: 3, title: "लखनवी अंदाज़", hi: "यशपाल" },
        { n: 4, title: "मानवीय करुणा की दिव्या चमक", hi: "सर्वेश्वर दयाल सक्सेना" },
        { n: 5, title: "तोप", hi: "वीरेन डंगवाल" },
        { n: 6, title: "कर चले हम फ़िदा", hi: "कैफ़ी आज़मी" },
      ]},
      { label: " क्षितिज — काव्य खंड", chapters: [
        { n: 1, title: "सूर के पद", hi: "सूरदास" },
        { n: 2, title: "राम-लक्ष्मण-परशुराम संवाद", hi: "तुलसीदास" },
        { n: 3, title: "आत्मकथ्य", hi: "जयशंकर प्रसाद" },
        { n: 4, title: "उत्साह", hi: "सूर्यकांत त्रिपाठी 'निराला'" },
        { n: 5, title: "यह दंतुरित मुसकान", hi: "नागार्जुन" },
        { n: 6, title: "छाया मत छूना", hi: "गिरिजा कुमार माथुर" },
        { n: 7, title: "कन्यादान", hi: "ऋतुराज" },
        { n: 8, title: "मधुर-मधुर मेरे दीपक जल", hi: "महादेवी वर्मा" },
        { n: 9, title: "पर्वत प्रदेश में पावस", hi: "सुमित्रानंदन पंत" },
        { n: 10, title: "मनुष्यता", hi: "मैथिलीशरण गुप्त" },
      ]},
      { label: " कृतिका — पूरक पाठ", chapters: [
        { n: 1, title: "माता का अंचल", hi: "शिवपूजन सहाय" },
        { n: 2, title: "जॉर्ज पंचम की नाक", hi: "कमलेश्वर" },
        { n: 3, title: "साना-साना हाथ जोड़ि", hi: "मृदुला गर्ग" },
        { n: 4, title: "मैं क्यों लिखता हूँ", hi: "अज्ञेय" },
        { n: 5, title: "स्त्री-शिक्षा के विरोधी कुतर्कों का खंडन", hi: "महावीर प्रसाद द्विवेदी" },
      ]},
    ]
  },
  {
    id: "ai", name: "Artificial Intelligence", hindi: "कृत्रिम बुद्धिमत्ता", icon: "bot", color: "#00696b",
    tagline: "AI Project Cycle, Modelling, Computer Vision, NLP aur Python — KIPS book (CBSE 417) ke saath future-ready bano.",
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
