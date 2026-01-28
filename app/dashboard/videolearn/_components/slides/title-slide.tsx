"use client"

import { useState, useEffect } from "react"
import { SlideWrapper } from "./slide-wrapper"
import type { TitleSlideContent } from "./types"
import { cn } from "@/lib/utils"

interface TitleSlideProps {
  title?: string
  content: TitleSlideContent
  /** When true, run stagger animation (title first, subtitle late). Only on Start. */
  isPlaying?: boolean
}

/** When isPlaying: title appears first, then subtitle with delay. When not playing: both shown static. */
export function TitleSlide({ title, content, isPlaying }: TitleSlideProps) {
  const mainTitle = title ?? "Presentation"
  const subtitle = content.subtitle

  const [showTitle, setShowTitle] = useState(!isPlaying)
  const [showSubtitle, setShowSubtitle] = useState(!isPlaying)

  useEffect(() => {
    if (!isPlaying) {
      setShowTitle(true)
      setShowSubtitle(true)
      return
    }
    setShowTitle(true)
    setShowSubtitle(false)
    const t = setTimeout(() => setShowSubtitle(true), 500)
    return () => clearTimeout(t)
  }, [isPlaying])

  return (
    <SlideWrapper
      noEnterAnimation
      noMinHeight
      className="flex flex-col items-center justify-center text-center"
    >
      <h1
        className={cn(
          "text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 max-w-3xl transition-all duration-500 ease-out",
          showTitle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        )}
      >
        {mainTitle}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "text-xl text-muted-foreground max-w-2xl transition-all duration-500 ease-out",
            showSubtitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          {subtitle}
        </p>
      )}
    </SlideWrapper>
  )
}
