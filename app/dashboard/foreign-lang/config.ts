export const levelDescriptions = {
  A1: {
    reading: "Master basic vocabulary and simple sentence structures. Learn to understand familiar words, phrases, and basic texts.",
    writing: "Practice writing simple sentences and basic personal information. Learn fundamental grammar rules and common expressions.",
    speaking: "Build confidence in basic conversations. Practice simple greetings, introductions, and everyday expressions with proper pronunciation.",
    mcq: "Test your basic grammar knowledge with simple multiple-choice questions covering tenses, prepositions, and sentence structure."
  },
  A2: {
    reading: "Expand vocabulary and comprehension of short texts. Learn to understand routine information and familiar topics.",
    writing: "Write short, simple texts about familiar topics. Practice basic paragraph structure and common connectors.",
    speaking: "Participate in simple conversations about daily life. Improve pronunciation and use basic question forms.",
    mcq: "Practice elementary grammar and vocabulary with MCQs on sentence completion, basic synonyms, and error detection."
  },
  B1: {
    reading: "Read and understand main points of clear texts on familiar matters. Comprehend straightforward factual information.",
    writing: "Write clear, well-structured texts on familiar topics. Express ideas and opinions with appropriate language.",
    speaking: "Handle most situations while traveling. Describe experiences, events, and opinions with reasonable fluency.",
    mcq: "Challenge yourself with intermediate grammar MCQs, word replacement tasks, and antonym identification exercises."
  },
  B2: {
    reading: "Understand main ideas of complex texts. Recognize implicit meaning and author's viewpoint in various texts.",
    writing: "Write clear, detailed texts on wide range of topics. Structure arguments logically and use appropriate style.",
    speaking: "Express ideas spontaneously and fluently. Discuss abstract topics and defend opinions with detailed explanations.",
    mcq: "Master upper-intermediate concepts with advanced grammar MCQs, sophisticated synonyms/antonyms, and complex sentence completion."
  },
  C1: {
    reading: "Understand wide range of demanding texts. Recognize implicit meaning and cultural references in complex materials.",
    writing: "Write well-structured, detailed texts on complex subjects. Demonstrate sophisticated control of language and style.",
    speaking: "Express ideas fluently with natural phrasing. Use language flexibly for social, academic, and professional purposes.",
    mcq: "Excel in advanced grammar and vocabulary with challenging MCQs on nuanced word choice and complex linguistic structures."
  },
  C2: {
    reading: "Understand virtually everything heard or read with ease. Comprehend implicit and figurative language effortlessly.",
    writing: "Write with complete fluency and precision. Create sophisticated, nuanced texts that demonstrate mastery of language.",
    speaking: "Express complex ideas with complete fluency. Participate effortlessly in any conversation with native-like proficiency.",
    mcq: "Demonstrate native-like proficiency with expert-level MCQs covering the most sophisticated aspects of grammar and vocabulary."
  }
};

export const skillConfig = {
  reading: {
    title: "Reading",
    icon: "BookOpen",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  writing: {
    title: "Writing",
    icon: "PenTool",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  speaking: {
    title: "Speaking + Listening",
    icon: "Volume2",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  mcq: {
    title: "MCQ-Based Section",
    icon: "HelpCircle",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
};

export const languages = [
  { value: "english", label: "English" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "spanish", label: "Spanish" },
  { value: "japanese", label: "Japanese" },
];

export const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

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
export type LanguageValue = "english" | "french" | "german" | "spanish" | "japanese";
export type LevelValue = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
