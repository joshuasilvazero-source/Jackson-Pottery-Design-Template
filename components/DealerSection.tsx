'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Tag, Package, HeadphonesIcon, LayoutGrid } from 'lucide-react'

const benefits = [
  {
    icon: Tag,
    label: 'Exclusive Trade Pricing',
    sub: 'Volume-based discounts applied automatically to your verified account.',
  },
  {
    icon: Package,
    label: 'Priority Fulfillment',
    sub: 'Dedicated order processing, faster lead times, and white-glove logistics.',
  },
  {
    icon: HeadphonesIcon,
    label: 'Dedicated Account Support',
    sub: 'A named contact for your business — available for quotes, specs, and orders.',
  },
  {
    icon: LayoutGrid,
    label: 'Full Trade Catalog Access',
    sub: 'Browse the complete collection including pieces not listed on the public site.',
  },
]

export default function DealerSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-6%' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <section ref={ref} className="relative bg-[#2B2B2B] py-section overflow-hidden">

      {/* Subtle warm radial — depth without drama */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(247,247,245,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
          <div>
            <motion.p {...fade(0)} className="font-sans text-[0.58rem] tracking-[0.38em] uppercase text-white/35 font-medium mb-4">
              Trade &amp; Distribution
            </motion.p>
            <motion.h2 {...fade(0.08)} className="font-serif font-bold text-display-lg text-white leading-tight">
              Built for Dealers<br className="hidden sm:block" />&amp; Distributors
            </motion.h2>
          </div>

          <motion.p {...fade(0.14)} className="font-sans text-white/45 text-[0.9375rem] leading-relaxed max-w-sm lg:text-right">
            Jackson Pottery is a wholesale-first business. Landscape architects, hospitality groups, and authorized dealers receive exclusive access.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          {/* Left — benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white/[0.07] border border-white/[0.12] rounded-xl p-6 hover:bg-white/[0.11] hover:border-white/[0.20] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: 'rgba(212,168,85,0.15)', border: '1px solid rgba(212,168,85,0.25)' }}>
                  <b.icon size={17} strokeWidth={1.5} style={{ color: '#d4a855' }} />
                </div>
                <p className="font-sans text-[0.84rem] font-semibold text-white leading-tight mb-2">{b.label}</p>
                <p className="font-sans text-[0.74rem] text-white/65 leading-relaxed">{b.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — CTA card */}
          <motion.div {...fade(0.2)} className="lg:sticky lg:top-28">
            <div className="bg-[#F7F7F5] rounded-2xl p-8 lg:p-10">

              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-5 bg-[#B8B4AE]" />
                  <p className="font-sans text-[0.52rem] tracking-[0.34em] uppercase text-[#B8B4AE] font-medium">
                    Trade Portal
                  </p>
                </div>
                <h3 className="font-serif font-semibold text-2xl text-charcoal leading-tight mb-3">
                  Dealer &amp; Distributor Login
                </h3>
                <p className="font-sans text-[0.82rem] text-muted leading-relaxed">
                  Sign in with your verified trade account to access wholesale pricing, your order history, and the full dealer catalog.
                </p>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-wholesale-modal'))}
                className="w-full flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-sans text-[0.72rem] tracking-[0.14em] uppercase font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(43,43,43,0.22)] mb-4"
                style={{ background: '#2B2B2B' }}
              >
                Sign In to Trade Portal
                <span className="text-white/60">→</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-[#D6D3CE]" />
                <span className="font-sans text-[0.52rem] tracking-[0.2em] uppercase text-[#B8B4AE]">or</span>
                <div className="h-px flex-1 bg-[#D6D3CE]" />
              </div>

              {/* Secondary CTA */}
              <a
                href="mailto:hello@jacksonpottery.com"
                className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-sans text-[0.7rem] tracking-[0.14em] uppercase font-medium text-charcoal border border-[#D6D3CE] hover:border-charcoal hover:bg-[#F0EDEA] transition-all duration-300"
              >
                Request Dealer Access
              </a>

              {/* Trust note */}
              <p className="text-center font-sans text-[0.6rem] text-muted/50 mt-5 leading-relaxed">
                Verified accounts only · Application reviewed within 1 business day
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
