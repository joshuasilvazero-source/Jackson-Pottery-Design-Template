'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/lib/data'

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="relative bg-white py-section">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 lg:gap-20">

          {/* Left */}
          <div ref={ref} className="lg:sticky lg:top-36 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="section-label mb-3"
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="font-serif font-bold text-display-md text-ink leading-tight mb-5"
            >
              Questions about<br />our planters?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 }}
              className="w-10 h-0.5 bg-[#333333]/30 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-sans text-muted text-sm leading-relaxed max-w-xs mb-8"
            >
              Everything you need to know about materials, durability, and care.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.28 }}
              href="mailto:hello@jacksonpottery.com"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-[#333333]/60 hover:text-[#333333] transition-colors duration-300"
            >
              Still have questions? →
            </motion.a>
          </div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="divide-y divide-border/50"
          >
            {faqs.map((faq, i) => (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-4 sm:gap-6 py-6 text-left group"
                >
                  <span className={`font-serif text-[1rem] sm:text-[1.0625rem] leading-snug transition-colors duration-300 flex-1 min-w-0 ${openId === faq.id ? 'text-[#333333]' : 'text-ink group-hover:text-[#333333]'}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openId === faq.id ? 'border-[#333333] bg-[#333333] text-white' : 'border-border text-muted group-hover:border-[#333333] group-hover:text-[#333333]'}`}>
                    {openId === faq.id ? <Minus size={13} strokeWidth={1.5} /> : <Plus size={13} strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-4 sm:pr-12 font-sans text-muted text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
