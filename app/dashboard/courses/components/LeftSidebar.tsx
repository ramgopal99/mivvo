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
import { CourseModule } from '../data/lessonsData';

interface LeftSidebarProps {
  modules: CourseModule[];
  onSubtopicClick?: (moduleId: number, subtopicId: string, title: string, moduleTitle: string) => void;
  onCheckedItemsChange?: (count: number) => void;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
  hasRightSection?: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ modules, onSubtopicClick, onCheckedItemsChange, selectedTopic, hasRightSection = true }) => {
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
      const currentModule = modules.find(m => m.order === selectedTopic.moduleId);
      const isSubtopic = currentModule?.topics?.some(t => t.id === selectedTopic.subtopicId);
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

  // Removed auto-scroll to top - let users maintain their scroll position
  // This allows clicking on lower topics without the sidebar jumping to top

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
    // setActiveModule(moduleId);
  };

  const handleLessonClick = (moduleId: number, lessonId: string) => {
    const currentModule = modules.find(m => m.order === moduleId);
    const subLesson = currentModule?.topics.find(t => t.id === lessonId);

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
    const currentModule = modules.find(m => m.order === moduleId);
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
        className={`overflow-auto scrollbar-hide max-h-[calc(100vh-8rem)] ${hasRightSection ? 'w-48' : 'w-64'}`}
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.order}>
                  <SidebarMenuButton
                    onClick={() => toggleModule(module.order)}
                    isActive={module.isActive}
                    className="w-full justify-between min-w-0 cursor-pointer"
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
                      {expandedModules.includes(module.order) ? (
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
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            selectedSubtopic?.moduleId === module.order && selectedSubtopic?.subtopicId === topic.id
                              ? 'bg-primary/10 dark:bg-primary/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleLessonClick(module.order, topic.id)}
                              className="flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent hover:bg-transparent cursor-pointer"
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
                              {getStatusIndicator(topic.status, topic.title, `module-${module.order}-topic-${topic.id}`)}
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
                          <div className={`flex items-center gap-3 w-full p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                            selectedExercise?.moduleId === module.order && selectedExercise?.exerciseId === exercise.id
                              ? 'bg-emerald-100 dark:bg-emerald-900/20'
                              : ''
                          }`}>
                            <SidebarMenuSubButton
                              onClick={() => handleExerciseClick(exercise.id, module.order)}
                              className="flex items-center gap-3 min-w-0 flex-1 p-0 bg-transparent hover:bg-transparent cursor-pointer"
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
                              {getStatusIndicator(exercise.status, exercise.title, `module-${module.order}-exercise-${module.topics.length + exercise.order}`)}
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
