'use client'

import { Eye, EyeOff, Copy, Trash2, Square, Circle, Type, Minus } from 'lucide-react'
import { DesignElement } from '../types'

interface LayersPanelProps {
  elements: DesignElement[]
  selectedElement: string | null
  onElementSelect: (id: string) => void
  onElementDelete: (id: string) => void
  onElementDuplicate: (id: string) => void
}

const getElementIcon = (type: DesignElement['type']) => {
  switch (type) {
    case 'rectangle': return Square
    case 'circle': return Circle
    case 'text': return Type
    case 'line': return Minus
    default: return Square
  }
}

const getElementLabel = (element: DesignElement) => {
  if (element.text) return element.text
  return `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} ${element.id.slice(0, 8)}`
}

export function LayersPanel({
  elements,
  selectedElement,
  onElementSelect,
  onElementDelete,
  onElementDuplicate,
}: LayersPanelProps) {
  return (
    <div className="h-full bg-white border-l">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700">Layers</h3>
        <p className="text-xs text-gray-500 mt-1">
          {elements.length} element{elements.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-y-auto max-h-full">
        {elements.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <p className="text-sm">No elements yet</p>
            <p className="text-xs mt-1">Add some elements to get started</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {/* Render elements in reverse order (top layer first) */}
            {[...elements].reverse().map((element) => {
              const Icon = getElementIcon(element.type)
              const isSelected = selectedElement === element.id

              return (
                <div
                  key={element.id}
                  className={`group flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onElementSelect(element.id)}
                >
                  <Icon size={16} className="text-gray-500 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{getElementLabel(element)}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round(element.x)}, {Math.round(element.y)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onElementDuplicate(element.id)
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Duplicate"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onElementDelete(element.id)
                      }}
                      className="p-1 hover:bg-red-100 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
