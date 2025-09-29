'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Brain, Mic } from 'lucide-react'

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((event: Event) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: ((event: Event) => void) | null
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor
    webkitSpeechRecognition: SpeechRecognitionConstructor
  }
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface VoiceChatProps {
  onTranscriptUpdate?: (messages: { role: string; text: string; timestamp: string }[]) => void
  onVoiceChatStateChange?: (isActive: boolean) => void
  selectedVoice?: string
  speechRate?: number
  speechPitch?: number
  availableVoices?: SpeechSynthesisVoice[]
  autoListenAfterAI?: boolean
}

export function VoiceChat({
  onTranscriptUpdate,
  onVoiceChatStateChange,
  selectedVoice = '',
  speechRate = 0.9,
  speechPitch = 1,
  availableVoices = [],
  autoListenAfterAI = false
}: VoiceChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string>('')
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const handleSendMessageRef = useRef<((message: string) => void) | null>(null)
  const startListeningRef = useRef<(() => void) | null>(null)
  const isListeningRef = useRef<boolean>(false)
  const isConversationModeRef = useRef<boolean>(false)
  const autoListenAfterAIRef = useRef<boolean>(false)

  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening) return

    try {
      setError('')
      await navigator.mediaDevices.getUserMedia({ audio: true })
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }, [isListening])

  const speakText = useCallback((text: string) => {
    if (!speechSynthesisRef.current) return

    speechSynthesisRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate
    utterance.pitch = speechPitch

    if (selectedVoice) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      onVoiceChatStateChange?.(true)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
      if (isConversationModeRef.current || autoListenAfterAIRef.current) {
        setTimeout(() => {
          if (!isListeningRef.current && startListeningRef.current) {
            startListeningRef.current()
          }
        }, 100)
      }
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
    }

    speechSynthesisRef.current.speak(utterance)
  }, [selectedVoice, speechRate, speechPitch, availableVoices, onVoiceChatStateChange])

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    // Update transcript
    const updatedMessages = [...messages, userMessage]
    onTranscriptUpdate?.(updatedMessages.map(m => ({
      role: m.role,
      text: m.content,
      timestamp: m.timestamp.toISOString()
    })))

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful AI meeting assistant. Keep your responses concise and natural for voice interaction.' },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: messageText }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Update transcript
      const finalMessages = [...updatedMessages, aiMessage]
      onTranscriptUpdate?.(finalMessages.map(m => ({
        role: m.role,
        text: m.content,
        timestamp: m.timestamp.toISOString()
      })))

      // Speak the AI response
      speakText(aiResponse)

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, speakText, onTranscriptUpdate])

  // Initialize speech recognition and voices
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      speechSynthesisRef.current = window.speechSynthesis

      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        isListeningRef.current = true
        setError('')
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.resultIndex][0].transcript
        if (event.results[event.resultIndex].isFinal) {
          setError('')
          handleSendMessageRef.current?.(transcript)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = ''
        switch (event.error) {
          case 'no-speech':
            if (isConversationModeRef.current || autoListenAfterAIRef.current) {
              setTimeout(() => {
                if (!isListeningRef.current && startListeningRef.current) {
                  startListeningRef.current()
                }
              }, 100)
            }
            return
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone and try again.'
            break
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access and try again.'
            break
          case 'network':
            errorMessage = 'Network error. Check your internet connection and try again.'
            break
          case 'service-not-allowed':
            errorMessage = 'Speech recognition service is not available in your region.'
            break
          default:
            errorMessage = `Speech recognition error: ${event.error}`
        }

        setError(errorMessage)
        setIsListening(false)
        isListeningRef.current = false
        setIsLoading(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        isListeningRef.current = false
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [])

  // Update refs
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage
  }, [handleSendMessage])

  useEffect(() => {
    startListeningRef.current = startListening
  }, [startListening])

  useEffect(() => {
    autoListenAfterAIRef.current = autoListenAfterAI
  }, [autoListenAfterAI])

  // Listen for custom events from header
  useEffect(() => {
    const handleStartVoiceChat = () => {
      if (!isConversationMode) {
        setIsConversationMode(true)
        isConversationModeRef.current = true
        const greetingMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hello! I\'m your AI meeting assistant. How can I help you today?',
          timestamp: new Date()
        }
        setMessages([greetingMessage])
        speakText(greetingMessage.content)
      }
    }

    const handleStopVoiceChat = () => {
      if (isConversationMode) {
        setIsConversationMode(false)
        isConversationModeRef.current = false
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel()
        }
      }
    }

    window.addEventListener('startVoiceChat', handleStartVoiceChat)
    window.addEventListener('stopVoiceChat', handleStopVoiceChat)

    return () => {
      window.removeEventListener('startVoiceChat', handleStartVoiceChat)
      window.removeEventListener('stopVoiceChat', handleStopVoiceChat)
    }
  }, [isConversationMode, speakText])



  if (!isSupported) {
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
    <div className="flex h-full items-center justify-center">
      <div className="text-center space-y-4">
        {/* Default AI Icon when not in conversation */}
        {!isConversationMode && !isListening && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Click &quot;Start Voice Chat&quot; to begin</p>
            </div>
          </div>
        )}

        {/* Status Indicators - Centered */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium text-lg">🎤 Listening... Speak now!</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-700 text-lg">AI is thinking...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-center p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
