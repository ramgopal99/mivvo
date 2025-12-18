"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { SidebarProvider } from '@/components/ui/sidebar';
import LeftSidebar from '../components/LeftSidebar';
import Header from '../components/Header';
import MiddleSection from '../components/MiddleSection';
import RightSection from '../components/RightSection';
import { loadModules } from '../loaders/moduleLoader';
import { getHeaderData } from '../loaders/headerDataLoader';
import { SubLesson, Exercise, Module } from '../data/lessonsData';
import { isCourseAvailable, shouldShowCodeEditor } from '../config';

interface SelectedTopic {
  moduleId: number;
  subtopicId: string;
  title: string;
  moduleTitle: string;
}

interface HeaderData {
  title: string;
  completionPercentage: string;
}

export default function CoursePage() {
  const params = useParams();
  const course = params.courses as string;
  const [isValidCourse, setIsValidCourse] = useState<boolean | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if the course is valid
    const valid = isCourseAvailable(course);
    setIsValidCourse(valid);

    // If invalid course, redirect to home
    if (valid === false) {
      window.location.href = '/test';
      return;
    }

    // Load modules and header data when course is valid
    const loadDataAsync = async () => {
      try {
        // Load modules for the specified course
        const loadedModules = await loadModules(course);
        setModules(loadedModules);

        // Load header data for the specified course
        const loadedHeaderData = getHeaderData(course);
        setHeaderData(loadedHeaderData);

        // Auto-select the first lesson after modules are loaded
        if (loadedModules.length > 0 && loadedModules[0].subLessons.length > 0) {
          setSelectedTopic({
            moduleId: loadedModules[0].id,
            subtopicId: loadedModules[0].subLessons[0].id,
            title: loadedModules[0].subLessons[0].title,
            moduleTitle: loadedModules[0].title
          });
        }
      } catch (error) {
        console.error(`Error loading ${course} modules:`, error);
      }
    };

    if (valid === true) {
      loadDataAsync();
    }
  }, [course]);

  // Show loading while checking course validity or loading data
  if (isValidCourse === null || (isValidCourse === true && (!headerData || modules.length === 0))) {
    const loadingMessage = isValidCourse === null
      ? "Checking course availability..."
      : `Loading ${course} modules...`;

    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            {isValidCourse === null ? "Loading..." : `Loading ${course} modules...`}
          </h2>
          <p className="text-muted-foreground">
            {isValidCourse === null ? "Checking course availability." : "Please wait while we load the content."}
          </p>
        </div>
      </div>
    );
  }

  // Don't render if course is invalid (will redirect)
  if (isValidCourse === false) {
    return null;
  }

  const handleSubtopicClick = (moduleId: number, subtopicId: string, title: string, moduleTitle: string) => {
    setSelectedTopic({
      moduleId,
      subtopicId,
      title,
      moduleTitle
    });
  };

  const handleCheckedItemsChange = (count: number) => {
    setCheckedItemsCount(count);
  };

  // Create a flat list of all navigable items (subtopics and exercises)
  const getAllNavigableItems = () => {
    const items: SelectedTopic[] = [];
    modules.forEach(module => {
      // Add subtopics
      module.subLessons?.forEach((subLesson: SubLesson) => {
        items.push({
          moduleId: module.id,
          subtopicId: subLesson.id,
          title: subLesson.title,
          moduleTitle: module.title
        });
      });
      // Add exercises
      module.exercises?.forEach((exercise: Exercise) => {
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

  const handlePrevious = () => {
    const allItems = getAllNavigableItems();
    if (!selectedTopic || allItems.length === 0) return;

    const currentIndex = allItems.findIndex(item =>
      item.moduleId === selectedTopic.moduleId &&
      item.subtopicId === selectedTopic.subtopicId
    );

    if (currentIndex > 0) {
      setSelectedTopic(allItems[currentIndex - 1]);
    } else {
      // Go to last item if at first
      setSelectedTopic(allItems[allItems.length - 1]);
    }
  };

  const handleNext = () => {
    const allItems = getAllNavigableItems();
    if (!selectedTopic || allItems.length === 0) return;

    const currentIndex = allItems.findIndex(item =>
      item.moduleId === selectedTopic.moduleId &&
      item.subtopicId === selectedTopic.subtopicId
    );

    if (currentIndex < allItems.length - 1) {
      setSelectedTopic(allItems[currentIndex + 1]);
    } else {
      // Go to first item if at last
      setSelectedTopic(allItems[0]);
    }
  };

  const handleAI = () => {
    setIsChatOpen(prev => !prev);
  };

  const calculateCompletionPercentage = () => {
    const totalItems = modules.reduce((acc, module) => {
      const subLessonsCount = module.subLessons.length;
      const exercisesCount = module.exercises ? module.exercises.length : 0;
      return acc + subLessonsCount + exercisesCount;
    }, 0);
    const percentage = totalItems > 0 ? Math.round((checkedItemsCount / totalItems) * 100) : 0;
    return `${percentage}% Completed`;
  };

  return (
    <div className="h-screen w-full bg-background flex">
      {/* Left Section - Header + Fixed Sidebar */}
      <div className="w-65 flex flex-col flex-shrink-0">
        <Header headerData={headerData!} completionPercentage={calculateCompletionPercentage()} />

        {/* Sidebar */}
        <div className="flex-1 border-r border-border bg-muted/20">
          <SidebarProvider>
            <LeftSidebar
              modules={modules}
              onSubtopicClick={handleSubtopicClick}
              onCheckedItemsChange={handleCheckedItemsChange}
              selectedTopic={selectedTopic}
            />
          </SidebarProvider>
        </div>
      </div>

      {/* Middle and Right Sections - Resizable */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={shouldShowCodeEditor(course) || course === 'aptitude' ? 55 : 100} minSize={30}>
          <MiddleSection
            modules={modules}
            selectedTopic={selectedTopic}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAI={handleAI}
            isChatOpen={isChatOpen}
            onCloseChat={() => setIsChatOpen(false)}
            language={course}
          />
        </ResizablePanel>
        {(shouldShowCodeEditor(course) || course === 'aptitude') && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45} minSize={25}>
              <RightSection language={course} selectedTopic={selectedTopic} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}