'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, Video, VideoOff, MessageSquare, Settings } from 'lucide-react'

interface MeetTestControlsProps {
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isChatOpen: boolean
  onToggleAudio: () => void
  onToggleVideo: () => void
  onToggleChat: () => void
  onShowSettings?: () => void
}

export function MeetTestControls({
  isAudioEnabled,
  isVideoEnabled,
  isChatOpen,
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onShowSettings
}: MeetTestControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-3 bg-background/95 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
        {/* Audio Toggle */}
        <Button
          onClick={onToggleAudio}
          variant={isAudioEnabled ? "default" : "destructive"}
          size="sm"
          className="rounded-full"
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
          className="rounded-full"
        >
          {isVideoEnabled ? (
            <Video className="h-4 w-4" />
          ) : (
            <VideoOff className="h-4 w-4" />
          )}
        </Button>

        {/* Chat Toggle */}
        <Button
          onClick={onToggleChat}
          variant={isChatOpen ? "default" : "outline"}
          size="sm"
          className="rounded-full"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>

        {/* Settings */}
        {onShowSettings && (
          <Button
            onClick={onShowSettings}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
