/* AI (417) Half Yearly 2026-27 — blue print, portion and strategy.
   Source: the school's blue print (Part A Units 1-3, Part B Units 1-3, 21 questions, 50 marks).
   The 2025-26 half yearly paper of the same school follows the same paper pattern (verified from the paper). */
import type { AiBpRow } from "./aiHyTypes";

export const AI_HY_META = {
  school: "S.K. Presidency Public School",
  exam: "Half Yearly Examination 2026-27",
  cls: "Class 10",
  subject: "Artificial Intelligence (417)",
  time: "2 Hours",
  max: 50,
  questions: 21,
  sectionA: "Objective type questions (24 marks) - 5 questions, 4/5/5/5/5 items",
  sectionB: "Subjective type questions (26 marks) - 16 questions, 3+4+3 to be attempted",
  marksSplit: "Section A 24 + Section B 26 = 50",
};

export const AI_HY_BLUEPRINT: AiBpRow[] = [
  { section: "A", unit: "Part A - Unit 1: Communication Skills", ques: "Q1", type: "Objective (MCQ)", given: "6 given, any 4", per: "4 x 1", marks: 4 },
  { section: "A", unit: "Part A - Unit 2: Self Management Skills", ques: "Q2", type: "Objective (MCQ)", given: "6 given, any 5", per: "5 x 1", marks: 5 },
  { section: "A", unit: "Part A - Unit 3: ICT Skills", ques: "Q3", type: "Objective (MCQ)", given: "6 given, any 5", per: "5 x 1", marks: 5 },
  { section: "A", unit: "Part B - Unit 1: AI Project Cycle & Ethical Framework", ques: "Q4", type: "Objective (MCQ)", given: "6 given, any 5", per: "5 x 1", marks: 5 },
  { section: "A", unit: "Part B - Unit 2: Advanced Concepts of Modelling + Unit 3: Evaluating Model", ques: "Q5", type: "Objective (MCQ)", given: "6 given, any 5", per: "5 x 1", marks: 5 },
  { section: "B", unit: "Part A - Units 1, 2, 3", ques: "Q6-Q10", type: "Subjective, 20-30 words", given: "5 given, any 3", per: "3 x 2", marks: 6 },
  { section: "B", unit: "Part A + Part B (basics of both parts)", ques: "Q11-Q16", type: "Subjective, 20-30 words", given: "6 given, any 4", per: "4 x 2", marks: 8 },
  { section: "B", unit: "Part B - Units 1, 2, 3", ques: "Q17-Q21", type: "Subjective, 50-80 words", given: "5 given, any 3", per: "3 x 4", marks: 12 },
];

export const AI_HY_BP_TOTALS = {
  sectionA: 24,
  sectionB: 26,
  grand: 50,
  attempts: "Section A: 4+5+5+5+5 = 24 items, Section B: 3+4+3 = 10 answers",
};

