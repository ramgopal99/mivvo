"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getCEFRLevel } from "../config";
import { DetailedProgressDialog } from "./detailed-progress-dialog";

interface ProgressBarProps {
  currentLevel?: string;
  levelProgress?: Record<string, {
    completedSkills: number;
    totalSkills: number;
    isCompleted: boolean;
    skills: Array<{
      skillType: string;
      currentAverageScore?: number;
      isCompleted: boolean;
    }>;
    totalPoints: number;
    skillPoints: Record<string, number>;
    cumulativeTotalTarget?: number;
    cumulativeSkillTarget?: number;
    levelTotalPoints?: number;
    levelSkillPoints?: Record<string, number>;
  }>;
  scores?: {
    reading: Array<{
      level: string;
      score: number;
      points: number;
      completedAt: string;
      sessionId: string;
      attemptId: string;
    }>;
    mcq: Array<{
      level: string;
      score: number;
      points: number;
      completedAt: string;
      sessionId: string;
      attemptId: string;
    }>;
  };
}

export function ProgressBar({ currentLevel = 'A1', levelProgress, scores }: ProgressBarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const levelConfig = getCEFRLevel(currentLevel);
  const levelData = levelProgress?.[currentLevel];

  // Ensure we have a valid level config
  if (!levelConfig) {
  return (
    <div className="flex items-center gap-3">
        <div className="h-9 px-4 bg-muted/50 rounded-md border flex items-center justify-between min-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-muted-foreground">
              {currentLevel}
            </div>
            <div className="relative w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gray-300" style={{ width: '0%' }} />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!levelData) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-9 px-4 bg-muted/50 rounded-md border flex items-center justify-between min-w-[180px]">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-muted-foreground">
                    {levelConfig?.name || currentLevel}
                  </div>
                  <div className="relative w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300" style={{ width: '0%' }} />
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    0/{levelConfig?.totalTargetScore || 200}
                  </div>
                </div>
              </div>
            </div>
        </DialogTrigger>
        <DetailedProgressDialog currentLevel={currentLevel} levelProgress={levelProgress} scores={scores} />
      </Dialog>
    );
  }

  // Calculate combined progress across all skills
  const skills = levelData.skills || [];
  const totalSkills = skills.length;
  const completedSkills = skills.filter(s => s.isCompleted).length;
  const averageScore = totalSkills > 0
    ? skills.reduce((sum, s) => sum + (s.currentAverageScore || 0), 0) / totalSkills
    : 0;

  const progress = Math.min(Math.round(averageScore), 100);
  const targetScore = levelConfig.skillTargetScore;
  const totalPoints = levelData.totalPoints || 0;
  // Use cumulative target if available, otherwise fall back to level-specific target
  const cumulativeTotalTarget = levelData.cumulativeTotalTarget || levelConfig.totalTargetScore;
  const pointsProgressPercentage = Math.min(Math.round((totalPoints / cumulativeTotalTarget) * 100), 100);

  const isActive = progress > 0 && progress < targetScore;
  const isCompleted = progress >= targetScore;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-9 px-4 bg-muted/50 rounded-md border flex items-center justify-between min-w-[180px]">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${
            isCompleted ? 'text-green-600' :
            isActive ? 'text-blue-600' :
            'text-muted-foreground'
          }`}>
            {levelConfig.name}
          </div>
          <div className="relative w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' :
                isActive ? 'bg-blue-500' :
                'bg-gray-300'
              }`}
                  style={{ width: `${pointsProgressPercentage}%` }}
            />
          </div>
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-green-600' :
            isActive ? 'text-blue-600' :
            'text-muted-foreground'
          }`}>
                {totalPoints}/{cumulativeTotalTarget}
          </div>
        </div>
      </div>
    </div>
      </DialogTrigger>
      <DetailedProgressDialog currentLevel={currentLevel} levelProgress={levelProgress} scores={scores} />
    </Dialog>
  );
}
