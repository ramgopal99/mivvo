"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Course {
  id: string;
  courseId: string;
  displayName: string;
  description?: string;
  price: number;
  modules: Array<{
    id: string;
    title: string;
    order: number;
  }>;
  showCodeEditor?: boolean;
  monacoLanguage?: string;
  codeDisplayName?: string;
  aiAssistantName?: string;
  aiAssistantDescription?: string;
  userProgress?: {
    completedItems: number;
    totalItems: number;
    progressPercentage: number;
    isEnrolled: boolean;
  };
}

export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

  useEffect(() => {
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

  const handleCourseSelect = (courseId: string) => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  const handleEnrollCourse = async (courseId: string) => {
    setEnrollingCourseId(courseId);
    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        // Refresh courses to update enrollment status
        const coursesResponse = await fetch('/api/courses');
        if (coursesResponse.ok) {
          const updatedCourses = await coursesResponse.json();
          setCourses(updatedCourses);
        }
        // Redirect to the enrolled course
        router.push(`/dashboard/courses/${courseId}`);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const getCourseIcon = () => {
    return <Code className="w-8 h-8 text-blue-500" />;
  };


  // Separate enrolled and non-enrolled courses
  const enrolledCourses = courses.filter(course => course.userProgress?.isEnrolled);
  const nonEnrolledCourses = courses.filter(course => !course.userProgress?.isEnrolled);
  const exploreCourses = nonEnrolledCourses.slice(0, 4); // Show only 4 courses in explore section

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Enrolled Courses Section */}
        {enrolledCourses.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your Enrolled Courses
              </h2>
              <p className="text-muted-foreground">
                Continue learning with your enrolled courses
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.courseId}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleCourseSelect(course.courseId)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {getCourseIcon()}
                    </div>
                    <CardTitle className="text-2xl capitalize">
                      {course.displayName}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {course.showCodeEditor
                        ? `Learn ${course.displayName.toLowerCase()} programming with interactive coding exercises`
                        : `Learn ${course.displayName.toLowerCase()} with comprehensive exercises and practice questions`
                      }
                      {course.codeDisplayName && (
                        <span className="block text-sm text-muted-foreground mt-1">
                          Includes {course.codeDisplayName} code editor and {course.aiAssistantName || 'AI assistant'}
                        </span>
                      )}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-primary">
                            {course.userProgress?.progressPercentage || 0}%
                          </span>
                        </div>
                        <Progress value={course.userProgress?.progressPercentage || 0} className="h-2" />
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseSelect(course.courseId);
                      }}
                    >
                      Continue {course.displayName} Course
                    </Button>
                    {course.showCodeEditor && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        🖥️ Interactive coding • 🤖 AI assistant • 📚 {course.modules?.length || 0} modules
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Explore More Courses Section */}
        <div className="mb-12">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Explore Courses
              </h2>
              <p className="text-muted-foreground">
                Discover new skills and expand your knowledge
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/courses')}
              className="px-6 py-2"
            >
              View All Courses
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreCourses.map((course) => (
              <Card
                key={course.courseId}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => handleCourseSelect(course.courseId)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {getCourseIcon()}
                  </div>
                  <CardTitle className="text-2xl capitalize">
                    {course.displayName}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {course.showCodeEditor
                      ? `Learn ${course.displayName.toLowerCase()} programming with interactive coding exercises`
                      : `Learn ${course.displayName.toLowerCase()} with comprehensive exercises and practice questions`
                    }
                    {course.codeDisplayName && (
                      <span className="block text-sm text-muted-foreground mt-1">
                        Includes {course.codeDisplayName} code editor and {course.aiAssistantName || 'AI assistant'}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary mb-2">
                      ₹{course.price}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/courses/${course.courseId}`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 cursor-pointer"
                      disabled={enrollingCourseId === course.courseId}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnrollCourse(course.courseId);
                      }}
                    >
                      {enrollingCourseId === course.courseId ? 'Enrolling...' : 'Buy Now'}
                    </Button>
                  </div>
                  {course.showCodeEditor && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      🖥️ Interactive coding • 🤖 AI assistant • 📚 {course.modules?.length || 0} modules
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}