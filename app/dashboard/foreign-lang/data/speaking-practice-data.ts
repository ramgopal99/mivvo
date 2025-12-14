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

// Dummy Speaking Practice Questions - English
export const speakingQuestionsDataEnglish: SpeakingQuestionData[] = [
  // Listen & Speak Questions (main questions to answer)
  {
    id: "speak-en-1",
    question: "Can you tell me about your favorite hobby? Please speak for at least 30 seconds.",
    category: "listen-speak"
  },
  {
    id: "speak-en-2",
    question: "Describe your daily routine. What time do you usually wake up and go to bed?",
    category: "listen-speak"
  },
  {
    id: "repeat-en-1",
    question: "The quick brown fox jumps over the lazy dog.",
    category: "listen-repeat"
  },
  {
    id: "repeat-en-2",
    question: "How are you doing today? I hope you're having a wonderful day.",
    category: "listen-repeat"
  },
];

// Dummy Speaking Practice Questions - French
export const speakingQuestionsDataFrench: SpeakingQuestionData[] = [
  // Listen & Speak Questions (main questions to answer)
  {
    id: "speak-fr-1",
    question: "Pouvez-vous me parler de votre passe-temps préféré ? Veuillez parler pendant au moins 30 secondes.",
    category: "listen-speak"
  },
  {
    id: "speak-fr-2",
    question: "Décrivez votre routine quotidienne. À quelle heure vous levez-vous et vous couchez-vous généralement ?",
    category: "listen-speak"
  },
  {
    id: "repeat-fr-1",
    question: "Le renard brun rapide saute par-dessus le chien paresseux.",
    category: "listen-repeat"
  },
  {
    id: "repeat-fr-2",
    question: "Comment allez-vous aujourd'hui ? J'espère que vous passez une merveilleuse journée.",
    category: "listen-repeat"
  },
];

// Combined questions data by language
export const speakingQuestionsData = {
  english: speakingQuestionsDataEnglish,
  french: speakingQuestionsDataFrench
};

// Dummy Speaking Practice Sessions - English
export const speakingSessionsDataEnglish: SpeakingSessionData[] = [
  {
    id: "speaking-session-english-1",
    title: "Complete Speaking Practice",
    questions: speakingQuestionsDataEnglish, // All 4 questions (2 speak + 2 repeat)
    timeLimit: 1, // 1 minute per question
    totalTimeLimit: 4 // 4 minutes total
  },
];

// Dummy Speaking Practice Sessions - French
export const speakingSessionsDataFrench: SpeakingSessionData[] = [
  {
    id: "speaking-session-french-1",
    title: "Pratique Complète de Parole",
    questions: speakingQuestionsDataFrench, // All 4 questions (2 speak + 2 repeat)
    timeLimit: 1, // 1 minute per question
    totalTimeLimit: 4 // 4 minutes total
  },
];

// Combined sessions data by language
export const speakingSessionsData = {
  english: speakingSessionsDataEnglish,
  french: speakingSessionsDataFrench
};

// Individual speaking question sessions (similar to reading comprehension sessions)
export interface SpeakingQuestionSessionData {
  id: string;
  title: string;
  question: SpeakingQuestionData;
  timeLimit: number; // in minutes per question
}

// Create individual question sessions from the questions data - English
export const speakingQuestionSessionsEnglish: SpeakingQuestionSessionData[] = speakingQuestionsDataEnglish.map((question, index) => ({
  id: `speaking-question-en-${index + 1}`,
  title: `${question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - Question ${index + 1}`,
  question,
  timeLimit: 1 // 1 minute per question
}));

// Create individual question sessions from the questions data - French
export const speakingQuestionSessionsFrench: SpeakingQuestionSessionData[] = speakingQuestionsDataFrench.map((question, index) => ({
  id: `speaking-question-fr-${index + 1}`,
  title: `${question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - Question ${index + 1}`,
  question,
  timeLimit: 1 // 1 minute per question
}));

