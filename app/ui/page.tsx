'use client'

import { useState, useEffect } from 'react'
import { DesignCanvas } from './components/DesignCanvas'
import { Toolbar } from './components/Toolbar'
import { LayersPanel } from './components/LayersPanel'
import { PropertiesPanel } from './components/PropertiesPanel'
import { DesignElement } from './types'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { useUndoRedo } from './hooks/useUndoRedo'

import { WIRE_FRAME_COMPONENTS } from './components/WireframeComponents'

export default function FigmaLikePage() {
  const { state: elements, setState: setElements, undo, redo, canUndo, canRedo } = useUndoRedo<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'text' | 'line' | keyof typeof WIRE_FRAME_COMPONENTS>('select')
  const [zoom, setZoom] = useState(1)
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [snapToGrid, setSnapToGrid] = useState(true)

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault()
          if (canUndo) undo()
        } else if ((e.key === 'y') || (e.key === 'z' && e.shiftKey)) {
          e.preventDefault()
          if (canRedo) redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, undo, redo])

  const addElement = (element: Omit<DesignElement, 'id'>) => {
    const newElement: DesignElement = {
      ...element,
      id: crypto.randomUUID(),
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
  }

  const addElements = (newElements: DesignElement[]) => {
    setElements([...elements, ...newElements])
    if (newElements.length > 0) {
      setSelectedElement(newElements[0].id)
    }
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(
      elements.map((el: DesignElement) => el.id === id ? { ...el, ...updates } : el)
    )
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el: DesignElement) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const duplicateElement = (id: string) => {
    const element = elements.find((el: DesignElement) => el.id === id)
    if (element) {
      const newElement = {
        ...element,
        id: crypto.randomUUID(),
        x: element.x + 20,
        y: element.y + 20,
      }
      setElements([...elements, newElement])
      setSelectedElement(newElement.id)
    }
  }

  const exportDesign = (format: 'svg' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(elements, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

      const exportFileDefaultName = 'design.json'

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    } else if (format === 'svg') {
      const svgContent = generateSVG()
      const dataUri = 'data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(svgContent)

      const exportFileDefaultName = 'design.svg'

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
  }

  const generateSVG = () => {
    const bounds = elements.reduce((acc, el) => ({
      minX: Math.min(acc.minX, el.x),
      minY: Math.min(acc.minY, el.y),
      maxX: Math.max(acc.maxX, el.x + el.width),
      maxY: Math.max(acc.maxY, el.y + el.height),
    }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity })

    const padding = 20
    const width = bounds.maxX - bounds.minX + padding * 2
    const height = bounds.maxY - bounds.minY + padding * 2

    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`

    elements.forEach(element => {
      const x = element.x - bounds.minX + padding
      const y = element.y - bounds.minY + padding

      switch (element.type) {
        case 'rectangle':
          svg += `<rect x="${x}" y="${y}" width="${element.width}" height="${element.height}" fill="${element.fill}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}"`
          if (element.rotation) svg += ` transform="rotate(${element.rotation} ${x + element.width/2} ${y + element.height/2})"`
          svg += '/>'
          break
        case 'circle':
          const cx = x + element.width / 2
          const cy = y + element.height / 2
          const r = Math.min(element.width, element.height) / 2
          svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${element.fill}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}"/>`
          break
        case 'text':
          svg += `<text x="${x + element.width/2}" y="${y + element.height/2}" text-anchor="middle" dominant-baseline="middle" fill="${element.fill}" font-family="${element.fontFamily || 'Arial'}" font-size="${element.fontSize || 16}"`
          if (element.rotation) svg += ` transform="rotate(${element.rotation} ${x + element.width/2} ${y + element.height/2})"`
          svg += `>${element.text || ''}</text>`
          break
        case 'line':
          svg += `<line x1="${x}" y1="${y + element.height/2}" x2="${x + element.width}" y2="${y + element.height/2}" stroke="${element.stroke}" stroke-width="${element.strokeWidth}"/>`
          break
      }
    })

    svg += '</svg>'
    return svg
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Wireframe Studio</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>Zoom: {Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                className="px-2 py-1 hover:bg-gray-100 rounded"
              >
                -
              </button>
              <button
                onClick={() => setZoom(Math.min(5, zoom + 0.1))}
                className="px-2 py-1 hover:bg-gray-100 rounded"
              >
                +
              </button>
              <button
                onClick={() => {
                  setZoom(1)
                  setCanvasOffset({ x: 0, y: 0 })
                }}
                className="px-2 py-1 hover:bg-gray-100 rounded"
              >
                Fit
              </button>
            </div>
            <div className="flex items-center space-x-2 border-l pl-4">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`px-3 py-1 text-xs rounded ${showGrid ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setSnapToGrid(!snapToGrid)}
                className={`px-3 py-1 text-xs rounded ${snapToGrid ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Snap
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Undo/Redo Buttons */}
          <div className="flex items-center space-x-1 border-r pr-2">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-2 rounded ${canUndo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              title="Undo (Ctrl+Z)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-2 rounded ${canRedo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              title="Redo (Ctrl+Y)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
            >
              <span>Export</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <button
                    onClick={() => {
                      exportDesign('svg')
                      setShowExportMenu(false)
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Export as SVG
                  </button>
                  <button
                    onClick={() => {
                      exportDesign('json')
                      setShowExportMenu(false)
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Toolbar */}
          <ResizablePanel defaultSize={10} minSize={8} maxSize={15}>
            <div className="h-full bg-white border-r">
            <Toolbar
              tool={tool}
              onToolChange={setTool}
              onAddElements={addElements}
            />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center - Canvas */}
          <ResizablePanel defaultSize={65}>
            <DesignCanvas
              elements={elements}
              selectedElement={selectedElement}
              tool={tool}
              zoom={zoom}
              canvasOffset={canvasOffset}
              showGrid={showGrid}
              snapToGrid={snapToGrid}
              onElementSelect={setSelectedElement}
              onElementUpdate={updateElement}
              onElementAdd={addElement}
              onZoomChange={setZoom}
              onCanvasOffsetChange={setCanvasOffset}
              onElementDelete={deleteElement}
              onElementDuplicate={duplicateElement}
            />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <ResizablePanelGroup direction="vertical">
              {/* Layers Panel */}
              <ResizablePanel defaultSize={60}>
                <LayersPanel
                  elements={elements}
                  selectedElement={selectedElement}
                  onElementSelect={setSelectedElement}
                  onElementDelete={deleteElement}
                  onElementDuplicate={duplicateElement}
                />
              </ResizablePanel>

              <ResizableHandle />

              {/* Properties Panel */}
              <ResizablePanel defaultSize={40}>
                <PropertiesPanel
                  element={selectedElement ? elements.find(el => el.id === selectedElement) || null : null}
                  onElementUpdate={updateElement}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
