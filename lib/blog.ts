import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  featuredImage?: string
  tags?: string[]
  readingTime?: string
}

// Replace the entire getBlogPosts function with this updated version that doesn't create sample posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Ensure the content directory exists
    if (!fs.existsSync(contentDirectory)) {
      console.warn("Content directory does not exist. Creating it now.")
      fs.mkdirSync(contentDirectory, { recursive: true })
      return [] // Return empty array if no content directory
    }

    const files = fs.readdirSync(contentDirectory)
    const markdownFiles = files.filter((file) => file.endsWith(".md"))

    if (markdownFiles.length === 0) {
      console.warn("No markdown files found in content directory.")
      return [] // Return empty array if no markdown files
    }

    const posts = markdownFiles.map((fileName) => {
      try {
        const slug = fileName.replace(".md", "")
        const filePath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)

        // Ensure all required fields have default values
        return {
          slug,
          title: data.title || "Untitled Post",
          date: data.date || new Date().toISOString().split("T")[0],
          author: data.author || "Anonymous",
          excerpt: data.excerpt || truncateContent(content, 150),
          content,
          featuredImage: data.featuredImage || "/placeholder.svg?width=1200&height=630&text=Blog+Post",
          tags: data.tags || ["uncategorized"],
          readingTime: calculateReadingTime(content),
        }
      } catch (error) {
        console.error(`Error processing file ${fileName}:`, error)
        // Return a placeholder post on error
        return createPlaceholderPost(fileName.replace(".md", ""))
      }
    })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Anonymous",
      excerpt: data.excerpt || truncateContent(content, 150),
      content,
      featuredImage: data.featuredImage || "/placeholder.svg?width=1200&height=630&text=Blog+Post",
      tags: data.tags || ["uncategorized"],
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error)
    return null
  }
}

export async function getTaggedPosts(tag: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogPosts()
    return allPosts.filter((post) => post.tags?.includes(tag))
  } catch (error) {
    console.error(`Error getting tagged posts for ${tag}:`, error)
    return []
  }
}

export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  try {
    const posts = await getBlogPosts()
    const tagCounts: Record<string, number> = {}

    posts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => {
          if (tagCounts[tag]) {
            tagCounts[tag]++
          } else {
            tagCounts[tag] = 1
          }
        })
      }
    })

    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  } catch (error) {
    console.error("Error getting all tags:", error)
    return []
  }
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  return `${readingTime} min read`
}

// Search functionality
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogPosts()

    if (!query) return allPosts

    const lowerCaseQuery = query.toLowerCase()

    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.content.toLowerCase().includes(lowerCaseQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)),
    )
  } catch (error) {
    console.error(`Error searching blog posts for "${query}":`, error)
    return []
  }
}

// Helper function to truncate content for excerpts
function truncateContent(content: string, maxLength: number): string {
  if (!content) return ""

  // Remove markdown formatting for cleaner excerpt
  const plainText = content
    .replace(/#+\s+(.*)/g, "$1") // Remove headings
    .replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1") // Remove links but keep text
    .replace(/[*_~`]/g, "") // Remove formatting characters
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) return plainText

  // Find the last space before maxLength to avoid cutting words
  const lastSpace = plainText.lastIndexOf(" ", maxLength)
  return plainText.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "..."
}

// Delete the entire createSamplePost function

// Create a placeholder post for error cases
function createPlaceholderPost(slug: string): BlogPost {
  return {
    slug,
    title: "Error Loading Post",
    date: new Date().toISOString().split("T")[0],
    author: "System",
    excerpt: "There was an error loading this post. Please check the file format and try again.",
    content:
      "# Error Loading Post\n\nThere was an error loading this post. Please check the file format and try again.",
    featuredImage: "/placeholder.svg?width=1200&height=630&text=Error",
    tags: ["error"],
    readingTime: "1 min read",
  }
}

