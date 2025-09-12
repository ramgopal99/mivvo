"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EmojiReactionProps {
  emoji: string
  onReaction: () => void
}

export function EmojiReaction({ emoji, onReaction }: EmojiReactionProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Prevent multiple rapid clicks
    if (isAnimating) return

    setIsAnimating(true)
    onReaction()

    // Create floating emoji element safely
    try {
      const floatingEmoji = document.createElement('div')
      floatingEmoji.textContent = emoji
      floatingEmoji.className = 'fixed text-4xl pointer-events-none z-50 animate-float-up'
      
      // Position randomly at the bottom of the screen
      const randomX = Math.random() * (window.innerWidth - 100) + 50 // Random X position with 50px margin
      floatingEmoji.style.left = `${randomX}px`
      floatingEmoji.style.bottom = '120px' // Fixed distance from bottom
      floatingEmoji.style.transform = 'translateX(-50%)' // Center horizontally
      
      document.body.appendChild(floatingEmoji)

      // Remove after animation completes
      setTimeout(() => {
        if (floatingEmoji.parentNode) {
          document.body.removeChild(floatingEmoji)
        }
      }, 2000)
    } catch (error) {
      console.warn('Failed to create floating emoji:', error)
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      disabled={isAnimating}
      className={`transition-all duration-200 cursor-pointer select-none ${isAnimating ? 'scale-125 opacity-75' : 'hover:scale-110'}`}
    >
      <span className="text-lg">{emoji}</span>
    </Button>
  )
} 