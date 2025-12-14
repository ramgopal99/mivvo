"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, ArrowLeft, User } from "lucide-react";
import {
  ReadingComprehensionPractice,
  RearrangeSentencesPractice,
  type ReadingComprehensionData,
  type RearrangeSentenceData
} from "../reading";
import {
  WritingPracticeInterface,
  AIChatPractice,
  writingTopicData,
  writingSessionsData,
  chatScenarios,
  type WritingTopicData,
  type WritingSessionData,
  type ChatScenario
} from "../writing";
import {
  McqPracticeInterface,
  mcqSessionsData
} from "../mcq";
import {
  SpeakingPracticeInterface,
  speakingSessionsData,
  speakingQuestionSessions,
  type SpeakingSessionData,
  type SpeakingQuestionSessionData
} from "../speaking";

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

type QuestionStatus = 'answered' | 'not-answered' | 'marked' | 'not-visited';

interface McqQuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'error-detection' | 'synonyms-antonyms' | 'sentence-completion' | 'word-replacement';
}

interface McqQuestionSession {
  id: string;
  title: string;
  timeLimit: number;
  questions: McqQuestionData[];
  currentQuestion: McqQuestionData;
  questionIndex: number;
  totalQuestions: number;
}



export function PracticeInterface({ sessionIds, onComplete, onExit }: PracticeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>({});
  const { data: session } = useSession();
  const [userName, setUserName] = useState<string>("User");
  const [startTime] = useState(Date.now());
  const [sessionData, setSessionData] = useState<{
    questions?: Array<{
      type: string;
      data: {
        id: string;
        passage?: string;
        question?: string;
        options?: string[];
        correctAnswer?: number;
        explanation?: string;
        scrambledWords?: string[];
        correctOrder?: string[];
      };
    }>;
  } | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('student_token') ||
                     localStorage.getItem('college_token');
        if (token) {
          const response = await fetch('/api/auth/session', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const sessionData = await response.json();
            if (sessionData.authenticated && sessionData.user) {
              setUserName(sessionData.user.name || sessionData.user.email || "User");
              return;
            }
          }
        }
        // Fallback to NextAuth session
        if (session?.user) {
          setUserName(session.user.name || session.user.email || "User");
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, [session]);

  // Load session data from API
  useEffect(() => {
    const loadSessionData = async () => {
      if (sessionIds.length === 0) return;

      try {
        setLoadingSession(true);
        // For now, assume the first session ID is the reading session ID
        const sessionId = sessionIds[0];

        if (sessionId.startsWith('reading-session-')) {
          const response = await fetch(`/api/foreign-language/reading/sessions/${sessionId}`);
          const result = await response.json();

          if (result.success) {
            setSessionData(result.data);
          }
        } else         if (sessionId.startsWith('mcq-session-')) {
          const response = await fetch(`/api/foreign-language/mcq/sessions/${sessionId}`);
          const result = await response.json();

          if (result.success) {
            setSessionData(result.data);
          }
        }
      } catch (error) {
        console.error('Error loading session data:', error);
      } finally {
        setLoadingSession(false);
      }
    };

    loadSessionData();
  }, [sessionIds]);

  // Create practice sessions from session IDs
  const sessions = useMemo(() => {
    const sessionArray: Array<{
      id: string;
      type: 'reading-comprehension' | 'rearrange-sentences' | 'writing' | 'mcq' | 'grammar-mcq' | 'error-detection' | 'synonyms-antonyms' | 'sentence-completion' | 'word-replacement' | 'speaking' | 'chat';
      data: ReadingComprehensionData | RearrangeSentenceData | WritingTopicData | McqQuestionData | SpeakingSessionData | McqQuestionSession | SpeakingQuestionSessionData | WritingSessionData | ChatScenario;
    }> = [];

    if (sessionData && sessionIds.length > 0) {
      const sessionId = sessionIds[0];

      if (sessionId.startsWith('reading-session-') && sessionData.questions) {
        // Handle API-generated reading sessions
        sessionData.questions.forEach((question, index: number) => {
          if (question.type === 'comprehension' && question.data) {
            const data = question.data;
            if (data.passage && data.question && data.options && data.correctAnswer !== undefined && data.explanation) {
              sessionArray.push({
                id: `${sessionId}-comprehension-${index}`,
                type: 'reading-comprehension',
                data: {
                  id: data.id,
                  passage: data.passage,
                  question: data.question,
                  options: data.options,
                  correctAnswer: data.correctAnswer,
                  explanation: data.explanation
                }
              });
            }
          } else if (question.type === 'rearrange' && question.data) {
            const data = question.data;
            if (data.scrambledWords && data.correctOrder && data.explanation) {
              sessionArray.push({
                id: `${sessionId}-rearrange-${index}`,
                type: 'rearrange-sentences',
                data: {
                  id: data.id,
                  scrambledSentence: data.scrambledWords,
                  correctOrder: data.correctOrder,
                  explanation: data.explanation
                }
              });
            }
          }
        });
      } else if (sessionId.startsWith('mcq-session-') && sessionData.questions) {
        // Handle API-generated MCQ sessions
        const allQuestions = sessionData.questions
          .filter(q => q.type === 'mcq' && q.data)
          .map(q => q.data);

        allQuestions.forEach((questionData, index) => {
          if (questionData.question && questionData.options && questionData.correctAnswer !== undefined && questionData.explanation) {
            const category = ((questionData as { category?: string }).category || 'grammar').toLowerCase();
            let questionType: 'grammar-mcq' | 'error-detection' | 'synonyms-antonyms' | 'sentence-completion' | 'word-replacement' = 'grammar-mcq';

            // Map category to specific MCQ type (matching config)
            switch (category) {
              case 'grammar':
                questionType = 'grammar-mcq';
                break;
              case 'error-detection':
              case 'error_detection':
                questionType = 'error-detection';
                break;
              case 'synonyms-antonyms':
              case 'synonyms_antonyms':
                questionType = 'synonyms-antonyms';
                break;
              case 'sentence-completion':
              case 'sentence_completion':
                questionType = 'sentence-completion';
                break;
              case 'word-replacement':
              case 'word_replacement':
                questionType = 'word-replacement';
                break;
              default:
                questionType = 'grammar-mcq';
            }

            sessionArray.push({
              id: `${sessionId}-mcq-${index}`,
              type: questionType,
              data: {
                id: questionData.id,
                question: questionData.question,
                options: questionData.options,
                correctAnswer: questionData.correctAnswer,
                explanation: questionData.explanation,
                category: category as 'grammar' | 'error-detection' | 'synonyms-antonyms' | 'sentence-completion' | 'word-replacement'
              }
            });
          }
        });
      }
    } else {
      // Fallback to dummy data for other session types
      sessionIds.forEach(id => {
        if (id.startsWith('writing-session-')) {
        // Parse language from session ID (e.g., "writing-session-french-1" -> "french")
        const language = id.includes('french') ? 'french' : 'english';
        const sessionData = writingSessionsData[language]?.find(session => session.id === id);
        if (sessionData) {
          // Create individual sessions for each writing topic
          sessionData.topics.forEach((topic, index) => {
            sessionArray.push({
              id: `${id}-topic-${index}`,
              type: 'writing',
              data: topic
            });
          });

          // Create individual sessions for each chat scenario
          sessionData.chatScenarios.forEach((scenario, index) => {
            sessionArray.push({
              id: `${id}-chat-${index}`,
              type: 'chat',
              data: scenario
            });
          });
        }
      } else if (id.startsWith('writing-') && !id.includes('session')) {
        // Handle individual writing topics (backward compatibility)
        // Search through both English and French topic data
        const data = writingTopicData.english?.find(item => item.id === id) ||
                    writingTopicData.french?.find(item => item.id === id);
        if (data) {
          sessionArray.push({ id, type: 'writing', data });
        }
      } else if (id.startsWith('chat-')) {
        // Handle AI chat scenarios
        // Search through both English and French chat scenarios
        const scenario = chatScenarios.english?.find(item => `chat-${item.id}` === id) ||
                        chatScenarios.french?.find(item => `chat-${item.id}` === id);
        if (scenario) {
          sessionArray.push({ id, type: 'chat', data: scenario });
        }
      } else if (id.startsWith('mcq-session-')) {
        // Parse language from session ID
        const language = id.includes('french') ? 'french' : 'english';
        const data = mcqSessionsData[language]?.find(session => session.id === id);
        if (data) {
          // Create individual sessions for each MCQ question
          data.questions.forEach((question, index) => {
            sessionArray.push({
              id: `${id}-question-${index}`,
              type: 'mcq',
              data: { ...data, currentQuestion: question, questionIndex: index, totalQuestions: data.questions.length }
            });
          });
        }
      } else if (id.startsWith('speaking-session-')) {
        // Parse language from session ID
        const language = id.includes('french') ? 'french' : 'english';
        const sessionData = speakingSessionsData[language]?.find(session => session.id === id);
        if (sessionData) {
          // Create individual sessions for each speaking question
          sessionData.questions.forEach((question, index) => {
            sessionArray.push({
              id: `${id}-question-${index}`,
              type: 'speaking',
              data: {
                id: `${id}-question-${index}`,
                title: `${question.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} - Question ${index + 1}`,
                question,
                timeLimit: sessionData.timeLimit
              } as SpeakingQuestionSessionData
            });
          });
        }
      } else if (id.startsWith('speaking-question-')) {
        // Handle individual speaking questions
        // Search through both English and French question sessions
        const questionSession = speakingQuestionSessions.english?.find(session => session.id === id) ||
                               speakingQuestionSessions.french?.find(session => session.id === id);
        if (questionSession) {
          sessionArray.push({ id, type: 'speaking', data: questionSession });
        }
      }
    });
    }

    return sessionArray;
  }, [sessionIds, sessionData]);

  // Initialize question status
  useEffect(() => {
    const initialStatus: Record<number, QuestionStatus> = {};
    sessions.forEach((_, index) => {
      initialStatus[index] = 'not-visited';
    });
    initialStatus[0] = 'not-answered';
    setQuestionStatus(initialStatus);
  }, [sessions]);


  const currentSession = sessions[currentIndex];

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

    // If question was marked for review, unmark it
    setMarkedQuestions(prev => {
      if (prev.has(currentIndex)) {
        const newSet = new Set(prev);
        newSet.delete(currentIndex);
        return newSet;
      }
      return prev;
    });

    // Always set status to 'answered' when an answer is provided
    setQuestionStatus(prev => ({ ...prev, [currentIndex]: 'answered' }));
  }, [currentIndex]);

  const handleMcqAnswer = useCallback((sessionId: string, questionId: string, answer: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Update question status to 'answered' when MCQ question is answered
    setQuestionStatus(prev => ({ ...prev, [currentIndex]: 'answered' }));

    // If question was marked for review, unmark it
    setMarkedQuestions(prev => {
      if (prev.has(currentIndex)) {
        const newSet = new Set(prev);
        newSet.delete(currentIndex);
        return newSet;
      }
      return prev;
    });
  }, [currentIndex]);

  const handleQuestionClick = (index: number) => {
    setCurrentIndex(index);
    if (questionStatus[index] === 'not-visited') {
      setQuestionStatus(prev => ({ ...prev, [index]: 'not-answered' }));
    }
  };

  const handleMarkForReview = () => {
    const session = sessions[currentIndex];
    const isCurrentlyMarked = markedQuestions.has(currentIndex);

    if (isCurrentlyMarked) {
      // Unmark the question - remove from marked set and restore previous status
      setMarkedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentIndex);
        return newSet;
      });
      // Restore to answered status if it had an answer, otherwise not-answered
      setQuestionStatus(prev => {
        let hasAnswer = false;
        if (session) {
          if (session.type === 'mcq' || session.type === 'grammar-mcq' || session.type === 'error-detection' || session.type === 'synonyms-antonyms' || session.type === 'sentence-completion' || session.type === 'word-replacement') {
            const mcqData = session.data as McqQuestionData;
            hasAnswer = userAnswers[mcqData.id] !== undefined;
          } else {
            hasAnswer = userAnswers[session.id] !== undefined;
          }
        }
        return {
          ...prev,
          [currentIndex]: hasAnswer ? 'answered' : 'not-answered'
        };
      });
    } else {
      // Mark for review - add to marked set and clear any answer
      setMarkedQuestions(prev => new Set([...prev, currentIndex]));
      setQuestionStatus(prev => ({ ...prev, [currentIndex]: 'marked' }));

      // Clear the answer for this question
      if (session) {
        setUserAnswers(prev => {
          const newAnswers = { ...prev };

          if (session.type === 'mcq' || session.type === 'grammar-mcq' || session.type === 'error-detection' || session.type === 'synonyms-antonyms' || session.type === 'sentence-completion' || session.type === 'word-replacement') {
            // For MCQ, clear by question ID
            const mcqData = session.data as McqQuestionData;
            delete newAnswers[mcqData.id];
          } else {
            // For other types, clear by session ID
            delete newAnswers[session.id];
          }

          return newAnswers;
        });
      }
    }
  };

  const handleClearResponse = () => {
    const session = sessions[currentIndex];
    if (session) {
      setUserAnswers(prev => {
        const newAnswers = { ...prev };

        if (session.type === 'mcq' || session.type === 'grammar-mcq' || session.type === 'error-detection' || session.type === 'synonyms-antonyms' || session.type === 'sentence-completion' || session.type === 'word-replacement') {
          // For MCQ, clear by question ID
          const mcqData = session.data as McqQuestionData;
          delete newAnswers[mcqData.id];
        } else {
          // For other types, clear by session ID
          delete newAnswers[session.id];
        }

        return newAnswers;
      });
      setQuestionStatus(prev => ({ ...prev, [currentIndex]: 'not-answered' }));
    }
  };

  const handleNext = () => {
    if (currentIndex < sessions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (questionStatus[currentIndex + 1] === 'not-visited') {
        setQuestionStatus(prev => ({ ...prev, [currentIndex + 1]: 'not-answered' }));
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleComplete = () => {
    const results: PracticeResult[] = sessions.map(session => {
      // For MCQ questions, answers are stored with question ID as key
      // For other types, answers are stored with session ID as key
      const answerKey = (session.type === 'mcq' || session.type === 'grammar-mcq' || session.type === 'error-detection' ||
                        session.type === 'synonyms-antonyms' || session.type === 'sentence-completion' ||
                        session.type === 'word-replacement')
        ? (session.data as { id: string }).id  // Use question ID for MCQ
        : session.id; // Use session ID for others

      const userAnswer = userAnswers[answerKey];
      let isCorrect = false;

      if (session.type === 'reading-comprehension' && typeof userAnswer === 'number') {
        const correctAnswer = (session.data as ReadingComprehensionData).correctAnswer;
        isCorrect = userAnswer === correctAnswer;
      } else if (session.type === 'rearrange-sentences' && typeof userAnswer === 'string') {
        const correctAnswer = (session.data as RearrangeSentenceData).correctOrder.join(' ');
        isCorrect = userAnswer === correctAnswer;
      } else if (session.type === 'mcq' || session.type === 'grammar-mcq' || session.type === 'error-detection' || session.type === 'synonyms-antonyms' || session.type === 'sentence-completion' || session.type === 'word-replacement') {
        const correctAnswer = (session.data as McqQuestionData).correctAnswer;
        isCorrect = userAnswer === correctAnswer;
      } else if (session.type === 'writing' && typeof userAnswer === 'string') {
        isCorrect = userAnswer.trim().length > 10;
      } else if (session.type === 'chat') {
        // Chat sessions are always considered completed (no right/wrong answers)
        isCorrect = true;
      }

      return {
        sessionId: (session.data as { id: string }).id, // Use the actual database question/task ID
        userAnswer,
        isCorrect,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        completedAt: new Date()
      };
    });

    onComplete(results);
  };

  // Calculate status counts
  const statusCounts = {
    answered: Object.values(questionStatus).filter(s => s === 'answered').length,
    notAnswered: Object.values(questionStatus).filter(s => s === 'not-answered').length,
    marked: Object.values(questionStatus).filter(s => s === 'marked').length,
    notVisited: Object.values(questionStatus).filter(s => s === 'not-visited').length,
  };

  const getQuestionStatusColor = (index: number) => {
    const status = questionStatus[index] || 'not-visited';
    if (index === currentIndex) {
      return 'bg-red-500 text-white border-red-600';
    }
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white border-green-600';
      case 'not-answered':
        return 'bg-red-500 text-white border-red-600';
      case 'marked':
        return 'bg-yellow-500 text-white border-yellow-600';
      default:
        return 'bg-gray-300 text-gray-700 border-gray-400';
    }
  };

  // Check if data is loading
  const hasReadingSessions = sessionIds.some(id => id.startsWith('reading-session-'));

  if (loadingSession && hasReadingSessions) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized practice session...</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-background border-b px-6 py-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Foreign Language Practice</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Time Left: {formatTime(timeRemaining)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onExit}
              className="cursor-pointer"
            >
              Exit
            </Button>
            <Button
              size="sm"
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Question Content */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {/* Sticky Question Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 z-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Question No {currentIndex + 1}</h2>
            {currentSession?.type !== 'writing' && currentSession?.type !== 'speaking' && currentSession?.type !== 'chat' && (
              <Button variant="outline" size="sm" onClick={handleClearResponse} className="cursor-pointer">
                Clear Response
              </Button>
            )}
          </div>
          
          {/* Scrollable Question Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
            <div className="h-full">
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

                {currentSession.type === 'chat' && (
                  <AIChatPractice
                    scenario={currentSession.data as ChatScenario}
                  />
                )}

                {(currentSession.type === 'mcq' || currentSession.type === 'grammar-mcq' || currentSession.type === 'error-detection' || currentSession.type === 'synonyms-antonyms' || currentSession.type === 'sentence-completion' || currentSession.type === 'word-replacement') && (
                  <McqPracticeInterface
                    sessionId={currentSession.id}
                    data={currentSession.data as McqQuestionData}
                    userAnswers={userAnswers as Record<string, number>}
                    onAnswer={handleMcqAnswer}
                  />
                )}

                {currentSession.type === 'speaking' && (
                  <SpeakingPracticeInterface
                    sessionId={currentSession.id}
                    data={currentSession.data as SpeakingQuestionSessionData}
                    userAnswers={userAnswers as Record<string, string>}
                    onAnswer={handleAnswer}
                    onComplete={(sessionId, results) => {
                      console.log("Speaking completed with results:", results);
                      handleNext();
                    }}
                  />
                )}
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentIndex < sessions.length - 1 && (
              <Button onClick={handleNext} className="cursor-pointer">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Panel - Question Palette */}
        <div className="w-80 bg-gray-50 border-l overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* User Name */}
            <div className="flex items-center gap-2 pb-4 border-b">
              <User className="h-5 w-5" />
              <span className="font-medium">{userName}</span>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm mb-3">Legend</h3>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>{statusCounts.answered} Answered</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>{statusCounts.notAnswered} Not Answered</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>{statusCounts.marked} Marked</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span>{statusCounts.notVisited} Not Visited</span>
              </div>
            </div>

            {/* Question Palette */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {sessions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(index)}
                    className={`w-10 h-10 rounded border-2 font-semibold text-sm transition-all hover:scale-110 cursor-pointer ${getQuestionStatusColor(index)}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full cursor-pointer" onClick={handleMarkForReview}>
                {markedQuestions.has(currentIndex) ? 'Unmark for Review' : 'Mark for Review & Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}