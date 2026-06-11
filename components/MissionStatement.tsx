'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
        <div ref={ref} className="flex flex-col items-center text-center">
          <motion.h2 {...fade(0.08)} className="font-serif font-bold text-[2rem] lg:text-[2.5rem] text-white leading-tight mb-5">
            Designed to<br />Define Space
          </motion.h2>
          <motion.div {...fade(0.14)} className="w-10 h-px bg-white/20 mb-6" />
          <motion.p {...fade(0.18)} className="font-sans text-white/60 text-[0.9375rem] leading-relaxed max-w-lg mb-5">
            Timeless design. Premium materials. Purposeful craftsmanship. Planters that elevate every space they inhabit — from grand estate gardens to refined interior living rooms.
          </motion.p>
          <motion.p {...fade(0.24)} className="font-sans text-white/60 text-[0.9375rem] leading-relaxed max-w-lg mb-8">
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
      </div>
    </section>
  )
}
