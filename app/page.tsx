import Link from 'next/link'
import { Target, Phone, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/data/changelogs'
import { formatDate } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="h-4 w-4 shrink-0" />,
  Phone: <Phone className="h-4 w-4 shrink-0" />,
}

const colorMap: Record<string, { icon: string; dot: string }> = {
  blue: { icon: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500' },
  violet: { icon: 'bg-violet-100 text-violet-600', dot: 'bg-violet-500' },
}

const typeVariantMap = {
  feature: 'feature' as const,
  improvement: 'improvement' as const,
  fix: 'fix' as const,
  breaking: 'breaking' as const,
}

const typeLabelMap = {
  feature: 'New',
  improvement: 'Improved',
  fix: 'Fixed',
  breaking: 'Breaking',
}

export default function HomePage() {
  const allEntries = categories
    .flatMap((cat) => cat.entries.map((entry) => ({ ...entry, category: cat })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalUpdates = categories.reduce((sum, cat) => sum + cat.entries.length, 0)

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-12 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
          All updates
        </h1>
        <p className="text-muted-foreground">
          {totalUpdates} updates across {categories.length} product areas
        </p>
      </div>

      {/* 2-col grid: entries left, category cards right */}
      <div className="grid grid-cols-[1fr_300px] divide-x divide-border min-h-screen">

        {/* Left: full entry list */}
        <div className="px-12 py-10 space-y-3">
          {allEntries.map(({ category, ...entry }) => {
            const colors = colorMap[category.color]
            return (
              <Link key={entry.id} href={`/${category.slug}/`} className="group block">
                <div className="flex items-start gap-4 rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all group-hover:border-border group-hover:shadow-md">
                  <div className={`mt-0.5 p-2 rounded-lg ${colors.icon} shrink-0`}>
                    {iconMap[category.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {category.name}
                      </span>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <time className="text-xs text-muted-foreground">{formatDate(entry.date)}</time>
                      {entry.version && (
                        <span className="text-xs text-muted-foreground font-mono">v{entry.version}</span>
                      )}
                      <Badge variant={typeVariantMap[entry.type]} className="text-[10px] px-1.5 py-0">
                        {typeLabelMap[entry.type]}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">{entry.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{entry.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Right: category overview cards */}
        <div className="px-6 py-10 space-y-4 bg-muted/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-5">
            Product areas
          </p>
          {categories.map((cat) => {
            const latest = cat.entries[0]
            const colors = colorMap[cat.color]
            return (
              <Link key={cat.id} href={`/${cat.slug}/`} className="group block">
                <div className="rounded-xl border bg-white p-5 shadow-sm transition-all group-hover:shadow-md group-hover:border-border/60">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${colors.icon}`}>
                      {iconMap[cat.icon]}
                    </div>
                    <span className="text-sm font-semibold">{cat.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span>{cat.entries.length} updates</span>
                    {latest && <span>Latest {formatDate(latest.date)}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
