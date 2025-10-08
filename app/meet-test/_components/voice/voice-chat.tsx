'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Brain } from 'lucide-react'
import { INTERVIEW_CONFIG, InterviewConfig, CodingInterviewConfig, VOICE_CHAT_CONFIG, VOICE_CHAT_MESSAGES, buildAISystemPrompt, buildCodingInterviewSystemPrompt, UI_CONFIG } from '../config'

// Extend window interface for coding code getter
declare global {
  interface Window {
    getCurrentCodingCode?: () => { code: string; language: string }
  }
}

// AI System Prompt - imported from ../config.ts


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
  onConversationModeChange?: (isActive: boolean) => void
  selectedVoice?: string
  speechRate?: number
  speechPitch?: number
  availableVoices?: SpeechSynthesisVoice[]
  autoListenAfterAI?: boolean
  isAISpeaking?: boolean
  onWaitingForResponseChange?: (isWaiting: boolean) => void
  interviewConfig?: InterviewConfig | CodingInterviewConfig
  currentQuestion?: { title: string; description: string } // For coding interviews
  eventName?: string // Custom event name for starting/stopping voice chat
  voiceChatConfig?: { SILENCE_TIMEOUT_MS: number; RECOGNITION_KEEP_ALIVE_MS: number; TTS_RESTART_DELAY_MS: number; USER_RESPONSE_TIMEOUT_MS: number } // Optional custom voice chat config
  voiceChatMessages?: { AI_GREETING_MESSAGE: string; USER_RESPONSE_TIMEOUT_MESSAGE: string } // Optional custom voice chat messages
  showLiveTranscription?: boolean // Optional override for live transcription display
}

