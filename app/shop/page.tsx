import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import PriceDisplay from '@/components/PriceDisplay'

const categories = ['All', 'Terracotta', 'Glazed', 'Cast Stone', 'Lightweight', 'Metal']

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

  const filtered = category && category !== 'All'
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-24 sm:pt-28 lg:pt-36 pb-8 lg:pb-10 border-b border-[#333333]/15">
        <p className="section-label mb-3">Collection</p>
        <h1 className="font-serif font-bold text-display-lg text-[#333333] leading-tight">
          {category && category !== 'All' ? category : 'All Planters'}
        </h1>
        <p className="font-sans text-[#333333]/55 text-sm mt-3">{filtered.length} pieces</p>
      </div>

      {/* Category filter pills */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
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

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
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
