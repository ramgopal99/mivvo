"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted/20">
      <div className="text-muted-foreground">Loading editor...</div>
    </div>
  )
});

export interface MonacoEditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
  getLanguage: () => string;
  setLanguage: (language: string) => void;
}

interface MonacoEditorProps {
  defaultValue: string;
  height?: string;
  language?: string;
  theme?: string;
  onMount?: (editor: unknown) => void;
  onLanguageChange?: (language: string) => void;
}

const MonacoEditor = forwardRef<MonacoEditorRef, MonacoEditorProps>(({
  defaultValue,
  height = "100%",
  language = "javascript",
  theme,
  onMount,
  onLanguageChange
}, ref) => {
  const editorRef = useRef<unknown>(null);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { resolvedTheme } = useTheme();
  
  // Use the provided theme or determine based on current theme
  const editorTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light');

  // Update editor theme when theme changes
  useEffect(() => {
    if (editorRef.current && typeof window !== 'undefined') {
      import('monaco-editor').then((monaco) => {
        const newTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light');
        monaco.editor.setTheme(newTheme);
      });
    }
  }, [resolvedTheme, theme]);

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
    if (onMount) {
      onMount(editor);
    }
  };

  // Update language when prop changes
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  // Call onLanguageChange when language changes
  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(currentLanguage);
    }
  }, [currentLanguage, onLanguageChange]);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      const editor = editorRef.current as { getValue?: () => string } | null;
      return editor?.getValue?.() || '';
    },
    setValue: (value: string) => {
      const editor = editorRef.current as { setValue?: (value: string) => void } | null;
      editor?.setValue?.(value);
    },
    getLanguage: () => currentLanguage,
    setLanguage: (newLanguage: string) => {
      setCurrentLanguage(newLanguage);
    }
  }));

  return (
    <Editor
      height={height}
      language={currentLanguage}
      defaultValue={defaultValue}
      theme={editorTheme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
      loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
      onMount={handleEditorDidMount}
    />
  );
});

MonacoEditor.displayName = 'MonacoEditor';

export default MonacoEditor;
