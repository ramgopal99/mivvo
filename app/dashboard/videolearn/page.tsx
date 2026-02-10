"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TypedSlide } from "./_components/slides"
import { VideoPresentation } from "./_components/video-presentation"
import { assignRandomVariants } from "./_components/assign-random-variants"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"

const DEFAULT_SLIDE_COUNT = 5

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

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Search / prompt + Generate */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Video Learn</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder='e.g. teach me React hooks, explain JavaScript promises'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Generate {DEFAULT_SLIDE_COUNT} slides
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Video presentation (after generate) */}
      {presentationSlides.length > 0 && (
        <VideoPresentation
          slides={presentationSlides}
          onComplete={() => toast.success("Presentation completed!")}
        />
      )}
    </div>
  )
}
