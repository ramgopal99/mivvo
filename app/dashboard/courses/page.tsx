"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAvailableCourses, getCourseDisplayName } from '../../test/config';

interface Course {
  id: string;
  courseId: string;
  displayName: string;
  description?: string;
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
}

export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

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

  const getCourseIcon = () => {
    return <Code className="w-8 h-8 text-blue-500" />;
  };

  const availableLanguages = ['all', ...getAvailableCourses()];

  const filteredCourses = selectedLanguage === 'all'
    ? courses
    : courses.filter(course => course.courseId === selectedLanguage);

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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Programming Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your programming language and start your learning journey with interactive exercises and comprehensive modules.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex gap-2 justify-center mb-8 p-4 border border-border rounded-lg bg-muted/20">
          <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Filter by Course:</span>
          {availableLanguages.map((language) => (
            <Button
              key={language}
              variant={selectedLanguage === language ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLanguage(language)}
              className="capitalize"
            >
              {language === 'all' ? 'All Courses' : getCourseDisplayName(language)}
            </Button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                <Button
                  size="lg"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseSelect(course.courseId);
                  }}
                >
                  Start {course.displayName} Course
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

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            Interactive learning platform • {filteredCourses.length} {selectedLanguage === 'all' ? 'programming courses' : `${getCourseDisplayName(selectedLanguage)} course`} • Hands-on exercises
          </div>
        </div>
      </div>
    </div>
  );
}