"use client"

import Link from "next/link"
import type { Course } from "../_data"
import { BookOpen, ChevronRight } from "lucide-react"

function lessonCount(course: Course) {
  return course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
}

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((course) => (
        <li key={course.id}>
          <Link href={`/dashboard/videolearn/courses/${course.id}`}>
            <article className="group h-full rounded-xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
            <div className="flex h-full flex-col">
              <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
                {course.title}
              </h3>
              {course.description && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                  {course.description}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  {lessonCount(course)} lessons
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}
