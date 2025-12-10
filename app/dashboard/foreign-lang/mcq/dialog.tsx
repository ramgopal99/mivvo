"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mcqPracticeTypes, type LanguageValue } from "../config";

interface McqPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
}

export function McqPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
}: McqPracticeDialogProps) {
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
    // Navigate to practice interface with MCQ session ID
    router.push(`/dashboard/foreign-lang/practice/mcq-session-1`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            MCQ Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Test your grammar and vocabulary knowledge with comprehensive MCQ practice including sentence completion and word replacement exercises.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available MCQ Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Available MCQ Practice Types:</Label>
            <div className="grid grid-cols-2 gap-4">
              {mcqPracticeTypes.map((mcqType) => (
                <div key={mcqType.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/30">
                  <span className="text-lg">{mcqType.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{mcqType.title}</div>
                    <div className="text-xs text-muted-foreground">{mcqType.description}</div>
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
