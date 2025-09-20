"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export interface CodeQuestion {
  id: string;
  question: string;
  solution: string;
}

export interface CodeExerciseProps {
  title: string;
  description?: string;
  questions: CodeQuestion[];
}

const CodeExercise: React.FC<CodeExerciseProps> = ({
  title,
  description,
  questions
}) => {
  const [showSolutions, setShowSolutions] = useState<{ [questionId: string]: boolean }>({});
  const [copiedSolutions, setCopiedSolutions] = useState<{ [questionId: string]: boolean }>({});

  const toggleSolution = (questionId: string) => {
    setShowSolutions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const copyToClipboard = async (text: string, questionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSolutions(prev => ({
        ...prev,
        [questionId]: true
      }));
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedSolutions(prev => ({
          ...prev,
          [questionId]: false
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {questions.length} questions
        </div>
      </div>

      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}

      {questions.map((question, questionIndex) => (
        <Card key={question.id} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex-1">
                Question {questionIndex + 1}: {question.question}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSolution(question.id)}
                className="flex items-center gap-2"
              >
                {showSolutions[question.id] ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show Solution
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showSolutions[question.id] && (
              <div className="border-t pt-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-green-800 dark:text-green-300">
                        Solution:
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(question.solution, question.id)}
                        className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                      >
                        {copiedSolutions[question.id] ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    <pre className="text-sm font-mono whitespace-pre-wrap bg-white dark:bg-gray-800 p-3 rounded border text-green-700 dark:text-green-400">
                      {question.solution}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CodeExercise;
