'use client'

import { useEffect, useRef } from 'react'
import { Brain } from 'lucide-react'
import { UI_CONFIG } from '../config'
import { Orb } from '../ui/orb'
import { useVoiceChat } from './useVoiceChat'



// Services are now imported from separate files
// Message interface is now imported from LLM service


interface VoiceChatProps {
  onTranscriptUpdate?: (messages: { role: string; text: string; timestamp: string }[]) => void
  onVoiceChatStateChange?: (isActive: boolean) => void
  onConversationModeChange?: (isActive: boolean) => void
  selectedVoice?: string
  speechRate?: number
  speechPitch?: number
  autoListenAfterAI?: boolean
  isAISpeaking?: boolean
  isUserSpeaking?: boolean // Whether user is currently speaking
  onWaitingForResponseChange?: (isWaiting: boolean) => void
  eventName?: string // Custom event name for starting/stopping voice chat
  voiceChatConfig?: { SILENCE_TIMEOUT_MS: number; RECOGNITION_KEEP_ALIVE_MS: number; TTS_RESTART_DELAY_MS: number; USER_RESPONSE_TIMEOUT_MS: number } // Optional custom voice chat config
  voiceChatMessages?: { AI_GREETING_MESSAGE: string; USER_RESPONSE_TIMEOUT_MESSAGE: string; NEXT_QUESTION_TRIGGER_MESSAGE?: string } // Optional custom voice chat messages
  showLiveTranscription?: boolean // Optional override for live transcription display
  customPrompt?: string // Custom AI interviewer prompt
  isAudioEnabled?: boolean // Whether microphone is enabled
  externalConversationMode?: boolean // External control of conversation mode
  uiConfig?: { enableUserResponseTimeout?: boolean } // UI configuration
}

export function VoiceChat({
  onTranscriptUpdate,
  onVoiceChatStateChange,
  onConversationModeChange,
  selectedVoice = '',
  speechRate = 0.9,
  speechPitch = 1,
  autoListenAfterAI = false,
  isAISpeaking = false,
  isUserSpeaking = false,
  onWaitingForResponseChange,
  eventName = 'startVoiceChat',
  voiceChatConfig,
  voiceChatMessages,
  showLiveTranscription,
  externalConversationMode,
  uiConfig,
  customPrompt,
  isAudioEnabled = true // Default to true for backward compatibility
}: VoiceChatProps) {
  // Use the separated hook for all voice chat logic
  const {
    messages,
    isListening,
    isLoading,
    error,
    isConversationMode,
    liveTranscript,
    services
  } = useVoiceChat({
    selectedVoice,
    speechRate,
    speechPitch,
    autoListenAfterAI,
    isAISpeaking,
    isUserSpeaking,
    onWaitingForResponseChange,
    onConversationModeChange,
    onVoiceChatStateChange,
    eventName,
    voiceChatConfig,
    voiceChatMessages,
    customPrompt,
    isAudioEnabled,
    externalConversationMode,
    uiConfig
  })

  // Notify parent of transcript updates - use ref to avoid infinite loop
  const onTranscriptUpdateRef = useRef(onTranscriptUpdate)
  useEffect(() => {
    onTranscriptUpdateRef.current = onTranscriptUpdate
  }, [onTranscriptUpdate])

  useEffect(() => {
    onTranscriptUpdateRef.current?.(messages.map(m => ({
      role: m.role,
      text: m.content,
      timestamp: m.timestamp.toISOString()
    })))
  }, [messages])

  if (!services.stt || !services.tts) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Voice chat requires speech recognition support.
          </p>
          <p className="text-sm text-muted-foreground">
            Please use Chrome or Edge browser.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* AI Icon - Show Brain when idle, Orb when interview active */}
      <div className="flex flex-col items-center justify-center h-full">
        {isConversationMode ? (
          // Interview active - show Orb with dynamic states
          <div className="w-24 h-24 mb-4">
            <Orb
              agentState={
                isAISpeaking ? "talking" :
                isUserSpeaking ? "listening" :
                "thinking" // Default state when neither is speaking
              }
              colors={["#CADCFC", "#A0B9D1"]}
              className="w-full h-full"
            />
          </div>
        ) : (
          // Interview not started - show Brain icon
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-primary-foreground" />
          </div>
        )}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">AI Assistant</h3>
          {!isConversationMode ? (
            <p className="text-sm text-muted-foreground">Click &quot;Start Voice Chat&quot; to begin</p>
          ) : (
            <p className="text-sm text-muted-foreground">Voice chat is active</p>
          )}
        </div>
      </div>

      {/* Live Transcription Display - Near Controls */}
      {(showLiveTranscription ?? UI_CONFIG.showLiveTranscription) && (liveTranscript || isListening) && !isAISpeaking && (
        <div className="absolute bottom-20 left-4 right-4">
          <div className={`min-h-[60px] rounded-lg border-2 p-3 flex items-center justify-center transition-all duration-300 ${
            liveTranscript
              ? 'border-blue-300 bg-blue-50 shadow-lg'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="text-center w-full">
              {liveTranscript ? (
                <div className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                  {liveTranscript}
                  {isListening && !liveTranscript.endsWith(' ') && (
                    <span className="animate-pulse text-blue-500">|</span>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-base">
                  Listening... Speak to see live transcription
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Indicators - Bottom Left */}
      {isListening && !isAISpeaking && !isLoading && (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Listening...</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-blue-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Interviewer is thinking...</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-center gap-2 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}
