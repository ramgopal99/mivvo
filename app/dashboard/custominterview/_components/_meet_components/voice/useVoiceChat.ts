/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react'
import { VOICE_CHAT_CONFIG, VOICE_CHAT_MESSAGES, UI_CONFIG } from '../config'
import { getSTTService, getLLMService, getTTSService, destroySTTService, destroyLLMService, destroyTTSService, Message, STTService, LLMService, TTSService } from '../services'

interface VoiceChatConfig {
  SILENCE_TIMEOUT_MS: number
  RECOGNITION_KEEP_ALIVE_MS: number
  TTS_RESTART_DELAY_MS: number
  USER_RESPONSE_TIMEOUT_MS: number
}

interface VoiceChatMessages {
  AI_GREETING_MESSAGE: string
  USER_RESPONSE_TIMEOUT_MESSAGE: string
  NEXT_QUESTION_TRIGGER_MESSAGE?: string
}

interface UiConfig {
  enableUserResponseTimeout?: boolean
}

interface UseVoiceChatProps {
  selectedVoice?: string
  speechRate?: number
  speechPitch?: number
  autoListenAfterAI?: boolean
  isAISpeaking?: boolean
  isUserSpeaking?: boolean
  onWaitingForResponseChange?: (isWaiting: boolean) => void
  onConversationModeChange?: (isActive: boolean) => void
  onVoiceChatStateChange?: (isActive: boolean) => void
  eventName?: string
  voiceChatConfig?: VoiceChatConfig
  voiceChatMessages?: VoiceChatMessages
  customPrompt?: string
  isAudioEnabled?: boolean
  externalConversationMode?: boolean
  uiConfig?: UiConfig
}

interface VoiceChatState {
  messages: Message[]
  isListening: boolean
  isLoading: boolean
  error: string
  isConversationMode: boolean
  isWaitingForUserResponse: boolean
  liveTranscript: string
}

interface VoiceChatActions {
  startListening: () => Promise<void>
  speakText: (text: string) => void
  handleSendMessage: (messageText: string) => Promise<void>
}

