"use client";

import { useState, useRef, useEffect } from 'react';

// Extended MediaRecorder interface to include our custom property
interface ExtendedMediaRecorder extends MediaRecorder {
  chunkInterval?: NodeJS.Timeout;
  dataInterval?: NodeJS.Timeout;
}

export default function AssemblyAITest() {
  const [status, setStatus] = useState<string>('Ready to start');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [liveInput, setLiveInput] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const mediaRecorderRef = useRef<ExtendedMediaRecorder | null>(null);
  const [processingQueue, setProcessingQueue] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const connectToAssemblyAI = async () => {
    setStatus('Connecting to AssemblyAI...');

    try {
      const response = await fetch('/api/assemblyai-transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsConnected(true);
        setStatus('✅ Connected to AssemblyAI');
        console.log('Connected to AssemblyAI');
      } else {
        const error = await response.json();
        setStatus(`❌ Connection failed: ${error.error}`);
      }
    } catch (error) {
      setStatus(`❌ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const startRecording = async () => {
    if (!isConnected) {
      await connectToAssemblyAI();
      if (!isConnected) return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      setStatus('🎤 Listening... Speak now!');
      setIsRecording(true);
      setLiveInput(''); // Clear live input when starting recording

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      // Minimal backup interval (rarely used now with immediate sending)
      const chunkInterval = setInterval(async () => {
        console.log('Backup interval running (should be rarely called)');
        // This is mainly for cleanup purposes now
      }, 5000); // Very infrequent

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Audio chunk received:', event.data.size, 'bytes');

          // Send chunk immediately when data is available
          const chunkBlob = new Blob([event.data], { type: 'audio/webm' });
          console.log('Sending chunk immediately, size:', chunkBlob.size);

          // Send immediately without accumulating
          if (processingQueue < 5) { // Allow more concurrent requests for immediate processing
            sendAudioChunk(chunkBlob);
          } else {
            console.log('Queue full, skipping immediate send');
          }
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log('Recording stopped');
        clearInterval(chunkInterval);
        clearInterval(dataInterval);
        console.log('Recording fully stopped, intervals cleared');
      };

      // Start recording - data will be collected continuously
      mediaRecorderRef.current.start();

      // Request data every 100ms to ensure continuous chunks
      const dataInterval = setInterval(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.requestData();
          console.log('Requested data from MediaRecorder');
        }
      }, 100);

      // Store both intervals
      mediaRecorderRef.current.dataInterval = dataInterval;

      // Store the interval ID so we can clear it
      mediaRecorderRef.current.chunkInterval = chunkInterval;

    } catch (error) {
      setStatus(`❌ Microphone access denied: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Clear both intervals
      if (mediaRecorderRef.current.chunkInterval) {
        clearInterval(mediaRecorderRef.current.chunkInterval);
      }
      if (mediaRecorderRef.current.dataInterval) {
        clearInterval(mediaRecorderRef.current.dataInterval);
      }

      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setStatus('⏹️ Recording stopped');
    }
  };

  const sendAudioChunk = async (audioBlob: Blob) => {
    const startTime = Date.now();
    console.log('sendAudioChunk called with blob size:', audioBlob.size, 'isRecording:', isRecording);

    try {
      setProcessingQueue(prev => prev + 1);
      setStatus(`🔄 Processing audio... (${processingQueue + 1} in queue)`);

      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/assemblyai-transcribe', {
        method: 'PUT',
        body: formData,
      });

      const processingTime = Date.now() - startTime;

      if (response.ok) {
        const data = await response.json();
        if (data.transcript && data.transcript.trim()) {
          const transcribedText = data.transcript.trim();
          const timestamp = new Date().toLocaleTimeString();

          // Update both transcript and live input
          setTranscript(prev => {
            const newTranscript = prev + (prev ? ' ' : '') + transcribedText;
            return newTranscript;
          });

          // Update live input immediately when transcription arrives
          setLiveInput(prev => {
            const newInput = prev + (prev ? ' ' : '') + transcribedText;
            // Auto-focus and move cursor to end immediately
            requestAnimationFrame(() => {
              if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(newInput.length, newInput.length);
              }
            });
            return newInput;
          });

          setStatus(`✅ Transcribed at ${timestamp} (${processingTime}ms)`);
          // Reset status after 2 seconds
          setTimeout(() => {
            if (isRecording) {
              setStatus('🎤 Listening... Speak now!');
            }
          }, 2000);
        } else {
          setStatus('🎤 Listening... (No speech detected)');
        }
      } else {
        const error = await response.json();
        console.error('Transcription error:', error);
        setStatus(`❌ Transcription failed (${processingTime}ms)`);
      }
    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error('Network error:', error);
      setStatus(`❌ Network error (${processingTime}ms)`);
    } finally {
      setProcessingQueue(prev => Math.max(0, prev - 1));
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setLiveInput('');
  };

  const disconnectFromAssemblyAI = async () => {
    try {
      setStatus('Disconnecting...');

      // Stop recording if active
      if (isRecording) {
        stopRecording();
      }

      const response = await fetch('/api/assemblyai-transcribe', {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsConnected(false);
        setStatus('Disconnected from AssemblyAI');
      } else {
        const error = await response.json();
        setStatus(`❌ Disconnect error: ${error.error}`);
      }
    } catch (error) {
      setStatus(`❌ Disconnect error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Keep input field focused during recording
  useEffect(() => {
    if (isRecording && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRecording, liveInput]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (mediaRecorderRef.current) {
        // Clear any running intervals
        if (mediaRecorderRef.current.chunkInterval) {
          clearInterval(mediaRecorderRef.current.chunkInterval);
        }
        if (mediaRecorderRef.current.dataInterval) {
          clearInterval(mediaRecorderRef.current.dataInterval);
        }
        if (isRecording) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, [isRecording]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AssemblyAI Real-time Transcription</h2>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-2">
          {!isConnected && (
            <button
              onClick={connectToAssemblyAI}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Connect to AssemblyAI
            </button>
          )}

          {isConnected && (
            <button
              onClick={disconnectFromAssemblyAI}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          )}

          {isConnected && !isRecording && (
            <button
              onClick={startRecording}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              🎤 Start Recording
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ⏹️ Stop Recording
            </button>
          )}

          <button
            onClick={clearTranscript}
            disabled={!transcript}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Clear Transcript
          </button>
        </div>

        {/* Status */}
        <div className="p-3 bg-gray-50 rounded border">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Status:</p>
            {processingQueue > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-600 font-medium">
                  Processing ({processingQueue})
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{status}</p>
        </div>

        {/* Real-time Input Field */}
        <div className="p-4 bg-green-50 rounded border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Real-time Input:</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>⌨️ Live typing</span>
              <span>•</span>
              <span>🎤 Voice input</span>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={liveInput}
            onChange={(e) => {
              setLiveInput(e.target.value);
              // Sync manual edits back to transcript
              setTranscript(e.target.value);
            }}
            placeholder="Speak or type here - text appears in real-time..."
            className="w-full p-3 bg-white rounded border text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={!isConnected}
          />
          {isRecording && (
            <div className="mt-2 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>🎤 Listening</span>
              </div>
              {processingQueue > 0 && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Transcribing ({processingQueue})</span>
                </div>
              )}
              <div className="text-green-600">
                <span>✏️ Text appears instantly</span>
              </div>
            </div>
          )}
        </div>

        {/* Transcript */}
        <div className="p-4 bg-blue-50 rounded border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Live Transcript:</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>⚡ Real-time</span>
              <span>•</span>
              <span>100ms chunks</span>
              <span>•</span>
              <span>Immediate</span>
            </div>
          </div>
          <div className="min-h-[100px] p-3 bg-white rounded border text-gray-800 text-sm leading-relaxed">
            {liveInput || transcript || 'Start recording to see live transcription...'}
            {isRecording && (
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded border">
          <p><strong>Instructions:</strong></p>
          <ol className="mt-1 ml-4 list-decimal">
            <li>Click &quot;Connect to AssemblyAI&quot; to establish connection</li>
            <li>Click &quot;Start Recording&quot; to begin microphone capture</li>
            <li><strong>Speak immediately</strong> - watch text appear in real-time in the input field</li>
            <li>You can also type manually in the input field</li>
            <li>See the live indicators: 🎤 Listening + 🔄 Transcribing + ✏️ Text appears instantly</li>
            <li>Click &quot;Stop Recording&quot; when done (recording stops automatically)</li>
            <li>Click &quot;Disconnect&quot; to close the AssemblyAI session</li>
          </ol>
          <p className="mt-2"><strong>Note:</strong> This provides <strong>ultra real-time transcription</strong> with 100ms chunks sent immediately. Text appears as you speak - no waiting for stop!</p>
        </div>
      </div>
    </div>
  );
}
