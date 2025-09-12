'use client';

import { useState } from 'react';
import { Course } from '../types';
import { CourseCard } from './course-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid3X3, Eye } from 'lucide-react';

interface CourseGridProps {
  courses: Course[];
  title?: string;
  showViewToggle?: boolean;
  maxCourses?: number; // Limit number of courses to show
}

type ViewMode = 'grid' | 'single';

export function CourseGrid({
  courses,
  title = "Available Courses",
  showViewToggle = true,
  maxCourses
}: CourseGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Limit courses if maxCourses is specified
  const displayCourses = maxCourses ? courses.slice(0, maxCourses) : courses;

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setViewMode('single');
  };

  const handleBackToGrid = () => {
    setSelectedCourse(null);
    setViewMode('grid');
  };

  const handleEnroll = (course: Course) => {
    // Handle enrollment logic here
    console.log('Enrolling in course:', course.title);
  };

  if (viewMode === 'single' && selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            ← Back to Courses
          </Button>
          <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <CourseCard
            course={selectedCourse}
            onViewDetails={() => {}}
            onEnroll={handleEnroll}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">
            {displayCourses.length} course{displayCourses.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {showViewToggle && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Grid3X3 className="w-4 h-4" />
              Grid View
            </Badge>
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={handleViewDetails}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      {/* Show More Button */}
      {maxCourses && courses.length > maxCourses && (
        <div className="text-center">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View All {courses.length} Courses
          </Button>
        </div>
      )}
    </div>
  );
}
