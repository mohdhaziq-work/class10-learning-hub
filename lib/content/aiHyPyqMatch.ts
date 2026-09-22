/* Match between the school's own AI Half Yearly paper (2025-26) and the teacher's
   50 solved questions (lib/content/ai-important.ts).
   Rule followed while building this: a row is listed ONLY when the school-paper item
   asks the same concept as one of the 50 - nothing is invented. Items with no match
   are listed separately in AI_PYQ_NO_MATCH, with the nearest 50 question where one exists.
   The teacher said about 15 questions will come from the 50; the school's own paper is
   the best proof of which topics the school actually repeats. */

export interface AiPyqMatchRow {
  where: string; // where it appears in the school paper
  label: string; // the school-paper question, shortened
  ref: number[]; // matching numbers from the 50 solved questions
  why: string; // what makes it a match
  marks?: string;
}

export const AI_PYQ_MATCH: AiPyqMatchRow[] = [
  { where: "Section A · Q1 (ii) and Q5 (iii)", label: "Which of these is non-verbal communication / example of non-verbal communication", ref: [4], why: "Same question as 50 #4 - non-verbal communication with examples (facial expressions).", marks: "1" },
  { where: "Section A · Q2 (vi)", label: "Assertion: a machine that mimics human traits is AI; a fully automatic washing machine is AI", ref: [34], why: "50 #34 defines Artificial Intelligence on the same line - machines doing tasks that need human intelligence. A washing machine only follows fixed instructions.", marks: "1" },
  { where: "Section A · Q1 (iv) and Q3 (iv)", label: "Quality of a self-motivated person / which is not a step to build self-motivation", ref: [16, 18], why: "Both ask the same topic as 50 #16 (self-motivation) and #18 (why self-motivation matters, how it is built).", marks: "1" },
  { where: "Section A · Q3 (i)", label: "Which of the following does not help in stress management (negative thoughts)", ref: [13, 14], why: "The options are the stress-management techniques of 50 #13 and #14 (exercise, yoga, sleep, meditation) - negatives thoughts is the odd one.", marks: "1" },
  { where: "Section A · Q4 (iii)", label: "Which is an application of Artificial Intelligence (automated voice assistant)", ref: [30, 34], why: "50 #30 gives the AI domains with examples (voice assistant = NLP) and #34 defines AI.", marks: "1" },
  { where: "Section A · Q5 (ii)", label: "Which one is NOT a barrier to effective communication", ref: [8], why: "Same barrier list as 50 #8; full attention is not a barrier, it removes them.", marks: "1" },
  { where: "Section B · Q6", label: "Healthy lifestyle in dealing with stress + one common cause of stress among children", ref: [14, 11, 12], why: "50 #14 covers exercise and meditation, #11 and #12 give the definition and the causes of stress.", marks: "2" },
  { where: "Section B · Q7", label: "Two methods for effective communication with a team of 20", ref: [2, 7], why: "Asks the methods of communication (50 #2) and what makes them effective - feedback (50 #7).", marks: "2" },
  { where: "Section B · Q9", label: "Two measures to take care of digital devices", ref: [25], why: "50 #25 covers why computer care and maintenance is important - the same measures are its answer.", marks: "2" },
  { where: "Section B · Q11", label: "Any four barriers to effective communication with examples", ref: [8], why: "Exactly 50 #8, asked at 4 marks - write the same four barriers with one example each.", marks: "4" },
  { where: "Section B · Q17", label: "What is 7 Cs of effective communication - describe all", ref: [9], why: "Exactly 50 #9, asked at 4 marks - write the seven Cs with one line each.", marks: "4" },
];

export const AI_PYQ_NO_MATCH: { label: string; nearest?: string }[] = [
  { label: "Active listening - what it involves (Section A Q1 (i))" },
  { label: "Time management - what it includes (Section A Q1 (iii)), four steps of effective time management (Section B Q7-style, Q20 area)" },
  { label: "Keyboard shortcut for saving a file - Ctrl + S (Section A Q1 (v))", nearest: "not in the 50 - practise it from the 190 MCQ bank (ICT set)" },
  { label: "Cloud storage service / advantages of cloud computing (Section A Q1 (vi), Section B Q13)", nearest: "not in the 50 - it is in the 190 MCQ bank (ICT set) and in the expected set" },
  { label: "Entrepreneurship - who is an entrepreneur, qualities, two tasks, misconceptions (Section A Q2 (i) and (ii), Section B Q8, Q14, Q20)" },
  { label: "Sustainable development, SDGs, green economy, biodiversity, water and fuel (Section A Q2 (iii)-(v), Q4 (vi), Q5 (i), (iv)-(vi); Section B Q10, Q15, Q16, Q21)" },
  { label: "Spam - junk mails (Section A Q3 (ii))" },
  { label: "Small group communication as a type (Section A Q3 (v))", nearest: "nearest is 50 #2 (methods of communication)" },
  { label: "Recommendation technology behind Spotify, Netflix etc. (Section A Q4 (i))", nearest: "nearest is 50 #30 (Data Science domain)" },
  { label: "Interpersonal intelligence - understanding other people's feelings (Section A Q4 (ii))" },
  { label: "ICT full form (Section A Q4 (v))", nearest: "full forms are in the 190 MCQ bank rapid-fire set" },
  { label: "What effective communication helps us do - read, write, listen (Section A Q4 (iv))", nearest: "nearest is 50 #1 (why communication matters)" },
  { label: "Self-confidence in personal growth and two ways to build it (Section B Q12)", nearest: "nearest is 50 #18 (self-motivation for goals)" },
  { label: "Emotional intelligence in self-management (Section B Q18)" },
  { label: "Threats to a computer - virus, hacking, phishing (Section B Q19)", nearest: "nearest is 50 #25 (computer maintenance)" },
  { label: "Reema the creative entrepreneur (Section A Q3 (vi)) - entrepreneurship again" },
];

/* The big finding of this comparison - worth showing to the student. */
export const AI_PYQ_INSIGHTS: string[] = [
  "The school's 2025-26 paper had NO Part B question at all - it asked only Part A (Employability Skills) plus Entrepreneurship and Green Skills. The new blue print for 2026-27 adds three full Part B units (AI Project Cycle and Ethical Framework, Advanced Modelling, Evaluating Model) worth about half the paper. So the Part B questions in the 50 solved list, the model paper and the 190 MCQ bank are the ones that were never tested by the school paper and are almost certain to appear now.",
  "Opposite way: the 50 solved list has NO question on time management, cloud computing, spam, ICT full form, self-confidence, emotional intelligence or computer threats - all of which the school HAS asked. Those topics are covered in the 190 MCQ bank and the most expected set, so do not skip them just because they are not in the 50.",
  "The three items the school repeated across two different questions are the safest of all: non-verbal communication, barriers to communication and the 7 Cs. All three are in the 50 solved list.",
];
