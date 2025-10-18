import { DesignElement } from '../types'
import { createWireframeComponent } from './WireframeComponents'

// Template definitions for common wireframe layouts
export const WIREFRAME_TEMPLATES = {
  landingPage: {
    name: 'Landing Page',
    description: 'Standard landing page layout with hero, features, and footer',
    width: 1200,
    height: 2000,
    elements: [
      // Header
      { component: 'header' as const, x: 0, y: 0 },
      // Hero Section
      { component: 'heroSection' as const, x: 0, y: 80 },
      // Feature Cards
      { component: 'card' as const, x: 50, y: 520 },
      { component: 'card' as const, x: 350, y: 520 },
      { component: 'card' as const, x: 650, y: 520 },
      // Contact Form
      { component: 'inputField' as const, x: 50, y: 800 },
      { component: 'inputField' as const, x: 50, y: 840 },
      { component: 'textarea' as const, x: 50, y: 890 },
      { component: 'button' as const, x: 50, y: 1000 },
    ]
  },

  dashboard: {
    name: 'Dashboard',
    description: 'Admin dashboard layout with sidebar and content area',
    width: 1200,
    height: 800,
    elements: [
      // Sidebar
      { component: 'sidebar' as const, x: 0, y: 0 },
      // Header
      { component: 'header' as const, x: 220, y: 0 },
      // Cards in main content
      { component: 'card' as const, x: 250, y: 100 },
      { component: 'card' as const, x: 550, y: 100 },
      { component: 'card' as const, x: 250, y: 320 },
      { component: 'card' as const, x: 550, y: 320 },
    ]
  },

  loginForm: {
    name: 'Login Form',
    description: 'Simple login/signup form layout',
    width: 400,
    height: 500,
    elements: [
      // Form container
      { component: 'container' as const, x: 0, y: 0 },
      // Form elements inside
      { component: 'inputField' as const, x: 50, y: 50, textOverride: 'Email Address' },
      { component: 'inputField' as const, x: 50, y: 100, textOverride: 'Password' },
      { component: 'button' as const, x: 50, y: 160, textOverride: 'Sign In' },
    ]
  },

  mobileApp: {
    name: 'Mobile App',
    description: 'Mobile application wireframe with navigation',
    width: 375,
    height: 667,
    elements: [
      // Mobile header
      { component: 'rectangle' as const, custom: { width: 375, height: 60, fill: '#ffffff', stroke: '#dee2e6', strokeWidth: 1 } },
      // Content area
      { component: 'card' as const, x: 20, y: 80 },
      { component: 'card' as const, x: 20, y: 220 },
      { component: 'button' as const, x: 20, y: 380 },
      // Bottom navigation
      { component: 'rectangle' as const, custom: { width: 375, height: 60, fill: '#ffffff', stroke: '#dee2e6', strokeWidth: 1 }, y: 607 },
    ]
  },

  blogPost: {
    name: 'Blog Post',
    description: 'Article/blog post layout with header and content',
    width: 800,
    height: 1200,
    elements: [
      // Header
      { component: 'header' as const, x: 0, y: 0 },
      // Article title (large text)
      { component: 'text' as const, custom: { width: 800, height: 60, text: 'Blog Post Title', fontSize: 32, fill: '#212529' }, x: 0, y: 100 },
      // Article content (paragraphs)
      { component: 'text' as const, custom: { width: 800, height: 200, text: 'Article content goes here. This is where the main body text would appear in a typical blog post layout.', fontSize: 16, fill: '#6c757d' }, x: 0, y: 180 },
      // Image placeholder
      { component: 'image' as const, x: 0, y: 400 },
      // More content
      { component: 'text' as const, custom: { width: 800, height: 150, text: 'Additional content and details about the blog post topic.', fontSize: 16, fill: '#6c757d' }, x: 0, y: 560 },
    ]
  }
}

// Function to create a template with all its elements
export function createTemplate(templateId: keyof typeof WIREFRAME_TEMPLATES): DesignElement[] {
  const template = WIREFRAME_TEMPLATES[templateId]
  const allElements: DesignElement[] = []

  template.elements.forEach((elementSpec, index) => {
    let elements: DesignElement[]

    if (elementSpec.custom) {
      // Custom element (like text with specific properties)
      const customElement: DesignElement = {
        id: crypto.randomUUID(),
        type: elementSpec.custom.type || elementSpec.component,
        x: elementSpec.x || 0,
        y: elementSpec.y || 0,
        width: elementSpec.custom.width,
        height: elementSpec.custom.height,
        fill: elementSpec.custom.fill || '#ffffff',
        stroke: elementSpec.custom.stroke || '#dee2e6',
        strokeWidth: elementSpec.custom.strokeWidth || 1,
        text: elementSpec.custom.text,
        fontSize: elementSpec.custom.fontSize,
        fontFamily: elementSpec.custom.fontFamily || 'Arial',
        rotation: 0,
      }
      elements = [customElement]
    } else {
      // Standard wireframe component
      elements = createWireframeComponent(elementSpec.component, elementSpec.x || 0, elementSpec.y || 0)

      // Apply text overrides if specified
      if (elementSpec.textOverride) {
        elements.forEach(element => {
          if (element.text) {
            element.text = elementSpec.textOverride!
          }
        })
      }
    }

    allElements.push(...elements)
  })

  return allElements
}

// Template categories for organization
export const TEMPLATE_CATEGORIES = {
  layouts: ['landingPage', 'dashboard', 'blogPost'],
  forms: ['loginForm'],
  mobile: ['mobileApp']
} as const
