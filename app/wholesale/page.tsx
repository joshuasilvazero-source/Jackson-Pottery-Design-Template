'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { Tag, Headphones, FileText, ArrowRight, Package, BookOpen } from 'lucide-react'
import PriceDisplay from '@/components/PriceDisplay'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products } from '@/lib/data'

const benefits = [
  {
    icon: Tag,
    title: 'Exclusive Wholesale Pricing',
    description: 'Wholesale rates applied automatically to your verified account.',
  },
  {
    icon: Package,
    title: 'Priority Fulfillment',
    description: 'Dedicated processing, lead times, and white-glove service.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Support',
    description: 'A named contact available for quotes, specs, and orders.',
  },
  {
    icon: BookOpen,
    title: 'Full Wholesale Catalog Access',
    description: 'The complete collection including products exclusive to the wholesale catalog.',
  },
]

export default function WholesalePage() {
  const { data: session, status } = useSession()
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [error, setError]               = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#333333] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
      </div>
    )
  }

  // ── Authenticated dashboard ──────────────────────────────────────────────────
  if (status === 'authenticated' && session?.user?.isWholesale) {
    const companyName = session.user.companyName

    return (
      <div className="min-h-screen bg-[#333333]">
        <Navigation />

        {/* Welcome bar */}
        <div className="bg-[#333333] border-b border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-[4.4rem] lg:mt-[7.4rem] min-h-[4.5rem] py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap min-w-0">
              <span className="font-serif text-lg lg:text-xl text-white truncate">
                Welcome back, {companyName}
              </span>
              <span className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.12] text-white text-[0.62rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Wholesale Active
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] uppercase font-sans font-medium text-white/75 hover:text-white transition-colors duration-200"
              >
                Full Catalog
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/wholesale' })}
                className="text-[0.68rem] tracking-[0.12em] uppercase font-sans text-white/75 hover:text-white transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">

          <div className="mb-10 pb-6 border-b border-white/[0.08]">
            <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white/70 mb-2">Wholesale Portal</p>
            <h1 className="font-serif font-bold text-display-md text-white leading-tight">
              Wholesale Pricing
            </h1>
            <p className="font-sans text-white/80 text-sm mt-2">
              All prices shown are your verified wholesale rates — approx. 40% off retail.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-[#333333]/10 rounded-xl p-6 hover:border-[#333333]/25 hover:shadow-md transition-all duration-200">
                <p className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-[#333333] mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#333333] mb-4">
                  {product.name}
                </h3>
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  priceClassName="font-sans font-bold text-xl text-[#333333]"
                />
                <div className="mt-5 pt-4 border-t border-[#333333]/15">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase font-sans font-medium text-[#333333] hover:text-[#333333]/60 transition-colors duration-200 group"
                  >
                    View Product
                    <ArrowRight size={10} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Wholesale resources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white border border-[#333333]/10 rounded-xl p-6 lg:p-8">
              <h3 className="font-serif text-xl font-semibold text-[#333333] mb-6">Wholesale Resources</h3>
              <div className="divide-y divide-[#333333]/08">
                {[
                  { icon: FileText,   label: 'Product Catalog 2026', action: 'Download PDF',  href: '/resources/catalog.pdf'         },
                  { icon: Tag,        label: 'Price List',            action: 'Download XLSX', href: '/resources/price-list.xlsx'      },
                  { icon: Headphones, label: 'Account Support',       action: 'Email Rep',     href: 'mailto:hello@jacksonpottery.com' },
                ].map(({ icon: Icon, label, action, href }) => (
                  <div key={label} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[#333333] flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-sm font-medium text-[#333333]">{label}</span>
                    </div>
                    <a
                      href={href}
                      className="font-sans text-[0.7rem] tracking-[0.1em] uppercase font-medium text-[#333333] hover:text-[#333333]/60 transition-colors duration-200"
                    >
                      {action}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#333333]/10 rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-[#333333] mb-3">Need Help?</h3>
              <p className="font-sans text-[#333333] text-sm leading-relaxed mb-6">
                Your dedicated rep is available Monday–Friday, 8am–5pm PST.
              </p>
              <a
                href="mailto:hello@jacksonpottery.com"
                className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.14em] uppercase font-sans font-medium text-[#333333] hover:text-[#333333]/60 transition-colors duration-200 group"
              >
                Contact Rep
                <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <Footer />
        </div>
      </div>
    )
  }

  // ── Pre-login ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (!result?.ok || result.error) setError('Invalid email or password.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#333333]">
      <Navigation />

      {/* ── Mobile layout ── */}
      <div className="lg:hidden flex flex-col mt-[4.4rem] px-5 pt-10 pb-14">
        <div className="mb-8">
          <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white mb-3">
            Wholesale Program
          </p>
          <h1 className="font-serif font-bold text-display-md text-white leading-tight">
            Built for Wholesale<br />Partners
          </h1>
        </div>

        {/* 2×2 benefit cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-2.5">
                <Icon size={12} strokeWidth={1.5} className="text-white/60" />
              </div>
              <h3 className="font-serif text-[0.85rem] font-semibold text-white mb-1 leading-snug">{title}</h3>
              <p className="font-sans text-white text-[0.75rem] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/45 mb-1.5">Wholesale Portal</p>
          <h2 className="font-serif font-bold text-display-sm text-[#333333] leading-tight mb-1">Wholesale Login</h2>
          <p className="font-sans text-[#333333]/55 text-sm mb-6 leading-relaxed">
            Sign in with your verified wholesale account to access exclusive pricing and the full wholesale catalog.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-m" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Business Email</label>
              <input id="email-m" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"
                className="w-full bg-[#F4F4F4] border border-[#333333]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="password-m" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Password</label>
              <input id="password-m" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••"
                className="w-full bg-[#F4F4F4] border border-[#333333]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
            </div>
            {error && <p className="font-sans text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-1">
              {isSubmitting ? 'Signing in…' : 'Sign In to Portal'}
            </button>
          </form>
          <div className="mt-5 pt-5 border-t border-[#333333]/[0.07] text-center">
            <a href="mailto:hello@jacksonpottery.com"
              className="font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/35 hover:text-[#333333]/70 transition-colors duration-200">
              Request Wholesale Access
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex items-center min-h-[calc(100vh-7.4rem)] mt-[7.4rem] px-8 py-16">
        <div className="max-w-[1280px] mx-auto w-full flex items-center gap-20">

          {/* Left — benefit content */}
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white mb-5">
              Wholesale Program
            </p>
            <h1 className="font-serif font-bold text-display-lg text-white leading-tight mb-10">
              Built for Wholesale<br />Partners
            </h1>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 hover:border-white/15 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-3">
                    <Icon size={14} strokeWidth={1.5} className="text-white/60" />
                  </div>
                  <h3 className="font-serif text-[0.95rem] font-semibold text-white mb-1.5">{title}</h3>
                  <p className="font-sans text-white text-[0.82rem] leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="font-sans text-white text-xs mb-1.5">Not yet a partner?</p>
              <a href="mailto:hello@jacksonpottery.com"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-white hover:text-white/70 transition-colors duration-200 group">
                Contact a regional rep to apply
                <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Right — login card */}
          <div className="w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-7 shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
              <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/45 mb-1.5">Wholesale Portal</p>
              <h2 className="font-serif font-bold text-display-sm text-[#333333] leading-tight mb-2">Wholesale Login</h2>
              <p className="font-sans text-[#333333]/55 text-sm mb-6 leading-relaxed">
                Sign in with your verified wholesale account to access exclusive pricing and the full wholesale catalog.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Business Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"
                    className="w-full bg-[#F4F4F4] border border-[#333333]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
                </div>
                <div>
                  <label htmlFor="password" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Password</label>
                  <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••"
                    className="w-full bg-[#F4F4F4] border border-[#333333]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
                </div>
                {error && <p className="font-sans text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-1">
                  {isSubmitting ? 'Signing in…' : 'Sign In to Portal →'}
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-[#333333]/[0.07] text-center">
                <a href="mailto:hello@jacksonpottery.com"
                  className="inline-flex items-center justify-center w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300">
                  Request Wholesale Access
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
