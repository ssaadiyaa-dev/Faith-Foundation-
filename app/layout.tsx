import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Amiri } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sadia Faith Foundation — Gratitude in action',
  description:
    'A gratitude-led nonprofit building mosques, sharing food every Friday after Jummah, and creating long-term impact through education and care — from the USA, serving Pakistan.',
  openGraph: {
    title: 'Sadia Faith Foundation — Gratitude in action',
    description:
      'A gratitude-led nonprofit building mosques, sharing free food every Friday, and investing in education and care.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${amiri.variable}`}>
      <body>{children}</body>
    </html>
  )
}
