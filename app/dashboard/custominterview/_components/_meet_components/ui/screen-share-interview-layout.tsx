'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DraggableUserVideo } from './draggable-user-video'
import { CodingQuestion } from '../config'
import {
  getCodingModeEditorOptions,
  BLOCK_PASTE,
  DISABLE_EDITOR_SUGGESTIONS,
  DISABLE_RIGHT_CLICK,
  PREVENT_QUESTION_COPY,
  WARN_ON_SCREENSHOT_KEY,
  DETECT_SUSPICIOUS_KEYBOARD,
  DISABLE_DEVTOOLS_SHORTCUTS,
  isDevToolsShortcut,
  MAX_CHARS_PER_KEYPRESS,
  isTypingKey,
  INJECT_PROMPT_ON_QUESTION_COPY,
  PROMPT_INJECTION_ON_QUESTION_COPY,
  SHOW_OCR_WATERMARK,
  OCR_WATERMARK_TEXT,
} from '../coding-mode-cheating-config'

const Editor = dynamic(() => import('@monaco-editor/react').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
      <span className="text-muted-foreground text-sm">Loading editor...</span>
    </div>
  ),
})

interface ScreenShareInterviewLayoutProps {
  question: CodingQuestion
  stream: MediaStream | null
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isGettingStream: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
  /** Ref to sync current code for LLM - updated on every change */
  codingCodeRef?: React.MutableRefObject<{ code: string; language: string }>
}

const DEFAULT_CODE = {
  javascript: 'function solution() {\n  // Write your code here\n  return null;\n}',
  python: 'def solution():\n    # Write your code here\n    return None',
}

