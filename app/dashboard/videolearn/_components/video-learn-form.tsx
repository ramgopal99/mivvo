"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2 } from "lucide-react"
import { VideoPresentation } from "./video-presentation"
import { toast } from "sonner"

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

export function VideoLearnPrompt() {
  const [prompt, setPrompt] = useState("")
  const [slideCount, setSlideCount] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [slides, setSlides] = useState<Slide[]>([])
  const [hasContent, setHasContent] = useState(false)

  const handleSend = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setHasContent(false)

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
    setPrompt("")
  }

  return (
    <div className="space-y-4">
      {/* Options Section */}
      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
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

      {/* Presentation */}
      {hasContent && slides.length > 0 && !isLoading && (
        <VideoPresentation
          slides={slides}
          onComplete={() => {
            toast.success("Presentation completed!")
          }}
        />
      )}
    </div>
  )
}
