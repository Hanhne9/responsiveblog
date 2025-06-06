import Link from "next/link"
import Image from "next/image"
import { Clock, User, Folder } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  const [mainPost, ...sidePosts] = posts

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Featured Post */}
      <article className="lg:row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
        {mainPost.coverImage && (
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={mainPost.coverImage || "/placeholder.svg"}
              alt={mainPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <Link
                  href={`/category/${mainPost.category}`}
                  className="px-2 py-1 text-xs font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center gap-1"
                >
                  <Folder className="h-3 w-3" />
                  {mainPost.category}
                </Link>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                <Link href={`/${mainPost.category}/${mainPost.slug}`} className="hover:text-blue-300 transition-colors">
                  {mainPost.title}
                </Link>
              </h3>
            </div>
          </div>
        )}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{mainPost.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{mainPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{mainPost.readingTime} min</span>
              </div>
            </div>
            <time dateTime={mainPost.date}>{new Date(mainPost.date).toLocaleDateString()}</time>
          </div>
        </div>
      </article>

      {/* Side Featured Posts */}
      <div className="space-y-6">
        {sidePosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
          >
            <div className="flex">
              {post.coverImage && (
                <div className="w-32 h-24 relative flex-shrink-0">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  <Link
                    href={`/category/${post.category}`}
                    className="px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  <Link
                    href={`/${post.category}/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
