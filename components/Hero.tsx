'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react'

const trustBadges = [
  { icon: Award,       label: 'Premium Quality',        sub: 'Built to last a lifetime'       },
  { icon: Truck,       label: 'Reliable Shipping',       sub: 'Free on orders over $499.99'   },
  { icon: ShieldCheck, label: 'Secure Checkout',         sub: 'Safe and easy every time'       },
  { icon: Headphones,  label: 'Expert Support',          sub: "We're here to help"             },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Mobile video */}
        <motion.video
          autoPlay loop muted playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </motion.video>

        {/* Desktop video */}
        <motion.video
          autoPlay loop muted playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="/hero-desktop.mp4" type="video/mp4" />
        </motion.video>

        {/* Overlays — calm, not aggressive */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/50 via-[#2B2B2B]/15 to-[#2B2B2B]/55 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/20 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(43,43,43,0.45) 100%)' }}
        />

        {/* Text content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28"
        >
          {/* Pre-headline label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[0.58rem] tracking-[0.38em] uppercase text-white/55 font-medium mb-5"
          >
            Handcrafted Since 2009
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-display-2xl leading-[1.05] max-w-4xl mb-5"
          >
            Elevated planters for
            <br />
            <span className="text-white/90">intentional outdoor spaces.</span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-white/30 mb-6"
          />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-white/80 text-lg md:text-xl max-w-lg leading-relaxed mb-12"
          >
            Timeless designs. Premium materials. Spaces transformed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-9 py-4 rounded-full bg-white text-charcoal text-[11px] tracking-[0.18em] uppercase font-sans font-semibold hover:bg-[#F7F7F5] hover:shadow-[0_8px_28px_rgba(255,255,255,0.22)] hover:-translate-y-px transition-all duration-300"
            >
              Shop All Planters
            </Link>
            <Link
              href="/shop?category=Fountains"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-9 py-4 rounded-full border border-white/35 text-white text-[11px] tracking-[0.18em] uppercase font-sans font-semibold hover:bg-white/10 hover:border-white/60 hover:-translate-y-px transition-all duration-300"
            >
              Explore Fountains
            </Link>
          </motion.div>

          {/* Dealer & Distributor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.96, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 mt-8 w-full sm:w-auto"
          >
            <div className="flex items-center gap-4 w-full max-w-[300px]">
              <div className="h-px flex-1 bg-white/15" />
              <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/45 whitespace-nowrap">
                Trade &amp; Distribution
              </span>
              <div className="h-px flex-1 bg-white/15" />
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-wholesale-modal'))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-sans text-[0.68rem] tracking-[0.16em] uppercase font-semibold transition-all duration-400 hover:-translate-y-px"
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.30)',
                color: 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(10px)',
              }}
            >
              Dealer &amp; Distributor Login
            </button>

            <p className="font-sans text-[0.5rem] tracking-[0.14em] text-white/35 text-center">
              Verified accounts · Exclusive trade pricing
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex items-center justify-center gap-8 sm:gap-12 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/[0.12] w-full max-w-md"
          >
            {[
              { value: '15+',  label: 'Years of Craft' },
              { value: '200+', label: 'Designs'        },
              { value: '4.9',  label: 'Client Rating'  },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-2xl text-white/90 font-semibold">{stat.value}</div>
                <div className="text-[0.52rem] text-white/38 tracking-[0.2em] uppercase font-sans mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Trust Badges Strip ── */}
      <div className="bg-[#F7F7F5] border-y border-[#D6D3CE]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#D6D3CE]">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.7 }}
                className="flex items-center gap-4 px-6 lg:px-8 py-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFEFEB] flex items-center justify-center flex-shrink-0">
                  <badge.icon size={18} className="text-charcoal/70" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-[0.72rem] font-semibold text-charcoal tracking-wide">
                    {badge.label}
                  </p>
                  <p className="font-sans text-[0.66rem] text-muted mt-0.5 leading-relaxed">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
