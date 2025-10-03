/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Code2, Send, Lightbulb, RotateCcw, Volume2, VolumeX, Mic, MicOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { analyzeCode } from '../actions'
import { SAMPLE_QUESTIONS } from '../sample-questions'

// Use the built-in Web Speech API types

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((event: Event) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: ((event: Event) => void) | null
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor
    webkitSpeechRecognition: SpeechRecognitionConstructor
  }
}

interface CodeAnalysis {
  errors: Array<{
    line: number
    column: number
    message: string
    severity: 'error' | 'warning' | 'info'
  }>
  suggestions: string[]
  overall_feedback: string
  language: string
}

interface SampleQuestion {
  title: string
  description: string
  starterCode: string
}

export default function CodeEditor() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null)
  const [error, setError] = useState<string>('')
  const [sampleQuestions, setSampleQuestions] = useState<SampleQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<SampleQuestion | null>(null)

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [speechRate, setSpeechRate] = useState<number>(0.9)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [lastSpokenText, setLastSpokenText] = useState<string>('')
  const [autoListenEnabled, setAutoListenEnabled] = useState<boolean>(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const startListeningRef = useRef<(() => void) | null>(null)
  const isListeningRef = useRef<boolean>(false)

  // Load sample questions when language changes
  useEffect(() => {
    const questions = SAMPLE_QUESTIONS[language as keyof typeof SAMPLE_QUESTIONS] || []
    setSampleQuestions(questions)
  }, [language])

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech synthesis
      if (window.speechSynthesis) {
        // Load available voices
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices()
          setAvailableVoices(voices)
          // Set default voice if available
          if (voices.length > 0 && !selectedVoice) {
            setSelectedVoice(voices[0].voiceURI)
          }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
      }

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = true
        recognitionInstance.lang = 'en-US'

        recognitionInstance.onstart = () => {
          console.log('Speech recognition started')
          setIsListening(true)
          isListeningRef.current = true
        }

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim()
          console.log('Voice recognition result:', transcript, 'isFinal:', event.results[event.resultIndex].isFinal)
          
          if (event.results[event.resultIndex].isFinal) {
            console.log('Processing final transcript:', transcript)
            
            // Natural language understanding for analysis intent
            const analysisIntent = [
              // Direct completion words
              'done', 'finished', 'complete', 'ready',
              // Submission intent
              'submit', 'turn in', 'hand in', 'send',
              // Analysis intent
              'analyze', 'check', 'review', 'evaluate', 'test',
              // Natural completion phrases
              'i want to submit', 'i mean to complete', 'i want to finish',
              'ready to submit', 'done with this', 'finished this',
              'complete my answer', 'submit my answer', 'turn in my work',
              'check my code', 'analyze my code', 'review my code',
              'i think i\'m done', 'i believe i\'m finished', 'i want to check',
              'let me submit', 'time to submit', 'ready to turn in',
              'i want to see', 'show me results', 'give me feedback'
            ]
            
            // Natural language understanding for help intent
            const helpIntent = [
              // Direct help words
              'help', 'assist', 'guide', 'explain', 'clarify',
              // Question words
              'what', 'how', 'why', 'when', 'where', 'which',
              // Understanding intent
              'understand', 'confused', 'stuck', 'lost', 'don\'t know',
              'explain this', 'help me understand', 'what should i do',
              'how do i', 'can you help', 'i need help', 'i\'m stuck',
              'i don\'t understand', 'what does this mean', 'how does this work',
              'give me a hint', 'any tips', 'suggestions', 'advice',
              'walk me through', 'show me how', 'teach me'
            ]
            
            const shouldAnalyze = analysisIntent.some(intent => transcript.includes(intent))
            const shouldHelp = helpIntent.some(intent => transcript.includes(intent))
            
            if (shouldAnalyze) {
              console.log('Triggering analysis from voice command:', transcript)
              // User wants to submit/analyze - trigger analysis
              setTimeout(() => {
                const event = new CustomEvent('triggerAnalysis')
                window.dispatchEvent(event)
              }, 100)
            } else if (shouldHelp) {
              console.log('Triggering question help from voice command:', transcript)
              // User asked for help about the question - provide help
              setTimeout(() => {
                const event = new CustomEvent('askQuestion', { detail: { transcript, currentQuestion } })
                window.dispatchEvent(event)
              }, 100)
            } else {
              console.log('Voice command not recognized:', transcript)
              // If user said something but we don't understand, provide natural guidance
              if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel()
                const utterance = new SpeechSynthesisUtterance("I'm not sure what you meant. You can ask me for help with the question, or let me know when you're ready to check your code.")
                utterance.rate = speechRate
                utterance.pitch = 1
                utterance.volume = 1
                utterance.lang = 'en-US'
                window.speechSynthesis.speak(utterance)
              }
            }
          }
        }

        recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.log('Speech recognition event:', event.error)
          
          // Handle different error types
          switch (event.error) {
            case 'no-speech':
              // This is normal - just restart listening after a short delay if auto-listen is enabled
              if (autoListenEnabled) {
                console.log('No speech detected, restarting in 0.1 seconds...')
                setTimeout(() => {
                  if (!isAnalyzing && !isListeningRef.current && startListeningRef.current) {
                    startListeningRef.current()
                  }
                }, 100)
              } else {
                console.log('No speech detected, but auto-listen not enabled')
              }
              return
              break
            case 'audio-capture':
              console.error('Audio capture failed. Please check your microphone.')
              setIsListening(false)
              isListeningRef.current = false
              break
            case 'not-allowed':
              console.error('Microphone access denied. Please allow microphone access.')
              setIsListening(false)
              isListeningRef.current = false
              break
            case 'network':
              console.error('Network error. Check your internet connection.')
              setIsListening(false)
              isListeningRef.current = false
              break
            case 'service-not-allowed':
              console.error('Speech recognition service is not available in your region.')
              setIsListening(false)
              isListeningRef.current = false
              break
            default:
              console.log('Speech recognition error:', event.error)
              // For other errors, just restart after a delay if auto-listen is enabled
              if (autoListenEnabled) {
                setTimeout(() => {
                  if (!isAnalyzing && !isListeningRef.current && startListeningRef.current) {
                    startListeningRef.current()
                  }
                }, 1000)
              }
          }
        }

            recognitionInstance.onend = () => {
              console.log('Speech recognition ended')
              setIsListening(false)
              isListeningRef.current = false
              // Auto-restart listening after a short delay if auto-listen is enabled and not analyzing
              if (autoListenEnabled) {
                setTimeout(() => {
                  if (!isAnalyzing && !isListeningRef.current && startListeningRef.current && code.trim()) {
                    console.log('Auto-restarting speech recognition...')
                    startListeningRef.current()
                  }
                }, 1000)
              }
            }

        setRecognition(recognitionInstance)
        recognitionRef.current = recognitionInstance
      }
    }
  }, [selectedVoice, autoListenEnabled, isAnalyzing, code, currentQuestion])

  // Listen for voice-triggered analysis
  useEffect(() => {
    const handleTriggerAnalysis = () => {
      console.log('handleTriggerAnalysis called')
      if (!code.trim()) {
        setError('Please enter some code to analyze')
        return
      }

      setIsAnalyzing(true)
      setError('')
      setAnalysis(null)

      const analyzeCodeAsync = async () => {
        try {
          // Speak analysis start message
          if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance("Analyzing your code now. Please wait a moment.")
            utterance.rate = speechRate
            utterance.pitch = 1
            utterance.volume = 1
            utterance.lang = 'en-US'
            window.speechSynthesis.speak(utterance)
          }

          const result = await analyzeCode(code, language, currentQuestion)
          setAnalysis(result)

          // Speak the overall feedback if TTS is enabled
          if (result.overall_feedback && ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
            // Small delay to ensure the analysis state is updated first
            setTimeout(() => {
              window.speechSynthesis.cancel()
              const utterance = new SpeechSynthesisUtterance(result.overall_feedback)
              utterance.rate = speechRate
              utterance.pitch = 1
              utterance.volume = 1
              utterance.lang = 'en-US'
              window.speechSynthesis.speak(utterance)
            }, 100)
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred while analyzing code')
          if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance("Sorry, there was an error analyzing your code. Please try again.")
            utterance.rate = speechRate
            utterance.pitch = 1
            utterance.volume = 1
            utterance.lang = 'en-US'
            window.speechSynthesis.speak(utterance)
          }
        } finally {
          setIsAnalyzing(false)
        }
      }

      analyzeCodeAsync()
    }

    const handleAskQuestion = (event: CustomEvent) => {
      console.log('handleAskQuestion called with:', event.detail)
      const { transcript, currentQuestion: question } = event.detail
      
      if (!question) {
        if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel()
          const utterance = new SpeechSynthesisUtterance("No question is currently loaded. Please select a sample question first.")
          utterance.rate = speechRate
          utterance.pitch = 1
          utterance.volume = 1
          utterance.lang = 'en-US'
          window.speechSynthesis.speak(utterance)
        }
        return
      }

      // Generate helpful response based on the question and what user asked
      let response = ""
      
      // More natural responses based on what the user actually said
      if (transcript.includes('what') || transcript.includes('explain') || transcript.includes('understand')) {
        response = `The question "${question.title}" is asking you to ${question.description.toLowerCase()}. This is a ${language} programming problem. Let me break it down for you step by step.`
      } else if (transcript.includes('how') || transcript.includes('solve') || transcript.includes('approach')) {
        response = `To solve "${question.title}", you need to ${question.description.toLowerCase()}. Let me guide you through this step by step.`
      } else if (transcript.includes('hint') || transcript.includes('tip') || transcript.includes('suggestion')) {
        response = `Here's a helpful hint for "${question.title}": ${question.description}. Let me give you some step-by-step guidance.`
      } else if (transcript.includes('help') || transcript.includes('stuck') || transcript.includes('confused') || transcript.includes('give answer')) {
        response = `I'll help you solve "${question.title}" step by step. The task is to ${question.description.toLowerCase()}. Let me walk you through it.`
      } else if (transcript.includes('question') || transcript.includes('problem')) {
        response = `You're working on "${question.title}". The problem is: ${question.description}. This is a ${language} coding challenge. Let me help you solve it step by step.`
      } else {
        response = `I heard you ask about the question. You're working on "${question.title}": ${question.description}. Let me help you solve this ${language} problem step by step.`
      }

      // Add detailed step-by-step guidance based on the specific question
      if (question.title.toLowerCase().includes('calculator') || question.title.toLowerCase().includes('add')) {
        response += ` Here's the detailed solution: Step 1, your function already has parameters 'a' and 'b'. Step 2, inside the function, add 'a' plus 'b' using the plus operator. Step 3, use the return keyword to send back the result. Step 4, the console.log will test it with 5 and 3, which should give you 8. The complete line should be: return a plus b.`
      } else if (question.title.toLowerCase().includes('filter') || question.title.toLowerCase().includes('even')) {
        response += ` Here's the detailed approach: Step 1, your function takes an array parameter called 'arr'. Step 2, use 'arr.filter' to create a new array. Step 3, inside filter, write a function that checks if each number is even using 'number percent 2 equals equals 0'. Step 4, return the filtered result. The complete line should be: return arr.filter(number => number percent 2 equals equals 0).`
      } else if (question.title.toLowerCase().includes('reverse') || question.title.toLowerCase().includes('string')) {
        response += ` Here's how to reverse a string: Step 1, use 'str.split' with empty quotes to split into characters. Step 2, add '.reverse' to reverse the array. Step 3, add '.join' with empty quotes to join back into a string. Step 4, return the result. The complete line should be: return str.split('').reverse().join('').`
      } else if (question.title.toLowerCase().includes('squares') || question.title.toLowerCase().includes('comprehension')) {
        response += ` Here's the list comprehension solution: Step 1, you have a numbers array. Step 2, use square brackets for the new list. Step 3, write 'x star star 2' for each x in numbers. Step 4, assign to squares variable. The complete line should be: squares equals [x star star 2 for x in numbers].`
      } else if (question.title.toLowerCase().includes('hello') || question.title.toLowerCase().includes('greet')) {
        response += ` Here's the greeting function: Step 1, you have a function called greet with name parameter. Step 2, create a greeting message using f-string: f'Hello, {name} exclamation mark'. Step 3, return the message. The complete line should be: return f'Hello, {name}!'`
      } else if (question.title.toLowerCase().includes('factorial')) {
        response += ` Here's the factorial solution: Step 1, check if n is less than or equal to 1, return 1. Step 2, otherwise return n times factorial of n minus 1. The complete code should be: if n less than or equal to 1: return 1, else: return n times factorial(n minus 1).`
      }

      if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.rate = speechRate
        utterance.pitch = 1
        utterance.volume = 1
        utterance.lang = 'en-US'
        window.speechSynthesis.speak(utterance)
      }
    }

    window.addEventListener('triggerAnalysis', handleTriggerAnalysis)
    window.addEventListener('askQuestion', handleAskQuestion as EventListener)
    return () => {
      window.removeEventListener('triggerAnalysis', handleTriggerAnalysis)
      window.removeEventListener('askQuestion', handleAskQuestion as EventListener)
    }
  }, [code, language, currentQuestion, ttsEnabled, speechRate])


  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate
    utterance.pitch = 1
    utterance.volume = 1
    utterance.lang = 'en-US'

    // Set voice if selected
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [selectedVoice, speechRate, availableVoices, ttsEnabled])

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleAnalyzeCode = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setAnalysis(null)

    try {
      // Speak analysis start message
      if (ttsEnabled) {
        speakText("Analyzing your code now. Please wait a moment.")
      }

      const result = await analyzeCode(code, language, currentQuestion)
      setAnalysis(result)

      // Speak the overall feedback if TTS is enabled
      if (result.overall_feedback && ttsEnabled) {
        // Small delay to ensure the analysis state is updated first
        setTimeout(() => {
          speakText(result.overall_feedback)
        }, 100)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing code')
      if (ttsEnabled) {
        speakText("Sorry, there was an error analyzing your code. Please try again.")
      }
    } finally {
      setIsAnalyzing(false)
    }
  }, [code, language, currentQuestion, ttsEnabled, speakText])

  const loadSampleQuestion = (question: SampleQuestion) => {
    setCode(question.starterCode)
    setCurrentQuestion(question)
    setError('')
    setAnalysis(null)
  }

  const clearCode = () => {
    setCode('')
    setCurrentQuestion(null)
    setError('')
    setAnalysis(null)
    setLastSpokenText('')
  }

  const startListening = useCallback(async () => {
    console.log('startListening called, recognitionRef.current:', !!recognitionRef.current, 'isListening:', isListening)
    if (!recognitionRef.current || isListening) return

    try {
      setError('') // Clear any previous errors
      console.log('Requesting microphone access...')
      await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('Microphone access granted, starting recognition...')
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }, [isListening])

  // Update the refs whenever functions change
  useEffect(() => {
    startListeningRef.current = startListening
  }, [startListening])

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertCircle className="w-3 h-3" />
      case 'warning': return <AlertCircle className="w-3 h-3" />
      case 'info': return <CheckCircle className="w-3 h-3" />
      default: return <CheckCircle className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Code Editor & Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Write your code and get AI-powered analysis and feedback
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection and Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Language:</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={clearCode}
                variant="outline"
                size="sm"
                disabled={!code.trim()}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={ttsEnabled}
                  onChange={(e) => setTtsEnabled(e.target.checked)}
                  className="rounded"
                />
                <span>Enable Voice Feedback</span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoListenEnabled}
                  onChange={(e) => setAutoListenEnabled(e.target.checked)}
                  className="rounded"
                />
                <span>Auto-restart Voice Input</span>
              </label>

              {/* Voice Input Controls */}
              {!isListening ? (
                <Button
                  onClick={startListening}
                  variant="outline"
                  size="sm"
                  disabled={!recognition}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Input
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  variant="destructive"
                  size="sm"
                >
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Voice Input
                </Button>
              )}

              {/* TTS Controls */}
              {isSpeaking ? (
                <Button
                  onClick={stopSpeaking}
                  variant="outline"
                  size="sm"
                >
                  <VolumeX className="w-4 h-4 mr-2" />
                  Stop Speaking
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (analysis?.overall_feedback) {
                      speakText(analysis.overall_feedback)
                    } else if (lastSpokenText) {
                      speakText(lastSpokenText)
                    }
                  }}
                  disabled={!analysis?.overall_feedback && !lastSpokenText}
                  variant="outline"
                  size="sm"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Replay
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <label htmlFor="speech-rate" className="sr-only">Speech Rate</label>
              <span>Rate:</span>
              <input
                id="speech-rate"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-16"
                aria-label="Speech rate control"
              />
              <span>{speechRate}x</span>
            </div>
          </div>

          {/* Voice Status */}
          {isListening && (
            <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">🎤 Listening... Speak naturally!</p>
              <p className="text-sm text-red-600 mt-1">
                Ask for help or let me know when you&apos;re ready to check your code
              </p>
            </div>
          )}

          {/* Current Question Display */}
          {currentQuestion && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">
                    Current Question: {currentQuestion.title}
                  </h3>
                  <p className="text-sm text-blue-700 mb-2">
                    {currentQuestion.description}
                  </p>
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">
                    Solving this question
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-light"
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Sample Questions */}
          {sampleQuestions.length > 0 && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-sm">Try these sample questions:</span>
              </div>
              <div className="grid gap-2">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => loadSampleQuestion(question)}
                  >
                    <div>
                      <div className="font-medium text-sm">{question.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {question.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyzeCode}
              disabled={isAnalyzing || !code.trim()}
              className="px-8"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Code
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Code Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Feedback */}
            <div>
              <h3 className="font-semibold mb-2">Overall Feedback</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm">{analysis.overall_feedback}</p>
              </div>
            </div>

            {/* Errors and Issues */}
            {analysis.errors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Issues Found</h3>
                <div className="space-y-2">
                  {analysis.errors.map((error, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg ${getSeverityColor(error.severity)}`}
                    >
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(error.severity)}
                        <span className="text-sm font-medium">
                          Line {error.line}, Column {error.column}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {error.severity}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{error.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Suggestions</h3>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Issues */}
            {analysis.errors.length === 0 && analysis.suggestions.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold text-green-600 mb-2">Great Job!</h3>
                <p className="text-sm text-muted-foreground">
                  No errors or issues found in your code.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
