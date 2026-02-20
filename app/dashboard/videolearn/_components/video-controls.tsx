"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Play, Pause, Square, Maximize, Minimize2, Settings, Check, ChevronRight, ChevronLeft, Volume2, List } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const SPEED_OPTIONS = [
  { value: "0.75", label: "0.75×" },
  { value: "1", label: "1×" },
  { value: "1.25", label: "1.25×" },
  { value: "1.5", label: "1.5×" },
] as const

export interface VideoControlsProps {
  isPlaying: boolean
  isPaused: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
  /** Volume 0–1. When provided with onVolumeChange, shows volume control. */
  volume?: number
  onVolumeChange?: (volume: number) => void
  /** When true, AI voice caption is shown on screen. */
  captionEnabled?: boolean
  onCaptionChange?: (enabled: boolean) => void
  /** Current slide/topic title to show beside volume. */
  currentSlideTitle?: string
  /** List of slide titles for topic list (index + title). When provided, shows arrow to open list and user can click to go to that slide. */
  slides?: { title: string; index: number }[]
  /** Current slide index (for highlighting in topic list). */
  currentSlideIndex?: number
  /** Called when user selects a topic/slide to jump to. */
  onSeekToSlide?: (index: number) => void
  /** When true, renders as overlay bar (gradient, hover-to-show). Otherwise inline. */
  overlay?: boolean
  /** Ref to the video/slide container to fullscreen. When provided, shows a fullscreen toggle button. */
  containerRef?: React.RefObject<HTMLElement | null>
}

