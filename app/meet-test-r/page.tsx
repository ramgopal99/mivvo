'use client'

import { useEffect, useState } from 'react'
import { MeetTestRoom } from './_components/core'
import { DEFAULT_CONFIGS } from './_components/config'

export default function MeetTestPage() {
  const [uiConfig, setUiConfig] = useState(DEFAULT_CONFIGS.uiConfig)

  useEffect(() => {
    // Check for screenShare query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const screenShareParam = urlParams.get('screenShare')

    if (screenShareParam === 'true') {
      // Enable screen sharing for coding interviews
      setUiConfig(prev => ({
        ...prev,
        showShareScreen: true,
        showCodeButtonOnlyOnScreenShare: true,
        showCodingInterviewOnlyOnScreenShare: true
      }))
    } else if (screenShareParam === 'false') {
      // Disable screen sharing for general interviews
      setUiConfig(prev => ({
        ...prev,
        showShareScreen: false,
        showCodeButtonOnlyOnScreenShare: false,
        showCodingInterviewOnlyOnScreenShare: false
      }))
    }
  }, [])

  return (
    <MeetTestRoom
      assistantName="AI Meeting Assistant"
      assistantAvatar={undefined}
      onEndCall={() => {
        import('sonner').then(({ toast }) => {
          toast.info('End call is not implemented in dev mode.');
        });
      }}
      interviewConfig={DEFAULT_CONFIGS.interviewConfig}
      codingInterviewConfig={DEFAULT_CONFIGS.codingInterviewConfig}
      voiceConfig={DEFAULT_CONFIGS.voiceConfig}
      uiConfig={uiConfig}
      codingVoiceChatConfig={DEFAULT_CONFIGS.codingVoiceChatConfig}
      codingVoiceChatMessages={DEFAULT_CONFIGS.codingVoiceChatMessages}
      codingQuestionDisplay={DEFAULT_CONFIGS.codingQuestionDisplay}
    />
  )
}
