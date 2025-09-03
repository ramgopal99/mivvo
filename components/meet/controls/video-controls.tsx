"use client"

import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Video, VideoOff } from "lucide-react"

interface VideoControlsProps {
  isVideoEnabled: boolean
  toggleVideo: () => void
}

// Memoized Video Button Component with independent debouncing
export const VideoControls = memo(({ 
  isVideoEnabled, 
  toggleVideo 
}: VideoControlsProps) => {
  // Handle video toggle with immediate response
  const handleVideoToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleVideo()
  }, [toggleVideo])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isVideoEnabled ? "ghost" : "destructive"}
          size="lg"
          onClick={handleVideoToggle}
          onMouseDown={(e) => e.preventDefault()}
          className="h-12 w-12 cursor-pointer transition-all duration-150 ease-in-out select-none"
        >
          {isVideoEnabled ? (
            <Video className="h-6 w-6" />
          ) : (
            <VideoOff className="h-6 w-6" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isVideoEnabled ? "Turn off camera" : "Turn on camera"}
      </TooltipContent>
    </Tooltip>
  )
})

VideoControls.displayName = "VideoControls" 