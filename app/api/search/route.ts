import { getAllPosts } from "@/lib/blog"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json([])
  }

  const allPosts = await getAllPosts()
  const searchQuery = query.toLowerCase()

  const results = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
      post.category.toLowerCase().includes(searchQuery),
  )

  return NextResponse.json(results)
}
