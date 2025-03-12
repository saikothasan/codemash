import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"

interface MdxProps {
  content: string
}

export function Mdx({ content }: MdxProps) {
  // Ensure content is a string
  const markdownContent = typeof content === "string" ? content : ""

  if (!markdownContent) {
    return (
      <div className="p-4 border rounded bg-muted/50">
        <p className="text-muted-foreground">No content available</p>
      </div>
    )
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props} />,
          h2: ({ node, ...props }) => (
            <h2
              className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="mt-4 scroll-m-20 text-lg font-semibold tracking-tight" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="mt-4 scroll-m-20 text-base font-semibold tracking-tight" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
          ),
          p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
          ul: ({ node, ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
          li: ({ node, ...props }) => <li className="mt-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />
          ),
          img: ({ node, alt, ...props }) => {
            // Handle image rendering safely
            return (
              <div className="my-6 overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full" alt={alt || ""} {...props} />
                {alt && <span className="block mt-2 text-center text-sm text-muted-foreground">{alt}</span>}
              </div>
            )
          },
          pre: ({ node, ...props }) => (
            <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-slate-900 p-4" {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
                {children}
              </code>
            )
          },
          table: ({ node, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-6 border-muted" {...props} />,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}

