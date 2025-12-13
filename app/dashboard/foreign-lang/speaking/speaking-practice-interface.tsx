"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, CheckCircle } from "lucide-react";
import { type SpeakingQuestionSessionData } from "../data/speaking-practice-data";

interface SpeakingResult {
  questionId: string;
  userAnswer: string;
  questionText: string;
  duration: number;
  wordCount: number;
}


interface SpeakingPracticeInterfaceProps {
  sessionId: string;
  data: SpeakingQuestionSessionData;
  userAnswers?: Record<string, string>;
  onAnswer: (sessionId: string, questionId: string, answer: string) => void;
  onComplete: (sessionId: string, results: SpeakingResult[]) => void;
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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string>("");

  const currentQuestion = data.question;

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentQuestionRef = useRef(currentQuestion);
  const onAnswerRef = useRef(onAnswer);
  const sessionIdRef = useRef(sessionId);
  const transcriptRef = useRef(transcript);
  const currentAnswer = userAnswers[currentQuestion.id] || "";
  const hasAnswered = currentAnswer.trim().length > 0;

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Capture ref values at the start of the effect
    const currentTimer: NodeJS.Timeout | null = null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
        const currentTranscript = transcriptRef.current;
        if (currentTranscript.trim()) {
          const finalAnswer = currentTranscript.trim();
          onAnswerRef.current(sessionIdRef.current, currentQuestionRef.current.id, finalAnswer);
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
      // Clear the captured timer value
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
    };
  }, []);

  // Update refs when values change
  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  useEffect(() => {
    onAnswerRef.current = onAnswer;
  }, [onAnswer]);

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Speak the current question using TTS
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Badge variant="outline">
          Speaking Question
        </Badge>
        <Badge variant="secondary" className="capitalize">
          {currentQuestion.category.replace('-', ' ')}
        </Badge>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Box - Listen Button */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-primary" />
              {currentQuestion.category === 'listen-repeat' ? 'Listen & Repeat' : 'Listen to Question'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              {currentQuestion.category === 'listen-repeat' && (
                <p className="text-sm text-muted-foreground text-center">
                  Listen to the audio and repeat what you hear
                </p>
              )}
              <Button
                onClick={speakQuestion}
                disabled={isSpeaking}
                className="flex items-center gap-2"
              >
                <Volume2 className="h-4 w-4" />
                {isSpeaking ? 'Playing...' : 'Listen'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Box - Recording */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Mic className={`h-6 w-6 ${isListening ? 'text-red-500' : 'text-primary'}`} />
              {currentQuestion.category === 'listen-repeat' ? 'Record Your Repetition' : 'Your Answer'}
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
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                    {currentAnswer.split(' ').length} words
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                    {Math.round(currentAnswer.length / 5)} sec estimated
                  </span>
                </div>
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
      </div>

      {/* Completion indicator */}
      {hasAnswered && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Question completed! Use the Next button in the footer to continue.</span>
          </div>
        </div>
      )}

    </div>
  );
}

