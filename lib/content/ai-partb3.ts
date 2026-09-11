/* AI — KIPS CBSE 417, Part B Units 6–7 (ai-10 NLP, ai-11 Advance Python)
   + Part C Practical Work (ai-12) + Part D Project & Portfolio (ai-13). */
import type { ChapterDetail } from "./types";

export const AI_PARTB3: Record<string, ChapterDetail> = {

/* ===== PART B • UNIT 6 — NATURAL LANGUAGE PROCESSING ===== */

"ai-10-0": {
  slides: [
    { kicker: "Part B • U6", title: "Introduction to NLP",
      points: ["NLP = the AI domain that lets machines understand, interpret and generate human language", "Works on text AND speech (writing + speaking)", "Human language is ambiguous, contextual and creative — that's what makes NLP hard"], formula: "Text/speech → meaning → action" },
    { kicker: "Why Hard", title: "Why Language Is Difficult",
      points: ["Same words, different meanings: 'bank' of a river vs 'bank' account", "Context changes everything: 'cool' (temperature) vs 'cool' (awesome)", "Sarcasm, idioms, humour: 'Great, another Monday!' is not great", "Every language has its own grammar, slang and exceptions"], formula: "Ambiguity + context = challenge" },
    { kicker: "Uses", title: "NLP Around You",
      points: ["Machine translation: Google Translate", "Voice assistants: Alexa, Siri, Google Assistant", "Chatbots: customer support, website helpers", "Sentiment analysis: brand reviews, movie tweets", "Autocorrect, autocomplete, grammar checkers"], formula: "Translate • Assist • Chat • Feel" },
    { kicker: "Revisiting", title: "NLP in the AI Project Cycle",
      points: ["Data for NLP = text corpora (reviews, articles, chats)", "Features = words, tokens, frequencies, phrases", "Models: rule-based grammars → learning-based (classifiers, LLMs)", "Evaluation: accuracy on unseen text, plus human judgement of quality"], formula: "Corpus → features → model → evaluate" },
  ],
  mindmap: { central: "NLP",
    branches: [
      { label: "Definition", color: "#1a73e8", children: ["Understand language", "Generate language", "Text + speech"] },
      { label: "Challenges", color: "#c5221f", children: ["Ambiguity", "Context", "Sarcasm", "Many languages"] },
      { label: "Applications", color: "#146c2e", children: ["Translate", "Alexa/Siri", "Chatbots", "Sentiment"] },
      { label: "Pipeline", color: "#e37400", children: ["Corpus", "Tokens/features", "Model", "Evaluate"] },
    ] },
  notes: [
    "NLP handles <b>both text and speech</b>; speech adds an audio step (speech-to-text first).",
    "Classic exam line: NLP is hard because human language is <b>ambiguous and contextual</b>.",
    "Data for NLP projects is called a <b>corpus</b> (plural: corpora).",
    "ChatGPT-style models are NLP too — <b>large language models (LLMs)</b>.",
  ],
  quiz: [
    { q: "'Bank' meaning different things in different sentences is the problem of:", options: ["Ambiguity", "Tokenisation", "Spam", "Pixels"], answer: 0, why: "One word, multiple meanings — ambiguity is NLP's core challenge." },
    { q: "Alexa responding to 'What's the weather?' uses:", options: ["Computer Vision", "NLP", "Clustering", "Robotics"], answer: 1, why: "Speech in, meaning extracted, answer out — NLP." },
  ],
  pyq: [
    "What is NLP? Why is it considered difficult? (3m)",
    "List any four applications of NLP. (2m)",
  ],
},

"ai-10-1": {
  slides: [
    { kicker: "Part B • U6", title: "Human Languages versus Computer Languages",
      points: ["Human languages: natural, evolved, ambiguous, contextual", "Computer languages: designed, precise, unambiguous, literal", "NLP is the bridge between the two"], formula: "Human: fuzzy • Computer: exact" },
    { kicker: "Differences", title: "Key Differences",
      points: ["Grammar: humans bend rules (poetry, slang); compilers reject one missing semicolon", "Meaning: humans read context and tone; code means exactly what it says", "Evolution: languages grow daily (new words!); code versions are controlled", "Errors: humans understand typos; machines crash on them"], formula: "Context vs literal" },
    { kicker: "Traps", title: "Language Traps for Machines",
      points: ["Multiple meanings: 'I saw her duck' (bird? action?)", "Perfect syntax, no meaning: 'Colourless green ideas sleep furiously'", "Arrangement changes meaning: 'dog bites man' vs 'man bites dog'", "Same sentence, different tone = different message"], formula: "Grammar OK ≠ meaning OK" },
    { kicker: "Bridge", title: "How NLP Bridges the Gap",
      points: ["Normalisation: clean text into standard tokens", "Statistical patterns: learn from millions of sentences how words combine", "Context models (LLMs): attention tracks relationships across the sentence", "Evaluation keeps improving the bridge"], formula: "Normalise → pattern-learn → contextualise" },
  ],
  mindmap: { central: "Human vs Computer Language",
    branches: [
      { label: "Human", color: "#146c2e", children: ["Ambiguous", "Contextual", "Evolves daily", "Bends rules"] },
      { label: "Computer", color: "#1a73e8", children: ["Precise", "Literal", "Versioned", "Errors = crash"] },
      { label: "Traps", color: "#c5221f", children: ["Multiple meanings", "Syntax ≠ sense", "Word order"] },
      { label: "Bridge", color: "#e37400", children: ["Tokenisation", "Statistics", "Context models"] },
    ] },
  notes: [
    "'Colourless green ideas sleep furiously' — <b>grammar perfect, meaning zero</b> (Chomsky's famous example).",
    "'Dog bites man' vs 'man bites dog' — <b>word order changes meaning</b> entirely.",
    "Humans understand <b>80% correct</b> text easily; computers need exact or trained-tolerant input.",
    "The bridge: convert fuzzy human text into <b>numbers models can process</b> (next chapters).",
  ],
  quiz: [
    { q: "'Colourless green ideas sleep furiously' shows:", options: ["Bad grammar", "Grammar OK but no meaning", "Perfect translation", "Compiler error"], answer: 1, why: "Syntax is valid; semantics is nonsense." },
    { q: "Computer languages are:", options: ["Ambiguous", "Contextual", "Precise and literal", "Always spoken"], answer: 2, why: "Code does exactly what it says — no context guessing." },
  ],
  pyq: [
    "Give two differences between human and computer languages. (2m)",
    "Explain with an example why word order matters in NLP. (2m)",
  ],
},

"ai-10-2": {
  slides: [
    { kicker: "Part B • U6", title: "Stages of NLP",
      points: ["NLP pipeline: text normalisation → tokenisation → lemmatisation/stemming → stopword removal → feature extraction (Bag of Words)", "Each stage cleans and converts raw text into model-ready numbers", "Garbage in = garbage out; preparation is 80% of NLP"], formula: "Clean → tokenise → normalise → vectorise" },
    { kicker: "Stage 1", title: "Text Normalisation & Tokenisation",
      points: ["Normalisation: lowercase, remove punctuation/special characters/numbers", "Tokenisation: split text into words (word tokens) or sentences", "'I love AI!' → ['i', 'love', 'ai']", "Tokens are the atoms of NLP"], formula: "Sentence → tokens" },
    { kicker: "Stage 2", title: "Stemming, Lemmatisation, Stopwords",
      points: ["Stemming: chop suffixes crudely (studies → studi)", "Lemmatisation: dictionary-based root (studies → study) — smarter", "Stopwords: high-frequency, low-meaning words (a, an, the, is, of) — removed", "Result: fewer, denser, more meaningful tokens"], formula: "Stem: chop • Lemma: root • Stopwords: out" },
    { kicker: "Stage 3", title: "Bag of Words (BoW)",
      points: ["BoW: count how many times each word appears — ignore order", "Vocabulary = all unique words; each document = a vector of counts", "'I love AI. I love NLP.' → {i:2, love:2, ai:1, nlp:1}", "Simple, effective for text classification — the gateway to TF-IDF"], formula: "Text → word-count vector" },
  ],
  flowchart: [
    { title: "Raw text", desc: "'The cats are running happily!'" },
    { title: "Normalise", desc: "lowercase, strip punctuation" },
    { title: "Tokenise", desc: "['the','cats','are','running','happily']" },
    { title: "Stem/Lemma + stopwords", desc: "['cat','run','happili'] (the, are removed)" },
    { title: "Bag of Words / TF-IDF", desc: "numbers ready for the model", type: "result" },
  ],
  notes: [
    "Order matters: <b>normalise → tokenise → stem/lemma → stopword removal → vectorise</b>.",
    "Stemming can produce non-words ('studi'); <b>lemmatisation gives real roots</b> — know the difference.",
    "Stopwords: <b>is, am, the, a, an, of, in, on</b> — lists exist per language.",
    "BoW loses word order — 'dog bites man' and 'man bites dog' get the same vector (its limitation!).",
  ],
  quiz: [
    { q: "Splitting 'I love AI' into ['i','love','ai'] is:", options: ["Stemming", "Tokenisation", "Lemmatisation", "Parsing"], answer: 1, why: "Tokenisation breaks text into units (tokens)." },
    { q: "Which word is a typical STOPWORD?", options: ["Elephant", "The", "Quantum", "Guitar"], answer: 1, why: "'The' is extremely common but adds little meaning." },
    { q: "'studies' → 'study' (a real dictionary root) is:", options: ["Stemming", "Lemmatisation", "BoW", "TF-IDF"], answer: 1, why: "Lemmatisation maps to actual dictionary words." },
  ],
  pyq: [
    "Explain tokenisation, stemming and lemmatisation with examples. (5m)",
    "What are stopwords? Why are they removed? (2m)",
    "Create a Bag of Words for: 'AI is fun. AI is the future.' (3m)",
  ],
},

"ai-10-3": {
  slides: [
    { kicker: "Part B • U6", title: "TF-IDF — Term Frequency–Inverse Document Frequency",
      points: ["Bag of Words counts words equally — TF-IDF weighs words by IMPORTANCE", "TF: how often a word appears in one document (local popularity)", "IDF: how rare a word is across ALL documents (global uniqueness)", "TF-IDF = TF × IDF: high in this document, rare elsewhere → important!"], formula: "TF-IDF = TF × IDF" },
    { kicker: "TF", title: "Term Frequency",
      points: ["TF = (count of word in document) ÷ (total words in document)", "A word appearing 5 times in a 100-word doc has TF = 0.05", "TF alone can't tell 'the' (useless) from 'photosynthesis' (useful)"], formula: "TF = count(doc)/total words(doc)" },
    { kicker: "IDF", title: "Inverse Document Frequency",
      points: ["IDF = log(N ÷ number of documents containing the word)", "N = total documents in the corpus", "Word in every document → IDF ≈ 0 (not distinctive)", "Word in only 1 of 100 documents → huge IDF (very distinctive)"], formula: "IDF = log(N / docs with word)" },
    { kicker: "Uses", title: "What TF-IDF Is Used For",
      points: ["Search engines: rank pages that contain your rare query words", "Text classification: spam vs ham, topic labelling", "Keyword extraction: pull the most important terms of a document", "Feeds machine learning models with weighted features"], formula: "Rare + frequent-in-doc = keyword" },
  ],
  mindmap: { central: "TF-IDF",
    branches: [
      { label: "TF", color: "#1a73e8", children: ["Word count in ONE doc", "Local popularity"] },
      { label: "IDF", color: "#e37400", children: ["Rarity across corpus", "log(N/df)", "Common word ≈ 0"] },
      { label: "Product", color: "#146c2e", children: ["TF × IDF", "Importance score", "Better than BoW"] },
      { label: "Applications", color: "#9334e6", children: ["Search ranking", "Spam filters", "Keywords"] },
    ] },
  examples: [
    { title: "TF-IDF intuition check",
      steps: ["Corpus: 100 documents", "'cricket' appears in 90 documents → IDF = log(100/90) ≈ 0.05 (low)", "'photosynthesis' appears in 2 documents → IDF = log(100/2) ≈ 1.7 (high)", "If both appear 3 times in YOUR document, 'photosynthesis' gets the higher TF-IDF"],
      answer: "Rare-but-present words dominate the score — that's the point" },
  ],
  notes: [
    "The one-line idea: <b>important = frequent here, rare elsewhere</b>.",
    "'the' appears everywhere → IDF ≈ 0 → <b>TF-IDF ≈ 0</b> — stopwords get neutralised automatically.",
    "TF-IDF still ignores word ORDER — it's a weighting, not understanding.",
    "KIPS book shows TF-IDF via the Bag-of-Words steps — be ready to build a small table by hand.",
  ],
  quiz: [
    { q: "A word that appears in EVERY document gets an IDF that is:", options: ["Very high", "About zero", "Negative", "Exactly 1"], answer: 1, why: "log(N/N) = 0 — no discriminating power." },
    { q: "TF-IDF improves on Bag of Words by:", options: ["Keeping word order", "Weighing words by importance", "Translating languages", "Removing all nouns"], answer: 1, why: "Rare, document-specific words score high; common words fade." },
  ],
  pyq: [
    "Define TF and IDF with formulas. (4m)",
    "Why does 'the' get a low TF-IDF score? (2m)",
  ],
},

"ai-10-4": {
  slides: [
    { kicker: "Part B • U6", title: "Introduction to Sentiment Analysis",
      points: ["Sentiment analysis = detecting the EMOTION/opinion in text (positive, negative, neutral)", "Answers: what do people FEEL about a product, movie, brand or policy?", "A core NLP application used by every major company"], formula: "Text → emotion label" },
    { kicker: "Levels", title: "What Can Be Measured?",
      points: ["Document level: whole review is positive/negative", "Sentence level: which sentence carries the complaint?", "Aspect level: 'great battery, poor camera' — both aspects, different feelings", "Polarity scores: from −1 (very negative) to +1 (very positive)"], formula: "Doc → sentence → aspect" },
    { kicker: "How", title: "How It Works",
      points: ["Rule-based: lists of positive/negative words + rules", "Machine learning: train a classifier on labelled reviews (BoW/TF-IDF features)", "Deep learning/LLMs: capture context, sarcasm better", "Evaluation: accuracy on a test set of labelled opinions"], formula: "Lexicon rules or trained classifier" },
    { kicker: "Uses", title: "Who Uses Sentiment Analysis?",
      points: ["Brands: monitor product reviews and social media mood", "Movies: opening-day tweet sentiment predicts box office", "Politics: public reaction to policies and speeches", "Stocks: news sentiment feeds trading signals"], formula: "Opinion = business intelligence" },
  ],
  mindmap: { central: "Sentiment Analysis",
    branches: [
      { label: "What", color: "#1a73e8", children: ["Positive/negative/neutral", "Polarity −1 to +1"] },
      { label: "Levels", color: "#e37400", children: ["Document", "Sentence", "Aspect"] },
      { label: "How", color: "#146c2e", children: ["Word lists (rule)", "Trained classifier", "LLMs"] },
      { label: "Uses", color: "#9334e6", children: ["Brand monitoring", "Movie buzz", "Politics", "Finance"] },
    ] },
  notes: [
    "Example: 'The phone is fast but the camera is terrible' — <b>aspect-level</b> analysis catches both.",
    "Sarcasm defeats simple tools: <b>'Wow, ANOTHER delay. Amazing!'</b> looks positive to a naive model.",
    "Training data = reviews already labelled (stars → sentiment).",
    "Sentiment is a <b>classification task</b> — evaluation uses the same confusion matrix maths.",
  ],
  quiz: [
    { q: "'Great battery, poor camera' needs which level of analysis?", options: ["Document", "Sentence", "Aspect", "Token"], answer: 2, why: "Different aspects carry opposite sentiments." },
    { q: "Sentiment polarity usually ranges:", options: ["0 to 100", "−1 to +1", "1 to 5", "0 or 255"], answer: 1, why: "−1 most negative, +1 most positive." },
  ],
  pyq: [
    "What is sentiment analysis? Give two real uses. (3m)",
    "Explain aspect-level sentiment with an example. (2m)",
  ],
},

"ai-10-5": {
  slides: [
    { kicker: "Part B • U6", title: "Introduction to Chatbots",
      points: ["Chatbot = a program that converses with humans via text or voice", "Two big families: rule-based and AI-powered", "Used for support, FAQs, bookings, tutoring, companionship"], formula: "Human message → bot reply" },
    { kicker: "Rule-based", title: "Rule-Based Chatbots",
      points: ["Follow a decision tree: pattern matched → fixed answer", "Example: 'fees?' → 'Fees are ₹500, due the 10th'", "Fast, predictable, cheap — but brittle", "Fail on anything outside their rules"], formula: "IF pattern THEN reply" },
    { kicker: "AI-based", title: "AI-Powered Chatbots",
      points: ["Use NLP (intent recognition) + trained models or LLMs", "Understand variations: 'how much are fees?', 'fee structure?', 'cost?' → same intent", "Learn from conversation data; can generate new replies", "Modern LLM chatbots (ChatGPT etc.) hold open-domain conversations"], formula: "Intent → dynamic response" },
    { kicker: "Build", title: "Building One (Class 10 Level)",
      points: ["Define intents: greetings, fees, timings, complaint", "Collect example phrases (training data) per intent", "Model classifies new messages into an intent → pick a reply", "Tools: PictoBlox chatbot blocks, Teachable Machine, simple Python (NLTK)"], formula: "Intents + examples + classifier" },
  ],
  mindmap: { central: "Chatbots",
    branches: [
      { label: "Rule-based", color: "#e37400", children: ["Pattern matching", "Fixed replies", "Brittle"] },
      { label: "AI-based", color: "#1a73e8", children: ["Intent detection", "Generated replies", "LLMs"] },
      { label: "Types of work", color: "#146c2e", children: ["Support & FAQs", "Bookings", "Tutoring"] },
      { label: "Building", color: "#9334e6", children: ["Define intents", "Example phrases", "Train classifier"] },
    ] },
  flowchart: [
    { title: "User types a message", desc: "'What are the school timings?'" },
    { title: "NLP pipeline", desc: "normalise → tokens → features" },
    { title: "Intent classifier", desc: "predicts intent = 'timings'", type: "decision" },
    { title: "Reply generator", desc: "returns 'School runs 8 AM – 2 PM.'", type: "result" },
  ],
  notes: [
    "Rule-based = <b>decision tree</b>; AI-based = <b>learned intents</b>.",
    "An intent = the user's goal; one intent has <b>many phrasings</b> — that's why we train.",
    "Retrieval bots pick from existing replies; <b>generative bots compose new text</b>.",
    "Ethics: chatbots must not pretend to be human — <b>disclose that it's a bot</b>.",
  ],
  quiz: [
    { q: "A chatbot that only matches keywords to fixed answers is:", options: ["AI-based", "Rule-based", "Generative", "An LLM"], answer: 1, why: "Pattern → canned reply, no learning." },
    { q: "'How much are fees?' and 'fee structure?' both map to:", options: ["Different entities", "The same intent", "Two languages", "Sentiments"], answer: 1, why: "Intent = the underlying goal, phrased many ways." },
  ],
  pyq: [
    "Differentiate rule-based and AI-based chatbots. (3m)",
    "List the steps to build a simple chatbot. (3m)",
  ],
},

/* ===== PART B • UNIT 7 — ADVANCE PYTHON ===== */

"ai-11-0": {
  slides: [
    { kicker: "Part B • U7", title: "Introduction to Jupyter Notebook",
      points: ["Jupyter Notebook = an interactive coding environment in your browser", "Work in CELLS: code cells (run Python) + markdown cells (write notes)", "The KERNEL runs your code and remembers variables between cells"], formula: "Cells + kernel = interactive Python" },
    { kicker: "Why", title: "Why Data Scientists Love It",
      points: ["Code, output, charts and explanations live in ONE document", "Run pieces step-by-step — perfect for data exploration", "Supports rich output: tables, graphs (matplotlib), images", "Notebooks (.ipynb) are shareable and standard in AI work"], formula: "Code + output + notes, together" },
    { kicker: "Setup", title: "Getting Started",
      points: ["Install Anaconda: a Python + Jupyter + library bundle", "Launch Jupyter from Anaconda Navigator; it opens in the browser", "PictoBlox also provides a Jupyter environment (KIPS book route)", "New notebook → Python 3 kernel → start coding"], formula: "Anaconda → Navigator → Notebook" },
    { kicker: "Cells", title: "Working with Cells",
      points: ["Cell types: Code, Markdown, Raw", "Run cell: Shift+Enter (runs and moves to next)", "Kernel menu: restart & clear output for a fresh start", "Save often: .ipynb file (JSON inside)"], formula: "Shift+Enter = run" },
  ],
  mindmap: { central: "Jupyter Notebook",
    branches: [
      { label: "Basics", color: "#1a73e8", children: ["Browser-based", "Cells + kernel", ".ipynb files"] },
      { label: "Cell types", color: "#e37400", children: ["Code", "Markdown", "Shift+Enter run"] },
      { label: "Setup", color: "#146c2e", children: ["Anaconda", "Navigator", "PictoBlox option"] },
      { label: "Why", color: "#9334e6", children: ["Code+notes+charts", "Step-by-step", "AI standard"] },
    ] },
  notes: [
    "Jupyter supports many languages (Ju-lia, Py-thon, R) — <b>the name is a tribute</b>.",
    "Restarting the kernel wipes all variables — <b>re-run cells from the top</b>.",
    "Markdown cells let you write headings, lists and maths between code.",
    "Notebook = <b>lab notebook</b> for data work: experiment, see, note, repeat.",
  ],
  quiz: [
    { q: "Which key combination runs the current cell?", options: ["Ctrl+C", "Shift+Enter", "Alt+Tab", "Ctrl+S"], answer: 1, why: "Shift+Enter executes the cell and moves down." },
    { q: "Jupyter is typically installed via:", options: ["MS Word", "Anaconda", "Paint", "Calculator"], answer: 1, why: "Anaconda bundles Python, Jupyter and data-science libraries." },
  ],
  pyq: [
    "What is Jupyter Notebook? Why is it popular for AI? (3m)",
    "Differentiate code cells and markdown cells. (2m)",
  ],
},

"ai-11-1": {
  slides: [
    { kicker: "Part B • U7", title: "Introduction to NumPy",
      points: ["NumPy (Numerical Python) = THE library for numerical arrays and maths in Python", "Core object: the ndarray — fast, memory-efficient N-dimensional arrays", "All serious AI libraries (pandas, TensorFlow) are built on NumPy"], formula: "import numpy as np" },
    { kicker: "Why", title: "Why Not Just Lists?",
      points: ["NumPy arrays are typed & contiguous → 10-100× faster than lists", "Vectorised operations: add two arrays in ONE line, no loops", "Broadcasting: operate an array with a scalar automatically", "Huge function library: stats, linear algebra, random"], formula: "a + b (no loops needed)" },
    { kicker: "Arrays", title: "Creating Arrays",
      points: ["np.array([1, 2, 3]) — from a list", "np.zeros(5), np.ones((2,3)), np.arange(0, 10, 2)", "np.random.rand(3) — random numbers", "Dimensions: 1-D vector, 2-D matrix, N-D tensor; shape attribute tells all"], formula: "np.array • zeros • ones • arange" },
    { kicker: "Ops", title: "Array Operations",
      points: ["Element-wise: a + b, a * 2, a ** 2", "Indexing & slicing like lists: a[0], a[1:4]; 2-D: m[1, 2]", "Aggregations: a.sum(), a.mean(), a.max(), a.min()", "Reshaping: a.reshape(3, 2) — 6 elements → 3 rows × 2 cols"], formula: "sum • mean • max • reshape" },
  ],
  mindmap: { central: "NumPy",
    branches: [
      { label: "What", color: "#1a73e8", children: ["Numerical Python", "ndarray", "Foundation of AI libs"] },
      { label: "Create", color: "#e37400", children: ["np.array(list)", "zeros/ones", "arange", "random"] },
      { label: "Operate", color: "#146c2e", children: ["Element-wise maths", "Indexing/slicing", "Broadcasting"] },
      { label: "Aggregate", color: "#9334e6", children: ["sum/mean/max", "reshape", "shape"] },
    ] },
  examples: [
    { title: "First NumPy program",
      steps: ["import numpy as np", "a = np.array([10, 20, 30, 40])", "print(a + 5)  # [15 25 35 40]", "print(a.mean())  # 25.0"],
      answer: "Vectorised maths — no loops needed" },
    { title: "Marks analytics",
      steps: ["marks = np.array([88, 92, 79, 95, 61])", "marks.mean() → 83.0", "marks.max() → 95", "marks[marks > 80] → [88 92 95]"],
      answer: "Mean 83, topper 95, three above 80" },
  ],
  notes: [
    "Convention everyone uses: <b>import numpy as np</b>.",
    "Lists are flexible but slow; <b>NumPy arrays are fast and typed</b> — why AI needs them.",
    "Element-wise means <b>each element pairs up</b>: [1,2] + [3,4] = [4,6].",
    "Check dimensions with <b>arr.shape</b> — (rows, columns).",
  ],
  quiz: [
    { q: "The standard alias for importing NumPy is:", options: ["import numpy as num", "import numpy as np", "import np", "from numpy import *"], answer: 1, why: "'as np' is the universal convention." },
    { q: "np.array([1,2,3]) * 3 gives:", options: ["[1,2,3,1,2,3,1,2,3]", "[3,6,9]", "9", "Error"], answer: 1, why: "Broadcasting multiplies every element by 3." },
  ],
  pyq: [
    "What is NumPy? Why are arrays faster than lists? (3m)",
    "Write NumPy code to create [5,10,15] and print its mean. (2m)",
  ],
},

"ai-11-2": {
  slides: [
    { kicker: "Part B • U7", title: "NumPy Case Walkthrough",
      points: ["Apply NumPy to a real dataset: class test marks analysis", "Pipeline: create/load → inspect → clean → analyse → interpret", "This is data science with real code — in five lines"], formula: "Data → NumPy → insight" },
    { kicker: "Data In", title: "Step 1–2: Load and Inspect",
      points: ["marks = np.array([45, 92, 67, 58, 92, 71, 38, 85, 67, 95])", "Inspect: marks.shape → (10,); len(marks) → 10", "Quick stats: marks.min() → 38, marks.max() → 95", "marks.dtype → int64 (data type of elements)"], formula: "shape • min • max • dtype" },
    { kicker: "Analyse", title: "Step 3: Compute Statistics",
      points: ["marks.mean() → 71.0 — class average", "np.median(marks) → 67+71 / 2 = 69.0 — middle value", "np.unique(marks, return_counts=True) → values and frequencies (mode!)", "Above average: marks[marks > 71] → [92, 92, 85, 95]"], formula: "mean • median • unique • filter" },
    { kicker: "Interpret", title: "Step 4–5: Interpret and Decide",
      points: ["Mean (71) > median (69): slightly pulled up by toppers — mild right skew", "38 is the struggler → needs support", "Marks ≥ 85 → 4 students for the Olympiad team", "End with an action, like every data science case"], formula: "Numbers → decisions" },
  ],
  flowchart: [
    { title: "Create the array", desc: "10 students' marks" },
    { title: "Inspect", desc: "shape, dtype, min, max" },
    { title: "Analyse", desc: "mean, median, unique counts, filtering" },
    { title: "Interpret", desc: "skew? outliers? achievers?" },
    { title: "Act", desc: "support the weak, select the team", type: "result" },
  ],
  notes: [
    "Boolean filtering is the hero: <b>marks[marks > 71]</b> — condition inside brackets.",
    "Mode via NumPy: <b>np.unique(marks, return_counts=True)</b> then pick the highest count.",
    "Compare mean vs median to comment on <b>skew/outliers</b> — links to the statistics chapter.",
    "Every case walkthrough ends in a <b>decision</b> — that's the data scientist's job.",
  ],
  quiz: [
    { q: "marks[marks > 50] returns:", options: ["Marks above 50", "First 50 marks", "An error", "Marks equal to 50 only"], answer: 0, why: "Boolean mask filters elements matching the condition." },
    { q: "np.median() of [10, 20, 30, 40] is:", options: ["20", "25", "30", "100"], answer: 1, why: "Even count → average of the two middle values (20,30)." },
  ],
  pyq: [
    "Write NumPy code: mean and max of [12, 7, 25, 9, 30]. (2m)",
    "How do you filter all values above a threshold in a NumPy array? (2m)",
  ],
},

"ai-11-3": {
  slides: [
    { kicker: "Part B • U7", title: "Python for AI",
      points: ["Python = the #1 language of AI — simple syntax, huge library ecosystem", "AI libraries: NumPy (maths), pandas (tables), matplotlib (charts), OpenCV (vision), NLTK (NLP), TensorFlow/PyTorch (deep learning)", "If you can write basic Python, you can build AI"], formula: "Python + libraries = AI superpowers" },
    { kicker: "Basics", title: "Python Basics Recap",
      points: ["Variables: x = 5; dynamic typing", "Data types: int, float, str, bool; structures: list, tuple, dict", "Control: if/elif/else; loops: for, while", "Functions: def greet(name): return 'Hi ' + name"], formula: "Variables • structures • control • functions" },
    { kicker: "Ecosystem", title: "The AI Library Shelf",
      points: ["pandas: dataframes — spreadsheets in code", "matplotlib: plotting (line, bar, scatter, histogram)", "OpenCV: image reading, resizing, filters", "NLTK: tokenisation, stemming, stopwords", "scikit-learn: ready-made ML models (kNN, trees...)"], formula: "pandas • matplotlib • OpenCV • NLTK • sklearn" },
    { kicker: "Why Python", title: "Why Python Won AI",
      points: ["Readable: less code, fewer bugs (compare with C++/Java)", "Community: millions of tutorials, free libraries", "Glue language: connects data, models, and web apps", "From notebook experiments to production — one language"], formula: "Simple • rich • everywhere" },
  ],
  mindmap: { central: "Python for AI",
    branches: [
      { label: "Basics", color: "#1a73e8", children: ["Variables & types", "List, tuple, dict", "if / for / while", "def functions"] },
      { label: "Libraries", color: "#e37400", children: ["NumPy, pandas", "matplotlib", "OpenCV, NLTK", "sklearn, TF"] },
      { label: "Why", color: "#146c2e", children: ["Simple syntax", "Huge community", "End-to-end"] },
      { label: "Workflow", color: "#9334e6", children: ["Jupyter notebook", "pip install", "Import & build"] },
    ] },
  examples: [
    { title: "A tiny AI-style program",
      steps: ["marks = [88, 45, 92, 61]", "avg = sum(marks) / len(marks)", "if avg >= 60:", "    print('Class average is good:', avg)"],
      answer: "Data + decision logic = the heart of every AI script" },
  ],
  notes: [
    "pip install numpy → <b>import numpy as np</b> → use: the three-step library rhythm.",
    "Lists are [mutable]; tuples are (immutable) — a classic 1-marker.",
    "Dictionary = key→value pairs — like a record with named fields.",
    "Python's readability means you spend time on <b>ideas, not syntax</b> — perfect for beginners.",
  ],
  quiz: [
    { q: "Which library is used for NLP tasks like stemming?", options: ["OpenCV", "NLTK", "NumPy", "matplotlib"], answer: 1, why: "The Natural Language Toolkit handles tokenising, stemming, stopwords." },
    { q: "Which is a MUTABLE data structure?", options: ["Tuple", "List", "String", "int"], answer: 1, why: "Lists can be changed after creation; tuples and strings cannot." },
  ],
  pyq: [
    "Why is Python preferred for AI development? (3m)",
    "Name any four Python libraries used in AI and their purpose. (4m)",
  ],
},

"ai-11-4": {
  slides: [
    { kicker: "Part B • U7", title: "No-code AI Tools",
      points: ["No-code AI tools let you build and train AI models WITHOUT programming", "Two class 10 favourites: Google Teachable Machine and PictoBlox", "Perfect for prototyping ideas and learning how training works"], formula: "Upload examples → train → test → export" },
    { kicker: "Teachable", title: "Google Teachable Machine",
      points: ["Train image, sound or pose classifiers in the browser — free", "Steps: create classes → gather samples (webcam) → click Train Model", "Test live on webcam; export the model for apps/websites", "Learn by doing: see how MORE and BETTER samples = better accuracy"], formula: "Classes → samples → train → export" },
    { kicker: "PictoBlox", title: "PictoBlox",
      points: ["Block-based coding (Scratch-style) + AI features", "Blocks for face detection, speech recognition, text classification", "Can control robots and hardware too (quarky boards)", "Great bridge: blocks today → Python tomorrow"], formula: "Drag blocks → AI behaviour" },
    { kicker: "Lessons", title: "What No-code Tools Teach",
      points: ["Data quality decides accuracy — see it happen live", "Overfitting: train on 5 samples → fails on new ones", "Class balance: equal samples per class matters", "The AI project cycle becomes VISIBLE: scope → data → train → evaluate"], formula: "Feel the cycle, no code needed" },
  ],
  mindmap: { central: "No-code AI Tools",
    branches: [
      { label: "Teachable Machine", color: "#1a73e8", children: ["Browser, free", "Image/sound/pose", "Webcam samples", "Export model"] },
      { label: "PictoBlox", color: "#e37400", children: ["Block coding", "Face & speech AI", "Robots too"] },
      { label: "Lessons", color: "#146c2e", children: ["Data quality", "Class balance", "Overfitting live"] },
      { label: "Next step", color: "#9334e6", children: ["Move to Python", "Real datasets"] },
    ] },
  notes: [
    "Teachable Machine link: <b>teachablemachine.withgoogle.com</b> — try the image classifier today.",
    "Experiment: train 'mask vs no-mask' with 10 vs 100 samples and <b>watch accuracy change</b>.",
    "No-code tools follow the SAME project cycle — they hide code, not concepts.",
    "Export models plug into websites and apps — prototypes become products.",
  ],
  quiz: [
    { q: "Teachable Machine can train classifiers for:", options: ["Only text", "Images, sounds and poses", "Only numbers", "Only robots"], answer: 1, why: "It supports three class types: image, audio, pose." },
    { q: "PictoBlox uses:", options: ["Python only", "Block-based coding", "C++", "No interface"], answer: 1, why: "Scratch-style blocks with AI powers." },
  ],
  pyq: [
    "What is Teachable Machine? Write the steps to train an image classifier. (4m)",
    "What lessons do no-code tools teach about data? (2m)",
  ],
},

/* ===== PART C — PRACTICAL WORK ===== */

"ai-12-0": {
  slides: [
    { kicker: "Part C • Practical", title: "Python Programming Practice",
      points: ["Practical file staple: small programs using variables, conditionals, loops and lists", "Pattern: input → process → output; add comments to every program", "Write, run in Jupyter, then paste input/output screenshots into the file"], formula: "Input → process → output" },
    { kicker: "Programs 1", title: "Must-Know Programs — Basics",
      points: ["Even/odd checker: if n % 2 == 0", "Greatest of three numbers: nested if / max()", "Multiplication table: for i in range(1, 11)", "Factorial with a loop: f = f * i"], formula: "if… for… range()" },
    { kicker: "Programs 2", title: "Must-Know Programs — Data",
      points: ["Sum & average of a list: sum(lst), sum(lst)/len(lst)", "Count vowels in a string", "Palindrome check: s == s[::-1]", "Simple calculator with if/elif menu"], formula: "List & string operations" },
    { kicker: "File", title: "Practical File Format",
      points: ["Aim, theory (2-3 lines), program code, output screenshot, conclusion", "5-8 Python programs + 2-3 NumPy/Orange practicals is enough", "Neat handwritten or printed — school's choice", "Teacher signs each practical; keep the index updated"], formula: "Aim → theory → code → output → conclusion" },
  ],
  notes: [
    "range(1, 11) gives <b>1 to 10</b> — the classic off-by-one trap.",
    "s[::-1] reverses a string in one slice.",
    "Test each program with normal, boundary and invalid inputs — shows rigour in viva.",
    "Comments (# ...) and clear variable names earn goodwill marks.",
  ],
  quiz: [
    { q: "range(1, 11) produces numbers:", options: ["1 to 11", "1 to 10", "0 to 10", "2 to 11"], answer: 1, why: "The end value is excluded." },
    { q: "Which line checks a palindrome?", options: ["s == s", "s == s[::-1]", "len(s) == 1", "s.upper()"], answer: 1, why: "Compare the string with its reverse." },
  ],
  pyq: [
    "Write a program to print the multiplication table of any number. (3m)",
    "Write a program to find the sum and average of a list of 5 numbers. (3m)",
  ],
},

"ai-12-1": {
  slides: [
    { kicker: "Part C • Practical", title: "Data Science with Orange",
      points: ["Build a complete no-code ML workflow in Orange and screenshot it", "Dataset: Iris (in-built) or your class survey (CSV)", "Deliverable: workflow + accuracy + confusion matrix + 3-line conclusion"], formula: "File → visualise → model → score" },
    { kicker: "Steps", title: "The Workflow to Submit",
      points: ["File widget → load iris (or CSV)", "Data Table + Scatter Plot (petal length vs width) — screenshot", "Tree/kNN widget connected from File", "Test & Score + Confusion Matrix connected to the model", "Record accuracy; write what the confusion matrix reveals"], formula: "5 widgets, 6 links, 1 conclusion" },
    { kicker: "Viva", title: "Expected Viva Questions",
      points: ["What does each widget do? (one line each)", "Why did you choose kNN/Tree?", "What is your accuracy? Which classes got confused?", "What happens with less training data?"], formula: "Know your own workflow" },
    { kicker: "Bonus", title: "Level-Up Ideas",
      points: ["Your own survey: 20 classmates, fields: height, marks, hand preference → cluster them", "Try the Distributions widget for histograms", "Compare kNN vs Tree accuracy in one Test & Score", "Export visualisations for your project report"], formula: "Own data > borrowed data" },
  ],
  notes: [
    "Practical must show the <b>full pipeline</b>: load → see → model → evaluate.",
    "Screenshot every stage — the file IS the evidence.",
    "Be ready to change a widget live in the practical exam — know the canvas.",
    "Conclusion template: 'The model achieved __% accuracy; most confusion was between __ and __.'",
  ],
  quiz: [
    { q: "Which Orange widget evaluates a model?", options: ["File", "Scatter Plot", "Test & Score", "Select Rows"], answer: 2, why: "Test & Score runs evaluation and reports accuracy." },
    { q: "The first widget of any Orange workflow is usually:", options: ["kNN", "File (data loader)", "Confusion Matrix", "Heat Map"], answer: 1, why: "Data first — everything else needs a dataset." },
  ],
  pyq: [
    "Draw/label an Orange workflow for iris classification. (5m)",
    "How do you check accuracy in Orange? (2m)",
  ],
},

"ai-12-2": {
  slides: [
    { kicker: "Part C • Practical", title: "Computer Vision Lab",
      points: ["Hands-on: train an image classifier with Google Teachable Machine", "Test it live, export it, and document successes AND failures", "Optional: basic OpenCV operations in Jupyter"], formula: "Collect → train → test → export" },
    { kicker: "Teachable", title: "The Classifier Practical",
      points: ["Project idea: 'mask vs no-mask' or 'masks/without-glasses/thumbs-up' (3 classes)", "Collect 30+ images per class (webcam) with varied angles & lighting", "Train → test on webcam → note where it fails", "Export model; paste screenshots + failure analysis in the file"], formula: "30+ samples per class" },
    { kicker: "OpenCV", title: "OpenCV Basics (Jupyter)",
      points: ["import cv2; img = cv2.imread('photo.jpg')", "Grayscale: cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)", "Resize: cv2.resize(img, (100, 100))", "Show/save: cv2.imshow / cv2.imwrite"], formula: "Read → convert → resize → write" },
    { kicker: "Viva", title: "Expected Viva Questions",
      points: ["Why do more samples improve accuracy?", "What was your failure case and why did it fail?", "What do cv2.imread() and cvtColor() do?", "What is a pixel / RGB?"], formula: "Explain YOUR results" },
  ],
  notes: [
    "Failure analysis impresses examiners more than perfect demos — <b>document 2-3 failure cases</b>.",
    "Vary lighting, angle and background while collecting samples — <b>data diversity</b> in action.",
    "OpenCV reads images as <b>BGR</b>, not RGB — favourite viva twist!",
    "Screenshot the training accuracy AND the live test for the file.",
  ],
  quiz: [
    { q: "More training samples with varied lighting lead to:", options: ["Worse model", "Better generalisation", "Slower webcam", "No change"], answer: 1, why: "Variety in data helps the model handle real-world conditions." },
    { q: "OpenCV stores colour images in which order?", options: ["RGB", "BGR", "BRG", "CMYK"], answer: 1, why: "OpenCV's historical default is Blue-Green-Red." },
  ],
  pyq: [
    "Write the steps to train a Teachable Machine classifier. (4m)",
    "Write OpenCV code to read and resize an image. (2m)",
  ],
},

"ai-12-3": {
  slides: [
    { kicker: "Part C • Practical", title: "NLP Lab — Chatbot & Sentiment",
      points: ["Two classic NLP practicals: a rule-based chatbot and a sentiment mini-analysis", "Both can be done in PictoBlox (blocks) or Python (NLTK)", "Document intents, phrases and test conversations"], formula: "Rules or training → conversation" },
    { kicker: "Chatbot", title: "Build a Rule-Based Chatbot",
      points: ["Define 4-6 intents: greeting, fees, timings, complaint, bye", "Write patterns and replies: if 'hi' or 'hello' in msg → greet back", "Loop: keep asking until user says 'bye'", "Extension: add a fallback reply: 'Sorry, I did not understand.'"], formula: "IF keyword in message THEN reply" },
    { kicker: "Sentiment", title: "Mini Sentiment Analyser",
      points: ["Take 10 short reviews (5 positive, 5 negative)", "Make positive/negative word lists; count hits in each review", "Label by score: more positive words → positive", "Compare your labels with reality; discuss errors (sarcasm!)"], formula: "Sentiment score = positive − negative hits" },
    { kicker: "Viva", title: "Expected Viva Questions",
      points: ["Rule-based vs AI chatbot — what did you build?", "Why does 'not good' fool a word-list analyser?", "What are stopwords/tokenisation?", "How would you improve your chatbot?"], formula: "Know your bot's limits" },
  ],
  notes: [
    "A flowchart of your chatbot's decision tree makes the file look professional.",
    "'The movie was not bad at all' — negation flips sentiment; word-lists miss it — <b>discuss this</b>.",
    "Fallback replies are essential — a bot that silently fails looks broken.",
    "Sample Python: <b>if 'hello' in msg.lower(): print('Hi! How can I help?')</b>",
  ],
  quiz: [
    { q: "A fallback reply handles:", options: ["Known questions", "Unmatched inputs", "Only greetings", "Goodbyes"], answer: 1, why: "When no pattern matches, the bot must still respond gracefully." },
    { q: "'Not good' breaks simple sentiment lists because of:", options: ["Spelling", "Negation", "Tokenisation", "UTF-8"], answer: 1, why: "'Not' flips the sentiment of the following word." },
  ],
  pyq: [
    "Write pseudocode/Python for a 3-intent rule-based chatbot. (5m)",
    "Explain your sentiment-analysis method and one failure case. (3m)",
  ],
},

"ai-12-4": {
  slides: [
    { kicker: "Part C • Practical", title: "Practical Exam & Viva Tips",
      points: ["CBSE 417: Theory 50 + Practical 50 — practicals carry as much weight as theory!", "Components: practical file, lab performance, viva voce, project", "Marks come from BOTH doing the work AND explaining it"], formula: "File + performance + viva + project = 50" },
    { kicker: "Exam", title: "Practical Exam Strategy",
      points: ["Know your file's every program — they'll ask you to run one", "Practise the Orange workflow and Teachable Machine till they're automatic", "Read the question twice; plan before typing/blocks", "Save often; keep a backup of your file and datasets"], formula: "Rehearse till automatic" },
    { kicker: "Viva", title: "Viva Voce Mastery",
      points: ["Answer in 1-2 confident sentences; if unsure, reason aloud", "Know definitions cold: AI/ML/DL, pixel, TF-IDF, confusion matrix, accuracy vs recall", "Know YOUR project: problem, data, model, result, limitation", "Never bluff — 'I'm not sure, but I think…' beats a wrong claim"], formula: "Concepts + own work = confidence" },
    { kicker: "Checklist", title: "Final Checklist",
      points: ["File: complete, indexed, signed", "Screenshots: every practical with visible output", "Project: working demo + 4-5 page report", "Viva: top-30 questions rehearsed with a friend"], formula: "Checklist before the exam week" },
  ],
  mindmap: { central: "Practical Exam Prep",
    branches: [
      { label: "Components", color: "#1a73e8", children: ["Practical file", "Lab performance", "Viva", "Project"] },
      { label: "Drill", color: "#e37400", children: ["Orange workflow", "Teachable Machine", "Python programs"] },
      { label: "Viva", color: "#146c2e", children: ["Core definitions", "Own project story", "Honest answers"] },
      { label: "Discipline", color: "#9334e6", children: ["Backup files", "Save often", "Sleep well"] },
    ] },
  notes: [
    "Viva favourites: <b>difference between accuracy and recall</b>, <b>what is a pixel</b>, <b>AI vs ML vs DL</b>.",
    "Practice explaining your PROJECT in exactly 60 seconds — the perfect viva opener.",
    "Keep datasets and model files in your school account/cloud — <b>never lose your work</b> the exam week.",
    "Examiners reward <b>honest error analysis</b> over fake perfect results.",
  ],
  quiz: [
    { q: "In viva, the BEST response to an unknown question is:", options: ["Silence", "A confident wrong answer", "Honest reasoning about what you know", "Changing the topic"], answer: 2, why: "Examiners value honest reasoning over bluffing." },
    { q: "The practical exam tests:", options: ["Only theory recall", "Doing the practical and explaining it", "Handwriting", "Speed typing"], answer: 1, why: "Performance + understanding, together." },
  ],
  pyq: [
    "List the components of the AI (417) practical examination. (2m)",
    "Write any five viva questions with one-line answers from Units 1-7. (5m)",
  ],
},

/* ===== PART D — PROJECT WORK / PORTFOLIO ===== */

"ai-13-0": {
  slides: [
    { kicker: "Part D • Project", title: "AI Project (Any Domain)",
      points: ["Pick ONE real problem and run the FULL AI project cycle on it", "Allowed domains: Data Science, Computer Vision, NLP (or a blend)", "Deliverables: working demo + report + presentation"], formula: "Real problem → full cycle → demo" },
    { kicker: "Ideas", title: "Project Ideas That Score",
      points: ["Data Science: predict house prices; analyse class marks; IPL analysis", "CV: mask detector; plant-disease detector; sign-language recogniser", "NLP: school FAQ chatbot; movie review sentiment analyser", "Choose what YOU can demo live — practical beats fancy"], formula: "Demo-able > grandiose" },
    { kicker: "Report", title: "The Project Report Format",
      points: ["1. Title + team + school • 2. Problem statement (4Ws canvas!)", "3. Data: sources, features, size, cleaning done", "4. Method: tool/model chosen + why (Orange, Teachable, Python)", "5. Evaluation: accuracy/confusion matrix + failure cases", "6. Ethics & limitations • 7. Future scope • 8. Conclusion"], formula: "8 sections, 8-12 pages" },
    { kicker: "Present", title: "Presentation Day",
      points: ["2-minute story: problem → data → model → result", "LIVE demo beats screenshots — rehearse it 5 times", "Own the failures: 'it misclassifies X because…' impresses", "End with future scope, not 'thank you' alone"], formula: "Story + demo + honesty" },
  ],
  flowchart: [
    { title: "Scope", desc: "pick a real problem; fill the 4Ws canvas" },
    { title: "Data", desc: "collect & clean; note sources and size" },
    { title: "Build", desc: "Orange / Teachable Machine / Python model" },
    { title: "Evaluate", desc: "accuracy + confusion matrix + failures" },
    { title: "Report & demo", desc: "8-section report + live presentation", type: "result" },
  ],
  notes: [
    "The 4Ws canvas doubles as the report's <b>problem statement</b> — reuse it!",
    "Small + complete beats big + broken — <b>20 good samples and a working demo</b> win.",
    "Include an <b>ethics paragraph</b>: data privacy, bias check — instant depth.",
    "Future scope ideas: more data, more classes, deploy as an app.",
  ],
  quiz: [
    { q: "The FIRST step of an AI project is:", options: ["Choosing a model", "Problem scoping (4Ws)", "Building the app", "Writing the report"], answer: 1, why: "Define the problem before any data or model work." },
    { q: "A project report must include evaluation because:", options: ["It looks nice", "Evidence of performance and honesty matter", "CBSE forbids demos", "Models cannot run"], answer: 1, why: "Metrics + failure cases prove the work is genuine." },
  ],
  pyq: [
    "Write the sections of a good AI project report. (5m)",
    "Choose a domain and propose an AI project idea with its 4Ws. (5m)",
  ],
},

"ai-13-1": {
  slides: [
    { kicker: "Part D • Portfolio", title: "Practical File & Student Portfolio",
      points: ["Practical file = the record of every lab activity, signed by the teacher", "Portfolio = your AI learning journey: best work, reflections, growth", "Both are marked — treat them as exam submissions, not homework"], formula: "File = evidence • Portfolio = story" },
    { kicker: "File", title: "Practical File Essentials",
      points: ["Index page: S.No, activity name, date, teacher signature", "Each practical: aim, theory, steps, output screenshot, conclusion", "Cover all units: Python, NumPy, Orange, CV, NLP", "Neat and consistent — same format for every entry"], formula: "Aim → theory → steps → output → conclusion" },
    { kicker: "Portfolio", title: "Student Portfolio Essentials",
      points: ["Cover page + contents + your AI journey in one paragraph", "Best 3-5 artefacts: project report, best practicals, screenshots", "Reflections: what I learned, what failed, what I'd do differently", "Certificates/awards if any (AI quizzes, workshops)"], formula: "Artefacts + reflections" },
    { kicker: "Habits", title: "Habits That Build Themselves",
      points: ["Update the file the SAME DAY as the lab — memory fades", "Version your files: project_v2.ipynb, not final_FINAL_v3", "Keep a cloud backup of everything", "Ask for teacher signature immediately — chase signatures monthly"], formula: "Same-day updates + backups" },
  ],
  mindmap: { central: "File & Portfolio",
    branches: [
      { label: "Practical file", color: "#1a73e8", children: ["Index + signatures", "Aim/theory/output", "All units covered"] },
      { label: "Portfolio", color: "#e37400", children: ["Best artefacts", "Reflections", "Journey story"] },
      { label: "Discipline", color: "#146c2e", children: ["Same-day entry", "Versioning", "Cloud backup"] },
    ] },
  notes: [
    "The teacher's signature column <b>is the proof</b> — never leave it blank for months.",
    "Reflections separate an A portfolio from a C portfolio — <b>write what you learned</b>, not what you did.",
    "Screenshots must show <b>visible output</b> — crop cleanly, add captions.",
    "One honest failure story ('my first model was 40% accurate because…') makes the portfolio memorable.",
  ],
  quiz: [
    { q: "A portfolio differs from a practical file because it includes:", options: ["Only signatures", "Reflections and best work", "More theory", "Nothing different"], answer: 1, why: "The portfolio tells your learning journey with reflections." },
    { q: "The best time to write a lab entry is:", options: ["Exam week", "The same day as the lab", "After vacations", "Never"], answer: 1, why: "Fresh memory = accurate record; less end-of-term panic." },
  ],
  pyq: [
    "List the components of a practical file entry. (3m)",
    "What belongs in a student portfolio? (3m)",
  ],
},

"ai-13-2": {
  slides: [
    { kicker: "Part D • Viva", title: "Viva Voce Preparation",
      points: ["Viva = a short oral exam about your file, project and concepts", "Examiners check understanding, not memorisation", "3-part prep: core definitions + your work + quick maths"], formula: "Definitions + own work + formulas" },
    { kicker: "Core", title: "Top Concept Questions",
      points: ["AI vs ML vs DL — one line each", "Rule-based vs learning-based modelling", "Supervised vs unsupervised; classification vs regression", "Confusion matrix: TP/TN/FP/FN + accuracy/precision/recall", "Pixel, RGB, convolution, pooling; tokenisation, TF-IDF"], formula: "One-line crisp answers" },
    { kicker: "Own Work", title: "Questions About YOUR Project",
      points: ["Why this problem? (the 4Ws)", "Where did the data come from? How much? How cleaned?", "Why this tool/model? What accuracy? Which failures?", "What would you improve with more time?"], formula: "Know every choice you made" },
    { kicker: "Practice", title: "The 3-Day Viva Drill",
      points: ["Day 1: write 30 questions + one-line answers from all units", "Day 2: friend/family rapid-fire; fix the stumbles", "Day 3: 60-second project pitch + live demo rehearsal", "Sleep well — a fresh brain answers better than a crammed one"], formula: "Write → drill → rehearse" },
  ],
  mindmap: { central: "Viva Prep",
    branches: [
      { label: "Concepts", color: "#1a73e8", children: ["AI/ML/DL", "Learning types", "Evaluation metrics", "CV & NLP basics"] },
      { label: "Own work", color: "#e37400", children: ["4Ws", "Data & tools", "Results & failures"] },
      { label: "Delivery", color: "#146c2e", children: ["Short answers", "Honest 'I think…'", "60-second pitch"] },
      { label: "Drill", color: "#9334e6", children: ["30 questions", "Rapid-fire", "Demo rehearsal"] },
    ] },
  notes: [
    "Answer format: <b>definition + one example</b> — complete in two sentences.",
    "Formula answers must be exact: <b>accuracy = (TP+TN)/total</b>, <b>recall = TP/(TP+FN)</b>.",
    "If you don't know: <b>'I'm not sure, but logically…'</b> — reasoning earns respect.",
    "Rehearse the 60-second project pitch out loud — the most-used 60 seconds of the viva.",
  ],
  quiz: [
    { q: "The ideal viva answer is:", options: ["A 5-minute lecture", "Definition + one example, briefly", "Only 'yes'", "A memorised paragraph"], answer: 1, why: "Crisp, correct, with an example — then stop." },
    { q: "If asked something you never studied:", options: ["Say anything confidently", "Admit and reason from basics", "Stay silent", "Point at the file"], answer: 1, why: "Honest reasoning from fundamentals impresses examiners." },
  ],
  pyq: [
    "Answer in one line each: AI vs ML vs DL. (3m)",
    "State the formulas for accuracy, precision and recall. (3m)",
  ],
},

};
