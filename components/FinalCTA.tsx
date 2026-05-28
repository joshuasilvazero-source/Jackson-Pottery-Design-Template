import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="bg-[#F4EFE6] py-20 lg:py-28 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-gold/40" />
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-gold/70">
            Ready to Begin
          </span>
          <div className="h-px w-8 bg-gold/40" />
        </div>
        <h2 className="font-serif font-bold text-display-md text-ink leading-tight mb-4">
          Every great space starts<br />with a single piece.
        </h2>
        <p className="font-sans text-muted text-sm leading-relaxed max-w-sm mx-auto mb-10">
          Browse our full collection and find the planter that defines your space.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-ink text-white text-[0.72rem] tracking-[0.16em] uppercase font-sans font-medium hover:bg-ink/90 hover:shadow-[0_12px_36px_rgba(12,10,8,0.22)] hover:-translate-y-px transition-all duration-300"
        >
          Shop the Collection
          <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  )
}
