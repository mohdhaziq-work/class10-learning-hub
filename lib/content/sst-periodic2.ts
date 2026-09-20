/* SK Presidency Public School — II Periodic Exam 2026-27, Class 10 Social Science
   (Time 1 Hour, M.M. 15). Verbatim transcription of the school paper with the
   correct option / full-marks model answer for every question, NCERT-aligned.

   Section marks as printed: A, B, C, D each carry 3.75 marks; map questions
   carry 1.5 marks in total (Q7 = 1 mark, Q14 = 0.5 mark).
   Portion: History — Nationalism in India / Nationalism in Europe;
   Geography — Resources & Development, Forest & Wildlife Resources;
   Polity — Federalism, Power Sharing; Economics — Development, Sectors. */

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
  caution?: string; /* the trap in this question - where most students slip */
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
    blurb:
      "Chronology of Gandhian movements, the Congress of Vienna, the Swaraj Party, the Rowlatt Act, Champaran, causes of Non-Cooperation and map work (Dandi, Amritsar).",
    qs: [
      {
        n: "1",
        ch: "History Ch 2",
        topic: "Chronological order of Gandhian movements",
        q: "Arrange the following in chronological order: I. Salt Satyagraha  II. Kheda Satyagraha  III. Rowlatt Satyagraha  IV. Ahmedabad Mill Workers Satyagraha.",
        opts: ["II, I, III, IV", "II, IV, III, I", "III, II, IV, I", "II, I, IV, III"],
        correct: "b",
        marks: 0.25,
        ans: "(b) II, IV, III, I — Kheda Satyagraha (1918) → Ahmedabad Mill Workers Satyagraha (1918) → Rowlatt Satyagraha (1919) → Salt Satyagraha (1930). Both Kheda and Ahmedabad were in 1918, but Ahmedabad came first in the year, so it is placed before Rowlatt; the Salt Satyagraha of 1930 is the last of the four.",
        caution:
          "Kheda (1918), Ahmedabad (1918), Champaran (1917) — the three early satyagrahas are easy to mix up. Order: Champaran 1917, Ahmedabad Feb–Mar 1918, Kheda Mar 1918, Rowlatt 1919, Salt 1930.",
      },
      {
        n: "2",
        ch: "History Ch 1",
        topic: "Congress of Vienna, 1815",
        q: "Who hosted the Vienna Congress in 1815?",
        opts: ["Duke Metternich", "Ernst Renan", "William I", "Otto von Bismarck"],
        correct: "a",
        marks: 0.25,
        ans: "(a) Duke Metternich — the Austrian Chancellor Klemens von Metternich hosted the Congress of Vienna in 1815, where the conservative powers met to restore the monarchies and the old order that had been destroyed by Napoleon. (Ernst Renan was a French philosopher who defined a nation as a 'daily plebiscite'; William I was the Prussian king proclaimed German Emperor in 1871; Bismarck was the architect of German unification.)",
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
        ans: "(a) C.R. Das and Motilal Nehru — after the Non-Cooperation Movement was withdrawn in 1922, they formed the Swaraj Party in 1923 to enter the legislative councils and oppose British rule from within. They argued that the councils should be used to obstruct the working of the government instead of boycotting them.",
      },
      {
        n: "4",
        ch: "History Ch 2",
        topic: "The Rowlatt Act, 1919",
        q: "What was the Rowlatt Act, 1919?",
        marks: 0.5,
        ans: "The Rowlatt Act was passed in March 1919 by the Imperial Legislative Council, though the Indian members unitedly opposed it. It gave the government enormous powers of repression: it allowed the detention of political prisoners without trial for two years, and the police could arrest and search any place on mere suspicion. Gandhiji called it a 'Black Act' and launched a nationwide satyagraha against it in April 1919 — that satyagraha led to the Jallianwala Bagh massacre and the events that followed.",
      },
      {
        n: "5",
        ch: "History Ch 2",
        topic: "Champaran, 1917",
        q: "Why did Mahatma Gandhi travel to Champaran in 1917?",
        marks: 0.5,
        ans: "In 1917 Gandhiji travelled to Champaran in Bihar to see the situation of the peasants who were forced to grow indigo on part of their land (the tinkathia system) and sell it to the planters at very low prices, under the oppressive plantation system. He inspired the peasants to struggle against it and their movement succeeded in getting the peasants relief and freedom from the obligation to grow indigo. Champaran is remembered as the first successful civil disobedience movement of Gandhiji in India.",
      },
      {
        n: "6",
        ch: "History Ch 2",
        topic: "Causes of the Non-Cooperation Movement",
        q: "Describe any three causes of the Non-Cooperation Movement.",
        marks: 1,
        ans: "Three causes:\n(1) The First World War and its hardships — the war increased defence expenditure, taxes and customs duties; prices nearly doubled between 1913 and 1918, forced recruitment in the villages caused great hardship, and crop failure with the influenza epidemic killed 12 to 13 million people. This anger brought nationalist feeling into the villages.\n(2) The Rowlatt Act of 1919 and the Jallianwala Bagh massacre — the Act allowed detention of political prisoners without trial for two years, and the massacre at Amritsar on 13 April 1919 showed the most brutal face of British rule; the brutality convinced Gandhiji that the British would not concede anything without a mass movement.\n(3) The Khilafat issue and the need for Hindu-Muslim unity — the British were humiliating the Ottoman Khalifa, the spiritual head of the Islamic world; Gandhiji merged the Khilafat movement of Muhammad Ali and Shaukat Ali with the national movement in 1920, so that both communities could fight together and the movement could become truly national.\n(Also acceptable: Gandhiji's belief that British rule survived because Indians cooperated with it, so withdrawal of cooperation would collapse it; and the failure of the 1919 reforms under the Montagu-Chelmsford Act, which gave only limited franchise.)",
      },
      {
        n: "7",
        ch: "History Ch 2",
        topic: "Map work — Nationalism in India",
        q: "On the outline map of India locate: (A) Dandi (B) Amritsar.",
        marks: 1,
        map: true,
        ans: "(A) Dandi — on the sea coast of Gujarat, in the south of Gujarat near Navsari (Surat district), on the western coast. It is where Gandhiji broke the salt law on 6 April 1930 by making salt from sea water.\n(B) Amritsar — in Punjab, in the north-western part of India, very close to the border with Pakistan. It is the place of the Jallianwala Bagh incident of 13 April 1919.",
        caution:
          "Mark only the places asked. Dandi is on the Gujarat coast in the WEST (not the Bay of Bengal side); Amritsar is in north-west Punjab, right at the border.",
      },
    ],
  },

  /* ============================ SECTION B — GEOGRAPHY ============================ */
  {
    label: "Section B — Geography (3.75 marks)",
    subject: "Geography",
    marks: 3.75,
    blurb:
      "Permanent forests, the Wildlife Protection Act, laterite soil, conservation measures, biodiversity, categories of forests and map work (Corbett National Park).",
    qs: [
      {
        n: "8",
        ch: "Geography Ch 2",
        topic: "Reserved and protected forests — permanent forest estates",
        q: "Which state has the largest area under Permanent Forests?",
        opts: ["Haryana", "Himachal Pradesh", "Punjab", "Madhya Pradesh"],
        correct: "d",
        marks: 0.25,
        ans: "(d) Madhya Pradesh — reserved and protected forests are called permanent forest estates, and as per the NCERT text Madhya Pradesh has the largest area under permanent forests, which forms about 75 per cent of its total forest area, followed by Andhra Pradesh.",
        caution:
          "The most common mistake is to tick Himachal Pradesh because of its forests, but the question asks about the area under PERMANENT (reserved + protected) forests — that is Madhya Pradesh, not HP.",
      },
      {
        n: "9",
        ch: "Geography Ch 2",
        topic: "Wildlife Protection Act",
        q: "Wildlife Protection Act was implemented in:",
        opts: ["1972", "1978", "1980", "1985"],
        correct: "a",
        marks: 0.25,
        ans: "(a) 1972 — the Indian Wildlife (Protection) Act was passed in 1972, and it was under this Act that Project Tiger was launched in 1973. It is the legal base of all wildlife conservation in India: it bans hunting, poaching and trade in protected species, and provides for national parks and sanctuaries.",
      },
      {
        n: "10",
        ch: "Geography Ch 1",
        topic: "Laterite soil",
        q: "Which soil develops in areas of high temperature and heavy rainfall?",
        opts: ["Red & Yellow", "Black", "Alluvial", "Laterite"],
        correct: "d",
        marks: 0.25,
        ans: "(d) Laterite soil — it develops in areas of high temperature and heavy rainfall, because intense leaching washes away the nutrients (especially in the monsoon), leaving behind iron and aluminium oxides which give the soil its red colour. It is found in Karnataka, Kerala, Tamil Nadu and the hill areas of the north-east, is poor in fertility, and is suitable for tea and coffee; it is also used to make bricks.",
      },
      {
        n: "11",
        ch: "Geography Ch 2",
        topic: "Conservation of forests",
        q: "Suggest any two measures for conservation of forests.",
        marks: 0.5,
        ans: "Any two: (1) Afforestation and social forestry — planting trees on a large scale, especially on degraded land and along roads and canals, and involving local communities in the work. (2) Controlled and regulated grazing with rotational grazing so that young saplings are not destroyed, and providing fodder and fuelwood in the villages so that people do not cut the forests. (Other acceptable measures: checking deforestation caused by mining, building roads and big projects; joint forest management with village committees; shelter belts and planting of thorny bushes to check desertification; strict enforcement of forest laws and the Wildlife Protection Act.)",
      },
      {
        n: "12",
        ch: "Geography Ch 2",
        topic: "Biodiversity",
        q: "What is biodiversity?",
        marks: 0.5,
        ans: "Biodiversity means the variety and variability of all living organisms — plants, animals and micro-organisms — existing in a given area or ecosystem, along with the ecological complexes of which they are a part. It includes the diversity of species, of genes within a species, and of ecosystems. India is one of the world's richest countries in biodiversity, with nearly 8 per cent of all the species of the world.",
      },
      {
        n: "13",
        ch: "Geography Ch 2",
        topic: "Categories of forests in India",
        q: "Into how many categories are forests classified in India? Explain each of them.",
        marks: 1.5,
        ans: "Forests in India are classified into THREE categories — (1) Reserved forests, (2) Protected forests and (3) Unclassed forests:\n(1) Reserved forests — declared by the government as permanent forest estates, they are the most valuable for the conservation of forest and wildlife resources. Both the trees and the animals in them are protected from any further depletion, and grazing and other uses are strictly regulated. More than half of the total forest land of India is reserved forest.\n(2) Protected forests — these are also considered permanent forest estates and are protected from any further depletion, but limited use is allowed to the local people, such as grazing of cattle and collection of fuelwood and minor forest produce. They are found in Andhra Pradesh, Rajasthan, parts of the north-east and the Western Ghats.\n(3) Unclassed forests — these consist of forests and wastelands belonging to both the government and private individuals and communities, and the rules for their use are the least strict. Most of the unclassed forests are found in the north-eastern states and parts of Gujarat, and much of them are managed and protected by the local communities.",
      },
      {
        n: "14",
        ch: "Geography Ch 2",
        topic: "Map work — Corbett National Park",
        q: "Locate and label Corbett National Park on the map.",
        marks: 0.5,
        map: true,
        ans: "Corbett National Park is in Uttarakhand — in the Nainital district, at the foothills of the Himalayas in the northern part of India (in the Terai region, near Ramnagar). It is India's first national park (established in 1936 as Hailey National Park, renamed Corbett in 1957 in memory of Jim Corbett) and it became the first tiger reserve when Project Tiger was launched in 1973.",
        caution:
          "Mark Corbett in the NORTH of India — Uttarakhand (foothills, Terai region) — and not in Madhya Pradesh or West Bengal.",
      },
    ],
  },

  /* ============================ SECTION C — POLITICAL SCIENCE ============================ */
  {
    label: "Section C — Political Science (3.75 marks)",
    subject: "Political Science",
    marks: 3.75,
    blurb:
      "Matching of levels of government with their heads, the official language of Sri Lanka, the Union List, the Concurrent List, types of federalism, the three legislative lists and features of federalism.",
    qs: [
      {
        n: "15",
        ch: "Political Science Ch 2",
        topic: "Levels of government and their heads",
        q: "Match List I with List II.\nList I: 1. Union Government 2. State Government 3. Municipal Corporation 4. Gram Panchayat\nList II: A. Prime Minister B. Governor C. Mayor D. Sarpanch",
        opts: ["A B C D", "B A D C", "A C D B", "D C B A"],
        correct: "a",
        marks: 0.25,
        ans: "(a) A B C D — Union Government → Prime Minister (A); State Government → Governor (B); Municipal Corporation → Mayor (C); Gram Panchayat → Sarpanch (D). This matching shows the vertical division of power: the Union, the state and the local bodies each have their own head, which is why local government is the third tier of Indian democracy.",
      },
      {
        n: "16",
        ch: "Political Science Ch 1",
        topic: "Majoritarianism in Sri Lanka",
        q: "Which language was declared the official language of Sri Lanka in 1956?",
        opts: ["Tamil", "Sinhala", "Hindi", "English"],
        correct: "b",
        marks: 0.25,
        ans: "(b) Sinhala — in 1956, an Act was passed in Sri Lanka to recognise Sinhala as the only official language, disregarding Tamil. Sinhala was the language of the majority community (about 74 per cent), so this was a majoritarian measure: it alienated the Sri Lankan Tamils, who were 13 per cent and lived mainly in the north and east. Along with preferential policies in jobs and education and the state protection of Buddhism, this led the country into a civil war.",
        caution:
          "Hindi is the official language of India, not of Sri Lanka. In Sri Lanka the majority Sinhala language was made the only official language in 1956 — that is exactly what caused the conflict.",
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
        ans: "(d) Currency, Communication, Defence — these are subjects of national importance and therefore fall in the Union List, on which only the Union government can make laws. Defence, foreign affairs, banking, communications and currency are the main Union List subjects.\nThe other options mix up the lists: police, agriculture and irrigation belong to the State List; education, marriage and trade are in the Concurrent List (education and marriage are in the Concurrent List, trade is in the State List).",
      },
      {
        n: "18",
        ch: "Political Science Ch 2",
        topic: "Concurrent List",
        q: "Name any two subjects included in the Concurrent List.",
        marks: 0.5,
        ans: "Any two: education, forest, marriage, adoption, succession, criminal law, trade unions, population control and family planning, electricity, newspapers and books. The Concurrent List contains subjects of common interest to both the Union and the state governments, and both can make laws on them — but if the laws conflict, the law made by the Union government prevails.",
      },
      {
        n: "19",
        ch: "Political Science Ch 2",
        topic: "Types of federalism",
        q: "Write the types of Federalism with one example of each.",
        marks: 0.5,
        ans: "There are two types:\n(1) 'Coming together' federation — in this type independent states come together on their own to form a bigger unit, so that by pooling their sovereignty and retaining their identity they can increase their security. All the constituent states usually have equal powers and are strong vis-a-vis the central government. Example: the USA, Australia, Switzerland.\n(2) 'Holding together' federation — in this type a large country divides its power between the constituent states and the national government, so the central government tends to be more powerful and the states may have unequal powers. Example: India, Spain and Belgium.",
      },
      {
        n: "20",
        ch: "Political Science Ch 2",
        topic: "Three legislative lists",
        q: "Explain the three legislative lists of India.",
        marks: 1,
        ans: "The Constitution of India divides the subjects of legislation between the Union and the states through three lists:\n(1) Union List — it includes subjects of national importance such as defence, foreign affairs, banking, communications and currency. Only the Union government can make laws on these subjects, because a uniform policy is needed for the whole country.\n(2) State List — it includes subjects of state and local importance such as police, trade, commerce, agriculture and irrigation. Only the state governments can make laws on these subjects, because they need local knowledge and local solutions.\n(3) Concurrent List — it includes subjects of common interest to both the Union and the states, such as education, forest, marriage, adoption and succession. Both the Union and the state governments can make laws on these subjects, but if there is a conflict between the two laws, the law made by the Union government prevails.\nSubjects which do not figure in any of the three lists — such as computer software — are called residuary subjects, and the Union government has the power to make laws on them.",
      },
      {
        n: "21",
        ch: "Political Science Ch 2",
        topic: "Features of federalism",
        q: "Describe any two features of Federalism.",
        marks: 1,
        ans: "Any two of the following:\n(1) There are two or more levels (tiers) of government — the Union government for the whole country, the state governments for its units and the local bodies below them. Different tiers govern the same citizens, but each tier has its own jurisdiction in matters of legislation, taxation and administration, clearly laid down by the Constitution.\n(2) The existence and authority of each tier are constitutionally guaranteed — no level can abolish or change the powers of another unilaterally; the Constitution can be amended in the federal provisions only with the consent of both the Union and a majority of the states, and disputes between the Centre and the states are settled by the Supreme Court.\n(3) Sources of revenue for each level are clearly specified — the Union gets revenue from income tax, corporation tax and customs, the states from land revenue and other taxes, and the Union shares its revenue with the states to make them financially autonomous.\n(4) The fundamental provisions of the Constitution cannot be changed by one level alone — for that a special majority in both Houses of Parliament and the ratification of at least half of the states is required. (In India, which is a 'holding together' federation, the Union government is more powerful, and some states like Nagaland and Assam have special provisions.)",
      },
    ],
  },

  /* ============================ SECTION D — ECONOMICS ============================ */
  {
    label: "Section D — Economics (3.75 marks)",
    subject: "Economics",
    marks: 3.75,
    blurb:
      "Basis of the three sectors, the World Development Report, the largest sector in India's GDP, rural employment, the manufacturing sector, public vs private sector and the role of the public sector.",
    qs: [
      {
        n: "22",
        ch: "Economics Ch 2",
        topic: "Classification of the three sectors",
        q: "Primary, Secondary and Tertiary sectors are divided on the basis of:",
        opts: ["Nature of employment", "Nature of activities", "Nature of ownership", "Nature of income"],
        correct: "b",
        marks: 0.25,
        ans: "(b) Nature of activities — the three sectors are classified by the nature of the economic activity: the primary sector produces goods by exploiting natural resources (agriculture, mining), the secondary sector changes natural products into other forms through manufacturing (sugar from sugarcane), and the tertiary sector provides services that support the other two (transport, banking, trade, education).\nNote: classification by the nature of ownership gives us the public and private sectors, which is a different basis altogether.",
      },
      {
        n: "23",
        ch: "Economics Ch 1",
        topic: "World Development Report",
        q: "World Bank Development Report is prepared on the basis of:",
        opts: ["Per Capita Income", "Health Services", "Literacy", "Freedom"],
        correct: "a",
        marks: 0.25,
        ans: "(a) Per Capita Income — the World Bank's World Development Report classifies countries as high-income, middle-income and low-income countries on the basis of their per-capita income (average income), because it allows a comparison between countries with different populations.\nNote: the Human Development Report of the UNDP uses income together with the health status and educational levels of the people; but the World Bank's report uses per-capita income alone.",
        caution:
          "Two different reports, two different bases: World Bank → per-capita income only; UNDP Human Development Report → income + health + education (HDI). Read the question carefully.",
      },
      {
        n: "24",
        ch: "Economics Ch 2",
        topic: "Sector contributing the highest to GDP",
        q: "Which sector contributes the highest to India's GDP?",
        opts: ["Primary", "Secondary", "Tertiary", "Quaternary"],
        correct: "c",
        marks: 0.25,
        ans: "(c) Tertiary — since around 2010-11 the tertiary or service sector has been the largest producing sector of India's GDP, and it has replaced the primary sector in that position. But the primary sector still employs the largest number of people — this gap between production and employment is the biggest problem of the Indian economy, and it exists because of underemployment (disguised unemployment) in agriculture.",
        caution:
          "Do not confuse highest GDP share with highest employment. GDP → Tertiary; Employment → Primary. Also, quaternary is not a sector in the NCERT discussion.",
      },
      {
        n: "25",
        ch: "Economics Ch 2",
        topic: "Creating more employment in rural areas",
        q: "Suggest any two ways to create more employment in rural areas.",
        marks: 0.5,
        ans: "Any two: (1) Provide assured employment through schemes like MGNREGA, 2005, which guarantees 100 days of employment in a year to rural households willing to do unskilled manual work, and pays an unemployment allowance if work is not provided. (2) Develop irrigation facilities — building canals, wells, tanks and check-dams — so that farmers can grow a second crop, which increases the demand for labour; along with this, provide cheap agricultural credit and marketing facilities. (Other acceptable measures: set up agro-based industries such as dal mills, cold storages and food processing units; promote dairy, poultry, fishing and horticulture; improve rural roads, schools, hospitals and tourism, since these create new jobs; and give cheap loans to small businesses and self-help groups so that villagers can start their own work.)",
      },
      {
        n: "26",
        ch: "Economics Ch 2",
        topic: "Why the secondary sector is the manufacturing sector",
        q: "Why is the Secondary Sector called the Manufacturing Sector?",
        marks: 0.5,
        ans: "The secondary sector is called the manufacturing sector because in this sector natural products are changed into other forms through ways of manufacturing that we associate with industrial activity — the product has to be made in a factory, by processing the raw material obtained from the primary sector. For example, cotton is changed into cloth in a textile mill, sugarcane is changed into sugar and jaggery in a sugar mill, and iron ore is changed into steel. Because all these activities are manufacturing activities, the secondary sector is also called the industrial or manufacturing sector.",
      },
      {
        n: "27",
        ch: "Economics Ch 2",
        topic: "Public vs private sector",
        q: "Write any two differences between the Public and Private Sector.",
        marks: 1,
        ans: "Differences between the public and the private sector:\n(1) Ownership — in the public sector the government owns most of the assets and provides all the services, while in the private sector the ownership of assets and the delivery of services is in the hands of private individuals or companies.\n(2) Main purpose — the main purpose of the public sector is public welfare and not profit; it provides services even in those places where the cost is high or the profit is low (like railways in remote areas, schools and hospitals in villages). The main purpose of the private sector is to earn profit, so it works only where it can earn money.\n(3) Source of income and security — the public sector pays fixed wages to its employees along with benefits like pension and provident fund and gives job security, while the private sector pays according to its own rules and the employees there may not get the same social security benefits. (Example: Indian Railways and post offices are public sector; Tata Steel, Reliance and Maruti Suzuki are private sector.)",
      },
      {
        n: "28",
        ch: "Economics Ch 2",
        topic: "Role of the public sector",
        q: "Examine the role of the Public Sector in development and well-being of a country.",
        marks: 1,
        ans: "The public sector plays a very important role in the development and well-being of a country:\n(1) Basic facilities for all — there are many things needed by society as a whole which the private sector will not provide at a reasonable cost, such as roads, railways, bridges, ports, electricity, water supply, schools, hospitals and irrigation; the government provides these because they are essential for everyone, and without them neither agriculture nor industry can develop.\n(2) Poor people in remote areas — the government has to provide services and goods in the areas which are not profitable for private companies, so that the poor living in villages and remote regions also get education, health care, water and transport.\n(3) Large investments and heavy industry — the public sector invests in projects which need a huge amount of money and take a long time to show results, such as steel plants, dams, power projects and defence production, which private companies may not take up on their own.\n(4) Employment and balanced development — the public sector creates a large number of jobs and helps in the development of backward regions, reducing regional inequality and ensuring that the country's resources are used for the benefit of all rather than for private profit.\n(5) Protection of the poor and of the environment — schemes like the Public Distribution System, MGNREGA, government hospitals and schools protect the poor from hunger and exploitation, and public action controls pollution and the misuse of natural resources. Thus the public sector is the base on which the well-being of the common people and the balanced development of the country rest.",
      },
    ],
  },
];
