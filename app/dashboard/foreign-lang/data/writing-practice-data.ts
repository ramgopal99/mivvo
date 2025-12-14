// Writing Practice Data Types and Dummy Data

export interface WritingTopicData {
  id: string;
  topic: string;
  description: string;
  instructions: string;
  timeLimit: number; // in minutes
  wordLimit?: number;
  sampleAnswer?: string;
}

// Writing Session Data Types
export interface WritingSessionData {
  id: string;
  title: string;
  topics: WritingTopicData[];
  chatScenarios: ChatScenario[];
  timeLimit: number; // in minutes per topic/scenario
  totalTimeLimit: number; // in minutes for entire session
}

// AI Chat Scenario Types
export interface ChatScenario {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
  aiResponses: Record<string, string>;
  vocabulary: string[];
}

// Dummy Writing Practice Data - English
export const writingTopicDataEnglish: WritingTopicData[] = [
  {
    id: "writing-en-1",
    topic: "My Favorite Hobby",
    description: "Write about your favorite hobby and why you enjoy it.",
    instructions: "Describe your favorite hobby in detail. Explain why you enjoy it, how long you've been doing it, and what you like most about it. Include specific examples and details to make your writing interesting.",
    timeLimit: 15, // 15 minutes
    wordLimit: 200,
    sampleAnswer: "My favorite hobby is reading books. I have been reading for as long as I can remember, starting with children's books when I was very young. What I enjoy most about reading is that it allows me to escape into different worlds and experience things I might never encounter in real life. Whether it's a mystery novel that keeps me guessing until the end, or a historical fiction that teaches me about different time periods, reading always provides me with both entertainment and knowledge. I usually read for about an hour each evening before bed, and it's the perfect way to relax after a busy day."
  },
  {
    id: "writing-en-2",
    topic: "A Memorable Travel Experience",
    description: "Write about a memorable travel experience you had.",
    instructions: "Describe a travel experience that made a strong impression on you. Include details about where you went, what you did, who you were with, and why this experience was memorable. Explain what you learned from this trip and how it changed you.",
    timeLimit: 20, // 20 minutes
    wordLimit: 300,
    sampleAnswer: "One of the most memorable travel experiences I had was my trip to Kyoto, Japan last year. I traveled there with my sister during the cherry blossom season, which made the whole experience even more magical. We stayed in a traditional ryokan and participated in a tea ceremony, which taught me about the importance of mindfulness and appreciation for simple moments. The temples and gardens were breathtaking, especially when the cherry blossoms were in full bloom. What made this trip truly special was witnessing how the Japanese people honor their traditions while embracing modernity. This experience taught me to slow down and appreciate the beauty in everyday life, and it inspired me to learn more about Japanese culture."
  }
];

// Dummy Writing Practice Data - French
export const writingTopicDataFrench: WritingTopicData[] = [
  {
    id: "writing-fr-1",
    topic: "Mon Passe-temps Préféré",
    description: "Écrivez sur votre passe-temps préféré et pourquoi vous l'aimez.",
    instructions: "Décrivez votre passe-temps préféré en détail. Expliquez pourquoi vous l'aimez, depuis combien de temps vous le pratiquez, et ce que vous aimez le plus. Incluez des exemples spécifiques et des détails pour rendre votre écriture intéressante.",
    timeLimit: 15, // 15 minutes
    wordLimit: 200,
    sampleAnswer: "Mon passe-temps préféré est la lecture de livres. Je lis depuis aussi longtemps que je me souvienne, en commençant par des livres pour enfants quand j'étais très jeune. Ce que j'aime le plus dans la lecture, c'est qu'elle me permet d'échapper vers d'autres mondes et de vivre des expériences que je ne pourrais jamais rencontrer dans la vie réelle. Qu'il s'agisse d'un roman policier qui me tient en haleine jusqu'à la fin, ou d'une fiction historique qui m'apprend sur différentes périodes, la lecture me procure toujours à la fois du divertissement et des connaissances. Je lis généralement environ une heure chaque soir avant de me coucher, et c'est le moyen parfait pour me détendre après une journée chargée."
  },
  {
    id: "writing-fr-2",
    topic: "Une Expérience de Voyage Mémorable",
    description: "Écrivez sur une expérience de voyage mémorable que vous avez eue.",
    instructions: "Décrivez une expérience de voyage qui vous a fait forte impression. Incluez des détails sur l'endroit où vous êtes allé, ce que vous avez fait, avec qui vous étiez, et pourquoi cette expérience était mémorable. Expliquez ce que vous avez appris de ce voyage et comment il vous a changé.",
    timeLimit: 20, // 20 minutes
    wordLimit: 300,
    sampleAnswer: "L'une des expériences de voyage les plus mémorables que j'ai eues était mon voyage à Paris l'année dernière. J'y suis allé avec ma sœur pendant la saison des cerisiers en fleurs, ce qui a rendu toute l'expérience encore plus magique. Nous avons séjourné dans un hôtel traditionnel et participé à une cérémonie du thé, ce qui m'a appris l'importance de la pleine conscience et de l'appréciation des moments simples. Les temples et les jardins étaient à couper le souffle, surtout lorsque les cerisiers étaient en pleine floraison. Ce qui a rendu ce voyage vraiment spécial, c'est d'avoir vu comment les Français honorent leurs traditions tout en embrassant la modernité. Cette expérience m'a appris à ralentir et à apprécier la beauté de la vie quotidienne."
  }
];

