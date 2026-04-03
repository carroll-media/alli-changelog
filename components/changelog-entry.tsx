import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { CheckCircle2, Wrench, Sparkles, AlertTriangle } from 'lucide-react'
import type { ChangelogEntry, ChangeType } from '@/data/changelogs'

const typeConfig: Record<
  ChangeType,
  { label: string; variant: 'feature' | 'improvement' | 'fix' | 'breaking'; icon: React.ReactNode }
> = {
  feature: {
    label: 'New',
    variant: 'feature',
    icon: <Sparkles className="h-3.5 w-3.5" />,
  },
  improvement: {
    label: 'Improved',
    variant: 'improvement',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  fix: {
    label: 'Fixed',
    variant: 'fix',
    icon: <Wrench className="h-3.5 w-3.5" />,
  },
  breaking: {
    label: 'Breaking',
    variant: 'breaking',
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
}

interface ChangelogEntryCardProps {
  entry: ChangelogEntry
  isLast?: boolean
}

export function ChangelogEntryCard({ entry, isLast = false }: ChangelogEntryCardProps) {
  const config = typeConfig[entry.type]

  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="mt-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background shrink-0" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className={`pb-10 flex-1 min-w-0 ${isLast ? 'pb-0' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <time className="text-xs text-muted-foreground tabular-nums">
            {formatDate(entry.date)}
          </time>
          {entry.version && (
            <span className="text-xs text-muted-foreground font-mono">v{entry.version}</span>
          )}
        </div>

        <div className="flex flex-wrap items-start gap-2 mb-2">
          <h3 className="text-base font-semibold text-foreground leading-snug">{entry.title}</h3>
          <Badge variant={config.variant} className="flex items-center gap-1 mt-0.5 shrink-0">
            {config.icon}
            {config.label}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{entry.description}</p>

        {entry.items && entry.items.length > 0 && (
          <ul className="space-y-1.5">
            {entry.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
