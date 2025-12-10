"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type ReadingComprehensionData } from "../data/reading-practice-data";

interface ReadingComprehensionPracticeProps {
  sessionId: string;
  data: ReadingComprehensionData;
  userAnswer?: number;
  onAnswer: (sessionId: string, answer: number) => void;
}

export function ReadingComprehensionPractice({
  sessionId,
  data,
  userAnswer,
  onAnswer
}: ReadingComprehensionPracticeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(userAnswer);

  const handleAnswerChange = (value: string) => {
    const answerIndex = parseInt(value);
    setSelectedAnswer(answerIndex);
    onAnswer(sessionId, answerIndex);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Reading Comprehension</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Passage */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-3">Read the following passage:</h3>
            <p className="text-sm leading-relaxed">{data.passage}</p>
          </div>

          {/* Question */}
          <div>
            <h3 className="font-semibold mb-3">{data.question}</h3>

            {/* Answer Options */}
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {data.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Show explanation if answer is selected */}
          {selectedAnswer !== undefined && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explanation:</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">{data.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
