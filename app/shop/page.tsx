import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import PriceDisplay from '@/components/PriceDisplay'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ searchParams }: Props) {
  const { category } = await searchParams
  return {
    title: category ? `${category} Planters — Jackson Pottery` : 'Shop All Planters — Jackson Pottery',
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams
  const session = await getServerSession(authOptions)
  const isWholesale = session?.user?.isWholesale === true

  const exclusiveProducts = products.filter((p) => p.wholesaleOnly)
  const b2cProducts = products.filter((p) => !p.wholesaleOnly)

  // Public visitors only see B2C products; wholesale sees all
  const visible = isWholesale ? products : b2cProducts

  const visibleCategories = ['All', ...Array.from(new Set(visible.map((p) => p.category))).sort()]

  const filtered =
    category && category !== 'All'
      ? visible.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      : visible

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-24 sm:pt-28 lg:pt-36 pb-8 lg:pb-10 border-b border-[#333333]/15">
        {isWholesale && (
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#333333]" />
            <span className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-[#333333]/55">
              Wholesale Pricing Active
            </span>
          </div>
        )}
        <p className="section-label mb-3">Collection</p>
        <h1 className="font-serif font-bold text-display-lg text-[#333333] leading-tight">
          {category && category !== 'All' ? category : 'All Planters'}
        </h1>
        <div className="flex items-center gap-4 mt-3">
          <p className="font-sans text-[#333333]/55 text-sm">{filtered.length} pieces</p>
          {!isWholesale && (
            <Link
              href="/wholesale"
              className="font-sans text-[0.68rem] tracking-[0.14em] uppercase text-[#333333]/40 hover:text-[#333333] transition-colors duration-200"
            >
              Sign in for the full catalog →
            </Link>
          )}
        </div>
      </div>

      {/* ── Wholesale Exclusive Section (wholesale customers only) ── */}
      {isWholesale && !category && (
        <div className="bg-[#333333]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="mb-8">
              <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white/40 mb-2">
                B2B Catalog
              </p>
              <h2 className="font-serif font-bold text-display-md text-white leading-tight">
                Wholesale Exclusive
              </h2>
              <p className="font-sans text-white/40 text-sm mt-2">
                {exclusiveProducts.length} products available only to verified wholesale accounts
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
              {exclusiveProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.06] mb-4 rounded-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* B2B Exclusive badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-[#333333] text-[0.58rem] tracking-widest uppercase font-sans font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        B2B Exclusive
                      </span>
                    </div>
                    {product.isBestseller && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/10 border border-white/20 text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5 rounded-full">
                          Bestseller
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif font-bold text-white text-base sm:text-lg lg:text-xl mb-0.5 leading-snug group-hover:text-white/80 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-white/40 text-xs sm:text-sm mb-3">
                    {product.subtitle}
                  </p>
                  <PriceDisplay
                    price={product.price}
                    wholesalePrice={product.wholesalePrice}
                    originalPrice={product.originalPrice}
                    priceClassName="font-sans font-medium text-white"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category filter pills */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-8 flex flex-wrap gap-2">
        {visibleCategories.map((cat) => {
          const isActive = cat === 'All' ? !category || category === 'All' : category === cat
          return (
            <Link
              key={cat}
              href={cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full text-[0.72rem] tracking-[0.12em] uppercase font-sans transition-all duration-300 ${
                isActive
                  ? 'bg-[#333333] text-white shadow-sm'
                  : 'border border-[#333333]/15 text-[#333333]/55 hover:border-[#333333]/50 hover:text-[#333333] bg-white'
              }`}
            >
              {cat}
            </Link>
          )
        })}
      </div>

      {/* Full Catalog Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
        {isWholesale && !category && (
          <div className="mb-8">
            <p className="section-label mb-2">Full Catalog</p>
            <h2 className="font-serif font-bold text-display-md text-[#333333] leading-tight">
              All Planters
            </h2>
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-[#333333] text-xl mb-3">No products in this category yet.</p>
            <Link href="/shop" className="font-sans text-sm text-[#333333]/50 hover:text-[#333333] transition-colors duration-200">
              View all planters →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F4F4] mb-4 image-zoom rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.wholesaleOnly && (
                      <span className="bg-[#333333] text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5 rounded-full">B2B Exclusive</span>
                    )}
                    {product.isNew && (
                      <span className="bg-[#333333] text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5 rounded-full">New</span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-[#333333] text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5 rounded-full">Bestseller</span>
                    )}
                  </div>
                </div>
                <p className="section-label mb-1">{product.category}</p>
                <h3 className="font-serif font-bold text-[#333333] text-base sm:text-lg lg:text-xl group-hover:text-[#333333] transition-colors duration-300 mb-0.5 leading-snug">
                  {product.name}
                </h3>
                <p className="font-serif italic text-[#333333]/55 text-xs sm:text-sm mb-2">{product.subtitle}</p>
                <PriceDisplay
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  originalPrice={product.originalPrice}
                  priceClassName="font-sans font-medium text-[#333333]"
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
