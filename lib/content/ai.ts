/* AI — KIPS "AI Book 10" (CBSE 417, new edition). Part A: Employability Skills (12 chapters).
   Keys: ai-0-x (Unit 1), ai-1-x (Unit 2), ai-2-x (Unit 3), ai-3-x (Unit 4), ai-4-x (Unit 5).
   Part B content comes in ai-partb.ts. */
import type { ChapterDetail } from "./types";

export const AI: Record<string, ChapterDetail> = {

/* ============ PART A • UNIT 1 — COMMUNICATION SKILLS-II ============ */

"ai-0-0": {
  slides: [
    { kicker: "KIPS • Ch 1", title: "Methods of Communication",
      points: ["Communication = sharing information, ideas and feelings so the receiver understands exactly what the sender means", "It is a TWO-way process: sending + receiving + feedback", "Good communication avoids confusion, saves time and builds relationships"], formula: "Sender → Message → Receiver (+ Feedback)" },
    { kicker: "Verbal", title: "Verbal Communication",
      points: ["Uses words — spoken OR written", "Interpersonal: face-to-face talks, phone calls, video calls", "Written: letters, e-mails, reports, notes, messages", "Public speech, presentations and group discussions are also verbal"], formula: "Verbal = words (spoken or written)" },
    { kicker: "Non-verbal", title: "Non-verbal Communication",
      points: ["Messages WITHOUT words: facial expressions, eye contact, gestures, posture, body language", "Paralanguage: tone, pitch, volume, pauses — HOW you say it", "Appearance and dress also communicate", "Non-verbal often carries more meaning than words"], formula: "Actions & expressions speak louder" },
    { kicker: "Visual + Formality", title: "Visual, Formal and Informal",
      points: ["Visual: pictures, charts, maps, signs, symbols, posters, emojis", "Formal communication: official channels — reports, notices, meetings (organised, recorded)", "Informal: casual talks between friends/colleagues — grapevine at workplaces", "Choose the method by audience, purpose and urgency"], formula: "Pick the right channel for the message" },
  ],
  mindmap: { central: "Methods of Communication",
    branches: [
      { label: "Verbal", color: "#1a73e8", children: ["Interpersonal (spoken)", "Public speech", "Written: e-mail, letters", "Group discussion"] },
      { label: "Non-verbal", color: "#e37400", children: ["Facial expressions", "Gestures & posture", "Eye contact", "Paralanguage: tone, pitch"] },
      { label: "Visual", color: "#146c2e", children: ["Pictures & charts", "Signs & symbols", "Posters, emojis"] },
      { label: "By formality", color: "#9334e6", children: ["Formal: official", "Informal: grapevine"] },
    ] },
  notes: [
    "Communication is complete ONLY when the receiver understands the message as the sender intended — <b>feedback confirms this</b>.",
    "<b>Interpersonal communication</b> happens between two people or in a small group (chat, call, meeting).",
    "<b>Paralanguage</b> = tone, pitch, loudness, speed — the same sentence can sound polite or rude depending on tone.",
    "Visual communication works fastest — a <b>traffic signal or warning sign</b> is understood in seconds without words.",
    "In offices, formal communication follows the <b>official chain</b>; the informal 'grapevine' spreads fast but can distort facts.",
  ],
  quiz: [
    { q: "Which of these is NON-verbal communication?", options: ["A phone call", "A smile and a thumbs-up", "An e-mail", "A speech"], answer: 1, why: "Smiles and gestures carry meaning without words — non-verbal." },
    { q: "Tone, pitch and pauses while speaking are called:", options: ["Verbal cues", "Paralanguage", "Visual aids", "Feedback"], answer: 1, why: "Paralanguage is HOW something is said, not the words themselves." },
    { q: "Official reports and notices are examples of:", options: ["Informal communication", "Formal communication", "Grapevine", "Non-verbal communication"], answer: 1, why: "Formal communication flows through official channels and is recorded." },
  ],
  pyq: [
    "What is communication? Why is it called a two-way process? (CBSE 417 pattern, 2m)",
    "Explain verbal, non-verbal and visual communication with one example each. (3m)",
    "Differentiate between formal and informal communication. (2m)",
  ],
},

"ai-0-1": {
  slides: [
    { kicker: "KIPS • Ch 2", title: "Communication Cycle",
      points: ["The journey of a message from sender to receiver and back through feedback", "Seven elements: sender → ideas → encoding → message/channel → receiver → decoding → feedback", "Noise at ANY stage can distort the message"], formula: "Sender → Encode → Channel → Decode → Receiver → Feedback" },
    { kicker: "Elements", title: "The Seven Building Blocks",
      points: ["Sender: the person who starts the message with an idea", "Encoding: converting the idea into words/symbols/gestures", "Channel/medium: speech, letter, phone, e-mail", "Receiver: the person who gets the message; decoding = extracting meaning", "Feedback: the receiver's response — completes the cycle"], formula: "No feedback = incomplete communication" },
    { kicker: "Feedback", title: "Feedback Makes It a Cycle",
      points: ["Feedback tells the sender whether the message was understood correctly", "Positive feedback: nods, 'yes sir', quick accurate action", "Constructive feedback: points out gaps politely with suggestions to improve", "A good receiver listens actively: attention, eye contact, no interruption"], formula: "Listen → understand → respond" },
    { kicker: "Importance", title: "Why the Cycle Matters",
      points: ["A clear cycle removes confusion and repeats of work", "Feedback helps teachers grade, coaches guide and teams improve", "In AI projects, feedback (like evaluation results) improves the model too!"], formula: "Every improvement loop needs feedback" },
  ],
  flowchart: [
    { title: "Sender has an idea", desc: "the message to be shared is formed" },
    { title: "Encoding", desc: "idea → words / symbols / gestures" },
    { title: "Channel", desc: "speech, phone, e-mail, letter carries it" },
    { title: "Receiver decodes", desc: "extracts the meaning", type: "decision" },
    { title: "Feedback", desc: "response goes back — cycle complete", type: "result" },
  ],
  notes: [
    "<b>Encoding</b> happens at the sender's side; <b>decoding</b> at the receiver's — a mismatch between them causes misunderstanding.",
    "The channel must suit the message: urgent = call; detailed = e-mail/letter.",
    "Feedback should be <b>specific, timely and respectful</b> — 'good job' is weak, 'your chart's title made it clear' is strong.",
    "Noise is not always sound — <b>poor signal, bad handwriting, distraction</b> are all noise in the cycle.",
    "Remember the chain: <b>Idea → Encode → Transmit → Receive → Decode → Respond</b>.",
  ],
  quiz: [
    { q: "In the communication cycle, converting an idea into words is:", options: ["Decoding", "Encoding", "Feedback", "Noise"], answer: 1, why: "Encoding prepares the idea for transmission; decoding happens at the receiver's end." },
    { q: "Which element completes the communication cycle?", options: ["Channel", "Sender", "Feedback", "Message"], answer: 2, why: "Feedback returns the response to the sender, closing the loop." },
    { q: "A phone with poor signal is an example of:", options: ["Encoding error", "Noise in the channel", "Decoding failure", "Feedback"], answer: 1, why: "Noise is any disturbance that distorts the message on its way." },
  ],
  pyq: [
    "Draw/explain the communication cycle with all its elements. (3m)",
    "What is feedback? Why is it important in effective learning? (2m)",
    "Explain encoding and decoding with an example. (2m)",
  ],
},

"ai-0-2": {
  slides: [
    { kicker: "KIPS • Ch 3", title: "Effective Communication",
      points: ["Effective communication = the receiver understands the message EXACTLY as the sender intended", "The 7 Cs checklist: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous", "It saves time, prevents mistakes and builds trust"], formula: "7 Cs = Clear • Concise • Concrete • Correct • Coherent • Complete • Courteous" },
    { kicker: "7 Cs — I", title: "Clear, Concise, Concrete",
      points: ["Clear: simple words, short sentences, one idea at a time", "Concrete: specific facts and details — 'report by 4 PM Friday', not 'soon'", "Concise: say it in the fewest words needed — no repetition, no filler"], formula: "Say what you mean, briefly" },
    { kicker: "7 Cs — II", title: "Correct, Coherent, Complete, Courteous",
      points: ["Correct: right facts, right grammar, right names and spelling", "Coherent: logical flow — points connected in sequence", "Complete: answers every question the receiver may have (5 Ws: who, what, when, where, why)", "Courteous: respectful tone — 'please', 'thank you', no slang or insults"], formula: "Facts + logic + respect" },
    { kicker: "Practice", title: "Writing and Speaking Well",
      points: ["Plan first: purpose, audience, key message", "Use active voice: 'Ravi sent the file' beats 'The file was sent by Ravi'", "Check before sending: spelling, tone, attachments", "Listen actively while others speak — communication is two-way"], formula: "Think → Plan → Write → Check → Send" },
  ],
  mindmap: { central: "Effective Communication: 7 Cs",
    branches: [
      { label: "Clarity", color: "#1a73e8", children: ["Simple words", "Short sentences"] },
      { label: "Content", color: "#146c2e", children: ["Concrete: specific", "Correct: accurate", "Complete: 5 Ws"] },
      { label: "Structure", color: "#e37400", children: ["Concise: brief", "Coherent: logical flow"] },
      { label: "Tone", color: "#9334e6", children: ["Courteous: respectful", "Active voice"] },
    ] },
  notes: [
    "A <b>complete</b> message answers the questions the receiver might have — think from the reader's side.",
    "A <b>concise</b> message respects the reader's time: no repetition, no unnecessary details.",
    "<b>Courteous</b> messages consider the receiver's feelings, age and knowledge — respect earns respect.",
    "Write dates, numbers and names in <b>concrete</b> form: 'submit by 5 PM, 20 March' is always better than 'submit soon'.",
    "Before sending any message, do the 7-Cs <b>checklist scan</b> once — it takes 10 seconds and prevents mistakes.",
  ],
  quiz: [
    { q: "'Submit the report by 4 PM on Friday' is an example of which C?", options: ["Courteous", "Concrete", "Coherent", "Concise"], answer: 1, why: "Concrete messages give specific, measurable details instead of vague words." },
    { q: "Which C means using the fewest words necessary?", options: ["Clear", "Complete", "Concise", "Correct"], answer: 2, why: "Concise = brief and to the point, with no repetition." },
    { q: "A message that answers all the receiver's questions is:", options: ["Coherent", "Complete", "Concrete", "Courteous"], answer: 1, why: "Complete messages have all the information the receiver needs." },
  ],
  pyq: [
    "List and explain any four Cs of effective communication. (4m)",
    "What is the difference between concrete and concise communication? (2m)",
    "Rewrite in a courteous and complete way: 'send notes fast'. (2m)",
  ],
},

"ai-0-3": {
  slides: [
    { kicker: "KIPS • Ch 4", title: "Communication Barriers",
      points: ["A barrier is anything that blocks or distorts the message between sender and receiver", "Barriers cause misunderstanding, mistakes, delay and conflict", "Removing barriers = effective communication"], formula: "Barrier = noise anywhere in the cycle" },
    { kicker: "Types — I", title: "Physical & Language Barriers",
      points: ["Physical: noise, distance, poor signal, bad phone line, power cut", "Language (semantic): difficult words, jargon, different languages, unclear pronunciation", "Bad handwriting and poor spelling also act as language barriers"], formula: "Can't hear / can't understand = message lost" },
    { kicker: "Types — II", title: "Organisational, Cultural & Interpersonal",
      points: ["Organisational: long chains of command, too many layers, rigid rules", "Cultural: different customs, taboos, gestures that mean different things", "Interpersonal (emotional): anger, fear, mistrust, lack of attention, prejudgement", "Gender and generation gaps can also block understanding"], formula: "Feelings filter everything we hear" },
    { kicker: "Measures", title: "Overcoming Barriers",
      points: ["Use simple, clear language — avoid jargon", "Choose the right time and place; reduce noise", "Listen actively; ask questions; paraphrase to confirm", "Respect cultures and emotions; give and take feedback honestly"], formula: "Simplify → clarify → confirm" },
  ],
  mindmap: { central: "Communication Barriers",
    branches: [
      { label: "Physical", color: "#1a73e8", children: ["Noise", "Distance", "Poor signal"] },
      { label: "Language", color: "#e37400", children: ["Jargon", "Different languages", "Unclear speech"] },
      { label: "Organisational", color: "#146c2e", children: ["Long chains", "Rigid rules"] },
      { label: "Emotional/cultural", color: "#c5221f", children: ["Anger, fear, mistrust", "Customs & taboos", "Poor listening"] },
      { label: "Solutions", color: "#9334e6", children: ["Simple words", "Right time & place", "Active listening", "Feedback"] },
    ] },
  notes: [
    "<b>Semantic barrier</b> = words themselves cause confusion (jargon, technical terms, new vocabulary).",
    "Emotional barriers are the trickiest — an <b>angry receiver hears criticism</b> even in helpful feedback.",
    "The grapevine (rumours) is an organisational barrier — <b>verify before forwarding</b>.",
    "Cultural barrier example: a thumbs-up is positive in India but offensive in some countries.",
    "Best habit: <b>paraphrase</b> — 'So you mean the file is due Friday?' — it catches misunderstandings instantly.",
  ],
  quiz: [
    { q: "Using difficult technical jargon with a beginner is which barrier?", options: ["Physical", "Language/semantic", "Organisational", "Emotional"], answer: 1, why: "The words themselves block understanding — a semantic barrier." },
    { q: "A message passes through 6 levels of managers and gets distorted. This is:", options: ["Cultural barrier", "Physical barrier", "Organisational barrier", "Interpersonal barrier"], answer: 2, why: "Long official chains distort messages — an organisational barrier." },
    { q: "The BEST first step to overcome language barriers:", options: ["Speak louder", "Use simple words", "Send more messages", "Avoid communicating"], answer: 1, why: "Simple, familiar words reach every audience." },
  ],
  pyq: [
    "What are communication barriers? Name any four types. (4m)",
    "Explain physical and emotional barriers with examples. (3m)",
    "Suggest any three measures to overcome communication barriers. (3m)",
  ],
},

"ai-0-4": {
  slides: [
    { kicker: "KIPS • Ch 5", title: "Basic Writing Skills",
      points: ["Good writing = correct grammar + clear sentences + logical order", "Words build sentences; sentences build paragraphs; paragraphs build letters and reports", "The 7 Cs apply to writing too!"], formula: "Word → Sentence → Paragraph → Document" },
    { kicker: "Parts of Speech", title: "The Eight Building Blocks of Words",
      points: ["Noun (name): Ravi, school • Pronoun (replaces noun): he, they", "Verb (action): run, is • Adjective (describes noun): cold, happy", "Adverb (describes verb): slowly, very • Preposition (relation): in, on, under", "Conjunction (joins): and, but • Interjection (feeling): Oh! Wow!"], formula: "N-P-V-A-A-P-C-I = 8 parts of speech" },
    { kicker: "Sentences", title: "Building Correct Sentences",
      points: ["A sentence needs a subject + verb + complete sense", "Types by function: assertive (statement), interrogative (question), imperative (command), exclamatory (feeling!)", "Limit content per sentence; arrange in proper sequence; design to emphasise the topic", "Paragraphs: one main idea, supporting details, logical connectors (first, then, however)"], formula: "Subject + Verb = complete thought" },
    { kicker: "Formats", title: "Writing E-mails and Notes",
      points: ["E-mail: clear subject line, greeting, short body, courteous close, correct recipient", "Note/notice: who, what, when, where, why — complete and brief", "Always check spelling and grammar before sending", "Formal writing avoids slang and short forms (u, plz, asap → spell it out)"], formula: "Subject + Greeting + Body + Closing" },
  ],
  mindmap: { central: "Basic Writing Skills",
    branches: [
      { label: "Parts of speech", color: "#1a73e8", children: ["Noun, pronoun", "Verb, adverb", "Adjective", "Preposition, conjunction, interjection"] },
      { label: "Sentence", color: "#e37400", children: ["Subject + verb", "Assertive, interrogative", "Imperative, exclamatory"] },
      { label: "Paragraph", color: "#146c2e", children: ["One main idea", "Supporting details", "Connectors: first, then"] },
      { label: "Documents", color: "#9334e6", children: ["E-mail format", "Notices & notes", "Spelling & grammar check"] },
    ] },
  notes: [
    "<b>Adjective</b> describes a noun (cold weather); <b>adverb</b> describes a verb (walking slowly).",
    "A <b>complete sentence</b> makes sense on its own — 'on the table' is NOT a sentence.",
    "Limit sentence content: <b>one idea per sentence</b> keeps writing readable.",
    "In formal writing, avoid chat spellings — write <b>'please'</b>, not 'plz'.",
    "Sequence sentences so the reader flows: <b>first… next… finally…</b>",
  ],
  quiz: [
    { q: "Identify the adverb: 'She quickly finished the easy task.'", options: ["She", "quickly", "finished", "easy"], answer: 1, why: "'Quickly' tells HOW the action (finished) was done — an adverb; 'easy' is the adjective." },
    { q: "'What time is it?' is which type of sentence?", options: ["Assertive", "Interrogative", "Imperative", "Exclamatory"], answer: 1, why: "It asks a question — interrogative." },
    { q: "Which word is a preposition?", options: ["Run", "Under", "Happy", "And"], answer: 1, why: "'Under' shows the relation of a noun to another word — a preposition." },
  ],
  pyq: [
    "Name the eight parts of speech with one example each. (4m)",
    "What are the four types of sentences by function? Give examples. (4m)",
    "Write the correct format of a formal e-mail. (3m)",
  ],
},

/* ============ PART A • UNIT 2 — SELF-MANAGEMENT SKILLS-II ============ */

"ai-1-0": {
  slides: [
    { kicker: "KIPS • Ch 6", title: "Stress Management and its Techniques",
      points: ["Stress = the body's response to pressure or challenge; it affects body, mind and behaviour", "Eustress = positive stress (exam prep energy); Distress = negative stress (anxiety, illness)", "Stress is normal — unmanaged stress is the problem"], formula: "Eustress = good • Distress = harmful" },
    { kicker: "Causes", title: "Where Does Stress Come From?",
      points: ["Physical: poor sleep, illness, bad diet, no exercise", "Mental: exam fear, deadline pressure, overload", "Social: peer pressure, conflicts, bullying, comparison", "Environmental: noise, crowding, family or money problems"], formula: "Body + mind + environment" },
    { kicker: "Effects", title: "What Stress Does to You",
      points: ["Physical: headache, tiredness, stomach problems, high BP", "Emotional: irritability, anxiety, sadness, anger", "Behavioural: poor concentration, sleep problems, avoiding people, over/under-eating", "Long-term distress weakens immunity and memory"], formula: "Stress shows in body, mood and marks" },
    { kicker: "Techniques", title: "Managing Stress the Smart Way",
      points: ["Physical activity: exercise, yoga, sports, deep breathing (pranayama)", "Sleep 7–8 hours + balanced diet + hydration", "Organise: to-do lists, realistic goals, time management", "Talk it out: family, friends, teachers, counsellor; take breaks; enjoy hobbies; stay positive"], formula: "Move + Sleep + Plan + Talk" },
  ],
  mindmap: { central: "Stress Management",
    branches: [
      { label: "Types", color: "#1a73e8", children: ["Eustress: positive", "Distress: negative"] },
      { label: "Causes", color: "#e37400", children: ["Physical: sleep, diet", "Mental: exams", "Social: peer pressure", "Environmental"] },
      { label: "Effects", color: "#c5221f", children: ["Headache, BP", "Anxiety, anger", "Poor focus"] },
      { label: "Techniques", color: "#146c2e", children: ["Exercise & yoga", "Sleep 7–8 hrs", "To-do lists", "Talk & hobbies"] },
    ] },
  flowchart: [
    { title: "Stressor appears", desc: "exam, deadline, conflict" },
    { title: "Body reacts", desc: "tension, racing thoughts, worry" },
    { title: "Choose response", desc: "manage it OR let it pile up", type: "decision" },
    { title: "Manage: breathe, move, plan, talk", desc: "stress stays at helpful levels", type: "result" },
  ],
  notes: [
    "<b>Eustress</b> pushes you to perform (the excitement before a match); <b>distress</b> harms performance and health.",
    "The three stress responses: <b>physical, emotional, behavioural</b> — learn one example of each.",
    "Exercise burns stress hormones and releases <b>endorphins</b> — nature's mood lifter.",
    "<b>Time management</b> is prevention: a planned day produces fewer surprises and less panic.",
    "Sharing a problem with a trusted person <b>halves</b> it — never hesitate to ask for help.",
  ],
  quiz: [
    { q: "Positive stress that improves performance is called:", options: ["Distress", "Eustress", "Depression", "Burnout"], answer: 1, why: "Eustress energises; distress damages." },
    { q: "Which is a BEHAVIOURAL effect of stress?", options: ["High BP", "Headache", "Avoiding friends", "Weight of books"], answer: 2, why: "Avoiding people is a change in behaviour; BP and headache are physical." },
    { q: "The healthiest first response to exam stress:", options: ["Skip meals and study more", "Deep breathing + a study plan", "Compare with toppers", "Stay up all night"], answer: 1, why: "Breathing calms the mind; planning removes the cause." },
  ],
  pyq: [
    "Differentiate between eustress and distress with examples. (2m)",
    "Explain any four stress management techniques. (4m)",
    "List the physical, emotional and behavioural effects of stress. (3m)",
  ],
},

"ai-1-1": {
  slides: [
    { kicker: "KIPS • Ch 7", title: "Ability to Work Independently",
      points: ["Independent working = completing tasks on your own — planning, doing and checking without constant supervision", "It builds confidence, responsibility and trust — qualities every employer values", "Steps: understand the task → plan → execute → review → deliver"], formula: "Plan → Do → Check → Deliver" },
    { kicker: "Self-awareness", title: "Know Yourself First",
      points: ["Self-awareness: knowing your strengths, weaknesses, emotions and habits", "SWOT yourself: Strengths, Weaknesses, Opportunities, Threats", "Strengths + interests → choose the right tasks and career", "Honest self-review after every task turns weaknesses into lessons"], formula: "SWOT: Strengths • Weaknesses • Opportunities • Threats" },
    { kicker: "Goals", title: "Goal Setting (SMART)",
      points: ["SMART goals: Specific, Measurable, Achievable, Realistic, Time-bound", "Break big goals into small daily targets", "Write goals down and track progress", "Self-regulation: control reactions — delay, distractions, frustration"], formula: "SMART = Specific Measurable Achievable Realistic Time-bound" },
    { kicker: "Time", title: "Time Management",
      points: ["Prioritise: important & urgent first (Eisenhower matrix)", "Make a daily to-do list; set deadlines for yourself", "Beat procrastination: the 5-minute start rule; remove distractions (phone!)", "Take short breaks (Pomodoro: 25 min work + 5 min break)"], formula: "Important+Urgent first" },
  ],
  mindmap: { central: "Working Independently",
    branches: [
      { label: "Self-awareness", color: "#1a73e8", children: ["Strengths & weaknesses", "SWOT analysis", "Honest self-review"] },
      { label: "Goal setting", color: "#e37400", children: ["SMART goals", "Small daily targets", "Track progress"] },
      { label: "Self-regulation", color: "#c5221f", children: ["Control emotions", "Fight distraction", "Stay motivated"] },
      { label: "Time management", color: "#146c2e", children: ["To-do list", "Priorities", "Pomodoro breaks", "No procrastination"] },
    ] },
  notes: [
    "<b>Self-awareness</b> is the foundation — you can only improve what you can see.",
    "SMART example: 'Finish Chapter 3 exercises by Sunday 6 PM' — not 'study sometime'.",
    "The <b>priority matrix</b>: do urgent+important now; plan important; delegate/reduce the rest.",
    "Self-motivation tips: reward small wins, remember your WHY, keep good company.",
    "Independent ≠ alone — <b>know when to ask for help</b>; that is wisdom, not weakness.",
  ],
  quiz: [
    { q: "In SMART goals, the 'M' stands for:", options: ["Motivation", "Measurable", "Modern", "Multiple"], answer: 1, why: "A goal must be measurable so progress can be tracked." },
    { q: "The first step to improving yourself is:", options: ["Goal setting", "Self-awareness", "Time management", "Multitasking"], answer: 1, why: "You must know your strengths and weaknesses before planning growth." },
    { q: "Which task should you do FIRST?", options: ["Important and urgent", "Urgent but not important", "Important but not urgent", "Neither"], answer: 0, why: "Important + urgent tasks have both value and a deadline — top priority." },
  ],
  pyq: [
    "What is self-awareness? How does SWOT help in personal growth? (3m)",
    "Explain SMART goals with one example. (3m)",
    "Write any three time-management techniques for students. (3m)",
  ],
},

/* ============ PART A • UNIT 3 — ICT SKILLS-II ============ */

"ai-2-0": {
  slides: [
    { kicker: "KIPS • Ch 8", title: "Basic Computer Operations",
      points: ["A computer system = hardware (physical parts) + software (programs)", "Software: system software (OS, drivers) vs application software (browser, Word, games)", "The OS manages hardware, files, memory and runs your programs — Windows, macOS, Linux, Android"], formula: "Hardware + Software = working computer" },
    { kicker: "Start & Shut", title: "Starting and Shutting Down Properly",
      points: ["Start: power button → OS loads (boot) → login screen → desktop", "Desktop: icons, taskbar, start menu, gadgets, wallpaper", "Shut down properly: Start → Power → Shut down (never hold the power button!)", "Improper shutdown can corrupt files and damage the disk"], formula: "Always shut down via the OS" },
    { kicker: "Everyday", title: "Daily Operations You Must Know",
      points: ["Launch and close programs; switch between windows (Alt+Tab)", "Adjust volume, brightness, Wi-Fi; check battery status", "Task Manager (Ctrl+Shift+Esc): see running apps, force-close a stuck app", "Mouse essentials: click, double-click, right-click, drag & drop"], formula: "Ctrl+Shift+Esc = Task Manager" },
    { kicker: "Keyboard", title: "Essential Keyboard Shortcuts",
      points: ["Ctrl+C copy • Ctrl+X cut • Ctrl+V paste • Ctrl+Z undo", "Ctrl+A select all • Ctrl+S save • Ctrl+P print", "Alt+Tab switch windows • Win+D show desktop", "Shortcuts = speed + less mouse strain"], formula: "Ctrl+C/V/X/Z = copy/paste/cut/undo" },
  ],
  mindmap: { central: "Basic Computer Operations",
    branches: [
      { label: "System", color: "#1a73e8", children: ["Hardware + software", "System vs app software", "OS: Windows, Linux, Android"] },
      { label: "Boot & desktop", color: "#e37400", children: ["Power → boot → login", "Icons, taskbar", "Proper shutdown"] },
      { label: "Operations", color: "#146c2e", children: ["Open/close apps", "Alt+Tab switch", "Task Manager"] },
      { label: "Shortcuts", color: "#9334e6", children: ["Ctrl+C/V/X/Z", "Ctrl+S save", "Win+D desktop"] },
    ] },
  notes: [
    "The <b>taskbar</b> shows open apps and the system tray (clock, battery, Wi-Fi, volume).",
    "Use <b>Task Manager</b> when an app freezes: select → End task.",
    "<b>Never remove power mid-work</b> — unsaved data is lost and files can corrupt.",
    "Right-click almost anything to see <b>options</b> (copy, rename, properties).",
    "Ctrl+Z (undo) is the most forgiving shortcut in computing — use it freely.",
  ],
  quiz: [
    { q: "Which is SYSTEM software?", options: ["MS Word", "Web browser", "Windows 11", "Tally"], answer: 2, why: "The operating system manages the hardware — system software." },
    { q: "The shortcut to open Task Manager is:", options: ["Ctrl+Alt+Delete", "Ctrl+Shift+Esc", "Alt+F4", "Win+E"], answer: 1, why: "Ctrl+Shift+Esc opens Task Manager directly." },
    { q: "Holding the power button to switch off is bad because:", options: ["It uses more electricity", "It can corrupt unsaved files", "The mouse stops working", "It deletes the OS"], answer: 1, why: "The OS gets no chance to save and close files safely." },
  ],
  pyq: [
    "Differentiate between system software and application software with examples. (2m)",
    "Why should a computer always be shut down through the OS? (2m)",
    "Write any four keyboard shortcuts and their uses. (4m)",
  ],
},

"ai-2-1": {
  slides: [
    { kicker: "KIPS • Ch 9", title: "Managing Files and Folders",
      points: ["File = a stored document/picture/program; Folder = a container that organises files", "Good structure: meaningful names, folders inside folders (subfolders), one place for each type", "File Explorer (Win+E) shows drives, folders and files"], formula: "Folders organise files like cupboards organise clothes" },
    { kicker: "Operations", title: "The Essential File Operations",
      points: ["Create: right-click → New → Folder/File", "Rename: select → F2 (or right-click → Rename)", "Copy vs Move: copy duplicates (Ctrl+C → Ctrl+V); move relocates (Ctrl+X → Ctrl+V)", "Delete: Delete key → Recycle Bin (restore if needed); Shift+Delete = permanent"], formula: "F2 = rename • Delete = bin" },
    { kicker: "Find", title: "Searching and Viewing",
      points: ["Search box in Explorer: find files by name or type (e.g. *.jpg)", "View modes: large icons, list, details (size, date modified)", "Sort by name, date, type or size", "Wildcards: * (any text), ? (one character)"], formula: "*.jpg = all JPEG images" },
    { kicker: "Pro Tips", title: "Shortcuts and Safety",
      points: ["Create desktop shortcuts to frequently used files/folders", "Compress (zip) big folders to share; extract to unzip", "Back up important files to a pen drive or cloud", "Never save personal files in system folders (Windows, Program Files)"], formula: "Backup today saves tears tomorrow" },
  ],
  mindmap: { central: "Files & Folders",
    branches: [
      { label: "Basics", color: "#1a73e8", children: ["File vs folder", "Subfolders", "File Explorer (Win+E)"] },
      { label: "Operations", color: "#e37400", children: ["Create, rename (F2)", "Copy vs move", "Delete → Recycle Bin"] },
      { label: "Search", color: "#146c2e", children: ["Search by name/type", "Wildcards * and ?", "Sort & view modes"] },
      { label: "Smart habits", color: "#9334e6", children: ["Shortcuts", "Zip to share", "Backups"] },
    ] },
  notes: [
    "<b>Copy</b> keeps the original AND makes a new one; <b>move</b> changes the location.",
    "Deleted files first go to the <b>Recycle Bin</b> — restore is possible until it is emptied.",
    "Use meaningful names: <b>'Science-notes-ch5.pdf'</b> beats 'document1.pdf'.",
    "Extension tells the type: <b>.docx</b> document, <b>.jpg</b> image, <b>.mp4</b> video, <b>.py</b> Python file.",
    "Keep a <b>'Work'</b> folder with subfolders per subject/project — a tidy disk is a fast disk.",
  ],
  quiz: [
    { q: "Which key renames a selected file?", options: ["F1", "F2", "F5", "F8"], answer: 1, why: "Select the file and press F2 to rename." },
    { q: "Ctrl+X then Ctrl+V will:", options: ["Copy the file", "Move the file", "Delete the file", "Compress the file"], answer: 1, why: "Cut + paste relocates the file — a move." },
    { q: "Searching '*.pdf' will show:", options: ["One file named pdf", "All PDF files", "All folders", "Nothing"], answer: 1, why: "* matches any name, so *.pdf = every PDF file." },
  ],
  pyq: [
    "Differentiate between copying and moving a file. (2m)",
    "What is the Recycle Bin? How do you restore a deleted file? (2m)",
    "Explain any four file operations with shortcuts. (4m)",
  ],
},

"ai-2-2": {
  slides: [
    { kicker: "KIPS • Ch 10", title: "Care and Maintenance of a Computer",
      points: ["Care = keeping hardware clean, safe and working long; maintenance = regular check-ups", "A maintained computer runs faster, lasts longer and protects your data", "Three areas: cleaning, power care, safe usage"], formula: "Clean + Stable power + Good habits = long life" },
    { kicker: "Cleaning", title: "Keeping It Clean",
      points: ["Shut down and unplug before cleaning", "Wipe screen with a soft dry microfibre cloth (no water spray directly!)", "Keyboard: gentle brush / compressed air for dust between keys", "Keep vents dust-free — dust causes overheating; use a dust cover when off"], formula: "Soft cloth + gentle brushing" },
    { kicker: "Power", title: "Power Care",
      points: ["Use a UPS (uninterruptible power supply) to survive power cuts safely", "Surge protector guards against voltage spikes", "Avoid extreme heat/cold and direct sunlight; keep the room ventilated", "Battery care: avoid full drains and constant 100% churning; charge in the 20–80% band when possible"], formula: "UPS = safe shutdown + surge shield" },
    { kicker: "Habits", title: "Safe Usage & Ergonomics",
      points: ["Posture: back straight, screen at eye level, wrists flat, feet on floor", "20-20-20 rule: every 20 min, look 20 feet away for 20 seconds", "No food or drinks near the machine; don't block vents; don't move a running laptop roughly", "Update the OS and antivirus regularly; scan pen drives before opening"], formula: "20-20-20 saves your eyes" },
  ],
  mindmap: { central: "Care & Maintenance",
    branches: [
      { label: "Cleaning", color: "#1a73e8", children: ["Microfibre cloth", "Brush the keyboard", "Clear the vents", "Dust cover"] },
      { label: "Power", color: "#e37400", children: ["UPS", "Surge protector", "Avoid heat/sun", "Battery 20–80%"] },
      { label: "Habits", color: "#146c2e", children: ["Ergonomic posture", "20-20-20 rule", "No food/drink", "Update + antivirus"] },
      { label: "Why bother", color: "#9334e6", children: ["Faster machine", "Longer life", "Data safety"] },
    ] },
  notes: [
    "Overheating is the <b>silent killer</b> — keep vents open and fans clean.",
    "A <b>UPS</b> gives 10–20 minutes of power — enough to save work and shut down properly.",
    "Never spray liquid on the screen — <b>damp the cloth slightly</b> instead.",
    "Scan every pen drive for viruses <b>before opening</b> it.",
    "Ergonomics: <b>monitor at eye level, elbows at 90°, feet flat</b> — prevents neck, back and wrist pain.",
  ],
  quiz: [
    { q: "A UPS is used to:", options: ["Clean the screen", "Provide backup power for safe shutdown", "Increase RAM", "Cool the CPU"], answer: 1, why: "It bridges power cuts so you can save and shut down properly." },
    { q: "The 20-20-20 rule protects your:", options: ["Keyboard", "Eyes", "Battery", "Posture"], answer: 1, why: "Every 20 minutes look 20 feet away for 20 seconds to relax eye muscles." },
    { q: "Dust in the computer mainly causes:", options: ["Overheating", "Virus attacks", "Data loss", "Slow internet"], answer: 0, why: "Dust blocks vents and fans trap heat — components overheat." },
  ],
  pyq: [
    "Write any four tips for the physical care of a computer. (4m)",
    "What is a UPS? Why is it important? (2m)",
    "Explain good ergonomic habits while using a computer. (3m)",
  ],
},

/* ============ PART A • UNIT 4 — ENTREPRENEURIAL SKILLS-II ============ */

"ai-3-0": {
  slides: [
    { kicker: "KIPS • Ch 11", title: "Entrepreneur and Entrepreneurship",
      points: ["Entrepreneur: a person who starts a business, takes risks and creates value", "Entrepreneurship: the PROCESS of setting up and running that business", "Entrepreneurs are job creators, innovators and problem-solvers for society"], formula: "Entrepreneur = idea + initiative + risk" },
    { kicker: "Functions", title: "What Does an Entrepreneur Do?",
      points: ["Generates a business idea and makes it work", "Arranges resources: money, material, machines, manpower", "Takes decisions: what, how, how much, where to produce and sell", "Takes risks and manages the business through ups and downs", "Leads the team and connects with customers"], formula: "Plan → Resource → Produce → Market → Manage" },
    { kicker: "Qualities", title: "Qualities of a Successful Entrepreneur",
      points: ["Confidence, patience and persistence; hard-working and self-motivated", "Creative and innovative — sees opportunities in problems", "Decision-making, leadership and communication skills", "Willing to learn from failure; adaptable to change"], formula: "Creativity + courage + consistency" },
    { kicker: "Myths", title: "Myths vs Reality",
      points: ["Myth: entrepreneurs are born, not made → Reality: skills can be learned", "Myth: you need lots of money → Reality: many start small with an idea", "Myth: it's all luck → Reality: planning and persistence matter most", "Entrepreneurship is a respected career path — even as a startup inside a company (intrapreneur)"], formula: "Skills can be learned" },
  ],
  mindmap: { central: "Entrepreneurship",
    branches: [
      { label: "Who", color: "#1a73e8", children: ["Risk taker", "Innovator", "Job creator"] },
      { label: "Functions", color: "#e37400", children: ["Idea generation", "Arrange resources", "Decisions & risk", "Lead the team"] },
      { label: "Qualities", color: "#146c2e", children: ["Confident, patient", "Creative", "Leader & communicator", "Learns from failure"] },
      { label: "Myths", color: "#9334e6", children: ["Not born-only", "Not money-only", "Not luck-only"] },
    ] },
  notes: [
    "Functions to remember: <b>idea, resources, decisions, risk management, leadership</b>.",
    "People admire entrepreneurs as <b>problem solvers</b> — leaders who lead by example.",
    "Famous Indian examples: <b>Dhirubhai Ambani, Kiran Mazumdar-Shaw, Byju Raveendran, Falguni Nayar</b>.",
    "Myth-buster line: entrepreneurship is a <b>learnable skill set</b>, not a birth gift.",
    "An <b>intrapreneur</b> innovates inside an existing company — entrepreneurial spirit without owning a firm.",
  ],
  quiz: [
    { q: "The primary reward-and-risk of an entrepreneur is:", options: ["Fixed salary, no risk", "Profit if the business succeeds, loss if it fails", "Government pension", "No decision making"], answer: 1, why: "Entrepreneurs take calculated risks in exchange for possible profits." },
    { q: "Which is NOT a quality of a good entrepreneur?", options: ["Persistence", "Creativity", "Avoiding all decisions", "Learning from failure"], answer: 2, why: "Entrepreneurs must MAKE decisions — avoiding them kills a business." },
    { q: "Entrepreneurship helps society mainly by:", options: ["Creating jobs and solutions", "Increasing pollution", "Reducing choices", "Avoiding technology"], answer: 0, why: "New businesses create employment, products and services." },
  ],
  pyq: [
    "Who is an entrepreneur? Write any four functions of an entrepreneur. (4m)",
    "Explain any four qualities of a successful entrepreneur. (4m)",
    "Write two myths about entrepreneurship and the reality behind them. (2m)",
  ],
},

/* ============ PART A • UNIT 5 — GREEN SKILLS-II ============ */

"ai-4-0": {
  slides: [
    { kicker: "KIPS • Ch 12", title: "Sustainable Development",
      points: ["Sustainable development = meeting TODAY's needs without destroying tomorrow's resources", "Brundtland definition (1987): development that 'meets the needs of the present without compromising future generations'", "UN's 17 Sustainable Development Goals (SDGs, 2015–2030) guide the world"], formula: "People + Planet + Prosperity" },
    { kicker: "Pillars", title: "The Three Pillars",
      points: ["Economic: jobs, growth, fair income — an economy that lasts", "Environmental: clean air, water, soil; biodiversity; climate care", "Social: education, health, equality, justice for all", "All three must balance — growth at nature's cost is not development"], formula: "Economy + Environment + Society" },
    { kicker: "Challenges", title: "Why Is It Difficult?",
      points: ["Overconsumption and wasteful lifestyles", "Pollution: air, water, soil, plastic", "Deforestation, species loss, climate change", "Poverty and inequality force short-term thinking"], formula: "Consumption > regeneration = crisis" },
    { kicker: "Solutions", title: "Your Role — Think Global, Act Local",
      points: ["Reduce, Reuse, Recycle (3 Rs); refuse single-use plastic", "Save water and electricity; use public transport", "Plant trees; buy local and seasonal products", "Spread awareness — sustainable living is a habit, not a sacrifice"], formula: "3 Rs: Reduce • Reuse • Recycle" },
  ],
  mindmap: { central: "Sustainable Development",
    branches: [
      { label: "Meaning", color: "#146c2e", children: ["Brundtland 1987", "Present + future both win", "17 SDGs"] },
      { label: "3 Pillars", color: "#1a73e8", children: ["Economic", "Environmental", "Social"] },
      { label: "Challenges", color: "#c5221f", children: ["Overconsumption", "Pollution & waste", "Deforestation", "Inequality"] },
      { label: "Action", color: "#e37400", children: ["3 Rs", "Save water & power", "Plant trees", "Public transport"] },
    ] },
  flowchart: [
    { title: "Need arises", desc: "food, energy, products for today" },
    { title: "Choose the path", desc: "consume carelessly OR consume consciously", type: "decision" },
    { title: "Careless path", desc: "resources finish — future generations suffer" },
    { title: "Sustainable path", desc: "reduce, reuse, recycle — resources regenerate", type: "result" },
  ],
  notes: [
    "The aim: balance <b>environmental, social and economic</b> needs for present AND future generations.",
    "Sustainable living means <b>living within environmental limits</b> while ensuring a strong, healthy, just society.",
    "Key SDGs to remember: <b>No Poverty (1), Quality Education (4), Climate Action (13), Life on Land (15)</b>.",
    "A sustainable economy uses science responsibly and promotes <b>good governance</b>.",
    "Your checklist: carry a cloth bag, bottle, and tiffin — <b>refuse, reduce, reuse, recycle</b> daily.",
  ],
  quiz: [
    { q: "Sustainable development means:", options: ["Stopping all development", "Meeting present needs without compromising the future", "Using resources as fast as possible", "Only economic growth"], answer: 1, why: "The Brundtland definition balances today's needs with tomorrow's resources." },
    { q: "Which are the three pillars of sustainability?", options: ["Maths, Science, Arts", "Economic, Environmental, Social", "Reduce, Reuse, Recycle", "Land, Sea, Air"], answer: 1, why: "Economy + environment + society must all be balanced." },
    { q: "The 3 Rs stand for:", options: ["Read, Write, Recite", "Reduce, Reuse, Recycle", "Run, Rest, Repeat", "Rent, Repair, Return"], answer: 1, why: "Reduce consumption, reuse items, recycle materials." },
  ],
  pyq: [
    "Define sustainable development. (1m)",
    "Explain the three pillars of sustainable development. (3m)",
    "Suggest any four actions a student can take for sustainable living. (4m)",
  ],
},

};
