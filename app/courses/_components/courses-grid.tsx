"use client"

import { CourseCard } from "./course-card"
import { BookOpen } from "lucide-react"

interface SubLesson {
  id: string;
  title: string;
  status: string;
  order: number;
}

interface Exercise {
  id: string;
  title: string;
  status: string;
  order: number;
}

interface Module {
  id: string;
  title: string;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
  subLessons: SubLesson[];
  exercises: Exercise[];
}

interface Course {
  id: string;
  title: string;
  description?: string;
  hasDemo: boolean;
  isExpanded: boolean;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

interface UserProgress {
  courseId: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

interface CoursesGridProps {
  courses: Course[]
  userProgress: Record<string, UserProgress>
  onCourseClick: (courseId: string) => void
  loading?: boolean
}

export function CoursesGrid({ courses, userProgress, onCourseClick, loading = false }: CoursesGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-card rounded-lg shadow-md border">
            <div className="bg-muted h-48 rounded-t-lg"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No courses available</h3>
        <p className="text-muted-foreground">Check back later for new courses and learning opportunities.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={userProgress[course.id]}
          onCourseClick={onCourseClick}
        />
      ))}
    </div>
  )
}

