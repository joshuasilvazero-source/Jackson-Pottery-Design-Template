import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductPageClient from './ProductPageClient'
import { products } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Jackson Pottery`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  if (!product) notFound()

  const related = products.filter((p) => p.id !== product.id)

  return (
    <main className="bg-[#FDFAF5]">
      <Navigation />
      <ProductPageClient product={product} related={related} />
      <Footer />
    </main>
  )
}
