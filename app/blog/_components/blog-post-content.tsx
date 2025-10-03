"use client"

import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { BlogPost, blogPosts } from "../data"
import { MarkdownCompound } from "@/components/markdown-compound"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Use content from data file, fallback to excerpt if no content
  const content = post.content || `## ${post.title}\n\n${post.excerpt}`

  // Find related posts based on shared categories
  const findRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], maxResults = 3) => {
    // Filter out current post and find posts with shared categories
    const relatedPosts = allPosts
      .filter(p => p.id !== currentPost.id)
      .map(p => ({
        post: p,
        sharedCategories: p.categories.filter(cat => currentPost.categories.includes(cat)).length
      }))
      .filter(item => item.sharedCategories > 0)
      .sort((a, b) => b.sharedCategories - a.sharedCategories)
      .map(item => item.post)

    // If no related posts found, return random posts (excluding current)
    if (relatedPosts.length === 0) {
      return allPosts
        .filter(p => p.id !== currentPost.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, maxResults)
    }

    return relatedPosts.slice(0, maxResults)
  }

  const relatedPosts = findRelatedPosts(post, blogPosts, 2)

  return (
    <article className="max-w-4xl mx-auto px-4 mt-16 sm:px-6 lg:px-8 py-16">

      {/* Hero Image */}
      {post.image && (
        <div className="mb-8">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Mivvo</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <MarkdownCompound
        size="lg"
        variant="rich"
        className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
      >
        {content}
      </MarkdownCompound>

      {/* Mivvo Bio */}
      <div className="mt-16 p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              About Mivvo
            </h3>
            <p className="text-gray-600 mb-4">
              AI-powered interview preparation platform designed to help you excel in technical interviews.
              From coding challenges to system design, we provide comprehensive tools and insights to boost your career.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">Get Started</Button>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors h-full">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {relatedPost.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the Mivvo Community</h3>
        <p className="text-gray-600 mb-6">
          Get exclusive interview tips, career insights, and platform updates delivered to your inbox.
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
        </div>
      </div>
    </article>
  )
}
