"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';

interface CourseModule {
  id: string;
  title: string;
  subLessons: unknown[];
  exercises: unknown[];
}

interface Course {
  id: string;
  title: string;
  description?: string;
  modules: CourseModule[];
  createdAt: string;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if courses are enabled
  useEffect(() => {
    if (!siteConfig.enableCourses) {
      router.push('/dashboard');
      return;
    }
  }, [router]);

  useEffect(() => {
    // Don't fetch courses if they're disabled
    if (!siteConfig.enableCourses) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Split courses - for now assuming all are explore courses
  // TODO: Add logic to separate enrolled vs explore courses
  const enrolledCourses: Course[] = [];
  const exploreCourses = courses.slice(0, 6); // Limit to 6 courses

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Access and learn from our comprehensive programming courses
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {courses.length} Courses Available
        </Badge>
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No enrolled courses yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and enroll in courses below
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.description && (
                        <CardDescription>{course.description}</CardDescription>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.modules.length} Modules
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Self-paced</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleViewCourse(course.id)}
                      className="w-full flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Explore Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Explore Courses</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View More Courses
          </Button>
        </div>

        {exploreCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Courses Available</h3>
            <p className="text-muted-foreground">
              Check back later for new programming courses.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {exploreCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      {course.description && (
                        <CardDescription>{course.description}</CardDescription>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.modules.length} Modules
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Self-paced</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Created {new Date(course.createdAt).toLocaleDateString()}
                      </div>
                      <Button
                        onClick={() => handleViewCourse(course.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}