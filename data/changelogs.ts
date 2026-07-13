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
  image: string
  entries: ChangelogEntry[]
}

export const categories: Category[] = [
  {
    id: 'ai-voice',
    slug: 'ai-voice',
    name: 'AI Voice',
    description: 'Updates to the AI voice receptionist — every call answered, every opportunity captured.',
    icon: 'Phone',
    color: 'violet',
    image: '/images/alli-voice.png',
    entries: [
      {
        id: 'av-2026-07-13-a',
        date: '2026-07-13',
        title: 'Smarter call summary emails',
        description: 'Call summary emails now run on a significantly smarter AI model with rewritten instructions. The biggest win is the Action Items section: it now reliably lists what your team owes the caller after every call, promised callbacks, quotes to send, and unresolved requests. Previously it often showed nothing even when a follow-up was promised on the call.',
        type: 'improvement',
      },
      {
        id: 'av-2026-07-13-b',
        date: '2026-07-13',
        title: 'Smoother Allstate support handoffs',
        description: 'When Allstate\'s national support line calls an agency to hand off a customer, Alli now recognizes the caller instantly and welcomes the handoff instead of treating them like an unknown caller. This works around the clock, including after hours.',
        type: 'improvement',
      },
      {
        id: 'av-2026-04-02-a',
        date: '2026-04-02',
        title: 'Call transfers are now guaranteed',
        description: 'When Alli transfers a call or wraps up a conversation, those actions now execute every single time — even when multiple things happen at once. Previously, a transfer and a closing message happening together could cause the transfer to silently get dropped.',
        type: 'fix',
      },
      {
        id: 'av-2026-04-02-b',
        date: '2026-04-02',
        title: 'Duplicate summary emails eliminated',
        description: 'There was a scenario where the same call could trigger two summary emails to the business. That is now impossible — the system checks before sending and discards any duplicate.',
        type: 'fix',
      },
      {
        id: 'av-2026-04-02-c',
        date: '2026-04-02',
        title: 'Summary emails survive server restarts',
        description: 'If a summary email was being processed at the exact moment of a server restart or deploy, it would be silently lost. The system now recovers and resends any missed emails automatically on startup.',
        type: 'fix',
      },
      {
        id: 'av-2026-04-02-d',
        date: '2026-04-02',
        title: 'Post-call webhooks now retry on failure',
        description: 'If a business\'s configured webhook URL fails or times out after a call, the system now automatically retries up to 3 times before giving up. No more missed notifications from a temporary connection hiccup.',
        type: 'improvement',
      },
      {
        id: 'av-2026-04-02-e',
        date: '2026-04-02',
        title: 'Long calls no longer drop mid-conversation',
        description: 'Calls over 8 minutes used to hit a hard connection limit, causing a 1–3 second gap in the conversation. Alli now anticipates this, briefly lets the caller know, and picks up exactly where she left off — no abrupt interruptions.',
        type: 'fix',
      },
      {
        id: 'av-2026-04-02-f',
        date: '2026-04-02',
        title: 'Smoother reconnection after dropped calls',
        description: 'When a call drops and Alli reconnects, the handoff is now cleaner. There are no ghost actions firing after the session has already ended.',
        type: 'fix',
      },
      {
        id: 'av-2026-04-02-g',
        date: '2026-04-02',
        title: 'Increased call capacity',
        description: 'Alli can now handle significantly more simultaneous calls by automatically routing to whichever region has available capacity. Effective capacity has doubled — high-volume periods won\'t cause delays or missed calls.',
        type: 'improvement',
      },
      {
        id: 'av-2026-04-02-h',
        date: '2026-04-02',
        title: 'Alli\'s behavior is fully consistent across all calls',
        description: 'The core rules that govern how Alli behaves on every call — how she handles being asked if she\'s an AI, how she responds to silence, what she never says — are now centralized in one place. Previously these could drift out of sync across different parts of the system.',
        type: 'improvement',
      },
      {
        id: 'av-2026-04-02-i',
        date: '2026-04-02',
        title: 'Caller manipulation attempts are now blocked',
        description: 'A security gap has been closed where a caller could craft a specific phrase that might influence how Alli behaves after a reconnection. Caller messages are now sanitized before being replayed into a new session.',
        type: 'improvement',
      },
      {
        id: 'av-2026-04-02-j',
        date: '2026-04-02',
        title: 'Greeting latency tracked on every call',
        description: 'The exact time between a call connecting and Alli\'s first word is now logged for every call. This gives us a clear, ongoing picture of how responsive Alli feels to callers and flags any slowdowns immediately.',
        type: 'improvement',
      },
    ],
  },
  {
    id: 'ai-leads',
    slug: 'ai-leads',
    name: 'AI Lead Detection',
    description: 'Updates to the AI-Powered lead detection, never miss a lead again.',
    icon: 'Target',
    color: 'blue',
    image: '/images/alli-leads.png',
    entries: [
      {
        id: 'al-2026-03-16-a',
        date: '2026-03-16',
        title: 'Alli now automatically researches your leads',
        description: 'When a lead has a business email, Alli now automatically looks up their company, pulls key info from their website, and uses industry-specific talking points in follow-up conversations. Better context means more relevant outreach.',
        type: 'feature',
        items: [
          'Company name and industry detected automatically from email domain',
          'Company website scraped and summarized for AI context',
          'Industry-specific proof points pulled into follow-up messaging',
          'Company names extracted from SMS conversations and added to the lead record',
        ],
      },
      {
        id: 'al-2026-03-16-b',
        date: '2026-03-16',
        title: '154 stuck leads recovered and back in nurture',
        description: 'A group of leads who came in through event keyword flows were stuck with no status and no follow-up — they had fallen completely through the cracks. Root cause identified and fixed, all affected leads are now active in their nurture sequences.',
        type: 'fix',
      },
      {
        id: 'al-2026-02-23-a',
        date: '2026-02-23',
        title: 'Daily leads report rebuilt — now always accurate',
        description: 'The previous daily report was based on snapshots that would reset every time the server restarted, causing all 46,000+ leads to show as "new" after a deploy. It now pulls live from the database every time — accurate regardless of server state.',
        type: 'fix',
        items: [
          'Campaign breakdown with new leads today and running totals',
          'Report sent automatically every day at 9 AM ET',
        ],
      },
      {
        id: 'al-2026-02-23-b',
        date: '2026-02-23',
        title: 'API rate limit handling — no more dropped campaigns',
        description: 'When the AI Leads API hits its rate limit, the system now automatically retries up to 3 times before giving up. Previously a rate limit hit during onboarding would silently fail and leave the client without a campaign.',
        type: 'fix',
      },
      {
        id: 'al-2026-02-20',
        date: '2026-02-20',
        title: 'Daily AI Lead Detection summary email',
        description: 'Every lead flowing through the system is now logged and delivered as a daily summary email grouped by campaign — so you always have a clear picture of what came in and where it went.',
        type: 'feature',
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
