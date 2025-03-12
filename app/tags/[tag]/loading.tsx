export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading tagged posts...</p>
      </div>
    </div>
  )
}

