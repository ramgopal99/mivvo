'use client'

import { MeetTestRoom } from '@/components/meet-test'

export default function MeetTestPage() {
  return (
    <MeetTestRoom
      assistantName="AI Meeting Assistant"
      assistantAvatar={undefined}
      onEndCall={() => {
        // Handle end call - could redirect or show confirmation
        console.log('End call requested')
      }}
    />
  )
}
