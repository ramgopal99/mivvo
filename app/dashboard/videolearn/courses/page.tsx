"use client"

import Link from "next/link"
import { dummyCourses } from "../_data"
import { CourseList } from "../_components/course-list"
import { ArrowLeft } from "lucide-react"

export default function VideoLearnCoursesPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/dashboard/videolearn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">My courses</h1>
      <CourseList courses={dummyCourses} />
    </div>
  )
}
