"use client"

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { Navbar } from "@/components/main"
import { Footer } from "@/components/main"
import { BlogPostContent } from "../_components/blog-post-content"
import { blogPosts } from "../data"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const post = blogPosts.find(post => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogPostContent post={post} />
      <Footer />
    </div>
  )
}
