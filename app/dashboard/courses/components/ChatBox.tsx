"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Brain, Trash2 } from 'lucide-react';
import { getChatResponse } from '../actions/chat';
import { siteConfig, type AIProvider } from '@/config/site';
// AI assistant configuration will be fetched dynamically

// Puter AI types
declare global {
  interface Window {
    puter: {
      ai: {
        chat: {
          (prompt: string): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
          (prompt: string, options: ChatOptions): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
          (prompt: string, testMode: boolean, options?: ChatOptions): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
          (prompt: string, image: string | File | null, testMode?: boolean, options?: ChatOptions): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
          (prompt: string, imageURLs: string[], testMode?: boolean, options?: ChatOptions): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
          (messages: ChatMessage[], testMode?: boolean, options?: ChatOptions): Promise<ChatResponse | AsyncIterable<ChatResponseChunk>>;
        };
      };
    };
  }
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'file';
    text?: string;
    puter_path?: string;
  }>;
}

interface ChatOptions {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  tools?: Array<{
    type: string;
    function: {
      name: string;
      description: string;
      parameters: Record<string, unknown>;
      strict?: boolean;
    };
  }>;
  reasoning_effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
  text?: 'low' | 'medium' | 'high';
}

interface ChatResponse {
  message: {
    content: string;
  };
}

interface ChatResponseChunk {
  text?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  chatProvider?: AIProvider; // Optional override for site config
}

const CHAT_STORAGE_KEY = 'mivvo_chat_data';
const CHAT_EXPIRATION_HOURS = 1;

