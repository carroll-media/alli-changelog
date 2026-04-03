import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Alli Changelog',
  description: 'Track all updates and improvements across the Alli AI platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Sidebar />
        <div className="pl-56 min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
