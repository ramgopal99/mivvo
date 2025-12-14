// Reading Practice Data Types and Dummy Data

export interface ReadingComprehensionData {
  id: string;
  passage: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RearrangeSentenceData {
  id: string;
  scrambledSentence: string[];
  correctOrder: string[];
  explanation: string;
}

export interface ReadingSessionData {
  id: string;
  title: string;
  comprehension: ReadingComprehensionData;
  rearranging: RearrangeSentenceData;
}

// Dummy Combined Reading Session Data - English
export const readingSessionsDataEnglish: ReadingSessionData[] = [
  {
    id: "reading-session-english-1",
    title: "English Language Evolution",
    comprehension: {
      id: "comp-en-1",
      passage: "The English language has become the global language of business, science, and technology. Millions of people around the world learn English as a second language. The rise of the internet has further accelerated this trend, making English essential for international communication.",
      question: "What has accelerated the trend of English becoming a global language?",
      options: [
        "The development of new technologies",
        "The rise of the internet",
        "Increased business travel",
        "Scientific discoveries"
      ],
      correctAnswer: 1, // Index of correct answer (0-based)
      explanation: "The passage states that 'The rise of the internet has further accelerated this trend', making it the correct answer."
    },
    rearranging: {
      id: "rearrange-en-1",
      scrambledSentence: ["language", "English", "the", "global", "become", "has"],
      correctOrder: ["English", "has", "become", "the", "global", "language"],
      explanation: "The correct grammatical order is: Subject (English) + Auxiliary verb (has) + Past participle (become) + Article (the) + Adjective (global) + Noun (language)."
    }
  }
];

// Dummy Combined Reading Session Data - French
export const readingSessionsDataFrench: ReadingSessionData[] = [
  {
    id: "reading-session-french-1",
    title: "Évolution de la Langue Française",
    comprehension: {
      id: "comp-fr-1",
      passage: "La langue française est devenue une langue internationale importante dans la diplomatie, la littérature et la culture. Des millions de personnes dans le monde apprennent le français comme langue étrangère. L'influence de la culture française continue de croître grâce au cinéma, à la musique et à la gastronomie.",
      question: "Qu'est-ce qui contribue à l'importance internationale du français?",
      options: [
        "Le développement des nouvelles technologies",
        "La culture française (cinéma, musique, gastronomie)",
        "Les voyages d'affaires",
        "Les découvertes scientifiques"
      ],
      correctAnswer: 1, // Index of correct answer (0-based)
      explanation: "Le passage mentionne que 'L'influence de la culture française continue de croître grâce au cinéma, à la musique et à la gastronomie'."
    },
    rearranging: {
      id: "rearrange-fr-1",
      scrambledSentence: ["langue", "française", "la", "internationale", "devenue", "est"],
      correctOrder: ["La", "langue", "française", "est", "devenue", "internationale"],
      explanation: "L'ordre grammatical correct est : Article défini (La) + Nom (langue) + Adjectif (française) + Verbe auxiliaire (est) + Participe passé (devenue) + Adjectif (internationale)."
    }
  }
];

// Combined data by language
export const readingSessionsData = {
  english: readingSessionsDataEnglish,
  french: readingSessionsDataFrench
};

// Legacy exports for backward compatibility - Default to English
export const readingComprehensionData: ReadingComprehensionData[] = readingSessionsDataEnglish.map(session => session.comprehension);
export const rearrangeSentencesData: RearrangeSentenceData[] = readingSessionsDataEnglish.map(session => session.rearranging);

// Analysis Data Types
export interface ReadingAnalysisResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  comprehensionScore: number | null
  rearrangingScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  timeSpent: { comprehension: number; rearranging: number } | null
}

export interface ReadingAnalysisAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: ReadingAnalysisResult[]
}

export interface ReadingAnalysisData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: ReadingAnalysisAttempt[]
}

