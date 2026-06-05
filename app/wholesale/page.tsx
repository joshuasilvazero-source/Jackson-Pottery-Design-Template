'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { Tag, Clock, Headphones, Shield, FileText, ArrowRight } from 'lucide-react'
import PriceDisplay from '@/components/PriceDisplay'

const products = [
  { id: 'montserrat', name: 'Montserrat Planter', price: 485, wholesalePrice: 291, category: 'Cast Stone' },
  { id: 'arcadia', name: 'Arcadia Bowl', price: 620, wholesalePrice: 372, category: 'Glazed' },
  { id: 'villa-urn', name: 'Villa Urn', price: 1240, wholesalePrice: 744, category: 'Cast Stone' },
  { id: 'canyon', name: 'Canyon Pot', price: 365, wholesalePrice: 219, category: 'Natural Clay' },
  { id: 'meridian', name: 'Meridian Planter', price: 895, wholesalePrice: 537, category: 'Metal' },
  { id: 'solstice', name: 'Solstice Bowl', price: 295, wholesalePrice: 177, category: 'Glazed' },
]

const benefits = [
  {
    icon: Tag,
    label: 'Trade Pricing',
    sub: 'Approx. 40% off retail across all collections',
  },
  {
    icon: Clock,
    label: 'Priority Fulfillment',
    sub: 'Dedicated allocation and faster lead times',
  },
  {
    icon: Headphones,
    label: 'Dedicated Rep',
    sub: 'One point of contact for your account',
  },
  {
    icon: Shield,
    label: 'Verified Accounts',
    sub: 'Secure, invitation-only trade portal',
  },
]

export default function WholesalePage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ─── State 1: Loading ────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <div className="w-8 h-8 border-2 border-[#333333]/20 border-t-[#333333] rounded-full animate-spin" />
      </div>
    )
  }

  // ─── State 3: Authenticated ──────────────────────────────────────────────────
  if (status === 'authenticated' && session?.user?.isWholesale) {
    const companyName = session.user.companyName

    return (
      <div className="min-h-screen bg-[#F4F4F4]">
        {/* Header banner */}
        <div className="bg-[#333333] py-6">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-serif text-xl lg:text-2xl text-white">
                Welcome back, {companyName}
              </span>
              <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-600/30">
                Wholesale Pricing Active
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                className="bg-white text-[#333333] text-xs px-4 py-2 rounded-lg font-medium hover:bg-[#F4F4F4] transition-colors whitespace-nowrap"
              >
                Browse Full Catalog
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/wholesale' })}
                className="text-white/60 hover:text-white text-xs transition-colors whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10">
          <h2 className="font-serif text-2xl text-[#333333] mb-6">Wholesale Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#333333]/[0.08] p-6"
              >
                <p className="text-xs text-[#333333]/40 uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-[#333333] mb-3">
                  {product.name}
                </h3>
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  priceClassName="font-sans font-medium text-[#333333]"
                />
                <div className="mt-4 pt-4 border-t border-[#333333]/[0.06]">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1 text-[#333333]/50 text-xs hover:text-[#333333] transition-colors"
                  >
                    View Product
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dealer Resources */}
          <div className="bg-[#F4F4F4] border border-[#333333]/[0.06] rounded-2xl p-6 mt-8">
            <h3 className="font-serif text-lg text-[#333333] mb-4">Dealer Resources</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#333333]/40 flex-shrink-0" />
                <span className="text-sm text-[#333333] font-medium flex-1">
                  Product Catalog 2026
                </span>
                <a
                  href="/resources/catalog.pdf"
                  className="text-xs text-[#333333]/50 hover:text-[#333333] transition-colors underline underline-offset-2"
                >
                  Download PDF
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-[#333333]/40 flex-shrink-0" />
                <span className="text-sm text-[#333333] font-medium flex-1">
                  Price List
                </span>
                <a
                  href="/resources/price-list.xlsx"
                  className="text-xs text-[#333333]/50 hover:text-[#333333] transition-colors underline underline-offset-2"
                >
                  Download XLSX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-[#333333]/40 flex-shrink-0" />
                <span className="text-sm text-[#333333] font-medium flex-1">
                  Account Support
                </span>
                <a
                  href="mailto:hello@jacksonpottery.com"
                  className="text-xs text-[#333333]/50 hover:text-[#333333] transition-colors underline underline-offset-2"
                >
                  hello@jacksonpottery.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── State 2: Pre-login ──────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!result?.ok || result.error) {
        setError('Invalid email or password.')
      }
      // On success session updates automatically — component re-renders to dashboard
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left column — trade value proposition */}
        <div>
          <p className="text-[#333333]/50 text-xs tracking-widest uppercase mb-4">
            Trade Portal
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#333333] leading-tight mb-5 whitespace-pre-line">
            {'Jackson Pottery\nWholesale'}
          </h1>
          <p className="text-[#333333]/60 text-sm leading-relaxed mb-8 max-w-sm">
            Access exclusive trade pricing, priority fulfillment, and dedicated account support.
            Designed for designers, dealers, and distributors.
          </p>

          {/* Benefit cards — 2-col grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-[#F4F4F4] border border-[#333333]/[0.06] rounded-xl p-5">
                <Icon className="w-5 h-5 text-[#333333]/40 mb-3" />
                <p className="font-medium text-[#333333] text-sm mb-1">{label}</p>
                <p className="text-[#333333]/50 text-xs leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — login form */}
        <div className="bg-white rounded-2xl border border-[#333333]/10 shadow-sm p-8 lg:p-10">
          <h2 className="font-serif text-2xl text-[#333333] mb-2">Trade Login</h2>
          <p className="text-[#333333]/50 text-sm mb-8">
            Sign in to access wholesale pricing and your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#333333] mb-2 tracking-wide"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-[#333333]/15 rounded-lg px-4 py-3 text-sm text-[#333333] bg-white placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/40 transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#333333] mb-2 tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-[#333333]/15 rounded-lg px-4 py-3 text-sm text-[#333333] bg-white placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/40 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-sm font-medium tracking-wide hover:bg-[#444444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-[#333333]/30 text-xs text-center">
            Invitation-only. Contact your rep to request access.
          </p>
        </div>
      </div>
    </div>
  )
}
