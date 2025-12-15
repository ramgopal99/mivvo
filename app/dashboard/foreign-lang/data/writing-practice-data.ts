// Writing Practice Data Types - Now using API-generated data instead of dummy data

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
  vocabulary: string[];
  context?: string;
}

// Empty placeholder data - all content is now generated dynamically via API
export const writingTopicDataEnglish: WritingTopicData[] = [];
export const writingTopicDataFrench: WritingTopicData[] = [];

export const writingTopicData = {
  english: writingTopicDataEnglish,
  french: writingTopicDataFrench
};

export const chatScenariosEnglish: ChatScenario[] = [];
export const chatScenariosFrench: ChatScenario[] = [];

export const chatScenarios = {
  english: chatScenariosEnglish,
  french: chatScenariosFrench
};

export const writingSessionsDataEnglish: WritingSessionData[] = [];
export const writingSessionsDataFrench: WritingSessionData[] = [];

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

// Empty analysis data - all analysis is now generated dynamically
export const writingAnalysisDataEnglish: WritingAnalysisData[] = [];
export const writingAnalysisDataFrench: WritingAnalysisData[] = [];

export const writingAnalysisData = {
  english: writingAnalysisDataEnglish,
  french: writingAnalysisDataFrench
};

// Export combined data for easy access - now primarily for type definitions
export const allWritingData = {
  topics: writingTopicData,
  chatScenarios: chatScenarios,
  sessions: writingSessionsData,
  analysis: writingAnalysisData
};