import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Wholesale Catalog — Jackson Pottery' }

export default async function WholesaleCatalogPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isWholesale) {
    redirect('/wholesale')
  }

  const exclusive = products.filter((p) => p.wholesaleOnly)

  return (
    <main className="bg-[#333333] min-h-screen">
      <Navigation />

      {/* ── Header ── */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-white mb-3">
              Wholesale Catalog
            </p>
            <h1 className="font-serif font-bold text-white text-display-lg leading-none">
              Exclusive Pottery
            </h1>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 pb-1">
            <p className="font-sans text-white text-[0.9375rem]">{exclusive.length} products</p>
            <p className="font-sans text-white text-[0.9375rem]">
              All prices are your verified wholesale rates
            </p>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {exclusive.map((product) => {
            const savings = product.price - product.wholesalePrice
            const pct     = Math.round((savings / product.price) * 100)

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F2F2F0] flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#333333] text-white text-xs tracking-widest uppercase font-sans px-3 py-1.5 rounded-full">
                      Exclusive
                    </span>
                    {product.isNew && (
                      <span className="bg-white text-[#333333] text-xs tracking-widest uppercase font-sans font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">

                  {/* Product info */}
                  <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif font-bold text-[#333333] text-display-sm leading-tight mb-0.5">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-[#333333] text-[0.9375rem] mb-5">
                    {product.subtitle}
                  </p>

                  {/* Price block — the hero of the card */}
                  <div className="border-t border-[#333333]/10 pt-5 mt-auto">
                    <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-1.5">
                      Wholesale Price
                    </p>
                    <p className="font-sans font-bold text-[#333333] leading-none mb-3"
                       style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
                      ${product.wholesalePrice.toLocaleString()}
                    </p>

                    {/* Retail comparison row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[#333333] text-[0.9375rem] line-through">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="font-sans text-[#333333] text-[0.68rem] tracking-[0.14em] uppercase">
                          retail
                        </span>
                      </div>
                      <span className="font-sans font-medium text-[#333333] text-[0.68rem] tracking-[0.14em] uppercase bg-[#333333]/[0.07] px-3 py-1.5 rounded-full">
                        {pct}% off · save ${savings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Specs footer */}
                  <div className="border-t border-[#333333]/10 mt-5 pt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-0.5">Dimensions</p>
                      <p className="font-sans text-[#333333] text-sm">{product.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-0.5">Material</p>
                      <p className="font-sans text-[#333333] text-sm">{product.material}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-0.5">Usage</p>
                      <p className="font-sans text-[#333333] text-sm">{product.usage}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] tracking-[0.28em] uppercase font-sans font-medium text-[#333333] mb-0.5">Weight</p>
                      <p className="font-sans text-[#333333] text-sm">{product.weight}</p>
                    </div>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Footer CTA ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif font-bold text-white text-display-sm mb-1">
              Questions about an order?
            </p>
            <p className="font-sans text-white text-[0.9375rem]">
              Your account rep is available Mon–Fri, 9am–5pm EST.
            </p>
          </div>
          <a
            href="tel:8775337687"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-sans text-[0.72rem] tracking-[0.14em] uppercase font-medium hover:bg-white hover:text-[#333333] transition-all duration-300 whitespace-nowrap"
          >
            (877) 533-7687
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
