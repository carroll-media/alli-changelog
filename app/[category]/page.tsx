import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Target, Phone } from 'lucide-react'
import { ChangelogEntryCard } from '@/components/changelog-entry'
import { getCategoryBySlug, getAllSlugs } from '@/data/changelogs'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ category: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
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

const heroBgMap: Record<string, string> = {
  blue: 'from-blue-50 via-indigo-50/40 to-background',
  violet: 'from-violet-50 via-purple-50/40 to-background',
}

const iconBgMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  violet: 'bg-violet-100 text-violet-600',
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  return (
    <div>
      {/* Hero — full width of content area */}
      <div className={`relative bg-gradient-to-br ${heroBgMap[cat.color]} border-b border-border overflow-hidden`}>
        <div className="flex items-end justify-between px-12 pt-12">
          {/* Left: text */}
          <div className="pb-12 max-w-lg">
            <div className={`inline-flex p-2.5 rounded-xl ${iconBgMap[cat.color]} mb-5`}>
              {iconMap[cat.icon]}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3 leading-tight">
              {cat.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed">{cat.description}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{cat.entries.length}</span> updates
            </p>
          </div>

          {/* Right: Alli character — bottom-aligned, no bottom padding so she sits on the edge */}
          <div className="relative h-[260px] w-[260px] shrink-0 self-end">
            <Image
              src={cat.image}
              alt={`Alli — ${cat.name}`}
              fill
              className="object-contain object-bottom drop-shadow-xl"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-12 py-12">
        {cat.entries.map((entry, i) => (
          <ChangelogEntryCard
            key={entry.id}
            entry={entry}
            isLast={i === cat.entries.length - 1}
            showDate={i === 0 || cat.entries[i - 1].date !== entry.date}
          />
        ))}
      </div>
    </div>
  )
}
