/* AI — KIPS CBSE 417, Part B Units 4–5: Statistical Data (ai-8), Computer Vision (ai-9). */
import type { ChapterDetail } from "./types";

export const AI_PARTB2: Record<string, ChapterDetail> = {

/* ===== PART B • UNIT 4 — STATISTICAL DATA ===== */

"ai-8-0": {
  slides: [
    { kicker: "Part B • U4", title: "Common Terminologies Used with Data",
      points: ["Data = raw facts and figures (numbers, text, images) collected for a purpose", "Dataset = a structured collection of records; Record = one row (one instance); Field/Attribute = one column (one property)", "Structured data: tables with rows and columns; Unstructured: free text, images, audio, video"], formula: "Dataset = records × fields" },
    { kicker: "Big Data", title: "The V's of Big Data",
      points: ["Volume: massive size (terabytes+)", "Velocity: generated at great speed (sensor streams, social media)", "Variety: many formats — text, images, logs, video", "(Extra Vs: Veracity = trustworthiness, Value)"], formula: "Volume • Velocity • Variety" },
    { kicker: "Types", title: "Data Types for Analysis",
      points: ["Numeric: continuous (height 152.3 cm) vs discrete (number of siblings: 3)", "Categorical: nominal (city, gender) vs ordinal (rank, grade A/B/C)", "Time-series: values recorded over time (daily temperature)", "Labelled vs unlabelled data (supervised learning needs labels!)"], formula: "Numeric • Categorical • Time-series" },
    { kicker: "Quality", title: "Good Data vs Bad Data",
      points: ["Good: accurate, complete, relevant, timely, unbiased", "Bad: errors, duplicates, missing values, outdated, biased sampling", "Garbage In, Garbage Out (GIGO) — bad data ruins the best model", "Data cleaning: fix/remove errors before use"], formula: "GIGO: clean data first" },
  ],
  mindmap: { central: "Data Terminologies",
    branches: [
      { label: "Basics", color: "#1a73e8", children: ["Data, dataset", "Record (row), field (column)", "Structured vs unstructured"] },
      { label: "Big Data", color: "#e37400", children: ["Volume", "Velocity", "Variety", "Veracity, Value"] },
      { label: "Types", color: "#146c2e", children: ["Numeric: discrete/continuous", "Categorical: nominal/ordinal", "Time-series", "Labelled vs unlabelled"] },
      { label: "Quality", color: "#c5221f", children: ["Accurate, complete", "No bias", "GIGO"] },
    ] },
  notes: [
    "Exam one-liner: <b>record = row, field/attribute = column</b>.",
    "The 3 classic Vs are enough for 3 marks; add <b>Veracity & Value</b> for extra credit.",
    "Height = <b>continuous</b>; number of brothers = <b>discrete</b>; blood group = <b>nominal</b>; medal (gold/silver) = <b>ordinal</b>.",
    "GIGO is a favourite short question — <b>clean data beats clever models</b>.",
  ],
  quiz: [
    { q: "In a student table, one ROW is called a:", options: ["Field", "Record", "Label", "Class"], answer: 1, why: "A record holds all the data of one instance." },
    { q: "Which is NOT one of the 3 main V's of big data?", options: ["Volume", "Velocity", "Variety", "Vocabulary"], answer: 3, why: "The classic three are Volume, Velocity, Variety." },
    { q: "'Shoe size 8' is what type of data?", options: ["Continuous", "Discrete numeric", "Time-series", "Unstructured"], answer: 1, why: "It takes countable fixed values — discrete." },
  ],
  pyq: [
    "Define dataset, record and field with an example table. (3m)",
    "Explain the V's of big data. (3m)",
  ],
},

"ai-8-1": {
  slides: [
    { kicker: "Part B • U4", title: "Introduction to Data Science",
      points: ["Data Science = extracting knowledge, insights and predictions from data", "It blends statistics + programming + domain knowledge + visualisation", "A data scientist asks: what question, which data, what pattern, what action?"], formula: "Question → Data → Insight → Action" },
    { kicker: "Pipeline", title: "The Data Science Workflow",
      points: ["Ask: define the problem precisely", "Collect: surveys, sensors, open data", "Clean: fix errors, missing values, duplicates", "Explore & visualise: charts reveal patterns", "Model & evaluate: predict, measure, improve", "Communicate: dashboards and reports for decisions"], formula: "Ask → Collect → Clean → Explore → Model → Communicate" },
    { kicker: "People", title: "Who Works with Data?",
      points: ["Data analyst: explores and reports what happened", "Data scientist: builds predictive models", "Data engineer: builds the pipes that move and store data", "All three roles work together in real projects"], formula: "Analyst: what • Scientist: what next • Engineer: how" },
    { kicker: "Mindset", title: "Thinking Like a Data Scientist",
      points: ["Curiosity: ask sharp questions of the data", "Scepticism: is this pattern real or a coincidence?", "Ethics: respect privacy, check bias, report honestly", "Communication: insights must reach decision-makers clearly"], formula: "Curious + sceptical + ethical + clear" },
  ],
  mindmap: { central: "Data Science",
    branches: [
      { label: "Definition", color: "#1a73e8", children: ["Knowledge from data", "Stats + code + domain", "Predictions & insight"] },
      { label: "Workflow", color: "#e37400", children: ["Ask & collect", "Clean", "Explore & visualise", "Model & communicate"] },
      { label: "Roles", color: "#146c2e", children: ["Analyst", "Scientist", "Engineer"] },
      { label: "Mindset", color: "#9334e6", children: ["Curious", "Sceptical", "Ethical", "Clear"] },
    ] },
  notes: [
    "The workflow mirrors the <b>AI project cycle</b> — data science is its data heart.",
    "Remember: <b>80% of a data scientist's time goes into cleaning data</b> (a famous industry truth).",
    "Visualisation is a language: <b>one good chart beats a page of numbers</b>.",
    "Insight without communication = no impact — practise explaining findings simply.",
  ],
  quiz: [
    { q: "Data science combines statistics, programming and:", options: ["Only hardware", "Domain knowledge", "Journalism only", "Marketing only"], answer: 1, why: "Domain knowledge tells you which questions and patterns matter." },
    { q: "The FIRST step of the data science workflow is:", options: ["Build a model", "Ask a clear question", "Publish a dashboard", "Buy a GPU"], answer: 1, why: "A sharp question defines what data to collect and how to analyse." },
  ],
  pyq: [
    "What is data science? Write its workflow steps. (4m)",
    "Differentiate a data analyst from a data scientist. (2m)",
  ],
},

"ai-8-2": {
  slides: [
    { kicker: "Part B • U4", title: "Applications of Data Science",
      points: ["Data science powers decisions in almost every field today", "Pattern: collect domain data → find patterns → predict/optimise → act", "Same pipeline, different questions in each industry"], formula: "Data + domain = decisions" },
    { kicker: "Daily Life", title: "Around You Every Day",
      points: ["Recommendations: Netflix, YouTube, Amazon 'you may also like'", "Navigation: Google Maps live traffic and ETA prediction", "Finance: fraud detection on cards, credit scoring", "Cricket & sports: win probability, player analytics, auction pricing"], formula: "Watch, travel, pay, play — all data" },
    { kicker: "Public Good", title: "Health, Weather and Government",
      points: ["Healthcare: disease outbreak tracking, hospital resource planning, medical imaging analytics", "Weather: forecasting from satellite and sensor data", "Agriculture: crop price and yield prediction", "Governance: Covid dashboards, voter analytics, city planning (smart cities)"], formula: "Data for good" },
    { kicker: "Careers", title: "Data Science Careers",
      points: ["Data analyst, data scientist, data engineer, ML engineer, BI developer", "Every industry hires: banks, hospitals, e-commerce, sports, government", "Skills: statistics, Python/SQL, visualisation, storytelling", "One of the fastest-growing career paths in the world"], formula: "Analyst → Scientist → Engineer → ML Engineer" },
  ],
  mindmap: { central: "Data Science Applications",
    branches: [
      { label: "Daily life", color: "#1a73e8", children: ["Recommendations", "Maps & ETA", "Fraud detection", "Sports analytics"] },
      { label: "Public good", color: "#146c2e", children: ["Outbreak tracking", "Weather forecast", "Crop prediction", "Smart cities"] },
      { label: "Business", color: "#e37400", children: ["Sales forecasting", "Customer segments", "Pricing", "Ads targeting"] },
      { label: "Careers", color: "#9334e6", children: ["Analyst/Scientist", "ML engineer", "Python + SQL + stats"] },
    ] },
  notes: [
    "Learn one example per field: <b>Netflix (entertainment), Maps (transport), cards (finance), Covid dashboard (governance)</b>.",
    "Recommendation engines study YOUR watch/purchase history — link back to <b>data privacy</b>.",
    "IPL win-prediction is the KIPS book's favourite data science example.",
    "Weather forecasting combines <b>satellite images + historical data + simulation</b>.",
  ],
  quiz: [
    { q: "Google Maps predicting your ETA uses:", options: ["NLP", "Data science on live traffic data", "Computer vision only", "Manual guessing"], answer: 1, why: "Historical + live traffic data feed the prediction model." },
    { q: "Detecting a fraudulent card transaction is an application of data science in:", options: ["Agriculture", "Finance", "Sports", "Weather"], answer: 1, why: "Banks model spending patterns to flag odd transactions." },
  ],
  pyq: [
    "Write any four applications of data science in daily life. (4m)",
    "How does data science help in healthcare? (2m)",
  ],
},

"ai-8-3": {
  slides: [
    { kicker: "Part B • U4", title: "Introduction to Orange Data Mining",
      points: ["Orange = an open-source, NO-CODE data mining and visualisation tool", "Build workflows by dragging and connecting WIDGETS (visual blocks)", "Used for machine learning, data visualisation and evaluation without programming"], formula: "Drag widgets → connect → run" },
    { kicker: "Widgets", title: "Building a Workflow",
      points: ["File widget: load a dataset (CSV, Excel)", "Data Table: view records; Select Rows: filter", "Visualise: Scatter Plot, Box Plot, Distributions, Bar Chart, Heat Map", "Model: kNN, Tree, SVM widgets; Test & Score: evaluate accuracy"], formula: "Load → view → visualise → model → score" },
    { kicker: "Why Orange?", title: "No-Code Power",
      points: ["Students can explore real ML without writing code", "Interactive: change parameters, see results instantly", "Built on Python (PyQt) under the hood — scales to real work", "Great for learning concepts: you SEE the pipeline"], formula: "See the machine learning pipeline" },
    { kicker: "Example", title: "Iris Dataset Walkthrough",
      points: ["Load the famous Iris flower dataset (150 flowers, 4 features, 3 species)", "Scatter plot: petal length vs width shows clear species clusters", "kNN widget: classify flowers; Test & Score shows accuracy (~95%+)", "Confusion Matrix widget: see exactly which flowers were misclassified"], formula: "Iris → scatter → kNN → score" },
  ],
  flowchart: [
    { title: "File widget", desc: "load iris.csv dataset" },
    { title: "Data table & select rows", desc: "inspect and filter records" },
    { title: "Scatter plot", desc: "see the species clusters visually" },
    { title: "kNN / Tree widget", desc: "train a classifier", type: "decision" },
    { title: "Test & Score + confusion matrix", desc: "evaluate accuracy and errors", type: "result" },
  ],
  notes: [
    "Orange is developed in Python at the <b>University of Ljubljana</b> — a viva favourite.",
    "Widget = a block doing one job; <b>links show the data flow</b>.",
    "The Iris dataset is ML's 'hello world': <b>150 records, 4 features, 3 species</b>.",
    "Test & Score + Confusion Matrix widgets connect evaluation theory (Unit 3) to practice.",
  ],
  quiz: [
    { q: "Orange is best described as a:", options: ["Programming language", "No-code visual data mining tool", "Database", "Robot"], answer: 1, why: "You build analyses by connecting widgets, not writing code." },
    { q: "In Orange, a dataset is loaded with the:", options: ["kNN widget", "File widget", "Scatter plot", "Test & Score"], answer: 1, why: "The File widget reads CSV/Excel data into the workflow." },
  ],
  pyq: [
    "What is Orange? Write any four widgets and their uses. (4m)",
    "Explain how you would classify the Iris dataset in Orange. (3m)",
  ],
},

"ai-8-4": {
  slides: [
    { kicker: "Part B • U4", title: "No-code, Low-code and High-code",
      points: ["Three levels of building AI apps, based on how much coding they need", "No-code: drag-and-drop, zero programming (Orange, Teachable Machine, PictoBlox)", "Low-code: minimal code + visual tools; small scripts for custom logic", "High-code: full programming (Python, TensorFlow) — maximum control"], formula: "No code ←→ full control" },
    { kicker: "Compare", title: "The Trade-off Ladder",
      points: ["No-code: fastest to build, limited customisation — great for learning & simple apps", "Low-code: prebuilt blocks + glue code — fast yet flexible", "High-code: complete freedom, best performance — needs skill and time", "Choose by: team skills, time, problem complexity"], formula: "Speed vs flexibility" },
    { kicker: "Examples", title: "Tools at Each Level",
      points: ["No-code: Orange (data science), Teachable Machine (image/audio models), PictoBlox (AI blocks), Canva/Forms (non-AI)", "Low-code: Jupyter with libraries (semi), Scratch+AI extensions", "High-code: Python + NumPy/pandas/scikit-learn/TensorFlow", "All three can solve the SAME problem at different depths"], formula: "Same problem, three doors" },
    { kicker: "Future", title: "Why This Matters",
      points: ["Citizen data scientists: domain experts building AI without coding", "Faster prototyping: test an idea in hours, not months", "High-code still rules research and production systems", "The future = no-code for ideas, high-code for scale"], formula: "Start no-code, scale high-code" },
  ],
  mindmap: { central: "No-code • Low-code • High-code",
    branches: [
      { label: "No-code", color: "#146c2e", children: ["Orange", "Teachable Machine", "PictoBlox", "Fast, limited"] },
      { label: "Low-code", color: "#e37400", children: ["Blocks + scripts", "Prebuilt components"] },
      { label: "High-code", color: "#1a73e8", children: ["Python + libraries", "Full control", "Needs expertise"] },
      { label: "Choice", color: "#9334e6", children: ["Skills & time", "Complexity", "Prototyping vs production"] },
    ] },
  notes: [
    "Definition by code amount: <b>zero code → no-code; some code → low-code; all code → high-code</b>.",
    "Teachable Machine trains an image/sound classifier <b>in the browser in minutes</b> — try it!",
    "Low-code sits between: visual workflow + a <b>little scripting</b> when needed.",
    "No-code democratises AI — <b>more people can build</b>, not just programmers.",
  ],
  quiz: [
    { q: "Teachable Machine is a:", options: ["High-code framework", "No-code tool", "Database", "Compiler"], answer: 1, why: "You train models by uploading examples — no programming." },
    { q: "Which level gives maximum control and customisation?", options: ["No-code", "Low-code", "High-code", "All equal"], answer: 2, why: "Full programming (Python/TensorFlow) removes tool limits." },
  ],
  pyq: [
    "Differentiate no-code, low-code and high-code AI development. (3m)",
    "Name one tool at each level. (3m)",
  ],
},

"ai-8-5": {
  slides: [
    { kicker: "Part B • U4", title: "Statistical Data: Case Walkthrough",
      points: ["Apply the full pipeline to one dataset: student marks of a class", "Steps: question → data → centre & spread → charts → interpretation", "Statistics turn a table of numbers into a story"], formula: "Question → Data → Stats → Chart → Story" },
    { kicker: "Dataset", title: "The Marks Dataset (Hypothetical)",
      points: ["50 students' maths marks out of 100", "Fields: roll no, name, marks, gender, section", "First look: sort data; spot min, max, missing values", "Question: is the class doing well? Which section needs help?"], formula: "Know your columns before your stats" },
    { kicker: "Centre", title: "Measures of Centre",
      points: ["Mean = sum ÷ count — the average", "Median = middle value after sorting — resists outliers", "Mode = most frequent value", "If mean ≠ median much, suspect outliers pulling the mean"], formula: "Mean • Median • Mode" },
    { kicker: "Spread + Charts", title: "Spread and Visualisation",
      points: ["Range = max − min; standard deviation = typical distance from mean", "Histogram: marks distribution (are most 60-80?)", "Box plot: median, quartiles, outliers at a glance", "Bar chart: section-wise averages → which section needs support"], formula: "Range, SD, histogram, box plot" },
  ],
  flowchart: [
    { title: "Ask the question", desc: "Is the class doing well? Which section lags?" },
    { title: "Clean the data", desc: "fix missing/incorrect marks" },
    { title: "Compute statistics", desc: "mean, median, mode, range, SD" },
    { title: "Visualise", desc: "histogram + box plot + section bars" },
    { title: "Interpret & act", desc: "story → remedial classes decision", type: "result" },
  ],
  notes: [
    "Worked numbers: marks 45, 62, 62, 71, 95 → <b>mean 67, median 62, mode 62, range 50</b>.",
    "Outliers: one 5/100 can drag the mean down — <b>median tells the truth</b> then.",
    "Histogram shape words: <b>symmetric, left-skewed, right-skewed</b>.",
    "Every chart needs a <b>title, axis labels and units</b> — communication matters.",
    "End every case study with an <b>action</b>: stats exist to decide, not decorate.",
  ],
  quiz: [
    { q: "Marks: 40, 50, 50, 60, 100. The median is:", options: ["40", "50", "60", "100"], answer: 1, why: "Sorted, the middle (3rd) value is 50." },
    { q: "Which measure is MOST affected by one extreme outlier?", options: ["Median", "Mode", "Mean", "Range only"], answer: 2, why: "The mean is pulled toward extreme values." },
    { q: "A box plot does NOT directly show:", options: ["Median", "Quartiles", "Outliers", "Exact mean"], answer: 3, why: "Box plots show median/quartiles/outliers; the exact mean is not marked." },
  ],
  pyq: [
    "For the data 10, 20, 20, 30, 70: find mean, median, mode. (3m)",
    "Which chart would you use to compare section-wise average marks, and why? (2m)",
  ],
},

/* ===== PART B • UNIT 5 — COMPUTER VISION ===== */

"ai-9-0": {
  slides: [
    { kicker: "Part B • U5", title: "Introduction to Computer Vision",
      points: ["Computer Vision (CV) = the AI domain that lets machines 'see' and understand images/videos", "Goal: extract meaning from pixels — objects, faces, text, motion", "CV is how phones unlock with your face and cars read traffic signs"], formula: "Pixels → meaning" },
    { kicker: "Human vs Machine", title: "Computer Vision vs Human Vision",
      points: ["Humans: instant, effortless understanding built over years of experience", "Machines: see only numbers (pixel values) — must be trained with many examples", "Machines can be faster, tireless, and consistent (24×7 inspection)", "But machines fail on unusual lighting/angles they never saw in training"], formula: "Human: effortless • Machine: trained" },
    { kicker: "Tasks", title: "What Can CV Do?",
      points: ["Classification: 'this photo shows a cat'", "Classification + localisation: 'a cat at the left corner'", "Object detection: 'three cats and a dog, each boxed'", "Instance segmentation: exact pixel outline of each object"], formula: "Classify → localise → detect → segment" },
    { kicker: "Why hard", title: "Why Seeing Is Difficult for Machines",
      points: ["Same object looks totally different in light, angle, occlusion, scale", "A tilted cat, a dark photo, a hidden tail — all 'different' to a naive model", "Solution: massive training data + deep learning (CNNs)", "This is why CV exploded only after big data + GPUs"], formula: "Variation is the villain" },
  ],
  mindmap: { central: "Computer Vision",
    branches: [
      { label: "Definition", color: "#1a73e8", children: ["Machines that see", "Pixels → meaning", "Images + video"] },
      { label: "vs Human vision", color: "#e37400", children: ["Humans: effortless", "Machines: trained", "Machines: tireless 24×7"] },
      { label: "Tasks", color: "#146c2e", children: ["Classification", "Detection", "Segmentation", "Tracking"] },
      { label: "Challenge", color: "#c5221f", children: ["Lighting", "Angles", "Occlusion", "Needs big data"] },
    ] },
  notes: [
    "Camera → pixel grid → numbers → <b>CNN model → label</b>: that's the CV pipeline.",
    "Know the task ladder: <b>classify → localise → detect → segment</b>.",
    "Machines beat humans at <b>speed and repetition</b> (scanning 1000s of X-rays), not creativity.",
    "CV needs examples of every variation — link to <b>data diversity</b> and ethics.",
  ],
  quiz: [
    { q: "Drawing a box around every car in a photo is:", options: ["Classification", "Object detection", "Regression", "Tokenisation"], answer: 1, why: "Detection finds and localises multiple objects." },
    { q: "To a computer, an image is:", options: ["A picture", "A grid of numbers (pixel values)", "A sentence", "A sound wave"], answer: 1, why: "Pixels are stored as numeric intensity values." },
  ],
  pyq: [
    "What is computer vision? How is it different from human vision? (3m)",
    "List the four CV tasks from simple to complex. (4m)",
  ],
},

"ai-9-1": {
  slides: [
    { kicker: "Part B • U5", title: "Applications of Computer Vision",
      points: ["CV runs silently in security, health, farming, shopping and transport", "Pattern: a camera feed + a trained model = real-time decisions", "Each application = a solved problem from the project cycle"], formula: "Camera + model = real-time intelligence" },
    { kicker: "Transport", title: "Self-Driving Cars",
      points: ["Cameras + sensors detect lanes, signs, pedestrians, other cars", "Object detection + distance estimation → steering & braking decisions", "Challenges: rain, night, unusual road events (also ethics!)"], formula: "See → detect → decide" },
    { kicker: "Health + Security", title: "Medicine and Safety",
      points: ["Medical: X-ray/CT/MRI analysis — tumours, fractures, diabetic retinopathy", "Assists doctors: faster, consistent second opinions", "Security: face unlock, attendance systems, surveillance, threat detection", "Agriculture: crop disease from leaf photos, fruit sorting, drone field scans"], formula: "CV saves sight, time and crops" },
    { kicker: "Daily Life", title: "Around You Now",
      points: ["Face unlock & photo album search ('find photos with dogs')", "QR/barcode scanning, OCR (text from images), Google Lens", "Sports: ball tracking (Hawk-Eye in cricket/tennis)", "Industry: quality control on assembly lines — defective parts auto-rejected"], formula: "Scan → search → sort → track" },
  ],
  mindmap: { central: "CV Applications",
    branches: [
      { label: "Transport", color: "#1a73e8", children: ["Self-driving cars", "Lane & sign detection", "Driver alerts"] },
      { label: "Health", color: "#c5221f", children: ["X-ray/MRI analysis", "Early tumour detection", "Retina scans"] },
      { label: "Security", color: "#e37400", children: ["Face unlock", "Surveillance", "Attendance"] },
      { label: "Farming/Industry", color: "#146c2e", children: ["Crop disease", "Fruit sorting", "Defect detection"] },
    ] },
  notes: [
    "Exam set: <b>self-driving (transport), MRI scan (health), face unlock (security), leaf disease (agriculture), Hawk-Eye (sports)</b>.",
    "Google Lens = CV + NLP working together ( recognise image, translate text ).",
    "OCR (optical character recognition) converts image text into editable text.",
    "Industry line inspection shows CV's strength: <b>no fatigue, total consistency</b>.",
  ],
  quiz: [
    { q: "Hawk-Eye in cricket is an application of CV in:", options: ["Agriculture", "Sports", "Banking", "Printing"], answer: 1, why: "It tracks the ball's path with multiple cameras." },
    { q: "Detecting crop disease from leaf photos helps:", options: ["Transport", "Agriculture", "Retail only", "Gaming"], answer: 1, why: "Farmers get early warnings from a single phone photo." },
  ],
  pyq: [
    "Write any four applications of computer vision. (4m)",
    "How does a self-driving car use computer vision? (3m)",
  ],
},

"ai-9-2": {
  slides: [
    { kicker: "Part B • U5", title: "Concepts of Computer Vision",
      points: ["An image = a grid of PIXELS; each pixel has a numeric value", "Resolution = pixels across × pixels down (e.g. 1920×1080)", "More pixels = more detail = more data to process"], formula: "Image = pixel grid of numbers" },
    { kicker: "Colour", title: "Grayscale and RGB",
      points: ["Grayscale: one value per pixel, 0 (black) to 255 (white)", "Colour: three values per pixel — R, G, B (0-255 each)", "16.7 million colours from 256×256×256 combinations", "A colour image = 3 stacked channel grids"], formula: "RGB: 3 channels × 0–255" },
    { kicker: "Matrix", title: "Images as Matrices",
      points: ["A 4×4 grayscale image = a 4×4 matrix of numbers", "A colour image = three such matrices (R, G, B)", "All CV operations are MATH on these matrices", "Brightness = scale values; contrast = stretch the range"], formula: "Every image op = matrix math" },
    { kicker: "Features", title: "From Pixels to Features",
      points: ["Raw pixels are too many to reason with directly", "Features = meaningful patterns: edges, corners, textures, colours", "Classic CV: humans designed feature detectors (edges, blobs)", "Deep learning (CNN): features are learned automatically"], formula: "Pixels → features → meaning" },
  ],
  mindmap: { central: "CV Concepts",
    branches: [
      { label: "Pixel & resolution", color: "#1a73e8", children: ["Smallest unit", "1920×1080 etc.", "More px = more detail"] },
      { label: "Colour", color: "#e37400", children: ["Grayscale 0-255", "RGB 3 channels", "16.7M colours"] },
      { label: "Matrix view", color: "#146c2e", children: ["Image = matrix", "Colour = 3 matrices", "Ops = math"] },
      { label: "Features", color: "#9334e6", children: ["Edges, corners", "Textures", "Learned by CNN"] },
    ] },
  notes: [
    "One-liner: <b>pixel = smallest picture element</b>, one numeric intensity value.",
    "Grayscale 128 = mid-grey; RGB (255,0,0) = pure red; (0,0,0) black; (255,255,255) white.",
    "A 100×100 RGB image has <b>100×100×3 = 30,000 values</b> — compute such numbers for exams.",
    "Feature hierarchy in CNNs: <b>edges → shapes → parts → objects</b>.",
  ],
  quiz: [
    { q: "In RGB, (0, 255, 0) is:", options: ["Red", "Green", "Blue", "White"], answer: 1, why: "Green channel maxed, others zero." },
    { q: "A colour image is stored as:", options: ["1 matrix", "3 matrices (R,G,B)", "A single number", "Text"], answer: 1, why: "Three channels, each a 2-D grid." },
  ],
  pyq: [
    "What is a pixel? What does 1920×1080 mean? (2m)",
    "Explain grayscale vs RGB images. (3m)",
  ],
},

"ai-9-3": {
  slides: [
    { kicker: "Part B • U5", title: "Image Features",
      points: ["Features = the distinctive, informative parts of an image", "Good features are repeatable (found again in new photos) and discriminative (tell objects apart)", "Pixels change with light; features stay stable"], formula: "Stable patterns beat raw pixels" },
    { kicker: "Types", title: "Edges, Corners, Textures, Blobs",
      points: ["Edge: sudden change in intensity (outline of a face)", "Corner: two edges meet — great for matching (jigsaw logic)", "Texture: repeating pattern (grass, cloth, marble)", "Blob: connected region of similar pixels (a red ball)", "Colour histograms: overall colour 'recipe' of an image"], formula: "Edge • Corner • Texture • Blob" },
    { kicker: "Why", title: "Why Features Matter",
      points: ["Reduce data: thousands of pixels → few strong features", "Robust: recognise a face in different lighting", "Faster matching: compare features, not every pixel", "Foundation of classic CV before deep learning"], formula: "Fewer, stronger signals" },
    { kicker: "Extraction", title: "Feature Extraction",
      points: ["Classic: filters/kernels slide over the image computing responses (e.g. edge detectors like Sobel)", "Keypoint detectors (SIFT/ORB) find matchable corners", "Deep learning: convolution layers learn features automatically, layer by layer", "In every case: image in → feature values out"], formula: "Image → filter → feature map" },
  ],
  mindmap: { central: "Image Features",
    branches: [
      { label: "Edges", color: "#1a73e8", children: ["Intensity jumps", "Object outlines"] },
      { label: "Corners", color: "#e37400", children: ["Two edges meet", "Best for matching"] },
      { label: "Texture & blobs", color: "#146c2e", children: ["Repeating patterns", "Uniform regions"] },
      { label: "Extraction", color: "#9334e6", children: ["Filters/kernels", "Keypoint detectors", "CNN auto-learning"] },
    ] },
  notes: [
    "Definition pair: features must be <b>repeatable</b> (same place in new images) and <b>discriminative</b> (different between objects).",
    "Edges = <b>big intensity change</b> between neighbouring pixels — the most basic feature.",
    "Corners survive rotation and scale better than edges — why jigsaw puzzles lock at corners!",
    "Deep learning did not kill features — it just <b>learns</b> them instead of hand-designing them.",
  ],
  quiz: [
    { q: "A sudden change in pixel intensity along a line is a(n):", options: ["Blob", "Edge", "Texture", "Histogram"], answer: 1, why: "Edges mark intensity boundaries — object outlines." },
    { q: "Which feature is most useful for matching the same object across two photos?", options: ["A corner/keypoint", "Overall brightness", "File size", "Image name"], answer: 0, why: "Distinctive corners are stable across views — the basis of matching." },
  ],
  pyq: [
    "What are image features? Why are they preferred over raw pixels? (3m)",
    "Name any three types of image features. (3m)",
  ],
},

"ai-9-4": {
  slides: [
    { kicker: "Part B • U5", title: "Convolution",
      points: ["Convolution = sliding a small filter (kernel) across an image to compute a feature map", "The kernel is a tiny matrix (e.g. 3×3) of numbers (weights)", "At each position: multiply overlapping pixels by kernel values, sum → one output pixel"], formula: "Output = Σ(image patch × kernel)" },
    { kicker: "How", title: "Step by Step",
      points: ["Place the 3×3 kernel on the top-left 3×3 patch of the image", "Multiply each pixel by the matching kernel number; add all 9 products", "Write the sum as the first pixel of the feature map", "Slide by 1 pixel (stride) and repeat until the whole image is covered"], formula: "Multiply → sum → slide" },
    { kicker: "Kernels", title: "What Different Kernels Do",
      points: ["Edge kernels (Sobel): respond strongly to intensity changes", "Sharpen kernel: boosts differences — crisper image", "Blur/box kernel: averages — smooths noise", "CNN LEARNS its own best kernels during training"], formula: "Different kernel, different feature" },
    { kicker: "Params", title: "Stride and Padding",
      points: ["Stride = how far the kernel slides each step (1 = dense, 2 = smaller output)", "Padding = adding zeros at the border to keep output size", "Output size = (N − K + 2P)/S + 1 for image N, kernel K", "Feature map = the convolution's output image"], formula: "out = (N−K+2P)/S + 1" },
  ],
  flowchart: [
    { title: "Image + kernel", desc: "a 5×5 image and a 3×3 filter" },
    { title: "Multiply & sum", desc: "kernel sits on a 3×3 patch — 9 products added" },
    { title: "Record one output value", desc: "first pixel of the feature map" },
    { title: "Slide (stride)", desc: "move right, row by row", type: "decision" },
    { title: "Feature map complete", desc: "highlights whatever the kernel detects (e.g. edges)", type: "result" },
  ],
  notes: [
    "Convolution is just <b>multiply-and-sum repeated everywhere</b> — simple maths, powerful result.",
    "An edge kernel produces bright lines <b>wherever edges exist</b> — that's the feature map.",
    "CNN = stacks of learned convolutions: <b>layer 1 edges, layer 2 shapes, layer 3 parts</b>.",
    "Output-size formula: <b>(N−K+2P)/S + 1</b> — practise with N=5, K=3, P=0, S=1 → 3.",
  ],
  quiz: [
    { q: "A convolution kernel is:", options: ["A program", "A small matrix of weights", "A type of image", "A loss function"], answer: 1, why: "It's a small numeric matrix slid across the image." },
    { q: "With N=6, K=3, P=0, S=1, the output size is:", options: ["6", "4", "3", "2"], answer: 1, why: "(6−3+0)/1 + 1 = 4." },
  ],
  pyq: [
    "Explain convolution with a 3×3 kernel example. (4m)",
    "What is a feature map? How is it produced? (2m)",
  ],
},

"ai-9-5": {
  slides: [
    { kicker: "Part B • U5", title: "Understanding CNN",
      points: ["CNN (Convolutional Neural Network) = the deep network designed for images", "Pipeline: convolution → ReLU → pooling → (repeat) → fully connected → output", "Each stage has a clear job — learn them one by one"], formula: "Conv → ReLU → Pool → FC" },
    { kicker: "Layers", title: "The Four Layer Types",
      points: ["Convolution layer: filters scan for features (edges → shapes)", "ReLU: activation that keeps positives, zeros negatives — adds non-linearity", "Pooling (max-pooling 2×2): shrinks feature maps, keeps strongest signals", "Fully connected: combines all features into class scores (cat 0.92, dog 0.08)"], formula: "Detect → activate → shrink → classify" },
    { kicker: "Why", title: "Why CNNs Win at Vision",
      points: ["Local connections: each neuron sees a small patch, not the whole image", "Weight sharing: the same filter scans everywhere — far fewer parameters", "Translation invariance: a cat is a cat anywhere in the photo", "Feature hierarchy: layers build complexity step by step"], formula: "Fewer params, sees anywhere" },
    { kicker: "Flow", title: "A Number Walkthrough",
      points: ["Input: 32×32 RGB image (3 channels)", "Conv with 16 filters → 30×30×16 feature maps", "Max-pool 2×2 → 15×15×16", "Conv + pool again → smaller, deeper maps", "Flatten → fully connected → 10 class scores (e.g. CIFAR-10)"], formula: "Spatial size ↓, depth ↑" },
  ],
  mindmap: { central: "CNN",
    branches: [
      { label: "Conv layer", color: "#1a73e8", children: ["Learned filters", "Feature maps", "Edges → shapes"] },
      { label: "ReLU", color: "#c5221f", children: ["max(0, x)", "Non-linearity"] },
      { label: "Pooling", color: "#e37400", children: ["Max-pool 2×2", "Downsizes", "Keeps strongest"] },
      { label: "Fully connected", color: "#146c2e", children: ["Flatten", "Class scores", "Softmax output"] },
    ] },
  flowchart: [
    { title: "Input image", desc: "e.g. 32×32 RGB" },
    { title: "Convolution", desc: "many filters → feature maps" },
    { title: "ReLU", desc: "negative values → 0", },
    { title: "Max pooling", desc: "each 2×2 block → its max; size halves" },
    { title: "Repeat conv/pool", desc: "deeper features, smaller maps", type: "decision" },
    { title: "Flatten + fully connected", desc: "class scores → prediction", type: "result" },
  ],
  notes: [
    "ReLU = <b>f(x) = max(0, x)</b> — one line, guaranteed mark.",
    "Max pooling 2×2: <b>each 2×2 block becomes its largest value</b> — halves height and width.",
    "Weight sharing is CNN's superpower: <b>one filter learns 'vertical edge' and reuses it everywhere</b>.",
    "Output layer uses <b>softmax</b> to turn scores into probabilities that sum to 1.",
    "Testing a CNN (KIPS section): feed new images → compare predictions with reality → confusion matrix.",
  ],
  quiz: [
    { q: "ReLU(x) for x = −7 is:", options: ["−7", "0", "7", "1"], answer: 1, why: "ReLU zeroes out negative inputs." },
    { q: "Max-pooling 2×2 on a 16×16 map gives:", options: ["32×32", "16×16", "8×8", "4×4"], answer: 2, why: "Pooling halves each dimension." },
    { q: "Which CNN layer makes final class predictions?", options: ["Convolution", "Pooling", "Fully connected", "ReLU"], answer: 2, why: "Flattened features feed the fully connected classifier." },
  ],
  pyq: [
    "Draw the CNN architecture and explain each layer. (5m)",
    "What is max-pooling? Why is it used? (3m)",
  ],
},

};
