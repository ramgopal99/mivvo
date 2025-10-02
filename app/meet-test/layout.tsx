'use client'

export default function MeetTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-background overflow-hidden">
      {children}
    </div>
  )
}
