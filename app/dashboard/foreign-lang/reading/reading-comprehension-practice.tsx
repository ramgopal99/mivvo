"use client";

import { Button } from "@/components/ui/button";
import { type ReadingComprehensionData } from "../data/practice-data";

interface ReadingComprehensionPracticeProps {
  data: ReadingComprehensionData;
  userAnswer?: number;
  onAnswer: (answer: number) => void;
}

export function ReadingComprehensionPractice({
  data,
  userAnswer,
  onAnswer
}: ReadingComprehensionPracticeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden p-8">
      {/* Left side - Reading Passage */}
      <div className="space-y-4 pr-4">
        <h3 className="text-xl font-semibold text-center lg:text-left">Reading Passage</h3>
        <div className="p-6 bg-muted rounded-lg h-[calc(100vh-250px)] overflow-hidden">
          <p className="text-sm leading-relaxed">{data.passage}</p>
        </div>
      </div>

      {/* Right side - Question and Options */}
      <div className="space-y-6 pl-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center lg:text-left">Question</h3>
          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="font-medium leading-relaxed">{data.question}</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Select your answer:</label>
          <div className="space-y-2 h-[calc(100vh-350px)] overflow-hidden">
            {data.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                className={`w-full p-4 text-left border rounded-lg hover:bg-muted transition-colors ${
                  userAnswer === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <span className="font-medium mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
