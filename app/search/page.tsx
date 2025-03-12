"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

interface Post {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  featuredImage?: string
  tags?: string[]
  readingTime?: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Post[]>([])
  const [searched, setSearched] = useState(false)

  // Load initial results if query is present
  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    setIsLoading(true)
    setSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      if (!response.ok) {
        throw new Error("Search request failed")
      }
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Search</h1>
          <p className="text-lg text-muted-foreground">Search for blog posts by title, content, or tags</p>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>

          {searched && (
            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : results.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query || searchQuery}"
                  </h2>
                  <div className="grid gap-6">
                    {results.map((post) => (
                      <Card key={post.slug} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
                        <CardHeader className="flex flex-col space-y-2">
                          <CardTitle className="line-clamp-1">
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>{formatDate(post.date)}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {post.tags.map((tag) => (
                                <Link
                                  key={tag}
                                  href={`/tags/${tag}`}
                                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {tag}
                                </Link>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Read more
                          </Link>
                          {post.readingTime && (
                            <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full py-12 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <SearchIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">No results found</h2>
                  <p className="mt-2 text-muted-foreground">
                    No posts match your search query. Try different keywords.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

