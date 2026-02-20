import { MicOff, VideoOff } from 'lucide-react'
import { LiveWaveform } from '../../ui/live-waveform'

interface VideoFeedProps {
  stream: MediaStream | null
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isUserSpeaking: boolean
  isGettingStream: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
  userTranscript?: string
  showUserTranscription?: boolean
  sttAvailable?: boolean | null
  ttsAvailable?: boolean | null
  /** When true, AI is speaking: user's live waveform is hidden. */
  isAISpeaking?: boolean
}

export function VideoFeed({
  stream,
  isVideoEnabled,
  isAudioEnabled,
  isGettingStream,
  videoRef,
  userTranscript,
  showUserTranscription,
  isAISpeaking = false,
}: VideoFeedProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
      {stream && isVideoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          controls={false}
          preload="metadata"
          className="h-full w-full object-cover scale-x-[-1]"
          onError={(e) => console.error('Video error:', e)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <div className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted-foreground/30 flex items-center justify-center border-2 border-muted-foreground/20">
              {stream ? (
                <VideoOff className="h-12 w-12 text-muted-foreground" />
              ) : (
                <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <p className="text-base font-medium text-muted-foreground mb-1">
              {isVideoEnabled ? "Starting camera..." : (stream ? "Video Off" : "Camera not available")}
            </p>
            {isGettingStream && (
              <p className="text-sm text-muted-foreground">Requesting media access...</p>
            )}
            {!isGettingStream && !stream && (
              <p className="text-sm text-muted-foreground">Use controls below to enable camera and microphone</p>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {!isAudioEnabled && (
          <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-white">
            <MicOff className="h-3 w-3" />
            <span>Muted</span>
          </div>
        )}
        {!isVideoEnabled && (
          <div className="flex items-center gap-1 rounded-full bg-destructive/80 px-2 py-1 text-xs text-white">
            <VideoOff className="h-3 w-3" />
            <span>Video Off</span>
          </div>
        )}
      </div>

      {!isAISpeaking && (
        <div className="absolute bottom-4 right-4 w-32 h-8">
          <LiveWaveform
            active={isAudioEnabled}
            mode="static"
            barWidth={2}
            barGap={1}
            barHeight={6}
            height={32}
            sensitivity={2}
            updateRate={60}
            barColor="#1f2937"
          />
        </div>
      )}

      {/* User Transcription Display */}
      {showUserTranscription && userTranscript && (
        <div className="absolute top-4 left-4 right-4">
          <div className="min-h-[60px] rounded-lg border-2 border-blue-300 bg-blue-50/90 backdrop-blur-sm p-3 shadow-lg">
            <div className="text-center w-full">
              <div className="text-base md:text-lg font-medium text-gray-800 leading-relaxed">
                {userTranscript}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
