import { VoiceConfig, UiConfig } from '../../types'

export const defaultVoiceConfig: VoiceConfig = {
  language: 'en-US',
  speechRate: 1.2,
  speechPitch: 1.0,
  autoListenAfterAI: false,
  silenceTimeoutMs: 2000, // 2 seconds default, can be changed
  defaultVoiceName: 'WilliamMu1-tiIingual' // Default preferred voice
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
