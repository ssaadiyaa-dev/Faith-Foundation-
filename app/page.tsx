import BismillahIntro from '@/components/BismillahIntro'
import SiteHeader from '@/components/SiteHeader'
import HeroSection from '@/components/HeroSection'
import ImpactStrip from '@/components/ImpactStrip'
import MissionSection from '@/components/MissionSection'
import ProgramsSection from '@/components/ProgramsSection'
import MosqueCampaign from '@/components/MosqueCampaign'
import PullQuote from '@/components/PullQuote'
import FieldUpdates from '@/components/FieldUpdates'
import TestimonialsSection from '@/components/TestimonialsSection'
import TrustStrip from '@/components/TrustStrip'
import CTABand from '@/components/CTABand'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  return (
    <>
      <BismillahIntro />
      <SiteHeader />
      <main>
        <HeroSection />
        <ImpactStrip />
        <MissionSection />
        <ProgramsSection />
        <MosqueCampaign />
        <PullQuote />
        <FieldUpdates />
        <TestimonialsSection />
        <TrustStrip />
        <CTABand />
      </main>
      <SiteFooter />
    </>
  )
}
