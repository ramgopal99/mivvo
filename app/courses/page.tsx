/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { CoursesHeader, CoursesGrid } from "./_components"
import type { Course, UserProgress } from "./types"


export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data as Course[]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const calculateTotalItems = (course: Course): number => {
    let total = 0;
    course.modules?.forEach(module => {
      module.topics?.forEach(() => {
        // Topics don't have status, so count them all
        total++;
      });
      module.exercises?.forEach((exercise) => {
        if (exercise.status !== 'locked') total++;
      });
    });
    return total;
  };

  // Fetch user progress when courses are loaded
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (courses.length === 0) return;

      try {
        // Get user token for progress
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('student_token') ||
                     localStorage.getItem('college_token');

        if (token) {
          const progressPromises = courses.map(async (course) => {
            try {
              const response = await fetch(`/api/user-progress?courseId=${course.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (response.ok) {
                const progress = await response.json();
                return {
                  courseId: course.id,
                  completedCount: progress.length,
                  totalCount: calculateTotalItems(course),
                  percentage: Math.round((progress.length / calculateTotalItems(course)) * 100)
                };
              }
            } catch (error) {
              console.error(`Error fetching progress for course ${course.id}:`, error);
            }
            return null;
          });

          const progressResults = await Promise.all(progressPromises);
          const progressMap: Record<string, UserProgress> = {};
          progressResults.forEach(result => {
            if (result) {
              progressMap[result.courseId] = result;
            }
          });
          setUserProgress(progressMap);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchUserProgress();
  }, [courses]);

  const handleCourseClick = (course: Course) => {
    // Use courseId instead of id for navigation
    router.push(`/courses/${course.courseId || course.id}`);
  };

  // Type assertion to match CoursesGrid expectations
  const handleCourseGridClick = (course: any) => handleCourseClick(course);

  // Sort courses by creation date (newest first)
  const sortedCourses = useMemo(() => {
    return [...courses].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [courses]);

  return (
    <div className="min-h-screen bg-background">
      {/* Courses Header */}
      <CoursesHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Results Info */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {/* Courses Grid */}
        <CoursesGrid
          courses={sortedCourses as Course[]}
          userProgress={userProgress}
          onCourseClick={handleCourseGridClick}
          loading={loading}
        />
      </main>
    </div>
  )
}
