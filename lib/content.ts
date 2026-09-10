/* Chapter detail content — typed. Key: "<subject>-<group>-<chapter>" (0-based).
   Sample chapters fully filled; baaki Admin panel ya yahan bharo. */

export interface Slide { kicker?: string; title?: string; points?: string[]; formula?: string }
export interface MindmapBranch { label: string; color?: string; children?: string[] }
export interface Mindmap { central: string; branches: MindmapBranch[] }
export interface FlowNode { title: string; desc?: string; type?: "decision" | "result" | "" }
export interface Formula { name: string; expr: string }
export interface Example { title: string; steps: string[]; answer: string }
export interface Diagram { title: string; desc: string; label?: string }
export interface TimelineItem { y: string; t: string }
export interface Word { w: string; m: string; u: string }
export interface QuizQ { q: string; options: string[]; answer: number; why?: string }

export interface ChapterDetail {
  slides?: Slide[]; mindmap?: Mindmap; flowchart?: FlowNode[];
  formulas?: Formula[]; examples?: Example[]; diagrams?: Diagram[];
  timeline?: TimelineItem[]; words?: Word[]; notes?: string[];
  quiz?: QuizQ[]; pyq?: string[];
}

export const CHAPTER_DETAILS: Record<string, ChapterDetail> = {

"maths-0-0": {
  slides: [
    { kicker: "Chapter 1 • Real Numbers", title: "Real Numbers — असली संख्याओं की दुनिया",
      points: ["Natural, Whole, Integers, Rational, Irrational — sab milkar Real Numbers", "Number line ka har point = ek Real Number", "Is chapter ke 3 hero: Euclid's Division Lemma, HCF, aur Irrationality proofs"],
      formula: "ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ" },
    { kicker: "Concept 1", title: "Euclid's Division Lemma",
      points: ["a = bq + r, jahan 0 ≤ r < b", "HCF nikaalne ka sabse tez tareeka — division repeat karo jab tak remainder 0", "Board me 3-marks ka fix sawal!"],
      formula: "a = bq + r   (0 ≤ r < b)" },
    { kicker: "Concept 2", title: "Fundamental Theorem of Arithmetic",
      points: ["Har composite number = primes ka unique product", "HCF = smallest powers ka product • LCM = greatest powers ka product", "Golden relation yaad rakho:"],
      formula: "HCF(a,b) × LCM(a,b) = a × b" },
    { kicker: "Concept 3", title: "Irrational Numbers ke Proofs",
      points: ["√2, √3, √5 irrational hain — contradiction se prove hota hai", "Trick: maan lo rational hai (p/q) → dono even niklenge → contradiction!", "√2 + √3 bhi irrational — exam favourite"],
      formula: "√2 ∉ ℚ  (irrational)" },
    { kicker: "Concept 4", title: "Decimal Expansions ka Rule",
      points: ["Denominator = 2ⁿ × 5ᵐ ke form me → terminating decimal", "Varna non-terminating repeating", "1/8 = 0.125 (terminate) • 1/7 = 0.142857… (repeat)"],
      formula: "q = 2ⁿ·5ᵐ  ⇒  terminating" },
    { kicker: "Revision", title: "Exam-Day Checklist",
      points: ["Euclid lemma se HCF — steps poore likho", "HCF × LCM = a × b — verification zaroor dikhao", "√2 irrational proof — 5 steps rat lo, har saal aata hai"],
      formula: "Practice = Ex 1.1 + 1.2 + 1.4" },
  ],
  formulas: [
    { name: "Euclid's Division Lemma", expr: "a = bq + r, 0 ≤ r < b" },
    { name: "HCF × LCM Relation", expr: "HCF(a,b) × LCM(a,b) = a × b" },
    { name: "Prime Factorisation", expr: "n = p₁^a₁ × p₂^a₂ × … (unique)" },
    { name: "HCF from factors", expr: "HCF = ∏ p^min(a,b)" },
    { name: "LCM from factors", expr: "LCM = ∏ p^max(a,b)" },
    { name: "Terminating decimal", expr: "q = 2ⁿ × 5ᵐ ⇒ terminating" },
  ],
  examples: [
    { title: "Ex 1.1 Q1 — 135 aur 225 ka HCF", steps: ["225 > 135, to 225 = 135×1 + 90", "135 = 90×1 + 45", "90 = 45×2 + 0", "Remainder 0 → HCF = 45"], answer: "HCF = 45" },
    { title: "Ex 1.2 Q3 — 12, 15, 21 ka HCF & LCM", steps: ["12 = 2²×3,  15 = 3×5,  21 = 3×7", "HCF = 3 (common lowest)", "LCM = 2²×3×5×7 = 420"], answer: "HCF = 3, LCM = 420" },
    { title: "Prove: √2 is irrational", steps: ["Maan lo √2 = p/q (co-prime, q≠0)", "2 = p²/q² ⇒ p² = 2q² ⇒ p even", "p = 2r ⇒ 4r² = 2q² ⇒ q² = 2r² ⇒ q even", "p,q dono even → co-prime wali baat galat!", "∴ √2 irrational"], answer: "Proved by contradiction" },
  ],
  notes: [
    "<b>Real Numbers</b> = Rational + Irrational sab kuch.",
    "<b>Euclid's Division Lemma:</b> a = bq + r — HCF ke liye division repeat karo.",
    "<b>FTA:</b> har composite = primes ka unique product.",
    "<b>HCF × LCM = a × b</b> — sirf 2 numbers ke liye! (3 numbers ke liye nahi)",
    "<b>√2, √3, √5</b> irrational — contradiction proof yaad karo.",
    "<b>Terminating decimal</b> tabhi jab denominator sirf 2 aur 5 ke powers me toote.",
  ],
  quiz: [
    { q: "Euclid's Division Lemma me r ki condition kya hai?", options: ["0 ≤ r < b", "0 < r ≤ b", "r > b", "r = b"], answer: 0, why: "Remainder hamesha divisor se chhota aur 0 ya positive hota hai." },
    { q: "12 aur 18 ka HCF kya hai?", options: ["2", "3", "6", "36"], answer: 2, why: "12=2²×3, 18=2×3² → HCF = 2×3 = 6." },
    { q: "HCF(a,b) × LCM(a,b) = ?", options: ["a + b", "a × b", "a − b", "a ÷ b"], answer: 1, why: "Do positive integers ke liye golden relation." },
    { q: "Kaun si sankhya irrational hai?", options: ["22/7", "3.1416", "√2", "0.101001…(terminate)"], answer: 2, why: "√2 ko p/q form me likha hi nahi ja sakta." },
    { q: "13/3125 ka decimal expansion kaisa hoga?", options: ["Terminating", "Non-terminating repeating", "Non-terminating non-repeating", "Pata nahi"], answer: 0, why: "3125 = 5⁵ → sirf 2/5 powers → terminating." },
  ],
  pyq: ["Prove that √5 is irrational. (CBSE 2023, 3m)", "Find HCF and LCM of 336 and 54 by prime factorisation and verify HCF×LCM = a×b. (CBSE 2022, 3m)", "Show that 6 + √2 is irrational. (CBSE 2020, 3m)"],
},

"science-0-0": {
  slides: [
    { kicker: "Chapter 1 • Chemistry", title: "Chemical Reactions & Equations",
      points: ["Jab substances milkar NAYE substance banayein = chemical reaction", "Pehchan: rang badle, gas nikle, garmi/thand, awaaz ya precipitate", "Word equation → Skeleton → Balanced equation (3 steps!)"],
      formula: "Mg + O₂ → MgO  (skeleton) → 2Mg + O₂ → 2MgO" },
    { kicker: "Types 1–2", title: "Combination & Decomposition",
      points: ["COMBINATION: A + B → AB (Quicklime: CaO + H₂O → Ca(OH)₂)", "DECOMPOSITION: AB → A + B (CaCO₃ → CaO + CO₂, heat par)", "Yaad trick: Combination = shaadi, Decomposition = talaaq"],
      formula: "CaCO₃ --heat--> CaO + CO₂↑" },
    { kicker: "Types 3–4", title: "Displacement & Double Displacement",
      points: ["DISPLACEMENT: A + BC → AC + B (Iron + CuSO₄ → FeSO₄ + Cu)", "DOUBLE: AB + CD → AD + CB (Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl)", "Precipitation = ghulansheel se aghulansheel banna"],
      formula: "Fe + CuSO₄ → FeSO₄ + Cu" },
    { kicker: "Types 5–6", title: "Oxidation & Reduction (Redox)",
      points: ["OXIDATION = O gain / H loss • REDUCTION = O loss / H gain", "Dono saath-saath hote hain = REDOX reaction", "CuO + H₂ → Cu + H₂O (CuO reduced, H₂ oxidised)"],
      formula: "OIL-RIG: Oxidation Is Loss, Reduction Is Gain (e⁻)" },
    { kicker: "Effects", title: "Corrosion & Rancidity",
      points: ["CORROSION: lohe par zang — Fe₂O₃·xH₂O (painting/galvanisation se bacho)", "RANCIDITY: tel-makkhan kharab — antioxidants + nitrogen flushing", "Chips ke packet me N₂ gas isi liye bhari hoti hai!"],
      formula: "Rust = Fe₂O₃·xH₂O" },
    { kicker: "Balancing", title: "Balancing ka 3-Step Formula",
      points: ["Step 1: sabse bade formula se start karo", "Step 2: pehle metals, phir non-metals, aakhir me H aur O", "Step 3: dono side atoms gino — barabar?"],
      formula: "Atoms Left = Atoms Right (Law of Conservation)" },
    { kicker: "Revision", title: "Exam Checklist",
      points: ["5 reaction types + 1-1 example pakka", "Balancing ke 5 numerical practice karo", "Corrosion vs Rancidity — difference table banao"],
      formula: "Ex 1: Q 3, 7, 11, 15" },
  ],
  mindmap: { central: "Chemical Reactions",
    branches: [
      { label: "Equations", color: "#2563eb", children: ["Word equation", "Skeleton equation", "Balanced equation", "States: (s)(l)(g)(aq)"] },
      { label:" 5 Types", color: "#16a34a", children: ["Combination A+B→AB", "Decomposition AB→A+B", "Displacement", "Double displacement", "Redox (Oxi+Red)"] },
      { label: "Pehchan", color: "#ea580c", children: ["Rang badalna", "Gas nikalna", "Garmi / Thandak", "Precipitate banna"] },
      { label: "Effects", color: "#e11d48", children: ["Corrosion (zang)", "Rancidity (tel kharab)", "Galvanisation", "Antioxidants + N₂"] },
    ]},
  flowchart: [
    { title: "Observe karo", desc: "Rang? Gas? Garmi? Precipitate? = reaction hui" },
    { title: "Word Equation likho", desc: "Magnesium + Oxygen → Magnesium oxide" },
    { title: "Formula (Skeleton) likho", desc: "Mg + O₂ → MgO" },
    { title: "Balance karo", desc: "2Mg + O₂ → 2MgO — atoms barabar?" },
    { title: "Type pehchano", desc: "Combination? Displacement? Redox?", type: "decision" },
    { title: "Done — States lagao", desc: "2Mg(s) + O₂(g) → 2MgO(s)", type: "result" },
  ],
  formulas: [
    { name: "Quicklime slaking", expr: "CaO + H₂O → Ca(OH)₂ + heat" },
    { name: "Limestone heating", expr: "CaCO₃ → CaO + CO₂↑" },
    { name: "Iron + Copper sulphate", expr: "Fe + CuSO₄ → FeSO₄ + Cu" },
    { name: "Precipitation", expr: "Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl" },
    { name: "Redox example", expr: "CuO + H₂ → Cu + H₂O" },
    { name: "Rust formula", expr: "4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O" },
  ],
  diagrams: [
    { title: "Activity 1.1 — Jalti Magnesium ribbon", desc: "Magnesium ribbon ko jalao → tez safed roshni → safed powder (MgO). Reaction se pehle ribbon ko sandpaper se saaf karo (oxide layer hatane ke liye).", label: "Mg + O₂ → MgO" },
    { title: "Activity 1.3 — Iron nail in CuSO₄", desc: "Neela CuSO₄ solution me lohe ki keel 20 min rakho → solution halka hara (FeSO₄), keel par bhuri parat (Cu). Displacement reaction ka proof.", label: "Fe + CuSO₄ → FeSO₄ + Cu" },
    { title: "Electrolysis of water", desc: "Paani me thoda H₂SO₄ daalkar current do → cathode par H₂ (double), anode par O₂. Decomposition reaction.", label: "2H₂O → 2H₂ + O₂" },
  ],
  notes: [
    "<b>Chemical reaction</b> = naye पदार्थ बनना; pehchan: rang, gas, taap, precipitate.",
    "<b>Balanced equation</b> zaroori — Law of Conservation of Mass (Lavoisier).",
    "<b>5 types:</b> Combination, Decomposition, Displacement, Double displacement, Redox.",
    "<b>Oxidation</b> = O gain/H loss; <b>Reduction</b> = O loss/H gain.",
    "<b>Corrosion:</b> Fe par zang (Fe₂O₃·xH₂O) — painting, oiling, galvanisation se rok.",
    "<b>Rancidity:</b> oily food kharab — antioxidant, airtight, N₂ flushing.",
  ],
  quiz: [
    { q: "CaO + H₂O → Ca(OH)₂ kaun si reaction hai?", options: ["Decomposition", "Combination", "Displacement", "Redox"], answer: 1, why: "Do reactants milkar ek product = combination." },
    { q: "Fe + CuSO₄ → FeSO₄ + Cu me Fe kya kar raha hai?", options: ["Reduce ho raha", "Cu ko displace kar raha", "Precipitate bana raha", "Kuch nahi"], answer: 1, why: "Zyada reactive Fe, Cu ko bahar nikal deta hai." },
    { q: "Balanced equation kis law par based hai?", options: ["Gravitation", "Conservation of Mass", "Reflection", "Ohm's law"], answer: 1, why: "Dravya na banta hai na nasht hota — Lavoisier." },
    { q: "Chips ke packet me kaun si gas bhari hoti hai?", options: ["Oxygen", "Hydrogen", "Nitrogen", "CO₂"], answer: 2, why: "N₂ inert hai — rancidity rokti hai." },
    { q: "CuO + H₂ → Cu + H₂O me kaun oxidised hua?", options: ["CuO", "H₂", "Cu", "H₂O"], answer: 1, why: "H₂ ne oxygen liya (H₂→H₂O) = oxidation." },
  ],
  pyq: ["What is rancidity? Write two methods to prevent it. (CBSE 2023, 2m)", "Balance: FeSO₄ → Fe₂O₃ + SO₂ + SO₃ and name the reaction type. (CBSE 2022, 3m)", "Give one example each of combination and displacement reaction. (CBSE 2020, 2m)"],
},

"sst-0-1": {
  slides: [
    { kicker: "History Ch.2 • Nationalism in India", title:" भारत में राष्ट्रवाद (1915–1947)",
      points: ["Gandhi ji 1915 me South Africa se laute — satyagraha ka naya hathiyar", "3 bade andolan: Non-Cooperation (1920) → Civil Disobedience (1930) → Quit India (1942)", "Har andolan = wajah + ghatna + natija (exam ka golden formula)"],
      formula: "Satyagraha = Satya + Ahimsa" },
    { kicker: "1915–1919", title: "Shuruaat: 3 Chhote Satyagraha",
      points: ["1916 Champaran (Bihar) — neel kisaano ke liye", "1917 Kheda (Gujarat) — fasal kharab, lagaan maafi", "1918 Ahmedabad — mill mazdooron ki tankhah", "1919: Rowlatt Act + Jallianwala Bagh (13 April) — desh hil gaya"],
      formula: "13 April 1919 — Jallianwala Bagh" },
    { kicker: "1920–22", title: "Non-Cooperation Movement",
      points: ["Khilafat + Swaraj = Hindu-Muslim ekta", "Videshi kapde jalaye, school-college chhode, elections boycott", "1922 Chauri Chaura (UP!) — hinsa ke baad Gandhi ji ne andolan wapas liya"],
      formula: "1920 → 1922 (Chauri Chaura )" },
    { kicker: "1930–34", title: "Civil Disobedience — Dandi March",
      points: ["12 March 1930: Gandhi ji 78 saathiyon ke saath Sabarmati se Dandi", "6 April: namak banakar कानून तोड़ा  — 240 miles, 24 din!", "Mahilayein hazaaron me judi • 1931 Gandhi-Irwin Pact • 2nd Round Table fail"],
      formula: "Dandi March: 12 Mar → 6 Apr 1930" },
    { kicker: "1942", title: "Quit India — 'Do or Die'",
      points: ["8 August 1942, Bombay: 'Bharat Chhodo' + 'Karo ya Maro'", "Saare neta ek raat me giraftaar — phir bhi andolan chala", "Parallel sarkarein bani (Ballia-UP, Satara, Midnapore)"],
      formula: "'Do or Die' — 8 Aug 1942" },
    { kicker: "Sense of Belonging", title: "Rाष्ट्रवाद कैसे फैला?",
      points: ["United struggle + cultural symbols (Bharat Mata, Vande Mataram)", "History dobara likhi gayi — folklore, gaane, jhande", "Par: dalit (Ambedkar) aur Muslim (Jinnah) ke apne sawaal bhi uthe"],
      formula: "Imagined community — ek sapna, ek desh" },
    { kicker: "Revision", title: "Exam Checklist",
      points: ["3 andolan: dates + wajah + 2 ghatna + natija — table banao", "Dandi March aur Quit India par 5-marks pakka", "Map: Champaran, Kheda, Dandi, Chauri Chaura, Jallianwala Bagh"],
      formula: "Timeline rat lo: 1919-20-22-30-31-42" },
  ],
  timeline: [
    { y: "1915", t: "Gandhi ji South Africa se Bharat laute" },
    { y: "1919", t: "Rowlatt Act • 13 April: Jallianwala Bagh massacre" },
    { y: "1920", t: "Non-Cooperation + Khilafat Movement shuru" },
    { y: "1922", t: "Chauri Chaura kand — andolan wapas" },
    { y: "1929", t: "Lahore Session — 'Purna Swaraj' ka elaan (26 Jan 1930)" },
    { y: "1930", t: "Dandi March (12 Mar–6 Apr) — Civil Disobedience shuru" },
    { y: "1931", t: "Gandhi-Irwin Pact • 2nd Round Table Conference" },
    { y: "1942", t: "Quit India Movement — 'Do or Die' (8 Aug)" },
  ],
  mindmap: { central: "Nationalism in India",
    branches: [
      { label: "Satyagraha", color: "#2563eb", children: ["Champaran 1916", "Kheda 1917", "Ahmedabad 1918", "Rowlatt 1919"] },
      { label: "Non-Cooperation", color: "#16a34a", children: ["1920–22", "Khilafat + Swaraj", "Boycott videshi", "Chauri Chaura end"] },
      { label: "Civil Disobedience", color: "#ea580c", children: ["Dandi March 1930", "Namak kanoon toda", "Mahilayein judi", "Gandhi-Irwin Pact"] },
      { label: "Quit India", color: "#e11d48", children: ["8 Aug 1942", "'Do or Die'", "Neta giraftaar", "Parallel sarkarein"] },
    ]},
  flowchart: [
    { title: "Wajah (Cause)", desc: "Rowlatt Act, Jallianwala, mehengaai, Khilafat mudda" },
    { title: "Andolan shuru", desc: "Gandhi ji ka elaan — satyagraha, boycott, march" },
    { title: "Jan-bhaagidari", desc: "Kisaan, mazdoor, mahilayein, students sab jude" },
    { title: "Sarkar ka jawab?", desc: "Giraftaari / goli / samjhauta?", type: "decision" },
    { title: "Natija (Result)", desc: "Naya kanoon, ya andolan wapas, ya azadi ki ore kadam", type: "result" },
  ],
  notes: [
    "<b>1919:</b> Rowlatt Act (bina trial giraftari) + Jallianwala Bagh (Gen. Dyer).",
    "<b>Non-Cooperation (1920–22):</b> Khilafat ke saath; Chauri Chaura ke baad wapas.",
    "<b>Civil Disobedience (1930):</b> Dandi March 12 Mar–6 Apr; namak kanoon toda.",
    "<b>Quit India (1942):</b> 8 Aug Bombay; 'Do or Die'; neta giraftaar phir bhi chala.",
    "<b>Sense of collective belonging:</b> symbols, folklore, itihas, jhande se bana.",
    "<b>Map points:</b> Champaran, Kheda, Ahmedabad, Amritsar, Chauri Chaura, Dandi, Bombay.",
  ],
  quiz: [
    { q: "Gandhi ji South Africa se kab laute?", options: ["1915", "1919", "1920", "1930"], answer: 0, why: "January 1915 me Bharat aaye." },
    { q: "Jallianwala Bagh massacre kab hua?", options: ["13 April 1918", "13 April 1919", "15 Aug 1919", "26 Jan 1920"], answer: 1, why: "13 April 1919, Baisakhi ke din, Amritsar." },
    { q: "Non-Cooperation wapas kyun liya gaya?", options: ["Paise khatm", "Chauri Chaura hinsa", "Neta beemar", "Angrez maan gaye"], answer: 1, why: "Feb 1922 Chauri Chaura (UP) me police thana jalaya gaya." },
    { q: "Dandi March kitni doori ka tha?", options: ["100 miles", "150 miles", "240 miles", "500 miles"], answer: 2, why: "Sabarmati–Dandi, 24 din, 240 miles." },
    { q: "'Do or Die' naara kis andolan ka hai?", options: ["Non-Cooperation", "Civil Disobedience", "Quit India"], answer: 2, why: "8 Aug 1942, Bombay me Gandhi ji ne diya." },
  ],
  pyq: ["Why did Gandhi ji decide to withdraw the Non-Cooperation Movement? (CBSE 2023, 3m)", "Describe the Dandi March and its significance. (CBSE 2022, 5m)", "How did cultural symbols help in creating nationalism? (CBSE 2020, 3m)"],
},

"english-0-0": {
  slides: [
    { kicker: "Prose 1 • G.L. Fuentes", title: "A Letter to God",
      points: ["Lencho — mehnati kisaan, jise Bhagwan par andha vishwas", "Ole (hailstorm) ne fasal barbaad ki → usne GOD ko chitthi likhi!", "Theme: Faith (aastha) vs Reality — aur irony (vidambana)"],
      formula: "Faith can move mountains" },
    { kicker: "Story 1", title: "Lencho ki Aasha",
      points: ["Baarish = 'naye sikke' (new coins) — fasal hi uski daulat", "Badi boondein = 'dass-cent ke sikke', chhoti = 'paanch-cent'", "Personification: SE direction se baarish = uski khet ki taraf"],
      formula: "'The field of ripe corn with its flowers…'" },
    { kicker: "Story 2", title: "Toofan aur Barbaadi",
      points: ["Ek ghante tak ole gire — khet, ped, sab safed", "'The hail has left nothing' — ek bhi patta nahi bacha", "Par Lencho toota nahi: 'Bhagwan dega!' — yahi uska character"],
      formula: "Disaster → Despair → Faith" },
    { kicker: "Story 3", title: "Bhagwan ko Chitthi",
      points: ["100 pesos maange — dobara bone aur parivaar chalane ke liye", "'God' likhkar lifafe par — post office me sab hairan!", "Postmaster hasa, phir pighla — paisa ikattha kiya (70 pesos)"],
      formula: "100 pesos asked → 70 received" },
    { kicker: "Ending", title: "Irony — Sabse bada Twist",
      points: ["Lencho ne 70 pesos gine → BHAGWAN par gussa nahi, POST OFFICE par shak!", "Dusri chitthi: 'baaki 30 bhejo, par post office se MAT bhejo — chor hain!'", "Jo madad ki, wahi chor kehlaaye — situational irony ka best example"],
      formula: "Helpers = 'crooks'  (Irony!)" },
    { kicker: "Exam", title: "Exam Checklist",
      points: ["Character sketch of Lencho (faith, hardworking, innocent, stubborn)", "Irony in the story — 3 marks pakka", "Theme: blind faith — sahi ya galat? (opinion question)"],
      formula: "Q: Lencho's faith — strength or weakness?" },
  ],
  mindmap: { central: "A Letter to God",
    branches: [
      { label: "Characters", color: "#2563eb", children: ["Lencho — faithful farmer", "Wife — supportive", "Postmaster — kind, witty", "Postmen — helpers"] },
      { label: "Plot", color: "#16a34a", children: ["Hope (rain)", "Disaster (hail)", "Letter (100 pesos)", "Help (70 pesos)", "Irony (crooks!)"] },
      { label: "Themes", color: "#ea580c", children: ["Blind faith in God", "Human kindness", "Irony of life", "Hope vs reality"] },
      { label: "Devices", color: "#7c3aed", children: ["Irony (ending)", "Personification (rain-coins)", "Metaphor (locusts-hail)", "Symbolism (letter)"] },
    ]},
  flowchart: [
    { title: "Aasha", desc: "Baarish aayi — Lencho khush, 'naye sikke!'" },
    { title: "Musibat", desc: "Ole (hailstorm) — poori fasal barbaad" },
    { title: "Chitthi", desc: "God ko 100 pesos ki chitthi likhi" },
    { title: "Madad", desc: "Postmaster ne 70 pesos bheje" },
    { title: "Lencho ka reaction?", desc: "Shukriya ya shak?", type: "decision" },
    { title: "Irony!", desc: "Post office ko 'chor' kaha!", type: "result" },
  ],
  words: [
    { w: "downpour", m: "मूसलाधार बारिश", u: "The downpour destroyed the crops." },
    { w: "hailstorm", m: "ओलावृष्टि", u: "The hailstorm lasted for an hour." },
    { w: "amiable", m: "मिलनसार", u: "The postmaster was an amiable fellow." },
    { w: "conscience", m: "अंतःकरण / ज़मीर", u: "Tapping the letter on his desk, his conscience pricked him." },
    { w: "bother", m: "परेशान करना", u: "Don't bother God with small complaints." },
    { w: "crooks", m: "धोखेबाज़ / चोर", u: "Lencho called the post office employees crooks." },
  ],
  notes: [
    "<b>Author:</b> G.L. Fuentes (Mexican writer) — story of innocent faith.",
    "<b>Lencho:</b> hardworking, God-fearing, stubborn — faith = strength + weakness.",
    "<b>Postmaster:</b> kind-hearted — laughed first, then helped (70 pesos).",
    "<b>Irony:</b> helpers called 'crooks' — the story's soul, 3-mark question.",
    "<b>Message:</b> Faith gives courage; human kindness exists quietly.",
  ],
  quiz: [
    { q: "Lencho ne Bhagwan se kitne pesos maange?", options: ["50", "70", "100", "1000"], answer: 2, why: "100 pesos — sowing + family survival ke liye." },
    { q: "Postmaster ne kitne pesos bheje?", options: ["100", "70", "30", "50"], answer: 1, why: "Apni salary + doston se milakar 70 juta paya." },
    { q: "Fasal kisne barbaad ki?", options: ["Flood", "Hailstorm", "Locusts", "Drought"], answer: 1, why: "Ek ghante ke ole (hailstones) ne sab khatm kiya." },
    { q: "Lencho ne post office walon ko kya kaha?", options: ["Angels", "Crooks", "Friends", "Brothers"], answer: 1, why: "30 pesos kam mile → unhe chor samjha. Pure irony!" },
    { q: "Story ka main theme kya hai?", options: ["Revenge", "Blind faith in God", "War", "Travel"], answer: 1, why: "Lencho ki atoot aastha hi kahani ki jaan hai." },
  ],
  pyq: ["What is the irony in 'A Letter to God'? (CBSE 2023, 3m)", "Character sketch of Lencho. (CBSE 2022, 3m)", "Why did Lencho write a second letter to God? (CBSE 2020, 3m)"],
},

};

