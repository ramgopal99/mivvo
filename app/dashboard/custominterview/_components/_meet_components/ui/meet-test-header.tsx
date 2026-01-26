/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Brain, Mic, MicOff, Code, Info } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { defaultUiConfig } from '../core/utils'
import { KnowYourPlatformDialog } from './know-your-platform-dialog'

interface MeetTestHeaderProps {
  interviewTitle?: string
  assistantName?: string
  assistantAvatar?: string
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
  isChatOpen?: boolean
}

export function MeetTestHeader({
  interviewTitle = 'Interview',
  assistantName = 'Mivvo',
  assistantAvatar,
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
  showInterviewStartDialog = false,
  isChatOpen = false
}: MeetTestHeaderProps) {
  const router = useRouter()
  const [showEndInterviewDialog, setShowEndInterviewDialog] = useState(false)

  const handleStopConversation = () => {
    onStopConversation?.()
    if (defaultUiConfig.redirectOnStop) {
      router.push('/dashboard/custominterview')
    }
    setShowEndInterviewDialog(false)
  }

  // Default time formatter if not provided
  const defaultFormatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const displayTime = formatTime ? formatTime(elapsedTime) : defaultFormatTime(elapsedTime)

  return (
    <div className={`absolute top-0 left-0 z-10 bg-background/95 backdrop-blur-sm border-b transition-all duration-300 ${isChatOpen ? 'right-[400px]' : 'right-0'}`}>
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
              <KnowYourPlatformDialog />
            </div>
            <p className="text-sm text-muted-foreground">AI Meeting Assistant</p>
          </div>
        </div>

        {/* Right side - Voice chat and call controls */}
        <div className="flex items-center gap-2">
          {/* Timer Display - Always visible */}
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-mono font-semibold shadow-lg border border-white/20">
            {displayTime}
            </div>

          {/* Voice Chat Controls */}
          {!showInterviewStartDialog && (
            <>
              {!isRegularInterviewActive ? (
                <Button
                  onClick={onStartConversation}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  size="sm"
                  title={isLoading ? 'Loading voice...' : 'Start Interview'}
                >
                  <Mic className="h-4 w-4" />
                  {isLoading ? 'Loading...' : 'Start Interview'}
                </Button>
              ) : (
                <>
                <Button
                    onClick={() => setShowEndInterviewDialog(true)}
                  variant="destructive"
                  size="sm"
                  className="gap-2 cursor-pointer"
                >
                  <MicOff className="h-4 w-4" />
                  End Interview
                </Button>
                  <AlertDialog open={showEndInterviewDialog} onOpenChange={setShowEndInterviewDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>End Interview?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to end this interview? This action cannot be undone and the interview session will be terminated.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleStopConversation}
                          className="bg-red-600 hover:bg-red-700 cursor-pointer"
                        >
                          End Interview
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </>
          )}


          {/* Coding Interview Button */}
          {onStartCodingInterview && onStopCodingInterview && (!defaultUiConfig.showCodingInterviewOnlyOnScreenShare || isScreenSharing) && (
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
        </div>
      </div>
    </div>
  )
}
