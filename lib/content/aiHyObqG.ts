/* AI Half Yearly - objective bank, extra set G: 10 rapid-fire questions with numbers
   and full forms - the cheapest marks of Section A. */
import type { AiObqItem } from "./aiHyTypes";

export const AI_HY_OBQ_G: AiObqItem[] = [
  { q: "ML stands for:", o: ["Machine Learning", "Modern Logic", "Main Language", "Managed Link"], a: 0, why: "Machines learn patterns from data instead of fixed rules." },
  { q: "NLP stands for:", o: ["Natural Language Processing", "New Logic Program", "Network Layer Protocol", "National Learning Plan"], a: 0, why: "It is the AI domain of human language - text and speech." },
  { q: "CNN stands for:", o: ["Convolutional Neural Network", "Central Network Node", "Computer Network Card", "Coded Neural Link"], a: 0, why: "It is the deep learning network used for images." },
  { q: "ICT stands for:", o: ["Information and Communication Technology", "Internet and Computer Tools", "Integrated Communication Table", "Information Control Technology"], a: 0, why: "It covers computers, internet, e-mail and all digital tools for handling information." },
  { q: "SDG stands for:", o: ["Sustainable Development Goal", "Standard Data Group", "School Development Grant", "System Design Guide"], a: 0, why: "The 17 SDGs were adopted by the United Nations in 2015 for 2030." },
  { q: "The keyboard shortcut to copy the selected text is:", o: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + P"], a: 0, why: "C copies, X cuts, V pastes, P prints." },
  { q: "Which stage of the AI Project Cycle answers 'why must this problem be solved'?", o: ["Problem scoping", "Data acquisition", "Modelling", "Evaluation"], a: 0, why: "The 4Ws canvas - Who, What, Where, Why - belongs to problem scoping." },
  { q: "A model has TP = 8 and FP = 2. Its precision is:", o: ["80 %", "20 %", "100 %", "40 %"], a: 0, why: "Precision = TP / (TP + FP) = 8 / 10 = 0.8 = 80 %." },
  { q: "A model has TP = 6 and FN = 4. Its recall is:", o: ["60 %", "40 %", "100 %", "66 %"], a: 0, why: "Recall = TP / (TP + FN) = 6 / 10 = 0.6 = 60 %." },
  { q: "A filter marks 10 e-mails as spam; only 4 were really spam. Its precision is:", o: ["40 %", "60 %", "100 %", "10 %"], a: 0, why: "Precision = 4 correct out of 10 predicted = 40 % - the other 6 were false alarms (FP)." },
];
