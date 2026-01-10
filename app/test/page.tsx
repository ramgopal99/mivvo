'use client';

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const TestPage = () => {
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
    if (finalTranscript) {
      console.log('Final transcript:', finalTranscript);
      console.log('Confidence:', 'Not available in this API');
    }
  }, [finalTranscript]);

  useEffect(() => {
    if (interimTranscript) {
      console.log('Interim transcript:', interimTranscript);
    }
  }, [interimTranscript]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Prevent hydration mismatch by waiting for client-side mount
  if (!isClient) {
    return <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Speech Recognition Test</h1>
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Speech Recognition Test</h1>
      <span>Browser doesn&apos;t support speech recognition.</span>
    </div>;
  }

  if (!isMicrophoneAvailable) {
    return <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Speech Recognition Test</h1>
      <span>Microphone not available.</span>
    </div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Speech Recognition Test</h1>

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-medium transition-colors`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>

        <button
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
          <div className="p-4 bg-gray-100 rounded min-h-24 border">
            {transcript || 'Start speaking to see transcript...'}
          </div>
        </div>

        {interimTranscript && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Interim:</h2>
            <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
              {interimTranscript}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>Status: {listening ? 'Listening...' : 'Not listening'}</p>
          <p>Final transcript: {finalTranscript}</p>
        </div>
      </div>
    </div>
  );
};

TestPage.displayName = 'TestPage';

export default TestPage;