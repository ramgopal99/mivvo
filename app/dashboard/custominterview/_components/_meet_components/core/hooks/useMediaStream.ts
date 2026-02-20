import { useState, useRef, useEffect } from 'react'

interface UseMediaStreamReturn {
  stream: MediaStream | null
  isGettingStream: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  setIsAudioEnabled: (enabled: boolean) => void
  setIsVideoEnabled: (enabled: boolean) => void
}

export function useMediaStream(): UseMediaStreamReturn {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isGettingStream, setIsGettingStream] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isGettingStreamRef = useRef<boolean>(false)

  // Media stream management
  useEffect(() => {
    let mounted = true
    let currentStream: MediaStream | null = null

    const updateMediaStream = async () => {
      if (isGettingStreamRef.current) return

      isGettingStreamRef.current = true
      setIsGettingStream(true)

      try {
        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop())
          currentStream = null
        }

        if (isVideoEnabled || isAudioEnabled) {
          const constraints = {
            video: isVideoEnabled ? {
              width: { ideal: 640, max: 1280 },
              height: { ideal: 480, max: 720 },
              facingMode: 'user'
            } : false,
            audio: isAudioEnabled
          }

          const newStream = await navigator.mediaDevices.getUserMedia(constraints)

          if (mounted) {
            currentStream = newStream
            setStream(newStream)

            if (isVideoEnabled && videoRef.current) {
              videoRef.current.srcObject = newStream

              videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play().catch(error => {
                  console.error("Video play error:", error)
                })
              }
            }
          } else {
            newStream.getTracks().forEach(track => track.stop())
          }
        } else {
          if (videoRef.current) {
            videoRef.current.srcObject = null
          }
          if (mounted) {
            setStream(null)
          }
        }
      } catch (error) {
        console.error("Error accessing media devices:", error)
        if (mounted) {
          setStream(null)
        }
      } finally {
        if (mounted) {
          isGettingStreamRef.current = false
          setIsGettingStream(false)
        }
      }
    }

    updateMediaStream()

    return () => {
      mounted = false
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isVideoEnabled, isAudioEnabled])

  // Video playback
  useEffect(() => {
    if (stream && isVideoEnabled && videoRef.current) {
      videoRef.current.srcObject = stream

      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error("Video play error:", error)
          })
        }
      }

      playVideo()
      const timeoutId = setTimeout(playVideo, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [stream, isVideoEnabled])

  return {
    stream,
    isGettingStream,
    videoRef,
    isAudioEnabled,
    isVideoEnabled,
    setIsAudioEnabled,
    setIsVideoEnabled,
  }
}
