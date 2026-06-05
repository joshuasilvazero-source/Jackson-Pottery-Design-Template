import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react'

const points = [
  { icon: Award,       label: 'Premium Quality',   sub: 'Built to last a lifetime'    },
  { icon: Truck,       label: 'Reliable Shipping',  sub: 'Free on orders over $499.99' },
  { icon: ShieldCheck, label: 'Secure Checkout',    sub: 'Safe and easy every time'    },
  { icon: Headphones,  label: 'Expert Support',     sub: "We're here to help"          },
]

export default function SellingPoints() {
  return (
    <div className="bg-[#F4F4F4] dark:bg-[#111111] border-y border-[#D6D3CE] dark:border-[#2E2E2E]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <div
              key={point.label}
              className={`flex items-center gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-[#D6D3CE] dark:border-[#2E2E2E] ${[
                '',
                'border-l',
                'border-t lg:border-t-0 lg:border-l',
                'border-l border-t lg:border-t-0',
              ][i]}`}
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white dark:bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                <point.icon size={16} className="text-[#333333]/70 dark:text-white/60" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[0.72rem] sm:text-[0.75rem] font-semibold text-[#333333] dark:text-[#F4F4F4] tracking-wide leading-snug">
                  {point.label}
                </p>
                <p className="hidden sm:block font-sans text-xs text-[#7A7672] dark:text-[#888882] mt-0.5 leading-relaxed">
                  {point.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
