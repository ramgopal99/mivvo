'use client'

import TextToSpeech from './components/text-to-speech'
import SpeechToText from '@/app/test2/components/speech-to-text'
import VoiceActivityDetector from './components/voice-activity-detector'
import LLM from './components/llm'
import CodeEditor from './components/CodeEditor'
import AssemblyAITest from './components/assemblyai-test'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bot, Code2, Activity, Mic } from 'lucide-react'

export default function Test2Page() {
  return (
    <Tabs defaultValue="assemblyai" className="max-w-6xl mx-auto">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="assemblyai">
          <Mic className="w-4 h-4 mr-2" />
          AssemblyAI Test
        </TabsTrigger>
        <TabsTrigger value="llm">
          <Bot className="w-4 h-4 mr-2" />
          Voice Chat
        </TabsTrigger>
        <TabsTrigger value="stt">
          Speech to Text
        </TabsTrigger>
        <TabsTrigger value="vad">
          <Activity className="w-4 h-4 mr-2" />
          Ultimate VAD
        </TabsTrigger>
        <TabsTrigger value="tts">
          Text to Speech
        </TabsTrigger>
        <TabsTrigger value="code-editor">
          <Code2 className="w-4 h-4 mr-2" />
          Code Editor
        </TabsTrigger>
      </TabsList>

      <TabsContent value="assemblyai" className="mt-6">
        <AssemblyAITest />
      </TabsContent>

      <TabsContent value="llm" className="mt-6">
        <LLM />
      </TabsContent>

      <TabsContent value="stt" className="mt-6">
        <SpeechToText />
      </TabsContent>

      <TabsContent value="vad" className="mt-6">
        <VoiceActivityDetector />
      </TabsContent>

      <TabsContent value="tts" className="mt-6">
        <TextToSpeech />
      </TabsContent>

      <TabsContent value="code-editor" className="mt-6">
        <CodeEditor />
      </TabsContent>
    </Tabs>
  )
}
