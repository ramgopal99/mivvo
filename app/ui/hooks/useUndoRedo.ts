import { useState, useCallback } from 'react'
import { DesignElement } from '../types'

const MAX_HISTORY = 50

export function useUndoRedo<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  const push = useCallback((newState: T) => {
    setHistory((prevHistory: T[]) => {
      // Remove any history after current index (when we make new changes after undo)
      const newHistory = prevHistory.slice(0, currentIndex + 1)
      // Add new state
      newHistory.push(newState)
      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift()
        setCurrentIndex(MAX_HISTORY - 1)
        return newHistory
      }
      setCurrentIndex(newHistory.length - 1)
      return newHistory
    })
  }, [currentIndex])

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(prev => prev - 1)
    }
  }, [canUndo])

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [canRedo])

  const currentState = history[currentIndex]

  return {
    state: currentState,
    setState: push,
    undo,
    redo,
    canUndo,
    canRedo,
    clear: useCallback(() => {
      setHistory([initialState])
      setCurrentIndex(0)
    }, [initialState])
  }
}
