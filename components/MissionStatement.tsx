'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function MissionStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <section className="bg-[#333333] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] gap-10 lg:gap-14 xl:gap-20 items-start"
        >
          {/* Column 1: Heading + Description */}
          <div className="flex flex-col">
            <motion.p {...fade(0)} className="text-xs tracking-[0.28em] uppercase font-sans font-medium text-white/45 mb-4">
              Our Story
            </motion.p>
            <motion.h2 {...fade(0.08)} className="font-serif font-bold text-[2rem] lg:text-[2.5rem] text-white leading-tight mb-5">
              Designed to<br />Define Space
            </motion.h2>
            <motion.div {...fade(0.14)} className="w-10 h-px bg-white/20 mb-6" />
            <motion.p {...fade(0.18)} className="font-sans text-white/60 text-[0.9375rem] leading-relaxed max-w-sm mb-5">
              Timeless design. Premium materials. Purposeful craftsmanship. Planters that elevate every space they inhabit — from grand estate gardens to refined interior living rooms.
            </motion.p>
            <motion.p {...fade(0.24)} className="font-sans text-white/60 text-[0.9375rem] leading-relaxed max-w-sm mb-8">
              For over forty years, Jackson Pottery has supplied landscape architects, interior designers, and discerning homeowners with the finest handcrafted vessels available.
            </motion.p>
            <motion.div {...fade(0.3)}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-sans font-medium text-white hover:text-white/60 transition-colors duration-300 group"
              >
                Shop Collection
                <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Column 2: Pottery Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square lg:aspect-[3/4] overflow-hidden image-zoom rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <Image
              src="/products/arcadia-featured.png"
              alt="Arcadia — handcrafted glazed ceramic planter by Jackson Pottery"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 360px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#333333]/80 via-[#333333]/20 to-transparent pt-12 pb-6 px-6">
              <p className="font-serif italic text-white/90 text-base leading-snug">Arcadia Series</p>
              <p className="font-sans text-[0.58rem] tracking-[0.28em] uppercase text-white/50 mt-1">Handcrafted Glazed Ceramic</p>
            </div>
          </motion.div>

          {/* Column 3: Mission + Vision + Stats */}
          <div className="flex flex-col gap-8 lg:pt-6">
            <motion.div {...fade(0.2)}>
              <p className="text-xs tracking-[0.28em] uppercase font-sans font-medium text-white/45 mb-3">Our Mission</p>
              <p className="font-sans text-white/60 text-[0.9375rem] leading-relaxed">
                Designer planters are hard to find. We&rsquo;re changing that — making them more accessible so exceptional outdoor spaces come together beautifully.
              </p>
            </motion.div>

            <motion.div {...fade(0.28)} className="w-full h-px bg-white/15" />

            <motion.div {...fade(0.32)}>
              <p className="text-xs tracking-[0.28em] uppercase font-sans font-medium text-white/45 mb-3">Our Vision</p>
              <p className="font-sans text-white/60 text-[0.9375rem] leading-relaxed">
                To define how designer planters are discovered, sourced, and experienced — elevating every landscape, garden, and interior they touch.
              </p>
            </motion.div>

            <motion.div {...fade(0.4)} className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              {[
                { value: '200+', label: 'Designs' },
                { value: '40+',  label: 'Years'   },
                { value: '4.9★', label: 'Rating'  },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white/[0.06] border border-white/15 rounded-xl py-4 px-2">
                  <div className="font-serif font-bold text-lg sm:text-xl text-white">{stat.value}</div>
                  <div className="text-[0.65rem] sm:text-xs text-white/50 tracking-widest uppercase font-sans mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
