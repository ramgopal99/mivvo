"use client"

import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mic, MicOff, ChevronUp } from "lucide-react"
import { SoundLevelMeter } from "./sound-level-meter"

interface AudioControlsProps {
  isAudioEnabled: boolean
  toggleAudio: () => void
  showMicSettings: boolean
  setShowMicSettings: (show: boolean) => void
}

// Memoized Audio Button Component with independent debouncing
export const AudioControls = memo(({ 
  isAudioEnabled, 
  toggleAudio, 
  showMicSettings, 
  setShowMicSettings 
}: AudioControlsProps) => {
  // Handle audio toggle with immediate response
  const handleAudioToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleAudio()
  }, [toggleAudio])

  return (
    <div className="relative">
      <DropdownMenu open={showMicSettings} onOpenChange={setShowMicSettings}>
        <div className="flex items-center relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isAudioEnabled ? "ghost" : "destructive"}
                size="lg"
                onClick={handleAudioToggle}
                onMouseDown={(e) => e.preventDefault()}
                className="h-12 w-10 rounded-r-none cursor-pointer hover:bg-accent/50 transition-all duration-150 ease-in-out relative select-none"
              >
                {isAudioEnabled ? (
                  <Mic className="h-6 w-6" />
                ) : (
                  <MicOff className="h-6 w-6" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">
                <div>{isAudioEnabled ? "Mute microphone" : "Unmute microphone"}</div>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenuTrigger asChild>
            <Button
              variant={isAudioEnabled ? "ghost" : "destructive"}
              size="lg"
              className="h-12 w-6 rounded-l-none border-l border-l-border/50 cursor-pointer hover:bg-accent/50 transition-all duration-150 ease-in-out"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        
        <DropdownMenuContent 
          align="center" 
          side="top" 
          className="w-80 mb-4 p-0 border border-border/50 shadow-xl bg-background/95 backdrop-blur-sm"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <Mic className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold">Microphone Settings</div>
            </div>
            
            <SoundLevelMeter />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
})

AudioControls.displayName = "AudioControls" 