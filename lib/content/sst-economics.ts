/* SST — Economics: Understanding Economic Development (jess2), chapters 1–4
   (ch.5 Consumer Rights lives in builtin). Keys: sst-3-x. */
import type { ChapterDetail } from "./types";

export const SST_ECONOMICS: Record<string, ChapterDetail> = {

"sst-3-0": {
  slides: [
    { kicker: "Economics Ch.1", title: "Development",
      points: ["Development goals differ: a landless labourer wants land, a businessman wants cheap labour, a girl wants education — conflicting goals are normal", "Income is the common measure — but ONLY one of many criteria (respect, security, freedom, environment also matter)", "Per capita income = total income of the country ÷ population — the World Bank classifies countries by it"], formula: "PCI = national income ÷ population" },
    { kicker: "Beyond income", title: "Other Criteria",
      points: ["Literacy rate, net attendance ratio, infant mortality rate (IMR), life expectancy", "HDI (UNDP): health (life expectancy) + education (schooling) + income — a composite index; India ranks ~130", "Kerala beats Haryana on IMR & literacy despite lower per-capita income — money isn't everything"], formula: "HDI = health + education + income" },
    { kicker: "Public", title: "Public Facilities",
      points: ["Some needs cannot be bought privately at fair prices: clean water, sanitation, schools, hospitals, safety", "Kerala's health model: low cost, universal — better outcomes than richer states", "Undernourishment check: BMI = weight(kg) ÷ height(m)² — below 18.5 = undernourished adult"], formula: "BMI = kg / m² (18.5–25 healthy)" },
    { kicker: "Future", title: "Sustainability",
      points: ["Groundwater and crude oil are being exhausted — development today cannot rob tomorrow", "Sustainable development: meet present needs without destroying future generations' capacity", "Every choice has a cost for nature — the question is who pays and when"], formula: "Development must be sustainable" },
  ],
  mindmap: { central: "Development",
    branches: [
      { label: "Goals differ", color: "#1a73e8", children: ["Labourer: land", "Youth: job", "Girl: education", "Conflicts possible"] },
      { label: "Income & PCI", color: "#e37400", children: ["Average income", "World Bank categories", "India: lower-middle"] },
      { label: "Other criteria", color: "#146c2e", children: ["Literacy, IMR", "HDI (UNDP)", "Kerala vs Haryana", "BMI"] },
      { label: "Sustainability", color: "#9334e6", children: ["Groundwater crisis", "Exhaustible resources", "Future generations' rights"] },
    ] },
  flowchart: [
    { title: "A country develops", desc: "income rises through production" },
    { title: "Is income enough?", desc: "compare Kerala and Haryana indicators", type: "decision" },
    { title: "Add public facilities", desc: "schooling, health, water multiply wellbeing" },
    { title: "Sustainable path", desc: "development that the next generation can inherit", type: "result" },
  ],
  notes: [
    "<b>IMR</b> = infant deaths per 1,000 live births — lower is better; Kerala's is among India's best.",
    "The <b>World Bank</b> uses per-capita income to group countries (low / lower-middle / upper-middle / high) — India is <b>lower-middle income</b>.",
    "<b>HDI</b> was created by UNDP (Mahbub-ul-Haq, Amartya Sen) to look beyond income.",
    "BMI under 18.5 = undernourished; over 25 = overweight — used in NCERT's survey exercise.",
    "Sustainability examples: groundwater in Rajasthan (exhausted), crude oil (renewed only over millennia).",
  ],
  quiz: [
    { q: "Per capita income equals:", options: ["Total income × population", "Total income ÷ population", "Total income − taxes", "Exports − imports"], answer: 1, why: "It is the average income per person per year." },
    { q: "Which state shows better health and literacy indicators than its per-capita income would suggest?", options: ["Haryana", "Bihar", "Kerala", "Punjab"], answer: 2, why: "Kerala's public health & education spending deliver top outcomes." },
    { q: "HDI is published by:", options: ["World Bank", "UNDP", "IMF", "WTO"], answer: 1, why: "The UN Development Programme combines health, education and income." },
  ],
  pyq: [
    "Why is per capita income not a sufficient measure of development? (CBSE 2023, 3m)",
    "What is sustainable development? Explain with the groundwater example. (CBSE 2022, 3m)",
    "Besides income, what other criteria should compare states? (CBSE 2020, 3m)",
  ],
},

"sst-3-1": {
  slides: [
    { kicker: "Economics Ch.2", title: "Sectors of the Indian Economy",
      points: ["Primary: agriculture, fishing, forestry, mining — direct from nature", "Secondary: manufacturing — turns primary goods into finished products (cotton→cloth, cane→sugar)", "Tertiary: services — transport, banking, IT, tourism, teaching; supports both sectors"], formula: "Primary → Secondary → Tertiary" },
    { kicker: "Compare", title: "Employment vs GDP Shares",
      points: ["Primary: largest employer (~45%) but smallest GDP share (~18%) — low productivity, disguised unemployment", "Tertiary: largest GDP share (over half) — the IT-BPO, finance, telecom boom", "As economies develop, workers and output shift: primary → secondary → tertiary"], formula: "45% workers, 18% GDP = farm problem" },
    { kicker: "Organisation", title: "Organised vs Unorganised",
      points: ["Organised: fixed hours, formal appointment, PF & benefits — protected by law", "Unorganised: no job security, no benefits, low pay — over 80% of Indian workers", "Disguised unemployment: 5 workers on a field that needs 2 — extra hands add nothing"], formula: "Underemployment = hidden joblessness" },
    { kicker: "Fix", title: "Creating More Employment",
      points: ["MGNREGA 2005: 100 days of guaranteed wage work per rural household — a legal 'Right to Work'", "Job-rich ideas: infrastructure construction, tourism, IT-enabled services, education & health, food processing", "Support small & cottage industries so migration to cities slows"], formula: "MGNREGA = Right to Work" },
  ],
  mindmap: { central: "Sectors of Economy",
    branches: [
      { label: "Three sectors", color: "#1a73e8", children: ["Primary: farm, fish, mine", "Secondary: manufacture", "Tertiary: services"] },
      { label: "The mismatch", color: "#e37400", children: ["Farms: most workers, least GDP", "Disguised unemployment", "Services boom"] },
      { label: "Organisation", color: "#146c2e", children: ["Organised: protected", "Unorganised: 80%+ workers", "No security or benefits"] },
      { label: "Solutions", color: "#9334e6", children: ["MGNREGA 2005", "Infrastructure & tourism", "Small industries", "Skill & education"] },
    ] },
  flowchart: [
    { title: "Economy grows", desc: "output rises, technology improves" },
    { title: "Structural shift", desc: "farm workers move to factories, then services", type: "decision" },
    { title: "India's reality", desc: "farmers stuck in low-productivity work — underemployment" },
    { title: "Policy push", desc: "MGNREGA + infrastructure + skills create real jobs", type: "result" },
  ],
  notes: [
    "Interdependence: <b>farmers need fertiliser (secondary) and trucks (tertiary); factories need cotton (primary) and banks (tertiary)</b>.",
    "GDP share vs employment share of primary sector is THE exam graph — memorise the contrast.",
    "Disguised unemployment example: <b>a family of 8 on a 2-person farm — 6 could leave with no output loss</b>.",
    "<b>MGNREGA (2005)</b>: 100 days guaranteed work at minimum wages — asset creation + income floor.",
    "Unorganised workers (farm labourers, street vendors, home workers) need social security, not just jobs.",
  ],
  quiz: [
    { q: "Cotton cloth manufacturing belongs to:", options: ["Primary", "Secondary", "Tertiary", "Quaternary"], answer: 1, why: "Raw cotton (primary) is processed into cloth in a mill — secondary." },
    { q: "MGNREGA guarantees:", options: ["Free education", "100 days of wage employment per rural household", "Housing for all", "Pension at 60"], answer: 1, why: "The 2005 Act created a legal Right to Work." },
    { q: "Disguised unemployment means:", options: ["Open joblessness", "More workers than needed — extra add no output", "Seasonal unemployment", "Unemployment among graduates"], answer: 1, why: "Common in Indian agriculture: many hands, same produce." },
  ],
  pyq: [
    "Explain the three sectors with examples and interdependence. (CBSE 2023, 5m)",
    "What is disguised unemployment? Give an example. (CBSE 2022, 3m)",
    "Suggest any three ways to create more employment in rural India. (CBSE 2020, 3m)",
  ],
},

"sst-3-2": {
  slides: [
    { kicker: "Economics Ch.3", title: "Money and Credit",
      points: ["Barter needed a double coincidence of wants — money removes it: anything generally accepted as payment", "Modern currency has no intrinsic value; the RBI authorises it as legal tender", "Bank money: demand deposits + cheques — safe, transferable, earn interest"], formula: "Money = medium of exchange" },
    { kicker: "Credit", title: "Terms of Credit",
      points: ["Loan terms = interest rate + collateral + documentation + repayment mode", "Collateral: security pledged against a loan (land title, gold, vehicle papers)", "Credit can create (Salim's festival shoe order) or destroy (Swapna's crop failure) — the double-edged sword"], formula: "Terms = interest + collateral + paperwork + mode" },
    { kicker: "Sources", title: "Formal vs Informal Credit",
      points: ["Formal: banks & cooperative societies — RBI-supervised, cheaper rates, but paperwork & collateral", "Informal: moneylenders, traders, employers, relatives — no supervision, very high interest, sometimes no collateral but bonded labour", "Poor households rely heavily on informal credit — the problem credit policy must fix"], formula: "Formal: RBI + cheap • Informal: costly" },
    { kicker: "SHG", title: "Self-Help Groups — Banking the Poor",
      points: ["SHG: 15–20 (usually women) members pool savings, lend internally, then borrow from banks", "Bank lends to the GROUP — collateral is group trust; peer pressure ensures repayment", "Grameen Bank (Bangladesh, 1970s, Muhammad Yunus) pioneered it — Nobel Peace Prize 2006"], formula: "SHG = savings + microcredit + empowerment" },
  ],
  mindmap: { central: "Money & Credit",
    branches: [
      { label: "Money", color: "#1a73e8", children: ["Barter problem", "Legal tender (RBI)", "Demand deposits", "Cheques"] },
      { label: "Credit terms", color: "#e37400", children: ["Interest rate", "Collateral", "Documentation", "Repayment mode"] },
      { label: "Sources", color: "#c5221f", children: ["Banks, cooperatives", "Moneylenders, traders", "RBI supervision", "High informal rates"] },
      { label: "SHGs", color: "#146c2e", children: ["15–20 women", "Group collateral", "Grameen, Yunus", "Nobel 2006"] },
    ] },
  flowchart: [
    { title: "Need a loan", desc: "farmer, student, small trader approaches a lender" },
    { title: "Choose source", desc: "bank (cheap, slow, needs collateral) vs moneylender (instant, costly)", type: "decision" },
    { title: "Repay", desc: "income rises → credit creates growth; crop fails → debt trap" },
    { title: "SHG bridge", desc: "group savings bring the poor INSIDE formal credit", type: "result" },
  ],
  notes: [
    "<b>Collateral</b> = the security a lender can seize if the loan isn't repaid.",
    "Credit's dual role: <b>positive (income growth)</b> vs <b>negative (debt trap)</b> — always answer with both examples.",
    "The <b>RBI supervises formal lenders</b>; nobody supervises the informal sector — that's why rates there exceed 36%+.",
    "SHGs also discuss social issues (health, domestic violence) — credit plus <b>empowerment</b>.",
    "Cheap and timely credit for all = a key Indian development goal.",
  ],
  quiz: [
    { q: "A 'double coincidence of wants' is required in:", options: ["Money economy", "Barter exchange", "Banking", "e-payment"], answer: 1, why: "Each person must want exactly what the other offers." },
    { q: "Which is an INFORMAL source of credit?", options: ["Commercial bank", "Cooperative society", "Village moneylender", "Regional rural bank"], answer: 2, why: "Moneylenders, traders, employers and relatives form the informal sector." },
    { q: "The Grameen Bank model of micro-credit was pioneered by:", options: ["Verghese Kurien", "Muhammad Yunus", "Amartya Sen", "C. Rangarajan"], answer: 1, why: "Yunus's Grameen Bank in Bangladesh won the 2006 Nobel Peace Prize." },
  ],
  pyq: [
    "Explain the terms of credit with examples. (CBSE 2023, 3m)",
    "Distinguish between formal and informal sources of credit. (CBSE 2022, 3m)",
    "How do self-help groups help the poor access credit? (CBSE 2020, 5m)",
  ],
},

"sst-3-3": {
  slides: [
    { kicker: "Economics Ch.4", title: "Globalisation and the Indian Economy",
      points: ["Globalisation = integrating economies through trade, investment, technology and migration of labour", "MNCs drive it: own assets and manage production in more than one country", "MNC playbook: cheap labour (China, India, Bangladesh) + FDI (buy land, machines abroad) + joint ventures"], formula: "MNC = production across borders" },
    { kicker: "How", title: "What Made the World One Market?",
      points: ["Technology: container shipping slashed freight; internet & telecom made distance irrelevant", "Liberalisation (India, 1991): removed trade barriers — import quotas cut, tariffs lowered", "WTO (1995, ~160 members): sets global trade rules — developing countries call it unfair on farm subsidies"], formula: "Tech + liberalisation + WTO = global market" },
    { kicker: "India", title: "Impacts on India",
      points: ["Consumers: more choice, lower prices (TVs, phones, cars)", "Producers: competition! Chinese toys nearly wiped out Indian makers — some upgraded and survived", "Workers: new jobs in IT, BPO, exports; but flexi-jobs without security", "Indian MNCs went global too: Tata (Jaguar-Land Rover), Infosys, Asian Paints, Ranbaxy"], formula: "Opportunity + competition = survival of the fittest" },
    { kicker: "Fair", title: "Fair Globalisation",
      points: ["Fairness needs policy: labour law enforcement, support for small producers, fairer WTO deals", "SEZs attract FDI but must not grab farmland unjustly", "Goal: share the gains wider — workers, small firms, farmers"], formula: "Growth WITH justice" },
  ],
  mindmap: { central: "Globalisation",
    branches: [
      { label: "Drivers", color: "#1a73e8", children: ["MNCs & FDI", "Containers & shipping", "Internet/telecom", "Liberalisation 1991"] },
      { label: "Rules", color: "#e37400", children: ["WTO 1995", "Tariffs & quotas", "Farm subsidy dispute", "Developing world's complaint"] },
      { label: "India impact", color: "#146c2e", children: ["Choice & lower prices", "Competition for producers", "IT-BPO jobs", "Tata, Infosys go global"] },
      { label: "Fairness", color: "#9334e6", children: ["Labour protection", "Small-producer support", "Just SEZs", "Better WTO bargaining"] },
    ] },
  flowchart: [
    { title: "Barriers fall", desc: "1991: India opens imports and investment" },
    { title: "MNCs & goods flow in", desc: "competition rises in every market" },
    { title: "Who adapts", desc: "efficient firms grow; unprepared small units shut", type: "decision" },
    { title: "Policy task", desc: "make globalisation fair: protect labour & small producers", type: "result" },
  ],
  notes: [
    "FDI = <b>foreign direct investment</b> — buying or building productive assets abroad (plants, mines, brands).",
    "The <b>Chinese toy example</b> from NCERT shows both the shock (Indian toymakers hit) and the response (quality up, costs down).",
    "<b>Cargill–Parakh Foods</b> and <b>Ford–Maruti joint ventures</b> are NCERT's MNC-in-India examples.",
    "Liberalisation ≠ free-for-all: fair trade needs <b>labour laws, environmental care and social support</b>.",
    "1-mark favourite: <b>tariff = tax on imports</b>; WTO began in 1995.",
  ],
  quiz: [
    { q: "FDI means:", options: ["Foreign Direct Investment", "Fixed Deposit Interest", "Free Domestic Industry", "Foreign Dealer Import"], answer: 0, why: "Investment by a company in productive assets of another country." },
    { q: "The WTO was established in:", options: ["1991", "1995", "2001", "1947"], answer: 1, why: "The World Trade Organization began in 1995 to frame global trade rules." },
    { q: "India's 1991 economic reforms are called:", options: ["Nationalisation", "Liberalisation", "Global recession", "Demonetisation"], answer: 1, why: "Trade barriers were removed — quotas cut and tariffs lowered." },
  ],
  pyq: [
    "What is liberalisation? How did it change Indian foreign trade? (CBSE 2023, 3m)",
    "Impact of globalisation on Indian producers and consumers — explain. (CBSE 2022, 5m)",
    "What steps can make globalisation fairer? (CBSE 2020, 3m)",
  ],
},

};
