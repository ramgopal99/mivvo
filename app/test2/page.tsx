'use client'

import { useContext } from 'react'
import TextToSpeech from './components/text-to-speech'
import SpeechToText from '@/app/test2/components/speech-to-text'
import LLM from './components/llm'
import CodeEditor from './components/CodeEditor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Chrome, Monitor, Bot, Code2 } from 'lucide-react'
import { BrowserSupportContext } from './layout'

export default function Test2Page() {
  const { isSupported } = useContext(BrowserSupportContext)

  return (
    <Tabs defaultValue="llm" className="max-w-6xl mx-auto">
      <TabsList className={`grid w-full grid-cols-4 ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <TabsTrigger value="llm" disabled={!isSupported}>
          <Bot className="w-4 h-4 mr-2" />
          Voice Chat
        </TabsTrigger>
        <TabsTrigger value="stt" disabled={!isSupported}>
          Speech to Text
        </TabsTrigger>
        <TabsTrigger value="tts" disabled={!isSupported}>
          Text to Speech
        </TabsTrigger>
        <TabsTrigger value="code-editor">
          <Code2 className="w-4 h-4 mr-2" />
          Code Editor
        </TabsTrigger>
      </TabsList>

      <TabsContent value="llm" className="mt-6">
        {isSupported ? (
          <LLM />
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Feature Disabled</h3>
              <p className="text-muted-foreground">
                Voice Chat is only available in Chrome or Edge browsers.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="stt" className="mt-6">
        {isSupported ? (
          <SpeechToText />
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Feature Disabled</h3>
              <p className="text-muted-foreground">
                Speech to Text is only available in Chrome or Edge browsers.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="tts" className="mt-6">
        {isSupported ? (
          <TextToSpeech />
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Chrome className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Feature Disabled</h3>
              <p className="text-muted-foreground">
                Text to Speech is only available in Chrome or Edge browsers.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="code-editor" className="mt-6">
        <CodeEditor />
      </TabsContent>
    </Tabs>
  )
}
