/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Play } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  order?: number;
  topics?: Array<{
    id: string;
    title: string;
    order?: number;
    content?: string;
  }>;
  exercises?: Array<{
    id: string;
    title: string;
    order?: number;
    type?: 'mcq' | 'code';
    mcqQuestions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
    }>;
    codeQuestions?: Array<{
      id: string;
      question: string;
      solution: string;
    }>;
  }>;
}

interface CourseOverviewProps {
  modules?: Module[];
  expandedModules: Set<string>;
  onToggleModule: (moduleId: string) => void;
  courseId?: string;
}

export default function CourseOverview({ modules = [], expandedModules, onToggleModule, courseId }: CourseOverviewProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Check enrollment status on component mount
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!courseId) return;

      try {
        const response = await fetch(`/api/courses/enroll?courseId=${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setIsEnrolled(data.isEnrolled);
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    };

    checkEnrollment();
  }, [courseId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Course Modules</h2>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Explore the Full Experience</h3>
              <p className="text-sm text-muted-foreground">
                Discover the complete learning interface with advanced navigation, interactive content, and professional design.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => {
          const isExpanded = expandedModules.has(module.id);

          return (
            <div
              key={module.id}
              className="border rounded-lg overflow-hidden transition-all duration-200 border-border bg-card hover:shadow-md"
            >
              {/* Module Header */}
              <button
                onClick={() => onToggleModule(module.id)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {module.topics?.length || 0} topics • {module.exercises?.length || 0} exercises
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Module Content */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/20">
                  <div className="p-6">
                    {/* Topics */}
                    {module.topics && module.topics.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Topics</h4>
                        <div className="space-y-2">
                          {module.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className="flex items-center gap-3 p-3 rounded-md bg-background border border-border"
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                                'bg-blue-500 text-white'
                              }`}>
                                {module.order}.{topic.order || 1}
                              </div>
                              <span className="text-sm text-foreground">{topic.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exercises */}
                    {module.exercises && module.exercises.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Exercises</h4>
                        <div className="space-y-2">
                          {module.exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="flex items-center gap-3 p-3 rounded-md bg-background border border-border"
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                'bg-blue-500 text-white'
                              }`}>
                                {exercise.type === 'mcq' ? 'Q' : exercise.type === 'code' ? '</>' : '○'}
                              </div>
                              <span className="text-sm text-foreground">{exercise.title}</span>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {exercise.type?.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
