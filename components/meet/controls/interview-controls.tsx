"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  PhoneOff,
  MessageCircle,
  MoreVertical,
  Smile,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMeetRoom } from "../../providers/meet-room-provider"
import { useIsMobile } from "@/hooks/use-mobile"

import { EmojiReaction } from "./emoji-reaction"
import { AudioControls } from "./audio-controls"
import { VideoControls } from "./video-controls"

interface InterviewControlsProps {
  onEndVoiceChat?: () => void
  sendUserEvent?: (event: { 
    type: 'emoji_reaction'
    value: string
    timestamp: string
    userName?: string
    userEmail?: string
  }) => void
  session?: {
    user?: {
      name?: string | null
      email?: string | null
    }
  }
}



// Memoized Emoji Reactions Bar
const EmojiReactionsBar = memo(({ 
  showEmojis, 
  onReaction,
  onClose
}: {
  showEmojis: boolean
  onReaction: (emoji: string) => void
  onClose: () => void
}) => {
  if (!showEmojis) return null
  
  return (
    <div className="flex items-center gap-3 rounded-full bg-background/90 p-4 shadow-lg border">
      <EmojiReaction emoji="💖" onReaction={() => onReaction("💖")} />
      <EmojiReaction emoji="👍" onReaction={() => onReaction("👍")} />
      <EmojiReaction emoji="🎉" onReaction={() => onReaction("🎉")} />
      <EmojiReaction emoji="👏" onReaction={() => onReaction("👏")} />
      <EmojiReaction emoji="😂" onReaction={() => onReaction("😂")} />
      <EmojiReaction emoji="😮" onReaction={() => onReaction("😮")} />
      <EmojiReaction emoji="😢" onReaction={() => onReaction("😢")} />
      <EmojiReaction emoji="🤔" onReaction={() => onReaction("🤔")} />
      <EmojiReaction emoji="👎" onReaction={() => onReaction("👎")} />
      
      {/* Close button */}
      <Separator orientation="vertical" className="h-8 mx-1" />
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
})

EmojiReactionsBar.displayName = "EmojiReactionsBar"

export function InterviewControls({ onEndVoiceChat, sendUserEvent, session }: InterviewControlsProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [showEmojis, setShowEmojis] = useState(false)
  const [showMicSettings, setShowMicSettings] = useState(false)
  
  const {
    isAudioEnabled,
    isVideoEnabled,
    isChatOpen,
    toggleAudio,
    toggleVideo,
    toggleChat,
    endSession
  } = useMeetRoom()

  const handleEndSession = useCallback(() => {
    // End voice chat if it's active
    onEndVoiceChat?.()
    // End the session
    endSession()
    router.push("/dashboard")
  }, [endSession, router, onEndVoiceChat])

  const handleEmojiReaction = useCallback((emoji: string) => {
    console.log('Emoji reaction triggered:', emoji)

    // Send emoji reaction event to the assistant
    if (sendUserEvent) {
      console.log('Sending emoji reaction event:', emoji)
      try {
        sendUserEvent({
          type: 'emoji_reaction',
          value: emoji,
          timestamp: new Date().toISOString(),
          userName: session?.user?.name || undefined,
          userEmail: session?.user?.email || undefined
        })
        // Don't auto-close emoji panel - let user close manually
      } catch (error) {
        console.error('Error sending emoji reaction:', error)
      }
    } else {
      console.log('sendUserEvent not available for emoji reaction:', emoji)
    }
  }, [sendUserEvent, session?.user?.name, session?.user?.email])

  const handleCloseEmojis = useCallback(() => {
    setShowEmojis(false)
  }, [])

  const toggleEmojiPanel = useCallback(() => {
    setShowEmojis(prev => !prev)
  }, [])

  // Debug effect to track sendUserEvent prop changes
  useEffect(() => {
    console.log('InterviewControls: sendUserEvent prop updated:', !!sendUserEvent, typeof sendUserEvent)
    console.log('InterviewControls: session data:', session?.user?.name, session?.user?.email)
  }, [sendUserEvent, session?.user?.name, session?.user?.email])

  // Core controls that are always visible
  const CoreControls = memo(() => (
    <>
      {/* Audio control with mic settings */}
      <AudioControls
        isAudioEnabled={isAudioEnabled}
        toggleAudio={toggleAudio}
        showMicSettings={showMicSettings}
        setShowMicSettings={setShowMicSettings}
      />

      {/* Video control */}
      <VideoControls
        isVideoEnabled={isVideoEnabled}
        toggleVideo={toggleVideo}
      />

      {/* Emoji toggle button */}
      <Button
        variant={showEmojis ? "secondary" : "ghost"}
        size="lg"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleEmojiPanel()
        }}
        onMouseDown={(e) => e.preventDefault()}
        className="h-12 w-12 cursor-pointer transition-all duration-150 ease-in-out select-none"
      >
        <Smile className="h-6 w-6" />
      </Button>

      {/* End session */}
      <Button
        variant="destructive"
        size="lg"
        onClick={handleEndSession}
        className="h-12 w-12 cursor-pointer transition-all duration-150 ease-in-out"
      >
        <PhoneOff className="h-6 w-6" />
      </Button>
    </>
  ))

  CoreControls.displayName = "CoreControls"

  // Additional controls that may be in a dropdown on mobile
  const AdditionalControls = memo(() => (
    <>
      {/* Chat */}
      <Button
        variant={isChatOpen ? "secondary" : "ghost"}
        size="lg"
        onClick={toggleChat}
        className="h-12 w-12 cursor-pointer transition-all duration-150 ease-in-out"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  ))

  AdditionalControls.displayName = "AdditionalControls"

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 p-4 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
      {/* Emoji Reactions Bar */}
      <EmojiReactionsBar 
        showEmojis={showEmojis} 
        onReaction={handleEmojiReaction}
        onClose={handleCloseEmojis}
      />

      {/* Main Controls */}
      <div className="flex items-center gap-3 rounded-md bg-background p-4 shadow-lg border border-gray-400 will-change-auto backface-visibility-hidden transform-gpu">
        <CoreControls />

        {isMobile ? (
          <>
            <Separator orientation="vertical" className="mx-3 h-8" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="h-12 w-12 cursor-pointer transition-all duration-150 ease-in-out"
                >
                  <MoreVertical className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={toggleChat} className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <AdditionalControls />
        )}
      </div>
    </div>
  )
}
