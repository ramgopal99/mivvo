import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, CheckCircle } from "lucide-react";
import { practiceConfig } from "../../config";
import { AudioWaveform } from "./AudioWaveform";
import type { SpeakingQuestion } from "../types";

interface RecordingSectionProps {
  currentQuestion: SpeakingQuestion;
  hasAnswered: boolean;
  isListening: boolean;
  recordingTimeLeft: number;
  recordingCompleted: boolean;
  isSaving: boolean;
  error: string;
  analyser: AnalyserNode | null;
  onStartListening: () => void;
  onStopListening: () => void;
}

export function RecordingSection({
  currentQuestion,
  hasAnswered,
  isListening,
  recordingTimeLeft,
  recordingCompleted,
  error,
  analyser,
  onStartListening,
  onStopListening,
}: RecordingSectionProps) {
  return (
    <Card className="flex flex-col h-full min-h-0 w-full max-w-full">
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

        {/* Waveform Animation for Recording - Hide when recording is completed */}
        {isListening && !recordingCompleted && (
          <div className="w-full flex-1 flex items-center justify-center min-h-0">
            <AudioWaveform isActive={isListening} analyser={analyser} />
          </div>
        )}


        {/* Saving Feedback */}
        {/* {isSaving && (
          <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="text-green-600 dark:text-green-400">✓</div>
              <p className="text-sm text-green-700 dark:text-green-300">Your answer is saved</p>
            </div>
          </div>
        )} */}

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
