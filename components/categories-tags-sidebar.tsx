import Link from "next/link"
import { getAllCategories, getAllTags } from "@/lib/blog"
import { Folder, Tag } from "lucide-react"

export async function CategoriesTagsSidebar() {
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Categories</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="block px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200 capitalize"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="px-3 py-1 text-sm bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-600/80 text-gray-700 dark:text-gray-300 rounded-full hover:from-blue-100/80 hover:to-purple-100/80 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 backdrop-blur-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
