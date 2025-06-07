"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, BookOpen, Search, Sun, Moon, ChevronDown, Folder } from "lucide-react"
import { useTheme } from "next-themes"

// Define the BlogPost type here to avoid importing from lib/blog
interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  category: string
  coverImage?: string
  readingTime: number
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    // Fetch categories from API
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err))

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Debounce search
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          .then((res) => res.json())
          .then((data) => setSearchResults(data))
          .catch((err) => console.error("Search failed:", err))
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && searchResults.length > 0) {
      // Navigate to first result
      window.location.href = `/blog/${searchResults[0].slug}`
    }
  }

  const handleSearchResultClick = (slug: string) => {
    setIsSearchOpen(false)
    setSearchQuery("")
    window.location.href = `/blog/${slug}`
  }

  if (!mounted) return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg"
          : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Modern Blog
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/20 dark:border-gray-700/20 py-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${encodeURIComponent(category)}`}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      <Folder className="h-4 w-4" />
                      <span className="capitalize">{category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Search & Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/20 dark:border-gray-700/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</div>
                <div className="space-y-1 ml-4">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${encodeURIComponent(category)}`}
                      className="flex items-center space-x-2 px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Folder className="h-3 w-3" />
                      <span className="capitalize text-sm">{category}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-6">
            <form onSubmit={handleSearch} className="flex items-center space-x-4">
              <Search className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 bg-transparent text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </form>

            {/* Search Results */}
            {searchQuery && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                    </div>
                    {searchResults.slice(0, 5).map((post) => (
                      <button
                        key={post.slug}
                        onClick={() => handleSearchResultClick(post.slug)}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">{post.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No articles found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {searchQuery ? "Click on a result to view the article" : "Press Enter to search or Esc to close"}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
