// Coding Question Interface (shared with other components)
export interface CodingQuestion {
  title: string
  description: string
  examples: Array<{
    input: string | object
    output: string | object
    explanation?: string
  }>
  constraints: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
}

export interface InterviewConfig {
  position: string
  topics: string
}

export interface CodingInterviewConfig {
  position: string
  topics: string
  focus: string
}


// =============================================
// VOICE CHAT TIMING CONFIGURATIONS
// =============================================

export const VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 2500,
  RECOGNITION_KEEP_ALIVE_MS: 6000,
  TTS_RESTART_DELAY_MS: 1500,
  USER_RESPONSE_TIMEOUT_MS: 30000,
}

// =============================================
// VOICE ACTIVITY DETECTION CONFIGURATIONS
// =============================================

export const VAD_CONFIG = {
  AUDIO_LEVEL_THRESHOLD: 0.01,
  MIN_SPEECH_DURATION_MS: 300,
  MONITORING_INTERVAL_MS: 100,
  HISTORY_LENGTH: 10,
  CONFIDENCE_THRESHOLD: 0.3,
}

export const CODING_VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 3500,
  RECOGNITION_KEEP_ALIVE_MS: 6000,
  TTS_RESTART_DELAY_MS: 1500,
  USER_RESPONSE_TIMEOUT_MS: 60000,
}

// =============================================
// VOICE CHAT MESSAGES & TEXT
// =============================================

export const VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "",
  USER_RESPONSE_TIMEOUT_MESSAGE: "Do you have any other questions for me?",
  NEXT_QUESTION_TRIGGER_MESSAGE: "NEXT_QUESTION",
}

export const CODING_VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "",
  USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Feel free to continue working on the problem.",
  QUESTION_INSTRUCTIONS: "Feel free to ask questions if you need clarification..."
}

export const CODING_QUESTION_DISPLAY = {
  INCLUDE_QUESTION_TITLE: true,
  INCLUDE_QUESTION_DESCRIPTION: false,
  INCLUDE_QUESTION_INSTRUCTIONS: true,
}

