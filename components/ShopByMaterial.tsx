'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, ShieldCheck, Lock, Truck } from 'lucide-react'

const materials = [
  {
    id: 'natural-clay',
    label: 'Natural Clay',
    sub: 'Classic beauty with breathable durability.',
    href: '/shop',
    image: '/materials/natural-clay.png',
  },
  {
    id: 'metal',
    label: 'Metal',
    sub: 'Sleek, modern, and built to endure.',
    href: '/shop',
    image: '/materials/metal.png',
  },
  {
    id: 'glazed',
    label: 'Glazed',
    sub: 'Rich colors and timeless finishes.',
    href: '/shop',
    image: '/materials/glazed.png',
  },
  {
    id: 'cast-stone',
    label: 'Cast Stone',
    sub: 'Timeless elegance and remarkable strength.',
    href: '/shop',
    image: '/materials/cast-stone.png',
  },
  {
    id: 'lightweight',
    label: 'Lightweight',
    sub: 'Easy to move. Big impact.',
    href: '/shop',
    image: '/materials/lightweight.png',
  },
]

const featureBadges = [
  { icon: Leaf, label: 'Designer Quality', sub: 'Curated for exceptional spaces' },
  { icon: ShieldCheck, label: 'Weather Resistant', sub: 'Made for every season' },
  { icon: Lock,        label: 'Secure Checkout', sub: 'Safe and easy every time' },
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $499.99' },
]

export default function ShopByMaterial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-6%' })

  return (
    <section className="relative bg-[#FDFAF5] py-section">
      {/* Soft fade from dark section above */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(12,10,8,0.07) 0%, transparent 100%)' }} />
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div ref={ref} className="text-center mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif font-bold text-display-md text-ink tracking-wide mb-2"
          >
            Shop by Material
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-muted text-sm"
          >
            Explore our planters and accents by premium material.
          </motion.p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={mat.href} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3 image-zoom">
                  <Image
                    src={mat.image}
                    alt={mat.label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                </div>

                {/* Text */}
                <div>
                  <p className="font-serif font-semibold text-ink text-base group-hover:text-gold transition-colors duration-300 mb-0.5">
                    {mat.label}
                  </p>
                  <p className="font-sans text-muted text-xs leading-relaxed mb-2">{mat.sub}</p>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] tracking-[0.2em] uppercase font-sans text-gold/80 group-hover:gap-2 transition-all duration-300">
                    Shop Now
                    <ArrowRight size={10} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 lg:mt-14 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {featureBadges.map((badge) => (
            <div key={badge.label} className="flex items-start gap-3">
              <badge.icon size={20} className="text-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-xs font-medium text-ink tracking-wide uppercase">{badge.label}</p>
                <p className="font-sans text-xs text-muted mt-0.5">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
