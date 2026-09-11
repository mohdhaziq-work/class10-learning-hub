/* SST — History: India and the Contemporary World II (jess3), chapters 1, 3, 5
   (ch.2 Nationalism in India and ch.4 Age of Industrialisation live in builtin). Keys: sst-0-x. */
import type { ChapterDetail } from "./types";

export const SST_HISTORY: Record<string, ChapterDetail> = {

"sst-0-0": {
  slides: [
    { kicker: "History Ch.1", title: "The Rise of Nationalism in Europe",
      points: ["1789 French Revolution: the first clear expression of nationalism — la patrie (the fatherland) and le citoyen (the citizen)", "Napoleonic Code (1804): equality before law, property rights, no birth privileges — exported to Europe", "Congress of Vienna (1815): conservative kings restored, but new ideas could not be unlearnt"], formula: "Nation = people with common history + culture + destiny" },
    { kicker: "1848", title: "Revolutions, Romance and Unification",
      points: ["1848: revolutions of the poor + educated middle class (Frankfurt Parliament — all men, women excluded)", "Romanticism (Herder): true culture in folk poetry, songs — language created national feeling", "Italy unified 1861–70: Mazzini (soul) + Cavour (diplomacy) + Garibaldi (Red Shirts) + Victor Emmanuel II"], formula: "Italy: Mazzini + Cavour + Garibaldi" },
    { kicker: "1871", title: "Germany, Britain and the Road to WWI",
      points: ["Bismarck's Prussia: 3 wars — Denmark 1864, Austria 1866, France 1870–71 → Kaiser Wilhelm I crowned at Versailles (1871)", "Britain: English dominance built a 'united' kingdom — Britannia the symbol", "Balkans: disintegrating Ottoman Empire + rivalry = the powder keg that ignited WWI (1914)"], formula: "Nationalism + imperial competition → WWI" },
    { kicker: "Symbols", title: "Visualising the Nation",
      points: ["France = Marianne (red cap, tricolour); Germany = Germania (crown of oak leaves)", "During French Revolution, artists personified the nation as a woman", "Allegories turned abstract 'nation' into something people could love and die for"], formula: "Allegory = nation as a mother figure" },
  ],
  timeline: [
    { y: "1789", t: "French Revolution — nationalism's first great expression" },
    { y: "1804", t: "Napoleonic Code — equality before law across Europe" },
    { y: "1815", t: "Congress of Vienna restores conservative regimes" },
    { y: "1830–32", t: "July Revolution; Greece independent (1832 Treaty of Constantinople)" },
    { y: "1848", t: "Revolutions across Europe; Frankfurt Parliament; Silesian weavers' revolt" },
    { y: "1861", t: "Kingdom of Italy proclaimed (Rome joins 1870)" },
    { y: "1871", t: "German Empire — Kaiser Wilhelm I at Versailles" },
    { y: "1914", t: "Balkan tensions explode into World War I" },
  ],
  mindmap: { central: "Nationalism in Europe",
    branches: [
      { label: "France", color: "#1a73e8", children: ["1789 Revolution", "la patrie, le citoyen", "Marianne", "Napoleonic Code 1804"] },
      { label: "Ideas", color: "#e37400", children: ["Liberal nationalism", "Romanticism (Herder)", "Frankfurt Parliament 1848", "Revolutionary France"] },
      { label: "Unifications", color: "#146c2e", children: ["Italy: Mazzini, Cavour, Garibaldi", "Germany: Bismarck, 3 wars", "1871 Kaiser at Versailles"] },
      { label: "Conflict", color: "#c5221f", children: ["Balkans crisis", "Ottoman decline", "Imperial rivalry", "WWI 1914"] },
    ] },
  flowchart: [
    { title: "Old order", desc: "kingdoms and multi-nation empires; no citizen rights" },
    { title: "Idea spreads", desc: "revolution, Napoleon's code, romantic poets and folk culture", type: "decision" },
    { title: "Struggle", desc: "1848 revolutions fail, but nationalism keeps growing" },
    { title: "Nation-states", desc: "Italy 1861–70 and Germany 1871 unify — pride turns into imperial rivalry", type: "result" },
  ],
  notes: [
    "The Napoleonic Code was a <b>double-edged sword</b>: administrative efficiency, but new taxes and forced army service made occupiers unpopular.",
    "<b>Frankfurt Parliament (1848)</b>: 831 elected professionals met in St Paul's Church, wanted a constitutional German nation — lost to the monarchy's army and its own middle-class timidity.",
    "Britain's 'nation' was <b>English dominance</b>: Scotland's highlanders suppressed, Gaelic culture broken after the 1707 Act of Union.",
    "Learn the Italian trio as a formula: <b>Mazzini = prophet, Cavour = brain, Garibaldi = sword</b>.",
    "Nationalism meant different things to different classes — a bright idea for elites, but peasants in Alsace still spoke French/German mixed dialects.",
  ],
  quiz: [
    { q: "Who was proclaimed German Emperor at Versailles in 1871?", options: ["Otto von Bismarck", "Kaiser Wilhelm I", "Frederick the Great", "Napoleon III"], answer: 1, why: "Bismarck planned it, but the Prussian King Wilhelm I wore the crown." },
    { q: "The Frankfurt Parliament of 1848 was notable because:", options: ["It united Italy", "It was the first elected all-German assembly", "It crowned the Kaiser", "It abolished serfdom in Russia"], answer: 1, why: "Elected professors, teachers, members — but it excluded women and finally dissolved." },
    { q: "Romanticists contributed to nationalism mainly through:", options: ["Army reforms", "Folk culture, language and art", "Trade treaties", "Railway networks"], answer: 1, why: "Herder and others said true national culture lives in folk songs and poetry." },
  ],
  pyq: [
    "Describe the role of Cavour and Garibaldi in the unification of Italy. (CBSE 2023, 5m)",
    "Explain the significance of the Napoleonic Code for Europe. (CBSE 2022, 3m)",
    "Why did nationalist tensions emerge in the Balkans after 1871? (CBSE 2020, 5m)",
  ],
},

"sst-0-2": {
  slides: [
    { kicker: "History Ch.3", title: "The Making of a Global World",
      points: ["Globalisation is old — Silk Routes (land + sea) carried silk, Buddhism, Christianity and Islam centuries ago", "Food travelled too: potatoes, maize, chillies, sweet potatoes reached Europe & Asia from the Americas after Columbus (1492)", "The Americas' conquest was done by <b>germs</b> — smallpox and measles killed native peoples who had no immunity"], formula: "Silk Road = trade + culture + religion" },
    { kicker: "1800s", title: "The 19th-Century World Economy",
      points: ["British Corn Laws (repealed 1846): food imports grew → farmland to industry, global food trade boomed", "New tech: railways, steamships, telegraph, refrigerated ships — meat reached Europe from America & Australia", "Rinderpest (1890s): killed 90% of African cattle → African livelihoods destroyed → forced labour for colonial mines & plantations"], formula: "Rail + steamship + telegraph = one world market" },
    { kicker: "Migration", title: "Indentured Labour — the 'New System of Slavery'",
      points: ["Poor Indians signed contracts to work in Trinidad, Guyana, Suriname, Mauritius, Fiji — 19th century plantation colonies", "Harsh conditions, but workers preserved culture: 'Hosay' (Muharram) in Trinidad, 'Chutney' music — Rihana (Ramayana) traditions survived", "Indenture was abolished in 1921; descendants form large Indian diaspora communities today"], formula: "Migration = survival + cultural fusion" },
    { kicker: "1929–45", title: "Depression and Rebuilding",
      points: ["Great Depression (1929): US loans recalled, world trade collapsed, farm prices crashed", "India hit hard: jute & wheat prices fell, peasants deep in debt — but Gandhi's Civil Disobedience gained angry peasants", "Bretton Woods (1944, 44 nations): IMF + World Bank created to avoid another collapse — the post-war global economy's blueprint"], formula: "1944: IMF + World Bank (Bretton Woods)" },
  ],
  timeline: [
    { y: "1492", t: "Columbus reaches the Americas — the 'New World' joins the old" },
    { y: "1846", t: "Corn Laws repealed — Britain opens to global food trade" },
    { y: "1890s", t: "Rinderpest destroys African cattle economies" },
    { y: "1914–18", t: "World War I — first 'total war', 9 million dead" },
    { y: "1929", t: "Great Depression begins — prices & trade crash worldwide" },
    { y: "1944", t: "Bretton Woods: IMF and World Bank born" },
    { y: "2001", t: "China joins WTO — the new global factory" },
  ],
  mindmap: { central: "Making of a Global World",
    branches: [
      { label: "Pre-modern", color: "#1a73e8", children: ["Silk Routes", "Food travels: potato, chilli", "Cowries as money"] },
      { label: "19th century", color: "#e37400", children: ["Corn Laws → free trade", "Railways, steamships", "Refrigerated meat ships", "Rinderpest in Africa"] },
      { label: "Labour flows", color: "#146c2e", children: ["Indentured Indians", "Trinidad, Guyana, Fiji", "Abolished 1921", "Diaspora culture"] },
      { label: "Shocks", color: "#c5221f", children: ["WWI 1914–18", "Great Depression 1929", "Bretton Woods 1944", "MNCs after 1950s"] },
    ] },
  flowchart: [
    { title: "Boom", desc: "1920s US loans fuel world trade — wheat, rubber, sugar prices high" },
    { title: "Crash", desc: "1929: US markets collapse, loans recalled" },
    { title: "Dominoes fall", desc: "imports collapse, farm prices crash — peasants across the world ruined", type: "decision" },
    { title: "Rebuild", desc: "1944 Bretton Woods: IMF + World Bank to stabilise the world economy", type: "result" },
  ],
  notes: [
    "The <b>Silk Routes</b> prove globalisation is not new — Chinese pottery travelled the same paths as Buddhist monks.",
    "<b>Rinderpest</b> shows how germs shaped history: a cattle disease ended African independence more effectively than armies.",
    "Indentured labour is called the <b>'new system of slavery'</b> — poverty and agents pushed Indians into 5-year contracts across oceans.",
    "Depression in India: peasants' cash income vanished but fixed cash rents remained → <b>debt and rural anger fed nationalism</b>.",
    "Bretton Woods made the <b>US dollar</b> the anchor of world finance (gold link ended 1971); China's 2001 WTO entry created today's 'world factory'.",
  ],
  quiz: [
    { q: "Rinderpest in the 1890s devastated:", options: ["European industry", "African cattle and livelihoods", "Indian cotton", "Chinese ports"], answer: 1, why: "90% of African cattle died — colonial powers then controlled African labour." },
    { q: "The Bretton Woods conference (1944) created:", options: ["WTO and UN", "IMF and World Bank", "NATO and EU", "ILO and WHO"], answer: 1, why: "Twins born to stabilise the post-war world economy." },
    { q: "Which foods reached the Old World from the Americas?", options: ["Rice and wheat", "Potatoes and chillies", "Tea and coffee", "Sugarcane and jute"], answer: 1, why: "Columbus's 'Columbian Exchange' brought potato, maize, chillies, tomatoes." },
  ],
  pyq: [
    "Explain the impact of the Great Depression of 1929 on Indian peasants. (CBSE 2023, 5m)",
    "Describe the system of indentured labour with examples of destination countries. (CBSE 2022, 5m)",
    "How did technology (railways, steamships, refrigeration) transform world trade in the 19th century? (CBSE 2020, 5m)",
  ],
},

"sst-0-4": {
  slides: [
    { kicker: "History Ch.5", title: "Print Culture and the Modern World",
      points: ["Printing began in East Asia: China/Japan/Korea used woodblock — the Diamond Sutra (868 CE) is the oldest printed book", "Gutenberg (Germany, ~1448): the printing press — 180 copies of the Bible launched a revolution", "Print made ideas cheap: Martin Luther's Ninety Five Theses (1517) sparked the Reformation — 5,000 copies in 2 weeks"], formula: "Print → Reformation → public opinion" },
    { kicker: "India", title: "Print Arrives in India",
      points: ["Portuguese missionaries brought the first press to Goa (1556)", "James Augustus Hicky's Bengal Gazette (1780) — the first English newspaper printed by an Indian", "Reformers used print: Rammohun Roy's Sambad Kaumudi (1821); later Tilak's Kesari, Gandhi's Young India and Harijan (1933)"], formula: "1780: Hicky → 1878: Vernacular Press Act" },
    { kicker: "Readers", title: "New Readers: Women, Workers, Dalits",
      points: ["Rashsundari Debi's Amar Jiban (1876) — first full autobiography by an Indian woman, who taught herself to read in secret", "Jyotiba Phule's Gulamgiri (1871) and Ambedkar's writings gave Dalits a voice", "Cheap 'chapbooks' and Rs 1 novels created mill-worker readers; libraries in Bombay's chawls"], formula: "Print = voice of the voiceless" },
    { kicker: "Censorship", title: "Print and Nationalism",
      points: ["Colonial fear: Vernacular Press Act (1878) — censored Indian-language papers; the ghost of 1857 haunted the Raj", "Tilak's Kesari defended revolutionaries — jailed for sedition (1908)", "Gandhi called the press 'a mirror of the people' — Young India, Navajivan, Harijan spread Satyagraha to villages"], formula: "Censorship → more nationalist printing" },
  ],
  timeline: [
    { y: "868 CE", t: "Diamond Sutra — world's oldest printed book (China)" },
    { y: "1448", t: "Gutenberg perfects the printing press (Mainz, Germany)" },
    { y: "1517", t: "Luther's Ninety Five Theses — Reformation begins" },
    { y: "1556", t: "First printing press in India (Goa, Portuguese missionaries)" },
    { y: "1780", t: "Hicky's Bengal Gazette — first Indian-printed newspaper" },
    { y: "1821", t: "Sambad Kaumudi (Rammohun Roy)" },
    { y: "1878", t: "Vernacular Press Act — press censorship" },
    { y: "1933", t: "Gandhiji begins Harijan" },
  ],
  mindmap: { central: "Print Culture",
    branches: [
      { label: "Beginnings", color: "#1a73e8", children: ["Woodblock China", "Diamond Sutra 868", "Gutenberg 1448", "Printed Bibles"] },
      { label: "Europe", color: "#e37400", children: ["Reformation 1517", "Reading mania", "Cheap chapbooks", "Science & reason"] },
      { label: "India", color: "#146c2e", children: ["Goa press 1556", "Hicky 1780", "Kesari, Young India, Harijan", "Vernacular Press Act 1878"] },
      { label: "New readers", color: "#9334e6", children: ["Rashsundari Debi", "Phule's Gulamgiri", "Ambedkar's journals", "Novels & chawl libraries"] },
    ] },
  flowchart: [
    { title: "Idea written", desc: "reformer or nationalist puts the argument on paper" },
    { title: "Press prints thousands", desc: "cost per copy collapses — even the poor can buy" },
    { title: "Reaching readers", desc: "read aloud in tea shops, chawls, villages — the illiterate listen too", type: "decision" },
    { title: "Public opinion forms", desc: "reform, nationalism, revolution — the colonial Raj responds with censorship", type: "result" },
  ],
  notes: [
    "Print did not just spread ideas — it <b>created the public</b> who could discuss them.",
    "Fear of print: Sultan Ulugh Beg of Persia banned printing; the Church's Index of prohibited books (1559) listed Luther and Voltaire.",
    "Print connected reform and religion: <b>Rammohun Roy</b> argued against sati and idol worship through Persian and Bengali journals.",
    "Women and print: Kailashbashini Debi wrote on home life; Hindi printing helped 'Hindi' itself become a standard language.",
    "The Raj's censorship backfired — every banned paper became a badge of honour for nationalists.",
  ],
  quiz: [
    { q: "The oldest printed book is:", options: ["The Gutenberg Bible", "The Diamond Sutra", "Ninety Five Theses", "Amar Jiban"], answer: 1, why: "Woodblock-printed in China/Japan in 868 CE." },
    { q: "The Vernacular Press Act of 1878 was passed to:", options: ["Promote Indian languages", "Censor Indian-language newspapers", "Fund new printing presses", "Translate the Bible"], answer: 1, why: "It empowered the government to censor reports in Indian-language papers." },
    { q: "Amar Jiban (1876) is famous as:", options: ["The first Indian novel", "The first autobiography by an Indian woman", "A book on sati", "Gandhiji's journal"], answer: 1, why: "Rashsundari Debi secretly taught herself to read and wrote her life story." },
  ],
  pyq: [
    "How did print culture assist the growth of nationalism in India? (CBSE 2023, 5m)",
    "Explain Martin Luther's role in the print revolution. (CBSE 2022, 3m)",
    "Describe the role of print in the lives of women and lower castes in 19th-century India. (CBSE 2020, 5m)",
  ],
},

};
