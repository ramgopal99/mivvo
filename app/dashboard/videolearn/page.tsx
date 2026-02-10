"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { TypedSlide } from "./_components/slides"
import { VideoPresentation } from "./_components/video-presentation"
import { assignRandomVariants } from "./_components/assign-random-variants"
import { ArrowUp, Loader2, BookOpen, Sparkles } from "lucide-react"
import { toast } from "sonner"

const DEFAULT_SLIDE_COUNT = 5

const SUGGESTED_PROMPTS = [
  "Explain React hooks in 5 minutes",
  "How does async/await work?",
  "Teach me the basics of REST APIs",
  "What are the best practices for component design?",
]

export default function VideoLearnPage() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [presentationSlides, setPresentationSlides] = useState<TypedSlide[]>([])

  const handleGenerate = async () => {
    const trimmed = prompt.trim()
    if (!trimmed) return

    setIsLoading(true)
    setPresentationSlides([])

    try {
      const res = await fetch("/api/videolearn/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmed,
          slideCount: DEFAULT_SLIDE_COUNT,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate content")
      }

      if (!data.success || !data.slides?.length) {
        throw new Error("No slides generated")
      }

      const withVariants = assignRandomVariants(data.slides)
      setPresentationSlides(withVariants)
      toast.success(`Generated ${withVariants.length} slides. Start the presentation below.`)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const hasPresentation = presentationSlides.length > 0

  // Presentation mode: full viewport, no scrolling
  if (hasPresentation) {
    return (
      <div className="h-full min-h-0 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between shrink-0 py-2 px-4 border-b bg-background/95 backdrop-blur">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setPresentationSlides([])}
          >
            <Sparkles className="h-4 w-4" />
            New topic
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link href="/dashboard/videolearn/courses">
              <BookOpen className="h-4 w-4" />
              My courses
            </Link>
          </Button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <VideoPresentation
            slides={presentationSlides}
            fillViewport
            onComplete={() => toast.success("Presentation completed!")}
          />
        </div>
      </div>
    )
  }

  // Form mode: scrollable page
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-3xl">
      <div className="flex justify-end">
        <Button variant="outline" asChild className="gap-2">
          <Link href="/dashboard/videolearn/courses">
            <BookOpen className="h-4 w-4" />
            My courses
          </Link>
        </Button>
      </div>
      <section className="flex flex-col items-center justify-center text-center space-y-2 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Generate video to learn any topic
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
          Describe a topic and get a video lesson—slides and narration, generated for you.
        </p>
      </section>

      <div className="space-y-4">
        <div className="relative rounded-xl border border-input bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring transition-[box-shadow,border-color]">
          <Textarea
            placeholder="e.g. Teach me React hooks, explain JavaScript promises..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleGenerate()
              }
            }}
            disabled={isLoading}
            rows={5}
            className="min-h-[140px] max-h-[320px] resize-y border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-xl bg-transparent py-4 pl-4 pr-14 text-base"
          />
          <Button
            type="button"
            size="icon"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="absolute right-3 bottom-3 size-9 rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="px-4 py-2 rounded-lg border border-input bg-background text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-accent transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
