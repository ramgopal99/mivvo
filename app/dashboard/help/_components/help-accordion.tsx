"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Book, MessageSquare, CreditCard, User, Shield, Settings } from "lucide-react"
import { helpCategories, helpArticles } from "@/config/help-config"

const iconMap = {
  Book,
  MessageSquare,
  CreditCard,
  User,
  Shield,
  Settings
}

export function HelpAccordion() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  const toggleTopic = (topicId: string) => {
    const newOpenTopics = new Set(openTopics)
    if (newOpenTopics.has(topicId)) {
      newOpenTopics.delete(topicId)
    } else {
      newOpenTopics.add(topicId)
    }
    setOpenTopics(newOpenTopics)
  }

  const getArticleContent = (articleId?: string) => {
    if (!articleId) return null
    const article = helpArticles.find(a => a.id === articleId)
    return article?.content || null
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Help Topics</h2>
      <div className="space-y-4">
        {helpCategories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Book
          const isCategoryOpen = openCategories.has(category.id)

          return (
            <Card key={category.id} className="border shadow-sm">
              <Collapsible open={isCategoryOpen} onOpenChange={() => toggleCategory(category.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-left">{category.title}</CardTitle>
                          <CardDescription className="text-left">{category.description}</CardDescription>
                        </div>
                      </div>
                      {isCategoryOpen ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {category.topics.map((topic) => {
                        const isTopicOpen = openTopics.has(topic.id)
                        const articleContent = getArticleContent(topic.articleId)

                        return (
                          <Collapsible key={topic.id} open={isTopicOpen} onOpenChange={() => toggleTopic(topic.id)}>
                            <CollapsibleTrigger asChild>
                              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100">
                                <div className="flex items-center space-x-3">
                                  {isTopicOpen ? (
                                    <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                  )}
                                  <span className="text-sm font-medium text-left">{topic.title}</span>
                                </div>
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="ml-7 mt-2 p-4 bg-gray-50 rounded-lg border-l-2 border-primary">
                                <p className="text-sm text-gray-700 mb-3">{topic.content}</p>
                                {articleContent && (
                                  <div className="prose prose-sm max-w-none">
                                    <div className="whitespace-pre-line text-sm text-gray-600 leading-relaxed">
                                      {articleContent}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        )
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
