"use client"

import { Badge } from "@/components/ui/badge"

interface BlogCategoriesProps {
  categories: string[]
  selectedCategory?: string
  onCategorySelect: (category: string | undefined) => void
}

export function BlogCategories({ categories, selectedCategory, onCategorySelect }: BlogCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Badge
        variant={selectedCategory === undefined ? "default" : "secondary"}
        className="cursor-pointer hover:bg-blue-100 transition-colors"
        onClick={() => onCategorySelect(undefined)}
      >
        All Posts
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className="cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}
