"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { SlideRenderer } from "./slides"
import type { TypedSlide } from "./slides"

interface VideoPresentationProps {
  slides: TypedSlide[]
  /** When true, start playback immediately on mount (e.g. from Demo → Start) */
  autoStart?: boolean
  /** Called after auto-start has begun (used to clear form state) */
  onAutoStartDone?: () => void
  onComplete?: () => void
}

export function VideoPresentation({ slides, autoStart, onAutoStartDone, onComplete }: VideoPresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const isPlayingRef = useRef(false)
  const isPausedRef = useRef(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
      const loadVoices = () => {}
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices
      }
      loadVoices()
    }
    return () => {
      synthRef.current?.cancel()
    }
  }, [])

  useEffect(() => {
    if (autoStart && slides.length > 0) {
      startPresentation()
      onAutoStartDone?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

  const speak = (ttsText: string, onEnd?: () => void) => {
    if (!synthRef.current) return
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(ttsText)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    utterance.lang = "en-US"

    const setVoice = () => {
      if (!synthRef.current) return
      const voices = synthRef.current.getVoices()
      const englishVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          /english|us|uk|american|british/i.test(v.name)
      )
      if (englishVoice) utterance.voice = englishVoice
      else {
        const en = voices.find((v) => v.lang.startsWith("en"))
        if (en) utterance.voice = en
      }
    }
    setVoice()
    if (synthRef.current?.onvoiceschanged) synthRef.current.onvoiceschanged = setVoice

    utterance.onend = () => {
      if (onEnd) onEnd()
    }
    utterance.onerror = () => {
      if (onEnd) onEnd()
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }

  const stop = () => {
    synthRef.current?.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    isPlayingRef.current = false
    isPausedRef.current = false
  }

  const pause = () => {
    if (synthRef.current && !synthRef.current.paused) {
      synthRef.current.pause()
      setIsPaused(true)
      isPausedRef.current = true
    }
  }

  const resume = () => {
    if (synthRef.current?.paused) {
      synthRef.current.resume()
      setIsPaused(false)
      isPausedRef.current = false
    }
  }

  const startPresentation = () => {
    if (slides.length === 0) return
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    setCurrentSlideIndex(0)
    playSlide(0)
  }

  const playSlide = (index: number) => {
    if (index >= slides.length) {
      setIsPlaying(false)
      isPlayingRef.current = false
      onComplete?.()
      return
    }

    const slide = slides[index]
    setCurrentSlideIndex(index)
    const tts = slide.content?.tts ?? ""

    if (tts) {
      speak(tts, () => {
        setTimeout(() => {
          if (isPlayingRef.current && !isPausedRef.current) {
            playSlide(index + 1)
          }
        }, 500)
      })
    } else {
      setTimeout(() => {
        if (isPlayingRef.current && !isPausedRef.current) {
          playSlide(index + 1)
        }
      }, 500)
    }
  }

  const goToNextSlide = () => {
    if (currentSlideIndex >= slides.length - 1) return
    stop()
    const nextIndex = currentSlideIndex + 1
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    playSlide(nextIndex)
  }

  const goToPreviousSlide = () => {
    if (currentSlideIndex <= 0) return
    stop()
    const prevIndex = currentSlideIndex - 1
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    playSlide(prevIndex)
  }

  const currentSlide = slides[currentSlideIndex]

  if (slides.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No slides available
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{currentSlide?.title ?? "Presentation"}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Video-style frame: one slide at a time, 16:9 aspect, centered */}
          <div
            key={`slide-${currentSlideIndex}`}
            className="mb-4 w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-y-auto overflow-x-hidden bg-muted/30 border shadow-inner flex items-center justify-center"
          >
            <div className="w-full min-h-full flex items-center justify-center p-4 md:p-6">
              <SlideRenderer slide={currentSlide!} isPlaying={isPlaying} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousSlide}
              disabled={currentSlideIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            {!isPlaying ? (
              <Button onClick={startPresentation} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button onClick={resume} size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                ) : (
                  <Button onClick={pause} size="sm" variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={stop} size="sm" variant="outline">
                  Stop
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
