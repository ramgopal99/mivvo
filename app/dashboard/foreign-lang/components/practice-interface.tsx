"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import {
  practiceSessionsData,
  type ReadingComprehensionData,
  type RearrangeSentenceData,
  type WritingTopicData
} from "../data/practice-data";
import { ReadingComprehensionPractice, RearrangeSentencesPractice } from "../reading";
import { WritingPracticeInterface } from "../writing";

interface PracticeInterfaceProps {
  sessionIds: string[];
  onComplete: (results: PracticeResult[]) => void;
  onExit: () => void;
}

interface PracticeResult {
  sessionId: string;
  userAnswer?: string | number | string[];
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

type UserAnswer = string | number | string[];

export function PracticeInterface({ sessionIds, onComplete, onExit }: PracticeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});

  const sessions = practiceSessionsData.filter(session => sessionIds.includes(session.id));
  const currentSession = sessions[currentIndex];
  const progress = ((currentIndex + 1) / sessions.length) * 100;

  // Initialize timer for current session
  useEffect(() => {
    if (currentSession) {
      const timeLimit = 'timeLimit' in currentSession.data ? (currentSession.data as WritingTopicData).timeLimit * 60 : 300; // 5 minutes default
      setTimeRemaining(timeLimit);
    }
  }, [currentIndex, currentSession]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | number | string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentSession.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < sessions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Complete the practice session
      const results: PracticeResult[] = sessions.map(session => {
        const userAnswer = userAnswers[session.id];
        let isCorrect = undefined;

        if (session.type === 'reading-comprehension' && typeof userAnswer === 'number') {
          const correctAnswer = (session.data as ReadingComprehensionData).correctAnswer;
          isCorrect = userAnswer === correctAnswer;
        }

        return {
          sessionId: session.id,
          userAnswer,
          isCorrect,
          timeSpent: 0, // Would calculate actual time spent per question
          completedAt: new Date()
        };
      });

      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };




  if (!currentSession) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10 w-full">
        <div className="px-4 py-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onExit}>
              Exit Practice
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{currentSession.level}</Badge>
              <Badge variant="outline">{currentSession.language}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className={timeRemaining < 60 ? 'text-red-500 font-bold' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <span className="text-sm">
              {currentIndex + 1} of {sessions.length}
            </span>
          </div>
        </div>

        <div className="mt-4 w-full">
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Practice Content Area */}
        <div className="flex-1 overflow-hidden p-8 pb-20">
          {currentSession.type === 'reading-comprehension' && (
            <ReadingComprehensionPractice
              data={currentSession.data as ReadingComprehensionData}
              userAnswer={typeof userAnswers[currentSession.id] === 'number' ? userAnswers[currentSession.id] as number : undefined}
              onAnswer={(answer) => handleAnswer(answer)}
            />
          )}

          {currentSession.type === 'rearrange-sentences' && (
            <RearrangeSentencesPractice
              data={currentSession.data as RearrangeSentenceData}
              userAnswer={typeof userAnswers[currentSession.id] === 'string' ? userAnswers[currentSession.id] as string : undefined}
              onAnswer={(answer) => handleAnswer(answer)}
            />
          )}

          {currentSession.type === 'writing' && (
            <WritingPracticeInterface
              data={currentSession.data as WritingTopicData}
              userAnswer={typeof userAnswers[currentSession.id] === 'string' ? userAnswers[currentSession.id] as string : undefined}
              onAnswer={(answer) => handleAnswer(answer)}
            />
          )}
        </div>

        {/* Fixed Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
          <div className="flex justify-between max-w-full mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext}>
              {currentIndex === sessions.length - 1 ? (
                <>
                  Complete Practice
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
