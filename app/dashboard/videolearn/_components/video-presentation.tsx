"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"

interface Slide {
  slideNumber: number
  title: string
  content: {
    text: string
    tts: string
  }
  timing: {
    displayDelay: number
    ttsDuration: number
  }
}

interface VideoPresentationProps {
  slides: Slide[]
  onComplete?: () => void
}

export function VideoPresentation({ slides, onComplete }: VideoPresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const textRevealIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const textLinesRef = useRef<string[]>([])
  const currentLineIndexRef = useRef(0)
  const revealStartTimeRef = useRef<number | null>(null)
  const pausedElapsedTimeRef = useRef<number>(0)
  const isPlayingRef = useRef(false)
  const isPausedRef = useRef(false)

  useEffect(() => {
    // Initialize Web Speech API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
      
      // Load voices (some browsers need this)
      const loadVoices = () => {
        // Voices are now available
      }
      
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices
      }
      loadVoices()
    }

    return () => {
      // Cleanup on unmount
      if (synthRef.current) {
        synthRef.current.cancel()
      }
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current)
      }
      if (textRevealIntervalRef.current) {
        clearInterval(textRevealIntervalRef.current)
      }
    }
  }, [])

  // Reset displayed text when slide changes and not playing
  useEffect(() => {
    if (!isPlaying && currentSlideIndex < slides.length) {
      setDisplayedText("")
      currentLineIndexRef.current = 0
    }
  }, [currentSlideIndex, isPlaying, slides.length])

  const startTextReveal = (ttsText: string, displayText: string, resumeFromPause = false) => {
    if (textRevealIntervalRef.current) {
      clearInterval(textRevealIntervalRef.current)
    }

    const lines = textLinesRef.current
    if (lines.length === 0) return

    // Calculate total words in TTS text
    const totalWords = ttsText.split(/\s+/).length
    
    // Calculate words per line for synchronization
    const wordsPerLine = Math.max(1, Math.ceil(totalWords / lines.length))
    
    // Speaking rate: ~150 words per minute = 2.5 words per second
    // Use slightly slower rate to ensure text appears as speech happens
    const wordsPerSecond = 2.2
    
    // Calculate when each line should appear based on word count
    // Add a delay so text appears as speech is happening, not before
    const lineTimings: number[] = []
    let accumulatedWords = 0
    
    for (let i = 0; i < lines.length; i++) {
      // Estimate words for this line (proportional to TTS)
      const lineWords = i === lines.length - 1 
        ? totalWords - accumulatedWords // Last line gets remaining words
        : wordsPerLine
      
      // Add 500ms delay so text appears as speech happens, not before
      lineTimings.push((accumulatedWords / wordsPerSecond) * 1000 + 500)
      accumulatedWords += lineWords
    }

    // Adjust start time if resuming from pause
    const baseStartTime = resumeFromPause && pausedElapsedTimeRef.current > 0
      ? Date.now() - pausedElapsedTimeRef.current
      : Date.now()
    
    revealStartTimeRef.current = baseStartTime
    let lastRevealedLine = currentLineIndexRef.current

    textRevealIntervalRef.current = setInterval(() => {
      if (!revealStartTimeRef.current) return
      
      const elapsed = Date.now() - revealStartTimeRef.current
      
      // Find which line should be visible based on elapsed time
      for (let i = lastRevealedLine + 1; i < lineTimings.length; i++) {
        if (elapsed >= lineTimings[i]) {
          lastRevealedLine = i
          currentLineIndexRef.current = i
          const linesToShow = lines.slice(0, i + 1)
          setDisplayedText(linesToShow.join('\n'))
        } else {
          break
        }
      }
      
      // Stop if all lines are revealed
      if (lastRevealedLine >= lines.length - 1) {
        if (textRevealIntervalRef.current) {
          clearInterval(textRevealIntervalRef.current)
          textRevealIntervalRef.current = null
        }
      }
    }, 200) // Check every 200ms for smooth reveal
  }

  const speak = (ttsText: string, displayText: string, onEnd?: () => void) => {
    if (!synthRef.current) {
      console.error('Speech synthesis not available')
      return
    }

    // Cancel any ongoing speech
    synthRef.current.cancel()

    // Reset text reveal
    setDisplayedText("")
    currentLineIndexRef.current = 0
    
    // Split display text into lines (by newlines, then by sentences if no newlines)
    let lines: string[] = []
    if (displayText.includes('\n')) {
      // If text has newlines, use them as line breaks
      lines = displayText
        .split(/\n+/)
        .map(line => line.trim())
        .filter(line => line.length > 0)
    } else {
      // If no newlines, split by sentences or bullet points
      lines = displayText
        .split(/(?:\n|•|\*|[-])\s*/)
        .map(line => line.trim())
        .filter(line => line.length > 0)
      
      // If still no good splits, split by periods
      if (lines.length <= 1) {
        lines = displayText
          .split(/[.!?]+\s*/)
          .map(line => line.trim())
          .filter(line => line.length > 0)
      }
    }
    
    textLinesRef.current = lines

    const utterance = new SpeechSynthesisUtterance(ttsText)
    utterance.rate = 1.0 // Normal speed
    utterance.pitch = 1.0
    utterance.volume = 1.0
    utterance.lang = 'en-US' // English (US)
    
    // Set English voice
    const setVoice = () => {
      if (!synthRef.current) return
      
      const voices = synthRef.current.getVoices()
      
      // Try to find an English voice
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('english') || 
         voice.name.toLowerCase().includes('us') ||
         voice.name.toLowerCase().includes('uk') ||
         voice.name.toLowerCase().includes('american') ||
         voice.name.toLowerCase().includes('british'))
      )
      if (englishVoice) {
        utterance.voice = englishVoice
      } else {
        // Fallback: use any available English voice
        const enVoice = voices.find(voice => voice.lang.startsWith('en'))
        if (enVoice) {
          utterance.voice = enVoice
        }
      }
    }
    
    // Set voice immediately if available, otherwise wait for voices to load
    setVoice()
    if (synthRef.current && synthRef.current.onvoiceschanged) {
      synthRef.current.onvoiceschanged = setVoice
    }

    utterance.onstart = () => {
      // Start revealing text synchronized with speech
      // Add a small delay to ensure speech has actually started
      pausedElapsedTimeRef.current = 0
      setTimeout(() => {
        startTextReveal(ttsText, displayText, false)
      }, 300) // Small delay to sync with actual speech start
    }

    utterance.onend = () => {
      // Show all text when speech ends
      setDisplayedText(displayText)
      if (textRevealIntervalRef.current) {
        clearInterval(textRevealIntervalRef.current)
        textRevealIntervalRef.current = null
      }
      if (onEnd) {
        onEnd()
      }
    }

    utterance.onerror = (event) => {
      // The event object contains error information
      const errorType = event.error || 'unknown'
      const errorMessage = event.type === 'error' 
        ? `Speech synthesis failed: ${errorType}` 
        : `Speech synthesis error: ${event.type}`
      
      console.error(errorMessage, {
        error: errorType,
        type: event.type,
        charIndex: event.charIndex,
        charLength: event.charLength,
        utterance: event.utterance?.text?.substring(0, 50) + '...'
      })
      
      // Show all text on error
      setDisplayedText(displayText)
      if (textRevealIntervalRef.current) {
        clearInterval(textRevealIntervalRef.current)
        textRevealIntervalRef.current = null
      }
      if (onEnd) {
        onEnd()
      }
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current)
      slideTimeoutRef.current = null
    }
    if (textRevealIntervalRef.current) {
      clearInterval(textRevealIntervalRef.current)
      textRevealIntervalRef.current = null
    }
    setIsPlaying(false)
    setIsPaused(false)
    isPlayingRef.current = false
    isPausedRef.current = false
    setDisplayedText("")
    currentLineIndexRef.current = 0
    pausedElapsedTimeRef.current = 0
    revealStartTimeRef.current = null
  }

  const pause = () => {
    if (synthRef.current && !synthRef.current.paused) {
      synthRef.current.pause()
      setIsPaused(true)
      isPausedRef.current = true
      // Pause text reveal and save elapsed time
      if (textRevealIntervalRef.current) {
        clearInterval(textRevealIntervalRef.current)
        textRevealIntervalRef.current = null
      }
      if (revealStartTimeRef.current) {
        pausedElapsedTimeRef.current = Date.now() - revealStartTimeRef.current
      }
    }
  }

  const resume = () => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume()
      setIsPaused(false)
      isPausedRef.current = false
      // Resume text reveal with current slide's content
      const currentSlide = slides[currentSlideIndex]
      if (currentSlide) {
        startTextReveal(currentSlide.content.tts, currentSlide.content.text, true)
      }
    }
  }

  const startPresentation = () => {
    if (slides.length === 0) return

    setIsPlaying(true)
    setIsPaused(false)
    isPlayingRef.current = true
    isPausedRef.current = false
    setCurrentSlideIndex(0)
    setDisplayedText("")
    currentLineIndexRef.current = 0
    
    // Start with first slide
    playSlide(0)
  }

  const playSlide = (index: number) => {
    if (index >= slides.length) {
      // Presentation complete
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
      return
    }

    const slide = slides[index]
    
    // Show slide immediately with smooth transition
    setCurrentSlideIndex(index)
    // Reset displayed text
    setDisplayedText("")
    currentLineIndexRef.current = 0
    pausedElapsedTimeRef.current = 0
    revealStartTimeRef.current = null

    // Start speaking immediately (no delay for video-like experience)
    speak(slide.content.tts, slide.content.text, () => {
      // Auto-advance to next slide after TTS completes
      // Use refs to check current state to avoid stale closure
      setTimeout(() => {
        // Check if still playing and not paused before advancing
        if (isPlayingRef.current && !isPausedRef.current) {
          playSlide(index + 1)
        }
      }, 500) // 0.5 second transition
    })
  }

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      // Stop current speech and text reveal
      stop()
      
      const nextIndex = currentSlideIndex + 1
      setIsPlaying(true)
      setIsPaused(false)
      isPlayingRef.current = true
      isPausedRef.current = false
      
      // Play the next slide (which will auto-advance)
      playSlide(nextIndex)
    }
  }

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      // Stop current speech and text reveal
      stop()
      
      const prevIndex = currentSlideIndex - 1
      setIsPlaying(true)
      setIsPaused(false)
      isPlayingRef.current = true
      isPausedRef.current = false
      
      // Play the previous slide (which will auto-advance)
      playSlide(prevIndex)
    }
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
            <CardTitle>
              {currentSlide?.title || 'Presentation'}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Slide Content Display with Video-like Transition and Typewriter Effect */}
          <div 
            key={`slide-${currentSlideIndex}`}
            className="min-h-[400px] p-8 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg mb-4 animate-in fade-in duration-500"
          >
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-lg leading-relaxed">
                {isPlaying && displayedText !== undefined 
                  ? displayedText 
                  : (currentSlide?.content.text || 'No content')}
                {isPlaying && displayedText && displayedText.length > 0 && (
                  <span className="inline-block w-1 h-5 bg-foreground ml-1 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
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
              <Button
                onClick={startPresentation}
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button
                    onClick={resume}
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                ) : (
                  <Button
                    onClick={pause}
                    size="sm"
                    variant="outline"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={stop}
                  size="sm"
                  variant="outline"
                >
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
