'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { pythonTopics } from '../../dummy-data';
import { dummyCourses } from '../../dummy-data';

interface Topic {
  id: string;
  title: string;
  subtopics: string[];
  content?: Record<string, string>;
}

interface SelectedTopic {
  topicId: string;
  subtopicIndex: number;
}

interface CourseContextType {
  selectedTopic: SelectedTopic | null;
  selectedTopicData: Topic | null;
  selectedSubtopic: string | null;
  courseProgress: number;
  totalLectures: number;
  completedLectures: number;
  courseInfo: {
    id: string;
    name: string;
    title: string;
    description?: string;
    instructor?: string;
  };
  completionState: Record<string, boolean[]>;
  handleTopicSelect: (topicId: string, subtopicIndex: number) => void;
  toggleLectureCompletion: (topicId: string, lectureIndex: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Initialize completion state based on dummy data
const initializeCompletionState = () => {
  const completionState: Record<string, boolean[]> = {};
  pythonTopics.forEach((topic, topicIndex) => {
    completionState[topic.id] = topic.subtopics.map((_, subIndex) => {
      // Simulate completion: first 2 modules fully completed, 3rd module partially completed
      if (topicIndex < 2) return true;
      if (topicIndex === 2) return subIndex < Math.floor(topic.subtopics.length / 2);
      return false;
    });
  });
  return completionState;
};

interface CourseProviderProps {
  children: ReactNode;
  courseId?: string;
}

export function CourseProvider({ children, courseId }: CourseProviderProps) {
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [completionState, setCompletionState] = useState<Record<string, boolean[]>>(initializeCompletionState);

  const handleTopicSelect = (topicId: string, subtopicIndex: number) => {
    setSelectedTopic({ topicId, subtopicIndex });
  };

  const toggleLectureCompletion = (topicId: string, lectureIndex: number) => {
    setCompletionState(prev => ({
      ...prev,
      [topicId]: prev[topicId].map((completed, index) =>
        index === lectureIndex ? !completed : completed
      )
    }));
  };

  const selectedTopicData = selectedTopic
    ? pythonTopics.find(topic => topic.id === selectedTopic.topicId) || null
    : null;

  const selectedSubtopic = selectedTopicData && selectedTopic
    ? selectedTopicData.subtopics[selectedTopic.subtopicIndex]
    : null;

  // Calculate progress
  const totalLectures = pythonTopics.reduce((total, topic) => total + topic.subtopics.length, 0);
  const completedLectures = Object.values(completionState).reduce((total, module) =>
    total + module.filter(completed => completed).length, 0
  );
  const courseProgress = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

  // Get course information
  const foundCourse = courseId ? dummyCourses.find(course => course.id === courseId) : null;

  const courseInfo = foundCourse ? {
    id: foundCourse.id,
    name: foundCourse.title, // Map title to name for consistency
    title: foundCourse.title,
    description: foundCourse.description,
    instructor: foundCourse.instructor
  } : courseId ? {
    id: courseId,
    name: 'Course Not Found',
    title: 'Course Not Found',
    description: 'Course information not available',
    instructor: 'Unknown'
  } : {
    id: 'default',
    name: 'Python Programming Fundamentals',
    title: 'Python Programming Fundamentals',
    description: 'Learn Python programming fundamentals',
    instructor: 'Default Instructor'
  };

  return (
    <CourseContext.Provider
      value={{
        selectedTopic,
        selectedTopicData,
        selectedSubtopic,
        courseProgress,
        totalLectures,
        completedLectures,
        courseInfo,
        completionState,
        handleTopicSelect,
        toggleLectureCompletion,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

// Comprehensive Markdown Renderer
function renderMarkdown(markdown: string): string {
  return markdown
    // Headers (H1-H6)
    .replace(/^###### (.+)$/gm, '<h6 class="text-lg font-semibold mb-2 mt-6">$1</h6>')
    .replace(/^##### (.+)$/gm, '<h5 class="text-xl font-semibold mb-2 mt-6">$1</h5>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-2xl font-semibold mb-3 mt-6">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-2 mt-6">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')

    // Horizontal Rules
    .replace(/^[-*_]{3,}$/gm, '<hr class="border-t border-border my-6">')

    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">$1</blockquote>')

    // Code blocks (must come before inline code)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang ? `data-language="${lang}"` : '';
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code ${language} class="text-sm">${code.trim()}</code></pre>`;
    })

    // Tables
    .replace(/\|(.+)\|\n\|(?:-+)+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter((h: string) => h);
      const rowData = rows.trim().split('\n').map((row: string) =>
        row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      );

      let tableHTML = '<table class="border-collapse border border-border my-4 w-full">';
      tableHTML += '<thead><tr>';
      headers.forEach((h: string) => {
        tableHTML += `<th class="border border-border px-4 py-2 bg-muted font-semibold text-left">${h}</th>`;
      });
      tableHTML += '</tr></thead><tbody>';

      rowData.forEach((row: string[]) => {
        tableHTML += '<tr>';
        row.forEach((cell: string) => {
          tableHTML += `<td class="border border-border px-4 py-2">${cell}</td>`;
        });
        tableHTML += '</tr>';
      });
      tableHTML += '</tbody></table>';
      return tableHTML;
    })

    // Task lists
    .replace(/^\* \[([ x])\] (.+)$/gm, (match, checked, text) => {
      const isChecked = checked.toLowerCase() === 'x';
      return `<div class="flex items-center space-x-2 my-2">
        <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="rounded">
        <span class="${isChecked ? 'line-through text-muted-foreground' : ''}">${text}</span>
      </div>`;
    })

    // Unordered lists
    .replace(/^\* (.+)$/gm, '<ul class="list-disc list-inside my-2"><li>$1</li></ul>')
    .replace(/^(\d+)\. (.+)$/gm, '<ol class="list-decimal list-inside my-2"><li>$2</li></ol>')

    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')

    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4">')

    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>')

    // Bold and Italic (must come after strikethrough)
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

    // Inline code (must come after bold/italic)
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')

    // Line breaks and paragraphs
    .replace(/\n\n+/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>')

    // Wrap everything in a paragraph if not already wrapped
    .replace(/^([^<])/, '<p class="mb-4">$1')
    .replace(/([^>])$/, '$1</p>');
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }

  return {
    ...context,
    renderMarkdown
  };
}
