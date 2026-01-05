"use client";

import { MarkdownCompound } from '@/components/markdown-compound';
import MiddleBottom from './MiddleBottom';
import MCQModule, { MCQQuestion } from './MCQModule';
import CodeExercise, { CodeQuestion } from './CodeExercise';
import ChatBox from './ChatBox';
import { CourseTopic, CourseExercise, CourseMcqQuestion, CourseCodeQuestion } from '../data/lessonsData';
import { useEffect, useRef } from 'react';

interface SelectedTopic {
  moduleId: number;
  subtopicId: string;
  title: string;
  moduleTitle: string;
}

interface LegacyModule {
  order?: number;
  id?: number;
  subLessons?: Array<{ id: string; content?: string }>;
  topics?: Array<{ id: string; content?: string }>;
  exercises?: Array<{
    id: string;
    content?: string;
    type?: string;
    mcqQuestions?: CourseMcqQuestion[];
    codeQuestions?: CourseCodeQuestion[]
  }>;
}

interface MiddleSectionProps {
  modules?: unknown[]; // Optional for backward compatibility
  selectedTopic: SelectedTopic | null;
  selectedTopicData?: CourseTopic | null;
  selectedExerciseData?: CourseExercise | null;
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
  language?: string;
}

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

const MiddleSection = ({
  modules,
  selectedTopic,
  selectedTopicData,
  selectedExerciseData,
  onPrevious,
  onNext,
  onAI,
  isChatOpen,
  onCloseChat,
  language
}: MiddleSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever selectedTopic changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedTopic]);

  // Convert database MCQ questions to component format
  const convertMcqQuestions = (dbQuestions: CourseMcqQuestion[]): MCQQuestion[] => {
    return dbQuestions.map(q => ({
      id: q.id,
      question: decodeHtmlEntities(unescapeMarkdown(q.question)),
      options: q.options.map(option => decodeHtmlEntities(unescapeMarkdown(option))),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ? decodeHtmlEntities(unescapeMarkdown(q.explanation)) : undefined
    }));
  };

  // Convert database code questions to component format
  const convertCodeQuestions = (dbQuestions: CourseCodeQuestion[], lang?: string): CodeQuestion[] => {
    return dbQuestions.map(q => {
      let question = decodeHtmlEntities(unescapeMarkdown(q.question));
      let solution = decodeHtmlEntities(unescapeMarkdown(q.solution));
      
      // Convert escape sequences to actual characters
      question = convertEscapeSequences(question);
      solution = convertEscapeSequences(solution);
      
      return {
        id: q.id,
        question,
        solution,
        language: lang || undefined
      };
    });
  };

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

    // Use database data if available (preferred)
    if (selectedTopicData) {
      let content = selectedTopicData.content || `# ${selectedTopic.title}\n\nContent for this lesson is coming soon!`;

      // Decode HTML entities that might be in the content
      content = decodeHtmlEntities(content);
      
      // Unescape markdown characters (especially backticks)
      content = unescapeMarkdown(content);
      
      // Convert escape sequences to actual characters
      content = convertEscapeSequences(content);
      
      // Normalize line endings and remove any problematic characters
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
    }

    if (selectedExerciseData) {
      const exercise = selectedExerciseData;

      const content = exercise.content || `# ${selectedTopic.title}\n\nContent for this exercise is coming soon!`;

      // Check if it has MCQ questions (prioritize this over type check)
      if (exercise.mcqQuestions && exercise.mcqQuestions.length > 0) {
        const questions = convertMcqQuestions(exercise.mcqQuestions);
        return <MCQModule key={`${selectedTopic.moduleId}-${selectedTopic.subtopicId}`} questions={questions} title={selectedTopic.title} />;
      }

      // Check if it has CODE questions
      if (exercise.codeQuestions && exercise.codeQuestions.length > 0) {
        const questions = convertCodeQuestions(exercise.codeQuestions, language);
        return <CodeExercise
          title={selectedTopic.title}
          questions={questions}
        />;
      }

      // Fallback: Check type-based conditions (for backward compatibility)
      if (exercise.type === 'MCQ' && exercise.mcqQuestions && exercise.mcqQuestions.length > 0) {
        const questions = convertMcqQuestions(exercise.mcqQuestions);
        return <MCQModule key={`${selectedTopic.moduleId}-${selectedTopic.subtopicId}`} questions={questions} title={selectedTopic.title} />;
      }

      if (exercise.type === 'CODE' && exercise.codeQuestions && exercise.codeQuestions.length > 0) {
        const questions = convertCodeQuestions(exercise.codeQuestions, language);
        return <CodeExercise
          title={selectedTopic.title}
          questions={questions}
        />;
      }

      // Check if it's an old MCQ exercise format in content (backward compatibility)
      if (content.includes('**Question') && content.includes('**Answer:**')) {
        const questions = parseMCQQuestions(content);
        return <MCQModule key={`${selectedTopic.moduleId}-${selectedTopic.subtopicId}`} questions={questions} title={selectedTopic.title} />;
      }

      // If we have content, show it instead of the placeholder
      if (exercise.content && exercise.content.trim()) {
        // Decode HTML entities and unescape markdown
        let processedContent = decodeHtmlEntities(exercise.content);
        processedContent = unescapeMarkdown(processedContent);
        processedContent = convertEscapeSequences(processedContent);

        return (
          <MarkdownCompound
            size="lg"
            variant="rich"
            allowHtml={true}
          >
            {processedContent}
          </MarkdownCompound>
        );
      }

      // Final fallback with better message
      return (
        <MarkdownCompound
          size="lg"
          variant="rich"
          allowHtml={true}
        >
          {`# ${selectedTopic.title}\n\nThis exercise is currently being prepared. Check back soon!`}
        </MarkdownCompound>
      );
    }

    // Fallback: Try to find data from modules (backward compatibility)
    if (modules && modules.length > 0) {

      const currentModule = modules.find((m): m is LegacyModule => {
        const mod = m as LegacyModule;
        return (mod.order === selectedTopic.moduleId || mod.id === selectedTopic.moduleId);
      });

      if (currentModule) {
        const lesson = currentModule.subLessons?.find(s => s.id === selectedTopic.subtopicId) ||
                      currentModule.topics?.find(t => t.id === selectedTopic.subtopicId);
        const exercise = currentModule.exercises?.find(e => e.id === selectedTopic.subtopicId);
        
        if (lesson) {
          return (
            <MarkdownCompound
              size="lg"
              variant="rich"
              allowHtml={true}
            >
              {lesson.content || `# ${selectedTopic.title}\n\nContent for this lesson is coming soon!`}
            </MarkdownCompound>
          );
        } else if (exercise) {
          const content = exercise.content || `# ${selectedTopic.title}\n\nContent for this exercise is coming soon!`;

          // Check if it's a new MCQ exercise format
          if (exercise.type === 'mcq' && exercise.mcqQuestions && exercise.mcqQuestions.length > 0) {
            const questions = convertMcqQuestions(exercise.mcqQuestions);
            return <MCQModule key={`${selectedTopic.moduleId}-${selectedTopic.subtopicId}`} questions={questions} title={selectedTopic.title} />;
          }

          // Check if it's an old MCQ exercise (backward compatibility)
          if (content.includes('**Question') && content.includes('**Answer:**')) {
            const questions = parseMCQQuestions(content);
            return <MCQModule key={`${selectedTopic.moduleId}-${selectedTopic.subtopicId}`} questions={questions} title={selectedTopic.title} />;
          }

          // Check if it's a new code exercise format
          if (exercise.type === 'code' && exercise.codeQuestions && exercise.codeQuestions.length > 0) {
            const questions = convertCodeQuestions(exercise.codeQuestions, language);
            return <CodeExercise
              title={selectedTopic.title}
              questions={questions}
            />;
          }

          // Decode HTML entities and unescape markdown
          let processedContent = decodeHtmlEntities(content);
          processedContent = unescapeMarkdown(processedContent);
          processedContent = convertEscapeSequences(processedContent);

          // Fallback to markdown for other content
          return (
            <MarkdownCompound
              size="lg"
              variant="rich"
              allowHtml={true}
            >
              {processedContent}
            </MarkdownCompound>
          );
        }
      }
    }

    // Final fallback
    return (
      <MarkdownCompound
        size="lg"
        variant="rich"
        allowHtml={true}
      >
        {`# ${selectedTopic.title}\n\nContent for this item is coming soon!`}
      </MarkdownCompound>
    );
  };

  // Calculate if next navigation would be to a locked module (module order > 2)
  const isNextDisabled = (() => {
    if (!selectedTopic || !modules || !Array.isArray(modules)) return false;

    // Create a flat list of all navigable items (topics and exercises)
    const allItems: { moduleId: number; subtopicId: string }[] = [];
    modules.forEach((module) => {
      const mod = module as LegacyModule;
      // Add topics
      mod.topics?.forEach((topic: { id: string; content?: string }) => {
        allItems.push({
          moduleId: mod.order || mod.id || 0,
          subtopicId: topic.id
        });
      });
      // Add exercises
      mod.exercises?.forEach((exercise: { id: string; content?: string; type?: string; mcqQuestions?: CourseMcqQuestion[]; codeQuestions?: CourseCodeQuestion[] }) => {
        allItems.push({
          moduleId: mod.order || mod.id || 0,
          subtopicId: exercise.id
        });
      });
    });

    if (allItems.length === 0) return false;

    const currentIndex = allItems.findIndex(item =>
      item.moduleId === selectedTopic.moduleId &&
      item.subtopicId === selectedTopic.subtopicId
    );

    if (currentIndex === -1) return false;

    if (currentIndex < allItems.length - 1) {
      const nextItem = allItems[currentIndex + 1];
      // Disable next if it would navigate to a locked module (order > 2)
      return nextItem.moduleId > 2;
    } else {
      // At last item, check if wrapping to first would go to locked module
      return allItems[0].moduleId > 2;
    }
  })();

  return (
    <div className="h-full flex flex-col relative">
      {/* Floating Chat Box */}
      {isChatOpen && (
        <ChatBox
          isOpen={isChatOpen}
          onClose={onCloseChat || (() => {})}
          language={language}
        />
      )}

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
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default MiddleSection;
