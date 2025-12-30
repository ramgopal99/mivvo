"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { ChevronDown, ChevronRight, Lock, Award } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useSession } from 'next-auth/react';
import { CourseModule } from '../data/lessonsData';

interface ProgressModule {
  moduleId: string;
  moduleTitle: string;
  moduleOrder: number;
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
  topics?: Array<{ id: string; title: string; order: number; isCompleted: boolean }>;
  exercises?: Array<{ id: string; title: string; order: number; isCompleted: boolean }>;
}

interface ProgressData {
  courseId: string;
  courseTitle: string;
  displayName: string;
  overallProgress: number;
  totalItems: number;
  totalCompleted: number;
  modules?: ProgressModule[];
}

interface LeftSidebarProps {
  modules: CourseModule[];
  courseId?: string;
  onSubtopicClick?: (moduleId: number, subtopicId: string, title: string, moduleTitle: string) => void;
  onCheckedItemsChange?: (count: number) => void;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
  hasRightSection?: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ modules, courseId, onSubtopicClick, onCheckedItemsChange, selectedTopic, hasRightSection = true }) => {
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  // const [activeModule, setActiveModule] = useState<number>(1);
  // const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<{moduleId: number, subtopicId: string} | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<{moduleId: number, exerciseId: string} | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  const { data: session } = useSession();


  // Update sidebar highlighting when selectedTopic changes (from navigation buttons)
  useEffect(() => {
    if (selectedTopic) {
      setSelectedModule(selectedTopic.moduleId);

      // Auto-expand the module when navigating to it (only if not locked)
      setExpandedModules(prev => {
        const currentModuleData = modules.find(m => m.order === selectedTopic.moduleId);
        if (!prev.includes(selectedTopic.moduleId) && !currentModuleData?.hasDemo) {
          return [...prev, selectedTopic.moduleId];
        }
        return prev;
      });

      // Check if it's a subtopic or exercise
      const currentModuleData = modules.find(m => m.order === selectedTopic.moduleId);
      const isSubtopic = currentModuleData?.topics?.some(t => t.id === selectedTopic.subtopicId);
      const isExercise = currentModuleData?.exercises?.some(ex => ex.id === selectedTopic.subtopicId);

      if (isSubtopic) {
        setSelectedSubtopic({ moduleId: selectedTopic.moduleId, subtopicId: selectedTopic.subtopicId });
        setSelectedExercise(null);
      } else if (isExercise) {
        setSelectedExercise({ moduleId: selectedTopic.moduleId, exerciseId: selectedTopic.subtopicId });
        setSelectedSubtopic(null);
      }
    }
  }, [selectedTopic, modules]);

  // Load user progress when component mounts or session changes
  useEffect(() => {
    const loadUserProgress = async () => {
      // Don't load progress in demo mode
      const isDemoMode = window.location.pathname.includes('/demo');
      if (isDemoMode) {
        setCheckedItems(new Set()); // Clear progress for demo mode
        return;
      }

      if (!session?.user) {
        setCheckedItems(new Set()); // Clear progress for unauthenticated users
        return;
      }

      try {
        const finalCourseId = courseId || (() => {
          const urlParts = window.location.pathname.split('/');
          return urlParts[urlParts.length - 1];
        })();

        const response = await fetch(`/api/courses/progress?courseId=${finalCourseId}`);
        console.log('Loading progress, response status:', response.status);

        if (response.ok) {
          const progressData: ProgressData = await response.json();
          console.log('Progress data loaded:', {
            overallProgress: progressData.overallProgress,
            totalCompleted: progressData.totalCompleted,
            totalItems: progressData.totalItems,
            modulesCount: progressData.modules?.length
          });

          // Build checked items set from progress data
          const newCheckedItems = new Set<string>();
          progressData.modules?.forEach((moduleProgress) => {
            console.log(`Module ${moduleProgress.moduleOrder}: ${moduleProgress.completedItems}/${moduleProgress.totalItems} completed`);
            moduleProgress.topics?.forEach((topic) => {
              if (topic.isCompleted) {
                const itemKey = `module-${moduleProgress.moduleOrder}-topic-${topic.order}`;
                console.log('Adding completed topic:', itemKey);
                newCheckedItems.add(itemKey);
              }
            });
            moduleProgress.exercises?.forEach((exercise) => {
              if (exercise.isCompleted) {
                const itemKey = `module-${moduleProgress.moduleOrder}-exercise-${exercise.order}`;
                console.log('Adding completed exercise:', itemKey);
                newCheckedItems.add(itemKey);
              }
            });
          });
          console.log('Total checked items loaded:', newCheckedItems.size);

          setCheckedItems(newCheckedItems);
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
      }
    };

    loadUserProgress();
  }, [session, modules, courseId]);

  // Removed auto-scroll to top - let users maintain their scroll position
  // This allows clicking on lower topics without the sidebar jumping to top

  const toggleModule = (moduleId: number) => {
    const moduleData = modules.find(m => m.order === moduleId);
    if (moduleData?.hasDemo) return; // Prevent toggling locked modules

    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
    // setActiveModule(moduleId);
  };

  const handleLessonClick = (moduleId: number, lessonId: string) => {
    const moduleData = modules.find(m => m.order === moduleId);
    if (moduleData?.hasDemo) return; // Prevent clicking on locked module topics

    const subLesson = moduleData?.topics.find(t => t.id === lessonId);

    // Set the selected module and subtopic for highlighting
    setSelectedModule(moduleId);
    setSelectedSubtopic({ moduleId, subtopicId: lessonId });
    setSelectedExercise(null); // Clear exercise selection

    if (moduleData && subLesson && onSubtopicClick) {
      onSubtopicClick(moduleId, lessonId, subLesson.title, moduleData.title);
    }

    console.log(`Clicked lesson: Module ${moduleId}, Lesson ${lessonId}${subLesson ? `, itemKey: module-${moduleId}-topic-${subLesson.order}` : ''}`);
  };

  const handleExerciseClick = (exerciseId: string, moduleId: number) => {
    const moduleData = modules.find(m => m.order === moduleId);
    if (moduleData?.hasDemo) return; // Prevent clicking on locked module exercises

    const exercise = moduleData?.exercises?.find(ex => ex.id === exerciseId);

    // Set the selected module and exercise for highlighting
    setSelectedModule(moduleId);
    setSelectedExercise({ moduleId, exerciseId });
    setSelectedSubtopic(null); // Clear subtopic selection

    if (moduleData && exercise && onSubtopicClick) {
      // Pass exercise info to middle section
      onSubtopicClick(moduleId, exerciseId, exercise.title, moduleData.title);
    }

    console.log(`Clicked exercise: ${exerciseId} in module ${moduleId}`);
  };

  const toggleItem = async (itemKey: string) => {
    // Check if we're in demo mode
    const isDemoMode = window.location.pathname.includes('/demo');
    if (isDemoMode) {
      // In demo mode, just toggle locally without any API calls or dialogs
      setCheckedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemKey)) {
          newSet.delete(itemKey);
        } else {
          newSet.add(itemKey);
        }
        return newSet;
      });
      return;
    }


    const isCurrentlyChecked = checkedItems.has(itemKey);
    const newCheckedState = !isCurrentlyChecked;

    // Update local state optimistically
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newCheckedState) {
        newSet.add(itemKey);
      } else {
        newSet.delete(itemKey);
      }
      return newSet;
    });

    try {
      // Use courseId from props, fallback to URL extraction if not provided
      const finalCourseId = courseId || (() => {
        const urlParts = window.location.pathname.split('/');
        return urlParts[urlParts.length - 1];
      })();

      // Parse itemKey to get module info
      const parts = itemKey.split('-');
      const moduleOrder = parseInt(parts[1]);
      const itemType = parts[2]; // 'topic' or 'exercise'

      // Find the module and item details
      const currentModule = modules.find(m => m.order === moduleOrder);
      if (!currentModule) return;

      // Call API to update progress

      console.log('Sending progress update:', { itemKey, newCheckedState, courseId: finalCourseId, moduleId: currentModule.id });

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('/api/courses/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: finalCourseId,
            moduleId: currentModule.id,
            itemType,
            itemKey,
            isCompleted: newCheckedState,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log('Progress API response status:', response.status);

        if (response.status >= 200 && response.status < 300) {
          console.log('Progress update successful for:', itemKey);
        } else {
          const errorText = await response.text();
          console.error('Failed to update progress:', response.status, errorText);
        }
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error('Fetch request timed out after 10 seconds');
        } else {
          console.error('Fetch error:', fetchError instanceof Error ? fetchError.message : fetchError);
        }
        // Revert the optimistic update on error
        setCheckedItems(prev => {
          const newSet = new Set(prev);
          if (!newCheckedState) {
            newSet.add(itemKey);
          } else {
            newSet.delete(itemKey);
          }
          return newSet;
        });
      }
    } catch (error) {
      // Revert the optimistic update on error
      setCheckedItems(prev => {
        const newSet = new Set(prev);
        if (!newCheckedState) {
          newSet.add(itemKey);
        } else {
          newSet.delete(itemKey);
        }
        return newSet;
      });
      console.error('Error updating progress:', error);
    }
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = useCallback(() => {
    const totalItems = modules.reduce((acc, module) => {
      const topicsCount = module.topics?.length || 0;
      const exercisesCount = module.exercises?.length || 0;
      return acc + topicsCount + exercisesCount;
    }, 0);
    const percentage = totalItems > 0 ? Math.round((checkedItems.size / totalItems) * 100) : 0;
    return percentage;
  }, [modules, checkedItems.size]);

  // Update completion percentage when checked items change
  useEffect(() => {
    const percentage = calculateCompletionPercentage();
    setCompletionPercentage(percentage);
  }, [checkedItems.size, modules, calculateCompletionPercentage]);

  // Notify parent when checked items count changes
  useEffect(() => {
    if (onCheckedItemsChange) {
      onCheckedItemsChange(checkedItems.size);
    }
  }, [checkedItems.size, onCheckedItemsChange]);

  const handleCertificateDownload = async () => {
    const userName = session?.user?.name || 'Student';

    setIsGeneratingCertificate(true);
    try {
      const res = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate certificate");
      }

      const blob = await res.blob();

      // Create URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Open PDF in new tab
      window.open(url, '_blank');

      // Also trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${userName}-${courseId || 'course'}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object after a delay to ensure the new tab has time to load
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 2000);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGeneratingCertificate(false);
    }
  };


  const getStatusIndicator = (status: string, title: string, itemKey: string) => {
    const isChecked = checkedItems.has(itemKey);

    switch (status) {
      case 'completed':
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleItem(itemKey)}
            className="w-4 h-4 cursor-pointer data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            aria-label={`${title} - Completed`}
          />
        );
      case 'locked':
        return (
          <Checkbox
            checked={false}
            disabled
            className="w-4 h-4"
            aria-label={`${title} - Locked`}
          />
        );
      case 'demo':
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleItem(itemKey)}
            className="w-4 h-4 cursor-pointer data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            aria-label={`${title} - Demo available`}
          />
        );
      default:
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleItem(itemKey)}
            className="w-4 h-4 cursor-pointer"
            aria-label={`${title} - Available`}
          />
        );
    }
  };

  return (
    <>
      <SidebarContent
        ref={sidebarScrollRef}
        className={`scrollbar-hide h-full ${hasRightSection ? 'w-48' : 'w-64'}`}
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Certificate Tab - Only show when course is 100% complete */}
              {completionPercentage === 100 && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleCertificateDownload}
                    disabled={isGeneratingCertificate}
                    className="w-full justify-center min-w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold border border-yellow-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">
                        {isGeneratingCertificate ? "Generating..." : "Certificate"}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {modules.map((module) => (
                <SidebarMenuItem key={module.order}>
                  <SidebarMenuButton
                    onClick={module.hasDemo ? undefined : () => toggleModule(module.order)}
                    isActive={module.isActive}
                    className={`w-full justify-between min-w-0 ${module.hasDemo ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                    title={module.hasDemo ? 'Demo module - not available' : module.title}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        selectedModule === module.order
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {module.order}
                      </div>
                      <span
                        className={`truncate text-xs font-bold mt-1 ${hasRightSection ? 'max-w-[140px]' : 'max-w-[200px]'}`}
                        title={module.title}
                      >
                        {module.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {module.hasDemo ? (
                        <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      ) : expandedModules.includes(module.order) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      )}
                    </div>
                  </SidebarMenuButton>

                  {/* Topics */}
                  {expandedModules.includes(module.order) && (
                    <SidebarMenuSub>
                      {module.topics.map((topic, index) => (
                        <SidebarMenuSubItem key={`${module.order}-topic-${index}`}>
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md ${
                            module.hasDemo
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer'
                          } ${
                            selectedSubtopic?.moduleId === module.order && selectedSubtopic?.subtopicId === topic.id
                              ? 'bg-primary/10 dark:bg-primary/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleLessonClick(module.order, topic.id)}
                              className={`flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent ${
                                module.hasDemo ? 'cursor-not-allowed' : 'hover:bg-transparent cursor-pointer'
                              }`}
                            >
                              <div className="w-8 h-6 text-muted-foreground flex items-center justify-center text-[9px] font-semibold flex-shrink-0 px-1">
                                {module.order}.{topic.order}
                              </div>
                              <span
                                className={`truncate text-[11px] text-foreground mt-0.5 ${hasRightSection ? 'max-w-[120px]' : 'max-w-[180px]'}`}
                                title={topic.title}
                              >
                                {topic.title}
                              </span>
                            </SidebarMenuSubButton>
                            <div className="flex-shrink-0">
                              {getStatusIndicator(topic.status, topic.title, `module-${module.order}-topic-${topic.order}`)}
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}

                  {/* Exercises Separator */}
                  {expandedModules.includes(module.order) && module.exercises && module.exercises.length > 0 && (
                    <div className="px-2 py-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="px-2 py-1 bg-muted rounded text-xs font-semibold">Exercises</span>
                        <div className="h-px bg-border flex-1"></div>
                      </div>
                    </div>
                  )}

                  {/* Module Exercises */}
                  {expandedModules.includes(module.order) && module.exercises && module.exercises.length > 0 && (
                    <SidebarMenuSub>
                      {module.exercises.map((exercise, index) => (
                        <SidebarMenuSubItem key={`${module.order}-exercise-${index}`}>
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md ${
                            module.hasDemo
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer'
                          } ${
                            selectedExercise?.moduleId === module.order && selectedExercise?.exerciseId === exercise.id
                              ? 'bg-emerald-100 dark:bg-emerald-900/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleExerciseClick(exercise.id, module.order)}
                              className={`flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent ${
                                module.hasDemo ? 'cursor-not-allowed' : 'hover:bg-transparent cursor-pointer'
                              }`}
                            >
                              <div className="w-8 h-6 text-muted-foreground flex items-center justify-center text-[9px] font-semibold flex-shrink-0 px-1">
                                {module.order}.{module.topics.length + exercise.order}
                              </div>
                              <span
                                className={`truncate text-[11px] text-foreground mt-0.5 ${hasRightSection ? 'max-w-[120px]' : 'max-w-[180px]'}`}
                                title={exercise.title}
                              >
                                {exercise.title}
                              </span>
                            </SidebarMenuSubButton>
                            <div className="flex-shrink-0">
                              {getStatusIndicator(exercise.status, exercise.title, `module-${module.order}-exercise-${exercise.order}`)}
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

    </>
  );
};

export default LeftSidebar;
