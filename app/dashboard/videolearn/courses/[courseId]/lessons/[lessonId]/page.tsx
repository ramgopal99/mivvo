/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { getLessonById } from "../../../../_data"
import { VideoPresentation } from "../../../../_components/video-presentation"
import { assignRandomVariants } from "../../../../_components/assign-random-variants"
import type { TypedSlide } from "../../../../_components/slides"
import { ArrowLeft } from "lucide-react"
import { useMemo } from "react"

const SLIDES_PER_LESSON = 5

function buildDummySlides(lessonTitle: string): TypedSlide[] {
  const timing = { displayDelay: 0, ttsDuration: 5000 }
  const slides: TypedSlide[] = [
    {
      slideNumber: 1,
      type: "title_slide",
      title: lessonTitle,
      content: {
        tts: `Welcome to ${lessonTitle}.`,
        subtitle: "Let's get started.",
      },
      timing,
    },
    {
      slideNumber: 2,
      type: "bullet_points",
      title: "Key points",
      content: {
        tts: "Here are the main points we will cover.",
        bullets: ["First concept", "Second concept", "Third concept"],
      },
      timing,
    },
    {
      slideNumber: 3,
      type: "bullet_points",
      title: "Details",
      content: {
        tts: "Going deeper into the topic.",
        bullets: ["Step one", "Step two", "Step three"],
      },
      timing,
    },
    {
      slideNumber: 4,
      type: "bullet_points",
      title: "Examples",
      content: {
        tts: "Some practical examples.",
        bullets: ["Example A", "Example B", "Example C"],
      },
      timing,
    },
    {
      slideNumber: 5,
      type: "summary_slide",
      title: "Summary",
      content: {
        tts: "Summary of what we learned.",
        points: ["Takeaway one", "Takeaway two", "Takeaway three"],
      },
      timing,
    },
  ]
  return slides
}

export default function LessonPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const lessonId = params.lessonId as string
  const result = getLessonById(courseId, lessonId)

  const slides = useMemo(() => {
    if (!result) return []
    const raw = buildDummySlides(result.lesson.title)
    return assignRandomVariants(raw)
  }, [result])

  if (!result) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <p className="text-muted-foreground">Lesson not found.</p>
        <Link href="/dashboard/videolearn/courses" className="text-sm text-primary mt-2 inline-block">
          Back to courses
        </Link>
      </div>
    )
  }

  const { course, lesson } = result

  return (
    <div className="h-full min-h-0 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-3 bg-background">
      <div className="flex-1 min-h-0 w-full max-w-5xl flex flex-col overflow-hidden rounded-lg border border-border/60 shadow-sm bg-background">
        <div className="shrink-0 border-b border-border/80 px-3 py-2 flex items-center justify-between gap-2 min-h-0">
          <Link
            href={`/dashboard/videolearn/courses/${courseId}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <h1 className="text-sm font-semibold text-foreground truncate min-w-0 flex-1 text-right">{lesson.title}</h1>
        </div>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <VideoPresentation slides={slides} onComplete={() => {}} fillViewport />
        </div>
      </div>
    </div>
  )
}
