'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MicOff, VideoOff } from 'lucide-react'
import { MeetTestHeader } from '../ui/meet-test-header'
import { MeetTestControls } from '../ui/meet-test-controls'
import { VoiceChat } from '../voice/voice-chat'
import { VoiceSettings } from '../voice/voice-settings'
import { VoiceActivityIndicator } from '@/components/meet/ui/voice-activity-indicator'
import { Chat } from '@/components/meet/chat'

// Interview Configuration - Shared across all components
// 🎯 CHANGE THIS CONFIG TO MODIFY THE ENTIRE INTERVIEW SYSTEM
// This affects: AI prompts, analysis topics, interview focus, etc.
export const INTERVIEW_CONFIG = {
  position: "Software Developer",           // Job position title
  company: "Amazon",                        // Company name
  topics: "Data Structures, Algorithms, System Design, React/Frontend Development, Backend Technologies", // Technical topics to cover
  difficulty: "Beginner to Advanced"         // Difficulty progression
} as const

// Voice Configuration - Easy to modify in the future
const VOICE_CONFIG = {
  language: 'hi-IN',        // Default language (Hindi)
  speechRate: 1.2,          // Speech rate (1.2x = 20% faster)
  speechPitch: 1.0,         // Speech pitch (1.0 = normal)
  autoListenAfterAI: false  // Auto-listen after AI speaks
} as const

// UI Configuration - Easy to modify in the future
const UI_CONFIG = {
  showChatBox: true,       // Show/hide chat box (true = show, false = hide)
  showVoiceSettings: true   // Show/hide voice settings panel (true = show, false = hide)
} as const

interface MeetTestRoomProps {
  assistantName?: string
  assistantAvatar?: string
  onEndCall?: () => void
}

export function MeetTestRoom({
  assistantName = 'AI Assistant',
  assistantAvatar,
  onEndCall
}: MeetTestRoomProps) {
  const router = useRouter()
  // State for media controls
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // State for media stream
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isGettingStream, setIsGettingStream] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  
  // State for voice chat
  const [voiceTranscript, setVoiceTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isConversationMode, setIsConversationMode] = useState(false)
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]>([])
  
  // Voice settings state - using configuration values
  const [selectedVoice, setSelectedVoice] = useState<string>(VOICE_CONFIG.language)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

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

      // Auto-select configured language voice if available
      if (targetVoices.length > 0) {
        const targetVoice = targetVoices.find(v =>
          v.lang.startsWith(VOICE_CONFIG.language) ||
          v.lang.startsWith(VOICE_CONFIG.language.split('-')[0])
        )
        if (targetVoice) {
          setSelectedVoice(targetVoice.voiceURI)
          console.log(`Auto-selected ${VOICE_CONFIG.language} voice:`, targetVoice.name, targetVoice.voiceURI)
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
  }, [selectedVoice])

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
  }, [isConversationMode, isTimerRunning])

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

  const handleAnalyzeInterview = () => {
    // Store transcript data in sessionStorage for the analysis page
    if (voiceTranscript.length > 0) {
      sessionStorage.setItem('interviewTranscript', JSON.stringify(voiceTranscript))
      sessionStorage.setItem('interviewMessages', JSON.stringify(messages))
    }
    router.push('/meet-test/analysis')
  }

  // Format elapsed time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const testVoice = () => {
    const utterance = new SpeechSynthesisUtterance("Hello! This is how your selected voice sounds. You can now test different voices to find the one that works best for you.")
    utterance.rate = VOICE_CONFIG.speechRate
    utterance.pitch = VOICE_CONFIG.speechPitch

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
        />

        {/* Timer Display */}
        {isTimerRunning && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-black/80 text-white px-4 py-2 rounded-full text-lg font-mono font-semibold shadow-lg border border-white/20">
              {formatTime(elapsedTime)}
            </div>
          </div>
        )}

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
              <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-destructive-foreground">
                <MicOff className="h-3 w-3" />
                <span>Muted</span>
              </div>
            )}
            {!isVideoEnabled && (
              <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-destructive-foreground">
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
          <VoiceChat
            onTranscriptUpdate={handleTranscriptUpdate}
            onVoiceChatStateChange={handleVoiceChatStateChange}
            onConversationModeChange={handleConversationModeChange}
            selectedVoice={selectedVoice}
            speechRate={VOICE_CONFIG.speechRate}
            speechPitch={VOICE_CONFIG.speechPitch}
            availableVoices={availableVoices}
            autoListenAfterAI={VOICE_CONFIG.autoListenAfterAI}
            isAISpeaking={isVoiceChatActive}
            onWaitingForResponseChange={handleWaitingForResponseChange}
            interviewConfig={INTERVIEW_CONFIG}
          />

          {/* AI Speaking Indicator */}
          {isVoiceChatActive && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20">
                Let AI complete
              </div>
            </div>
          )}

          {/* Waiting for User Response Indicator */}
          {isWaitingForUserResponse && !isVoiceChatActive && (
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
              isSpeaking={isVoiceChatActive}
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
        onToggleChat={UI_CONFIG.showChatBox ? () => setIsChatOpen(!isChatOpen) : undefined}
        onShowSettings={UI_CONFIG.showVoiceSettings ? () => setShowSettings(!showSettings) : undefined}
      />

      {/* Chat - Only show if enabled in UI_CONFIG */}
      {UI_CONFIG.showChatBox && (
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

      {/* Voice Settings Panel - Only show if enabled in UI_CONFIG */}
      {UI_CONFIG.showVoiceSettings && showSettings && (
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

    </div>
  )
}
