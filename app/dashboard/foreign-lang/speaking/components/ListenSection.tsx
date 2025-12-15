import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { AudioWaveform } from "./AudioWaveform";
import type { SpeakingQuestion } from "../types";

interface ListenSectionProps {
  currentQuestion: SpeakingQuestion;
  isSpeaking: boolean;
  onSpeakQuestion: () => void;
}

export function ListenSection({ currentQuestion, isSpeaking, onSpeakQuestion }: ListenSectionProps) {
  return (
    <Card className="h-[400px] flex flex-col w-full max-w-full">
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
          onClick={onSpeakQuestion}
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
  );
}
