"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { type RearrangeSentenceData } from "../data/practice-data";

interface RearrangeSentencesPracticeProps {
  data: RearrangeSentenceData;
  userAnswer?: string;
  onAnswer: (answer: string) => void;
}

export function RearrangeSentencesPractice({
  data,
  userAnswer = "",
  onAnswer
}: RearrangeSentencesPracticeProps) {
  const [usedWords, setUsedWords] = useState<Set<number>>(new Set());

  const handleWordClick = (word: string, index: number) => {
    // Add word to the answer with proper spacing
    const newAnswer = userAnswer.trim() ? `${userAnswer.trim()} ${word}` : word;
    onAnswer(newAnswer);

    // Mark word as used
    setUsedWords(prev => new Set([...prev, index]));
  };

  const handleClear = () => {
    onAnswer("");
    setUsedWords(new Set());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden p-8">
      {/* Left side - Title and Instructions */}
      <div className="space-y-6 pr-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center lg:text-left">Rearrange the words to form a correct sentence</h3>
          <p className="text-muted-foreground leading-relaxed">
            Click on the words below to build your sentence. Words can only be used once.
          </p>
          <p className="text-xs text-muted-foreground">💡 {data.hint}</p>
        </div>
      </div>

      {/* Right side - Interactive Area */}
      <div className="space-y-6 pl-4">
        {/* Word Selection Area */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Available Words:</label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[150px] bg-muted/20 h-[calc(50vh-120px)] overflow-hidden">
            {data.scrambled.map((word, index) => {
              const isUsed = usedWords.has(index);
              return (
                <Badge
                  key={index}
                  variant={isUsed ? "secondary" : "outline"}
                  className={`px-3 py-1 text-sm cursor-pointer transition-all hover:scale-105 ${
                    isUsed
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-primary/10 hover:border-primary/50'
                  }`}
                  onClick={() => !isUsed && handleWordClick(word, index)}
                >
                  {word}
                </Badge>
              );
            })}
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Clear all
          </button>
        </div>

        {/* Answer Area */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Your answer:</label>
          <textarea
            className="w-full p-4 border rounded-lg h-[calc(50vh-140px)] resize-none overflow-y-auto"
            placeholder="Click on words above or type here..."
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
            style={{ height: 'calc(50vh - 140px)', resize: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
