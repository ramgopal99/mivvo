'use client'

import { MeetTestRoom } from '@/app/meet-test/_components/core'

export default function MeetTestPage() {
  return (
    <MeetTestRoom
      assistantName="AI Meeting Assistant"
      assistantAvatar={undefined}
      onEndCall={() => {
        import('sonner').then(({ toast }) => {
          toast.info('End call is not implemented in dev mode.');
        });
      }}
    />
  )
}
