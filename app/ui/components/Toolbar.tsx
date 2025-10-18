'use client'

import { MousePointer, Navigation, FileText, FormInput, Layout, Square, Circle, Type, Minus } from 'lucide-react'
import { DesignElement } from '../types'
import { createWireframeComponent, COMPONENT_CATEGORIES, WIRE_FRAME_COMPONENTS } from './WireframeComponents'
import { createTemplate, WIREFRAME_TEMPLATES, TEMPLATE_CATEGORIES } from './WireframeTemplates'

interface ToolbarProps {
  tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | keyof typeof WIRE_FRAME_COMPONENTS
  onToolChange: (tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | keyof typeof WIRE_FRAME_COMPONENTS) => void
  onAddElements: (elements: DesignElement[]) => void
}

const basicTools = [
  { id: 'select' as const, icon: MousePointer, label: 'Select' },
  { id: 'rectangle' as const, icon: Square, label: 'Rectangle' },
  { id: 'circle' as const, icon: Circle, label: 'Circle' },
  { id: 'text' as const, icon: Type, label: 'Text' },
  { id: 'line' as const, icon: Minus, label: 'Line' },
]

const componentCategories = [
  { id: 'navigation' as const, icon: Navigation, label: 'Navigation', components: COMPONENT_CATEGORIES.navigation },
  { id: 'content' as const, icon: FileText, label: 'Content', components: COMPONENT_CATEGORIES.content },
  { id: 'forms' as const, icon: FormInput, label: 'Forms', components: COMPONENT_CATEGORIES.forms },
  { id: 'layout' as const, icon: Layout, label: 'Layout', components: COMPONENT_CATEGORIES.layout },
]

export function Toolbar({ tool, onToolChange, onAddElements }: ToolbarProps) {
  const handleAddWireframeComponent = (componentType: keyof typeof WIRE_FRAME_COMPONENTS, x: number = 100, y: number = 100) => {
    const elements = createWireframeComponent(componentType, x, y)
    onAddElements(elements)
  }

  const handleAddTemplate = (templateId: keyof typeof WIREFRAME_TEMPLATES) => {
    const elements = createTemplate(templateId)
    onAddElements(elements)
  }

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      {/* Basic Tools */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Tools</h3>
        <div className="space-y-1">
          {basicTools.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onToolChange(id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                tool === id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wireframe Components */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Components</h3>
        {componentCategories.map(({ id, icon: Icon, label, components }) => (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon size={16} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">{label}</span>
            </div>
            <div className="space-y-1 pl-6">
              {components.map((componentId) => (
                <button
                  key={componentId}
                  onClick={() => handleAddWireframeComponent(componentId)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                >
                  {componentId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Templates</h3>
        <div className="space-y-3">
          {Object.entries(TEMPLATE_CATEGORIES).map(([category, templates]) => (
            <div key={category} className="space-y-2">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="space-y-1 pl-2">
                {templates.map((templateId) => {
                  const template = WIREFRAME_TEMPLATES[templateId]
                  return (
                    <button
                      key={templateId}
                      onClick={() => handleAddTemplate(templateId)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                      title={template.description}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleAddWireframeComponent('card')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
          >
            Add Card
          </button>
          <button
            onClick={() => handleAddWireframeComponent('button')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
          >
            Add Button
          </button>
          <button
            onClick={() => handleAddWireframeComponent('inputField')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
          >
            Add Input
          </button>
        </div>
      </div>
    </div>
  )
}
