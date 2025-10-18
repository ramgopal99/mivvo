"use client"

import { useState } from "react"
import { HelpCategories, HelpSearch, HelpArticles } from "./_components"

// Dummy help categories
const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of using the college dashboard",
    icon: () => <span>🚀</span>,
    articles: 12,
    popular: true
  },
  {
    id: "students",
    title: "Student Management",
    description: "How to add, manage, and track student progress",
    icon: () => <span>👥</span>,
    articles: 18,
    popular: true
  },
  {
    id: "interviews",
    title: "Interview Management",
    description: "Schedule, conduct, and analyze mock interviews",
    icon: () => <span>🎯</span>,
    articles: 15,
    popular: false
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Generate and understand performance reports",
    icon: () => <span>📊</span>,
    articles: 10,
    popular: false
  },
  {
    id: "settings",
    title: "Settings & Configuration",
    description: "Customize your dashboard and preferences",
    icon: () => <span>⚙️</span>,
    articles: 8,
    popular: false
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    icon: () => <span>🔧</span>,
    articles: 14,
    popular: true
  }
]

// Dummy help articles
const helpArticles = [
  {
    id: "1",
    title: "How to Schedule Your First Interview",
    excerpt: "Learn step-by-step how to schedule and prepare for mock interviews with your students.",
    category: "Interviews",
    readTime: 5,
    views: 245,
    helpful: 94,
    updatedAt: "2024-01-10",
    tags: ["scheduling", "interviews", "beginners"]
  },
  {
    id: "2",
    title: "Understanding Student Progress Reports",
    excerpt: "A comprehensive guide to interpreting and using student progress analytics.",
    category: "Reports",
    readTime: 8,
    views: 189,
    helpful: 87,
    updatedAt: "2024-01-08",
    tags: ["reports", "analytics", "progress"]
  },
  {
    id: "3",
    title: "Adding and Managing Student Profiles",
    excerpt: "Complete guide to creating student profiles and managing their information.",
    category: "Students",
    readTime: 6,
    views: 312,
    helpful: 91,
    updatedAt: "2024-01-12",
    tags: ["students", "profiles", "management"]
  },
  {
    id: "4",
    title: "Dashboard Customization Options",
    excerpt: "Learn how to personalize your college dashboard for optimal workflow.",
    category: "Settings",
    readTime: 4,
    views: 156,
    helpful: 82,
    updatedAt: "2024-01-09",
    tags: ["settings", "customization", "dashboard"]
  },
  {
    id: "5",
    title: "Troubleshooting Login Issues",
    excerpt: "Common login problems and their solutions for students and administrators.",
    category: "Troubleshooting",
    readTime: 3,
    views: 423,
    helpful: 96,
    updatedAt: "2024-01-11",
    tags: ["login", "troubleshooting", "support"]
  }
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || article.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleArticleClick = (articleId: string) => {
    // Simulate opening article
    console.log("Opening article:", articleId)
  }

  const handleContactSupport = () => {
    // Simulate contacting support
    console.log("Contacting support...")
  }

  const getArticleTitle = () => {
    if (selectedCategory) {
      const category = helpCategories.find(c => c.id === selectedCategory)
      return `${category?.title} Articles`
    }
    return searchTerm ? `Search Results for "${searchTerm}"` : "Popular Articles"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers, get support, and learn how to use the platform effectively
          </p>
        </div>
      </div>

      {/* Search */}
      <HelpSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onContactSupport={handleContactSupport}
      />

      {/* Categories */}
      <HelpCategories
        categories={helpCategories}
        onCategoryClick={handleCategoryClick}
      />

      {/* Articles */}
      <HelpArticles
        articles={filteredArticles}
        title={getArticleTitle()}
        onArticleClick={handleArticleClick}
      />

      {selectedCategory && (
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to all categories
          </button>
        </div>
      )}
    </div>
  )
}
