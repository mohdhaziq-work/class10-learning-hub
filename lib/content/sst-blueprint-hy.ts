/* SST Half Yearly — BLUEPRINT-BASED MODEL PAPER
   Structure taken line by line from the school's blue print (38 Qs / 80 marks).

   ANSWER RULE: every answer is only as long as its marks — 1 mark = one line,
   2 marks = two points, 3 marks = three points, 5 marks = five points. */

export type BPType = "MCQ" | "VSA" | "SA" | "LA" | "CASE" | "MAP";

export interface BPSub {
  q: string;
  a: string;
  marks: number;
}

export interface BPQ {
  n: string;
  type: BPType;
  marks: number;
  ch: string;
  topic: string;
  q: string;
  extract?: string;
  subs?: BPSub[];
  opts?: string[];
  ans?: string;
  alt?: { ch: string; topic: string; q: string; ans: string };
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

export interface BPBlueRow { type: string; count: number; each: number; marks: number; }
export interface BPBlueSection { key: string; subject: string; chapters: string; rows: BPBlueRow[]; totalQ: number; totalMarks: number; }

export const BP_BLUEPRINT: BPBlueSection[] = [
  {
    key: "A", subject: "History", chapters: "Chapter 01 & 02",
    rows: [
      { type: "Multiple Choice Questions", count: 4, each: 1, marks: 4 },
      { type: "Very Short Answer Type", count: 1, each: 2, marks: 2 },
      { type: "Short Answer Type", count: 1, each: 3, marks: 3 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
      { type: "Map Work", count: 1, each: 2, marks: 2 },
    ],
    totalQ: 9, totalMarks: 20,
  },
  {
    key: "B", subject: "Geography", chapters: "Chapter 01 to 04",
    rows: [
      { type: "Multiple Choice Questions", count: 6, each: 1, marks: 6 },
      { type: "Short Answer Type", count: 1, each: 2, marks: 2 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
      { type: "Map Work", count: 1, each: 3, marks: 3 },
    ],
    totalQ: 10, totalMarks: 20,
  },
  {
    key: "C", subject: "Political Science", chapters: "Chapter 01 to 03",
    rows: [
      { type: "Multiple Choice Questions", count: 4, each: 1, marks: 4 },
      { type: "Very Short Answer Type", count: 2, each: 2, marks: 4 },
      { type: "Short Answer Type", count: 1, each: 3, marks: 3 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
      { type: "Case Based Study Question", count: 1, each: 4, marks: 4 },
    ],
    totalQ: 9, totalMarks: 20,
  },
  {
    key: "D", subject: "Economics", chapters: "Chapter 01 to 02",
    rows: [
      { type: "Multiple Choice Questions", count: 6, each: 1, marks: 6 },
      { type: "Short Answer Type", count: 3, each: 3, marks: 9 },
      { type: "Long Answer Type", count: 1, each: 5, marks: 5 },
    ],
    totalQ: 10, totalMarks: 20,
  },
];

export const BP_MAP_PRACTICE = {
  history: [
    "Dandi (Gujarat) — Gandhiji broke the salt law, 6 April 1930",
    "Amritsar (Punjab) — Jallianwala Bagh, 13 April 1919",
    "Chauri Chaura (Uttar Pradesh) — movement called off, Feb 1922",
    "Calcutta (Bengal) — Congress session, September 1920",
    "Nagpur (Maharashtra) — Congress session, December 1920",
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

export interface BPSection { key: string; label: string; subject: string; marks: number; blurb: string; qs: BPQ[]; }

export const BP_SECTIONS: BPSection[] = [
  /* ============================ SECTION A — HISTORY ============================ */
  {
    key: "A",
    label: "Section A — History (20 Marks)",
    subject: "History",
    marks: 20,
    blurb: "Ch 1 The Rise of Nationalism in Europe, Ch 2 Nationalism in India. 4 MCQ, 1 Very Short, 1 Short, 1 Long, 1 Case-based and 1 Map (2 marks).",
    qs: [
      {
        n: "1", type: "MCQ", marks: 1, ch: "History Ch 1", topic: "Making of Germany & Italy",
        q: "Who was proclaimed the King of united Italy in 1861?",
        opts: ["Giuseppe Mazzini", "Count Camillo de Cavour", "Victor Emmanuel II", "Giuseppe Garibaldi"],
        ans: "(c) Victor Emmanuel II — the King of Sardinia-Piedmont was proclaimed King of united Italy in 1861.",
      },
      {
        n: "2", type: "MCQ", marks: 1, ch: "History Ch 1", topic: "The Age of Revolutions (1830-48)",
        q: "Who said: 'When France sneezes, the rest of Europe catches cold'?",
        opts: ["Klemens von Metternich", "Giuseppe Mazzini", "Otto von Bismarck", "Friedrich Wilhelm IV"],
        ans: "(a) Klemens von Metternich — the Austrian Chancellor who led the conservative order after 1815.",
      },
      {
        n: "3", type: "MCQ", marks: 1, ch: "History Ch 2", topic: "Towards Civil Disobedience",
        q: "Which Act empowered the government to detain political prisoners without trial for two years?",
        opts: ["The Rowlatt Act, 1919", "The Government of India Act, 1919", "The Vernacular Press Act, 1878", "The Government of India Act, 1935"],
        ans: "(a) The Rowlatt Act, 1919 — it was opposed by a nationwide satyagraha led by Gandhiji.",
      },
      {
        n: "4", type: "MCQ", marks: 1, ch: "History Ch 2", topic: "The Sense of Collective Belonging",
        q: "Who wrote the poem 'Vande Mataram'?",
        opts: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Abanindranath Tagore", "Natesa Sastri"],
        ans: "(b) Bankim Chandra Chattopadhyay — he wrote it in the 1870s in his novel Anandamath.",
      },
      {
        n: "5", type: "VSA", marks: 2, ch: "History Ch 1", topic: "The Greek War of Independence (1821)",
        q: "How did the Greek War of Independence (1821) mobilise nationalist feelings in Europe?",
        ans: "(1) Greece, then under the Ottoman Empire, rose in revolt in 1821 with the support of exiled Greeks and West European sympathisers like the poet Lord Byron. (2) In 1832 the Treaty of Constantinople recognised Greece as an independent nation — this success showed subject peoples of Europe that a nation of their own could really be won.",
      },
      {
        n: "6", type: "SA", marks: 3, ch: "History Ch 2", topic: "Simon Commission & Purna Swaraj",
        q: "Why was the Simon Commission sent to India in 1928 and why was it opposed by the Indians?",
        ans: "(1) The Government of India Act of 1919 provided that a statutory commission would review the constitutional system after ten years, so the Simon Commission was sent in 1928. (2) It had only British members — no Indian — so Indians had no voice in deciding their own future, and it was greeted everywhere with the slogan 'Go back Simon'. (3) At Lahore, Lala Lajpat Rai, who led the protest, was lathi-charged and died of his injuries, which turned the Congress towards the demand for Purna Swaraj.",
      },
      {
        n: "7(a)", type: "LA", marks: 5, ch: "History Ch 1", topic: "The Making of Germany",
        q: "Describe the process of the unification of Germany (1848-1871).",
        ans: "(1) In 1848 the middle-class Germans tried to unite the German regions into a nation-state through an elected parliament; the Frankfurt Parliament, in the Church of St Paul, offered the crown to Friedrich Wilhelm IV, who refused, and the attempt failed. (2) After 1848, Prussia took the leadership of the movement, and its Chief Minister Otto von Bismarck carried it out with the help of the Prussian army and bureaucracy. (3) Bismarck fought three wars in seven years — with Denmark (1864), Austria (1866) and France (1870-71) — and won all three. (4) In January 1871, Kaiser William I of Prussia was proclaimed the German Emperor in the Hall of Mirrors at Versailles. (5) The new empire gave importance to modernising the currency, banking, legal and judicial systems and to promoting the German language and culture.",
        alt: {
          ch: "History Ch 2", topic: "Differing Strands within the Movement",
          q: "How did different social groups in India understand the idea of swaraj during the Non-Cooperation Movement? Explain.",
          ans: "(1) Rich peasants — the Patidars of Gujarat and the Jats of Uttar Pradesh — wanted the revenue demand reduced and begar ended; they were disappointed when the movement was called off in 1922 without any reduction. (2) Peasants of Awadh, led by Baba Ramchandra, demanded reduction of rent and abolition of begar, and joined the movement through the Oudh Kisan Sabha. (3) The tribal people of the Gudem Hills, led by Alluri Sitaram Raju, revolted against the forest laws that closed their forests and wanted their traditional rights restored. (4) Plantation workers of Assam, bound by the Inland Emigration Act of 1859, understood swaraj as the freedom to move in and out of the tea gardens and to keep a link with their village. (5) For the town middle classes swaraj meant boycotting foreign cloth and leaving government schools, colleges and courts. Each group thus understood swaraj through its own grievance.",
        },
      },
      {
        n: "8", type: "CASE", marks: 4, ch: "History Ch 2", topic: "Towards Civil Disobedience — the Salt March",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "In December 1929, under the presidency of Jawaharlal Nehru, the Lahore Congress formalised the demand of 'Purna Swaraj'. On 31 January 1930, Mahatma Gandhi sent a letter to Viceroy Irwin stating eleven demands, the most stirring of which was the demand to abolish the salt tax. Salt was consumed by the rich and the poor alike, and it was one of the most essential items of food. The tax on salt and the government monopoly over its production revealed the most oppressive face of British rule. Gandhiji started his famous march from his Sabarmati Ashram with 78 of his trusted volunteers, and on 6 April he reached Dandi and ceremonially violated the law by making salt from sea water.",
        subs: [
          { q: "What did the demand of 'Purna Swaraj' mean and when was it formally adopted?", marks: 1, a: "Purna Swaraj meant complete independence from British rule. It was formalised at the Lahore Congress session of December 1929 under Jawaharlal Nehru, and 26 January 1930 was celebrated as Independence Day." },
          { q: "Why did Gandhiji choose salt as the symbol of the movement?", marks: 1, a: "Because salt is used by the rich and the poor alike and is an essential item of food, so it reached every household. The tax and the government monopoly on salt showed the most oppressive face of British rule." },
          { q: "How did the British government respond to the Salt March and the Civil Disobedience Movement?", marks: 2, a: "(1) It responded with repression — Congress leaders were arrested and about 60,000 to 1,00,000 people were jailed. (2) Later, by the Gandhi-Irwin Pact of 5 March 1931, it released all political prisoners." },
        ],
      },
      {
        n: "9", type: "MAP", marks: 2, ch: "History Ch 2", topic: "Map work — Nationalism in India",
        q: "Two places are given below. Locate and label them on the outline map of India.\n(i) The place where the Jallianwala Bagh incident took place.\n(ii) The place where the Non-Cooperation Movement was called off after a violent clash.",
        ans: "(i) Amritsar — in north-west Punjab, near the Pakistan border (Jallianwala Bagh, 13 April 1919).\n(ii) Chauri Chaura — in Gorakhpur district of eastern Uttar Pradesh, near the Nepal border (where 22 policemen were killed, February 1922).",
      },
    ],
  },

  /* ============================ SECTION B — GEOGRAPHY ============================ */
  {
    key: "B",
    label: "Section B — Geography (20 Marks)",
    subject: "Geography",
    marks: 20,
    blurb: "Ch 1 Resources and Development, Ch 2 Forest and Wildlife, Ch 3 Water Resources, Ch 4 Agriculture. 6 MCQ, 1 Short, 1 Long, 1 Case-based and 1 Map (3 marks).",
    qs: [
      {
        n: "10", type: "MCQ", marks: 1, ch: "Geography Ch 1", topic: "Classification of resources — exhaustibility",
        q: "Which one of the following is a non-renewable resource?",
        opts: ["Solar energy", "Wind energy", "Coal", "Water"],
        ans: "(c) Coal — it takes millions of years to form and exists in a limited stock, so it cannot be renewed.",
      },
      {
        n: "11", type: "MCQ", marks: 1, ch: "Geography Ch 1", topic: "Soil erosion and conservation",
        q: "In which one of the following states is terrace cultivation practised?",
        opts: ["Punjab", "Haryana", "Uttarakhand", "Rajasthan"],
        ans: "(c) Uttarakhand — on the steep Himalayan slopes, fields are cut into steps to check soil erosion.",
      },
      {
        n: "12", type: "MCQ", marks: 1, ch: "Geography Ch 2", topic: "Conservation of forest and wildlife",
        q: "Project Tiger, one of India's most important conservation projects, was launched in which year?",
        opts: ["1970", "1972", "1973", "1976"],
        ans: "(c) 1973 — it was launched under the Wildlife Protection Act of 1972.",
      },
      {
        n: "13", type: "MCQ", marks: 1, ch: "Geography Ch 3", topic: "Rainwater harvesting — traditional methods",
        q: "Bamboo drip irrigation, a 200-year-old system of tapping stream and spring water, is found in which one of the following states?",
        opts: ["Meghalaya", "Rajasthan", "Tamil Nadu", "Andhra Pradesh"],
        ans: "(a) Meghalaya — bamboo pipes carry spring water to the roots of betel leaf and black pepper plants.",
      },
      {
        n: "14", type: "MCQ", marks: 1, ch: "Geography Ch 4", topic: "Cropping seasons — rabi",
        q: "Which one of the following is a rabi crop?",
        opts: ["Rice", "Wheat", "Cotton", "Jute"],
        ans: "(b) Wheat — rabi crops are sown in winter (October-December) and harvested in summer.",
      },
      {
        n: "15", type: "MCQ", marks: 1, ch: "Geography Ch 4", topic: "Major crops — fibre crops",
        q: "Which one of the following is a fibre crop?",
        opts: ["Sugarcane", "Jute", "Tea", "Wheat"],
        ans: "(b) Jute — cotton and jute are the fibre crops of India.",
      },
      {
        n: "16", type: "SA", marks: 2, ch: "Geography Ch 2", topic: "Community and conservation — sacred groves",
        q: "What are 'sacred groves'? Why are they protected?",
        ans: "(1) Sacred groves are patches of forest protected and worshipped by local communities in the name of deities — the sarnas of Jharkhand and Chhattisgarh and the devaris of Maharashtra. (2) No tree is cut there and even grazing and fuelwood collection are banned, so the flora and fauna of the region is preserved in its natural form.",
      },
      {
        n: "17(a)", type: "LA", marks: 5, ch: "Geography Ch 3", topic: "Multipurpose river projects — opposition",
        q: "Why are multipurpose river projects being opposed? Explain with examples.",
        ans: "(1) They submerge large areas and displace people who are rarely resettled properly — the Sardar Sarovar Dam on the Narmada displaced about 2.5 lakh people and led to the Narmada Bachao Andolan. (2) They destroy forests, wildlife habitats and aquatic life, and the standing water becomes a breeding ground for mosquitoes. (3) They cause inter-state water disputes over sharing the benefits of the river, such as the Krishna and Cauvery disputes. (4) Big dams induce earthquakes, cause pollution and silting, and the sediment deposited in the reservoir shortens its life. (5) The local people, who bear the loss, do not get an equal share in the benefits, so they oppose such projects.",
        alt: {
          ch: "Geography Ch 1", topic: "Resource planning in India",
          q: "What is resource planning? Explain the three steps involved in resource planning in India.",
          ans: "Resource planning means the balanced and judicious use of resources keeping the future in mind. Its three steps in India are:\n(1) Identification and inventory of resources across the regions — surveying, mapping and qualitative and quantitative estimation of the resources. (2) Evolving a planning structure with appropriate technology, skill and institutional set-up for implementing the plans. (3) Matching the resource development plans with overall national development plans. India has made efforts for this from the First Five Year Plan onwards, but the availability of resources still varies greatly from region to region.",
        },
      },
      {
        n: "18", type: "CASE", marks: 4, ch: "Geography Ch 4", topic: "Technological reforms — Green Revolution",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "The Green Revolution, which took place in the late 1960s, was a package of technology - High Yielding Varieties of seeds, chemical fertilisers, pesticides and assured irrigation supply - introduced first in Punjab, Haryana, western Uttar Pradesh and parts of Rajasthan. Foodgrain production increased sharply and India, for the first time, became self-sufficient in foodgrains. But scientists cautioned that intensive use of chemicals and groundwater was harming the soil, and that the increase in production had benefited only the well-irrigated and wealthier regions and farmers.",
        subs: [
          { q: "What is meant by HYV seeds?", marks: 1, a: "HYV means High Yielding Variety seeds — improved seeds that give a much higher output per hectare than traditional seeds, but only when they get enough water and fertilisers." },
          { q: "Name the states where the Green Revolution first took place.", marks: 1, a: "Punjab, Haryana and western Uttar Pradesh (also parts of Rajasthan)." },
          { q: "State any two problems that the Green Revolution created.", marks: 2, a: "(1) Ecological problems: chemical fertilisers and pesticides degraded the soil, polluted water, and over-irrigation made the water table fall in Punjab, Haryana and western Uttar Pradesh. (2) Economic inequality: its benefits went mainly to the bigger farmers of well-irrigated regions, so regional and social differences increased." },
        ],
      },
      {
        n: "19", type: "MAP", marks: 3, ch: "Geography Ch 3 & 1", topic: "Map work — Dams and soil regions",
        q: "Three items are given below. Locate and label them on the outline map of India.\n(i) Tehri Dam\n(ii) Hirakud Dam\n(iii) An area of black soil",
        ans: "(i) Tehri Dam — Uttarakhand, on the Bhagirathi, in the northern part of India.\n(ii) Hirakud Dam — Odisha, on the Mahanadi, in the eastern part of India.\n(iii) Black soil — the Deccan trap region of Maharashtra (also Gujarat and Madhya Pradesh), in the western-central part of India.",
      },
    ],
  },

  /* ============================ SECTION C — POLITICAL SCIENCE ============================ */
  {
    key: "C",
    label: "Section C — Political Science (20 Marks)",
    subject: "Political Science",
    marks: 20,
    blurb: "Ch 1 Power Sharing, Ch 2 Federalism, Ch 3 Gender, Religion and Caste. 4 MCQ, 2 Very Short, 1 Short, 1 Long and 1 Case-based. No map work.",
    qs: [
      {
        n: "20", type: "MCQ", marks: 1, ch: "Political Science Ch 1", topic: "Power sharing in Belgium",
        q: "In Belgium, the percentage of the French-speaking community is about",
        opts: ["20 per cent", "40 per cent", "59 per cent", "74 per cent"],
        ans: "(b) 40 per cent — 59 per cent speak Dutch in the Flemish region and 40 per cent speak French in Wallonia.",
      },
      {
        n: "21", type: "MCQ", marks: 1, ch: "Political Science Ch 2", topic: "Union, State and Concurrent Lists",
        q: "Which one of the following subjects is included in the State List?",
        opts: ["Defence", "Police", "Banking", "Currency"],
        ans: "(b) Police — subjects of local importance such as police, agriculture and irrigation are in the State List.",
      },
      {
        n: "22", type: "MCQ", marks: 1, ch: "Political Science Ch 3", topic: "Gender and politics — literacy",
        q: "The literacy rate of women in India, compared to that of men, is",
        opts: ["about 54 per cent as against 76 per cent for men", "about 76 per cent as against 54 per cent for men", "equal to that of men", "about 40 per cent as against 60 per cent for men"],
        ans: "(a) About 54 per cent as against 76 per cent for men — this gap is one of the main reasons for gender inequality in India.",
      },
      {
        n: "23", type: "MCQ", marks: 1, ch: "Political Science Ch 3", topic: "Secular state",
        q: "Which one of the following is NOT a feature of a secular state?",
        opts: ["The State does not have an official religion of its own", "The Constitution gives every citizen the freedom to profess and practise any religion", "The State can discriminate among citizens on the basis of religion", "The State can intervene in religion to ensure equality within a religious community"],
        ans: "(c) The State can discriminate among citizens on the basis of religion — a secular state never discriminates on religious grounds.",
      },
      {
        n: "24", type: "VSA", marks: 2, ch: "Political Science Ch 1", topic: "Majoritarianism in Sri Lanka",
        q: "What is majoritarianism? Give two examples of majoritarian measures adopted in Sri Lanka after 1948.",
        ans: "Majoritarianism is the belief that the majority community should rule the country in the way it wants, ignoring the minority.\nTwo examples: (1) In 1956 an Act made Sinhala the only official language, disregarding Tamil. (2) Preferential policies favoured Sinhala applicants in university seats and government jobs, and the constitution gave special protection to Buddhism.",
      },
      {
        n: "25", type: "VSA", marks: 2, ch: "Political Science Ch 2", topic: "Federalism — residuary powers",
        q: "What are residuary powers? Who exercises them in India?",
        ans: "(1) Subjects that are not mentioned in any of the three lists — the Union List, the State List and the Concurrent List — are called residuary subjects, and the power to make laws on them is residuary power. (2) In India the Union (Central) government exercises it — for example, computer software, which came up after the Constitution was written.",
      },
      {
        n: "26", type: "SA", marks: 3, ch: "Political Science Ch 3", topic: "Communalism in politics",
        q: "In how many ways can communalism take place in politics? Explain.",
        ans: "Communalism takes place in politics in four ways:\n(1) In everyday beliefs — the belief that one's own religion is superior and prejudice against other communities. (2) In the desire to form a political community of one religion, which leads to demands for a separate nation and to conflict. (3) In political dominance — the wish of one religious group to dominate others politically, which causes riots and violence. (4) In political mobilisation — using religious symbols, leaders, rituals and emotional appeals to gather votes.",
      },
      {
        n: "27(a)", type: "LA", marks: 5, ch: "Political Science Ch 1", topic: "Forms of power sharing",
        q: "Explain the different forms of power sharing in modern democracies, giving one example of each.",
        ans: "(1) Horizontal distribution — power is shared among the legislature, the executive and the judiciary, placed at the same level, so that each can check the others; e.g. the courts can check the decisions of the Council of Ministers. (2) Vertical distribution — power is shared among the Union, the state and the local governments; e.g. the three-tier system in India. (3) Among social groups — power is shared among religious and linguistic groups and weaker sections through legal arrangements; e.g. the community government in Belgium and reserved seats for SCs, STs and women in India. (4) Among political parties, pressure groups and movements — parties share power directly in a coalition government, and interest groups like traders' and farmers' organisations influence decisions. Thus power sharing is the very spirit of democracy.",
        alt: {
          ch: "Political Science Ch 2", topic: "Decentralisation in India — 1992 amendment",
          q: "How has decentralisation strengthened democracy in India? Describe the major steps taken in 1992.",
          ans: "Decentralisation means taking power from the Centre and the states and giving it to the local bodies, because local problems are best solved by local people.\nMajor steps of 1992: (1) It was made mandatory to hold regular elections to local bodies. (2) Seats were reserved for the Scheduled Castes, Scheduled Tribes and Other Backward Classes. (3) At least one-third of all positions were reserved for women. (4) An independent State Election Commission was set up in each state. (5) The states were required to share some powers and revenue with the local bodies.\nIt has strengthened democracy because the panchayati raj and the municipal bodies have brought governance closest to the people and given women and weaker sections a share in decision-making.",
        },
      },
      {
        n: "28", type: "CASE", marks: 4, ch: "Political Science Ch 3", topic: "Caste in politics and politics in caste",
        q: "Read the extract given below and answer the questions that follow.",
        extract:
          "The caste system was the basis of the division of labour and social hierarchy in Indian society. In the last fifty years, the role of caste in politics has changed. No parliamentary constituency in India has a clear majority of one single caste. So every candidate and party needs the confidence of more than one caste or community to win the election. That is why, when parties choose candidates in elections, they keep in mind the caste composition of the electorate.",
        subs: [
          { q: "What is meant by the caste system?", marks: 1, a: "A system of social division in which society was divided into castes on the basis of birth and occupation, with a fixed hierarchy of superior and inferior castes" },
          { q: "Why does no party win the votes of all the voters belonging to one caste?", marks: 1, a: "Because no constituency has a clear majority of one caste, and people of the same caste do not vote as one block — the rich and the poor of the same caste have different interests." },
          { q: "In what ways does politics influence caste in India? Give any two.", marks: 2, a: "(1) Each caste group tries to become bigger by including neighbouring castes and sub-castes — many backward castes have demanded to be included in the OBC list. (2) Caste groups enter into coalitions with other castes to gain power, and politics has also strengthened the identity of the lower castes, who now use the democratic process to demand their share." },
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
    blurb: "Ch 1 Development, Ch 2 Sectors of the Indian Economy. 6 MCQ, THREE Short Answers (9 marks) and 1 Long Answer — no Very Short, no case study, no map.",
    qs: [
      {
        n: "29", type: "MCQ", marks: 1, ch: "Economics Ch 1", topic: "Comparing countries — Human Development Report",
        q: "The Human Development Report published by UNDP compares countries on the basis of",
        opts: ["per capita income only", "the health status of the people only", "the educational levels of the people, their health status and per capita income", "the size of the population only"],
        ans: "(c) The educational levels, the health status and the per capita income — these three together form the Human Development Index.",
      },
      {
        n: "30", type: "MCQ", marks: 1, ch: "Economics Ch 1", topic: "Public facilities",
        q: "Which one of the following is an example of a public facility?",
        opts: ["A shopping mall run by a private company", "A government-run ration shop under the PDS", "A mobile phone showroom", "A private tuition centre"],
        ans: "(b) A government-run ration shop under the PDS — public facilities are provided by the government for all, as private firms will not provide them at a price the poor can pay.",
      },
      {
        n: "31", type: "MCQ", marks: 1, ch: "Economics Ch 1", topic: "Income and other goals",
        q: "Which one of the following is a non-material goal of development?",
        opts: ["A higher income every year", "The dignity of equal treatment of girls and boys in the family", "A bigger house in the city", "A better paid job"],
        ans: "(b) The dignity of equal treatment of girls and boys — equal treatment, freedom, security and respect are non-material goals of development.",
      },
      {
        n: "32", type: "MCQ", marks: 1, ch: "Economics Ch 2", topic: "Comparing the three sectors",
        q: "Which sector has emerged as the largest producer of the gross domestic product (GDP) in India?",
        opts: ["Primary sector", "Secondary sector", "Tertiary sector", "All the three are equal"],
        ans: "(c) Tertiary sector — it is the largest producer of GDP, though the primary sector still employs the most people.",
      },
      {
        n: "33", type: "MCQ", marks: 1, ch: "Economics Ch 2", topic: "Creating more employment — MGNREGA",
        q: "MGNREGA, 2005, guarantees how many days of employment in a year to a rural household?",
        opts: ["90 days", "100 days", "120 days", "150 days"],
        ans: "(b) 100 days — and if the government fails to provide work it must pay an unemployment allowance.",
      },
      {
        n: "34", type: "MCQ", marks: 1, ch: "Economics Ch 2", topic: "Public and private sector",
        q: "Which one of the following is an example of a public sector enterprise?",
        opts: ["Tata Steel", "Indian Railways", "Reliance Industries", "Maruti Suzuki"],
        ans: "(b) Indian Railways — in the public sector the government owns the assets and provides the services.",
      },
      {
        n: "35", type: "SA", marks: 3, ch: "Economics Ch 1", topic: "Different people, different goals",
        q: "Different persons can have different developmental goals. Explain with examples.",
        ans: "(1) A landless labourer wants more work, better wages and schools for his children, while a prosperous farmer of the same village wants a higher support price and cheap labour — higher wages are development for one but a higher cost for the other. (2) An industrialist wants more electricity and dams, but the people displaced by those dams want rehabilitation and compensation. (3) Goals may also be non-material — equal treatment, freedom and respect, as when a girl wants the same freedom in education as her brother. Thus what is development for one may be a loss for another.",
      },
      {
        n: "36", type: "SA", marks: 3, ch: "Economics Ch 2", topic: "Disguised unemployment",
        q: "What is disguised unemployment? Explain with an example.",
        ans: "(1) Disguised unemployment is a situation in which more people work on a job than are actually needed, so that if some of them are removed the total output does not fall — the extra workers only appear to be employed. (2) Example: a farm of two hectares needs only three workers, but five members of a family work on it because there is no other work in the village; even if two of them leave, the production does not come down. (3) It is found mostly in Indian agriculture and is also called underemployment.",
      },
      {
        n: "37", type: "SA", marks: 3, ch: "Economics Ch 2", topic: "Rising importance of the tertiary sector",
        q: "Why is the tertiary sector becoming so important in India? Give any three reasons.",
        ans: "(1) Basic services — hospitals, schools, post offices, banks, police and defence are needed by everyone, so the government provides them and the sector grows. (2) Development of agriculture and industry — the more the other two sectors produce, the greater the demand for transport, storage, trade, banking and insurance. (3) Rising income and new services — rising incomes increase the demand for tourism, private hospitals and schools, and IT-based services like call centres and software companies have grown fast. So the tertiary sector is now India's largest producer of GDP.",
      },
      {
        n: "38(a)", type: "LA", marks: 5, ch: "Economics Ch 1", topic: "Sustainability and development",
        q: "What is meant by sustainable development? Why is the issue of sustainability important for development? Explain with examples.",
        ans: "Sustainable development means development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs — that is, using resources carefully so that they last.\nIt is important because: (1) many resources are non-renewable and exist in a limited stock — crude oil will last only about fifty years at the present rate of use. (2) Even renewable resources can be exhausted by overuse — the groundwater table has fallen in Maharashtra, Rajasthan and Punjab because of over-irrigation. (3) Damage to the environment, such as deforestation and pollution, harms the health and livelihood of the people, and the poor suffer the most as they depend directly on natural resources. (4) Resources are unequally distributed, so sustainability also means sharing benefits fairly. (5) If we use resources thoughtlessly today, the coming generations will get empty wells and saline land, so development can continue in the long run only if it is sustainable.",
        alt: {
          ch: "Economics Ch 2", topic: "Organised and unorganised sector",
          q: "Explain the difference between the organised and the unorganised sector. Why do workers in the unorganised sector need protection?",
          ans: "Organised sector: (1) registered with the government and follows rules like the Minimum Wages Act; (2) jobs are secure and the terms of employment are given in writing; (3) fixed working hours, paid overtime and benefits like provident fund, gratuity and paid leave; (4) a regular monthly salary, e.g. a bank employee.\nUnorganised sector: (1) small, scattered units outside the government's control; (2) low-paid and irregular jobs with no security; (3) no fixed hours, leave or pension; (4) the worker is often exploited, e.g. agricultural labourers and street vendors.\nProtection is needed because more than half of India's workers are in the unorganised sector and face low wages, insecurity and exploitation. The government can protect them by enforcing minimum wages, giving cheap credit and social security and organising them into cooperatives and self-help groups; MGNREGA is one such step.",
        },
      },
    ],
  },
];
