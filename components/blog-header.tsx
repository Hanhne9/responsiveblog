import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

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

      <div className="mb-4">
        <Link
          href={`/category/${post.category}`}
          className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
        >
          {post.category}
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
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
    </header>
  )
}
