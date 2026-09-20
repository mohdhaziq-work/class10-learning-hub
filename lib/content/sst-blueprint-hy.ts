/* SST Half Yearly — BLUEPRINT-BASED MODEL PAPER
   Built from the school's own blue print for the Half Yearly Examination.
   Structure is not invented: every section, question type, question count and
   mark follows the blue print exactly (38 questions / 80 marks).

   Portion as per blue print:
     Section A History        — Ch 1 & 2
     Section B Geography      — Ch 1 to 4
     Section C Political Sci. — Ch 1 to 3
     Section D Economics      — Ch 1 to 2

   Rule followed everywhere: a question type appears ONLY in the section that
   the blue print gives it to. History has the Very Short Answer and has one
   Map question of 2 marks; Geography has NO Very Short Answer and its map is
   of 3 marks; Political Science has TWO Very Short Answers and NO map;
   Economics has NO map, NO case study and THREE short answers. */

export type BPType = "MCQ" | "VSA" | "SA" | "LA" | "CASE" | "MAP";

export interface BPSub {
  q: string;
  a: string;
  marks: number;
}

export interface BPQ {
  n: string; /* printed question number, e.g. "1", "7(a)", "35" */
  type: BPType;
  marks: number;
  ch: string; /* chapter tag, e.g. "History Ch 1" */
  topic: string; /* blue print style topic inside that chapter */
  q: string;
  extract?: string; /* case-based passage */
  subs?: BPSub[]; /* case-based sub questions */
  opts?: string[];
  ans?: string;
  alt?: { ch: string; topic: string; q: string; ans: string }; /* OR choice */
}

export const BP_META = {
  school: "SK Presidency Public School",
  exam: "Half Yearly Examination",
  cls: "Class 10",
  subject: "Social Science (SST)",
  mm: 80,
  time: "3 hours",
  totalQ: 38,
};

/* ---------------- the blue print, exactly as printed on the school sheet ---------------- */

export interface BPBlueRow {
  type: string;
  count: number;
  each: number;
  marks: number;
}

export interface BPBlueSection {
  key: string;
  subject: string;
  chapters: string;
  rows: BPBlueRow[];
  totalQ: number;
  totalMarks: number;
}