export function useVoiceChat({
  selectedVoice = '',
  speechRate = 0.9,
  speechPitch = 1,
  autoListenAfterAI = false,
  isAISpeaking = false,
  isUserSpeaking = false,
  onWaitingForResponseChange,
  onConversationModeChange,
  onVoiceChatStateChange,
  eventName = 'startVoiceChat',
  voiceChatConfig,
  voiceChatMessages,
  customPrompt,
  isAudioEnabled = true,
  externalConversationMode,
  uiConfig,
}: UseVoiceChatProps) {
  // Use provided configs or defaults
  const currentVoiceChatConfig = voiceChatConfig || VOICE_CHAT_CONFIG
  const currentVoiceChatMessages = voiceChatMessages || VOICE_CHAT_MESSAGES

  // Update internal references when props change
  const voiceChatMessagesRef = useRef(currentVoiceChatMessages)
  useEffect(() => {
    voiceChatMessagesRef.current = voiceChatMessages || VOICE_CHAT_MESSAGES
  }, [voiceChatMessages])

  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false)
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState<boolean>(false)
  const [liveTranscript, setLiveTranscript] = useState<string>('')

  // Service instances
  const sttServiceRef = useRef<STTService | null>(null)
  const llmServiceRef = useRef<LLMService | null>(null)
  const ttsServiceRef = useRef<TTSService | null>(null)

  // Refs for functions
  const handleSendMessageRef = useRef<((message: string) => void) | null>(null)
  const startListeningRef = useRef<(() => void) | null>(null)
  const speakTextRef = useRef<((text: string) => void) | null>(null)

  // State refs
  const isListeningRef = useRef<boolean>(false)
  const isConversationModeRef = useRef<boolean>(false)
  const autoListenAfterAIRef = useRef<boolean>(false)
  const isAudioEnabledRef = useRef<boolean>(true)

  // Processing refs
  const accumulatedSpeechRef = useRef<string>('')
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isProcessingSpeechRef = useRef<boolean>(false)
  const recognitionActiveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const userResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const aiSpeechCooldownRef = useRef<NodeJS.Timeout | null>(null)

  // Clear existing timeout
  const clearSilenceTimeout = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = null
    }
  }, [])

  // Process accumulated speech after 10 seconds of silence
  const processAccumulatedSpeech = useCallback(() => {
    console.log('🎤 processAccumulatedSpeech called, isProcessing:', isProcessingSpeechRef.current, 'speech:', accumulatedSpeechRef.current)

    if (isProcessingSpeechRef.current || !accumulatedSpeechRef.current.trim()) {
      console.log('🎤 Skipping speech processing - already processing or no speech')
      return
    }

    // Double-check: Atomic check and set
    if (isProcessingSpeechRef.current) {
      console.log('🎤 Double-check failed - already processing')
      return
    }

    isProcessingSpeechRef.current = true
    const speechToProcess = accumulatedSpeechRef.current.trim()
    console.log('🎤 Processing speech:', speechToProcess)

    // Clear accumulated speech immediately to prevent re-processing
    accumulatedSpeechRef.current = ''

    // Send to AI
    handleSendMessageRef.current?.(speechToProcess)

    // Reset processing flag after a longer delay to prevent rapid re-processing
    setTimeout(() => {
      console.log('🎤 Resetting processing flag after delay')
      isProcessingSpeechRef.current = false
    }, 2000) // Increased delay
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
    // Don't restart if not in conversation mode, currently processing speech, or mic is disabled
    if (!isConversationModeRef.current || isProcessingSpeechRef.current || !isAudioEnabledRef.current) return

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

  // Start AI speech cooldown to prevent immediate processing after AI finishes speaking
  const startAISpeechCooldown = useCallback(() => {
    // Clear any existing cooldown
    if (aiSpeechCooldownRef.current) {
      clearTimeout(aiSpeechCooldownRef.current)
    }
    // Set cooldown for 500ms after AI speech ends
    aiSpeechCooldownRef.current = setTimeout(() => {
      aiSpeechCooldownRef.current = null
    }, 500)
  }, [])

  // Start user response timeout after AI speaks
  const startUserResponseTimeout = useCallback(() => {
    clearUserResponseTimeout()
    setIsWaitingForUserResponse(true)
    userResponseTimeoutRef.current = setTimeout(async () => {
      setIsWaitingForUserResponse(false)

      // Only trigger automatic next question if enabled in config
      if (uiConfig?.enableUserResponseTimeout) {
        console.log('⏰ User response timeout triggered - asking next question automatically')
        // Trigger AI to ask next question
        handleSendMessageRef.current?.(voiceChatMessagesRef.current.NEXT_QUESTION_TRIGGER_MESSAGE || "Please ask me your next question.")
      } else {
        console.log('⏰ User response timeout disabled in config - not triggering next question')
      }
    }, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS)
  }, [clearUserResponseTimeout, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS, uiConfig?.enableUserResponseTimeout])

  // Notify parent when waiting state changes - use refs to avoid infinite loops
  const onWaitingForResponseChangeRef = useRef(onWaitingForResponseChange)
  const onConversationModeChangeRef = useRef(onConversationModeChange)
  const onVoiceChatStateChangeRef = useRef(onVoiceChatStateChange)

  useEffect(() => {
    onWaitingForResponseChangeRef.current = onWaitingForResponseChange
  }, [onWaitingForResponseChange])

  useEffect(() => {
    onConversationModeChangeRef.current = onConversationModeChange
  }, [onConversationModeChange])

  useEffect(() => {
    onVoiceChatStateChangeRef.current = onVoiceChatStateChange
  }, [onVoiceChatStateChange])

  useEffect(() => {
    onWaitingForResponseChangeRef.current?.(isWaitingForUserResponse)
  }, [isWaitingForUserResponse])

  useEffect(() => {
    onConversationModeChangeRef.current?.(isConversationMode)
  }, [isConversationMode])

  // Track internal TTS speaking state
  const [isTTSSpeaking, setIsTTSSpeaking] = useState(false)

  useEffect(() => {
    onVoiceChatStateChangeRef.current?.(isTTSSpeaking || isListening)
  }, [isTTSSpeaking, isListening])

  const startListening = useCallback(async () => {
    console.log('🎤 startListening called:', { hasSTTService: !!sttServiceRef.current, isListening, isAudioEnabled, serviceActive: sttServiceRef.current?.isActive() })

    if (!sttServiceRef.current) {
      console.log('🎤 STT service not initialized yet, cannot start listening')
      return
    }

    if (isListening) {
      console.log('🎤 Already listening, not starting again')
      return
    }

    // Critical: Check if microphone is enabled before starting recognition
    if (!isAudioEnabled) {
      console.log('Microphone is disabled, cannot start recognition')
      return
    }

    try {
      setError('')
      await sttServiceRef.current.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }, [isListening, isAudioEnabled])

  const speakText = useCallback((text: string) => {
    if (!ttsServiceRef.current) return

    // Stop STT while speaking to prevent feedback
    if (sttServiceRef.current?.isActive()) {
      sttServiceRef.current.stop()
    }

    // Clear live transcript and accumulated speech
    setLiveTranscript('')
    clearSilenceTimeout()
    accumulatedSpeechRef.current = ''

    // Update TTS service configuration
    ttsServiceRef.current.updateConfig({
      voice: selectedVoice,
      rate: speechRate,
      pitch: speechPitch
    })

    // Update TTS callbacks
    ttsServiceRef.current.updateCallbacks({
      onStart: () => {
        console.log('🎤 TTS onStart: AI started speaking')
        setIsTTSSpeaking(true)
      },
      onEnd: () => {
        console.log('🎤 TTS onEnd: AI finished speaking, preparing to listen', {
          isAudioEnabled,
          isConversationMode: isConversationModeRef.current,
          currentDelay: currentVoiceChatConfig.TTS_RESTART_DELAY_MS
        })
        setIsTTSSpeaking(false) // Mark TTS as finished speaking
        accumulatedSpeechRef.current = ''
        clearSilenceTimeout()
        startAISpeechCooldown()
        startUserResponseTimeout()

        // Always restart speech recognition after AI finishes speaking
        if (isAudioEnabled && isConversationModeRef.current) {
          console.log('🎤 TTS onEnd: Will attempt to restart speech recognition in', currentVoiceChatConfig.TTS_RESTART_DELAY_MS, 'ms')
          setTimeout(() => {
            console.log('🎤 TTS onEnd timeout: Checking conditions for speech restart', {
              isListening: isListeningRef.current,
              hasStartFunction: !!startListeningRef.current,
              isProcessing: isProcessingSpeechRef.current,
              conversationMode: isConversationModeRef.current
            })
            if (!isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
              console.log('🎤 TTS onEnd: Restarting speech recognition after AI finished speaking')
              accumulatedSpeechRef.current = ''
              startListeningRef.current()
            } else {
              console.log('🎤 TTS onEnd: Not restarting speech recognition - conditions not met', {
                isListening: isListeningRef.current,
                hasStartFunction: !!startListeningRef.current,
                isProcessing: isProcessingSpeechRef.current,
                isTTSSpeaking
              })
              // Force restart if we're in conversation mode but STT isn't listening
              if (isConversationModeRef.current && !isListeningRef.current && startListeningRef.current && !isTTSSpeaking) {
                console.log('🎤 TTS onEnd: Force restarting STT as fallback')
                setTimeout(() => {
                  if (startListeningRef.current && !isTTSSpeaking) {
                    startListeningRef.current()
                  }
                }, 1000)
              }
            }
          }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
        } else {
          console.log('🎤 TTS onEnd: Not restarting speech recognition - audio disabled or not in conversation mode', {
            isAudioEnabled,
            conversationMode: isConversationModeRef.current
          })
        }
      },
      onError: (error: string) => {
        console.log('🎤 TTS onError:', error)
        setIsTTSSpeaking(false) // Reset speaking state on error
        // Restart speech recognition on error
        if ((isConversationModeRef.current || autoListenAfterAIRef.current) && isAudioEnabled) {
          setTimeout(() => {
            if (!isTTSSpeaking && !isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
              console.log('Restarting speech recognition after AI speech error')
              startListeningRef.current()
            }
          }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
        }
      }
    })

    // Small delay to ensure callbacks are properly registered before speaking
    setTimeout(() => {
      console.log('🎤 Starting TTS speech:', text.substring(0, 50) + (text.length > 50 ? '...' : ''))
      if (ttsServiceRef.current) {
        ttsServiceRef.current.speak(text)
      }
    }, 50)
  }, [selectedVoice, speechRate, speechPitch, clearSilenceTimeout, startUserResponseTimeout, currentVoiceChatConfig.TTS_RESTART_DELAY_MS, isAudioEnabled, isAISpeaking])

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return

    setIsLoading(true)

    // Special handling for NEXT_QUESTION trigger - direct fresh question generation
    if (messageText === 'NEXT_QUESTION') {
      try {
        // Get current messages to analyze conversation context
        const currentMessages = await new Promise<Message[]>((resolve) => {
          setMessages(prev => {
            resolve(prev)
            return prev
          })
        })

        // Extract key context from conversation
        const questionCount = currentMessages.filter(m => m.role === 'assistant').length
        const lastTopics = currentMessages
          .filter(m => m.role === 'assistant')
          .slice(-3) // Get last 3 AI messages
          .map(m => m.content.substring(0, 100)) // First 100 chars of each
          .join(' ')

        // Use LLM service to generate next question
        const cleanResponse = await llmServiceRef.current?.generateNextQuestion({
          messages: currentMessages,
          customPrompt: customPrompt,
          questionCount,
          lastTopics
        }) || 'Sorry, I encountered an error. Please try again.'

        console.log('AI Response (Next Question):', cleanResponse.substring(0, 300) + '...')

        // Add AI message
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: cleanResponse,
          timestamp: new Date()
        }

        setMessages(prev => {
          const finalMessages = [...prev, aiMessage]
          return finalMessages
        })

        // Speak the AI response
        speakText(cleanResponse)

      } catch (error) {
        console.error('Error:', error)
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => {
      const updatedMessages = [...prev, userMessage]
      return updatedMessages
    })

    try {
      // Get current messages for API call
      const currentMessages = await new Promise<Message[]>((resolve) => {
        setMessages(prev => {
          resolve(prev)
          return prev
        })
      })

      // Prepare user content
      console.log('User Message:', messageText)

      // Use LLM service to send message
      const aiResponse = await llmServiceRef.current?.sendMessage({
        messages: currentMessages,
        customPrompt: customPrompt
      }) || 'Sorry, I encountered an error. Please try again.'

      console.log('AI Response:', aiResponse.substring(0, 300) + '...')

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => {
        const finalMessages = [...prev, aiMessage]
        return finalMessages
      })


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
  }, [speakText, customPrompt])

  // Initialize services
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize STT Service
    console.log('🎤 Initializing STT service...')
    sttServiceRef.current = getSTTService({
      language: 'en-US',
      continuous: true,
      interimResults: true
    }, {
      onResult: (transcript: string, isFinal: boolean) => {
        console.log('🎤 STT onResult triggered:', { transcript, isFinal, isAudioEnabled: isAudioEnabledRef.current, isAISpeaking, hasCooldown: !!aiSpeechCooldownRef.current, wasWaiting: isWaitingForUserResponse })

        // Critical: Ignore speech results if microphone is disabled or AI is speaking
        if (!isAudioEnabledRef.current) {
          console.log('Microphone is disabled, ignoring speech results')
          return
        }

        if (isAISpeaking) {
          console.log('AI is speaking, ignoring speech results to prevent feedback')
          return
        }

        if (aiSpeechCooldownRef.current) {
          console.log('AI speech cooldown active, ignoring speech results to prevent processing residual audio')
          return
        }

        // Update live transcript
        setLiveTranscript(prev => {
          if (isFinal) {
            // For final results, append to accumulated speech (only if not already added)
            if (transcript.trim()) {
              const trimmedTranscript = transcript.trim()
              // Check if this transcript is already in accumulated speech to prevent duplication
              if (!accumulatedSpeechRef.current.includes(trimmedTranscript)) {
                console.log('🎤 Adding final transcript to accumulated:', trimmedTranscript, 'Previous accumulated:', accumulatedSpeechRef.current)
                accumulatedSpeechRef.current += (accumulatedSpeechRef.current ? ' ' : '') + trimmedTranscript
                console.log('🎤 New accumulated speech:', accumulatedSpeechRef.current)
              } else {
                console.log('🎤 Skipping duplicate final transcript:', trimmedTranscript)
              }
            }
            return prev + transcript
          } else {
            // For interim results, show current + previous final
            return accumulatedSpeechRef.current + (accumulatedSpeechRef.current ? ' ' : '') + transcript
          }
        })

        // ANY speech result means user is actively speaking - reset all timeouts
        clearUserResponseTimeout()
        setIsWaitingForUserResponse(false) // User has started responding
        startSilenceTimeout()
      },
      onStart: () => {
        setIsListening(true)
        isListeningRef.current = true
        setError('')
        accumulatedSpeechRef.current = ''
        clearSilenceTimeout()
      },
      onEnd: () => {
        setIsListening(false)
        isListeningRef.current = false
        setLiveTranscript('')
        clearSilenceTimeout()
      },
      onError: (error: string) => {
        clearSilenceTimeout()
        accumulatedSpeechRef.current = ''
        setError(error)
        setIsListening(false)
        isListeningRef.current = false
        setIsLoading(false)
      }
    })

    // Initialize TTS Service
    ttsServiceRef.current = getTTSService({
      voice: selectedVoice,
      rate: speechRate,
      pitch: speechPitch
    })

    // Initialize LLM Service
    llmServiceRef.current = getLLMService({
      systemPrompt: customPrompt || 'You are an AI interviewer conducting a professional interview. Ask relevant questions and provide constructive feedback.'
    })

    return () => {
      // Cleanup services
      destroySTTService()
      destroyTTSService()
      destroyLLMService()

      // Clear timeouts
      clearSilenceTimeout()
      clearUserResponseTimeout()
      if (aiSpeechCooldownRef.current) {
        clearTimeout(aiSpeechCooldownRef.current)
        aiSpeechCooldownRef.current = null
      }
      stopRecognitionKeepAlive()
    }
  }, [clearSilenceTimeout, startSilenceTimeout, clearUserResponseTimeout, stopRecognitionKeepAlive, selectedVoice, speechRate, speechPitch, customPrompt])

  // Update refs
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage
  }, [handleSendMessage])

  useEffect(() => {
    startListeningRef.current = startListening
  }, [startListening])

  useEffect(() => {
    speakTextRef.current = speakText
  }, [speakText])

  useEffect(() => {
    autoListenAfterAIRef.current = autoListenAfterAI
  }, [autoListenAfterAI])

  // Update audio enabled ref
  useEffect(() => {
    isAudioEnabledRef.current = isAudioEnabled
  }, [isAudioEnabled])

  // Critical: Stop recognition when microphone is disabled
  useEffect(() => {
    if (!isAudioEnabled && sttServiceRef.current && sttServiceRef.current.isActive()) {
      console.log('Microphone disabled, stopping recognition')
      sttServiceRef.current.stop()
      setIsListening(false)
      isListeningRef.current = false
      setLiveTranscript('')
      clearSilenceTimeout()
      clearUserResponseTimeout()
      accumulatedSpeechRef.current = ''
    }
  }, [isAudioEnabled, clearSilenceTimeout, clearUserResponseTimeout])

  // Handle external conversation mode changes
  useEffect(() => {
    if (externalConversationMode !== undefined) {
      console.log('🎤 VoiceChat: External conversation mode changed to:', externalConversationMode, 'current internal mode:', isConversationMode)
      if (isConversationMode !== externalConversationMode) {
        console.log('🎤 VoiceChat: External mode differs from internal, updating...')
        if (!externalConversationMode) {
          // Parent turned off conversation mode - stop everything
          console.log('VoiceChat: Parent disabled conversation mode - stopping all activity')
          setIsConversationMode(false)
          isConversationModeRef.current = false
          stopRecognitionKeepAlive()
          clearSilenceTimeout()
          clearUserResponseTimeout()
          accumulatedSpeechRef.current = ''
          setLiveTranscript('')
          setIsListening(false)
          isListeningRef.current = false
          if (sttServiceRef.current) {
            sttServiceRef.current.stop()
          }
          if (ttsServiceRef.current) {
            ttsServiceRef.current.stop()
          }
          setIsTTSSpeaking(false) // Reset speaking state when stopping
        } else {
          // Parent turned on conversation mode
          console.log('VoiceChat: Parent enabled conversation mode')
          setIsConversationMode(true)
          isConversationModeRef.current = true
        }
      }
    }
  }, [externalConversationMode, isConversationMode])

  // Listen for custom events
  useEffect(() => {
    console.log('VoiceChat: Setting up event listeners for', eventName)

    const handleStartVoiceChat = async () => {
      console.log('VoiceChat: handleStartVoiceChat called for', eventName, 'isConversationMode:', isConversationMode)
      if (!isConversationMode) {
        console.log('VoiceChat: Starting conversation')
        setIsConversationMode(true)
        isConversationModeRef.current = true
        onConversationModeChange?.(true)
        onVoiceChatStateChange?.(true)
        // Start keep-alive to ensure recognition stays active
        startRecognitionKeepAlive()

        // Generate greeting dynamically if not already available
        let greetingText = voiceChatMessagesRef.current.AI_GREETING_MESSAGE
        if (!greetingText && customPrompt) {
          try {
            // Import the greeting generator dynamically
            const { generateInterviewGreeting } = await import('../greeting-generator')
            greetingText = await generateInterviewGreeting({
              customPrompt: customPrompt,
              interviewType: 'General' // Default type since we don't have interview data here
            }, 'Mivvo')
            console.log('🎤 Generated dynamic greeting:', greetingText)
          } catch (error) {
            console.error('Failed to generate greeting:', error)
            greetingText = "Hi! I'm Mivvo. Could you tell me about your background?"
          }
        }

        // Send greeting
        if (greetingText) {
          const greetingMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: greetingText,
            timestamp: new Date()
          }
          setMessages([greetingMessage])
          console.log('🎤 Speaking greeting and will start listening for response:', greetingText)

          // Start listening immediately after greeting setup, before speaking
          if (isAudioEnabled && startListeningRef.current) {
            console.log('🎤 Starting STT before speaking greeting to ensure it works')
            startListeningRef.current()
          }

          speakText(greetingText)
        } else {
          console.log('🎤 No greeting message available, starting empty conversation')
          setMessages([])
          // If no greeting, start listening immediately
          if (isAudioEnabled && startListeningRef.current) {
            setTimeout(() => {
              startListeningRef.current?.()
            }, 500) // Small delay to ensure everything is set up
          }
        }
      }
    }

    const handleStopVoiceChat = () => {
      console.log('VoiceChat: handleStopVoiceChat called, isConversationMode:', isConversationMode, 'isListening:', isListeningRef.current)
      if (isConversationMode) {
        console.log('VoiceChat: Stopping conversation - stopping services')
        setIsConversationMode(false)
        isConversationModeRef.current = false
        stopRecognitionKeepAlive()
        clearSilenceTimeout()
        clearUserResponseTimeout()
        accumulatedSpeechRef.current = ''
        setLiveTranscript('')
        if (sttServiceRef.current) {
          sttServiceRef.current.stop()
        }
        if (ttsServiceRef.current) {
          ttsServiceRef.current.stop()
        }
        setIsTTSSpeaking(false) // Reset speaking state when stopping
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
  }, [eventName])

  const state: VoiceChatState = {
    messages,
    isListening,
    isLoading,
    error,
    isConversationMode,
    isWaitingForUserResponse,
    liveTranscript
  }

  const actions: VoiceChatActions = {
    startListening,
    speakText,
    handleSendMessage
  }

  return {
    ...state,
    ...actions,
    // Expose services for external access if needed
    services: {
      stt: sttServiceRef.current,
      tts: ttsServiceRef.current,
      llm: llmServiceRef.current
    }
  }
}
