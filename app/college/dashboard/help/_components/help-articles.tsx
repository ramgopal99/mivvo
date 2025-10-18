"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  ExternalLink,
  Clock,
  Eye,
  ThumbsUp
} from "lucide-react"

interface HelpArticle {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: number
  views: number
  helpful: number
  updatedAt: string
  tags: string[]
}

interface HelpArticlesProps {
  articles: HelpArticle[]
  title: string
  onArticleClick: (articleId: string) => void
}

export function HelpArticles({ articles, title, onArticleClick }: HelpArticlesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {article.helpful}% helpful
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No articles found.
          </div>
        )}

        {articles.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              View All Articles
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