export function ScreenShareInterviewLayout({
  question,
  stream,
  isVideoEnabled,
  isAudioEnabled,
  isGettingStream,
  videoRef,
  codingCodeRef,
}: ScreenShareInterviewLayoutProps) {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(DEFAULT_CODE.javascript)
  const editorCleanupRef = useRef<(() => void) | null>(null)

  // Sync code to parent ref for LLM (coding mode)
  useEffect(() => {
    if (codingCodeRef) {
      codingCodeRef.current = { code, language }
    }
  }, [code, language, codingCodeRef])

  // Cleanup editor key listener on unmount
  useEffect(
    () => () => editorCleanupRef.current?.(),
    []
  )

  // Screenshot key detection (no toast - silent per user request)
  useEffect(() => {
    if (!WARN_ON_SCREENSHOT_KEY) return
    const handleKeyDown = () => {}
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Block DevTools/console shortcuts (F12, Ctrl+Shift+I, etc.) - Windows, Mac, Linux
  useEffect(() => {
    if (!DISABLE_DEVTOOLS_SHORTCUTS) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDevToolsShortcut(e)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [])

  // Inject prompt when user copies question - AI will refuse if they paste into ChatGPT
  const handleQuestionCopy = useCallback((e: React.ClipboardEvent) => {
    if (PREVENT_QUESTION_COPY) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (!INJECT_PROMPT_ON_QUESTION_COPY) return
    const selection = window.getSelection()?.toString()
    if (selection) {
      e.preventDefault()
      const mid = Math.floor(selection.length / 2)
      const firstHalf = selection.slice(0, mid)
      const secondHalf = selection.slice(mid)
      const injected = firstHalf + PROMPT_INJECTION_ON_QUESTION_COPY + secondHalf
      e.clipboardData?.setData('text/plain', injected)
    }
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE] || DEFAULT_CODE.javascript)
  }

  const handleResetCode = () => {
    setCode(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE] || DEFAULT_CODE.javascript)
  }

  const handleEditorMount = useCallback(
    (editor: Parameters<React.ComponentProps<typeof Editor>['onMount']>[0]) => {
      const container = editor.getContainerDomNode()
      if (BLOCK_PASTE) {
        const blockPaste = (e: ClipboardEvent) => {
          e.preventDefault()
          e.stopPropagation()
        }
        container.addEventListener('paste', blockPaste, { capture: true })
      }
      if (!DETECT_SUSPICIOUS_KEYBOARD) return
      const model = editor.getModel()
      if (!model) return
      let lastTypingKeyTime = 0
      let prevValue = model.getValue()
      let isReverting = false
      let isComposing = false
      const keyHandler = (e: KeyboardEvent) => {
        if (isTypingKey(e)) lastTypingKeyTime = Date.now()
      }
      const compositionStart = () => { isComposing = true }
      const compositionEnd = () => { isComposing = false; lastTypingKeyTime = Date.now() }
      container.addEventListener('keydown', keyHandler, { capture: true })
      container.addEventListener('compositionstart', compositionStart)
      container.addEventListener('compositionend', compositionEnd)
      model.onDidChangeContent((e) => {
        if (isReverting) {
          prevValue = model.getValue()
          isReverting = false
          return
        }
        if (e.isUndoing || e.isRedoing) return
        let totalInserted = 0
        let totalReplaced = 0
        for (const ch of e.changes) {
          if (ch.text.length > 0) totalInserted += ch.text.length
          totalReplaced += ch.rangeLength
        }
        // Allow full doc replace (e.g. language switch from parent)
        if (totalReplaced > 20 && totalInserted > 20) {
          prevValue = model.getValue()
          return
        }
        if (isComposing) {
          prevValue = model.getValue()
          return
        }
        const now = Date.now()
        const recentKey = now - lastTypingKeyTime < 500
        if (totalInserted > MAX_CHARS_PER_KEYPRESS && !recentKey) {
          isReverting = true
          model.setValue(prevValue)
        } else {
          prevValue = model.getValue()
        }
      })
      container.addEventListener('keydown', keyHandler, { capture: true })
      editorCleanupRef.current = () => {
        container.removeEventListener('keydown', keyHandler, { capture: true } as EventListenerOptions)
        container.removeEventListener('compositionstart', compositionStart)
        container.removeEventListener('compositionend', compositionEnd)
      }
    },
    []
  )

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (DISABLE_RIGHT_CLICK) {
      e.preventDefault()
    }
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden" onContextMenu={handleContextMenu}>
      {/* Draggable user video popup - Coding mode */}
      <DraggableUserVideo
        stream={stream}
        isVideoEnabled={isVideoEnabled}
        isAudioEnabled={isAudioEnabled}
        isGettingStream={isGettingStream}
        videoRef={videoRef}
      />

      {/* Left Section - Full question */}
      <div className="flex-1 min-w-0 flex flex-col p-4 pr-2 overflow-hidden">
        <div
          className={`relative h-full bg-muted/50 rounded-lg p-4 overflow-y-auto border ${PREVENT_QUESTION_COPY ? 'select-none' : 'select-text'}`}
          onCopy={handleQuestionCopy}
        >
          {SHOW_OCR_WATERMARK && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-6 opacity-[0.12] text-amber-800 text-xs font-bold whitespace-nowrap" style={{ transform: 'rotate(-12deg)', transformOrigin: 'center' }}>
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i}>{OCR_WATERMARK_TEXT}</span>
                ))}
              </div>
            </div>
          )}
          <div className="relative z-10">
            <h3 className="text-base font-semibold mb-2">{question.title}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <h4 className="font-medium text-muted-foreground mb-1">Description</h4>
                <p className="text-foreground">{question.description}</p>
              </div>
              {question.examples?.length > 0 && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Examples</h4>
                  <div className="space-y-2">
                    {question.examples.map((ex, i) => (
                      <div key={i} className="bg-background p-2 rounded text-xs font-mono">
                        <div>Input: {typeof ex.input === 'object' ? JSON.stringify(ex.input) : ex.input}</div>
                        <div>Output: {typeof ex.output === 'object' ? JSON.stringify(ex.output) : ex.output}</div>
                        {ex.explanation && <div className="mt-1 text-muted-foreground">{ex.explanation}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {question.constraints?.length > 0 && (
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Constraints</h4>
                  <ul className="text-xs space-y-0.5">
                    {question.constraints.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {question.difficulty && (
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded ${
                    question.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : question.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {question.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Full Monaco Code Editor */}
      <div className="flex-1 min-w-[320px] flex flex-col p-4 pl-2 border-l overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
          <span className="text-sm font-medium">Code Editor</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleResetCode}
              title="Reset to default code"
              aria-label="Reset to default code"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-sm border rounded px-2 py-1 bg-background"
              aria-label="Select programming language"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
        <div className="flex-1 min-h-0 border rounded-lg overflow-hidden">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={BLOCK_PASTE || DETECT_SUSPICIOUS_KEYBOARD ? handleEditorMount : undefined}
            theme="vs-light"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              tabSize: 2,
              ...(DISABLE_EDITOR_SUGGESTIONS ? getCodingModeEditorOptions() : {}),
            }}
          />
        </div>
      </div>
    </div>
  )
}
