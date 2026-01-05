'use client'

import { useEffect, useState } from 'react'

const UPDATE_INTERVAL = 12 * 60 * 60 * 1000 // 12 hours in milliseconds

export function LaunchBanner({
  variant = 'navbar',
  remainingSpots = 547,
  totalSeats = 1000
}: {
  variant?: 'navbar' | 'banner'
  remainingSpots?: number
  totalSeats?: number
}) {
  const [currentRemainingSpots, setCurrentRemainingSpots] = useState<number>(remainingSpots)

  useEffect(() => {
    const updateSeats = () => {
      // Generate new random number between 500-999 every 12 hours
      const newRemainingSpots = Math.floor(Math.random() * 500) + 500
      setCurrentRemainingSpots(newRemainingSpots)
    }

    // Set up interval to update every 12 hours
    const interval = setInterval(updateSeats, UPDATE_INTERVAL)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  // Use the dynamic seats for display
  const displaySpots = currentRemainingSpots

  if (variant === 'navbar') {
    return (
      <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 font-bold text-sm animate-pulse inline-block">
        {displaySpots}/{totalSeats} seats
      </span>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-primary text-primary-foreground py-3 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>

      {/* Content */}
      <div className="relative flex items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🚀</span>
          <span className="font-bold text-lg">LAUNCH OFFER!</span>
        </div>

        <div className="hidden sm:block text-sm">
          Every course <span className="font-bold text-xl">₹149</span>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 font-bold text-lg animate-pulse">
          {displaySpots}/{totalSeats} seats left
        </div>

        <div className="hidden md:block text-sm">
          Limited time offer!
        </div>
      </div>
    </div>
  )
}
