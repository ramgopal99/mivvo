"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { MeetTestRoom } from '@/app/dashboard/custominterview/_components/_meet_components/core'
import { defaultVoiceConfig, defaultUiConfig } from '@/app/dashboard/custominterview/_components/_meet_components/core/utils'
import { getInterviewById } from '@/app/dashboard/custominterview/data'
import { InterviewData } from '@/app/dashboard/custominterview/_components/InterviewCard'
import { siteConfig } from '@/config/site'
import { getAuthHeaders } from '@/lib/auth-utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Mic, Video } from 'lucide-react'
import { InterviewDebugPanel } from '../_components/InterviewDebugPanel'

export default function CustomInterviewMeetPage() {
  const params = useParams()
  const interviewId = params?.id as string

  const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
  const [loading, setLoading] = useState(true)
  // Simple mode (Templates/Custom JD): hide share screen. Coding Round: show share screen and require it first.
  // useFullScreenInMeet: false for dev, true for testing (from siteConfig)
  const [uiConfig, setUiConfig] = useState(() => ({
    ...defaultUiConfig,
    showShareScreen: false, // set from interviewData once loaded
    useFullScreenInMeet: siteConfig.useFullScreenInMeet ?? false,
  }))

  // Permission check states
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [permissionChecked, setPermissionChecked] = useState(false)
  const [hasVideoPermission, setHasVideoPermission] = useState(false)
  const [hasAudioPermission, setHasAudioPermission] = useState(false)
  const [checkingPermissions, setCheckingPermissions] = useState(false)
  
  // STT and TTS availability check states
  const [sttAvailable, setSttAvailable] = useState<boolean | null>(null)
  const [ttsAvailable, setTtsAvailable] = useState<boolean | null>(null)
  const [showCapabilityDialog, setShowCapabilityDialog] = useState(false)
  const [isFullScreenPromptVisible, setIsFullScreenPromptVisible] = useState(false)

  // Fetch interview data from database
  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId) {
        setLoading(false)
        return
      }

      try {
        const data = await getInterviewById(interviewId)
        if (data) {
          setInterviewData(data)
          // Coding Round interviews: show share screen. Simple mode (Templates/Custom JD): hide it.
          setUiConfig(prev => ({ ...prev, showShareScreen: data.screenShareEnabled === true }))
        }
      } catch (error) {
        console.error('Error fetching interview:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [interviewId])

  const handleBeforeStartInterview = useCallback(async () => {
    if (!interviewId) return
    const res = await fetch('/api/custom-interviews/start-attempt', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ interviewId }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Failed to start attempt')
    }
  }, [interviewId])

  const handleEndCallWithPayload = useCallback(
    async (payload: {
      durationSeconds: number
      transcript: { role: string; text: string; timestamp: string }[]
      messages: { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]
    }) => {
      if (!interviewId) return
      const headers = getAuthHeaders()
      const timeUsedMinutes = Math.max(1, Math.ceil(payload.durationSeconds / 60))
      try {
        await fetch('/api/custom-interviews/save-conversation', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            interviewId,
            transcript: payload.transcript,
            messages: payload.messages,
            duration: payload.durationSeconds,
            createdAt: new Date().toISOString(),
          }),
        })
      } catch (e) {
        console.error('Failed to save conversation:', e)
      }
      try {
        await fetch('/api/custom-interviews/update-time-usage', {
          method: 'POST',
          headers,
          body: JSON.stringify({ interviewId, timeUsedMinutes }),
        })
      } catch (e) {
        console.error('Failed to update time usage:', e)
      }
      // Run AI analysis when enabled and we have conversation to analyze (skipped in test mode)
      const runAnalysis =
        !siteConfig.customInterviewTestMode &&
        payload.transcript.length > 0
      if (runAnalysis) {
        try {
          const conversationForAnalysis = payload.transcript.map((m) => ({ role: m.role, text: m.text }))
          const topic = interviewData?.title || interviewData?.jd || ''
          const analysisRes = await fetch('/api/analysis', {
            method: 'POST',
            headers,
            body: JSON.stringify({ conversation: conversationForAnalysis, topic }),
          })
          if (analysisRes.ok) {
            const analysis = await analysisRes.json()
            await fetch('/api/custom-interviews/save-analysis', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                interviewId,
                analysis,
                duration: payload.durationSeconds,
              }),
            })
          }
        } catch (e) {
          console.error('Failed to run or save analysis:', e)
        }
      }
      if (!siteConfig.customInterviewTestMode) {
        window.location.href = '/dashboard/custominterview'
      }
    },
    [interviewId, interviewData]
  )

  const handleEndCall = useCallback(() => {
    // When no payload (user left without starting), redirect after a short delay (skip in test mode)
    if (!siteConfig.customInterviewTestMode) {
      setTimeout(() => {
        window.location.href = '/dashboard/custominterview'
      }, 100)
    }
  }, [])

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

  // Handle permission denial
  const handlePermissionDenied = () => {
    setShowPermissionDialog(false)
  }

  // Check permissions on component mount
  useEffect(() => {
    if (!permissionChecked) {
      checkPermissions()
    }
  }, [permissionChecked])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen overflow-hidden bg-gray-50">
        <div className="text-center text-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading interview...</p>
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
                <p>Loading...</p>
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
                To participate in this meeting, you need to allow access to your camera and microphone.
                <br /><br />
                {!hasVideoPermission && !hasAudioPermission ? (
                  <span>Both camera and microphone access are required.</span>
                ) : !hasVideoPermission ? (
                  <span>Camera access is required for video meetings.</span>
                ) : !hasAudioPermission ? (
                  <span>Microphone access is required for audio communication.</span>
                ) : null}
                <br /><br />
                Please click &quot;Enable&quot; to grant permissions and continue.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handlePermissionDenied}
                disabled={checkingPermissions}
              >
                Cancel
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

  // Prepare assistant details from interview data
  const assistantDetails = interviewData ? {
    id: interviewData.id || 'meet-assistant',
    name: interviewData.title || 'AI Assistant',
    avatar: siteConfig.logo,
    role: 'Interviewer',
    industry: interviewData.company || 'General',
    experienceLevel: 'Expert',
    hasVoiceEnabled: true
  } : undefined

  // Extract stored prompt from database (prioritize active prompt from DB)
  // The prompt stored in DB should always be used, not regenerated
  const storedPrompt = interviewData?.prompts?.find((p) => p.isActive)?.promptText || null

  // Show capability dialog if STT or TTS is not available
  if (showCapabilityDialog && (sttAvailable === false || ttsAvailable === false)) {
    return (
      <Dialog open={showCapabilityDialog} onOpenChange={setShowCapabilityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-orange-600" />
              Browser Capability Warning
            </DialogTitle>
            <DialogDescription className="text-left space-y-2">
              <p>Your browser may not fully support all features required for this interview:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {sttAvailable === false && (
                  <li className="text-red-600">❌ Speech Recognition (STT) is not available</li>
                )}
                {ttsAvailable === false && (
                  <li className="text-red-600">❌ Speech Synthesis (TTS) is not available</li>
                )}
                {sttAvailable === true && (
                  <li className="text-green-600">✅ Speech Recognition (STT) is available</li>
                )}
                {ttsAvailable === true && (
                  <li className="text-green-600">✅ Speech Synthesis (TTS) is available</li>
                )}
              </ul>
              <p className="text-sm mt-2">
                {!sttAvailable || !ttsAvailable ? (
                  <span className="text-orange-600">
                    Some features may not work. Please use a modern browser like Chrome, Edge, or Safari.
                  </span>
                ) : (
                  <span className="text-green-600">All features are supported!</span>
                )}
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setShowCapabilityDialog(false)}
            >
              Continue Anyway
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Prepare interview data for MeetTestRoom
  const interviewDataForRoom = {
    id: interviewData?.id,
    title: interviewData?.title,
    // Prioritize stored prompt from DB - this is the prompt saved when interview was created
    customPrompt: storedPrompt || interviewData?.customPrompt || undefined,
    jd: interviewData?.jd,
    interviewType: interviewData?.interviewType,
    foreignLanguageSubType: interviewData?.foreignLanguageSubType ?? undefined,
    screenShareEnabled: interviewData?.screenShareEnabled,
  }

  return (
    <>
      {/* Debug panel hidden when full-screen prompt is shown (white-only screen) */}
      {!isFullScreenPromptVisible && (
        <InterviewDebugPanel
          interviewData={interviewData}
          assistantDetails={assistantDetails}
          storedPrompt={storedPrompt}
          interviewDataForRoom={interviewDataForRoom}
          sttAvailable={sttAvailable}
          ttsAvailable={ttsAvailable}
          hasVideoPermission={hasVideoPermission}
          hasAudioPermission={hasAudioPermission}
          showDebug={siteConfig.showCustomInterviewDebug}
        />
      )}

      <MeetTestRoom
        interviewTitle={interviewData?.title}
        assistantName={interviewData?.title || 'AI Assistant'}
        assistantAvatar={siteConfig.logo}
        assistantDetails={assistantDetails}
        onEndCall={handleEndCall}
        voiceConfig={defaultVoiceConfig}
        uiConfig={{ ...uiConfig, redirectOnStop: false }}
        interviewData={interviewDataForRoom}
        sttAvailable={sttAvailable}
        ttsAvailable={ttsAvailable}
        onFullScreenPromptVisible={setIsFullScreenPromptVisible}
        onBeforeStartInterview={handleBeforeStartInterview}
        onEndCallWithPayload={handleEndCallWithPayload}
        lockMicAndVideo={!siteConfig.customInterviewTestMode}
      />
    </>
  )
}
