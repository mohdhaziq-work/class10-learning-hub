/* English — First Flight (prose + poetry). Keys: english-0-x (prose), english-1-x (poems).
   Ch 1 prose (A Letter to God) lives in builtin.ts. */
import type { ChapterDetail } from "./types";

export const ENGLISH: Record<string, ChapterDetail> = {

/* ================= PROSE ================= */

"english-0-1": {
  slides: [
    { kicker: "Chapter 2 • Prose", title: "Nelson Mandela: Long Walk to Freedom",
      points: ["Autobiography excerpt — 10 May 1994: the day of South Africa's first democratic inauguration", "Apartheid = the racial segregation system that ended with this day", "Mandela became the first Black President after 30 years in prison"], formula: "10 May 1994 — inauguration, Pretoria" },
    { kicker: "The Inauguration", title: "A Rainbow Nation Is Born",
      points: ["Union Buildings amphitheatre — world leaders and common people sat together", "Jets trailed smoke in the colours of the new six-colour flag", "Mandela: 'Never, never again shall this beautiful land experience oppression'"], formula: "Rainbow nation — all colours, one people" },
    { kicker: "Ideas", title: "Freedom, Fear and Twin Obligations",
      points: ["No one is born hating — love comes more naturally to the human heart", "A brave man is not one who feels no fear, but one who conquers it", "Twin obligations: to your family, and to your community and country"], formula: "Freedom is indivisible — none free until all are free" },
    { kicker: "Exam Corner", title: "Themes & Quick Answers",
      points: ["Themes: courage, sacrifice, equality, forgiveness over revenge", "The oppressor and the oppressed are both robbed of their humanity", "Answer pattern: date + event + Mandela's message"], formula: "Answer: point + quote + message" },
  ],
  notes: [
    "<b>10 May 1994:</b> inauguration at the Union Buildings, Pretoria — first democratic, non-racial government.",
    "<b>Apartheid:</b> official racial discrimination in South Africa (1948–1994).",
    "<b>Twin obligations:</b> duty to family and duty to community — in a civil society both are possible.",
    "<b>Key quote:</b> 'No one is born hating another person because of the colour of his skin.'",
    "<b>Both caged:</b> Mandela says the oppressor is also a prisoner of hatred — like a caged bird.",
  ],
  words: [
    { w: "inauguration", m: "formal beginning; swearing-in ceremony", u: "The inauguration took place on 10 May 1994." },
    { w: "apartheid", m: "system of racial segregation", u: "Apartheid divided South Africa for decades." },
    { w: "obligation", m: "moral duty or commitment", u: "We have twin obligations — family and country." },
    { w: "emancipation", m: "freedom from restriction", u: "Mandela worked for the emancipation of his people." },
    { w: "dignity", m: "sense of self-worth", u: "Every worker deserves dignity and fair pay." },
  ],
  quiz: [
    { q: "When did Mandela's inauguration take place?", options: ["10 May 1994", "26 January 1994", "15 August 1990", "1 June 1999"], answer: 0, why: "10 May 1994 at the Union Buildings, Pretoria." },
    { q: "What was apartheid?", options: ["A festival", "Racial segregation system", "A war tactic", "A tax law"], answer: 1, why: "Apartheid legally separated people by race in South Africa." },
    { q: "Who is brave, according to Mandela?", options: ["One who feels no fear", "One who conquers fear", "One who runs away", "One who never fails"], answer: 1, why: "Bravery is not the absence of fear but victory over it." },
    { q: "What are the twin obligations?", options: ["School and play", "Family and community/country", "Money and fame", "Health and wealth"], answer: 1, why: "Man owes duty to his family and to his people." },
  ],
  pyq: ["What does Mandela mean by twin obligations? (CBSE 2023, 3m)", "Why is 10 May 1994 special for South Africa? (CBSE 2022, 3m)", "What ideals does Mandela set for the future of South Africa? (CBSE 2020, 3m)"],
},

"english-0-2": {
  slides: [
    { kicker: "Chapter 3 • Prose — Part I", title: "His First Flight (Liam O'Flaherty)",
      points: ["A young seagull is afraid to fly — his siblings already flew away", "Hunger, not courage, finally pushes him: mother stops halfway with fish", "He falls, then flaps — and flies! Fear was only in his mind"], formula: "Fear disappears the moment you act" },
    { kicker: "Chapter 3 • Prose — Part II", title: "The Black Aeroplane (Frederick Forsyth)",
      points: ["The narrator's Dakota plane is lost in storm clouds, fuel almost finished", "A mysterious black aeroplane guides him to safety — no radio contact", "On landing, the control room says: no other plane was on the radar"], formula: "Mystery helper — who was the pilot?" },
    { kicker: "Themes", title: "Courage, Fear and Trust",
      points: ["His First Flight: fear of the unknown is natural; action cures it", "The Black Aeroplane: trust and hope in the darkest moments", "Both stories: a struggle between fear and survival"], formula: "Courage = acting despite fear" },
    { kicker: "Exam Corner", title: "Quick Answers",
      points: ["Seagull's motivation: hunger; mother's trick: stopping mid-air with the fish", "Dakota risk: storm + 5-10 minutes of fuel left", "The black aeroplane vanishes — leaving a beautiful mystery"], formula: "Answers: motivation + event + mystery end" },
  ],
  notes: [
    "<b>His First Flight:</b> the young gull's family flew but he feared the vast sea below.",
    "The mother tore a fish near him but <b>stopped midway</b> — hunger made him dive, and he flew.",
    "<b>Black Aeroplane:</b> Paris to England, storm over the Dakota, instruments dead, fuel low.",
    "The strange pilot waved and vanished; Paris control had <b>no other plane on radar</b>.",
    "Themes: overcoming fear, self-confidence, and faith in the unknown.",
  ],
  words: [
    { w: "brink", m: "edge (of a high place)", u: "The seagull stood on the brink of the ledge." },
    { w: "plunge", m: "dive suddenly", u: "He plunged towards the sea after the fish." },
    { w: "compass", m: "instrument showing direction", u: "The compass was turning round and round in the storm." },
    { w: "dreaded", m: "greatly feared", u: "He flew straight into the dreaded storm." },
  ],
  quiz: [
    { q: "Why did the young seagull finally fly?", options: ["His father pushed him", "Hunger made him dive for fish", "He was hit by a wave", "His siblings called him"], answer: 1, why: "The mother held the fish mid-air; hunger defeated fear." },
    { q: "Which plane did the narrator of 'The Black Aeroplane' fly?", options: ["Dakota", "Boeing 747", "Black Aeroplane", "MiG"], answer: 0, why: "He was flying an old Dakota from Paris to England." },
    { q: "What did Paris control say about the black aeroplane?", options: ["It was a fighter jet", "No other plane was seen on radar", "It landed earlier", "It was his friend"], answer: 1, why: "The mystery plane never appeared on the radar." },
  ],
  pyq: ["How did the seagull's mother help him make his first flight? (CBSE 2023, 3m)", "Describe the narrator's experience inside the storm clouds. (CBSE 2022, 3m)"],
},

"english-0-3": {
  slides: [
    { kicker: "Chapter 4 • Prose", title: "From the Diary of Anne Frank",
      points: ["A 13-year-old Jewish girl writes a diary while hiding from the Nazis", "'Kitty' — she treats the diary as her truest friend", "Writing gives her freedom no one can take away"], formula: "Paper has more patience than people" },
    { kicker: "Diary Extracts", title: "School Days and Grandmother",
      points: ["The classroom chatter: boys wait anxiously for results — who will pass?", "Anne jokes with her maths teacher through an essay written as homework", "She felt closest to her grandmother; kept her photo on the desk"], formula: "Humour survives even hard times" },
    { kicker: "Themes", title: "Loneliness, Hope and Growing Up",
      points: ["A teenager's need to be heard and understood", "War took away normal life — but not her spirit", "Her reason for writing: she had no true confidant"], formula: "Hope + humour in darkness" },
    { kicker: "Exam Corner", title: "Quick Answers",
      points: ["Why a diary? No real friend — paper has patience", "The essay joke: talking in class — 'quacking' like mother duck", "Answer pattern: reason + example + her feelings"], formula: "Give reasons, not just summary" },
  ],
  notes: [
    "<b>Kitty:</b> the name Anne gave her diary — her imaginary, trustworthy friend.",
    "Famous line: <b>'Paper has more patience than people.'</b>",
    "The maths teacher Mr Keesing punished her with essays — her humour won him over.",
    "She felt her <b>grandmother's</b> presence after her death — kept her photo on the desk.",
    "Themes: adolescence, loneliness, friendship, and hope under fear.",
  ],
  words: [
    { w: "confidant", m: "a person you trust with secrets", u: "Anne had no confidant, so she wrote to Kitty." },
    { w: "ratify", m: "to confirm/approve", u: "The members ratified the plan in the meeting." },
    { w: "plunked down", m: "put down heavily", u: "I plunked down my bag after school." },
    { w: "dogmatic", m: "forcing opinions as facts", u: "Nobody could win an argument with the dogmatic speaker." },
  ],
  quiz: [
    { q: "What name did Anne give her diary?", options: ["Margo", "Kitty", "Gran", "Betty"], answer: 1, why: "She addressed every entry to 'Kitty'." },
    { q: "Why did Anne start writing a diary?", options: ["School homework", "She had no true friend to confide in", "Her father ordered her", "To publish a book"], answer: 1, why: "She needed a patient listener — paper." },
    { q: "How did Anne's maths teacher finally react to her essays?", options: ["He punished her more", "He accepted her humour and let her talk", "He expelled her", "He ignored her"], answer: 1, why: "Mr Keesing enjoyed her witty essay and stopped punishing her." },
  ],
  pyq: ["Why did Anne Frank think she could confide more in a diary than in people? (CBSE 2023, 3m)", "How did Anne justify being a chatterbox in her essay? (CBSE 2020, 3m)"],
},

"english-0-4": {
  slides: [
    { kicker: "Chapter 5 • Prose", title: "Glimpses of India — Three Windows on One Land",
      points: ["I. A Baker from Goa — Portuguese bread-magic lives on in paders", "II. Coorg — the coffee county of brave men and beautiful women", "III. Tea from Assam — the legend of Bodhidharma and the Chinese tea"], formula: "One chapter, three regions, one India" },
    { kicker: "Part I", title: "A Baker from Goa",
      points: ["Elders remember loaves of Portuguese days — the pader still sells them", "The baker's bamboo, the furnace, and the musical thud of bread", "A baker's family was never poor — his jackfruit-like belly was proof"], formula: "Pader = friend of children" },
    { kicker: "Part II", title: "Coorg — Land of Valour",
      points: ["Midway between Mysore and Mangalore — coffee, spice and rain forests", "Brave Coorgi men serve in the army; stories of Greek/Arab descent", "River Kaveri, mahseer fish, elephants, and the waterfall route"], formula: "Coorg = coffee + courage + Kaveri" },
    { kicker: "Part III + Exam", title: "Tea from Assam & Quick Answers",
      points: ["Legend: Bodhidharma cut his eyelids to stay awake — tea plants grew!", "Assam has the world's largest concentration of tea plantations", "Pranjol and Rajvir: 'tea garden to hotel cup' journey"], formula: "Second flush = best tea" },
  ],
  notes: [
    "<b>Pader:</b> the Goan baker — bread-bangles and sweet bread (bol) are wedding gifts.",
    "The baker collected bills at the <b>end of the month</b>; his dress: kabai (frock-like).",
    "<b>Coorg:</b> people of Greek or Arab descent; famous for coffee, valour and hospitality.",
    "Coorg's <b>Kaveri</b> has mahseer — the largest freshwater fish; September–April is the best season.",
    "<b>Tea legend:</b> Bodhidharma's eyelids — 10,000 acres of tea in Assam; Rajvir loved the gardens.",
  ],
  words: [
    { w: "pader", m: "Goan baker (Portuguese origin)", u: "The pader arrives with a musical thud of bread." },
    { w: "kabai", m: "frock-like dress of a baker", u: "The kabai reached his knees." },
    { w: "canopies", m: "hanging covers of leaves/branches", u: "Tea bushes stretched under green canopies." },
    { w: "valour", m: "great courage", u: "Coorgi men are famous for their valour." },
    { w: "ferocious", m: "fierce, violent", u: "The ferocious mahseer fights the current." },
  ],
  quiz: [
    { q: "What is the dress of a traditional Goan baker called?", options: ["Kurta", "Kabai", "Dhoti", "Sherwani"], answer: 1, why: "The kabai is the baker's long, frock-like dress." },
    { q: "Coorgi people are believed to descend from…", options: ["Portuguese sailors", "Greeks or Arabs", "British officers", "French traders"], answer: 1, why: "Their dress and rituals point to Greek/Arab origin." },
    { q: "Who cut off his eyelids, according to the tea legend?", options: ["Pranjol", "Bodhidharma", "Rajvir", "Kaveri"], answer: 1, why: "Bodhidharma's eyelids became the first tea plants." },
  ],
  pyq: ["Describe the Coorgi people's tradition of valour. (CBSE 2023, 3m)", "What are the different ways in which bread is important in Goan life? (CBSE 2022, 3m)"],
},

"english-0-5": {
  slides: [
    { kicker: "Chapter 6 • Prose", title: "Mijbil the Otter (Gavin Maxwell)",
      points: ["Author's pet otter Mijbil — a Maxwell's otter, a new species to science", "Iraq → England journey: Mijbil in a box, terror at the airport", "Mijbil's games: marbles, juggling, and playing with water"], formula: "Otter + water = pure joy" },
    { kicker: "The Journey", title: "Box, Airport, and the Fish Tank",
      points: ["Mijbil cut himself escaping the box — blood everywhere, panic", "At the airport he escaped and ran across the crowded terminal", "On the plane he slept calmly on the author's knee after the drama"], formula: "Patience wins wild hearts" },
    { kicker: "London Life", title: "Playful Habits",
      points: ["In London, Mij discovered water taps — a full bathtub river", "He loved juggling small objects and squeezing through gaps", "In Tignes (France) an otter became the author's life work"], formula: "Mij = short for Mijbil" },
    { kicker: "Exam Corner", title: "Themes & Answers",
      points: ["Theme: human–animal bond, trust built with patience", "People guessed Mij was a baby seal, a squirrel, a hippo — nobody knew!", "Answer pattern: event + Mij's behaviour + author's feelings"], formula: "Bond + patience + wonder" },
  ],
  notes: [
    "Maxwell's friend suggested he keep an <b>otter</b> instead of a dog.",
    "Mijbil was a <b>Maxwell's otter</b> — scientists had not seen the species before.",
    "Mijbil's airline trip: <b>box escape at the airport</b>, chaos, then calm on the flight.",
    "London games: turning taps on, playing with <b>ping-pong balls and marbles</b>.",
    "Mijbil walked the author to school — like a dog; hard work, but worth it.",
  ],
  words: [
    { w: "otter", m: "a playful water animal", u: "Mijbil was a small, smooth-coated otter." },
    { w: "squirming", m: "twisting about", u: "The squirming otter escaped the box." },
    { w: "appalled", m: "shocked and upset", u: "The airhostess was appalled by the chaos." },
    { w: "compulsion", m: "forced necessity", u: "Carrying Mijbil in a box was a compulsion, not a choice." },
  ],
  quiz: [
    { q: "Mijbil belonged to which species?", options: ["Common otter", "Maxwell's otter", "Sea otter", "River mongoose"], answer: 1, why: "It was a Maxwell's otter — a species zoologists had not classified before." },
    { q: "Where did Mijbil finally travel with the author?", options: ["Iraq only", "England", "America", "Egypt"], answer: 1, why: "From Iraq (via air) to England for good." },
    { q: "What did Mijbil do with the taps in London?", options: ["Broke them", "Turned them on to play with water", "Ignored them", "Drank only at night"], answer: 1, why: "He learned to turn the tap and made the bathtub his river." },
  ],
  pyq: ["How did the airhostess help the author with Mijbil? (CBSE 2023, 3m)", "What games did Mijbil invent? (CBSE 2022, 3m)"],
},

"english-0-6": {
  slides: [
    { kicker: "Chapter 7 • Prose", title: "Madam Rides the Bus (Vallikkannan)",
      points: ["Valli — an 8-year-old girl's first solo bus journey to the town", "She saves coins, plans the trip, and rides the bus in secret", "The bus is 'a new world' — her joy in every small detail"], formula: "Journey + wonder + first experience" },
    { kicker: "The Ride", title: "Full of Life",
      points: ["Valli stands on the seat to see the world outside", "A cow's silly galloping made her laugh — memory of the day", "The conductor jokes kindly: 'Madam' pays her 30 paise herself"], formula: "Bus fare: 30 paise" },
    { kicker: "The Turn", title: "Life and Death in One Ride",
      points: ["On the return trip, Valli sees the same cow — dead on the road", "The laughing memory turns into sadness — 'so horrible' news to her", "She hides her grief, returns home — childhood lost a little"], formula: "Joy and sorrow ride together" },
    { kicker: "Exam Corner", title: "Character & Themes",
      points: ["Valli: curious, confident, independent, mature beyond age", "Theme: curiosity, freedom, and facing the reality of death", "Answers: trait + scene + what changed in Valli"], formula: "Traits + change" },
  ],
  notes: [
    "Valli's full name: <b>Valliammai</b> — she saved every coin for her bus ride.",
    "Her strongest desire: to <b>ride the new bus</b> and see the town.",
    "The conductor's playful <b>'Madam'</b> shows her being treated as an adult passenger.",
    "The <b>dead cow</b> was her first real meeting with death — the ride turned sombre.",
    "Home before 4 pm — her secret journey complete, her understanding deepened.",
  ],
  words: [
    { w: "fascinating", m: "very interesting", u: "The bus was a fascinating new world for Valli." },
    { w: "wistfully", m: "with longing", u: "Valli looked wistfully at the people on the bus." },
    { w: "drab", m: "dull, uninteresting", u: "The town was small and drab beside the blue sea." },
    { w: "repulsive", m: "causing dislike", u: "The sight of the dead cow was repulsive to her." },
  ],
  quiz: [
    { q: "How much was the bus fare to the town?", options: ["30 paise", "50 paise", "1 rupee", "10 paise"], answer: 0, why: "The fare was 30 paise one way." },
    { q: "What made Valli sad on the return journey?", options: ["Missing her snack", "She saw the dead cow", "The bus broke down", "She lost her coins"], answer: 1, why: "The cow that had made her laugh lay dead by the roadside." },
    { q: "How old is Valli?", options: ["6", "8", "12", "10"], answer: 1, why: "Valli is an eight-year-old girl." },
  ],
  pyq: ["Why did Valli not want friends on her bus journey? (CBSE 2023, 3m)", "How did Valli save money for her first bus ride? (CBSE 2022, 3m)"],
},

"english-0-7": {
  slides: [
    { kicker: "Chapter 8 • Prose", title: "The Sermon at Benares (Betty Renshaw)",
      points: ["Gautama Buddha — a prince who became the enlightened teacher", "Kisa Gotami's dead son — a mother's grief and a lesson", "The sermon: death is certain; sorrow cannot bring back the dead"], formula: "He who seeks peace must let go of grief" },
    { kicker: "Buddha's Story", title: "From Palace to Enlightenment",
      points: ["Siddhartha Gautama saw sickness, old age, death — left his palace", "Seven days of meditation under the peepal (Bodhi) tree", "He preached his first sermon at Benares — the deer park"], formula: "Sarnath = deer park sermon" },
    { kicker: "Kisa Gotami", title: "The Mustard Seed Task",
      points: ["'Bring mustard seed from a house where no one has died'", "Every house had lost someone — she finds no such seed", "She returns understanding: death is universal; grief is selfish"], formula: "Death spares no house" },
    { kicker: "Exam Corner", title: "Themes & Answers",
      points: ["Theme: impermanence, acceptance, universal law of death", "Buddha's teaching: lamenting cannot bring peace — only acceptance can", "Answer: story + teaching + universal message"], formula: "Peace = accepting impermanence" },
  ],
  notes: [
    "<b>Buddha:</b> Siddhartha Gautama, sheltered 10 years in luxury; left at 29 after seeing life's harsh truths.",
    "The first sermon was given at <b>Benares (Sarnath)</b>, the deer park.",
    "Kisa Gotami's task: mustard seed from a house <b>where no death had ever occurred</b>.",
    "The message: <b>'The life of mortals is as uncertain as raindrops on a lotus leaf.'</b>",
    "Buddha compares the grieving to a man building a house on sand — lamenting is pointless.",
  ],
  words: [
    { w: "enlightenment", m: "state of true wisdom", u: "Gautama attained enlightenment under the Bodhi tree." },
    { w: "lamentation", m: "loud expression of grief", u: "Lamentation cannot bring back the dead." },
    { w: "mortal", m: "one who must die", u: "Every mortal is subject to death." },
    { w: "sermon", m: "religious speech/teaching", u: "The sermon at Benares teaches acceptance." },
  ],
  quiz: [
    { q: "Where did Buddha give his first sermon?", options: ["Lumbini", "Benares deer park", "Bodh Gaya", "Kapilavastu"], answer: 1, why: "The first sermon was at the deer park near Benares." },
    { q: "What did Buddha ask Kisa Gotami to bring?", options: ["A flower", "Medicine", "Mustard seed from a house with no death", "Water from the Ganga"], answer: 2, why: "The impossible task taught her that death visits every home." },
    { q: "What lesson did Kisa Gotami learn?", options: ["Death is universal", "Medicines cure all", "Grief revives the dead", "Rich live forever"], answer: 0, why: "She accepted the universal law of death." },
  ],
  pyq: ["How did Buddha console Kisa Gotami? (CBSE 2023, 3m)", "What is the central idea of 'The Sermon at Benares'? (CBSE 2021, 3m)"],
},

"english-0-8": {
  slides: [
    { kicker: "Chapter 9 • Prose (Play)", title: "The Proposal (Anton Chekhov)",
      points: ["A one-act farce: Lomov visits Chubukovs to propose to Natalya", "Before proposing, they quarrel — over Oxen Meadows and the dogs!", "Three hot-tempered people who cannot speak without shouting"], formula: "Proposal postponed by property and pride" },
    { kicker: "Quarrel 1", title: "Oxen Meadows",
      points: ["Lomov says the Meadows are 'mine'; Natalya says 'ours'", "Both bring ancestors, debts and maps into a petty quarrel", "Chubukov joins in — even God cannot settle their border dispute"], formula: "Meadows: mine vs ours" },
    { kicker: "Quarrel 2", title: "Guess vs Squeezer",
      points: ["Whose dog is the better hunter: Lomov's Guess or Natalya's Squeezer?", "Insults fly — Lomov's palpitations worsen with every round", "The proposal finally happens — mid-quarrel, by shouting!"], formula: "Marriage by argument" },
    { kicker: "Exam Corner", title: "Humour & Character",
      points: ["Chekhov mocks landowners' ego — quarrels over land, dogs, marriages", "Lomov: hypochondriac, 35, nervous, sleepwalking; Natalya: quarrelsome, possessive", "Answer: trait + comic scene + what Chekhov satirises"], formula: "Satire on marriage and ego" },
  ],
  notes: [
    "<b>Ivan Lomov:</b> a wealthy, nervous neighbour — palpitations, sleep issues, 35 years old.",
    "The <b>Oxen Meadows</b> quarrel: worth little, but pride makes both families fight.",
    "The <b>dogs</b> quarrel: Guess (Lomov) vs Squeezer (Natalya) — whose dog hunts better.",
    "Chubukov secretly wanted the match but <b>joins every quarrel</b> violently.",
    "The play ends with a marriage performed <b>amid shouting</b> — Chekhov's satire complete.",
  ],
  words: [
    { w: "farce", m: "comic drama with absurd situations", u: "'The Proposal' is a classic one-act farce." },
    { w: "palpitation", m: "rapid, irregular heartbeat", u: "Lomov's palpitations worsen with every quarrel." },
    { w: "hypochondriac", m: "person always worried about illness", u: "Lomov is a comical hypochondriac." },
    { w: "implore", m: "beg urgently", u: "Chubukov implores them to stop arguing." },
  ],
  quiz: [
    { q: "Why does Lomov visit the Chubukovs?", options: ["To borrow money", "To propose marriage to Natalya", "To sell Oxen Meadows", "To return a dog"], answer: 1, why: "He comes to ask for Natalya's hand in marriage." },
    { q: "What are the two quarrels in the play?", options: ["Meadows and dogs", "Money and clothes", "Books and music", "Farming and fishing"], answer: 0, why: "Oxen Meadows and Guess vs Squeezer." },
    { q: "What is Lomov's health problem?", options: ["Sleepwalking and palpitations", "Fever", "Broken leg", "Loss of hearing"], answer: 0, why: "His weak heart and sleepwalking add to the comedy." },
  ],
  pyq: ["How is 'The Proposal' a humorous play? (CBSE 2023, 3m)", "Character sketch of Lomov. (CBSE 2022, 3m)"],
},

/* ================= POETRY ================= */

"english-1-0": {
  slides: [
    { kicker: "Poem 1 • Robert Frost", title: "Dust of Snow",
      points: ["A crow shakes snow off a hemlock tree onto the poet", "This small moment changes his bitter mood into something better", "Message: little things in nature can lift a heavy heart"], formula: "Crow + hemlock + snow = changed mood" },
    { kicker: "Analysis", title: "Why a Crow and a Hemlock?",
      points: ["Crow and hemlock are dark, 'unlucky' images — despair", "Yet the same dark things bring relief — perspective matters", "The poem: 8 lines, rhyming ABAB"], formula: "Dark symbols, bright result" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: healing power of nature; small joys", "Frost uses simple words for a deep mood shift", "Answers: symbol + change + message"], formula: "Symbol + shift" },
  ],
  notes: [
    "The poet was in a <b>sour, regretful mood</b> when the crow shook the snow on him.",
    "<b>Hemlock</b> is a poisonous tree — both crow and hemlock suggest gloom.",
    "The 'dust of snow' saved part of the day he had <b>rued</b> (regretted).",
    "Rhyme scheme: <b>ABAB</b> in each quatrain.",
    "Theme: nature's smallest acts can transform a human heart.",
  ],
  words: [
    { w: "rue", m: "to regret", u: "The day I had rued was saved at the end." },
    { w: "hemlock", m: "a poisonous tree", u: "Snow fell from the hemlock branch." },
    { w: "mood", m: "emotional state", u: "A dust of snow changed the poet's mood." },
  ],
  quiz: [
    { q: "Which bird appears in 'Dust of Snow'?", options: ["Sparrow", "Crow", "Owl", "Eagle"], answer: 1, why: "A crow shook the dust of snow on the poet." },
    { q: "What changed the poet's mood?", options: ["A song", "Snow falling from a hemlock", "A gift", "The sunrise"], answer: 1, why: "The simple fall of snow lifted his spirits." },
  ],
  pyq: ["Why has the poet used crow and hemlock as symbols? (CBSE 2023, 3m)"],
},

"english-1-1": {
  slides: [
    { kicker: "Poem 2 • Robert Frost", title: "Fire and Ice",
      points: ["Can the world end in fire or in ice? The poet says both can", "Fire = desire/greed; Ice = hatred/coldness of heart", "Human emotions themselves can destroy the world"], formula: "Fire = desire • Ice = hatred" },
    { kicker: "Analysis", title: "A Nine-Line Prophecy",
      points: ["The poet has 'tasted' desire — so fire feels right for the end", "If the world had to perish twice, ice would 'also suffice'", "Rhyme scheme: ABC ABC ADB"], formula: "Two endings, both human-made" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: destructive power of desire and hatred", "'Suffice' — hatred alone is enough to end the world", "Answers: symbol + poet's choice + theme"], formula: "Desire destroys fast, hatred slowly" },
  ],
  notes: [
    "<b>Fire</b> stands for uncontrolled desire, greed and passion.",
    "<b>Ice</b> stands for coldness, indifference and hatred.",
    "The poet favours <b>fire</b> (desire) but says <b>ice</b> (hate) would 'also suffice'.",
    "Rhyme scheme: <b>aba abc bcb</b> style — short, tight, memorable.",
    "Message: humanity's own emotions can cause its end.",
  ],
  words: [
    { w: "perish", m: "to be destroyed completely", u: "The world may perish twice." },
    { w: "suffice", m: "to be enough", u: "Ice would also suffice for destruction." },
    { w: "desire", m: "strong wish/craving", u: "Desire, like fire, consumes everything." },
  ],
  quiz: [
    { q: "What does 'ice' symbolise?", options: ["Desire", "Hatred", "Joy", "Peace"], answer: 1, why: "Ice stands for coldness and hatred." },
    { q: "Which ending does the poet prefer for the world?", options: ["Ice", "Fire", "Water", "Storm"], answer: 1, why: "Having tasted desire, he says fire seems right." },
  ],
  pyq: ["What do fire and ice stand for in the poem? (CBSE 2023, 3m)"],
},

"english-1-2": {
  slides: [
    { kicker: "Poem 3 • Leslie Norris", title: "A Tiger in the Zoo",
      points: ["A caged tiger paces in his concrete cell, quiet with rage", "Contrast: free tiger in the jungle — lurking, plump deer, terrorising villages", "Freedom taken away = the tiger's 'quiet rage'"], formula: "Cage vs jungle — rage locked in" },
    { kicker: "Analysis", title: "Two Worlds, One Tiger",
      points: ["Caged world: concrete cell, velvet pads, ignored visitors", "Free world: shadow, long grass, water hole, moonlight", "Stanza pairs alternate between the two lives"], formula: "He should be snarling around houses" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: cruelty of captivity; animals belong in the wild", "'Quiet rage' — anger that cannot act", "Answers: contrast + imagery + theme"], formula: "Contrast is the heart of the answer" },
  ],
  notes: [
    "In the zoo the tiger has <b>'quiet rage'</b> — anger with no outlet.",
    "Free tiger images: <b>shadow, long grass, plump deer, water hole</b>.",
    "At night he hears <b>patrol cars</b> and stares at the brilliant stars.",
    "The poet's question: are humans also caged by their own making?",
    "Style: simple quatrains; rhyme scheme mostly <b>abcb</b>.",
  ],
  words: [
    { w: "lurking", m: "hiding waiting to attack", u: "The tiger should be lurking in shadow." },
    { w: "snarling", m: "growling angrily", u: "A free tiger snarls around houses at night." },
    { w: "rage", m: "furious anger", u: "His quiet rage shows in his padded steps." },
  ],
  quiz: [
    { q: "Where should the tiger be, according to the poet?", options: ["In a circus", "Lurking in the shadow of long grass", "In a concrete cell", "In a zoo hospital"], answer: 1, why: "The jungle — his natural home — is where he belongs." },
    { q: "What is the tiger's mood in the cage?", options: ["Sleepy", "Joyful", "Quiet rage", "Hungry only"], answer: 2, why: "His anger is suppressed in captivity." },
  ],
  pyq: ["Why does the tiger ignore the visitors? (CBSE 2023, 3m)"],
},

"english-1-3": {
  slides: [
    { kicker: "Poem 4 • Carolyn Wells", title: "How to Tell Wild Animals",
      points: ["A humorous poem — how to identify wild animals (dangerously!)", "The Bengal tiger: 'noble wild beast' greets you — if you're eaten, it's him", "Hyena vs crocodile: one smiles, the other weeps — while eating you"], formula: "Identification by being eaten" },
    { kicker: "The Joke", title: "Science, But Make It Funny",
      points: ["Each 'tip' ends with the observer being attacked", "The leopard: 'leaps on you and keeps leaping' — no use crying 'hi-brow'", "The chameleon: no ears, no wings — if nothing appears on a tree, it's there!", "Format: rhyming couplets, light verse"] },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Poetic devices: irony, hyperbole, alliteration", "Theme: humour in danger; a parody of nature guides", "Answers: device + example + humour created"], formula: "Humour = surprise + danger" },
  ],
  notes: [
    "The <b>Asian lion</b>: large and tawny, roars as you're dying.",
    "The <b>Bengal tiger</b>: 'with black stripes on a yellow ground' — eats you at once.",
    "<b>Hyena</b> comes with merry smiles; <b>crocodile</b> weeps while swallowing.",
    "The <b>leopard</b> leaps 'again and again' — the true <b>chameleon</b> is almost invisible.",
    "The poem is a <b>parody</b> of serious field guides — humour through mock advice.",
  ],
  words: [
    { w: "tawny", m: "orange-brown colour", u: "The Asiatic lion is large and tawny." },
    { w: "discriminate", m: "to tell apart", u: "Hyena and crocodile are hard to discriminate." },
    { w: "meek", m: "quiet, gentle", u: "A meek chameleon changes colour." },
  ],
  quiz: [
    { q: "How can you tell a crocodile from a hyena?", options: ["By colour", "The crocodile weeps, the hyena smiles", "By size", "By sound"], answer: 1, why: "'The crocodile's always weeping, the hyena always merry.'" },
    { q: "What is the tone of the poem?", options: ["Serious", "Humorous", "Sad", "Angry"], answer: 1, why: "It is light verse — mock-dangerous advice." },
  ],
  pyq: ["How does the poet create humour in the poem? (CBSE 2022, 3m)"],
},

"english-1-4": {
  slides: [
    { kicker: "Poem 5 • John Berryman", title: "The Ball Poem",
      points: ["A boy loses his ball in the harbour water — a small, huge loss", "The poet will not buy him another: money can't replace meaning", "The boy is learning 'epistemology of loss' — how to stand and lose"], formula: "Money is external" },
    { kicker: "Analysis", title: "Grief, Dignity and Growth",
      points: ["The ball was 'his responsibility' — now it sinks into the water", "Everyone loses things; everyone must learn to move on", "'An ultimate shaking grief' — first real loss of childhood"], formula: "Responsibility → loss → maturity" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: loss is a teacher; money can't replace memories", "'Epistemology of loss' = knowledge gained through losing", "Answers: symbol + lesson + poet's decision not to console"], formula: "Loss teaches what comfort cannot" },
  ],
  notes: [
    "The ball is not expensive — but it carried the boy's <b>childhood memories</b>.",
    "The poet does <b>not</b> offer money — he wants the boy to feel and learn.",
    "<b>'Money is external'</b> — it cannot buy back what matters.",
    "'Epistemology of loss': the theory of knowing life through losing things.",
    "Message: learn to <b>stand up and move on</b> after every loss.",
  ],
  words: [
    { w: "dime", m: "ten-cent coin (money)", u: "No dime can buy back that ball." },
    { w: "harbour", m: "sheltered water for ships", u: "The ball rolled into the harbour water." },
    { w: "epistemology", m: "study/theory of knowledge", u: "The boy learns the epistemology of loss." },
  ],
  quiz: [
    { q: "Why doesn't the poet buy the boy a new ball?", options: ["He has no money", "The boy learns responsibility from loss", "Shops are closed", "The ball was cheap anyway"], answer: 1, why: "He wants the boy to understand loss, not be comforted." },
    { q: "What is 'money is external' means?", options: ["Money buys happiness", "Money cannot replace true value", "Money is everything", "Money is internal"], answer: 1, why: "External things can't replace meaning and memory." },
  ],
  pyq: ["What is the significance of the lost ball? (CBSE 2023, 3m)"],
},

"english-1-5": {
  slides: [
    { kicker: "Poem 6 • Robin Klein", title: "Amanda!",
      points: ["A parent nags: sit straight, don't bite nails, do homework…", "Amanda escapes into daydreams: mermaid, orphan, Rapunzel", "The poem alternates: instructions vs imagination"], formula: "Nag, nag — dream, dream" },
    { kicker: "The Daydreams", title: "Three Escapes",
      points: ["Mermaid in the sea — 'blissful' freedom, alone", "Orphan roaming the street — no one to check her", "Rapunzel in the tower — 'never to let down my bright hair'", "Each dream: silence, space, freedom"], formula: "Freedom lives in imagination" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: over-control harms children; they need space", "The repeated 'Amanda!' = the nagging voice", "Answers: contrast + imagery + child psychology"], formula: "Contrast: order vs freedom" },
  ],
  notes: [
    "The parent's instructions: posture, nails, homework, shoes, <b>sulking</b>.",
    "Escapes: <b>mermaid</b> (sea), <b>orphan</b> (streets), <b>Rapunzel</b> (tower) — each alone and free.",
    "The mermaid stanza rhymes <b>aaba</b>; the refrain 'Amanda!' closes each order.",
    "The parent worries about appearance and manners — Amanda about <b>freedom</b>.",
    "Message: constant nagging pushes children into silent dream worlds.",
  ],
  words: [
    { w: "nagging", m: "constant complaining/scolding", u: "Amanda is tired of the nagging." },
    { w: "sulking", m: "silent bad mood", u: "The mother asks Amanda to stop sulking." },
    { w: "blissful", m: "extremely happy", u: "The mermaid drifts in a blissful sea." },
  ],
  quiz: [
    { q: "Who does Amanda imagine being?", options: ["A queen", "A mermaid, an orphan, Rapunzel", "A pilot", "A teacher"], answer: 1, why: "Her three daydreams take her away from nagging." },
    { q: "What does Amanda want most?", options: ["New clothes", "Freedom and space", "More toys", "A pet"], answer: 1, why: "Every dream is about quiet, unhindered freedom." },
  ],
  pyq: ["Why does Amanda imagine herself as an orphan? (CBSE 2023, 3m)"],
},

"english-1-6": {
  slides: [
    { kicker: "Poem 7 • Adrienne Rich", title: "The Trees",
      points: ["Houseplants — trees — strain all night to escape to the forest", "The trees move out: roots, twigs, leaves working like slow engines", "The forest that was empty all night is now full of trees"], formula: "Nature returns to where it belongs" },
    { kicker: "Meaning", title: "Freedom From Artificial Life",
      points: ["Trees kept indoors = women/life kept in artificial spaces", "The poet's 'head full of whispers' — she writes of departures", "The moon breaks like a mirror — old order shatters", "Birds return at dawn to sit on the branches"], formula: "The forest was empty; now it is full" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: freedom, return to nature, breaking barriers", "Metaphor: trees = all beings that need their real home", "Answers: imagery + metaphor + message"], formula: "Metaphor + movement + return" },
  ],
  notes: [
    "The trees are <b>inside the house</b> — no bird sits, no sun hides in them.",
    "Escape images: roots disengage, <b>twigs stiff, boughs crack</b> — slow engines.",
    "'The <b>moon is broken like a mirror</b>' — the old, artificial world shatters.",
    "By dawn, the trees are outside — the smell of leaves and <b>lichen</b> remains.",
    "Reading: a metaphor for <b>women</b> (or nature) reclaiming their true space.",
  ],
  words: [
    { w: "disengage", m: "to free/come loose", u: "The roots work to disengage from the cracks." },
    { w: "lichen", m: "flat plant on tree bark", u: "The smell of leaves and lichen lingers." },
    { w: "shuffling", m: "moving repeatedly", u: "She heard shuffling of leaves all night." },
  ],
  quiz: [
    { q: "Where do the trees want to go?", options: ["To another house", "Back to the forest", "To a garden shop", "To the city"], answer: 1, why: "Trees belong in the forest, not inside houses." },
    { q: "What breaks like a mirror in the poem?", options: ["The sun", "The moon", "A window", "The house"], answer: 1, why: "The moon breaks like a mirror as the trees leave." },
  ],
  pyq: ["What does the poet mean by 'the trees are in the house'? (CBSE 2022, 3m)"],
},

"english-1-7": {
  slides: [
    { kicker: "Poem 8 • Carl Sandburg", title: "Fog",
      points: ["A tiny 6-line poem: the fog comes on little cat feet", "It sits looking over the harbour and the city — silent, watching", "Then it moves on — like a cat that came and left"], formula: "Fog = cat (extended metaphor)" },
    { kicker: "Analysis", title: "The Cat-Fog Metaphor",
      points: ["Cat qualities: silent steps, sits on haunches, independent", "Fog qualities: arrives quietly, covers everything, leaves quietly", "Just 6 lines — a perfect imagist poem"], formula: "Silence + watching + moving on" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Poetic device: metaphor (fog → cat)", "Theme: nature's silent, mysterious ways", "Answers: metaphor + cat behaviour + brevity"], formula: "One metaphor, six lines" },
  ],
  notes: [
    "The fog comes <b>'on little cat feet'</b> — silent and soft.",
    "It sits <b>on silent haunches</b> over the harbour and city — like a cat watching.",
    "Then it <b>moves on</b> — fog, like cats, stays no longer than it wishes.",
    "The poem is a single <b>extended metaphor</b> — fog as a cat.",
    "Style: imagism — a sharp visual picture in the fewest words.",
  ],
  words: [
    { w: "haunches", m: "hips/thighs (sitting position)", u: "The fog sits on silent haunches." },
    { w: "harbour", m: "sheltered water by a port city", u: "The fog looks over the harbour and the city." },
    { w: "mist", m: "thin fog", u: "A light mist covered the morning streets." },
  ],
  quiz: [
    { q: "What is the fog compared to?", options: ["A dog", "A cat", "A bird", "A ship"], answer: 1, why: "It comes on little cat feet and sits on haunches." },
    { q: "How many lines does the poem have?", options: ["4", "6", "10", "14"], answer: 1, why: "Six short lines — a model of brevity." },
  ],
  pyq: ["How does the poet use the cat metaphor for fog? (CBSE 2021, 3m)"],
},

"english-1-8": {
  slides: [
    { kicker: "Poem 9 • Ogden Nash", title: "The Tale of Custard the Dragon",
      points: ["Belinda's pets: kitten Ink, mouse Blink, dog Mustard — and dragon Custard", "All but Custard boast of bravery; Custard cries for a nice safe cage", "When a pirate attacks, only Custard fights — the 'coward' is the hero"], formula: "The coward was the bravest of all" },
    { kicker: "The Pirate Attack", title: "Action Reversal",
      points: ["Pirate with pistols — Belinda cries for help, pets flee and hide", "Custard jumps, snorts, clashes his tail — and gobbles the pirate up", "Afterwards the others again claim they'd have been 'twice as brave'"], formula: "Talk vs action" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: real bravery shows in action, not in boasting", "A ballad — tells a story in rhyming verse", "Answers: characters + reversal + message"], formula: "Ballad + irony + true courage" },
  ],
  notes: [
    "Characters: Belinda, <b>Ink</b> (kitten), <b>Blink</b> (mouse), <b>Mustard</b> (dog), <b>Custard</b> (dragon).",
    "Custard's repeated demand: a <b>nice safe cage</b> — hence 'cowardly'.",
    "Mustard fled with a terrified yelp; Ink and Blink vanished — only <b>Custard fought</b>.",
    "Irony: after the rescue, the others say they would have been <b>twice as brave</b>.",
    "Form: a <b>ballad</b> — a story poem with a bouncy rhythm and rhyme.",
  ],
  words: [
    { w: "ballad", m: "story-telling poem/song", u: "'Custard the Dragon' is a comic ballad." },
    { w: "gaped", m: "stared open-mouthed", u: "Belinda gaped at the pirate." },
    { w: "goblin", m: "mischievous evil creature", u: "The poem mentions goblin and gnome in fun." },
  ],
  quiz: [
    { q: "Who actually killed the pirate?", options: ["Mustard", "Ink", "Custard", "Blink"], answer: 2, why: "Custard, the so-called coward, gobbled the pirate." },
    { q: "What did Custard keep asking for?", options: ["Food", "A nice safe cage", "A sword", "A friend"], answer: 1, why: "He wanted safety — until real danger came." },
  ],
  pyq: ["Why is Custard called a coward, and how is he the real hero? (CBSE 2023, 3m)"],
},

"english-1-9": {
  slides: [
    { kicker: "Poem 10 • W.B. Yeats", title: "For Anne Gregory",
      points: ["A young man tells Anne: only God could love her for herself alone", "Young men love beauty — her 'honey-coloured rampart' of hair", "Anne offers to dye her hair — but the argument stands"], formula: "Only God loves the self, not the shell" },
    { kicker: "The Dialogue", title: "Hair, Colour and Inner Self",
      points: ["The poet: young men are 'thrown into despair' by beauty", "Anne: 'I can change my hair to brown or black' — does that fix it?", "The old man's answer: only God, who made the heart, loves it truly"], formula: "Outer beauty fades; inner self endures" },
    { kicker: "Exam Corner", title: "Quick Points",
      points: ["Theme: transience of beauty; divine vs human love", "The poem is a conversation (dialogue form)", "Answers: dialogue + hair symbolism + final message"], formula: "Dialogue form makes it memorable" },
  ],
  notes: [
    "Anne Gregory was <b>Lady Gregory's granddaughter</b> — Yeats wrote it for her.",
    "'Honey-coloured rampart' — a wall of golden hair guarding young men's hearts.",
    "Anne's answer: she can dye her hair — showing how little looks decide true love.",
    "The final word: <b>only God</b> can love a person purely for their inner self.",
    "Theme: physical beauty is temporary; the soul is what truly deserves love.",
  ],
  words: [
    { w: "rampart", m: "defensive wall", u: "Your hair is a honey-coloured rampart." },
    { w: "despair", m: "hopelessness", u: "Young men are thrown into despair by beauty." },
    { w: "dye", m: "to change colour", u: "Anne could dye her hair brown or black." },
  ],
  quiz: [
    { q: "Who can love Anne for herself alone?", options: ["Any young man", "Only God", "The poet", "Her friends"], answer: 1, why: "The old man says only God loves the inner self." },
    { q: "What is Anne's hair compared to?", options: ["A river", "A honey-coloured rampart", "Golden sand", "A crown"], answer: 1, why: "A rampart — a wall that captures young men's hearts." },
  ],
  pyq: ["What is the central theme of 'For Anne Gregory'? (CBSE 2022, 3m)"],
},
};
