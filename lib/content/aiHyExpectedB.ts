/* AI Half Yearly - most expected subjective questions (Part B: Units 1-3).
   marks: 2 = write in 20-30 words, 4 = write in 50-80 words (as per the blue print). */
import type { AiBankQ } from "./aiHyTypes";

export const AI_HY_EXPECTED_B: AiBankQ[] = [
  {
    n: 23, q: "What is Artificial Intelligence? Give one example from daily life.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "AI basics", hot: true,
    ans: "Artificial Intelligence is the branch of computer science that makes machines perform tasks needing human intelligence, such as learning, understanding language and recognising images. Example: a voice assistant.",
  },
  {
    n: 24, q: "Name the five stages of the AI Project Cycle in order.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "AI project cycle", hot: true,
    ans: "Problem scoping, Data acquisition, Data exploration, Modelling and Evaluation. The cycle repeats if the evaluated model is not good enough for the problem.",
  },
  {
    n: 25, q: "What is problem scoping? What is the 4Ws canvas?", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "Problem scoping", hot: true,
    ans: "Problem scoping is defining the problem before starting a project. The 4Ws canvas answers Who is affected, What the problem is, Where it happens and Why it must be solved.",
  },
  {
    n: 26, q: "What is a problem statement template? Write its main parts.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "Problem scoping",
    ans: "The problem statement template puts the 4Ws findings into one statement. Parts: affected people, the problem, the place, the benefit of solving it and the data needed.",
  },
  {
    n: 27, q: "Differentiate between primary and secondary data.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "Data acquisition",
    ans: "Primary data is collected first-hand by the project team through surveys, interviews or sensors. Secondary data is already collected by others - government websites, reports or old records.",
  },
  {
    n: 28, q: "Differentiate between structured and unstructured data with one example each.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "Data types", hot: true,
    ans: "Structured data is arranged in rows and columns - a marks table in a spreadsheet. Unstructured data has no fixed format - images, videos, chat messages and social media posts.",
  },
  {
    n: 29, q: "What is data exploration? Name any two things done in it.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "Data exploration",
    ans: "Data exploration is the study of the collected data before modelling. Two things done: visualising the data with charts and graphs, and finding patterns, missing values and outliers.",
  },
  {
    n: 30, q: "Differentiate between AI, Machine Learning and Deep Learning.", marks: 4,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "AI, ML and DL", hot: true,
    ans: "AI is the umbrella field of making machines intelligent; for example, a machine that plays chess. Machine Learning is the part of AI in which the machine learns patterns from data instead of fixed rules, using a decision tree or KNN. Deep Learning is a part of ML that uses neural networks with many layers for very complex tasks such as image recognition and language translation. So AI is the largest circle, ML sits inside it and DL inside ML.",
  },
  {
    n: 31, q: "Name the three domains of AI and give one example of each.", marks: 2,
    unit: "Part B - Unit 1: AI Project Cycle", tag: "AI domains", hot: true,
    ans: "Data Science - film recommendations on Netflix from past viewing; Computer Vision - face unlock or self-driving cars; Natural Language Processing - Google Translate, chatbots and voice assistants.",
  },
  {
    n: 32, q: "What is an ethical framework in AI? Write any two ethical principles.", marks: 2,
    unit: "Part B - Unit 1: Ethical Framework", tag: "Ethics", hot: true,
    ans: "An ethical framework is the set of rules that keeps AI fair, safe and honest. Two principles: fairness (no bias in data or decisions) and privacy (personal data safe).",
  },
  {
    n: 33, q: "What is AI bias? Give one example.", marks: 2,
    unit: "Part B - Unit 1: Ethical Framework", tag: "AI bias", hot: true,
    ans: "AI bias is unfair behaviour of a model caused by unbalanced or prejudiced training data. Example: a hiring AI trained mostly on men's CVs may reject qualified women candidates.",
  },
  {
    n: 34, q: "Why is human oversight important in AI systems?", marks: 2,
    unit: "Part B - Unit 1: Ethical Framework", tag: "Accountability",
    ans: "AI can be wrong or biased, so a human must remain responsible for decisions. Oversight lets a person check or stop the system before harm is done.",
  },
  {
    n: 35, q: "What is bioethics? Why is it needed where AI meets life sciences?", marks: 2,
    unit: "Part B - Unit 1: Ethical Framework", tag: "Bioethics",
    ans: "Bioethics is the study of right and wrong in biology and healthcare. AI needs it because health and genetic data are personal, so consent, privacy and fairness must be protected.",
  },
  {
    n: 36, q: "What is a model in AI? Differentiate between rule-based and learning-based models.", marks: 4,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Model types", hot: true,
    ans: "A model in AI is the ready system produced when an algorithm learns from data and can then make predictions. A rule-based model works on fixed if-then rules; it cannot improve by itself, e.g. a tax calculator. A learning-based model learns patterns from training data and improves with more data, e.g. a spam filter.",
  },
  {
    n: 37, q: "What is supervised learning? Give one example.", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Supervised", hot: true,
    ans: "Supervised learning trains a model on labelled data, where the correct answer is already known. Example: predicting house prices from old sales data.",
  },
  {
    n: 38, q: "What is unsupervised learning? Give one example.", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Unsupervised", hot: true,
    ans: "Unsupervised learning works on unlabelled data and finds hidden groups or patterns by itself. Example: clustering customers of a shop into groups with similar buying habits using the K-means algorithm.",
  },
  {
    n: 39, q: "What is reinforcement learning?", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Reinforcement",
    ans: "Reinforcement learning is learning by trial and error using reward and penalty. It gets a reward or penalty for each action and learns the best path - like a robot learning to walk.",
  },
  {
    n: 40, q: "Differentiate between classification and regression.", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Classification vs regression", hot: true,
    ans: "Classification predicts a category - spam or not spam, pass or fail. Regression predicts a number - the price of a house or expected marks from study hours.",
  },
  {
    n: 41, q: "What is a decision tree? Name its parts.", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "Decision tree",
    ans: "A decision tree is a tree-shaped model that decides by asking a series of questions. Parts: the root node, decision nodes, branches and leaf nodes that carry the final result.",
  },
  {
    n: 42, q: "What is KNN? How does it predict?", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "KNN",
    ans: "KNN (K-nearest neighbours) stores the data. For a new point it looks at the k closest known points and gives their majority vote. k is usually odd.",
  },
  {
    n: 43, q: "What is an artificial neural network? Name its layers.", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "ANN", hot: true,
    ans: "An artificial neural network is a model inspired by the human brain, made of connected nodes with weights. Layers: input (receives data), hidden (processes it) and output (gives the result).",
  },
  {
    n: 44, q: "What is a CNN? Where is it commonly used?", marks: 2,
    unit: "Part B - Unit 2: Advanced Concepts of Modelling", tag: "CNN", hot: true,
    ans: "A CNN (Convolutional Neural Network) is a deep learning network for images: convolution and pooling layers pull out features, fully connected layers classify them. Used in face recognition and self-driving cars.",
  },
  {
    n: 45, q: "What is model evaluation? Why is it done on testing data?", marks: 2,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Evaluation", hot: true,
    ans: "Model evaluation checks how well a trained model performs. It uses testing data - data the model has never seen - because a model scores falsely high on its training data.",
  },
  {
    n: 46, q: "What is train-test split? Write the usual ratio.", marks: 2,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Train-test split", hot: true,
    ans: "Train-test split means dividing the dataset into a training part and a separate testing part before building the model. The usual ratio is 70-80 % training and 20-30 % testing.",
  },
  {
    n: 47, q: "Write the formula of accuracy and explain it with an example.", marks: 2,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Accuracy", hot: true,
    ans: "Accuracy = (TP + TN) / (TP + TN + FP + FN) - the share of correct predictions. Example: 90 correct out of 100 predictions means 90 % accuracy.",
  },
  {
    n: 48, q: "What are precision and recall? Write one formula each.", marks: 4,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Precision and recall", hot: true,
    ans: "Precision = TP / (TP + FP): how many predicted positives were actually positive - fewer false alarms. Recall = TP / (TP + FN): how many actual positives were caught - fewer missed cases. Precision matters where a false alarm is costly (a genuine mail must not go to spam); recall where a missed case is costly (no patient should be missed). F1 = harmonic mean of precision and recall, useful as one score.",
  },
  {
    n: 49, q: "Why can a model with high accuracy be useless? Explain with the disease example.", marks: 4,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Accuracy paradox", hot: true,
    ans: "When data is imbalanced, accuracy hides the real failure. If 1000 people are tested and only 10 really have the disease, a model saying 'no disease' to all gets 990 right = 99 % accuracy but catches zero patients, so its recall is 0 and the model is useless here. Accuracy also does not show which error is made (false positive or false negative). So the confusion matrix with precision, recall and F1 must also be checked.",
  },
  {
    n: 50, q: "What is overfitting? How can it be reduced?", marks: 2,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Overfitting",
    ans: "Overfitting is when a model memorises the training data, so it scores high in training but poorly on new data. Reduce it with varied training data and testing on unseen data.",
  },
  {
    n: 51, q: "Why is it important to compare two AI models before choosing one?", marks: 2,
    unit: "Part B - Unit 3: Evaluating Model", tag: "Model choice",
    ans: "Two models can look similar in training, so both are evaluated on the same testing data using accuracy, precision and recall. The model with fewer costly errors is chosen.",
  },
];
