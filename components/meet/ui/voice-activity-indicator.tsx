"use client"

import { Mic } from "lucide-react"

interface VoiceActivityIndicatorProps {
  isAudioEnabled: boolean
  isSpeaking: boolean
  className?: string
}

export function VoiceActivityIndicator({ 
  isAudioEnabled, 
  isSpeaking, 
  className = "" 
}: VoiceActivityIndicatorProps) {
  if (!isAudioEnabled || !isSpeaking) {
    return null
  }

  return (
    <div className={`flex items-center gap-1 rounded-full bg-green-500/80 px-2 py-1 text-xs text-white ${className}`}>
      <div className="flex items-center gap-1">
        <Mic className="h-3 w-3" />
        <div className="flex items-center gap-0.5">
          {/* Animated dots */}
          <div 
            className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
      <span>Speaking</span>
    </div>
  )
}
