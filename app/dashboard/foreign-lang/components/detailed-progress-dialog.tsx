"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getAllCEFRLevels, skillConfig } from "../config";

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
    cumulativeTotalTarget?: number;
    cumulativeSkillTarget?: number;
    levelTotalPoints?: number;
    levelSkillPoints?: Record<string, number>;
    levelSpecificTotalEarned?: number;
    levelSpecificTotalTarget?: number;
    levelSpecificSkillPoints?: Record<string, number>;
    totalRange?: { min: number; max: number };
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

export function DetailedProgressDialog({ currentLevel, levelProgress, scores }: DetailedProgressDialogProps) {
  const allLevels = getAllCEFRLevels();

  const LevelContent = ({ level }: { level: typeof allLevels[0] }) => {
    const levelData = levelProgress?.[level.level];
    const isCurrentLevel = level.level === currentLevel;
    
    // Get level-specific progress (points earned in THIS level only)
    const levelSpecificTotalEarned = levelData?.levelSpecificTotalEarned || 0;
    
    // Use cumulative target for display (e.g., A2 shows /400, not /200)
    const totalPoints = levelData?.totalPoints || 0;
    const cumulativeTotalTarget = levelData?.cumulativeTotalTarget || level.totalTargetScore;
    const totalPointsProgress = cumulativeTotalTarget > 0 
      ? Math.min(Math.round((totalPoints / cumulativeTotalTarget) * 100), 100)
      : 0;
    
    // Get scores for this level only (for display of latest/best scores)
    const levelReadingScores = scores?.reading.filter(score => score.level === level.level) || [];
    const levelMcqScores = scores?.mcq.filter(score => score.level === level.level) || [];

    return (
      <div className="space-y-4 h-full flex flex-col">
        <div className={`border rounded-lg p-4 ${isCurrentLevel ? 'border-primary bg-primary/5' : 'border-border'} flex flex-col flex-1`}>
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{level.name}</h3>
              {isCurrentLevel && (
                <Badge variant="default" className="bg-primary">Current Level</Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {levelSpecificTotalEarned}/{cumulativeTotalTarget} points ({totalPointsProgress}%)
              <span className="text-xs ml-2">({level.totalRange.min}-{level.totalRange.max})</span>
              <span className="text-xs ml-2 text-muted-foreground">Total: {totalPoints}/{cumulativeTotalTarget}</span>
            </div>
          </div>

          <div className="mb-3 flex-shrink-0">
            <Progress value={totalPointsProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 flex-1 min-h-0">
            {Object.entries(skillConfig).map(([skillKey, skillInfo]) => {
              // Get level-specific skill points (earned in THIS level only)
              const levelSpecificSkillEarned = levelData?.levelSpecificSkillPoints?.[skillKey] || 0;
              
              // Use cumulative target for display (e.g., A2 shows /100, not /50)
              const cumulativeSkillPoints = levelData?.skillPoints?.[skillKey] || 0;
              const cumulativeSkillTarget = levelData?.cumulativeSkillTarget || level.skillTargetScore;
              
              // Progress based on cumulative target
              const skillProgressPercent = cumulativeSkillTarget > 0
                ? Math.min(Math.round((cumulativeSkillPoints / cumulativeSkillTarget) * 100), 100)
                : 0;
              
              // Get level-specific attempts for display
              const levelSkillAttempts = skillKey === 'reading' ? levelReadingScores :
                                        skillKey === 'mcq' ? levelMcqScores : [];
              const totalAttempts = levelSkillAttempts.length;

              // Get latest and best scores from current level attempts only
              const bestScore = levelSkillAttempts.length > 0 ? Math.max(...levelSkillAttempts.map(a => a.score)) : 0;
              const latestScore = levelSkillAttempts.length > 0 ? levelSkillAttempts[levelSkillAttempts.length - 1].score : 0;

              return (
                <div key={skillKey} className="text-center p-4 bg-muted/30 rounded-lg border flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium mb-1">{skillInfo.title}</div>
                    <div className="text-sm font-semibold mb-1">
                      {levelSpecificSkillEarned}/{cumulativeSkillTarget} points
                      <span className="text-xs ml-1 text-muted-foreground">Total: {cumulativeSkillPoints}/{cumulativeSkillTarget}</span>
                    </div>
                    <Progress value={skillProgressPercent} className="h-2 mb-2" />
                  </div>
                  {totalAttempts > 0 ? (
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>Latest: {latestScore}%</div>
                      {bestScore !== latestScore && <div>Best: {bestScore}%</div>}
                      <div>{totalAttempts} attempt{totalAttempts > 1 ? 's' : ''}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      No attempts yet
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded-lg flex-shrink-0">
            {level.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DialogContent className="!w-[90vw] !max-w-6xl max-h-[90vh] flex flex-col">
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="text-2xl font-bold text-center">CEFR Level Progress Details</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue={currentLevel} className="mt-4 flex flex-col flex-1 min-h-0">
        <TabsList className="grid w-full grid-cols-6 flex-shrink-0">
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
          <TabsContent key={level.level} value={level.level} className="mt-4 flex-1 min-h-0">
            <LevelContent level={level} />
          </TabsContent>
        ))}
      </Tabs>
    </DialogContent>
  );
}
