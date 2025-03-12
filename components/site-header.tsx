"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, FileText, Search, Tag, Menu } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden text-xl font-bold sm:inline-block">Next.js Blog</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link
              href="/blog"
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/blog" || pathname.startsWith("/blog/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <FileText size={16} />
              <span>Blog</span>
            </Link>
            <Link
              href="/tags"
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/tags" || pathname.startsWith("/tags/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Tag size={16} />
              <span>Tags</span>
            </Link>
            <Link
              href="/search"
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/search" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Search size={16} />
              <span>Search</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button size="sm" asChild className="hidden md:flex">
            <Link href="/subscribe">Subscribe</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === "/" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
                <Link
                  href="/blog"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === "/blog" || pathname.startsWith("/blog/") ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <FileText size={16} />
                  <span>Blog</span>
                </Link>
                <Link
                  href="/tags"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === "/tags" || pathname.startsWith("/tags/") ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Tag size={16} />
                  <span>Tags</span>
                </Link>
                <Link
                  href="/search"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === "/search" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Search size={16} />
                  <span>Search</span>
                </Link>
                <Link
                  href="/subscribe"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === "/subscribe" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>Subscribe</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