// Combined topic data by language
export const writingTopicData = {
  english: writingTopicDataEnglish,
  french: writingTopicDataFrench
};

// AI Chat Scenarios - English
export const chatScenariosEnglish: ChatScenario[] = [
  {
    id: "pizza-booking-en",
    title: "Pizza Ordering",
    description: "Practice ordering pizza at a restaurant",
    initialMessage: "Hello! Welcome to Mario's Pizza. How can I help you today?",
    aiResponses: {
      "hello": "Hi there! What would you like to order?",
      "hi": "Hello! What can I get for you today?",
      "pizza": "Great choice! What size would you like? Small, medium, or large?",
      "small": "Small pizza is $12.99. What toppings would you like?",
      "medium": "Medium pizza is $16.99. What toppings would you like?",
      "large": "Large pizza is $20.99. What toppings would you like?",
      "pepperoni": "Pepperoni is $2 extra. Would you like any other toppings?",
      "cheese": "Extra cheese is $1.50. Any other toppings?",
      "mushroom": "Mushrooms are $1.25. Any other toppings?",
      "delivery": "Delivery is $3.99. What's your address?",
      "pickup": "Pickup will be ready in 15 minutes. See you soon!",
      "bye": "Thank you for your order! Goodbye!",
      "thank": "You're welcome! Enjoy your pizza!"
    },
    vocabulary: ["pizza", "order", "size", "toppings", "pepperoni", "cheese", "mushrooms", "delivery", "pickup", "address"]
  }
];

// AI Chat Scenarios - French
export const chatScenariosFrench: ChatScenario[] = [
  {
    id: "pizza-booking-fr",
    title: "Commander une Pizza",
    description: "Pratiquez la commande de pizza dans un restaurant",
    initialMessage: "Bonjour ! Bienvenue chez Mario's Pizza. Comment puis-je vous aider aujourd'hui ?",
    aiResponses: {
      "bonjour": "Salut ! Que souhaitez-vous commander ?",
      "salut": "Bonjour ! Que puis-je vous servir aujourd'hui ?",
      "pizza": "Excellent choix ! Quelle taille désirez-vous ? Petite, moyenne ou grande ?",
      "petite": "La petite pizza coûte 12,99 €. Quelles garnitures voulez-vous ?",
      "moyenne": "La moyenne pizza coûte 16,99 €. Quelles garnitures voulez-vous ?",
      "grande": "La grande pizza coûte 20,99 €. Quelles garnitures voulez-vous ?",
      "pepperoni": "Le pepperoni coûte 2 € supplémentaires. Voulez-vous d'autres garnitures ?",
      "fromage": "Le fromage supplémentaire coûte 1,50 €. Autres garnitures ?",
      "champignons": "Les champignons coûtent 1,25 €. Autres garnitures ?",
      "livraison": "La livraison coûte 3,99 €. Quelle est votre adresse ?",
      "emporter": "Votre commande sera prête dans 15 minutes. À bientôt !",
      "au revoir": "Merci pour votre commande ! Au revoir !",
      "merci": "De rien ! Bon appétit !"
    },
    vocabulary: ["pizza", "commander", "taille", "garnitures", "pepperoni", "fromage", "champignons", "livraison", "emporter", "adresse"]
  }
];

