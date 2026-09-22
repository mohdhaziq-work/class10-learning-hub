/* AI Half Yearly - old school paper (2025-26) with full solutions.
   Transcribed from the paper photos: Section A objective (24 marks), Section B subjective (26 marks).
   Parts that were torn or smudged in the photo are marked in the note field. */
import type { AiOldQ } from "./aiHyTypes";

export const AI_OLD_PAPER_META = {
  school: "SK Presidency Public School",
  exam: "Half Yearly Exam (2025-26)",
  cls: "CLASS-10th",
  subject: "Artificial Intelligence",
  time: "2 hours",
  max: "M.M. 50",
  note: "Same paper pattern as the new blue print - 21 questions in two sections (A: objective 24 marks, B: subjective 26 marks).",
};

export const AI_OLD_SECTION_A: AiOldQ[] = [
  {
    n: 1,
    sec: "A",
    q: "Answer any four out of the given six questions on employability skills (4 x 1 = 4).\n(i) Active listening involves: (a) Interrupting often (b) Giving full attention to the speaker (c) Avoiding body language (d) Avoiding eye contact\n(ii) Which of the following is a non-verbal communication? (a) Telephone call (b) Email (c) Facial expressions (d) Letter\n(iii) Time management includes: (a) Wasting time to relax (b) Prioritizing tasks (c) Avoiding planning (d) Ignoring deadlines\n(iv) Which of the following is a quality of a self-motivated person? (a) Procrastination (b) Taking initiative (c) Laziness (d) Avoiding responsibility\n(v) Shortcut key for saving a file is: (a) Ctrl + P (b) Ctrl + S (c) Ctrl + C (d) Ctrl + V\n(vi) Which is an example of a cloud storage service? (a) Microsoft Word (b) Google Drive (c) Paint (d) Calculator",
    ans: "(i) (b) Giving full attention to the speaker - active listening means full attention, no interruption.\n(ii) (c) Facial expressions - messages without words.\n(iii) (b) Prioritizing tasks - finishing important work first.\n(iv) (b) Taking initiative - an inner drive, no push needed from others.\n(v) (b) Ctrl + S - S for save (Ctrl + P print, Ctrl + C copy, Ctrl + V paste).\n(vi) (b) Google Drive - files are stored on the internet, not on the computer only.",
  },
  {
    n: 2,
    sec: "A",
    q: "Answer any five out of the given six (5 x 1 = 5).\n(i) An entrepreneur is a person who: (a) Follows orders only (b) Creates and manages a business (c) Works without risk (d) Avoids innovation\n(ii) Which of the following is not a characteristic of an entrepreneur? (a) Risk-taking ability (b) Creativity (c) Laziness (d) Decision-making ability\n(iii) Sustainable development means: (a) Exploiting all natural resources (b) Meeting present needs without harming future needs (c) Using resources as fast as possible (d) Ignoring environmental protection\n(iv) Which of the following is a renewable source of energy? (a) Coal (b) Petroleum (c) Solar energy (d) Natural gas\n(v) Which practice is environment friendly? (a) Deforestation (b) Burning waste in the open (c) Recycling (d) Wastage of water\n(vi) Assertion (A): When a machine is able to mimic human traits, it is said to be artificially intelligent. Reason (R): A fully automatic washing machine is artificially intelligent.\n(a) Both (A) and (R) are correct and (R) is the correct explanation of (A)\n(b) Both (A) and (R) are correct but (R) is not the correct explanation of (A)\n(c) (A) is correct but (R) is not correct\n(d) (A) is not correct but (R) is correct",
    ans: "(i) (b) Creates and manages a business - an entrepreneur starts and runs an enterprise and bears the risk.\n(ii) (c) Laziness - the rest are real entrepreneurial qualities.\n(iii) (b) Meeting present needs without harming future needs.\n(iv) (c) Solar energy - coal, petroleum and natural gas are non-renewable.\n(v) (c) Recycling - it saves raw material and reduces waste.\n(vi) (c) (A) is correct but (R) is not correct - a fully automatic washing machine only follows fixed instructions, it does not learn or mimic human intelligence.",
    note: "Options 2(iv)(a) and 2(v)(b) were partly unreadable in the photo; the standard options are shown.",
  },
  {
    n: 3,
    sec: "A",
    q: "Answer any five out of the given six (5 x 1 = 5).\n(i) Which of the following does not help in stress management? (a) Healthy food (b) Sound sleep (c) Yoga asanas (d) Negative thoughts\n(ii) Spam refers to: (a) Unnecessary images (b) Temporary files (c) Junk mails (d) Music files\n(iii) Assertion (A): Sustainable agriculture is environment friendly. Reason (R): It prevents use of chemical fertilizers to protect soil.\n(a) Both (A) and (R) are correct and (R) is the correct explanation of (A)\n(b) Both (A) and (R) are correct but (R) is not the correct explanation of (A)\n(c) (A) is correct but (R) is not correct\n(d) (A) is not correct but (R) is correct\n(iv) Which of the following is not a step to build self-motivation? (a) Focusing on your goal (b) Recognising the obstacles to achieving your goal (c) Being indiscipline (d) Finding out your strength\n(v) Which type of communication takes place when the number of people is small enough to communicate with each other effectively? (a) Interpersonal communication (b) Public communication (c) Intrapersonal communication (d) Small group communication\n(vi) Reema has started her own restaurant. She keeps on trying new ideas to make different dishes for her customers. As an entrepreneur, Reema is: (a) Impatient (b) Creative (c) Under-confident (d) Lazy",
    ans: "(i) (d) Negative thoughts - they increase stress; healthy food, sleep and yoga reduce it.\n(ii) (c) Junk mails.\n(iii) (a) Both are correct and (R) explains (A) - sustainable agriculture cuts chemical fertilizer use, which protects the soil and the environment.\n(iv) (c) Being indiscipline - discipline is needed to build self-motivation.\n(v) (d) Small group communication - a small number of people can interact effectively with each other.\n(vi) (b) Creative - trying new ideas and dishes shows creativity.",
  },
  {
    n: 4,
    sec: "A",
    q: "Answer any five out of the given six (5 x 1 = 5).\n(i) Platforms such as Spotify, Facebook, Instagram, Amazon, Netflix etc. show recommendations on the basis of what you like. Which technology is behind this? (a) Human intelligence (b) Platform Intelligence (c) Artificial Intelligence (d) Application Intelligence\n(ii) The ability to understand other people's feelings is known as: (a) Intrapersonal Intelligence (b) Interpersonal Intelligence (c) Naturalist Intelligence (d) Musical Intelligence\n(iii) Which is an application of Artificial Intelligence? (a) A simple calculator (b) A handwritten letter (c) An automated voice assistant (d) A physical notebook\n(iv) Effective communication helps us ______ properly. (a) Read (b) Write (c) Listen (d) All of the above\n(v) ICT stands for ______. (a) Inform and Communicate technology (b) Information and Communication technology (c) Inform and Communication technology (d) Information and Communicate technology\n(vi) Which of the following is NOT a goal for sustainable development that will be met by 2030? (a) Gender Equality (b) Good Health and Wellbeing (c) Space Research (d) Zero Hunger",
    ans: "(i) (c) Artificial Intelligence - the recommendation engine learns from your past choices.\n(ii) (b) Interpersonal Intelligence - understanding other people's feelings and behaviour.\n(iii) (c) An automated voice assistant - it understands speech and replies (NLP). A calculator only calculates.\n(iv) (d) All of the above - communication improves reading, writing and listening together.\n(v) (b) Information and Communication technology.\n(vi) (c) Space Research - the 17 SDGs do not include a space research goal.",
  },
  {
    n: 5,
    sec: "A",
    q: "Answer any five out of the given six (5 x 1 = 5).\n(i) The Sustainable Development Goals (SDGs) were launched at the ______.\n(ii) Which one of the following is NOT a barrier to effective communication? (a) Noise (b) Language difference (c) Prejudice (d) Full attention\n(iii) Which of the following is an example of non-verbal communication? (a) Verbal Communication (b) Non-Verbal Communication (c) Visual Communication (d) Written Communication\n(iv) Green economy means an economy that is ______.\n(v) United Nations Sustainable Development Summit launched in New York in the year of: (a) 2010 (b) 2012 (c) 2015 (d) 2020\n(vi) ______ means development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
    ans: "(i) United Nations Sustainable Development Summit in New York, in 2015.\n(ii) (d) Full attention - it removes barriers, it is not one.\n(iii) (b) Non-Verbal Communication - gestures, expressions and body language need no words.\n(iv) Green economy = an economy that is low-carbon, resource-efficient and socially inclusive (growth without harming the environment).\n(v) (c) 2015 - the 17 SDGs were adopted on 25 September 2015, to be met by 2030.\n(vi) Sustainable development.",
    note: "In the photo, items (i), (iii), (iv) and (vi) are cut/muddy; the standard wording of these questions is shown with the answer.",
  },
];