export function VideoControls({
  isPlaying,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  playbackRate,
  onPlaybackRateChange,
  volume = 1,
  onVolumeChange,
  captionEnabled = false,
  onCaptionChange,
  currentSlideTitle,
  slides = [],
  currentSlideIndex = 0,
  onSeekToSlide,
  overlay = true,
  containerRef,
}: VideoControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsView, setSettingsView] = useState<"main" | "playback" | "caption">("main")
  const [volumeOpen, setVolumeOpen] = useState(false)
  const [topicsOpen, setTopicsOpen] = useState(false)
  const [localVolume, setLocalVolume] = useState(1)
  const volumeValue = volume !== undefined ? volume : localVolume
  const handleVolumeChange = useCallback(
    (v: number) => {
      setLocalVolume(v)
      onVolumeChange?.(v)
    },
    [onVolumeChange]
  )

  const updateFullscreenState = useCallback(() => {
    if (typeof document === "undefined") return
    setIsFullscreen(!!document.fullscreenElement)
  }, [])

  useEffect(() => {
    document.addEventListener("fullscreenchange", updateFullscreenState)
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState)
  }, [updateFullscreenState])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef?.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen()
    }
  }, [containerRef])

  const primaryButtonClass = "bg-primary/90 hover:bg-primary text-white"
  const fullscreenButton = containerRef ? (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={overlay ? `h-8 w-8 p-0 ${primaryButtonClass} border-0` : `h-8 w-8 p-0 ${primaryButtonClass} border-0`}
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
    >
      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
    </Button>
  ) : null

  const iconBtnClass = `h-8 w-8 p-0 ${primaryButtonClass} border-0`

  const leftControls = (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Play / Pause (icon only) */}
      {!isPlaying ? (
        <Button onClick={onStart} size="sm" className={iconBtnClass} aria-label="Start">
          <Play className="h-4 w-4" />
        </Button>
      ) : (
        <>
          {isPaused ? (
            <Button onClick={onResume} size="sm" className={iconBtnClass} aria-label="Resume">
              <Play className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onPause} size="sm" variant="secondary" className={iconBtnClass} aria-label="Pause">
              <Pause className="h-4 w-4" />
            </Button>
          )}
          <Button onClick={onStop} size="sm" variant="secondary" className={iconBtnClass} aria-label="Stop">
            <Square className="h-4 w-4" />
          </Button>
        </>
      )}
      {/* Volume */}
      <Popover open={volumeOpen} onOpenChange={setVolumeOpen}>
        <PopoverTrigger asChild>
          <Button type="button" size="sm" variant="secondary" className={iconBtnClass} aria-label="Volume">
            <Volume2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-40 p-3" sideOffset={8}>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <Slider
              value={[volumeValue * 100]}
              onValueChange={(v) => handleVolumeChange(v[0] / 100)}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </PopoverContent>
      </Popover>
      {/* Gap + current topic + arrow to open topics list */}
      {(currentSlideTitle != null || slides.length > 0) && (
        <>
          <div className="w-2 sm:w-3 shrink-0" aria-hidden />
          <span className="text-sm text-white/95 truncate max-w-[100px] sm:max-w-[160px]" title={currentSlideTitle}>
            {currentSlideTitle ?? "—"}
          </span>
          {slides.length > 0 && onSeekToSlide && (
            <Popover open={topicsOpen} onOpenChange={setTopicsOpen}>
              <PopoverTrigger asChild>
                <Button type="button" size="sm" variant="secondary" className={iconBtnClass} aria-label="Topics / go to slide">
                  <List className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="start" className="w-64 p-0 max-h-64 overflow-y-auto" sideOffset={8}>
                <div className="p-2 border-b border-border/80">
                  <p className="text-sm font-semibold text-foreground">Topics</p>
                  <p className="text-xs text-muted-foreground">Click to go to topic</p>
                </div>
                <div className="p-1">
                  {slides.map(({ title, index }) => {
                    const isActive = index === currentSlideIndex
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          onSeekToSlide(index)
                          setTopicsOpen(false)
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-accent/50 transition-colors ${isActive ? "bg-primary/10 text-primary font-medium" : ""}`}
                      >
                        <span className="truncate">{title || `Slide ${index + 1}`}</span>
                        {isActive && <Check className="h-4 w-4 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  )

  const handleSettingsOpenChange = useCallback((open: boolean) => {
    setSettingsOpen(open)
    if (!open) setSettingsView("main")
  }, [])

  const currentSpeedLabel = SPEED_OPTIONS.find((o) => Number(o.value) === playbackRate)?.label ?? "1×"

  const settingsControl = (
    <Popover open={settingsOpen} onOpenChange={handleSettingsOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className={`h-8 w-8 p-0 ${primaryButtonClass} border-0`}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-52 p-0" sideOffset={8}>
        {settingsView === "main" && (
          <>
            <div className="p-2">
              <button
                type="button"
                onClick={() => setSettingsView("playback")}
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors rounded-md"
              >
                <span>Playback</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  {currentSpeedLabel}
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSettingsView("caption")}
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors rounded-md"
              >
                <span>Caption</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </>
        )}
        {settingsView === "playback" && (
          <>
            <div className="flex items-center gap-1 p-2 border-b border-border/80">
              <button
                type="button"
                onClick={() => setSettingsView("main")}
                className="p-1 rounded hover:bg-accent/50 transition-colors"
                aria-label="Back"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold text-foreground">Playback speed</p>
            </div>
            <div className="p-2">
              {SPEED_OPTIONS.map((opt) => {
                const isSelected = playbackRate === Number(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onPlaybackRateChange(Number(opt.value))
                      setSettingsOpen(false)
                      setSettingsView("main")
                    }}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors rounded-md"
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                )
              })}
            </div>
          </>
        )}
        {settingsView === "caption" && (
          <>
            <div className="flex items-center gap-1 p-2 border-b border-border/80">
              <button
                type="button"
                onClick={() => setSettingsView("main")}
                className="p-1 rounded hover:bg-accent/50 transition-colors"
                aria-label="Back"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold text-foreground">Caption</p>
            </div>
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 pb-2">Show AI voice text on screen</p>
              {["Off", "On"].map((opt) => {
                const isOn = opt === "On"
                const isSelected = captionEnabled === isOn
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onCaptionChange?.(isOn)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-left hover:bg-accent/50 transition-colors rounded-md"
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )

  const rightControls = (
    <div className="flex items-center gap-2">
      {settingsControl}
      {fullscreenButton}
    </div>
  )

  if (overlay) {
    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center py-3 px-3 sm:px-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
        {leftControls}
        {rightControls}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      {leftControls}
      {rightControls}
    </div>
  )
}
