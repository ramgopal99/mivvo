"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Vapi from "@vapi-ai/web"

// Universal interface for any assistant that can have voice capabilities
export interface VoiceEnabledAssistant {
  id: string
  name: string
  vapiAssistantId?: string | null
  hasVoiceEnabled: boolean
  [key: string]: unknown
}

interface UniversalVoiceChatProps {
  assistantId: string
  assistant: VoiceEnabledAssistant | null
  onAssistantUpdate: (assistant: VoiceEnabledAssistant | null) => void
  onTranscriptUpdate?: (messages: { role: string; text: string; timestamp: string }[]) => void
  onVoiceChatStateChange?: (isActive: boolean) => void
  onEndVoiceChat?: (endVoiceFn: () => void) => void
  // Function to create VAPI assistant for this specific type
  createVapiAssistant: (data: {
    assistantId: string
    voiceId: string
    voiceProvider: string
    customInstructions?: string
  }) => Promise<{ success: boolean; assistantId?: string; error?: string }>
  // Default voice ID
  defaultVoiceId: string
  // Callback to get the sendUserEvent function
  onSendUserEventReady?: (sendUserEvent: (event: UserEvent) => void) => void
}

// User event types that can be sent to the assistant
export interface UserEvent {
  type: 'emoji_reaction'
  value: string // emoji character
  timestamp: string
  userName?: string // User's name from session
  userEmail?: string // User's email from session
}

