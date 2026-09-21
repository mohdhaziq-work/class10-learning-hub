/* SK Presidency Public School — II Periodic Exam 2026-27, Class 10 Social Science
   (Time 1 Hour, M.M. 15). Verbatim transcription of the school paper.

   ANSWER RULE FOLLOWED IN THIS FILE: the answer is only as long as the marks
   demand — MCQ 0.25 = one line, 0.5 = one sentence, 1 = two to three short
   points, 1.5 = three points. Nothing extra, no padding. Marks as printed:
   Sections A, B, C, D carry 3.75 marks each; Q7 (1) + Q14 (0.5) = 1.5 map marks. */

export interface P2Q {
  n: string;
  ch: string; /* chapter tag */
  topic: string;
  q: string;
  opts?: string[];
  correct?: string; /* "a" | "b" | "c" | "d" for MCQs */
  ans: string;
  marks: number;
  map?: boolean;
  caution?: string; /* one-line trap */
}

export const PERIODIC_META = {
  school: "SK Presidency Public School",
  exam: "II Periodic Exam 2026-27",
  cls: "Class 10",
  subject: "Social Science (SST)",
  mm: 15,
  time: "1 hour",
  instructions: [
    "Question paper is divided into four sections — A, B, C and D.",
    "Each section carries 3.75 marks.",
    "The paper contains MCQs, Very Short Answer and Long Answer questions.",
    "Map-based questions carry 1.5 marks.",
    "All questions are compulsory.",
  ],
};

export interface P2Section {
  label: string;
  subject: string;
  marks: number;
  blurb: string;
  qs: P2Q[];
}