export const AI_HY_PORTION: { part: string; unit: string; topics: string[] }[] = [
  {
    part: "Part A",
    unit: "Unit 1 - Communication Skills",
    topics: [
      "Methods of communication: verbal (oral, written), non-verbal (gestures, posture, eye contact, paralanguage), visual",
      "Communication cycle: sender, encoding, message, channel, receiver, decoding, feedback",
      "Types of communication: interpersonal, intrapersonal, small group, public",
      "Barriers to communication: physical, language, emotional, cultural, organisational, poor listening",
      "Active listening and giving feedback",
      "7 Cs of effective communication: clear, concise, concrete, correct, coherent, complete, courteous",
      "Body language and its effect on the message",
    ],
  },
  {
    part: "Part A",
    unit: "Unit 2 - Self Management Skills",
    topics: [
      "Stress: meaning, causes among students, signs",
      "Stress management: physical exercise, yoga and meditation, healthy diet, sleep, hobbies, positive thinking",
      "Time management: to-do list, prioritising, avoiding procrastination",
      "Self-awareness, self-motivation, self-regulation",
      "Goal setting: SMART goals, short-term and long-term goals",
      "Working independently and taking initiative",
      "Emotional intelligence and positive thinking (asked in the school paper last year)",
      "Self-confidence and personal growth",
    ],
  },
  {
    part: "Part A",
    unit: "Unit 3 - ICT Skills",
    topics: [
      "Operating system: meaning and examples (Windows, Linux, macOS, Android)",
      "File and folder: meaning, file extensions, file organisation, basic file operations",
      "Keyboard shortcuts: Ctrl+S, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, Ctrl+Z",
      "Internet: browser, search engine, e-mail, spam and junk mail",
      "Cloud computing and cloud storage (Google Drive, OneDrive)",
      "Computer maintenance and care of digital devices",
      "Computer threats: virus, malware, phishing, hacking, ransomware",
      "Security measures: antivirus, strong password, backup, safe browsing",
    ],
  },
  {
    part: "Part B",
    unit: "Unit 1 - AI Project Cycle and Ethical Framework",
    topics: [
      "AI Project Cycle stages: problem scoping, data acquisition, data exploration, modelling, evaluation",
      "Problem scoping with the 4Ws canvas (Who, What, Where, Why) and problem statement template",
      "Data acquisition: primary and secondary data, structured and unstructured data",
      "Data exploration: visualisation, patterns, outliers",
      "AI, Machine Learning and Deep Learning - how the three nest",
      "AI domains: Data Science, Computer Vision, Natural Language Processing",
      "Ethical framework: bias, fairness, transparency, accountability, privacy, data security, accessibility",
      "AI for good, human oversight, bioethics",
    ],
  },
  {
    part: "Part B",
    unit: "Unit 2 - Advanced Concepts of Modelling in AI",
    topics: [
      "Model = algorithm + data; rule-based (if-then) and learning-based models",
      "Supervised learning: labelled data - classification and regression",
      "Unsupervised learning: unlabelled data - clustering (K-means)",
      "Reinforcement learning: reward and penalty",
      "Decision tree: root node, decision nodes, leaves, branches",
      "K-nearest neighbours (KNN) and how the value of k matters",
      "Artificial Neural Network: input, hidden, output layers, weights",
      "Deep learning and Convolutional Neural Network (CNN) for computer vision",
    ],
  },
  {
    part: "Part B",
    unit: "Unit 3 - Evaluating Model",
    topics: [
      "Need for model evaluation; testing on unseen data",
      "Train-test split (usually 70:30 or 80:20) and why the split is needed",
      "Confusion matrix: TP, TN, FP, FN",
      "Accuracy, Precision, Recall and F1 Score with formulas",
      "Why accuracy alone can mislead (imbalanced data, accuracy paradox)",
      "Overfitting and underfitting; improving a model",
      "Fair and ethical evaluation, comparing two models",
    ],
  },
];

export const AI_HY_STRATEGY: { title: string; points: string[] }[] = [
  {
    title: "Exam day - 2 hours for 50 marks",
    points: [
      "First 35 minutes: Section A (24 marks). Tick the item you are sure of, leave the doubtful one - you have a choice in every question.",
      "Next 65 minutes: Section B. 2-mark answers 20-30 words (2 lines), 4-mark answers 50-80 words (5-6 lines). Do not write more.",
      "Last 20 minutes: cross-check that you attempted exactly the number asked (Q1 any 4, Q2-Q5 any 5, Q6-10 any 3, Q11-16 any 4, Q17-21 any 3).",
      "Never attempt extra options - it wastes time and can be marked wrong.",
    ],
  },
  {
    title: "Section A tricks",
    points: [
      "Definition MCQs (stress, communication cycle, AI, supervised learning) - learn one clean line each; the option is built from it.",
      "Shortcut key and full-form questions are free marks: Ctrl+S save, Ctrl+C copy, Ctrl+V paste, Ctrl+X cut, Ctrl+P print, Ctrl+Z undo; ICT = Information and Communication Technology.",
      "Assertion-Reason items: first decide if each statement is true separately, then ask whether R explains A. In this paper a fully automatic washing machine is NOT AI - it only follows fixed rules.",
      "Read 'NOT' in the question twice - two items in the school paper were 'which is NOT'.",
    ],
  },
  {
    title: "Section B writing rules",
    points: [
      "2-mark answer = definition + one example (20-30 words). No introduction, no conclusion.",
      "4-mark answer = four clear points, one line each, or a heading + three points (50-80 words).",
      "Use the textbook key words - examiner ticks them: feedback, paralanguage, problem scoping, data exploration, labelled data, testing data, confusion matrix, TP/TN/FP/FN, precision, recall.",
      "Draw a small diagram where it fits: communication cycle boxes, AI project cycle boxes, confusion matrix table, neural network layers. It saves words and earns full marks.",
    ],
  },
  {
    title: "What to revise in the last 3 days",
    points: [
      "Day 1: Part A - all three units from the notes and the 45 practice MCQs on the objective page.",
      "Day 2: Part B Unit 1 + Unit 2 - the AI project cycle, 4Ws canvas, ethics, and the model/learning types with one example each.",
      "Day 3: Part B Unit 3 - accuracy, precision, recall, F1 and the confusion matrix with the rain example; then the solved model paper and the solved old paper, timed at 2 hours.",
    ],
  },
];
