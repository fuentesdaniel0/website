import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://resume-app-849688752380.us-central1.run.app'),
  title: 'Daniel Fuentes',
  description: 'Full-Stack & Cloud Engineer',
  openGraph: {
    title: 'Daniel Fuentes',
    description: 'Full-Stack & Cloud Engineer',
    url: 'https://resume-app-849688752380.us-central1.run.app/',
    siteName: 'Daniel Fuentes Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph_preview.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Fuentes - Full-Stack & Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Fuentes',
    description: 'Full-Stack & Cloud Engineer',
    images: ['/opengraph_preview.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
