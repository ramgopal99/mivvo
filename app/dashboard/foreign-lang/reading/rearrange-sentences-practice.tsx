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

  // Sync with userAnswer prop when it changes
  useEffect(() => {
    if (userAnswer) {
      const words = userAnswer.split(' ');
      setArrangedWords(words);
      // Reconstruct scrambled words
      const usedWords = new Set(words);
      const remaining = data.scrambledSentence.filter(word => !usedWords.has(word));
      setScrambledWords(remaining);
    } else {
      setScrambledWords(data.scrambledSentence);
      setArrangedWords([]);
    }
  }, [userAnswer, data.scrambledSentence]);

  // Check if the current arrangement is correct and mark as answered
  useEffect(() => {
    if (arrangedWords.length > 0) {
      const currentAnswer = arrangedWords.join(' ');
      // Always call onAnswer when arrangement changes (marks as answered)
      onAnswer(sessionId, currentAnswer);
      
      if (arrangedWords.length === data.correctOrder.length) {
        const correctAnswer = data.correctOrder.join(' ');
        const correct = currentAnswer === correctAnswer;
        setIsCorrect(correct);
      } else {
        setIsCorrect(null);
      }
    } else {
      setIsCorrect(null);
    }
  }, [arrangedWords, data.correctOrder, sessionId, onAnswer]);

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
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetArrangement}
              className="flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}