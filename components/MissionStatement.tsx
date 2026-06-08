'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function MissionStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="bg-white py-20 lg:py-24">
      <div ref={ref} className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-[#333333] text-display-sm lg:text-display-md max-w-3xl mx-auto leading-relaxed"
        >
          Every great space starts with a single piece.
        </motion.p>
      </div>
    </section>
  )
}
