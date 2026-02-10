"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getCourseById } from "../../_data"
import { ArrowLeft, PlayCircle } from "lucide-react"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = getCourseById(courseId)

  if (!course) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <p className="text-muted-foreground">Course not found.</p>
        <Link href="/dashboard/videolearn/courses" className="text-sm text-primary mt-2 inline-block">
          Back to courses
        </Link>
      </div>
    )
  }

  const allLessons = course.modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({ ...lesson, moduleTitle: mod.title }))
  )

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/videolearn/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">{course.title}</h1>
        {course.description && (
          <p className="mt-1 text-muted-foreground">{course.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {allLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlayCircle className="h-5 w-5" />
            </span>
            <Link
              href={`/dashboard/videolearn/courses/${courseId}/lessons/${lesson.id}`}
              className="min-w-0 flex-1"
            >
              <h2 className="font-medium text-foreground hover:underline">{lesson.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{lesson.moduleTitle} · 5 slides</p>
            </Link>
            <Button asChild size="sm" className="shrink-0">
              <Link href={`/dashboard/videolearn/courses/${courseId}/lessons/${lesson.id}`}>
                Start
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
