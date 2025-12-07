"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PenTool, Volume2, HelpCircle } from "lucide-react";
import { levelDescriptions, skillConfig, type SkillType, type LanguageValue } from "../config";
import { ReadingPracticeDialog } from "../reading/reading-practice-dialog";
import { WritingPracticeDialog } from "../writing/writing-practice-dialog";
import { SpeakingPracticeDialog } from "./speaking-practice-dialog";
import { McqPracticeDialog } from "./mcq-practice-dialog";
import { PracticeInterface } from "./practice-interface";

// Import the result type
interface PracticeResult {
  sessionId: string;
  userAnswer?: string | number | string[];
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

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
  const [isPracticeInterfaceOpen, setIsPracticeInterfaceOpen] = useState(false);
  const [practiceSessionIds, setPracticeSessionIds] = useState<string[]>([]);
  const [selectedPracticeTypes, setSelectedPracticeTypes] = useState<string[]>([]);
  const [selectedMcqTypes, setSelectedMcqTypes] = useState<string[]>([]);
  const [selectedSpeakingType, setSelectedSpeakingType] = useState("listen-speak-response");
  const [readingComprehensionCount, setReadingComprehensionCount] = useState("1");
  const [rearrangeSentencesCount, setRearrangeSentencesCount] = useState("1");
  const [writingTopicCount, setWritingTopicCount] = useState("1");
  const [speakingResponseCount, setSpeakingResponseCount] = useState("5");
  const [mcqQuestionCount, setMcqQuestionCount] = useState("10");

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

  const handleGeneratePractice = (sessionIds: string[]) => {
    setPracticeSessionIds(sessionIds);
    setIsPracticeInterfaceOpen(true);
  };

  const handlePracticeComplete = (results: PracticeResult[]) => {
    console.log("Practice completed with results:", results);
    setIsPracticeInterfaceOpen(false);
    setPracticeSessionIds([]);
    // Here you could save results, show completion screen, etc.
  };

  const handleExitPractice = () => {
    setIsPracticeInterfaceOpen(false);
    setPracticeSessionIds([]);
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
          selectedPracticeTypes={selectedPracticeTypes}
          onPracticeTypesChange={setSelectedPracticeTypes}
          readingComprehensionCount={readingComprehensionCount}
          onReadingComprehensionCountChange={setReadingComprehensionCount}
          rearrangeSentencesCount={rearrangeSentencesCount}
          onRearrangeSentencesCountChange={setRearrangeSentencesCount}
          onGeneratePractice={handleGeneratePractice}
        />
      )}

      {/* Writing Practice Dialog */}
      {type === "writing" && (
        <WritingPracticeDialog
          isOpen={isWritingDialogOpen}
          onOpenChange={setIsWritingDialogOpen}
          selectedLanguage={selectedLanguage}
          topicCount={writingTopicCount}
          onTopicCountChange={setWritingTopicCount}
          onGeneratePractice={handleGeneratePractice}
        />
      )}

      {/* Speaking Practice Dialog */}
      {type === "speaking" && (
        <SpeakingPracticeDialog
          isOpen={isSpeakingDialogOpen}
          onOpenChange={setIsSpeakingDialogOpen}
          selectedLanguage={selectedLanguage}
          selectedSpeakingType={selectedSpeakingType}
          onSpeakingTypeChange={setSelectedSpeakingType}
          responseCount={speakingResponseCount}
          onResponseCountChange={setSpeakingResponseCount}
        />
      )}

      {/* MCQ Practice Dialog */}
      {type === "mcq" && (
        <McqPracticeDialog
          isOpen={isMcqDialogOpen}
          onOpenChange={setIsMcqDialogOpen}
          selectedLanguage={selectedLanguage}
          selectedMcqTypes={selectedMcqTypes}
          onMcqTypesChange={setSelectedMcqTypes}
          questionCount={mcqQuestionCount}
          onQuestionCountChange={setMcqQuestionCount}
        />
      )}

      {/* Practice Interface */}
      {isPracticeInterfaceOpen && (
        <PracticeInterface
          sessionIds={practiceSessionIds}
          onComplete={handlePracticeComplete}
          onExit={handleExitPractice}
        />
      )}
    </>
  );
}
