'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { MicOff, VideoOff, Video } from 'lucide-react'

interface DraggableUserVideoProps {
  stream: MediaStream | null
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isGettingStream: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
}

export function DraggableUserVideo({
  stream,
  isVideoEnabled,
  isAudioEnabled,
  isGettingStream,
  videoRef,
}: DraggableUserVideoProps) {
  const VIDEO_H = 144
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      return { x: 16, y: window.innerHeight - VIDEO_H - 24 }
    }
    return { x: 16, y: 100 }
  })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = videoRef?.current
    if (el && stream) {
      el.srcObject = stream
      el.play().catch(() => {})
    }
  }, [stream, videoRef])

  useEffect(() => {
    return () => {
      const el = videoRef?.current
      if (el) el.srcObject = null
    }
  }, [videoRef])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('video')) return
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    e.preventDefault()
  }, [position])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || typeof window === 'undefined') return
    const newX = Math.max(0, Math.min(window.innerWidth - 260, e.clientX - dragStart.current.x))
    const newY = Math.max(0, Math.min(window.innerHeight - VIDEO_H, e.clientY - dragStart.current.y))
    setPosition({ x: newX, y: newY })
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      className="fixed z-50 cursor-move select-none shadow-xl rounded-lg border-2 border-primary overflow-hidden bg-black"
      style={{
        left: position.x,
        top: position.y,
        width: 256,
        height: VIDEO_H,
      }}
      onMouseDown={handleMouseDown}
      title="Drag to move - Your video"
    >
      <div className="relative w-full h-full">
        {stream && isVideoEnabled ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1] pointer-events-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
              {stream ? (
                <VideoOff className="h-10 w-10 text-muted-foreground mx-auto" />
              ) : (
                <Video className="h-10 w-10 text-muted-foreground mx-auto" />
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {isGettingStream ? 'Loading...' : stream ? 'Video Off' : 'Camera'}
              </p>
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Video className="h-3 w-3" />
          Your Video
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {!isAudioEnabled && (
            <span className="flex items-center gap-0.5 rounded bg-destructive/80 px-1.5 py-0.5 text-[10px] text-white">
              <MicOff className="h-2.5 w-2.5" />
              Muted
            </span>
          )}
          {!isVideoEnabled && stream && (
            <span className="flex items-center gap-0.5 rounded bg-destructive/80 px-1.5 py-0.5 text-[10px] text-white">
              <VideoOff className="h-2.5 w-2.5" />
              Off
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
