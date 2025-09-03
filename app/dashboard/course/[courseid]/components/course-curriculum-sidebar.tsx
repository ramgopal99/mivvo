'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Check } from 'lucide-react';
import { pythonTopics } from '../../dummy-data';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useCourse } from './course-context';

interface CourseCurriculumSidebarProps {
  onTopicSelect?: (topicId: string, subtopicIndex: number) => void;
  selectedTopicId?: string;
  selectedSubtopicIndex?: number;
}

export function CourseCurriculumSidebar({ onTopicSelect, selectedTopicId, selectedSubtopicIndex }: CourseCurriculumSidebarProps) {
  const { toggleLectureCompletion, completionState } = useCourse();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['3']));

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleLectureClick = (topicId: string, lectureIndex: number) => {
    onTopicSelect?.(topicId, lectureIndex);
  };

  return (
    <div className="w-96 bg-background border-l border-border p-6 h-full overflow-y-auto shadow-lg">
      <div className="space-y-3">
        {pythonTopics.map((topic) => {
          const isExpanded = expandedModules.has(topic.id);
          const totalLectures = topic.subtopics.length;
          const completedLectures = completionState[topic.id]?.filter(Boolean).length || 0;

          return (
            <div key={topic.id} className="border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* Module Header */}
              <div
                className={cn(
                  "p-5 cursor-pointer transition-all duration-200",
                  isExpanded
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20"
                    : "bg-card hover:bg-accent/30 hover:shadow-inner"
                )}
                onClick={() => toggleModule(topic.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={cn(
                      "font-semibold text-base",
                      isExpanded ? "text-primary" : "text-card-foreground group-hover:text-primary"
                    )}>
                      <span className="text-primary/70 font-medium mr-2">Module {topic.id}:</span>
                      {topic.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {completedLectures}/{totalLectures} lectures
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-primary transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
                  )}
                </div>
              </div>

              {/* Module Lectures */}
              {isExpanded && (
                <div className="p-3 space-y-1">
                  {topic.subtopics.map((subtopic, subtopicIndex) => {
                    const isSelected = selectedTopicId === topic.id && selectedSubtopicIndex === subtopicIndex;
                    const isCompleted = completionState[topic.id]?.[subtopicIndex] || false;

                    return (
                      <div
                        key={`${topic.id}-${subtopicIndex}`}
                        className={cn(
                          "flex items-center py-3 px-3 rounded-lg transition-all duration-200 cursor-pointer group",
                          isSelected
                            ? "bg-primary/10 border border-primary/20 shadow-sm"
                            : "hover:bg-accent/40 hover:shadow-sm hover:scale-[1.02]"
                        )}
                        onClick={() => handleLectureClick(topic.id, subtopicIndex)}
                      >
                        {/* Play Icon */}
                        <div className="flex-shrink-0 mr-3">
                          {isCompleted ? (
                            <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          ) : isSelected ? (
                            <div className="w-7 h-7 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-md ring-2 ring-primary/20">
                              <Play className="h-3.5 w-3.5 text-primary-foreground ml-0.5" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 border-2 border-muted-foreground/30 rounded-full flex items-center justify-center bg-background hover:border-primary/50 transition-colors">
                              <Play className="h-3.5 w-3.5 text-muted-foreground ml-0.5 group-hover:text-primary transition-colors" />
                            </div>
                          )}
                        </div>

                        {/* Lecture Title */}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            isSelected
                              ? "text-accent-foreground"
                              : isCompleted
                                ? "text-foreground"
                                : "text-muted-foreground"
                          )}>
                            {subtopic}
                          </p>
                        </div>

                        {/* Checkbox */}
                        <div className="flex-shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleLectureCompletion(topic.id, subtopicIndex)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
