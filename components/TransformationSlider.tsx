'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const scenes = [
  {
    id: 'patio',
    label: 'Patio',
    beforeImage: '/patio-before.png',
    afterImage: '/patio-after.png',
    beforeAlt: 'Bare garden before styling',
    afterAlt: 'Garden transformed with Jackson Pottery',
    headline: 'A beautiful garden, elevated further',
    copy:
      'One terracotta urn anchors an entire patio — adding warmth, structure, and sculptural presence that transforms a garden into something unforgettable.',
    products: [
      {
        id: 'montserrat-terracotta-vessel',
        name: 'Montserrat Vessel',
        price: 485,
        image: '/products/montserrat-featured.png',
      },
      {
        id: 'villa-cast-stone-urn',
        name: 'Villa Urn',
        price: 1240,
        image: '/products/villa-urn-featured.png',
      },
    ],
  },
  {
    id: 'living-room',
    label: 'Living Room',
    beforeImage: '/living-room-before.png',
    afterImage: '/living-room-after.png',
    beforeAlt: 'Empty living room before styling',
    afterAlt: 'Living room transformed with ceramic planters',
    headline: 'A living room made whole',
    copy:
      'A glazed ceramic planter brings texture, height, and living warmth to a space that was already beautiful — and makes it feel complete.',
    products: [
      {
        id: 'arcadia-glazed-planter',
        name: 'Arcadia Planter',
        price: 620,
        image: '/products/arcadia-featured.png',
      },
      {
        id: 'solstice-glazed-bowl',
        name: 'Solstice Bowl',
        price: 295,
        image: '/products/solstice-featured.png',
      },
    ],
  },
  {
    id: 'balcony',
    label: 'Balcony',
    beforeImage: '/balcony-before.png',
    afterImage: '/balcony-after.png',
    beforeAlt: 'Bare balcony before styling',
    afterAlt: 'Balcony transformed with Jackson Pottery',
    headline: 'A balcony retreat, elevated',
    copy:
      'Even the most considered outdoor space gains new dimension with the right vessel. A planter turns a private balcony into a sanctuary — lush, layered, and entirely yours.',
    products: [
      {
        id: 'canyon-lightweight-planter',
        name: 'Canyon Planter',
        price: 365,
        image: '/products/canyon-featured.png',
      },
      {
        id: 'montserrat-terracotta-vessel',
        name: 'Montserrat Vessel',
        price: 485,
        image: '/products/montserrat-featured.png',
      },
    ],
  },
]

