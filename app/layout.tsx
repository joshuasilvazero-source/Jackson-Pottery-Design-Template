import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jackson Pottery — Designer Planters for Exceptional Spaces',
  description:
    'Premium handcrafted planters and outdoor décor designed to define space. Shop landscape planters, garden vessels, fountains, and accessories.',
  keywords:
    'designer planters, landscape planters, garden planters, premium outdoor decor, terracotta planters, cast stone urns',
  openGraph: {
    title: 'Jackson Pottery — Designed to Define Space',
    description: 'Premium designer planters that elevate every space they inhabit.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-[#FDFAF5] text-ink font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
