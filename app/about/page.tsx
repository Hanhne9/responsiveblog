import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Modern Blog and our mission to share knowledge.",
}

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">About Modern Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Sharing knowledge and insights about web development, design, and technology
          </p>
        </div>

        <div className="prose prose-lg prose-gray dark:prose-invert mx-auto">
          <p>
            Welcome to Modern Blog, a platform dedicated to sharing insights, tutorials, and thoughts on web
            development, design, and technology. Built with the latest technologies including Next.js, MDX, and Tailwind
            CSS.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe in the power of sharing knowledge and helping developers grow. Our mission is to provide
            high-quality content that helps you stay up-to-date with the latest trends and best practices in web
            development.
          </p>

          <h2>What You'll Find Here</h2>
          <ul>
            <li>In-depth tutorials on modern web technologies</li>
            <li>Best practices for web development and design</li>
            <li>Insights into the latest industry trends</li>
            <li>Tips and tricks to improve your development workflow</li>
          </ul>

          <h2>Technology Stack</h2>
          <p>
            This blog is built using cutting-edge technologies to ensure the best performance and developer experience:
          </p>
          <ul>
            <li>
              <strong>Next.js 15</strong> - React framework with App Router
            </li>
            <li>
              <strong>MDX</strong> - Markdown with React components
            </li>
            <li>
              <strong>Tailwind CSS</strong> - Utility-first CSS framework
            </li>
            <li>
              <strong>TypeScript</strong> - Type-safe JavaScript
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
