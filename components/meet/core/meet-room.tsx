/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useMeetRoom } from "../../providers/meet-room-provider"
import { InterviewHeader } from "../ui/meeting-header"
import { InterviewControls } from "../controls/interview-controls"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, MicOff, VideoOff } from "lucide-react"
import { VoiceActivityIndicator } from "../ui/voice-activity-indicator"
import { useState, useRef, useEffect, useCallback } from "react"
import { Chat } from "../chat"

// Local RoleAssistant type definition
interface RoleAssistant {
  id: string
  name: string
  category: string
  description: string
  specialties: string
  personality: string
  avatar?: string
  conversations: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  vapiAssistantId?: string | null
  hasVoiceEnabled: boolean
}

// AIAssistant type definition (removed dummy data dependency)
interface AIAssistant {
  id: string
  name: string
  avatar?: string
  role: string
  industry: string
  experienceLevel: string
  hasVoiceEnabled?: boolean
}

type Assistant = AIAssistant | RoleAssistant

// Type guard to check if assistant is RoleAssistant with voice capabilities
function isVoiceEnabledRoleAssistant(assistant: Assistant): assistant is RoleAssistant {
  return 'category' in assistant && 'specialties' in assistant && 'hasVoiceEnabled' in assistant
}

// Helper function to get assistant description
function getAssistantDescription(assistant: Assistant): string {
  if ('role' in assistant && 'industry' in assistant) {
    return `${assistant.role} • ${assistant.industry} • ${assistant.experienceLevel} level`
  } else if ('category' in assistant) {
    return `${assistant.category} • ${assistant.specialties}`
  }
  return 'AI Assistant'
}

// Props interface for MeetRoom
interface MeetRoomProps {
  voiceChatComponent?: React.ComponentType<{
    roleMeetId: string
    roleAssistant: RoleAssistant
    onRoleAssistantUpdate: () => void
    onTranscriptUpdate: (transcript: { role: string; text: string; timestamp: string }[]) => void
    onVoiceChatStateChange: (isActive: boolean) => void
    onEndVoiceChat: (endVoiceFn: () => void) => void
    onSendUserEventReady: (sendUserEventFn: (event: { 
      type: 'emoji_reaction'
      value: string
      timestamp: string
      userName?: string
      userEmail?: string
    }) => void) => void
  }>
}


