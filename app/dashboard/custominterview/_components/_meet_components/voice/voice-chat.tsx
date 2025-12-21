/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Brain } from 'lucide-react'
import { VOICE_CHAT_CONFIG, VOICE_CHAT_MESSAGES, UI_CONFIG } from '../config'
import { Orb } from '../ui/orb'




// Web Speech API types are defined below

// Web Speech API Type Definitions
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


interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

declare global {
  interface Window {
    getCurrentCodingCode?: () => { code: string; language: string }
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
  isUserSpeaking?: boolean // Whether user is currently speaking
  onWaitingForResponseChange?: (isWaiting: boolean) => void
  isCoding?: boolean // Whether this is a coding interview
  currentQuestion?: { title: string; description: string } // For coding interviews
  eventName?: string // Custom event name for starting/stopping voice chat
  voiceChatConfig?: { SILENCE_TIMEOUT_MS: number; RECOGNITION_KEEP_ALIVE_MS: number; TTS_RESTART_DELAY_MS: number; USER_RESPONSE_TIMEOUT_MS: number } // Optional custom voice chat config
  voiceChatMessages?: { AI_GREETING_MESSAGE: string; USER_RESPONSE_TIMEOUT_MESSAGE: string; NEXT_QUESTION_TRIGGER_MESSAGE?: string } // Optional custom voice chat messages
  showLiveTranscription?: boolean // Optional override for live transcription display
  customPrompt?: string // Custom AI interviewer prompt
  isAudioEnabled?: boolean // Whether microphone is enabled
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
  isUserSpeaking = false,
  onWaitingForResponseChange,
  isCoding = false, // Simple boolean to distinguish coding vs regular interviews
  currentQuestion,
  eventName = 'startVoiceChat',
  voiceChatConfig,
  voiceChatMessages,
  showLiveTranscription,
  customPrompt,
  isAudioEnabled = true // Default to true for backward compatibility
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
  const isAudioEnabledRef = useRef<boolean>(true)

  // New refs for accumulating speech over time
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
    // Don't restart if not in conversation mode, currently processing speech, AI is speaking, or mic is disabled
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

      if (!isCoding) {
        // For regular interviews: trigger AI to ask next question
        handleSendMessageRef.current?.(currentVoiceChatMessages.NEXT_QUESTION_TRIGGER_MESSAGE || "Please ask me your next question.")
      } else {
        // For coding interviews: send timeout message
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
      }
    }, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS)
  }, [clearUserResponseTimeout, currentVoiceChatConfig.USER_RESPONSE_TIMEOUT_MS, currentVoiceChatMessages.USER_RESPONSE_TIMEOUT_MESSAGE, onTranscriptUpdate, messages, isCoding])

  // Notify parent when waiting state changes
  useEffect(() => {
    onWaitingForResponseChange?.(isWaitingForUserResponse)
  }, [isWaitingForUserResponse, onWaitingForResponseChange])

  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening) return
    
    // Critical: Check if microphone is enabled before starting recognition
    if (!isAudioEnabled) {
      console.log('Microphone is disabled, cannot start recognition')
      return
    }

    try {
      setError('')
      await navigator.mediaDevices.getUserMedia({ audio: true })
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }, [isListening, isAudioEnabled])

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
      // Aggressively stop speech recognition while AI is speaking to prevent feedback
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          // Ignore errors if already stopped
          console.log('Speech recognition already stopped or error:', error)
        }
      }
      // Clear live transcript and any pending silence timeout - accumulated speech will be sent after AI finishes
      setLiveTranscript('')
      clearSilenceTimeout()
      // Clear any AI speech cooldown
      if (aiSpeechCooldownRef.current) {
        clearTimeout(aiSpeechCooldownRef.current)
        aiSpeechCooldownRef.current = null
      }
      // Clear any accumulated speech to prevent processing during AI speech
      accumulatedSpeechRef.current = ''
      setIsSpeaking(true)
      onVoiceChatStateChange?.(true)
      // Ensure listening state is false
      setIsListening(false)
      isListeningRef.current = false
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
      // Clear any accumulated speech that might have come through during AI speech
      accumulatedSpeechRef.current = ''
      // Clear any pending silence timeout to prevent processing old speech
      clearSilenceTimeout()
      // Start cooldown period to prevent immediate speech processing
      startAISpeechCooldown()
      // Start user response timeout - wait for user to respond
      startUserResponseTimeout()
      // Restart speech recognition after AI finishes speaking (with delay to avoid immediate recapture)
      // Only restart if microphone is enabled
      if ((isConversationModeRef.current || autoListenAfterAIRef.current) && isAudioEnabled) {
        setTimeout(() => {
          // Double-check that AI is still not speaking before restarting
          if (!isAISpeaking && !isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
            console.log('Restarting speech recognition after AI finished speaking')
            // Clear accumulated speech again just before restarting to be safe
            accumulatedSpeechRef.current = ''
            startListeningRef.current()
          }
        }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
      }
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      onVoiceChatStateChange?.(false)
      // Restart speech recognition on error as well
      // Only restart if microphone is enabled
      if ((isConversationModeRef.current || autoListenAfterAIRef.current) && isAudioEnabled) {
        setTimeout(() => {
          // Double-check that AI is still not speaking before restarting
          if (!isAISpeaking && !isListeningRef.current && startListeningRef.current && !isProcessingSpeechRef.current) {
            console.log('Restarting speech recognition after AI speech error')
            startListeningRef.current()
          }
        }, currentVoiceChatConfig.TTS_RESTART_DELAY_MS)
      }
    }

    speechSynthesisRef.current.speak(utterance)
  }, [selectedVoice, speechRate, speechPitch, availableVoices, onVoiceChatStateChange, clearSilenceTimeout, startUserResponseTimeout, currentVoiceChatConfig.TTS_RESTART_DELAY_MS, isAudioEnabled])

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return

    console.log('Is Coding Interview:', isCoding)
    setIsLoading(true)

    // Special handling for NEXT_QUESTION trigger - direct fresh question generation
    if (messageText === 'NEXT_QUESTION') {
      try {
        // Get current messages to analyze conversation context (but don't send them to AI)
        const currentMessages = await new Promise<Message[]>((resolve) => {
          setMessages(prev => {
            resolve(prev)
            return prev
          })
        })

        // Extract key context from conversation without sending full history
        const questionCount = currentMessages.filter(m => m.role === 'assistant').length
        const lastTopics = currentMessages
          .filter(m => m.role === 'assistant')
          .slice(-3) // Get last 3 AI messages
          .map(m => m.content.substring(0, 100)) // First 100 chars of each
          .join(' ')

        // Call OpenAI API with fresh context - no conversation history to avoid acknowledgments
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: `${customPrompt || 'You are an AI interviewer conducting a professional interview. Ask relevant questions and provide constructive feedback.'}

CONVERSATION CONTEXT (for reference only):
- Questions asked so far: ${questionCount}
- Recent topics discussed: ${lastTopics}

INSTRUCTION: Generate the next logical interview question based on the conversation context above. Ask ONE question directly without any introduction, acknowledgment, or transition phrases.`
              },
              {
                role: 'user',
                content: 'Ask the next interview question now.'
              }
            ]
          })
        })

        if (!response.ok) {
          throw new Error('Failed to get response from AI')
        }

        const data = await response.json()
        const aiResponse = data.choices[0].message.content

        // Clean the response - remove any potential acknowledgments
        let cleanResponse = aiResponse.trim()

        // Remove common acknowledgment patterns
        cleanResponse = cleanResponse.replace(/^(sure|of course|certainly|okay|alright|got it|understood|let's continue|moving on|next|following up)[\s,.-]*/i, '')
        cleanResponse = cleanResponse.replace(/^(i'll|let me|now|then|so|well)[\s,.-]*/i, '')

        // If the response is too short after cleaning, it might be just acknowledgment - regenerate
        if (cleanResponse.length < 10) {
          cleanResponse = aiResponse // Use original if cleaning removed too much
        }

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

          // Defer transcript update to avoid setState during render
          setTimeout(() => {
            onTranscriptUpdate?.(finalMessages.map(m => ({
              role: m.role,
              text: m.content,
              timestamp: m.timestamp.toISOString()
            })))
          }, 0)

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

      // Defer transcript update to avoid setState during render
      setTimeout(() => {
        onTranscriptUpdate?.(updatedMessages.map(m => ({
          role: m.role,
          text: m.content,
          timestamp: m.timestamp.toISOString()
        })))
      }, 0)

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
      const userContent = isCoding
        ? (() => {
            // Get current code only when user speaks during coding interview
            const currentCode = typeof window !== 'undefined' ? window.getCurrentCodingCode?.() : undefined
            const content = currentCode
              ? `I can see your current ${currentCode.language} code. ${messageText}\n\nYour current code:\n\`\`\`${currentCode.language}\n${currentCode.code}\n\`\`\``
              : messageText;
            console.log('User Message (Coding):', content.substring(0, 300) + '...');
            return content;
          })()
        : (() => {
            console.log('User Message (Regular):', messageText);
            return messageText;
          })()

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
              content: customPrompt || 'You are an AI interviewer conducting a professional interview. Ask relevant questions and provide constructive feedback.'
            },
            ...currentMessages.map(m => ({ role: m.role, content: m.content })),
            {
              role: 'user',
              content: userContent
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

      setMessages(prev => {
        const finalMessages = [...prev, aiMessage]

        // Defer transcript update to avoid setState during render
        setTimeout(() => {
          onTranscriptUpdate?.(finalMessages.map(m => ({
            role: m.role,
            text: m.content,
            timestamp: m.timestamp.toISOString()
          })))
        }, 0)

        return finalMessages
      })

      // Check if user is requesting next question in coding interviews
      if (isCoding && (
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
  }, [speakText, onTranscriptUpdate, isCoding, currentQuestion, customPrompt])

  // Initialize speech recognition and voices
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as Window & {
      SpeechRecognition?: new () => SpeechRecognition
      webkitSpeechRecognition?: new () => SpeechRecognition
    }).SpeechRecognition || (window as Window & {
      SpeechRecognition?: new () => SpeechRecognition
      webkitSpeechRecognition?: new () => SpeechRecognition
    }).webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      speechSynthesisRef.current = window.speechSynthesis

      const recognition = recognitionRef.current
      if (!recognition) return

      recognition.continuous = true  // Changed to continuous for accumulating speech
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        isListeningRef.current = true
        setError('')
        accumulatedSpeechRef.current = ''  // Reset accumulated speech
        // Clear any pending silence timeout when starting fresh recognition
        clearSilenceTimeout()
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Critical: Ignore speech results if microphone is disabled or AI is speaking
        if (!isAudioEnabledRef.current) {
          console.log('Microphone is disabled, ignoring speech results')
          return
        }

        // Additional safeguard: Ignore speech results while AI is speaking to prevent feedback
        if (isAISpeaking) {
          console.log('AI is speaking, ignoring speech results to prevent feedback')
          return
        }

        // Additional safeguard: Ignore speech results during AI speech cooldown period
        if (aiSpeechCooldownRef.current) {
          console.log('AI speech cooldown active, ignoring speech results to prevent processing residual audio')
          return
        }

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
        try {
          recognitionRef.current.stop()
        } catch {
          // Ignore errors during cleanup
        }
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
      // Clear timeouts on cleanup
      clearSilenceTimeout()
      clearUserResponseTimeout()
      if (aiSpeechCooldownRef.current) {
        clearTimeout(aiSpeechCooldownRef.current)
        aiSpeechCooldownRef.current = null
      }
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
    if (!isAudioEnabled && recognitionRef.current && isListeningRef.current) {
      console.log('Microphone disabled, stopping recognition')
      recognitionRef.current.stop()
      setIsListening(false)
      isListeningRef.current = false
      setLiveTranscript('')
      clearSilenceTimeout()
      clearUserResponseTimeout()
      accumulatedSpeechRef.current = ''
    }
  }, [isAudioEnabled, clearSilenceTimeout, clearUserResponseTimeout])

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
        const isCodingInterview = isCoding

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
  }, [eventName, isConversationMode, speakText, onVoiceChatStateChange, onConversationModeChange, clearSilenceTimeout, clearUserResponseTimeout, startRecognitionKeepAlive, stopRecognitionKeepAlive, isCoding, currentVoiceChatMessages.AI_GREETING_MESSAGE, currentQuestion?.title])



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
