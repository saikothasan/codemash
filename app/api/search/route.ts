// Update the search API route to use searchParams() function
import { NextResponse } from "next/server"
import { searchBlogPosts } from "@/lib/blog"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get("q") || ""

    if (!query) {
      return NextResponse.json([])
    }

    const results = await searchBlogPosts(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to search posts" }, { status: 500 })
  }
}

