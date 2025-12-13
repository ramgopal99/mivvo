"use client";

import { Progress } from "@/components/ui/progress";

const levels = ["A1"];

interface ProgressBarProps {
  currentProgress?: { [key: string]: number };
}

export function ProgressBar({ currentProgress = { A1: 40 } }: ProgressBarProps) {
  const progress = currentProgress.A1 || 0;
  const isActive = progress > 0 && progress < 100;
  const isCompleted = progress === 100;

  return (
    <div className="flex items-center gap-3">
      <div className="h-9 px-4 bg-muted/50 rounded-md border flex items-center justify-between min-w-[140px]">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${
            isCompleted ? 'text-green-600' :
            isActive ? 'text-blue-600' :
            'text-muted-foreground'
          }`}>
            A1
          </div>
          <div className="relative w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' :
                isActive ? 'bg-blue-500' :
                'bg-gray-300'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' :
            isActive ? 'text-blue-600' :
            'text-muted-foreground'
          }`}>
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
