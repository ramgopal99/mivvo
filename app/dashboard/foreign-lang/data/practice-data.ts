// Dummy practice data for reading and writing exercises

export interface ReadingComprehensionData {
  passage: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RearrangeSentenceData {
  scrambled: string[];
  correctOrder: string;
  hint: string;
}

export interface WritingTopicData {
  topic: string;
  instructions: string;
  wordLimit: number;
  timeLimit: number; // in minutes
  sampleAnswer?: string;
}

export interface PracticeSessionData {
  id: string;
  type: 'reading-comprehension' | 'rearrange-sentences' | 'writing';
  level: string;
  language: string;
  data: ReadingComprehensionData | RearrangeSentenceData | WritingTopicData;
}

// Reading Comprehension Data
export const readingComprehensionData: ReadingComprehensionData[] = [
  {
    passage: "The Industrial Revolution, which began in Britain in the late 18th century, transformed societies from agrarian economies to industrialized ones. The introduction of machinery and factories led to mass production and urbanization. However, this period also brought challenges such as poor working conditions and child labor.",
    question: "What was one of the main challenges of the Industrial Revolution mentioned in the passage?",
    options: ["Mass production", "Urbanization", "Poor working conditions", "Agrarian economies"],
    correctAnswer: 2,
    explanation: "The passage mentions that the Industrial Revolution brought challenges such as poor working conditions and child labor."
  },
  {
    passage: "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil and gas. This releases greenhouse gases into the atmosphere, trapping heat and causing global temperatures to rise.",
    question: "According to the passage, what has been the main driver of climate change since the 1800s?",
    options: ["Natural shifts", "Burning fossil fuels", "Weather patterns", "Rising temperatures"],
    correctAnswer: 1,
    explanation: "The passage states that since the 1800s, human activities, primarily burning fossil fuels, have been the main driver of climate change."
  },
  {
    passage: "Artificial Intelligence (AI) is a field of computer science that aims to create machines capable of intelligent behavior. Machine learning, a subset of AI, allows computers to learn from data without being explicitly programmed. This technology has applications in various fields including healthcare, finance, and transportation.",
    question: "What is machine learning described as in the passage?",
    options: ["A type of computer", "A field of computer science", "A subset of AI", "A transportation technology"],
    correctAnswer: 2,
    explanation: "The passage describes machine learning as 'a subset of AI' that allows computers to learn from data."
  }
];

// Rearrange Sentences Data
export const rearrangeSentencesData: RearrangeSentenceData[] = [
  {
    scrambled: ["the", "cat", "on", "mat", "sat"],
    correctOrder: "The cat sat on the mat.",
    hint: "Think about subject-verb-object word order in English."
  },
  {
    scrambled: ["yesterday", "park", "went", "to", "the", "I"],
    correctOrder: "I went to the park yesterday.",
    hint: "Time expressions usually come at the beginning or end of sentences."
  },
  {
    scrambled: ["book", "interesting", "very", "this", "is"],
    correctOrder: "This book is very interesting.",
    hint: "Adjectives usually come before the nouns they describe."
  },
  {
    scrambled: ["coffee", "morning", "every", "drink", "I"],
    correctOrder: "I drink coffee every morning.",
    hint: "Adverbs of frequency come before the main verb."
  },
  {
    scrambled: ["finished", "homework", "before", "dinner", "my", "I"],
    correctOrder: "I finished my homework before dinner.",
    hint: "Time expressions with 'before' often come at the end."
  }
];

// Writing Topics Data
export const writingTopicsData: WritingTopicData[] = [
  {
    topic: "My Favorite Hobby",
    instructions: "Write a short paragraph about your favorite hobby. Describe what you do, why you enjoy it, and how often you practice it.",
    wordLimit: 150,
    timeLimit: 10,
    sampleAnswer: "My favorite hobby is reading. I enjoy reading because it allows me to explore different worlds and learn new things. I read for about an hour every evening before going to bed. Reading helps me relax and improves my vocabulary at the same time."
  },
  {
    topic: "A Memorable Vacation",
    instructions: "Describe a vacation you enjoyed. Include where you went, what you did, who you went with, and why it was memorable.",
    wordLimit: 200,
    timeLimit: 15,
    sampleAnswer: "Last summer, I went on a memorable vacation to Japan with my family. We visited Tokyo, Kyoto, and Osaka. In Tokyo, we saw the bustling streets and tried delicious sushi. Kyoto was beautiful with its ancient temples and gardens. We learned about Japanese culture and traditions. This vacation was memorable because it was my first time experiencing a different culture so deeply."
  }
];

// Combined practice sessions data - Single item per type
export const practiceSessionsData: PracticeSessionData[] = [
  // Single Reading Comprehension Session
  {
    id: "reading-comp",
    type: 'reading-comprehension' as const,
    level: 'B1',
    language: 'english',
    data: readingComprehensionData[0] // Use first item as template
  },

  // Single Rearrange Sentences Session
  {
    id: "rearrange-sent",
    type: 'rearrange-sentences' as const,
    level: 'A2',
    language: 'english',
    data: rearrangeSentencesData[0] // Use first item as template
  },

  // Single Writing Session
  {
    id: "writing-topic",
    type: 'writing' as const,
    level: 'B1',
    language: 'english',
    data: writingTopicsData[0] // Use first item as template
  }
];

// Helper functions
export function getPracticeDataByIds(ids: string[]) {
  // Since we now have single items that can be reused, map each ID to the corresponding session
  return ids.map(id => {
    const session = practiceSessionsData.find(s => s.id === id);
    return session;
  }).filter(Boolean);
}
