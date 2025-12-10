"use client";

import { Module } from './types';
import CourseModule from './CourseModule';

interface CourseOverviewProps {
  modules: Module[];
  expandedModules: Set<string>;
  onToggleModule: (moduleId: string) => void;
}

export default function CourseOverview({ 
  modules, 
  expandedModules, 
  onToggleModule 
}: CourseOverviewProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Course Overview</h2>
        <p className="text-muted-foreground mb-8">
          A step-by-step guide to mastering the course content
        </p>

        {/* Modules List */}
        <div className="space-y-2">
          {modules?.map((module, index) => (
            <CourseModule
              key={module.id}
              module={module}
              moduleIndex={index}
              isExpanded={expandedModules.has(module.id)}
              onToggle={() => onToggleModule(module.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

