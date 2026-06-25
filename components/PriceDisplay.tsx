'use client'

import { useSession } from 'next-auth/react'

interface PriceDisplayProps {
  price: number
  wholesalePrice: number
  originalPrice?: number
  priceClassName?: string
  secondaryClassName?: string
}

export default function PriceDisplay({
  price,
  wholesalePrice,
  originalPrice,
  priceClassName = 'font-sans font-medium text-ink',
  secondaryClassName = 'text-[#333333]',
}: PriceDisplayProps) {
  const { data: session } = useSession()
  const isWholesale = session?.user?.isWholesale === true

  if (!isWholesale) {
    return (
      <div className="flex items-center gap-3">
        <span className={priceClassName}>${price.toLocaleString()}</span>
        {originalPrice && (
          <span className="font-sans text-muted text-sm line-through">
            ${originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    )
  }

  const savings = price - wholesalePrice
  const discountPct = Math.round((savings / price) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current ${secondaryClassName}`} />
        <span className={`font-sans text-[0.58rem] tracking-[0.2em] uppercase ${secondaryClassName}`}>
          Wholesale Pricing Active
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className={priceClassName}>${wholesalePrice.toLocaleString()}</span>
        <span className={`font-sans line-through text-sm opacity-50 ${secondaryClassName}`}>
          ${price.toLocaleString()}
        </span>
      </div>
      <p className={`font-sans text-[0.6rem] tracking-wide opacity-70 ${secondaryClassName}`}>
        You save ${savings.toLocaleString()} · {discountPct}% wholesale discount
      </p>
    </div>
  )
}
