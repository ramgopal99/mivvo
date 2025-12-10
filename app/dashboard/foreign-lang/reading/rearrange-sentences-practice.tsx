"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, RotateCcw } from "lucide-react";
import { type RearrangeSentenceData } from "../data/reading-practice-data";

interface RearrangeSentencesPracticeProps {
  sessionId: string;
  data: RearrangeSentenceData;
  userAnswer?: string;
  onAnswer: (sessionId: string, answer: string) => void;
}

export function RearrangeSentencesPractice({
  sessionId,
  data,
  userAnswer,
  onAnswer
}: RearrangeSentencesPracticeProps) {
  const [scrambledWords, setScrambledWords] = useState<string[]>(data.scrambledSentence);
  const [arrangedWords, setArrangedWords] = useState<string[]>(userAnswer ? userAnswer.split(' ') : []);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Check if the current arrangement is correct
  useEffect(() => {
    if (arrangedWords.length === data.correctOrder.length) {
      const currentAnswer = arrangedWords.join(' ');
      const correctAnswer = data.correctOrder.join(' ');
      const correct = currentAnswer === correctAnswer;
      setIsCorrect(correct);

      // Call onAnswer with the arranged sentence
      onAnswer(sessionId, currentAnswer);
    } else {
      setIsCorrect(null);
    }
  }, [arrangedWords, data.correctOrder, onAnswer]);

  const addWord = (word: string, index: number) => {
    setArrangedWords([...arrangedWords, word]);
    setScrambledWords(scrambledWords.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    const word = arrangedWords[index];
    setArrangedWords(arrangedWords.filter((_, i) => i !== index));
    setScrambledWords([...scrambledWords, word]);
  };

  const resetArrangement = () => {
    setScrambledWords(data.scrambledSentence);
    setArrangedWords([]);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Rearrange Sentences</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag and drop the words to form a grammatically correct sentence.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scrambled Words Pool */}
          <div>
            <h3 className="font-semibold mb-3">Available Words:</h3>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
              {scrambledWords.map((word, index) => (
                <Badge
                  key={`scrambled-${index}`}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1 text-sm"
                  onClick={() => addWord(word, index)}
                >
                  {word}
                </Badge>
              ))}
              {scrambledWords.length === 0 && (
                <p className="text-sm text-muted-foreground self-center">All words used!</p>
              )}
            </div>
          </div>

          {/* Arrangement Area */}
          <div>
            <h3 className="font-semibold mb-3">Your Sentence:</h3>
            <div className="min-h-[60px] p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
              <div className="flex flex-wrap gap-2">
                {arrangedWords.map((word, index) => (
                  <Badge
                    key={`arranged-${index}`}
                    variant="default"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors px-3 py-1 text-sm"
                    onClick={() => removeWord(index)}
                    title="Click to remove"
                  >
                    {word}
                  </Badge>
                ))}
                {arrangedWords.length === 0 && (
                  <p className="text-sm text-muted-foreground self-center">Click words above to build your sentence</p>
                )}
              </div>
            </div>
          </div>

          {/* Result and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCorrect === true && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Correct!</span>
                </div>
              )}
              {isCorrect === false && (
                <div className="flex items-center gap-2 text-red-600">
                  <span className="text-sm font-medium">Try again</span>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetArrangement}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Show correct answer and explanation */}
          {isCorrect === true && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Correct Answer:</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                "{data.correctOrder.join(' ')}"
              </p>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Explanation:</h4>
              <p className="text-sm text-green-700 dark:text-green-300">{data.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}