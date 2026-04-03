export type ChangeType = 'feature' | 'improvement' | 'fix' | 'breaking'

export interface ChangelogEntry {
  id: string
  date: string
  version?: string
  title: string
  description: string
  type: ChangeType
  items?: string[]
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  color: string
  entries: ChangelogEntry[]
}

export const categories: Category[] = [
  {
    id: 'ai-leads',
    slug: 'ai-leads',
    name: 'AI Lead Detection',
    description: 'Updates to the AI-powered website visitor identification and lead scoring system.',
    icon: 'Target',
    color: 'blue',
    entries: [
      {
        id: 'al-2026-04-01',
        date: '2026-04-01',
        version: '2.4.0',
        title: 'Enhanced visitor identification accuracy',
        description: 'Improved the lead scoring model with new behavioral signals, resulting in more accurate company identification for B2B visitors.',
        type: 'improvement',
        items: [
          'Added page scroll depth as a behavioral signal',
          'Improved company-to-visitor matching algorithm',
          'Reduced false-positive rate by 18%',
        ],
      },
      {
        id: 'al-2026-03-15',
        date: '2026-03-15',
        version: '2.3.2',
        title: 'Real-time lead alerts to Pipedrive',
        description: 'New leads detected on client websites are now pushed to Pipedrive in real-time with full visitor session data.',
        type: 'feature',
        items: [
          'Automatic deal creation in Pipedrive on new lead detection',
          'Session replay link attached to each Pipedrive deal',
          'Configurable lead score threshold for alert triggers',
        ],
      },
      {
        id: 'al-2026-03-01',
        date: '2026-03-01',
        version: '2.3.0',
        title: 'Lead score dashboard redesign',
        description: 'The lead detection dashboard has been redesigned for faster triage and easier filtering.',
        type: 'improvement',
        items: [
          'New filterable lead table with company, score, and last-seen columns',
          'Date range picker for historical lead analysis',
          'Export to CSV added',
        ],
      },
      {
        id: 'al-2026-02-12',
        date: '2026-02-12',
        version: '2.2.1',
        title: 'Fixed duplicate lead entries',
        description: 'Resolved an issue where returning visitors within the same session were being counted as separate leads.',
        type: 'fix',
      },
    ],
  },
  {
    id: 'ai-voice',
    slug: 'ai-voice',
    name: 'AI Voice',
    description: 'Updates to the AI phone receptionist powered by AWS Nova Sonic.',
    icon: 'Phone',
    color: 'violet',
    entries: [
      {
        id: 'av-2026-04-01',
        date: '2026-04-01',
        version: '3.1.0',
        title: 'Nova Sonic v2 upgrade',
        description: 'Upgraded the voice model to Nova Sonic v2, delivering noticeably more natural conversation flow and faster response latency.',
        type: 'improvement',
        items: [
          'Average response latency reduced from 1.2s to 0.7s',
          'Improved handling of interruptions mid-sentence',
          'Better accent and dialect recognition',
        ],
      },
      {
        id: 'av-2026-03-20',
        date: '2026-03-20',
        version: '3.0.5',
        title: 'Voicemail detection',
        description: 'The AI receptionist now detects when a call goes to voicemail and leaves a pre-configured message automatically.',
        type: 'feature',
        items: [
          'Automatic voicemail detection via Bland AI',
          'Configurable voicemail message per persona',
          'Voicemail drop logged in call history',
        ],
      },
      {
        id: 'av-2026-03-10',
        date: '2026-03-10',
        version: '3.0.3',
        title: 'Live transcript SSE improvements',
        description: 'Fixed dropped transcript segments during high-volume call periods caused by SSE connection timeouts.',
        type: 'fix',
        items: [
          'Added heartbeat pings to prevent SSE timeout',
          'Buffered segment delivery to handle network blips',
        ],
      },
      {
        id: 'av-2026-02-28',
        date: '2026-02-28',
        version: '3.0.0',
        title: 'Multi-persona support',
        description: 'Clients can now configure multiple AI personas per account, routing different phone numbers to different personalities.',
        type: 'feature',
        items: [
          'Unlimited personas per account',
          'Per-persona voice selection (Tiffany, Matthew)',
          'Per-persona system prompt configuration',
          'Phone number → persona routing rules',
        ],
      },
      {
        id: 'av-2026-02-10',
        date: '2026-02-10',
        version: '2.9.0',
        title: 'Call summary auto-generation',
        description: 'After every call, Nova Micro automatically generates a structured call summary and appends it to the call record.',
        type: 'feature',
        items: [
          'AI-generated summary with caller intent, outcome, and next steps',
          'Summary visible in call detail view',
          'Pushed to Pipedrive deal notes automatically',
        ],
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAllSlugs(): string[] {
  return categories.map((c) => c.slug)
}
