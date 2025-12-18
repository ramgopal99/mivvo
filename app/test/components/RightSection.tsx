"use client";

import RightPanel from './right-panels/RightPanel';

interface RightSectionProps {
  language?: string;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
}

const RightSection = ({ language, selectedTopic }: RightSectionProps) => {
  return (
    <div className="h-full bg-muted/20 border-l border-border overflow-hidden flex flex-col">
      {/* Unified Right Panel - handles all course types dynamically */}
      <div className="flex-1">
        <RightPanel language={language} selectedTopic={selectedTopic} />
      </div>
    </div>
  );
};

export default RightSection;
