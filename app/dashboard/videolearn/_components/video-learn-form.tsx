"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2, PlayCircle } from "lucide-react"
import { VideoPresentation } from "./video-presentation"
import type { TypedSlide } from "./slides"
import { DEMO_SLIDES } from "./demo-slides"
import { toast } from "sonner"

export function VideoLearnPrompt() {
  const [prompt, setPrompt] = useState("")
  const [slideCount, setSlideCount] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [slides, setSlides] = useState<TypedSlide[]>([])
  const [hasContent, setHasContent] = useState(false)
  const [demoReady, setDemoReady] = useState(false)
  const [startFromDemo, setStartFromDemo] = useState(false)

  const handleSend = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setHasContent(false)
    setDemoReady(false)

    try {
      const response = await fetch("/api/videolearn/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: prompt.trim(),
          slideCount
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content")
      }

      if (data.success && data.slides && data.slides.length > 0) {
        setSlides(data.slides)
        setHasContent(true)
        toast.success(`Generated ${data.slides.length} slides!`)
      } else {
        throw new Error("No slides generated")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate content. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSlides([])
    setHasContent(false)
    setDemoReady(false)
    setStartFromDemo(false)
    setPrompt("")
  }

  const handleDemo = () => {
    setSlides(DEMO_SLIDES)
    setHasContent(true)
    setDemoReady(true)
    setStartFromDemo(false)
    toast.success("Demo ready. Click Start to begin.")
  }

  const handleStartDemo = () => {
    setDemoReady(false)
    setStartFromDemo(true)
  }

  return (
    <div className="space-y-4">
      {/* Options Section */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[160px] space-y-2">
          <Label htmlFor="slideCount">Number of Slides</Label>
          <Select 
            value={slideCount.toString()} 
            onValueChange={(value) => setSlideCount(parseInt(value))}
          >
            <SelectTrigger id="slideCount" disabled={isLoading}>
              <SelectValue placeholder="Select slides" />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'slide' : 'slides'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleDemo}
          disabled={isLoading}
          className="shrink-0"
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          Demo
        </Button>
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <Input
          placeholder='Try: "teach me about React hooks" or "explain JavaScript promises"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSend()
            }
          }}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!prompt.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
        {hasContent && (
          <Button onClick={handleReset} variant="outline">
            New
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Generating your learning content...</p>
        </div>
      )}

      {/* Demo placeholder: simple "Demo" in middle + Start (no slides, no animation) */}
      {hasContent && demoReady && slides.length > 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[320px] rounded-xl border bg-muted/30 p-8">
          <p className="text-4xl font-medium text-muted-foreground mb-6">Demo</p>
          <Button onClick={handleStartDemo} size="lg">
            <PlayCircle className="h-5 w-5 mr-2" />
            Start
          </Button>
        </div>
      )}

      {/* Presentation (after Start from demo, or after generate from prompt) */}
      {hasContent && !demoReady && slides.length > 0 && !isLoading && (
        <VideoPresentation
          slides={slides}
          autoStart={startFromDemo}
          onAutoStartDone={() => setStartFromDemo(false)}
          onComplete={() => {
            toast.success("Presentation completed!")
          }}
        />
      )}
    </div>
  )
}
