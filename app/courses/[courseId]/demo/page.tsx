"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '../../../dashboard/courses/components/Header';
import LeftSidebar from '../../../dashboard/courses/components/LeftSidebar';
import MiddleSection from '../../../dashboard/courses/components/MiddleSection';
import RightSection from '../../../dashboard/courses/components/RightSection';
import { CourseModule, CourseMcqQuestion, CourseCodeQuestion } from '../../../dashboard/courses/data/lessonsData';

interface CourseData {
  id: string;
  courseId: string;
  displayName: string;
  headerTitle: string;
  completionPercentage: string;
  showCodeEditor: boolean;
  monacoLanguage?: string;
  codeDisplayName?: string;
  defaultCode?: string;
  modules: CourseModule[];
}

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

interface ApiModule {
  id: number | string;
  title: string;
  order: number;
  hasDemo?: boolean;
  topics?: {
    id: string;
    title: string;
    content?: string;
  }[];
  exercises?: {
    id: string;
    title: string;
    type?: string;
    content?: string;
    mcqQuestions?: unknown[];
    codeQuestions?: unknown[];
  }[];
}

interface ApiCourseData {
  id: string;
  courseId: string;
  displayName: string;
  headerTitle: string;
  completionPercentage: string;
  showCodeEditor: boolean;
  monacoLanguage?: string;
  codeDisplayName?: string;
  defaultCode?: string;
  modules: ApiModule[];
}

