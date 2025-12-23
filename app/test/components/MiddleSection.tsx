"use client";

import { MarkdownCompound } from '@/components/markdown-compound';
import MiddleBottom from './MiddleBottom';
import MCQModule, { MCQQuestion } from './MCQModule';
import CodeExercise from './CodeExercise';
import { Module, SubLesson, Exercise } from '../data/lessonsData';
import { useEffect, useRef } from 'react';

interface SelectedTopic {
  moduleId: number;
  subtopicId: string;
  title: string;
  moduleTitle: string;
}

interface MiddleSectionProps {
  modules: Module[];
  selectedTopic: SelectedTopic | null;
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
  language?: string;
}

// HTML entity decoder and markdown unescaper
const decodeHtmlEntities = (text: string): string => {
  if (!text) return text;

  if (typeof document === 'undefined') {
    // Server-side: use string replacement
    return text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#96;/g, '`')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#x60;/g, '`') // Hex encoded backtick
      .replace(/&#x27;/g, "'") // Hex encoded single quote
      .replace(/&#x22;/g, '"'); // Hex encoded double quote
  }
  // Client-side: use textarea method
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Unescape markdown backticks and other escaped characters
const unescapeMarkdown = (text: string): string => {
  if (!text) return text;

  // Unescape escaped backticks (\\` becomes `)
  // Unescape escaped backslashes (\\ becomes \)
  // Handle various escape patterns
  return text
    .replace(/\\`/g, '`')           // Escaped backtick
    .replace(/\\\*/g, '*')           // Escaped asterisk
    .replace(/\\#/g, '#')            // Escaped hash
    .replace(/\\\[/g, '[')           // Escaped bracket
    .replace(/\\\]/g, ']')           // Escaped bracket
    .replace(/\\\(/g, '(')           // Escaped parenthesis
    .replace(/\\\)/g, ')')           // Escaped parenthesis
    .replace(/\\\\/g, '\\')          // Escaped backslash (do this last)
    .replace(/\u0060/g, '`')        // Unicode backtick
    .replace(/\u2018/g, "'")         // Left single quotation mark
    .replace(/\u2019/g, "'")         // Right single quotation mark
    .replace(/\u201C/g, '"')         // Left double quotation mark
    .replace(/\u201D/g, '"');        // Right double quotation mark
};

// Convert literal escape sequences to actual characters
const convertEscapeSequences = (text: string): string => {
  if (!text) return text;
  
  // Convert literal escape sequences to actual characters
  // This handles cases where \n is stored as a literal string instead of a newline
  return text
    .replace(/\\n/g, '\n')           // Literal \n to actual newline
    .replace(/\\t/g, '\t')           // Literal \t to actual tab
    .replace(/\\r/g, '\r')           // Literal \r to actual carriage return
    .replace(/\\"/g, '"')            // Literal \" to actual double quote
    .replace(/\\'/g, "'")             // Literal \' to actual single quote
    .replace(/\\\\/g, '\\');         // Literal \\ to actual backslash (must be last)
};

// Helper function to parse MCQ questions from content
const parseMCQQuestions = (content: string): MCQQuestion[] => {
  const questions: MCQQuestion[] = [];
  const questionBlocks = content.split('---');
  
  questionBlocks.forEach((block, index) => {
    if (block.includes('**Question') && block.includes('**Answer:**')) {
      const lines = block.trim().split('\n').filter(line => line.trim());
      
      let questionText = '';
      const options: string[] = [];
      let correctAnswer = -1;
      let explanation = '';
      
      let currentSection = 'question';
      
      for (const line of lines) {
        if (line.startsWith('**Question')) {
          questionText = line.replace('**Question', '').replace('**', '').trim();
          currentSection = 'options';
        } else if (line.startsWith('**A)**') || line.startsWith('**B)**') || 
                   line.startsWith('**C)**') || line.startsWith('**D)**')) {
          const optionText = line.replace(/^\*\*[A-D]\)\*\*/, '').trim();
          options.push(optionText);
        } else if (line.startsWith('**Answer:**')) {
          const answerMatch = line.match(/\*\*Answer:\*\*\s*([A-D])/);
          if (answerMatch) {
            correctAnswer = answerMatch[1].charCodeAt(0) - 65; // Convert A-D to 0-3
          }
          currentSection = 'explanation';
        } else if (currentSection === 'explanation' && line.startsWith('**Explanation:**')) {
          explanation = line.replace('**Explanation:**', '').trim();
        }
      }
      
      if (questionText && options.length > 0 && correctAnswer >= 0) {
        questions.push({
          id: `q${index + 1}`,
          question: questionText,
          options,
          correctAnswer,
          explanation: explanation || undefined
        });
      }
    }
  });
  
  return questions;
};


const MiddleSection = ({ modules, selectedTopic, onPrevious, onNext, onAI, isChatOpen, onCloseChat, language }: MiddleSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever selectedTopic changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedTopic]);

  const renderContent = () => {
    if (!selectedTopic) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No topic selected</h3>
            <p>Select a subtopic from the sidebar to view its content</p>
          </div>
        </div>
      );
    }

    const currentModule = modules.find((m: Module) => m.id === selectedTopic.moduleId);
    const lesson = currentModule?.subLessons.find((s: SubLesson) => s.id === selectedTopic.subtopicId);
    const exercise = currentModule?.exercises.find((e: Exercise) => e.id === selectedTopic.subtopicId);
    
    if (lesson) {
      let content = lesson.content || `# ${selectedTopic.title}\n\nContent for this lesson is coming soon!`;

      // Process content for display (same as dashboard component)
      content = decodeHtmlEntities(content);
      content = unescapeMarkdown(content);
      content = convertEscapeSequences(content);
      content = content
        .replace(/\r\n/g, '\n')  // Normalize Windows line endings
        .replace(/\r/g, '\n')     // Normalize Mac line endings
        .replace(/\u200B/g, '')   // Remove zero-width spaces
        .replace(/\uFEFF/g, '');  // Remove BOM

      return (
        <MarkdownCompound
          size="lg"
          variant="rich"
          allowHtml={true}
        >
          {content}
        </MarkdownCompound>
      );
    } else if (exercise) {
      let content = exercise.content || `# ${selectedTopic.title}\n\nContent for this exercise is coming soon!`;

      // Check if it's a new MCQ exercise format
      if (exercise.type === 'mcq' && exercise.mcqQuestions) {
        return <MCQModule questions={exercise.mcqQuestions} title={selectedTopic.title} />;
      }

      // Check if it's an old MCQ exercise (backward compatibility)
      if (content.includes('**Question') && content.includes('**Answer:**')) {
        const questions = parseMCQQuestions(content);
        return <MCQModule questions={questions} title={selectedTopic.title} />;
      }

      // Check if it's a new code exercise format
      if (exercise.type === 'code' && exercise.codeQuestions) {
        return <CodeExercise
          title={selectedTopic.title}
          questions={exercise.codeQuestions}
        />;
      }

      // Process content for display (same as dashboard component)
      content = decodeHtmlEntities(content);
      content = unescapeMarkdown(content);
      content = convertEscapeSequences(content);
      content = content
        .replace(/\r\n/g, '\n')  // Normalize Windows line endings
        .replace(/\r/g, '\n')     // Normalize Mac line endings
        .replace(/\u200B/g, '')   // Remove zero-width spaces
        .replace(/\uFEFF/g, '');  // Remove BOM

      // Fallback to markdown for other content
      return (
        <MarkdownCompound
          size="lg"
          variant="rich"
          allowHtml={true}
        >
          {content}
        </MarkdownCompound>
      );
    } else {
      return (
        <MarkdownCompound
          size="lg"
          variant="rich"
          allowHtml={true}
        >
          {`# ${selectedTopic.title}\n\nContent for this item is coming soon!`}
        </MarkdownCompound>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        ref={scrollContainerRef}
        className="flex-1 p-6 overflow-auto scrollbar-hide"
      >
        <div className="space-y-4">
          {renderContent()}
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <MiddleBottom
        onPrevious={onPrevious}
        onNext={onNext}
        onAI={onAI}
        isChatOpen={isChatOpen}
        onCloseChat={onCloseChat}
        language={language}
      />
    </div>
  );
};

export default MiddleSection;
