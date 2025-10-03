'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Brain, Phone, PhoneOff, Mic, MicOff, BarChart3 } from 'lucide-react'

interface MeetTestHeaderProps {
  assistantName?: string
  assistantAvatar?: string
  onEndCall?: () => void
  isConversationMode?: boolean
  isLoading?: boolean
  onStartConversation?: () => void
  onStopConversation?: () => void
  onAnalyzeInterview?: () => void
  hasTranscriptData?: boolean
  elapsedTime?: number
  isTimerRunning?: boolean
  formatTime?: (seconds: number) => string
}

export function MeetTestHeader({
  assistantName = 'AI Assistant',
  assistantAvatar,
  onEndCall,
  isConversationMode = false,
  isLoading = false,
  onStartConversation,
  onStopConversation,
  onAnalyzeInterview,
  hasTranscriptData = false,
  elapsedTime = 0,
  isTimerRunning = false,
  formatTime
}: MeetTestHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Assistant info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={assistantAvatar} />
            <AvatarFallback>
              <Brain className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">{assistantName}</h1>
            <p className="text-sm text-muted-foreground">AI Meeting Assistant</p>
          </div>
        </div>

        {/* Right side - Voice chat and call controls */}
        <div className="flex items-center gap-2">
          {/* Timer Display */}
          {isTimerRunning && formatTime && (
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono font-semibold shadow-lg border border-white/20">
              {formatTime(elapsedTime)}
            </div>
          )}

          {/* Voice Chat Controls */}
          {!isConversationMode ? (
            <Button
              onClick={onStartConversation}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 gap-2 cursor-pointer"
              size="sm"
            >
              <Mic className="h-4 w-4" />
              Start Voice Chat
            </Button>
          ) : (
            <Button
              onClick={onStopConversation}
              variant="destructive"
              size="sm"
              className="gap-2 cursor-pointer"
            >
              <MicOff className="h-4 w-4" />
              Stop Chat
            </Button>
          )}

          {/* Analyze Interview Button - Only show when not in conversation mode and has transcript data */}
          {!isConversationMode && hasTranscriptData && onAnalyzeInterview && (
            <Button
              onClick={onAnalyzeInterview}
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4" />
              Analyze Interview
            </Button>
          )}
          
          {/* End Call Button */}
          <Button
            onClick={onEndCall}
            variant="destructive"
            size="sm"
            className="gap-2 cursor-pointer"
          >
            <PhoneOff className="h-4 w-4" />
            End Call
          </Button>
        </div>
      </div>
    </div>
  )
}
