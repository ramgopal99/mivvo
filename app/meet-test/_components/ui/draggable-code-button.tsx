'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Code } from 'lucide-react'

interface DraggableCodeButtonProps {
  onClick?: () => void
  initialTop?: number
}

export function DraggableCodeButton({
  onClick,
  initialTop = 200
}: DraggableCodeButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: initialTop })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })

  // Set initial position on client side and handle window resize
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const updatePosition = () => {
        setPosition(prev => ({
          x: window.innerWidth - 80,
          y: Math.min(prev.y, window.innerHeight - 60) // Keep within bounds
        }))
      }

      updatePosition()
      window.addEventListener('resize', updatePosition)

      return () => window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    e.preventDefault()
  }, [position])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || typeof window === 'undefined') return

    const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragStart.current.y))
    setPosition(prev => ({
      ...prev,
      y: newY
    }))
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={dragRef}
      className="fixed z-40 cursor-move select-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="bg-background/95 backdrop-blur-sm border shadow-lg hover:bg-accent transition-colors"
      >
        <Code className="h-4 w-4 mr-1" />
        Code
      </Button>
    </div>
  )
}
