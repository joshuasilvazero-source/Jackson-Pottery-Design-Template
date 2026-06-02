import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import DealerSection from '@/components/DealerSection'
import BrandStory from '@/components/BrandStory'
import StickyShopBar from '@/components/StickyShopBar'
import ShopByCollection from '@/components/ShopByCollection'
import ShopByMaterial from '@/components/ShopByMaterial'
import TransformationSlider from '@/components/TransformationSlider'
import FeaturedCollections from '@/components/FeaturedCollections'
import Testimonials from '@/components/Testimonials'
import PressStrip from '@/components/PressStrip'
import FAQ from '@/components/FAQ'
import DesignConsultation from '@/components/DesignConsultation'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main className="bg-[#FDFAF5]">
      <Navigation />
      <Hero />
      <DealerSection />
      <BrandStory />
      <ShopByCollection />
      <ShopByMaterial />
      <TransformationSlider />
      <FeaturedCollections />
      <Testimonials />
      <PressStrip />
      <FAQ />
      <DesignConsultation />
      <FinalCTA />
      <Footer />
      <StickyShopBar />
    </main>
  )
}
