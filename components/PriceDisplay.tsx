'use client'

import { useSession } from 'next-auth/react'

interface PriceDisplayProps {
  price: number
  wholesalePrice: number
  priceClassName?: string
}

export default function PriceDisplay({
  price,
  wholesalePrice,
  priceClassName = 'font-sans font-medium text-ink',
}: PriceDisplayProps) {
  const { data: session } = useSession()
  const isWholesale = session?.user?.isWholesale === true

  if (!isWholesale) {
    return <span className={priceClassName}>${price.toLocaleString()}</span>
  }

  const savings = price - wholesalePrice
  const discountPct = Math.round((savings / price) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
        <span className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-gold/70">
          Wholesale Pricing Active
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className={priceClassName}>${wholesalePrice.toLocaleString()}</span>
        <span className="font-sans text-muted line-through text-sm">
          ${price.toLocaleString()}
        </span>
      </div>
      <p className="font-sans text-[0.6rem] text-gold/60 tracking-wide">
        You save ${savings.toLocaleString()} · {discountPct}% trade discount
      </p>
    </div>
  )
}
