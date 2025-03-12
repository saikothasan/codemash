import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: post.featuredImage || "/placeholder.svg?width=1200&height=630&text=Blog+Post",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || "/placeholder.svg?width=1200&height=630&text=Blog+Post"],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-10 mx-auto">
      <Link href="/blog" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={16} />
        <span>Back to all posts</span>
      </Link>

      <article className="mx-auto max-w-3xl prose prose-slate dark:prose-invert">
        {post.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.author}</span>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
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
        <Mdx content={post.content} />
      </article>
    </div>
  )
}

