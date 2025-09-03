'use client';

import { use } from 'react';
import { CourseCurriculumSidebar } from './components/course-curriculum-sidebar';
import { CourseHeader } from './components/course-header';
import { CourseProvider, useCourse } from './components/course-context';

interface CourseLayoutProps {
  children: React.ReactNode;
}

function CourseLayoutContent({ children }: CourseLayoutProps) {
  const { selectedTopic, handleTopicSelect } = useCourse();

  return (
    <div className="flex flex-col h-screen">
      {/* Header Component - Connected to top border */}
      <CourseHeader />

      {/* Main Content and Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Right Sidebar */}
        <CourseCurriculumSidebar
          onTopicSelect={handleTopicSelect}
          selectedTopicId={selectedTopic?.topicId}
          selectedSubtopicIndex={selectedTopic?.subtopicIndex}
        />
      </div>
    </div>
  );
}

interface CourseLayoutWithParamsProps extends CourseLayoutProps {
  params: Promise<{
    courseid: string;
  }>;
}

export default function CourseLayout({ children, params }: CourseLayoutWithParamsProps) {
  const resolvedParams = use<{ courseid: string }>(params);
  const courseId = resolvedParams.courseid;

  return (
    <CourseProvider courseId={courseId}>
      <CourseLayoutContent>
        {children}
      </CourseLayoutContent>
    </CourseProvider>
  );
}