export function VoiceChat({
  onTranscriptUpdate,
  onVoiceChatStateChange,
  onConversationModeChange,
  selectedVoice = '',
  speechRate = 0.9,
  speechPitch = 1,
  availableVoices = [],
  autoListenAfterAI = false,
  isAISpeaking = false,
  onWaitingForResponseChange,
  interviewConfig = INTERVIEW_CONFIG,
  currentQuestion,
  eventName = 'startVoiceChat',
  voiceChatConfig,
  voiceChatMessages,
  showLiveTranscription
}: VoiceChatProps) {
  // Use provided voice chat config or default
  const currentVoiceChatConfig = voiceChatConfig || VOICE_CHAT_CONFIG
  // Use provided voice chat messages or default
  const currentVoiceChatMessages = voiceChatMessages || VOICE_CHAT_MESSAGES

  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string>('')
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false)
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState<boolean>(false)
  const [liveTranscript, setLiveTranscript] = useState<string>('')

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const handleSendMessageRef = useRef<((message: string) => void) | null>(null)
  const startListeningRef = useRef<(() => void) | null>(null)
  const speakTextRef = useRef<((text: string) => void) | null>(null)
  const isListeningRef = useRef<boolean>(false)
  const isConversationModeRef = useRef<boolean>(false)
  const autoListenAfterAIRef = useRef<boolean>(false)

  // New refs for accumulating speech over time
  const accumulatedSpeechRef = useRef<string>('')
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isProcessingSpeechRef = useRef<boolean>(false)
  const recognitionActiveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const userResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear existing timeout
  const clearSilenceTimeout = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = null
    }
  }, [])

  // Process accumulated speech after 10 seconds of silence
  const processAccumulatedSpeech = useCallback(() => {
    if (isProcessingSpeechRef.current || !accumulatedSpeechRef.current.trim()) return

    isProcessingSpeechRef.current = true
    const speechToProcess = accumulatedSpeechRef.current.trim()

    // Clear accumulated speech
    accumulatedSpeechRef.current = ''

    // Send to AI
    handleSendMessageRef.current?.(speechToProcess)

    // Reset processing flag after a short delay
    setTimeout(() => {
      isProcessingSpeechRef.current = false
    }, 100)
  }, [])

  // Start silence timeout
  const startSilenceTimeout = useCallback(() => {
    clearSilenceTimeout()
    silenceTimeoutRef.current = setTimeout(() => {
      processAccumulatedSpeech()
    }, currentVoiceChatConfig.SILENCE_TIMEOUT_MS)
  }, [clearSilenceTimeout, processAccumulatedSpeech, currentVoiceChatConfig.SILENCE_TIMEOUT_MS])

  // Ensure recognition stays active by restarting if needed
  const ensureRecognitionActive = useCallback(() => {
    // Don't restart if not in conversation mode, currently processing speech, or AI is speaking
    if (!isConversationModeRef.current || isProcessingSpeechRef.current) return

    if (!isListeningRef.current && startListeningRef.current) {
      console.log('Recognition not active, restarting...')
      startListeningRef.current()
    }
  }, [])

  // Start periodic check to keep recognition active
  const startRecognitionKeepAlive = useCallback(() => {
    if (recognitionActiveTimeoutRef.current) {
      clearInterval(recognitionActiveTimeoutRef.current)
    }
    recognitionActiveTimeoutRef.current = setInterval(ensureRecognitionActive, currentVoiceChatConfig.RECOGNITION_KEEP_ALIVE_MS)
  }, [ensureRecognitionActive, currentVoiceChatConfig.RECOGNITION_KEEP_ALIVE_MS])

  // Stop periodic check
  const stopRecognitionKeepAlive = useCallback(() => {
    if (recognitionActiveTimeoutRef.current) {
      clearInterval(recognitionActiveTimeoutRef.current)
      recognitionActiveTimeoutRef.current = null
    }
  }, [])

  // Clear user response timeout
  const clearUserResponseTimeout = useCallback(() => {
    if (userResponseTimeoutRef.current) {
      clearTimeout(userResponseTimeoutRef.current)
      userResponseTimeoutRef.current = null
    }
    setIsWaitingForUserResponse(false)
  }, [])

  // Start user response timeout after AI speaks
  const startUserResponseTimeout = useCallback(() => {
    clearUserResponseTimeout()
    setIsWaitingForUserResponse(true)
    userResponseTimeoutRef.current = setTimeout(async () => {
      setIsWaitingForUserResponse(false)
      // Send timeout message directly as AI response instead of user message
      setIsLoading(true)

      const timeoutMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: currentVoiceChatMessages.USER_RESPONSE_TIMEOUT_MESSAGE,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, timeoutMessage])

      // Update transcript
      const updatedMessages = [...messages, timeoutMessage]
      onTranscriptUpdate?.(updatedMessages.map(m => ({
        role: m.role,
        text: m.content,
        timestamp: m.timestamp.toISOString()
      })))

      // Speak the timeout message
      speakTextRef.current?.(currentVoiceChatMessages.USER_RESPONSE_TIMEOUT_MESSAGE)

      setIsLoading(false)
    }, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS)
  }, [clearUserResponseTimeout, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS, currentVoiceChatMessages.USER_RESPONSE_TIMEOUT_MESSAGE, onTranscriptUpdate, messages])

  // Notify parent when waiting state changes
  useEffect(() => {
    onWaitingForResponseChange?.(isWaitingForUserResponse)
  }, [isWaitingForUserResponse, onWaitingForResponseChange])

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
    speakTextRef.current = speakText
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
      // Stop speech recognition while AI is speaking to prevent feedback
      if (recognitionRef.current && isListeningRef.current) {
        recognitionRef.current.stop()
      }
      // Clear live transcript and any pending silence timeout - accumulated speech will be sent after AI finishes
      setLiveTranscript('')
      clearSilenceTimeout()
      setIsSpeaking(true)
      onVoiceChatStateChange?.(true)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
      // Start user response timeout - wait for user to respond
      startUserResponseTimeout()
      // Restart speech recognition after AI finishes speaking (with delay to avoid immediate recapture)
      if (isConversationModeRef.current || autoListenAfterAIRef.current) {
        setTimeout(() => {
          if (!isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
            startListeningRef.current()
          }
        }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
      }
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
      // Restart speech recognition on error as well
      if (isConversationModeRef.current || autoListenAfterAIRef.current) {
        setTimeout(() => {
          if (!isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
            startListeningRef.current()
          }
        }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
      }
    }

    speechSynthesisRef.current.speak(utterance)
  }, [selectedVoice, speechRate, speechPitch, availableVoices, onVoiceChatStateChange, clearSilenceTimeout, startUserResponseTimeout, currentVoiceChatConfig.TTS_RESTART_DELAY_MS])

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return

    console.log('Interview Config:', interviewConfig)
    console.log('Is Coding Interview:', 'focus' in interviewConfig)
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
            {
              role: 'system',
              content: (() => {
                const systemPrompt = 'focus' in interviewConfig
                  ? buildCodingInterviewSystemPrompt(interviewConfig as CodingInterviewConfig, currentQuestion)
                  : buildAISystemPrompt(interviewConfig as InterviewConfig);
                console.log('System Prompt:', systemPrompt.substring(0, 200) + '...');
                return systemPrompt;
              })()
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            {
              role: 'user',
              content: 'focus' in interviewConfig
                ? (() => {
                    // Get current code only when user speaks during coding interview
                    const currentCode = typeof window !== 'undefined' ? window.getCurrentCodingCode?.() : undefined
                    const userContent = currentCode
                      ? `I can see your current ${currentCode.language} code. ${messageText}\n\nYour current code:\n\`\`\`${currentCode.language}\n${currentCode.code}\n\`\`\``
                      : messageText;
                    console.log('User Message (Coding):', userContent.substring(0, 300) + '...');
                    return userContent;
                  })()
                : (() => {
                    console.log('User Message (Regular):', messageText);
                    return messageText;
                  })()
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content
      console.log('AI Response:', aiResponse.substring(0, 300) + '...')

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

      // Check if user is requesting next question in coding interviews
      if ('focus' in interviewConfig && (
        messageText.toLowerCase().includes('next question') ||
        messageText.toLowerCase().includes('another question') ||
        messageText.toLowerCase().includes('give me next') ||
        messageText.toLowerCase().includes('next one') ||
        messageText.toLowerCase().includes('move to next')
      )) {
        // User explicitly requested next question - trigger it
        setTimeout(() => {
          const nextQuestionEvent = new CustomEvent('nextCodingQuestion')
          window.dispatchEvent(nextQuestionEvent)
        }, 1000)
      }

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
  }, [messages, speakText, onTranscriptUpdate, interviewConfig, currentQuestion])

  // Initialize speech recognition and voices
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      speechSynthesisRef.current = window.speechSynthesis

      const recognition = recognitionRef.current
      recognition.continuous = true  // Changed to continuous for accumulating speech
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        isListeningRef.current = true
        setError('')
        accumulatedSpeechRef.current = ''  // Reset accumulated speech
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        // Update live transcript with both final and interim results
        setLiveTranscript(finalTranscript + interimTranscript)

        // ANY speech result means user is actively speaking - reset all timeouts
        clearUserResponseTimeout()
        startSilenceTimeout()

        if (event.results[event.resultIndex].isFinal) {
          // Accumulate final results
          if (finalTranscript.trim()) {
            accumulatedSpeechRef.current += (accumulatedSpeechRef.current ? ' ' : '') + finalTranscript.trim()
          }
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = ''
        switch (event.error) {
          case 'no-speech':
            // Don't restart automatically in continuous mode - let silence timeout handle it
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

        // Clear timeout on error
        clearSilenceTimeout()
        accumulatedSpeechRef.current = ''

        setError(errorMessage)
        setIsListening(false)
        isListeningRef.current = false
        setIsLoading(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        isListeningRef.current = false
        // Clear live transcript when recognition ends
        setLiveTranscript('')
        // Clear timeout when recognition ends
        clearSilenceTimeout()
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
      // Clear timeouts on cleanup
      clearSilenceTimeout()
      clearUserResponseTimeout()
      stopRecognitionKeepAlive()
    }
  }, [clearSilenceTimeout, startSilenceTimeout, clearUserResponseTimeout, stopRecognitionKeepAlive])

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
      console.log('VoiceChat: handleStartVoiceChat called for', eventName, 'isConversationMode:', isConversationMode)
      if (!isConversationMode) {
        console.log('VoiceChat: Starting conversation')
        setIsConversationMode(true)
        isConversationModeRef.current = true
        onConversationModeChange?.(true)
        onVoiceChatStateChange?.(true)
        // Start keep-alive to ensure recognition stays active
        startRecognitionKeepAlive()
        // Only send greeting for regular interviews, not coding interviews
        const isCodingInterview = 'focus' in interviewConfig

        if (!isCodingInterview) {
          const greetingMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: currentVoiceChatMessages.AI_GREETING_MESSAGE,
            timestamp: new Date()
          }
          setMessages([greetingMessage])
          speakText(greetingMessage.content)
        } else {
          // For coding interviews, start with minimal context - system prompt has the details
          setMessages([])
        }
      }
    }

    const handleStopVoiceChat = () => {
      console.log('VoiceChat: handleStopVoiceChat called, isConversationMode:', isConversationMode)
      if (isConversationMode) {
        console.log('VoiceChat: Stopping conversation')
        setIsConversationMode(false)
        isConversationModeRef.current = false
        onConversationModeChange?.(false)
        onVoiceChatStateChange?.(false)
        // Stop keep-alive
        stopRecognitionKeepAlive()
        // Clear all timeouts and accumulated speech
        clearSilenceTimeout()
        clearUserResponseTimeout()
        accumulatedSpeechRef.current = ''
        setLiveTranscript('')
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel()
        }
      }
    }

    if (typeof window === 'undefined') return

    console.log('VoiceChat: Setting up listeners for', eventName)
    window.addEventListener(eventName, handleStartVoiceChat)
    window.addEventListener('stopVoiceChat', handleStopVoiceChat)

    return () => {
      window.removeEventListener(eventName, handleStartVoiceChat)
      window.removeEventListener('stopVoiceChat', handleStopVoiceChat)
    }
  }, [eventName, isConversationMode, speakText, onVoiceChatStateChange, onConversationModeChange, clearSilenceTimeout, clearUserResponseTimeout, startRecognitionKeepAlive, stopRecognitionKeepAlive, interviewConfig, currentVoiceChatMessages.AI_GREETING_MESSAGE, currentQuestion?.title])



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
    <div className="relative h-full">
      {/* AI Icon - Always visible in center */}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
          <Brain className="w-12 h-12 text-white" />
        </div>
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
      {isListening && !isAISpeaking && (
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
            <span>AI is thinking...</span>
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
