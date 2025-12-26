"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, BookOpen, Star, ChevronRight } from 'lucide-react'
import type { Course, UserProgress } from '../types'


interface UserProgress {
  courseId: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
      <CardHeader className="p-0">
        {/* Course Image Placeholder */}
        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-primary/30" />
          </div>
          {course.hasDemo && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary hover:bg-primary/90">
                <Star className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Title */}
          <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="line-clamp-3 mb-4">
            {course.description || "Comprehensive learning experience with hands-on exercises and real-world applications."}
          </CardDescription>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ₹{course.price}
            </div>
            <div className="text-xs text-muted-foreground">
              One-time payment
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-4">
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

        {/* Action Button */}
        <Button
          onClick={() => onCourseClick(course)}
          className="w-full group-hover:bg-primary/90 transition-colors"
        >
          View Course
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

