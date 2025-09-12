"use client";

import Editor from '@monaco-editor/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import * as monaco from 'monaco-editor';

export interface MonacoEditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
}

interface MonacoEditorProps {
  defaultValue: string;
  height?: string;
  language?: string;
  theme?: string;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

const MonacoEditor = forwardRef<MonacoEditorRef, MonacoEditorProps>(({
  defaultValue,
  height = "100%",
  language = "javascript",
  theme = "vs-light",
  onMount
}, ref) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    if (onMount) {
      onMount(editor);
    }
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue() || '',
    setValue: (value: string) => editorRef.current?.setValue(value)
  }));

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      defaultValue={defaultValue}
      theme={theme}
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
