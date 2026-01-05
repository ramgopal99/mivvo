// Services exports
export { STTService, getSTTService, destroySTTService } from './stt-service'
export { LLMService, getLLMService, destroyLLMService } from './llm-service'
export { TTSService, getTTSService, destroyTTSService } from './tts-service'

// Re-export types
export type {
  STTConfig,
  STTCallbacks,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionResultList,
  SpeechRecognitionResult,
  SpeechRecognitionAlternative
} from './stt-service'

export type {
  Message,
  LLMConfig,
  LLMCallbacks,
  ConversationContext
} from './llm-service'

export type {
  TTSConfig,
  TTSCallbacks
} from './tts-service'
