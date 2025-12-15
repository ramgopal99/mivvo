"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type LanguageValue } from "../config";

interface WritingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  onStartPractice?: () => Promise<void>;
}

export function WritingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  onStartPractice,
}: WritingPracticeDialogProps) {
  const router = useRouter();
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
        console.error('Error starting practice:', error);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Fallback to old behavior - generate session directly
      try {
        setIsGenerating(true);
        const response = await fetch('/api/foreign-language/writing/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: selectedLanguage.toUpperCase(),
          }),
        });

        const result = await response.json();
        if (result.success) {
          router.push(`/dashboard/foreign-lang/practice/${result.data.sessionId}`);
          onOpenChange(false);
        } else {
          console.error('Failed to generate writing practice:', result.error);
        }
      } catch (error) {
        console.error('Error generating writing practice:', error);
      } finally {
        setIsGenerating(false);
      }
    }
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
          {/* Writing & Chat Practice Info */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Complete Writing & Communication Practice:</Label>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-muted/30">
                <div className="font-medium mb-2 flex items-center gap-2">
                  ✍️ Topic-Based Writing
                </div>
                <div className="text-xs text-muted-foreground">
                  Practice writing on various topics including hobbies and travel experiences.
                </div>
              </div>

              <div className="p-3 border rounded-lg bg-muted/30">
                <div className="font-medium mb-2 flex items-center gap-2">
                  💬 AI Conversation Practice
                </div>
                <div className="text-xs text-muted-foreground">
                  Have natural conversations with AI in real scenarios like ordering pizza.
                </div>
              </div>
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
              '🚀 Start Complete Practice Session'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
