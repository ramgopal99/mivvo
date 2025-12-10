"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PenTool, Volume2, HelpCircle } from "lucide-react";
import { levelDescriptions, skillConfig, type SkillType, type LanguageValue } from "../config";
import { ReadingPracticeDialog } from "../reading";
import { WritingPracticeDialog } from "../writing";
import { SpeakingPracticeDialog } from "../speaking";
import { McqPracticeDialog } from "../mcq";

interface SkillCardProps {
  type: SkillType;
  level: string;
  selectedLanguage: LanguageValue;
}


// Icon mapping for skill types
const iconMap = {
  BookOpen,
  PenTool,
  Volume2,
  HelpCircle,
};

export function SkillCard({ type, level, selectedLanguage }: SkillCardProps) {
  const [isReadingDialogOpen, setIsReadingDialogOpen] = useState(false);
  const [isWritingDialogOpen, setIsWritingDialogOpen] = useState(false);
  const [isSpeakingDialogOpen, setIsSpeakingDialogOpen] = useState(false);
  const [isMcqDialogOpen, setIsMcqDialogOpen] = useState(false);

  const config = skillConfig[type];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  const levelDesc = levelDescriptions[level as keyof typeof levelDescriptions] || levelDescriptions.A1;
  const description = levelDesc[type as keyof typeof levelDesc];

  const handlePracticeClick = () => {
    if (type === "reading") {
      setIsReadingDialogOpen(true);
    } else if (type === "writing") {
      setIsWritingDialogOpen(true);
    } else if (type === "speaking") {
      setIsSpeakingDialogOpen(true);
    } else if (type === "mcq") {
      setIsMcqDialogOpen(true);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 min-h-[280px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${config.bgColor} flex-shrink-0`}>
              <Icon className={`h-7 w-7 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-2">{config.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 mt-auto">
          <div className="flex gap-3">
            <Button variant="outline" size="default" className="flex-1 h-10 cursor-pointer">
              Analysis
            </Button>
            <Button
              variant="default"
              size="default"
              className="flex-1 h-10 cursor-pointer"
              onClick={handlePracticeClick}
            >
              Practice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reading Practice Dialog */}
      {type === "reading" && (
        <ReadingPracticeDialog
          isOpen={isReadingDialogOpen}
          onOpenChange={setIsReadingDialogOpen}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Writing Practice Dialog */}
      {type === "writing" && (
        <WritingPracticeDialog
          isOpen={isWritingDialogOpen}
          onOpenChange={setIsWritingDialogOpen}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Speaking Practice Dialog */}
      {type === "speaking" && (
        <SpeakingPracticeDialog
          isOpen={isSpeakingDialogOpen}
          onOpenChange={setIsSpeakingDialogOpen}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* MCQ Practice Dialog */}
      {type === "mcq" && (
        <McqPracticeDialog
          isOpen={isMcqDialogOpen}
          onOpenChange={setIsMcqDialogOpen}
          selectedLanguage={selectedLanguage}
        />
      )}
    </>
  );
}
