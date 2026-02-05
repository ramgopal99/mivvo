"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Play, Pause, SkipForward, SkipBack, ChevronDown, ChevronRight } from "lucide-react"
import {
  SlideRenderer,
  getSlideAnimationClass,
  buildRandomAnimationIndices,
  getSlideLineInfo,
  getLineDelayMs,
  type TypedSlide,
  type SlideAnimationMode,
} from "./slides"

interface VideoPresentationProps {
  slides: TypedSlide[]
  /** When true, start playback immediately on mount (e.g. from Demo → Start) */
  autoStart?: boolean
  /** Called after auto-start has begun (used to clear form state) */
  onAutoStartDone?: () => void
  onComplete?: () => void
  /** How to pick animation per slide: rotation (cycle) or random */
  animationMode?: SlideAnimationMode
}

export function VideoPresentation({ slides, autoStart, onAutoStartDone, onComplete, animationMode = "rotation" }: VideoPresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  /** Per-slide line delays (ms). Key = slide index. Overrides slide.content.lineDelays when set. */
  const [lineDelaysBySlide, setLineDelaysBySlide] = useState<Record<number, number[]>>({})
  const [timingOpen, setTimingOpen] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const isPlayingRef = useRef(false)
  const isPausedRef = useRef(false)
  const hasAutoStartedRef = useRef(false)
  const playbackIdRef = useRef(0)
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }
    return () => {
      synthRef.current?.cancel()
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    }
  }, [])

  useEffect(() => {
    if (!autoStart || slides.length === 0 || hasAutoStartedRef.current) return
    hasAutoStartedRef.current = true
    startPresentation()
    onAutoStartDone?.()
    // No cleanup here: unmount cleanup is in the init effect. If we cleaned up
    // when deps change (e.g. autoStart → false after onAutoStartDone), we'd
    // cancel speech and clear the advance timeout, cutting off the demo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, slides.length])

  const speak = useCallback((ttsText: string, onEnd?: () => void) => {
    if (!synthRef.current) return
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(ttsText)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    utterance.lang = "en-US"

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

    utterance.onend = () => {
      onEnd?.()
    }
    utterance.onerror = () => {
      onEnd?.()
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    synthRef.current?.cancel()
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }
    setIsPlaying(false)
    setIsPaused(false)
    isPlayingRef.current = false
    isPausedRef.current = false
  }, [])

  const pause = useCallback(() => {
    if (synthRef.current && !synthRef.current.paused) {
      synthRef.current.pause()
      setIsPaused(true)
      isPausedRef.current = true
    }
  }, [])

  const resume = useCallback(() => {
    if (synthRef.current?.paused) {
      synthRef.current.resume()
      setIsPaused(false)
      isPausedRef.current = false
    }
  }, [])

  /** Minimum ms to show each slide before advancing (lets animations and content be visible). */
  const MIN_SLIDE_DISPLAY_MS = 3500
  const INTER_SLIDE_DELAY_MS = 600

  const playSlide = useCallback(
    (index: number) => {
      if (index >= slides.length) {
        setIsPlaying(false)
        isPlayingRef.current = false
        onComplete?.()
        return
      }

      const slide = slides[index]
      const id = playbackIdRef.current
      const slideStartTime = Date.now()

      setCurrentSlideIndex(index)
      const tts = (slide.content?.tts ?? "") as string

      const advance = () => {
        if (id !== playbackIdRef.current) return
        if (!isPlayingRef.current || isPausedRef.current) return
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current)
          timeoutIdRef.current = null
        }
        const elapsed = Date.now() - slideStartTime
        const minRemaining = Math.max(0, MIN_SLIDE_DISPLAY_MS - elapsed)
        const delay = Math.max(INTER_SLIDE_DELAY_MS, minRemaining)

        timeoutIdRef.current = setTimeout(() => {
          timeoutIdRef.current = null
          if (id !== playbackIdRef.current) return
          playSlide(index + 1)
        }, delay)
      }

      if (tts) {
        speak(tts, advance)
      } else {
        advance()
      }
    },
    [slides, speak, onComplete]
  )

  const startPresentation = useCallback(() => {
    if (slides.length === 0) return
    playbackIdRef.current += 1
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }
    synthRef.current?.cancel()
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    setCurrentSlideIndex(0)
    playSlide(0)
  }, [slides.length, playSlide])

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex >= slides.length - 1) return
    stop()
    playbackIdRef.current += 1
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    playSlide(currentSlideIndex + 1)
  }, [currentSlideIndex, slides.length, stop, playSlide])

  const goToPreviousSlide = useCallback(() => {
    if (currentSlideIndex <= 0) return
    stop()
    playbackIdRef.current += 1
    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    playSlide(currentSlideIndex - 1)
  }, [currentSlideIndex, stop, playSlide])

  const currentSlide = slides[currentSlideIndex]

  const randomAnimationIndices = useMemo(
    () => (animationMode === "random" ? buildRandomAnimationIndices(slides.length) : []),
    [animationMode, slides.length]
  )
  const animationClass =
    slides.length > 0
      ? getSlideAnimationClass(currentSlideIndex, animationMode, randomAnimationIndices)
      : undefined

  const currentSlideLineInfo = currentSlide ? getSlideLineInfo(currentSlide) : { count: 0, labels: [] }
  const effectiveLineDelays: number[] | undefined = useMemo(() => {
    const override = lineDelaysBySlide[currentSlideIndex]
    if (override && override.length > 0) return override
    const fromContent = currentSlide?.content?.lineDelays
    if (Array.isArray(fromContent) && fromContent.length > 0) return fromContent as number[]
    return undefined
  }, [currentSlideIndex, lineDelaysBySlide, currentSlide?.content?.lineDelays])

  const setLineDelay = useCallback((lineIndex: number, ms: number) => {
    setLineDelaysBySlide((prev) => {
      const slide = slides[currentSlideIndex]
      const info = slide ? getSlideLineInfo(slide) : { count: 0, labels: [] }
      const arr = prev[currentSlideIndex] ?? Array.from({ length: info.count }, (_, i) => getLineDelayMs(i, undefined))
      const next = [...arr]
      if (lineIndex >= next.length) next.length = lineIndex + 1
      next[lineIndex] = Math.max(0, ms)
      return { ...prev, [currentSlideIndex]: next }
    })
  }, [currentSlideIndex, slides])

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
              <SlideRenderer
                slide={currentSlide!}
                isPlaying={isPlaying}
                animationClass={animationClass}
                lineDelays={effectiveLineDelays}
              />
            </div>
          </div>

          <Collapsible open={timingOpen} onOpenChange={setTimingOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between mb-2">
                <span className="text-muted-foreground font-normal">Line timing (ms per line)</span>
                {timingOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="rounded-md border bg-muted/30 p-3 space-y-2 mb-4">
                {currentSlideLineInfo.count > 0 ? (
                  Array.from({ length: currentSlideLineInfo.count }, (_, i) => {
                    const label = currentSlideLineInfo.labels[i] ?? `Line ${i + 1}`
                    const value = effectiveLineDelays?.[i] ?? getLineDelayMs(i, undefined)
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <Label htmlFor={`line-delay-${i}`} className="min-w-[100px] text-sm">
                          {label}
                        </Label>
                        <Input
                          id={`line-delay-${i}`}
                          type="number"
                          min={0}
                          step={50}
                          value={value}
                          onChange={(e) => setLineDelay(i, Number(e.target.value) || 0)}
                          className="h-8 w-24"
                        />
                        <span className="text-xs text-muted-foreground">ms</span>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">No lines for this slide.</p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

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
