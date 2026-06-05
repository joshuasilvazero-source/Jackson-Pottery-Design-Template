'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Clock, Headphones, Shield, FileText, ArrowRight, Check } from 'lucide-react'
import PriceDisplay from '@/components/PriceDisplay'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const products = [
  { id: 'montserrat', name: 'Montserrat Planter', price: 485,  wholesalePrice: 291, category: 'Cast Stone'   },
  { id: 'arcadia',    name: 'Arcadia Bowl',        price: 620,  wholesalePrice: 372, category: 'Glazed'       },
  { id: 'villa-urn',  name: 'Villa Urn',            price: 1240, wholesalePrice: 744, category: 'Cast Stone'   },
  { id: 'canyon',     name: 'Canyon Pot',           price: 365,  wholesalePrice: 219, category: 'Natural Clay' },
  { id: 'meridian',   name: 'Meridian Planter',     price: 895,  wholesalePrice: 537, category: 'Metal'        },
  { id: 'solstice',   name: 'Solstice Bowl',        price: 295,  wholesalePrice: 177, category: 'Glazed'       },
]

const benefits = [
  { icon: Tag,        label: 'Trade Pricing',        sub: 'Approx. 40% off retail across all collections' },
  { icon: Clock,      label: 'Priority Fulfillment', sub: 'Dedicated allocation and faster lead times'     },
  { icon: Headphones, label: 'Dedicated Rep',        sub: 'One point of contact for your account'         },
  { icon: Shield,     label: 'Verified Accounts',   sub: 'Secure, invitation-only trade portal'           },
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
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#333333]/15 dark:border-white/15 border-t-[#333333] dark:border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // ── Authenticated dashboard ──────────────────────────────────────────────────
  if (status === 'authenticated' && session?.user?.isWholesale) {
    const companyName = session.user.companyName

    return (
      <div className="min-h-screen bg-white dark:bg-[#111111]">
        <Navigation />

        {/* Welcome bar */}
        <div className="bg-[#333333]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-[4.4rem] lg:mt-[7.4rem] h-[4.5rem] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap min-w-0">
              <span className="font-serif text-lg lg:text-xl text-white truncate">
                Welcome back, {companyName}
              </span>
              <span className="flex-shrink-0 flex items-center gap-1.5 bg-white/10 text-white/70 text-[0.62rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                Wholesale Active
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] uppercase font-sans font-medium text-white/60 hover:text-white transition-colors duration-200"
              >
                Full Catalog
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/wholesale' })}
                className="text-[0.68rem] tracking-[0.12em] uppercase font-sans text-white/40 hover:text-white transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">

          <div className="mb-10 pb-6 border-b border-[#D6D3CE] dark:border-[#2E2E2E]">
            <p className="section-label mb-2">Trade Portal</p>
            <h1 className="font-serif font-bold text-display-md text-[#333333] dark:text-[#F4F4F4] leading-tight">
              Wholesale Pricing
            </h1>
            <p className="font-sans text-[#7A7672] dark:text-[#888882] text-sm mt-2">
              All prices shown are your verified trade rates — approx. 40% off retail.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-[#F4F4F4] dark:bg-[#1A1A1A] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-xl p-6 hover:border-[#333333]/30 dark:hover:border-white/20 transition-colors duration-200">
                <p className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-[#7A7672] dark:text-[#888882] mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#333333] dark:text-[#F4F4F4] mb-4">
                  {product.name}
                </h3>
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  priceClassName="font-sans font-bold text-xl text-[#333333] dark:text-[#F4F4F4]"
                />
                <div className="mt-5 pt-4 border-t border-[#D6D3CE] dark:border-[#2E2E2E]">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase font-sans font-medium text-[#333333]/50 dark:text-white/40 hover:text-[#333333] dark:hover:text-white transition-colors duration-200 group"
                  >
                    View Product
                    <ArrowRight size={10} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dealer resources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#F4F4F4] dark:bg-[#1A1A1A] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-[#333333] dark:text-[#F4F4F4] mb-6">Dealer Resources</h3>
              <div className="divide-y divide-[#D6D3CE] dark:divide-[#2E2E2E]">
                {[
                  { icon: FileText,   label: 'Product Catalog 2026', action: 'Download PDF',  href: '/resources/catalog.pdf'         },
                  { icon: Tag,        label: 'Price List',            action: 'Download XLSX', href: '/resources/price-list.xlsx'      },
                  { icon: Headphones, label: 'Account Support',       action: 'Email Rep',     href: 'mailto:hello@jacksonpottery.com' },
                ].map(({ icon: Icon, label, action, href }) => (
                  <div key={label} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[#333333]/35 dark:text-white/30 flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-sm font-medium text-[#333333] dark:text-[#F4F4F4]">{label}</span>
                    </div>
                    <a
                      href={href}
                      className="font-sans text-[0.7rem] tracking-[0.1em] uppercase font-medium text-[#333333]/50 dark:text-white/40 hover:text-[#333333] dark:hover:text-white transition-colors duration-200"
                    >
                      {action}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#333333] rounded-xl p-8 text-white">
              <h3 className="font-serif text-xl font-semibold text-white mb-3">Need Help?</h3>
              <p className="font-sans text-white/55 text-sm leading-relaxed mb-6">
                Your dedicated rep is available Monday–Friday, 8am–5pm PST.
              </p>
              <a
                href="mailto:hello@jacksonpottery.com"
                className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.14em] uppercase font-sans font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                Contact Rep
                <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>

        <Footer />
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
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <Navigation />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-24 lg:pt-36 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — trade value proposition */}
          <div className="lg:pt-4">
            <p className="section-label mb-5">Trade Portal</p>
            <h1 className="font-serif font-bold text-display-lg text-[#333333] dark:text-[#F4F4F4] leading-tight mb-5">
              Jackson Pottery<br />Wholesale
            </h1>
            <p className="font-sans text-[#7A7672] dark:text-[#888882] text-sm leading-relaxed mb-10 max-w-md">
              Access exclusive trade pricing, priority fulfillment, and a dedicated account rep.
              Built for designers, dealers, and distributors who specify premium planters.
            </p>

            {/* Benefit cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-[#F4F4F4] dark:bg-[#1A1A1A] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-xl p-5">
                  <Icon size={18} className="text-[#333333]/35 dark:text-white/30 mb-3" strokeWidth={1.5} />
                  <p className="font-sans font-semibold text-[#333333] dark:text-[#F4F4F4] text-sm mb-1">{label}</p>
                  <p className="font-sans text-[#7A7672] dark:text-[#888882] text-xs leading-relaxed">{sub}</p>
                </div>
              ))}
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-5 flex-wrap pt-2">
              {['Verified Dealers Only', 'Secure Portal', 'No Minimums'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check size={11} strokeWidth={2} className="text-[#333333]/40 dark:text-white/30" />
                  <span className="font-sans text-[0.72rem] text-[#333333]/45 dark:text-white/35 tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — login form */}
          <div className="bg-[#F4F4F4] dark:bg-[#1A1A1A] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-2xl p-8 lg:p-10">
            {/* Logo inside card */}
            <div className="mb-8 pb-7 border-b border-[#D6D3CE] dark:border-[#2E2E2E]">
              <Image
                src="/jackson-pottery-logo.png"
                alt="Jackson Pottery"
                width={1238}
                height={240}
                className="h-9 w-auto opacity-80 dark:brightness-0 dark:invert dark:opacity-70"
              />
            </div>

            <h2 className="font-serif text-2xl font-semibold text-[#333333] dark:text-[#F4F4F4] mb-1">Trade Login</h2>
            <p className="font-sans text-[#7A7672] dark:text-[#888882] text-sm mb-7">
              Sign in with your dealer credentials to access wholesale pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 dark:text-white/45 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full bg-white dark:bg-[#111111] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] dark:text-[#F4F4F4] placeholder:text-[#333333]/25 dark:placeholder:text-white/20 focus:outline-none focus:border-[#333333]/50 dark:focus:border-white/40 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 dark:text-white/45 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-[#111111] border border-[#D6D3CE] dark:border-[#2E2E2E] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] dark:text-[#F4F4F4] placeholder:text-[#333333]/25 dark:placeholder:text-white/20 focus:outline-none focus:border-[#333333]/50 dark:focus:border-white/40 transition-colors duration-200"
                />
              </div>

              {error && (
                <p className="font-sans text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? 'Signing in…' : 'Sign In to Trade Portal'}
              </button>
            </form>

            <p className="font-sans text-[#333333]/30 dark:text-white/20 text-xs text-center mt-6 leading-relaxed">
              Invitation-only access. Contact your rep<br />to request a dealer account.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
