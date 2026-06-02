'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Award, Truck, ShieldCheck, Headphones, ArrowRight } from 'lucide-react'

const trustBadges = [
  { icon: Award,       label: 'Premium Quality',  sub: 'Built to last a lifetime'     },
  { icon: Truck,       label: 'Reliable Shipping', sub: 'Free on orders over $499.99'  },
  { icon: ShieldCheck, label: 'Secure Checkout',   sub: 'Safe and easy every time'     },
  { icon: Headphones,  label: 'Expert Support',    sub: "We're here to help"           },
]

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // Slow playback on desktop only — iOS Safari stutters at non-1x on autoplay videos
  useEffect(() => {
    const el = desktopVideoRef.current
    if (!el) return
    const apply = () => { el.playbackRate = 0.75 }
    apply()
    el.addEventListener('loadedmetadata', apply, { once: true })
  }, [])

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Mobile — pure CSS fade, no scale, no will-change, 1× playback (smooth on iOS) */}
        <video
          autoPlay loop muted playsInline
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center hero-cinematic-mobile"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </video>

        {/* Desktop — CSS Ken Burns + 0.75× playback rate for cinematic feel */}
        <video
          ref={desktopVideoRef}
          autoPlay loop muted playsInline
          className="hidden lg:block absolute inset-0 w-full h-full object-cover hero-cinematic-desktop"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="/hero-desktop.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B2B2B]/55 via-[#2B2B2B]/15 to-[#2B2B2B]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/20 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(43,43,43,0.45) 100%)' }}
        />

        {/* Text content — fades out on scroll */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28"
        >
          {/* Eyebrow */}
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

          {/* Divider */}
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
            className="font-serif italic text-white/80 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            Timeless designs. Premium materials. Spaces transformed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none sm:w-auto"
          >
            {/* Retail CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-9 py-4 rounded-full bg-white text-charcoal text-[11px] tracking-[0.18em] uppercase font-sans font-semibold hover:bg-[#F7F7F5] hover:shadow-[0_8px_28px_rgba(255,255,255,0.22)] hover:-translate-y-px transition-all duration-300"
            >
              Shop All Planters
            </Link>

            {/* Dealer CTA — gold to match modal */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-wholesale-modal'))}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-9 py-4 rounded-full font-sans text-[11px] tracking-[0.18em] uppercase font-bold text-white transition-all duration-300 hover:-translate-y-px"
              style={{
                background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 55%, #B8924A 100%)',
                boxShadow: '0 6px 28px rgba(184,146,74,0.50)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(184,146,74,0.65)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(184,146,74,0.50)' }}
            >
              Dealer &amp; Distributor Login
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
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
