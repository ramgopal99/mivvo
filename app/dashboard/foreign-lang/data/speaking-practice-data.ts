// Speaking Practice Data Types and Dummy Data

export interface SpeakingQuestionData {
  id: string;
  question: string;
  instructions: string;
  hints?: string[];
  expectedKeywords?: string[];
  category: 'listen-speak' | 'describe-picture' | 'role-play' | 'opinion-discussion';
}

export interface SpeakingSessionData {
  id: string;
  title: string;
  questions: SpeakingQuestionData[];
  timeLimit: number; // in minutes per question
  totalTimeLimit: number; // in minutes for entire session
}

// Dummy Speaking Practice Questions
export const speakingQuestionsData: SpeakingQuestionData[] = [
  // Listen & Speak Questions
  {
    id: "speak-1",
    question: "Can you tell me about your favorite hobby? Please speak for at least 30 seconds.",
    instructions: "Describe your favorite hobby in detail. Mention why you enjoy it, how long you've been doing it, and what you like most about it.",
    hints: [
      "Start with: 'My favorite hobby is...'",
      "Include details like how often you do it",
      "Explain why it makes you happy"
    ],
    expectedKeywords: ["hobby", "enjoy", "favorite", "like"],
    category: "listen-speak"
  },
  {
    id: "speak-2",
    question: "Describe your daily routine. What time do you usually wake up and go to bed?",
    instructions: "Talk about what you do every day. Include morning routine, work/study, evening activities, and bedtime.",
    hints: [
      "Use time expressions: 'in the morning', 'after lunch', 'in the evening'",
      "Mention specific times: 'at 7 AM', 'around 10 PM'",
      "Describe sequence: 'first', 'then', 'after that', 'finally'"
    ],
    expectedKeywords: ["wake up", "morning", "evening", "routine", "bed"],
    category: "listen-speak"
  },
  {
    id: "speak-3",
    question: "If you could travel anywhere right now, where would you go and why?",
    instructions: "Choose a destination and explain your choice. Mention what you would do there and why you're interested in that place.",
    hints: [
      "Choose a specific country or city",
      "Explain why you want to visit",
      "Describe activities you would do there"
    ],
    expectedKeywords: ["travel", "visit", "would", "because", "see"],
    category: "listen-speak"
  },

  // Opinion & Discussion Questions
  {
    id: "speak-4",
    question: "Do you think technology has made our lives better or worse? Give reasons for your opinion.",
    instructions: "Share your opinion about technology's impact. Give specific examples of how technology helps or creates problems.",
    hints: [
      "Start with: 'I think...' or 'In my opinion...'",
      "Give examples: social media, smartphones, computers",
      "Use connecting words: 'because', 'however', 'on the other hand'"
    ],
    expectedKeywords: ["technology", "better", "worse", "because", "think"],
    category: "opinion-discussion"
  },
  {
    id: "speak-5",
    question: "What are the advantages and disadvantages of living in a big city?",
    instructions: "Discuss both positive and negative aspects of city life. Compare with living in smaller towns or countryside.",
    hints: [
      "Advantages: jobs, entertainment, transportation",
      "Disadvantages: pollution, expensive, crowded",
      "Use phrases: 'One advantage is...', 'On the other hand...'"
    ],
    expectedKeywords: ["advantages", "disadvantages", "city", "living", "transportation"],
    category: "opinion-discussion"
  }
];

// Dummy Speaking Practice Sessions
export const speakingSessionsData: SpeakingSessionData[] = [
  {
    id: "speaking-session-1",
    title: "Basic Speaking Practice",
    questions: speakingQuestionsData.slice(0, 3), // First 3 questions
    timeLimit: 1, // 1 minute per question
    totalTimeLimit: 5 // 5 minutes total
  },
  {
    id: "speaking-session-2",
    title: "Discussion & Opinions",
    questions: speakingQuestionsData.slice(3, 5), // Questions 4-5
    timeLimit: 2, // 2 minutes per question (more complex)
    totalTimeLimit: 6 // 6 minutes total
  }
];

// Export combined data for easy access
export const allSpeakingData = {
  sessions: speakingSessionsData,
  questions: speakingQuestionsData
};

