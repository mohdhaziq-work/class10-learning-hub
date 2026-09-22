/* AI Half Yearly model paper - Section A, Question 1 to 3 (Part A: Employability Skills).
   Each set has 6 items of which the student attempts only the number printed in the blue print. */
import type { AiObqSet } from "./aiHyTypes";

export const AI_HY_PAPER_A1: AiObqSet[] = [
  {
    id: "A1",
    heading: "Question 1 - Answer any four (4 x 1 = 4)",
    unit: "Part A - Unit 1: Communication Skills",
    pick: "Any 4 out of 6",
    marks: 1,
    items: [
      {
        q: "Communication is complete only when:",
        o: ["the sender has spoken clearly", "the receiver understands the message and gives feedback", "the message is written down", "a modern channel like e-mail is used"],
        a: 1,
        why: "Feedback confirms that the receiver understood the message as the sender meant it - that is when the cycle completes.",
      },
      {
        q: "Tone, pitch and loudness of the voice are together called:",
        o: ["paralanguage", "visual communication", "jargon", "body language"],
        a: 0,
        why: "Paralanguage is HOW something is said - tone, pitch, volume, speed and pauses - not the words themselves.",
      },
      {
        q: "Which one of the following is NOT a barrier to effective communication?",
        o: ["Noise in the room", "Use of difficult technical words", "Prejudice about the speaker", "Active listening by the receiver"],
        a: 3,
        why: "Active listening removes barriers; the other three are physical, language and emotional barriers.",
      },
      {
        q: "Communication between only two persons (for example a student and a teacher) is called:",
        o: ["intrapersonal communication", "interpersonal communication", "public communication", "mass communication"],
        a: 1,
        why: "Interpersonal = between two or a very small number of people. Intrapersonal is within oneself (talking to yourself).",
      },
      {
        q: "Assertion (A): Giving feedback makes communication a two-way process.\nReason (R): Feedback tells the sender whether the message has been understood.",
        o: ["Both (A) and (R) are correct and (R) is the correct explanation of (A)", "Both (A) and (R) are correct but (R) is not the correct explanation of (A)", "(A) is correct but (R) is not correct", "(A) is not correct but (R) is correct"],
        a: 0,
        why: "Feedback completes the communication cycle - that is exactly the reason given in R, so R explains A.",
      },
      {
        q: "Which of these is a written method of communication?",
        o: ["Telephone call", "E-mail", "Video call", "Nodding the head"],
        a: 1,
        why: "E-mail uses words in written form. Calls and video calls are oral; nodding is non-verbal.",
      },
    ],
  },
  {
    id: "A2",
    heading: "Question 2 - Answer any five (5 x 1 = 5)",
    unit: "Part A - Unit 2: Self Management Skills",
    pick: "Any 5 out of 6",
    marks: 1,
    items: [
      {
        q: "Stress is:",
        o: ["the body's reaction to pressure or demanding situations", "always a disease", "caused only by examinations", "a kind of physical injury"],
        a: 0,
        why: "Stress is the physical or mental reaction of the body when demands feel bigger than our ability to handle them.",
      },
      {
        q: "Which of the following is the best example of time management?",
        o: ["Doing easy work first and leaving difficult work for the end", "Writing a to-do list and finishing work in order of priority", "Starting without any plan", "Postponing work that looks difficult"],
        a: 1,
        why: "A to-do list with priorities finishes important work first and removes last-minute pressure.",
      },
      {
        q: "Knowing your own strengths, weaknesses and feelings is called:",
        o: ["self-awareness", "self-motivation", "self-regulation", "self-confidence"],
        a: 0,
        why: "Self-awareness is understanding your own emotions, strengths, weaknesses and how your behaviour affects others.",
      },
      {
        q: "Which one of the following is NOT a quality of a self-motivated person?",
        o: ["Takes initiative without being told", "Sets goals and works for them", "Waits for others to push all the time", "Works independently"],
        a: 2,
        why: "A self-motivated person has an inner drive; waiting for others to push means the drive is missing.",
      },
      {
        q: "Assertion (A): Positive thinking helps a student deal with stress.\nReason (R): It changes the way the student looks at a difficult situation.",
        o: ["Both (A) and (R) are correct and (R) is the correct explanation of (A)", "Both (A) and (R) are correct but (R) is not the correct explanation of (A)", "(A) is correct but (R) is not correct", "(A) is not correct but (R) is correct"],
        a: 0,
        why: "Positive thinking works exactly because it replaces 'I cannot do this' with a plan of action - R explains A.",
      },
      {
        q: "In SMART goals, S stands for Specific, M for Measurable, A for Achievable, R for Relevant and T for:",
        o: ["Temporary", "Time-bound", "Theoretical", "Tough"],
        a: 1,
        why: "A goal without a deadline is only a wish - every SMART goal carries a time limit.",
      },
    ],
  },
  {
    id: "A3",
    heading: "Question 3 - Answer any five (5 x 1 = 5)",
    unit: "Part A - Unit 3: ICT Skills",
    pick: "Any 5 out of 6",
    marks: 1,
    items: [
      {
        q: "Which one of the following is an operating system?",
        o: ["MS Word", "Windows 10", "Google Chrome", "MS Paint"],
        a: 1,
        why: "An operating system manages the whole computer - Windows, Linux, macOS and Android are operating systems. Word and Chrome are application software.",
      },
      {
        q: "In the file name song.mp3, the part .mp3 is called the:",
        o: ["folder", "file extension", "drive", "path"],
        a: 1,
        why: "The extension after the dot tells the computer what type of file it is and which app opens it.",
      },
      {
        q: "The keyboard shortcut Ctrl + S is used to:",
        o: ["select all the text", "save the file", "paste the copied text", "print the file"],
        a: 1,
        why: "Ctrl + S saves. (Ctrl + A select all, Ctrl + V paste, Ctrl + P print.)",
      },
      {
        q: "Unwanted junk e-mails that fill up your inbox are called:",
        o: ["spam", "cookies", "cache", "backup"],
        a: 0,
        why: "Spam means junk mail - usually advertisements. Mark it as spam and delete it instead of opening it.",
      },
      {
        q: "A malicious program that copies itself and damages the computer is:",
        o: ["a browser", "a virus", "a driver", "a plug-in"],
        a: 1,
        why: "A computer virus copies itself and harms files. Antivirus software and regular updates protect against it.",
      },
      {
        q: "Which of the following is NOT a good practice for taking care of digital devices?",
        o: ["Keeping the device away from water and dust", "Updating the software regularly", "Cleaning the screen with a soft cloth", "Leaving the device near a heater or in direct sun"],
        a: 3,
        why: "Heat and direct sunlight damage the battery and circuits - devices must be kept in a cool, dry place.",
      },
    ],
  },
];
