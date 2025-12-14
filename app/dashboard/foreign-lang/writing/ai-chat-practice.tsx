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

interface PizzaScenario {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
  aiResponses: Record<string, string>;
  vocabulary: string[];
}

// Pizza ordering scenario data
const pizzaScenario: PizzaScenario = {
  id: "pizza-booking",
  title: "Pizza Ordering",
  description: "Practice ordering pizza at a restaurant",
  initialMessage: "Hello! Welcome to Mario's Pizza. How can I help you today?",
  aiResponses: {
    "hello": "Hi there! What would you like to order?",
    "hi": "Hello! What can I get for you today?",
    "pizza": "Great choice! What size would you like? Small, medium, or large?",
    "small": "Small pizza is $12.99. What toppings would you like?",
    "medium": "Medium pizza is $16.99. What toppings would you like?",
    "large": "Large pizza is $20.99. What toppings would you like?",
    "pepperoni": "Pepperoni is $2 extra. Would you like any other toppings?",
    "cheese": "Extra cheese is $1.50. Any other toppings?",
    "mushroom": "Mushrooms are $1.25. Any other toppings?",
    "delivery": "Delivery is $3.99. What's your address?",
    "pickup": "Pickup will be ready in 15 minutes. See you soon!",
    "bye": "Thank you for your order! Goodbye!",
    "thank": "You're welcome! Enjoy your pizza!"
  },
  vocabulary: ["pizza", "order", "size", "toppings", "pepperoni", "cheese", "mushrooms", "delivery", "pickup", "address"]
};

interface AIChatPracticeProps {
  scenario?: PizzaScenario;
}

export function AIChatPractice({ scenario = pizzaScenario }: AIChatPracticeProps) {
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

  // Simulate AI response based on keywords
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Check for specific keywords and return appropriate responses
    if (message.includes('hello') || message.includes('hi')) {
      return scenario.aiResponses.hello;
    }
    if (message.includes('pizza')) {
      return scenario.aiResponses.pizza;
    }
    if (message.includes('small')) {
      return scenario.aiResponses.small;
    }
    if (message.includes('medium')) {
      return scenario.aiResponses.medium;
    }
    if (message.includes('large')) {
      return scenario.aiResponses.large;
    }
    if (message.includes('pepperoni')) {
      return scenario.aiResponses.pepperoni;
    }
    if (message.includes('cheese')) {
      return scenario.aiResponses.cheese;
    }
    if (message.includes('mushroom')) {
      return scenario.aiResponses.mushroom;
    }
    if (message.includes('delivery')) {
      return scenario.aiResponses.delivery;
    }
    if (message.includes('pickup')) {
      return scenario.aiResponses.pickup;
    }
    if (message.includes('bye') || message.includes('goodbye')) {
      return scenario.aiResponses.bye;
    }
    if (message.includes('thank')) {
      return scenario.aiResponses.thank;
    }

    // Default responses for unrecognized input
    const defaultResponses = [
      "I'm sorry, I didn't understand that. Could you please repeat?",
      "Could you say that again please?",
      "I'm not sure what you mean. Can you clarify?",
      "Let me help you with your order. What would you like?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.message);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        message: scenario.initialMessage,
        timestamp: new Date()
      }
    ]);
    setCurrentMessage("");
    setIsTyping(false);
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
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Conversation
              </CardTitle>
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
                    placeholder="Type your message here... (Press Enter to send)"
                    className="min-h-[60px] resize-none"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping}
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