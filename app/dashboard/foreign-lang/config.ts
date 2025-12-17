// Comprehensive Foreign Language Learning Configuration
// All settings in one place for easy management

// =============================================================================
// LANGUAGE CONFIGURATION
// =============================================================================

export interface LanguageDefinition {
  language: string;  // Database identifier (e.g., "ENGLISH", "FRENCH", "SPANISH")
  name: string;      // Display name (e.g., "English", "French", "Spanish")
  code: string;      // ISO code (e.g., "en", "fr", "es")
  flag?: string;     // Optional flag emoji
  isActive: boolean; // Whether this language is available
}

export const availableLanguages: LanguageDefinition[] = [
  {
    language: "ENGLISH",
    name: "English",
    code: "en",
    flag: "🇺🇸",
    isActive: true
  },
  {
    language: "FRENCH",
    name: "French",
    code: "fr",
    flag: "🇫🇷",
    isActive: true
  },
  // Add new languages here as needed:
  // {
  //   language: "SPANISH",
  //   name: "Spanish",
  //   code: "es",
  //   flag: "🇪🇸",
  //   isActive: true
  // },
  // {
  //   language: "GERMAN",
  //   name: "German",
  //   code: "de",
  //   flag: "🇩🇪",
  //   isActive: true
  // }
];

// =============================================================================
// CEFR LEVEL CONFIGURATION
// =============================================================================

export interface CEFRLevelDefinition {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  name: string;
  description: string;
  totalTargetScore: number;  // Total points needed for level (cumulative)
  skillTargetScore: number;  // Points needed per skill (cumulative)
  totalRange: { min: number; max: number };  // Cumulative range for total points
  order: number;
  vocabulary: string;
  grammar: string;
  complexity: string;
}

export const cefrLevels: CEFRLevelDefinition[] = [
  {
    level: 'A1',
    name: 'A1 - Beginner',
    description: 'Basic vocabulary and simple sentences',
    totalTargetScore: 200,
    skillTargetScore: 50,
    totalRange: { min: 0, max: 200 },
    order: 1,
    vocabulary: 'basic words, numbers, colors, family members, food, daily routines',
    grammar: 'present simple, basic questions, possessive adjectives',
    complexity: 'very simple sentences, common phrases, basic personal information'
  },
  {
    level: 'A2',
    name: 'A2 - Elementary',
    description: 'Simple everyday communication',
    totalTargetScore: 400,
    skillTargetScore: 100,
    totalRange: { min: 200, max: 600 },
    order: 2,
    vocabulary: 'extended basic vocabulary, hobbies, jobs, weather, shopping',
    grammar: 'past simple, future with going to, comparatives, basic modals',
    complexity: 'simple connected sentences, familiar topics, personal experiences'
  },
  {
    level: 'B1',
    name: 'B1 - Intermediate',
    description: 'Independent communication',
    totalTargetScore: 600,
    skillTargetScore: 150,
    totalRange: { min: 400, max: 600 },
    order: 3,
    vocabulary: 'wider range of vocabulary, abstract concepts, opinions',
    grammar: 'present perfect, past continuous, conditionals, relative clauses',
    complexity: 'connected texts, complex sentences, variety of topics'
  },
  {
    level: 'B2',
    name: 'B2 - Upper Intermediate',
    description: 'Fluent communication',
    totalTargetScore: 800,
    skillTargetScore: 200,
    totalRange: { min: 600, max: 800 },
    order: 4,
    vocabulary: 'wide range of vocabulary, idiomatic expressions, specialized terms',
    grammar: 'all tenses, complex structures, passive voice, advanced modals',
    complexity: 'detailed texts, abstract topics, nuanced expressions'
  },
  {
    level: 'C1',
    name: 'C1 - Advanced',
    description: 'Effective operational proficiency',
    totalTargetScore: 1000,
    skillTargetScore: 250,
    totalRange: { min: 800, max: 1000 },
    order: 5,
    vocabulary: 'rich vocabulary, formal/informal registers, figurative language',
    grammar: 'sophisticated structures, advanced grammar patterns',
    complexity: 'complex texts, academic language, subtle distinctions'
  },
  {
    level: 'C2',
    name: 'C2 - Proficient',
    description: 'Mastery',
    totalTargetScore: 1200,
    skillTargetScore: 300,
    totalRange: { min: 1000, max: 1200 },
    order: 6,
    vocabulary: 'extensive vocabulary, literary language, cultural references',
    grammar: 'all grammar structures, creative use of language',
    complexity: 'very complex texts, abstract concepts, implied meanings'
  }
];

