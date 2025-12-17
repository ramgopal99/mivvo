"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type LanguageValue } from "../config";
import { getAuthHeaders } from "@/lib/auth-utils";

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
    setIsGenerating(true);
    try {
      // Generate a new speaking session
      const response = await fetch('/api/foreign-language/speaking/generate', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          language: selectedLanguage.toUpperCase(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Navigate to practice interface with the generated session
        router.push(`/dashboard/foreign-lang/practice/${result.data.sessionId}`);
        onOpenChange(false);
      } else {
        console.error('Failed to generate speaking session:', result.error);
        // Fallback to old behavior for now
        const languagePrefix = selectedLanguage === "french" ? "-french" : "-english";
        router.push(`/dashboard/foreign-lang/practice/speaking-session${languagePrefix}-1`);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error generating speaking session:', error);
      // Fallback to old behavior
      const languagePrefix = selectedLanguage === "french" ? "-french" : "-english";
      router.push(`/dashboard/foreign-lang/practice/speaking-session${languagePrefix}-1`);
      onOpenChange(false);
    } finally {
      setIsGenerating(false);
    }
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
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/30">
                <span className="text-lg">🎧</span>
                <div className="flex-1">
                  <div className="font-medium">Listen and Speaking</div>
                  <div className="text-xs text-muted-foreground">Practice speaking by responding to audio prompts and conversations.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-muted/30">
                <span className="text-lg">🔄</span>
                <div className="flex-1">
                  <div className="font-medium">Listen and Repeat</div>
                  <div className="text-xs text-muted-foreground">Listen to audio clips and repeat them accurately to improve pronunciation.</div>
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
              'Start Practice'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
