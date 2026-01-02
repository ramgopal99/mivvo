'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MicOff, VideoOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { getAuthHeaders } from '@/lib/auth-utils'
import { ScreenShareDisplay } from '../ui/screen-share-display'
import { VoiceChat } from '../voice/voice-chat'
import { VoiceSettings } from '../voice/voice-settings'
import { LiveWaveform } from '../ui/live-waveform'
import { Chat } from '@/components/meet/chat'
import { generateInterviewGreeting } from '../greeting-generator'
import { destroySTTService, destroyTTSService, destroyLLMService } from '../services'
import {
  VoiceConfig,
  UiConfig,
  VoiceChatMessages,
  InterviewData
} from '../types'



interface MeetTestRoomProps {
  interviewTitle?: string
  assistantName?: string
  assistantAvatar?: string
  onEndCall?: () => void
  voiceConfig?: VoiceConfig
  uiConfig?: UiConfig
  interviewData?: InterviewData // Interview data with custom prompts
  greeting?: string // Predefined greeting for the interview
}

export function MeetTestRoom({
  interviewTitle = 'Interview',
  assistantName = 'Mivvo',
  assistantAvatar,
  onEndCall,
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
    showShareScreen: true,
    showInterviewStartDialog: false,
    redirectOnStop: false,
    screenShareDialogTitle: "Screen Sharing Active",
    screenShareDialogDescription: "Your entire screen is now being shared. Others can see everything on your screen in the bottom-right corner of their view.\n\nTips:\n• Click the monitor button again to stop sharing\n• Your entire screen content is visible to others",
    screenShareRestrictToScreen: true,
    enablePostStopAnalysis: false,
    autoFullscreen: 0,
    enableUserResponseTimeout: true
  },
  interviewData,
  greeting
}: MeetTestRoomProps) {
  // Set greeting when interviewData or greeting prop changes
  useEffect(() => {
    const generateGreeting = async () => {
      // Priority: 1. Provided greeting prop, 2. Generated greeting, 3. Default fallback
      let greetingMessage = greeting

      if (!greetingMessage && interviewData) {
        // Generate dynamic greeting based on interview data
        greetingMessage = await generateInterviewGreeting({
          jd: interviewData.jd || interviewData.customPrompt, // Use JD or customPrompt as context
          interviewType: interviewData.interviewType, // Use interview type for proper messaging
          title: interviewData.title
        }, assistantName)
      }

      // Fallback to default if nothing else
      greetingMessage = greetingMessage || `Hi! I'm ${assistantName}. Could you tell me about your background?`

      console.log('Setting greeting:', greetingMessage)

      setVoiceChatMessages(prev => ({
        ...prev,
        AI_GREETING_MESSAGE: greetingMessage
      }))
    }

    generateGreeting()
  }, [interviewData, greeting, assistantName])

  // Show interview start dialog if enabled in config
  useEffect(() => {
    if (uiConfig.showInterviewStartDialog) {
      setShowInterviewStartDialog(true)
    }
  }, [uiConfig.showInterviewStartDialog])

  // Handle end call - save conversation data and perform analysis if interview is active
  const handleEndCall = async () => {
    // Prevent multiple end call attempts
    if (isEndingCall) {
      console.log('End call already in progress, skipping duplicate call')
      return
    }

    setIsEndingCall(true) // Prevent double saving and multiple calls

    try {
      // If there's an active conversation, save it and perform analysis before ending
      if (isConversationMode && voiceTranscript.length > 0 && interviewData?.id) {
        console.log('End call clicked with active conversation, saving data and performing analysis...')

        // Save conversation data (this already includes analysis)
        console.log('💾 handleEndCall: Calling handleSaveConversation')
        await handleSaveConversation()
        console.log('💾 handleEndCall: Calling handleUpdateTimeUsage')
        await handleUpdateTimeUsage()
      }

      // Stop any active conversations AFTER saving (to prevent state change triggers)
      if (isConversationMode) {
        console.log('🎤 handleEndCall: Stopping conversation mode and voice chat')

        // First, dispatch stop event to VoiceChat component to let it clean up properly
        console.log('🎤 handleEndCall: Dispatching stopVoiceChat event first')
        const stopEvent = new CustomEvent('stopVoiceChat')
        window.dispatchEvent(stopEvent)

        // Give a small delay for VoiceChat to process the stop event
        setTimeout(() => {
          console.log('🎤 handleEndCall: Now updating state and destroying services')
          setIsConversationMode(false)
          setIsVoiceChatActive(false) // Also stop voice chat activity
          setVoiceTranscript([]) // Clear transcript
          setMessages([]) // Clear messages

          // Destroy voice services to ensure they stop listening/speaking
          console.log('🎤 handleEndCall: Destroying voice services')
          destroySTTService()
          destroyTTSService()
          destroyLLMService()
          console.log('🎤 handleEndCall: Voice services destroyed')
        }, 100) // Small delay to let VoiceChat process the stop event
      }

      // Call the original onEndCall
      if (onEndCall) {
        onEndCall()
      }

      // Redirect to custom interview page if enabled in config
      if (uiConfig.redirectOnStop) {
        window.location.href = '/dashboard/custominterview'
      }
    } finally {
      // Reset flag after everything is done
      setIsEndingCall(false)
    }
  }

  // State for media controls
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // State for screen sharing
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [showScreenShareDialog, setShowScreenShareDialog] = useState(false)

  // State for interview start dialog
  const [showInterviewStartDialog, setShowInterviewStartDialog] = useState(false)


  // State to prevent double saving when ending call
  const [isEndingCall, setIsEndingCall] = useState(false)

  // Ref to prevent multiple simultaneous save operations (using ref for synchronous access)
  const isSavingConversationRef = useRef(false)

  // Ref to prevent multiple simultaneous time usage updates
  const isUpdatingTimeUsageRef = useRef(false)

  // State for media stream
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isGettingStream, setIsGettingStream] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)

  // State for dynamic voice chat messages
  const [voiceChatMessages, setVoiceChatMessages] = useState<VoiceChatMessages>({
    AI_GREETING_MESSAGE: "Hi! I'm Mivvo. Could you tell me about your background?",
    USER_RESPONSE_TIMEOUT_MESSAGE: "I'm still here. Please continue with your thoughts.",
  })
  
  // State for voice chat
  const [voiceTranscript, setVoiceTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isConversationMode, setIsConversationMode] = useState(false)
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]>([])

  
  // Voice settings state - using configuration values
  const [selectedVoice, setSelectedVoice] = useState<string>(() => {
    // Load saved voice preference from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mivvo-selected-voice') || ''
    }
    return ''
  })
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  // Function to save voice preference to localStorage
  const saveVoicePreference = useCallback((voiceURI: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mivvo-selected-voice', voiceURI)
    }
    setSelectedVoice(voiceURI)
  }, [])

  // Timer state
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  // User response waiting state
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState<boolean>(false)

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

      // Check if user has a saved voice preference
      const savedVoice = typeof window !== 'undefined' ? localStorage.getItem('mivvo-selected-voice') : null
      if (savedVoice && voices.find(v => v.voiceURI === savedVoice)) {
        // Use saved voice preference
        setSelectedVoice(savedVoice)
        console.log('Loaded saved voice preference:', savedVoice)
      } else if (targetVoices.length > 0) {
        // Auto-select configured language voice if available
        const targetVoice = targetVoices.find(v =>
          v.lang.startsWith(voiceConfig.language) ||
          v.lang.startsWith(voiceConfig.language.split('-')[0])
        )
        if (targetVoice) {
          saveVoicePreference(targetVoice.voiceURI)
          console.log(`Auto-selected ${voiceConfig.language} voice:`, targetVoice.name, targetVoice.voiceURI)
        } else if (!selectedVoice) {
          // Fallback to first available voice if configured language not found
          saveVoicePreference(targetVoices[0].voiceURI)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceConfig.language])

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
      // But don't detect as speaking if AI is currently speaking to prevent feedback
      const isCurrentlySpeaking = normalizedLevel > 0.1 && !isVoiceChatActive
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
  }, [stream, isAudioEnabled, isVoiceChatActive])

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
          toast.error('Please share your entire screen only')
          return
        }
      } else if (uiConfig.screenShareRestrictToScreen && !displaySurface) {
        // displaySurface not available - allow sharing
        console.log('displaySurface not available, allowing share')
      }

      setScreenStream(stream)
      setIsScreenSharing(true)

      // Show dialog
      setShowScreenShareDialog(true)

      // Handle when user stops sharing via browser UI
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare(false)
      })
    } catch (error: unknown) {
      // Handle user denial/cancellation
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        return
      }

      // Log other errors to console for debugging
      console.error('Error starting screen share:', error)
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



  // Start timer when conversation mode starts
  useEffect(() => {
    if (isConversationMode && !isTimerRunning) {
      setIsTimerRunning(true)
      setElapsedTime(0) // Reset timer when starting conversation
    } else if (!isConversationMode && isTimerRunning) {
      setIsTimerRunning(false)
    }
  }, [isConversationMode, isTimerRunning, isEndingCall])

  const handleTranscriptUpdate = useCallback((transcript: { role: string; text: string; timestamp: string }[]) => {
    setVoiceTranscript(transcript)
    setMessages(transcript.map((t, index) => ({
      id: `msg-${index}`,
      role: t.role as 'user' | 'assistant',
      content: t.text,
      timestamp: t.timestamp
    })))
  }, [])

  const handleVoiceChatStateChange = (isActive: boolean) => {
    console.log('Voice chat state changed:', isActive)
    setIsVoiceChatActive(isActive)
  }

  const handleConversationModeChange = async (isActive: boolean) => {
    console.log('🎤 handleConversationModeChange called with:', isActive, 'current isConversationMode:', isConversationMode)

    // Create attempt when conversation starts (voice chat begins)
    if (isActive && !isConversationMode) {
      console.log('Conversation starting, creating interview attempt...')
      console.log('Interview data:', { id: interviewData?.id, title: interviewData?.title })

      try {
        const headers = getAuthHeaders()
        console.log('Auth headers:', Object.keys(headers))

        const response = await fetch('/api/custom-interviews/start-attempt', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            interviewId: interviewData?.id
          })
        })

        if (response.ok) {
          const result = await response.json()
          console.log('Interview attempt created successfully:', result)
        } else {
          const errorText = await response.text()
          console.error('Failed to create interview attempt:', response.status, errorText)
        }
      } catch (error) {
        console.error('Error creating interview attempt:', error)
      }
    }

    // Save conversation data when conversation stops naturally (not when user ends call)
    // Note: Only save here if conversation stops without user explicitly ending it
    if (!isActive && isConversationMode && !isEndingCall && !isSavingConversationRef.current) {
      console.log('🎤 handleConversationModeChange: Calling handleSaveConversation')
      await handleSaveConversation()
      // Don't update time usage here - it's already handled by handleEndCall
      console.log('🎤 handleConversationModeChange: Skipping handleUpdateTimeUsage (handled by handleEndCall)')
    }

    console.log('🎤 Setting isConversationMode to:', isActive)
    setIsConversationMode(isActive)
  }

  const handleWaitingForResponseChange = useCallback((isWaiting: boolean) => {
    console.log('Waiting for user response:', isWaiting)
    setIsWaitingForUserResponse(isWaiting)
  }, [])


  const handleSaveConversation = useCallback(async () => {
    // Prevent multiple simultaneous save operations using ref (synchronous)
    if (isSavingConversationRef.current) {
      console.log('Save already in progress, skipping duplicate save')
      return
    }

    // Save conversation data to database
    if (voiceTranscript.length > 0 && interviewData?.id) {
      try {
        isSavingConversationRef.current = true
        console.log('🔄 Saving conversation data to database...')
        console.log('Current state - isEndingCall:', isEndingCall, 'isConversationMode:', isConversationMode)

        const conversationData = {
          interviewId: interviewData.id,
          transcript: voiceTranscript,
          messages: messages,
          duration: elapsedTime,
          createdAt: new Date().toISOString()
        }

        const response = await fetch('/api/custom-interviews/save-conversation', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(conversationData)
        })

        if (response.ok) {
          console.log('Conversation data saved successfully')

          // Perform AI analysis only if enabled in config
          if (uiConfig.enablePostStopAnalysis) {
            try {
              console.log('Performing AI analysis of conversation...')

              const analysisResponse = await fetch('/api/analysis', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  conversation: voiceTranscript,
                  topic: interviewData.customPrompt || interviewData.jd
                })
              })

              if (analysisResponse.ok) {
                const analysis = await analysisResponse.json()
                console.log('Analysis completed, saving results...')

                // Save analysis results to database
                const saveAnalysisResponse = await fetch('/api/custom-interviews/save-analysis', {
                  method: 'POST',
                  headers: getAuthHeaders(),
                  body: JSON.stringify({
                    interviewId: interviewData.id,
                    analysis: analysis,
                    duration: elapsedTime
                  })
                })

                if (saveAnalysisResponse.ok) {
                  console.log('Analysis results saved successfully')
                } else {
                  console.error('Failed to save analysis results:', saveAnalysisResponse.status)
                }
              } else {
                console.error('Failed to analyze conversation:', analysisResponse.status)
              }
            } catch (analysisError) {
              console.error('Error during analysis:', analysisError)
            }
          } else {
            console.log('Post-stop analysis disabled in config, skipping analysis to save tokens')
          }
        } else {
          console.error('Failed to save conversation data:', response.status)
        }
      } catch (error) {
        console.error('Error saving conversation data:', error)
      } finally {
        isSavingConversationRef.current = false
      }
    } else {
      isSavingConversationRef.current = false
    }
  }, [voiceTranscript, interviewData?.id, interviewData?.customPrompt, interviewData?.jd, messages, elapsedTime, isEndingCall, isConversationMode, uiConfig.enablePostStopAnalysis])

  const handleUpdateTimeUsage = useCallback(async () => {
    console.log('⏰ handleUpdateTimeUsage called, ref status:', isUpdatingTimeUsageRef.current)

    // Prevent multiple simultaneous time usage updates
    if (isUpdatingTimeUsageRef.current) {
      console.log('⏰ BLOCKED: Time usage update already in progress, skipping duplicate update')
      return
    }

    // Update user's time allowance based on interview duration
    if (!interviewData?.id) {
      console.log('No interview data available for time update')
      return
    }

    try {
      isUpdatingTimeUsageRef.current = true
      console.log('⏰ STARTING: Updating user time usage...')

      // Calculate time used in minutes (round up to nearest minute)
      const timeUsedMinutes = Math.ceil(elapsedTime / 60)

      if (timeUsedMinutes <= 0) {
        console.log('No time used, skipping update')
        return
      }

      console.log(`⏰ EXECUTING: Time used: ${timeUsedMinutes} minutes (${elapsedTime} seconds)`)

      // Update user's used time in database
      const response = await fetch('/api/custom-interviews/update-time-usage', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          interviewId: interviewData.id,
          timeUsedMinutes: timeUsedMinutes
        })
      })

      if (response.ok) {
        console.log('⏰ SUCCESS: User time usage updated successfully')
      } else {
        const errorData = await response.json()
        console.error('Failed to update time usage:', response.status, errorData)
      }
    } catch (error) {
      console.error('Error updating time usage:', error)
    } finally {
      isUpdatingTimeUsageRef.current = false
      console.log('⏰ COMPLETED: Time usage update completed, ref reset to false')
    }
  }, [elapsedTime, interviewData?.id])



  // Format elapsed time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const testVoice = () => {
    const utterance = new SpeechSynthesisUtterance("This is how your selected voice sounds.")
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
    <div className="relative h-screen bg-background flex overflow-hidden">
        {/* Main Content Area */}
        <div
          className="h-full flex-1 transition-all duration-300 ease-in-out"
        >
        {/* Header */}
        <MeetTestHeader
          interviewTitle={interviewTitle}
          assistantName={assistantName}
          assistantAvatar={assistantAvatar}
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
            // Call the comprehensive end call handler
            handleEndCall()
          }}
          isRegularInterviewActive={isConversationMode}
          isScreenSharing={isScreenSharing}
          showInterviewStartDialog={uiConfig.showInterviewStartDialog}
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
                  <p className="text-sm text-muted-foreground">Requesting media access...</p>
                )}
                {!isGettingStream && !stream && (
                  <p className="text-sm text-muted-foreground">Use controls below to enable camera and microphone</p>
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

          {/* Voice Activity Waveform */}
          <div className="absolute bottom-4 right-4 w-32 h-8">
            <LiveWaveform
              active={isAudioEnabled && isUserSpeaking}
              mode="static"
              barWidth={2}
              barGap={1}
              barHeight={6}
              height={32}
              sensitivity={2}
              updateRate={60}
              barColor="#1f2937"
            />
          </div>
        </div>

        {/* AI Assistant Display with Voice Chat */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          {/* Voice Chat */}
            <VoiceChat
              key="regular-voice-chat"
              onTranscriptUpdate={handleTranscriptUpdate}
              onVoiceChatStateChange={handleVoiceChatStateChange}
              onConversationModeChange={handleConversationModeChange}
              selectedVoice={selectedVoice}
              speechRate={voiceConfig.speechRate}
              speechPitch={voiceConfig.speechPitch}
              autoListenAfterAI={voiceConfig.autoListenAfterAI}
              isAISpeaking={isVoiceChatActive}
              isUserSpeaking={isUserSpeaking}
              onWaitingForResponseChange={handleWaitingForResponseChange}
              showLiveTranscription={uiConfig.showLiveTranscription}
              customPrompt={interviewData?.customPrompt}
              voiceChatMessages={voiceChatMessages}
              isAudioEnabled={isAudioEnabled}
              externalConversationMode={isConversationMode}
              uiConfig={uiConfig}
            />


          {/* AI Speaking Indicator */}
          {isVoiceChatActive && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20">
                Let Interviewer complete
              </div>
            </div>
          )}

          {/* Waiting for User Response Indicator */}
          {(isWaitingForUserResponse && !isVoiceChatActive) && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-orange-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Waiting for response...
              </div>
            </div>
          )}


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

        </div>

        {/* Chat Panel */}
        {uiConfig.showChatBox && isChatOpen && (
          <div
            className="h-full w-96 bg-background border-l border-border shadow-lg flex-shrink-0"
          >
            <Chat
              isOpen={true}
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
          </div>
        )}

      {/* Voice Settings Panel - Only show if enabled in uiConfig */}
      {uiConfig.showVoiceSettings && showSettings && (
        <div className="absolute top-32 left-4 right-4 z-20 flex justify-center">
          <div className="w-full max-w-md">
            <VoiceSettings
              selectedVoice={selectedVoice}
              availableVoices={availableVoices}
              onVoiceChange={saveVoicePreference}
              onTestVoice={testVoice}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}

      {/* Screen Share Display */}
      <ScreenShareDisplay
        stream={screenStream}
        isVisible={isScreenSharing}
      />

      {/* Interview Start Dialog */}
      <Dialog open={showInterviewStartDialog} >
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader >
            <DialogTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Start Your Interview
            </DialogTitle>
            <DialogDescription>
              Welcome to your AI-powered interview! Click the button below to begin your conversation with the interviewer.
              The AI will ask you relevant questions based on your experience and the job requirements.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setShowInterviewStartDialog(false)
                // Start voice chat by triggering the start event
                const startEvent = new CustomEvent('startVoiceChat')
                window.dispatchEvent(startEvent)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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


    </div>
  )
}
