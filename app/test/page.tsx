'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { STTTest } from './_components/STTTest';
import { TTSTest } from './_components/TTSTest';

type TabType = 'stt' | 'tts';

const TestPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stt');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <h1 className="text-2xl font-bold mb-4">Speech Test Page</h1>
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Speech Test Page</h1>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stt">STT (Speech-to-Text)</TabsTrigger>
          <TabsTrigger value="tts">TTS (Text-to-Speech)</TabsTrigger>
        </TabsList>

        <TabsContent value="stt" className="mt-6">
          <STTTest />
        </TabsContent>

        <TabsContent value="tts" className="mt-6">
          <TTSTest />
        </TabsContent>
      </Tabs>
    </div>
  );
};

TestPage.displayName = 'TestPage';

export default TestPage;