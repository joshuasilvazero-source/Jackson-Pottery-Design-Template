'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const collections = [
  {
    id: 'landscape',
    label: 'Designer Planters',
    sub: 'Landscape Collection',
    href: '/shop?category=Cast+Stone',
    image: '/collection-designer-planters.png',
  },
  {
    id: 'garden',
    label: 'Indoor Planters',
    sub: 'Garden & Living',
    href: '/shop?category=Terracotta',
    image: '/collection-indoors.png',
  },
  {
    id: 'fountains',
    label: 'Fountains',
    sub: 'Water Features',
    href: '/shop?category=Fountains',
    image: '/collection-fountains.png',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    sub: 'Saucers, Stands & More',
    href: '/shop',
    image: '/collection-accessories.png',
  },
]

export default function ShopByCollection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-6%' })

  return (
    <section className="relative bg-[#2B2B2B] py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* Header */}
        <div ref={ref} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[0.62rem] tracking-[0.38em] uppercase font-sans text-white/55 mb-2"
            >
              Browse Categories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-display-md text-white leading-tight"
            >
              Shop by Collection
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase font-sans text-white/40 hover:text-white/80 transition-colors duration-300 group"
            >
              View All
              <ArrowUpRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={col.href} className="group block relative overflow-hidden rounded-xl aspect-[4/5]">
                {/* Image */}
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/0 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-sans text-[0.5rem] sm:text-[0.58rem] tracking-[0.2em] sm:tracking-[0.28em] uppercase text-white/55 mb-1 sm:mb-1.5 transition-colors duration-300 group-hover:text-white/70">
                        {col.sub}
                      </p>
                      <p className="font-serif font-semibold text-white text-sm sm:text-base lg:text-lg leading-tight">
                        {col.label}
                      </p>
                    </div>

                    {/* Arrow — hover-reveal on desktop only, hidden on mobile to give text full width */}
                    <div className="hidden sm:flex w-8 h-8 rounded-full border border-white/20 items-center justify-center flex-shrink-0 ml-3 sm:opacity-0 sm:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <ArrowUpRight size={13} strokeWidth={1.5} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom separator line — always shown on mobile, grows on hover on desktop */}
                  <div className="mt-3.5 h-px bg-white/15 origin-left sm:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
