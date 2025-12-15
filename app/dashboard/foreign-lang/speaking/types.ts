export interface SpeakingResult {
  questionId: string;
  userAnswer: string;
  questionText: string;
  duration: number;
  wordCount: number;
}

export interface SpeakingQuestion {
  id: string;
  question: string;
  category: 'listen-speak' | 'listen-repeat';
  order?: number;
}

export interface SpeakingPracticeInterfaceProps {
  sessionId: string;
  data: SpeakingQuestion;
  userAnswers?: Record<string, string>;
  onAnswer: (sessionId: string, questionId: string, answer: string) => void;
}

export interface AudioWaveformProps {
  isActive: boolean;
  analyser?: AnalyserNode | null;
}

// Web Speech API Type Definitions
export interface SpeechRecognition extends EventTarget {
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

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeakingBackup {
  sessionId: string;
  question: string;
  answer: string;
  wordCount: number;
  duration: number;
  timestamp: number;
}
