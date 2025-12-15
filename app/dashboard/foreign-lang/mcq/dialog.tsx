"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mcqPracticeTypes, type LanguageValue } from "../config";

interface McqPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  onStartPractice?: () => Promise<void>;
}

export function McqPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  onStartPractice,
}: McqPracticeDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";

  const handleStartPractice = async () => {
    if (onStartPractice) {
      setIsGenerating(true);
      try {
        await onStartPractice();
        // Dialog will be closed by the parent component
      } catch (error) {
        console.error('Error starting MCQ practice:', error);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Fallback to old behavior
      onOpenChange(false);
    }
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
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Practice Session...
              </>
            ) : (
              'Start Practice'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
