/* SST — Political Science: Democratic Politics II (jess4), all 5 chapters. Keys: sst-2-x. */
import type { ChapterDetail } from "./types";

export const SST_CIVICS: Record<string, ChapterDetail> = {

"sst-2-0": {
  slides: [
    { kicker: "Civics Ch.1", title: "Power Sharing",
      points: ["Belgium: 59% Dutch-speaking (Flemish), 40% French (Wallonia), 1% German — but Brussels is 80% French-speaking inside the Flemish region", "Sri Lanka: 74% Sinhala majority imposed its will — 1956 'Sinhala Only' Act made Tamil speakers second-class citizens", "Result: Belgium accommodated and thrived; Sri Lanka's majoritarianism fed a 26-year civil war (LTTE, ended 2009)"], formula: "Accommodation vs majoritarianism" },
    { kicker: "Belgium", title: "The Belgian Model (1993 Constitution)",
      points: ["Central government: equal French & Dutch-speaking ministers", "State governments given many powers — no longer dependent on the centre", "Separate 'community governments' for culture, education and language", "Brussels has a separate government with equal representation for both communities"], formula: "Equal say at EVERY level" },
    { kicker: "Why?", title: "Why Share Power?",
      points: ["Prudential reason: avoiding conflict is wise — majority rule alone breeds civil war", "Moral reason: power sharing is the very spirit of democracy — people have a right to be consulted", "A legitimate government is one where all groups see themselves in power"], formula: "Prudence + principle = power sharing" },
    { kicker: "Forms", title: "Four Forms of Power Sharing",
      points: ["Horizontal: legislature, executive, judiciary — checks and balances", "Vertical: centre → state → local governments", "Social: religious, linguistic and ethnic groups (community governments)", "Political parties, pressure groups & movements: competition + coalition"], formula: "Horizontal • Vertical • Social • Political" },
  ],
  mindmap: { central: "Power Sharing",
    branches: [
      { label: "Belgium", color: "#1a73e8", children: ["59% Dutch, 40% French", "Equal ministers", "Community governments", "Brussels: 50-50"] },
      { label: "Sri Lanka", color: "#c5221f", children: ["74% Sinhala", "1956 Sinhala Only Act", "Tamil alienation", "Civil war till 2009"] },
      { label: "Why share", color: "#e37400", children: ["Prudential: avoid conflict", "Moral: democratic right", "Legitimacy"] },
      { label: "Forms", color: "#146c2e", children: ["Horizontal (organs)", "Vertical (levels)", "Social (groups)", "Parties & movements"] },
    ] },
  flowchart: [
    { title: "A diverse country", desc: "two or more language/religious communities" },
    { title: "Choice", desc: "accommodate minorities OR impose majority rule", type: "decision" },
    { title: "Accommodate (Belgium)", desc: "everyone shares power — stability and peace" },
    { title: "Impose (Sri Lanka)", desc: "majoritarianism → alienation → civil war", type: "result" },
  ],
  notes: [
    "The Belgian model shows <b>respect for diversity can be built into the constitution itself</b>.",
    "Sri Lanka's 1956 Act made <b>Sinhala the only official language</b> — Tamils (about 18%, including Indian Tamils) were kept out of jobs and education.",
    "Majoritarianism = <b>the majority's wishes override everyone else's</b> — the opposite of power sharing.",
    "Prudential = 'wise'; moral = 'right' — quote BOTH reasons for full marks.",
    "India practises all four forms of power sharing — from the Supreme Court to gram panchayats.",
  ],
  quiz: [
    { q: "What percentage of Sri Lanka's population is Sinhala-speaking?", options: ["59%", "74%", "40%", "18%"], answer: 1, why: "Sinhala speakers form 74%; Sri Lankan + Indian Tamils together about 18%." },
    { q: "Community governments in Belgium handle:", options: ["Defence", "Culture, education and language", "Railways", "Currency"], answer: 1, why: "Each linguistic community runs its own cultural and educational affairs." },
    { q: "Which is a VERTICAL form of power sharing?", options: ["Legislature vs judiciary", "Centre, state and local governments", "Two parties alternating", "Religious group autonomy"], answer: 1, why: "Vertical = power shared across LEVELS of government." },
  ],
  pyq: [
    "Describe the Belgian model of power sharing. (CBSE 2023, 5m)",
    "Why is power sharing desirable? Explain prudential and moral reasons. (CBSE 2022, 3m)",
    "What is majoritarianism? How did it harm Sri Lanka? (CBSE 2020, 5m)",
  ],
},

"sst-2-1": {
  slides: [
    { kicker: "Civics Ch.2", title: "Federalism",
      points: ["Federalism = power divided between a central authority and constituent units (states), each supreme in its own sphere", "Two types: 'coming together' federations (USA, Switzerland — strong states) and 'holding together' federations (India, Spain, Belgium — strong centre)", "Key features: two levels of government, written rigid constitution, independent judiciary to interpret, revenue powers divided"], formula: "India = holding-together federation" },
    { kicker: "Division", title: "The Three Lists",
      points: ["Union List (100 subjects): defence, foreign affairs, currency, banking — only Parliament legislates", "State List (61): police, public health, agriculture, irrigation — only state assemblies", "Concurrent List (52): education, forests, marriage, trade unions — both can make laws; Union law prevails in conflict"], formula: "Union 100 • State 61 • Concurrent 52" },
    { kicker: "Practice", title: "How India Federalises",
      points: ["Linguistic states: Andhra created 1953 after Potti Sriramulu's fast; States Reorganisation Act 1956 — today's map evolved till Telangana (2014)", "Language policy: no 'national language' — Hindi is official (Devanagari script); 22 languages in the Eighth Schedule; English associate status", "Decentralisation 1992: 73rd & 74th Amendments made local government constitutional (3-tier panchayati raj, municipalities)"], formula: "73rd = villages • 74th = cities" },
    { kicker: "Local", title: "Local Governments (1992)",
      points: ["Three tiers: zila parishad (district), panchayat samiti (block), gram panchayat (village); municipalities for towns", "State Election Commissions hold local polls; State Finance Commissions review local revenue", "Reservations: 1/3 for women (50% in many states) plus SC/ST share; 29 subjects (11th Schedule) for panchayats"], formula: "One-third seats reserved for women" },
  ],
  mindmap: { central: "Federalism",
    branches: [
      { label: "Types", color: "#1a73e8", children: ["Coming together: USA", "Holding together: India", "Two/three tiers"] },
      { label: "Lists", color: "#e37400", children: ["Union 100: defence, currency", "State 61: police, agriculture", "Concurrent 52: education"] },
      { label: "Language & states", color: "#146c2e", children: ["Andhra 1953", "Reorganisation 1956", "22 scheduled languages", "Hindi official only"] },
      { label: "Decentralisation", color: "#9334e6", children: ["73rd & 74th Amendments", "3-tier panchayats", "Women's reservation", "State Election Commission"] },
    ] },
  flowchart: [
    { title: "Constitution divides", desc: "Union, State, Concurrent lists — each level supreme in its sphere" },
    { title: "Dispute arises", desc: "who has the power over a subject?" },
    { title: "Courts interpret", desc: "the judiciary umpires the federation", type: "decision" },
    { title: "Balance evolves", desc: "linguistic states, language policy, local self-government deepen federalism", type: "result" },
  ],
  notes: [
    "India is <b>quasi-federal</b>: federal form, unitary spirit (single constitution, Emergency powers, All-India Services).",
    "The Union List has <b>100</b> subjects, State <b>61</b>, Concurrent <b>52</b> — exam-favourite numbers.",
    "<b>Hindi is an official language, NOT the national language</b> — a classic one-liner.",
    "Decentralisation rationale: <b>states are too big and distant</b> for every local need — villages know their problems best.",
    "Local bodies now have constitutional status, regular elections and reservations — but funds and functions remain work in progress.",
  ],
  quiz: [
    { q: "Education belongs to which list?", options: ["Union", "State", "Concurrent", "Residuary"], answer: 2, why: "Education is a Concurrent subject — both levels can legislate; central law wins in conflict." },
    { q: "The 73rd Amendment (1992) deals with:", options: ["Municipalities", "Panchayati Raj", "Anti-defection", "GST"], answer: 1, why: "Rural local government; the 74th covers urban municipalities." },
    { q: "Which is a 'coming together' federation?", options: ["India", "Spain", "Belgium", "USA"], answer: 3, why: "American states joined voluntarily and retain major power." },
  ],
  pyq: [
    "Explain any three features of federalism. (CBSE 2023, 3m)",
    "How has language policy strengthened Indian federalism? (CBSE 2022, 3m)",
    "Describe the three-tier system of local government in India. (CBSE 2020, 5m)",
  ],
},

"sst-2-2": {
  slides: [
    { kicker: "Civics Ch.3", title: "Gender, Religion and Caste",
      points: ["Sexual division of labour: housework assigned to women — unpaid, invisible; feminist movements demanded equality in family & public life", "Political under-representation: women ≈ 14% of the Lok Sabha; 1/3 panchayat seats reserved; Nari Shakti Vandan Adhiniyam (2023) reserves 33% in Lok Sabha & assemblies", "Religion in politics is fine as faith — communalism begins when one religion claims superiority"], formula: "Feminism = belief in equal rights for women" },
    { kicker: "Religion", title: "Communalism and Secularism",
      points: ["Communal politics: religion as the basis of the nation; majority domination ('Hindutva'/Islamist versions) or minority separatism", "India's secular state: no official religion; freedom to profess & propagate (Art 25); no religious discrimination by the state", "Communalism is a form of politics, not everyday religiosity — most believers are not communal"], formula: "Secular state ≠ theocracy" },
    { kicker: "Caste", title: "Caste in Politics",
      points: ["Caste: hereditary, endogamous groups linked to occupation; no caste has a majority anywhere — so no party wins on caste alone", "Caste matters: candidate selection, vote banks, reserved seats for SCs (84) and STs (47) in the Lok Sabha", "Mandal Commission (implemented 1990): 27% OBC reservation — backward-caste politics entered the mainstream"], formula: "Caste can mobilise, never decide alone" },
    { kicker: "Balance", title: "Taking the Good with the Bad",
      points: ["Positive: political awakening of Dalits and OBCs; parties champion the disadvantaged", "Negative: division, violence, vote-bank politics; women & poor still sidelined within castes", "Constitutional guard: universal adult franchise, Art 17 (untouchability abolished), reserved constituencies"], formula: "Democracy slowly dissolves hierarchy" },
  ],
  mindmap: { central: "Gender, Religion, Caste",
    branches: [
      { label: "Gender", color: "#9334e6", children: ["Sexual division of labour", "Feminist movements", "14% in Lok Sabha", "1/3 in panchayats", "Nari Shakti Act 2023"] },
      { label: "Religion", color: "#e37400", children: ["Communalism defined", "Majoritarianism", "Secular state features", "Art 25 freedom"] },
      { label: "Caste", color: "#146c2e", children: ["Hereditary, endogamous", "No caste majority", "SC 84, ST 47 seats", "Mandal 27% OBC"] },
      { label: "Verdict", color: "#1a73e8", children: ["Awakening of marginalised", "But division & violence", "Constitution as shield"] },
    ] },
  flowchart: [
    { title: "Social difference exists", desc: "gender roles, faiths, castes — every society has them" },
    { title: "Politics enters", desc: "difference can become identity & mobilisation", type: "decision" },
    { title: "Inclusive path", desc: "secularism, reservations, equal citizenship → dignity" },
    { title: "Divisive path", desc: "communalism & casteism → conflict", type: "result" },
  ],
  notes: [
    "One-liner for exams: <b>caste can be a channel of participation but never a healthy basis for voting</b>.",
    "Indian secularism = <b>principled distance</b>: the state may intervene for reform (banning untouchability, dowry) but favours no religion.",
    "Women's representation: <b>1/3 in panchayats</b> (50% in 20+ states) but only ~14% in the Lok Sabha — the 2023 Act fixes 33% for the future.",
    "The <b>Mandal Commission</b> (set up 1979, implemented 1990) extended 27% reservation to OBCs — a turning point in Indian politics.",
    "Communal riots are engineered by political interests — ordinary people of both communities usually live in peace.",
  ],
  quiz: [
    { q: "How many Lok Sabha seats are reserved for Scheduled Castes?", options: ["47", "84", "27", "131"], answer: 1, why: "84 for SCs and 47 for STs." },
    { q: "A secular state means:", options: ["It has a state religion", "It favours the majority religion", "It has no official religion and does not discriminate", "It bans religion"], answer: 2, why: "The Indian state neither promotes nor discriminates against any religion." },
    { q: "The Mandal Commission recommended:", options: ["33% women's reservation", "27% reservation for OBCs", "Anti-defection law", "Panchayati raj"], answer: 1, why: "Implemented in 1990, it transformed backward-caste politics." },
  ],
  pyq: [
    "What is communalism? How does the Indian state practise secularism? (CBSE 2023, 5m)",
    "Explain the sexual division of labour with examples. (CBSE 2022, 3m)",
    "In what ways does caste influence Indian politics? (CBSE 2020, 5m)",
  ],
},

"sst-2-3": {
  slides: [
    { kicker: "Civics Ch.4", title: "Political Parties",
      points: ["A party = an organised group that contests elections, holds power in government and shapes policy", "Functions: contest elections, offer policies/manifestos, make laws, form & run governments, play opposition, shape public opinion, link people to government", "Parties are the missing link between citizens and the state — without them democracy cannot run"], formula: "Party = candidates + policy + organisation" },
    { kicker: "Systems", title: "One, Two, Many — Party Systems",
      points: ["One-party system (China): no choice — not a democracy by our definition", "Two-party system (USA, UK): power alternates between two big parties", "Multi-party (India): several parties compete; alliances form — NDA, UPA, and regional blocs"], formula: "India = multi-party + alliances" },
    { kicker: "Types", title: "National and State Parties",
      points: ["National party: 6%+ votes in 4 states + 4 Lok Sabha seats (or 2% of LS seats from 3 states) — recognised across the country", "Today's national parties: BJP, INC, BSP, CPI(M), NPP (first from the North-East), AAP (2023)", "State parties: BJD, RJD, TDP, Shiv Sena, DMK/AIADMK... dominate their region and often tip the national balance"], formula: "National party = 6% in 4 states + 4 LS seats" },
    { kicker: "Reform", title: "Challenges and Reforms",
      points: ["Challenges: no internal democracy, dynastic succession, money & muscle power, shrinking real choice", "Anti-defection law (52nd Amendment, 1985): MPs/MLAs lose seat on party-hopping", "Reforms: mandatory affidavits (assets, cases), EC scrutiny of party accounts, internal elections, voters' awareness"], formula: "1985: anti-defection law" },
  ],
  mindmap: { central: "Political Parties",
    branches: [
      { label: "Functions", color: "#1a73e8", children: ["Contest elections", "Policies & manifestos", "Make & run governments", "Opposition & opinion"] },
      { label: "Systems", color: "#e37400", children: ["One-party: China", "Two-party: USA, UK", "Multi-party: India", "Coalitions: NDA, UPA"] },
      { label: "Types", color: "#146c2e", children: ["National: BJP, INC, BSP...", "State: BJD, DMK, TDP", "EC recognition rules"] },
      { label: "Challenges & reforms", color: "#c5221f", children: ["No internal democracy", "Dynasty, money, muscle", "Anti-defection 1985", "Affidavits & EC audit"] },
    ] },
  flowchart: [
    { title: "Citizens' needs & demands", desc: "jobs, prices, roads, rights" },
    { title: "Party aggregates them", desc: "manifesto, candidate, campaign", type: "decision" },
    { title: "Elections", desc: "people choose among parties' offers" },
    { title: "Government or opposition", desc: "ruling party governs; others question it — the cycle keeps democracy alive", type: "result" },
  ],
  notes: [
    "Learn the ECI criterion exactly: <b>6% votes in 4+ states + 4 Lok Sabha seats</b> (or 2% of LS seats from 3 states).",
    "The <b>anti-defection law (1985)</b> tamed 'aya ram gaya ram' politics — defectors can lose their seat.",
    "Challenges quote-frame: <b>internal democracy, dynastic succession, money & muscle</b> — one line each with an example.",
    "State parties are not small — they've decided who rules Delhi in coalition era after 1989.",
    "Parties facing crisis of credibility: reforms must come <b>from within (members) + without (courts, ECI, voters)</b>.",
  ],
  quiz: [
    { q: "The anti-defection law was passed in:", options: ["1952", "1969", "1985", "2003"], answer: 2, why: "The 52nd Amendment (1985) disqualifies party-hoppers." },
    { q: "Which is a two-party system country?", options: ["India", "China", "United States", "Sri Lanka"], answer: 2, why: "Democrats vs Republicans — power alternates between two major parties." },
    { q: "Which party became the first national party from North-East India?", options: ["AAP", "NPP", "BSP", "CPI(M)"], answer: 1, why: "The National People's Party (Meghalaya) earned national status in 2019." },
  ],
  pyq: [
    "State any four functions of political parties. (CBSE 2023, 4m)",
    "What are the challenges faced by political parties? Suggest reforms. (CBSE 2022, 5m)",
    "Differentiate between a national and a state party with examples. (CBSE 2020, 3m)",
  ],
},

"sst-2-4": {
  slides: [
    { kicker: "Civics Ch.5", title: "Outcomes of Democracy",
      points: ["Democracy is slow — deliberation and negotiation take time — but decisions are accountable and carry legitimacy", "It produces a government that is accountable, responsive and legitimate", "Compare outcomes, not promises: growth, inequality, diversity, dignity, freedom"], formula: "Slow but legitimate = democracy" },
    { kicker: "Economy", title: "Democracy and Development",
      points: ["Democracies have NOT shown superior growth rates (China's authoritarian growth vs India's)", "Yet democracy handles catastrophic famines better — free press + elections force action", "Inequality persists inside democracies too — growth does not automatically reach the poor"], formula: "Growth ≠ development; distribution matters" },
    { kicker: "Society", title: "Diversity, Dignity, Freedom",
      points: ["Democracies accommodate social diversity best — majority rule WITH minority rights (Belgium vs Sri Lanka)", "Dignity of women: representation, laws against domestic violence & dowry — a work in progress", "Caste: democracy turned caste from a hierarchy into a political identity — Dalit assertion is democratic deepening", "Citizens enjoy freedoms of speech, belief, movement — the daily texture of democracy"], formula: "Democracy = majority + minority rights" },
    { kicker: "Verdict", title: "The Quiet Revolution",
      points: ["The poor and marginalised now expect dignity as a right — 'everyday democracy'", "Democracy is not just a form of government; it is a form of society", "The verdict: democracy is the preferred form because it protects dignity and freedom — its true outcome"], formula: "Democracy deepens dignity & freedom" },
  ],
  mindmap: { central: "Outcomes of Democracy",
    branches: [
      { label: "Government quality", color: "#1a73e8", children: ["Accountable", "Responsive", "Legitimate", "Slow but fair"] },
      { label: "Economy", color: "#e37400", children: ["No growth miracle", "But no famines", "Inequality persists"] },
      { label: "Society", color: "#146c2e", children: ["Accommodates diversity", "Women's dignity", "Caste assertion", "Freedoms guaranteed"] },
      { label: "Deepening", color: "#9334e6", children: ["Expectations raised", "Everyday democracy", "Dignity as a right"] },
    ] },
  flowchart: [
    { title: "Promise made", desc: "a party wins on a manifesto" },
    { title: "Citizens judge", desc: "free press, opposition, civil society ask questions" },
    { title: "Correction possible", desc: "elections hold the rulers accountable", type: "decision" },
    { title: "Legitimacy", desc: "even losers accept the system — the deepest outcome of democracy", type: "result" },
  ],
  notes: [
    "Democracy's economic record is modest — but <b>no famine has occurred in a functioning democracy with a free press</b>.",
    "Write the triad: <b>accountable + responsive + legitimate</b> government.",
    "Democracy transforms <b>diversity from a problem into a strength</b> — Belgium vs Sri Lanka is the standard comparison.",
    "Dignity of women and Dalit assertion show democracy working <b>beyond elections</b> — in society itself.",
    "Final line for 5-markers: people prefer democracy because it respects <b>the dignity and freedom of the individual</b>.",
  ],
  quiz: [
    { q: "Which is the strongest marker of a legitimate government?", options: ["High GDP", "Citizens accept its right to rule", "Large majority", "Strong army"], answer: 1, why: "Legitimacy means even opponents accept the government's authority to decide." },
    { q: "Democracies handle famines better because:", options: ["They are richer", "Free press and elections force response", "They have more food", "They have fewer poor"], answer: 1, why: "Public criticism and the fear of losing elections compel action." },
    { q: "The best statement about democracy and economic growth:", options: ["Democracies always grow fastest", "Democracies never grow", "Democracies don't guarantee growth but distribute dignity better", "Growth is impossible in democracy"], answer: 2, why: "Growth varies; dignity, freedom and fairness are democracy's real outcomes." },
  ],
  pyq: [
    "'Democracy is accountable, responsive and legitimate government.' Explain. (CBSE 2023, 5m)",
    "How does democracy accommodate social diversity? (CBSE 2022, 3m)",
    "Is democracy successful in reducing economic inequality? Discuss. (CBSE 2020, 5m)",
  ],
},

};
