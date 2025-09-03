"use client"

import { useMemo, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Brain, Mic, MicOff } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Message } from "../../providers/meet-room-provider"
// AIAssistant type definition (removed dummy data dependency)
interface AIAssistant {
  id: string
  name: string
  avatar?: string
  role: string
  industry: string
  experienceLevel: string
  hasVoiceEnabled?: boolean
}

interface VoiceMessage {
  role: string
  text: string
  timestamp: string
}

type CombinedMessage = Message | (VoiceMessage & { id: string; content: string })

interface ChatProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  messages: Message[]
  assistant: AIAssistant | null
  voiceTranscript?: VoiceMessage[]
  isVoiceChatActive?: boolean
  onVoiceChatToggle?: () => void
}

export function Chat({ 
  isOpen, 
  onOpenChange, 
  messages, 
  assistant,
  voiceTranscript = [],
  isVoiceChatActive = false,
  onVoiceChatToggle
}: ChatProps) {
  const isMobile = useIsMobile()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Combine text and voice messages, sorted by timestamp with smart deduplication
  const combinedMessages = useMemo((): CombinedMessage[] => {
    const voiceMessages = voiceTranscript.map(vm => ({
      ...vm,
      id: `voice-${vm.timestamp}`,
      content: vm.text,
      timestamp: vm.timestamp,
      role: vm.role
    }))
    
    const allMessages = [
      ...messages,
      ...voiceMessages
    ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    
    // Group consecutive messages from the same role
    const groupedMessages = allMessages.reduce((groups, message, index) => {
      if (index === 0 || message.role !== allMessages[index - 1].role) {
        // Start a new group
        groups.push([message])
      } else {
        // Add to existing group
        groups[groups.length - 1].push(message)
      }
      return groups
    }, [] as CombinedMessage[][])
    
    // Combine grouped messages with deduplication
    const deduplicatedMessages = groupedMessages.map(group => {
      if (group.length === 1) {
        return group[0]
      }
      
      const messages = group.map(msg => 'text' in msg ? msg.text : msg.content)
      
      // Intelligent deduplication without hardcoded phrases
      let combinedText = messages[0] || ''
      
      for (let i = 1; i < messages.length; i++) {
        const currentMsg = messages[i]
        const prevMsg = messages[i - 1]
        
        // Strategy 1: Find exact suffix-prefix overlap
        let overlap = 0
        for (let j = 1; j <= Math.min(prevMsg.length, currentMsg.length); j++) {
          if (prevMsg.slice(-j) === currentMsg.slice(0, j)) {
            overlap = j
          }
        }
        
        // Strategy 2: Dynamic similarity detection
        let similarityScore = 0
        if (overlap === 0) {
          // Calculate similarity based on word overlap
          const prevWords = prevMsg.toLowerCase().split(/\s+/)
          const currentWords = currentMsg.toLowerCase().split(/\s+/)
          
          const commonWords = prevWords.filter(word => 
            currentWords.includes(word) && word.length > 2
          )
          
          // Calculate similarity percentage
          const totalWords = Math.max(prevWords.length, currentWords.length)
          similarityScore = commonWords.length / totalWords
        }
        
        // Strategy 3: Check for partial sentence overlap
        let partialOverlap = false
        if (overlap === 0 && similarityScore < 0.3) {
          // Look for partial sentence matches
          const sentences = currentMsg.split(/[.!?]+/)
          for (const sentence of sentences) {
            if (sentence.trim().length > 10 && prevMsg.includes(sentence.trim())) {
              partialOverlap = true
              break
            }
          }
        }
        
        // Apply intelligent deduplication
        if (overlap > 0) {
          // Use exact overlap
          combinedText += currentMsg.slice(overlap)
        } else if (similarityScore > 0.5 || partialOverlap) {
          // Skip highly similar or partially overlapping content
          continue
        } else {
          // No significant overlap, add with space
          combinedText += ' ' + currentMsg
        }
      }
      
      // Final cleanup
      const finalText = combinedText
        .replace(/\s+/g, ' ') // Multiple spaces to single space
        .trim()
      
      // Return the first message with combined content
      const firstMessage = group[0]
      if ('text' in firstMessage) {
        return {
          ...firstMessage,
          text: finalText,
          content: finalText
        }
      } else {
        return {
          ...firstMessage,
          content: finalText
        }
      }
    })
    
    return deduplicatedMessages
  }, [messages, voiceTranscript])

  // Auto-scroll to bottom when new messages arrive or chat opens
  useEffect(() => {
    if (scrollContainerRef.current && isOpen) {
      const scrollToBottom = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
        }
      }
      
      // Immediate scroll
      scrollToBottom()
      
      // Multiple delayed scrolls to ensure content is rendered and scrolled
      setTimeout(scrollToBottom, 50)
      setTimeout(scrollToBottom, 150)
      setTimeout(scrollToBottom, 300)
      setTimeout(scrollToBottom, 500)
    }
  }, [combinedMessages, isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={isMobile ? "h-[80vh]" : "w-[400px] p-0"}
      >
        <SheetTitle className="sr-only">Chat</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Chat</h2>
              <div className="flex items-center gap-2">
                {onVoiceChatToggle && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onVoiceChatToggle}
                    className={isVoiceChatActive ? "text-primary" : ""}
                  >
                    {isVoiceChatActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Custom scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d1d5db #f3f4f6'
            }}
          >
            <div className="p-4 space-y-4">
              {combinedMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Mic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-sm">Start a voice chat or send a message to begin</p>
                </div>
              ) : (
                combinedMessages.map((message) => {
                  // Type guard to determine message type
                  const isVoiceMessage = 'text' in message
                  const messageId = isVoiceMessage ? `voice-${message.timestamp}` : message.id
                  const messageContent = isVoiceMessage ? message.text : message.content
                  const isAssistant = message.role === 'assistant'

                  return (
                    <div 
                      key={messageId} 
                      className={`flex items-start gap-3 ${
                        isAssistant ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        {isAssistant ? (
                          <>
                            <AvatarImage src={assistant?.avatar || undefined} />
                            <AvatarFallback>
                              <Brain className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback>You</AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`flex flex-col gap-1 ${
                        isAssistant ? 'items-start' : 'items-end'
                      }`}>
                        <div className={`rounded-lg px-3 py-2 ${
                          isVoiceMessage 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'bg-muted'
                        }`}>
                          {isVoiceMessage && (
                            <div className="flex items-center gap-1 mb-1 text-xs text-primary">
                              <Mic className="h-3 w-3" />
                              <span>Voice Message</span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{messageContent}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* No input form - read-only chat */}
        </div>
      </SheetContent>
    </Sheet>
  )
} 