export const BP_BLUEPRINT: BPBlueSection[] = [
  {
    key: "A",
    subject: "History",
    chapters: "Chapter 01 & 02",
    rows: [
      { type: "Multiple Choice Questions", count: 4, each: 1, marks: 4 },
      { type: "Very Short Answer Type", count: 1, each: 2, marks: 2 },
      { type: "Short Answer Type", count: 1, each: 3, marks: 3 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
      { type: "Map Work", count: 1, each: 2, marks: 2 },
    ],
    totalQ: 9,
    totalMarks: 20,
  },
  {
    key: "B",
    subject: "Geography",
    chapters: "Chapter 01 to 04",
    rows: [
      { type: "Multiple Choice Questions", count: 6, each: 1, marks: 6 },
      { type: "Short Answer Type", count: 1, each: 2, marks: 2 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
      { type: "Map Work", count: 1, each: 3, marks: 3 },
    ],
    totalQ: 10,
    totalMarks: 20,
  },
  {
    key: "C",
    subject: "Political Science",
    chapters: "Chapter 01 to 03",
    rows: [
      { type: "Multiple Choice Questions", count: 4, each: 1, marks: 4 },
      { type: "Very Short Answer Type", count: 2, each: 2, marks: 4 },
      { type: "Short Answer Type", count: 1, each: 3, marks: 3 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
    ],
    totalQ: 9,
    totalMarks: 20,
  },
  {
    key: "D",
    subject: "Economics",
    chapters: "Chapter 01 to 02",
    rows: [
      { type: "Multiple Choice Questions", count: 6, each: 1, marks: 6 },
      { type: "Short Answer Type", count: 3, each: 3, marks: 9 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
    ],
    totalQ: 10,
    totalMarks: 20,
  },
];

/* ---------------- map practice lists (extra, for the map questions) ---------------- */

export const BP_MAP_PRACTICE = {
  history: [
    "Dandi (Gujarat) — Gandhiji broke the salt law, 6 April 1930",
    "Amritsar (Punjab) — Jallianwala Bagh, 13 April 1919",
    "Chauri Chaura (Uttar Pradesh) — movement called off, Feb 1922",
    "Calcutta (Bengal) — Congress session, September 1920",
    "Nagpur (Maharashtra) — Congress session, December 1920",
    "Madras (Tamil Nadu) — Congress session, 1927",
    "Lahore (Punjab) — Purna Swaraj declared, December 1929",
    "Champaran (Bihar) — indigo planters, 1917",
    "Kheda (Gujarat) — peasants' satyagraha, 1918",
    "Ahmedabad (Gujarat) — mill workers' strike, 1918",
  ],
  geography: [
    "Tehri Dam — Uttarakhand, on the Bhagirathi",
    "Hirakud Dam — Odisha, on the Mahanadi",
    "Bhakra Nangal Dam — on the Sutlej, Himachal Pradesh / Punjab",
    "Nagarjuna Sagar Dam — on the Krishna, Telangana / Andhra Pradesh",
    "Sardar Sarovar Dam — on the Narmada, Gujarat",
    "Black soil area — Maharashtra (also Gujarat, Madhya Pradesh)",
    "Laterite soil area — Kerala (also Karnataka, Tamil Nadu)",
    "Alluvial soil area — Indo-Gangetic plain / Uttar Pradesh",
    "Coffee growing area — Karnataka (also Kerala)",
    "Tea growing area — Assam (also West Bengal)",
    "Rice growing area — West Bengal (also Odisha, Assam)",
    "Wheat growing area — Punjab (also Haryana, Uttar Pradesh)",
  ],
};

/* ---------------- the model paper ---------------- */

export interface BPSection {
  key: string;
  label: string;
  subject: string;
  marks: number;
  blurb: string;
  qs: BPQ[];
}

export const BP_SECTIONS: BPSection[] = [
  /* ============================ SECTION A — HISTORY ============================ */
  {
    key: "A",
    label: "Section A — History (20 Marks)",
    subject: "History",
    marks: 20,
    blurb:
      "Ch 1 The Rise of Nationalism in Europe, Ch 2 Nationalism in India. 4 MCQ, 1 Very Short, 1 Short, 1 Long, 1 Case-based and 1 Map (2 marks).",
    qs: [
      {
        n: "1",
        type: "MCQ",
        marks: 1,
        ch: "History Ch 1",
        topic: "Making of Germany & Italy",
        q: "Who was proclaimed the King of united Italy in 1861?",
        opts: ["Giuseppe Mazzini", "Count Camillo de Cavour", "Victor Emmanuel II", "Giuseppe Garibaldi"],
        ans: "(c) Victor Emmanuel II. Cavour's diplomacy and Garibaldi's Red Shirts did the work on the ground, but it was Victor Emmanuel II of Sardinia-Piedmont who was proclaimed king of united Italy in 1861. Mazzini was only a revolutionary thinker and Cavour was the Chief Minister, not the king.",
      },
      {
        n: "2",
        type: "MCQ",
        marks: 1,
        ch: "History Ch 1",
        topic: "The Age of Revolutions (1830-48)",
        q: "Who said: 'When France sneezes, the rest of Europe catches cold'?",
        opts: ["Klemens von Metternich", "Giuseppe Mazzini", "Otto von Bismarck", "Friedrich Wilhelm IV"],
        ans: "(a) Klemens von Metternich. He meant that the revolutionary ideas of France spread quickly to the rest of Europe. Metternich hosted the Congress of Vienna (1815) and was the leader of the conservative order that wanted to undo the changes of the French Revolution.",
      },
      {
        n: "3",
        type: "MCQ",
        marks: 1,
        ch: "History Ch 2",
        topic: "Towards Civil Disobedience",
        q: "Which Act empowered the government to detain political prisoners without trial for two years?",
        opts: [
          "The Rowlatt Act, 1919",
          "The Government of India Act, 1919",
          "The Vernacular Press Act, 1878",
          "The Government of India Act, 1935",
        ],
        ans: "(a) The Rowlatt Act, 1919. Passed in March 1919, it gave the government enormous powers of repression - political prisoners could be detained without trial for two years. Gandhiji launched a nationwide satyagraha against it, and the Rowlatt satyagraha led to the Jallianwala Bagh incident.",
      },
      {
        n: "4",
        type: "MCQ",
        marks: 1,
        ch: "History Ch 2",
        topic: "The Sense of Collective Belonging",
        q: "Who wrote the poem 'Vande Mataram'?",
        opts: [
          "Rabindranath Tagore",
          "Bankim Chandra Chattopadhyay",
          "Abanindranath Tagore",
          "Natesa Sastri",
        ],
        ans: "(b) Bankim Chandra Chattopadhyay. Written in the 1870s, the song was included in his novel Anandamath and later became the hymn of the national movement. Abanindranath Tagore painted the famous image of Bharat Mata, and Natesa Sastri published a collection of Tamil folk tales.",
      },
      {
        n: "5",
        type: "VSA",
        marks: 2,
        ch: "History Ch 1",
        topic: "The Greek War of Independence (1821)",
        q: "How did the Greek War of Independence (1821) mobilise nationalist feelings in Europe?",
        ans: "Greece had been part of the Ottoman Empire. Greek revolutionaries rose in revolt in 1821, supported by other Greeks living in exile and by West European sympathisers - the poet Lord Byron even went to fight and died there. In 1832 the Treaty of Constantinople recognised Greece as an independent nation. That success turned 'nationalism' into a live and possible idea in Europe: it showed subject peoples everywhere that a nation of their own could actually be won.",
      },
      {
        n: "6",
        type: "SA",
        marks: 3,
        ch: "History Ch 2",
        topic: "Simon Commission & the demand for Purna Swaraj",
        q: "Why was the Simon Commission sent to India in 1928 and why was it opposed by the Indians?",
        ans: "Reason for sending it: the Government of India Act, 1919 had provided that a statutory commission would be set up after ten years to review the working of the constitutional system and suggest changes - so the Simon Commission was sent to India in 1928.\nWhy it was opposed: (1) The Commission had only British members - not a single Indian was included, so in a body that was deciding their own constitutional future Indians had no representative at all. (2) Everywhere the Commission went it was greeted with the slogan 'Go back Simon'. (3) At Lahore, Lala Lajpat Rai led the protest and was lathi-charged; he died later of his injuries. (4) The anger created by the Commission turned Indians towards the demand for complete independence (Purna Swaraj), which was formalised at the Lahore Congress in December 1929. Challenge to the Commission showed that the British must not decide India's future without Indians.",
      },
      {
        n: "7(a)",
        type: "LA",
        marks: 5,
        ch: "History Ch 1",
        topic: "The Making of Germany",
        q: "Describe the process of the unification of Germany (1848-1871).",
        ans: "(1) Nationalist feelings were widespread among middle-class Germans, who in 1848 tried to unite the different regions into a nation-state governed by an elected parliament; the Frankfurt Parliament, held in the Church of St Paul, offered the crown to Friedrich Wilhelm IV, who refused it, and the attempt collapsed.\n(2) After 1848, Prussia took over the leadership of the movement and its Chief Minister Otto von Bismarck - called 'the architect of Germany' - carried it out with the help of the Prussian army and bureaucracy.\n(3) Bismarck fought three wars in seven years - with Denmark (1864), with Austria (1866) and with France (1870-71) - and won all three, completing the process of unification.\n(4) In January 1871, in the Hall of Mirrors at Versailles, the Prussian king Kaiser William I was proclaimed the German Emperor. The ceremony showed that the new German empire was built on the strength of the Prussian army and monarchy, not on a popular revolution.\n(5) The new state gave importance to modernising the currency, banking, legal and judicial systems, and promoted German language, culture and music.",
        alt: {
          ch: "History Ch 2",
          topic: "Differing Strands within the Movement",
          q: "How did different social groups in India understand the idea of swaraj during the Non-Cooperation Movement? Explain.",
          ans: "(1) Rich peasants - the Patidars of Gujarat and the Jats of Uttar Pradesh - participated actively and for them swaraj meant a reduction of the revenue demand, an end to the practice of begar and the oppression of the landlords; they were deeply disappointed when the movement was called off in 1922 without the revenue rates being lowered.\n(2) Peasants of Awadh, led by Baba Ramchandra, demanded the reduction of rent and the abolition of begar; the Oudh Kisan Sabha was set up in his village and the movement joined hands with those against the landlords.\n(3) Tribal people (the Gudem Hills of Andhra Pradesh), led by Alluri Sitaram Raju, revolted against the colonial forest laws that closed their forests and forced them into hill roads and they wanted the restoration of their traditional rights.\n(4) Plantation workers in Assam, under the Inland Emigration Act of 1859, had no right of free movement; for them swaraj meant being able to move freely in and out of the confined space, retaining a link with the village and working on their own land.\n(5) For the middle class in the towns swaraj meant boycotting foreign goods and clothing, and for students and lawyers it meant leaving government schools, colleges and courts. Thus each group interpreted swaraj in the way that answered its own grievance - a sign of how broad the movement had become.",
        },
      },
      {
        n: "8",
        type: "CASE",
        marks: 4,
        ch: "History Ch 2",
        topic: "Towards Civil Disobedience — the Salt March",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "In December 1929, under the presidency of Jawaharlal Nehru, the Lahore Congress formalised the demand of 'Purna Swaraj'. On 31 January 1930, Mahatma Gandhi sent a letter to Viceroy Irwin stating eleven demands, the most stirring of which was the demand to abolish the salt tax. Salt was consumed by the rich and the poor alike, and it was one of the most essential items of food. The tax on salt and the government monopoly over its production revealed the most oppressive face of British rule. Gandhiji started his famous march from his Sabarmati Ashram with 78 of his trusted volunteers, and on 6 April he reached Dandi and ceremonially violated the law by making salt from sea water.",
        subs: [
          {
            q: "What did the demand of 'Purna Swaraj' mean and when was it formally adopted?",
            marks: 1,
            a: "Purna Swaraj meant complete independence - a free India with no British rule at all. It was formalised at the Lahore Congress session of December 1929, held under the presidency of Jawaharlal Nehru, and 26 January 1930 was celebrated as Independence Day.",
          },
          {
            q: "Why did Gandhiji choose salt as the symbol of the movement?",
            marks: 1,
            a: "Salt is consumed by the rich and the poor alike and is one of the most essential items of food, so it reached every household in India. The government's tax on salt and its monopoly over production showed the most oppressive face of British rule, and the demand to abolish the tax united the whole country.",
          },
          {
            q: "How did the British government respond to the Salt March and the Civil Disobedience Movement?",
            marks: 2,
            a: "(1) It responded with repression: Congress leaders, including Gandhiji and Abdul Ghaffar Khan, were arrested, and about 60,000 to 1,00,000 people were arrested in all. (2) In Peshawar, the arrest of Khan Abdul Ghaffar Khan was followed by police firing on a peaceful crowd. (3) Peaceful satyagrahis were attacked and women and children were beaten up. (4) The government also realised the strength of the movement and, after the Gandhi-Irwin Pact of 5 March 1931, released all political prisoners and allowed Gandhiji to attend the Second Round Table Conference in London.",
          },
        ],
      },
      {
        n: "9",
        type: "MAP",
        marks: 2,
        ch: "History Ch 2",
        topic: "Map work — Nationalism in India",
        q: "Two places are given below. Locate and label them on the outline map of India.\n(i) The place where the Jallianwala Bagh incident took place.\n(ii) The place where the Non-Cooperation Movement was called off after a violent clash.",
        ans: "(i) Amritsar - Punjab, in the north-western part of India (Jallianwala Bagh, 13 April 1919).\n(ii) Chauri Chaura - in Gorakhpur district, eastern Uttar Pradesh, near the Nepal border (February 1922, where a crowd clashed with the police and set fire to a police station, killing 22 policemen, after which Gandhiji withdrew the movement).",
      },
    ],
  },

  /* ============================ SECTION B — GEOGRAPHY ============================ */
  {
    key: "B",
    label: "Section B — Geography (20 Marks)",
    subject: "Geography",
    marks: 20,
    blurb:
      "Ch 1 Resources and Development, Ch 2 Forest and Wildlife Resources, Ch 3 Water Resources, Ch 4 Agriculture. 6 MCQ, 1 Short, 1 Long, 1 Case-based and 1 Map (3 marks).",
    qs: [
      {
        n: "10",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 1",
        topic: "Classification of resources — exhaustibility",
        q: "Which one of the following is a non-renewable resource?",
        opts: ["Solar energy", "Wind energy", "Coal", "Water"],
        ans: "(c) Coal. Coal has taken millions of years to form and exists in a limited stock, so it is a non-renewable resource. Solar energy, wind energy and water are renewable resources - they can be renewed or reproduced by physical, chemical or mechanical processes and some of them, like water and forests, are also called replenishable.",
      },
      {
        n: "11",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 1",
        topic: "Soil erosion and conservation",
        q: "In which one of the following states is terrace cultivation practised?",
        opts: ["Punjab", "Haryana", "Uttarakhand", "Rajasthan"],
        ans: "(c) Uttarakhand. In the steep hill slopes of the Himalayan region (Uttarakhand, Himachal Pradesh) fields are cut into step-like terraces, which restrict the speed of running water and thus check soil erosion. Punjab and Haryana use intensive agriculture while Rajasthan has arid soil and needs shelter belts and sand dune stabilisation.",
      },
      {
        n: "12",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 2",
        topic: "Conservation of forest and wildlife",
        q: "Project Tiger, one of India's most important conservation projects, was launched in which year?",
        opts: ["1970", "1972", "1973", "1976"],
        ans: "(c) 1973. The Wildlife Protection Act was passed in 1972, and Project Tiger - India's first big species-conservation programme - was launched in 1973 under it. Its tiger reserves curbed poaching of tigers and their prey and protected habitats, and it succeeded in checking the decline of the tiger population.",
      },
      {
        n: "13",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 3",
        topic: "Rainwater harvesting — traditional methods",
        q: "Bamboo drip irrigation, a 200-year-old system of tapping stream and spring water, is found in which one of the following states?",
        opts: ["Meghalaya", "Rajasthan", "Tamil Nadu", "Andhra Pradesh"],
        ans: "(a) Meghalaya. Water from perennial springs is diverted through a network of bamboo pipes, and the flow is reduced to 20-80 drops per minute at the plant. Rajasthan has khadins, johads and tankas, while Tamil Nadu has made rooftop rainwater harvesting compulsory.",
      },
      {
        n: "14",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 4",
        topic: "Cropping seasons — rabi",
        q: "Which one of the following is a rabi crop?",
        opts: ["Rice", "Wheat", "Cotton", "Jute"],
        ans: "(b) Wheat. Rabi crops are sown in winter (October to December) and harvested in summer (April to June) - wheat, barley, peas, gram and mustard. Rice, cotton and jute are kharif crops, sown with the onset of the monsoon and harvested in September-October.",
      },
      {
        n: "15",
        type: "MCQ",
        marks: 1,
        ch: "Geography Ch 4",
        topic: "Major crops — fibre crops",
        q: "Which one of the following is a fibre crop?",
        opts: ["Sugarcane", "Jute", "Tea", "Wheat"],
        ans: "(b) Jute. Cotton and jute are the fibre crops of India. Sugarcane is a food crop, tea is a beverage or plantation crop, and wheat is a cereal (food grain) crop.",
      },
      {
        n: "16",
        type: "SA",
        marks: 2,
        ch: "Geography Ch 2",
        topic: "Community and conservation — sacred groves",
        q: "What are 'sacred groves'? Why are they protected?",
        ans: "Sacred groves are patches of forest that local communities have protected and worshipped in the name of deities - for example, the sarnas of Jharkhand and Chhattisgarh and the devaris of Maharashtra.\nThey are protected because no tree is cut inside them and even collecting firewood and grazing animals is banned there. As a result they preserve the flora and fauna of the region in their natural form, and they are the finest example of community-led, in-situ conservation of forest and wildlife.",
      },
      {
        n: "17(a)",
        type: "LA",
        marks: 5,
        ch: "Geography Ch 3",
        topic: "Multipurpose river projects — opposition",
        q: "Why are multipurpose river projects being opposed? Explain with examples.",
        ans: "(1) They submerge large areas of land and displace people - the families shifted out are rarely resettled properly or given compensation. Example: the Sardar Sarovar Dam on the Narmada displaced about 2.5 lakh people, which led to the Narmada Bachao Andolan.\n(2) They destroy forests, wildlife habitats and the natural course of the river, and they affect aquatic life; standing water also becomes a breeding ground for mosquitoes and causes water-borne diseases.\n(3) Dams create inter-state water disputes over sharing the benefits of the river - as happened over the Krishna and the Cauvery - and the benefit is often taken by the rich farmers of one region while the local people bear the loss.\n(4) Big dams can induce earthquakes, cause pollution and silting, and the sediments that settle in the reservoir reduce its storage capacity and shorten the life of the project.\n(5) Local people therefore argue that the benefits and the costs of a dam must be shared more equitably, and they oppose the projects - the Narmada Bachao Andolan and the opposition to the Tehri Dam are the best examples.",
        alt: {
          ch: "Geography Ch 1",
          topic: "Resource planning in India",
          q: "What is resource planning? Explain the three steps involved in resource planning in India.",
          ans: "Resource planning means the balanced and judicious use of resources keeping the future in mind - a technique or skill of proper and planned utilisation of the resources available.\nIn India, resource planning involves three steps:\n(1) Identification and inventory of resources across the regions of the country - this involves surveying, mapping and qualitative and quantitative estimation and measurement of the resources.\n(2) Evolving a planning structure endowed with appropriate technology, skill and institutional set-up for implementing resource development plans.\n(3) Matching the resource development plans with overall national development plans.\nIndia has made concerted efforts to achieve these goals of resource planning right from the First Five Year Plan, but the availability of resources still varies greatly from region to region.",
        },
      },
      {
        n: "18",
        type: "CASE",
        marks: 4,
        ch: "Geography Ch 4",
        topic: "Technological reforms — Green Revolution",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "The Green Revolution, which took place in the late 1960s, was a package of technology - High Yielding Varieties of seeds, chemical fertilisers, pesticides and assured irrigation supply - introduced first in Punjab, Haryana, western Uttar Pradesh and parts of Rajasthan. Foodgrain production increased sharply and India, for the first time, became self-sufficient in foodgrains. But scientists cautioned that intensive use of chemicals and groundwater was harming the soil, and that the increase in production had benefited only the well-irrigated and wealthier regions and farmers.",
        subs: [
          {
            q: "What is meant by HYV seeds?",
            marks: 1,
            a: "HYV means High Yielding Variety seeds - improved seeds developed to give a much higher output per hectare than traditional seeds. They are productive only when they get enough water and chemical fertilisers, which is why they came as a package with assured irrigation and fertiliser use.",
          },
          {
            q: "Name the states where the Green Revolution first took place.",
            marks: 1,
            a: "Punjab, Haryana and western Uttar Pradesh (and parts of Rajasthan) - the states that had assured irrigation and could therefore use the new technology.",
          },
          {
            q: "State any two problems that the Green Revolution created.",
            marks: 2,
            a: "(1) Ecological problems: the continuous use of chemical fertilisers and pesticides degraded the soil and polluted water bodies, and over-irrigation and excessive use of groundwater made the water table fall in Punjab, Haryana and western Uttar Pradesh. (2) Economic problem of inequality: the benefits went mainly to the bigger farmers of well-irrigated regions, so regional and social differences increased; and because the same crop was grown again and again, the variety of crops came down.",
          },
        ],
      },
      {
        n: "19",
        type: "MAP",
        marks: 3,
        ch: "Geography Ch 3 & 1",
        topic: "Map work — Dams and soil regions",
        q: "Three items are given below. Locate and label them on the outline map of India.\n(i) Tehri Dam\n(ii) Hirakud Dam\n(iii) An area of black soil",
        ans: "(i) Tehri Dam - in Uttarakhand, on the river Bhagirathi at the confluence of the Bhagirathi and the Bhilangana, in the northern part of India.\n(ii) Hirakud Dam - in Odisha, on the river Mahanadi, in the eastern part of India.\n(iii) Black soil - the Deccan trap region of Maharashtra (also Gujarat and Madhya Pradesh), in the western-central part of India. Black soil is also called regur soil and is ideal for growing cotton.",
      },
    ],
  },

  /* ============================ SECTION C — POLITICAL SCIENCE ============================ */
  {
    key: "C",
    label: "Section C — Political Science (20 Marks)",
    subject: "Political Science",
    marks: 20,
    blurb:
      "Ch 1 Power Sharing, Ch 2 Federalism, Ch 3 Gender, Religion and Caste. 4 MCQ, 2 Very Short (4 marks), 1 Short, 1 Long and 1 Case-based. No map work in this section.",
    qs: [
      {
        n: "20",
        type: "MCQ",
        marks: 1,
        ch: "Political Science Ch 1",
        topic: "Power sharing in Belgium",
        q: "In Belgium, the percentage of the French-speaking community is about",
        opts: ["20 per cent", "40 per cent", "59 per cent", "74 per cent"],
        ans: "(b) 40 per cent. In Belgium, 59 per cent of the people live in the Flemish region and speak Dutch, 40 per cent live in the Wallonia region and speak French, and the remaining 1 per cent speak German. In Brussels, the capital, 80 per cent speak French and 20 per cent Dutch, which is why the Belgian leaders chose the path of power sharing instead of majority rule.",
      },
      {
        n: "21",
        type: "MCQ",
        marks: 1,
        ch: "Political Science Ch 2",
        topic: "Union, State and Concurrent Lists",
        q: "Which one of the following subjects is included in the State List?",
        opts: ["Defence", "Police", "Banking", "Currency"],
        ans: "(b) Police. Subjects of local importance - such as police, trade, commerce, agriculture, irrigation and education - are in the State List. Subjects of national importance - defence, foreign affairs, banking, communications and currency - are in the Union List, and subjects of common interest like education, forests, marriage and adoption are in the Concurrent List.",
      },
      {
        n: "22",
        type: "MCQ",
        marks: 1,
        ch: "Political Science Ch 3",
        topic: "Gender and politics — literacy",
        q: "The literacy rate of women in India, compared to that of men, is",
        opts: [
          "about 54 per cent as against 76 per cent for men",
          "about 76 per cent as against 54 per cent for men",
          "equal to that of men",
          "about 40 per cent as against 60 per cent for men",
        ],
        ans: "(a) About 54 per cent as against 76 per cent for men. This gap in literacy is one of the reasons why women are paid less for the same work and why their representation in the legislatures is still very low - only about 10 to 14 per cent in the Lok Sabha, which is why one-third of the seats in panchayats and municipalities are reserved for women.",
      },
      {
        n: "23",
        type: "MCQ",
        marks: 1,
        ch: "Political Science Ch 3",
        topic: "Secular state",
        q: "Which one of the following is NOT a feature of a secular state?",
        opts: [
          "The State does not have an official religion of its own",
          "The Constitution gives every citizen the freedom to profess and practise any religion",
          "The State can discriminate among citizens on the basis of religion",
          "The State can intervene in religion to ensure equality within a religious community",
        ],
        ans: "(c) The State can discriminate among citizens on the basis of religion. A secular state never discriminates on religious grounds - that is precisely what makes it secular. The other three are real features of Indian secularism: no official religion, full freedom to profess, practise and propagate any religion, and the power to intervene in religion to enforce equality (for example, the abolition of untouchability).",
      },
      {
        n: "24",
        type: "VSA",
        marks: 2,
        ch: "Political Science Ch 1",
        topic: "Majoritarianism in Sri Lanka",
        q: "What is majoritarianism? Give two examples of majoritarian measures adopted in Sri Lanka after 1948.",
        ans: "Majoritarianism is a belief that the majority community of a country should be able to rule it in whichever way it wants, disregarding the wishes and needs of the minority.\nTwo majoritarian measures adopted in Sri Lanka: (1) In 1956 an Act was passed to recognise Sinhala as the only official language, disregarding Tamil. (2) The government followed preferential policies that favoured Sinhala applicants for university positions and government jobs, and a new constitution declared that the state shall protect and foster Buddhism. These measures alienated the Sri Lankan Tamils, who demanded an independent Tamil Eelam, which led the country into a long civil war.",
      },
      {
        n: "25",
        type: "VSA",
        marks: 2,
        ch: "Political Science Ch 2",
        topic: "Federalism — residuary powers",
        q: "What are residuary powers? Who exercises them in India?",
        ans: "Subjects that are not mentioned in any of the three lists - the Union List, the State List and the Concurrent List - are called residuary subjects, and the power to make laws on them is called residuary power.\nIn India, the Union (Central) government has the power to legislate on these residuary subjects. Example: computer software, which did not exist when the Constitution was written, falls in the residuary list and only the Centre can make laws on it.",
      },
      {
        n: "26",
        type: "SA",
        marks: 3,
        ch: "Political Science Ch 3",
        topic: "Communalism in politics",
        q: "In how many ways can communalism take place in politics? Explain.",
        ans: "(1) Everyday beliefs: the followers of one religion begin to believe that their religion is superior and to look at other communities with prejudice and hostility. Religious prejudices, stereotypes of religious communities and the belief in the superiority of one's own religion are the most common expressions of communalism in everyday life.\n(2) Political dominance: communalism takes the form of a desire to dominate other religious groups politically. When religion is seen as the basis of a nation and one religious group wants to establish its dominance over others, it leads to conflict - as happened in Sri Lanka and in many parts of South Asia.\n(3) Political mobilisation: religion is brought into politics through religious symbols, religious leaders, emotional appeals and religious rituals, and is used to gather votes and get political mileage. Political parties sometimes deliberately fan communal feelings for electoral gains, which is why the Constitution makes India a secular state.",
      },
      {
        n: "27(a)",
        type: "LA",
        marks: 5,
        ch: "Political Science Ch 1",
        topic: "Forms of power sharing",
        q: "Explain the different forms of power sharing in modern democracies, giving one example of each.",
        ans: "(1) Horizontal distribution of power: power is shared among the different organs of government - the legislature, the executive and the judiciary - placed at the same level so that none of them can exercise unlimited power. Each organ checks the others, which is called a system of checks and balances. Example: even though the Council of Ministers and the Prime Minister are the executive, the judiciary can review and check their decisions.\n(2) Vertical distribution of power: power is shared among governments at different levels - the Union or Central government, the state governments and, below them, the local bodies. The Constitution lays down the powers of each level so that no level can dominate the other. Example: the three-tier system of government in India.\n(3) Power sharing among social groups: power may also be shared among different social groups such as religious and linguistic groups. In some countries there are constitutional and legal arrangements under which socially weaker sections and women are represented in the legislatures and administration. Example: the system of 'community government' in Belgium, and in India reserved seats for the Scheduled Castes and Scheduled Tribes and one-third seats for women in panchayats and municipalities.\n(4) Power sharing among political parties, pressure groups and movements: in a democracy power is shared among different political parties that represent different ideologies and social groups. When two or more parties come together to form a government - a coalition government - they share power directly. Interest groups such as traders, farmers, workers and industrialists also influence decision-making and thus have a share in governmental power. Thus power sharing is the very spirit of democracy.",
        alt: {
          ch: "Political Science Ch 2",
          topic: "Decentralisation in India — 1992 amendment",
          q: "How has decentralisation strengthened democracy in India? Describe the major steps taken in 1992.",
          ans: "When power is taken away from the Central and state governments and given to local governments it is called decentralisation. The basic idea is that there are many problems and issues which are best settled at the local level, and that people have the best knowledge of local problems.\nA major step was taken in 1992: the Constitution was amended to make the third tier of democracy more powerful and effective. Its main provisions are:\n(1) It is now mandatory to hold regular elections to the local government bodies.\n(2) Seats are reserved in the elected bodies and the executive heads of these institutions for the Scheduled Castes, Scheduled Tribes and Other Backward Classes.\n(3) At least one-third of all positions are reserved for women.\n(4) An independent institution called the State Election Commission has been created in each state to conduct panchayat and municipal elections.\n(5) The state governments are required to share some powers and revenue with the local government bodies, and the nature of sharing varies from state to state.\nRural local government is known as the panchayati raj - the gram panchayat at the village level, the panchayat samiti or block or mandal at the block level and the zilla parishad at the district level. Urban areas have municipal corporations in big cities and municipal councils in smaller towns. Because governance is now closest to the people, decentralisation has deepened democracy in India.",
        },
      },
      {
        n: "28",
        type: "CASE",
        marks: 4,
        ch: "Political Science Ch 3",
        topic: "Caste in politics and politics in caste",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "The caste system was the basis of the division of labour and social hierarchy in Indian society. In the last fifty years, the role of caste in politics has changed. No parliamentary constituency in India has a clear majority of one single caste. So every candidate and party needs the confidence of more than one caste or community to win the election. That is why, when parties choose candidates in elections, they keep in mind the caste composition of the electorate.",
        subs: [
          {
            q: "What is meant by the caste system?",
            marks: 1,
            a: "The caste system was a system of social division in which society was divided into different castes on the basis of birth and occupation, with a fixed hierarchy - some castes regarded as superior and others as inferior, and members of different castes not allowed to mix freely or share food and water. It was the basis of the division of labour and of inequality in Indian society.",
          },
          {
            q: "Why does no party win the votes of all the voters belonging to one caste?",
            marks: 1,
            a: "Because no parliamentary constituency has a clear majority of one single caste, and because the people of the same caste do not vote as one block - the rich and the poor of the same caste have different interests and needs and often support different parties. So a party cannot win an election by the votes of one caste alone; it has to win the confidence of many castes and communities.",
          },
          {
            q: "In what ways does politics influence caste in India? Give any two.",
            marks: 2,
            a: "(1) Each caste group tries to become bigger by incorporating within it neighbouring castes or sub-castes that were earlier excluded from it - for example, many 'backward' castes have demanded to be included in the list of Other Backward Classes. (2) Various caste groups have to enter into a coalition with other castes or communities to gain power, which brings new kinds of caste groups into politics. (3) Political parties and leaders sometimes favour a particular caste or use caste sentiments and appeals to win votes, which can create tension and conflict between communities. At the same time, it should be noted that politics has also strengthened the identity of the lower castes, who now use the democratic process to demand their share and dignity.",
          },
        ],
      },
    ],
  },

  /* ============================ SECTION D — ECONOMICS ============================ */
  {
    key: "D",
    label: "Section D — Economics (20 Marks)",
    subject: "Economics",
    marks: 20,
    blurb:
      "Ch 1 Development, Ch 2 Sectors of the Indian Economy. Note: this section has 6 MCQ, THREE Short Answers (9 marks) and 1 Long Answer only - no Very Short Answer, no case study and no map work.",
    qs: [
      {
        n: "29",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 1",
        topic: "Comparing countries — Human Development Report",
        q: "The Human Development Report published by UNDP compares countries on the basis of",
        opts: [
          "per capita income only",
          "the health status of the people only",
          "the educational levels of the people, their health status and per capita income",
          "the size of the population only",
        ],
        ans: "(c) The educational levels of the people, their health status and per capita income. The UNDP report uses these three together because income alone does not tell us how well people actually live - two countries with the same average income can have very different levels of health and education. This combined measure is called the Human Development Index.",
      },
      {
        n: "30",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 1",
        topic: "Public facilities",
        q: "Which one of the following is an example of a public facility?",
        opts: [
          "A shopping mall run by a private company",
          "A government-run ration shop under the PDS",
          "A mobile phone showroom",
          "A private tuition centre",
        ],
        ans: "(b) A government-run ration shop under the PDS. Public facilities are those services which are provided by the government because they benefit everybody and private companies will not provide them at a price the poor can pay - schools, hospitals, ration shops, public transport, roads, electricity and water supply. Money cannot buy a pollution-free environment or a disease-free locality, so collective provision is necessary for every person's basic needs.",
      },
      {
        n: "31",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 1",
        topic: "Income and other goals",
        q: "Which one of the following is a non-material goal of development?",
        opts: [
          "A higher income every year",
          "The dignity of equal treatment of girls and boys in the family",
          "A bigger house in the city",
          "A better paid job",
        ],
        ans: "(b) The dignity of equal treatment of girls and boys in the family. People look for more than income - equal treatment, freedom, security and respect are non-material goals that matter just as much. A woman may be ready to give up a high-paying job in a foreign city to live with her family, showing that development is not only about money.",
      },
      {
        n: "32",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 2",
        topic: "Comparing the three sectors",
        q: "Which sector has emerged as the largest producer of the gross domestic product (GDP) in India?",
        opts: ["Primary sector", "Secondary sector", "Tertiary sector", "All the three are equal"],
        ans: "(c) Tertiary sector. In India the tertiary or service sector has become the largest producer of GDP, but the primary sector still employs the largest number of people - this mismatch between production and employment is the biggest problem of the Indian economy, and it is because of underemployment in agriculture.",
      },
      {
        n: "33",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 2",
        topic: "Creating more employment — MGNREGA",
        q: "MGNREGA, 2005, guarantees how many days of employment in a year to a rural household?",
        opts: ["90 days", "100 days", "120 days", "150 days"],
        ans: "(b) 100 days. The Mahatma Gandhi National Rural Employment Guarantee Act, 2005 gives a guarantee of 100 days of employment in a year to all rural households whose adult members are willing to do unskilled manual work. If the government fails to provide work, it has to pay an unemployment allowance. A part of the wages under this scheme is now paid in cash and the scheme also creates useful rural assets.",
      },
      {
        n: "34",
        type: "MCQ",
        marks: 1,
        ch: "Economics Ch 2",
        topic: "Public and private sector",
        q: "Which one of the following is an example of a public sector enterprise?",
        opts: ["Tata Steel", "Indian Railways", "Reliance Industries", "Maruti Suzuki"],
        ans: "(b) Indian Railways. In the public sector the government owns most of the assets and provides all the services - the purpose is public welfare, not profit. In the private sector, ownership of assets and delivery of services is in the hands of private individuals or companies, whose main aim is to earn profit - Tata Steel, Reliance India and Maruti Suzuki all belong to the private sector.",
      },
      {
        n: "35",
        type: "SA",
        marks: 3,
        ch: "Economics Ch 1",
        topic: "Different people, different goals",
        q: "Different persons can have different developmental goals. Explain with examples.",
        ans: "Development goals differ from person to person because the situations and needs of people are different.\n(1) A landless rural labourer wants more days of work and better wages, local school facilities so that his children can learn, and no social discrimination - while a prosperous farmer of the same village wants a higher support price for his crops, cheap labour and better seeds. For the labourer higher wages are development; for the farmer lower wage cost is development.\n(2) An industrialist wants more electricity at cheaper rates and more dams so that production can be expanded - but the people displaced by those very dams want rehabilitation and compensation. So what is a development goal for one person may be a loss for another, and the two goals can even be conflicting.\n(3) For a girl from a poor family, development may mean getting the same freedom and opportunities in education as her brother; for a trader it may mean more customers. Thus people seek the things that are most important for them - their goals may be material (more income, land, property) or non-material (equal treatment, freedom, security, respect, and a clean and healthy environment).",
      },
      {
        n: "36",
        type: "SA",
        marks: 3,
        ch: "Economics Ch 2",
        topic: "Disguised unemployment",
        q: "What is disguised unemployment? Explain with an example.",
        ans: "Disguised unemployment is a situation in which more people are engaged in a job than are actually needed, so that if some of them are removed from that work the total output does not fall - the extra persons only appear to be employed, and their contribution to production is zero.\nExample: a farm of two hectares in a village needs only three workers to grow the crop, but four or five members of the same family work on it because there is no other work available in the village. Even if two of them are removed and go elsewhere, the production of the farm will not come down. This is why disguised unemployment is also called underemployment, and it is mostly found in the agriculture (primary) sector of India.",
      },
      {
        n: "37",
        type: "SA",
        marks: 3,
        ch: "Economics Ch 2",
        topic: "Rising importance of the tertiary sector",
        q: "Why is the tertiary sector becoming so important in India? Give any three reasons.",
        ans: "(1) Basic services: services such as hospitals, educational institutions, post and telegraph services, police stations, courts, municipal corporations, defence, banks and insurance are required by everyone. In a developing country like India the government has to take the responsibility of providing these services, so this sector grows.\n(2) Development of agriculture and industry: the development of agriculture and industry leads to a greater demand for services like transport, storage, trade, and banking and insurance - the more the primary and secondary sectors grow, the more services they need, and the tertiary sector expands.\n(3) Rising income and new services: as the income level of people rises, they demand many more services such as eating out, tourism, shopping, private hospitals and private schools. At the same time, new services based on information and communication technology - call centres, software companies, BPOs and internet cafes - have become very important. That is why the tertiary sector has emerged as the largest producing sector of India's GDP.",
      },
      {
        n: "38(a)",
        type: "LA",
        marks: 5,
        ch: "Economics Ch 1",
        topic: "Sustainability and development",
        q: "What is meant by sustainable development? Why is the issue of sustainability important for development? Explain with examples.",
        ans: "Sustainable development means development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs. In simple words, it means using our natural resources carefully so that they last, and not damaging the environment on which all development depends.\nThe issue of sustainability is important because:\n(1) Many of our resources are non-renewable and exist in a limited stock. Crude oil and petroleum, for example, will last only about fifty years at the present rate of use, and once they are finished they cannot be replaced.\n(2) Even renewable resources can be exhausted by careless overuse. In Maharashtra, Rajasthan and Punjab the groundwater table has fallen sharply because of over-irrigation and excessive withdrawal of water, and this water is not being replenished at the same rate.\n(3) Damage to the environment - deforestation, pollution of air and water, loss of biodiversity - harms the health and livelihood of people, and it is the poor whose lives depend most directly on natural resources such as forests, water and land.\n(4) Resources are also unequally distributed, so sustainability means not only conserving them but also sharing their benefits fairly among all people.\nFor example, growing water-intensive crops in dry areas and using chemicals indiscriminately may raise production today but it leaves the coming generations with saline land and empty wells. If we use our resources thoughtlessly now, the people who come after us will inherit a damaged environment and fewer resources - so development can continue in the long run only if it is sustainable.",
        alt: {
          ch: "Economics Ch 2",
          topic: "Organised and unorganised sector",
          q: "Explain the difference between the organised and the unorganised sector. Why do workers in the unorganised sector need protection?",
          ans: "Organised sector:\n(1) It is registered by the government and has to follow rules and regulations such as the Factories Act, the Minimum Wages Act and the Payment of Gratuity Act.\n(2) Terms of employment are fixed in writing and the worker enjoys security of job - he cannot be asked to leave without a valid reason.\n(3) Working hours are fixed and overtime is paid; the worker gets benefits like provident fund, gratuity, paid leave, holidays, medical facilities and pension.\n(4) The worker gets a regular monthly salary. Example: a bank employee or a worker in a registered factory.\nUnorganised sector:\n(1) It consists of small and scattered units which are largely outside the control of the government and are not registered.\n(2) Jobs are low-paid and irregular, and there is no job security - the employer can ask the worker to leave at any time.\n(3) There are no fixed working hours, no provision of overtime, paid leave, holidays, leave due to sickness or pension.\n(4) Employment is largely seasonal and the worker is often exploited. Example: agricultural labourers, street vendors, domestic workers, workers in small workshops.\nProtection is needed because unorganised sector workers are the largest group of workers in India and they face insecurity, low wages and exploitation. The government can help them by fixing and enforcing minimum wages, giving cheap credit, providing social security, and organising them into cooperatives and self-help groups. MGNREGA, 2005 is an example: it guarantees 100 days of employment in a year to rural households that need work, and pays an unemployment allowance if work is not provided.",
        },
      },
    ],
  },
];
