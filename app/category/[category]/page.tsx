import { notFound } from "next/navigation"
import { getAllCategories, getPostsByCategory } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Helper function to format display names
const formatDisplayName = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Helper function to format URL slugs
const formatUrlSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: formatUrlSlug(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category
  const categoryName = formatDisplayName(categorySlug)

  // Find posts by matching the formatted slug
  const allCategories = await getAllCategories()
  const matchingCategory = allCategories.find((cat) => formatUrlSlug(cat) === categorySlug)

  if (!matchingCategory) {
    return {}
  }

  const posts = await getPostsByCategory(matchingCategory)

  if (posts.length === 0) {
    return {}
  }

  return {
    title: `${categoryName} Posts`,
    description: `Browse all posts in the ${categoryName} category`,
    openGraph: {
      title: `${categoryName} Posts`,
      description: `Browse all posts in the ${categoryName} category`,
      type: "website",
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category
  const categoryName = formatDisplayName(categorySlug)

  // Find posts by matching the formatted slug
  const allCategories = await getAllCategories()
  const matchingCategory = allCategories.find((cat) => formatUrlSlug(cat) === categorySlug)

  if (!matchingCategory) {
    notFound()
  }

  const posts = await getPostsByCategory(matchingCategory)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 dark:from-purple-900/10 dark:via-transparent dark:to-pink-900/10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-8 inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <svg
                  className="h-8 w-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                <span className="gradient-text">{categoryName}</span> Posts
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
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
            className="inline-flex items-center space-x-2 px-6 py-3 glass-button rounded-2xl text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
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
