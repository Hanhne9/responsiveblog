"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, User, Folder, ChevronLeft, ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface CardStackLayoutProps {
  posts: BlogPost[]
}

export function CardStackLayout({ posts }: CardStackLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
  }

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length)
  }

  if (posts.length === 0) return null

  return (
    <div className="relative h-96 max-w-md mx-auto">
      {posts.map((post, index) => {
        const offset = index - currentIndex
        const isVisible = Math.abs(offset) <= 2

        if (!isVisible) return null

        return (
          <article
            key={post.slug}
            className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out cursor-pointer"
            style={{
              transform: `
                translateX(${offset * 20}px) 
                translateY(${Math.abs(offset) * 10}px) 
                scale(${1 - Math.abs(offset) * 0.05})
              `,
              zIndex: posts.length - Math.abs(offset),
              opacity: 1 - Math.abs(offset) * 0.2,
            }}
            onClick={() => {
              if (offset > 0) nextCard()
              else if (offset < 0) prevCard()
            }}
          >
            {post.coverImage && (
              <div className="h-48 relative overflow-hidden">
                <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Link
                  href={`/category/${post.category}`}
                  className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Folder className="h-3 w-3" />
                  {post.category}
                </Link>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{post.excerpt}</p>

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
        )
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevCard}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg transition-colors z-50"
        aria-label="Previous card"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextCard}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg transition-colors z-50"
        aria-label="Next card"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Card Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-50">
        {currentIndex + 1} / {posts.length}
      </div>
    </div>
  )
}