export function chapterDetail(key: string): ChapterDetail | null {
  return CHAPTER_DETAILS[key] || null;
}

export function totalQuizQuestions(): number {
  return Object.values(CHAPTER_DETAILS).reduce((a, d) => a + (d.quiz?.length || 0), 0);
}

/* Auto fallback jab detail na bhara ho — kabhi khaali page nahi */
export function autoDetail(chTitle: string, subName: string, chN: number): ChapterDetail {
  return {
    slides: [
      { kicker: `${subName} • Ch ${chN}`, title: chTitle,
        points: ["NCERT ko line-by-line padho — har heading ek concept hai", "Mushkil words/terms ko copy me likho", "Is chapter ka mind map khud banao — yaad tez hoga"],
        formula: "Teacher: Admin panel me full slides bharo" },
      { kicker: "Study plan", title: "Kaise padhein? (Smart tarika)",
        points: ["Step 1: Pehle poora chapter ek baar reading karo", "Step 2: Important points highlight karo", "Step 3: Quiz do aur galtiyan revise karo"] },
      { kicker: "Exam tips", title: "Exam me full marks kaise?",
        points: ["Answer me heading + points + diagram/example", "Numerical me formula → steps → unit → answer", "Revision: last 7 din me ye chapter 2 baar"] },
    ],
    notes: [
      `<b>${chTitle}</b> — NCERT reading se apne points banao.`,
      "Har heading ka 2-line summary copy me likho.",
      "Diagrams/formulas/dates alag page par revise karo.",
      "Purane board questions (PYQ) zaroor practice karo.",
    ],
    quiz: [
      { q: `Chapter "${chTitle}" ka main focus kya hona chahiye?`, options: ["Sirf ratna", "Concepts + NCERT + practice", "Sirf guide padhna", "Exam se pehle dekhna"], answer: 1, why: "Concept + NCERT + practice = pakke marks." },
      { q: "Revision ka best tarika?", options: ["Ek baar padhna", "Likho + bolo + quiz do", "Doston se sunna", "Raat bhar jaagna"], answer: 1, why: "Active recall (likhna/bolna/quiz) sabse tez yaad karata hai." },
    ],
  };
}
