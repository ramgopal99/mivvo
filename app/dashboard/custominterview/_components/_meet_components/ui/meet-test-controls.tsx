'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, Video, VideoOff, MessageSquare, Settings, Monitor } from 'lucide-react'

interface MeetTestControlsProps {
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isChatOpen: boolean
  onToggleAudio: () => void
  onToggleVideo: () => void
  /** When true, mic and video cannot be turned off (buttons disabled, always on). */
  lockMicAndVideo?: boolean
  /** When true, AI is speaking: mic button is yellow; hover shows tooltip. */
  isAISpeaking?: boolean
  onToggleChat?: () => void
  onShowSettings?: () => void
  showShareScreen?: boolean
  isScreenSharing?: boolean
  onToggleScreenShare?: () => void
}

export function MeetTestControls({
  isAudioEnabled,
  isVideoEnabled,
  isChatOpen,
  onToggleAudio,
  onToggleVideo,
  lockMicAndVideo = false,
  isAISpeaking = false,
  onToggleChat,
  onShowSettings,
  showShareScreen = true,
  isScreenSharing = false,
  onToggleScreenShare
}: MeetTestControlsProps) {
  const micButtonClass = isAudioEnabled && isAISpeaking
    ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
    : isAudioEnabled
      ? 'bg-black hover:bg-black/90 text-white'
      : ''
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-3 bg-background/95 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
        {/* Audio Toggle - yellow when AI speaking; hover shows tooltip */}
        <Button
          onClick={onToggleAudio}
          variant={isAudioEnabled ? "default" : "destructive"}
          size="sm"
          disabled={lockMicAndVideo}
          title={lockMicAndVideo ? 'Microphone must stay on' : isAISpeaking ? 'AI is speaking (listening paused)' : undefined}
          className={`rounded-full cursor-pointer ${micButtonClass} ${lockMicAndVideo ? 'opacity-100' : ''}`}
        >
          {isAudioEnabled ? (
            <Mic className="h-4 w-4" />
          ) : (
            <MicOff className="h-4 w-4" />
          )}
        </Button>

        {/* Video Toggle - disabled when lockMicAndVideo (always on) */}
        <Button
          onClick={onToggleVideo}
          variant={isVideoEnabled ? "default" : "destructive"}
          size="sm"
          disabled={lockMicAndVideo}
          title={lockMicAndVideo ? 'Camera must stay on' : undefined}
          className={`rounded-full cursor-pointer ${isVideoEnabled ? 'bg-black hover:bg-black/90 text-white' : ''} ${lockMicAndVideo ? 'opacity-100' : ''}`}
        >
          {isVideoEnabled ? (
            <Video className="h-4 w-4" />
          ) : (
            <VideoOff className="h-4 w-4" />
          )}
        </Button>

        {/* Share Screen - Only show if showShareScreen is true */}
        {showShareScreen && onToggleScreenShare && (
          <Button
            onClick={onToggleScreenShare}
            variant={isScreenSharing ? "default" : "outline"}
            size="sm"
            className={`rounded-full cursor-pointer ${isScreenSharing ? 'bg-black hover:bg-black/90 text-white' : ''}`}
          >
            <Monitor className="h-4 w-4" />
          </Button>
        )}

        {/* Chat Toggle - Only show if onToggleChat is provided */}
        {onToggleChat && (
          <Button
            onClick={onToggleChat}
            variant={isChatOpen ? "default" : "outline"}
            size="sm"
            className={`rounded-full cursor-pointer ${isChatOpen ? 'bg-black hover:bg-black/90 text-white' : ''}`}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}

        {/* Settings */}
        {onShowSettings && (
          <Button
            onClick={onShowSettings}
            variant="outline"
            size="sm"
            className="rounded-full cursor-pointer"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
