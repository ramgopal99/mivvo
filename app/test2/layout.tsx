'use client'

import React, { useState, useEffect, createContext } from 'react'

// Context to pass browser support info to child components
export const BrowserSupportContext = createContext<{
  isSupported: boolean | null
  browserName: string
}>({
  isSupported: null,
  browserName: ''
})

// Brave browser detection interface
interface BraveNavigator extends Navigator {
  brave?: {
    isBrave(): Promise<boolean>
  }
}

export default function Test2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState<boolean | null>(null)
  const [browserName, setBrowserName] = useState<string>('')

  useEffect(() => {
    // Detect browser support for Web Speech API
    const detectBrowser = async () => {
      const userAgent = navigator.userAgent
      console.log('User Agent:', userAgent) // Debug log

      // Check for supported browsers (exclude Brave)
      const hasChrome = /Chrome/.test(userAgent)
      const hasEdge = /Edg/.test(userAgent)
      const hasBraveUA = /Brave/.test(userAgent)

      // Additional Brave detection methods
      let isBraveDetected = hasBraveUA

      // Check for Brave-specific properties (async)
      try {
        // Brave has navigator.brave property
        const braveNavigator = navigator as BraveNavigator
        if (braveNavigator.brave && typeof braveNavigator.brave.isBrave === 'function') {
          const isBraveResult = await braveNavigator.brave.isBrave()
          isBraveDetected = isBraveDetected || isBraveResult
        }
      } catch (e) {
        console.log('Brave detection error:', e)
      }

      const isChrome = hasChrome && !hasEdge && !isBraveDetected
      const isEdge = hasEdge
      const isBrave = isBraveDetected
      const isSupported = isChrome || isEdge

      console.log('Browser detection:', {
        hasChrome,
        hasEdge,
        hasBraveUA,
        isBraveDetected,
        isChrome,
        isEdge,
        isBrave,
        isSupported
      }) // Debug log

      let detectedBrowser = 'Unknown'
      if (isBrave) detectedBrowser = 'Brave'
      else if (isChrome) detectedBrowser = 'Chrome'
      else if (isEdge) detectedBrowser = 'Microsoft Edge'
      else if (/Firefox/.test(userAgent)) detectedBrowser = 'Firefox'
      else if (/Safari/.test(userAgent)) detectedBrowser = 'Safari'
      else if (/Opera/.test(userAgent)) detectedBrowser = 'Opera'

      setBrowserName(detectedBrowser)
      setIsSupportedBrowser(isSupported)
    }

    detectBrowser()
  }, [])

  if (isSupportedBrowser === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Detecting browser compatibility...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Voice Tools</h1>
          <p className="text-muted-foreground mt-2">Text to Speech and Speech to Text functionality</p>
        </div>

        {!isSupportedBrowser && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-center">
              <strong>Note:</strong> For best experience with voice features, please use <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong> browser.
              {browserName === 'Brave' && ' Brave browser is not supported due to compatibility issues.'}
            </p>
          </div>
        )}

        {/* Pass browser support info to children */}
        <BrowserSupportContext.Provider value={{ isSupported: isSupportedBrowser, browserName }}>
          {children}
        </BrowserSupportContext.Provider>
      </div>
    </div>
  )
}
