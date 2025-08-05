import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonSection } from "@/components/comparison-section"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { PerformanceIndicator } from "@/components/performance-indicator"
import { RealTimeActivity } from "@/components/real-time-activity"
import { InteractiveDemo } from "@/components/interactive-demo"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { SEOHead } from "@/components/seo-head"
import { LanguageToggle } from "@/components/language-toggle"
import { FloatingCTA } from "@/components/floating-cta"
import { Providers } from "@/components/providers"

export default function Home() {
  return (
    <>
      <SEOHead />
      <Providers>
        <main className="min-h-screen bg-black text-white overflow-hidden">
          <ScrollProgress />
          <PerformanceIndicator />
          <RealTimeActivity />
          <ExitIntentPopup />
          <LanguageToggle />
          <FloatingCTA />

          <HeroSection />
          <InteractiveDemo />
          <FeaturesSection />
          <TestimonialsCarousel />
          <ComparisonSection />
          <WaitlistSection />
          <Footer />
        </main>
      </Providers>
    </>
  )
}
