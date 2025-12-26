"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  CourseHeader,
  CourseOverview,
  CourseFeatures,
  CourseFooter,
  CourseFAQ,
  LoadingState,
  NotFoundState,
  CourseStats
} from './components';
import { Course } from '../types';

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('Fetching course with ID:', courseId);
        const response = await fetch(`/api/courses/${courseId}`);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log('Course data received:', data);

          // Transform the data to match our interface
          const transformedCourse = {
            ...data,
            modules: data.modules?.map((module: {
              id: number | string;
              title: string;
              order?: number;
              topics?: unknown[];
              exercises?: unknown[]
            }) => ({
              ...module,
              id: module.id.toString(), // Ensure id is string
            })) || []
          };

          setCourse(transformedCourse);
          // Expand first module by default
          if (transformedCourse.modules && transformedCourse.modules.length > 0) {
            setExpandedModules(new Set([transformedCourse.modules[0].id]));
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch course:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          setError(`Course not found (Status: ${response.status})`);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const calculateStats = (): CourseStats => {
    if (!course) return { sections: 0, lessons: 0 };

    let totalLessons = 0;

    course.modules?.forEach(module => {
      totalLessons += module.topics?.length || 0;
      totalLessons += module.exercises?.length || 0; // Include exercises in lessons count
    });

    return {
      sections: course.modules?.length || 0,
      lessons: totalLessons
    };
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2">Error Loading Course</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 border border-border bg-card text-card-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return <NotFoundState />;
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      <CourseHeader course={course} stats={stats} />
      <CourseOverview
        modules={course.modules}
        expandedModules={expandedModules}
        onToggleModule={toggleModule}
        courseId={courseId}
      />
      <CourseFeatures />
      <CourseFAQ courseTitle={course.title} stats={stats} />
      <CourseFooter />

      {/* Fixed Bottom Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Pricing Info */}
            <div className="flex items-center gap-4">
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Course Price</div>
                <div className="text-2xl font-bold text-primary">
                  ₹{course.price}
                </div>
                <div className="text-xs text-muted-foreground">
                  One-time payment
                </div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">What&apos;s included</div>
                <div className="text-sm font-medium">Lifetime access + Certificate</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 border border-border bg-card text-card-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium cursor-pointer">
                Buy Now
              </button>
              <button
                onClick={() => window.location.href = `/courses/${courseId}/demo`}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium cursor-pointer"
              >
                See Demo Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding to body to account for fixed footer */}
      <div className="pb-24"></div>
    </div>
  );
}

