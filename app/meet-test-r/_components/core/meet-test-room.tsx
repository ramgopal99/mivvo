'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MicOff, VideoOff } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MeetTestHeader } from '../ui/meet-test-header'
import { MeetTestControls } from '../ui/meet-test-controls'
import { ScreenShareDisplay } from '../ui/screen-share-display'
import { DraggableCodeButton } from '../ui/draggable-code-button'
import { CodeDialog } from '../ui/code-dialog'
import { VoiceChat } from '../voice/voice-chat'
import { VoiceSettings } from '../voice/voice-settings'
import { VoiceActivityIndicator } from '@/components/meet/ui/voice-activity-indicator'
import { Chat } from '@/components/meet/chat'
import { CodingQuestion } from '../config'
import { getRandomStaticQuestion } from '../static-questions'

// Extend window interface for coding code getter
declare global {
  interface Window {
    getCurrentCodingCode?: () => { code: string; language: string }
  }
}

// Config interfaces
interface InterviewConfig {
  position: string
  topics: string
}

interface CodingInterviewConfig {
  position: string
  topics: string
  focus: string
}

interface VoiceConfig {
  language: string
  speechRate: number
  speechPitch: number
  autoListenAfterAI: boolean
}

interface UiConfig {
  showChatBox: boolean
  showVoiceSettings: boolean
  showLiveTranscription: boolean
  showLiveTranscriptionCoding: boolean
  showShareScreen: boolean
  showCodeButtonOnlyOnScreenShare: boolean
  showCodingInterviewOnlyOnScreenShare: boolean
  screenShareSuccessMessage: string
  screenShareDialogTitle: string
  screenShareDialogDescription: string
  screenShareRestrictToScreen: boolean
  screenShareRestrictionErrorMessage: string
}

interface VoiceChatConfig {
  SILENCE_TIMEOUT_MS: number
  RECOGNITION_KEEP_ALIVE_MS: number
  TTS_RESTART_DELAY_MS: number
  USER_RESPONSE_TIMEOUT_MS: number
}

interface VoiceChatMessages {
  AI_GREETING_MESSAGE: string
  USER_RESPONSE_TIMEOUT_MESSAGE: string
  QUESTION_INSTRUCTIONS?: string
}

interface CodingQuestionDisplay {
  INCLUDE_QUESTION_TITLE: boolean
  INCLUDE_QUESTION_DESCRIPTION: boolean
  INCLUDE_QUESTION_INSTRUCTIONS: boolean
}

interface MeetTestRoomProps {
  assistantName?: string
  assistantAvatar?: string
  onEndCall?: () => void
  interviewConfig?: InterviewConfig
  codingInterviewConfig?: CodingInterviewConfig
  voiceConfig?: VoiceConfig
  uiConfig?: UiConfig
  codingVoiceChatConfig?: VoiceChatConfig
  codingVoiceChatMessages?: VoiceChatMessages
  codingQuestionDisplay?: CodingQuestionDisplay
}