// Combined chat scenarios by language
export const chatScenarios = {
  english: chatScenariosEnglish,
  french: chatScenariosFrench
};

// Dummy Writing Practice Sessions - English
export const writingSessionsDataEnglish: WritingSessionData[] = [
  {
    id: "writing-session-english-1",
    title: "Complete Writing & Chat Practice",
    topics: writingTopicDataEnglish, // All 2 writing topics
    chatScenarios: chatScenariosEnglish, // All chat scenarios (pizza ordering)
    timeLimit: 15, // 15-20 minutes per topic/scenario
    totalTimeLimit: 50 // 50 minutes total (2 writing + 1 chat)
  },
];

// Dummy Writing Practice Sessions - French
export const writingSessionsDataFrench: WritingSessionData[] = [
  {
    id: "writing-session-french-1",
    title: "Pratique Complète d'Écriture et Chat",
    topics: writingTopicDataFrench, // All 2 writing topics
    chatScenarios: chatScenariosFrench, // All chat scenarios (pizza ordering)
    timeLimit: 15, // 15-20 minutes per topic/scenario
    totalTimeLimit: 50 // 50 minutes total (2 writing + 1 chat)
  },
];

// Combined sessions data by language
export const writingSessionsData = {
  english: writingSessionsDataEnglish,
  french: writingSessionsDataFrench
};

// Analysis Data Types
export interface WritingAnalysisResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  topicWritingScore: number | null
  aiConversationScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  creativityScore: number | null
  grammarAccuracy: number | null
  vocabularyUsage: number | null
  conversationFlow: number | null
  topicCoverage: number | null
  responseLength: number | null
}

export interface WritingAnalysisAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: WritingAnalysisResult[]
}

export interface WritingAnalysisData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: WritingAnalysisAttempt[]
}

