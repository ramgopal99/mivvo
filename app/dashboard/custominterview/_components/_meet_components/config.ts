// Removed prompts import - now using OpenAI only

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
// VOICE & SPEECH CONFIGURATIONS
// =============================================

// Voice settings for speech synthesis and recognition
export const VOICE_CONFIG = {
  language: 'hi-IN',        // Default language (Hindi)
  speechRate: 1.2,          // Speech rate (1.2x = 20% faster)
  speechPitch: 1.0,         // Speech pitch (1.0 = normal)
  autoListenAfterAI: false  // Auto-listen after AI speaks
}

// =============================================
// UI VISIBILITY & BEHAVIOR CONFIGURATIONS
// =============================================

// Controls what UI elements are shown/hidden during interviews
export const UI_CONFIG = {
  showChatBox: false,       // Show/hide chat box
  showVoiceSettings: true,  // Show/hide voice settings panel
  showLiveTranscription: false, // Live speech-to-text for regular interviews
  showLiveTranscriptionCoding: false, // Live speech-to-text for coding interviews
  showShareScreen: true,    // Show/hide share screen button
  showCodeButtonOnlyOnScreenShare: true, // Code button visibility
  showCodingInterviewOnlyOnScreenShare: true, // Coding interview button visibility
  showInterviewStartDialog: false, // Show interview start dialog automatically on page load
  screenShareSuccessMessage: "Screen sharing started successfully!",
  screenShareDialogTitle: "Screen Sharing Active",
  screenShareDialogDescription: "Your entire screen is now being shared...",
  screenShareRestrictToScreen: true, // Restrict to screen-only sharing
  screenShareRestrictionErrorMessage: "Please select your entire screen to share..."
}


// =============================================
// VOICE CHAT TIMING CONFIGURATIONS
// =============================================

// Timing settings for regular voice conversations
export const VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 3000, // Wait time after user stops speaking
  RECOGNITION_KEEP_ALIVE_MS: 6000, // Speech recognition keep-alive interval
  TTS_RESTART_DELAY_MS: 250, // Delay before restarting speech recognition
  USER_RESPONSE_TIMEOUT_MS: 15000, // Timeout for user responses
}

// Separate timing for coding interviews (longer timeouts for thinking)
export const CODING_VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 3500, // Longer timeout for coding interviews
  RECOGNITION_KEEP_ALIVE_MS: 6000, // Same keep-alive interval
  TTS_RESTART_DELAY_MS: 250, // Delay for coding context
  USER_RESPONSE_TIMEOUT_MS: 60000, // Much longer timeout for coding discussions
}

// =============================================
// VOICE CHAT MESSAGES & TEXT
// =============================================

// Messages used during voice conversations
// Note: AI_GREETING_MESSAGE is now dynamically generated based on interview data
export const VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "", // This will be generated dynamically
  USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Please continue with your thoughts.",
}

// Special messages for coding interviews
export const CODING_VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "", // No greeting for coding interviews
  USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Feel free to continue working on the problem.",
  QUESTION_INSTRUCTIONS: "Feel free to ask questions if you need clarification..."
}

// What parts of coding questions get spoken aloud
export const CODING_QUESTION_DISPLAY = {
  INCLUDE_QUESTION_TITLE: true, // Speak question title
  INCLUDE_QUESTION_DESCRIPTION: false, // Don't speak full description
  INCLUDE_QUESTION_INSTRUCTIONS: true, // Speak instructions
}



// =============================================
// MASTER CONFIGURATION EXPORT
// =============================================

// Consolidated export of all configurations for easy importing
export const DEFAULT_CONFIGS = {
  voiceConfig: VOICE_CONFIG,
  uiConfig: UI_CONFIG,
  codingVoiceChatConfig: CODING_VOICE_CHAT_CONFIG,
  codingVoiceChatMessages: CODING_VOICE_CHAT_MESSAGES,
  codingQuestionDisplay: CODING_QUESTION_DISPLAY
}