// Combined question sessions by language
export const speakingQuestionSessions = {
  english: speakingQuestionSessionsEnglish,
  french: speakingQuestionSessionsFrench
};

// Analysis Data Types
export interface SpeakingAnalysisResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  speakingScore: number | null
  listeningScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  pronunciationScore: number | null
  fluencyScore: number | null
  vocabularyScore: number | null
  comprehensionScore: number | null
  listeningAccuracy: number | null
  responseTime: number | null
}

export interface SpeakingAnalysisAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: SpeakingAnalysisResult[]
}

export interface SpeakingAnalysisData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: SpeakingAnalysisAttempt[]
}

// Mock Analysis Data - English
export const speakingAnalysisDataEnglish: SpeakingAnalysisData[] = [
  {
    id: "speaking-session-english-1",
    title: "Complete Speaking Practice",
    language: "english",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-speaking-session-1-1`,
        startedAt: new Date(Date.now() - 35 * 60 * 1000),
        completedAt: new Date(),
        duration: 2100,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-speaking-session-1-1`,
          overallScore: 89,
          overallFeedback: "Outstanding speaking and listening performance! You demonstrated excellent pronunciation, natural fluency, and strong listening comprehension. Your conversational skills are developing very well with clear improvement in both speaking and listening abilities.",
          strengths: [
            "Excellent pronunciation clarity and accuracy",
            "Natural conversation flow and fluency",
            "Strong listening comprehension skills",
            "Good vocabulary usage in context",
            "Confident delivery and appropriate pacing",
            "Clear articulation of sounds and words"
          ],
          weaknesses: [
            "Occasional filler words in complex responses",
            "Could work on reducing hesitation in longer answers",
            "Some difficulty with very fast speech in listening exercises"
          ],
          recommendations: [
            "Practice speaking without preparation for more natural delivery",
            "Work on tongue twisters and difficult sound combinations",
            "Listen to various English accents and speeds regularly",
            "Record yourself speaking and analyze filler word usage",
            "Practice summarizing heard information immediately",
            "Engage in conversations with native speakers when possible"
          ],
          speakingScore: 87,
          listeningScore: 91,
          feedback: "Excellent work in both speaking and listening! You showed great pronunciation and comprehension skills.",
          duration: 2100,
          createdAt: new Date(),
          pronunciationScore: 89,
          fluencyScore: 85,
          vocabularyScore: 88,
          comprehensionScore: 91,
          listeningAccuracy: 93,
          responseTime: 82
        }]
      },
      {
        id: `attempt-speaking-session-1-2`,
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 32 * 60 * 1000),
        duration: 1920,
        status: 'completed',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-speaking-session-1-2`,
          overallScore: 83,
          overallFeedback: "Solid performance with room for improvement in pronunciation clarity and handling varied listening content.",
          strengths: [
            "Improved confidence in speaking",
            "Better listening comprehension",
            "Good basic pronunciation"
          ],
          weaknesses: [
            "Pronunciation of certain sounds needs work",
            "Struggles with fast speech in listening",
            "Limited responses in complex conversations"
          ],
          recommendations: [
            "Practice tongue twisters for pronunciation",
            "Listen to various English accents and speeds",
            "Work on expanding conversational vocabulary",
            "Practice summarizing what you hear"
          ],
          speakingScore: 81,
          listeningScore: 85,
          feedback: "Good progress in speaking and listening skills. Focus on pronunciation accuracy and listening to different accents.",
          duration: 1920,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          pronunciationScore: 81,
          fluencyScore: 80,
          vocabularyScore: 82,
          comprehensionScore: 85,
          listeningAccuracy: 87,
          responseTime: 78
        }]
      }
    ]
  }
];

// Mock Analysis Data - French
export const speakingAnalysisDataFrench: SpeakingAnalysisData[] = [
  {
    id: "speaking-session-french-1",
    title: "Pratique Complète de Parole",
    language: "french",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-speaking-session-french-1-1`,
        startedAt: new Date(Date.now() - 37 * 60 * 1000),
        completedAt: new Date(),
        duration: 2220,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-speaking-session-french-1-1`,
          overallScore: 86,
          overallFeedback: "Performance exceptionnelle en expression orale et compréhension auditive ! Vous avez démontré une excellente prononciation, une fluidité naturelle et une forte compréhension auditive. Vos compétences conversationnelles se développent très bien avec une nette amélioration dans les deux domaines.",
          strengths: [
            "Excellente clarté et précision de prononciation",
            "Flux de conversation naturel et fluide",
            "Fortes compétences en compréhension auditive",
            "Bon usage du vocabulaire en contexte",
            "Livraison confiante et rythme approprié",
            "Articulation claire des sons et mots"
          ],
          weaknesses: [
            "Mots de remplissage occasionnels dans les réponses complexes",
            "Pourrait travailler à réduire l'hésitation dans les réponses plus longues",
            "Quelques difficultés avec la parole très rapide dans les exercices d'écoute"
          ],
          recommendations: [
            "Pratiquer la parole sans préparation pour une livraison plus naturelle",
            "Travailler sur les exercices de langue et combinaisons de sons difficiles",
            "Écouter régulièrement différents accents et vitesses anglaises",
            "Enregistrer sa voix et analyser l'usage des mots de remplissage",
            "Pratiquer la reformulation immédiate de ce qui est entendu",
            "S'engager dans des conversations avec des locuteurs natifs si possible"
          ],
          speakingScore: 84,
          listeningScore: 88,
          feedback: "Excellent travail dans les deux domaines de la parole et de l'écoute ! Vous avez montré de grandes compétences en prononciation et compréhension.",
          duration: 2220,
          createdAt: new Date(),
          pronunciationScore: 86,
          fluencyScore: 82,
          vocabularyScore: 85,
          comprehensionScore: 88,
          listeningAccuracy: 90,
          responseTime: 80
        }]
      },
      {
        id: `attempt-speaking-session-french-1-2`,
        startedAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000 + 34 * 60 * 1000),
        duration: 2040,
        status: 'completed',
        createdAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-speaking-session-french-1-2`,
          overallScore: 81,
          overallFeedback: "Performance solide avec place à l'amélioration dans la clarté de prononciation et la gestion de contenus d'écoute variés.",
          strengths: [
            "Amélioration de la confiance en parole",
            "Meilleure compréhension auditive",
            "Bonne prononciation de base"
          ],
          weaknesses: [
            "La prononciation de certains sons nécessite du travail",
            "Difficultés avec la parole rapide en écoute",
            "Réponses limitées dans les conversations complexes"
          ],
          recommendations: [
            "Pratiquer les exercices de langue pour la prononciation",
            "Écouter différents accents et vitesses anglaises",
            "Travailler sur l'expansion du vocabulaire conversationnel",
            "Pratiquer la reformulation de ce qui est entendu"
          ],
          speakingScore: 79,
          listeningScore: 83,
          feedback: "Bon progrès dans les compétences de parole et d'écoute. Concentrez-vous sur la précision de prononciation et l'écoute de différents accents.",
          duration: 2040,
          createdAt: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000),
          pronunciationScore: 79,
          fluencyScore: 78,
          vocabularyScore: 80,
          comprehensionScore: 83,
          listeningAccuracy: 85,
          responseTime: 76
        }]
      }
    ]
  }
];

// Combined analysis data by language
export const speakingAnalysisData = {
  english: speakingAnalysisDataEnglish,
  french: speakingAnalysisDataFrench
};

// Export combined data for easy access
export const allSpeakingData = {
  sessions: speakingSessionsData,
  questions: speakingQuestionsData,
  questionSessions: speakingQuestionSessions,
  analysis: speakingAnalysisData
};