// Mock Analysis Data - English
export const readingAnalysisDataEnglish: ReadingAnalysisData[] = [
  {
    id: "reading-session-english-1",
    title: "English Language Evolution",
    language: "english",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-reading-session-1-1`,
        startedAt: new Date(Date.now() - 30 * 60 * 1000),
        completedAt: new Date(),
        duration: 1800,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-reading-session-1-1`,
          overallScore: 87,
          overallFeedback: "Excellent reading session! You demonstrated strong comprehension skills and good sentence structure understanding. Your performance shows great improvement in both reading comprehension and sentence rearrangement tasks.",
          strengths: [
            "Strong comprehension of main ideas and supporting details",
            "Good vocabulary recognition and contextual understanding",
            "Effective sentence rearrangement skills with proper grammar",
            "Consistent performance across both exercise types"
          ],
          weaknesses: [
            "Reading speed could be improved for longer passages",
            "Some minor grammar points in sentence construction"
          ],
          recommendations: [
            "Practice speed reading techniques with timed exercises",
            "Review complex sentence structures and grammar rules",
            "Try reading more diverse topics"
          ],
          comprehensionScore: 85,
          rearrangingScore: 90,
          feedback: "Great work on your reading comprehension! You showed excellent understanding of the main ideas and supporting details.",
          duration: 1800,
          createdAt: new Date(),
          timeSpent: {
            comprehension: 900,
            rearranging: 900
          }
        }]
      },
      {
        id: `attempt-reading-session-1-2`,
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
        duration: 1500,
        status: 'completed',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-reading-session-1-2`,
          overallScore: 80,
          overallFeedback: "Good progress in your reading skills. Keep practicing to improve your comprehension speed and accuracy.",
          strengths: [
            "Improved comprehension accuracy",
            "Better sentence structure understanding"
          ],
          weaknesses: [
            "Reading speed could be faster",
            "Complex vocabulary recognition needs work"
          ],
          recommendations: [
            "Focus on expanding vocabulary",
            "Practice timed reading exercises",
            "Work on complex sentence patterns"
          ],
          comprehensionScore: 78,
          rearrangingScore: 82,
          feedback: "Good progress in your reading skills. Keep practicing to improve your comprehension speed.",
          duration: 1500,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          timeSpent: {
            comprehension: 750,
            rearranging: 750
          }
        }]
      }
    ]
  }
];

// Mock Analysis Data - French
export const readingAnalysisDataFrench: ReadingAnalysisData[] = [
  {
    id: "reading-session-french-1",
    title: "Évolution de la Langue Française",
    language: "french",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-reading-session-french-1-1`,
        startedAt: new Date(Date.now() - 28 * 60 * 1000),
        completedAt: new Date(),
        duration: 1680,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-reading-session-french-1-1`,
          overallScore: 84,
          overallFeedback: "Excellente session de lecture ! Vous avez démontré de solides compétences en compréhension et une bonne maîtrise de la structure des phrases. Vos performances montrent une grande amélioration.",
          strengths: [
            "Forte compréhension des idées principales",
            "Bonne reconnaissance du vocabulaire",
            "Excellente réorganisation des phrases",
            "Performance cohérente"
          ],
          weaknesses: [
            "La vitesse de lecture pourrait être améliorée",
            "Quelques points de grammaire mineurs"
          ],
          recommendations: [
            "Pratiquer les techniques de lecture rapide",
            "Réviser les structures de phrases complexes",
            "S'exercer avec des textes plus longs"
          ],
          comprehensionScore: 82,
          rearrangingScore: 86,
          feedback: "Excellent travail en compréhension de lecture ! Vous avez bien compris les idées principales.",
          duration: 1680,
          createdAt: new Date(),
          timeSpent: {
            comprehension: 840,
            rearranging: 840
          }
        }]
      },
      {
        id: `attempt-reading-session-french-1-2`,
        startedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
        duration: 1500,
        status: 'completed',
        createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-reading-session-french-1-2`,
          overallScore: 79,
          overallFeedback: "Bon progrès dans vos compétences de lecture. Continuez à pratiquer pour améliorer votre vitesse de compréhension.",
          strengths: [
            "Amélioration de la précision de compréhension",
            "Meilleure compréhension des structures"
          ],
          weaknesses: [
            "La vitesse de lecture pourrait être plus rapide",
            "Vocabulaire complexe à améliorer"
          ],
          recommendations: [
            "Se concentrer sur l'expansion du vocabulaire",
            "Pratiquer les exercices de lecture chronométrés",
            "Travailler sur les phrases complexes"
          ],
          comprehensionScore: 77,
          rearrangingScore: 81,
          feedback: "Bon progrès dans vos compétences de lecture. Continuez à pratiquer.",
          duration: 1500,
          createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
          timeSpent: {
            comprehension: 750,
            rearranging: 750
          }
        }]
      }
    ]
  }
];

// Combined analysis data by language
export const readingAnalysisData = {
  english: readingAnalysisDataEnglish,
  french: readingAnalysisDataFrench
};

// Export combined data for easy access
export const allReadingData = {
  sessions: readingSessionsData,
  comprehension: readingComprehensionData,
  rearranging: rearrangeSentencesData,
  analysis: readingAnalysisData
};