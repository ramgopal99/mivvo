'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

/** What the user picked: browser tab, window, or entire screen */
type DisplaySurface = 'browser' | 'window' | 'monitor' | string;

const DISPLAY_SURFACE_LABELS: Record<string, string> = {
  browser: 'Browser tab',
  window: 'Window',
  monitor: 'Entire screen',
  screen: 'Entire screen', // some browsers use "screen" instead of "monitor"
};

const ScreenShareTestPage = () => {
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [displaySurface, setDisplaySurface] = useState<DisplaySurface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (screenStream && videoRef.current) {
      videoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [screenStream]);

  const startScreenShare = async () => {
    setError(null);
    setDisplaySurface(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      const surface = (settings as MediaTrackSettings & { displaySurface?: string }).displaySurface;
      setDisplaySurface(surface ?? 'unknown');
      setScreenStream(stream);
      setIsSharing(true);

      videoTrack.addEventListener('ended', () => {
        stopScreenShare();
      });
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setError('Screen share was cancelled or denied.');
        } else {
          setError(err.message || 'Failed to share screen.');
        }
      } else {
        setError('Failed to start screen sharing.');
      }
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    setIsSharing(false);
    setDisplaySurface(null);
    setError(null);
  };

  const toggleScreenShare = () => {
    if (isSharing) stopScreenShare();
    else startScreenShare();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold">Screen Share Test</h1>
      <p className="text-muted-foreground text-center">
        Use the button below to share your screen. The shared content will appear in the video area.
      </p>

      <Button onClick={toggleScreenShare} variant={isSharing ? 'destructive' : 'default'} size="lg">
        {isSharing ? 'Stop sharing' : 'Share screen'}
      </Button>

      {displaySurface && (
        <div className="rounded-md bg-muted px-4 py-2 text-sm font-medium">
          User chose: <span className="text-foreground">{DISPLAY_SURFACE_LABELS[displaySurface] ?? displaySurface}</span>
          <span className="text-muted-foreground ml-1">(raw: {displaySurface})</span>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/15 text-destructive px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="w-full aspect-video max-h-[70vh] rounded-lg border bg-muted overflow-hidden flex items-center justify-center">
        {screenStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-muted-foreground">No screen shared yet</span>
        )}
      </div>

      {isSharing && (
        <p className="text-sm text-muted-foreground">
          Sharing active. Click &quot;Stop sharing&quot; or use the browser picker to stop.
        </p>
      )}
    </div>
  );
};

ScreenShareTestPage.displayName = 'ScreenShareTestPage';

export default ScreenShareTestPage;
