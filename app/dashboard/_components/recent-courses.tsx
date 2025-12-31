"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Play } from "lucide-react"
import Link from "next/link"
import type { RecentCourse } from "../types"

interface RecentCoursesProps {
  courses: RecentCourse[]
}

export function RecentCourses({ courses }: RecentCoursesProps) {
  // Show only the last 2 courses
  const recentCourses = courses.slice(0, 2)

  const formatLastAccessed = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`

    return date.toLocaleDateString()
  }

  if (recentCourses.length === 0) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-start pb-6 h-full">
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">
              <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>All caught up!</p>
            <p className="text-sm">You&apos;ve completed all your enrolled courses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start pb-6 h-full">
        <div className="space-y-4">
          {recentCourses.map((course) => (
            <div key={course.id} className="relative p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-16">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {course.displayName}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {course.headerTitle}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {course.completionPercentage}%
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                <Progress value={course.completionPercentage} className="h-2" />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatLastAccessed(course.lastAccessed)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" asChild>
                  <Link href={`/courses/${course.courseId}`}>
                    <Play className="h-4 w-4 mr-1" />
                    Continue
                  </Link>
                </Button>
              </div>
            </div>
          ))}

          {courses.length > 2 && (
            <div className="text-center pt-4">
              <Button variant="outline" asChild>
                <Link href="/courses">
                  View All Courses
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
