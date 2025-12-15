"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Volume2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface ChatScenario {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
  vocabulary: string[];
  context?: string;
}

interface AIChatPracticeProps {
  scenario: ChatScenario;
  language: string;
  cefrLevel: string;
  onConversationUpdate?: (conversation: ChatMessage[]) => void;
}

// Maximum number of messages allowed in the chat (including both AI and user messages)
const MAX_MESSAGES = 6;

export function AIChatPractice({ scenario, language, cefrLevel, onConversationUpdate }: AIChatPracticeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: scenario.initialMessage,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Notify parent component of conversation updates
  useEffect(() => {
    if (onConversationUpdate) {
      onConversationUpdate(messages);
    }
  }, [messages, onConversationUpdate]);

  // Generate AI response using OpenAI API
  const generateAIResponse = async (userMessage: string, conversationHistory: ChatMessage[]): Promise<string> => {
    try {
      // Prepare conversation history for context
      const conversationContext = conversationHistory
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.message}`)
        .join('\n');

      const response = await fetch('/api/foreign-language/writing/chat-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          conversationHistory: conversationContext,
          scenario: {
            title: scenario.title,
            description: scenario.description,
            context: scenario.context,
            vocabulary: scenario.vocabulary
          },
          language: language.toUpperCase(),
          cefrLevel
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.response;
      } else {
        console.error('Failed to get AI response:', response.statusText);
        return "I'm sorry, I didn't understand that. Could you please try again?";
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm sorry, I'm having trouble responding right now. Could you please try again?";
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    // Check if adding the user message would exceed the limit
    // Allow user to send if messages.length + 1 <= MAX_MESSAGES
    if (messages.length + 1 > MAX_MESSAGES) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Check if we can still add AI response after user message
    const willExceedLimit = messages.length + 1 >= MAX_MESSAGES;

    if (!willExceedLimit) {
      setIsTyping(true);

      try {
        // Generate AI response using OpenAI
        const aiResponse = await generateAIResponse(userMessage.message, [...messages, userMessage]);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          message: aiResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Add a fallback message
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          message: "I'm sorry, I'm having trouble responding right now. Could you please try again?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          AI Chat Practice
        </Badge>
        <div>
          <h3 className="text-xl font-semibold">{scenario.title}</h3>
          <p className="text-sm text-muted-foreground">{scenario.description}</p>
        </div>
      </div>

      {/* Left and Right Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Left Side - Task */}
        <div className="flex flex-col">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Your Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your task is to buy pizza like this. Practice ordering food naturally in conversation!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Chat */}
        <div className="flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Conversation
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {messages.length}/{MAX_MESSAGES} messages
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                            onClick={() => speakMessage(msg.message)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-3 justify-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      messages.length >= MAX_MESSAGES
                        ? "Limit reached"
                        : `Type your message here... (Press Enter to send) - ${messages.length}/${MAX_MESSAGES} messages`
                    }
                    className="min-h-[60px] resize-none"
                    disabled={isTyping || messages.length >= MAX_MESSAGES}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping || messages.length >= MAX_MESSAGES}
                    className="self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}