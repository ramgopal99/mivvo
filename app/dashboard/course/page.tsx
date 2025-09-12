'use client';

import { CourseGrid } from './components/course-grid';
import { CourseCategories } from './components/course-categories';
import { dummyCourses } from './dummy-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, Tag } from 'lucide-react';

export default function CoursePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Discover and enroll in courses to enhance your skills
        </p>
      </div>

      {/* Tabbed Content */}
      <section className="space-y-6">
        <Tabs defaultValue="all-courses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="all-courses" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              All Courses
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-courses" className="mt-6">
            <CourseGrid
              courses={dummyCourses}
              title="All Available Courses"
              showViewToggle={true}
            />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CourseCategories courses={dummyCourses} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
