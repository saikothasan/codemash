import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-10 mx-auto text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        href="/"
        className="px-4 py-2 mt-6 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
      >
        Go back home
      </Link>
    </div>
  )
}

