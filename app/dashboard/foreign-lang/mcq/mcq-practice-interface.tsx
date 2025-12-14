"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type McqQuestionData, type McqSessionData } from "../data/mcq-practice-data";

interface McqPracticeInterfaceProps {
  sessionId: string;
  data: McqQuestionData | McqSessionData;
  userAnswers?: Record<string, number>;
  onAnswer: (sessionId: string, questionId: string, answer: number) => void;
}


export function McqPracticeInterface({
  sessionId,
  data,
  userAnswers = {},
  onAnswer
}: McqPracticeInterfaceProps) {
  // Handle both McqQuestionData and McqSessionData formats
  const currentQuestion = 'question' in data ? data : (data as any).currentQuestion;

  const handleAnswerSelect = (answerIndex: string) => {
    const answer = parseInt(answerIndex);
    onAnswer(sessionId, currentQuestion.id, answer);
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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Multiple Choice Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question */}
          <div>
            <h3 className="font-semibold mb-3">{currentQuestion.question}</h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 border rounded-lg transition-colors cursor-pointer ${
                    selectedAnswer === index
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleAnswerSelect(index.toString())}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`mcq-${sessionId}`}
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index.toString())}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

