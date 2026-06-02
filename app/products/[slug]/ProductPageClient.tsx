'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, Share2, ZoomIn, Minus, Plus, Check, ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/data'
import PriceDisplay from '@/components/PriceDisplay'

const detailImages = (product: Product) => [
  product.image,
  product.hoverImage,
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=900&q=85&fit=crop',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85&fit=crop',
]

export default function ProductPageClient({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const images = detailImages(product)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [openDetail, setOpenDetail] = useState<string | null>('Description')

  const details = [
    { label: 'Description', content: product.description },
    { label: 'Dimensions & Weight', content: `Dimensions: ${product.dimensions}\nWeight: ${product.weight}` },
    { label: 'Materials & Finish', content: `Material: ${product.material}\nFinish: ${product.finish}` },
    { label: 'Drainage & Usage', content: `Drainage: ${product.drainage}\nUsage: ${product.usage}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-36 pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-[0.65rem] font-sans text-muted tracking-widest uppercase">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16">

          {/* Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative overflow-hidden aspect-[4/5] bg-ash-100 group cursor-zoom-in">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImage]}
                    alt={`${product.name} view ${activeImage + 1}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Zoom hint */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={14} className="text-muted" strokeWidth={1.5} />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-gold text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5">New</span>
                )}
                {product.isBestseller && (
                  <span className="bg-ink text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5">Bestseller</span>
                )}
              </div>

              <div className="absolute bottom-4 right-4 font-sans text-[0.62rem] text-muted bg-white/80 px-2 py-1">
                {activeImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden border transition-all duration-200 ${
                    activeImage === i ? 'border-gold' : 'border-border opacity-60 hover:opacity-90'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="section-label mb-2">{product.category} Collection</p>
              <h1 className="font-serif font-bold text-display-md text-ink leading-tight mb-1">{product.name}</h1>
              <p className="font-serif italic text-muted text-lg mb-4">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-gold text-gold" strokeWidth={0} />)}
                </div>
                <span className="font-sans text-muted text-xs">4.9 (24 reviews)</span>
              </div>

              {/* Price */}
              <div className="pb-6 border-b border-border mb-6">
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  originalPrice={product.originalPrice}
                  priceClassName="font-serif font-bold text-3xl text-ink"
                />
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {[
                  { label: 'Dimensions', value: product.dimensions },
                  { label: 'Material', value: product.material.split(' ').slice(0, 3).join(' ') },
                  { label: 'Finish', value: product.finish },
                  { label: 'Usage', value: product.usage },
                ].map((spec) => (
                  <div key={spec.label} className="bg-ash-50 border border-border px-4 py-3">
                    <p className="font-sans text-[0.6rem] text-muted tracking-[0.25em] uppercase mb-1">{spec.label}</p>
                    <p className="font-sans text-ink text-xs">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-5">
                <span className="font-sans text-[0.65rem] text-muted tracking-[0.2em] uppercase">Qty</span>
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors">
                    <Minus size={12} strokeWidth={1.5} />
                  </button>
                  <span className="w-11 text-center font-sans text-ink text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors">
                    <Plus size={12} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 mb-6">
                <button
                  onClick={() => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2200) }}
                  className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase font-sans transition-all duration-400 ${
                    addedToCart ? 'bg-ink text-white' : 'bg-gold text-white hover:bg-gold/90'
                  }`}
                >
                  {addedToCart ? <><Check size={13} strokeWidth={2} /> Added to Cart</> : 'Add to Cart'}
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${wishlisted ? 'border-gold bg-gold/8 text-gold' : 'border-border text-muted hover:border-gold hover:text-gold'}`}
                >
                  <Heart size={15} strokeWidth={1.5} className={wishlisted ? 'fill-gold' : ''} />
                </button>
                <button className="w-12 h-12 border border-border flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all duration-300">
                  <Share2 size={14} strokeWidth={1.5} />
                </button>
              </div>

              {/* Testimonial pull-quote */}
              <div className="border-l-2 border-gold/40 pl-4 mb-6">
                <p className="font-serif italic text-muted text-sm leading-relaxed mb-2">
                  &ldquo;The quality is beyond exceptional — these pieces feel like living sculptures.&rdquo;
                </p>
                <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-gold/70">
                  Sarah Mitchell · Principal Landscape Architect, LA
                </p>
              </div>

              {/* Shipping info */}
              <div className="bg-ash-50 border border-border p-4 mb-7 space-y-2">
                {['Free shipping on orders over $500', 'White-glove delivery available', '30-day hassle-free returns'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    <span className="font-sans text-xs text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Collapsible Details */}
            <div className="divide-y divide-border border-t border-border">
              {details.map((detail) => (
                <div key={detail.label}>
                  <button
                    onClick={() => setOpenDetail(openDetail === detail.label ? null : detail.label)}
                    className="w-full flex items-center justify-between py-4"
                  >
                    <span className={`font-sans text-sm transition-colors duration-200 ${openDetail === detail.label ? 'text-gold' : 'text-ink'}`}>
                      {detail.label}
                    </span>
                    <span className={`text-muted transition-transform duration-300 ${openDetail === detail.label ? 'rotate-45' : ''}`}>
                      <Plus size={13} strokeWidth={1.5} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {openDetail === detail.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 font-sans text-muted text-sm leading-relaxed whitespace-pre-line">{detail.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif font-bold text-display-sm text-ink">You May Also Love</h2>
              <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase font-sans text-muted hover:text-gold transition-colors group">
                View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-ash-100 image-zoom">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
                  </div>
                  <p className="font-serif font-semibold text-ink group-hover:text-gold transition-colors duration-300 text-sm">{p.name}</p>
                  <p className="font-sans text-muted text-xs mt-1">${p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
