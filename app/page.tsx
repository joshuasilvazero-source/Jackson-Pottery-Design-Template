import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SellingPoints from '@/components/SellingPoints'
import FeaturedCollections from '@/components/FeaturedCollections'
import ShopByCollection from '@/components/ShopByCollection'
import ShopByMaterial from '@/components/ShopByMaterial'
import MissionStatement from '@/components/MissionStatement'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#111111]">
      <Navigation />
      <Hero />
      <SellingPoints />
      <FeaturedCollections />
      <ShopByCollection />
      <ShopByMaterial />
      <MissionStatement />
      <FAQ />
      <Footer />
    </main>
  )
}
