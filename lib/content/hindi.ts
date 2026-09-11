/* Hindi — Kshitij (poetry 6 + prose 6) + Kritika (3). Keys: hindi-0-x, hindi-1-x, hindi-2-x.
   Framework/quiz in English (site rule); Hindi terms & word bank in Devanagari. */
import type { ChapterDetail } from "./types";

export const HINDI: Record<string, ChapterDetail> = {

/* ================= KSHITIJ — POETRY ================= */

"hindi-0-0": {
  slides: [
    { kicker: "Kshitij • Poetry 1", title: "सूर के पद — Surdas",
      points: ["Surdas: the greatest Krishna-bhakti poet of the Bhaktikal (16th century)", "Pads in this chapter: Krishna's childhood leelas and the Uddhav–Meera samvad", "Language: Brajbhasha — soft, musical, full of emotion"], formula: "Bhakti + Vatsalya (maternal love) = Surdas's pad" },
    { kicker: "Themes", title: "Krishna Leela and Gopis' Love",
      points: ["Yashoda's motherly love — Krishna's childhood pranks (makhan-chori)", "The gopis' pain of separation (viraha) when Krishna leaves Gokul", "Uddhav samvad: knowledge (gyan) vs love (bhakti) — love wins"], formula: "Prem > Gyan — the message of the pads" },
    { kicker: "Exam Corner", title: "Surasari and Craft",
      points: ["Famous line: 'जसुदा ललात टेकि निकट लागि बैठायो' — motherly affection", "Devices: अनुप्रास (alliteration), दृष्टांत (simile), रस — वात्सल्य और श्रृंगार", "Answers: context + emotion + device"], formula: "Ras: Vatsalya • Viraha • Bhakti" },
  ],
  notes: [
    "सूरदास were blind by a popular legend — <b>'सूर' ने नेत्र नहीं, भक्ति से कृष्ण देखे</b>.",
    "Main pads: <b>मैया मोहि दाउ बहुत खिझायो</b> (Krishna's complaint) and the <b>Uddhav–gopi samvad</b>.",
    "वात्सल्य रस dominates — Yashoda's worries, Krishna's innocence.",
    "Uddhav's gyan is defeated by gopis' pure prem — <b>love is the highest truth</b>.",
    "Brajbhasha + अनुप्रास make the pads sing — quote 1-2 lines in answers.",
  ],
  words: [
    { w: "टेकि", m: "after touching / taking support", u: "जसुदा ललात टेकि — bowing to fate, Yashoda" },
    { w: "खिझायो", m: "teased / annoyed", u: "मोहि दाउ बहुत खिझायो — the complaint of child Krishna" },
    { w: "बालक ब्यवहार", m: "childlike behaviour", u: "कृष्ण का बालक ब्यवहार वात्सल्य रस जगाता है" },
    { w: "विरह", m: "pain of separation", u: "गोपियों का विरह सूर के पदों की आत्मा है" },
  ],
  quiz: [
    { q: "Which rasa dominates Surdas's pads about Krishna's childhood?", options: ["Veer", "Vatsalya", "Shantar", "Karun"], answer: 1, why: "Motherly affection (vatsalya) is the core of Bal-leela pads." },
    { q: "In the Uddhav samvad, what defeats knowledge?", options: ["Wealth", "Pure love (bhakti/prem)", "Force", "Logic"], answer: 1, why: "The gopis' love is shown higher than Uddhav's gyan." },
  ],
  pyq: ["सूरदास के पदों में वात्सल्य रस की अभिव्यक्ति पर प्रकाश डालिए। (CBSE 2023, 3m)", "उद्धव-गोपी संवाद का मूल संदेश स्पष्ट कीजिए। (CBSE 2022, 3m)"],
},

"hindi-0-1": {
  slides: [
    { kicker: "Kshitij • Poetry 2", title: "राम-लक्ष्मण-परशुराम संवाद — Tulsidas",
      points: ["From Ramcharitmanas (Bal Kand) — a confrontational yet holy dialogue", "Parshuram, furious after Sita's swayamvar, blocks the marriage procession", "The 'dialogue' is through signs (संकेतों में संवाद) — a unique poetic device"], formula: "Anger meets calm — maryada wins" },
    { kicker: "The Scene", title: "Parshuram's Question, Ram's Silence",
      points: ["Parshuram: 'Who broke the Shiv-dhanush?' — the axe shakes with rage", "Lakshman's witty reply provokes him further ('it just fell apart!')", "Ram answers humbly — calling the sin his own if any", "Parshuram recognises Ram as Vishnu — his anger melts into devotion"], formula: "Vinay (humility) turned foe into devotee" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["संवाद विधा (dialogue form) — every character speaks in their own tone", "Lakshman: witty-bold; Parshuram: proud-fierce; Ram: calm-humble", "Answer: scene + Lakshman's wit + Ram's humility + Parshuram's realisation"], formula: "Ram = maryada purushottam" },
  ],
  notes: [
    "This संवाद appears in <b>बालकांड of रामचरितमानस</b>, just after सीता स्वयंवर.",
    "परशुराम's fury: someone broke <b>शिव-धनुष</b>, his guru's sacred bow.",
    "लक्ष्मण answers sarcastically — 'धनुष टूटा ही नहीं, जैसे बाँस टूटता है' — provoking him.",
    "राम responds with विनय-व्यवहार — <b>humility converts anger into devotion</b>.",
    "Devices: संवाद, प्रतीक (धनुष = pride/power), अनुप्रास; रस — वीर + शांत.",
  ],
  words: [
    { w: "कुपित", m: "extremely angry", u: "परशुराम कुपित होकर राम पर छाती धकेलते हैं" },
    { w: "संकेत", m: "sign / indirect hint", u: "राम और परशुराम संकेतों में बात करते हैं" },
    { w: "प्रतिज्ञा", m: "vow / promise", u: "परशुराम की प्रतिज्ञा थी — झूठा अहंकार नहीं" },
    { w: "विनय", m: "humility", u: "राम के विनय ने परशुराम का क्रोध शांत किया" },
  ],
  quiz: [
    { q: "Whose bow did Ram break, angering Parshuram?", options: ["Vishnu's", "Shiv-dhanush", "Parshuram's own", "Indra's"], answer: 1, why: "The Shiv-dhanush at Sita's swayamvar." },
    { q: "How does the dialogue end?", options: ["In a fight", "Parshuram recognises Ram as divine and calms down", "Ram apologises and leaves", "Lakshman defeats Parshuram"], answer: 1, why: "Parshuram's rage melts into devotion." },
  ],
  pyq: ["लक्ष्मण की चतुराई किन पंक्तियों से प्रकट होती है? (CBSE 2023, 3m)", "इस संवाद में राम का चरित्र-चित्रण कीजिए। (CBSE 2022, 3m)"],
},

"hindi-0-2": {
  slides: [
    { kicker: "Kshitij • Poetry 3", title: "आत्मकथ्य — Jaishankar Prasad",
      points: ["A self-reflective poem: the poet looks back at his own life", "Life gave him deep sorrow — yet he never stopped walking", "From 'कुछ तो मिला' to eternal hope — the journey of an artist"], formula: "Dard hi merे जीवन की पूंजी बना" },
    { kicker: "Themes", title: "Sorrow, Solitude and Self-Realisation",
      points: ["The poet lost his father early; responsibility came in childhood", "'मैं बिना बोझ उठाए चल पड़ना नहीं जानता' — burdens became his strength", "His wounds became his creativity — sorrow turned into poetry"], formula: "Wounds → Wings" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["Tone: confessional, calm, philosophical", "Devices: पुनरुक्ति (repetition of 'कभी'), मानवीकरण", "Answer: poet's losses + his refusal to quit + hope"], formula: "आत्मकथ्य = छायावादी आत्म-दर्शन" },
  ],
  notes: [
    "जयशंकर प्रसाद — प्रमुख <b>छायावाद</b> कवि; यह कविता उनके जीवन का दर्पण है.",
    "Key thought: <b>'मेरे जीवन का आरंभ उदास विरह गीत से'</b> — life began on a note of separation.",
    "The poet accepts sorrow as <b>capital (पूंजी)</b>, not curse.",
    "मानवीकरण: समय, संसार, जीवन — सब मानव बनकर सामने आते हैं.",
    "Message: <b>संघर्ष ही साधना है</b> — walking on despite wounds is victory.",
  ],
  words: [
    { w: "विरह गीत", m: "song of separation", u: "जीवन का आरंभ उदास विरह गीत से हुआ" },
    { w: "पूंजी", m: "capital / wealth", u: "दुख ही जीवन की पूंजी बन गया" },
    { w: "निराशा", m: "hopelessness", u: "निराशा से नहीं झुका, डटकर लड़ता रहा" },
  ],
  quiz: [
    { q: "Jaishankar Prasad belongs to which poetic school?", options: ["Ritikavya", "Chhayavad", "Nai Kavita", "Bhaktikal"], answer: 1, why: "He is a leading Chhayavadi poet." },
    { q: "What became the poet's capital in life?", options: ["Money", "His sorrow and struggle", "Fame", "Friends"], answer: 1, why: "Dard became his पूंजी — the source of his art." },
  ],
  pyq: ["'आत्मकथ्य' में कवि के जीवन-दर्शन पर प्रकाश डालिए। (CBSE 2023, 3m)"],
},

"hindi-0-3": {
  slides: [
    { kicker: "Kshitij • Poetry 4", title: "उत्साह — Suryakant Tripathi 'Nirala'",
      points: ["A poem of unstoppable energy and self-confidence", "The poet refuses to surrender to fate — 'नहीं मानूंगा!' echoes through it", "Nature imagery: storms, mountains, oceans — the poet's will is bigger than all"], formula: "नहीं मानूंगा — I will not accept defeat" },
    { kicker: "Themes", title: "Willpower Against Fate",
      points: ["Fate (विपदा) strikes repeatedly — the poet stands like a mountain", "Nirala's own life: poverty, loneliness, rebellion — yet he sang fearlessly", "The poem is a call to every reader: rise, struggle, create"], formula: "Rebellion + Optimism = Nirala's voice" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["Tone: aggressive, defiant, energetic (ऊर्जावान)", "Devices: पुनरुक्ति ('नहीं मानूंगा'), रूपक, अतिशयोक्ति", "Answer: fate's attacks + poet's refusal + inspirational message"], formula: "मुझे तोड़ना चाहते हैं — पर मैं टूटकर बिखर नहीं जाऊंगा" },
  ],
  notes: [
    "निराला का जीवन संघर्षमय था — <b>गरीबी, अकेलापन, विद्रोह</b> — फिर भी झुके नहीं.",
    "प्रसिद्ध पंक्ति-भाव: <b>'नहीं मानूंगा, नहीं मानूंगा… नहीं मानूंगा फिर!'</b>",
    "कवि विपदा को <b>चुनौती</b> देता है — आँधी से लड़ने का संकल्प.",
    "Devices: पुनरुक्ति gives the poem its drumbeat energy.",
    "Message: <b>मनुष्य भाग्य का दास नहीं, स्वयं के भाग्य का निर्माता है</b>.",
  ],
  words: [
    { w: "विपदा", m: "calamity / misfortune", u: "विपदा बार-बार चढ़कर आई, मैं नहीं मानूंगा" },
    { w: "तेज", m: "speed / brilliance", u: "तेज आँधी भी कवि का उत्साह नहीं तोड़ सकी" },
    { w: "संकल्प", m: "firm resolution", u: "निराला का संकल्प चट्टान जैसा था" },
  ],
  quiz: [
    { q: "What is the central mood of 'उत्साह'?", options: ["Sorrow", "Defiant self-confidence", "Fear", "Nostalgia"], answer: 1, why: "The poet repeatedly refuses to accept defeat." },
    { q: "Which device repeats through the poem?", options: ["रूपक", "पुनरुक्ति (repetition)", "श्लेष", "यमक"], answer: 1, why: "'नहीं मानूंगा' echoes like a war-drum." },
  ],
  pyq: ["'उत्साह' कविता का संदेश अपने शब्दों में लिखिए। (CBSE 2022, 3m)"],
},

"hindi-0-4": {
  slides: [
    { kicker: "Kshitij • Poetry 5", title: "यह दंतुरित मुस्कान — Nagarjun",
      points: ["Nagarjun: the 'jan-kavi' (people's poet) of modern Hindi", "The poem plays with a smile that shows teeth — a rare, alive, mischievous smile", "Simple everyday imagery, deep human warmth"], formula: "दंतुरित मुस्कान = अपनापन भरी मुस्कान" },
    { kicker: "Themes", title: "Human Warmth in Small Moments",
      points: ["A closed, formal smile hides; an open smile with teeth reveals joy", "Nagarjun finds poetry in ordinary faces — farmers, children, streets", "The smile becomes a symbol of honest, unguarded life"], formula: "Simplicity = Nagarjun's poetry" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["Tone: light, affectionate, observational", "Devices: चित्रात्मक वर्णन (vivid imagery), प्रतीक (smile = openness)", "Answer: image + contrast (closed vs open smile) + human message"], formula: "मुस्कान में छिपा इंसान" },
  ],
  notes: [
    "नागार्जुन को <b>जनकवि</b> कहा जाता है — आम लोगों की भाषा में लिखते थे.",
    "दंतुरित मुस्कान = <b>दाँत दिखाकर हँसना</b> — बिना झिझक की खुशी.",
    "कविता में दो तरह की मुस्कानों का अंतर — <b>बनावटी बनाम सहज</b>.",
    "भाषा: मैथिली-हिंदी का सहज मिश्रण — बोलचाल की ताज़गी.",
    "Message: जीवन की <b>छोटी-छोटी खुशियों</b> को पहचानो और जियो.",
  ],
  words: [
    { w: "दंतुरित", m: "showing teeth / toothy", u: "दंतुरित मुस्कान भरी खुशी जगाती है" },
    { w: "सहज", m: "natural, effortless", u: "सहज मुस्कान ही असली मुस्कान है" },
    { w: "जनकवि", m: "poet of the people", u: "नागार्जुन जनकवि कहलाते हैं" },
  ],
  quiz: [
    { q: "Nagarjun is known as…", options: ["Chhayavadi kavi", "Jan-kavi (people's poet)", "Ritikal kavi", "Nai kavita poet"], answer: 1, why: "He wrote in the language of common people." },
    { q: "What does the toothy smile symbolise?", options: ["Anger", "Open, honest joy", "Pride", "Fear"], answer: 1, why: "An unguarded, alive smile stands for honest living." },
  ],
  pyq: ["नागार्जुन की कविता में सहज जीवन-मूल्यों की झलक पर टिप्पणी कीजिए। (CBSE 2023, 3m)"],
},

"hindi-0-5": {
  slides: [
    { kicker: "Kshitij • Poetry 6", title: "संगतकार — Manglesh Dabral",
      points: ["The poem honours the accompanist (संगतकार) — the artist behind the main singer", "The one who supports from behind and asks for no limelight", "A poem about every 'supporter' in life and history"], formula: "नायक के पीछे का अनकहा नायक" },
    { kicker: "The Central Image", title: "The Voice Behind the Voice",
      points: ["'मुझे गायक के पीछे रहना है' — a weak, trembling voice that still supports", "When the main singer falters at the peak, the accompanist saves him", "Their not coming forward is humanity, not weakness"], formula: "उसकी मनुष्यता समझनी चाहिए" },
    { kicker: "Exam Corner", title: "Meaning & Answers",
      points: ["Theme: dignity of unsung supporters — in music, films, society, history", "The तानपूरा/सारंगी player = every helper whose name we never learn", "Answer: image + the saving moment + humanity message"], formula: "सहयोगी की शांत महिमा" },
  ],
  notes: [
    "संगतकार = मुख्य गायक के साथ गाने/बजाने वाला कलाकार.",
    "मंगलेश डबराल — आधुनिक हिंदी के प्रमुख <b>जनवादी कवि</b> (साहित्य अकादमी पुरस्कार).",
    "मुख्य पंक्ति-भाव: जब गायक का गला बिखरने लगता है, <b>संगतकार उसे सँभाल लेता है</b>.",
    "कविता मानवीय संवेदना सिखाती है — <b>सामने न आना कमजोरी नहीं, मानवता है</b>.",
    "हर क्षेत्र में संगतकार हैं — फिल्म, खेल, परिवार, इतिहास — कविता सबको सलाम करती है.",
  ],
  words: [
    { w: "संगतकार", m: "accompanist / supporting artist", u: "संगतकार मुख्य गायक का साथ निभाता है" },
    { w: "गर्ज", m: "a high, thundering note", u: "गर्ज से गाना ऊँचाई पर जाता है" },
    { w: "तान", m: "musical phrase of notes", u: "जटिल तानों को संगतकार सँभालता है" },
    { w: "तौसे बाँधना", m: "to console / support", u: "बिखरते गायक को तौसे बाँधता है संगतकार" },
  ],
  quiz: [
    { q: "Who is a 'sangatkar'?", options: ["The main singer", "The supporting artist behind the main performer", "A music teacher", "A lyricist"], answer: 1, why: "He gives company (sangat) — voice or instrument." },
    { q: "When does the accompanist matter most?", options: ["At the start", "When the main singer falters at the peak", "After the show", "Never"], answer: 1, why: "He catches and saves the breaking note — quiet heroism." },
  ],
  pyq: ["'संगतकार' कविता में अनकहे सहयोगियों की महिमा कैसे दर्शाई गई है? (CBSE 2023, 3m)"],
},

/* ================= KSHITIJ — PROSE ================= */

"hindi-1-0": {
  slides: [
    { kicker: "Kshitij • Prose 1", title: "नेताजी का चश्मा — Swayam Prakash",
      points: ["A story of blind patriotism — a small town, a statue, and a pair of glasses", "Halidar Sahab: a retired employee lost in memories of Netaji", "The 'Captain': a poor, spectacled freedom-lover who never got his due"], formula: "चश्मा = देशभक्ति का प्रतीक" },
    { kicker: "The Story", title: "Statue, Glasses and Irony",
      points: ["The town builds Netaji's statue — but the sculptor's statue has no glasses", "Halidar Sahab feels incomplete: 'Netaji without glasses!' — he cannot sleep", "The Captain repeatedly places his own glasses on the statue — they vanish every time", "Truth: the municipality keeps removing them; the Captain dies waiting for recognition"], formula: "अपनी कुर्बानी की पहचान चाहता था कैप्टन" },
    { kicker: "Exam Corner", title: "Satire & Answers",
      points: ["Satire on official 'statue-patriotism' vs real, unnoticed patriots", "Halidar Sahab: emotional, honest; Captain: unsung, simple devotee of Netaji", "Answer: statue event + Captain's act + the ironic end"], formula: "मूर्ति में चश्मा, मज़ाक में संदेश" },
  ],
  notes: [
    "हालदार साहब को <b>नेताजी की मूर्ति</b> बिना चश्मे की अधूरी लगती है.",
    "कैप्टन — <b>सेनानी न होते हुए भी</b> लोगों का सम्मानित 'कैप्टन'; चश्मेवाले देशभक्त.",
    "कैप्टन बार-बार <b>मूर्ति पर अपना चश्मा</b> लगा देता था — नगरपालिका हटाती रही.",
    "व्यंग्य: मूर्ति तो बनती है, <b>जीवित देशभक्तों की परवाह नहीं</b> होती.",
    "अंत में कैप्टन की मृत्यु — हालदार साहब को सच्ची देशभक्ति की पहचान मिलती है.",
  ],
  words: [
    { w: "कैप्टन", m: "the respected 'captain' of the story", u: "कैप्टन बार-बार मूर्ति पर चश्मा लगाते थे" },
    { w: "सरकंडा", m: "reed / bamboo piece", u: "मूर्ति पर सरकंडे का चश्मा उम्मीद जगाता है" },
    { w: "देशभक्ति", m: "patriotism", u: "कैप्टन की देशभक्ति निःस्वार्थ थी" },
    { w: "मायूस", m: "dejected", u: "हालदार साहब पहले मायूस हो गए थे" },
  ],
  quiz: [
    { q: "What bothered Halidar Sahab about the statue?", options: ["Its height", "It had no glasses", "Its location", "Its colour"], answer: 1, why: "Netaji's statue felt incomplete without the iconic glasses." },
    { q: "Who kept placing glasses on the statue?", options: ["The mayor", "The Captain", "Halidar Sahab", "The sculptor"], answer: 1, why: "The Captain offered his own glasses again and again." },
  ],
  pyq: ["'नेताजी का चश्मा' कहानी का व्यंग्य स्पष्ट कीजिए। (CBSE 2023, 3m)", "कैप्टन का चरित्र-चित्रण कीजिए। (CBSE 2022, 3m)"],
},

"hindi-1-1": {
  slides: [
    { kicker: "Kshitij • Prose 2", title: "बालगोबिन भगत — Ramvriksha Benipuri",
      points: ["A portrait of a saintly villager — Baul-gosain, a wandering monk", "Balgobin Bhagat: lives in a hut, owns almost nothing, serves everyone", "The writer watches a modern 'idea-less' crowd and finds a realised soul"], formula: "संत जो बिना माँगे देते रहते हैं" },
    { kicker: "The Portrait", title: "Service Without Show",
      points: ["Bhagat sings Ram's name while grinding grain — work is worship", "Gives away everything he receives; keeps nothing for tomorrow", "His humility and kirtan make even festive crowds fall silent"], formula: "कर्म ही पूजा है" },
    { kicker: "Exam Corner", title: "Character & Answers",
      points: ["Bhagat: अहिंसक, दानशील, ईश्वर-प्रेमी — a living ideal", "Contrast: religious show-offs vs the quiet saint", "Answer: appearance + daily life + one giving incident + lesson"], formula: "सादगी + सेवा = संतत्व" },
  ],
  notes: [
    "बालगोबिन भगत एक <b>बौल-गोसाईं</b> थे — भजन-कीर्तन करते हुए घूमते साधु.",
    "लेखक बेनीपुरी उन्हें <b>जीवित संत</b> कहते हैं — वाणी में सच, जीवन में त्याग.",
    "जो मिला, बाँट दिया — <b>संचय कभी नहीं किया</b>; चरखा/जप और कीर्तन ही संपत्ति.",
    "कहानी-शैली चरित्र-चित्रण (portrait) है — घटनाओं से व्यक्तित्व खुलता है.",
    "संदेश: <b>मानव-सेवा ही प्रभु-सेवा है</b>; धर्म दिखावे में नहीं, आचरण में है.",
  ],
  words: [
    { w: "बौल-गोसाईं", m: "wandering saint of the Baul tradition", u: "बालगोबिन भगत बौल-गोसाईं थे" },
    { w: "चरखा", m: "spinning wheel", u: "कीर्तन करते हुए चरखा कातते थे" },
    { w: "संत", m: "saint", u: "संत की पहचान सादगी से होती है" },
    { w: "दानशील", m: "charitable", u: "भगत अत्यंत दानशील थे" },
  ],
  quiz: [
    { q: "Who was Balgobin Bhagat?", options: ["A rich merchant", "A saintly Baul-gosain", "A village head", "A soldier"], answer: 1, why: "A wandering, saintly devotee who served everyone." },
    { q: "What was Bhagat's attitude to possessions?", options: ["Hoarded wealth", "Gave away everything, kept nothing", "Sold for profit", "Borrowed heavily"], answer: 1, why: "Whatever he received, he distributed." },
  ],
  pyq: ["बालगोबिन भगत के व्यक्तित्व की तीन विशेषताएँ लिखिए। (CBSE 2023, 3m)"],
},

"hindi-1-2": {
  slides: [
    { kicker: "Kshitij • Prose 3", title: "लखनवी अंदाज़ — Yashpal",
      points: ["A humour-satire from Nawabi Lucknow — the era of show-off courtesy", "A Nawab's court: generosity must be advertised, or it loses value", "Munshi Nawab Rai and the 'publicity manager' of kindness"], formula: "दान भी, ढिंढोरा भी" },
    { kicker: "The Satire", title: "Generosity or Advertisement?",
      points: ["The Nawab gives — but a herald must announce the gift loudly", "Without publicity the gift feels wasted; reputation is the real currency", "Yashpal mocks the hollow ritual-politeness of the feudal class"], formula: "बिन प्रचार का दान व्यर्थ" },
    { kicker: "Exam Corner", title: "Humour & Answers",
      points: ["Devices: व्यंग्य (satire), हास्य (humour), अतिशयोक्ति", "Lucknow's 'तहज़ीब' shown with all its decoration and decay", "Answer: scene + the announcement trick + what is mocked"], formula: "ठीक है बाबा, अपनी मर्ज़ी" },
  ],
  notes: [
    "कहानी नवाबी <b>लखनऊ के दांडगई-कलचर</b> पर तंज़ कसती है.",
    "नवाब की खैरात के साथ <b>उसका ढिंढोरा</b> ज़रूरी था — वरना 'फज़ूल' मानी जाती.",
    "मुंशी/कातिब प्रचार का काम करते — <b>ईमानदार चापलूसी</b> का चित्रण.",
    "हास्य-शैली: बड़बोले लखनवी अंदाज़ — 'परचा मारना', 'काटना' जैसी मुहावरेदार भाषा.",
    "संदेश: <b>असली नेकी चुपचाप होती है</b>, मंच पर नहीं.",
  ],
  words: [
    { w: "ढिंढोरा", m: "public beating of drum (publicity)", u: "दान का ढिंढोरा पीटा जाता था" },
    { w: "खैरात", m: "charity / alms", u: "नवाब की खैरात मशहूर थी" },
    { w: "तहज़ीब", m: "refined etiquette / culture", u: "लखनवी तहज़ीब की मिसालें दीजिए" },
    { w: "तहस-नहस", m: "ruined completely", u: "समृद्धि तहस-नहस हो गई" },
  ],
  quiz: [
    { q: "What does 'लखनवी अंदाज़' satirise?", options: ["Farmers", "Show-off generosity and hollow etiquette of Nawabs", "Modern cities", "Schools"], answer: 1, why: "Charity performed for advertisement, not compassion." },
    { q: "According to the story, a gift without publicity is…", options: ["Holy", "Considered wasted", "Illegal", "Enough"], answer: 1, why: "Reputation, not giving, was the real aim." },
  ],
  pyq: ["'लखनवी अंदाज़' के शीर्षक की सार्थकता लिखिए। (CBSE 2022, 3m)"],
},

"hindi-1-3": {
  slides: [
    { kicker: "Kshitij • Prose 4", title: "एक कहानी यह भी — Mannu Bhandari",
      points: ["An autobiographical piece — how a girl from Ajmer became a writer", "Her father: a strict, dedicated educator of girls; her teacher Sheela Agrawal", "Freedom's wave ('42), small-town childhood, and the birth of a storyteller"], formula: "एक लेखिका का निर्माण" },
    { kicker: "The Journey", title: "Father, Teacher and Rebellion",
      points: ["Father ran a girls' school — principled but hot-tempered; discipline at home", "Sheela Agrawal, the young teacher, lit the first spark of writing", "The girl who watched, questioned and absorbed — finally found her voice in words"], formula: "अनुशासन + प्रेरणा = सृजन" },
    { kicker: "Exam Corner", title: "Themes & Answers",
      points: ["Theme: making of an artist; education of girls; childhood memories", "Father: tough yet dedicated; Mannu: sensitive, rebellious observer", "Answer: incident + influence + how it shaped her writing"], formula: "यादें ही साहित्य बनीं" },
  ],
  notes: [
    "मन्नू भंडारी का जन्म <b>मध्य प्रदेश (भानपुरा)</b> में; पिता <b>महावीर प्रसाद?</b> नहीं — पिता शिक्षाविद् थे, लड़कियों का स्कूल चलाते थे.",
    "पिता का अनुशासन सख्त, पर <b>बेटियों की शिक्षा</b> में पूरी लगन थी.",
    "प्रेरणा-स्रोत: <b>शीला अग्रवाल</b> — जिनसे लेखिका की संवेदना जागी.",
    "'42 का देशभक्ति का माहौल बच्ची मन्नू पर असर छोड़ गया.",
    "संदेश: <b>लेखक परिस्थितियों में बनता है</b> — पिता की सख़्ती और टीचर की कोमलता दोनों ज़रूरी थीं.",
  ],
  words: [
    { w: "आत्मकथा", m: "autobiography", u: "यह रचना आत्मकथात्मक अंश है" },
    { w: "अवकाश", m: "vacation / leisure", u: "गर्मी के अवकाश में अजमेर आते थे" },
    { w: "संवेदना", m: "sensitivity", u: "लेखिका की संवेदना बचपन से गहरी थी" },
    { w: "विरोध", m: "opposition / protest", u: "पिता के अनुशासन के विरोध में खड़ी होती थीं" },
  ],
  quiz: [
    { q: "What kind of work is 'एक कहानी यह भी'?", options: ["A detective story", "An autobiographical account", "A science fiction", "A play"], answer: 1, why: "Mannu Bhandari recalls her own becoming as a writer." },
    { q: "Who inspired young Mannu towards writing?", options: ["Her mother", "Her teacher Sheela Agrawal", "The Nawab", "Her sister"], answer: 1, why: "The young teacher lit the first spark." },
  ],
  pyq: ["मन्नू भंडारी के पिता का चरित्र-चित्रण कीजिए। (CBSE 2023, 3m)"],
},

"hindi-1-4": {
  slides: [
    { kicker: "Kshitij • Prose 5", title: "नौबतखाने में इबादत — Yatindra Mishra",
      points: ["A lyrical portrait (व्यक्ति-चित्र) of Ustad Bismillah Khan", "From the lanes of Dumraon to the banks of the Ganga — shehnai's greatest ambassador", "Music as ibadat (worship) — guru–shishya tradition, riyaaz, dedication"], formula: "संगीत = इबादत (worship)" },
    { kicker: "The Portrait", title: "Bismillah and the Shehnai",
      points: ["As a child he moved to Kashi (Varanasi) — his maternal home of musicians", "The shehnai's voice and the Ganga's flow became one for him", "Honours: Bharat Ratna — the first musician to receive it; devoted his life to riyaaz", "He saw music as prayer with vidhi-vidhan — rules, discipline, devotion"], formula: "80 वर्ष की उम्र में भी साधना जारी" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["Genre: व्यक्ति-चित्र (portrait-sketch) — incident + personality", "Themes: dedication, tradition, guru–shishya parampara, spiritual music", "Answer: early life + sadhana + honours + 'music is worship' idea"], formula: "शहनाई के उस्ताद, इबादत के साधक" },
  ],
  notes: [
    "उस्ताद <b>बिसमिल्लाह खाँ</b> का जन्म <b>उमराव (बिहार)</b> के संगीत-प्रेमी परिवार में हुआ.",
    "बचपन में काशी आए — <b>मामूजान</b> (अलीबक्श-हुसैनबक्श वंश) से तालीम.",
    "गंगा घाट पर <b>रियाज़</b>; शहनाई को मंगल-अवसरों से राष्ट्रीय मंच तक पहुँचाया.",
    "संगीत के लिए <b>शास्त्र, गुरु-शिष्य परंपरा, तन्मयता, धैर्य</b> — चारों ज़रूरी.",
    "सम्मान: <b>भारत रत्न</b> समेत तमाम; फिर भी सादगी और विनम्रता अडिग.",
  ],
  words: [
    { w: "इबादत", m: "worship / prayer", u: "बिसमिल्लाह खाँ के लिए संगीत इबादत थी" },
    { w: "नौबतखाना", m: "place where ceremonial instruments play", u: "नौबतखाने से निकलती मंगलध्वनि" },
    { w: "रियाज़", m: "musical practice", u: "घंटों रियाज़ करते थे" },
    { w: "तन्मयता", m: "deep absorption", u: "साधना में पूरी तन्मयता चाहिए" },
    { w: "व्यक्ति-चित्र", m: "portrait sketch (genre)", u: "यह रचना व्यक्ति-चित्र है" },
  ],
  quiz: [
    { q: "Whose portrait is 'नौबतखाने में इबादत'?", options: ["Ustad Amir Khan", "Ustad Bismillah Khan", "Ustad Zakir Hussain", "Pt. Ravi Shankar"], answer: 1, why: "It portraits shehnai maestro Ustad Bismillah Khan." },
    { q: "For Bismillah Khan, music was…", options: ["A profession only", "Ibadat — a form of worship", "A hobby", "A competition"], answer: 1, why: "He practised it as devotion with full discipline." },
  ],
  pyq: ["बिसमिल्लाह खाँ के जीवन की साधना-भावना समझाइए। (CBSE 2023, 3m)"],
},

"hindi-1-5": {
  slides: [
    { kicker: "Kshitij • Prose 6", title: "संस्कृति — Bhadant Anand Kausalyayan",
      points: ["An essay distinguishing सभ्यता (civilization) from संस्कृति (culture)", "Civilisation = the fruits we enjoy (fire, tools, comforts)", "Culture = the inner human quest — truth, beauty, goodwill"], formula: "संस्कृति = चेतना; सभ्यता = परिणाम" },
    { kicker: "The Argument", title: "Two Words, Two Worlds",
      points: ["Useful things that come fastest and are used most: सभ्यता and संस्कृति", "Civilisation divided (material vs spiritual) becomes confused", "Human culture is indivisible — dividing it brings sorrow, not strength"], formula: "मानव संस्कृति अविभाज्य है" },
    { kicker: "Exam Corner", title: "Ideas & Answers",
      points: ["Examples: fire and the needle — inventions (civilisation); their humane use (culture)", "Newton = cultured civilised man; today's scientist knows more, is not necessarily more cultured", "Answer: definition + examples + 'indivisible culture' conclusion"], formula: "जो कल्याणकारी नहीं, वो न सभ्यता है न संस्कृति" },
  ],
  notes: [
    "लेखक: <b>भदंत आनंद कौसल्यायन</b> — बौद्ध भिक्षु, हिंदी सेवी.",
    "<b>सभ्यता</b>: बाहरी साधन-सुविधाएँ (आग, सूई, यंत्र) — संस्कृति का परिणाम.",
    "<b>संस्कृति</b>: आंतरिक चेतना — सत्य, सौंदर्य, कल्याण की खोज.",
    "न्यूटन जैसे वैज्ञानिक = <b>संस्कृत मानव</b>; केवल जानकारी बढ़ने से संस्कृति नहीं बढ़ती.",
    "निष्कर्ष: <b>मानव संस्कृति एक अविभाज्य वस्तु है</b> — इसका बँटवारा करने वालों पर लेखक को आश्चर्य और दुख है.",
  ],
  words: [
    { w: "सभ्यता", m: "civilisation (outer means)", u: "सभ्यता संस्कृति का परिणाम है" },
    { w: "संस्कृति", m: "culture (inner consciousness)", u: "संस्कृति अविभाज्य है" },
    { w: "अविभाज्य", m: "indivisible", u: "मानव संस्कृति अविभाज्य वस्तु है" },
    { w: "कल्याणकारी", m: "beneficial / for welfare", u: "जो कल्याणकारी नहीं, वह संस्कृति नहीं" },
  ],
  quiz: [
    { q: "According to the essay, civilization is…", options: ["The same as culture", "The result/product of culture", "Opposite of culture", "Only religion"], answer: 1, why: "Sanskriti (culture) is the seed; sabhyata (civilisation) the fruit." },
    { q: "What is the essay's final message?", options: ["Culture must be divided by nation", "Human culture is one and indivisible", "Machines decide culture", "Culture is useless"], answer: 1, why: "Dividing human culture brings only sorrow." },
  ],
  pyq: ["सभ्यता और संस्कृति में अंतर स्पष्ट कीजिए। (CBSE 2023, 3m)", "'मानव संस्कृति अविभाज्य है' — व्याख्या कीजिए। (CBSE 2022, 3m)"],
},

/* ================= KRITIKA ================= */

"hindi-2-0": {
  slides: [
    { kicker: "Kritika 1 • Shivpujan Sahay", title: "माता का अंचल",
      points: ["An autobiographical memoir of a child and his mother in a village", "A household of two mothers (elder/younger co-wives) — a sensitive child caught between", "The mother's आँचल (anchal) = the child's first world of security"], formula: "माँ का आँचल = सबसे बड़ा आश्रय" },
    { kicker: "The Story", title: "Love, Partiality and Longing",
      points: ["The child feels neglected: the father loves the younger mother's kids more", "His mother shields him from every hurt — never shows her own pain", "School, worship, food — small incidents reveal mother's silent sacrifice"], formula: "माँ दुःख बाँटती नहीं, चुपचाप सहती है" },
    { kicker: "Exam Corner", title: "Themes & Answers",
      points: ["Theme: mother's selfless love; child psychology; joint-family equations", "The child's guilt: 'मैंने माँ को कभी समझा नहीं'", "Answer: incident + mother's response + emotional realisation"], formula: "आँचल की छाया में बचपन" },
  ],
  notes: [
    "शिवपूजन सहाय की यह रचना <b>संस्मरण-शैली</b> में है — बचपन की यादें.",
    "दो माताओं वाला परिवार — <b>छोटी माँ</b> के बच्चों को बाबा का अधिक स्नेह.",
    "माँ का स्नेह <b>मौन</b> है — अपना दुःख छिपाकर बच्चों को ढालती है.",
    "भोलनाथ बाबा (लेखक) की संवेदनशील बाल-मनोदशा का सुंदर चित्रण.",
    "संदेश: <b>मातृ-स्नेह की बराबरी नहीं</b>; उसे पहचानना श्रेय है.",
  ],
  words: [
    { w: "आँचल", m: "the loose end of a sari / mother's care", u: "माता का आँचल बच्चे का आश्रय है" },
    { w: "संस्मरण", m: "memoir / reminiscence", u: "यह रचना संस्मरण विधा में है" },
    { w: "विमुख", m: "averse / turned away", u: "बाबा बड़े बच्चों से विमुख थे" },
    { w: "सहनशीलता", m: "capacity to endure", u: "माँ की सहनशीलता असीम थी" },
  ],
  quiz: [
    { q: "'माता का अंचल' belongs to which genre?", options: ["One-act play", "Autobiographical memoir (sansmaran)", "Science fiction", "Travelogue"], answer: 1, why: "It is a memoir of the author's childhood." },
    { q: "What does the mother's anchal symbolise?", options: ["Wealth", "Protection and selfless love", "Fashion", "Discipline"], answer: 1, why: "It is the child's first shelter and security." },
  ],
  pyq: ["माँ का चरित्र 'माता का अंचल' में कैसे उभरता है? (CBSE 2023, 3m)"],
},

"hindi-2-1": {
  slides: [
    { kicker: "Kritika 2 • Mridula Garg", title: "साना-साना हाथ जोड़ि",
      points: ["A travel essay (यात्रा-वृत्तांत) through the high Himalayan regions", "Small hands joined in greeting — 'साना-साना हाथ जोड़ि' — the region's innocent welcome", "Mountains, monasteries, prayer flags and the local people's gentleness"], formula: "पहाड़ों की सादगी, लोगों की मुस्कान" },
    { kicker: "The Journey", title: "Cold Heights, Warm Hearts",
      points: ["Thin air, steep roads — nature's grandeur and danger together", "The writer discovers the local culture: faith, prayer-wheels, humility", "Tourists click photos; the writer collects feelings and lessons"], formula: "यात्रा बाहर भीतर दोनों की" },
    { kicker: "Exam Corner", title: "Craft & Answers",
      points: ["Genre: यात्रा-वृत्तांत — place + people + reflection", "Style: sensory descriptions, short breathless sentences like the mountain air", "Answer: place description + people's warmth + writer's reflection"], formula: "नमस्ते = साना-साना हाथ जोड़ि" },
  ],
  notes: [
    "मृदुला गार्ग का यह लेख <b>हिमालयी यात्रा</b> का संवेदनशील वृत्तांत है.",
    "शीर्षक स्थानीय <b>अभिवादन-शैली</b> से लिया गया — छोटे-छोटे हाथ जोड़कर नमस्ते.",
    "प्रकृति-चित्रण: <b>बर्फ, गहरी खाइयाँ, मठ-मंदिर, प्रार्थना-पताकाएँ</b>.",
    "स्थानीय लोगों की <b>मेहमाननवाज़ी और सादगी</b> — लेखिका की सीख.",
    "संदेश: <b>यात्रा का असली संग्रह स्मृतियाँ और भावनाएँ</b> हैं, तस्वीरें नहीं.",
  ],
  words: [
    { w: "यात्रा-वृत्तांत", m: "travel account", u: "यह रचना यात्रा-वृत्तांत है" },
    { w: "मठ", m: "monastery", u: "पहाड़ों पर मठों की श्रृंखला दिखती है" },
    { w: "प्रार्थना-पताका", m: "prayer flag", u: "रंग-बिरंगी प्रार्थना-पताकाएँ लहराती हैं" },
    { w: "सादगी", m: "simplicity", u: "पहाड़ी लोगों की सादगी अनुकरणीय है" },
  ],
  quiz: [
    { q: "'साना-साना हाथ जोड़ि' is which type of writing?", options: ["Detective story", "Travel essay (yatra-vrittant)", "Biography", "Satire"], answer: 1, why: "It records a Himalayan journey and its experiences." },
    { q: "What is the writer's real 'collection' from the journey?", options: ["Souvenirs", "Memories, feelings and lessons", "Photographs", "Rocks"], answer: 1, why: "The essay values inner experiences over tourist items." },
  ],
  pyq: ["लेखिका को यात्रा में क्या सीख मिली? (CBSE 2023, 3m)"],
},

"hindi-2-2": {
  slides: [
    { kicker: "Kritika 3 • Agyeya", title: "मैं क्यों लिखता हूँ",
      points: ["An essay by Agyeya — one of Hindi's deepest thinkers on 'why I write'", "Writing is not a choice but an inner compulsion (मजबूरी)", "For the writer, writing = breathing; the alternative is suffocation"], formula: "लिखना = मेरी साँस" },
    { kicker: "The Argument", title: "Not for Fame, Not for Money",
      points: ["The writer questions common motives: fame, money, message — not enough", "Writing begins when nothing else can hold the storm within", "A writer's duty: to remain honest to his own experience"], formula: "सच के प्रति ईमानदारी" },
    { kicker: "Exam Corner", title: "Ideas & Answers",
      points: ["Genre: आत्मकथ्यात्मक निबंध (self-reflective essay)", "Agyeya: pioneer of नई कविता / Pragativad; experimental mind", "Answer: motives he rejects + compulsion he accepts + writer's honesty"], formula: "जो नहीं लिख सकता, वह जी नहीं सकता" },
  ],
  notes: [
    "अज्ञेय (सच्चिदानंद हीरानंद वात्स्यायन) — <b>प्रयोगवाद</b> के प्रणेता; नई कविता के आधार स्तंभ.",
    "लेखक कहते हैं — लिखना <b>फैशन या व्यवसाय नहीं</b>, आंतरिक विवशता है.",
    "प्रसिद्ध भाव: जो कुछ भीतर उमड़ता है, उसे <b>रोका नहीं जा सकता</b> — लिखना ही पड़ता है.",
    "लिखने से लेखक को <b>पहचान</b> मिलती है — अपने अनुभव से ईमानदारी की.",
    "संदेश: <b>सृजन व्यक्तित्व की गहरतम प्रक्रिया है</b> — बाहरी दबाव में नहीं, भीतरी सत्य में जड़ें रखती है.",
  ],
  words: [
    { w: "विवशता", m: "compulsion / helplessness", u: "लिखना मेरी विवशता है" },
    { w: "प्रयोगवाद", m: "experimentalism (literary movement)", u: "अज्ञेय प्रयोगवाद के प्रणेता थे" },
    { w: "सृजन", m: "creation", u: "सृजन आत्मा की प्रक्रिया है" },
    { w: "अनुभव", m: "experience", u: "लेखक अपने अनुभव से ईमानदार रहता है" },
  ],
  quiz: [
    { q: "Why does Agyeya write, according to the essay?", options: ["For fame", "For money", "Due to an inner compulsion", "On friends' advice"], answer: 2, why: "Writing is an inner necessity — like breathing." },
    { q: "Agyeya is associated with which literary movement?", options: ["Chhayavad", "Prayogvad (experimentalism)", "Ritikavya", "Drishti-kavita"], answer: 1, why: "He pioneered experimental writing in Hindi." },
  ],
  pyq: ["'मैं क्यों लिखता हूँ' में लेखक के तर्क संक्षेप में लिखिए। (CBSE 2023, 3m)"],
},
};
