"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { readingPracticeTypes, questionCountOptions, type LanguageValue } from "../config";

interface ReadingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  selectedPracticeTypes: string[];
  onPracticeTypesChange: (types: string[]) => void;
  readingComprehensionCount: string;
  onReadingComprehensionCountChange: (count: string) => void;
  rearrangeSentencesCount: string;
  onRearrangeSentencesCountChange: (count: string) => void;
  onGeneratePractice: (sessionIds: string[]) => void;
}

export function ReadingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  selectedPracticeTypes,
  onPracticeTypesChange,
  readingComprehensionCount,
  onReadingComprehensionCountChange,
  rearrangeSentencesCount,
  onRearrangeSentencesCountChange,
  onGeneratePractice,
}: ReadingPracticeDialogProps) {
  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";

  const handlePracticeTypeToggle = (practiceTypeId: string, checked: boolean) => {
    if (checked) {
      onPracticeTypesChange([...selectedPracticeTypes, practiceTypeId]);
    } else {
      onPracticeTypesChange(selectedPracticeTypes.filter(id => id !== practiceTypeId));
    }
  };

  const isReadingComprehensionSelected = selectedPracticeTypes.includes("reading-comprehension");
  const isRearrangeSentencesSelected = selectedPracticeTypes.includes("rearrange-sentences");

  const handleGenerate = () => {
    const sessionIds: string[] = [];

    if (isReadingComprehensionSelected) {
      const count = parseInt(readingComprehensionCount);
      // Generate multiple instances of the same reading comprehension ID
      for (let i = 0; i < Math.min(count, 10); i++) {
        sessionIds.push('reading-comp');
      }
    }

    if (isRearrangeSentencesSelected) {
      const count = parseInt(rearrangeSentencesCount);
      // Generate multiple instances of the same rearrange sentences ID
      for (let i = 0; i < Math.min(count, 10); i++) {
        sessionIds.push('rearrange-sent');
      }
    }

    onGeneratePractice(sessionIds);
    onOpenChange(false);
  };

  const canGenerate = selectedPracticeTypes.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Reading Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Choose a reading activity and number of questions to practice and improve your skills.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Practice Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Practice Types:</Label>
            <div className="space-y-3">
              {readingPracticeTypes.map((practiceType) => {
                const isSelected = selectedPracticeTypes.includes(practiceType.id);
                return (
                  <div key={practiceType.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={practiceType.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => handlePracticeTypeToggle(practiceType.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={practiceType.id} className="flex items-start gap-2 cursor-pointer">
                        <span className="text-lg">{practiceType.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{practiceType.title}</div>
                          <div className="text-xs text-muted-foreground">{practiceType.description}</div>
                        </div>
                      </Label>

                      {/* Question Count Selection - only show when selected */}
                      {isSelected && (
                        <div className="mt-3 ml-6">
                          <Label className="text-xs font-medium text-muted-foreground">Number of Questions:</Label>
                          <Select
                            value={practiceType.id === "reading-comprehension" ? readingComprehensionCount : rearrangeSentencesCount}
                            onValueChange={practiceType.id === "reading-comprehension" ? onReadingComprehensionCountChange : onRearrangeSentencesCountChange}
                          >
                            <SelectTrigger className="w-full mt-1">
                              <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                              {(practiceType.id === "reading-comprehension"
                                ? questionCountOptions.readingComprehension
                                : questionCountOptions.rearrangeSentences
                              ).map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            {practiceType.id === "reading-comprehension"
                              ? "Up to 10 reading comprehension exercises available"
                              : "Up to 10 sentence rearrangement exercises available"
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            className="w-full cursor-pointer"
            size="lg"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            Generate Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
