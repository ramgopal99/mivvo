'use client'

import { MeetTestRoom } from '@/components/meet-test'

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
