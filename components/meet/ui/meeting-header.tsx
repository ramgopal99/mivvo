"use client"

import { Timer } from "lucide-react"
import { useMeetRoom } from "../../providers/meet-room-provider"
import { useEffect, useState } from "react"
export function InterviewHeader() {
  const { assistant, session } = useMeetRoom()
  const [remainingTime, setRemainingTime] = useState("00:00")
  const [isTimerActive, setIsTimerActive] = useState(false)

  useEffect(() => {
    if (!session?.duration) {
      setRemainingTime("00:00")
      return
    }

    // Start the timer when component mounts
    setIsTimerActive(true)
    const durationMinutes = session.duration
    const startTime = Date.now()
    const endTime = startTime + (durationMinutes * 60 * 1000)

    const interval = setInterval(() => {
      if (!isTimerActive) return

      const now = Date.now()
      const timeLeft = Math.max(0, endTime - now)
      
      if (timeLeft <= 0) {
        setRemainingTime("00:00")
        setIsTimerActive(false)
        clearInterval(interval)
        return
      }

      const minutes = Math.floor(timeLeft / 60000)
      const seconds = Math.floor((timeLeft % 60000) / 1000)
      setRemainingTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => {
      clearInterval(interval)
      setIsTimerActive(false)
    }
  }, [session?.duration, isTimerActive])

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between border-b px-6 py-4 bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {remainingTime}
          </span>
        </div>
        {session?.duration && (
          <span className="text-xs text-muted-foreground/70">
            • {session.duration} min session
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-center">
          <h1 className="text-lg font-semibold">
            Interview Session
          </h1>
          {assistant && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {assistant.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
