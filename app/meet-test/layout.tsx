'use client'

import { detectBrowser } from './_components/config'
import { useEffect, useState } from 'react'

export default function MeetTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState<boolean | null>(null)

  useEffect(() => {
    const browser = detectBrowser()
    console.log('Detected browser:', browser, 'User agent:', navigator.userAgent, 'navigator.brave:', (navigator as { brave?: unknown }).brave)
    // Only allow Chrome and Edge, explicitly block Brave and all others
    setIsSupportedBrowser(browser === 'chrome' || browser === 'edge')
  }, [])

  if (isSupportedBrowser === null) {
    // Loading state while detecting browser
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Detecting browser compatibility...</p>
        </div>
      </div>
    )
  }

  if (!isSupportedBrowser) {
    // Browser not supported
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="text-6xl">🚫</div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Browser Not Supported
            </h1>
            <p className="text-muted-foreground mb-6">
              This AI meeting room is only compatible with Google Chrome or Microsoft Edge browsers. Brave browser and other browsers are not supported for voice-to-voice functionality.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-card border rounded-lg p-4 text-left">
              <h3 className="font-semibold text-foreground mb-2">Supported Browsers:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Google Chrome (recommended)</li>
                <li>• Microsoft Edge</li>
              </ul>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>These browsers provide the best experience for real-time voice conversations and video controls.</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download Chrome
            </a>
            <a
              href="https://www.microsoft.com/edge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500/90 transition-colors"
            >
              Download Edge
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Supported browser - render children
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
