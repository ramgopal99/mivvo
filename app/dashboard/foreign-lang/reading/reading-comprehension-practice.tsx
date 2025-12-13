"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Sync with external userAnswer changes (e.g., navigation)
  useEffect(() => {
    setSelectedAnswer(userAnswer);
  }, [userAnswer]);

  const handleRadioChange = (index: number) => {
    if (selectedAnswer !== index) {
      setSelectedAnswer(index);
      onAnswer(sessionId, index);
    }
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
            <div className="space-y-3">
              {data.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 border rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${sessionId}`}
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleRadioChange(index)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
