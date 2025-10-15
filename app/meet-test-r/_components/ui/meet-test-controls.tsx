'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, Video, VideoOff, MessageSquare, Settings, Monitor } from 'lucide-react'

interface MeetTestControlsProps {
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isChatOpen: boolean
  onToggleAudio: () => void
  onToggleVideo: () => void
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
  onToggleChat,
  onShowSettings,
  showShareScreen = true,
  isScreenSharing = false,
  onToggleScreenShare
}: MeetTestControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-3 bg-background/95 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
        {/* Audio Toggle */}
        <Button
          onClick={onToggleAudio}
          variant={isAudioEnabled ? "default" : "destructive"}
          size="sm"
          className={`rounded-full cursor-pointer ${isAudioEnabled ? 'bg-black hover:bg-black/90 text-white' : ''}`}
        >
          {isAudioEnabled ? (
            <Mic className="h-4 w-4" />
          ) : (
            <MicOff className="h-4 w-4" />
          )}
        </Button>

        {/* Video Toggle */}
        <Button
          onClick={onToggleVideo}
          variant={isVideoEnabled ? "default" : "destructive"}
          size="sm"
          className={`rounded-full cursor-pointer ${isVideoEnabled ? 'bg-black hover:bg-black/90 text-white' : ''}`}
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
