"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
      floatingEmoji.style.left = `${Math.random() * (window.innerWidth - 100) + 50}px`
      floatingEmoji.style.bottom = '120px'
      document.body.appendChild(floatingEmoji)

      // Remove after animation
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
    <Tooltip>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>
      <TooltipContent>React with {emoji}</TooltipContent>
    </Tooltip>
  )
} 