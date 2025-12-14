"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { speakingPracticeTypes, type LanguageValue } from "../config";

interface SpeakingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
}

export function SpeakingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
}: SpeakingPracticeDialogProps) {
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
    // Navigate to practice interface with the complete speaking session
    // This gives access to all 4 questions (2 speak + 2 repeat) with next/previous navigation
    const languagePrefix = selectedLanguage === "french" ? "-french" : "-english";
    router.push(`/dashboard/foreign-lang/practice/speaking-session${languagePrefix}-1`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Speaking + Listening Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Practice your speaking and listening skills with interactive audio exercises.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Practice Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Available Speaking + Listening Practice:</Label>
            <div className="space-y-3">
              {speakingPracticeTypes.map((practiceType) => (
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
