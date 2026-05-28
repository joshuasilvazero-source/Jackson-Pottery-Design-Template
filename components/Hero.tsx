'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react'

const trustBadges = [
  { icon: Award,       label: 'Premium Quality',         sub: 'Built to last' },
  { icon: Truck,       label: 'Fast, Reliable Shipping',  sub: 'On orders over $499.99' },
  { icon: ShieldCheck, label: 'Secure Shipping',          sub: 'Safe and easy checkout' },
  { icon: Headphones,  label: 'Expert Support',           sub: "We're here to help" },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <>
      {/* ── Full-bleed Hero ───────────────────────────────────── */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Background — mobile video */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" />
        </motion.video>

        {/* Background — desktop video */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        >
          <source src="/hero-desktop.mp4" type="video/mp4" />
        </motion.video>

        {/* Lighter gradient overlay — lets video breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15 pointer-events-none" />

        {/* Vignette — dark edges, open centre */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
        />

        {/* Warm ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55vw] h-[35vh] bg-gold/8 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[25vw] h-[25vh] bg-gold/5 blur-[60px] rounded-full pointer-events-none" />

        {/* ── Text content ──────────────────────────────────────── */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 sm:px-6 pt-28 sm:pt-36 pb-20 sm:pb-28"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white text-display-2xl leading-[1.05] max-w-4xl mb-6"
          >
            Elevated planters for
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              intentional outdoor spaces.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-white/90 text-xl md:text-2xl max-w-xl leading-relaxed mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            Timeless designs. Premium materials. Spaces transformed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-ink text-[11px] tracking-[0.16em] uppercase font-sans font-medium hover:bg-ash-100 hover:shadow-[0_8px_28px_rgba(255,255,255,0.2)] hover:-translate-y-px transition-all duration-300"
            >
              Shop All Planters
            </Link>
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full border border-white/30 hover:border-[#B8924A]/60 text-white text-[11px] tracking-[0.16em] uppercase font-sans font-medium overflow-hidden transition-colors duration-300"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)' }}
              />
              <span className="relative z-10 group-hover:text-[#1a1200] transition-colors duration-300">Explore Fountains</span>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 w-full max-w-lg"
          >
            {[
              { value: '15+', label: 'Years of Craft' },
              { value: '200+', label: 'Designs' },
              { value: '4.9★', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-xl text-white/90">{stat.value}</div>
                <div className="text-[9px] text-white/40 tracking-widest uppercase font-sans mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </section>

      {/* ── Trust Badges Strip ────────────────────────────────── */}
      <div className="bg-border border-y border-border">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }}
                className="flex items-center gap-3 px-4 lg:px-5 py-4 bg-ash-50"
              >
                <badge.icon size={18} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-[0.7rem] font-medium text-ink tracking-wide uppercase">
                    {badge.label}
                  </p>
                  <p className="font-sans text-[0.65rem] text-muted mt-0.5">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
