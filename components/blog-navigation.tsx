import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogNavigationProps {
  prevPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogNavigation({ prevPost, nextPost }: BlogNavigationProps) {
  if (!prevPost && !nextPost) return null

  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        {prevPost && (
          <Link
            href={`/${prevPost.category}/${prevPost.slug}`}
            className="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-sm font-medium">Previous</div>
              <div className="text-lg font-semibold">{prevPost.title}</div>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 text-right">
        {nextPost && (
          <Link
            href={`/${nextPost.category}/${nextPost.slug}`}
            className="group flex items-center justify-end space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div>
              <div className="text-sm font-medium">Next</div>
              <div className="text-lg font-semibold">{nextPost.title}</div>
            </div>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </nav>
  )
}
