"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Course, CourseStats } from './types';

interface CourseHeaderProps {
  course: Course;
  stats: CourseStats;
}

export default function CourseHeader({ course, stats }: CourseHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative border-b bg-gradient-to-br from-background via-background to-primary/5 pt-8">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => router.push('/courses')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Not your average course.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            {course.description || "Comprehensive learning experience with hands-on exercises and real-world applications."}
          </p>

          {/* CTA Button */}
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 mb-8">
            Buy now for ₹399
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.sections}</span>
              <span className="text-sm text-muted-foreground">Sections</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.lessons}</span>
              <span className="text-sm text-muted-foreground">Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

