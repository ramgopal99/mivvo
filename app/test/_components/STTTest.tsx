'use client';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function STTTest() {
  const [isListening, setIsListening] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (finalTranscript) {
      console.log('Final transcript:', finalTranscript);
    }
  }, [finalTranscript]);

  useEffect(() => {
    if (interimTranscript) {
      console.log('Interim transcript:', interimTranscript);
    }
  }, [interimTranscript]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    resetTranscript();
  };

  if (!isClient) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-8 text-destructive">
            Browser doesn&apos;t support speech recognition.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-8 text-destructive">
            Microphone not available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant={isListening ? 'destructive' : 'default'}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-md min-h-24 border">
            {transcript || 'Start speaking to see transcript...'}
          </div>
        </CardContent>
      </Card>

      {interimTranscript && (
        <Card>
          <CardHeader>
            <CardTitle>Interim Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
              {interimTranscript}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Status: {listening ? 'Listening...' : 'Not listening'}</p>
            <p>Final transcript: {finalTranscript || 'None'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
