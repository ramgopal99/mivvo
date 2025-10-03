"use client"

import { useState, useMemo } from "react"
import { BlogHeader, BlogCategories, BlogGrid } from "./_components"
import { blogPosts, blogCategories } from "./data"
import { Navbar } from "@/components/main"
import { Footer } from "@/components/main"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.categories.includes(selectedCategory)
      )
    }

    // Sort by featured first, then by date
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }, [selectedCategory])

  const handleCategorySelect = (category: string | undefined) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Blog Header */}
      <BlogHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Filter */}
        <BlogCategories
          categories={blogCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {blogPosts.length} posts
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Grid */}
        <BlogGrid posts={filteredPosts} />
      </main>

      <Footer />
    </div>
  )
}
