"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mcqPracticeTypes, questionCountOptions, type LanguageValue } from "../config";

interface McqPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  selectedMcqTypes: string[];
  onMcqTypesChange: (types: string[]) => void;
  questionCount: string;
  onQuestionCountChange: (count: string) => void;
}

export function McqPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  selectedMcqTypes,
  onMcqTypesChange,
  questionCount,
  onQuestionCountChange,
}: McqPracticeDialogProps) {
  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";

  const handleMcqTypeToggle = (mcqTypeId: string, checked: boolean) => {
    if (checked) {
      onMcqTypesChange([...selectedMcqTypes, mcqTypeId]);
    } else {
      onMcqTypesChange(selectedMcqTypes.filter(id => id !== mcqTypeId));
    }
  };

  const handleGenerate = () => {
    const practiceData = {
      language: selectedLanguage,
      mcqTypes: selectedMcqTypes,
      questionCount: parseInt(questionCount)
    };

    // TODO: Implement the generation logic
    console.log("Generating MCQ practice:", practiceData);
  };

  const canGenerate = selectedMcqTypes.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            MCQ Practice for {languageLabel}
          </DialogTitle>
          <DialogDescription>
            Select MCQ types and number of questions to test your grammar and vocabulary knowledge.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* MCQ Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select MCQ Types:</Label>
            <div className="grid grid-cols-3 gap-4">
              {mcqPracticeTypes.map((mcqType) => {
                const isSelected = selectedMcqTypes.includes(mcqType.id);
                return (
                  <div key={mcqType.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={mcqType.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleMcqTypeToggle(mcqType.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={mcqType.id} className="flex items-start gap-2 cursor-pointer">
                        <span className="text-lg">{mcqType.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{mcqType.title}</div>
                          <div className="text-xs text-muted-foreground">{mcqType.description}</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Number of Questions per Type:</Label>
            <Select value={questionCount} onValueChange={onQuestionCountChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                {questionCountOptions.mcq.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Questions
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Total questions = Selected types × Questions per type
            </p>
          </div>

          {/* Generate Button */}
          <Button
            className="w-full cursor-pointer"
            size="lg"
            disabled={!canGenerate}
            onClick={handleGenerate}
          >
            Generate MCQ Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
