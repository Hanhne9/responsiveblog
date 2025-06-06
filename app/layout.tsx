import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Modern Blog",
    template: "%s | Modern Blog",
  },
  description: "A modern blog built with Next.js, MDX, and Tailwind CSS",
  keywords: ["blog", "nextjs", "mdx", "tailwind", "react"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-blog.com",
    title: "Modern Blog",
    description: "A modern blog built with Next.js, MDX, and Tailwind CSS",
    siteName: "Modern Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Blog",
    description: "A modern blog built with Next.js, MDX, and Tailwind CSS",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
