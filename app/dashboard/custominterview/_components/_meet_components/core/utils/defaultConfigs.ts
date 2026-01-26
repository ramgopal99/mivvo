import { VoiceConfig, UiConfig } from '../../types'

// Supported languages for voice selection
export const SUPPORTED_LANGUAGES = ['hi', 'en'] as const

export const defaultVoiceConfig: VoiceConfig = {
  language: 'en-US',
  speechRate: 1.2,
  speechPitch: 1.0,
  autoListenAfterAI: false,
  silenceTimeoutMs: 5000, // 5 seconds default, can be changed
  // Default voice name - will try to find this voice, falls back to best available English voice if not found
  // Using shorter name for better matching - will match voices containing "WilliamMultilingual" or "William"
  defaultVoiceName: 'WilliamMultilingual' // Default preferred voice - matches "Microsoft WilliamMultilingual Online (Natural) - English (Australia)"
}

export const defaultUiConfig: UiConfig = {
  showChatBox: true,
  showVoiceSettings: true,
  showUserTranscription: true,
  showShareScreen: true,
  showInterviewStartDialog: false,
  redirectOnStop: false,
  screenShareSuccessMessage: "Screen sharing started successfully!",
  screenShareDialogTitle: "Screen Sharing Active",
  screenShareDialogDescription: "Your entire screen is now being shared. Others can see everything on your screen in the bottom-right corner of their view.\n\nTips:\n• Click the monitor button again to stop sharing\n• Your entire screen content is visible to others",
  screenShareRestrictToScreen: true,
  screenShareRestrictionErrorMessage: "Please select your entire screen to share. Sharing individual windows or tabs is not allowed.",
  enableAnalysisOnStop: true,
}