export function UniversalVoiceChat({
  assistantId,
  assistant,
  onAssistantUpdate,
  onTranscriptUpdate,
  onVoiceChatStateChange,
  onEndVoiceChat,
  createVapiAssistant,
  defaultVoiceId,
  onSendUserEventReady
}: UniversalVoiceChatProps) {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isTalking, setIsTalking] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [transcript, setTranscript] = useState<{ role: string; text: string; timestamp: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [vapiAssistantId, setVapiAssistantId] = useState<string | null>(null)
  const [localAssistant, setLocalAssistant] = useState<VoiceEnabledAssistant | null>(null)

  // Function to send user events to the VAPI assistant
  const sendUserEvent = useCallback((event: UserEvent) => {
    // Add null/undefined checks to prevent the error
    if (!event || typeof event !== 'object') {
      console.log('Invalid event received:', event)
      return
    }
    
    if (!event.type || !event.value) {
      console.log('Event missing required properties:', event)
      return
    }
    
    // Require VAPI to be ready and talking for all events
    if (!vapi) {
      console.log('VAPI not ready, event ignored:', event)
      return
    }
    
    if (!isTalking) {
      console.log('VAPI not talking, event ignored:', event)
      return
    }

    try {
      // Build the message content with user information
      let messageContent = `[USER_ACTION: ${event.type} - ${event.value}]`
      
      // Add user information if available
      if (event.userName) {
        messageContent += ` [USER: ${event.userName}]`
      }
      
      // Send the event to VAPI using the add-message feature
      // This will trigger the assistant to respond to the user's action
      vapi.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: messageContent
        }
      })
      
      console.log('User event sent to VAPI:', event)
    } catch (error) {
      console.error('Failed to send user event to VAPI:', error)
    }
  }, [vapi, isTalking])

  // Create a safe wrapper function that can be called even before VAPI is ready
  const safeSendUserEvent = useCallback((event: UserEvent) => {
    if (!vapi) {
      console.log('VAPI not initialized yet, event ignored:', event)
      return
    }
    sendUserEvent(event)
  }, [vapi, sendUserEvent])

  // Expose the sendUserEvent function to parent components
  useEffect(() => {
    if (onSendUserEventReady && safeSendUserEvent && vapi) {
      // Only call the callback if the callback, function, and VAPI instance exist
      console.log('Exposing sendUserEvent function to parent component - VAPI ready')
      onSendUserEventReady(safeSendUserEvent)
    }
  }, [safeSendUserEvent, onSendUserEventReady, vapi])

  // Debug effect to track when sendUserEvent changes
  useEffect(() => {
    console.log('safeSendUserEvent function updated:', !!safeSendUserEvent)
  }, [safeSendUserEvent])

  // Notify parent of transcript updates
  useEffect(() => {
    if (onTranscriptUpdate) {
      onTranscriptUpdate(transcript)
    }
  }, [transcript, onTranscriptUpdate])

  // Notify parent of voice chat state changes
  useEffect(() => {
    if (onVoiceChatStateChange) {
      onVoiceChatStateChange(isTalking)
    }
  }, [isTalking, onVoiceChatStateChange])

  // Set local assistant when prop changes
  useEffect(() => {
    if (assistant) {
      setLocalAssistant(assistant)
    }
  }, [assistant])

  // Initialize VAPI
  useEffect(() => {
    const initializeVapi = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_VAPI_API_KEY
        if (!key) {
          setError("Public API key not found")
          return
        }
        
        const instance = new Vapi(key)
        setVapi(instance)

        // Event listeners
        instance.on("call-start", () => {
          setIsTalking(true)
          setIsConnecting(false)
          setError(null)
        })

        instance.on("call-end", () => {
          setIsTalking(false)
          setIsConnecting(false)
        })

        instance.on("message", (message) => {
          // Add safety checks to prevent errors
          if (message && typeof message === 'object' && message.type === "transcript" && message.transcript) {
            setTranscript((prev) => [...prev, {
              role: message.role || 'unknown',
              text: message.transcript,
              timestamp: new Date().toISOString()
            }])
          } else {
            console.log('Received invalid message from VAPI:', message)
          }
        })

        instance.on("error", (error) => {
          console.error("Vapi error:", error)
          let errorMessage = "Voice connection failed. Please check microphone permissions."
          
          if (error && typeof error === 'object') {
            if ('message' in error && error.message) {
              errorMessage = `Voice error: ${error.message}`
            } else if ('code' in error && error.code) {
              errorMessage = `Voice error code: ${error.code}`
            } else if ('type' in error && error.type) {
              errorMessage = `Voice error type: ${error.type}`
            }
          }
          
          setError(errorMessage)
          setIsTalking(false)
          setIsConnecting(false)
        })

      } catch (error) {
        console.error("Failed to initialize Vapi:", error)
        setError("Failed to initialize voice service")
      }
    }

    initializeVapi()
  }, [])

  // Set VAPI assistant ID when assistant changes
  useEffect(() => {
    const currentAssistant = localAssistant || assistant
    if (currentAssistant?.vapiAssistantId && currentAssistant?.hasVoiceEnabled) {
      setVapiAssistantId(currentAssistant.vapiAssistantId)
      setError(null)
    } else {
      setVapiAssistantId(null)
    }
  }, [localAssistant, assistant])

  const requestMicPermission = async () => {
    try {
      const permissions = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      
      if (permissions.state === 'granted') return true
      if (permissions.state === 'denied') {
        setError("Microphone access was denied. Please enable it in your browser settings and refresh the page.")
        return false
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      stream.getTracks().forEach(track => track.stop())
      
      setError(null)
      return true
      
    } catch (error: unknown) {
      console.error("Microphone permission error:", error)
      
      if (error instanceof Error) {
        const errorMessages = {
          'NotAllowedError': "Microphone access denied. Please click the microphone icon in your browser's address bar and allow access.",
          'NotFoundError': "No microphone found. Please connect a microphone and try again.",
          'NotReadableError': "Microphone is already in use by another application. Please close other apps using the microphone.",
          'SecurityError': "Microphone access blocked due to security restrictions. Please check your browser settings."
        }
        setError(errorMessages[error.name as keyof typeof errorMessages] || "Failed to access microphone. Please check your device and browser settings.")
      } else {
        setError("Failed to access microphone. Please check your device and browser settings.")
      }
      
      return false
    }
  }

  const startVoiceChat = async () => {
    if (!vapiAssistantId || !vapi) {
      setError("Voice service not ready or voice not enabled for this assistant.")
      return
    }

    if (!vapiAssistantId.trim() || vapiAssistantId.length < 10) {
      setError("Invalid VAPI assistant ID. Please check if voice is properly enabled.")
      return
    }

    // Additional validation for VAPI assistant ID format
    if (!/^[a-zA-Z0-9_-]+$/.test(vapiAssistantId)) {
      setError("Invalid VAPI assistant ID format. Please check if voice is properly enabled.")
      return
    }

    setIsConnecting(true)
    setError(null)
    
    const hasPermission = await requestMicPermission()
    
    if (hasPermission) {
      try {
        console.log("Starting VAPI call with VAPI assistant ID:", vapiAssistantId)
        vapi.start(vapiAssistantId)
      } catch (error) {
        console.error("Failed to start VAPI call:", error)
        setError("Failed to start voice chat. Please try again.")
        setIsConnecting(false)
      }
    } else {
      setIsConnecting(false)
    }
  }

  const endVoiceChat = useCallback(() => {
    if (vapi) vapi.stop()
  }, [vapi])

  // Pass the endVoiceChat function to parent when component mounts
  useEffect(() => {
    if (onEndVoiceChat) {
      onEndVoiceChat(endVoiceChat)
    }
  }, [onEndVoiceChat, endVoiceChat])

  const handleEnableVoice = async () => {
    if (!assistantId) {
      setError("Assistant ID not found")
      return
    }

    const currentAssistant = localAssistant || assistant
    if (currentAssistant?.hasVoiceEnabled && currentAssistant?.vapiAssistantId) {
      setVapiAssistantId(currentAssistant.vapiAssistantId)
      setError(null)
      console.log("Voice already enabled with VAPI ID:", currentAssistant.vapiAssistantId)
      return
    }

    try {
      setError(null)
      
      const result = await createVapiAssistant({
        assistantId: assistantId,
        voiceId: defaultVoiceId,
        voiceProvider: "vapi"
      })

      if (result.success && result.assistantId) {
        setVapiAssistantId(result.assistantId)
        const updatedAssistant = currentAssistant ?
          { ...currentAssistant, hasVoiceEnabled: true, vapiAssistantId: result.assistantId } :
          null
        setLocalAssistant(updatedAssistant)
        onAssistantUpdate(updatedAssistant)
        setError(null)
        console.log("Voice enabled successfully with VAPI ID:", result.assistantId)

        // Auto-start voice chat after enabling
        setTimeout(() => {
          if (vapi && result.assistantId) {
            startVoiceChat()
          }
        }, 500)
      } else {
        setError(result.error || "Failed to enable voice")
      }
    } catch (error) {
      console.error("Error enabling voice:", error)
      setError("Failed to enable voice. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      {error && (
        <div className="absolute top-4 left-4 right-4 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-xs text-center">{error}</p>
        </div>
      )}

      {/* Voice Control Button */}
      <div className="flex justify-center">
        {!isTalking && !isConnecting ? (
          <Button
            onClick={async () => {
              // If no VAPI assistant exists, create it first
              if (vapi && !vapiAssistantId) {
                await handleEnableVoice()
              } else {
                startVoiceChat()
              }
            }}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 text-sm"
            disabled={!vapi}
            size="sm"
          >
            🎤 Start Voice
          </Button>
        ) : isConnecting ? (
          <Button disabled className="bg-yellow-600 px-6 py-2 text-sm" size="sm">
            🔄 Connecting...
          </Button>
        ) : (
          <Button 
            onClick={endVoiceChat} 
            className="bg-red-600 hover:bg-red-700 px-6 py-2 text-sm"
            size="sm"
          >
            ⏹ Stop
          </Button>
        )}
      </div>


    </div>
  )
}