export default function TransformationSlider() {
  const [activeScene, setActiveScene] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="relative bg-charcoal py-section overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 60%, rgba(181,103,62,0.07) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 45%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-gold/80 text-xs tracking-[0.4em] uppercase font-sans">
              Transform Your Space
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-lg text-cream"
            >
              See the{' '}
              <em className="not-italic text-gradient-gold">Difference</em>
              <br className="hidden sm:block" />a Single Piece Makes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-stone text-sm max-w-xs leading-relaxed"
            >
              Drag the handle to reveal what premium pottery does to an
              ordinary space.
            </motion.p>
          </div>
        </div>

        {/* Scene tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex mb-8 border-b border-white/[0.08]"
        >
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(i)}
              className={`relative px-3 sm:px-6 py-3 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase font-sans transition-colors duration-300 ${
                activeScene === i
                  ? 'text-cream'
                  : 'text-stone/50 hover:text-stone'
              }`}
            >
              {scene.label}
              {activeScene === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Active scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SceneSlider scene={scenes[activeScene]} isInView={isInView} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function SceneSlider({
  scene,
  isInView,
}: {
  scene: (typeof scenes)[0]
  isInView: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [handlePct, setHandlePct] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isDraggingRef = useRef(false)
  const rafRef = useRef<number>(0)

  const clamp = (v: number) => Math.max(3, Math.min(97, v))

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setHandlePct(clamp(((clientX - rect.left) / rect.width) * 100))
      if (!hasInteracted) setHasInteracted(true)
    },
    [hasInteracted],
  )

  // Subtle auto-hint: drift right to reveal "After", then return
  useEffect(() => {
    if (!isInView || hasInteracted) return
    const timerId = setTimeout(() => {
      const start = performance.now()
      const duration = 1600

      function step(now: number) {
        const raw = Math.min((now - start) / duration, 1)
        const eased =
          raw < 0.5
            ? 4 * raw * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 3) / 2

        const pct =
          raw < 0.5 ? 50 + 24 * (eased * 2) : 74 - 24 * (eased * 2 - 1)

        setHandlePct(pct)
        if (raw < 1) rafRef.current = requestAnimationFrame(step)
        else setHandlePct(50)
      }

      rafRef.current = requestAnimationFrame(step)
    }, 1600)

    return () => {
      clearTimeout(timerId)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, hasInteracted])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) updateFromClientX(e.clientX)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) updateFromClientX(e.touches[0].clientX)
    }
    const onUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      setIsDragging(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [updateFromClientX])

  const startDrag = (clientX: number) => {
    isDraggingRef.current = true
    setIsDragging(true)
    updateFromClientX(clientX)
  }

  // clipPath: After image reveals from the RIGHT as handle moves right
  // inset(0 0 0 X%) = clip X% from left = show right (100-X)%
  const afterClip = `inset(0 0 0 ${100 - handlePct}%)`

  return (
    <div>
      {/* ── Slider ────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/7]"
        style={{ cursor: isDragging ? 'ew-resize' : 'col-resize' }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* Before — full width, desaturated */}
        <div className="absolute inset-0">
          <Image
            src={scene.beforeImage}
            alt={scene.beforeAlt}
            fill
            priority
            className="object-cover object-center"
            style={{ filter: 'saturate(0.78) brightness(0.88)' }}
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        </div>

        {/* After — clipped to right side of handle, full colour */}
        <div className="absolute inset-0" style={{ clipPath: afterClip }}>
          <Image
            src={scene.afterImage}
            alt={scene.afterAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        </div>

        {/* Corner labels */}
        <div
          className="absolute top-5 left-5 z-20 pointer-events-none"
          style={{
            opacity: handlePct < 92 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <div className="bg-charcoal/70 backdrop-blur-md border border-white/10 px-3 py-1.5">
            <span className="text-stone/75 text-[9px] tracking-[0.35em] uppercase font-sans">
              Before
            </span>
          </div>
        </div>

        <div
          className="absolute top-5 right-5 z-20 pointer-events-none"
          style={{
            opacity: handlePct > 8 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <div className="bg-charcoal/70 backdrop-blur-md border border-gold/30 px-3 py-1.5">
            <span className="text-gold text-[9px] tracking-[0.35em] uppercase font-sans">
              After
            </span>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{
            left: `${handlePct}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Vertical line */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gold/75"
            style={{
              boxShadow: `0 0 ${isDragging ? 16 : 8}px rgba(201,169,110,${isDragging ? 0.5 : 0.25})`,
            }}
          />

          {/* Circle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(26,24,24,0.6)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: `1.5px solid rgba(201,169,110,${isDragging ? 0.95 : 0.65})`,
              boxShadow: `0 0 ${isDragging ? 32 : 14}px rgba(201,169,110,${isDragging ? 0.4 : 0.2}), inset 0 1px 0 rgba(201,169,110,0.12)`,
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.14 : 1})`,
              transition: isDragging
                ? 'none'
                : 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path
                d="M5.5 5H14.5M2 5L5.5 2M2 5L5.5 8M14.5 2L18 5M14.5 8L18 5"
                stroke="rgba(201,169,110,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* First-visit drag hint */}
        {!hasInteracted && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, 4] }}
              transition={{
                duration: 3.2,
                times: [0, 0.15, 0.82, 1],
                delay: 1,
              }}
              className="bg-charcoal/80 backdrop-blur-sm border border-white/[0.07] px-5 py-2.5"
            >
              <span className="text-stone/65 text-[9px] tracking-[0.32em] uppercase font-sans">
                ← Drag to reveal →
              </span>
            </motion.div>
          </div>
        )}
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h3 className="font-serif text-cream text-xl sm:text-2xl lg:text-[1.875rem] leading-snug mb-2 sm:mb-3">
              {scene.headline}
            </h3>
            <p className="font-sans text-stone text-sm leading-relaxed font-light max-w-[420px]">
              {scene.copy}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/shop" className="btn-primary group">
              Shop This Look
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
