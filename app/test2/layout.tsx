'use client'

import React, { createContext } from 'react'

// Context to pass browser support info to child components
export const BrowserSupportContext = createContext<{
  isSupported: boolean
  browserName: string
}>({
  isSupported: true,
  browserName: 'Unknown'
})

export default function Test2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Voice Tools</h1>
          <p className="text-muted-foreground mt-2">Text to Speech and Speech to Text functionality</p>
        </div>

        {/* Always provide supported browser context */}
        <BrowserSupportContext.Provider value={{ isSupported: true, browserName: 'Unknown' }}>
          {children}
        </BrowserSupportContext.Provider>
      </div>
    </div>
  )
}
