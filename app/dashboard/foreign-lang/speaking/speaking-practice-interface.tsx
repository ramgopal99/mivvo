"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SpeakingPracticeHeader } from "./components/SpeakingPracticeHeader";
import { ListenSection } from "./components/ListenSection";
import { RecordingSection } from "./components/RecordingSection";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useAudioAnalysis } from "./hooks/useAudioAnalysis";
import { practiceConfig } from "../config";
import type { SpeakingPracticeInterfaceProps } from "./types";

export function SpeakingPracticeInterface({
  sessionId,
  data,
  userAnswers = {},
  onAnswer
}: SpeakingPracticeInterfaceProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuestion = data;
  const questionStartTimeRef = useRef<number>(Date.now());
  const currentAnswer = userAnswers[currentQuestion.id] || "";
  const hasAnswered = currentAnswer.trim().length > 0;

  // Use custom hooks
  const speechRecognition = useSpeechRecognition({
    currentQuestion,
    sessionId,
    onAnswer,
    questionStartTimeRef
  });

  const { analyser } = useAudioAnalysis();

  // Reset question start time and recording state when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    speechRecognition.setRecordingTimeLeft(practiceConfig.speakingRecording.maxRecordingTime);
    speechRecognition.setIsRecordingManuallyStopped(false);
    speechRecognition.setAccumulatedTranscript("");

    // Check for existing answer or backup data to determine if recording was completed
    const hasExistingAnswer = userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].trim().length > 0;
    const backupKey = `speaking-backup-${currentQuestion.id}`;
    const backupData = localStorage.getItem(backupKey);
    let hasRecentBackup = false;

    if (backupData) {
      try {
        const backup = JSON.parse(backupData);
        // Only consider backup valid if it's recent (within last 24 hours)
        hasRecentBackup = Date.now() - backup.timestamp < 24 * 60 * 60 * 1000;
      } catch {
        // Invalid backup data
      }
    }

    if (hasExistingAnswer || hasRecentBackup) {
      speechRecognition.setRecordingCompleted(true);
    } else {
      speechRecognition.setRecordingCompleted(false);
    }

    // Check for existing backup and restore if available
    if (backupData) {
      try {
        const backup = JSON.parse(backupData);
        // Only restore if it's recent (within last 24 hours)
        if (Date.now() - backup.timestamp < 24 * 60 * 60 * 1000) {
          speechRecognition.setAccumulatedTranscript(backup.answer);
        } else {
          // Remove old backup
          localStorage.removeItem(backupKey);
        }
      } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
        localStorage.removeItem(backupKey);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion.id, userAnswers]);

  // Speak the current question using TTS
  const speakQuestion = useCallback(async () => {
    if (!speechRecognition.isSupported || !currentQuestion) return;

    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [currentQuestion, speechRecognition.isSupported]);

  // Start listening with audio analysis setup
  const handleStartListening = useCallback(async () => {
    if (speechRecognition.isListening || hasAnswered || speechRecognition.recordingCompleted) {
      return;
    }

    try {
      speechRecognition.setRecordingTimeLeft(practiceConfig.speakingRecording.maxRecordingTime);
      await speechRecognition.startListening();
    } catch (error) {
      console.error('Error starting listening:', error);
    }
  }, [speechRecognition, hasAnswered]);


  if (!speechRecognition.isSupported) {
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
      <SpeakingPracticeHeader currentQuestion={currentQuestion} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0 px-2">
        <ListenSection
          currentQuestion={currentQuestion}
          isSpeaking={isSpeaking}
          onSpeakQuestion={speakQuestion}
        />

        <RecordingSection
          currentQuestion={currentQuestion}
          hasAnswered={hasAnswered}
          isListening={speechRecognition.isListening}
          recordingTimeLeft={speechRecognition.recordingTimeLeft}
          recordingCompleted={speechRecognition.recordingCompleted}
          isSaving={speechRecognition.isSaving}
          error={speechRecognition.error}
          analyser={analyser}
          onStartListening={handleStartListening}
          onStopListening={speechRecognition.stopListening}
        />
      </div>

    </div>
  );
}