export const AI_OLD_SECTION_B: AiOldQ[] = [
  {
    n: 6,
    sec: "B",
    q: "Explain the importance of following a healthy lifestyle in effectively dealing with stress. Write any one common factor that causes stress among children nowadays.",
    ans: "A healthy lifestyle keeps the body and mind strong, so pressure is handled calmly. Good food, exercise, yoga and 7-8 hours of sleep refresh the mind and lower anxiety. One common cause of stress among children today is comparison with classmates and parents' expectations of high marks.",
  },
  {
    n: 7,
    sec: "B",
    q: "If you are a team leader of a team of 20 people in an organization, mention any two methods that you will use for effective communication with your team members.",
    ans: "First, regular team meetings and short written notes so that every member gets the same clear message. Second, two-way communication - listening to the members and giving feedback, so doubts are cleared at once.",
  },
  {
    n: 8,
    sec: "B",
    q: "Write any two tasks that entrepreneurs do when they run their business.",
    ans: "They plan the business, arrange money and resources, and manage the day-to-day work of production or service. They also study the market and customers, take risks and try new ideas to grow the business.",
  },
  {
    n: 9,
    sec: "B",
    q: "Enlist any two measures that an individual should follow to take care of his/her digital devices.",
    ans: "Keep the device in a clean, dry and cool place away from water, dust and heat, and use a protective cover. Update the software and antivirus regularly, and clean the screen with a soft dry cloth.",
  },
  {
    n: 10,
    sec: "B",
    q: "Discuss the following problems related to sustainable development: (i) Water (ii) Fuel",
    ans: "Water: only a small part of the earth's water is fresh, and it is wasted in taps, taps leaking and crops grown with flood irrigation, so rain-water harvesting and drip irrigation are needed. Fuel: coal and petroleum are limited and polluting, so we must save energy and shift to solar and wind power.",
  },
  {
    n: 11,
    sec: "B",
    q: "Explain any four barriers to effective communication with examples.",
    ans: "Physical barrier - loud noise or weak network hides the message. Language barrier - difficult words or a different language confuse the listener. Emotional barrier - anger or fear stops a person from listening properly. Cultural barrier - a gesture that is respectful in one culture may be rude in another.",
  },
  {
    n: 12,
    sec: "B",
    q: "Why is self-confidence important in personal growth? Write two ways to improve it.",
    ans: "Self-confidence gives a person the courage to take part, try new things and accept mistakes without fear, which speeds up personal growth. Improve it by preparing well before a task - practice removes hesitation - and by thinking positively while setting small goals and finishing them.",
  },
  {
    n: 13,
    sec: "B",
    q: "What are the advantages of using cloud computing? Give examples.",
    ans: "In cloud computing the data and software are stored on the internet, so files can be opened from any device, sharing is easy, backups are safe and no big memory is needed on the computer. Examples: Google Drive, OneDrive, Google Docs and online photo storage.",
  },
  {
    n: 14,
    sec: "B",
    q: "Explain any four qualities of a successful entrepreneur.",
    ans: "Risk-taking: ready to invest and try even when the result is uncertain. Creativity: finds new ideas and better ways. Decision-making: takes quick but careful decisions. Self-motivation and hard work: keeps working without being pushed, and learns from failure instead of quitting.",
  },
  {
    n: 15,
    sec: "B",
    q: "Why is biodiversity important for sustainable development? Explain with reasons.",
    ans: "Biodiversity keeps nature balanced - plants, animals and micro-organisms support each other in the food chain. It gives us food, medicine, clean air and fertile soil, protects against floods and crop pests, and keeps the environment healthy for future generations, which is the aim of sustainable development.",
  },
  {
    n: 16,
    sec: "B",
    q: "Write any four practices that promote a green economy.",
    ans: "Use renewable energy such as solar and wind power instead of coal. Save water by rain-water harvesting and drip irrigation. Reduce, reuse and recycle waste instead of burning it. Grow more trees and use public transport or cycling to cut pollution.",
  },
  {
    n: 17,
    sec: "B",
    q: "What is 7 Cs of effective communication? Describe all.",
    ans: "The 7 Cs are the rules for making a message effective. Clear - easy to understand. Concise - short, without extra words. Concrete - specific, with facts and figures. Correct - right information, grammar and spelling. Coherent - logical and properly connected. Complete - carries every detail the receiver needs. Courteous - polite and respectful in tone.",
  },
  {
    n: 18,
    sec: "B",
    q: "What is emotional intelligence in self-management skills?",
    ans: "Emotional intelligence is the ability to recognise, understand and control one's own emotions, and to understand the feelings of others. A student with emotional intelligence stays calm in pressure, does not lose temper at criticism, and handles friendship or family problems sensibly. It builds self-regulation and better relationships.",
  },
  {
    n: 19,
    sec: "B",
    q: "What are the threats to a computer?",
    ans: "A computer faces many threats. Virus and malware damage files, ransomware locks data and demands money, phishing mails steal passwords and bank details, hacking breaks into accounts, and spyware secretly watches activity. Spam and unsafe downloads also carry these dangers, so an updated antivirus, strong passwords and regular backups are necessary.",
  },
  {
    n: 20,
    sec: "B",
    q: "What are the misconceptions of entrepreneurship?",
    ans: "Common misconceptions are: entrepreneurs are born, not made; they must always be rich or highly educated; they only want money; they take blind, needless risks; and they must work alone. In truth, entrepreneurship can be learnt, starts small, means planned risk-taking and needs teamwork, planning and hard work.",
  },
  {
    n: 21,
    sec: "B",
    q: "What is SDG? Why do we have to take care of sustainable development?",
    ans: "SDG means Sustainable Development Goals - 17 goals adopted by the United Nations in 2015, to be achieved by 2030, such as no poverty, zero hunger, good health, quality education, gender equality and climate action. We must work for sustainable development because the earth's resources are limited; meeting today's needs without spoiling them protects the future of the coming generations.",
  },
];
