'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'file';
    text?: string;
    puter_path?: string;
  }>;
}

interface ChatResponse {
  message: {
    content: string;
  };
}

interface ChatResponseChunk {
  text?: string;
}

export default function PuterAIChatDemo() {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-5-nano');
  const [availableModels, setAvailableModels] = useState<Array<{id: string, name?: string, provider: string}>>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [streamingMessageKey, setStreamingMessageKey] = useState(0);
  const [systemPrompt, setSystemPrompt] = useState('You are an English language assistant. Help users with English grammar, vocabulary, writing, speaking, and comprehension. Always respond in English and provide clear, helpful explanations.');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await window.puter.ai.listModels();
        setAvailableModels(models);
        console.log('Available models:', models);
      } catch (error) {
        console.error('Failed to fetch models:', error);
        // Fallback to some known working models
        setAvailableModels([
          { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'openai' },
          { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai' },
          { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'anthropic' },
        ]);
      } finally {
        setModelsLoading(false);
      }
    };

    fetchModels();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const chatOptions = {
        model: selectedModel,
        stream: true
      };

      // Prepare messages array with system prompt and user message
      const messages: ChatMessage[] = [];
      if (systemPrompt.trim()) {
        messages.push({ role: 'system', content: systemPrompt.trim() });
      }
      messages.push({ role: 'user', content: input });

      const response = await window.puter.ai.chat(messages, false, chatOptions);

      const assistantMessage = { role: 'assistant' as const, content: '' };
      setMessages(prev => [...prev, assistantMessage]);
      setStreaming(true);
      setCurrentStreamingMessage('');
      setStreamingMessageKey(prev => prev + 1);

      let accumulatedText = ''; // Local variable to accumulate text

      // Check if response is an AsyncIterable (streaming) or a ChatResponse (non-streaming)
      if (Symbol.asyncIterator in response) {
        for await (const part of response as AsyncIterable<ChatResponseChunk>) {
          if (part?.text) {
            accumulatedText += part.text; // Accumulate in local variable
            setCurrentStreamingMessage(accumulatedText); // Update state for UI
            setStreamingMessageKey(k => k + 1); // Force re-render
          }
        }
      } else {
        const chatResponse = response as ChatResponse;
        accumulatedText = chatResponse.message?.content || '';
        setCurrentStreamingMessage(accumulatedText);
        setStreamingMessageKey(prev => prev + 1);
      }

      // Update the final message with the complete response
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.content = accumulatedText;
        return newMessages;
      });

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      }]);
    } finally {
      setLoading(false);
      setStreaming(false);
      setCurrentStreamingMessage('');
      setStreamingMessageKey(0);
    }
  };


  const clearChat = () => {
    setMessages([]);
    setCurrentStreamingMessage('');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">English Assistant</h1>
          <p className="text-gray-600 mb-4">
            Get help with English grammar, vocabulary, writing, and speaking skills
          </p>


        </div>

        {/* System Prompt */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">System Prompt</h2>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Customize the English assistant's behavior..."
            disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-2">
            Define the English assistant&apos;s behavior and role. Leave empty for default English help.
          </p>
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">English Practice</h2>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Clear Chat
          </button>
          </div>

          <div className="h-96 overflow-y-auto border border-gray-200 rounded-md p-4 mb-4 space-y-4">
            {messages.length === 0 && !streaming && (
              <div className="text-center text-gray-500 py-8">
                Ask me anything about English! I can help with grammar, vocabulary, writing, and more.
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.role === 'system'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-xs font-medium mb-1 capitalize">{message.role}</div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}

            {streaming && (
              <div key={streamingMessageKey} className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
                  <div className="text-xs font-medium mb-1">assistant</div>
                  <div className="whitespace-pre-wrap">{currentStreamingMessage}</div>
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div className="flex-shrink-0">
              <label className="block text-xs font-medium text-gray-600 mb-1">Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                aria-label="AI Model Selection"
                disabled={loading || modelsLoading}
                className="w-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {modelsLoading ? (
                  <option>Loading models...</option>
                ) : availableModels.length > 0 ? (
                  availableModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name || model.id} ({model.provider})
                    </option>
                  ))
                ) : (
                  <option>No models available</option>
                )}
              </select>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about English grammar, vocabulary, writing..."
              disabled={loading}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
