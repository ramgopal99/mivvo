import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, CheckCircle } from "lucide-react";
import { practiceConfig } from "../../config";
import { AudioWaveform } from "./AudioWaveform";
import type { SpeakingQuestion } from "../types";

interface RecordingSectionProps {
  currentQuestion: SpeakingQuestion;
  currentAnswer: string;
  hasAnswered: boolean;
  isListening: boolean;
  recordingTimeLeft: number;
  recordingCompleted: boolean;
  transcript: string;
  isSaving: boolean;
  error: string;
  analyser: AnalyserNode | null;
  onStartListening: () => void;
  onStopListening: () => void;
}

export function RecordingSection({
  currentQuestion,
  currentAnswer,
  hasAnswered,
  isListening,
  recordingTimeLeft,
  recordingCompleted,
  transcript,
  isSaving,
  error,
  analyser,
  onStartListening,
  onStopListening,
}: RecordingSectionProps) {
  return (
    <Card className="flex flex-col h-full min-h-0">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg md:text-xl flex items-center gap-3">
          <Mic className={`h-5 w-5 md:h-6 md:w-6 ${isListening ? 'text-red-500' : 'text-primary'}`} />
          {currentQuestion.category === 'listen-repeat' ? 'Record Your Repetition' : 'Your Answer'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-3 md:space-y-4 min-h-0 overflow-hidden">
        {/* Recording Controls - Only show if not answered and recording not completed */}
        {!hasAnswered && !recordingCompleted && (
          <div className="flex flex-col items-center gap-4">
            {!isListening ? (
              <Button
                onClick={onStartListening}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                disabled={hasAnswered}
              >
                <Mic className="h-4 w-4" />
                Start Recording ({practiceConfig.speakingRecording.maxRecordingTime}s)
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="text-lg font-semibold text-red-600">
                  Recording: {recordingTimeLeft}s
                </div>
                <Button
                  onClick={onStopListening}
                  variant="outline"
                  className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <MicOff className="h-4 w-4" />
                  Stop Recording
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Recording will continue for {recordingTimeLeft} seconds or until you click Stop Recording
                </p>
              </div>
            )}
          </div>
        )}

        {/* Recording Completed Message */}
        {recordingCompleted && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Recording Completed</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Your response has been saved. Use the Next button to continue.
            </p>
          </div>
        )}

        {/* Waveform Animation for Recording */}
        {isListening && (
          <div className="w-full flex-1 flex items-center justify-center min-h-0">
            <AudioWaveform isActive={isListening} analyser={analyser} />
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

        {/* Saving Feedback */}
        {isSaving && (
          <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="text-green-600 dark:text-green-400">✓</div>
              <p className="text-sm text-green-700 dark:text-green-300">Your answer is saved</p>
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
  );
}
