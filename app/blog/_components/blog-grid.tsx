"use client"

import { BlogCard } from "./blog-card"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar?: string
    role?: string
  }
  publishedAt: string
  readTime: number
  categories: string[]
  featured?: boolean
  image?: string
}

interface BlogGridProps {
  posts: BlogPost[]
  loading?: boolean
}

export function BlogGrid({ posts, loading = false }: BlogGridProps) {
  if (loading) {
    return (
      <div className="space-y-8">
        {/* First row skeleton: Large card (2 cols) + Small card (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="animate-pulse bg-white rounded-lg shadow-md border">
              <div className="bg-gray-200 h-64 lg:h-80 rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="animate-pulse bg-white rounded-lg shadow-md border">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining skeleton cards in 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md border">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">Try adjusting your search or category filter.</p>
      </div>
    )
  }

  // Find the featured post and arrange layout
  const featuredPost = posts.find(post => post.featured)
  const nonFeaturedPosts = posts.filter(post => !post.featured)

  return (
    <div className="space-y-8">
      {/* First row: Featured post (2 cols) + First non-featured post (1 col) */}
      {featuredPost && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <BlogCard
              key={featuredPost.id}
              slug={featuredPost.slug}
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              publishedAt={featuredPost.publishedAt}
              categories={featuredPost.categories}
              featured={featuredPost.featured}
              image={featuredPost.image}
              equalHeight={true}
            />
          </div>
          {nonFeaturedPosts.length > 0 && (
            <div className="lg:col-span-1">
              <BlogCard
                key={nonFeaturedPosts[0].id}
                slug={nonFeaturedPosts[0].slug}
                title={nonFeaturedPosts[0].title}
                excerpt={nonFeaturedPosts[0].excerpt}
                publishedAt={nonFeaturedPosts[0].publishedAt}
                categories={nonFeaturedPosts[0].categories}
                featured={nonFeaturedPosts[0].featured}
                image={nonFeaturedPosts[0].image}
                equalHeight={true}
              />
            </div>
          )}
        </div>
      )}

      {/* Remaining posts in 3-column grid */}
      {nonFeaturedPosts.length > (featuredPost ? 1 : 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nonFeaturedPosts.slice(featuredPost ? 1 : 0).map((post) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              categories={post.categories}
              featured={post.featured}
              image={post.image}
            />
          ))}
        </div>
      )}
    </div>
  )
}