export const PERIODIC_SECTIONS: P2Section[] = [
  /* ============================ SECTION A — HISTORY ============================ */
  {
    label: "Section A — History (3.75 marks)",
    subject: "History",
    marks: 3.75,
    blurb: "Gandhian movements, Congress of Vienna, Swaraj Party, Rowlatt Act, Champaran and map work.",
    qs: [
      {
        n: "1",
        ch: "History Ch 2",
        topic: "Chronology of Gandhian movements",
        q: "Arrange the following in chronological order: I. Salt Satyagraha  II. Kheda Satyagraha  III. Rowlatt Satyagraha  IV. Ahmedabad Mill Workers Satyagraha.",
        opts: ["II, I, III, IV", "II, IV, III, I", "III, II, IV, I", "II, I, IV, III"],
        correct: "b",
        marks: 0.25,
        ans: "(b) II, IV, III, I — Kheda (1918), Ahmedabad Mill (1918), Rowlatt (1919), Salt (1930).",
        caution: "Champaran 1917 → Ahmedabad Feb 1918 → Kheda Mar 1918 → Rowlatt 1919 → Salt 1930.",
      },
      {
        n: "2",
        ch: "History Ch 1",
        topic: "Congress of Vienna, 1815",
        q: "Who hosted the Vienna Congress in 1815?",
        opts: ["Duke Metternich", "Ernst Renan", "William I", "Otto von Bismarck"],
        correct: "a",
        marks: 0.25,
        ans: "(a) Duke Metternich — the Austrian Chancellor who hosted the Congress of Vienna in 1815.",
      },
      {
        n: "3",
        ch: "History Ch 2",
        topic: "Formation of the Swaraj Party",
        q: "________ and ________ formed the Swaraj Party.",
        opts: [
          "C.R. Das and Motilal Nehru",
          "Jawaharlal Nehru and C.R. Das",
          "Motilal Nehru and Jawaharlal Nehru",
          "Jawaharlal Nehru and Gandhiji",
        ],
        correct: "a",
        marks: 0.25,
        ans: "(a) C.R. Das and Motilal Nehru — formed the Swaraj Party in 1923.",
      },
      {
        n: "4",
        ch: "History Ch 2",
        topic: "The Rowlatt Act, 1919",
        q: "What was the Rowlatt Act, 1919?",
        marks: 0.5,
        ans: "An Act of 1919 that allowed the government to detain political prisoners without trial for two years. Gandhiji called it the 'Black Act' and opposed it.",
      },
      {
        n: "5",
        ch: "History Ch 2",
        topic: "Champaran, 1917",
        q: "Why did Mahatma Gandhi travel to Champaran in 1917?",
        marks: 0.5,
        ans: "To free the peasants from the tinkathia system, under which they had to grow indigo on part of their land for the planters. It was his first successful satyagraha in India.",
      },
      {
        n: "6",
        ch: "History Ch 2",
        topic: "Causes of the Non-Cooperation Movement",
        q: "Describe any three causes of the Non-Cooperation Movement.",
        marks: 1,
        ans: "(1) Hardships of the First World War — heavy taxes, doubled prices and forced recruitment. (2) The Rowlatt Act of 1919 and the Jallianwala Bagh massacre. (3) The Khilafat issue, which Gandhiji joined with the national movement to unite Hindus and Muslims.",
      },
      {
        n: "7",
        ch: "History Ch 2",
        topic: "Map work — Nationalism in India",
        q: "On the outline map of India locate: (A) Dandi (B) Amritsar.",
        marks: 1,
        map: true,
        ans: "(A) Dandi — on the sea coast of Gujarat, in the south of Gujarat (Navsari district). (B) Amritsar — in north-west Punjab, near the border with Pakistan.",
      },
    ],
  },

  /* ============================ SECTION B — GEOGRAPHY ============================ */
  {
    label: "Section B — Geography (3.75 marks)",
    subject: "Geography",
    marks: 3.75,
    blurb: "Permanent forests, Wildlife Protection Act, laterite soil, conservation, biodiversity, categories of forests, map work.",
    qs: [
      {
        n: "8",
        ch: "Geography Ch 2",
        topic: "Permanent forest estates",
        q: "Which state has the largest area under Permanent Forests?",
        opts: ["Haryana", "Himachal Pradesh", "Punjab", "Madhya Pradesh"],
        correct: "d",
        marks: 0.25,
        ans: "(d) Madhya Pradesh — it has the largest area under permanent (reserved and protected) forests.",
        caution: "Ask 'permanent forests' = Madhya Pradesh, not Himachal Pradesh.",
      },
      {
        n: "9",
        ch: "Geography Ch 2",
        topic: "Wildlife Protection Act",
        q: "Wildlife Protection Act was implemented in:",
        opts: ["1972", "1978", "1980", "1985"],
        correct: "a",
        marks: 0.25,
        ans: "(a) 1972 — Project Tiger was launched under this Act in 1973.",
      },
      {
        n: "10",
        ch: "Geography Ch 1",
        topic: "Laterite soil",
        q: "Which soil develops in areas of high temperature and heavy rainfall?",
        opts: ["Red & Yellow", "Black", "Alluvial", "Laterite"],
        correct: "d",
        marks: 0.25,
        ans: "(d) Laterite soil — it forms in high temperature and heavy rainfall by intense leaching.",
      },
      {
        n: "11",
        ch: "Geography Ch 2",
        topic: "Conservation of forests",
        q: "Suggest any two measures for conservation of forests.",
        marks: 0.5,
        ans: "(1) Afforestation and social forestry on a large scale. (2) Controlled grazing and providing fuelwood and fodder to villagers so that forests are not cut.",
      },
      {
        n: "12",
        ch: "Geography Ch 2",
        topic: "Biodiversity",
        q: "What is biodiversity?",
        marks: 0.5,
        ans: "The variety of plants, animals and micro-organisms existing in a given area, along with the ecosystems of which they are a part.",
      },
      {
        n: "13",
        ch: "Geography Ch 2",
        topic: "Categories of forests in India",
        q: "Into how many categories are forests classified in India? Explain each of them.",
        marks: 1.5,
        ans: "Forests in India are of three types: (1) Reserved forests — permanent forest estates, the most valuable for conservation, where no further use is allowed. (2) Protected forests — also permanent, but limited use such as grazing and collection of fuelwood is allowed to local people. (3) Unclassed forests — forests and wastelands of the government, private persons and communities, with the least restriction; found mainly in the north-east and Gujarat.",
      },
      {
        n: "14",
        ch: "Geography Ch 2",
        topic: "Map work — Corbett National Park",
        q: "Locate and label Corbett National Park on the map.",
        marks: 0.5,
        map: true,
        ans: "Corbett National Park — in Uttarakhand, in the Terai foothills of the Himalayas (Nainital district). It is India's first national park (1936) and its first tiger reserve (1973).",
      },
    ],
  },

  /* ============================ SECTION C — POLITICAL SCIENCE ============================ */
  {
    label: "Section C — Political Science (3.75 marks)",
    subject: "Political Science",
    marks: 3.75,
    blurb: "Levels of government, Sri Lanka's official language, Union List, Concurrent List, types of federalism, three lists, features of federalism.",
    qs: [
      {
        n: "15",
        ch: "Political Science Ch 2",
        topic: "Levels of government and their heads",
        q: "Match List I with List II.\nList I: 1. Union Government 2. State Government 3. Municipal Corporation 4. Gram Panchayat\nList II: A. Prime Minister B. Governor C. Mayor D. Sarpanch",
        opts: ["A B C D", "B A D C", "A C D B", "D C B A"],
        correct: "a",
        marks: 0.25,
        ans: "(a) A B C D — Union→Prime Minister, State→Governor, Municipal Corporation→Mayor, Gram Panchayat→Sarpanch.",
      },
      {
        n: "16",
        ch: "Political Science Ch 1",
        topic: "Majoritarianism in Sri Lanka",
        q: "Which language was declared the official language of Sri Lanka in 1956?",
        opts: ["Tamil", "Sinhala", "Hindi", "English"],
        correct: "b",
        marks: 0.25,
        ans: "(b) Sinhala — the 1956 Act made Sinhala the only official language and disregarded Tamil.",
        caution: "Hindi is India's official language, not Sri Lanka's.",
      },
      {
        n: "17",
        ch: "Political Science Ch 2",
        topic: "Union List",
        q: "Choose the correct option related to the Union List.",
        opts: [
          "Police, Foreign affairs, Agriculture",
          "Trade, Irrigation, Marriage",
          "Education, Commerce, Banking",
          "Currency, Communication, Defense",
        ],
        correct: "d",
        marks: 0.25,
        ans: "(d) Currency, Communication, Defence — subjects of national importance in the Union List.",
      },
      {
        n: "18",
        ch: "Political Science Ch 2",
        topic: "Concurrent List",
        q: "Name any two subjects included in the Concurrent List.",
        marks: 0.5,
        ans: "Any two: education, forest, marriage, adoption, succession, criminal law, trade unions.",
      },
      {
        n: "19",
        ch: "Political Science Ch 2",
        topic: "Types of federalism",
        q: "Write the types of Federalism with one example of each.",
        marks: 0.5,
        ans: "Coming together — independent states join to form a bigger unit, e.g. the USA. Holding together — a large country divides power between the Centre and the states, e.g. India.",
      },
      {
        n: "20",
        ch: "Political Science Ch 2",
        topic: "Three legislative lists",
        q: "Explain the three legislative lists of India.",
        marks: 1,
        ans: "(1) Union List — subjects of national importance (defence, currency, banking); only the Centre legislates. (2) State List — subjects of local importance (police, agriculture, irrigation); only the states legislate. (3) Concurrent List — common subjects (education, forest, marriage); both legislate, but the Union law prevails in case of conflict.",
      },
      {
        n: "21",
        ch: "Political Science Ch 2",
        topic: "Features of federalism",
        q: "Describe any two features of Federalism.",
        marks: 1,
        ans: "(1) Two or more levels of government — the Union, the states and the local bodies — each with its own jurisdiction in legislation, taxation and administration laid down by the Constitution. (2) The existence and authority of every level is constitutionally guaranteed — federal provisions cannot be changed by one level alone, and disputes go to the Supreme Court.",
      },
    ],
  },

  /* ============================ SECTION D — ECONOMICS ============================ */
  {
    label: "Section D — Economics (3.75 marks)",
    subject: "Economics",
    marks: 3.75,
    blurb: "The three sectors, World Development Report, sector with highest GDP, rural employment, manufacturing sector, public vs private sector, role of public sector.",
    qs: [
      {
        n: "22",
        ch: "Economics Ch 2",
        topic: "Basis of the three sectors",
        q: "Primary, Secondary and Tertiary sectors are divided on the basis of:",
        opts: ["Nature of employment", "Nature of activities", "Nature of ownership", "Nature of income"],
        correct: "b",
        marks: 0.25,
        ans: "(b) Nature of activities — primary uses natural resources, secondary manufactures, tertiary provides services.",
      },
      {
        n: "23",
        ch: "Economics Ch 1",
        topic: "World Development Report",
        q: "World Bank Development Report is prepared on the basis of:",
        opts: ["Per Capita Income", "Health Services", "Literacy", "Freedom"],
        correct: "a",
        marks: 0.25,
        ans: "(a) Per Capita Income — countries are classified as high, middle and low income on this basis",
        caution: "World Bank uses per-capita income only; UNDP's Human Development Report uses income + health + education.",
      },
      {
        n: "24",
        ch: "Economics Ch 2",
        topic: "Sector with the highest GDP",
        q: "Which sector contributes the highest to India's GDP?",
        opts: ["Primary", "Secondary", "Tertiary", "Quaternary"],
        correct: "c",
        marks: 0.25,
        ans: "(c) Tertiary — it is the largest producing sector of India's GDP.",
        caution: "GDP → tertiary; employment → primary.",
      },
      {
        n: "25",
        ch: "Economics Ch 2",
        topic: "Employment in rural areas",
        q: "Suggest any two ways to create more employment in rural areas.",
        marks: 0.5,
        ans: "(1) Assured work through MGNREGA (100 days a year). (2) Irrigation facilities so that a second crop can be grown and more labour is needed.",
      },
      {
        n: "26",
        ch: "Economics Ch 2",
        topic: "Secondary sector as manufacturing sector",
        q: "Why is the Secondary Sector called the Manufacturing Sector?",
        marks: 0.5,
        ans: "Because in this sector natural products are changed into other forms through manufacturing in factories — cotton into cloth, sugarcane into sugar, iron ore into steel.",
      },
      {
        n: "27",
        ch: "Economics Ch 2",
        topic: "Public vs private sector",
        q: "Write any two differences between the Public and Private Sector.",
        marks: 1,
        ans: "(1) Ownership — in the public sector the government owns the assets and provides the services; in the private sector these are owned by private individuals or companies. (2) Purpose — the public sector works for public welfare, not profit, and provides services even in unprofitable areas; the private sector works for profit only.",
      },
      {
        n: "28",
        ch: "Economics Ch 2",
        topic: "Role of the public sector",
        q: "Examine the role of the Public Sector in development and well-being of a country.",
        marks: 1,
        ans: "The public sector provides the basic facilities everyone needs — roads, railways, water, schools and hospitals — which the private sector will not provide at a reasonable cost. It also serves remote and unprofitable areas, invests in heavy industry, creates employment and runs welfare schemes like the PDS and MGNREGA — so it is the base of balanced development and well-being.",
      },
    ],
  },
];
