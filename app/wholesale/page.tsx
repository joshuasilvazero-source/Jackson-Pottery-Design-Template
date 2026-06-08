'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Headphones, FileText, ArrowRight } from 'lucide-react'
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


export default function WholesalePage() {
  const { data: session, status } = useSession()
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [error, setError]               = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D6D3CE] border-t-[#333333]/40 rounded-full animate-spin" />
      </div>
    )
  }

  // ── Authenticated dashboard ──────────────────────────────────────────────────
  if (status === 'authenticated' && session?.user?.isWholesale) {
    const companyName = session.user.companyName

    return (
      <div className="min-h-screen bg-[#111111]">
        <Navigation />

        {/* Welcome bar */}
        <div className="bg-[#1A1A1A] border-b border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-[4.4rem] lg:mt-[7.4rem] h-[4.5rem] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap min-w-0">
              <span className="font-serif text-lg lg:text-xl text-white truncate">
                Welcome back, {companyName}
              </span>
              <span className="flex-shrink-0 flex items-center gap-1.5 bg-white/[0.07] text-white/55 text-[0.62rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                Wholesale Active
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] uppercase font-sans font-medium text-white/35 hover:text-white transition-colors duration-200"
              >
                Full Catalog
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/wholesale' })}
                className="text-[0.68rem] tracking-[0.12em] uppercase font-sans text-white/25 hover:text-white transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">

          <div className="mb-10 pb-6 border-b border-white/[0.08]">
            <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white/30 mb-2">Trade Portal</p>
            <h1 className="font-serif font-bold text-display-md text-white leading-tight">
              Wholesale Pricing
            </h1>
            <p className="font-sans text-white/40 text-sm mt-2">
              All prices shown are your verified trade rates — approx. 40% off retail.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-[#1A1A1A] border border-white/[0.07] rounded-xl p-6 hover:border-white/15 transition-colors duration-200">
                <p className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-white/30 mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg font-semibold text-white mb-4">
                  {product.name}
                </h3>
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  priceClassName="font-sans font-bold text-xl text-white"
                />
                <div className="mt-5 pt-4 border-t border-white/[0.07]">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] uppercase font-sans font-medium text-white/30 hover:text-white transition-colors duration-200 group"
                  >
                    View Product
                    <ArrowRight size={10} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dealer resources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-[#1A1A1A] border border-white/[0.07] rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-white mb-6">Dealer Resources</h3>
              <div className="divide-y divide-white/[0.06]">
                {[
                  { icon: FileText,   label: 'Product Catalog 2026', action: 'Download PDF',  href: '/resources/catalog.pdf'         },
                  { icon: Tag,        label: 'Price List',            action: 'Download XLSX', href: '/resources/price-list.xlsx'      },
                  { icon: Headphones, label: 'Account Support',       action: 'Email Rep',     href: 'mailto:hello@jacksonpottery.com' },
                ].map(({ icon: Icon, label, action, href }) => (
                  <div key={label} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-white/25 flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-sm font-medium text-white/70">{label}</span>
                    </div>
                    <a
                      href={href}
                      className="font-sans text-[0.7rem] tracking-[0.1em] uppercase font-medium text-white/30 hover:text-white transition-colors duration-200"
                    >
                      {action}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-white mb-3">Need Help?</h3>
              <p className="font-sans text-white/40 text-sm leading-relaxed mb-6">
                Your dedicated rep is available Monday–Friday, 8am–5pm PST.
              </p>
              <a
                href="mailto:hello@jacksonpottery.com"
                className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.14em] uppercase font-sans font-medium text-white/40 hover:text-white transition-colors duration-200 group"
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
    <div className="min-h-screen bg-[#F4F4F4]">
      <Navigation />

      {/* ── Mobile: centered card only ── */}
      <div className="lg:hidden flex items-center justify-center mt-[4.4rem] min-h-[calc(100vh-4.4rem)] px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <div className="mb-8 pb-7 border-b border-[#D6D3CE]">
            <Image src="/jackson-pottery-logo.png" alt="Jackson Pottery" width={1238} height={240} className="h-9 w-auto opacity-85" />
          </div>
          <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/45 mb-2">Dealer & Distributor Portal</p>
          <h2 className="font-serif text-2xl font-semibold text-[#333333] mb-1">Trade Login</h2>
          <p className="font-sans text-[#7A7672] text-sm mb-7 leading-relaxed">
            Sign in with your dealer credentials to access wholesale pricing.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email-m" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Business Email</label>
              <input id="email-m" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"
                className="w-full bg-[#F4F4F4] border border-[#D6D3CE] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="password-m" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Password</label>
              <input id="password-m" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••"
                className="w-full bg-[#F4F4F4] border border-[#D6D3CE] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
            </div>
            {error && <p className="font-sans text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {isSubmitting ? 'Signing in…' : 'Sign In to Portal'}
            </button>
          </form>
          <p className="font-sans text-[#333333]/30 text-xs text-center mt-6 leading-relaxed">
            Invitation-only access. Contact your rep<br />to request a dealer account.
          </p>
        </div>
      </div>

      {/* ── Desktop: full-bleed split ── */}
      <div className="hidden lg:grid grid-cols-2 mt-[4.4rem] min-h-[calc(100vh-4.4rem)]">

        {/* Left — brand panel */}
        <div className="bg-[#1A1A1A] px-14 xl:px-20 py-14 flex flex-col items-start justify-center gap-10">
          <div>
            <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white/30 mb-4">
              Dealer & Distributor Program
            </p>
            <h2 className="font-serif text-4xl xl:text-5xl text-white leading-[1.15] mb-5">
              Trade access for<br />qualified partners.
            </h2>
            <p className="font-sans text-white/45 text-sm leading-relaxed max-w-sm">
              Wholesale pricing, dedicated account support, and exclusive resources for landscape architects, garden centers, and design firms.
            </p>
          </div>

          <div className="border-t border-white/[0.08] pt-6 w-full">
            <p className="font-sans text-white/30 text-xs mb-2">Not yet a partner?</p>
            <a href="mailto:hello@jacksonpottery.com"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-white/50 hover:text-white transition-colors duration-200 group">
              Contact a regional rep to apply
              <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="bg-white flex items-center justify-center px-14 xl:px-20 py-14">
          <div className="w-full max-w-sm">
            <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/45 mb-3">Dealer & Distributor Portal</p>
            <h2 className="font-serif text-3xl text-[#333333] mb-1">Trade Login</h2>
            <p className="font-sans text-[#7A7672] text-sm mb-8 leading-relaxed">
              Sign in with your dealer credentials to access wholesale pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Business Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com"
                  className="w-full bg-[#F4F4F4] border border-[#D6D3CE] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
              </div>
              <div>
                <label htmlFor="password" className="block font-sans text-[0.68rem] tracking-[0.14em] uppercase font-medium text-[#333333]/60 mb-2">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••"
                  className="w-full bg-[#F4F4F4] border border-[#D6D3CE] rounded-lg px-4 py-3 font-sans text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#333333]/50 focus:bg-white transition-colors duration-200" />
              </div>
              {error && <p className="font-sans text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-[#333333] text-white rounded-lg py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold hover:bg-[#1F1F1F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {isSubmitting ? 'Signing in…' : 'Sign In to Portal'}
              </button>
            </form>

            <p className="font-sans text-[#333333]/30 text-xs text-center mt-6 leading-relaxed">
              Invitation-only access. Contact your rep<br />to request a dealer account.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
