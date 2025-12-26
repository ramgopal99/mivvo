"use client";

import type { Course } from '../../types';
import { CourseStats } from './index';

interface CourseHeaderProps {
  course: Course;
  stats: CourseStats;
}

export default function CourseHeader({ course, stats }: CourseHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {course.title}
          </h1>
          {course.description && (
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {course.description}
            </p>
          )}

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.sections}</div>
              <div className="text-sm text-muted-foreground">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.lessons}</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
