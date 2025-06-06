import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

// Custom Alert Component
function Alert({
  type = "info",
  children,
}: { type?: "info" | "warning" | "error" | "success"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
  }

  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle,
  }

  const Icon = icons[type]

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-6`}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

// Custom Code Block Component
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="relative">
      <pre className={`${className} overflow-x-auto p-4 rounded-lg bg-gray-900 text-gray-100`}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

// Custom Image Component
function CustomImage({ src, alt, width, height, ...props }: any) {
  return (
    <div className="my-8">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width || 800}
        height={height || 400}
        className="rounded-lg shadow-lg mx-auto"
        {...props}
      />
      {alt && <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">{alt}</p>}
    </div>
  )
}

// Custom Link Component
function CustomLink({ href, children, ...props }: any) {
  const isExternal = href?.startsWith("http")

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline" {...props}>
      {children}
    </Link>
  )
}

export const mdxComponents = {
  // Override default HTML elements
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-0">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-12">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-8">{children}</h3>
  ),
  p: ({ children }: any) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{children}</p>,
  a: CustomLink,
  img: CustomImage,
  pre: CodeBlock,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 my-6 italic">
      {children}
    </blockquote>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">{children}</ol>
  ),

  // Custom components
  Alert,
  Image: CustomImage,
}
