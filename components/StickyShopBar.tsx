'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StickyShopBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-ink/96 backdrop-blur-md border-t border-white/[0.07]"
        >
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
            <p className="hidden sm:block font-serif text-white/70 text-sm">
              Handcrafted planters.{' '}
              <span className="text-gold">From $295.</span>
            </p>
            <Link
              href="/shop"
              className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-ink text-[0.7rem] tracking-[0.16em] uppercase font-sans font-medium hover:bg-gold/90 transition-colors duration-200"
            >
              Shop All Planters
              <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
