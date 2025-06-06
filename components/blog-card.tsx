import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group glass-card rounded-2xl overflow-hidden card-hover">
      {post.coverImage && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-6">
        <div className="mb-4">
          <Link
            href={`/category/${post.category}`}
            className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
          >
            {post.category}
          </Link>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          <Link href={`/${post.category}/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          </div>
        </div>

        <Link
          href={`/${post.category}/${post.slug}`}
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group/link"
        >
          <span>Read more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
