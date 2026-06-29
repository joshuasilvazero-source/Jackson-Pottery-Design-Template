'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/data'
import PriceDisplay from '@/components/PriceDisplay'

export default function ExclusiveCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows])

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement | null
    const gap = 20
    const amount = (card?.offsetWidth ?? 340) + gap
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
    setTimeout(updateArrows, 600)
  }

  return (
    <div className="bg-[#333333]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">

        {/* Section header + arrows */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-white mb-2">
              B2B Catalog
            </p>
            <h2 className="font-serif font-bold text-display-md text-white leading-tight">
              Wholesale Exclusive
            </h2>
            <p className="font-sans text-white text-[0.9375rem] mt-1.5">
              {products.length} products available only to verified wholesale accounts
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll('prev')}
              aria-label="Previous"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canPrev
                  ? 'border-white/40 text-white hover:bg-white/10 hover:border-white/70 cursor-pointer'
                  : 'border-white/12 text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll('next')}
              aria-label="Next"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canNext
                  ? 'border-white/40 text-white hover:bg-white/10 hover:border-white/70 cursor-pointer'
                  : 'border-white/12 text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="flex gap-5 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              data-card=""
              className="group flex-shrink-0 w-[80vw] sm:w-[44vw] lg:w-[calc(33.333%-14px)] block"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.06] mb-4 rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-[#333333] text-xs tracking-widest uppercase font-sans font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
                    Exclusive
                  </span>
                </div>
              </div>
              <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-white mb-1">
                {product.category}
              </p>
              <h3 className="font-serif font-bold text-white text-lg lg:text-xl mb-0.5 leading-snug group-hover:text-white/80 transition-colors duration-200">
                {product.name}
              </h3>
              <p className="font-serif italic text-white text-sm mb-3">{product.subtitle}</p>
              <PriceDisplay
                price={product.price}
                wholesalePrice={product.wholesalePrice}
                originalPrice={product.originalPrice}
                priceClassName="font-sans font-medium text-white"
                secondaryClassName="text-white"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
