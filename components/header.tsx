import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 max-w-5xl items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-foreground">Alli</span>
          <span className="text-muted-foreground font-normal">Changelog</span>
        </Link>
      </div>
    </header>
  )
}