export function MeetRoom({ voiceChatComponent: VoiceChatComponent }: MeetRoomProps) {
  const {
    assistant,
    session: meetSession,
    messages,
    isAudioEnabled,
    isVideoEnabled,
    isChatOpen,
    toggleChat
  } = useMeetRoom()
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isGettingStream, setIsGettingStream] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [endVoiceChatCallback, setEndVoiceChatCallback] = useState<(() => void) | null>(null)
  const [sendUserEvent, setSendUserEvent] = useState<((event: { 
    type: 'emoji_reaction'
    value: string
    timestamp: string
    userName?: string
    userEmail?: string
  }) => void) | undefined>(undefined)
  const [onSendUserEventReadyCalled, setOnSendUserEventReadyCalled] = useState(false)
  const sendUserEventReadyRef = useRef(false)

  // Debug effect to track sendUserEvent changes
  useEffect(() => {
    console.log('MeetRoom: sendUserEvent function updated:', !!sendUserEvent)
  }, [sendUserEvent])

  const handleSendUserEventReady = useCallback((sendUserEventFn: (event: { 
    type: 'emoji_reaction'
    value: string
    timestamp: string
    userName?: string
    userEmail?: string
  }) => void) => {
    if (!sendUserEventReadyRef.current) {
      console.log('MeetRoom: Setting sendUserEvent function')
      setSendUserEvent(() => sendUserEventFn)
      setOnSendUserEventReadyCalled(true)
      sendUserEventReadyRef.current = true
    }
  }, [])

  const handleEndVoiceChat = useCallback(() => {
    if (endVoiceChatCallback) {
      endVoiceChatCallback()
    }
  }, [endVoiceChatCallback])

  // Voice activity detection
  useEffect(() => {
    if (!stream || !isAudioEnabled) {
      setIsSpeaking(false)
      setAudioLevel(0)
      return
    }

    const audioTracks = stream.getAudioTracks()
    if (audioTracks.length === 0) {
      setIsSpeaking(false)
      setAudioLevel(0)
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
      const normalizedLevel = average / 255 // Normalize to 0-1
      
      setAudioLevel(normalizedLevel)
      
      // Determine if speaking (threshold can be adjusted)
      const isCurrentlySpeaking = normalizedLevel > 0.1
      setIsSpeaking(isCurrentlySpeaking)

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

  // Manage media stream based on video/audio settings
  useEffect(() => {
    let mounted = true
    let currentStream: MediaStream | null = null

    const updateMediaStream = async () => {
      if (isGettingStream) return
      setIsGettingStream(true)

      try {
        // Stop existing stream completely
        if (currentStream) {
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

          const newStream = await navigator.mediaDevices.getUserMedia(constraints)
          
          if (mounted) {
            currentStream = newStream
            setStream(newStream)

            if (isVideoEnabled && videoRef.current) {
              videoRef.current.srcObject = newStream
              
              const handleCanPlay = async () => {
                try {
                  if (videoRef.current && videoRef.current.readyState >= 2) {
                    await videoRef.current.play()
                  }
                } catch (error: unknown) {
                  if (error instanceof Error && error.name !== 'AbortError') {
                    console.error("Video play error:", error)
                  }
                }
              }
              
              // Use 'once' option to ensure handler only runs once
              videoRef.current.addEventListener('canplay', handleCanPlay, { once: true })
              
              // Trigger load to start the process
              videoRef.current.load()
            }
          } else {
            // Component unmounted, clean up
            newStream.getTracks().forEach(track => track.stop())
          }
        } else {
          // Both disabled, clear video and set stream to null
          if (videoRef.current) {
            videoRef.current.srcObject = null
          }
          if (mounted) {
            setStream(null)
          }
        }
      } catch (error) {
        console.error("Error accessing media devices:", error)
        if (mounted) {
          setStream(null)
        }
      } finally {
        if (mounted) {
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
  }, [isVideoEnabled])

  // Manage audio stream independently
  useEffect(() => {
    const updateAudioStream = async () => {
      try {
        if (isAudioEnabled && stream) {
          // Check if we already have audio tracks
          const audioTracks = stream.getAudioTracks()
          if (audioTracks.length === 0) {
            // Add audio to existing stream
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const newAudioTracks = audioStream.getAudioTracks()
            newAudioTracks.forEach(track => stream.addTrack(track))
          }
        } else if (!isAudioEnabled && stream) {
          // Remove audio tracks from stream
          const audioTracks = stream.getAudioTracks()
          audioTracks.forEach(track => {
            stream.removeTrack(track)
            track.stop()
          })
        }
      } catch (error) {
        console.error("Error managing audio stream:", error)
      }
    }

    updateAudioStream()
  }, [isAudioEnabled, stream])

  useEffect(() => {
    if (stream && isVideoEnabled && videoRef.current) {
      videoRef.current.srcObject = stream
      
      // Only play if video is ready, avoid multiple play attempts
      if (videoRef.current.readyState >= 2) {
        videoRef.current.play().catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Video play error:", error)
          }
        })
      }
    }
  }, [stream, isVideoEnabled])

  if (!assistant || !meetSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium text-muted-foreground">Preparing your meeting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen bg-background">
      {/* Header */}
      <InterviewHeader />

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
              preload="auto"
              className="h-full w-full object-cover scale-x-[-1]" // Mirror the video
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
          
          {/* Video/Audio status indicators */}
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
              isSpeaking={isSpeaking}
            />
          </div>
        </div>

        {/* AI Assistant Display */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          {isVoiceEnabledRoleAssistant(assistant) ? (
            // Role-based Assistant with Voice Chat
            VoiceChatComponent ? (
              <VoiceChatComponent
                roleMeetId={assistant.id}
                roleAssistant={assistant}
                onRoleAssistantUpdate={() => {
                  // Assistant updated
                }}
                onTranscriptUpdate={setVoiceTranscript}
                onVoiceChatStateChange={(isActive) => {
                  setIsVoiceChatActive(isActive)
                  setIsAISpeaking(isActive) // Update AI speaking state when voice chat is active
                }}
                onEndVoiceChat={(endVoiceFn) => {
                  setEndVoiceChatCallback(() => endVoiceFn)
                }}
                onSendUserEventReady={handleSendUserEventReady}
              />
            ) : (
              // Fallback or error if VoiceChatComponent is not provided
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Avatar className="mx-auto mb-4 h-20 w-20">
                    <AvatarImage src={assistant.avatar || undefined} />
                    <AvatarFallback>
                      <Brain className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{assistant.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {getAssistantDescription(assistant)}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            // AI Assistant (no voice) - handle different types
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src={assistant.avatar || undefined} />
                  <AvatarFallback>
                    <Brain className="h-10 w-10" />
                    </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{assistant.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {getAssistantDescription(assistant)}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Connected</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* AI Voice Activity Indicator */}
          <div className="absolute bottom-4 right-4">
            <VoiceActivityIndicator 
              isAudioEnabled={true}
              isSpeaking={isAISpeaking}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <InterviewControls
        onEndVoiceChat={handleEndVoiceChat}
        sendUserEvent={sendUserEvent || undefined}
        session={{
          user: {
            name: "Default User",
            email: "user@example.com"
          }
        }}
      />

      {/* Chat */}
      <Chat
        isOpen={isChatOpen}
        onOpenChange={toggleChat}
        messages={messages}
        assistant={assistant}
        voiceTranscript={voiceTranscript}
        isVoiceChatActive={isVoiceChatActive}
      />
    </div>
  )
}


