import { useRef, useCallback } from "react";

export function useAudioAnalysis() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const setupAudioAnalysis = useCallback(async () => {
    try {
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

      return analyser;
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
      throw error;
    }
  }, []);

  const cleanupAudioAnalysis = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
        audioContextRef.current = null;
      } catch (error) {
        console.warn("Error closing audio context:", error);
      }
    }
    analyserRef.current = null;
  }, []);

  return {
    analyser: analyserRef.current,
    setupAudioAnalysis,
    cleanupAudioAnalysis,
  };
}