export default function CourseDemoPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const data = await response.json();

        // Transform the data to match dashboard component expectations
        const apiData = data as ApiCourseData;
        const transformedData = {
          ...apiData,
          modules: apiData.modules?.map((module: ApiModule) => {
            // Only first 2 modules are unlocked, others are locked
            const isModuleLocked = module.order > 2;
            return {
              id: module.id.toString(),
              title: module.title,
              order: module.order,
              hasDemo: isModuleLocked, // Lock modules after the first 2
              isExpanded: false,
              isActive: true,
              topics: module.topics?.map((topic, index: number) => ({
                id: topic.id,
                title: topic.title,
                order: index + 1,
                status: isModuleLocked ? 'LOCKED' as const : 'DEMO' as const, // Lock if module is locked
                content: topic.content || ''
              })) || [],
              exercises: module.exercises?.map((exercise, index: number) => ({
                id: exercise.id,
                title: exercise.title,
                order: index + 1,
                status: isModuleLocked ? 'LOCKED' as const : 'DEMO' as const, // Lock if module is locked
                content: exercise.content || '',
                type: (exercise.type?.toUpperCase() || 'CODE') as 'MCQ' | 'CODE',
                mcqQuestions: (exercise.mcqQuestions || []) as CourseMcqQuestion[],
                codeQuestions: (exercise.codeQuestions || []) as CourseCodeQuestion[]
              })) || [],
              formulas: [] // No formulas in demo
            };
          }) || []
        };

        setCourseData(transformedData);

        // Auto-select the first topic after data is loaded
        if (data.modules && data.modules.length > 0) {
          const firstModule = data.modules[0];
          if (firstModule.topics && firstModule.topics.length > 0) {
            const firstTopic = firstModule.topics[0];
            setSelectedTopic({
              moduleId: firstModule.order,
              subtopicId: firstTopic.id,
              title: firstTopic.title,
              moduleTitle: firstModule.title
            });
          }
        }

      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

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

  // Create a flat list of all navigable items (topics and exercises)
  const getAllNavigableItems = () => {
    const items: SelectedTopic[] = [];
    courseData!.modules.forEach(module => {
      // Add topics
      module.topics?.forEach((topic) => {
        items.push({
          moduleId: module.order,
          subtopicId: topic.id,
          title: topic.title,
          moduleTitle: module.title
        });
      });
      // Add exercises
      module.exercises?.forEach((exercise) => {
        items.push({
          moduleId: module.order,
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

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Demo...</h2>
          <p className="text-muted-foreground">
            Preparing course demo content...
          </p>
        </div>
      </div>
    );
  }

  // Show error if course not found or failed to load
  if (error || !courseData) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            {error || 'Course not found'}
          </div>
          <Link href="/courses" className="text-blue-500 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const calculateCompletionPercentage = () => {
    const totalItems = courseData.modules.reduce((acc, module) => {
      const topicsCount = module.topics?.length || 0;
      const exercisesCount = module.exercises?.length || 0;
      return acc + topicsCount + exercisesCount;
    }, 0);
    const percentage = totalItems > 0 ? Math.round((checkedItemsCount / totalItems) * 100) : 0;
    return `${percentage}% Completed`;
  };

  // Convert courseData to headerData format
  const headerData: HeaderData = {
    title: courseData.headerTitle || courseData.displayName,
    completionPercentage: calculateCompletionPercentage()
  };

  // Find selected topic/exercise data
  const selectedModule = courseData.modules.find(m => m.order === selectedTopic?.moduleId);
  const selectedTopicData = selectedModule?.topics?.find(t => t.id === selectedTopic?.subtopicId);
  const selectedExerciseData = selectedModule?.exercises?.find(e => e.id === selectedTopic?.subtopicId);

  // Debug logging
  console.log('Demo Debug:', {
    selectedTopic,
    selectedModule: selectedModule ? {
      id: selectedModule.id,
      title: selectedModule.title,
      order: selectedModule.order,
      topicsCount: selectedModule.topics?.length || 0,
      exercisesCount: selectedModule.exercises?.length || 0
    } : null,
    selectedTopicData: selectedTopicData ? {
      id: selectedTopicData.id,
      title: selectedTopicData.title,
      contentLength: selectedTopicData.content?.length || 0
    } : null,
    selectedExerciseData: selectedExerciseData ? {
      id: selectedExerciseData.id,
      title: selectedExerciseData.title,
      type: selectedExerciseData.type,
      mcqQuestionsCount: selectedExerciseData.mcqQuestions?.length || 0,
      codeQuestionsCount: selectedExerciseData.codeQuestions?.length || 0,
      contentLength: selectedExerciseData.content?.length || 0
    } : null
  });

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden">
      {/* Left Section - Header + Sidebar + Footer */}
      <div className="w-65 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header headerData={headerData} completionPercentage={calculateCompletionPercentage()} />
        </div>

        {/* Sidebar - Middle Section */}
        <div className="flex-1 border-r border-border bg-muted/20 overflow-auto">
          <SidebarProvider>
            <LeftSidebar
              modules={courseData.modules}
              courseId={courseId}
              onSubtopicClick={handleSubtopicClick}
              onCheckedItemsChange={handleCheckedItemsChange}
              selectedTopic={selectedTopic}
              hasRightSection={courseData.showCodeEditor}
            />
          </SidebarProvider>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-r border-t border-border bg-background p-4">
          <div className="flex flex-col items-center gap-2">
            {/* Back Button */}
            <Link
              href="/courses"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors text-sm"
            >
              ← Back to Courses
            </Link>


          </div>
        </div>
      </div>

      {/* Middle and Right Sections - Resizable */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={courseData!.showCodeEditor ? 55 : 100} minSize={30}>
          <MiddleSection
            modules={courseData!.modules}
            selectedTopic={selectedTopic}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onAI={handleAI}
            isChatOpen={isChatOpen}
            onCloseChat={() => setIsChatOpen(false)}
            language={courseId}
            selectedTopicData={selectedTopicData}
            selectedExerciseData={selectedExerciseData}
          />
        </ResizablePanel>
        {courseData!.showCodeEditor && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45} minSize={25}>
              <RightSection
                language={courseId}
                selectedTopic={selectedTopic}
                courseData={courseData!}
                selectedModuleData={selectedModule}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
