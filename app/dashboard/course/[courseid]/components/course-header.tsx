'use client';

import { ArrowLeft, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useCourse } from './course-context';

export function CourseHeader() {
  const router = useRouter();
  const { courseProgress, totalLectures, completedLectures, courseInfo } = useCourse();

  const handleBackClick = () => {
    router.push('/dashboard/course');
  };

  return (
    <div className="bg-card border-b border-border p-4 flex items-center justify-between flex-shrink-0">
      {/* Left Side - Back Icon and Course Name */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-card-foreground">
            {courseInfo.name}
          </h1>
        </div>
      </div>

      {/* Right Side - Progress Bar */}
      <div className="flex items-center space-x-3">
        <div className="text-sm text-muted-foreground">
          {completedLectures}/{totalLectures} completed
        </div>
        <div className="w-32">
          <Progress value={courseProgress} className="h-2" />
        </div>
        <div className="text-sm font-medium text-card-foreground">
          {courseProgress}%
        </div>
      </div>
    </div>
  );
}
