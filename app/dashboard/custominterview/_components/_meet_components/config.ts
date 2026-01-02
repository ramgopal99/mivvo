// Removed prompts import - now using OpenAI only




// =============================================
// VOICE & SPEECH CONFIGURATIONS
// =============================================

// Voice settings for speech synthesis and recognition
export const VOICE_CONFIG = {
  language: 'hi-IN',        // Default language (Hindi)
  speechRate: 1.25,          // Speech rate (1.2x = 20% faster)
  speechPitch: 1.0,         // Speech pitch (1.0 = normal)
  autoListenAfterAI: false  // Auto-listen after AI speaks
}

// =============================================
// UI VISIBILITY & BEHAVIOR CONFIGURATIONS
// =============================================

// Controls what UI elements are shown/hidden during interviews
export const UI_CONFIG = {
  showChatBox: true,       // Show/hide chat box
  showVoiceSettings: true,  // Show/hide voice settings panel
  showLiveTranscription: true, // Live speech-to-text for interviews
  showShareScreen: true,    // Show/hide share screen button
  showInterviewStartDialog: false, // Show interview start dialog automatically on page load
  redirectOnStop: false,    // Redirect to custominterview page when stop button is clicked
  screenShareDialogTitle: "Screen Sharing Active",
  screenShareDialogDescription: "Your entire screen is now being shared...",
  screenShareRestrictToScreen: true, // Restrict to screen-only sharing
  enablePostStopAnalysis: false, // Enable/disable AI analysis after stopping interview (for testing to save tokens)
  autoFullscreen: 0, // 0: always normal mode, 1: always fullscreen, 2: ask user choice
  enableUserResponseTimeout: true // Enable/disable automatic next question after user silence
}


// =============================================
// VOICE CHAT TIMING CONFIGURATIONS
// =============================================

// Timing settings for regular voice conversations
export const VOICE_CHAT_CONFIG = {
  SILENCE_TIMEOUT_MS: 2500, // Wait time after user stops speaking
  RECOGNITION_KEEP_ALIVE_MS: 6000, // Speech recognition keep-alive interval
  TTS_RESTART_DELAY_MS: 1500, // Delay before restarting speech recognition (increased to prevent feedback)
  USER_RESPONSE_TIMEOUT_MS: 30000, // Timeout for user responses (increased to 30 seconds)
}


// =============================================
// VOICE CHAT MESSAGES & TEXT
// =============================================

// Messages used during voice conversations
// Note: AI_GREETING_MESSAGE is now dynamically generated based on interview data
export const VOICE_CHAT_MESSAGES = {
  AI_GREETING_MESSAGE: "", // This will be generated dynamically
  USER_RESPONSE_TIMEOUT_MESSAGE: "Do you have any other questions for me?",
  NEXT_QUESTION_TRIGGER_MESSAGE: "NEXT_QUESTION", // Direct trigger for AI to ask next question
}





// =============================================
// MASTER CONFIGURATION EXPORT
// =============================================

// Consolidated export of all configurations for easy importing
export const DEFAULT_CONFIGS = {
  voiceConfig: VOICE_CONFIG,
  uiConfig: UI_CONFIG
}

