'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { DesignElement } from '../types'
import { WIRE_FRAME_COMPONENTS } from './WireframeComponents'

interface DesignCanvasProps {
  elements: DesignElement[]
  selectedElement: string | null
  tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | keyof typeof WIRE_FRAME_COMPONENTS
  zoom: number
  canvasOffset: { x: number; y: number }
  showGrid: boolean
  snapToGrid: boolean
  onElementSelect: (id: string | null) => void
  onElementUpdate: (id: string, updates: Partial<DesignElement>) => void
  onElementAdd: (element: Omit<DesignElement, 'id'>) => void
  onZoomChange: (zoom: number) => void
  onCanvasOffsetChange: (offset: { x: number; y: number }) => void
  onElementDelete: (id: string) => void
  onElementDuplicate: (id: string) => void
}

export function DesignCanvas({
  elements,
  selectedElement,
  tool,
  zoom,
  canvasOffset,
  showGrid,
  snapToGrid,
  onElementSelect,
  onElementUpdate,
  onElementAdd,
  onZoomChange,
  onCanvasOffsetChange,
  onElementDelete,
  onElementDuplicate,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [isCreating, setIsCreating] = useState(false)
  const [creationStart, setCreationStart] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const [originalElement, setOriginalElement] = useState<DesignElement | null>(null)

  const GRID_SIZE = 20

  const snapToGridValue = useCallback((value: number) => {
    return snapToGrid ? Math.round(value / GRID_SIZE) * GRID_SIZE : value
  }, [snapToGrid, GRID_SIZE])

  const getCanvasCoords = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    const coords = {
      x: (e.clientX - rect.left - canvasOffset.x) / zoom,
      y: (e.clientY - rect.top - canvasOffset.y) / zoom,
    }
    return {
      x: snapToGridValue(coords.x),
      y: snapToGridValue(coords.y),
    }
  }, [zoom, canvasOffset, snapToGridValue])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const coords = getCanvasCoords(e)
    const target = e.target as HTMLElement

    if (tool === 'select') {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // Middle mouse or Alt+click for panning
        setIsPanning(true)
        setPanStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y })
        return
      }

      // Check if clicking on a resize handle
      if (target.classList.contains('resize-handle')) {
        const handle = target.dataset.handle
        if (handle && selectedElement) {
          const element = elements.find(el => el.id === selectedElement)
          if (element) {
            setIsResizing(true)
            setResizeHandle(handle)
            setOriginalElement(element)
            return
          }
        }
      }

      // Check if clicking on an element
      const clickedElement = elements.find(el => {
        return coords.x >= el.x &&
               coords.x <= el.x + el.width &&
               coords.y >= el.y &&
               coords.y <= el.y + el.height
      })

      if (clickedElement) {
        onElementSelect(clickedElement.id)
        setIsDragging(true)
        setDragStart({ x: coords.x - clickedElement.x, y: coords.y - clickedElement.y })
      } else {
        onElementSelect(null)
      }
    } else {
      // Creating new element
      setIsCreating(true)
      setCreationStart(coords)
      onElementSelect(null)
    }
  }, [tool, elements, canvasOffset, selectedElement, getCanvasCoords, onElementSelect])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const coords = getCanvasCoords(e)

    if (isPanning) {
      const newOffset = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      }
      onCanvasOffsetChange(newOffset)
    } else if (isResizing && selectedElement && resizeHandle && originalElement) {
      const deltaX = coords.x - (originalElement.x + dragStart.x)
      const deltaY = coords.y - (originalElement.y + dragStart.y)

      let newX = originalElement.x
      let newY = originalElement.y
      let newWidth = originalElement.width
      let newHeight = originalElement.height

      switch (resizeHandle) {
        case 'nw':
          newX = coords.x
          newY = coords.y
          newWidth = originalElement.width - deltaX
          newHeight = originalElement.height - deltaY
          break
        case 'ne':
          newY = coords.y
          newWidth = coords.x - originalElement.x
          newHeight = originalElement.height - deltaY
          break
        case 'sw':
          newX = coords.x
          newWidth = originalElement.width - deltaX
          newHeight = coords.y - originalElement.y
          break
        case 'se':
          newWidth = coords.x - originalElement.x
          newHeight = coords.y - originalElement.y
          break
      }

      // Prevent negative dimensions
      if (newWidth > 5 && newHeight > 5) {
        onElementUpdate(selectedElement, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        })
      }
    } else if (isDragging && selectedElement) {
      const element = elements.find(el => el.id === selectedElement)
      if (element) {
        onElementUpdate(selectedElement, {
          x: coords.x - dragStart.x,
          y: coords.y - dragStart.y,
        })
      }
    } else if (isCreating && tool !== 'select') {
      // Preview creation
    }
  }, [isPanning, isResizing, isDragging, isCreating, selectedElement, tool, panStart, dragStart, resizeHandle, originalElement, elements, getCanvasCoords, onCanvasOffsetChange, onElementUpdate])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    const coords = getCanvasCoords(e)

    if (isCreating && tool !== 'select') {
      // Check if it's a basic shape tool
      const basicTools = ['rectangle', 'circle', 'text', 'line']
      if (basicTools.includes(tool)) {
        const width = Math.abs(coords.x - creationStart.x)
        const height = Math.abs(coords.y - creationStart.y)
        const x = Math.min(coords.x, creationStart.x)
        const y = Math.min(coords.y, creationStart.y)

        if (width > 5 && height > 5) { // Minimum size
          onElementAdd({
            type: tool as DesignElement['type'],
            x,
            y,
            width,
            height,
            fill: tool === 'text' ? 'transparent' : '#3b82f6',
            stroke: '#000000',
            strokeWidth: 1,
            text: tool === 'text' ? 'Text' : undefined,
            fontSize: tool === 'text' ? 16 : undefined,
            fontFamily: tool === 'text' ? 'Arial' : undefined,
            rotation: 0,
          })
        }
      }
      // Wireframe components are handled by the toolbar, not by dragging on canvas
    }

    setIsDragging(false)
    setIsPanning(false)
    setIsCreating(false)
    setIsResizing(false)
    setResizeHandle(null)
    setOriginalElement(null)
  }, [isCreating, tool, creationStart, getCanvasCoords, onElementAdd])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta))
    onZoomChange(newZoom)
  }, [zoom, onZoomChange])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedElement) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        onElementDelete(selectedElement)
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        onElementDuplicate(selectedElement)
      }
    }
  }, [selectedElement, onElementDelete, onElementDuplicate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const renderElement = (element: DesignElement) => {
    const isSelected = selectedElement === element.id
    const style = {
      position: 'absolute' as const,
      left: element.x * zoom + canvasOffset.x,
      top: element.y * zoom + canvasOffset.y,
      width: element.width * zoom,
      height: element.height * zoom,
      transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
      transformOrigin: 'center',
      border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
      outline: isSelected ? '1px solid #ffffff' : 'none',
    }

    if (isSelected) {
      const handles = ['nw', 'ne', 'sw', 'se']
      const resizeHandles = handles.map(handle => {
        const handleStyle = {
          position: 'absolute' as const,
          width: 8,
          height: 8,
          backgroundColor: '#3b82f6',
          border: '1px solid white',
          zIndex: 10,
        }

        switch (handle) {
          case 'nw':
            handleStyle.left = style.left - 4
            handleStyle.top = style.top - 4
            break
          case 'ne':
            handleStyle.left = style.left + style.width - 4
            handleStyle.top = style.top - 4
            break
          case 'sw':
            handleStyle.left = style.left - 4
            handleStyle.top = style.top + style.height - 4
            break
          case 'se':
            handleStyle.left = style.left + style.width - 4
            handleStyle.top = style.top + style.height - 4
            break
        }

        return (
          <div
            key={`${element.id}-${handle}`}
            style={handleStyle}
            className="resize-handle cursor-pointer"
            data-handle={handle}
          />
        )
      })

      return (
        <React.Fragment key={element.id}>
          {(() => {
            switch (element.type) {
              case 'rectangle':
                return (
                  <div
                    style={style}
                    className="bg-blue-500 border border-black cursor-move"
                  />
                )
              case 'circle':
                return (
                  <div
                    style={{
                      ...style,
                      borderRadius: '50%',
                    }}
                    className="bg-green-500 border border-black cursor-move"
                  />
                )
              case 'text':
                return (
                  <div
                    style={style}
                    className="flex items-center justify-center cursor-move select-none"
                  >
                    <span
                      style={{
                        fontSize: (element.fontSize || 16) * zoom,
                        fontFamily: element.fontFamily || 'Arial',
                        color: element.fill,
                      }}
                    >
                      {element.text}
                    </span>
                  </div>
                )
              case 'line':
                return (
                  <div
                    style={style}
                    className="bg-black cursor-move"
                  />
                )
              default:
                return null
            }
          })()}
          {resizeHandles}
        </React.Fragment>
      )
    }

    // Non-selected elements
    switch (element.type) {
      case 'rectangle':
        return (
          <div
            key={element.id}
            style={style}
            className="bg-blue-500 border border-black cursor-move"
          />
        )
      case 'circle':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              borderRadius: '50%',
            }}
            className="bg-green-500 border border-black cursor-move"
          />
        )
      case 'text':
        return (
          <div
            key={element.id}
            style={style}
            className="flex items-center justify-center cursor-move select-none"
          >
            <span
              style={{
                fontSize: (element.fontSize || 16) * zoom,
                fontFamily: element.fontFamily || 'Arial',
                color: element.fill,
              }}
            >
              {element.text}
            </span>
          </div>
        )
      case 'line':
        return (
          <div
            key={element.id}
            style={style}
            className="bg-black cursor-move"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full bg-gray-100 overflow-hidden">
      <div
        ref={canvasRef}
        className="relative w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{
          backgroundImage: showGrid ? `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          ` : 'none',
          backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`,
          backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
        }}
      >
        {elements.map(renderElement)}

        {/* Canvas center indicator */}
        <div
          className="absolute w-px h-px bg-red-500"
          style={{
            left: canvasOffset.x,
            top: canvasOffset.y,
          }}
        />

        {/* Instructions */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">Welcome to Design Studio</p>
              <p className="text-sm">Select a tool from the toolbar and start creating!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
