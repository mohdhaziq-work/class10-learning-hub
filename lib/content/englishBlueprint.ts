/* Class 10 ENGLISH Half-Yearly Blue Print (80 marks) — copied from the student's
   school blue print, plus exam-ready revision packs for every chapter in it.
   Chapter numbers follow this site's syllabus order (First Flight / Footprints),
   which matches the school's numbering. Each pack: detailed summary (2-3 min read),
   characters, themes, extract lines with meanings, and marks-sized Q&A. */

export interface EnQa { q: string; a: string; marks: number; kind: "short" | "long" | "extract" }
export interface EnExtract { line: string; meaning: string }
export interface EnChapter {
  key: string;          // site chapter key: english-{group}-{idx} -> /chapter/english/{group}/{idx}
  book: "Prose" | "Poetry" | "Footprints";
  num: number;
  title: string;
  author: string;
  summary: string[];
  characters?: { n: string; d: string }[];
  themes: string[];
  extracts: EnExtract[];
  qa: EnQa[];
}

export const EN_BP_META = {
  subject: "English",
  exam: "Half-Yearly Examination",
  time: "3 hours",
  mm: 80,
};

export const EN_BP_SECTIONS = [
  { label: "Reading Section", marks: 20, calc: "2 x 10 = 20", blurb: "Two unseen passages (10 marks each). Read the questions FIRST, then read the passage with a pencil in hand — underline as you go. Answer in the passage's own words wherever asked." },
  { label: "Writing Section", marks: 10, calc: "2 x 5 = 10", blurb: "Formal letter and analytical paragraph. Format carries marks — never skip sender's address, date, subject or salutation." },
  { label: "Grammar", marks: 10, calc: "1 x 10 = 10", blurb: "Mixed: modals, reported speech, editing (omission), prepositions. See the Grammar Crash section below — the rules below cover exactly these four." },
  { label: "Literature", marks: 40, calc: "see below", blurb: "Extracts 10 + First Flight short 12 + Footprints short 6 + First Flight long 6 + Footprints long 6. Word limits: short 40-50 words, long 100-120 words." },
];

export const EN_BP_LIT_ROWS = [
  { label: "(i) Extracts", calc: "2 x 5 = 10M", note: "One from First Flight, one from Footprints/Poetry. The 'extract lines' below are the exact lines exams love." },
  { label: "(ii) Short Answer — First Flight", calc: "3 x 4 = 12M", note: "Answer = direct point + evidence line + one-line theme. 40-50 words." },
  { label: "(iii) Short Answer — Footprints", calc: "3 x 2 = 6M", note: "2 marks = 25-30 words: one sharp point + proof from the story." },
  { label: "(iv) Long Answer — First Flight", calc: "1 x 6 = 6M", note: "100-120 words: intro line, 4-5 points, closing value line." },
  { label: "(v) Long Answer — Footprints", calc: "1 x 6 = 6M", note: "Character sketch or message — use the Q&A below as your skeleton." },
];

export const EN_BP_SYLLABUS = {
  prose: "Prose (First Flight): 1, 2, 3, 4, 5, 9",
  poetry: "Poetry: 3, 5, 7, 9, 10",
  fwf: "Footprints Without Feet: 1, 2, 3, 4, 7, 8",
  grammar: "Grammar: Modals, Reported Speech, Editing, Prepositions",
  writing: "Writing: Formal Letter, Analytical Paragraph",
};

/* ==================== CHAPTER PACKS ==================== */

