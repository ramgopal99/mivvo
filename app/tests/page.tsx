'use client';

import { useState, useEffect } from 'react';

interface SpeechSettings {
  volume: number;
  rate: number;
  pitch: number;
  voice: SpeechSynthesisVoice | null;
  lang: string;
}

type Emotion = 'neutral' | 'happy' | 'sad' | 'angry' | 'excited';

interface EmotionPreset {
  name: string;
  volume: number;
  rate: number;
  pitch: number;
  emoji: string;
}

export default function TextToSpeech() {
  const [text, setText] = useState('Hello! This is an amazing demonstration of emotional speech synthesis! Try the different emotions... [pause] and use pauses like this for dramatic effect!');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');

  const emotionPresets: Record<Emotion, EmotionPreset> = {
    neutral: { name: 'Neutral', volume: 1, rate: 1, pitch: 1, emoji: '😐' },
    happy: { name: 'Happy', volume: 1.2, rate: 1.3, pitch: 1.4, emoji: '😊' },
    sad: { name: 'Sad', volume: 0.7, rate: 0.7, pitch: 0.6, emoji: '😢' },
    angry: { name: 'Angry', volume: 1.3, rate: 1.5, pitch: 0.7, emoji: '😠' },
    excited: { name: 'Excited', volume: 1.4, rate: 1.8, pitch: 1.6, emoji: '🤣' }
  };

  const emotionExamples: Record<Emotion, string[]> = {
    neutral: [
      "This is a normal, everyday voice.",
      "I'm speaking in a neutral tone.",
      "The weather is nice today."
    ],
    happy: [
      "I'm so happy to see you!",
      "What a wonderful day this is... Oh boy!",
      "I just won the lottery! [pause] Can you believe it?"
    ],
    sad: [
      "I'm feeling really sad today...",
      "I lost my favorite toy. [pause] I miss it so much.",
      "The rain makes me feel gloomy... — everything is so gray."
    ],
    angry: [
      "I'm furious about this situation!",
      "How dare youuuuu... This is completely unacceptable!",
      "You did WHAT? [pause] That's it, I'm done!"
    ],
    excited: [
      "Oh my gosh, this is amazing!",
      "I can't believe it! [pause] Haha! This is incredible!",
      "This is the best day ever! Hahaha! — I'm so excited!"
    ]
  };

  const [settings, setSettings] = useState<SpeechSettings>({
    volume: 1,
    rate: 1,
    pitch: 1,
    voice: null,
    lang: 'en-US'
  });

  // Load available voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice if not already set
      if (!settings.voice && availableVoices.length > 0) {
        const defaultVoice = availableVoices.find(voice =>
          voice.lang.startsWith('en') && (voice.name.includes('Google') || voice.default)
        ) || availableVoices[0];

        setSettings(prev => ({ ...prev, voice: defaultVoice }));
      }
    };

    loadVoices();
    // Some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [settings.voice]);

  const speak = () => {
    if (!text.trim()) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Check if text contains pause markers
    const pauseMarkers = ['...', '[pause]', '[PAUSE]', '—', '–'];
    const hasPauses = pauseMarkers.some(marker => text.includes(marker));

    if (hasPauses) {
      // Handle text with pauses
      speakWithPauses(text);
    } else {
      // Normal speech without pauses
      const utterance = new SpeechSynthesisUtterance(text);

      // Apply all speech settings
      utterance.volume = settings.volume; // 0 to 1 (loudness)
      utterance.rate = settings.rate;     // 0.1 to 10 (speed)
      utterance.pitch = settings.pitch;   // 0 to 2 (tone)
      utterance.lang = settings.lang;     // Language code
      utterance.voice = settings.voice;   // Selected voice

      // Event handlers
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onpause = () => setIsPaused(true);
      utterance.onresume = () => setIsPaused(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const speakWithPauses = (textWithPauses: string) => {
    // Split text by pause markers
    const parts = textWithPauses.split(/(\.\.\.|\[pause\]|\[PAUSE\]|—|–)/gi).filter(part => part.trim());

    let currentIndex = 0;
    let isCancelled = false;

    const speakNextPart = () => {
      if (currentIndex >= parts.length || isCancelled) {
        setIsSpeaking(false);
        setIsPaused(false);
        return;
      }

      const part = parts[currentIndex].trim();
      currentIndex++;

      // If it's a pause marker, wait before continuing
      if (part === '...' || part === '[pause]' || part === '[PAUSE]' || part === '—' || part === '–') {
        setTimeout(speakNextPart, 1500); // 1.5 second pause
        return;
      }

      // Skip empty parts
      if (!part) {
        speakNextPart();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(part);

      // Apply all speech settings
      utterance.volume = settings.volume;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.lang = settings.lang;
      utterance.voice = settings.voice;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        // Continue to next part after a brief pause
        setTimeout(speakNextPart, 300);
      };

      utterance.onpause = () => setIsPaused(true);
      utterance.onresume = () => setIsPaused(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    // Override the stop function to cancel sequential speech
    const originalStop = window.speechSynthesis.cancel;
    window.speechSynthesis.cancel = () => {
      isCancelled = true;
      originalStop.call(window.speechSynthesis);
    };

    // Start speaking the first part
    speakNextPart();
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const updateSetting = <K extends keyof SpeechSettings>(
    key: K,
    value: SpeechSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyEmotion = (emotion: Emotion) => {
    const preset = emotionPresets[emotion];
    setSettings(prev => ({
      ...prev,
      volume: preset.volume,
      rate: preset.rate,
      pitch: preset.pitch
    }));
    setCurrentEmotion(emotion);
  };

  const applyEmotionWithExample = (emotion: Emotion, exampleIndex: number = 0) => {
    const preset = emotionPresets[emotion];
    const exampleText = emotionExamples[emotion][exampleIndex];

    setSettings(prev => ({
      ...prev,
      volume: preset.volume,
      rate: preset.rate,
      pitch: preset.pitch
    }));
    setCurrentEmotion(emotion);
    setText(exampleText);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🎭 Emotional Text-to-Speech Synthesis
        </h1>

        {/* Text Input */}
        <div className="mb-8">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Text to speak:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here... Use ... or [pause] for dramatic pauses!"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            rows={4}
          />
        </div>

        {/* Speech Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Volume Control */}
          <div className="space-y-2">
            <label htmlFor="volume-control" className="block text-sm font-medium text-gray-700">
              Volume: {Math.round(settings.volume * 100)}%
            </label>
            <input
              id="volume-control"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label={`Volume: ${Math.round(settings.volume * 100)}%`}
            />
            <div className="text-xs text-gray-500">0% (silent) to 100% (full volume)</div>
          </div>

          {/* Rate Control */}
          <div className="space-y-2">
            <label htmlFor="rate-control" className="block text-sm font-medium text-gray-700">
              Rate (Speed): {settings.rate}x
            </label>
            <input
              id="rate-control"
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={settings.rate}
              onChange={(e) => updateSetting('rate', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label={`Speech rate: ${settings.rate}x`}
            />
            <div className="text-xs text-gray-500">0.1x (very slow) to 10x (very fast)</div>
          </div>

          {/* Pitch Control */}
          <div className="space-y-2">
            <label htmlFor="pitch-control" className="block text-sm font-medium text-gray-700">
              Pitch: {settings.pitch}
            </label>
            <input
              id="pitch-control"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => updateSetting('pitch', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label={`Speech pitch: ${settings.pitch}`}
            />
            <div className="text-xs text-gray-500">0 (lowest) to 2 (highest)</div>
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700">
              Voice:
            </label>
            <select
              id="voice-select"
              value={settings.voice?.voiceURI || ''}
              onChange={(e) => {
                const selectedVoice = voices.find(voice => voice.voiceURI === e.target.value);
                updateSetting('voice', selectedVoice || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select speech voice"
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang}) {voice.default ? '- Default' : ''}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-500">{voices.length} voices available</div>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label htmlFor="lang-select" className="block text-sm font-medium text-gray-700">
              Language:
            </label>
            <select
              id="lang-select"
              value={settings.lang}
              onChange={(e) => updateSetting('lang', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select speech language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="es-US">Spanish (US)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="it-IT">Italian</option>
              <option value="pt-BR">Portuguese (Brazil)</option>
              <option value="ja-JP">Japanese</option>
              <option value="ko-KR">Korean</option>
              <option value="zh-CN">Chinese (Mandarin)</option>
              <option value="ru-RU">Russian</option>
              <option value="ar-SA">Arabic</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>

          {/* Emotion Selection */}
          <div className="space-y-2 col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Emotion:
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(emotionPresets).map(([emotion, preset]) => (
                <button
                  key={emotion}
                  onClick={() => applyEmotion(emotion as Emotion)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    currentEmotion === emotion
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{preset.emoji}</span>
                  {preset.name}
                  {currentEmotion === emotion && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      Vol: {preset.volume.toFixed(1)} | Rate: {preset.rate.toFixed(1)} | Pitch: {preset.pitch.toFixed(1)}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Click emotion buttons to automatically adjust volume, rate, and pitch for emotional speech
            </div>
          </div>

          {/* Emotion Examples */}
          <div className="space-y-3 col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              📝 Try These Emotional Examples:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(emotionExamples).map(([emotion, examples]) => (
                <div key={emotion} className="bg-gray-50 p-3 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{emotionPresets[emotion as Emotion].emoji}</span>
                    <span className="font-medium text-sm text-gray-700 capitalize">
                      {emotionPresets[emotion as Emotion].name} Examples
                    </span>
                  </div>
                  <div className="space-y-2">
                    {examples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => applyEmotionWithExample(emotion as Emotion, index)}
                        className="w-full text-left p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm"
                        title={`Click to try this ${emotion} example`}
                      >
                        &ldquo;{example}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              Click any example text above to automatically apply the emotion settings and load that text
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={speak}
            disabled={!text.trim() || isSpeaking}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSpeaking ? (isPaused ? 'Speaking (Paused)' : 'Speaking...') : '🎵 Speak'}
          </button>

          {isSpeaking && !isPaused && (
            <button
              onClick={pause}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium"
            >
              ⏸️ Pause
            </button>
          )}

          {isSpeaking && isPaused && (
            <button
              onClick={resume}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              ▶️ Resume
            </button>
          )}

          <button
            onClick={stop}
            disabled={!isSpeaking && !isPaused}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ⏹️ Stop
          </button>
        </div>

        {/* Emotion Presets Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">🎭 Emotion-Based Speech Synthesis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <div className="text-2xl mb-1">😐</div>
              <strong>Neutral:</strong><br />
              Volume: 1.0<br />
              Rate: 1.0<br />
              Pitch: 1.0
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-2xl mb-1">😊</div>
              <strong>Happy:</strong><br />
              Volume: 1.2<br />
              Rate: 1.3<br />
              Pitch: 1.4
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-2xl mb-1">😢</div>
              <strong>Sad:</strong><br />
              Volume: 0.7<br />
              Rate: 0.7<br />
              Pitch: 0.6
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-2xl mb-1">😠</div>
              <strong>Angry:</strong><br />
              Volume: 1.3<br />
              Rate: 1.5<br />
              Pitch: 0.7
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-2xl mb-1">🤣</div>
              <strong>Excited:</strong><br />
              Volume: 1.4<br />
              Rate: 1.8<br />
              Pitch: 1.6
            </div>
          </div>
        </div>

        {/* Pause Functionality Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">⏸️ Dramatic Pauses in Speech</h2>
          <div className="text-sm text-blue-700 mb-3">
            <p className="font-medium mb-2">Add pauses to your speech for dramatic effect:</p>
            <div className="bg-white p-3 rounded border space-y-2">
              <div><strong>Pause Markers:</strong></div>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>...</code> - Short dramatic pause (1.5 seconds)</li>
                <li><code>[pause]</code> or <code>[PAUSE]</code> - Explicit pause marker</li>
                <li><code>—</code> or <code>–</code> - Em dash pause (1.5 seconds)</li>
              </ul>
              <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                <strong>Example:</strong> &ldquo;How dare youuuuu... This is unacceptable!&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Available Properties Documentation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Speech Synthesis Properties Available:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">SpeechSynthesisUtterance Properties:</h3>
              <ul className="space-y-1 text-gray-600">
                <li><strong>text:</strong> The text to be spoken</li>
                <li><strong>lang:</strong> Language code (e.g., &ldquo;en-US&rdquo;, &ldquo;es-ES&rdquo;)</li>
                <li><strong>voice:</strong> Selected voice object</li>
                <li><strong>volume:</strong> 0-1 (0 = silent, 1 = full volume)</li>
                <li><strong>rate:</strong> 0.1-10 (speed multiplier) - affects emotion</li>
                <li><strong>pitch:</strong> 0-2 (tone: 0 = lowest, 1 = normal, 2 = highest) - affects emotion</li>
                <li><strong>voiceURI:</strong> Unique identifier for the voice</li>
              </ul>
              <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                <strong>💡 Emotion Tip:</strong> Combine rate, pitch, and volume to create emotional speech patterns. Happy speech uses higher pitch and faster rate, while sad speech uses lower pitch and slower rate.
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">SpeechSynthesis Methods:</h3>
              <ul className="space-y-1 text-gray-600">
                <li><strong>speak():</strong> Start speaking the utterance</li>
                <li><strong>cancel():</strong> Stop all speech immediately</li>
                <li><strong>pause():</strong> Pause current speech</li>
                <li><strong>resume():</strong> Resume paused speech</li>
                <li><strong>getVoices():</strong> Get available voices</li>
              </ul>

              <h3 className="font-medium text-gray-700 mb-2 mt-4">Voice Properties:</h3>
              <ul className="space-y-1 text-gray-600">
                <li><strong>name:</strong> Display name of the voice</li>
                <li><strong>lang:</strong> Language code</li>
                <li><strong>default:</strong> Whether it&apos;s the default voice</li>
                <li><strong>voiceURI:</strong> Unique identifier</li>
                <li><strong>localService:</strong> Local vs remote voice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
