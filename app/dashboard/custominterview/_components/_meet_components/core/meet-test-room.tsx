'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Chat } from '@/components/meet/chat'
import { MeetTestHeader } from '../ui/meet-test-header'
import { MeetTestControls } from '../ui/meet-test-controls'
import { ScreenShareDisplay, ScreenShareInterviewLayout } from '../ui'
import { getScreenShareQuestion } from '../data/coding-questions'
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
} from './components'
import { defaultVoiceConfig, defaultUiConfig } from './utils'
import {
  VoiceConfig,
  UiConfig,
  InterviewData
} from '../types'
import { getLLMService, Message as LLMMessage } from '../services/llm-service'
import { getRandomGreeting } from '../greeting-message'
import { getCodingModeSystemPrompt, CODING_MODE_GREETING } from '../coding-mode-prompt'

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

  const {
    isScreenSharing,
    screenStream,
    showScreenShareDialog,
    setShowScreenShareDialog,
    toggleScreenShare,
  } = useScreenShare({ uiConfig })

  const codingModeQuestion = useMemo(() => getScreenShareQuestion(0), [])

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
            const text = response.trim().replace(/^Mivvo:\s*/i, '').trim() || response.trim()
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

  // Handlers
  const handleEndCall = async () => {
    if (isConversationMode) {
      setIsConversationMode(false)
    }

    if (onEndCall) {
      onEndCall()
    }

    if (uiConfig.redirectOnStop) {
      window.location.href = '/dashboard/custominterview'
    }
  }

  const handleStartInterview = () => {
    setShowInterviewStartDialog(false)
    // Reset greeting state when starting new interview
    greetingSpokenRef.current = false
    isGreetingResponseRef.current = false
    // Enable conversation mode first, then trigger start event
    setIsConversationMode(true)
    const startEvent = new CustomEvent('startVoiceChat')
    window.dispatchEvent(startEvent)
  }

  const handleStartConversation = () => {
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

  return (
    <div className="relative h-screen bg-background flex flex-col overflow-hidden">
      <MeetTestHeader
        interviewTitle={interviewTitle || interviewData?.title}
        assistantName={assistant.name}
        assistantAvatar={assistant.avatar}
        isConversationMode={isConversationMode}
        isLoading={false}
        hasTranscriptData={voiceTranscript.length > 0}
        onStartConversation={handleStartConversation}
        onStopConversation={handleStopConversation}
        isRegularInterviewActive={isConversationMode}
        isCodingMode={isScreenSharing}
        showInterviewStartDialog={uiConfig.showInterviewStartDialog}
        isChatOpen={isChatOpen && uiConfig.showChatBox}
      />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Main Content Area - Layout switches when screen sharing */}
        <div className={`flex-1 transition-all duration-300 ${isChatOpen && uiConfig.showChatBox ? 'mr-[400px]' : ''} h-full overflow-hidden flex flex-col`}>
          {isScreenSharing ? (
            <ScreenShareInterviewLayout
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
        onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
        onToggleVideo={() => setIsVideoEnabled(!isVideoEnabled)}
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
        isVisible={isScreenSharing}
      />

      <InterviewStartDialog
        open={showInterviewStartDialog}
        onStart={handleStartInterview}
        isCodingMode={isScreenSharing}
      />

      <ScreenShareDialog
        open={showScreenShareDialog}
        onOpenChange={setShowScreenShareDialog}
        title={uiConfig.screenShareDialogTitle}
        description={uiConfig.screenShareDialogDescription}
      />
    </div>
  )
}
