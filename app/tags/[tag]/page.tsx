// Create a tag-specific page with better empty state handling
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTaggedPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TagIcon } from "lucide-react"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: TagPageProps) {
  return {
    title: `Posts tagged with "${params.tag}"`,
    description: `Browse all blog posts tagged with ${params.tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getTaggedPosts(decodedTag)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <div className="container py-10 mx-auto">
      <Link href="/tags" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={16} />
        <span>Back to all tags</span>
      </Link>

      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TagIcon className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{decodedTag}</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {posts.length} post{posts.length !== 1 ? "s" : ""} tagged with "{decodedTag}"
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
              {post.featuredImage && (
                <div className="overflow-hidden h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
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
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                  Read more
                </Link>
                {post.readingTime && <span className="text-xs text-muted-foreground">{post.readingTime}</span>}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

