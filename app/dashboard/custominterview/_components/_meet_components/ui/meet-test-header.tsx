/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Brain, PhoneOff, Mic, MicOff, Code, Info } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { UI_CONFIG } from '../config'
import Image from 'next/image'

interface MeetTestHeaderProps {
  interviewTitle?: string
  assistantName?: string
  assistantAvatar?: string
  onEndCall?: () => void
  isConversationMode?: boolean
  isLoading?: boolean
  onStartConversation?: () => void
  onStopConversation?: () => void
  hasTranscriptData?: boolean
  elapsedTime?: number
  isTimerRunning?: boolean
  formatTime?: (seconds: number) => string
  onStartCodingInterview?: () => void
  onStopCodingInterview?: () => void
  isCodingInterviewActive?: boolean
  isRegularInterviewActive?: boolean
  isScreenSharing?: boolean
  showInterviewStartDialog?: boolean
}

export function MeetTestHeader({
  interviewTitle = 'Interview',
  assistantName = 'Mivvo',
  assistantAvatar,
  onEndCall,
  isConversationMode = false,
  isLoading = false,
  onStartConversation,
  onStopConversation,
  hasTranscriptData = false,
  elapsedTime = 0,
  isTimerRunning = false,
  formatTime,
  onStartCodingInterview,
  onStopCodingInterview,
  isCodingInterviewActive = false,
  isRegularInterviewActive = false,
  isScreenSharing = false,
  showInterviewStartDialog = false
}: MeetTestHeaderProps) {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)

  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Assistant info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={assistantAvatar} />
            <AvatarFallback>
              <Brain className="h-5 w-5 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">{interviewTitle}</h1>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-muted"
                onClick={() => setIsInfoDialogOpen(true)}
              >
                <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            </div>
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
          {!showInterviewStartDialog && (
            <>
              {!isRegularInterviewActive ? (
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
            </>
          )}


          {/* Coding Interview Button */}
          {onStartCodingInterview && onStopCodingInterview && (!UI_CONFIG.showCodingInterviewOnlyOnScreenShare || isScreenSharing) && (
            <Button
              onClick={isCodingInterviewActive ? onStopCodingInterview : onStartCodingInterview}
              variant={isCodingInterviewActive ? "destructive" : "outline"}
              size="sm"
              className={`gap-2 cursor-pointer ${
                isCodingInterviewActive
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Code className="h-4 w-4" />
              {isCodingInterviewActive ? "Stop Coding" : "Coding Interview"}
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

      {/* Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Know Your Platform</DialogTitle>
            <DialogDescription>
              Platform information and features
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center mt-4">
            <Image
              src="/knowyourplatform.png"
              alt="Know Your Platform"
              width={1200}
              height={900}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
