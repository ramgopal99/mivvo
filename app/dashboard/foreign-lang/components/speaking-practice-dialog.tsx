"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { speakingPracticeTypes, questionCountOptions, type LanguageValue } from "../config";

interface SpeakingPracticeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLanguage: LanguageValue;
  selectedSpeakingType: string;
  onSpeakingTypeChange: (type: string) => void;
  responseCount: string;
  onResponseCountChange: (count: string) => void;
}

export function SpeakingPracticeDialog({
  isOpen,
  onOpenChange,
  selectedLanguage,
  selectedSpeakingType,
  onSpeakingTypeChange,
  responseCount,
  onResponseCountChange,
}: SpeakingPracticeDialogProps) {
  const languageLabels = {
    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    japanese: "Japanese",
  };

  const languageLabel = languageLabels[selectedLanguage] || "English";


  const handleGenerate = () => {
    // TODO: Implement the generation logic
    console.log("Generating speaking practice:", {
      language: selectedLanguage,
      type: selectedSpeakingType,
      responses: parseInt(responseCount)
    });
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
          {/* Practice Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Practice Type:</Label>
            <div className="space-y-2">
              {speakingPracticeTypes.map((practiceType) => (
                <div key={practiceType.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={practiceType.id}
                    name="speaking-type"
                    value={practiceType.id}
                    checked={selectedSpeakingType === practiceType.id}
                    onChange={(e) => onSpeakingTypeChange(e.target.value)}
                    title={`Select ${practiceType.title} practice type`}
                    className="h-4 w-4"
                  />
                  <Label htmlFor={practiceType.id} className="flex-1 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{practiceType.icon}</span>
                      <div>
                        <div className="font-medium">{practiceType.title}</div>
                        <div className="text-xs text-muted-foreground">{practiceType.description}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Response Count Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Number of Responses:</Label>
            <Select value={responseCount} onValueChange={onResponseCountChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of responses" />
              </SelectTrigger>
              <SelectContent>
                {questionCountOptions.speaking.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} Responses
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose how many speaking exercises you want to practice.
            </p>
          </div>

          {/* Generate Button */}
          <Button className="w-full cursor-pointer" size="lg" onClick={handleGenerate}>
            Start Speaking Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
