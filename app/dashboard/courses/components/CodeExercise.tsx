"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { MarkdownCompound } from '@/components/markdown-compound';

export interface CodeQuestion {
  id: string;
  question: string;
  solution: string;
  language?: string;
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
            <CardTitle className="text-lg">
              Question {questionIndex + 1}
            </CardTitle>
            <div className="mt-2 text-base">
              {question.question.split('\n').map((line, lineIndex) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;

                // Check if it's a numbered point (1., 2., etc.)
                const numberMatch = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
                if (numberMatch) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 mb-1">
                      <span className="font-medium text-blue-600 dark:text-blue-400 min-w-[1.5rem]">
                        {numberMatch[1]}.
                      </span>
                      <span>{numberMatch[2]}</span>
                    </div>
                  );
                }

                // Check if it's a bullet point (-)
                if (trimmedLine.startsWith('- ')) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 mb-1 ml-4">
                      <span className="text-gray-600 dark:text-gray-400">•</span>
                      <span>{trimmedLine.substring(2)}</span>
                    </div>
                  );
                }

                // Regular paragraph text
                return (
                  <p key={lineIndex} className="mb-2">
                    {trimmedLine}
                  </p>
                );
              })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSolution(question.id)}
                className="flex items-center gap-2 cursor-pointer"
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
            {showSolutions[question.id] && (
              <div className="border-t pt-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="p-4">
                    {/* Header with title and copy button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 font-semibold text-primary text-sm">
                          Solution
                        </span>
                      </div>
                    </div>

                    {/* Code block with syntax highlighting */}
                    <MarkdownCompound className="text-sm">
                      {`\`\`\`${question.language || 'python'}\n${question.solution}\n\`\`\``}
                    </MarkdownCompound>

                    {/* Footer hint */}
                    <div className="mt-3 text-xs text-primary font-medium">
                      💡 Click the copy button to copy the entire solution
                    </div>
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
