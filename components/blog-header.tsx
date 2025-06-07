import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

// Helper function to format display names
function formatDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Helper function to format URL slugs
function formatUrlSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
}

interface BlogHeaderProps {
  post: BlogPost
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      {post.coverImage && (
        <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={`/category/${formatUrlSlug(post.category)}`}
          className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          {formatDisplayName(post.category)}
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${formatUrlSlug(tag)}`}
              className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {formatDisplayName(tag)}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