// =============================================================================
// PRACTICE CONFIGURATION
// =============================================================================

export const practiceConfig = {
  // Number of questions per category for each skill
  questionCounts: {
    reading: {
      comprehension: 1, // 1 comprehension question
      rearrange: 1,     // 1 rearrange task
    },
    writing: {
      topics: 1,        // 1 writing topic
      chat: 1,          // 1 chat scenario
    },
    speaking: {
      'listen-speak': 1,   
      'listen-repeat': 1,   
    },
    mcq: {
      grammar: 1,              // 1 grammar question
      'error-detection': 1,    // 1 error detection question
      'synonyms-antonyms': 1,  // 1 synonyms/antonyms question
      'sentence-completion': 1, // 1 sentence completion question
      'word-replacement': 1,   // 1 word replacement question
    }, // Total: 5 questions, 1 from each topic
  },

  // Time limits (in minutes)
  timeLimits: {
    reading: 30,
    writing: 45,
    speaking: 20,
    mcq: 15,
  },

  // Speaking recording configuration
  speakingRecording: {
    maxRecordingTime: 30, // 30 seconds
    apiRestartInterval: 6, // Restart API every 6 seconds
  },

  // OpenAI configuration
  openai: {
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2000,
  }
};

// =============================================================================
// SKILL CONFIGURATION
// =============================================================================

export const skillConfig = {
  reading: {
    title: "Reading",
    icon: "BookOpen",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "Build a strong foundation by mastering essential vocabulary and sentence patterns. Dive into engaging passages that bring language to life through stories and practical content.",
  },
  writing: {
    title: "Writing + AI Chat",
    icon: "PenTool",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Express yourself clearly and confidently. Master essential writing skills while engaging in interactive AI conversations that make learning grammar and vocabulary enjoyable.",
  },
  speaking: {
    title: "Speaking + Listening",
    icon: "Volume2",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    description: "Develop natural speaking skills through interactive listening and speaking exercises. Perfect your pronunciation while mastering everyday conversations and building communication confidence.",
  },
  mcq: {
    title: "MCQ-Based Section",
    icon: "HelpCircle",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    description: "Sharpen your language precision through targeted multiple-choice challenges. Master grammar rules, vocabulary nuances, and sentence construction with instant feedback and detailed explanations.",
  },
};

// =============================================================================
// PRACTICE TYPES CONFIGURATION
// =============================================================================

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

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Language helpers
export const getActiveLanguages = () => {
  return availableLanguages.filter(lang => lang.isActive);
};

export const getLanguageByCode = (code: string) => {
  return availableLanguages.find(lang => lang.code === code && lang.isActive);
};

export const getLanguageByIdentifier = (identifier: string) => {
  return availableLanguages.find(lang => lang.language === identifier && lang.isActive);
};

// CEFR Level helpers
export const getCEFRLevel = (level: string) => {
  return cefrLevels.find(l => l.level === level);
};

export const getAllCEFRLevels = () => {
  return cefrLevels;
};

export const getCEFRLevelByOrder = (order: number) => {
  return cefrLevels.find(l => l.order === order);
};

// =============================================================================
// POINTS SYSTEM CONFIGURATION
// =============================================================================

// Points awarded based on score ranges
export const scorePointsConfig = [
  { minScore: 1, maxScore: 20, points: 1 },
  { minScore: 21, maxScore: 40, points: 2 },
  { minScore: 41, maxScore: 60, points: 3 },
  { minScore: 61, maxScore: 80, points: 4 },
  { minScore: 81, maxScore: 100, points: 5 }
];

// Calculate points based on score
export const calculatePointsFromScore = (score: number): number => {
  const roundedScore = Math.round(score);
  const config = scorePointsConfig.find(
    range => roundedScore >= range.minScore && roundedScore <= range.maxScore
  );
  return config ? config.points : 0;
};

// Type definitions
export type SkillType = "reading" | "writing" | "speaking" | "mcq";
export type LanguageValue = "english" | "french" | "spanish" | "german" | "japanese";
export type ReadingCategory = "comprehension" | "rearrange";