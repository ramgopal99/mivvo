'use client'

import { DesignElement } from '../types'
import { WIRE_FRAME_COLORS } from './WireframeComponents'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PropertiesPanelProps {
  element: DesignElement | null
  onElementUpdate: (id: string, updates: Partial<DesignElement>) => void
}

export function PropertiesPanel({ element, onElementUpdate }: PropertiesPanelProps) {
  if (!element) {
    return (
      <div className="h-full bg-white border-l">
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-gray-700">Properties</h3>
        </div>
        <div className="p-4 text-center text-gray-400">
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    )
  }

  const handleUpdate = (updates: Partial<DesignElement>) => {
    onElementUpdate(element.id, updates)
  }

  return (
    <div className="h-full bg-white border-l overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700">Properties</h3>
        <p className="text-xs text-gray-500 mt-1">
          {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Position */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">X</Label>
              <Input
                type="number"
                value={Math.round(element.x)}
                onChange={(e) => handleUpdate({ x: parseFloat(e.target.value) || 0 })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Y</Label>
              <Input
                type="number"
                value={Math.round(element.y)}
                onChange={(e) => handleUpdate({ y: parseFloat(e.target.value) || 0 })}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Size</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Width</Label>
              <Input
                type="number"
                value={Math.round(element.width)}
                onChange={(e) => handleUpdate({ width: parseFloat(e.target.value) || 1 })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Height</Label>
              <Input
                type="number"
                value={Math.round(element.height)}
                onChange={(e) => handleUpdate({ height: parseFloat(e.target.value) || 1 })}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Colors</Label>
          <div className="space-y-3">
            {/* Color Palette */}
            <div className="grid grid-cols-6 gap-1">
              {Object.entries(WIRE_FRAME_COLORS).map(([name, color]) => (
                <button
                  key={name}
                  onClick={() => handleUpdate({ fill: color })}
                  className={`w-6 h-6 rounded border-2 ${
                    element.fill === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`${name}: ${color}`}
                />
              ))}
            </div>

            <div>
              <Label className="text-xs text-gray-500">Fill</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={element.fill}
                  onChange={(e) => handleUpdate({ fill: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                  title="Fill color"
                  aria-label="Fill color"
                />
                <Input
                  value={element.fill}
                  onChange={(e) => handleUpdate({ fill: e.target.value })}
                  className="h-8 text-xs flex-1"
                  placeholder="#000000"
                  aria-label="Fill color value"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Stroke</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={element.stroke}
                  onChange={(e) => handleUpdate({ stroke: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                  title="Stroke color"
                  aria-label="Stroke color"
                />
                <Input
                  value={element.stroke}
                  onChange={(e) => handleUpdate({ stroke: e.target.value })}
                  className="h-8 text-xs flex-1"
                  placeholder="#000000"
                  aria-label="Stroke color value"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stroke Width */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Stroke Width</Label>
          <Slider
            value={[element.strokeWidth]}
            onValueChange={([value]) => handleUpdate({ strokeWidth: value })}
            max={20}
            min={0}
            step={0.5}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{element.strokeWidth}px</div>
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Rotation</Label>
          <Slider
            value={[element.rotation || 0]}
            onValueChange={([value]) => handleUpdate({ rotation: value })}
            max={360}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{element.rotation || 0}°</div>
        </div>

        {/* Text Properties */}
        {element.type === 'text' && (
          <>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-700">Text Content</Label>
              <Input
                value={element.text || ''}
                onChange={(e) => handleUpdate({ text: e.target.value })}
                className="h-8 text-xs"
                placeholder="Enter text..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-700">Font Size</Label>
              <Slider
                value={[element.fontSize || 16]}
                onValueChange={([value]) => handleUpdate({ fontSize: value })}
                max={72}
                min={8}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500">{element.fontSize || 16}px</div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-700">Font Family</Label>
              <Select
                value={element.fontFamily || 'Arial'}
                onValueChange={(value) => handleUpdate({ fontFamily: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Impact">Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