// Mock Analysis Data - English
export const writingAnalysisDataEnglish: WritingAnalysisData[] = [
  {
    id: "writing-session-english-1",
    title: "Complete Writing & Chat Practice",
    language: "english",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-writing-session-1-1`,
        startedAt: new Date(Date.now() - 45 * 60 * 1000),
        completedAt: new Date(),
        duration: 2700,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-writing-session-1-1`,
          overallScore: 90,
          overallFeedback: "Outstanding writing performance! You demonstrated excellent creativity in topic writing and natural conversation abilities. Your writing shows strong command of the language with good grammar and engaging content.",
          strengths: [
            "Highly creative and engaging topic writing",
            "Natural and fluent conversation flow with AI",
            "Excellent vocabulary usage and word choice",
            "Clear structure and organization in writing",
            "Good balance between formal and conversational tones",
            "Effective use of descriptive language"
          ],
          weaknesses: [
            "Could incorporate more varied sentence structures",
            "Some responses could benefit from additional detail"
          ],
          recommendations: [
            "Experiment with different writing styles and genres",
            "Practice writing longer, more detailed responses",
            "Work on incorporating more complex sentence structures",
            "Try writing about challenging or unfamiliar topics"
          ],
          topicWritingScore: 88,
          aiConversationScore: 92,
          feedback: "Excellent work on both topic writing and AI conversation! You showed great creativity and natural communication skills.",
          duration: 2700,
          createdAt: new Date(),
          creativityScore: 92,
          grammarAccuracy: 88,
          vocabularyUsage: 85,
          conversationFlow: 90,
          topicCoverage: 87,
          responseLength: 83
        }]
      },
      {
        id: `attempt-writing-session-1-2`,
        startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000),
        duration: 2400,
        status: 'completed',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-writing-session-1-2`,
          overallScore: 83,
          overallFeedback: "Solid writing session with room for improvement in conversation fluency and creative expression.",
          strengths: [
            "Improved topic writing structure",
            "Better understanding of conversation context",
            "Consistent grammar usage"
          ],
          weaknesses: [
            "Conversation responses could be more natural",
            "Limited vocabulary variety in some responses"
          ],
          recommendations: [
            "Practice conversational English in real-life scenarios",
            "Expand vocabulary for different topics",
            "Work on response timing and natural flow"
          ],
          topicWritingScore: 82,
          aiConversationScore: 85,
          feedback: "Good progress in writing skills. Focus on developing more natural conversation patterns.",
          duration: 2400,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          creativityScore: 82,
          grammarAccuracy: 80,
          vocabularyUsage: 78,
          conversationFlow: 85,
          topicCoverage: 82,
          responseLength: 78
        }]
      }
    ]
  }
];

// Mock Analysis Data - French
export const writingAnalysisDataFrench: WritingAnalysisData[] = [
  {
    id: "writing-session-french-1",
    title: "Pratique Complète d'Écriture et Chat",
    language: "french",
    createdAt: new Date(),
    attempts: [
      {
        id: `attempt-writing-session-french-1-1`,
        startedAt: new Date(Date.now() - 48 * 60 * 1000),
        completedAt: new Date(),
        duration: 2880,
        status: 'completed',
        createdAt: new Date(),
        results: [{
          id: `result-writing-session-french-1-1`,
          overallScore: 88,
          overallFeedback: "Performance d'écriture exceptionnelle ! Vous avez démontré une excellente créativité dans l'écriture thématique et des capacités naturelles de conversation. Votre écriture montre une forte maîtrise de la langue avec une bonne grammaire et un contenu engageant.",
          strengths: [
            "Écriture thématique hautement créative et engageante",
            "Flux de conversation naturel avec l'IA",
            "Excellent usage du vocabulaire et choix des mots",
            "Structure et organisation claires dans l'écriture",
            "Bon équilibre entre tons formels et conversationnels",
            "Utilisation efficace du langage descriptif"
          ],
          weaknesses: [
            "Pourrait incorporer des structures de phrases plus variées",
            "Certaines réponses pourraient bénéficier de plus de détails"
          ],
          recommendations: [
            "Expérimenter différents styles et genres d'écriture",
            "Pratiquer l'écriture de réponses plus longues et détaillées",
            "Travailler sur l'incorporation de structures de phrases plus complexes",
            "Essayer d'écrire sur des sujets difficiles ou inconnus"
          ],
          topicWritingScore: 86,
          aiConversationScore: 90,
          feedback: "Excellent travail dans l'écriture thématique et la conversation IA ! Vous avez montré une grande créativité et des compétences de communication naturelles.",
          duration: 2880,
          createdAt: new Date(),
          creativityScore: 90,
          grammarAccuracy: 86,
          vocabularyUsage: 83,
          conversationFlow: 88,
          topicCoverage: 85,
          responseLength: 81
        }]
      },
      {
        id: `attempt-writing-session-french-1-2`,
        startedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 42 * 60 * 1000),
        duration: 2520,
        status: 'completed',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        results: [{
          id: `result-writing-session-french-1-2`,
          overallScore: 82,
          overallFeedback: "Session d'écriture solide avec place à l'amélioration dans la fluidité conversationnelle et l'expression créative.",
          strengths: [
            "Amélioration de la structure d'écriture thématique",
            "Meilleure compréhension du contexte conversationnel",
            "Cohérence grammaticale"
          ],
          weaknesses: [
            "Les réponses conversationnelles pourraient être plus naturelles",
            "Variété du vocabulaire dans certaines réponses"
          ],
          recommendations: [
            "Pratiquer l'anglais conversationnel dans des situations réelles",
            "Étendre le vocabulaire pour différents sujets",
            "Travailler sur le timing et le flux naturels des réponses"
          ],
          topicWritingScore: 80,
          aiConversationScore: 84,
          feedback: "Bon progrès dans les compétences d'écriture. Concentrez-vous sur le développement de schémas conversationnels plus naturels.",
          duration: 2520,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          creativityScore: 80,
          grammarAccuracy: 78,
          vocabularyUsage: 76,
          conversationFlow: 84,
          topicCoverage: 80,
          responseLength: 76
        }]
      }
    ]
  }
];

// Combined analysis data by language
export const writingAnalysisData = {
  english: writingAnalysisDataEnglish,
  french: writingAnalysisDataFrench
};

// Export combined data for easy access
export const allWritingData = {
  topics: writingTopicData,
  chatScenarios: chatScenarios,
  sessions: writingSessionsData,
  analysis: writingAnalysisData
};