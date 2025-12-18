"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const PracticeTab = () => {
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [currentProblem, setCurrentProblem] = useState<{
    question: string;
    answer: string;
    solution: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProblem = async () => {
    setIsGenerating(true);

    try {
      // For now, using predefined problems. Later this can be enhanced with AI-generated problems
      const problems = {
        easy: [
          { question: 'What is 15 + 27?', answer: '42', solution: '15 + 27 = 42' },
          { question: 'What is 48 - 13?', answer: '35', solution: '48 - 13 = 35' },
          { question: 'What is 7 × 8?', answer: '56', solution: '7 × 8 = 56' },
          { question: 'What is 64 ÷ 8?', answer: '8', solution: '64 ÷ 8 = 8' }
        ],
        medium: [
          { question: 'What is 25% of 200?', answer: '50', solution: '(25/100) × 200 = 0.25 × 200 = 50' },
          { question: 'Solve: 2x + 5 = 15', answer: 'x = 5', solution: '2x + 5 = 15 → 2x = 10 → x = 5' },
          { question: 'What is the area of a square with side 12?', answer: '144', solution: 'Area = side² = 12² = 144' },
          { question: 'Find LCM of 12 and 18', answer: '36', solution: '12 = 2² × 3, 18 = 2 × 3², LCM = 2² × 3² = 36' },
          { question: 'Calculate simple interest: P=₹2000, R=6%, T=3 years', answer: '₹360', solution: 'SI = (2000 × 6 × 3) / 100 = ₹360' },
          { question: 'Find the mean of 12, 15, 18, 21, 24', answer: '18', solution: 'Mean = (12+15+18+21+24)/5 = 90/5 = 18' }
        ],
        hard: [
          { question: 'Solve quadratic: x² - 5x + 6 = 0', answer: 'x = 2, 3', solution: 'Using quadratic formula: x = [5 ± √(25-24)]/2 = [5 ± 1]/2 → x = 3, 2' },
          { question: 'Find compound interest: P=₹1000, r=5%, t=2 years', answer: '₹1102.50', solution: 'A = 1000(1 + 0.05/1)^(1×2) = 1000 × 1.05² = 1000 × 1.1025 = ₹1102.50' },
          { question: 'Volume of sphere with radius 7 cm?', answer: '1436.76 cm³', solution: 'Volume = (4/3)πr³ = (4/3) × 3.14 × 343 ≈ 1436.76 cm³' },
          { question: 'Probability of rolling a 6 on a fair die?', answer: '1/6', solution: 'Total outcomes = 6, favorable outcomes = 1, Probability = 1/6' },
          { question: 'Find the area of triangle with base 15cm and height 8cm', answer: '60 cm²', solution: 'Area = (1/2) × base × height = (1/2) × 15 × 8 = 60 cm²' },
          { question: 'Solve the proportion: 3:5 = x:20', answer: 'x = 12', solution: '3/5 = x/20 → 3 × 20 = 5 × x → 60 = 5x → x = 12' }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const selectedProblems = problems[difficulty as keyof typeof problems];
      const randomProblem = selectedProblems[Math.floor(Math.random() * selectedProblems.length)];

      setCurrentProblem(randomProblem);
      setUserAnswer('');
      setShowSolution(false);
      setFeedback('');
    } catch (error) {
      console.error('Error generating problem:', error);
      setFeedback('Error generating problem. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const checkAnswer = () => {
    if (!currentProblem) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. The answer is: ${currentProblem.answer}`);
    setShowSolution(true);
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-hidden">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Practice Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">Generate practice problems to improve your skills</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Difficulty Selector */}
          <div className="flex gap-2 justify-center">
            {['easy', 'medium', 'hard'].map(level => (
              <Badge
                key={level}
                variant={difficulty === level ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors px-4 py-2 text-sm font-medium"
                onClick={() => setDifficulty(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Badge>
            ))}
          </div>

          {/* Generate Problem Button */}
          <Button
            onClick={generateProblem}
            disabled={isGenerating}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Generate New Problem
              </>
            )}
          </Button>

          {/* Problem Display */}
          {currentProblem && (
            <div className="space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Problem:</h4>
                  <p className="text-lg leading-relaxed">{currentProblem.question}</p>
                </CardContent>
              </Card>

              {/* Answer Input */}
              <div className="space-y-3">
                <Input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  disabled={showSolution}
                  className="text-lg"
                />

                {!showSolution ? (
                  <Button
                    onClick={checkAnswer}
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSolution(false)}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
              </div>

              {/* Feedback */}
              {feedback && (
                <Card className={`border-l-4 ${
                  feedback.startsWith('✅')
                    ? 'border-l-green-500 bg-green-50'
                    : 'border-l-red-500 bg-red-50'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {feedback.startsWith('✅') ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <p className={`font-medium ${
                        feedback.startsWith('✅') ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Solution */}
              {showSolution && currentProblem?.solution && (
                <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Solution:
                    </h4>
                    <p className="text-blue-700 leading-relaxed">{currentProblem.solution}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeTab;