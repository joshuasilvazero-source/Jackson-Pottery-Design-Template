'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { testimonials } from '@/lib/data'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="bg-[#F4EFE6] py-section overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div ref={ref} className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-label mb-4"
          >
            Client Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md text-ink mb-6"
          >
            Loved by Homeowners &amp; Design Professionals
          </motion.h2>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-8 bg-gold/40" />
            <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-muted/70">
              ★★★★★ &nbsp;4.9 · 182 Reviews
            </span>
            <div className="h-px w-8 bg-gold/40" />
          </motion.div>
        </div>

        {/* ── Three-panel editorial layout ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/70">
          {testimonials.map((t, i) => {
            const isFeatured = i === 1
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col px-0 lg:px-10 xl:px-14 py-10 lg:py-0 ${isFeatured ? 'lg:py-2' : ''}`}
              >
                {/* Decorative quote mark */}
                <div
                  className={`font-serif leading-none select-none mb-4 ${isFeatured ? 'text-[4.5rem]' : 'text-[3.5rem]'}`}
                  style={{ color: 'rgba(184,146,74,0.2)' }}
                  aria-hidden="true"
                >
                  &#8220;
                </div>

                {/* Quote */}
                <blockquote
                  className={`font-serif italic text-ink/75 leading-[1.65] flex-1 mb-7 ${
                    isFeatured ? 'text-[1.18rem] lg:text-[1.25rem]' : 'text-[1rem] lg:text-[1.05rem]'
                  }`}
                >
                  {t.text}
                </blockquote>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-gold/35" />
                  <div className="w-1 h-1 rounded-full bg-gold/25" />
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className={`relative rounded-full overflow-hidden ring-1 ring-border/80 ${isFeatured ? 'w-13 h-13' : 'w-11 h-11'}`}
                      style={{ width: isFeatured ? 52 : 44, height: isFeatured ? 52 : 44 }}
                    >
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover grayscale"
                        sizes="52px"
                      />
                    </div>
                    {/* Gold ring accent */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(184,146,74,0.25)',
                        width: isFeatured ? 52 : 44,
                        height: isFeatured ? 52 : 44,
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-ink text-[0.92rem] leading-tight">{t.name}</p>
                    <p className="font-sans text-gold/70 text-[0.68rem] tracking-[0.08em] mt-0.5">{t.role}</p>
                    <p className="font-sans text-muted/50 text-[0.65rem] mt-0.5">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Stats row ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 lg:mt-20 pt-12 border-t border-border/60"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'Free Shipping',       sub: 'On orders over $500' },
              { value: 'White Glove',         sub: 'Delivery on large pieces' },
              { value: '30-Day Returns',      sub: 'Hassle-free guarantee' },
              { value: 'Lifetime Warranty',   sub: 'On craftsmanship' },
            ].map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.06, duration: 0.6 }}
              >
                <p className="font-serif text-ink text-[1.05rem] mb-1">{item.value}</p>
                <p className="font-sans text-muted/60 text-[0.7rem] tracking-[0.06em]">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
