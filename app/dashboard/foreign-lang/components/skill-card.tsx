"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PenTool, Volume2, HelpCircle } from "lucide-react";
import { skillConfig, type SkillType, type LanguageValue } from "../config";
import { ReadingPracticeDialog } from "../reading";
import { WritingPracticeDialog } from "../writing";
import { SpeakingPracticeDialog } from "../speaking";
import { McqPracticeDialog } from "../mcq";

interface SkillCardProps {
  type: SkillType;
  selectedLanguage: LanguageValue;
}


// Icon mapping for skill types
const iconMap = {
  BookOpen,
  PenTool,
  Volume2,
  HelpCircle,
};

export function SkillCard({ type, selectedLanguage }: SkillCardProps) {
  const router = useRouter();
  const [isReadingDialogOpen, setIsReadingDialogOpen] = useState(false);
  const [isWritingDialogOpen, setIsWritingDialogOpen] = useState(false);
  const [isSpeakingDialogOpen, setIsSpeakingDialogOpen] = useState(false);
  const [isMcqDialogOpen, setIsMcqDialogOpen] = useState(false);

  const config = skillConfig[type];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  const description = config.description;

  const handleAnalysisClick = () => {
    const languagePrefix = selectedLanguage === "french" ? "-french" : "-english";

    if (type === "reading") {
      router.push(`/dashboard/foreign-lang/reading/reading-session${languagePrefix}-1`);
    } else if (type === "writing") {
      router.push(`/dashboard/foreign-lang/writing/writing-session${languagePrefix}-1`);
    } else if (type === "speaking") {
      router.push(`/dashboard/foreign-lang/speaking/speaking-session${languagePrefix}-1`);
    } else if (type === "mcq") {
      router.push(`/dashboard/foreign-lang/mcq/mcq-session${languagePrefix}-1`);
    }
  };

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
      <Card className="hover:shadow-lg transition-all duration-200 min-h-[200px] flex flex-col">
        <CardHeader className="pb-2">
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
        <CardContent className="pt-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="default"
              className="flex-1 h-10 cursor-pointer"
              onClick={handleAnalysisClick}
            >
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
