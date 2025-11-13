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
  Course,
  CourseStats
} from './components';

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          // Expand first module by default
          if (data.modules && data.modules.length > 0) {
            setExpandedModules(new Set([data.modules[0].id]));
          }
        } else {
          console.error('Failed to fetch course');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
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
      totalLessons += module.subLessons?.length || 0;
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
      />
      <CourseFeatures />
      <CourseFAQ courseTitle={course.title} stats={stats} />
      <CourseFooter />
    </div>
  );
}

