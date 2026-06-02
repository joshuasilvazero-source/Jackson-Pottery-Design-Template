import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import PriceDisplay from '@/components/PriceDisplay'

export const metadata = { title: 'Shop All Planters — Jackson Pottery' }

export default function ShopPage() {
  return (
    <main className="bg-[#FDFAF5]">
      <Navigation />

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-36 pb-10 border-b border-border">
        <p className="section-label mb-3">Collection</p>
        <h1 className="font-serif font-bold text-display-lg text-ink leading-tight">All Planters</h1>
        <p className="font-sans text-muted text-sm mt-3">{products.length} pieces</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-ash-100 mb-4 image-zoom">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-gold text-ink text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5">New</span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-ink text-white text-[0.58rem] tracking-widest uppercase font-sans px-3 py-1.5">Bestseller</span>
                  )}
                </div>
              </div>
              <p className="section-label mb-1">{product.category}</p>
              <h3 className="font-serif font-bold text-ink text-xl group-hover:text-gold transition-colors duration-300 mb-0.5">
                {product.name}
              </h3>
              <p className="font-serif italic text-muted text-sm mb-2">{product.subtitle}</p>
              <PriceDisplay
                price={product.price}
                wholesalePrice={product.wholesalePrice}
                priceClassName="font-sans font-medium text-ink"
              />
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
