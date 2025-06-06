import { notFound } from "next/navigation"
import { getAllTags, getPostsByTag } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import type { Metadata } from "next"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    return {}
  }

  const tagName = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  return {
    title: `Posts tagged with "${tagName}"`,
    description: `Browse all posts tagged with ${tagName}`,
    openGraph: {
      title: `Posts tagged with "${tagName}"`,
      description: `Browse all posts tagged with ${tagName}`,
      type: "website",
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  const tagName = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-8 inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Posts tagged with <span className="gradient-text">"{tagName}"</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found with this tag
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 glass-button rounded-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  )
}
