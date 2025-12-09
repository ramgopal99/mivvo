"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { levelDescriptions, skillConfig, type LanguageValue } from "../config";
import { ReadingPracticeDialog } from "./reading-practice-dialog";

interface ReadingPracticeProps {
  level: string;
  selectedLanguage: LanguageValue;
}

export function ReadingPractice({ level, selectedLanguage }: ReadingPracticeProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPracticeTypes, setSelectedPracticeTypes] = useState<string[]>([]);
  const [readingComprehensionCount, setReadingComprehensionCount] = useState("1");
  const [rearrangeSentencesCount, setRearrangeSentencesCount] = useState("1");

  const config = skillConfig.reading;
  const Icon = BookOpen;
  const levelDesc = levelDescriptions[level as keyof typeof levelDescriptions] || levelDescriptions.A1;
  const description = levelDesc.reading;

  const handlePracticeClick = () => {
    setIsDialogOpen(true);
  };

  const handleGeneratePractice = (sessionIds: string[]) => {
    router.push(`/dashboard/foreign-lang/practice/${sessionIds.join(',')}`);
    setIsDialogOpen(false);
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

      <ReadingPracticeDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedLanguage={selectedLanguage}
        selectedPracticeTypes={selectedPracticeTypes}
        onPracticeTypesChange={setSelectedPracticeTypes}
        readingComprehensionCount={readingComprehensionCount}
        onReadingComprehensionCountChange={setReadingComprehensionCount}
        rearrangeSentencesCount={rearrangeSentencesCount}
        onRearrangeSentencesCountChange={setRearrangeSentencesCount}
        onGeneratePractice={handleGeneratePractice}
      />
    </>
  );
}
