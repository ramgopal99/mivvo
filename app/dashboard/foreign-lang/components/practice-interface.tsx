"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ArrowRight, ArrowLeft, Home } from "lucide-react";
import {
  ReadingComprehensionPractice,
  RearrangeSentencesPractice,
  readingSessionsData,
  type ReadingComprehensionData,
  type RearrangeSentenceData
} from "../reading";
import {
  WritingPracticeInterface,
  writingTopicData,
  type WritingTopicData
} from "../writing";
import {
  McqPracticeInterface,
  mcqSessionsData,
  type McqSessionData
} from "../mcq";
import {
  SpeakingPracticeInterface,
  speakingSessionsData,
  type SpeakingSessionData
} from "../speaking";

interface PracticeInterfaceProps {
  sessionIds: string[];
  onComplete: (results: PracticeResult[]) => void;
  onExit: () => void;
}

interface PracticeResult {
  sessionId: string;
  userAnswer?: string | number;
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

export function PracticeInterface({ sessionIds, onComplete, onExit }: PracticeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [startTime] = useState(Date.now());

  // Create practice sessions from session IDs
  const sessions: Array<{
    id: string;
    type: 'reading-comprehension' | 'rearrange-sentences' | 'writing' | 'mcq' | 'speaking';
    data: ReadingComprehensionData | RearrangeSentenceData | WritingTopicData | McqSessionData | SpeakingSessionData;
  }> = [];

  sessionIds.forEach(id => {
    if (id.startsWith('reading-session-')) {
      // Handle combined reading sessions
      const sessionData = readingSessionsData.find(session => session.id === id);
      if (sessionData) {
        sessions.push(
          { id: `${id}-comprehension`, type: 'reading-comprehension', data: sessionData.comprehension },
          { id: `${id}-rearranging`, type: 'rearrange-sentences', data: sessionData.rearranging }
        );
      }
    } else if (id.startsWith('writing-')) {
      const data = writingTopicData.find(item => item.id === id);
      if (data) {
        sessions.push({ id, type: 'writing', data });
      }
    } else if (id.startsWith('mcq-session-')) {
      const data = mcqSessionsData.find(session => session.id === id);
      if (data) {
        sessions.push({ id, type: 'mcq', data });
      }
    } else if (id.startsWith('speaking-session-')) {
      const data = speakingSessionsData.find(session => session.id === id);
      if (data) {
        sessions.push({ id, type: 'speaking', data });
      }
    }
  });

  const currentSession = sessions[currentIndex];
  const progress = sessions.length > 0 ? ((currentIndex + 1) / sessions.length) * 100 : 0;

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

  const handleAnswer = useCallback((sessionId: string, answer: string | number) => {
    setUserAnswers(prev => ({
      ...prev,
      [sessionId]: answer
    }));
  }, []);

  const handleMcqAnswer = useCallback((sessionId: string, questionId: string, answer: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const handleNext = () => {
    if (currentIndex < sessions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Complete the practice session
      const results: PracticeResult[] = sessions.map(session => {
        const userAnswer = userAnswers[session.id];
        let isCorrect = false;

        if (session.type === 'reading-comprehension' && typeof userAnswer === 'number') {
          const correctAnswer = (session.data as ReadingComprehensionData).correctAnswer;
          isCorrect = userAnswer === correctAnswer;
        } else if (session.type === 'rearrange-sentences' && typeof userAnswer === 'string') {
          const correctAnswer = (session.data as RearrangeSentenceData).correctOrder.join(' ');
          isCorrect = userAnswer === correctAnswer;
        } else if (session.type === 'writing' && typeof userAnswer === 'string') {
          // For writing, consider it completed if they wrote something
          isCorrect = userAnswer.trim().length > 10;
        }

        return {
          sessionId: session.id,
          userAnswer,
          isCorrect,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
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

  // Check if data is loaded
  if (readingSessionsData.length === 0 || writingTopicData.length === 0 || mcqSessionsData.length === 0 || speakingSessionsData.length === 0) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-red-500">Error: Practice data not loaded</p>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Data Status:</p>
            <p>Reading Sessions: {readingSessionsData.length} items</p>
            <p>Writing: {writingTopicData.length} items</p>
            <p>MCQ Sessions: {mcqSessionsData.length} items</p>
            <p>Speaking Sessions: {speakingSessionsData.length} items</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading practice session...</p>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Debug Info:</p>
            <p>SessionIds: {JSON.stringify(sessionIds)}</p>
            <p>Sessions length: {sessions.length}</p>
            <p>CurrentIndex: {currentIndex}</p>
            <p>Data loaded: ✓</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10 w-full">
        <div className="px-4 py-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onExit} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Exit Practice
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentSession.type === 'reading-comprehension' ? 'Reading' :
                 currentSession.type === 'rearrange-sentences' ? 'Reading' :
                 currentSession.type === 'writing' ? 'Writing' : 'MCQ'}
              </Badge>
              <Badge variant="outline">Question {currentIndex + 1} of {sessions.length}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className={timeRemaining < 60 ? 'text-red-500 font-bold' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full px-4">
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Practice Content Area */}
        <div className="flex-1 overflow-y-auto p-8 pb-20">
          {currentSession.type === 'reading-comprehension' && (
            <ReadingComprehensionPractice
              sessionId={currentSession.id}
              data={currentSession.data as ReadingComprehensionData}
              userAnswer={typeof userAnswers[currentSession.id] === 'number' ? userAnswers[currentSession.id] as number : undefined}
              onAnswer={handleAnswer}
            />
          )}

          {currentSession.type === 'rearrange-sentences' && (
            <RearrangeSentencesPractice
              sessionId={currentSession.id}
              data={currentSession.data as RearrangeSentenceData}
              userAnswer={typeof userAnswers[currentSession.id] === 'string' ? userAnswers[currentSession.id] as string : undefined}
              onAnswer={handleAnswer}
            />
          )}

          {currentSession.type === 'writing' && (
            <WritingPracticeInterface
              sessionId={currentSession.id}
              data={currentSession.data as WritingTopicData}
              userAnswer={typeof userAnswers[currentSession.id] === 'string' ? userAnswers[currentSession.id] as string : undefined}
              onAnswer={handleAnswer}
            />
          )}

          {currentSession.type === 'mcq' && (
            <McqPracticeInterface
              sessionId={currentSession.id}
              data={currentSession.data as McqSessionData}
              userAnswers={userAnswers as Record<string, number>}
              onAnswer={handleMcqAnswer}
              onComplete={(sessionId, results) => {
                console.log("MCQ completed with results:", results);
                // Mark as completed and move to next
                handleNext();
              }}
            />
          )}

          {currentSession.type === 'speaking' && (
            <SpeakingPracticeInterface
              sessionId={currentSession.id}
              data={currentSession.data as SpeakingSessionData}
              userAnswers={userAnswers as Record<string, string>}
              onAnswer={handleAnswer}
              onComplete={(sessionId, results) => {
                console.log("Speaking completed with results:", results);
                // Mark as completed and move to next
                handleNext();
              }}
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