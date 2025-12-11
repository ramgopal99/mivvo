"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { SidebarProvider } from '@/components/ui/sidebar';
import LeftSidebar from '../../../dashboard/courses/[courseId]/components/LeftSidebar';
import Header from '../../../dashboard/courses/[courseId]/components/Header';
import MiddleSection from '../../../dashboard/courses/[courseId]/components/MiddleSection';
import RightSection from '../../../dashboard/courses/[courseId]/components/RightSection';
import { modules, courses, loadCourses } from '../../../dashboard/courses/[courseId]/data/lessonsData';

interface SelectedTopic {
  moduleId: string;
  subtopicId: string;
  title: string;
  moduleTitle: string;
}

export default function DemoCourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseTitle, setCourseTitle] = useState<string>('Loading...');
  const [courseNotFound, setCourseNotFound] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  // Load specific course data
  useEffect(() => {
    const initializeData = async () => {
      if (!courseId) {
        setCourseNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        // Load courses and filter for the specific course
        await loadCourses();

        // Find the specific course
        const currentCourse = courses.find(c => c.id === courseId);

        if (!currentCourse) {
          setCourseNotFound(true);
          setCourseTitle('Course not found');
        } else {
          setCourseTitle(currentCourse.title);

          // Auto-select the first lesson after data loads (only from first 2 modules)
          if (modules.length > 0 && modules[0].subLessons.length > 0) {
            setSelectedTopic({
              moduleId: modules[0].id,
              subtopicId: modules[0].subLessons[0].id,
              title: modules[0].subLessons[0].title,
              moduleTitle: modules[0].title
            });
          }
        }
      } catch (error) {
        console.error('Failed to load course:', error);
        setCourseTitle('Error loading course');
        setCourseNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [courseId]);

  const handleSubtopicClick = (moduleId: string, subtopicId: string, title: string, moduleTitle: string) => {
    // Only allow access to first 2 modules in demo mode
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex < 2) {
      setSelectedTopic({
        moduleId,
        subtopicId,
        title,
        moduleTitle
      });
    }
  };

  // Create a flat list of all navigable items (only from first 2 modules in demo)
  const getAllNavigableItems = () => {
    const items: SelectedTopic[] = [];
    // Only include first 2 modules
    modules.slice(0, 2).forEach(module => {
      // Add subtopics
      module.subLessons?.forEach(subLesson => {
        items.push({
          moduleId: module.id,
          subtopicId: subLesson.id,
          title: subLesson.title,
          moduleTitle: module.title
        });
      });
      // Add exercises
      module.exercises?.forEach(exercise => {
        items.push({
          moduleId: module.id,
          subtopicId: exercise.id,
          title: exercise.title,
          moduleTitle: module.title
        });
      });
    });
    return items;
  };

  // Get current item index for navigation
  const getCurrentItemIndex = () => {
    if (!selectedTopic) return -1;
    const allItems = getAllNavigableItems();
    return allItems.findIndex(item =>
      item.moduleId === selectedTopic.moduleId &&
      item.subtopicId === selectedTopic.subtopicId
    );
  };

  // Navigation handlers
  const handlePrevious = () => {
    const currentIndex = getCurrentItemIndex();
    const allItems = getAllNavigableItems();
    if (currentIndex > 0) {
      const prevItem = allItems[currentIndex - 1];
      setSelectedTopic(prevItem);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentItemIndex();
    const allItems = getAllNavigableItems();
    if (currentIndex < allItems.length - 1) {
      const nextItem = allItems[currentIndex + 1];
      setSelectedTopic(nextItem);
    }
  };

  const handleAI = () => {
    setIsChatOpen(true);
  };

  // Calculate total number of checkable items (only from first 2 modules)
  const getTotalCheckableItems = () => {
    let total = 0;
    // Only count first 2 modules
    modules.slice(0, 2).forEach(module => {
      // Count sublessons (excluding locked ones)
      module.subLessons?.forEach(subLesson => {
        if (subLesson.status !== 'locked') {
          total++;
        }
      });
      // Count exercises (excluding locked ones)
      module.exercises?.forEach(exercise => {
        if (exercise.status !== 'locked') {
          total++;
        }
      });
    });
    return total;
  };

  // Callback to update progress percentage
  const handleProgressChange = (completedCount: number) => {
    const totalItems = getTotalCheckableItems();
    if (totalItems > 0) {
      const percentage = Math.round((completedCount / totalItems) * 100);
      setProgressPercentage(percentage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading demo course...</p>
        </div>
      </div>
    );
  }

  if (courseNotFound) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The demo course you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <button onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background flex">
      {/* Left Section - Header + Fixed Sidebar */}
      <div className="w-65 flex flex-col flex-shrink-0">
        <Header title={`${courseTitle} (Demo)`} percentage={progressPercentage} />

        {/* Sidebar */}
        <div className="flex-1 border-r border-border bg-muted/20">
          <SidebarProvider>
            <LeftSidebar
              onSubtopicClick={handleSubtopicClick}
              selectedTopic={selectedTopic}
              onCheckedItemsChange={handleProgressChange}
              isDemo={true}
            />
          </SidebarProvider>
        </div>
      </div>

      {/* Middle and Right Sections - Resizable */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={55} minSize={30}>
          <MiddleSection
            selectedTopic={selectedTopic}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAI={handleAI}
            isChatOpen={isChatOpen}
            onCloseChat={() => setIsChatOpen(false)}
            isDemo={true}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} minSize={25}>
            <RightSection isDemo={true} />
          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
