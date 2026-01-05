import { Mic } from "lucide-react"

interface VoiceRecordingAnimationProps {
  isRecording: boolean
}

export function VoiceRecordingAnimation({ isRecording }: VoiceRecordingAnimationProps) {
  if (!isRecording) return null

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      {/* Animated Microphone Icon */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Mic className="w-8 h-8 text-red-600 animate-pulse" />
          <div className="absolute -inset-1 bg-red-400 rounded-full animate-ping opacity-20"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Recording Text */}
      <div className="text-center">
        <p className="text-sm font-medium text-red-700">Recording your voice...</p>
        <p className="text-xs text-red-600 mt-1">AI will refine your request when you stop recording</p>
      </div>

      {/* Sound Wave Animation */}
      <div className="flex items-end gap-1 h-8">
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0ms', height: '60%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '100ms', height: '80%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '200ms', height: '100%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '300ms', height: '80%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '400ms', height: '60%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '500ms', height: '40%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '600ms', height: '80%' }}></div>
        <div className="w-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '700ms', height: '60%' }}></div>
      </div>
    </div>
  )
}
