"use client"

import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/site"

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  categories: string[]
  featured?: boolean
  image?: string
  equalHeight?: boolean
}

export function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  categories,
  featured = false,
  image,
  equalHeight = false
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
      <CardHeader className="p-0">
        {image && (
          <div className={`relative overflow-hidden rounded-t-lg ${
            equalHeight ? 'h-64' : featured ? 'h-64 md:h-80' : 'h-48'
          }`}>
            <Image
              src={image!}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary hover:bg-primary/90">Featured</Badge>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <Link href={`/blog/${slug}`}>
            <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-3 ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        {/* Author and Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{siteConfig.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>

    </Card>
  )
}
