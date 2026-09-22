/* AI Half Yearly model paper - Section A, Question 4 and 5 (Part B: AI subject). */
import type { AiObqSet } from "./aiHyTypes";

export const AI_HY_PAPER_A2: AiObqSet[] = [
  {
    id: "A4",
    heading: "Question 4 - Answer any five (5 x 1 = 5)",
    unit: "Part B - Unit 1: AI Project Cycle and Ethical Framework",
    pick: "Any 5 out of 6",
    marks: 1,
    items: [
      {
        q: "The correct order of the stages of the AI Project Cycle is:",
        o: ["Problem scoping -> Data acquisition -> Data exploration -> Modelling -> Evaluation", "Modelling -> Problem scoping -> Evaluation -> Data acquisition -> Data exploration", "Data acquisition -> Modelling -> Problem scoping -> Evaluation -> Data exploration", "Evaluation -> Modelling -> Data exploration -> Data acquisition -> Problem scoping"],
        a: 0,
        why: "First decide the problem, then collect data, explore it, build (train) the model and finally evaluate it.",
      },
      {
        q: "The 4Ws canvas (Who, What, Where, Why) is used in which stage of the AI Project Cycle?",
        o: ["Data exploration", "Modelling", "Problem scoping", "Evaluation"],
        a: 2,
        why: "Problem scoping uses the 4Ws to understand the people affected, the problem, the place and the benefits before any data is collected.",
      },
      {
        q: "Which one of the following is NOT a domain of AI?",
        o: ["Data Science", "Computer Vision", "Natural Language Processing", "Human Resource Management"],
        a: 3,
        why: "The three AI domains in the syllabus are Data Science, Computer Vision and NLP. Human Resource is a management subject.",
      },
      {
        q: "A chatbot that understands and replies in human language mainly uses which AI domain?",
        o: ["Computer Vision", "Natural Language Processing", "Data Science", "Robotics"],
        a: 1,
        why: "NLP deals with human language - text and speech - so chatbots, translation and voice assistants belong to it.",
      },
      {
        q: "AI bias means:",
        o: ["the model is slower than expected", "the model gives unfair results because the data or design is not fair", "the computer is very old", "the model has been trained on too much data"],
        a: 1,
        why: "A model learns from data; if the data is not representative or carries human prejudice, the predictions turn unfair.",
      },
      {
        q: "Assertion (A): AI systems can take unfair decisions.\nReason (R): They learn patterns from data which may contain human biases.",
        o: ["Both (A) and (R) are correct and (R) is the correct explanation of (A)", "Both (A) and (R) are correct but (R) is not the correct explanation of (A)", "(A) is correct but (R) is not correct", "(A) is not correct but (R) is correct"],
        a: 0,
        why: "Bias enters through the training data, and that is exactly why an AI system can behave unfairly - R explains A.",
      },
    ],
  },
  {
    id: "A5",
    heading: "Question 5 - Answer any five (5 x 1 = 5)",
    unit: "Part B - Unit 2: Advanced Concepts of Modelling + Unit 3: Evaluating Model",
    pick: "Any 5 out of 6",
    marks: 1,
    items: [
      {
        q: "A model that works on fixed if-then rules written by a human being is called:",
        o: ["a rule-based model", "a learning-based model", "a neural network", "an unsupervised model"],
        a: 0,
        why: "Rule-based systems follow the rules fed by the programmer and do not learn from data.",
      },
      {
        q: "Which of the following is a supervised learning task?",
        o: ["Grouping customers into unknown groups", "Predicting the price of a house from past sales data", "Finding hidden patterns without labels", "Trying actions to earn a reward"],
        a: 1,
        why: "Past sales data with prices gives labelled examples, so the model learns by supervision.",
      },
      {
        q: "Making groups of similar data points without using labels is called:",
        o: ["classification", "regression", "clustering", "evaluation"],
        a: 2,
        why: "Clustering is an unsupervised task: the model itself finds groups of similar items (for example, similar customers).",
      },
      {
        q: "An AI model should be evaluated on:",
        o: ["the training data itself", "the testing data that the model has never seen", "the fastest computer available", "the data of only one class"],
        a: 1,
        why: "Testing on unseen data gives an honest picture. Testing on training data can show a falsely high score.",
      },
      {
        q: "A model predicts 'no rain' for all 100 days. In reality 95 days had no rain. Its accuracy is:",
        o: ["5 %", "50 %", "95 %", "100 %"],
        a: 2,
        why: "95 correct out of 100 = 95 % accuracy, yet the model never catches a rainy day - this is why accuracy alone is not enough.",
      },
      {
        q: "Precision is calculated as:",
        o: ["TP / (TP + FP)", "TP / (TP + FN)", "(TP + TN) / total", "2 x (Precision x Recall) / (Precision + Recall)"],
        a: 0,
        why: "Precision asks: out of all the cases we predicted positive, how many were actually positive? Recall is TP / (TP + FN).",
      },
    ],
  },
];
