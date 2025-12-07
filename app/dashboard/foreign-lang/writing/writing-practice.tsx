"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import { levelDescriptions, skillConfig, type LanguageValue } from "../config";
import { WritingPracticeDialog } from "./writing-practice-dialog";

interface WritingPracticeProps {
  level: string;
  selectedLanguage: LanguageValue;
}

export function WritingPractice({ level, selectedLanguage }: WritingPracticeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [writingTopicCount, setWritingTopicCount] = useState("1");
  const router = useRouter();

  const config = skillConfig.writing;
  const Icon = PenTool;
  const levelDesc = levelDescriptions[level as keyof typeof levelDescriptions] || levelDescriptions.A1;
  const description = levelDesc.writing;

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

      <WritingPracticeDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedLanguage={selectedLanguage}
        topicCount={writingTopicCount}
        onTopicCountChange={setWritingTopicCount}
        onGeneratePractice={handleGeneratePractice}
      />
    </>
  );
}