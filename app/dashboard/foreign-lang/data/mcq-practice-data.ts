// MCQ Practice Data Types and Dummy Data

export interface McqQuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'error-detection' | 'synonyms-antonyms' | 'sentence-completion' | 'word-replacement';
}

export interface McqSessionData {
  id: string;
  title: string;
  questions: McqQuestionData[];
  timeLimit: number; // in minutes
}

// Dummy MCQ Questions Data
export const mcqQuestionsData: McqQuestionData[] = [
  // Grammar Questions
  {
    id: "mcq-1",
    question: "Choose the correct form: 'She _____ to the store yesterday.'",
    options: [
      "go",
      "went",
      "going",
      "goes"
    ],
    correctAnswer: 1, // "went"
    explanation: "'Went' is the correct past tense form of 'go' for this sentence.",
    category: "grammar"
  },
  // Synonyms & Antonyms Questions
  {
    id: "mcq-2",
    question: "What is the synonym of 'happy'?",
    options: [
      "Sad",
      "Joyful",
      "Angry",
      "Tired"
    ],
    correctAnswer: 1, // "joyful"
    explanation: "'Joyful' means feeling or showing great pleasure, which is similar to 'happy'.",
    category: "synonyms-antonyms"
  },

  // Error Detection Questions
  {
    id: "mcq-3",
    question: "Identify the error: 'She don't like apples.'",
    options: [
      "She",
      "don't",
      "like",
      "apples"
    ],
    correctAnswer: 1, // "don't" should be "doesn't"
    explanation: "With the third person singular 'she', the verb should be 'doesn't', not 'don't'.",
    category: "error-detection"
  },

  // Sentence Completion Questions
  {
    id: "mcq-4",
    question: "Complete the sentence: 'I _____ my homework every day.'",
    options: [
      "do",
      "does",
      "doing",
      "done"
    ],
    correctAnswer: 0, // "do"
    explanation: "The correct present simple form with 'I' is 'do'.",
    category: "sentence-completion"
  },
  {
    id: "mcq-9",
    question: "Complete the sentence: 'They _____ playing football now.'",
    options: [
      "is",
      "are",
      "am",
      "be"
    ],
    correctAnswer: 1, // "are"
    explanation: "'Are' is the correct present continuous form for the plural subject 'they'.",
    category: "sentence-completion"
  },
  {
    id: "mcq-10",
    question: "Complete the sentence: 'She _____ a beautiful song yesterday.'",
    options: [
      "sing",
      "sang",
      "singing",
      "sings"
    ],
    correctAnswer: 1, // "sang"
    explanation: "'Sang' is the correct past simple form of 'sing'.",
    category: "sentence-completion"
  },
  {
    id: "mcq-11",
    question: "Complete the sentence: 'We _____ to the party last night.'",
    options: [
      "go",
      "went",
      "going",
      "gone"
    ],
    correctAnswer: 1, // "went"
    explanation: "'Went' is the correct past simple form for the plural subject 'we'.",
    category: "sentence-completion"
  },

  // Word Replacement Questions
  {
    id: "mcq-5",
    question: "Replace the incorrect word: 'The weather is very hotly today.'",
    options: [
      "weather",
      "very",
      "hotly",
      "today"
    ],
    correctAnswer: 2, // "hotly" should be "hot"
    explanation: "'Hot' is the correct adjective form. 'Hotly' is an adverb and doesn't fit here.",
    category: "word-replacement"
  },
  {
    id: "mcq-12",
    question: "Replace the incorrect word: 'She sings very good.'",
    options: [
      "sings",
      "very",
      "good",
      "No replacement needed"
    ],
    correctAnswer: 2, // "good" should be "well"
    explanation: "'Well' is the correct adverb form to modify 'sings'. 'Good' is an adjective.",
    category: "word-replacement"
  },
  {
    id: "mcq-13",
    question: "Replace the incorrect word: 'He is more taller than me.'",
    options: [
      "is",
      "more",
      "taller",
      "than"
    ],
    correctAnswer: 2, // "taller" should be "tall"
    explanation: "With comparative adjectives using 'more', we don't add '-er'. It should be 'more tall'.",
    category: "word-replacement"
  },
  {
    id: "mcq-14",
    question: "Replace the incorrect word: 'I have been there since two years.'",
    options: [
      "have",
      "been",
      "since",
      "two"
    ],
    correctAnswer: 2, // "since" should be "for"
    explanation: "'For' is used with periods of time. 'Since' is used with specific points in time.",
    category: "word-replacement"
  }
];

// Dummy MCQ Session Data
export const mcqSessionsData: McqSessionData[] = [
  {
    id: "mcq-session-1",
    title: "Complete Grammar & Vocabulary Practice",
    questions: [
      // Include 1 question from each category
      mcqQuestionsData.find(q => q.id === "mcq-1")!, // grammar
      mcqQuestionsData.find(q => q.id === "mcq-2")!, // synonyms-antonyms
      mcqQuestionsData.find(q => q.id === "mcq-3")!, // error-detection
      mcqQuestionsData.find(q => q.id === "mcq-4")!, // sentence-completion
      mcqQuestionsData.find(q => q.id === "mcq-5")!  // word-replacement
    ].filter(Boolean), // Filter out any undefined values
    timeLimit: 10 // 10 minutes for 5 questions
  },
  {
    id: "mcq-sentence-completion",
    title: "Sentence Completion Practice",
    questions: mcqQuestionsData.filter(q => q.category === "sentence-completion"),
    timeLimit: 10
  },
  {
    id: "mcq-word-replacement",
    title: "Word Replacement Practice",
    questions: mcqQuestionsData.filter(q => q.category === "word-replacement"),
    timeLimit: 10
  }
];

// Export combined data for easy access
export const allMcqData = {
  sessions: mcqSessionsData,
  questions: mcqQuestionsData
};
