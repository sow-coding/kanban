import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'

const kanbanFont = Plus_Jakarta_Sans ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban',
  description: 'A SaaS to manage your business and your time'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={kanbanFont.className}>{children}</body>
    </html>
  )
}
