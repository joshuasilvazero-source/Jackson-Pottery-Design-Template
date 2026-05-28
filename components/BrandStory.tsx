'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BrandStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="bg-[#F4EFE6] py-section">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-10 lg:gap-14 xl:gap-20 items-start"
        >
          {/* Column 1: Heading + Description */}
          <div className="flex flex-col">
            <motion.h2 {...fade(0)} className="font-serif font-bold text-display-lg text-ink leading-tight mb-4">
              Designed to<br />Define Space
            </motion.h2>
            <motion.div {...fade(0.1)} className="w-10 h-0.5 bg-gold/60 mb-5" />
            <motion.p {...fade(0.15)} className="font-sans text-muted text-[0.9375rem] leading-relaxed max-w-sm">
              Timeless design. Premium materials. Purposeful craftsmanship. Planters that elevate every space they inhabit.
            </motion.p>
            <motion.div {...fade(0.22)}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 mt-8 text-xs tracking-[0.2em] uppercase font-sans text-ink hover:text-gold transition-colors duration-300 group"
              >
                Our Story
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          {/* Column 2: Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square lg:aspect-[3/4] overflow-hidden image-zoom"
          >
            <Image
              src="/about-us.png"
              alt="Jackson Pottery — Designed to Define Space"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
          </motion.div>

          {/* Column 3: Mission + Vision */}
          <div className="flex flex-col gap-8 lg:pt-6">
            <motion.div {...fade(0.2)}>
              <p className="section-label mb-3">Our Mission</p>
              <p className="font-sans text-muted text-[0.9375rem] leading-relaxed">
                Designer planters are hard to find. We&rsquo;re changing that — making them more accessible so exceptional outdoor spaces come together beautifully.
              </p>
            </motion.div>

            <motion.div {...fade(0.28)} className="w-full h-px bg-border" />

            <motion.div {...fade(0.32)}>
              <p className="section-label mb-3">Our Vision</p>
              <p className="font-sans text-muted text-[0.9375rem] leading-relaxed">
                To define how designer planters are discovered, sourced, and experienced — elevating every landscape, garden, and interior they touch.
              </p>
            </motion.div>

            <motion.div {...fade(0.4)} className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '200+', label: 'Designs' },
                { value: '15+', label: 'Years' },
                { value: '4.9★', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white border border-border/60 rounded-xl py-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                  <div className="font-serif font-bold text-xl text-ink">{stat.value}</div>
                  <div className="text-[0.62rem] text-muted tracking-widest uppercase font-sans mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
