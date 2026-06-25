import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductPageClient from './ProductPageClient'
import { products } from '@/lib/data'
import { authOptions } from '@/lib/auth'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.filter((p) => !p.wholesaleOnly).map((p) => ({ slug: p.id }))
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

  const session = await getServerSession(authOptions)
  const isWholesale = session?.user?.isWholesale === true

  if (product.wholesaleOnly && !isWholesale) notFound()

  const related = products.filter(
    (p) => p.id !== product.id && (isWholesale || !p.wholesaleOnly)
  )

  return (
    <main className="bg-white">
      <Navigation />
      <ProductPageClient product={product} related={related} />
      <Footer />
    </main>
  )
}
