import { useState } from 'react'

export function useVoiceChatState() {
  const [voiceTranscript, setVoiceTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isConversationMode, setIsConversationMode] = useState(false)
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState<boolean>(false)
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]>([])

  const handleTranscriptUpdate = (transcript: { role: string; text: string; timestamp: string }[]) => {
    setVoiceTranscript(transcript)
    setMessages(transcript.map((t, index) => ({
      id: `msg-${index}`,
      role: t.role as 'user' | 'assistant',
      content: t.text,
      timestamp: t.timestamp
    })))
  }

  const handleVoiceChatStateChange = (isActive: boolean) => {
    setIsVoiceChatActive(isActive)
  }

  const handleConversationModeChange = async (isActive: boolean) => {
    setIsConversationMode(isActive)
  }

  const handleWaitingForResponseChange = (isWaiting: boolean) => {
    setIsWaitingForUserResponse(isWaiting)
  }

  return {
    voiceTranscript,
    isVoiceChatActive,
    isConversationMode,
    isWaitingForUserResponse,
    messages,
    handleTranscriptUpdate,
    handleVoiceChatStateChange,
    handleConversationModeChange,
    handleWaitingForResponseChange,
    setIsConversationMode,
  }
}
