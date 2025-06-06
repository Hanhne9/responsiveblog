import Link from "next/link"
import Image from "next/image"
import { Clock, User, Tag, Folder } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface MasonryLayoutProps {
  posts: BlogPost[]
}

export function MasonryLayout({ posts }: MasonryLayoutProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className="break-inside-avoid bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group mb-6"
          style={{
            height: index % 3 === 0 ? "auto" : index % 3 === 1 ? "420px" : "350px",
          }}
        >
          {post.coverImage && (
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex flex-wrap gap-1 mb-3">
              <Link
                href={`/category/${post.category}`}
                className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-1"
              >
                <Folder className="h-3 w-3" />
                {post.category}
              </Link>
              {post.tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-3">
              <Link
                href={`/${post.category}/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.title}
              </Link>
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-3">{post.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime}m</span>
                </div>
              </div>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
