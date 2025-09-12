"use client";

import { MarkdownCompound } from '@/components/markdown-compound';
import MiddleBottom from './MiddleBottom';
import { modules, Module, SubLesson, Exercise } from '../data/lessonsData';

interface SelectedTopic {
  moduleId: number;
  subtopicId: number;
  title: string;
  moduleTitle: string;
}

interface MiddleSectionProps {
  selectedTopic: SelectedTopic | null;
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
}

const MiddleSection = ({ selectedTopic, onPrevious, onNext, onAI, isChatOpen, onCloseChat }: MiddleSectionProps) => (
  <div className="h-full flex flex-col">
    <div className="flex-1 p-6 overflow-auto scrollbar-hide">
      {selectedTopic ? (
        <div className="space-y-4">
          <MarkdownCompound
            size="lg"
            variant="rich"
            allowHtml={true}
          >
            {(() => {
              const currentModule = modules.find((m: Module) => m.id === selectedTopic.moduleId);
              const lesson = currentModule?.subLessons.find((s: SubLesson) => s.id === selectedTopic.subtopicId);
              const exercise = currentModule?.exercises.find((e: Exercise) => e.id === selectedTopic.subtopicId);
              
              if (lesson) {
                return lesson.content || `# ${selectedTopic.title}\n\nContent for this lesson is coming soon!`;
              } else if (exercise) {
                return exercise.content || `# ${selectedTopic.title}\n\nContent for this exercise is coming soon!`;
              } else {
                return `# ${selectedTopic.title}\n\nContent for this item is coming soon!`;
              }
            })()}
          </MarkdownCompound>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No topic selected</h3>
            <p>Select a subtopic from the sidebar to view its content</p>
          </div>
        </div>
      )}
    </div>

    {/* Action Buttons at Bottom */}
    <MiddleBottom
      onPrevious={onPrevious}
      onNext={onNext}
      onAI={onAI}
      isChatOpen={isChatOpen}
      onCloseChat={onCloseChat}
    />
  </div>
);

export default MiddleSection;
