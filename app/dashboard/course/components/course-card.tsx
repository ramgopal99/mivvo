'use client';

import { Course } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  onViewDetails?: (course: Course) => void;
  onEnroll?: (course: Course) => void;
}

export function CourseCard({ course, onViewDetails, onEnroll }: CourseCardProps) {
  // Suppress unused parameter warnings for optional callbacks
  void onViewDetails
  void onEnroll
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      {/* Course Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-white opacity-80" />
      </div>

      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            {course.title}
          </CardTitle>
          <Badge variant="outline" className={getLevelColor(course.level)}>
            {course.level}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>by</span>
          <span className="font-medium">{course.instructor}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{course.rating}</span>
          <span className="text-sm text-muted-foreground">({course.students} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{course.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">${course.price}</span>
        </div>

        <Link href={`/dashboard/course/${course.id}`}>
          <Button size="sm" className="flex items-center gap-2">
            View Course
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
