'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '200+', label: 'Designs'       },
  { value: '15+',  label: 'Years'         },
  { value: '4.9★', label: 'Client Rating' },
]

export default function BrandStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <section id="brand-story" className="bg-[#F7F7F5] py-section">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-28 items-center">

          {/* Left — editorial copy */}
          <div>
            <motion.p {...fade(0)} className="section-label mb-4">
              Our Story
            </motion.p>

            <motion.h2 {...fade(0.08)} className="font-serif font-bold text-display-lg text-charcoal leading-tight mb-5">
              Designed to<br />Define Space
            </motion.h2>

            <motion.div {...fade(0.14)} className="w-10 h-px bg-warm-gray mb-6" />

            <motion.p {...fade(0.18)} className="font-sans text-muted text-[0.9375rem] leading-relaxed max-w-md mb-5">
              Timeless design. Premium materials. Purposeful craftsmanship. Planters that elevate every space they inhabit — from grand estate gardens to refined interior living rooms.
            </motion.p>

            <motion.p {...fade(0.24)} className="font-sans text-muted text-[0.9375rem] leading-relaxed max-w-md mb-8">
              For over fifteen years, Jackson Pottery has supplied landscape architects, interior designers, and discerning homeowners with the finest handcrafted vessels available.
            </motion.p>

            <motion.div {...fade(0.3)}>
              <Link
                href="#design-consultation"
                className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase font-sans font-medium text-charcoal hover:text-muted transition-colors duration-300 group"
              >
                Work With Us
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          {/* Right — vision + stats */}
          <div className="flex flex-col gap-8 lg:pt-4">

            {/* Vision */}
            <motion.div {...fade(0.15)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-stone-gray/60" />
                <p className="section-label">Our Vision</p>
              </div>
              <p className="font-sans text-muted text-[0.9375rem] leading-relaxed">
                To define how designer planters are discovered, sourced, and experienced — elevating every landscape, garden, and interior they touch. We exist to make exceptional spaces more attainable for those who care about the details.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div {...fade(0.22)} className="w-full h-px bg-[#D6D3CE]" />

            {/* Stats */}
            <motion.div {...fade(0.28)} className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-[#D6D3CE] rounded-xl py-5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <div className="font-serif font-bold text-2xl text-charcoal">{stat.value}</div>
                  <div className="text-[0.6rem] text-muted tracking-[0.22em] uppercase font-sans mt-1.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
