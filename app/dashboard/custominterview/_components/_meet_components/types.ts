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
}

export interface UiConfig {
  showChatBox: boolean
  showVoiceSettings: boolean
  showLiveTranscription: boolean
  showLiveTranscriptionCoding: boolean
  showShareScreen: boolean
  showCodeButtonOnlyOnScreenShare: boolean
  showCodingInterviewOnlyOnScreenShare: boolean
  showInterviewStartDialog: boolean
  screenShareSuccessMessage: string
  screenShareDialogTitle: string
  screenShareDialogDescription: string
  screenShareRestrictToScreen: boolean
  screenShareRestrictionErrorMessage: string
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
}
