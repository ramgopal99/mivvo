"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { questionCountOptions, type LanguageValue } from "../config";

interface WritingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  topicCount: string;
  onTopicCountChange: (count: string) => void;
  onGeneratePractice: (sessionIds: string[]) => void;
}

export function WritingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  topicCount,
  onTopicCountChange,
  onGeneratePractice,
}: WritingPracticeDialogProps) {
  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";

  const handleGenerate = () => {
    const sessionIds: string[] = [];
    const count = parseInt(topicCount);

    // Generate multiple instances of the same writing topic ID
    for (let i = 0; i < Math.min(count, 2); i++) {
      sessionIds.push('writing-topic');
    }

    onGeneratePractice(sessionIds);
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
          {/* Topic Count Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Number of Topics:</Label>
            <Select value={topicCount} onValueChange={onTopicCountChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of topics" />
              </SelectTrigger>
              <SelectContent>
                {questionCountOptions.writing.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Topic{count > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select 1 or 2 topics to practice your writing skills
            </p>
          </div>

          {/* Generate Button */}
          <Button className="w-full cursor-pointer" size="lg" onClick={handleGenerate}>
            Generate Writing Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
