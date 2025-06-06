"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/components/mdx-components"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: mdxComponents.h1,
          h2: mdxComponents.h2,
          h3: mdxComponents.h3,
          p: mdxComponents.p,
          a: mdxComponents.a,
          img: mdxComponents.img,
          blockquote: mdxComponents.blockquote,
          ul: mdxComponents.ul,
          ol: mdxComponents.ol,
          pre: ({ children }) => (
            <pre className="overflow-x-auto p-4 rounded-lg bg-gray-900 text-gray-100">{children}</pre>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="px-1 py-0.5 rounded text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 text-sm">
                  {children}
                </code>
              )
            }
            return <code className={className}>{children}</code>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
