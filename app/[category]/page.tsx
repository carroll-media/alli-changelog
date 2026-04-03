import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Target, Phone, ArrowLeft } from 'lucide-react'
import { ChangelogEntryCard } from '@/components/changelog-entry'
import { categories, getCategoryBySlug, getAllSlugs } from '@/data/changelogs'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ category: slug }))
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const cat = getCategoryBySlug(params.category)
  if (!cat) return {}
  return {
    title: `${cat.name} — Alli Changelog`,
    description: cat.description,
  }
}

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200',
  violet: 'bg-violet-50 text-violet-600 ring-1 ring-violet-200',
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryBySlug(params.category)
  if (!cat) notFound()

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All products
      </Link>

      {/* Category header */}
      <div className="flex items-start gap-4 mb-10">
        <div className={`p-3 rounded-xl ${colorMap[cat.color]} shrink-0`}>
          {iconMap[cat.icon]}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{cat.name}</h1>
          <p className="text-muted-foreground mt-1">{cat.description}</p>
          <p className="text-sm text-muted-foreground mt-2">{cat.entries.length} updates</p>
        </div>
      </div>

      {/* Other categories quick nav */}
      <div className="flex gap-2 mb-10">
        {categories
          .filter((c) => c.id !== cat.id)
          .map((other) => (
            <Link
              key={other.id}
              href={`/${other.slug}/`}
              className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {iconMap[other.icon]}
              {other.name}
            </Link>
          ))}
      </div>

      {/* Timeline */}
      <div>
        {cat.entries.map((entry, i) => (
          <ChangelogEntryCard
            key={entry.id}
            entry={entry}
            isLast={i === cat.entries.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
