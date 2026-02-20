import { VoiceChat } from './VoiceChat'
import { VoiceConfig, UiConfig, VoiceChatMessages, InterviewData } from '../../types'

interface VoiceChatPanelProps {
  selectedVoice: string
  voiceConfig: VoiceConfig
  availableVoices: SpeechSynthesisVoice[]
  isVoiceChatActive: boolean
  isUserSpeaking: boolean
  isWaitingForUserResponse: boolean
  uiConfig: UiConfig
  interviewData?: InterviewData
  voiceChatMessages: VoiceChatMessages
  isAudioEnabled: boolean
  onTranscriptUpdate: (transcript: { role: string; text: string; timestamp: string }[]) => void
  onVoiceChatStateChange: (isActive: boolean) => void
  onConversationModeChange: (isActive: boolean) => void
  onWaitingForResponseChange: (isWaiting: boolean) => void
}

export function VoiceChatPanel({
  isVoiceChatActive,
  isUserSpeaking,
  onVoiceChatStateChange,
  onConversationModeChange,
}: VoiceChatPanelProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
      <VoiceChat
        key="regular-voice-chat"
        onVoiceChatStateChange={onVoiceChatStateChange}
        onConversationModeChange={onConversationModeChange}
        isAISpeaking={isVoiceChatActive}
        isUserSpeaking={isUserSpeaking}
      />
    </div>
  )
}
