import React from 'react'
import { DesignElement } from '../types'

// Professional wireframe color palette
export const WIRE_FRAME_COLORS = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#007bff',
  text: '#212529',
  textSecondary: '#6c757d',
  border: '#dee2e6',
  borderLight: '#e9ecef',
  accent: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
}

// Common wireframe component templates
export const WIRE_FRAME_COMPONENTS = {
  // Navigation Components
  header: {
    type: 'rectangle' as const,
    width: 800,
    height: 60,
    fill: WIRE_FRAME_COLORS.surface,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'text' as const, x: 20, y: 20, width: 100, height: 20, text: 'LOGO', fill: WIRE_FRAME_COLORS.text, fontSize: 14, fontFamily: 'Arial' },
      { type: 'text' as const, x: 650, y: 20, width: 50, height: 20, text: 'Menu', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 12, fontFamily: 'Arial' },
      { type: 'text' as const, x: 710, y: 20, width: 70, height: 20, text: 'Contact', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 12, fontFamily: 'Arial' }
    ]
  },

  heroSection: {
    type: 'rectangle' as const,
    width: 800,
    height: 400,
    fill: WIRE_FRAME_COLORS.background,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'rectangle' as const, x: 50, y: 50, width: 300, height: 200, fill: WIRE_FRAME_COLORS.surface, stroke: WIRE_FRAME_COLORS.border, strokeWidth: 1 },
      { type: 'text' as const, x: 400, y: 80, width: 300, height: 40, text: 'Hero Title', fill: WIRE_FRAME_COLORS.text, fontSize: 28, fontFamily: 'Arial' },
      { type: 'text' as const, x: 400, y: 140, width: 250, height: 60, text: 'Hero description text goes here', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 16, fontFamily: 'Arial' },
      { type: 'rectangle' as const, x: 400, y: 220, width: 120, height: 40, fill: WIRE_FRAME_COLORS.primary, stroke: WIRE_FRAME_COLORS.primary, strokeWidth: 1 },
      { type: 'text' as const, x: 420, y: 230, width: 80, height: 20, text: 'Get Started', fill: WIRE_FRAME_COLORS.background, fontSize: 14, fontFamily: 'Arial' }
    ]
  },

  // Form Components
  inputField: {
    type: 'rectangle' as const,
    width: 300,
    height: 40,
    fill: WIRE_FRAME_COLORS.background,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'text' as const, x: 10, y: 12, width: 100, height: 16, text: 'Email Address', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 12, fontFamily: 'Arial' }
    ]
  },

  textarea: {
    type: 'rectangle' as const,
    width: 300,
    height: 100,
    fill: WIRE_FRAME_COLORS.background,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'text' as const, x: 10, y: 10, width: 100, height: 16, text: 'Message', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 12, fontFamily: 'Arial' }
    ]
  },

  button: {
    type: 'rectangle' as const,
    width: 120,
    height: 40,
    fill: WIRE_FRAME_COLORS.primary,
    stroke: WIRE_FRAME_COLORS.primary,
    strokeWidth: 1,
    children: [
      { type: 'text' as const, x: 25, y: 12, width: 70, height: 16, text: 'Button', fill: WIRE_FRAME_COLORS.background, fontSize: 14, fontFamily: 'Arial' }
    ]
  },

  // Content Components
  card: {
    type: 'rectangle' as const,
    width: 300,
    height: 200,
    fill: WIRE_FRAME_COLORS.background,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'rectangle' as const, x: 20, y: 20, width: 260, height: 120, fill: WIRE_FRAME_COLORS.surface, stroke: WIRE_FRAME_COLORS.borderLight, strokeWidth: 1 },
      { type: 'text' as const, x: 20, y: 160, width: 200, height: 20, text: 'Card Title', fill: WIRE_FRAME_COLORS.text, fontSize: 16, fontFamily: 'Arial' },
      { type: 'text' as const, x: 20, y: 180, width: 250, height: 16, text: 'Card description goes here', fill: WIRE_FRAME_COLORS.textSecondary, fontSize: 12, fontFamily: 'Arial' }
    ]
  },

  image: {
    type: 'rectangle' as const,
    width: 200,
    height: 150,
    fill: WIRE_FRAME_COLORS.surface,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'line' as const, x: 75, y: 60, width: 50, height: 1, fill: WIRE_FRAME_COLORS.borderLight, stroke: WIRE_FRAME_COLORS.borderLight, strokeWidth: 2 },
      { type: 'line' as const, x: 85, y: 50, width: 30, height: 1, fill: WIRE_FRAME_COLORS.borderLight, stroke: WIRE_FRAME_COLORS.borderLight, strokeWidth: 2 },
      { type: 'circle' as const, x: 85, y: 45, width: 8, height: 8, fill: WIRE_FRAME_COLORS.borderLight, stroke: WIRE_FRAME_COLORS.borderLight, strokeWidth: 1 },
      { type: 'circle' as const, x: 105, y: 45, width: 8, height: 8, fill: WIRE_FRAME_COLORS.borderLight, stroke: WIRE_FRAME_COLORS.borderLight, strokeWidth: 1 }
    ]
  },

  // Layout Components
  container: {
    type: 'rectangle' as const,
    width: 800,
    height: 300,
    fill: WIRE_FRAME_COLORS.background,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
  },

  sidebar: {
    type: 'rectangle' as const,
    width: 200,
    height: 400,
    fill: WIRE_FRAME_COLORS.surface,
    stroke: WIRE_FRAME_COLORS.border,
    strokeWidth: 1,
    children: [
      { type: 'text' as const, x: 20, y: 30, width: 100, height: 16, text: 'Menu Item 1', fill: WIRE_FRAME_COLORS.text, fontSize: 14, fontFamily: 'Arial' },
      { type: 'text' as const, x: 20, y: 60, width: 100, height: 16, text: 'Menu Item 2', fill: WIRE_FRAME_COLORS.text, fontSize: 14, fontFamily: 'Arial' },
      { type: 'text' as const, x: 20, y: 90, width: 100, height: 16, text: 'Menu Item 3', fill: WIRE_FRAME_COLORS.text, fontSize: 14, fontFamily: 'Arial' }
    ]
  }
}

// Function to create a wireframe component with proper positioning
export function createWireframeComponent(
  componentType: keyof typeof WIRE_FRAME_COMPONENTS,
  x: number,
  y: number
): DesignElement[] {
  const template = WIRE_FRAME_COMPONENTS[componentType]
  const elements: DesignElement[] = []

  // Create main component
  const mainElement: DesignElement = {
    id: crypto.randomUUID(),
    type: template.type,
    x,
    y,
    width: template.width,
    height: template.height,
    fill: template.fill,
    stroke: template.stroke,
    strokeWidth: template.strokeWidth,
    rotation: 0,
  }

  elements.push(mainElement)

  // Create child elements
  if (template.children) {
    template.children.forEach(child => {
      const childElement: DesignElement = {
        id: crypto.randomUUID(),
        type: child.type,
        x: x + child.x,
        y: y + child.y,
        width: child.width,
        height: child.height,
        fill: child.fill,
        stroke: child.stroke || 'transparent',
        strokeWidth: child.strokeWidth || 0,
        text: child.text,
        fontSize: child.fontSize,
        fontFamily: child.fontFamily,
        rotation: 0,
      }
      elements.push(childElement)
    })
  }

  return elements
}

// Component categories for the toolbar
export const COMPONENT_CATEGORIES = {
  navigation: ['header'],
  content: ['heroSection', 'card', 'image'],
  forms: ['inputField', 'textarea', 'button'],
  layout: ['container', 'sidebar']
} as const
