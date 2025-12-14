"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { readingPracticeTypes, type LanguageValue } from "../config";
import { allReadingData } from "../data/reading-practice-data";

interface ReadingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
}

export function ReadingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
}: ReadingPracticeDialogProps) {
  const router = useRouter();

  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";

  const handleStartPractice = () => {
    // Navigate to practice interface with language-specific session ID
    const languagePrefix = selectedLanguage === "french" ? "-french" : "-english";
    router.push(`/dashboard/foreign-lang/practice/reading-session${languagePrefix}-1`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Reading Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Start a comprehensive reading practice session with comprehension and sentence rearrangement exercises.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Practice Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Practice includes:</Label>
            <div className="space-y-3">
              {readingPracticeTypes.map((practiceType) => (
                <div key={practiceType.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/30">
                  <span className="text-lg">{practiceType.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{practiceType.title}</div>
                    <div className="text-xs text-muted-foreground">{practiceType.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Practice Button */}
          <Button
            className="w-full cursor-pointer"
            size="lg"
            onClick={handleStartPractice}
          >
            Start Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
