// Create a tags index page with better empty state handling
import Link from "next/link"
import { getAllTags } from "@/lib/blog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "lucide-react"

export const metadata = {
  title: "Tags",
  description: "Browse blog posts by tag",
}

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Tags</h1>
          <p className="text-lg text-muted-foreground">Browse blog posts by tag</p>
        </div>

        {tags.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name}`}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {tag.name}
                    </CardTitle>
                    <CardDescription>
                      {tag.count} post{tag.count !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">View all posts tagged with "{tag.name}"</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full py-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Tag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">No tags found</h2>
            <p className="mt-2 text-muted-foreground">Add tagged blog posts to see them listed here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

