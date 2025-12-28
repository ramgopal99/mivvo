"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Brain } from 'lucide-react';
import { getChatResponse } from '../actions/chat';
// AI assistant configuration will be fetched dynamically

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
}

const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, onClose, language = 'python' }) => {
  const [assistantName, setAssistantName] = useState('Mivvo Assistant');
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
          const name = courseData.aiAssistantName || 'Mivvo Assistant';
          const description = courseData.aiAssistantDescription || 'Learning Assistant';

          setAssistantName(name);

          // Check demo mode for welcome message
          const isInDemoMode = window.location.pathname.includes('/demo');

          // Initialize with welcome message
          const welcomeMessage = isInDemoMode
            ? `Hello! I'm ${name}. Demo mode - responses may be basic. Ask me programming questions!`
            : `Hello! I'm ${name}, your ${description}. I can help you with programming questions, syntax, best practices, and more. What would you like to know?`;

          setMessages([{
            id: '1',
            text: welcomeMessage,
            sender: 'ai',
            timestamp: new Date(),
          }]);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

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

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Normal mode - call the AI service
        const response = await getChatResponse(userMessage.text, language);

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.success ? response.message! : response.error!,
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
          <span className="font-semibold">{assistantName}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
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
