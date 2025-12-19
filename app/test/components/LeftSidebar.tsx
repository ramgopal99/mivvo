"use client";

import React, { useState, useEffect, useRef } from 'react';
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
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Module } from '../data/lessonsData';

interface LeftSidebarProps {
  modules: Module[];
  onSubtopicClick?: (moduleId: number, subtopicId: string, title: string, moduleTitle: string) => void;
  onCheckedItemsChange?: (count: number) => void;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ modules, onSubtopicClick, onCheckedItemsChange, selectedTopic }) => {
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  // const [activeModule, setActiveModule] = useState<number>(1);
  // const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<{moduleId: number, subtopicId: string} | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<{moduleId: number, exerciseId: string} | null>(null);

  // Update sidebar highlighting when selectedTopic changes (from navigation buttons)
  useEffect(() => {
    if (selectedTopic) {
      setSelectedModule(selectedTopic.moduleId);

      // Auto-expand the module when navigating to it
      setExpandedModules(prev => {
        if (!prev.includes(selectedTopic.moduleId)) {
          return [...prev, selectedTopic.moduleId];
        }
        return prev;
      });

      // Check if it's a subtopic or exercise
      const currentModule = modules.find(m => m.id === selectedTopic.moduleId);
      const isSubtopic = currentModule?.subLessons?.some(sl => sl.id === selectedTopic.subtopicId);
      const isExercise = currentModule?.exercises?.some(ex => ex.id === selectedTopic.subtopicId);

      if (isSubtopic) {
        setSelectedSubtopic({ moduleId: selectedTopic.moduleId, subtopicId: selectedTopic.subtopicId });
        setSelectedExercise(null);
      } else if (isExercise) {
        setSelectedExercise({ moduleId: selectedTopic.moduleId, exerciseId: selectedTopic.subtopicId });
        setSelectedSubtopic(null);
      }
    }
  }, [selectedTopic]);

  // Scroll to top when changing modules
  useEffect(() => {
    if (sidebarScrollRef.current && selectedTopic) {
      sidebarScrollRef.current.scrollTop = 0;
    }
  }, [selectedTopic]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
    // setActiveModule(moduleId);
  };

  const handleLessonClick = (moduleId: number, lessonId: string) => {
    const currentModule = modules.find(m => m.id === moduleId);
    const subLesson = currentModule?.subLessons.find(sl => sl.id === lessonId);

    // Set the selected module and subtopic for highlighting
    setSelectedModule(moduleId);
    setSelectedSubtopic({ moduleId, subtopicId: lessonId });
    setSelectedExercise(null); // Clear exercise selection

    if (currentModule && subLesson && onSubtopicClick) {
      onSubtopicClick(moduleId, lessonId, subLesson.title, currentModule.title);
    }

    console.log(`Clicked lesson: Module ${moduleId}, Lesson ${lessonId}`);
  };

  const handleExerciseClick = (exerciseId: string, moduleId: number) => {
    const currentModule = modules.find(m => m.id === moduleId);
    const exercise = currentModule?.exercises?.find(ex => ex.id === exerciseId);

    // Set the selected module and exercise for highlighting
    setSelectedModule(moduleId);
    setSelectedExercise({ moduleId, exerciseId });
    setSelectedSubtopic(null); // Clear subtopic selection

    if (currentModule && exercise && onSubtopicClick) {
      // Pass exercise info to middle section
      onSubtopicClick(moduleId, exerciseId, exercise.title, currentModule.title);
    }

    console.log(`Clicked exercise: ${exerciseId} in module ${moduleId}`);
  };

  const toggleItem = (itemKey: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  // Notify parent when checked items count changes
  useEffect(() => {
    if (onCheckedItemsChange) {
      onCheckedItemsChange(checkedItems.size);
    }
  }, [checkedItems.size, onCheckedItemsChange]);


  const getStatusIndicator = (status: string, title: string, itemKey: string) => {
    const isChecked = checkedItems.has(itemKey);

    switch (status) {
      case 'completed':
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleItem(itemKey)}
            className="w-4 h-4 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
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
            className="w-4 h-4 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            aria-label={`${title} - Demo available`}
          />
        );
      default:
        return (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleItem(itemKey)}
            className="w-4 h-4"
            aria-label={`${title} - Available`}
          />
        );
    }
  };

  return (
    <>
      <SidebarContent
        ref={sidebarScrollRef}
        className="overflow-auto scrollbar-hide max-h-[calc(100vh-8rem)] w-48"
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton
                    onClick={() => toggleModule(module.id)}
                    isActive={module.isActive}
                    className="w-full justify-between min-w-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        selectedModule === module.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {module.id}
                      </div>
                      <span
                        className="truncate text-xs max-w-[140px] font-bold mt-1"
                        title={module.title}
                      >
                        {module.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      )}
                    </div>
                  </SidebarMenuButton>

                  {/* Sub-lessons */}
                  {expandedModules.includes(module.id) && (
                    <SidebarMenuSub>
                      {module.subLessons.map((subLesson, index) => (
                        <SidebarMenuSubItem key={`${module.id}-sublesson-${index}`}>
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            selectedSubtopic?.moduleId === module.id && selectedSubtopic?.subtopicId === subLesson.id
                              ? 'bg-primary/10 dark:bg-primary/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleLessonClick(module.id, subLesson.id)}
                              className="flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent hover:bg-transparent cursor-pointer"
                            >
                              <div className="w-8 h-6 text-muted-foreground flex items-center justify-center text-[9px] font-semibold flex-shrink-0 px-1">
                                {subLesson.id}
                              </div>
                              <span
                                className="truncate text-[11px] max-w-[120px] text-foreground mt-0.5"
                                title={subLesson.title}
                              >
                                {subLesson.title}
                              </span>
                            </SidebarMenuSubButton>
                            <div className="flex-shrink-0">
                              {getStatusIndicator(subLesson.status, subLesson.title, `module-${module.id}-lesson-${subLesson.id}`)}
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}

                  {/* Exercises Separator */}
                  {expandedModules.includes(module.id) && module.exercises && module.exercises.length > 0 && (
                    <div className="px-2 py-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="px-2 py-1 bg-muted rounded text-xs font-semibold">Exercises</span>
                        <div className="h-px bg-border flex-1"></div>
                      </div>
                    </div>
                  )}

                  {/* Module Exercises */}
                  {expandedModules.includes(module.id) && module.exercises && module.exercises.length > 0 && (
                    <SidebarMenuSub>
                      {module.exercises.map((exercise, index) => (
                        <SidebarMenuSubItem key={`${module.id}-exercise-${index}`}>
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            selectedExercise?.moduleId === module.id && selectedExercise?.exerciseId === exercise.id
                              ? 'bg-emerald-100 dark:bg-emerald-900/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleExerciseClick(exercise.id, module.id)}
                              className="flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent hover:bg-transparent cursor-pointer"
                            >
                              <div className="w-8 h-6 text-muted-foreground flex items-center justify-center text-[9px] font-semibold flex-shrink-0 px-1">
                                {exercise.id}
                              </div>
                              <span
                                className="truncate text-[11px] max-w-[120px] text-foreground mt-0.5"
                                title={exercise.title}
                              >
                                {exercise.title}
                              </span>
                            </SidebarMenuSubButton>
                            <div className="flex-shrink-0">
                              {getStatusIndicator(exercise.status, exercise.title, `module-${module.id}-exercise-${exercise.id}`)}
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
