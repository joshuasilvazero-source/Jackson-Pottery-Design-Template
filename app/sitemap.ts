import { MetadataRoute } from 'next'
import { products } from '@/lib/data'

const BASE_URL = 'https://jacksonpottery.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productRoutes,
  ]
}
