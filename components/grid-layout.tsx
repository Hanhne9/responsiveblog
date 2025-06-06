import { BlogCard } from "@/components/blog-card"
import type { BlogPost } from "@/lib/blog"

interface GridLayoutProps {
  posts: BlogPost[]
}

export function GridLayout({ posts }: GridLayoutProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
