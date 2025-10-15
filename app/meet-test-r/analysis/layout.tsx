'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={() => router.push('/meet-test')} variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Interview Analysis</h1>
                <p className="text-muted-foreground">Comprehensive performance evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-6xl min-h-0">
          {children}
        </div>

        {/* Footer - Now inside scrollable area */}
        <div className="border-t bg-card mt-8">
          <div className="container mx-auto px-4 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              Analysis generated on {new Date().toLocaleDateString()} • Powered by AI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
