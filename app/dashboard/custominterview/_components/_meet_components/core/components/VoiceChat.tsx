'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain } from 'lucide-react'
import { VoiceChatOrb } from './VoiceChatOrb'

interface VoiceChatProps {
  onVoiceChatStateChange?: (isActive: boolean) => void
  onConversationModeChange?: (isActive: boolean) => void
  isAISpeaking?: boolean
  isUserSpeaking?: boolean
  eventName?: string
}

export function VoiceChat({
  onVoiceChatStateChange,
  onConversationModeChange,
  isAISpeaking = false,
  isUserSpeaking = false,
  eventName = 'startVoiceChat',
}: VoiceChatProps) {
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false)

  const isConversationModeRef = useRef<boolean>(false)

  // Listen for custom events from header
  useEffect(() => {
    const handleStartVoiceChat = () => {
      if (!isConversationMode) {
        setIsConversationMode(true)
        isConversationModeRef.current = true
        onConversationModeChange?.(true)
        // Don't set isVoiceChatActive to true here - it should only be true when AI is speaking
        // onVoiceChatStateChange?.(true) // Removed - only set when AI actually speaks
      }
    }

    const handleStopVoiceChat = () => {
      if (isConversationMode) {
        setIsConversationMode(false)
        isConversationModeRef.current = false
        onConversationModeChange?.(false)
        onVoiceChatStateChange?.(false)
      }
    }

    if (typeof window === 'undefined') return

    window.addEventListener(eventName, handleStartVoiceChat)
    window.addEventListener('stopVoiceChat', handleStopVoiceChat)

    return () => {
      window.removeEventListener(eventName, handleStartVoiceChat)
      window.removeEventListener('stopVoiceChat', handleStopVoiceChat)
    }
  }, [eventName, isConversationMode, onVoiceChatStateChange, onConversationModeChange])

  return (
    <div className="relative h-full">
      {/* AI Icon - Show Brain when idle, Orb when interview active */}
      <div className="flex flex-col items-center justify-center h-full">
        {isConversationMode ? (
          <div className="w-24 h-24 mb-4">
            <VoiceChatOrb
              agentState={
                isAISpeaking ? 'talking' :
                isUserSpeaking ? 'listening' :
                'thinking'
              }
              colors={['#CADCFC', '#A0B9D1']}
              className="w-full h-full"
            />
          </div>
        ) : (
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
    </div>
  )
}
