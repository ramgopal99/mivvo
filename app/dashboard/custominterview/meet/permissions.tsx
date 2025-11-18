/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, ArrowRight } from "lucide-react"
import { toast } from "sonner"

type PermissionStatus = 'granted' | 'denied' | 'prompt'

interface PermissionsState {
  microphone: PermissionStatus
  camera: PermissionStatus
}

interface PermissionCheckProps {
  interviewId: string
  onPermissionsGranted: () => void
}

export default function PermissionCheck({ interviewId: _interviewId, onPermissionsGranted }: PermissionCheckProps) {
  const router = useRouter()
  const [permissions, setPermissions] = useState<PermissionsState>({
    microphone: 'prompt',
    camera: 'prompt'
  })
  const [isChecking, setIsChecking] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)

  // Check current permission status
  const checkPermissions = async () => {
    try {
      const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName })

      setPermissions({
        microphone: micPermission.state as PermissionStatus,
        camera: cameraPermission.state as PermissionStatus
      })

      // If both permissions are granted, proceed automatically
      if (micPermission.state === 'granted' && cameraPermission.state === 'granted') {
        onPermissionsGranted()
      }
    } catch (error) {
      console.error('Error checking permissions:', error)
      // Fallback for browsers that don't support permissions API
      setPermissions({
        microphone: 'prompt',
        camera: 'prompt'
      })
    } finally {
      setIsChecking(false)
    }
  }

  // Request permissions
  const requestPermissions = async () => {
    setIsRequesting(true)

    try {
      // Request microphone and camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })

      streamRef.current = stream

      // Stop the stream immediately after getting permissions
      stream.getTracks().forEach(track => track.stop())

      toast.success("Permissions granted successfully!")
      setPermissions({
        microphone: 'granted',
        camera: 'granted'
      })

      // Proceed to the meeting
      onPermissionsGranted()

    } catch (error) {
      console.error('Error requesting permissions:', error)

      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error("Permissions denied. Please allow microphone and camera access to continue.")
          setPermissions({
            microphone: 'denied',
            camera: 'denied'
          })
        } else if (error.name === 'NotFoundError') {
          toast.error("No microphone or camera found. Please connect audio/video devices.")
        } else {
          toast.error("Failed to access microphone/camera. Please check your browser settings.")
        }
      }
    } finally {
      setIsRequesting(false)
    }
  }

  // Open browser settings helper
  const openBrowserSettings = () => {
    // Different browsers have different settings URLs
    const isChrome = navigator.userAgent.includes('Chrome')
    const isFirefox = navigator.userAgent.includes('Firefox')
    const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
    const isEdge = navigator.userAgent.includes('Edg')

    let settingsUrl = ''

    if (isChrome || isEdge) {
      settingsUrl = 'chrome://settings/content/camera'
    } else if (isFirefox) {
      settingsUrl = 'about:preferences#privacy'
    } else if (isSafari) {
      settingsUrl = 'about:blank' // Safari doesn't have a direct settings URL
    }

    if (settingsUrl) {
      window.open(settingsUrl, '_blank')
    }

    toast.info("Please enable microphone and camera permissions in your browser settings, then refresh this page.")
  }

  useEffect(() => {
    checkPermissions()

    // Cleanup stream on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPermissionBadgeVariant = (state: PermissionStatus) => {
    switch (state) {
      case 'granted':
        return 'default'
      case 'denied':
        return 'destructive'
      case 'prompt':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getPermissionText = (state: PermissionStatus) => {
    switch (state) {
      case 'granted':
        return 'Granted'
      case 'denied':
        return 'Denied'
      case 'prompt':
        return 'Not Asked'
      default:
        return 'Unknown'
    }
  }

  const allPermissionsGranted = permissions.microphone === 'granted' && permissions.camera === 'granted'

  if (isChecking) {
    return (
      <div className="bg-background flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Checking permissions...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-background flex items-center justify-center p-4 py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Video className="w-6 h-6" />
            Permission Check
          </CardTitle>
          <CardDescription>
            We need access to your microphone and camera for the interview
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Permission Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {permissions.microphone === 'granted' ? (
                  <Mic className="w-5 h-5 text-green-500" />
                ) : (
                  <MicOff className="w-5 h-5 text-gray-500" />
                )}
                <span className="font-medium">Microphone</span>
              </div>
              <Badge variant={getPermissionBadgeVariant(permissions.microphone)}>
                {getPermissionText(permissions.microphone)}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {permissions.camera === 'granted' ? (
                  <Video className="w-5 h-5 text-green-500" />
                ) : (
                  <VideoOff className="w-5 h-5 text-gray-500" />
                )}
                <span className="font-medium">Camera</span>
              </div>
              <Badge variant={getPermissionBadgeVariant(permissions.camera)}>
                {getPermissionText(permissions.camera)}
              </Badge>
            </div>
          </div>

          {/* Instructions */}
          {!allPermissionsGranted && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-2">
                How to enable permissions:
              </h4>
              <ul className="text-sm text-primary/80 space-y-1">
                <li>• Click &quot;Allow Access&quot; when prompted by your browser</li>
                <li>• Or click the camera/microphone icon in your address bar</li>
                <li>• Check your browser settings if permissions are blocked</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!allPermissionsGranted ? (
              <>
                <Button
                  onClick={requestPermissions}
                  disabled={isRequesting}
                  className="w-full cursor-pointer"
                >
                  {isRequesting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Requesting Access...
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Allow Access
                    </>
                  )}
                </Button>

                {permissions.microphone === 'denied' || permissions.camera === 'denied' ? (
                  <Button
                    variant="outline"
                    onClick={openBrowserSettings}
                    className="w-full cursor-pointer"
                  >
                    Open Browser Settings
                  </Button>
                ) : null}
              </>
            ) : (
              <Button onClick={onPermissionsGranted} className="w-full cursor-pointer">
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Interview
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="w-full cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
