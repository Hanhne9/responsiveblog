import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import { Hero } from "@/components/hero"
import { CategoriesTagsSidebar } from "@/components/categories-tags-sidebar"

export default async function HomePage() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Posts Section */}
      <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our most popular and insightful content
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Recent <span className="gradient-text">Posts</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Stay updated with our latest articles and insights</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CategoriesTagsSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
