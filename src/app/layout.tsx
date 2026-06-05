import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Daniel Fuentes',
  description: 'Full-Stack & Cloud Engineer',
  openGraph: {
    title: 'Daniel Fuentes',
    description: 'Full-Stack & Cloud Engineer',
    images: ['/opengraph_preview.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
