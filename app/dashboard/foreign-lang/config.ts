export const skillConfig = {
  reading: {
    title: "Reading",
    icon: "BookOpen",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "Master basic vocabulary and simple sentence structures. Learn to understand familiar words, phrases, and basic texts.",
  },
  writing: {
    title: "Writing",
    icon: "PenTool",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Practice writing simple sentences and basic personal information. Learn fundamental grammar rules and common expressions.",
  },
  speaking: {
    title: "Speaking + Listening",
    icon: "Volume2",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    description: "Build confidence in basic conversations. Practice simple greetings, introductions, and everyday expressions with proper pronunciation.",
  },
  mcq: {
    title: "MCQ-Based Section",
    icon: "HelpCircle",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    description: "Test your basic grammar knowledge with simple multiple-choice questions covering tenses, prepositions, and sentence structure.",
  },
};

export const languages = [
  { value: "english", label: "English" },
  { value: "french", label: "French" },
];

export const readingPracticeTypes = [
  {
    id: "reading-comprehension",
    title: "Reading Comprehension",
    icon: "📖",
    description: "Read a passage and answer related questions to test your understanding."
  },
  {
    id: "rearrange-sentences",
    title: "Rearrange Sentences",
    icon: "🔀",
    description: "Organize scrambled lines into a meaningful order to practice sentence structure."
  }
];

export const mcqPracticeTypes = [
  {
    id: "grammar-mcq",
    title: "Grammar MCQ",
    icon: "📚",
    description: "Covers tenses, prepositions, sentence structure, and article usage in one unified module."
  },
  {
    id: "error-detection",
    title: "Error Detection",
    icon: "🔍",
    description: "Identify and correct grammar or syntax errors."
  },
  {
    id: "synonyms-antonyms",
    title: "Synonyms & Antonyms",
    icon: "⚖️",
    description: "Vocabulary and meaning comparison tasks."
  },
  {
    id: "sentence-completion",
    title: "Sentence Completion",
    icon: "✏️",
    description: "Fill missing words to complete correct sentences."
  },
  {
    id: "word-replacement",
    title: "Word Replacement",
    icon: "🔄",
    description: "Swap unnatural or wrong words for better alternatives."
  }
];

export const speakingPracticeTypes = [
  {
    id: "listen-speak-response",
    title: "Listen + Speak Response",
    icon: "🎧",
    description: "User listens to a short audio prompt or question and answers verbally; tests active listening and spontaneous speaking ability."
  }
];

// Question/Response/Topic count options
export const questionCountOptions = {
  mcq: [5, 10],
  speaking: [3, 5, 8, 10],
  writing: [1, 2],
  readingComprehension: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  rearrangeSentences: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

export type SkillType = "reading" | "writing" | "speaking" | "mcq";
export type LanguageValue = "english" | "french";
