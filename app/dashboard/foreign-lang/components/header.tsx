"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressBar } from "./progress-bar";
import { LanguageDefinition } from "../config";

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: LanguageDefinition[];
  skillType?: 'reading' | 'mcq'; // Optional: filter progress by specific skill type
}

interface UserProgressData {
  language: {
    id: string;
    name: string;
    code: string;
  };
  currentLevel: string;
  currentLevelDetails: {
    level: string;
    name: string;
    description: string;
    totalTargetScore: number;
    skillTargetScore: number;
    totalRange: { min: number; max: number };
    order: number;
    vocabulary: string;
    grammar: string;
    complexity: string;
  };
  levelProgress: Record<string, {
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
  availableSkills: Array<{
    key: string;
    name: string;
    description: string;
    weight: number;
    isActive: boolean;
  }>;
  scores: {
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
    writing: Array<{
      level: string;
      score: number;
      points: number;
      completedAt: string;
      sessionId: string;
      attemptId: string;
    }>;
    speaking: Array<{
      level: string;
      score: number;
      points: number;
      completedAt: string;
      sessionId: string;
      attemptId: string;
    }>;
  };
}

export function Header({ selectedLanguage, onLanguageChange, languages, skillType }: HeaderProps) {
  const [userProgress, setUserProgress] = useState<UserProgressData | null>(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const params = new URLSearchParams({
          language: selectedLanguage.toUpperCase()
        });
        if (skillType) {
          params.append('skillType', skillType);
        }
        const response = await fetch(`/api/foreign-language/user/progress?${params.toString()}`);
        const result = await response.json();
        if (result.success) {
          setUserProgress(result.data);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    // Fetch progress when language or skill type changes
    fetchUserProgress();
  }, [selectedLanguage, skillType]); // Re-fetch when language or skill type changes
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Foreign Language</h1>
        <div className="flex items-center gap-4">
          <ProgressBar currentLevel={userProgress?.currentLevel} levelProgress={userProgress?.levelProgress} scores={userProgress?.scores} />
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.language.toLowerCase()} value={language.language.toLowerCase()}>
                  <div className="flex items-center gap-2">
                    {language.flag && <span>{language.flag}</span>}
                    <span>{language.name}</span>
                    <span className="text-xs text-muted-foreground">({language.code.toUpperCase()})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
    </div>
  );
}
