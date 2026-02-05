/**
 * Shared Type Definitions for Meet Test Components
 *
 * Centralized interfaces used across meet test components
 */

export interface VoiceConfig {
  language: string
  speechRate: number
  speechPitch: number
  autoListenAfterAI: boolean
  silenceTimeoutMs?: number // Time to wait after user stops speaking before sending to LLM (default: 2000ms)
  defaultVoiceName?: string // Preferred default voice name (e.g., "WilliamMu1-tiIingual")
}

export interface UiConfig {
  showChatBox: boolean
  showVoiceSettings: boolean
  showLiveTranscription?: boolean
  showLiveTranscriptionCoding?: boolean
  showUserTranscription?: boolean
  showShareScreen: boolean
  showCodeButtonOnlyOnScreenShare?: boolean
  showCodingInterviewOnlyOnScreenShare?: boolean
  showInterviewStartDialog: boolean
  redirectOnStop: boolean
  screenShareSuccessMessage: string
  screenShareDialogTitle: string
  screenShareDialogDescription: string
  screenShareRestrictToScreen: boolean
  screenShareRestrictionErrorMessage: string
  enableAnalysisOnStop: boolean
  /** When true, meet room enters full screen (both simple and coding mode). Set false for dev, true for testing */
  useFullScreenInMeet?: boolean
}

export interface VoiceChatConfig {
  SILENCE_TIMEOUT_MS: number
  RECOGNITION_KEEP_ALIVE_MS: number
  TTS_RESTART_DELAY_MS: number
  USER_RESPONSE_TIMEOUT_MS: number
}

export interface VoiceChatMessages {
  AI_GREETING_MESSAGE: string
  USER_RESPONSE_TIMEOUT_MESSAGE: string
  NEXT_QUESTION_TRIGGER_MESSAGE?: string
  QUESTION_INSTRUCTIONS?: string
}

export interface CodingQuestionDisplay {
  INCLUDE_QUESTION_TITLE: boolean
  INCLUDE_QUESTION_DESCRIPTION: boolean
  INCLUDE_QUESTION_INSTRUCTIONS: boolean
}

export interface InterviewData {
  id?: string
  title?: string
  experience?: string
  customPrompt?: string
  jd?: string
  interviewType?: string
  foreignLanguageSubType?: string
  /** When true, this is a coding interview; user is asked to share screen when they enter the meet */
  screenShareEnabled?: boolean
  prompts?: Array<{
    id: string
    promptText: string
    isActive: boolean
  }>
}
