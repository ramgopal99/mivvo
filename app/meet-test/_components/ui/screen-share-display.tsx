'use client'

import { useRef, useEffect } from 'react'

interface ScreenShareDisplayProps {
  stream: MediaStream | null
  isVisible: boolean
}

export function ScreenShareDisplay({ stream, isVisible }: ScreenShareDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch((error) => {
          // Handle permission/playback errors gracefully
          if (error.name === 'NotAllowedError') {
            console.log('Screen sharing playback cancelled by user')
          } else {
            console.error('Error playing screen share video:', error)
          }
        })
      } else {
        // Clear the video source when stream is null
        videoRef.current.srcObject = null
      }
    }
  }, [stream])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  if (!isVisible || !stream) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-64 h-36 bg-black rounded-lg border-2 border-primary shadow-lg object-contain"
          muted
          autoPlay
          playsInline
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Screen Sharing
        </div>
      </div>
    </div>
  )
}
