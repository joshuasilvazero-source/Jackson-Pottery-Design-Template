'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, Star, ArrowRight, Check, Eye, X, ShoppingCart } from 'lucide-react'
import { products, type Product } from '@/lib/data'

const categories = ['All', 'Terracotta', 'Glazed', 'Cast Stone', 'Lightweight', 'Metal'] as const

export default function FeaturedCollections() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-6%' })

  const filtered =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <section className="relative bg-[#FDFAF5] py-section">
      {/* Soft fade from dark section above */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(26,23,20,0.08) 0%, transparent 100%)' }} />
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div ref={ref} className="mb-10 lg:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-label mb-2"
          >
            New Arrivals & Bestsellers
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-display-md text-ink"
            >
              Featured Pieces
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
            >
              <Link href="/shop" className="hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-muted hover:text-gold transition-colors duration-300 group py-2 px-3 -mr-3 rounded-lg hover:bg-black/[0.03]">
                View All
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[0.72rem] tracking-[0.12em] uppercase font-sans transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-ink text-white shadow-sm'
                  : 'border border-border text-muted hover:border-ink/50 hover:text-ink bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isWishlisted={wishlist.has(product.id)}
                onWishlist={() => {
                  setWishlist((prev) => {
                    const next = new Set(prev)
                    next.has(product.id) ? next.delete(product.id) : next.add(product.id)
                    return next
                  })
                }}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="lg:hidden text-center mt-10"
        >
          <Link href="/shop" className="btn-dark-outline">View All Collection</Link>
        </motion.div>
      </div>

      {/* Quick-View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProductCard({
  product,
  index,
  isWishlisted,
  onWishlist,
  onQuickView,
}: {
  product: Product
  index: number
  isWishlisted: boolean
  onWishlist: () => void
  onQuickView: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-border/60 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_42px_rgba(0,0,0,0.11)] hover:-translate-y-1.5 transition-all duration-500"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-ash-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ease-luxury ${hovered ? 'opacity-0 scale-[1.04]' : 'opacity-100 scale-100'}`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ease-luxury absolute inset-0 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-gold text-ink text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">New</span>
            )}
            {product.isBestseller && (
              <span className="bg-ink text-white text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">Bestseller</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); onWishlist() }}
            className={`absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <Heart size={13} strokeWidth={1.5} className={isWishlisted ? 'fill-gold text-gold' : 'text-muted'} />
          </button>

          {/* Quick View — centered pill */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={(e) => { e.preventDefault(); onQuickView() }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-full text-ink text-[0.7rem] tracking-[0.12em] uppercase font-sans font-medium shadow-lg hover:bg-white transition-colors duration-200"
            >
              <Eye size={11} strokeWidth={1.8} />
              Quick View
            </button>
          </div>

          {/* Quick Add */}
          <div className={`absolute bottom-0 left-0 right-0 transition-all duration-400 ease-luxury ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
            <button
              onClick={(e) => {
                e.preventDefault()
                setAddedToCart(true)
                setTimeout(() => setAddedToCart(false), 2200)
              }}
              className={`w-full py-3.5 flex items-center justify-center gap-2 text-[0.72rem] tracking-[0.12em] uppercase font-sans font-medium transition-all duration-300 backdrop-blur-sm ${
                addedToCart
                  ? 'bg-ink/95 text-white'
                  : 'bg-white/92 text-ink hover:bg-ink hover:text-white'
              }`}
            >
              {addedToCart ? (<><Check size={12} strokeWidth={2} /> Added to Cart</>) : (<><Plus size={12} strokeWidth={2} /> Quick Add</>)}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pt-4 pb-5">
          <p className="font-sans text-[0.58rem] text-gold/70 tracking-[0.3em] uppercase mb-1.5">{product.category}</p>
          <h3 className="font-serif font-semibold text-ink text-base group-hover:text-gold transition-colors duration-300 leading-tight mb-1">
            {product.name}
          </h3>
          <p className="font-sans text-muted text-xs mb-3">{product.subtitle}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-ink font-medium text-sm">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="font-sans text-muted/50 text-xs line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-gold text-gold" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const specs = [
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Material', value: product.material },
    { label: 'Finish', value: product.finish },
    { label: 'Drainage', value: product.drainage },
    { label: 'Usage', value: product.usage },
    { label: 'Weight', value: product.weight },
  ]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal — desktop: centered panel, mobile: bottom drawer */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden
          bottom-0 left-0 right-0 rounded-t-3xl max-h-[92vh]
          sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
          sm:rounded-2xl sm:w-[860px] sm:max-w-[95vw] sm:max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ash-100 hover:bg-ash-200 flex items-center justify-center transition-colors duration-200"
        >
          <X size={15} strokeWidth={1.8} className="text-ink" />
        </button>

        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="flex flex-col sm:flex-row overflow-auto sm:overflow-hidden max-h-[88vh] sm:max-h-[90vh]">
          {/* Image panel */}
          <div className="relative flex-shrink-0 w-full sm:w-[42%] aspect-[4/3] sm:aspect-auto sm:h-auto bg-ash-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 42vw"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-gold text-ink text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">New</span>
              )}
              {product.isBestseller && (
                <span className="bg-ink text-white text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">Bestseller</span>
              )}
            </div>
          </div>

          {/* Details panel */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            {/* Category eyebrow */}
            <p className="font-sans text-[0.58rem] text-gold/70 tracking-[0.3em] uppercase mb-2">{product.category}</p>

            {/* Name */}
            <h2 className="font-serif font-semibold text-ink text-2xl leading-tight mb-1">{product.name}</h2>
            <p className="font-sans text-muted text-sm mb-4">{product.subtitle}</p>

            {/* Stars + price */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" strokeWidth={0} />
                  ))}
                </div>
                <span className="font-sans text-muted text-xs">(47 reviews)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-ink font-medium text-xl">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="font-sans text-muted/50 text-sm line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-muted text-sm leading-relaxed mb-6 border-b border-border/60 pb-6">
              {product.description}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-7">
              {specs.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-sans text-[0.6rem] tracking-[0.22em] uppercase text-muted/60 mb-0.5">{label}</p>
                  <p className="font-sans text-ink text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  setAddedToCart(true)
                  setTimeout(() => setAddedToCart(false), 2500)
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[0.72rem] tracking-[0.14em] uppercase font-sans font-medium transition-all duration-300 ${
                  addedToCart
                    ? 'bg-ink text-white'
                    : 'bg-gold text-ink hover:bg-gold/90 hover:shadow-[0_8px_24px_rgba(184,146,74,0.35)] hover:-translate-y-px'
                }`}
              >
                {addedToCart ? (
                  <><Check size={13} strokeWidth={2} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={13} strokeWidth={1.8} /> Add to Cart</>
                )}
              </button>

              <button
                onClick={() => setIsWishlisted((w) => !w)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  isWishlisted
                    ? 'border-gold bg-gold/5'
                    : 'border-border hover:border-gold/50'
                }`}
              >
                <Heart size={16} strokeWidth={1.5} className={isWishlisted ? 'fill-gold text-gold' : 'text-muted'} />
              </button>
            </div>

            {/* View full details link */}
            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-sans text-muted hover:text-gold transition-colors duration-200 group"
            >
              View Full Details
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}
