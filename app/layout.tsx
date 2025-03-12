import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Next.js Markdown Blog",
    template: "%s | Next.js Markdown Blog",
  },
  description: "A blog built with Next.js and Markdown",
  keywords: ["Next.js", "React", "Markdown", "Blog", "Web Development"],
  authors: [
    {
      name: "Your Name",
    },
  ],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextjs-markdown-blog.vercel.app/",
    title: "Next.js Markdown Blog",
    description: "A blog built with Next.js and Markdown",
    siteName: "Next.js Markdown Blog",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630&text=Next.js+Markdown+Blog",
        width: 1200,
        height: 630,
        alt: "Next.js Markdown Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Markdown Blog",
    description: "A blog built with Next.js and Markdown",
    creator: "@yourusername",
    images: ["/placeholder.svg?width=1200&height=630&text=Next.js+Markdown+Blog"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://nextjs-markdown-blog.vercel.app"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'