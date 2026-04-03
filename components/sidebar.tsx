'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Target, Phone } from 'lucide-react'
import { categories } from '@/data/changelogs'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="h-4 w-4 shrink-0" />,
  Phone: <Phone className="h-4 w-4 shrink-0" />,
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-56 border-r border-border bg-background flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-border shrink-0 gap-3">
        <Image
          src="/images/alli-logo.png"
          alt="Alli"
          width={80}
          height={28}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">
          Products
        </p>
        {categories.map((cat) => {
          const isActive = pathname === `/${cat.slug}` || pathname === `/${cat.slug}/`
          return (
            <Link
              key={cat.id}
              href={`/${cat.slug}/`}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {iconMap[cat.icon]}
              {cat.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border shrink-0">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors',
            pathname === '/'
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          All updates
        </Link>
      </div>
    </aside>
  )
}
