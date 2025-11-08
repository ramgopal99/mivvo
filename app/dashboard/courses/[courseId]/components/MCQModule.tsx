"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface MCQModuleProps {
  questions: MCQQuestion[];
  title?: string;
}

const MCQModule: React.FC<MCQModuleProps> = ({ questions, title = "MCQ Quiz" }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number | null }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const score = getScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {submitted && (
          <div className="text-lg font-semibold">
            Score: {score.correct}/{score.total}
          </div>
        )}
      </div>

      {questions.map((question, questionIndex) => (
        <Card key={question.id} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {questionIndex + 1}: {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[question.id] === optionIndex;
                const isCorrect = optionIndex === question.correctAnswer;

                let buttonVariant: "default" | "secondary" | "destructive" | "outline" = "outline";
                if (submitted) {
                  if (isCorrect) {
                    buttonVariant = "default";
                  } else if (isSelected && !isCorrect) {
                    buttonVariant = "destructive";
                  }
                } else if (isSelected) {
                  buttonVariant = "secondary";
                }

                return (
                  <Button
                    key={optionIndex}
                    variant={buttonVariant}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      submitted && isCorrect
                        ? 'bg-green-500 border-green-600 text-white dark:bg-green-600 dark:border-green-700'
                        : submitted && isSelected && !isCorrect
                        ? 'bg-red-500 border-red-600 text-white dark:bg-red-600 dark:border-red-700'
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    disabled={submitted}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        submitted && isCorrect
                          ? 'border-green-300 bg-green-200 text-green-900 dark:border-green-400 dark:bg-green-300 dark:text-green-900'
                          : submitted && isSelected && !isCorrect
                          ? 'border-red-300 bg-red-200 text-red-900 dark:border-red-400 dark:bg-red-300 dark:text-red-900'
                          : isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + optionIndex)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {submitted && (
              <div className="border-t pt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <div className="font-semibold">
                      Correct Answer: {String.fromCharCode(65 + question.correctAnswer)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {question.options[question.correctAnswer]}
                    </div>
                    {question.explanation && (
                      <div className="text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-4 justify-center">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            className="px-8"
          >
            Submit Answers
          </Button>
        ) : (
          <Button onClick={resetQuiz} variant="outline" className="px-8">
            Retake Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default MCQModule;
