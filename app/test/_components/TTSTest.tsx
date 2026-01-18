'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getTTSService } from '../../dashboard/custominterview/_components/_meet_components/services/tts-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface TTSTestFormValues {
  text: string;
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
}

export function TTSTest() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const ttsServiceRef = useRef<ReturnType<typeof getTTSService> | null>(null);

  const form = useForm<TTSTestFormValues>({
    defaultValues: {
      text: 'Hello, this is a test of text-to-speech functionality.',
      voice: '',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
    },
  });

  const watchedValues = form.watch();

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Loaded voices:', voices.length, voices);
      if (voices.length > 0) {
        setAvailableVoices(voices);
        if (!form.getValues('voice')) {
          const defaultVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
          form.setValue('voice', defaultVoice.voiceURI);
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    const timeoutId1 = setTimeout(loadVoices, 100);
    const timeoutId2 = setTimeout(loadVoices, 500);
    const timeoutId3 = setTimeout(loadVoices, 1000);

    // Initialize TTS service
    ttsServiceRef.current = getTTSService(
      {
        voice: form.getValues('voice'),
        rate: form.getValues('rate'),
        pitch: form.getValues('pitch'),
        volume: form.getValues('volume'),
        language: 'en-US',
      },
      {
        onStart: () => {
          setIsSpeaking(true);
          setIsPaused(false);
          console.log('TTS started');
        },
        onEnd: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          console.log('TTS ended');
        },
        onPause: () => {
          setIsPaused(true);
          console.log('TTS paused');
        },
        onResume: () => {
          setIsPaused(false);
          console.log('TTS resumed');
        },
        onError: (error: string) => {
          setIsSpeaking(false);
          setIsPaused(false);
          console.error('TTS error:', error);
        },
      }
    );

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      if (ttsServiceRef.current) {
        ttsServiceRef.current.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update TTS config when form values change
  useEffect(() => {
    if (ttsServiceRef.current) {
      ttsServiceRef.current.updateConfig({
        voice: watchedValues.voice,
        rate: watchedValues.rate,
        pitch: watchedValues.pitch,
        volume: watchedValues.volume,
      });
    }
  }, [watchedValues.voice, watchedValues.rate, watchedValues.pitch, watchedValues.volume]);

  const handleSpeak = () => {
    const text = form.getValues('text');
    if (ttsServiceRef.current && text.trim()) {
      ttsServiceRef.current.speak(text);
    }
  };

  const handleStop = () => {
    if (ttsServiceRef.current) {
      ttsServiceRef.current.stop();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (ttsServiceRef.current) {
      if (isPaused) {
        ttsServiceRef.current.resume();
      } else {
        ttsServiceRef.current.pause();
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Text to Speak</CardTitle>
            <CardDescription>Enter the text you want to convert to speech</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter text to speak..."
                      className="min-h-24"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the text you want to convert to speech
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>Configure voice, rate, pitch, and volume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice ({availableVoices.length} available)</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={availableVoices.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a voice">
                          {availableVoices.find(v => v.voiceURI === field.value)?.name || 'Select a voice'}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {availableVoices.length === 0 && (
                    <FormDescription>
                      Loading voices... Please wait a moment.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate: {field.value.toFixed(1)}x</FormLabel>
                    <FormControl>
                      <Slider
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pitch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pitch: {field.value.toFixed(1)}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume: {Math.round(field.value * 100)}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant={isSpeaking ? 'destructive' : 'default'}
            onClick={isSpeaking ? handleStop : handleSpeak}
            disabled={!form.getValues('text').trim()}
            size="lg"
          >
            {isSpeaking ? 'Stop Speaking' : 'Speak'}
          </Button>
          {isSpeaking && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePause}
              size="lg"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Status: {isPaused ? 'Paused' : isSpeaking ? 'Speaking...' : 'Ready'}</p>
              <p>Available voices: {availableVoices.length}</p>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
