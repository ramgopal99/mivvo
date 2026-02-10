'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Chat } from '@/components/meet/chat'
import { MeetTestHeader } from '../ui/meet-test-header'
import { MeetTestControls } from '../ui/meet-test-controls'
import { ScreenShareDisplay, ScreenShareInterviewLayout } from '../ui'
import { getCodingQuestion, getRandomCodingQuestionIndex, type CodingRoundType } from '../data/coding-questions'
import { VoiceSettings } from './components'
import {
  useMediaStream,
  useVoiceDetection,
  useScreenShare,
  useVoiceSettings,
  useVoiceChatState,
  useUserTranscription,
  useTTS,
} from './hooks'
import {
  VideoFeed,
  VoiceChatPanel,
  InterviewStartDialog,
  ScreenShareDialog,
  FullScreenPrompt,
} from './components'
import { defaultVoiceConfig, defaultUiConfig } from './utils'
import {
  VoiceConfig,
  UiConfig,
  InterviewData
} from '../types'
import { getLLMService, Message as LLMMessage } from '../services/llm-service'
import { getRandomGreeting } from '../greeting-message'
import { getCodingModeSystemPrompt, CODING_MODE_GREETING, CHANGE_QUESTION_SIGNAL, USER_FINISHED_SIGNAL } from '../coding-mode-prompt'
import { Monitor, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AssistantDetails {
  id: string
  name: string
  avatar?: string
  role?: string
  industry?: string
  experienceLevel?: string
  hasVoiceEnabled?: boolean
}

interface MeetTestRoomProps {
  interviewTitle?: string
  assistantName?: string
  assistantAvatar?: string
  assistantDetails?: AssistantDetails
  onEndCall?: () => void
  voiceConfig?: VoiceConfig
  uiConfig?: UiConfig
  interviewData?: InterviewData
  greeting?: string
  sttAvailable?: boolean | null
  ttsAvailable?: boolean | null
  /** Called when the full-screen prompt is shown/hidden so parent can hide Debug etc. */
  onFullScreenPromptVisible?: (visible: boolean) => void
  /** Called when user clicks Start Interview – e.g. to create attempt (start-attempt API). */
  onBeforeStartInterview?: () => Promise<void>
  /** Called when call ends with duration and transcript so parent can save conversation and update time usage. */
  onEndCallWithPayload?: (payload: {
    durationSeconds: number
    transcript: { role: string; text: string; timestamp: string }[]
    messages: { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]
  }) => void | Promise<void>
  /** When true, mic and video stay on and user cannot disable them (e.g. when test mode is false). */
  lockMicAndVideo?: boolean
}

export function MeetTestRoom({
  interviewTitle,
  assistantName,
  assistantAvatar,
  assistantDetails,
  onEndCall,
  voiceConfig = defaultVoiceConfig,
  uiConfig = defaultUiConfig,
  interviewData,
  sttAvailable,
  ttsAvailable,
  onFullScreenPromptVisible,
  onBeforeStartInterview,
  onEndCallWithPayload,
  lockMicAndVideo = false,
}: MeetTestRoomProps) {
  // Use assistantDetails if provided, otherwise fallback to props
  const assistant: AssistantDetails = assistantDetails || {
    id: interviewData?.id || 'meet-test-assistant',
    name: assistantName || interviewData?.title || 'AI Assistant',
    avatar: assistantAvatar,
    role: 'AI Assistant',
    industry: 'Technology',
    experienceLevel: 'Expert',
    hasVoiceEnabled: true
  }

  // UI state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showInterviewStartDialog, setShowInterviewStartDialog] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Custom hooks
  const {
    stream,
    isGettingStream,
    videoRef,
    isAudioEnabled,
    isVideoEnabled,
    setIsAudioEnabled,
    setIsVideoEnabled,
  } = useMediaStream()

  // When lockMicAndVideo (e.g. test mode false): keep mic and video on, user cannot disable
  useEffect(() => {
    if (lockMicAndVideo) {
      setIsAudioEnabled(true)
      setIsVideoEnabled(true)
    }
  }, [lockMicAndVideo, setIsAudioEnabled, setIsVideoEnabled])

  // Default voice chat messages (no greeting - start clean)
  const voiceChatMessages = {
    AI_GREETING_MESSAGE: "",
    USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Please continue with your thoughts.",
  }

  const {
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
  } = useVoiceChatState()

  const { isUserSpeaking } = useVoiceDetection({
    stream,
    isAudioEnabled,
    isVoiceChatActive,
  })

  // Track last sent transcript to avoid duplicates
  const lastSentTranscriptRef = useRef<string>('')
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const accumulatedUserSpeechRef = useRef<string>('')
  const llmServiceRef = useRef<ReturnType<typeof getLLMService> | null>(null)
  const isProcessingLLMRef = useRef<boolean>(false)
  const handleTranscriptUpdateRef = useRef(handleTranscriptUpdate)
  const voiceTranscriptRef = useRef(voiceTranscript)
  const greetingSpokenRef = useRef<boolean>(false)
  const isGreetingResponseRef = useRef<boolean>(false)
  const isUserSpeakingRef = useRef<boolean>(false)
  const codingCodeRef = useRef<{ code: string; language: string }>({ code: '', language: 'javascript' })
  const containerRef = useRef<HTMLDivElement>(null)
  const fullscreenEnteredRef = useRef(false)
  const sessionStartTimeRef = useRef<number | null>(null)
  const [showFullScreenPrompt, setShowFullScreenPrompt] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [exitCountdown, setExitCountdown] = useState(30)
  const [exitWarningCount, setExitWarningCount] = useState(0)
  const exitCountdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const exitingFullscreenProgrammaticallyRef = useRef(false)
  const handleEndCallRef = useRef<() => Promise<void>>(() => Promise.resolve())
  const EXIT_WARNING_MAX = 3
  const EXIT_COUNTDOWN_SECONDS = 30

  /** When set, overrides the question index from JD (used when AI signals [CHANGE_QUESTION]). */
  const [codingQuestionIndexOverride, setCodingQuestionIndexOverride] = useState<number | null>(null)
  const effectiveCodingIndexRef = useRef<number>(0)
  const setCodingQuestionIndexOverrideRef = useRef(setCodingQuestionIndexOverride)
  setCodingQuestionIndexOverrideRef.current = setCodingQuestionIndexOverride
  /** Count AI follow-up questions after user has "finished" current problem; after 5 we auto-switch. */
  const CODING_AI_MAX_QUESTIONS = 5
  const aiFollowUpCountRef = useRef<number>(0)
  /** True once user has said they're done/finished for the current question; then we count AI follow-ups. */
  const userFinishedCurrentQuestionRef = useRef<boolean>(false)

  const {
    isScreenSharing,
    screenStream,
    showScreenShareDialog,
    setShowScreenShareDialog,
    toggleScreenShare,
    displaySurface,
  } = useScreenShare({ uiConfig })

  // Only allow interview content when entire screen was chosen (coding round). Window/tab share is rejected in useScreenShare.
  const isEntireScreenShared = isScreenSharing && (displaySurface === 'monitor' || displaySurface === 'screen')

  const codingModeQuestion = useMemo(() => {
    if (!interviewData?.screenShareEnabled) return getCodingQuestion('dsa', 0)
    const roundType = (interviewData.role === 'sql' || interviewData.role === 'dsa' ? interviewData.role : 'dsa') as CodingRoundType
    const jd = interviewData.jd || ''
    const match = jd.match(/\[CODING_QUESTION_INDEX:(\d+)\]/)
    const jdIndex = match ? parseInt(match[1], 10) : 0
    const index = codingQuestionIndexOverride !== null ? codingQuestionIndexOverride : jdIndex
    return getCodingQuestion(roundType, index)
  }, [interviewData?.screenShareEnabled, interviewData?.role, interviewData?.jd, codingQuestionIndexOverride])

  // Keep ref in sync so LLM callback can read current index when handling [CHANGE_QUESTION]
  useEffect(() => {
    if (!interviewData?.screenShareEnabled) return
    const jd = interviewData.jd || ''
    const match = jd.match(/\[CODING_QUESTION_INDEX:(\d+)\]/)
    const jdIndex = match ? parseInt(match[1], 10) : 0
    effectiveCodingIndexRef.current = codingQuestionIndexOverride !== null ? codingQuestionIndexOverride : jdIndex
  }, [interviewData?.screenShareEnabled, interviewData?.jd, codingQuestionIndexOverride])

  // Keep refs updated
  useEffect(() => {
    handleTranscriptUpdateRef.current = handleTranscriptUpdate
    voiceTranscriptRef.current = voiceTranscript
    isUserSpeakingRef.current = isUserSpeaking
  }, [handleTranscriptUpdate, voiceTranscript, isUserSpeaking])

  // Reset timeout if user starts speaking again
  useEffect(() => {
    if (isUserSpeaking && silenceTimeoutRef.current) {
      // User started speaking again - clear the timeout to prevent sending incomplete speech
      console.log('[STT] User started speaking again, clearing timeout to prevent premature send')
      clearSilenceTimeout()
    }
  }, [isUserSpeaking])

  // Initialize LLM service with system prompt - different for coding mode vs regular
  useEffect(() => {
    const systemPrompt = isScreenSharing
      ? getCodingModeSystemPrompt(codingModeQuestion.title, codingModeQuestion.description)
      : (() => {
          const basePrompt = interviewData?.customPrompt ||
            interviewData?.jd ||
            'You are an AI interviewer conducting a professional interview. Ask relevant questions and provide constructive feedback.'
          const greetingMessage = getRandomGreeting()
          return `${basePrompt}

IMPORTANT: The interview starts with a greeting question. The greeting will be randomly selected from available greetings.
- When the user responds to the greeting, treat it as their first answer about themselves
- After receiving their greeting response, continue with the interview naturally
- Do NOT repeat the greeting question - it has already been asked
- Build on their response to ask follow-up questions related to their background and the job requirements
- Do NOT prefix your responses with "Mivvo:" or your name - respond directly`
        })()
    
    llmServiceRef.current = getLLMService(
      {
        model: 'gpt-4o-mini',
        systemPrompt: systemPrompt,
        temperature: 0.7,
        maxTokens: 500,
      },
      {
        onResponse: (response) => {
          // Add AI response to chat (strip "Mivvo:" prefix if present)
          if (response && response.trim()) {
            let text = response.trim().replace(/^Mivvo:\s*/i, '').trim() || response.trim()

            // Coding mode: if AI signals change question, switch to a new question from the list and strip the signal
            if (isScreenSharing && interviewData?.screenShareEnabled && text.includes(CHANGE_QUESTION_SIGNAL)) {
              text = text.replace(CHANGE_QUESTION_SIGNAL, '').trim() || "Let's try a different problem."
              const roundType = (interviewData.role === 'sql' || interviewData.role === 'dsa' ? interviewData.role : 'dsa') as CodingRoundType
              const currentIndex = effectiveCodingIndexRef.current
              const newIndex = getRandomCodingQuestionIndex(roundType, currentIndex)
              effectiveCodingIndexRef.current = newIndex
              setCodingQuestionIndexOverrideRef.current(newIndex)
              aiFollowUpCountRef.current = 0
              userFinishedCurrentQuestionRef.current = false
            }

            // Coding mode: if AI signals user completed their solution (AI inferred from user's words), start counting follow-ups
            if (isScreenSharing && interviewData?.screenShareEnabled && text.includes(USER_FINISHED_SIGNAL)) {
              text = text.replace(USER_FINISHED_SIGNAL, '').trim() || text
              userFinishedCurrentQuestionRef.current = true
            }

            const aiMessage = {
              role: 'assistant',
              text,
              timestamp: new Date().toISOString()
            }
            // Simple approach: Just add the AI message to the current transcript
            // The user message should already be finalized in the transcript from sendToLLM
            const currentMessages = [...voiceTranscriptRef.current, aiMessage]
            handleTranscriptUpdateRef.current(currentMessages)

            // Voice chat active state is managed by onTTSSpeak callback in useTTS
            // No need to set it here as it's handled by TTS callbacks

            // Speak the AI response using TTS
            if (ttsServiceRef.current) {
              console.log('Calling TTS speak with:', text.substring(0, 50))
              ttsServiceRef.current.speak(text)
            } else {
              console.warn('TTS service not initialized when trying to speak')
            }

            // Coding mode: after user has "finished" this question, count AI follow-ups; after 5, auto-switch
            if (isScreenSharing && interviewData?.screenShareEnabled && userFinishedCurrentQuestionRef.current) {
              aiFollowUpCountRef.current = (aiFollowUpCountRef.current || 0) + 1
              if (aiFollowUpCountRef.current >= CODING_AI_MAX_QUESTIONS) {
                const roundType = (interviewData.role === 'sql' || interviewData.role === 'dsa' ? interviewData.role : 'dsa') as CodingRoundType
                const currentIndex = effectiveCodingIndexRef.current
                const newIndex = getRandomCodingQuestionIndex(roundType, currentIndex)
                effectiveCodingIndexRef.current = newIndex
                setCodingQuestionIndexOverrideRef.current(newIndex)
                aiFollowUpCountRef.current = 0
                userFinishedCurrentQuestionRef.current = false
                const switchMsg = "Let's try a different problem."
                const switchMessage = { role: 'assistant', text: switchMsg, timestamp: new Date().toISOString() }
                const updatedMessages = [...currentMessages, switchMessage]
                handleTranscriptUpdateRef.current(updatedMessages)
                if (ttsServiceRef.current) ttsServiceRef.current.speak(switchMsg)
              }
            }
          }
          isProcessingLLMRef.current = false
        },
        onError: (error) => {
          console.error('LLM Error:', error)
          isProcessingLLMRef.current = false
        },
        onStart: () => {
          isProcessingLLMRef.current = true
        },
        onComplete: () => {
          isProcessingLLMRef.current = false
        },
      }
    )

    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [interviewData?.customPrompt, interviewData?.jd, isScreenSharing, codingModeQuestion.title, codingModeQuestion.description])

  // Clear silence timeout
  const clearSilenceTimeout = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
      silenceTimeoutRef.current = null
    }
  }

  // Send accumulated speech to LLM
  const sendToLLM = useCallback(async (userText: string) => {
    if (!userText.trim() || isProcessingLLMRef.current || !llmServiceRef.current) {
      return
    }

    try {
      isProcessingLLMRef.current = true
      
      // Finalize the user message in transcript before sending
      const currentTranscript = voiceTranscriptRef.current
      const lastMessage = currentTranscript[currentTranscript.length - 1]
      
      // Check if this is the first user response (greeting response)
      const isFirstResponse = !greetingSpokenRef.current || currentTranscript.length === 0 || 
                             (currentTranscript.length === 1 && currentTranscript[0].role === 'assistant')
      
      // Ensure the user message is finalized in the transcript
      let finalizedTranscript = currentTranscript
      if (lastMessage && lastMessage.role === 'user') {
        // Update the last user message to match exactly what we're sending
        finalizedTranscript = [
          ...currentTranscript.slice(0, -1),
          {
            role: 'user',
            text: userText.trim(),
            timestamp: lastMessage.timestamp // Keep original timestamp
          }
        ]
        handleTranscriptUpdateRef.current(finalizedTranscript)
      } else if (!lastMessage || lastMessage.text !== userText.trim()) {
        // Add user message if it doesn't exist
        finalizedTranscript = [
          ...currentTranscript,
          {
            role: 'user',
            text: userText.trim(),
            timestamp: new Date().toISOString()
          }
        ]
        handleTranscriptUpdateRef.current(finalizedTranscript)
      }
      
      // Get the greeting message that was used (from transcript)
      const greetingMessage = finalizedTranscript.find(m => m.role === 'assistant' && m.text.includes('Mivvo'))?.text || 'the greeting question'
      
      // Convert to LLM message format. In coding mode, append user's code so AI can view it.
      const code = codingCodeRef.current
      const codeBlock = (isScreenSharing && code?.code)
        ? `\n\n[CURRENT USER CODE (${code.language}):]\n\`\`\`${code.language}\n${code.code}\n\`\`\``
        : ''

      const llmMessages: LLMMessage[] = finalizedTranscript.map((msg, index) => {
        const isLastUserMsg = msg.role === 'user' && index === finalizedTranscript.length - 1
        let content = msg.text
        if (isFirstResponse && isLastUserMsg) {
          content = `[This is the user's response to the greeting question: "${greetingMessage}"]\n\n${msg.text}`
        }
        if (isScreenSharing && isLastUserMsg && codeBlock) {
          content = content + codeBlock
        }
        return {
          id: `msg-${msg.timestamp}`,
          role: msg.role as 'user' | 'assistant',
          content,
          timestamp: new Date(msg.timestamp)
        }
      })

      // Mark that we've processed the greeting response
      if (isFirstResponse) {
        isGreetingResponseRef.current = true
      }

      // Send to LLM with conversation context
      await llmServiceRef.current.sendMessage({
        messages: llmMessages,
        customPrompt: interviewData?.customPrompt || interviewData?.jd
      })
    } catch (error) {
      console.error('Error sending to LLM:', error)
      isProcessingLLMRef.current = false
    }
  }, [interviewData?.customPrompt, interviewData?.jd, isScreenSharing])

  const { transcript: userTranscript, resetTranscript } = useUserTranscription({
    isAudioEnabled,
    isConversationMode, // Pass isConversationMode as-is, handle pause in hook
    language: voiceConfig.language,
    shouldPause: isVoiceChatActive, // Pass separate flag to pause when AI is speaking
    onFinalTranscript: (text) => {
      // Don't process if AI is speaking or processing LLM
      if (isVoiceChatActive || isProcessingLLMRef.current) {
        return
      }

      // Accumulate user speech - append new text to existing accumulated speech
      if (text.trim()) {
        // Append new text to accumulated speech (add space if there's existing content)
        const newText = text.trim()
        if (accumulatedUserSpeechRef.current) {
          accumulatedUserSpeechRef.current = accumulatedUserSpeechRef.current + ' ' + newText
        } else {
          accumulatedUserSpeechRef.current = newText
        }
        
        // Simple chat approach: Update the last message if it's a pending user message
        // Otherwise create a new user message
        const userMessage = {
          role: 'user',
          text: accumulatedUserSpeechRef.current,
          timestamp: new Date().toISOString()
        }
        
        // Simple chat approach: Check if last message is a user message that we're still building
        // Only update if we're building on the same message (last message matches our accumulated speech start)
        const lastMessage = voiceTranscript[voiceTranscript.length - 1]
        
        // Check if we're still building the same message
        // This happens when user continues speaking (accumulated speech grows)
        // If accumulated was cleared (empty), we're starting fresh, so add new message
        const isStillBuildingLastMessage = lastMessage && 
                                          lastMessage.role === 'user' && 
                                          accumulatedUserSpeechRef.current.length > 0 &&
                                          (lastMessage.text.trim() === accumulatedUserSpeechRef.current.trim() ||
                                           accumulatedUserSpeechRef.current.startsWith(lastMessage.text.trim() + ' '))
        
        // Update existing message if still building, otherwise add new one
        const currentMessages = isStillBuildingLastMessage
          ? [...voiceTranscript.slice(0, -1), userMessage]
          : [...voiceTranscript, userMessage]
        handleTranscriptUpdate(currentMessages)

        // Clear existing timeout and reset it - user is still speaking
        clearSilenceTimeout()
        
        // Set timeout to send to LLM after silence period
        // This will be reset if user continues speaking
        const silenceTimeout = voiceConfig.silenceTimeoutMs || 5000
        console.log(`[STT] Setting silence timeout: ${silenceTimeout}ms (${silenceTimeout / 1000} seconds) - will send to LLM after user stops speaking`)
        silenceTimeoutRef.current = setTimeout(() => {
          const textToSend = accumulatedUserSpeechRef.current.trim()
          // Check if user is still speaking before sending - use ref to get current value
          const userCurrentlySpeaking = isUserSpeakingRef.current
          
          if (textToSend && !isProcessingLLMRef.current && !isVoiceChatActive && !userCurrentlySpeaking && llmServiceRef.current) {
            // User has been silent for the full timeout period AND is not currently speaking, send to LLM
            console.log(`[STT] Silence timeout reached (${silenceTimeout}ms). User not speaking. Sending to LLM:`, textToSend.substring(0, 100))
            const textToSendFinal = textToSend
            // Clear accumulated speech BEFORE sending to prevent new speech from appending to old message
            accumulatedUserSpeechRef.current = ''
            lastSentTranscriptRef.current = ''
            
            // Send to LLM
            sendToLLM(textToSendFinal)
            
            // Reset the transcript after sending
            if (resetTranscript) {
              resetTranscript()
            }
          } else {
            console.log(`[STT] Timeout reached but not sending - isProcessingLLM: ${isProcessingLLMRef.current}, isVoiceChatActive: ${isVoiceChatActive}, isUserSpeaking: ${userCurrentlySpeaking}, hasText: ${!!textToSend}`)
          }
        }, silenceTimeout)
      }
    },
  })

  const {
    selectedVoice,
    setSelectedVoice,
    availableVoices,
    testVoice,
  } = useVoiceSettings(voiceConfig)

  // Initialize and manage TTS service using custom hook
  // This hook handles all TTS initialization, default voice selection, and STT pause/resume
  const { ttsService } = useTTS({
    voiceConfig,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
    isAudioEnabled,
    isConversationMode,
    onTTSSpeak: (isSpeaking) => {
      // Update voice chat active state based on TTS speaking status
      // This prevents user transcription while AI is speaking
      handleVoiceChatStateChange(isSpeaking)
    },
  })
  
  const ttsServiceRef = useRef(ttsService)
  
  // Keep ref updated for LLM callback
  useEffect(() => {
    ttsServiceRef.current = ttsService
  }, [ttsService])

  // Show interview start dialog
  useEffect(() => {
    if (uiConfig.showInterviewStartDialog) {
      setShowInterviewStartDialog(true)
    }
  }, [uiConfig.showInterviewStartDialog])

  // Listen for start voice chat event to enable microphone
  useEffect(() => {
    const handleStartVoiceChat = () => {
      // Enable microphone when start is clicked
      if (!isAudioEnabled) {
        setIsAudioEnabled(true)
      }
    }

    window.addEventListener('startVoiceChat', handleStartVoiceChat as EventListener)

    return () => {
      window.removeEventListener('startVoiceChat', handleStartVoiceChat as EventListener)
    }
  }, [isAudioEnabled, setIsAudioEnabled])

  // Speak greeting when conversation mode starts
  useEffect(() => {
    if (isConversationMode && !greetingSpokenRef.current) {
      // Wait for TTS service to be ready
      const checkAndSpeakGreeting = () => {
        if (ttsServiceRef.current) {
          greetingSpokenRef.current = true
          
          // Use coding mode greeting when in coding mode, else random greeting
          const randomGreeting = isScreenSharing ? CODING_MODE_GREETING : getRandomGreeting()
          
          // Add greeting to transcript as assistant message
          const greetingMessage = {
            role: 'assistant',
            text: randomGreeting,
            timestamp: new Date().toISOString()
          }
          handleTranscriptUpdate([greetingMessage])
          
          // Speak the greeting via TTS
          console.log('Speaking random greeting:', randomGreeting)
          ttsServiceRef.current.speak(randomGreeting)
        } else {
          // If TTS not ready yet, check again after a short delay
          setTimeout(checkAndSpeakGreeting, 200)
        }
      }
      
      // Start checking after a small delay to allow TTS to initialize
      const greetingTimeout = setTimeout(checkAndSpeakGreeting, 500)
      
      return () => {
        clearTimeout(greetingTimeout)
      }
    }
  }, [isConversationMode, handleTranscriptUpdate, ttsService, isScreenSharing])

  // Full screen: show "Click to enter" prompt when useFullScreenInMeet is true (browsers require user gesture)
  useEffect(() => {
    if (uiConfig.useFullScreenInMeet) {
      setShowFullScreenPrompt(true)
    }
    return () => {
      if (fullscreenEnteredRef.current && document.fullscreenElement != null) {
        document.exitFullscreen?.().catch(() => {})
        fullscreenEnteredRef.current = false
      }
    }
  }, [uiConfig.useFullScreenInMeet])

  // Notify parent when full-screen prompt is visible so it can hide Debug panel etc.
  useEffect(() => {
    onFullScreenPromptVisible?.(showFullScreenPrompt)
    return () => onFullScreenPromptVisible?.(false)
  }, [showFullScreenPrompt, onFullScreenPromptVisible])

  // Timer: update elapsed time every second when conversation is active
  useEffect(() => {
    if (!isConversationMode) {
      setElapsedSeconds(0)
      return
    }
    const tick = () => {
      if (sessionStartTimeRef.current != null) {
        setElapsedSeconds(Math.floor((Date.now() - sessionStartTimeRef.current) / 1000))
      }
    }
    tick() // run immediately
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [isConversationMode])

  const enterFullScreen = useCallback(() => {
    if (!uiConfig.useFullScreenInMeet) return
    // Fullscreen the document so the entire meet page (layout + room) fills the screen
    const el = document.documentElement
    el.requestFullscreen?.().then(() => {
      fullscreenEnteredRef.current = true
      setShowFullScreenPrompt(false)
      onFullScreenPromptVisible?.(false)
    }).catch(() => {
      setShowFullScreenPrompt(false)
      onFullScreenPromptVisible?.(false)
    })
  }, [uiConfig.useFullScreenInMeet])

  // When document is fullscreen, make html/body fill viewport so entire UI is visible
  useEffect(() => {
    const onFullscreenChange = () => {
      if (document.fullscreenElement === document.documentElement) {
        document.documentElement.style.width = '100%'
        document.documentElement.style.height = '100%'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
        document.body.style.minHeight = '100%'
      } else {
        document.documentElement.style.width = ''
        document.documentElement.style.height = ''
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.minHeight = ''
      }
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  // Full screen exit warning: when user exits fullscreen (e.g. Esc), show warning up to 3 times; 4th time or 30s expiry = auto submit
  useEffect(() => {
    if (!uiConfig.useFullScreenInMeet) return
    const onFullscreenChange = () => {
      if (document.fullscreenElement != null) return
      if (exitingFullscreenProgrammaticallyRef.current) {
        exitingFullscreenProgrammaticallyRef.current = false
        return
      }
      if (!fullscreenEnteredRef.current) return
      fullscreenEnteredRef.current = false
      if (exitWarningCount >= EXIT_WARNING_MAX) {
        handleEndCallRef.current()
        return
      }
      setExitCountdown(EXIT_COUNTDOWN_SECONDS)
      setExitWarningCount((c) => c + 1)
      setShowExitWarning(true)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [uiConfig.useFullScreenInMeet, exitWarningCount])

  // Keep handleEndCall ref updated
  useEffect(() => {
    handleEndCallRef.current = handleEndCall
  })

  // Exit warning countdown: start timer when dialog opens
  useEffect(() => {
    if (!showExitWarning) return
    const id = setInterval(() => {
      setExitCountdown((prev) => {
        if (prev <= 1) {
          if (exitCountdownIntervalRef.current) {
            clearInterval(exitCountdownIntervalRef.current)
            exitCountdownIntervalRef.current = null
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    exitCountdownIntervalRef.current = id
    return () => {
      if (exitCountdownIntervalRef.current) {
        clearInterval(exitCountdownIntervalRef.current)
        exitCountdownIntervalRef.current = null
      }
    }
  }, [showExitWarning])

  // When countdown hits 0, auto submit and close dialog
  useEffect(() => {
    if (showExitWarning && exitCountdown === 0) {
      setShowExitWarning(false)
      handleEndCallRef.current()
    }
  }, [showExitWarning, exitCountdown])

  // Handlers
  const handleEndCall = async () => {
    if (isConversationMode) {
      setIsConversationMode(false)
    }
    // If we have a session start time, report duration and transcript for saving + credit deduction
    if (sessionStartTimeRef.current != null && onEndCallWithPayload) {
      const durationSeconds = Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
      try {
        await onEndCallWithPayload({
          durationSeconds,
          transcript: voiceTranscript,
          messages,
        })
      } catch (e) {
        console.error('Error in onEndCallWithPayload:', e)
      }
      sessionStartTimeRef.current = null
    }
    if (uiConfig.useFullScreenInMeet && fullscreenEnteredRef.current && document.fullscreenElement != null) {
      exitingFullscreenProgrammaticallyRef.current = true
      document.exitFullscreen?.().catch(() => {})
      fullscreenEnteredRef.current = false
    }
    if (onEndCall) {
      onEndCall()
    }
    if (uiConfig.redirectOnStop === true) {
      window.location.href = '/dashboard/custominterview'
    }
  }

  const handleStartInterview = async () => {
    if (onBeforeStartInterview) {
      try {
        await onBeforeStartInterview()
      } catch (e) {
        console.error('Error in onBeforeStartInterview:', e)
        return
      }
    }
    sessionStartTimeRef.current = Date.now()
    setShowInterviewStartDialog(false)
    // Reset greeting state when starting new interview
    greetingSpokenRef.current = false
    isGreetingResponseRef.current = false
    // Enable conversation mode first, then trigger start event
    setIsConversationMode(true)
    const startEvent = new CustomEvent('startVoiceChat')
    window.dispatchEvent(startEvent)
  }

  const handleStartConversation = async () => {
    if (onBeforeStartInterview) {
      try {
        await onBeforeStartInterview()
      } catch (e) {
        console.error('Error in onBeforeStartInterview:', e)
        return
      }
    }
    sessionStartTimeRef.current = Date.now()
    // Reset greeting state when starting conversation
    greetingSpokenRef.current = false
    isGreetingResponseRef.current = false
    // Enable conversation mode first
    setIsConversationMode(true)
    const event = new CustomEvent('startVoiceChat')
    window.dispatchEvent(event)
  }

  const handleStopConversation = () => {
    // Clear silence timeout when stopping conversation
    clearSilenceTimeout()
    accumulatedUserSpeechRef.current = ''
    
    const event = new CustomEvent('stopVoiceChat')
    window.dispatchEvent(event)
    handleEndCall()
  }

  const handleExitWarningStay = useCallback(() => {
    if (exitCountdownIntervalRef.current) {
      clearInterval(exitCountdownIntervalRef.current)
      exitCountdownIntervalRef.current = null
    }
    setShowExitWarning(false)
    enterFullScreen()
    fullscreenEnteredRef.current = true
  }, [enterFullScreen])

  const handleExitWarningLeave = useCallback(() => {
    if (exitCountdownIntervalRef.current) {
      clearInterval(exitCountdownIntervalRef.current)
      exitCountdownIntervalRef.current = null
    }
    setShowExitWarning(false)
    handleEndCallRef.current()
  }, [])

  // Coding Round: only show interview when user chose entire screen (not window/tab). Gate same idea as app/test2.
  const requireScreenShareFirst = interviewData?.screenShareEnabled === true && !isEntireScreenShared

  return (
    <div
      ref={containerRef}
      className="relative w-full min-w-0 h-screen min-h-screen bg-background flex flex-col overflow-hidden"
    >
      {/* Full screen: must be triggered by user click (browser requirement) */}
      {showFullScreenPrompt && <FullScreenPrompt onEnterFullScreen={enterFullScreen} />}

      {/* Exit full screen warning: 30s countdown, up to 3 warnings; 4th exit or timer expiry = auto submit */}
      <Dialog open={showExitWarning} onOpenChange={(open) => { if (!open) handleExitWarningStay() }}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              You&apos;ve exited full screen
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>Stay in the interview to continue. Return to full screen within the time below, or your interview will be submitted automatically.</p>
                <p className="font-semibold text-foreground">This is warning {exitWarningCount} of {EXIT_WARNING_MAX}.</p>
                <p className="text-sm text-muted-foreground">After {EXIT_WARNING_MAX} warnings, leaving full screen again will automatically submit your interview.</p>
                <p className="text-2xl font-mono font-bold text-amber-600 tabular-nums">{exitCountdown}s</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleExitWarningLeave}>
              Leave & submit
            </Button>
            <Button onClick={handleExitWarningStay}>
              Stay in interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Coding Round: ask user to share screen first */}
      {requireScreenShareFirst && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm p-6">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-amber-100 p-4">
                <Monitor className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">This is a coding interview</h2>
              <p className="text-muted-foreground">
                Share your entire screen to continue (window or tab is not allowed). You will code in the browser while the AI interviewer asks follow-up questions.
              </p>
            </div>
            <Button
              onClick={toggleScreenShare}
              size="lg"
              className="gap-2 bg-amber-600 hover:bg-amber-700"
            >
              <Monitor className="h-5 w-5" />
              Share screen to start
            </Button>
          </div>
        </div>
      )}

      <MeetTestHeader
        interviewTitle={interviewTitle || interviewData?.title}
        assistantName={assistant.name}
        assistantAvatar={assistant.avatar}
        isConversationMode={isConversationMode}
        isLoading={false}
        hasTranscriptData={voiceTranscript.length > 0}
        elapsedTime={elapsedSeconds}
        isTimerRunning={isConversationMode}
        formatTime={(s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`}
        onStartConversation={handleStartConversation}
        onStopConversation={handleStopConversation}
        isRegularInterviewActive={isConversationMode}
        isCodingMode={isScreenSharing}
        showInterviewStartDialog={uiConfig.showInterviewStartDialog}
        isChatOpen={isChatOpen && uiConfig.showChatBox}
      />

      {/* Coding: confirm entire screen shared (same idea as app/test2) */}
      {interviewData?.screenShareEnabled && isEntireScreenShared && (
        <div className="shrink-0 px-4 py-2 bg-green-500/15 border-b border-green-500/30 text-center text-sm text-green-800 dark:text-green-200">
          You shared: Entire screen. You can start the interview.
        </div>
      )}

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Main Content Area - Only show shared screen + your video when entire screen is shared (not window/tab) */}
        <div className={`flex-1 transition-all duration-300 ${isChatOpen && uiConfig.showChatBox ? 'mr-[400px]' : ''} h-full overflow-hidden flex flex-col`}>
          {isEntireScreenShared ? (
            <ScreenShareInterviewLayout
              key={`coding-q-${codingModeQuestion.title}-${codingQuestionIndexOverride ?? 'initial'}`}
              question={codingModeQuestion}
              stream={stream}
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              isGettingStream={isGettingStream}
              videoRef={videoRef}
              codingCodeRef={codingCodeRef}
            />
          ) : (
            <div className="grid h-full grid-cols-2 gap-4 p-4">
              <VideoFeed
                stream={stream}
                isVideoEnabled={isVideoEnabled}
                isAudioEnabled={isAudioEnabled}
                isUserSpeaking={isUserSpeaking}
                isGettingStream={isGettingStream}
                videoRef={videoRef}
                userTranscript={userTranscript}
                showUserTranscription={uiConfig.showUserTranscription}
                sttAvailable={sttAvailable}
                ttsAvailable={ttsAvailable}
                isAISpeaking={isVoiceChatActive}
              />

              <VoiceChatPanel
                selectedVoice={selectedVoice}
                voiceConfig={voiceConfig}
                availableVoices={availableVoices}
                isVoiceChatActive={isVoiceChatActive}
                isUserSpeaking={isUserSpeaking}
                isWaitingForUserResponse={isWaitingForUserResponse}
                uiConfig={uiConfig}
                interviewData={interviewData}
                voiceChatMessages={voiceChatMessages}
                isAudioEnabled={isAudioEnabled}
                onTranscriptUpdate={handleTranscriptUpdate}
                onVoiceChatStateChange={handleVoiceChatStateChange}
                onConversationModeChange={handleConversationModeChange}
                onWaitingForResponseChange={handleWaitingForResponseChange}
              />
            </div>
          )}
        </div>

        {/* Chat Sidebar - Right Side - Only show when chat icon is clicked */}
        {isChatOpen && uiConfig.showChatBox && (
          <div className="fixed right-0 top-0 h-full w-[400px] bg-background border-l border-border shadow-lg z-30 flex flex-col">
            <Chat
              isOpen={true}
              onOpenChange={setIsChatOpen}
              messages={messages}
              assistant={{
                id: assistant.id,
                name: assistant.name || 'AI Assistant',
                avatar: assistant.avatar,
                role: assistant.role || 'AI Assistant',
                industry: assistant.industry || 'Technology',
                experienceLevel: assistant.experienceLevel || 'Expert',
                hasVoiceEnabled: assistant.hasVoiceEnabled ?? true
              }}
              voiceTranscript={voiceTranscript}
              isVoiceChatActive={isVoiceChatActive}
              mode="sidebar"
              showCloseButton={true}
            />
          </div>
        )}
      </div>

      <MeetTestControls
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isChatOpen={isChatOpen}
        onToggleAudio={lockMicAndVideo ? () => {} : () => setIsAudioEnabled(!isAudioEnabled)}
        onToggleVideo={lockMicAndVideo ? () => {} : () => setIsVideoEnabled(!isVideoEnabled)}
        lockMicAndVideo={lockMicAndVideo}
        isAISpeaking={isVoiceChatActive}
        onToggleChat={uiConfig.showChatBox ? () => setIsChatOpen(!isChatOpen) : undefined}
        onShowSettings={uiConfig.showVoiceSettings ? () => setShowSettings(!showSettings) : undefined}
        showShareScreen={uiConfig.showShareScreen}
        isScreenSharing={isScreenSharing}
        onToggleScreenShare={toggleScreenShare}
      />


      {uiConfig.showVoiceSettings && showSettings && (
        <div className="absolute top-32 left-4 right-4 z-20 flex justify-center">
          <div className="w-full max-w-md">
            <VoiceSettings
              selectedVoice={selectedVoice}
              availableVoices={availableVoices}
              onVoiceChange={(voiceURI) => {
                console.log('Voice changed in UI to:', voiceURI)
                setSelectedVoice(voiceURI)
                // TTS service will be updated automatically via useTTS hook
              }}
              onTestVoice={testVoice}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}

      <ScreenShareDisplay
        stream={screenStream}
        isVisible={isEntireScreenShared}
      />

      <InterviewStartDialog
        open={showInterviewStartDialog}
        onStart={handleStartInterview}
        isCodingMode={isEntireScreenShared}
      />

      {/* Only show "Your entire screen is now being shared" when we confirmed entire screen (not window/tab) */}
      <ScreenShareDialog
        open={showScreenShareDialog && (isEntireScreenShared || !interviewData?.screenShareEnabled)}
        onOpenChange={setShowScreenShareDialog}
        title={uiConfig.screenShareDialogTitle}
        description={uiConfig.screenShareDialogDescription}
      />
    </div>
  )
}
