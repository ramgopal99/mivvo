/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MiddleSection from '../components/MiddleSection';
import LeftSidebar from '../components/LeftSidebar';
import RightSection from '../components/RightSection';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CourseModule } from '../data/lessonsData';

interface CourseData {
  id: string;
  courseId: string;
  displayName: string;
  headerTitle: string;
  completionPercentage: string;
  showCodeEditor: boolean;
  showFormulas: boolean;
  monacoLanguage?: string;
  codeDisplayName?: string;
  defaultCode?: string;
  modules: CourseModule[];
}

interface EnrollmentData {
  isEnrolled: boolean;
  enrollment: {
    id: string;
    enrolledAt: string;
    isActive: boolean;
  } | null;
}

interface SelectedTopic {
  moduleId: number;
  subtopicId: string;
  title: string;
  moduleTitle: string;
}

export default function CourseDetailMobilePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
          if (response.status === 403) {
            // Redirect to home if not enrolled
            router.push('/');
            return;
          }
          throw new Error('Failed to fetch course data');
        }

        const data = await response.json();

        // Check if user is enrolled and adjust hasDemo for all modules
        const enrollmentResponse = await fetch(`/api/courses/enroll?courseId=${courseId}`);
        let isEnrolled = false;

        if (enrollmentResponse.ok) {
          const enrollmentData: EnrollmentData = await enrollmentResponse.json();
          isEnrolled = enrollmentData.isEnrolled;
        }

        // If user is enrolled, ensure all modules have hasDemo = false
        if (isEnrolled && data.modules) {
          const allModulesHaveDemoFalse = data.modules.every((module: CourseModule) => module.hasDemo === false);

          if (!allModulesHaveDemoFalse) {
            // Update all modules to have hasDemo = false
            data.modules = data.modules.map((module: CourseModule) => ({
              ...module,
              hasDemo: false
            }));
          }
        }

        setCourseData(data);

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
  }, [courseId, router]);

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
    if (!courseData) return [];
    const items: SelectedTopic[] = [];
    courseData.modules.forEach(module => {
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


  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const handleRightSidebarToggle = () => {
    setIsMobileRightSidebarOpen(prev => !prev);
  };

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">
            Loading {courseId} course content...
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
          <button
            onClick={() => router.push('/dashboard/courses')}
            className="text-blue-500 hover:underline"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Calculate completion percentage

  // Find selected topic/exercise data
  const selectedModule = courseData.modules.find(m => m.order === selectedTopic?.moduleId);
  const selectedTopicData = selectedModule?.topics?.find(t => t.id === selectedTopic?.subtopicId);
  const selectedExerciseData = selectedModule?.exercises?.find(e => e.id === selectedTopic?.subtopicId);

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Mobile Header */}
      <div className="flex-shrink-0 border-b border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Menu Button - shows mobile navigation */}
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              title="Open course navigation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold truncate max-w-[200px]">
                {courseData.headerTitle || courseData.displayName}
              </h1>
              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                {selectedTopic?.moduleTitle} • {selectedTopic?.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(courseData.showCodeEditor || courseData.showFormulas) && (
              <button
                onClick={handleRightSidebarToggle}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title={courseData.showCodeEditor ? "Open code editor" : "Open tools"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            )}
            <button
              onClick={() => router.push('/dashboard/courses')}
              className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium text-sm"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Middle Section - Full Screen */}
      <div className="flex-1 min-h-0">
        <MiddleSection
          modules={courseData.modules}
          selectedTopic={selectedTopic}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onAI={handleRightSidebarToggle}
          isChatOpen={isChatOpen}
          onCloseChat={() => setIsChatOpen(false)}
          language={courseId}
          selectedTopicData={selectedTopicData}
          selectedExerciseData={selectedExerciseData}
        />
      </div>

      {/* Mobile Left Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg font-semibold">Course Modules</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Close navigation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-auto">
                <SidebarProvider>
                  <LeftSidebar
                    modules={courseData.modules}
                    courseId={courseId}
                    onSubtopicClick={(moduleId, subtopicId, title, moduleTitle) => {
                      handleSubtopicClick(moduleId, subtopicId, title, moduleTitle);
                      setIsMobileSidebarOpen(false); // Close sidebar after selection
                    }}
                    onCheckedItemsChange={handleCheckedItemsChange}
                    selectedTopic={selectedTopic}
                    hasRightSection={courseData.showCodeEditor || courseData.showFormulas}
                  />
                </SidebarProvider>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Right Sidebar Overlay */}
      {isMobileRightSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileRightSidebarOpen(false)}
          />

          {/* Right Sidebar */}
          <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg font-semibold">Code Editor</h2>
              <button
                onClick={() => setIsMobileRightSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Close code editor"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <RightSection
                language={courseId}
                selectedTopic={selectedTopic}
                courseData={courseData}
                selectedModuleData={selectedModule}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
