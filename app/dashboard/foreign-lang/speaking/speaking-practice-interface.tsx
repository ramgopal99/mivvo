"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { type SpeakingSessionData, type SpeakingQuestionData } from "../data/speaking-practice-data";

interface SpeakingPracticeInterfaceProps {
  sessionId: string;
  data: SpeakingSessionData;
  userAnswers?: Record<string, string>;
  onAnswer: (sessionId: string, questionId: string, answer: string) => void;
  onComplete: (sessionId: string, results: SpeakingResult[]) => void;
}

interface SpeakingResult {
  questionId: string;
  userAnswer: string;
  questionText: string;
  duration: number;
  wordCount: number;
}

// Web Speech API Type Definitions
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export function SpeakingPracticeInterface({
  sessionId,
  data,
  userAnswers = {},
  onAnswer,
  onComplete
}: SpeakingPracticeInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [questionStartTime] = useState(Date.now());
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string>("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = data.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / data.questions.length) * 100;
  const currentAnswer = userAnswers[currentQuestion.id] || "";
  const hasAnswered = currentAnswer.trim().length > 0;

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      speechSynthesisRef.current = window.speechSynthesis;

      const recognition = recognitionRef.current;
      if (!recognition) return;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError("");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = '';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // If we have a transcript, save it as the answer
        if (transcript.trim()) {
          const finalAnswer = transcript.trim();
          onAnswer(sessionId, currentQuestion.id, finalAnswer);
          setTranscript("");
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      if (questionTimerRef.current) {
        clearTimeout(questionTimerRef.current);
      }
    };
  }, []);

  // Speak the current question
  const speakQuestion = useCallback(async () => {
    if (!speechSynthesisRef.current || !currentQuestion) return;

    setIsSpeaking(true);
    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechSynthesisRef.current.speak(utterance);
  }, [currentQuestion]);

  // Start listening for answer
  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening) return;

    try {
      setError("");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Microphone access is required for speech recognition.');
    }
  }, [isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTranscript("");
    } else {
      // Complete the speaking session
      const results: SpeakingResult[] = data.questions.map(question => {
        const userAnswer = userAnswers[question.id] || "";
        return {
          questionId: question.id,
          userAnswer,
          questionText: question.question,
          duration: data.timeLimit * 60, // Assume full time used
          wordCount: userAnswer.trim().split(/\s+/).length
        };
      });

      onComplete(sessionId, results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTranscript("");
    }
  };

  if (!isSupported) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-red-500">Speech recognition not supported</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please use Chrome or Edge browser for speaking practice.
          </p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with progress */}
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
          <span>{data.timeLimit} min per question</span>
        </div>
      </div>

      <Progress value={progress} className="w-full" />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <Volume2 className="h-6 w-6 text-primary" />
            Listen to the Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question Text */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {currentQuestion.instructions}
            </p>
          </div>

          {/* Speak Question Button */}
          <div className="flex justify-center">
            <Button
              onClick={speakQuestion}
              disabled={isSpeaking}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              {isSpeaking ? 'Speaking...' : 'Listen to Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Answer Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <Mic className={`h-6 w-6 ${isListening ? 'text-red-500' : 'text-primary'}`} />
            Your Answer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recording Controls */}
          <div className="flex justify-center gap-4">
            {!isListening ? (
              <Button
                onClick={startListening}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                disabled={hasAnswered}
              >
                <Mic className="h-4 w-4" />
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopListening}
                variant="outline"
                className="flex items-center gap-2"
              >
                <MicOff className="h-4 w-4" />
                Stop Recording
              </Button>
            )}
          </div>

          {/* Live Transcript */}
          {isListening && (
            <div className="p-4 border-2 border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Live Transcript:</p>
              <p className="text-lg">
                {transcript || 'Listening...'}
                {isListening && <span className="animate-pulse text-red-500">|</span>}
              </p>
            </div>
          )}

          {/* Recorded Answer */}
          {hasAnswered && (
            <div className="p-4 border-2 border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Your Recorded Answer:</p>
              <p className="text-lg text-green-700 dark:text-green-300">{currentAnswer}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  {currentAnswer.split(' ').length} words
                </Badge>
                <Badge variant="outline">
                  {Math.round(currentAnswer.length / 5)} sec estimated
                </Badge>
              </div>
            </div>
          )}

          {/* Hints */}
          {currentQuestion.hints && !hasAnswered && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">💡 Hints:</p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                {currentQuestion.hints.map((hint, index) => (
                  <li key={index}>• {hint}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">⚠️ {error}</p>
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

        <Button
          onClick={handleNext}
          disabled={!hasAnswered && currentQuestionIndex < data.questions.length - 1}
        >
          {currentQuestionIndex === data.questions.length - 1 ? (
            <>
              Complete Speaking
              <CheckCircle className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Next Question
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

