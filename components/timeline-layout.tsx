import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, Folder } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface TimelineLayoutProps {
  posts: BlogPost[]
}

export function TimelineLayout({ posts }: TimelineLayoutProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="space-y-12">
        {posts.map((post, index) => (
          <article key={post.slug} className="relative flex items-start space-x-8">
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                {post.coverImage && (
                  <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Link
                      href={`/category/${post.category}`}
                      className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-1"
                    >
                      <Folder className="h-3 w-3" />
                      {post.category}
                    </Link>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    <Link
                      href={`/${post.category}/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
