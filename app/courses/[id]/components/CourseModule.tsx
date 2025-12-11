"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronRight,
  CheckCircle2,
  Star,
  Folder,
  FileQuestion,
  Lock
} from 'lucide-react';
import { Module } from './types';

interface CourseModuleProps {
  module: Module;
  moduleIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  isDemo?: boolean;
}

export default function CourseModule({ module, moduleIndex, isExpanded, onToggle, isDemo = false }: CourseModuleProps) {
  const totalItems = (module.subLessons?.length || 0) + (module.exercises?.length || 0);
  const isLocked = isDemo && moduleIndex >= 2;

  return (
    <Card className={`border-2 transition-colors ${isLocked ? 'opacity-60' : 'hover:border-primary/20'}`}>
      <CardContent className="p-0">
        {/* Module Header */}
        <button
          onClick={isLocked ? undefined : onToggle}
          disabled={isLocked}
          className={`w-full flex items-center justify-between p-4 transition-colors ${
            isLocked
              ? 'cursor-not-allowed opacity-75'
              : 'hover:bg-muted/50 cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-3">
            <Folder className="w-5 h-5 text-primary" />
            <span className="font-semibold text-left">{module.title}</span>
            {moduleIndex < 2 && (
              <Badge variant="secondary" className="ml-2">
                <Star className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {totalItems} items
            </span>
            {isLocked ? (
              <Lock className="w-5 h-5 text-muted-foreground" />
            ) : isExpanded ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Module Content - Lessons and Exercises */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
              {/* SubLessons */}
              {module.subLessons?.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-background transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm flex-1">{lesson.title}</span>
                </div>
              ))}
              
              {/* Exercises */}
              {module.exercises?.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-background transition-colors"
                >
                  <FileQuestion className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm flex-1">{exercise.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

