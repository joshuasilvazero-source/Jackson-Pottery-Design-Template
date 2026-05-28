'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const publications = [
  { name: 'Architectural Digest', style: 'font-serif font-bold tracking-[0.04em] text-[1.05rem]' },
  { name: 'Houzz',                style: 'font-sans font-medium tracking-[0.38em] uppercase text-[0.75rem]' },
  { name: 'SUNSET',               style: 'font-serif font-bold tracking-[0.28em] text-[0.92rem]' },
  { name: 'House Beautiful',      style: 'font-serif italic font-semibold tracking-[0.04em] text-[1rem]' },
  { name: 'Better Homes & Gardens', style: 'font-sans font-medium tracking-[0.05em] text-[0.7rem]' },
  { name: 'GARDEN & GUN',         style: 'font-serif font-bold tracking-[0.22em] text-[0.8rem]' },
]

export default function PressStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section ref={ref} className="bg-[#0C0A08] overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(184,146,74,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 lg:px-8 py-20 lg:py-28">

        {/* ── Featured pull quote ──────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">

          {/* Opening mark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-6"
          >
            <span
              className="font-serif text-[5rem] leading-none select-none"
              style={{ color: 'rgba(184,146,74,0.25)' }}
              aria-hidden="true"
            >
              &#8220;
            </span>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-warm-50/85 text-2xl sm:text-3xl lg:text-[2.1rem] leading-[1.45] max-w-3xl mx-auto mb-8"
          >
            Jackson Pottery has quietly become the definitive name in designer planters
            for anyone serious about their outdoor spaces.
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-10" style={{ background: 'rgba(184,146,74,0.35)' }} />
            <span className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-gold/60">
              Architectural Digest
            </span>
            <div className="h-px w-10" style={{ background: 'rgba(184,146,74,0.35)' }} />
          </motion.div>
        </div>

        {/* ── Divider ─────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-px origin-center mb-14 lg:mb-16"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(184,146,74,0.2) 30%, rgba(184,146,74,0.4) 50%, rgba(184,146,74,0.2) 70%, transparent 100%)' }}
        />

        {/* ── As featured in ──────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center font-sans text-[0.54rem] tracking-[0.45em] uppercase text-ash-400/30 mb-10"
        >
          As Featured In
        </motion.p>

        {/* ── Publication names ────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 lg:gap-x-16">
          {publications.map((pub, i) => (
            <motion.span
              key={pub.name}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`${pub.style} text-warm-50/20 hover:text-warm-50/55 transition-colors duration-500 cursor-default select-none`}
            >
              {pub.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
