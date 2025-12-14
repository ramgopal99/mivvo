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

// Dummy MCQ Questions Data - English (5 questions total, 1 from each category)
export const mcqQuestionsDataEnglish: McqQuestionData[] = [
  // Grammar Questions
  {
    id: "mcq-en-1",
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
  // Error Detection Questions
  {
    id: "mcq-en-2",
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
  // Synonyms & Antonyms Questions
  {
    id: "mcq-en-3",
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
  // Sentence Completion Questions
  {
    id: "mcq-en-4",
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
  // Word Replacement Questions
  {
    id: "mcq-en-5",
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
  }
];

// Dummy MCQ Questions Data - French
export const mcqQuestionsDataFrench: McqQuestionData[] = [
  // Grammar Questions
  {
    id: "mcq-fr-1",
    question: "Choisissez la forme correcte : 'Elle _____ au magasin hier.'",
    options: [
      "aller",
      "est allée",
      "allait",
      "va"
    ],
    correctAnswer: 1, // "est allée"
    explanation: "'Est allée' est la forme correcte du passé composé pour cette phrase.",
    category: "grammar"
  },
  // Synonyms & Antonyms Questions
  {
    id: "mcq-fr-2",
    question: "Quel est le synonyme de 'heureux' ?",
    options: [
      "Triste",
      "Joyeux",
      "En colère",
      "Fatigué"
    ],
    correctAnswer: 1, // "joyeux"
    explanation: "'Joyeux' signifie ressentir ou montrer un grand plaisir, similaire à 'heureux'.",
    category: "synonyms-antonyms"
  },
  // Error Detection Questions
  {
    id: "mcq-fr-3",
    question: "Identifiez l'erreur : 'Elle ne aime pas les pommes.'",
    options: [
      "Elle",
      "ne",
      "aime",
      "les pommes"
    ],
    correctAnswer: 1, // "ne" devrait être "n'"
    explanation: "Avec 'aime', on utilise 'n'' au lieu de 'ne' devant une voyelle.",
    category: "error-detection"
  },
  // Sentence Completion Questions
  {
    id: "mcq-fr-4",
    question: "Complétez la phrase : 'J'_____ mes devoirs tous les jours.'",
    options: [
      "fais",
      "fait",
      "faisons",
      "font"
    ],
    correctAnswer: 0, // "fais"
    explanation: "La forme correcte du présent avec 'je' est 'fais'.",
    category: "sentence-completion"
  },
  // Word Replacement Questions
  {
    id: "mcq-fr-5",
    question: "Remplacez le mot incorrect : 'Il fait très chaudement aujourd'hui.'",
    options: [
      "fait",
      "très",
      "chaudement",
      "aujourd'hui"
    ],
    correctAnswer: 2, // "chaudement" devrait être "chaud"
    explanation: "'Chaud' est la forme adjective correcte. 'Chaudement' est un adverbe.",
    category: "word-replacement"
  }
];

// Combined MCQ questions by language
export const mcqQuestionsData = {
  english: mcqQuestionsDataEnglish,
  french: mcqQuestionsDataFrench
};

// Dummy MCQ Session Data - English
export const mcqSessionsDataEnglish: McqSessionData[] = [
  {
    id: "mcq-session-english-1",
    title: "Complete Grammar & Vocabulary Practice",
    questions: [
      // Include 1 question from each category (5 total)
      mcqQuestionsDataEnglish.find(q => q.id === "mcq-en-1")!, // grammar
      mcqQuestionsDataEnglish.find(q => q.id === "mcq-en-2")!, // error-detection
      mcqQuestionsDataEnglish.find(q => q.id === "mcq-en-3")!, // synonyms-antonyms
      mcqQuestionsDataEnglish.find(q => q.id === "mcq-en-4")!, // sentence-completion
      mcqQuestionsDataEnglish.find(q => q.id === "mcq-en-5")!  // word-replacement
    ].filter(Boolean), // Filter out any undefined values
    timeLimit: 15 // 15 minutes for 5 questions (matches config)
  },
  {
    id: "mcq-sentence-completion-en",
    title: "Sentence Completion Practice",
    questions: mcqQuestionsDataEnglish.filter(q => q.category === "sentence-completion"),
    timeLimit: 10
  },
  {
    id: "mcq-word-replacement-en",
    title: "Word Replacement Practice",
    questions: mcqQuestionsDataEnglish.filter(q => q.category === "word-replacement"),
    timeLimit: 10
  }
];

// Dummy MCQ Session Data - French
export const mcqSessionsDataFrench: McqSessionData[] = [
  {
    id: "mcq-session-french-1",
    title: "Pratique Complète de Grammaire et Vocabulaire",
    questions: [
      // Include 1 question from each category
      mcqQuestionsDataFrench.find(q => q.id === "mcq-fr-1")!, // grammar
      mcqQuestionsDataFrench.find(q => q.id === "mcq-fr-2")!, // synonyms-antonyms
      mcqQuestionsDataFrench.find(q => q.id === "mcq-fr-3")!, // error-detection
      mcqQuestionsDataFrench.find(q => q.id === "mcq-fr-4")!, // sentence-completion
      mcqQuestionsDataFrench.find(q => q.id === "mcq-fr-5")!  // word-replacement
    ].filter(Boolean), // Filter out any undefined values
    timeLimit: 10 // 10 minutes for 5 questions
  }
];

// Combined MCQ sessions by language
export const mcqSessionsData = {
  english: mcqSessionsDataEnglish,
  french: mcqSessionsDataFrench
};

// Analysis Data Types
export interface McqAnalysisResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  totalQuestions: number | null
  correctAnswers: number | null
  accuracyPercentage: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
}

export interface McqAnalysisAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: McqAnalysisResult[]
}

export interface McqAnalysisData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: McqAnalysisAttempt[]
}

// Mock Analysis Data - English
export const mcqAnalysisDataEnglish: McqAnalysisData[] = [
  {
    id: "mcq-session-english-1",
    title: "Complete Grammar & Vocabulary Practice",
    language: "english",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-mcq-session-1-1`,
        startedAt: new Date(Date.now() - 25 * 60 * 1000),
        completedAt: new Date(),
        duration: 1500,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-mcq-session-1-1`,
          overallScore: 85,
          overallFeedback: "Excellent MCQ performance! You demonstrated strong knowledge across grammar, vocabulary, and reading comprehension. Your accuracy and speed show good test-taking skills and language proficiency.",
          strengths: [
            "Excellent grammar knowledge and application",
            "Strong vocabulary recognition and usage",
            "Good reading comprehension skills",
            "Consistent performance across question types",
            "Effective time management",
            "Good elimination of incorrect answer choices"
          ],
          weaknesses: [
            "Some difficulty with complex idiomatic expressions",
            "Occasional misinterpretation of question intent",
            "Could improve speed on longer passages"
          ],
          recommendations: [
            "Practice more complex idiomatic expressions and phrasal verbs",
            "Work on reading questions carefully before selecting answers",
            "Practice with timed question sets to improve speed",
            "Review common grammatical structures in context",
            "Study strategies for eliminating wrong answer choices",
            "Take practice tests under exam conditions"
          ],
          totalQuestions: 20,
          correctAnswers: 17,
          accuracyPercentage: 85,
          feedback: "Great work on the MCQ practice! You showed strong understanding of key concepts.",
          duration: 1500,
          createdAt: new Date(),
        }]
      },
      {
        id: `attempt-mcq-session-1-2`,
        startedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 22 * 60 * 1000),
        duration: 1320,
        status: 'completed',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-mcq-session-1-2`,
          overallScore: 78,
          overallFeedback: "Solid MCQ performance with room for improvement in complex grammatical structures and time management.",
          strengths: [
            "Improved basic grammar understanding",
            "Better vocabulary application",
            "Good progress in reading comprehension"
          ],
          weaknesses: [
            "Struggles with advanced grammatical concepts",
            "Takes longer on complex questions",
            "Some inconsistency with idiomatic expressions"
          ],
          recommendations: [
            "Focus on advanced grammar topics like subjunctive mood",
            "Practice with timed question sets",
            "Study common English idioms and their usage",
            "Work on eliminating common answer choice traps"
          ],
          totalQuestions: 20,
          correctAnswers: 16,
          accuracyPercentage: 80,
          feedback: "Good progress in MCQ skills. Focus on improving speed and accuracy with complex questions.",
          duration: 1320,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        }]
      }
    ]
  }
];

// Mock Analysis Data - French
export const mcqAnalysisDataFrench: McqAnalysisData[] = [
  {
    id: "mcq-session-french-1",
    title: "Pratique Complète de Grammaire et Vocabulaire",
    language: "french",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-mcq-session-french-1-1`,
        startedAt: new Date(Date.now() - 26 * 60 * 1000),
        completedAt: new Date(),
        duration: 1560,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-mcq-session-french-1-1`,
          overallScore: 82,
          overallFeedback: "Excellente performance en QCM ! Vous avez démontré une solide connaissance de la grammaire, du vocabulaire et de la compréhension de texte. Votre taux de précision montre de bonnes compétences en test et maîtrise linguistique.",
          strengths: [
            "Excellente connaissance grammaticale et application",
            "Forte reconnaissance et utilisation du vocabulaire",
            "Bonnes compétences en compréhension de texte",
            "Performance cohérente selon les types de questions",
            "Gestion efficace du temps",
            "Bon élimination des choix de réponses incorrects"
          ],
          weaknesses: [
            "Quelques difficultés avec les expressions idiomatiques complexes",
            "Interprétation occasionnelle erronée de l'intention de la question",
            "Pourrait améliorer la vitesse sur les passages plus longs"
          ],
          recommendations: [
            "Pratiquer les expressions idiomatiques et locutions complexes",
            "Travailler à lire attentivement les questions avant de sélectionner une réponse",
            "Pratiquer avec des séries chronométrées pour améliorer la vitesse",
            "Réviser les structures grammaticales en contexte",
            "Étudier des stratégies pour éliminer les choix de réponses incorrects",
            "Faire des tests pratiques dans des conditions d'examen"
          ],
          totalQuestions: 20,
          correctAnswers: 16,
          accuracyPercentage: 80,
          feedback: "Excellent travail sur la pratique QCM ! Vous avez montré une bonne compréhension des concepts clés.",
          duration: 1560,
          createdAt: new Date(),
        }]
      },
      {
        id: `attempt-mcq-session-french-1-2`,
        startedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000 + 23 * 60 * 1000),
        duration: 1380,
        status: 'completed',
        createdAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-mcq-session-french-1-2`,
          overallScore: 76,
          overallFeedback: "Performance solide en QCM avec place à l'amélioration dans les structures grammaticales complexes et la gestion du temps.",
          strengths: [
            "Amélioration de la compréhension grammaticale de base",
            "Meilleure application du vocabulaire",
            "Bon progrès en compréhension de texte"
          ],
          weaknesses: [
            "Difficultés avec les concepts grammaticaux avancés",
            "Prend plus de temps sur les questions complexes",
            "Incohérence occasionnelle avec les expressions idiomatiques"
          ],
          recommendations: [
            "Se concentrer sur les sujets grammaticaux avancés comme le subjonctif",
            "Pratiquer avec des séries de questions chronométrées",
            "Étudier les expressions idiomatiques françaises courantes",
            "Travailler à éliminer les pièges courants de choix de réponses"
          ],
          totalQuestions: 20,
          correctAnswers: 15,
          accuracyPercentage: 75,
          feedback: "Bon progrès dans les compétences QCM. Concentrez-vous sur l'amélioration de la vitesse et de la précision avec les questions complexes.",
          duration: 1380,
          createdAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
        }]
      }
    ]
  }
];

// Combined analysis data by language
export const mcqAnalysisData = {
  english: mcqAnalysisDataEnglish,
  french: mcqAnalysisDataFrench
};

// Export combined data for easy access
export const allMcqData = {
  sessions: mcqSessionsData,
  questions: mcqQuestionsData,
  analysis: mcqAnalysisData
};
