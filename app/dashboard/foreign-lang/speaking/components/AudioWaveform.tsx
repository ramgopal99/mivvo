import { useState, useEffect, useRef } from "react";
import type { AudioWaveformProps } from "../types";

function AudioWaveform({ isActive, analyser }: AudioWaveformProps) {
  const animationFrameRef = useRef<number | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setWaveformData([]);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    if (!analyser) {
      // Simulate waveform when no analyser (for TTS playback)
      const points = 60;
      let time = 0;

      const simulate = () => {
        const newWaveform: number[] = [];
        for (let i = 0; i < points; i++) {
          const position = (i / points) * 2 * Math.PI;
          // Create animated zigzag pattern
          const amplitude = 30 + Math.sin(time + position * 2) * 20;
          const value = Math.sin(position * 4 + time) * amplitude;
          newWaveform.push(value);
        }
        time += 0.1;
        setWaveformData(newWaveform);
        animationFrameRef.current = requestAnimationFrame(simulate);
      };

      simulate();
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const waveformArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyser) return;

      // Get time domain data for waveform
      analyser.getByteTimeDomainData(waveformArray);

      // Also get frequency data for volume
      analyser.getByteFrequencyData(dataArray);

      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const normalizedVolume = Math.min(average / 255, 1);

      // Create waveform data points (zigzag pattern based on actual audio)
      const points = 60;
      const newWaveform: number[] = [];
      const step = Math.floor(bufferLength / points);

      for (let i = 0; i < points; i++) {
        const index = i * step;
        // Normalize waveform data (0-255 to -40 to 40)
        const normalized = (waveformArray[index] - 128) / 128;
        // Scale based on volume
        const amplitude = normalized * 40 * (0.5 + normalizedVolume * 0.5);
        newWaveform.push(amplitude);
      }

      setWaveformData(newWaveform);
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isActive, analyser]);

  if (!isActive || waveformData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Ready...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 120"
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <polyline
          points={waveformData
            .map((value, index) => {
              const x = (index / (waveformData.length - 1)) * 600;
              const y = 60 + value; // Center at 60, adjust by value
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="url(#waveformGradient)"
          strokeWidth="3"
          className="text-primary"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export { AudioWaveform };