export const EN_BP_CHAPTERS: EnChapter[] = [

/* ---------- PROSE 1 : A LETTER TO GOD ---------- */
{
  key: "english-0-0", book: "Prose", num: 1, title: "A Letter to God", author: "G.L. Fuentes",
  summary: [
    "Lencho is a poor farmer whose house is the only one in the valley, on the crest of a low hill. His fields are ready and his only hope is rain — and rain does come, but it turns into a hailstorm that lasts an hour and destroys the corn, the flowers and the trees completely.",
    "The family is grief-struck. Lencho's soul is not sad for himself but for what the ruined crop means for his family's hunger. His faith in God is unshakeable: he believes God's eyes see everything, even what is deep in one's conscience.",
    "So he writes a letter TO GOD asking for a hundred pesos to sow his field again and live until the next crop, and puts it in the postbox addressed simply 'To God'.",
    "At the post office a postman laughs; the fat, amiable postmaster reads the letter and is first angry, then deeply moved by the farmer's faith. He decides to answer 'God's letter' so that the man's faith is not shaken. He collects money from his employees, gives part of his own salary, but manages only a little more than fifty pesos — and sends it in an envelope signed simply: GOD.",
    "Lencho is NOT surprised to find the letter — of course God has replied. But when he counts the money he becomes angry: God cannot make a mistake or deny him, so the missing thirty pesos must have been stolen. He writes a second letter asking God to send the rest, but NOT through an ordinary letter, because 'the post office employees are a bunch of crooks'.",
    "The irony is the heart of the story: the very people who sacrificed their own money to keep his faith alive are the ones he calls crooks, and God (in his mind) is the only honest one.",
  ],
  characters: [
    { n: "Lencho", d: "poor, hardworking farmer; faith in God is absolute and childlike; ungrateful towards humans without realising it." },
    { n: "The postmaster", d: "fat, amiable, kind; laughs first, then respects Lencho's faith and sacrifices his own money to protect it." },
    { n: "The postmen", d: "one laughs at the address 'To God'; later they contribute to the collection." },
  ],
  themes: [
    "Unshakeable, naive faith in God — Lencho never doubts God, only humans.",
    "Irony: the helpers are accused as thieves; faith blinds him to human kindness.",
    "Kindness of strangers: the postmaster answers a letter addressed to God.",
  ],
  extracts: [
    { line: "The house — the only one in the entire valley — was on the crest of a low hill.", meaning: "Shows Lencho's isolation and how exposed his farm is to the weather — one storm can ruin everything." },
    { line: "These aren't raindrops falling from the sky, they are new coins. The big drops are worth ten centavos and the little ones five.", meaning: "Lencho sees rain as money — his crop IS his income; the metaphor shows a farmer's dependence on rain." },
    { line: "Our only hope is help from God.", meaning: "After the hailstorm, the family's total reliance on divine help — the seed of the letter." },
    { line: "God's eyes see everything, even what is deep in one's conscience.", meaning: "The belief that drives him to write to God as if to a person who will surely reply." },
  ],
  qa: [
    { q: "Why did Lencho write a letter to God?", a: "The hailstorm had destroyed his entire crop and his family faced hunger. His faith in God was complete — he believed God sees everything and helps everyone — so he asked God for a hundred pesos to sow again and survive till the next harvest.", marks: 2, kind: "short" },
    { q: "What did the postmaster do and why?", a: "He laughed at first, then was moved by Lencho's faith in God. To keep that faith unshaken, he collected money from his employees, added part of his own salary, and sent it in an envelope signed 'GOD' as if God himself had replied.", marks: 4, kind: "short" },
    { q: "Why was Lencho angry after reading the reply?", a: "He found only seventy pesos. Since God 'cannot make a mistake', he concluded the post office employees had stolen the rest, and called them 'a bunch of crooks' in his second letter.", marks: 2, kind: "short" },
    { q: "What is the irony in the story?", a: "The postmaster and his staff sacrificed their own money to protect Lencho's faith, yet Lencho accuses exactly those people of stealing God's money. Human kindness is mistaken for theft because his faith allows doubt of humans but never of God.", marks: 4, kind: "short" },
    { q: "Describe Lencho's character. Was his faith a strength or a weakness?", a: "Lencho is a hardworking, honest farmer with childlike, absolute faith in God. The faith is his strength — it gives him hope after total ruin and keeps him from despair. But it is also a weakness because it blinds him: he never doubts God yet instantly doubts and insults the humans who actually helped him, showing ingratitude and a lack of trust in people. A balanced view: faith sustained him, but faith without gratitude made him unjust to his real benefactors.", marks: 6, kind: "long" },
  ],
},

/* ---------- PROSE 2 : NELSON MANDELA ---------- */
{
  key: "english-0-1", book: "Prose", num: 2, title: "Nelson Mandela: Long Walk to Freedom", author: "Nelson Mandela",
  summary: [
    "10 May 1994 is the day of South Africa's first democratic, non-racial inauguration, held in the sandstone amphitheatre of the Union Buildings, Pretoria, before politicians and dignitaries from more than 140 countries.",
    "For decades a white minority ruled through apartheid — official racial discrimination. Mandela calls the system 'an extraordinary human disaster' and the day of freedom 'a glorious human achievement'.",
    "The ceremony opens with the singing of both national anthems — 'Nkosi Sikelel iAfrika' (African) and 'Die Stem' (Afrikaans) — symbol of the new rainbow nation where all colours and nations sit together.",
    "Mandela thanks the masses for the 'painful, inhuman sacrifices' that made this day possible, and pledges: 'never, never, and never again shall this beautiful land experience the oppression of one by another.'",
    "He says he stands there only as 'the sum of all those African patriots who had gone before him' — his achievement is built on their suffering.",
    "He explains the 'twin obligations' of every man: to his family, and to his people and country. Under apartheid a black man who tried to serve his people was torn from his family and punished — the two duties could not be fulfilled together; in a free society they can.",
    "His definition of courage: a brave man is not one who feels no fear, but one who conquers fear. And 'no one is born hating another person because of the colour of his skin' — people must learn to hate, and if they can learn hate they can be taught love, for love comes more naturally to the human heart.",
    "Finally: freedom is indivisible — the chains on any one person are chains on all; and the oppressor too must be liberated, because a man who takes away another's freedom is himself a prisoner of hatred, 'locked behind the bars of prejudice'.",
  ],
  characters: [
    { n: "Nelson Mandela", d: "first black President of South Africa after ~30 years of imprisonment; forgiving, inclusive, wise." },
    { n: "Mr de Klerk", d: "sworn in as Second Deputy President; the National Party leader with whom the transition was negotiated." },
  ],
  themes: [
    "Freedom is indivisible; oppression robs BOTH the oppressed and the oppressor of humanity.",
    "Courage = triumph over fear; love comes more naturally to the heart than hate.",
    "Sacrifice of generations: today's freedom is the sum of patriots' suffering.",
  ],
  extracts: [
    { line: "A rainbow gathering of different colours and nations...", meaning: "The world's leaders and people of every race assembled together — the image of the new 'rainbow nation'." },
    { line: "We have, at last, achieved our political emancipation.", meaning: "Legal freedom from apartheid is won; now the sun 'shall never set on so glorious a human achievement'." },
    { line: "No one is born hating another person because of the colour of his skin...", meaning: "Hate is taught, not natural; therefore love can be taught too — the moral core of the chapter." },
  ],
  qa: [
    { q: "Why is 10 May 1994 special?", a: "It was the day of South Africa's first democratic, non-racial government's inauguration at the Union Buildings, Pretoria — the end of apartheid and the beginning of the rainbow nation.", marks: 2, kind: "short" },
    { q: "What are the 'twin obligations' Mandela speaks of?", a: "Every man has two duties: to his family, and to his people and country. Under apartheid a black man was punished for serving his people, so the duties clashed; in a free society both can be fulfilled.", marks: 4, kind: "short" },
    { q: "What is Mandela's idea of courage?", a: "Courage is not the absence of fear but the triumph over it. A brave man is one who conquers fear, not one who feels none.", marks: 2, kind: "short" },
    { q: "Why does Mandela say the oppressor too must be liberated?", a: "A man who robs another of freedom is himself a prisoner of hatred and prejudice — 'locked behind the bars' of his own narrowness. True freedom must free both sides, otherwise humanity is not restored.", marks: 4, kind: "short" },
    { q: "Explain how both the oppressed and the oppressor are robbed of their humanity.", a: "The oppressed suffer pain, humiliation and chains, which wound his humanity. But the oppressor, by taking another's freedom, is robbed of his own humanity too: he becomes a slave to hatred, prejudice and narrow-mindedness, a prisoner behind invisible bars. Mandela therefore fought not to defeat whites but to free ALL South Africans — 'the oppressed and the oppressor alike' — because freedom is indivisible and the chains on one are chains on all.", marks: 6, kind: "long" },
  ],
},

/* ---------- PROSE 3 : TWO STORIES ABOUT FLYING ---------- */
{
  key: "english-0-2", book: "Prose", num: 3, title: "Two Stories About Flying", author: "Liam O'Flaherty / Frederick Forsyth",
  summary: [
    "PART I — HIS FIRST FLIGHT: A young seagull is alone on his ledge; his brothers and sister flew away the day before but he was afraid. Every time he tried to run to the brink and flap, his fear of the vast sea below stopped him and he ran back. The family scolded him for his cowardice.",
    "For 24 hours no one fed him. His hunger grew till it was unbearable. His mother tore a piece of fish near him but stopped halfway across the ledge — maddened by the smell of food, the seagull dived at the fish, fell outward into space, and in panic flapped: his wings spread, he was flying!",
    "Fear vanished in a minute; he soared, laughed, and his family flew around him praising him. When he landed on the green sea he sank and screamed with fright, then floated — that was his first dive and the start of his life as a gull.",
    "PART II — THE BLACK AEROPLANE: The narrator, a Dakota pilot, leaves Paris for England at 1:30 in the morning, happy at the thought of his holiday and breakfast at home. After an hour he sees storm clouds standing like black mountains. He could turn back, but the thought of home makes him take the risk and fly straight into the storm.",
    "Inside, everything goes black; the compass and other instruments die; the radio is dead; and he has fuel for only five to ten minutes. Suddenly he sees another aeroplane — black, with no lights on its wings, yet the pilot's face is lit. The black plane's pilot waves and signals 'Follow me'.",
    "The narrator follows through the storm for half an hour until the sky clears and he sees two straight roads of lights — a runway. He lands safely. When he asks the control tower who the other pilot was, the woman replies: 'But there was no other aeroplane there. Yours was the only one I could see on the radar.' The mystery is never solved.",
  ],
  characters: [
    { n: "The young seagull", d: "fearful at first; hunger forces the first attempt; learns that fear exists only till you act." },
    { n: "The seagull's mother", d: "clever and firm — withholds food, then tempts him mid-air to make him fly." },
    { n: "The Dakota pilot (narrator)", d: "ordinary, family-loving; takes a calculated risk; trusts a mysterious helper." },
    { n: "The black aeroplane's pilot", d: "the unsolved mystery — a saviour who appears on no radar." },
  ],
  themes: [
    "Fear is in the mind; action (and need) defeats it — the seagull flew when hunger left him no choice.",
    "Hope and trust appear in the darkest moments — the mysterious black aeroplane.",
    "Both stories: a struggle for survival against the unknown sky.",
  ],
  extracts: [
    { line: "He felt certain that his wings would never support him.", meaning: "The seagull's fear, not his body, was the real obstacle — confidence, not wings, was missing." },
    { line: "The compass showed that I was flying west, but I wanted to fly due east.", meaning: "In the storm even the instruments betray the pilot — total helplessness before the mystery plane appears." },
  ],
  qa: [
    { q: "How did the young seagull finally learn to fly?", a: "Hunger made him desperate. When his mother flew close with a fish and stopped midway, he dived at the food, fell into space, and his wings automatically spread — he was flying. Hunger, not courage, took the first step.", marks: 4, kind: "short" },
    { q: "Why did the narrator fly into the storm?", a: "He wanted to be home early for his holiday breakfast. He could have returned to Paris, but the thought of home made him take the risk of flying straight through the storm clouds.", marks: 2, kind: "short" },
    { q: "What is the mystery at the end of The Black Aeroplane?", a: "The black aeroplane that guided him out of the storm never appears on the control tower's radar — the narrator's was the only plane in the sky. Who saved him is left unanswered.", marks: 4, kind: "short" },
    { q: "Compare the two stories: what do they teach about fear?", a: "Both heroes face the unknown sky. The seagull's fear is of falling; the pilot's fear is the storm. In both, fear is defeated by action: the seagull is pushed by hunger and discovers he CAN fly; the pilot is guided through darkness by trusting a helper. Message: fear lives only in the mind until we act, and even in the darkest moments help and hope can appear.", marks: 6, kind: "long" },
  ],
},

/* ---------- PROSE 4 : FROM THE DIARY OF ANNE FRANK ---------- */
{
  key: "english-0-3", book: "Prose", num: 4, title: "From the Diary of Anne Frank", author: "Anne Frank",
  summary: [
    "Anne Frank, a thirteen-year-old, starts her diary on 20 June 1942 and names it 'Kitty'. Though she has a loving family, classmates and admirers, she feels she has no true friend with whom she can be completely open — 'paper has more patience than people'.",
    "She explains why she, a 13-year-old, is writing at all: neither she nor anyone else would care about the 'musings' of a schoolgirl — but then, it doesn't matter; she wants to talk and Kitty is her long-lost friend.",
    "Before the diary proper she sketches her life: father, mother, elder sister Margot, her grandmother who stayed with them, her birthday on 12 June 1942 with classmates, and her school.",
    "The famous episode: Mr Keesing, her maths teacher, is annoyed by her constant talking and punishes her with extra homework — an essay titled 'A Chatterbox'. Anne argues in it that talking is a student's trait and that she will do her best to control it, but that it is inherited from her mother, so little can be done.",
    "He makes her write a second essay — 'An Incorrigible Chatterbox'. Finally she writes a third, in VERSE: a poem about a mother swan, a father swan and three little ducklings; the father swan bites the ducklings to death because they quack too much. The teacher takes the joke in the right spirit, reads the poem to the class, and since then Anne is allowed to talk and the class enjoys maths.",
  ],
  characters: [
    { n: "Anne Frank", d: "lively, witty, honest, argumentative in a charming way; lonely for a true confidant despite being popular." },
    { n: "Mr Keesing", d: "old-fashioned maths teacher; strict about chatter but has a sense of humour — accepts the poem joke." },
  ],
  themes: [
    "Loneliness in a crowd: a child can be popular yet have no true friend.",
    "Paper has more patience than people — writing as emotional release.",
    "Humour and wit can turn punishment into friendship.",
  ],
  extracts: [
    { line: "Paper has more patience than people.", meaning: "A diary listens forever without judging or interrupting — the reason Anne confides in Kitty instead of people." },
    { line: "I don't intend to show this cardboard folder marked 'diary' to anyone.", meaning: "The diary is private; only if a real friend appears will it be shared — showing how precious and personal it is." },
  ],
  qa: [
    { q: "Why did Anne want to keep a diary?", a: "She felt she had no true friend to confide in, and believed 'paper has more patience than people' — a diary would listen without judging and keep her thoughts safe.", marks: 2, kind: "short" },
    { q: "How did Anne counter Mr Keesing's punishments?", a: "She wrote witty essays defending her talking as a student's (and her mother's) trait; and finally a funny poem about a father swan who kills three quacking ducklings. The teacher enjoyed the joke and let her talk in class.", marks: 4, kind: "short" },
    { q: "What does 'paper has more patience than people' mean?", a: "People get tired of listening or judging, but paper never does — it silently keeps every feeling. For a lonely, talkative child like Anne, the diary was the most patient listener.", marks: 2, kind: "extract" },
    { q: "Sketch Anne Frank's character as revealed in the diary.", a: "Anne is affectionate and popular yet inwardly lonely; honest about her faults; intelligent and witty — she turns a punishment essay into humour; respectful but not submissive — she argues her case cleverly instead of sulking; and deeply reflective for her age, questioning why anyone would care about a schoolgirl's musings. Her diary shows a child using writing to understand herself.", marks: 6, kind: "long" },
  ],
},

/* ---------- PROSE 5 : GLIMPSES OF INDIA ---------- */
{
  key: "english-0-4", book: "Prose", num: 5, title: "Glimpses of India", author: "Lucio Rodrigues / Coorg & Tea pieces",
  summary: [
    "PART I — A BAKER FROM GOA: Goa still carries Portuguese culture, and the traditional bakers ('paders') with their furnaces survive. The baker announced his arrival with the 'jhang, jhang' of his bamboo staff. Loaves were for the elders; the sweet bread 'bangles' were the children's choice. Baking was a profitable profession — the baker and his family never starved, and his monthly bill was collected with care. The baker wore the peculiar 'kabai' dress; even today, seeing someone in a frock-like dress invites the remark 'he is dressed like a pader'. Marriage gifts in Goa are meaningless without the sweet bread 'bol'.",
    "PART II — COORG: Coorg (Kodagu), a hill district of Karnataka between Mysore and Mangalore, is a piece of heaven — evergreen rainforests, spices and coffee plantations, mist-covered hills. The Coorgi people are martial and fiercely independent; a popular theory says they descend from a part of Alexander's army (or from Arabs — the 'kuppia' they wear resembles the 'kuffia' of the Arabs). They are the only Indians permitted to carry firearms without licence. Their hospitality is legendary; they proudly recount tales of valour. General Cariappa, the first Chief of the Indian Army, was a Coorgi. The river Kaveri originates here; the hills offer adventure sports; wildlife includes macaques, Malabar squirrels, langurs and elephants. During the monsoon the floods keep visitors away — the best time to visit is September to March.",
    "PART III — TEA FROM ASSAM: Pranjol, a youngster from Assam, travels on a train with his friend Rajvir. Rajvir is excited by the tea gardens; Pranjol, born on a tea estate, is bored. Rajvir explains legends: a Chinese emperor who always boiled water before drinking, into whose cup a leaf fell and gave flavour — tea was discovered; and Bodhidharma, the Buddhist ascetic, who cut off his sleepy eyelids, from which ten tea plants grew, whose leaves banish sleep. Tea came to Europe only in the sixteenth century and was drunk more as medicine than beverage. On the train they see the sea of tea bushes with women pluckers carrying bamboo baskets — it is the second-flush sprouting period.",
  ],
  characters: [
    { n: "The pader (baker)", d: "a nostalgic figure of Goan childhood; prosperous and respected." },
    { n: "Rajvir", d: "eager, well-read city boy; sees Assam with fresh, excited eyes." },
    { n: "Pranjol", d: "Assamese tea-garden boy; calm and unimpressed by what Rajvir finds amazing." },
  ],
  themes: [
    "India's diversity in one chapter: Portuguese Goa, martial Coorg, Assamese tea gardens.",
    "Tradition and culture live in small things — bread, dress, tales, legends.",
    "The same landscape is seen differently by an insider (Pranjol) and an outsider (Rajvir).",
  ],
  extracts: [
    { line: "The thud and jingle of the traditional baker's bamboo... can still be heard in some places.", meaning: "The sound is a living memory of Portuguese-era Goa — tradition surviving in the present." },
    { line: "Coffee and spices, evergreen rainforests... Coorg is a piece of heaven, some say, that must have drifted from the kingdom of heaven.", meaning: "The writer's way of saying Coorg's beauty is otherworldly." },
  ],
  qa: [
    { q: "Why was baking a profitable profession in Goa?", a: "Bread and sweet breads were essential at every occasion — marriages, parties, festivals — so bakers never starved; their families were prosperous and happy, shown by their plump physique.", marks: 2, kind: "short" },
    { q: "Write any two features of Coorg.", a: "Evergreen rainforests and coffee plantations with misty hills; a martial, hospitable people said to be of Greek or Arab descent; home of the Kaveri; adventure sports and wildlife like macaques and elephants.", marks: 2, kind: "short" },
    { q: "What are the two legends about the origin of tea?", a: "The Chinese emperor who always boiled drinking water: a leaf fell into his cup and gave a delicious flavour — tea was born. And Bodhidharma, who cut off his eyelids to fight sleep; from them grew ten tea plants whose leaves drive sleep away.", marks: 4, kind: "short" },
    { q: "How do Rajvir and Pranjol react differently to the tea gardens, and what does it show?", a: "Rajvir, the outsider, is thrilled by the 'sea of green' bushes and the pluckers; Pranjol, born on the estate, finds it ordinary. It shows that familiarity dulls wonder — the same India amazes a visitor and bores a local, which is why travel keeps teaching us to see our own land freshly.", marks: 6, kind: "long" },
  ],
},

/* ---------- PROSE 9 : THE PROPOSAL ---------- */
{
  key: "english-0-8", book: "Prose", num: 9, title: "The Proposal", author: "Anton Chekhov (Play)",
  summary: [
    "Ivan Vassiliyitch Lomov, a wealthy neighbour of 35, a hypochondriac with palpitations, comes in formal dress to propose to Natalya Stepanovna, 25, daughter of Stepan Stepanovitch Chubukov. Chubukov is delighted — 'a merchant come for his goods' — and leaves the two alone.",
    "But before the proposal happens, Lomov and Natalya quarrel over the Oxen Meadows: she claims the meadows are hers; he claims they are his, tied to his aunt's grandmother's land. The quarrel escalates till Chubukov returns and joins in, and Lomov is asked to leave.",
    "After he goes, Chubukov tells Natalya that Lomov had come to propose; she is desperate and demands he be brought back. Lomov returns; the meadows are quietly dropped — and instantly a NEW quarrel begins: whose dog is better, his Squeezer or her Guess? Guess is old and short in the muzzle, says Lomov; Squeezer is worse, his hip is out of joint, says Natalya; Chubukov shouts about both dogs.",
    "The strain is too much for Lomov's heart: palpitations, a numb leg, a hammering artery — he collapses in an armchair; the Chubukovs think he is dead and cry out. He recovers with water; Chubukov, exhausted, forces the marriage: 'They're engaged! ... Champagne!' The play ends with the couple still arguing about the dogs while the father begs, 'Only don't leave me alone!'",
  ],
  characters: [
    { n: "Lomov", d: "35, rich, nervous, ill (palpitations); quarrelsome over petty property; came to marry but almost dies first." },
    { n: "Natalya", d: "25, a good housekeeper and not bad-looking, but as argumentative as her father; desperate to marry yet cannot stop quarrelling." },
    { n: "Chubukov", d: "the father; swings from joy to fury and back; treats marriage as a business deal." },
  ],
  themes: [
    "Satire on marriage among the propertied class — land and dogs matter more than love.",
    "Petty quarrels destroy the most important moments of life.",
    "Chekhov's humour: the proposal is drowned under two absurd disputes.",
  ],
  extracts: [
    { line: "If you remember, the Oxen Meadows are ours!", meaning: "The very first words that turn a proposal visit into a property fight — the engine of the whole comedy." },
  ],
  qa: [
    { q: "Why did Lomov visit Chubukov's house?", a: "To propose marriage to Natalya Stepanovna. At 35, with weak health, he felt it was time to settle down, and Natalya was a good housekeeper from a respected family.", marks: 2, kind: "short" },
    { q: "What were the two quarrels in the play?", a: "First over the Oxen Meadows — both families claimed the land as theirs; second over their dogs, Squeezer versus Guess, each insisting his or her dog was superior.", marks: 4, kind: "short" },
    { q: "Is the title 'The Proposal' justified?", a: "Yes — ironically. The proposal is the reason for the visit, yet it is postponed through two silly quarrels and finally forced through by the exhausted father. The title highlights the satire: the marriage happens without the proposal ever being properly made.", marks: 4, kind: "short" },
    { q: "What message does Chekhov give through this comedy?", a: "People who quarrel over trifles ruin their own happiness. Lomov, Natalya and Chubukov are all educated and well-off, yet behave like children over meadows and dogs. Chekhov laughs at a society where marriage is a property deal and ego matters more than love — and warns that a life built on constant bickering will stay exactly that: the couple is still arguing as the play ends.", marks: 6, kind: "long" },
  ],
},

/* ---------- POETRY 3 : A TIGER IN THE ZOO ---------- */
{
  key: "english-1-2", book: "Poetry", num: 3, title: "A Tiger in the Zoo", author: "Leslie Norris",
  summary: [
    "The poem contrasts a tiger's caged life with the life he SHOULD be living. In the zoo he paces 'in his vivid stripes / the few steps of his cage', in quiet rage, ignoring the visitors.",
    "He should be lurking in the shadow of the forest, sliding through long grass near the water hole to catch plump deer; he should be snarling around houses at the jungle's edge, baring his white fangs and claws, terrorising the village.",
    "But instead he is locked in a concrete cell, his strength lying useless 'behind the bars'. At night he stares with his brilliant eyes at the brilliant stars — the only freedom left to him is looking at the sky.",
    "The repetition of 'quiet rage' and 'he should be' builds the protest: caging a wild animal is cruelty, and beauty imprisoned is beauty wasted.",
  ],
  themes: [
    "Freedom vs captivity: a wild creature's natural life is its right.",
    "Silent, helpless anger — rage that has nowhere to go.",
    "Zoo as a concrete prison; stars as the last glimpse of freedom.",
  ],
  extracts: [
    { line: "He stalks in his vivid stripes / the few steps of his cage, / And slides through the bars of his cage,", meaning: "'Slides through the bars' shows he is trapped — only his stripes seem to move freely; 'vivid stripes' stresses his natural beauty wasted in a small cage." },
    { line: "He should be lurking in shadow, / sliding through long grass, snarling / around houses at the jungle's edge", meaning: "The poet lists the tiger's natural, rightful life — hunting, prowling, being feared — everything the cage has stolen." },
    { line: "But he's locked in a concrete cell, / his strength behind bars, / stalking the length of his cage, / ignoring visitors.", meaning: "All his power is useless now; he has given up on people — even his anger is silent ('quiet rage')." },
    { line: "And stares with his brilliant eyes / at the brilliant stars", meaning: "The parallel 'brilliant' shows the tiger belongs to that wild, brilliant night sky — the stars are his true home, the only thing the cage cannot block." },
  ],
  qa: [
    { q: "How is the tiger in the cage different from the tiger in the wild?", a: "In the cage he paces a few steps in quiet rage, ignoring visitors; in the wild he would lurk in shadow, slide through long grass to the water hole, and snarl at the village edge — free, powerful and feared.", marks: 4, kind: "short" },
    { q: "What does 'his strength behind bars' suggest?", a: "His power is imprisoned and useless — a strong creature reduced to pacing a cage; the line is a protest against keeping wild animals in zoos.", marks: 2, kind: "extract" },
    { q: "Why does the poet repeat 'he should be'?", a: "To stress what the tiger's natural life ought to be — hunting in grass, prowling at the village edge. The repetition builds anger and pity: everything after 'should' is stolen by the cage.", marks: 2, kind: "extract" },
    { q: "What message does the poem give about keeping wild animals in zoos?", a: "The poem is a quiet protest: a tiger is born for shadow, long grass and open sky, not for a concrete cell and staring visitors. In the zoo his strength is wasted, his rage silent, his only freedom a night look at the stars. The poet makes us feel that caging a wild animal is not care but cruelty — beauty imprisoned is life denied.", marks: 6, kind: "long" },
  ],
},

/* ---------- POETRY 5 : THE BALL POEM ---------- */
{
  key: "english-1-4", book: "Poetry", num: 5, title: "The Ball Poem", author: "John Berryman",
  summary: [
    "A boy's ball bounces merrily down the street and falls into the harbour water. The boy stands 'shaking, trembling', staring down 'desperately' where his ball went.",
    "The poet says there is no use telling him 'O there are other balls' — another ball cannot replace THIS one, because the ball stands for the sweet memories of his childhood that went with it.",
    "An ultimate ball costing a dime could be bought, but the loss cannot be bought back; 'money is external' — it cannot purchase what is really lost.",
    "The boy is learning his first 'responsibility': to stand up in 'a world of possessions' where things WILL be lost. The poem calls this 'the epistemology of loss' — knowing how to stand up when something you love is gone forever.",
    "The boy must learn to leave the harbour and move on, carrying the grief — that is growing up.",
  ],
  themes: [
    "Loss is a part of life; everyone must learn to bear it and stand up.",
    "The lost object = lost childhood; some things money cannot bring back.",
    "'The world of possessions' — in a material world, losing things is inevitable.",
  ],
  extracts: [
    { line: "Merrily bouncing, down the street, and then / Merrily over — there it is in the water!", meaning: "The joyful word 'merrily' makes the loss sharper — happiness and loss meet in the same two lines." },
    { line: "No use to say 'O there are other balls':", meaning: "Replacement is useless; what matters is the memory attached to THIS ball — the lesson is about loss, not objects." },
    { line: "I am not a little boy", meaning: "The poet refuses to intrude or console like an adult; the boy must learn the lesson himself." },
    { line: "He is learning... the epistemology of loss, how to stand up", meaning: "The core line: loss teaches us KNOWLEDGE (epistemology) — the knowledge of standing up after losing and moving on." },
  ],
  qa: [
    { q: "Why does the boy stand trembling and staring?", a: "His ball has just fallen into the water and is gone forever; the trembling shows his first real grief — the first loss of his life.", marks: 2, kind: "short" },
    { q: "Why is it useless to offer the boy another ball?", a: "Because the ball is not just a toy — it holds his childhood memories. A new ball can be bought for a dime, but the lost memories and the feeling cannot; 'money is external'.", marks: 4, kind: "short" },
    { q: "What does 'the epistemology of loss' mean?", a: "The knowledge and understanding of loss — how to accept that some things are gone forever and how to stand up and move on. It is the boy's first lesson in responsibility.", marks: 2, kind: "extract" },
    { q: "Explain the central idea of The Ball Poem.", a: "Through a small event — a boy losing his ball — the poem teaches the biggest lesson of life: loss is inevitable in a world of possessions. The ball symbolises childhood and its memories, which no money can replace. The boy's trembling grief is his first encounter with loss, and in that moment he learns 'responsibility': to stand up, bear the grief, and walk on. The poet deliberately does not console him, because the lesson of standing up after loss can only be learned by living it.", marks: 6, kind: "long" },
  ],
},

/* ---------- POETRY 7 : THE TREES ---------- */
{
  key: "english-1-6", book: "Poetry", num: 7, title: "The Trees", author: "Adrienne Rich",
  summary: [
    "The trees in the poem are INSIDE the house — decorative plants on the veranda — and they are moving OUT into the forest, which 'was empty all these days', where no bird could sit, no insect hide, no wind blow in its shadow.",
    "The poet describes their escape like a breakout: the roots work hard all night to 'disengage themselves from the cracks in the floor'; the leaves strain 'toward the glass'; the small twigs stiff with effort are like 'newly discharged patients' of a clinic, half-shy, half-eager to move.",
    "The poet sits inside with her writing, the smell of leaves and lichen around her; the moon is 'broken like a mirror' on the crown of the oak — its light lies in pieces on the ground.",
    "When the trees move out, the glass of the veranda will shatter and the trees will 'stumble' into the folds of the forest; the wind will rush to meet them; and the poet says she will not mention this departure in her letters — though the forest, silent now, will be 'full of whispers' tomorrow.",
    "Meaning: trees (nature) were imprisoned by man for decoration; they break free and return to their rightful home. It also reads as a symbol of any suppressed group (e.g. women) reclaiming freedom.",
  ],
  themes: [
    "Man vs nature: we imprison nature indoors and call it decoration; nature breaks free.",
    "Freedom cannot be caged — roots will crack the floor to escape.",
    "Silence before change: today empty forest, tomorrow 'full of whispers'.",
  ],
  extracts: [
    { line: "The forest that was empty all these days— / where no bird could sit, no insect hide, / no sun bury its feet in shadow—", meaning: "A forest without life is dead; man's cutting has emptied it — the returning trees will bring it back to life." },
    { line: "The roots work to disengage themselves from the cracks in the floor", meaning: "The struggle for freedom is slow and painful — roots must tear free from the very floor that trapped them." },
    { line: "The moon is broken like a mirror / whose pieces flash", meaning: "Moonlight shattered by the oak's crown — a broken mirror image for a world whose natural order is broken by man." },
  ],
  qa: [
    { q: "Where are the trees in the poem, and where are they going?", a: "The trees are inside the house, on the veranda, kept as decoration; they are escaping at night into the forest, which has been empty of trees and therefore lifeless.", marks: 2, kind: "short" },
    { q: "What do the roots and twigs do during the escape?", a: "The roots work all night to free themselves from the cracks of the floor; the twigs stiffen with effort like 'newly discharged patients', half-shy, half-eager — nature struggling to break out of man's prison.", marks: 4, kind: "short" },
    { q: "Why does the poet say the forest will be 'full of whispers'?", a: "Today the forest is silent and empty; tomorrow, when the freed trees reach it, its leaves will rustle and life will return — the 'whispers' are the sound of a forest alive again.", marks: 2, kind: "extract" },
    { q: "Explain the two levels of meaning in The Trees.", a: "On the surface, the poem shows decorative house-plants breaking out of the veranda and returning to an empty forest — a vivid environmental message that nature, imprisoned by man for beauty, will always fight its way back to freedom. On a deeper level the trees stand for any suppressed beings — women, the weak, the colonised — who are kept indoors as ornaments but whose roots quietly work at night for release. The shattered mirror-moon and the forest 'full of whispers' promise that after the breakout the world's broken order becomes alive again.", marks: 6, kind: "long" },
  ],
},

/* ---------- POETRY 9 : THE TALE OF CUSTARD THE DRAGON ---------- */
{
  key: "english-1-8", book: "Poetry", num: 9, title: "The Tale of Custard the Dragon", author: "Ogden Nash",
  summary: [
    "Belinda lives in a little white house with a black kitten (Ink), a grey kitten (Blink), a little yellow dog (Mustard) and a dragon named Custard. Everyone claims to be brave — Belinda as brave as a bear, Ink and Blink able to chase lions down the stairs, Mustard 'as brave as a tiger in a rage' — but Custard is a coward who cries for a nice safe cage.",
    "Everyone teases him: Belinda tickles him unmercifully and calls him Percival; the whole household laughs at the cowardly dragon.",
    "Then a pirate comes in with pistols in both hands and a bright cutlass, and the brave ones collapse: Belinda grows pale, Mustard flees to the cellar, Ink and Blink hide in the old shoe bin — not a sound from them.",
    "But up jumps Custard, snorting like an engine, clashing his tail like iron in a dungeon, and with a hooray he charges at the pirate — and gobbles him up, 'every bit'.",
    "Afterwards the cowards return and boast again: Mustard says HE would have been 'twice as brave' if he hadn't been flustered; Ink and Blink gibe that they would have been 'thrice as brave'. And the humble Custard agrees that they are all braver than he — keeping the gentle comedy alive to the end.",
    "Moral: real courage shows in the crisis, not in boasting; and true bravery stays humble.",
  ],
  themes: [
    "Boasting vs real courage — the boasters hide; the 'coward' acts.",
    "Appearances deceive: a dragon that cries for a cage saves everyone.",
    "Humility of the truly brave — Custard never boasts after winning.",
  ],
  extracts: [
    { line: "But up jumped Custard, snorting like an engine, / Clashed his tail like iron in a dungeon", meaning: "Similes show Custard transforming from pet-coward into a machine of war the moment real danger arrives." },
    { line: "While the little yellow dog did sharp yip, yip, yip, / But the dragon cried for a nice safe cage.", meaning: "The comic contrast that sets up the whole poem — the small dog acts brave, the big dragon asks for safety." },
  ],
  qa: [
    { q: "Who were the inhabitants of the little white house?", a: "Belinda; her black cat Ink; grey cat Blink; yellow dog Mustard; and Custard the dragon — the only one who claimed to be a coward.", marks: 2, kind: "short" },
    { q: "How did everyone react when the pirate entered?", a: "All the 'brave' ones failed: Belinda turned pale, Mustard ran to the cellar, Ink and Blink hid in the shoe bin. Only Custard, the supposed coward, faced the pirate and ate him up completely.", marks: 4, kind: "short" },
    { q: "What do the last stanzas show about the other characters?", a: "After the danger passes, they start boasting again — Mustard claims he'd have been twice as brave, the cats thrice as brave — while Custard humbly agrees they are braver. The comedy shows boasters never change, and the truly brave stays modest.", marks: 4, kind: "short" },
    { q: "What lesson does the poem teach about courage?", a: "Courage is proved only in action during real danger, not in words. The household boasted daily but hid at the first pistol; Custard, mocked as a coward, alone stood and saved them. Yet the poem is gentle, not bitter: Custard never claims superiority, teaching that true bravery is humble while empty boasting is the mark of those who run.", marks: 6, kind: "long" },
  ],
},

/* ---------- POETRY 10 : FOR ANNE GREGORY ---------- */
{
  key: "english-1-9", book: "Poetry", num: 10, title: "For Anne Gregory", author: "W.B. Yeats",
  summary: [
    "A young man tells Anne Gregory that 'never shall a young man / thrown into despair / by those great honey-coloured / ramparts at your ear' love her for herself alone — her beautiful yellow hair (the 'ramparts') always comes first; men love her looks, not her soul.",
    "Anne replies playfully and defiantly: she can change her hair with hair-dye — 'brown, or black, or carrot' — and then young men will see her true self and love her for herself alone.",
    "The poet then answers with a 'religious man's' wisdom: only God can love a person for themselves alone. Human beings are not free from the pull of outward beauty; only divine love looks purely at the soul.",
    "So the poem moves in three voices: the admirer (men love beauty), Anne (beauty can be changed, then love me for me), and the poet (only God loves beyond beauty).",
  ],
  themes: [
    "Outer beauty vs inner self: human love is partly love of appearance.",
    "Only divine love is completely free of outward beauty.",
    "A young woman's right to be loved for her soul, not her 'ramparts'.",
  ],
  extracts: [
    { line: "those great honey-coloured / ramparts at your ear", meaning: "Her yellow hair falling around her ears like fortress walls — the walls that hide her inner self from young men, who never get past the beauty." },
    { line: "But I can get a hair-dye / and set such colour there, / Brown, or black, or carrot", meaning: "Anne's witty reply: if hair is the problem, hair can be changed — then love me for what I am inside." },
    { line: "But God can love you for yourself alone, / For He alone can see.", meaning: "The closing truth: human eyes always see the body first; only God's eyes see the self alone." },
  ],
  qa: [
    { q: "Why does the young man say no one can love Anne for herself alone?", a: "Because her great yellow hair makes young men despair with admiration — they fall for her beauty first and never reach her inner self.", marks: 2, kind: "short" },
    { q: "What solution does Anne offer?", a: "She says she can dye her hair brown, black or carrot; once the famous hair is gone, men will have no choice but to love her for herself alone.", marks: 2, kind: "short" },
    { q: "According to the poet, who can love a person for themselves alone, and why?", a: "Only God, because human beings cannot separate a person from outward beauty; God alone sees and loves the soul itself.", marks: 4, kind: "short" },
    { q: "Discuss the poem's view of human love versus divine love.", a: "Human love, the poem says, is always mixed with attraction to outer beauty — young men despair at Anne's 'honey-coloured ramparts' and love the hair, not the heart. Anne believes this can be fixed by changing her hair, showing her confidence that her inner self is lovable. But the poet closes with a deeper, religious truth: humans are simply not made to love beyond appearance; only God loves a person 'for yourself alone'. So the poem is both a compliment to Anne's inner worth and a calm, slightly sad acceptance of human nature.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 1 : A TRIUMPH OF SURGERY ---------- */
{
  key: "english-2-0", book: "Footprints", num: 1, title: "A Triumph of Surgery", author: "James Herriot",
  summary: [
    "Tricki, the pet dog of the rich Mrs Pumphrey, falls ill — but his disease is love, not infection. Mrs Pumphrey overfeeds him with cream cakes, chocolates, malt, cod-liver oil and Horlicks, and gives him no exercise.",
    "Symptoms: rheumy eyes, no energy, vomiting, lying on a rug panting, 'like a bloated sausage with a leg at each corner'.",
    "Dr James Herriot knows the cause at once. He tells Mrs Pumphrey the only cure is a strict diet and hospitalisation for a fortnight; she collapses in grief but agrees.",
    "At the surgery Tricki gets NO food for two days — only water. By the third day he is interested in his surroundings; when the dogs' food bowl appears he fights for his share and wins. Soon he runs, plays and is completely transformed — no medicine, no operation, ever.",
    "Meanwhile Mrs Pumphrey keeps sending fresh eggs, wine and brandy 'for Tricki' — and the doctor and his staff enjoy them. After two weeks she comes to collect him, weeps with joy at his health, and cries the title line: 'This is a triumph of surgery!' — though no surgery was ever performed. The cure was discipline.",
  ],
  characters: [
    { n: "Mrs Pumphrey", d: "wealthy, loving but foolish; her over-love in the form of food made the dog ill." },
    { n: "Dr Herriot (narrator)", d: "wise and firm; cures with restraint and common sense, not medicines." },
    { n: "Tricki", d: "the victim of indulgence; recovers fully once given a normal dog's life." },
  ],
  themes: [
    "Excess and indulgence harm; discipline and a simple life heal.",
    "Over-love can be a disease — true care sometimes means saying no.",
    "Gentle satire on rich pet-owners.",
  ],
  extracts: [
    { line: "He was so listless... he seemed to have no energy.", meaning: "The first sign that Tricki's lifestyle, not an infection, is the problem." },
    { line: "This is a triumph of surgery!", meaning: "The ironic title line — Mrs Pumphrey credits 'surgery' for a cure that was only diet, exercise and company." },
  ],
  qa: [
    { q: "What was Tricki's real illness?", a: "Overfeeding and no exercise. Mrs Pumphrey's over-love — cream cakes, chocolates, malt — made him fat and listless; there was no real disease.", marks: 2, kind: "short" },
    { q: "How did Dr Herriot treat Tricki without medicine?", a: "He kept him at the surgery: no food for two days, only water; then plain food, and the company of active dogs for play and exercise. Discipline alone cured him.", marks: 4, kind: "short" },
    { q: "Who enjoyed the eggs, wine and brandy, and why is that funny?", a: "The doctor and his staff, not Tricki. It is funny because the 'tonics' meant for the dog were useless to him — the real cure was the opposite of luxury.", marks: 2, kind: "short" },
    { q: "Justify the title 'A Triumph of Surgery'.", a: "The title is dramatic irony. No surgery was performed — Tricki was cured by a strict diet, water, exercise and the company of other dogs. Mrs Pumphrey, unaware of the real cure, calls the recovery 'a triumph of surgery'. The real triumph is of the doctor's wisdom and restraint: he resisted the temptation to over-treat and simply removed the cause — overfeeding. The title laughs gently at people who credit grand treatments when the cure was common sense.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 2 : THE THIEF'S STORY ---------- */
{
  key: "english-2-1", book: "Footprints", num: 2, title: "The Thief's Story", author: "Ruskin Bond",
  summary: [
    "Hari Singh, a fifteen-year-old experienced thief, meets Anil, a kind struggling writer, at the wrestling match and cleverly wins his confidence — smiling 'in my most appealing way'. Anil takes him in as a helper.",
    "Anil feeds him, teaches him to cook (badly at first), to sweep, and — most importantly — to write his own name, promising soon to teach him whole sentences. Hari realises that education can change his life: 'whole sentences... could one day give me more than a few hundred rupees'.",
    "Anil earns irregularly and trusts Hari with shopping; Hari makes a profit of about a rupee a day, and Anil knows but doesn't mind.",
    "One night Anil comes home with a small bundle of notes — six hundred rupees — and tucks it under the mattress. Hari, after long inner struggle, silently takes the notes and slips out into the night.",
    "At the station the 10:30 Lucknow Express is just moving; Hari could jump on — but he doesn't. In the rain he stands at the platform, torn: with the money he can live like a rich man for weeks, but he would lose the chance of learning, of becoming somebody. 'Education is the big thing', he thinks. He walks back through the rain and slides the wet notes under the mattress.",
    "Next morning Anil gives him the usual note — plus says, 'Today we'll start writing sentences.' The notes, when Hari touches them, are still damp from the night's rain — Anil knows everything, but says nothing. Trust wins over theft.",
  ],
  characters: [
    { n: "Hari Singh", d: "young thief with a conscience; chooses education over six hundred rupees." },
    { n: "Anil", d: "trusting, generous writer; his silent forgiveness reforms the thief." },
  ],
  themes: [
    "Trust can reform where punishment cannot.",
    "Education is more valuable than stolen money.",
    "The inner fight between greed and conscience.",
  ],
  extracts: [
    { line: "I knew that once I could write like an educated man there would be no limit to what I could achieve.", meaning: "The turning point of the story — Hari values literacy more than theft's profit." },
    { line: "The notes were damp from the night's rain.", meaning: "Proof that Anil knows about the theft and the return — and chooses silent forgiveness." },
  ],
  qa: [
    { q: "Why didn't Hari Singh board the Lucknow Express?", a: "Because taking the money meant losing Anil's trust and his chance to learn to read and write. His conscience chose education and a future over six hundred rupees.", marks: 4, kind: "short" },
    { q: "How do we know Anil discovered the theft?", a: "In the morning the notes Hari received were still damp from the rain — they were the same stolen, returned notes. Anil never mentions it; his silence is forgiveness.", marks: 2, kind: "short" },
    { q: "What role did Anil play in changing Hari?", a: "Anil gave him food, respect, and — the key gift — education. His trust made Hari feel valued for the first time; that trust, not fear of police, is what pulled Hari back from the platform.", marks: 4, kind: "short" },
    { q: "Why is the story called a study in trust? Explain Hari's inner conflict.", a: "Hari's conflict is between the thief's habit and the student's hope. On the platform he counts his gains — money, food, freedom — and his losses — Anil's trust and the sentences he would never learn to write. The story shows that a person reforms when someone believes in him: Anil's quiet forgiveness at the end completes the change Hari began on the platform. Hence the real subject is not theft but trust and transformation.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 3 : THE MIDNIGHT VISITOR ---------- */
{
  key: "english-2-2", book: "Footprints", num: 3, title: "The Midnight Visitor", author: "Robert Arthur",
  summary: [
    "Ausable is the opposite of every storybook secret agent: very fat, sloppy, speaking French and German with an American accent, living in a small musty room on the sixth floor of a gloomy French hotel, arranging prosaic phone appointments instead of receiving mysterious messages.",
    "Fowler, a young writer who wanted romance — silent pistols, intrigue — is disappointed. But at midnight the real drama begins: the door opens and Max enters — a slender, menacing man with a small automatic pistol — demanding an important report about new missiles that Ausable is expecting.",
    "Ausable, surprisingly calm, starts a story: he complains that every month someone enters his room through the balcony outside the window; he claims he has reported it to the police; he says the police check on him tonight because of the vital papers.",
    "A knock comes at the door. Ausable whispers: 'It is the police!' (He had actually ordered a drink and expected Henry, the waiter.) Max, terrified of being caught with the pistol, leaps through the window onto the 'balcony' — and falls six storeys to his death, because there is no balcony; the window opens onto nothing.",
    "The door opens: it is Henry, the waiter, with the drink Ausable had ordered. Fowler understands the whole trap: Ausable invented the balcony story on the spot, used the expected knock, and let Max destroy himself. Presence of mind beat the pistol.",
  ],
  characters: [
    { n: "Ausable", d: "fat, unspectacular agent whose weapon is his brain; defeats Max without touching him." },
    { n: "Max", d: "thin, dangerous rival agent; clever but out-thought; dies by his own leap." },
    { n: "Fowler", d: "young disappointed writer who witnesses the greatest trick in espionage." },
  ],
  themes: [
    "Brains beat brawn: the real spy wins by imagination, not guns.",
    "Appearances deceive — the sloppiest man is the deadliest.",
    "Presence of mind under pressure.",
  ],
  extracts: [
    { line: "You are not what I expected", meaning: "Fowler's disappointed first impression — which the plot will completely reverse." },
  ],
  qa: [
    { q: "Why was Fowler disappointed with Ausable?", a: "He had imagined secret agents with silent pistols and romance; Ausable was fat, sloppy, lived in a small musty room and made prosaic phone calls — nothing like a storybook spy.", marks: 2, kind: "short" },
    { q: "How did Ausable get rid of Max?", a: "He invented a story that someone enters his room through a balcony outside the window. When the expected knock came (Henry the waiter), Ausable called it the police; Max panicked and jumped onto the non-existent balcony and fell to his death.", marks: 4, kind: "short" },
    { q: "What made Ausable's plan perfect?", a: "It used only true-looking details: the complaint about past break-ins, the 'police' visit he really expected (his drink order), and the knock arriving exactly on time. Max supplied the rest — his own fear. Ausable never touched him.", marks: 4, kind: "short" },
    { q: "How does the story show that presence of mind is the greatest weapon?", a: "Max had the pistol, the thin menace and the initiative; Ausable had only seconds and a knock at the door. Instead of fighting, he built a story from the room itself — a fake balcony — and turned the knock of a waiter into 'the police'. Max, the professional, believed it and killed himself. The story argues that in danger, a calm, inventive mind defeats force; the fat 'unromantic' agent outperforms every storybook hero Fowler ever imagined.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 4 : A QUESTION OF TRUST ---------- */
{
  key: "english-2-3", book: "Footprints", num: 4, title: "A Question of Trust", author: "Victor Canning",
  summary: [
    "Horace Danby, about fifty, is a successful maker of locks — and a thief with one weakness: rare, expensive books. Once a year he robs one safe, just enough to buy the books he loves through an agent.",
    "He plans carefully: at Shotover Grange he studies the house, the garden, the dog Sherry, the servants' movements. On the day, with the family away and the gardener busy, he enters through the kitchen door.",
    "Inside, before he can open the safe, a young, charming lady in red walks in — and behaves as if the house is hers. She claims to have come back just in time to catch a 'burglar', and playfully threatens to call the police unless he 'breaks open the safe' for her: she has forgotten the combination and needs her jewels for a party that night.",
    "Horace, nervous and eager to escape, takes off his gloves (to hand her his lighter for a cigarette) and opens the safe for her, handing over all the jewels. She even lets him go without reporting him.",
    "Three days later Horace is arrested for the robbery of the jewels — because his fingerprints were everywhere (he had opened the safe without gloves). The lady in red was the REAL thief: she too had been casing the house and used Horace to open the safe. Now, as assistant in charge of the prison library, when anyone mentions 'honour among thieves', Horace thinks of the lady in red.",
  ],
  characters: [
    { n: "Horace Danby", d: "methodical, good-natured thief; his love of books and his nervousness ruin him." },
    { n: "The lady in red", d: "the cleverer thief; acts as the owner and uses Horace as her safe-breaker." },
  ],
  themes: [
    "Honour among thieves does not exist — one thief tricked another.",
    "A single weakness (books; or a charming stranger) undoes careful plans.",
    "Irony: the criminal is punished through the crime of a fellow criminal.",
  ],
  extracts: [
    { line: "Horace Danby was good and honest — but only in the sense that he was no thief in the big way.", meaning: "The comic opening: he is 'honest' most of the year and robs only once, and only for books." },
  ],
  qa: [
    { q: "Why did Horace Danby steal?", a: "Only to buy rare, expensive books he loved. He robbed one safe a year — a thief with a single, scholarly weakness.", marks: 2, kind: "short" },
    { q: "How did the lady in red trick Horace?", a: "She pretended to be the lady of the house returning unexpectedly, threatened to call the police, and then 'allowed' him to go if he opened the safe for her forgotten jewels. He opened it without gloves and handed her the jewels — she was the real thief.", marks: 4, kind: "short" },
    { q: "Why was Horace arrested?", a: "Because he had opened the safe without gloves, leaving fingerprints everywhere. The real owners reported the missing jewels, and the evidence pointed to him.", marks: 2, kind: "short" },
    { q: "Explain the meaning of 'a question of trust' in the story.", a: "The title is bitter irony. Among thieves there is supposed to be 'honour', yet the lady — a fellow thief — betrayed Horace completely: she used his skill, let him leave with false kindness, and left him to be arrested while she kept the jewels. Horace, who planned everything, trusted the most dangerous person in the room. The story asks: can there be trust where everyone is a criminal? His answer, from the prison library, is the lady in red.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 7 : THE NECKLACE ---------- */
{
  key: "english-2-6", book: "Footprints", num: 7, title: "The Necklace", author: "Guy de Maupassant",
  summary: [
    "Mathilde Loisel is pretty and charming but born into a family of clerks; she has no dowry and marries a modest Ministry of Education clerk. She is unhappy: she dreams of luxury, elegant dresses and admiration, and suffers in her plain home.",
    "Her husband brings an invitation to a Ministry ball. Instead of joy she weeps — she has no dress. He gives her the four hundred francs he had saved to buy a gun, for a dress. Then she is sad again: no jewels. He suggests her friend Madame Forestier, who lends her a superb diamond necklace.",
    "At the ball Mathilde is the sensation — the prettiest woman there, dancing with delight. They leave at 4 a.m.; she hurries away in her modest wrap, ashamed next to the rich women in furs.",
    "At home she discovers the necklace is LOST. They search, retrace the route, and fail. In a shop they find an identical diamond necklace priced at 40,000 francs. Loisel uses his inheritance of 18,000 and borrows the rest at ruinous rates; they return the new necklace to Forestier, who does not open the case.",
    "Then come ten years of crushing poverty: Mathilde dismisses the maid, moves to a garret, does the heavy housework, haggles at shops; her husband works evenings and nights copying accounts. The debt is paid — and Mathilde is now a hard, rough, old-looking woman.",
    "One day she meets Madame Forestier, still young and beautiful, and proudly tells her the truth: the lost necklace was replaced at a cost of ten years. Forestier is stunned: 'Oh, my poor Mathilde! But mine was imitation. It was worth at most five hundred francs!'",
  ],
  characters: [
    { n: "Mathilde Loisel", d: "beautiful, vain, dreamy; her pride and love of show destroy ten years of her life." },
    { n: "M. Loisel", d: "simple, devoted husband who sacrifices everything to pay her debt." },
    { n: "Madame Forestier", d: "rich friend; her imitation necklace is the story's final irony." },
  ],
  themes: [
    "Vanity and false pride cost more than they give.",
    "Appearance vs reality: a fake necklace ruins real lives.",
    "Honesty in paying the debt — but the debt itself was born of pretence.",
  ],
  extracts: [
    { line: "She suffered ceaselessly, feeling herself born for all delicacies and luxuries.", meaning: "The root of the tragedy — Mathilde's belief that she DESERVED luxury made ordinary life a torture." },
    { line: "Oh, my poor Mathilde! But mine was imitation.", meaning: "The thunderbolt ending: ten years of suffering for a five-hundred-franc fake." },
  ],
  qa: [
    { q: "Why was Mathilde unhappy at the start?", a: "Though pretty, she was born in a clerk's family with no dowry; she felt made for luxury and admiration, and her modest home and dress felt like an injustice.", marks: 2, kind: "short" },
    { q: "How much did the replacement necklace cost, and how was it paid?", a: "40,000 francs. Loisel contributed his 18,000-franc inheritance and borrowed the rest at ruinous interest; they repaid it over ten years of hard labour.", marks: 4, kind: "short" },
    { q: "What is the irony at the end?", a: "The Loisels ruined themselves for ten years replacing a 'diamond' necklace that was only paste — worth at most 500 francs. Their suffering was for an imitation.", marks: 2, kind: "short" },
    { q: "Who is more to blame for the tragedy — Mathilde or fate? Discuss.", a: "Fate lost the necklace, but Mathilde's character built the trap: her vanity demanded the dress and jewels; her pride made her hide the loss instead of confessing; her fear of looking poor chose ruinous silence over honesty. Maupassant shows that a small flaw — love of appearances — can cost a whole life. Yet the story also honours the Loisels' honesty in repaying every franc. Verdict: the tragedy is character-driven; the imitation necklace merely exposes what vanity had already decided.", marks: 6, kind: "long" },
  ],
},

/* ---------- FWF 8 : BHOLI ---------- */
{
  key: "english-2-7", book: "Footprints", num: 8, title: "Bholi", author: "K.A. Abbas",
  summary: [
    "Bholi (Sulekha) is the fourth daughter of Ramlal, the numberdar. A fall in infancy damaged her brain; smallpox scarred her face; she stammers and is slow — the family and village treat her as a dull, marriageless burden.",
    "When the tehsildar opens a new primary school in the village and asks that children be sent, Ramlal's wife fears school will ruin a girl's marriage prospects — but they send Bholi, because for her there is no prospect anyway.",
    "Bholi is terrified — she thinks she is being thrown out of the house. But the school and her teacher change everything: the kind teacher coaxes her to say her own name, gives her a picture book, and promises, 'you will be able to speak like everyone else... and no one will ever dare to laugh at you'. For the first time Bholi feels respect and hope.",
    "Years pass; Bholi blossoms. Now a match comes: Bishamber Nath, a well-to-do grocer from another village, agrees to marry her without dowry. At the wedding, however, he sees her pock-marked face and demands five thousand rupees, else he will not take her. Ramlal, shamed, pays the money.",
    "But Bholi, now educated and self-respecting, refuses to marry the 'greedy coward'. She throws away the wedding garland and declares she will not go to a house where she is only an insult; instead she will serve her parents in their old age and teach in the same school that transformed her. The teacher smiles with pride: the girl everyone called a dumb cow has become a person.",
  ],
  characters: [
    { n: "Bholi (Sulekha)", d: "from a mocked, stammering child to a confident woman; education gives her a voice and self-respect." },
    { n: "The teacher", d: "the true heroine; her kindness and belief rebuild Bholi." },
    { n: "Ramlal", d: "the father who values reputation over his daughter; pays dowry out of shame." },
    { n: "Bishamber Nath", d: "the greedy groom who prices a human being by her face." },
  ],
  themes: [
    "Education empowers — especially girls society writes off.",
    "Dowry and the pricing of brides are evil; self-respect beats a shameful marriage.",
    "A teacher's love can rewrite a child's destiny.",
  ],
  extracts: [
    { line: "Bholi had a feeling that she was being taken to a place worse than her home.", meaning: "Shows how little love she had at home — even an unknown school seemed a punishment." },
  ],
  qa: [
    { q: "Why was Bholi sent to school?", a: "The family saw no marriage prospect for her because of her looks and stammer, so when the tehsildar asked for children at the new school, they sent Bholi — the daughter they cared least about.", marks: 2, kind: "short" },
    { q: "How did the teacher change Bholi?", a: "With kindness: coaxing her to speak her name, giving her a picture book, promising she would speak freely and read like anyone. That first respect built Bholi's confidence, which grew into strength.", marks: 4, kind: "short" },
    { q: "Why did Bholi refuse the marriage?", a: "Bishamber demanded five thousand rupees after seeing her face, treating her as damaged goods. The educated Bholi would not marry a greedy man or enter a house of insult; she chose self-respect and a life of service and teaching.", marks: 4, kind: "short" },
    { q: "How does Bholi show that education is the real empowerment of a girl?", a: "Before school Bholi had no voice — she stammered, feared everyone and accepted being a burden. Education gave her three things: confidence to speak, understanding of her own worth, and the courage to say NO to a dowry marriage that her father had accepted in shame. She converts her life from 'marriageable or not' to 'useful and respected' — serving parents and teaching children. The story's message is exact: the same society that called her a dumb cow had created her weakness; one teacher's belief removed it. Empowerment, therefore, was not given by marriage or money but by the school.", marks: 6, kind: "long" },
  ],
},

];

/* ==================== GRAMMAR CRASH ==================== */

export const EN_BP_GRAMMAR = {
  modals: [
    "can / could — ability: 'She can speak French.' / past: 'He could run fast.'",
    "may / might — permission & possibility: 'May I come in?' 'It may rain.'",
    "must / have to — strong obligation: 'You must wear a helmet.'",
    "should / ought to — advice: 'You should see a doctor.'",
    "will / would — future & polite request: 'Would you help me?'",
    "Past form in reported style: can→could, will→would, may→might, must→had to.",
  ],
  speech: [
    "Say/tell: He said TO me → He told me. Remove 'that' or keep it; drop the comma and quotes.",
    "Tense backshift (when reporting verb is past): is/am→was, are→were, was→had been, has→had, will→would, can→could, today→that day, tomorrow→the next day, yesterday→the previous day, here→there, now→then.",
    "Questions: reporting verb becomes asked/wondered; use if/whether for yes-no; keep question word for wh-; change to statement order (NO inversion): He asked me where I lived.",
    "Commands: ordered / advised / requested + to + verb: She told him to wait. Negative: not to.",
    "Exclamations: exclaimed with joy/sorrow; pray → prayed that...",
  ],
  editing: [
    "Read the whole line first; the error is usually ONE word (wrong tense, article, preposition, subject-verb agreement).",
    "Common pairs: a/an (vowel SOUND), the (specific), since/for, was/were, does/do, has/have.",
    "Write in the answer format given: word + correction + reason-ready (e.g. 'is → was').",
  ],
  prepositions: [
    "good AT maths; married TO; die OF a disease; die FROM an accident; fond OF; tired OF; angry WITH a person, AT a thing; arrive AT a place, IN a city; different FROM; prefer TO; listen TO; wait FOR; agree WITH a person, TO a proposal; interested IN.",
  ],
};

export const EN_BP_WRITING = {
  letter: [
    "Sender's address (2-3 lines, no name) → Date → Receiver's designation & address → Subject (one line, underline) → Salutation (Sir/Madam) → Body: para 1 purpose, para 2 details, para 3 expected action → Complimentary close (Yours faithfully/truly) → Signature + name.",
    "Formal tone: no contractions, no slang. Keep to 120-150 words. Subject must match the body exactly.",
  ],
  analytical: [
    "Format: Title (optional) → single paragraph of ~120 words.",
    "Structure: 1) Topic sentence naming what is analysed (chart/graph/passage). 2) Overall trend in one line. 3) Key figures/comparisons with data (highest, lowest, rise, fall). 4) Concluding line: inference or suggestion.",
    "Use linking words: whereas, while, in contrast, however, overall, notably. Quote exact numbers.",
  ],
  strategy: [
    "3 hours / 80 marks: Reading 40 min, Writing 25 min, Grammar 15 min, Literature 90 min, 10 min review.",
    "Literature answers: first line = direct answer; then 2-4 points; last line = theme/value. Underline key words.",
    "Extracts: answer IN the words of the passage when asked; figure-of-speech questions — look for simile/metaphor/alliteration/personification.",
    "Never leave a question blank; a half-right attempt beats a blank.",
  ],
};
