"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, BookOpen, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { COURSE_ORIGINAL_PRICE } from '@/config/site'
import type { Course, UserProgress } from '../types'

interface CourseCardProps {
  course: Course
  progress?: UserProgress
  onCourseClick: (course: Course) => void
}

export function CourseCard({ course, progress, onCourseClick }: CourseCardProps) {
  const calculateTotalItems = (course: Course): number => {
    let total = 0;
    course.modules?.forEach(module => {
      module.topics?.forEach(() => {
        // Topics don't have status, so count them all
        total++;
      });
      module.exercises?.forEach((exercise) => {
        if (exercise.status !== 'locked') total++;
      });
    });
    return total;
  };

  const totalItems = calculateTotalItems(course);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1 cursor-pointer h-full flex flex-col">
      <CardHeader className="p-0">
        {/* Course Image */}
        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-primary/10 to-primary/5">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => {
                // This will trigger the error state in Next.js Image
                // The parent div will show the fallback
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-primary/30" />
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Title */}
          <div className="min-h-[3.5rem] mb-2">
            <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
          </div>
          
          {/* Description */}
          <div className="min-h-[4.5rem] mb-4">
            <CardDescription className="line-clamp-3">
              {course.description || "Comprehensive learning experience with hands-on exercises and real-world applications."}
            </CardDescription>
          </div>

          {/* Price: strikethrough original + what user pays */}
          <div className="flex items-center justify-between min-h-[2rem]">
            <div className="flex items-center gap-2 flex-wrap">
              {course.price > 0 && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{COURSE_ORIGINAL_PRICE}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ₹{course.price}
              </span>
              <span className="text-xs text-muted-foreground">(you pay)</span>
            </div>
            <div className="text-xs text-muted-foreground">
              One-time payment
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-4 flex-1 flex flex-col">
        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center">
            <BookOpen className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="text-sm font-medium">{course.modules?.length || 0}</span>
            <span className="text-xs text-muted-foreground">Modules</span>
          </div>
          <div className="flex flex-col items-center">
            <Play className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="text-sm font-medium">{totalItems}</span>
            <span className="text-xs text-muted-foreground">Lessons</span>
          </div>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress.percentage}%</span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              {progress.completedCount} of {progress.totalCount} completed
            </div>
          </div>
        )}

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Action Button */}
        <Button
          onClick={() => onCourseClick(course)}
          className="w-full group-hover:bg-primary/90 transition-colors mt-auto cursor-pointer"
        >
          View Course
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

