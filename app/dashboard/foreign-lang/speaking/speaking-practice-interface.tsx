"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, CheckCircle } from "lucide-react";
import { type SpeakingQuestionSessionData } from "../data/speaking-practice-data";

// Audio Waveform Component
interface AudioWaveformProps {
  isActive: boolean;
  analyser?: AnalyserNode | null;
}

function AudioWaveform({ isActive, analyser }: AudioWaveformProps) {
  const animationFrameRef = useRef<number | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setWaveformData([]);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    if (!analyser) {
      // Simulate waveform when no analyser (for TTS playback)
      const points = 60;
      let time = 0;
      
      const simulate = () => {
        const newWaveform: number[] = [];
        for (let i = 0; i < points; i++) {
          const position = (i / points) * 2 * Math.PI;
          // Create animated zigzag pattern
          const amplitude = 30 + Math.sin(time + position * 2) * 20;
          const value = Math.sin(position * 4 + time) * amplitude;
          newWaveform.push(value);
        }
        time += 0.1;
        setWaveformData(newWaveform);
        animationFrameRef.current = requestAnimationFrame(simulate);
      };
      
      simulate();
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const waveformArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyser) return;

      // Get time domain data for waveform
      analyser.getByteTimeDomainData(waveformArray);
      
      // Also get frequency data for volume
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const normalizedVolume = Math.min(average / 255, 1);
      
      // Create waveform data points (zigzag pattern based on actual audio)
      const points = 60;
      const newWaveform: number[] = [];
      const step = Math.floor(bufferLength / points);
      
      for (let i = 0; i < points; i++) {
        const index = i * step;
        // Normalize waveform data (0-255 to -40 to 40)
        const normalized = (waveformArray[index] - 128) / 128;
        // Scale based on volume
        const amplitude = normalized * 40 * (0.5 + normalizedVolume * 0.5);
        newWaveform.push(amplitude);
      }
      
      setWaveformData(newWaveform);
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isActive, analyser]);

  if (!isActive || waveformData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Ready...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 120"
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <polyline
          points={waveformData
            .map((value, index) => {
              const x = (index / (waveformData.length - 1)) * 600;
              const y = 60 + value; // Center at 60, adjust by value
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="url(#waveformGradient)"
          strokeWidth="3"
          className="text-primary"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

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
  onComplete // eslint-disable-line @typescript-eslint/no-unused-vars
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
  
  // Audio analysis refs for waveform
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analysis for waveform
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 256;
      
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
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
    
    // Clean up audio analysis
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        <Badge variant="outline">
          Speaking Question
        </Badge>
        <Badge variant="secondary" className="capitalize">
          {currentQuestion.category.replace('-', ' ')}
        </Badge>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">

        {/* Left Box - Listen Button */}
        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-primary" />
              {currentQuestion.category === 'listen-repeat' ? 'Listen & Repeat' : 'Listen to Question'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
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
            {/* Waveform Animation for Listening */}
            {isSpeaking && (
              <div className="w-full flex-1 flex items-center justify-center min-h-0">
                <AudioWaveform isActive={isSpeaking} />
              </div>
            )}
            {!isSpeaking && (
              <div className="w-full flex-1 flex items-center justify-center min-h-0">
                <p className="text-sm text-muted-foreground text-center px-4">Click Listen to hear the question</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Box - Recording */}
        <Card className="flex flex-col h-full min-h-0">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-lg md:text-xl flex items-center gap-3">
              <Mic className={`h-5 w-5 md:h-6 md:w-6 ${isListening ? 'text-red-500' : 'text-primary'}`} />
              {currentQuestion.category === 'listen-repeat' ? 'Record Your Repetition' : 'Your Answer'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-3 md:space-y-4 min-h-0 overflow-hidden">
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

            {/* Waveform Animation for Recording */}
            {isListening && (
              <div className="w-full flex-1 flex items-center justify-center min-h-0">
                <AudioWaveform isActive={isListening} analyser={analyserRef.current} />
              </div>
            )}

            {/* Live Transcript */}
            {isListening && (
              <div className="p-3 md:p-4 border-2 border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg flex-shrink-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Live Transcript:</p>
                <p className="text-sm md:text-lg break-words">
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
        <div className="flex justify-center mt-4 flex-shrink-0">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm md:text-base">
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-medium text-center">Question completed! Use the Next button in the footer to continue.</span>
          </div>
        </div>
      )}

    </div>
  );
}

