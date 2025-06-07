import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import type { Metadata } from "next"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query ? `Search results for "${query}"` : "Search for articles",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const allPosts = await getAllPosts()

  const searchResults = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          post.category.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30 dark:from-green-900/10 dark:via-transparent dark:to-blue-900/10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-8 inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {query ? (
                  <>
                    Search results for <span className="gradient-text">"{query}"</span>
                  </>
                ) : (
                  "Search Articles"
                )}
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {query ? (
                <>
                  {searchResults.length} {searchResults.length === 1 ? "article" : "articles"} found
                </>
              ) : (
                "Enter a search term to find articles"
              )}
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form action="/search" method="GET" className="glass-card rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="flex-1 bg-transparent text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <>
            {searchResults.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="glass-card rounded-2xl p-8 inline-block">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    <svg
                      className="h-16 w-16 mx-auto mb-4 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try searching with different keywords or browse our categories.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 glass-button rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
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
