/* AI — KIPS CBSE 417, Part B Units 1–3: AI Project Cycle & Ethical Frameworks (ai-5),
   Advanced Modelling (ai-6), Evaluating Models (ai-7). */
import type { ChapterDetail } from "./types";

export const AI_PARTB1: Record<string, ChapterDetail> = {

/* ===== PART B • UNIT 1 — AI PROJECT CYCLE & ETHICAL FRAMEWORKS ===== */

"ai-5-0": {
  slides: [
    { kicker: "Part B • U1", title: "Revisiting the AI Project Cycle",
      points: ["The AI Project Cycle = a step-by-step roadmap that takes an AI idea to a working solution", "It keeps projects organised: understand problem → collect data → explore → build model → evaluate → deploy", "Following the cycle saves time, money and avoids building the WRONG solution"], formula: "Problem → Data → Explore → Model → Evaluate → Deploy" },
    { kicker: "Why a cycle?", title: "Why Not Just Code?",
      points: ["AI learns from DATA — without good data, no good AI", "The cycle forces us to scope the problem correctly before building", "Each stage's output feeds the next stage; evaluation can send us back to improve", "Used everywhere: spam filters, recommendations, medical diagnosis, chatbots"], formula: "Good process = good AI" },
    { kicker: "IT vs AI", title: "IT Project Cycle vs AI Project Cycle",
      points: ["IT projects: requirement → design → code → test (logic is written by hand)", "AI projects: data is the heart — the machine LEARNS the logic from examples", "That's why AI cycle has extra stages: data acquisition, exploration, evaluation", "In IT, rules are coded; in AI, rules are LEARNED"], formula: "IT: rules coded • AI: rules learned" },
    { kicker: "Recap", title: "The Six Stages at a Glance",
      points: ["Problem Scoping: what exactly to solve (4Ws Problem Canvas)", "Data Acquisition: gathering the right data", "Data Exploration: understanding patterns with charts", "Modelling: choosing and training the model", "Evaluation: testing accuracy and fairness", "Deployment: using it in the real world"], formula: "Scope → Acquire → Explore → Model → Evaluate → Deploy" },
  ],
  mindmap: { central: "AI Project Cycle",
    branches: [
      { label: "Why", color: "#1a73e8", children: ["Roadmap for AI projects", "Avoids wrong solutions", "Data-centred approach"] },
      { label: "Stages", color: "#e37400", children: ["Problem scoping", "Data acquisition", "Data exploration", "Modelling", "Evaluation"] },
      { label: "IT vs AI", color: "#146c2e", children: ["IT: coded rules", "AI: learned rules", "AI needs data stages"] },
      { label: "Examples", color: "#9334e6", children: ["Spam filter", "Recommender", "Medical diagnosis"] },
    ] },
  notes: [
    "The AI project cycle is <b>iterative</b> — evaluation often sends you back to better data or a better model.",
    "Data is to AI what <b>fuel is to an engine</b> — the cycle exists to handle data correctly.",
    "Skipping problem scoping is the #1 project killer — you solve the <b>right problem</b> first.",
    "Remember the order: <b>Scoping → Acquisition → Exploration → Modelling → Evaluation → Deployment</b>.",
  ],
  quiz: [
    { q: "What comes right after Data Acquisition in the AI project cycle?", options: ["Deployment", "Data exploration", "Evaluation", "Problem scoping"], answer: 1, why: "Explore the collected data for patterns, then move to modelling." },
    { q: "The key difference between IT and AI projects:", options: ["IT projects need no planning", "IT rules are coded; AI rules are learned from data", "AI projects use no testing", "There is no difference"], answer: 1, why: "AI systems learn their logic from examples in data." },
  ],
  pyq: [
    "What is the AI Project Cycle? Why is it important? (CBSE 417 pattern, 3m)",
    "Differentiate between an IT project cycle and an AI project cycle. (3m)",
  ],
},

"ai-5-1": {
  slides: [
    { kicker: "Part B • U1", title: "Stages of the AI Project Cycle",
      points: ["Six stages: Problem Scoping → Data Acquisition → Data Exploration → Modelling → Evaluation → Deployment", "Each stage has clear inputs, activities and outputs", "The stages loop back — AI projects improve in circles, not straight lines"], formula: "6 stages, one goal: a working AI solution" },
    { kicker: "Stage 1–2", title: "Scoping and Acquisition",
      points: ["Problem scoping: use the 4Ws canvas — WHO has the problem, WHAT is the problem, WHERE it occurs, WHY solve it", "Data acquisition: identify data features (age, marks, pixels…) and sources (surveys, sensors, web, APIs, open datasets)", "Features = the inputs the AI will learn from"], formula: "4Ws + features + sources" },
    { kicker: "Stage 3", title: "Data Exploration",
      points: ["Explore with charts: bar, line, scatter, histogram", "Find patterns, trends, outliers and correlations", "Decide which features matter and which are noise", "Good exploration = better modelling decisions"], formula: "Visualise → spot patterns → select features" },
    { kicker: "Stage 4–6", title: "Modelling, Evaluation, Deployment",
      points: ["Modelling: rule-based (if-else trees) or learning-based (supervised/unsupervised/reinforcement)", "Evaluation: test on unseen data; check accuracy, precision, recall, fairness", "Deployment: release into real use — an app, a website, a robot — and keep monitoring"], formula: "Model → measure → launch" },
  ],
  flowchart: [
    { title: "Problem scoping", desc: "4Ws canvas — define the exact problem" },
    { title: "Data acquisition", desc: "collect features from the right sources" },
    { title: "Data exploration", desc: "charts reveal patterns and outliers" },
    { title: "Modelling", desc: "train rule-based or learning-based model", type: "decision" },
    { title: "Evaluation", desc: "accuracy, precision, recall on test data" },
    { title: "Deployment", desc: "real users + monitoring", type: "result" },
  ],
  notes: [
    "The <b>4Ws canvas</b>: Who, What, Where, Why — write it before touching data.",
    "Data sources: <b>surveys, sensors/IoT, web scraping, APIs, open data portals (data.gov.in), cameras</b>.",
    "Exploration uses <b>Orange, spreadsheets, or Python (matplotlib)</b> to visualise data.",
    "Evaluation answers: <b>is the model accurate AND fair?</b> — both matter.",
    "Deployment is not the end — real-world data keeps changing, so models are <b>monitored and retrained</b>.",
  ],
  quiz: [
    { q: "The 4Ws problem canvas includes:", options: ["Who, What, Where, Why", "When, Which, Who, Whether", "Why, Want, Wish, Work", "Who, Whom, Whose, What"], answer: 0, why: "Who has the problem, What it is, Where it arises, Why it is worth solving." },
    { q: "Which stage uses bar charts and scatter plots?", options: ["Deployment", "Data exploration", "Problem scoping", "Modelling"], answer: 1, why: "Exploration visualises data to reveal patterns before modelling." },
    { q: "In data terms, 'age' or 'marks' are examples of:", options: ["Records", "Features", "Models", "Labels only"], answer: 1, why: "Features are the input variables a model learns from." },
  ],
  pyq: [
    "Explain any four stages of the AI project cycle with an example. (5m)",
    "What is the 4Ws Problem Canvas? Explain each W. (4m)",
    "List any four sources of data for an AI project. (2m)",
  ],
},

"ai-5-2": {
  slides: [
    { kicker: "Part B • U1", title: "Revisiting AI, ML and DL",
      points: ["AI = machines mimicking human intelligence (reasoning, learning, decision-making)", "Machine Learning (ML) = the subset of AI where machines LEARN from data without explicit programming", "Deep Learning (DL) = the subset of ML using multi-layer neural networks on huge data"], formula: "AI ⊃ ML ⊃ DL (nested circles)" },
    { kicker: "AI", title: "Artificial Intelligence",
      points: ["Any technique that lets machines mimic intelligent behaviour — including hard-coded rules", "Examples: chess engines, chatbots, recommendation systems, voice assistants", "AI can be rule-based (expert systems) or learning-based (ML)"], formula: "AI = the big umbrella" },
    { kicker: "ML", title: "Machine Learning",
      points: ["Tom Mitchell: a program learns from experience E, on task T, measured by performance P — if P on T improves with E, it is learning", "The machine finds patterns in data instead of being explicitly programmed", "Examples: spam filters, price prediction, recommendation engines"], formula: "Experience → better performance" },
    { kicker: "DL", title: "Deep Learning",
      points: ["Neural networks with MANY hidden layers (that's the 'deep')", "Learns complex features automatically — edges → shapes → faces", "Powers image recognition, self-driving cars, ChatGPT-style models", "Needs lots of data and computing power (GPUs)"], formula: "Many layers = deep" },
  ],
  mindmap: { central: "AI • ML • DL",
    branches: [
      { label: "AI (1950s~)", color: "#1a73e8", children: ["Mimics intelligence", "Rule or learning based", "Chess, chatbots"] },
      { label: "ML", color: "#e37400", children: ["Learns from data", "Supervised/unsupervised/RL", "Spam filter, price prediction"] },
      { label: "DL", color: "#146c2e", children: ["Multi-layer networks", "Auto feature learning", "Vision, speech, LLMs"] },
      { label: "Relationship", color: "#9334e6", children: ["AI ⊃ ML ⊃ DL", "DL is newest wave", "All need data"] },
    ] },
  notes: [
    "Draw the <b>three nested circles</b>: AI outer, ML inside, DL innermost — a guaranteed exam diagram.",
    "ML formal definition (Mitchell): task T, experience E, performance P — quote all three.",
    "Example mapping: <b>spam detection = ML; face unlock = DL; a rule-based FAQ bot = AI (not ML)</b>.",
    "DL became practical after <b>big data + GPUs</b> arrived (~2012, ImageNet moment).",
  ],
  quiz: [
    { q: "Which statement is TRUE?", options: ["ML is a superset of AI", "DL is a subset of ML", "AI is a subset of DL", "They are unrelated"], answer: 1, why: "AI ⊃ ML ⊃ DL — deep learning lives inside machine learning." },
    { q: "A program that improves at chess with practice is an example of:", options: ["Only hard-coded rules", "Machine learning", "Database query", "Web scraping"], answer: 1, why: "Performance at the task improves with experience — Mitchell's definition of learning." },
  ],
  pyq: [
    "Differentiate between AI, ML and DL with one example each. (3m)",
    "Write Tom Mitchell's definition of machine learning and explain T, E, P. (3m)",
  ],
},

"ai-5-3": {
  slides: [
    { kicker: "Part B • U1", title: "Introduction to AI Domains",
      points: ["The three main AI domains: Data Science, Computer Vision, Natural Language Processing", "Each domain works on a different type of data: numbers/tables, images, and text/speech", "Real products often combine domains (a self-driving car uses all three!)"], formula: "Data Science: numbers • CV: images • NLP: text" },
    { kicker: "Data Science", title: "Domain 1 — Data Science",
      points: ["Extracts knowledge and predictions from structured data (tables, numbers)", "Uses statistics + visualisation + ML", "Examples: IPL score predictions, sales forecasting, Covid dashboards, recommender systems"], formula: "Data → insight → decision" },
    { kicker: "CV", title: "Domain 2 — Computer Vision",
      points: ["Machines 'see' and understand images and videos", "Tasks: classification, detection, segmentation", "Examples: face unlock, X-ray analysis, QR scanning, self-driving cars"], formula: "Pixels → meaning" },
    { kicker: "NLP", title: "Domain 3 — Natural Language Processing",
      points: ["Machines understand and generate human language (text + speech)", "Examples: Google Translate, Alexa/Siri, chatbots, autocorrect, sentiment analysis", "Works on tokenising words, finding patterns in grammar and meaning"], formula: "Text/speech → meaning" },
  ],
  mindmap: { central: "AI Domains",
    branches: [
      { label: "Data Science", color: "#1a73e8", children: ["Structured data", "Statistics + charts", "Predictions & trends"] },
      { label: "Computer Vision", color: "#e37400", children: ["Images & video", "Classification, detection", "Face unlock, X-rays"] },
      { label: "NLP", color: "#146c2e", children: ["Text & speech", "Translate, chatbots", "Sentiment analysis"] },
      { label: "Combined", color: "#9334e6", children: ["Self-driving cars", "Smart assistants"] },
    ] },
  notes: [
    "Domain-by-data is the memory trick: <b>tables → DS, images → CV, words → NLP</b>.",
    "A self-driving car = <b>CV</b> (lanes, signs) + <b>DS</b> (route planning) + <b>NLP</b> (voice commands).",
    "IPL win prediction and Covid dashboards are classic <b>Data Science</b> examples from the KIPS book.",
    "Autocorrect and Google Translate are everyday <b>NLP</b>.",
  ],
  quiz: [
    { q: "Face unlock on a phone belongs to which AI domain?", options: ["Data Science", "Computer Vision", "NLP", "Robotics"], answer: 1, why: "It analyses camera images — computer vision." },
    { q: "Predicting cricket scores from past match data is:", options: ["NLP", "Computer Vision", "Data Science", "Bioethics"], answer: 2, why: "Numeric/structured data + prediction = data science." },
    { q: "Google Translate is an example of:", options: ["NLP", "Computer Vision", "Data Science", "Rule-based AI only"], answer: 0, why: "It processes human language — NLP." },
  ],
  pyq: [
    "Name the three AI domains and give one application of each. (3m)",
    "Which AI domains work together in a self-driving car? Explain. (3m)",
  ],
},

"ai-5-4": {
  slides: [
    { kicker: "Part B • U1", title: "Ethical Frameworks for AI",
      points: ["AI ethics = the rules and values that keep AI fair, safe and beneficial for everyone", "Key issues: bias, data privacy, AI access, transparency, accountability", "Goal: 'AI for Good' — technology that helps humanity and the planet"], formula: "Ethical AI = fair + private + transparent + accountable" },
    { kicker: "Bias", title: "AI Bias",
      points: ["AI learns from human data — human prejudices leak into the model", "Example: a hiring AI trained on past hires may favour one gender", "Bias hurts: unfair loan rejections, wrong medical advice for under-represented groups", "Fix: diverse data, fairness testing, human review"], formula: "Biased data → biased AI" },
    { kicker: "Privacy + Access", title: "Data Privacy and AI Access",
      points: ["Privacy: apps collect faces, locations, habits — who owns this data? How is it stored?", "Consent matters: users should know what is collected and why", "AI access: AI benefits shouldn't be only for rich people or rich countries — the digital divide must shrink", "PRIVACY BY DESIGN: collect the minimum needed, protect it always"], formula: "Your data, your consent" },
    { kicker: "Moral Issues", title: "Moral Issues: Self-Driving Cars",
      points: ["The trolley problem: in an unavoidable crash, whom should the car protect?", "Who is responsible for an AV accident — owner, maker, or software?", "Also: job losses from automation, deepfakes, misinformation", "AI Access in India: many citizens still lack devices, internet, digital skills"], formula: "With great AI comes great responsibility" },
  ],
  mindmap: { central: "AI Ethics",
    branches: [
      { label: "Bias", color: "#c5221f", children: ["From biased data", "Hiring/loan unfairness", "Fix: diverse data"] },
      { label: "Privacy", color: "#1a73e8", children: ["Face & location data", "Consent", "Minimum collection"] },
      { label: "AI Access", color: "#e37400", children: ["Digital divide", "Cost & connectivity", "Skilling for all"] },
      { label: "Accountability", color: "#146c2e", children: ["Who is responsible?", "Self-driving dilemma", "Human oversight"] },
    ] },
  notes: [
    "AI bias example from the book: an AI trained only on <b>light-skin faces</b> fails on darker skin — data diversity is the cure.",
    "Ethical concerns of AI adoption: <b>jobs, privacy, deepfakes, safety, inequality</b>.",
    "'AI for Good' projects: <b>crop disease detection, disaster mapping, accessible tech for the disabled</b>.",
    "Users hold rights: <b>to know, to refuse, to delete</b> their data.",
    "An ethical framework checks an AI project at EVERY stage of the project cycle, not just at the end.",
  ],
  quiz: [
    { q: "An AI trained on biased past hiring data will likely:", options: ["Become perfectly fair", "Repeat the same bias", "Ignore gender entirely", "Fix society"], answer: 1, why: "Models learn patterns in data — biased in, biased out." },
    { q: "The ethical worry with apps collecting face and location data is:", options: ["Speed", "Privacy and consent", "Battery drain", "Screen size"], answer: 1, why: "Personal data collection raises privacy and consent issues." },
  ],
  pyq: [
    "What is AI bias? Give one example and one solution. (3m)",
    "List any four ethical concerns related to AI adoption. (4m)",
    "Explain the 'AI Access' problem. (2m)",
  ],
},

"ai-5-5": {
  slides: [
    { kicker: "Part B • U1", title: "Bioethics",
      points: ["Bioethics = ethics applied to biology and medicine — right and wrong in life sciences", "Now meets AI: gene editing, medical AI, organ allocation, clinical trials", "The classic 4 principles: autonomy, beneficence, non-maleficence, justice"], formula: "Autonomy • Beneficence • Non-maleficence • Justice" },
    { kicker: "Principles", title: "The Four Principles",
      points: ["Autonomy: respect the patient's right to decide (informed consent)", "Beneficence: act for the patient's benefit", "Non-maleficence: 'first, do no harm'", "Justice: fair distribution of care and resources"], formula: "Respect • Help • Harm-less • Fair" },
    { kicker: "AI + Bioethics", title: "Where AI Meets Bioethics",
      points: ["AI diagnosis: fast and accurate, but who is responsible for a wrong call?", "Gene editing (CRISPR): should we edit embryos? Where is the line?", "Data: genomic data is deeply personal — privacy is critical", "Allocation: should an algorithm decide who gets a donated organ first?"], formula: "Life decisions need human values" },
    { kicker: "Consent", title: "Informed Consent",
      points: ["Patients must understand the treatment/trial before agreeing", "Data consent: people should know how their medical data trains AI", "Vulnerable groups (children, poor patients) need extra protection", "An ethics committee reviews risky research before it starts"], formula: "No consent, no go" },
  ],
  mindmap: { central: "Bioethics",
    branches: [
      { label: "4 Principles", color: "#1a73e8", children: ["Autonomy (consent)", "Beneficence", "Non-maleficence", "Justice"] },
      { label: "AI in medicine", color: "#e37400", children: ["Diagnosis by AI", "Responsibility gap", "Organ allocation"] },
      { label: "Gene tech", color: "#146c2e", children: ["CRISPR editing", "Embryo ethics", "Designer babies?"] },
      { label: "Data", color: "#c5221f", children: ["Genomic privacy", "Informed consent", "Ethics committees"] },
    ] },
  notes: [
    "Bioethics principles date to <b>Beauchamp & Childress</b> — remember A-B-N-J.",
    "'Primum non nocere' = <b>first, do no harm</b> — non-maleficence.",
    "AI + medicine dilemma: an AI spots a tumour earlier than doctors — but a <b>human must stay accountable</b>.",
    "Informed consent has three parts: <b>information, comprehension, voluntariness</b>.",
    "India's ICMR issues ethical guidelines for AI in healthcare — a good viva point.",
  ],
  quiz: [
    { q: "'First, do no harm' refers to which principle?", options: ["Justice", "Autonomy", "Non-maleficence", "Beneficence"], answer: 2, why: "Non-maleficence = avoid causing harm." },
    { q: "Respecting a patient's right to decide is:", options: ["Beneficence", "Autonomy", "Justice", "Bio-bias"], answer: 1, why: "Autonomy = the patient's informed choice rules." },
  ],
  pyq: [
    "What is bioethics? Name its four main principles. (3m)",
    "Give two examples where AI raises bioethical questions. (2m)",
  ],
},

/* ===== PART B • UNIT 2 — ADVANCED CONCEPTS OF MODELLING ===== */

"ai-6-0": {
  slides: [
    { kicker: "Part B • U2", title: "Introduction to Modelling",
      points: ["A model = a system that maps inputs (features) to outputs (predictions/decisions)", "Modelling = building that system from rules or from data", "Two approaches: rule-based and learning-based"], formula: "Model: input features → output prediction" },
    { kicker: "Rule-based", title: "Rule-Based Approach",
      points: ["Humans write the rules: IF temperature > 38 THEN fever", "Works when the problem is fully known and stable", "Example: a doctor's decision chart, spam keyword filters, basic chatbots", "Pros: transparent, fast to build • Cons: breaks on unseen cases, hard to scale"], formula: "IF condition THEN action" },
    { kicker: "Learning-based", title: "Learning-Based Approach",
      points: ["The machine derives rules FROM data (training examples)", "Give it labelled examples (symptoms → disease) and it generalises", "Handles complex, fuzzy real-world problems (vision, speech)", "Pros: adapts and improves • Cons: needs data, less transparent"], formula: "Data in → rules learned" },
    { kicker: "Choosing", title: "Which Approach to Pick?",
      points: ["Stable, simple, fully-understood problem → rule-based", "Complex patterns, lots of data available → learning-based", "Hybrids exist: rules + learning together", "The AI project cycle's modelling stage makes this choice"], formula: "Simple+known → rules • Complex+data → learning" },
  ],
  mindmap: { central: "Modelling Approaches",
    branches: [
      { label: "Rule-based", color: "#e37400", children: ["IF-THEN rules", "Human-written logic", "Transparent", "Breaks on new cases"] },
      { label: "Learning-based", color: "#1a73e8", children: ["Learns from data", "Generalises", "Needs training data", "Black-box risk"] },
      { label: "Examples", color: "#146c2e", children: ["Fever chart (rule)", "Face unlock (learning)"] },
      { label: "Decision", color: "#9334e6", children: ["Known problem → rules", "Data-rich → learning"] },
    ] },
  notes: [
    "Rule-based = <b>knowledge → rules → answers</b>; learning-based = <b>data → learned rules → answers</b>.",
    "A decision tree is a rule-based model you can draw; a neural net is learning-based.",
    "Rule-based systems are also called <b>expert systems</b> — they encode an expert's knowledge.",
    "Learning-based models can improve with more data; rule-based need manual updates.",
  ],
  quiz: [
    { q: "'IF rain THEN carry umbrella' is which approach?", options: ["Learning-based", "Rule-based", "Reinforcement", "Clustering"], answer: 1, why: "A human wrote an explicit IF-THEN rule." },
    { q: "Which approach generalises to unseen data better?", options: ["Rule-based", "Learning-based", "Both equally", "Neither"], answer: 1, why: "Learning models extract patterns from many examples." },
  ],
  pyq: [
    "Differentiate rule-based and learning-based modelling with examples. (4m)",
    "What is a model in AI? (2m)",
  ],
},

"ai-6-1": {
  slides: [
    { kicker: "Part B • U2", title: "Types of Machine Learning Models",
      points: ["Three families: Supervised, Unsupervised, Reinforcement Learning", "The difference is the kind of 'signal' the model learns from", "Choosing the family depends on your data and goal"], formula: "Supervised • Unsupervised • Reinforcement" },
    { kicker: "Supervised", title: "Supervised Learning",
      points: ["Learns from LABELLED data: input → known output pairs", "Classification predicts categories: spam/not-spam, disease/healthy", "Regression predicts numbers: house price, marks, temperature", "Like a student learning with an answer key"], formula: "Labelled data → classification or regression" },
    { kicker: "Unsupervised", title: "Unsupervised Learning",
      points: ["NO labels — the model finds hidden structure on its own", "Clustering groups similar items: customer segments, news topics", "Dimensionality reduction simplifies data while keeping the signal", "Like sorting a pile of mixed clothes without being told the categories"], formula: "Unlabelled data → clusters" },
    { kicker: "Reinforcement", title: "Reinforcement Learning",
      points: ["An AGENT learns by acting in an ENVIRONMENT and receiving rewards/penalties", "Trial and error over many attempts → best policy", "Examples: game-playing AI (chess, AlphaGo), robot walking, ad placement", "Goal: maximise total reward"], formula: "Action → reward → better policy" },
  ],
  mindmap: { central: "Types of ML",
    branches: [
      { label: "Supervised", color: "#1a73e8", children: ["Labelled data", "Classification", "Regression", "Spam filter"] },
      { label: "Unsupervised", color: "#e37400", children: ["No labels", "Clustering", "Customer segments", "Topic grouping"] },
      { label: "Reinforcement", color: "#146c2e", children: ["Agent + environment", "Rewards", "Games & robots", "Trial and error"] },
    ] },
  notes: [
    "Supervised subtypes: <b>classification (categories)</b> vs <b>regression (numbers)</b> — a favourite 1-marker.",
    "Unsupervised example from the book: grouping <b>customers by shopping habits</b>.",
    "Reinforcement vocabulary: <b>agent, environment, action, reward, policy</b>.",
    "Training vs testing data: supervised models are <b>trained on labelled data, tested on unseen data</b>.",
  ],
  quiz: [
    { q: "Predicting tomorrow's temperature (a number) is:", options: ["Classification", "Regression", "Clustering", "Reinforcement"], answer: 1, why: "Regression predicts continuous numeric values." },
    { q: "Grouping similar news articles without labels is:", options: ["Supervised learning", "Clustering (unsupervised)", "Regression", "Reward-based"], answer: 1, why: "Finding groups in unlabelled data = clustering." },
    { q: "AlphaGo learned to play Go mainly through:", options: ["Reading rules", "Reinforcement learning", "Clustering", "Manual programming"], answer: 1, why: "It improved by playing millions of games and maximising rewards." },
  ],
  pyq: [
    "Explain the three types of machine learning with one example each. (5m)",
    "Differentiate classification and regression. (2m)",
  ],
},

"ai-6-2": {
  slides: [
    { kicker: "Part B • U2", title: "Types of Deep Learning",
      points: ["Deep learning = neural networks with many hidden layers that learn features automatically", "'Deep' = number of layers between input and output", "Best when data is huge and patterns are complex (images, speech, text)"], formula: "Many layers → deep features" },
    { kicker: "Architectures", title: "The Famous Families",
      points: ["CNN (Convolutional NN): images and video — vision tasks", "RNN / LSTM: sequences — text, speech, time series", "GANs: generate new data — deepfakes, art, synthetic faces", "Transformers: today's LLMs (ChatGPT) — attention-based"], formula: "CNN: vision • RNN: sequences • Transformers: LLMs" },
    { kicker: "Feature", title: "Automatic Feature Learning",
      points: ["Layer 1 learns edges, layer 2 shapes, deeper layers learn objects", "No manual feature engineering needed — the network discovers what matters", "This is deep learning's superpower vs classic ML", "Classic ML: humans pick features; DL: network picks them"], formula: "Edges → shapes → objects" },
    { kicker: "Needs", title: "What Deep Learning Needs",
      points: ["Large amounts of data (thousands to millions of examples)", "Powerful hardware: GPUs/TPUs", "Longer training time and energy", "Careful evaluation — bigger isn't automatically fairer or better"], formula: "Big data + GPU + time" },
  ],
  mindmap: { central: "Deep Learning",
    branches: [
      { label: "CNN", color: "#1a73e8", children: ["Images/video", "Convolution + pooling", "Face unlock"] },
      { label: "RNN/LSTM", color: "#e37400", children: ["Sequences", "Text & speech", "Memory of past inputs"] },
      { label: "GAN/Transformers", color: "#9334e6", children: ["Generators", "Deepfakes & art", "LLMs: ChatGPT"] },
      { label: "Requirements", color: "#146c2e", children: ["Huge datasets", "GPUs", "Auto features"] },
    ] },
  notes: [
    "The layer-by-layer example: <b>edges → textures → parts → faces</b> — quote it in answers.",
    "CNN for images, <b>RNN for sequences</b> is the standard 1-mark pair.",
    "Deep learning is still <b>machine learning</b> — just with deep neural networks.",
    "Warning: deepfakes (GANs) are a misuse of DL — link to AI ethics.",
  ],
  quiz: [
    { q: "Which architecture is best for image recognition?", options: ["RNN", "CNN", "LSTM", "Linear regression"], answer: 1, why: "Convolutional Neural Networks specialise in images." },
    { q: "'Deep' in deep learning refers to:", options: ["Data size", "Number of layers", "GPU depth", "Code length"], answer: 1, why: "Many hidden layers between input and output." },
  ],
  pyq: [
    "What is deep learning? How is it different from classical ML? (3m)",
    "Name any two deep learning architectures and their use. (2m)",
  ],
},

"ai-6-3": {
  slides: [
    { kicker: "Part B • U2", title: "Artificial Neural Networks",
      points: ["ANN = a web of artificial 'neurons' inspired by the human brain", "Each neuron: takes inputs × weights, adds bias, passes through an activation function", "Layers: input layer → hidden layer(s) → output layer"], formula: "Output = activation(Σ(weights × inputs) + bias)" },
    { kicker: "Neuron", title: "Inside One Artificial Neuron",
      points: ["Inputs (x₁, x₂…) are the features", "Weights (w₁, w₂…) show each input's importance — learned during training", "Bias shifts the result; activation decides whether/how strongly the neuron fires", "Common activations: step, sigmoid, ReLU"], formula: "z = x₁w₁ + x₂w₂ + … + b" },
    { kicker: "Training", title: "How a Network Learns",
      points: ["Forward pass: prediction from current weights", "Loss: how wrong the prediction is (vs the true label)", "Backpropagation + gradient descent: adjust weights to reduce loss", "Repeat over many epochs → the network improves"], formula: "Predict → measure loss → adjust → repeat" },
    { kicker: "Structure", title: "Simple Example — Personality Prediction",
      points: ["Book example: predict personality traits from answers (Big Five model)", "Inputs = survey answers; output = trait scores", "More neurons and layers capture more complex patterns", "A trained network generalises to new people's answers"], formula: "Inputs → hidden layers → trait output" },
  ],
  mindmap: { central: "Neural Networks",
    branches: [
      { label: "Structure", color: "#1a73e8", children: ["Input/hidden/output layers", "Weights + bias", "Activation (ReLU, sigmoid)"] },
      { label: "Training", color: "#e37400", children: ["Forward pass", "Loss", "Backpropagation", "Gradient descent"] },
      { label: "Inspiration", color: "#146c2e", children: ["Brain neurons", "Signals fire", "Learn by repetition"] },
      { label: "Example", color: "#9334e6", children: ["Big Five personality", "Survey → traits"] },
    ] },
  flowchart: [
    { title: "Inputs × weights", desc: "features multiplied by their weights" },
    { title: "Add bias, activate", desc: "sum + bias → activation function fires" },
    { title: "Forward through layers", desc: "hidden layers transform, output layer predicts" },
    { title: "Compare with truth", desc: "loss = size of the error", type: "decision" },
    { title: "Backpropagate & update", desc: "weights adjusted — repeat until loss is small", type: "result" },
  ],
  notes: [
    "Write the neuron formula in answers: <b>output = f(Σwx + b)</b>.",
    "Weights store the learning; <b>training = finding good weights</b>.",
    "Activation functions add <b>non-linearity</b> — without them the network could only learn straight lines.",
    "One epoch = one full pass through the training data.",
    "Too much training on the same data → <b>overfitting</b> (great in practice tests, poor in real exams).",
  ],
  quiz: [
    { q: "The strength of connection between two neurons is the:", options: ["Bias", "Weight", "Epoch", "Loss"], answer: 1, why: "Weights scale inputs and are adjusted during learning." },
    { q: "Backpropagation is used to:", options: ["Push data forward", "Adjust weights to reduce loss", "Delete neurons", "Normalise inputs"], answer: 1, why: "It propagates the error backwards to update weights." },
  ],
  pyq: [
    "Draw and explain an artificial neuron (inputs, weights, bias, activation). (4m)",
    "Explain how a neural network is trained. (3m)",
  ],
},

/* ===== PART B • UNIT 3 — EVALUATING MODELS ===== */

"ai-7-0": {
  slides: [
    { kicker: "Part B • U3", title: "Need of Model Evaluation",
      points: ["After training, we must ask: does the model actually work on NEW data?", "A model that only memorises training data is useless in the real world", "Evaluation = testing the trained model with data it has never seen"], formula: "Train on known, test on unknown" },
    { kicker: "Overfitting", title: "The Overfitting Trap",
      points: ["Overfitting: model memorises training data including its noise", "Symptom: 99% accuracy in training, poor results in real life", "Like a student who memorises answers but can't solve new questions", "Prevention: more diverse data, simpler models, validation"], formula: "Memorising ≠ learning" },
    { kicker: "Purpose", title: "What Evaluation Tells Us",
      points: ["Whether the model truly learned patterns (vs memorised)", "Which of several candidate models performs best", "Where it fails — which classes, which cases", "Whether it is ready for deployment"], formula: "Evaluate → improve → deploy" },
    { kicker: "Method", title: "Train–Test Split",
      points: ["Divide the dataset: ~70-80% train, 20-30% test", "Model learns ONLY from the train set", "Test set stays unseen until evaluation — this simulates the real world", "Prediction vs Reality: compare model output with the true answer"], formula: "70% train • 30% test" },
  ],
  mindmap: { central: "Why Evaluate?",
    branches: [
      { label: "Reasons", color: "#1a73e8", children: ["Check real learning", "Compare models", "Find failures", "Deploy decision"] },
      { label: "Overfitting", color: "#c5221f", children: ["Memorises noise", "Fails on new data", "More data helps"] },
      { label: "Method", color: "#e37400", children: ["Train/test split", "Unseen test data", "Prediction vs reality"] },
    ] },
  notes: [
    "Overfitting one-liner: <b>excellent on training, weak on testing</b>.",
    "The test set is used <b>only once</b> — repeated testing on it leaks information.",
    "Prediction = model's output; <b>Reality = the true answer</b> — evaluation compares the two.",
    "Evaluation is stage 5 of the AI project cycle, between modelling and deployment.",
  ],
  quiz: [
    { q: "Overfitting means:", options: ["Model fails on training data", "Model memorises training data but fails on new data", "Model is too simple", "Training was too fast"], answer: 1, why: "It memorises instead of generalising." },
    { q: "The test dataset must be:", options: ["Used during training", "Unseen by the model until evaluation", "Smaller than 1%", "The same as train data"], answer: 1, why: "Unseen test data simulates real-world performance." },
  ],
  pyq: [
    "Why is model evaluation needed? (2m)",
    "What is overfitting? How can it be reduced? (3m)",
  ],
},

"ai-7-1": {
  slides: [
    { kicker: "Part B • U3", title: "Importance of Model Evaluation",
      points: ["Evaluation turns 'I think it works' into 'here is the proof'", "It builds trust: users, doctors, banks need numbers, not promises", "High-stakes fields (health, finance, safety) cannot deploy unmeasured models"], formula: "Measured = trusted" },
    { kicker: "Fairness", title: "Accuracy Is Not Enough",
      points: ["A model can be accurate overall but unfair to a group", "Example: 99% accuracy if it always says 'no disease' in a rare-disease dataset — yet it catches zero patients!", "Evaluation must check performance per class and per group", "Ethical AI demands fair evaluation, not just high scores"], formula: "Check the average AND the groups" },
    { kicker: "Decisions", title: "What Evaluation Decides",
      points: ["Deploy or not: is the model good enough for real use?", "Which model: compare kNN vs decision tree vs neural net", "Improvement: which errors to fix next (data? features? algorithm?)", "Monitoring: real-world performance must keep matching test scores"], formula: "Score → decision → action" },
    { kicker: "Stakeholders", title: "Who Benefits?",
      points: ["Developers: know what to improve", "Users: get reliable products", "Companies: avoid losses and reputation damage", "Society: safe, fair technology"], formula: "Good evaluation protects everyone" },
  ],
  mindmap: { central: "Importance of Evaluation",
    branches: [
      { label: "Trust", color: "#1a73e8", children: ["Proof by numbers", "Reliability", "High-stakes fields"] },
      { label: "Fairness", color: "#c5221f", children: ["Per-group checks", "Rare class traps", "Ethical AI"] },
      { label: "Decisions", color: "#e37400", children: ["Deploy or not", "Choose best model", "Guide improvements"] },
      { label: "Everyone wins", color: "#146c2e", children: ["Developers", "Users", "Companies", "Society"] },
    ] },
  notes: [
    "The 'always negative' model example shows why <b>accuracy alone can mislead</b>.",
    "Evaluation is repeated at intervals <b>after deployment</b> too — data drifts over time.",
    "Boards and regulators increasingly demand <b>documented evaluation</b> for AI products.",
    "Link chapters: evaluation metrics (next chapters) are the TOOLS; this chapter is the WHY.",
  ],
  quiz: [
    { q: "A model with 99% accuracy that never detects a rare disease shows:", options: ["Overfitting only", "Why accuracy alone can mislead", "Perfect model", "Good fairness"], answer: 1, why: "The class imbalance makes accuracy look great while the model fails its purpose." },
    { q: "Evaluation helps developers by:", options: ["Hiding errors", "Showing what to improve", "Increasing bias", "Skipping testing"], answer: 1, why: "Error analysis guides the next round of fixes." },
  ],
  pyq: [
    "Why is evaluation important before deploying an AI model? (3m)",
    "Explain with an example why accuracy is not always enough. (3m)",
  ],
},

"ai-7-2": {
  slides: [
    { kicker: "Part B • U3", title: "Evaluating Model's Performance",
      points: ["The core idea: run the model on test data and compare PREDICTION with REALITY", "Each test case gives one of four outcomes (the confusion matrix)", "Performance = how the outcomes are distributed"], formula: "Prediction vs Reality" },
    { kicker: "Process", title: "Step-by-Step Evaluation",
      points: ["Step 1: keep aside labelled test data (inputs + true answers)", "Step 2: feed inputs to the trained model → get predictions", "Step 3: compare predictions with reality, outcome by outcome", "Step 4: count TP, TN, FP, FN and compute metrics"], formula: "Test → predict → compare → count" },
    { kicker: "Example", title: "Spam Filter Example",
      points: ["TP: spam predicted, actually spam ✓", "TN: not-spam predicted, actually not-spam ✓", "FP: spam predicted, but it was real mail ✗ (annoying!)", "FN: not-spam predicted, but it WAS spam ✗ (dangerous!)", "Different errors cost differently — metrics must reflect that"], formula: "TP TN = right • FP FN = wrong" },
    { kicker: "Beyond one run", title: "Robust Evaluation",
      points: ["Use a large, representative test set — not a handful of easy cases", "Test across different groups (ages, genders, regions)", "Repeat with random splits (cross-validation) for stability", "Report ALL relevant metrics, not just the best one"], formula: "Big test set + per-group + repeat" },
  ],
  flowchart: [
    { title: "Trained model ready", desc: "weights fixed after training" },
    { title: "Feed test inputs", desc: "data the model has never seen" },
    { title: "Model predicts", desc: "spam or not-spam for each mail" },
    { title: "Compare with reality", desc: "true labels from the test set", type: "decision" },
    { title: "Count outcomes", desc: "TP, TN, FP, FN → metrics", type: "result" },
  ],
  notes: [
    "Remember the pair: <b>Prediction (model's answer)</b> vs <b>Reality (true answer)</b>.",
    "In medical tests, <b>FN is the worst error</b> (missed disease); in spam filters, FP annoys users — context decides which metric matters.",
    "A 'large and representative' test set covers <b>all classes and groups</b>.",
    "Cross-validation rotates the test slice through the whole dataset — more reliable scores.",
  ],
  quiz: [
    { q: "In a spam filter, a REAL email wrongly marked as spam is:", options: ["True Positive", "False Positive", "True Negative", "False Negative"], answer: 1, why: "The prediction (spam) is positive but false — FP." },
    { q: "'Reality' in evaluation means:", options: ["The model's output", "The true answer from labelled data", "The training loss", "The user's hope"], answer: 1, why: "Reality is the ground-truth label; prediction is compared against it." },
  ],
  pyq: [
    "Explain the process of evaluating a model's performance. (4m)",
    "What is the train-test split? Why is it used? (2m)",
  ],
},

"ai-7-3": {
  slides: [
    { kicker: "Part B • U3", title: "Accuracy and Error",
      points: ["The confusion matrix counts the four outcomes of a classifier", "Accuracy = correct predictions ÷ total predictions", "Error = 1 − accuracy: the fraction you got wrong"], formula: "Accuracy = (TP+TN)/(TP+TN+FP+FN)" },
    { kicker: "Matrix", title: "The Confusion Matrix",
      points: ["Rows: predicted class • Columns: actual (reality) class", "TP: predicted YES, actually YES", "TN: predicted NO, actually NO", "FP: predicted YES, actually NO (Type I error)", "FN: predicted NO, actually YES (Type II error)"], formula: "TP • TN • FP • FN" },
    { kicker: "Accuracy", title: "Computing Accuracy",
      points: ["Accuracy answers: out of all cases, how many did the model classify correctly?", "Example: 100 test cases → 8 TP, 85 TN, 4 FP, 3 FN → accuracy = 93/100 = 93%", "Error rate = 7/100 = 7%"], formula: "Error = (FP+FN)/total = 1 − accuracy" },
    { kicker: "Limits", title: "When Accuracy Lies",
      points: ["Imbalanced data: 95 'no' and 5 'yes' cases", "A dumb model that always says 'no' scores 95% accuracy — catching none of the 5!", "That's why we need precision, recall and F1 (next chapter)", "Rule: report accuracy WITH class-wise metrics"], formula: "Imbalanced data? Accuracy alone lies" },
  ],
  mindmap: { central: "Accuracy & Error",
    branches: [
      { label: "Confusion matrix", color: "#1a73e8", children: ["TP, TN", "FP (Type I)", "FN (Type II)", "Predicted vs actual"] },
      { label: "Accuracy", color: "#146c2e", children: ["(TP+TN)/total", "Overall correctness"] },
      { label: "Error", color: "#c5221f", children: ["(FP+FN)/total", "1 − accuracy"] },
      { label: "Warning", color: "#e37400", children: ["Imbalanced data", "Dumb 95% model", "Use more metrics"] },
    ] },
  examples: [
    { title: "Accuracy from a confusion matrix",
      steps: ["TP = 40, TN = 45, FP = 8, FN = 7 (total = 100)", "Correct = TP + TN = 40 + 45 = 85", "Accuracy = 85/100 = 0.85", "Error = 1 − 0.85 = 0.15"],
      answer: "Accuracy 85%, Error 15%" },
    { title: "The imbalanced-data trap",
      steps: ["100 patients: 95 healthy, 5 diseased", "Model predicts 'healthy' for everyone", "TP = 0, TN = 95, FP = 0, FN = 5", "Accuracy = 95/100 = 95% — but zero diseased patients caught!"],
      answer: "High accuracy, useless model → need recall" },
  ],
  notes: [
    "Draw the 2×2 confusion matrix with axes <b>Predicted vs Reality</b> — practice labelling TP/TN/FP/FN.",
    "Type I = FP (false alarm); <b>Type II = FN (missed case)</b> — usually more dangerous.",
    "Accuracy question pattern: they give 4 numbers → apply <b>(TP+TN)/total</b>.",
    "Imbalanced data is common in fraud/disease detection — recall saves lives there.",
  ],
  quiz: [
    { q: "TP=30, TN=50, FP=10, FN=10. Accuracy?", options: ["30%", "50%", "80%", "90%"], answer: 2, why: "(30+50)/100 = 80%." },
    { q: "FN is also called:", options: ["False alarm", "Type I error", "Type II error (miss)", "Precision"], answer: 2, why: "A missed positive case — Type II error." },
  ],
  pyq: [
    "What is the confusion matrix? Explain TP, TN, FP, FN. (4m)",
    "A model has TP=60, TN=25, FP=10, FN=5. Find accuracy and error. (3m)",
  ],
},

"ai-7-4": {
  slides: [
    { kicker: "Part B • U3", title: "Evaluation Metrics for Classification",
      points: ["Three key metrics beyond accuracy: Precision, Recall, F1 Score", "Each metric answers a different question about model quality", "Pick the metric that matches the cost of errors in YOUR problem"], formula: "Precision • Recall • F1" },
    { kicker: "Precision", title: "Precision — Of the alarms, how many were real?",
      points: ["Precision = TP / (TP + FP)", "Question: when the model says YES, how often is it right?", "High precision = few false alarms", "Matters when a false alarm is costly (spam filter blocking real mail)"], formula: "Precision = TP/(TP+FP)" },
    { kicker: "Recall", title: "Recall — Of the real cases, how many did we catch?",
      points: ["Recall = TP / (TP + FN) — also called sensitivity or true positive rate", "Question: of all actual positives, how many did the model find?", "High recall = few missed cases", "Matters when missing a case is costly (cancer detection, fraud)"], formula: "Recall = TP/(TP+FN)" },
    { kicker: "F1", title: "F1 Score — The Balance",
      points: ["F1 = harmonic mean of precision and recall", "F1 = 2 × (Precision × Recall) / (Precision + Recall)", "High F1 needs BOTH precision and recall to be high", "Best single number for imbalanced data"], formula: "F1 = 2PR/(P+R)" },
  ],
  mindmap: { central: "Classification Metrics",
    branches: [
      { label: "Precision", color: "#1a73e8", children: ["TP/(TP+FP)", "Few false alarms", "Spam filter case"] },
      { label: "Recall", color: "#c5221f", children: ["TP/(TP+FN)", "Few misses", "Cancer detection case"] },
      { label: "F1 Score", color: "#146c2e", children: ["Harmonic mean", "Balances both", "Imbalanced data"] },
      { label: "Choice", color: "#e37400", children: ["Alarm costly → precision", "Miss costly → recall", "Both matter → F1"] },
    ] },
  examples: [
    { title: "Precision and recall from the matrix",
      steps: ["TP = 40, FP = 10, FN = 5, TN = 45", "Precision = 40/(40+10) = 0.80", "Recall = 40/(40+5) = 0.89", "F1 = 2(0.80×0.89)/(0.80+0.89) = 0.84"],
      answer: "Precision 80%, Recall 89%, F1 ≈ 84%" },
    { title: "Which metric for a cancer screener?",
      steps: ["Missing a patient (FN) can cost a life", "A false alarm (FP) only leads to one more test", "So optimise RECALL = TP/(TP+FN)"],
      answer: "Recall — catch every possible case" },
  ],
  notes: [
    "Precision vs recall one-liners: <b>'of the alarms, how many real?'</b> vs <b>'of the real, how many caught?'</b>",
    "Recall is also called <b>sensitivity / TPR</b>.",
    "F1 uses the <b>harmonic mean</b> — punishing whichever of P/R is low.",
    "Exam pattern: given TP/FP/FN, compute all three metrics — practise until automatic.",
  ],
  quiz: [
    { q: "TP=20, FP=5. Precision =", options: ["0.5", "0.8", "0.2", "0.25"], answer: 1, why: "20/(20+5) = 0.8." },
    { q: "For a cancer-detection model, the metric to maximise is:", options: ["Precision only", "Recall", "FP count", "Training loss"], answer: 1, why: "Missing a true case (FN) is the costliest error → maximise recall." },
    { q: "F1 score is the ______ of precision and recall.", options: ["Arithmetic mean", "Geometric mean", "Harmonic mean", "Sum"], answer: 2, why: "Harmonic mean punishes imbalance between the two." },
  ],
  pyq: [
    "Define precision, recall and F1 score with formulas. (5m)",
    "TP=50, FP=10, FN=20. Compute precision and recall. (3m)",
  ],
},

"ai-7-5": {
  slides: [
    { kicker: "Part B • U3", title: "Ethical Concerns Around Model Evaluation",
      points: ["Evaluation is not just maths — it is a moral checkpoint", "Bad or dishonest evaluation can hide bias, danger and discrimination", "Ethical evaluation = honest, transparent, fair and accountable"], formula: "Honest • Transparent • Fair • Accountable" },
    { kicker: "Honesty", title: "Honest Reporting",
      points: ["Cherry-picking: reporting only the best run or easiest test set = deception", "Hiding known failures (e.g., poor accuracy on a group) is unethical", "Report metrics with their limits and context", "Independent auditing builds trust"], formula: "Report the whole truth" },
    { kicker: "Fairness", title: "Fairness Across Groups",
      points: ["Check metrics per group: gender, skin tone, region, language, income", "A model with 95% overall accuracy may drop to 60% for one community", "Deploying it anyway = digital discrimination", "Fair evaluation may reveal the need for better, more diverse data"], formula: "Per-group metrics expose bias" },
    { kicker: "Accountability", title: "Who Answers When AI Fails?",
      points: ["A wrong medical prediction: responsibility of developer, hospital, or data?", "Keep records: data used, versions, metrics, decisions — audit trails", "Humans must stay in the loop for high-stakes decisions", "Continuous monitoring after deployment — evaluation never really ends"], formula: "Document + monitor + human oversight" },
  ],
  mindmap: { central: "Ethical Evaluation",
    branches: [
      { label: "Honesty", color: "#1a73e8", children: ["No cherry-picking", "Disclose failures", "Independent audit"] },
      { label: "Fairness", color: "#c5221f", children: ["Per-group metrics", "Expose bias", "Diverse data"] },
      { label: "Accountability", color: "#e37400", children: ["Audit trails", "Human in loop", "Post-deploy monitoring"] },
      { label: "Goal", color: "#146c2e", children: ["Trustworthy AI", "Protect the vulnerable"] },
    ] },
  notes: [
    "Cherry-picked results have caused real scandals — <b>honesty is a professional duty</b>.",
    "A single overall number can hide <b>group-level failure</b> — always slice the metrics.",
    "High-stakes domains (health, policing, hiring) need <b>human oversight</b> before final decisions.",
    "Keep an <b>audit trail</b>: dataset version, parameters, results — science must be reproducible.",
  ],
  quiz: [
    { q: "Reporting only the model's best test run is:", options: ["Good practice", "Cherry-picking (unethical)", "Required by law", "Cross-validation"], answer: 1, why: "Selective reporting misleads users about real performance." },
    { q: "Fair evaluation requires checking metrics:", options: ["Only overall", "Only on training data", "Per group (gender, region, etc.)", "Once a year"], answer: 2, why: "Group-wise metrics reveal hidden discrimination." },
  ],
  pyq: [
    "List any three ethical concerns in model evaluation. (3m)",
    "Why should high-stakes AI decisions keep a human in the loop? (2m)",
  ],
},

};