const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, onClose, language = 'python', chatProvider = siteConfig.aiProvider }) => {
  const [assistantPrompt, setAssistantPrompt] = useState('You are a helpful assistant. Provide clear and accurate information.');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if we're in demo mode
  useEffect(() => {
    setIsDemoMode(window.location.pathname.includes('/demo'));
  }, []);

  // Fetch assistant configuration
  useEffect(() => {
    const fetchAssistantConfig = async () => {
      try {
        const response = await fetch(`/api/courses/${language}`);
        if (response.ok) {
          const courseData = await response.json();
          const prompt = courseData.aiAssistantPrompt || 'You are a helpful assistant. Provide clear and accurate information.';

          setAssistantPrompt(prompt);

          // Check demo mode for welcome message
          const isInDemoMode = window.location.pathname.includes('/demo');

          // Initialize with welcome message only in demo mode
          if (isInDemoMode) {
            const welcomeMessage = `Hello! I'm Mivvo Assistant. Demo mode - ask me anything!`;
            setMessages([{
              id: '1',
              text: welcomeMessage,
              sender: 'ai',
              timestamp: new Date(),
            }]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch assistant config:', error);
        // Fallback to default
        setMessages([{
          id: '1',
          text: `Hello! I'm Mivvo Assistant, your Learning Assistant. I can help you with programming questions, syntax, best practices, and more. What would you like to know?`,
          sender: 'ai',
          timestamp: new Date(),
        }]);
      }
    };

    if (isOpen) {
      fetchAssistantConfig();
    }
  }, [language, isOpen]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const expirationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Chat persistence functions
  const saveChatToStorage = (chatMessages: Message[]) => {
    const chatData = {
      messages: chatMessages,
      timestamp: Date.now(),
      language: language,
    };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData));

    // Set expiration timer
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
    }
    expirationTimerRef.current = setTimeout(() => {
      clearChatFromStorage();
    }, CHAT_EXPIRATION_HOURS * 60 * 60 * 1000);
  };

  const loadChatFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) {
        const chatData = JSON.parse(stored);
        const now = Date.now();
        const timeDiff = now - chatData.timestamp;
        const expirationTime = CHAT_EXPIRATION_HOURS * 60 * 60 * 1000;

        if (timeDiff < expirationTime && chatData.language === language) {
          // Convert timestamp strings back to Date objects
          const messagesWithDates = chatData.messages.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);

          // Set remaining expiration timer
          const remainingTime = expirationTime - timeDiff;
          if (expirationTimerRef.current) {
            clearTimeout(expirationTimerRef.current);
          }
          expirationTimerRef.current = setTimeout(() => {
            clearChatFromStorage();
          }, remainingTime);
        } else {
          // Chat has expired
          clearChatFromStorage();
        }
      }
    } catch (error) {
      console.error('Error loading chat from storage:', error);
      clearChatFromStorage();
    }
  }, [language]);

  const clearChatFromStorage = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    setMessages([]);
    if (expirationTimerRef.current) {
      clearTimeout(expirationTimerRef.current);
      expirationTimerRef.current = null;
    }
  };

  const clearChat = () => {
    clearChatFromStorage();
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load chat from localStorage on mount and language change
  useEffect(() => {
    if (isOpen) {
      loadChatFromStorage();
    }
  }, [language, isOpen, loadChatFromStorage]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (expirationTimerRef.current) {
        clearTimeout(expirationTimerRef.current);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);
    saveChatToStorage(updatedMessages);

    try {
      if (isDemoMode) {
        // In demo mode, provide mock responses without API calls
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000)); // Simulate API delay

        const mockResponses = [
          "Great question! Demo mode gives basic guidance. Enroll for detailed answers.",
          "Good observation! Full course has specific examples and code.",
          "Important concept! Demo shows learning experience basics.",
          "Smart approach! Full course includes hands-on exercises.",
          "Nice question! Demo covers basics. Full course is in-depth.",
          "Best practices thinking! Full course covers industry standards.",
          "Interesting perspective! Demo explores basics, full course is comprehensive.",
          "Good thinking! Full course builds strong foundations.",
        ];

        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'ai',
          timestamp: new Date(),
        };

        const updatedMessagesWithAI = [...messages, userMessage, aiMessage];
        setMessages(updatedMessagesWithAI);
        saveChatToStorage(updatedMessagesWithAI);
      } else if (chatProvider === 'puter') {
        // Puter AI mode - use client-side Puter AI API
        const systemPrompt = `${assistantPrompt} Keep all responses under 100 words.`;

        const chatMessages: ChatMessage[] = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage.text }
        ];

        const chatOptions: ChatOptions = {
          model: 'gpt-4o',
          stream: true
        };

        const response = await window.puter.ai.chat(chatMessages, false, chatOptions);

        let accumulatedText = '';

        // Check if response is an AsyncIterable (streaming) or a ChatResponse (non-streaming)
        if (Symbol.asyncIterator in response) {
          for await (const part of response as AsyncIterable<ChatResponseChunk>) {
            if (part?.text) {
              accumulatedText += part.text;
            }
          }
        } else {
          const chatResponse = response as ChatResponse;
          accumulatedText = chatResponse.message?.content || 'Sorry, I couldn\'t generate a response.';
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: accumulatedText,
          sender: 'ai',
          timestamp: new Date(),
        };

        const updatedMessagesWithAI = [...messages, userMessage, aiMessage];
        setMessages(updatedMessagesWithAI);
        saveChatToStorage(updatedMessagesWithAI);
      } else {
        // OpenAI mode - call the existing AI service
        const response = await getChatResponse(userMessage.text, language);

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.success ? response.message! : response.error!,
          sender: 'ai',
          timestamp: new Date(),
        };

        const updatedMessagesWithAI = [...messages, userMessage, aiMessage];
        setMessages(updatedMessagesWithAI);
        saveChatToStorage(updatedMessagesWithAI);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      const updatedMessagesWithError = [...messages, userMessage, errorMessage];
      setMessages(updatedMessagesWithError);
      saveChatToStorage(updatedMessagesWithError);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[57px] left-0 w-96 max-w-md h-[320px] bg-background border-r border-t border-b rounded-tl-lg rounded-tr-lg shadow-lg flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-semibold">Mivvo Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="h-8 w-8 p-0"
            title="Clear chat history"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 break-words ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                    <span className="text-xs opacity-70">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
