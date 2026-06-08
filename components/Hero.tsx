'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

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
          Handcrafted Since 1983
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white text-display-2xl leading-[1.12] sm:leading-[1.05] max-w-4xl mb-5"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white text-[#333333] text-[11px] tracking-[0.18em] uppercase font-sans font-semibold hover:bg-[#F4F4F4] hover:shadow-[0_8px_28px_rgba(255,255,255,0.22)] hover:-translate-y-px transition-all duration-300"
          >
            Shop All Planters
          </Link>
          <Link
            href="/wholesale"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-[#333333] text-white text-[11px] tracking-[0.18em] uppercase font-sans font-semibold border border-white/15 hover:bg-[#1F1F1F] hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] hover:-translate-y-px transition-all duration-300"
          >
            Dealer &amp; Distributor Login
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
