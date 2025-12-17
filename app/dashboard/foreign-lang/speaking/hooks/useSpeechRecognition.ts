import { useState, useEffect, useRef, useCallback } from "react";
import { practiceConfig } from "../../config";
import type {
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  SpeakingQuestion,
  SpeakingBackup
} from "../types";

interface UseSpeechRecognitionProps {
  currentQuestion: SpeakingQuestion;
  sessionId: string;
  onAnswer: (sessionId: string, questionId: string, answer: string) => void;
  questionStartTimeRef: React.MutableRefObject<number>;
}

// Speaking practice timing configurations (different from voice chat)
const SPEAKING_VOICE_CONFIG = {
  SILENCE_TIMEOUT_MS: 1000, // Wait time after user stops speaking (1 second for speaking practice)
  RECOGNITION_KEEP_ALIVE_MS: 3000, // Speech recognition keep-alive interval (3 seconds, less aggressive)
};

export function useSpeechRecognition({
  currentQuestion,
  sessionId,
  onAnswer,
  questionStartTimeRef
}: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string>("");
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(practiceConfig.speakingRecording.maxRecordingTime);
  const [isRecordingManuallyStopped, setIsRecordingManuallyStopped] = useState(false);
  const [accumulatedTranscript, setAccumulatedTranscript] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const recordingStartTimeRef = useRef<number | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRecordingManuallyStoppedRef = useRef(false);
  const finalTranscriptRef = useRef<string>(""); // Store final transcript to avoid state clearing issues

  // New refs for keep-alive mechanism (like custominterview)
  const accumulatedSpeechRef = useRef<string>('');
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionActiveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingSpeechRef = useRef<boolean>(false);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      console.log('SpeechRecognition API is available');
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      speechSynthesisRef.current = window.speechSynthesis;

      console.log('SpeechRecognition object created:', recognitionRef.current);

      const recognition = recognitionRef.current;
      if (!recognition) return;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError("");
        recordingStartTimeRef.current = Date.now();
        setIsRecordingManuallyStopped(false);
        isRecordingManuallyStoppedRef.current = false;
        accumulatedSpeechRef.current = ''; // Reset accumulated speech
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log('Speech recognition result received, result count:', event.results.length);

        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const isFinal = event.results[i].isFinal;
          console.log(`Result ${i}: "${transcript}" (final: ${isFinal})`);

          if (isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        console.log('Final transcript this batch:', finalTranscript);
        console.log('Interim transcript this batch:', interimTranscript);

        // Update live transcript with both final and interim results
        setAccumulatedTranscript(finalTranscript + interimTranscript);

        // ANY speech result means user is actively speaking - reset silence timeout
        startSilenceTimeout();

        if (finalTranscript.trim()) {
          // Accumulate final results
          accumulatedSpeechRef.current += (accumulatedSpeechRef.current ? ' ' : '') + finalTranscript.trim();
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.log('Speech recognition error:', event.error);

        switch (event.error) {
          case 'no-speech':
            // For speaking practice, treat no-speech as end of recording
            console.log('No speech detected - ending recording for speaking practice');
            setIsListening(false);
            // Don't auto-restart - let the user manually start if needed
            return;

          case 'audio-capture':
            console.log('Audio capture failed');
            setError('Audio capture failed. Please check your microphone.');
            setIsListening(false);
            break;

          case 'not-allowed':
            console.log('Microphone access denied');
            setError('Microphone access denied. Please allow microphone access.');
            setIsListening(false);
            break;

          default:
            console.log('Unknown speech recognition error:', event.error);
            setError(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        }

        // Only clean up resources for non-restartable errors
        if (event.error !== 'no-speech') {
          console.log('Cleaning up resources due to error');
          // Clean up resources on error
          if (recordingTimerRef.current) {
            clearInterval(recordingTimerRef.current);
            recordingTimerRef.current = null;
          }
        }
      };

      recognition.onend = () => {
        // Recording has ended (manually stopped, time up, or natural end)
        setIsListening(false);

        // If manually stopped or time is up, save results and stop
        if (isRecordingManuallyStoppedRef.current || recordingTimeLeft <= 0) {
          // Clear timers immediately
          if (recordingTimerRef.current) {
            clearInterval(recordingTimerRef.current);
            recordingTimerRef.current = null;
          }

          // Clear silence timeout and accumulated speech when recognition ends
          clearSilenceTimeout();
          accumulatedSpeechRef.current = '';
          setAccumulatedTranscript('');

          // Get current transcript from state as backup, ref as primary
          const transcriptFromState = accumulatedTranscript;
          const transcriptFromRef = finalTranscriptRef.current;
          const finalAnswer = (transcriptFromRef || transcriptFromState).trim();

          console.log('Recording ended - transcript from state:', transcriptFromState);
          console.log('Recording ended - transcript from ref:', transcriptFromRef);
          console.log('Recording ended - using transcript:', transcriptFromRef || transcriptFromState);
          console.log('Recording ended - final answer:', finalAnswer);

          const hasValidAnswer = finalAnswer.length > 0;
          console.log('Recording ended - has valid answer:', hasValidAnswer);
          const wordCount = hasValidAnswer ? finalAnswer.split(/\s+/).length : 0;
          const duration = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
          console.log('Recording ended - word count:', wordCount, 'Duration:', duration);

          // Always save to localStorage as backup, even for empty recordings
          const speakingBackup: SpeakingBackup = {
            sessionId: currentQuestion.id,
            question: currentQuestion.question,
            answer: finalAnswer,
            wordCount: wordCount,
            duration: duration,
            timestamp: Date.now()
          };
          localStorage.setItem(`speaking-backup-${currentQuestion.id}`, JSON.stringify(speakingBackup));

          // Save to localStorage with session data
          const sessionData = {
            sessionId,
            questionId: currentQuestion.id,
            userAnswer: finalAnswer,
            questionText: currentQuestion.question,
            duration: Math.max(duration, 1),
            wordCount: wordCount,
            timestamp: Date.now()
          };

          console.log('Saving to localStorage with key:', `speaking-result-${currentQuestion.id}`);
          console.log('Saving session data:', sessionData);
          localStorage.setItem(`speaking-result-${currentQuestion.id}`, JSON.stringify(sessionData));

          // Show success message
          setIsSaving(true);
          setTimeout(() => {
            setIsSaving(false);
          }, 1000); // Show message for 1 second

          // Call onAnswer to update the UI
          onAnswer(sessionId, currentQuestion.id, finalAnswer);

          // Always mark recording as completed
          setAccumulatedTranscript("");
          finalTranscriptRef.current = ""; // Also clear the ref
          setRecordingCompleted(true);
        } else {
          // For speaking practice, don't auto-restart when recognition ends naturally
          // Let the user manually start recording for the next attempt if needed
          console.log('Recognition ended naturally - staying stopped for speaking practice');
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
      // Clear timers
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      // Clear new timeouts
      clearSilenceTimeout();
      stopRecognitionKeepAlive();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep ref in sync with state
  useEffect(() => {
    isRecordingManuallyStoppedRef.current = isRecordingManuallyStopped;
  }, [isRecordingManuallyStopped]);

  // Additional safeguard: when question changes, ensure we clean up any auto-restart timers
  useEffect(() => {
    // Clear any pending timeouts when component unmounts or question changes
    return () => {
      clearSilenceTimeout();
      stopRecognitionKeepAlive();
    };
  }, [currentQuestion.id]); // This will run when question changes

  // Clear existing silence timeout
  const clearSilenceTimeout = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  }, []);

  // Process accumulated speech after silence timeout
  const processAccumulatedSpeech = useCallback(() => {
    if (isProcessingSpeechRef.current || !accumulatedSpeechRef.current.trim()) return;

    isProcessingSpeechRef.current = true;
    const speechToProcess = accumulatedSpeechRef.current.trim();

    // Clear accumulated speech
    accumulatedSpeechRef.current = '';

    // Update the final transcript with accumulated speech
    finalTranscriptRef.current = speechToProcess;
    setAccumulatedTranscript(speechToProcess);

    // Reset processing flag after a short delay
    setTimeout(() => {
      isProcessingSpeechRef.current = false;
    }, 100);
  }, []);

  // Start silence timeout
  const startSilenceTimeout = useCallback(() => {
    clearSilenceTimeout();
    silenceTimeoutRef.current = setTimeout(() => {
      processAccumulatedSpeech();
    }, SPEAKING_VOICE_CONFIG.SILENCE_TIMEOUT_MS);
  }, [clearSilenceTimeout, processAccumulatedSpeech]);

  // Ensure recognition stays active by restarting if needed (more conservative for speaking practice)
  const ensureRecognitionActive = useCallback(() => {
    // Don't restart if recording is manually stopped, completed, or if we're not supposed to be recording
    if (isRecordingManuallyStoppedRef.current || recordingCompleted || recordingTimeLeft <= 0) return;

    // Only restart if we're actively supposed to be listening and recognition stopped unexpectedly
    if (!isListening && recognitionRef.current) {
      console.log('Recognition not active during recording, restarting...');
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.warn("Failed to restart speech recognition:", error);
      }
    }
  }, [isListening, recordingCompleted, recordingTimeLeft]);

  // Start periodic check to keep recognition active (less aggressive for speaking practice)
  const startRecognitionKeepAlive = useCallback(() => {
    if (recognitionActiveTimeoutRef.current) {
      clearInterval(recognitionActiveTimeoutRef.current);
    }
    // Only start keep-alive when actively recording, and less frequently
    recognitionActiveTimeoutRef.current = setInterval(() => {
      // Only ensure recognition is active if we're supposed to be listening
      // and not completed, but be much more conservative for speaking practice
      if (isListening && !isRecordingManuallyStoppedRef.current && !recordingCompleted && recordingTimeLeft > 0) {
        ensureRecognitionActive();
      }
    }, SPEAKING_VOICE_CONFIG.RECOGNITION_KEEP_ALIVE_MS);
  }, [ensureRecognitionActive, isListening, recordingCompleted, recordingTimeLeft]);

  // Stop periodic check
  const stopRecognitionKeepAlive = useCallback(() => {
    if (recognitionActiveTimeoutRef.current) {
      clearInterval(recognitionActiveTimeoutRef.current);
      recognitionActiveTimeoutRef.current = null;
    }
  }, []);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening || recordingCompleted) {
      console.log('Cannot start listening - already listening or completed');
      return;
    }

    try {
      setError("");
      setIsRecordingManuallyStopped(false);

        // Start recording timer countdown - only create once when recording starts
        console.log('Starting timer with maxRecordingTime:', practiceConfig.speakingRecording.maxRecordingTime);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTimeLeft((prev: number) => {
            console.log('Timer tick, current time left:', prev);
            const newTime = prev - 1;
            if (newTime <= 0) {
              console.log('Timer reached 0, stopping recording');

              // CAPTURE FINAL TRANSCRIPT BEFORE STOPPING
              const finalTranscriptAtTimeout = finalTranscriptRef.current || accumulatedTranscript;
              console.log('Transcript captured at timeout:', finalTranscriptAtTimeout);

              // Time's up - stop recording automatically
              // Don't call stopListening() as it resets the timer
              // Instead, just set the flags and let onend handle cleanup
              setIsRecordingManuallyStopped(true);
              isRecordingManuallyStoppedRef.current = true;
              setIsListening(false);

              // Stop speech recognition
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.stop();
                } catch (error) {
                  console.warn("Error stopping speech recognition:", error);
                }
              }

              // Clear the timer
              if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
                recordingTimerRef.current = null;
              }

              return 0;
            }
            return newTime;
          });
        }, 1000);

      recognitionRef.current.start();
      // Start the recognition keep-alive mechanism
      startRecognitionKeepAlive();
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setError('Microphone access is required for speech recognition.');
      setIsListening(false);
      // Clear timer if recognition failed to start
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  }, [isListening, recordingCompleted, accumulatedTranscript, startRecognitionKeepAlive]);

  const stopListening = useCallback(() => {
    console.log('Manual stop initiated');

    // CAPTURE TRANSCRIPT IMMEDIATELY BEFORE STOPPING
    const capturedTranscript = finalTranscriptRef.current || accumulatedTranscript;
    console.log('Transcript captured at manual stop:', capturedTranscript);

    // Save immediately to localStorage
    const finalAnswer = capturedTranscript.trim();
    const hasValidAnswer = finalAnswer.length > 0;
    const wordCount = hasValidAnswer ? finalAnswer.split(/\s+/).length : 0;
    const duration = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);

    console.log('Manual stop - final answer:', finalAnswer, 'hasValidAnswer:', hasValidAnswer);

    // Save to localStorage
    const sessionData = {
      sessionId,
      questionId: currentQuestion.id,
      userAnswer: finalAnswer,
      questionText: currentQuestion.question,
      duration: Math.max(duration, 1),
      wordCount: wordCount,
      timestamp: Date.now()
    };

    localStorage.setItem(`speaking-result-${currentQuestion.id}`, JSON.stringify(sessionData));
    console.log('Saved to localStorage at manual stop');

    // Show success message
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);

    // Update UI
    onAnswer(sessionId, currentQuestion.id, finalAnswer);

    // Immediately set flags to prevent any further recording
    setIsRecordingManuallyStopped(true);
    isRecordingManuallyStoppedRef.current = true;
    setIsListening(false);

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.warn("Error stopping speech recognition:", error);
      }
    }

    // Clear timers immediately
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // Stop recognition keep-alive
    stopRecognitionKeepAlive();

    // Clear silence timeout and accumulated speech
    clearSilenceTimeout();
    accumulatedSpeechRef.current = '';

    // Mark recording as completed immediately
    setRecordingCompleted(true);

    // Reset recording time
    setRecordingTimeLeft(practiceConfig.speakingRecording.maxRecordingTime);

    // Clear transcript
    setAccumulatedTranscript("");
    finalTranscriptRef.current = "";
  }, [sessionId, currentQuestion, onAnswer, accumulatedTranscript, questionStartTimeRef, clearSilenceTimeout, stopRecognitionKeepAlive]);

  // Speak the current question using TTS
  const speakQuestion = useCallback(async () => {
    if (!speechSynthesisRef.current || !currentQuestion) return;

    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    speechSynthesisRef.current.speak(utterance);
  }, [currentQuestion]);

  return {
    isListening,
    isSupported,
    error,
    recordingTimeLeft,
    accumulatedTranscript,
    isSaving,
    recordingCompleted,
    startListening,
    stopListening,
    speakQuestion,
    setRecordingCompleted,
    setAccumulatedTranscript,
    setRecordingTimeLeft,
    setIsRecordingManuallyStopped,
  };
}
