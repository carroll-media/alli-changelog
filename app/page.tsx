import Link from 'next/link'
import { Target, Phone, ArrowRight, Sparkles, CheckCircle2, Wrench, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/data/changelogs'
import { formatDate } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200',
  violet: 'bg-violet-50 text-violet-600 ring-1 ring-violet-200',
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
  const latestEntries = categories.flatMap((cat) =>
    cat.entries.slice(0, 1).map((entry) => ({ ...entry, category: cat }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalUpdates = categories.reduce((sum, cat) => sum + cat.entries.length, 0)

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          What&apos;s new in Alli
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Stay up to date with every improvement, new feature, and fix across the Alli AI platform.
        </p>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {totalUpdates} total updates
          </span>
          <span>·</span>
          <span>{categories.length} product areas</span>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {categories.map((cat) => {
          const latest = cat.entries[0]
          return (
            <Link key={cat.id} href={`/${cat.slug}/`} className="group block">
              <Card className="h-full transition-shadow group-hover:shadow-md group-hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2 rounded-lg ${colorMap[cat.color]}`}>
                      {iconMap[cat.icon]}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 mt-1 group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="mt-3">{cat.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {cat.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{cat.entries.length} updates</span>
                    {latest && (
                      <span>Latest: {formatDate(latest.date)}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent updates</h2>
        <div className="space-y-3">
          {latestEntries.map(({ category, ...entry }) => (
            <Link key={entry.id} href={`/${category.slug}/`} className="group block">
              <div className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors group-hover:border-primary/30 group-hover:bg-accent/30">
                <div className={`mt-0.5 p-1.5 rounded-md ${colorMap[category.color]} shrink-0`}>
                  <div className="h-3.5 w-3.5">{iconMap[category.icon]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">{category.name}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <time className="text-xs text-muted-foreground">{formatDate(entry.date)}</time>
                    <Badge variant={typeVariantMap[entry.type]} className="text-[10px] px-1.5 py-0">
                      {typeLabelMap[entry.type]}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{entry.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{entry.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-1 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
