'use client'

import { Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FullScreenPromptProps {
  onEnterFullScreen: () => void
}

export function FullScreenPrompt({ onEnterFullScreen }: FullScreenPromptProps) {
  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-white p-6 cursor-pointer"
      onClick={onEnterFullScreen}
      onKeyDown={(e) => e.key === 'Enter' && onEnterFullScreen()}
      role="button"
      tabIndex={0}
      aria-label="Click to enter full screen"
    >
      <div className="max-w-md w-full rounded-2xl border border-border/80 bg-card/95 shadow-xl backdrop-blur-sm p-8 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Maximize2 className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Enter full screen for your interview
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For the best experience, your interview runs in full screen. You’ll see the full layout with video, chat, and controls without distractions.
          </p>
        </div>
        <ul className="text-left text-sm text-muted-foreground space-y-2 mx-auto max-w-xs">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            Full view of video and AI chat
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            No browser bars or tabs in the way
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Esc</kbd> anytime to exit
          </li>
        </ul>
        <Button
          onClick={(e) => { e.stopPropagation(); onEnterFullScreen(); }}
          size="lg"
          className="w-full sm:w-auto min-w-[200px] gap-2 text-base font-medium shadow-md hover:shadow-lg transition-shadow"
        >
          <Maximize2 className="h-5 w-5" />
          Enter full screen
        </Button>
        <p className="text-xs text-muted-foreground">
          Or click anywhere on this card to continue
        </p>
      </div>
    </div>
  )
}
