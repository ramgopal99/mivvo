"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type LanguageValue } from "../config";

interface WritingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
}

export function WritingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
}: WritingPracticeDialogProps) {
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
    const sessionIds: string[] = ["writing-1"]; // Always show the writing topic

    // Navigate to practice interface with session IDs
    // With [...sessionIds], each ID becomes a path segment
    router.push(`/dashboard/foreign-lang/practice/${sessionIds.join('/')}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Writing Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Select the number of topics you want to write about and improve your writing skills.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Writing Practice Info */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Writing Practice Features:</Label>
            <div className="p-3 border rounded-lg bg-muted/30">
              <div className="font-medium mb-2">Topic-Based Writing</div>
              <div className="text-xs text-muted-foreground">
                Practice writing on various topics to improve your composition skills, vocabulary, and grammar.
                Topics range from everyday conversations to academic subjects.
              </div>
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
