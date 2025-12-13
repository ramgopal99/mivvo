// Speaking Practice Data Types and Dummy Data

export interface SpeakingQuestionData {
  id: string;
  question: string;
  category: 'listen-speak' | 'listen-repeat' | 'describe-picture' | 'role-play' | 'opinion-discussion';
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
  // Listen & Speak Questions (main questions to answer)
  {
    id: "speak-1",
    question: "Can you tell me about your favorite hobby? Please speak for at least 30 seconds.",
    category: "listen-speak"
  },
  {
    id: "speak-2",
    question: "Describe your daily routine. What time do you usually wake up and go to bed?",
    category: "listen-speak"
  },
  {
    id: "repeat-1",
    question: "The quick brown fox jumps over the lazy dog.",
    category: "listen-repeat"
  },
  {
    id: "repeat-2",
    question: "How are you doing today? I hope you're having a wonderful day.",
    category: "listen-repeat"
  },
];

// Dummy Speaking Practice Sessions
export const speakingSessionsData: SpeakingSessionData[] = [
  {
    id: "speaking-session-1",
    title: "Complete Speaking Practice",
    questions: speakingQuestionsData, // All 4 questions (2 speak + 2 repeat)
    timeLimit: 1, // 1 minute per question
    totalTimeLimit: 4 // 4 minutes total
  },
];

// Individual speaking question sessions (similar to reading comprehension sessions)
export interface SpeakingQuestionSessionData {
  id: string;
  title: string;
  question: SpeakingQuestionData;
  timeLimit: number; // in minutes per question
}

// Create individual question sessions from the questions data
export const speakingQuestionSessions: SpeakingQuestionSessionData[] = speakingQuestionsData.map((question, index) => ({
  id: `speaking-question-${index + 1}`,
  title: `${question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - Question ${index + 1}`,
  question,
  timeLimit: 1 // 1 minute per question
}));

// Export combined data for easy access
export const allSpeakingData = {
  sessions: speakingSessionsData,
  questions: speakingQuestionsData,
  questionSessions: speakingQuestionSessions
};

