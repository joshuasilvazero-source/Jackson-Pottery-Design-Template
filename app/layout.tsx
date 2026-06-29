import type { Metadata } from 'next'
import { Playfair_Display, Manrope, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import GlobalStyles from './GlobalStyles'
import SessionProvider from '@/components/SessionProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jackson Pottery — Designer Planters for Exceptional Spaces',
  description:
    'Premium handcrafted planters and outdoor décor designed to define space. Shop landscape planters, garden vessels, fountains, and accessories.',
  keywords:
    'designer planters, landscape planters, garden planters, premium outdoor decor, terracotta planters, cast stone urns',
  openGraph: {
    title: 'Jackson Pottery — Designer Planters',
    description: 'Premium designer planters that elevate every space they inhabit.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} ${cormorant.variable}`}>
      <head>
        <GlobalStyles />
      </head>
      <body className="bg-white text-[#333333] font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
