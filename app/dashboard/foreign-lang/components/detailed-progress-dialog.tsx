"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getCEFRLevel, getAllCEFRLevels, skillConfig } from "../config";

interface DetailedProgressDialogProps {
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
  }>;
}

export function DetailedProgressDialog({ currentLevel, levelProgress }: DetailedProgressDialogProps) {
  const allLevels = getAllCEFRLevels();

  const LevelContent = ({ level }: { level: typeof allLevels[0] }) => {
    const levelData = levelProgress?.[level.level];
    const isCurrentLevel = level.level === currentLevel;
    const totalPoints = levelData?.totalPoints || 0;
    const pointsProgress = Math.min(Math.round((totalPoints / level.totalTargetScore) * 100), 100);

    return (
      <div className="space-y-6">
        <div className={`border rounded-lg p-6 ${isCurrentLevel ? 'border-primary bg-primary/5' : 'border-border'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold">{level.name}</h3>
              {isCurrentLevel && (
                <Badge variant="default" className="bg-primary">Current Level</Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {totalPoints}/{level.totalTargetScore} points ({pointsProgress}%)
            </div>
          </div>

          <div className="mb-4">
            <Progress value={pointsProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {Object.entries(skillConfig).map(([skillKey, skillInfo]) => {
              const pointsEarned = levelData?.skillPoints?.[skillKey] || 0;
              const skillProgressPercent = Math.min(Math.round((pointsEarned / level.skillTargetScore) * 100), 100);

              return (
                <div key={skillKey} className="text-center p-4 bg-muted/30 rounded-lg border">
                  <div className="text-sm font-medium mb-2">{skillInfo.title}</div>
                  <div className="text-sm font-semibold mb-2">
                    {pointsEarned}/{level.skillTargetScore}
                  </div>
                  <Progress value={skillProgressPercent} className="h-2" />
                </div>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
            {level.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DialogContent className="max-w-5xl max-h-[85vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">CEFR Level Progress Details</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue={currentLevel} className="mt-4">
        <TabsList className="grid w-full grid-cols-6">
          {allLevels.map((level) => (
            <TabsTrigger
              key={level.level}
              value={level.level}
              className={`text-xs ${level.level === currentLevel ? 'bg-primary !text-black font-semibold' : ''}`}
            >
              {level.level}
            </TabsTrigger>
          ))}
        </TabsList>

        {allLevels.map((level) => (
          <TabsContent key={level.level} value={level.level} className="mt-4">
            <LevelContent level={level} />
          </TabsContent>
        ))}
      </Tabs>
    </DialogContent>
  );
}
