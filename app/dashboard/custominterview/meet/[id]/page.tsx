"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MeetTestRoom } from '@/app/dashboard/custominterview/_components/_meet_components/core'
import { DEFAULT_CONFIGS } from '@/app/dashboard/custominterview/_components/_meet_components/config'
import { InterviewData } from '@/app/dashboard/custominterview/_components/InterviewCard'
import { fetchInterviewById } from '../../actions'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Mic, Video } from 'lucide-react'

// Extended interface for API response data
interface ExtendedInterviewData extends InterviewData {
  interviewType?: string
}


export default function CustomInterviewMeetPage() {
  const params = useParams()
  const router = useRouter()
  const [interview, setInterview] = useState<ExtendedInterviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [uiConfig, setUiConfig] = useState(DEFAULT_CONFIGS.uiConfig)

  // Permission check states
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [permissionChecked, setPermissionChecked] = useState(false)
  const [hasVideoPermission, setHasVideoPermission] = useState(false)
  const [hasAudioPermission, setHasAudioPermission] = useState(false)
  const [checkingPermissions, setCheckingPermissions] = useState(false)

  // Get interview ID from params - handle potential undefined
  const interviewId = Array.isArray(params.id) ? params.id[0] : params.id

  console.log('Meet page params:', params)
  console.log('Extracted interviewId:', interviewId)

  useEffect(() => {
    if (!interviewId || interviewId === 'null' || interviewId === 'undefined') {
      console.error('Invalid interview ID:', interviewId)
      router.push('/dashboard/custominterview')
      return
    }

    const loadInterview = async () => {
      try {
        console.log('Loading interview with ID:', interviewId)

        // Fetch interview data using the action
        const interviewData = await fetchInterviewById(interviewId)

        if (!interviewData) {
          console.error('Interview not found for ID:', interviewId)
          router.push('/dashboard/custominterview')
          return
        }

        setInterview(interviewData)

        // Greeting will be generated dynamically in MeetTestRoom based on interview data
        // No need to pre-generate here as MeetTestRoom handles it

        // Configure UI based on screenShare setting from database
        setUiConfig(prev => ({
          ...prev,
          showShareScreen: interviewData.screenShareEnabled, // Only show share screen button if enabled for this interview
          showCodeButtonOnlyOnScreenShare: true, // Code button only shows when actually screen sharing (not just enabled)
          showCodingInterviewOnlyOnScreenShare: true // Coding interview only shows when actually screen sharing (not just enabled)
        }))

      } catch (error) {
        console.error('Error loading interview:', error)
        router.push('/dashboard/custominterview')
      } finally {
        setLoading(false)
      }
    }

    if (interviewId) {
      loadInterview()
    }
  }, [interviewId, router])

  // Check permissions after interview is loaded
  useEffect(() => {
    if (interview && !loading && !permissionChecked) {
      checkPermissions()
    }
  }, [interview, loading, permissionChecked])

  const handleEndCall = () => {
    // Disable redirection for testing
    // router.push('/dashboard/custominterview')
  }

  // Check video and microphone permissions
  const checkPermissions = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices not supported')
      setShowPermissionDialog(true)
      setPermissionChecked(true)
      return
    }

    setCheckingPermissions(true)

    try {
      // Check video permission
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setHasVideoPermission(true)
      videoStream.getTracks().forEach(track => track.stop())

      // Check audio permission
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setHasAudioPermission(true)
      audioStream.getTracks().forEach(track => track.stop())

      setPermissionChecked(true)
    } catch (error) {
      console.error('Permission check failed:', error)
      setPermissionChecked(true)

      // Show dialog if permissions are denied
      setShowPermissionDialog(true)
    } finally {
      setCheckingPermissions(false)
    }
  }

  // Request permissions when user clicks enable
  const requestPermissions = async () => {
    setCheckingPermissions(true)

    try {
      // Request both video and audio permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      setHasVideoPermission(true)
      setHasAudioPermission(true)
      setShowPermissionDialog(false)

      // Stop the test stream
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Failed to get permissions:', error)
      // Keep dialog open if permissions are still denied
      setHasVideoPermission(false)
      setHasAudioPermission(false)
    } finally {
      setCheckingPermissions(false)
    }
  }

  // Handle permission denial - redirect back
  const handlePermissionDenied = () => {
    router.push('/dashboard/custominterview')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <div className="text-center text-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading interview...</p>
        </div>
      </div>
    )
  }

  if (!interview) {
    return (
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <div className="text-center text-gray-900">
          <p className="mb-4">Interview not found</p>
          <button
            onClick={() => router.push('/dashboard/custominterview')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Interviews
          </button>
        </div>
      </div>
    )
  }

  // Show permission dialog if permissions are not granted
  if (showPermissionDialog || !permissionChecked) {
    return (
      <>
        <div className="flex items-center justify-center h-screen overflow-hidden bg-gray-50">
          <div className="text-center text-gray-900">
            {checkingPermissions ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Checking camera and microphone permissions...</p>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading interview...</p>
              </>
            )}
          </div>
        </div>

        <Dialog open={showPermissionDialog} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-600" />
                <Mic className="h-5 w-5 text-blue-600" />
                Camera & Microphone Required
              </DialogTitle>
              <DialogDescription className="text-left">
                To participate in this interview, you need to allow access to your camera and microphone.
                <br /><br />
                {!hasVideoPermission && !hasAudioPermission ? (
                  <span>Both camera and microphone access are required.</span>
                ) : !hasVideoPermission ? (
                  <span>Camera access is required for video interviews.</span>
                ) : !hasAudioPermission ? (
                  <span>Microphone access is required for audio communication.</span>
                ) : null}
                <br /><br />
                Please click &quot;Enable&quot; to grant permissions and continue with the interview.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handlePermissionDenied}
                disabled={checkingPermissions}
              >
                Cancel Interview
              </Button>
              <Button
                onClick={requestPermissions}
                disabled={checkingPermissions}
              >
                {checkingPermissions ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enabling...
                  </>
                ) : (
                  'Enable Camera & Mic'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <MeetTestRoom
      interviewTitle={interview.title}
      assistantName={"Mivvo"}
      assistantAvatar={siteConfig.logo}
      onEndCall={handleEndCall}
      voiceConfig={DEFAULT_CONFIGS.voiceConfig}
      uiConfig={uiConfig}
      codingVoiceChatConfig={DEFAULT_CONFIGS.codingVoiceChatConfig}
      codingVoiceChatMessages={DEFAULT_CONFIGS.codingVoiceChatMessages}
      codingQuestionDisplay={DEFAULT_CONFIGS.codingQuestionDisplay}
      interviewData={{
        ...interview,
        customPrompt: interview?.prompts?.find(p => p.isActive)?.promptText || "",
        jd: interview.jd,
        interviewType: interview.interviewType
      }}
    />
  )
}