export function MeetTestRoom({
  assistantName = 'AI Assistant',
  assistantAvatar,
  onEndCall,
  interviewConfig = {
    position: "Software Developer",
    topics: "Technical Background, Programming Experience, System Design Theory, Algorithm Concepts, Database Design, API Design, Scalability, Performance Optimization"
  },
  codingInterviewConfig = {
    position: "Software Developer",
    topics: "Coding Problems, Algorithm Analysis, Problem Solving, Code Optimization",
    focus: "coding interview questions and solutions"
  },
  voiceConfig = {
    language: 'hi-IN',
    speechRate: 1.2,
    speechPitch: 1.0,
    autoListenAfterAI: false
  },
  uiConfig = {
    showChatBox: false,
    showVoiceSettings: true,
    showLiveTranscription: false,
    showLiveTranscriptionCoding: false,
    showShareScreen: true,
    showCodeButtonOnlyOnScreenShare: true,
    showCodingInterviewOnlyOnScreenShare: true,
    screenShareSuccessMessage: "Screen sharing started successfully!",
    screenShareDialogTitle: "Screen Sharing Active",
    screenShareDialogDescription: "Your entire screen is now being shared. Others can see everything on your screen in the bottom-right corner of their view.\n\nTips:\n• Click the monitor button again to stop sharing\n• Your entire screen content is visible to others",
    screenShareRestrictToScreen: true,
    screenShareRestrictionErrorMessage: "Please select your entire screen to share. Sharing individual windows or tabs is not allowed."
  },
  codingVoiceChatConfig = {
    SILENCE_TIMEOUT_MS: 3500,
    RECOGNITION_KEEP_ALIVE_MS: 6000,
    TTS_RESTART_DELAY_MS: 250,
    USER_RESPONSE_TIMEOUT_MS: 60000
  },
  codingVoiceChatMessages = {
    AI_GREETING_MESSAGE: "",
    USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Feel free to continue working on the problem.",
    QUESTION_INSTRUCTIONS: "Feel free to ask questions if you need any clarification. When you're done writing your code, just say done or submit, and I'll review your solution. You can continue with more questions anytime by saying next question."
  },
  codingQuestionDisplay = {
    INCLUDE_QUESTION_TITLE: true,
    INCLUDE_QUESTION_DESCRIPTION: false,
    INCLUDE_QUESTION_INSTRUCTIONS: true
  }
}: MeetTestRoomProps) {
  const router = useRouter()
  // State for media controls
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // State for screen sharing
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [showScreenShareDialog, setShowScreenShareDialog] = useState(false)

  // State for code dialog
  const [showCodeDialog, setShowCodeDialog] = useState(false)
  const [currentCodingQuestion, setCurrentCodingQuestion] = useState<CodingQuestion | null>(null)

  // State for media stream
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isGettingStream, setIsGettingStream] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  
  // State for voice chat
  const [voiceTranscript, setVoiceTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isConversationMode, setIsConversationMode] = useState(false)
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]>([])

  // State for coding interview voice chat (separate from regular voice chat)
  const [isCodingVoiceChatActive, setIsCodingVoiceChatActive] = useState(false)
  const [isCodingInterviewActive, setIsCodingInterviewActive] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  // Voice settings state - using configuration values
  const [selectedVoice, setSelectedVoice] = useState<string>(voiceConfig.language)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  // Timer state
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  // User response waiting state
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState<boolean>(false)
  const [isWaitingForCodingUserResponse, setIsWaitingForCodingUserResponse] = useState<boolean>(false)

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const isGettingStreamRef = useRef<boolean>(false)

  // Load available voices and test media access
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      setAvailableVoices(voices)

      // Filter for Indian and English voices
      const targetVoices = voices.filter(voice =>
        voice.lang.startsWith('hi') || voice.lang.startsWith('en') ||
        voice.lang.startsWith('bn') || voice.lang.startsWith('ta') ||
        voice.lang.startsWith('te') || voice.lang.startsWith('gu') ||
        voice.lang.startsWith('kn') || voice.lang.startsWith('ml') ||
        voice.lang.startsWith('mr') || voice.lang.startsWith('or') ||
        voice.lang.startsWith('pa') || voice.lang.startsWith('as') ||
        voice.lang.startsWith('ne')
      )

      // Auto-select configured language voice if available
      if (targetVoices.length > 0) {
        const targetVoice = targetVoices.find(v =>
          v.lang.startsWith(voiceConfig.language) ||
          v.lang.startsWith(voiceConfig.language.split('-')[0])
        )
        if (targetVoice) {
          setSelectedVoice(targetVoice.voiceURI)
          console.log(`Auto-selected ${voiceConfig.language} voice:`, targetVoice.name, targetVoice.voiceURI)
        } else if (!selectedVoice) {
          // Fallback to first available voice if configured language not found
          setSelectedVoice(targetVoices[0].voiceURI)
          console.log('Fallback to first available voice:', targetVoices[0].name)
        }
      }
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    // Test if getUserMedia is available
    if (navigator.mediaDevices) {
      console.log('getUserMedia is available')
    } else {
      console.error('getUserMedia is not available')
    }

    return () => {
      speechSynthesis.onvoiceschanged = null
    }
  }, [selectedVoice, voiceConfig.language])

  // Voice activity detection for user
  useEffect(() => {
    if (!stream || !isAudioEnabled) {
      setIsUserSpeaking(false)
      return
    }

    const audioTracks = stream.getAudioTracks()
    if (audioTracks.length === 0) {
      setIsUserSpeaking(false)
      return
    }

    // Create audio context and analyser
    audioContextRef.current = new AudioContext()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256
    analyserRef.current.smoothingTimeConstant = 0.8

    // Connect microphone to analyser
    microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)
    microphoneRef.current.connect(analyserRef.current)

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detectVoice = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
      const normalizedLevel = average / 255
      
      // Determine if speaking (threshold can be adjusted)
      const isCurrentlySpeaking = normalizedLevel > 0.1
      setIsUserSpeaking(isCurrentlySpeaking)

      requestAnimationFrame(detectVoice)
    }

    detectVoice()

    return () => {
      if (microphoneRef.current) {
        microphoneRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stream, isAudioEnabled])

  // Manage media stream
  useEffect(() => {
    let mounted = true
    let currentStream: MediaStream | null = null

    const updateMediaStream = async () => {
      console.log('updateMediaStream called, isGettingStream:', isGettingStreamRef.current)
      if (isGettingStreamRef.current) return
      
      console.log('Setting isGettingStream to true')
      isGettingStreamRef.current = true
      setIsGettingStream(true)

      try {
        // Stop existing stream completely
        if (currentStream) {
          console.log('Stopping existing stream')
          currentStream.getTracks().forEach(track => track.stop())
          currentStream = null
        }

        // Create new stream if needed
        if (isVideoEnabled || isAudioEnabled) {
          const constraints = {
            video: isVideoEnabled ? {
              width: { ideal: 640, max: 1280 },
              height: { ideal: 480, max: 720 },
              facingMode: 'user'
            } : false,
            audio: isAudioEnabled
          }

          console.log('Requesting media with constraints:', constraints)
          const newStream = await navigator.mediaDevices.getUserMedia(constraints)
          console.log('Got media stream:', newStream)
          console.log('Stream tracks:', newStream.getTracks())
          
          if (mounted) {
            currentStream = newStream
            console.log('Setting stream in state')
            setStream(newStream)

            if (isVideoEnabled && videoRef.current) {
              console.log('Setting video srcObject')
              videoRef.current.srcObject = newStream
              
              // Wait for video to be ready
              videoRef.current.onloadedmetadata = () => {
                console.log('Video metadata loaded, attempting to play')
                videoRef.current?.play().catch(error => {
                  console.error("Video play error:", error)
                })
              }
            }
          } else {
            console.log('Component unmounted, stopping stream')
            newStream.getTracks().forEach(track => track.stop())
          }
        } else {
          console.log('No video/audio needed, clearing stream')
          if (videoRef.current) {
            videoRef.current.srcObject = null
          }
          if (mounted) {
            setStream(null)
          }
        }
      } catch (error) {
        console.error("Error accessing media devices:", error)
        console.error("Error details:", error)
        if (mounted) {
          setStream(null)
        }
      } finally {
        if (mounted) {
          console.log('Setting isGettingStream to false')
          isGettingStreamRef.current = false
          setIsGettingStream(false)
        }
      }
    }

    updateMediaStream()

    return () => {
      mounted = false
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isVideoEnabled, isAudioEnabled])

  // Screen sharing functions
  const startScreenShare = async () => {
    try {
      // Configure display media options
      const displayMediaOptions: DisplayMediaStreamOptions = {
        video: true, // Allow all video sources, we'll restrict in the validation below
        audio: false
      }

      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)

      // Check if user selected a browser tab (not entire screen or other app)
      const videoTrack = stream.getVideoTracks()[0]

      // Wait a bit for the track to be fully initialized
      await new Promise(resolve => setTimeout(resolve, 100))

      const settings = videoTrack.getSettings()
      const displaySurface = (settings as MediaTrackSettings & { displaySurface?: string }).displaySurface

      // Debug: Log what was selected
      console.log('Screen share selection:', { displaySurface, settings, allSettings: Object.keys(settings) })

      // If restriction is enabled and we can detect the surface type
      if (uiConfig.screenShareRestrictToScreen && displaySurface) {
        if (displaySurface !== 'monitor') {
          // User selected something other than entire screen, reject and show error
          console.log('Rejected screen share - only entire screen allowed:', displaySurface)
          stream.getTracks().forEach(track => track.stop())
          toast.error(uiConfig.screenShareRestrictionErrorMessage)
          return
        }
      } else if (uiConfig.screenShareRestrictToScreen && !displaySurface) {
        // displaySurface not available - allow sharing with warning
        console.log('displaySurface not available, allowing share with warning')
        toast.warning('Please ensure you selected your entire screen. If you shared a window or tab, please stop and try again.')
      }

      setScreenStream(stream)
      setIsScreenSharing(true)

      // Show success message and dialog
      toast.success(uiConfig.screenShareSuccessMessage)
      setShowScreenShareDialog(true)

      // Handle when user stops sharing via browser UI
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare(false)
      })
    } catch (error: unknown) {
      // Handle user denial/cancellation
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        toast.error('Screen sharing was cancelled or denied. Please try again and allow access.')
        return
      }

      // Log other errors to console for debugging
      console.error('Error starting screen share:', error)
      toast.error('Failed to start screen sharing. Please try again.')
    }
  }

  const stopScreenShare = (showMessage = true) => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop())
      setScreenStream(null)
    }
    setIsScreenSharing(false)

    if (showMessage) {
      console.log('Screen sharing stopped')
    }
  }

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare()
    } else {
      startScreenShare()
    }
  }

  // Cleanup screen sharing on unmount
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [screenStream])

  // Ensure video element gets the stream when available
  useEffect(() => {
    if (stream && isVideoEnabled && videoRef.current) {
      console.log('Setting video stream in useEffect')
      videoRef.current.srcObject = stream
      
      // Try to play immediately
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error("Video play error:", error)
          })
        }
      }
      
      // Try to play immediately
      playVideo()
      
      // Also try after a short delay in case the video isn't ready
      const timeoutId = setTimeout(playVideo, 100)
      
      return () => clearTimeout(timeoutId)
    }
  }, [stream, isVideoEnabled])

  // Timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isTimerRunning])

  const speakCodingQuestion = useCallback((question: CodingQuestion) => {
    // Build text to speak based on config options
    const textParts = []

    if (codingQuestionDisplay.INCLUDE_QUESTION_TITLE) {
      textParts.push(question.title)
    }

    if (codingQuestionDisplay.INCLUDE_QUESTION_DESCRIPTION) {
      textParts.push(question.description)
    }

    if (codingQuestionDisplay.INCLUDE_QUESTION_INSTRUCTIONS) {
      textParts.push(codingVoiceChatMessages.QUESTION_INSTRUCTIONS || "")
    }

    const textToSpeak = textParts.join('. ')

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = voiceConfig.speechRate
    utterance.pitch = voiceConfig.speechPitch

    if (selectedVoice) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    // Manage speaking state for UI indicators
    utterance.onstart = () => {
      setIsCodingVoiceChatActive(true)
    }
    utterance.onend = () => {
      setIsCodingVoiceChatActive(false)
      // Start timer after AI finishes speaking the question (like regular interviews)
      if (isCodingInterviewActive && !isTimerRunning) {
        setIsTimerRunning(true)
        setElapsedTime(0)
      }
    }
    utterance.onerror = () => {
      setIsCodingVoiceChatActive(false)
      // Start timer even on error
      if (isCodingInterviewActive && !isTimerRunning) {
        setIsTimerRunning(true)
        setElapsedTime(0)
      }
    }

    speechSynthesis.speak(utterance)
  }, [selectedVoice, availableVoices, isCodingInterviewActive, isTimerRunning, codingQuestionDisplay.INCLUDE_QUESTION_TITLE, codingQuestionDisplay.INCLUDE_QUESTION_DESCRIPTION, codingQuestionDisplay.INCLUDE_QUESTION_INSTRUCTIONS, codingVoiceChatMessages.QUESTION_INSTRUCTIONS, voiceConfig.speechRate, voiceConfig.speechPitch])

  const handleNextCodingQuestion = useCallback(() => {
    // Always advance to next question (no session limit)
    if (isCodingInterviewActive) {
      // Advance to next question
      const nextIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextIndex)

      // Generate new question
      const newQuestion = getRandomStaticQuestion()
      setCurrentCodingQuestion(newQuestion)

      // Clear current code and reset dialog
      setShowCodeDialog(false)

      // Small delay then show new question
      setTimeout(() => {
        setShowCodeDialog(true)

        // Speak the full new question with instructions after dialog opens
        setTimeout(() => {
          speakCodingQuestion(newQuestion)
        }, 1500)
      }, 1000)
    }
  }, [isCodingInterviewActive, currentQuestionIndex, speakCodingQuestion])

  // Listen for next coding question event
  useEffect(() => {
    window.addEventListener('nextCodingQuestion', handleNextCodingQuestion)

    return () => {
      window.removeEventListener('nextCodingQuestion', handleNextCodingQuestion)
    }
  }, [handleNextCodingQuestion])

  // Start timer when conversation mode starts (regular interviews only)
  // Coding interviews start timer after AI finishes speaking the question
  useEffect(() => {
    if (isConversationMode && !isCodingInterviewActive && !isTimerRunning) {
      setIsTimerRunning(true)
      setElapsedTime(0) // Reset timer when starting conversation
    } else if (!isConversationMode && !isCodingInterviewActive && isTimerRunning) {
      setIsTimerRunning(false)
    }
  }, [isConversationMode, isCodingInterviewActive, isTimerRunning])

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
    console.log('Voice chat state changed:', isActive)
    setIsVoiceChatActive(isActive)
  }

  const handleConversationModeChange = (isActive: boolean) => {
    console.log('Conversation mode changed:', isActive)
    setIsConversationMode(isActive)
  }

  const handleWaitingForResponseChange = (isWaiting: boolean) => {
    console.log('Waiting for user response:', isWaiting)
    setIsWaitingForUserResponse(isWaiting)
  }

  // Coding interview voice chat handlers
  const handleCodingVoiceChatStateChange = (isActive: boolean) => {
    console.log('Coding voice chat state changed:', isActive)
    setIsCodingVoiceChatActive(isActive)
  }

  const handleCodingWaitingForResponseChange = (isWaiting: boolean) => {
    console.log('Coding interview waiting for user response:', isWaiting)
    setIsWaitingForCodingUserResponse(isWaiting)
  }

  const handleAnalyzeInterview = () => {
    // Store transcript data in sessionStorage for the analysis page
    if (voiceTranscript.length > 0) {
      sessionStorage.setItem('interviewTranscript', JSON.stringify(voiceTranscript))
      sessionStorage.setItem('interviewMessages', JSON.stringify(messages))
    }
    router.push('/meet-test/analysis')
  }

  const handleStartCodingInterview = () => {
    // Stop any existing voice chat first
    if (isConversationMode) {
      const stopEvent = new CustomEvent('stopVoiceChat')
      window.dispatchEvent(stopEvent)
    }

    // Get a random coding question and open the dialog
    const question = getRandomStaticQuestion()
    setCurrentCodingQuestion(question)
    setShowCodeDialog(true)

    // Start coding interview voice conversation (separate from regular voice chat)
    setIsCodingInterviewActive(true)

    // Start coding interview voice chat and read the question
    setTimeout(() => {
      const event = new CustomEvent('startCodingInterviewVoiceChat')
      window.dispatchEvent(event)

      // After voice chat starts, read the full question with instructions
      setTimeout(() => {
        speakCodingQuestion(question)
      }, 1500) // Additional delay to let voice chat fully initialize
    }, 1000) // Small delay to let the dialog open first
  }

  const handleStopCodingInterview = useCallback(() => {
    // Stop coding interview voice chat
    const event = new CustomEvent('stopVoiceChat')
    window.dispatchEvent(event)

    // Stop the timer (like regular interviews)
    setIsTimerRunning(false)

    // Close the code dialog
    setShowCodeDialog(false)

    // Reset coding interview state
    setIsCodingInterviewActive(false)
    setCurrentQuestionIndex(0)

    // Clear global code function
    delete window.getCurrentCodingCode
  }, [])


  // Format elapsed time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const testVoice = () => {
    const utterance = new SpeechSynthesisUtterance("Hello! This is how your selected voice sounds. You can now test different voices to find the one that works best for you.")
    utterance.rate = voiceConfig.speechRate
    utterance.pitch = voiceConfig.speechPitch

    if (selectedVoice) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    speechSynthesis.speak(utterance)
  }




  return (
    <div className="relative h-screen bg-background">
        {/* Header */}
        <MeetTestHeader
          assistantName={assistantName}
          assistantAvatar={assistantAvatar}
          onEndCall={onEndCall}
          isConversationMode={isConversationMode}
          isLoading={false}
          hasTranscriptData={voiceTranscript.length > 0}
          elapsedTime={elapsedTime}
          isTimerRunning={isTimerRunning}
          formatTime={formatTime}
          onStartConversation={() => {
            console.log('Header: Starting voice chat')
            // Trigger voice chat start - this will be handled by the VoiceChat component
            const event = new CustomEvent('startVoiceChat')
            window.dispatchEvent(event)
          }}
          onStopConversation={() => {
            console.log('Header: Stopping voice chat')
            // Trigger voice chat stop - this will be handled by the VoiceChat component
            const event = new CustomEvent('stopVoiceChat')
            window.dispatchEvent(event)
          }}
          onAnalyzeInterview={handleAnalyzeInterview}
          onStartCodingInterview={handleStartCodingInterview}
          onStopCodingInterview={handleStopCodingInterview}
          isCodingInterviewActive={isCodingInterviewActive}
          isRegularInterviewActive={isConversationMode && !isCodingInterviewActive}
          isScreenSharing={isScreenSharing}
        />


      {/* Video Grid */}
      <div className="grid h-full grid-cols-2 gap-4 p-4 pt-24 mt-4">
        {/* User's video */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          {stream && isVideoEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              controls={false}
              preload="metadata"
              className="h-full w-full object-cover scale-x-[-1]"
              onLoadStart={() => console.log('Video load started')}
              onLoadedData={() => console.log('Video data loaded')}
              onCanPlay={() => console.log('Video can play')}
              onPlay={() => console.log('Video playing')}
              onError={(e) => console.error('Video error:', e)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <div className="text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted-foreground/30 flex items-center justify-center border-2 border-muted-foreground/20">
                  {stream ? (
                    <VideoOff className="h-12 w-12 text-muted-foreground" />
                  ) : (
                    <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <p className="text-base font-medium text-muted-foreground mb-1">
                  {isVideoEnabled ? "Starting camera..." : (stream ? "Video Off" : "Camera not available")}
                </p>
                {isGettingStream && (
                  <p className="text-sm text-muted-foreground">Requesting camera access...</p>
                )}
                {!isGettingStream && !stream && (
                  <p className="text-sm text-muted-foreground">Camera access required for video</p>
                )}
              </div>
            </div>
          )}
          
          {/* Status indicators */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {!isAudioEnabled && (
              <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-white">
                <MicOff className="h-3 w-3" />
                <span>Muted</span>
              </div>
            )}
            {!isVideoEnabled && (
              <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-white">
                <VideoOff className="h-3 w-3" />
                <span>Video Off</span>
              </div>
            )}
          </div>

          {/* Voice Activity Indicator */}
          <div className="absolute bottom-4 right-4">
            <VoiceActivityIndicator 
              isAudioEnabled={isAudioEnabled}
              isSpeaking={isUserSpeaking}
            />
          </div>
        </div>

        {/* AI Assistant Display with Voice Chat */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          {/* Regular Voice Chat - only show when not in coding interview */}
          {!isCodingInterviewActive && (
            <VoiceChat
              key="regular-voice-chat"
              onTranscriptUpdate={handleTranscriptUpdate}
              onVoiceChatStateChange={handleVoiceChatStateChange}
              onConversationModeChange={handleConversationModeChange}
              selectedVoice={selectedVoice}
              speechRate={voiceConfig.speechRate}
              speechPitch={voiceConfig.speechPitch}
              availableVoices={availableVoices}
              autoListenAfterAI={voiceConfig.autoListenAfterAI}
              isAISpeaking={isVoiceChatActive}
              onWaitingForResponseChange={handleWaitingForResponseChange}
              interviewConfig={interviewConfig}
              showLiveTranscription={uiConfig.showLiveTranscription}
            />
          )}

          {/* Coding Interview Voice Chat - separate instance for coding interviews */}
          {isCodingInterviewActive && (
            <VoiceChat
              key="coding-voice-chat"
              onVoiceChatStateChange={handleCodingVoiceChatStateChange}
              onConversationModeChange={handleConversationModeChange}
              selectedVoice={selectedVoice}
              speechRate={voiceConfig.speechRate}
              speechPitch={voiceConfig.speechPitch}
              availableVoices={availableVoices}
              autoListenAfterAI={voiceConfig.autoListenAfterAI}
              isAISpeaking={isCodingVoiceChatActive}
              onWaitingForResponseChange={handleCodingWaitingForResponseChange}
              interviewConfig={codingInterviewConfig}
              currentQuestion={currentCodingQuestion ? { title: currentCodingQuestion.title, description: currentCodingQuestion.description } : undefined}
              eventName="startCodingInterviewVoiceChat"
              voiceChatConfig={codingVoiceChatConfig}
              voiceChatMessages={codingVoiceChatMessages}
              showLiveTranscription={uiConfig.showLiveTranscriptionCoding}
            />
          )}

          {/* AI Speaking Indicator */}
          {(isVoiceChatActive || isCodingVoiceChatActive) && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20">
                {isCodingInterviewActive ? "Coding Interview Active" : "Let Interviewer complete"}
              </div>
            </div>
          )}

          {/* Waiting for User Response Indicator */}
          {((isWaitingForUserResponse && !isVoiceChatActive) || (isWaitingForCodingUserResponse && !isCodingVoiceChatActive)) && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-orange-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Waiting for response...
              </div>
            </div>
          )}

          {/* AI Voice Activity Indicator */}
          <div className="absolute bottom-4 right-4">
            <VoiceActivityIndicator
              isAudioEnabled={true}
              isSpeaking={isVoiceChatActive || isCodingVoiceChatActive}
            />
          </div>

        </div>
      </div>

      {/* Controls */}
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

      {/* Chat - Only show if enabled in uiConfig */}
      {uiConfig.showChatBox && (
        <Chat
          isOpen={isChatOpen}
          onOpenChange={setIsChatOpen}
          messages={messages}
          assistant={{
            id: 'meet-test-assistant',
            name: assistantName,
            avatar: assistantAvatar,
            role: 'AI Assistant',
            industry: 'Technology',
            experienceLevel: 'Expert',
            hasVoiceEnabled: true
          }}
          voiceTranscript={voiceTranscript}
          isVoiceChatActive={isVoiceChatActive}
        />
      )}

      {/* Voice Settings Panel - Only show if enabled in uiConfig */}
      {uiConfig.showVoiceSettings && showSettings && (
        <div className="absolute top-32 left-4 right-4 z-20 flex justify-center">
          <div className="w-full max-w-md">
            <VoiceSettings
              selectedVoice={selectedVoice}
              availableVoices={availableVoices}
              onVoiceChange={setSelectedVoice}
              onTestVoice={testVoice}
            />
          </div>
        </div>
      )}

      {/* Screen Share Display */}
      <ScreenShareDisplay
        stream={screenStream}
        isVisible={isScreenSharing}
      />

      {/* Screen Share Dialog */}
      <Dialog open={showScreenShareDialog} onOpenChange={setShowScreenShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {uiConfig.screenShareDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {uiConfig.screenShareDialogDescription.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < uiConfig.screenShareDialogDescription.split('\n').length - 1 && <br />}
                </span>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Code Dialog */}
      <CodeDialog
        isOpen={showCodeDialog}
        onClose={() => {
          // Just close the dialog, don't stop the coding interview
          setShowCodeDialog(false)
        }}
        question={currentCodingQuestion}
      />

      {/* Draggable Code Button */}
      {(!uiConfig.showCodeButtonOnlyOnScreenShare || isScreenSharing) && (
        <DraggableCodeButton
          onClick={() => setShowCodeDialog(true)}
        />
      )}

    </div>
  )
}
