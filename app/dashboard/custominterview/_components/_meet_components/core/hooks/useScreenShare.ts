import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { UiConfig } from '../../types'

interface UseScreenShareProps {
  uiConfig: UiConfig
}

/** When restricting, we only set isScreenSharing true for entire screen (monitor/screen). So user can only "go to" interview when they chose entire screen. */
export function useScreenShare({ uiConfig }: UseScreenShareProps) {
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [showScreenShareDialog, setShowScreenShareDialog] = useState(false)
  const [displaySurface, setDisplaySurface] = useState<string | null>(null)

  const startScreenShare = async () => {
    try {
      const displayMediaOptions: DisplayMediaStreamOptions = {
        video: uiConfig.screenShareRestrictToScreen
          ? { displaySurface: 'monitor' as ConstrainDOMString }
          : true,
        audio: false
      }

      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      const videoTrack = stream.getVideoTracks()[0]

      await new Promise(resolve => setTimeout(resolve, 150))

      const settings = videoTrack.getSettings()
      const displaySurface = (settings as MediaTrackSettings & { displaySurface?: string }).displaySurface

      if (uiConfig.screenShareRestrictToScreen) {
        const isEntireScreen = displaySurface === 'monitor' || displaySurface === 'screen'
        if (!isEntireScreen) {
          stream.getTracks().forEach(track => track.stop())
          toast.error(uiConfig.screenShareRestrictionErrorMessage)
          return
        }
      }

      setScreenStream(stream)
      setIsScreenSharing(true)
      setDisplaySurface(displaySurface ?? null)
      toast.success(uiConfig.screenShareSuccessMessage)
      setShowScreenShareDialog(true)

      stream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare()
      })
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        toast.error('Screen sharing was cancelled or denied. Please try again and allow access.')
        return
      }

      console.error('Error starting screen share:', error)
      toast.error('Failed to start screen sharing. Please try again.')
    }
  }

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop())
      setScreenStream(null)
    }
    setIsScreenSharing(false)
    setDisplaySurface(null)
  }

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare()
    } else {
      startScreenShare()
    }
  }

  // Screen share cleanup
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [screenStream])

  return {
    isScreenSharing,
    screenStream,
    showScreenShareDialog,
    setShowScreenShareDialog,
    toggleScreenShare,
    displaySurface, // 'monitor' | 'screen' when restricting and accepted; only then do we show interview
  }
}
