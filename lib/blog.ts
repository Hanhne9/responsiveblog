import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  category: string
  coverImage?: string
  readingTime: number
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          content,
          author: data.author || "Anonymous",
          tags: data.tags || [],
          category: data.category || "general",
          coverImage: data.coverImage,
          readingTime: calculateReadingTime(content),
        } as BlogPost
      })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content,
      author: data.author || "Anonymous",
      tags: data.tags || [],
      category: data.category || "general",
      coverImage: data.coverImage,
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    return null
  }
}

export async function getPostByCategoryAndSlug(category: string, slug: string): Promise<BlogPost | null> {
  const post = await getPostBySlug(slug)
  if (post && post.category === category) {
    return post
  }
  return null
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = [...new Set(allPosts.map((post) => post.category))]
  return categories.sort()
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tags = [...new Set(allPosts.flatMap((post) => post.tags))]
  return tags.sort()
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
