"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { type McqSessionData, type McqQuestionData } from "../data/mcq-practice-data";

interface McqPracticeInterfaceProps {
  sessionId: string;
  data: McqSessionData;
  userAnswers?: Record<string, number>;
  onAnswer: (sessionId: string, questionId: string, answer: number) => void;
  onComplete: (sessionId: string, results: McqResult[]) => void;
}

interface McqResult {
  questionId: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export function McqPracticeInterface({
  sessionId,
  data,
  userAnswers = {},
  onAnswer,
  onComplete
}: McqPracticeInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(data.timeLimit * 60); // Convert to seconds
  const [startTime] = useState(Date.now());
  const [questionStartTime] = useState(Date.now());

  const currentQuestion = data.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / data.questions.length) * 100;

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

  const handleAnswerSelect = (answerIndex: string) => {
    const answer = parseInt(answerIndex);
    onAnswer(sessionId, currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Complete the MCQ session
      const results: McqResult[] = data.questions.map(question => {
        const userAnswer = userAnswers[question.id];
        return {
          questionId: question.id,
          userAnswer: userAnswer ?? -1,
          correctAnswer: question.correctAnswer,
          isCorrect: userAnswer === question.correctAnswer,
          timeSpent: Math.floor((Date.now() - startTime) / 1000)
        };
      });

      onComplete(sessionId, results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    );
  }

  const selectedAnswer = userAnswers[currentQuestion.id];

  return (
    <div className="space-y-6">
      {/* Header with progress and timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {data.questions.length}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {currentQuestion.category.replace('-', ' ')}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span className={timeRemaining < 300 ? 'text-red-500 font-bold' : ''}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="w-full" />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
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

          {/* Show explanation if answer is selected */}
          {selectedAnswer !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">{currentQuestion.explanation}</p>
              {selectedAnswer !== currentQuestion.correctAnswer && (
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                  <strong>Correct answer:</strong> {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button onClick={handleNext}>
          {currentQuestionIndex === data.questions.length - 1 ? (
            <>
              Complete MCQ
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
  );
}

