"use client"

import { InterviewControls } from "../controls"

export function MeetingControls({ 
  onEndVoiceChat
}: { 
  onEndVoiceChat?: () => void
}) {
  return <InterviewControls onEndVoiceChat={onEndVoiceChat} />
}
