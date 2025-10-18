"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


interface HelpCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  articles: number
  popular: boolean
}

interface HelpCategoriesProps {
  categories: HelpCategory[]
  onCategoryClick: (categoryId: string) => void
}

export function HelpCategories({ categories, onCategoryClick }: HelpCategoriesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onCategoryClick(category.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                {category.popular && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Popular
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {category.description}
            </CardDescription>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {category.articles} articles
              </span>
              <Button variant="ghost" size="sm">
                View Articles →
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
