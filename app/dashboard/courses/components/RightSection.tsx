"use client";

import RightPanel from './right-panels/RightPanel';
import { CourseModule } from '../data/lessonsData';

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

interface RightSectionProps {
  language?: string;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
  courseData?: CourseData;
  selectedModuleData?: CourseModule;
}

const RightSection = ({ language, selectedTopic, courseData, selectedModuleData }: RightSectionProps) => {
  return (
    <div className="h-full bg-muted/20 border-l border-border overflow-hidden flex flex-col">
      {/* Unified Right Panel - handles all course types dynamically */}
      <div className="flex-1">
        <RightPanel language={language} selectedTopic={selectedTopic} courseData={courseData} selectedModuleData={selectedModuleData} />
      </div>
    </div>
  );
};

export default RightSection;
