"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, ArrowLeft, User } from "lucide-react";
import {
  ReadingComprehensionPractice,
  RearrangeSentencesPractice,
  readingSessionsData,
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
  mcqSessionsData,
  type McqSessionData
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
  userAnswer?: string | number;
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
  category: string;
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

  // Create practice sessions from session IDs
  const sessions = useMemo(() => {
    const sessionArray: Array<{
      id: string;
      type: 'reading-comprehension' | 'rearrange-sentences' | 'writing' | 'mcq' | 'speaking' | 'chat';
      data: ReadingComprehensionData | RearrangeSentenceData | WritingTopicData | McqSessionData | SpeakingSessionData | McqQuestionSession | SpeakingQuestionSessionData | WritingSessionData | ChatScenario;
    }> = [];

    sessionIds.forEach(id => {
      if (id.startsWith('reading-session-')) {
        // Parse language from session ID (e.g., "reading-session-english-1" -> "english")
        const language = id.includes('french') ? 'french' : 'english';
        const sessionData = readingSessionsData[language]?.find(session => session.id === id);
        if (sessionData) {
          sessionArray.push(
            { id: `${id}-comprehension`, type: 'reading-comprehension', data: sessionData.comprehension },
            { id: `${id}-rearranging`, type: 'rearrange-sentences', data: sessionData.rearranging }
          );
        }
      } else if (id.startsWith('writing-session-')) {
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

    return sessionArray;
  }, [sessionIds]);

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
      setQuestionStatus(prev => ({
        ...prev,
        [currentIndex]: userAnswers[session?.id] !== undefined ? 'answered' : 'not-answered'
      }));
    } else {
      // Mark for review - add to marked set and clear any answer
      setMarkedQuestions(prev => new Set([...prev, currentIndex]));
      setQuestionStatus(prev => ({ ...prev, [currentIndex]: 'marked' }));

      // Clear the answer for this question
      if (session) {
        setUserAnswers(prev => {
          const newAnswers = { ...prev };

          if (session.type === 'mcq') {
            // For MCQ, clear the answer using questionId
            const mcqData = session.data as McqQuestionSession;
            if (mcqData.currentQuestion) {
              delete newAnswers[mcqData.currentQuestion.id];
            }
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

        if (session.type === 'mcq') {
          // For MCQ, clear the current question's answer
          const mcqData = session.data as McqQuestionSession;
          if (mcqData.currentQuestion) {
            delete newAnswers[mcqData.currentQuestion.id];
          }
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
      const userAnswer = userAnswers[session.id];
      let isCorrect = false;

      if (session.type === 'reading-comprehension' && typeof userAnswer === 'number') {
        const correctAnswer = (session.data as ReadingComprehensionData).correctAnswer;
        isCorrect = userAnswer === correctAnswer;
      } else if (session.type === 'rearrange-sentences' && typeof userAnswer === 'string') {
        const correctAnswer = (session.data as RearrangeSentenceData).correctOrder.join(' ');
        isCorrect = userAnswer === correctAnswer;
      } else if (session.type === 'writing' && typeof userAnswer === 'string') {
        isCorrect = userAnswer.trim().length > 10;
      } else if (session.type === 'chat') {
        // Chat sessions are always considered completed (no right/wrong answers)
        isCorrect = true;
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

  // Check if reading data is loaded only when reading sessions are present
  const hasReadingSessions = sessionIds.some(id => id.startsWith('reading-session-'));

  if (hasReadingSessions && (
    (!readingSessionsData.english || readingSessionsData.english.length === 0) ||
    (!readingSessionsData.french || readingSessionsData.french.length === 0)
  )) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading practice session...</p>
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
          <Button
            size="sm"
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            Submit Test
          </Button>
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
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
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

                {currentSession.type === 'mcq' && (
                  <McqPracticeInterface
                    sessionId={currentSession.id}
                    data={currentSession.data as McqQuestionSession}
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