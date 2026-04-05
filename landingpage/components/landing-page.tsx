import HeroSection from "@/components/sections/hero-section"
import IntroSection from "@/components/sections/intro-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import MotivationSection from "@/components/sections/motivation-section"
import TryAppSection from "@/components/sections/try-app-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import FutureSection from "@/components/sections/future-section"
import FinalBannerSection from "@/components/sections/final-banner-section"
import FooterSection from "@/components/sections/footer-section"

export default function LandingPage() {
  return (
    <main className="min-h-svh">
      {/* Hero Banner Section */}
      <HeroSection />
      
      {/* Main Section - Intro */}
      <IntroSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Motivation Section */}
      <MotivationSection />
      
      {/* Try App Section */}
      <TryAppSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Future Section */}
      <FutureSection />
      
      {/* Final Banner Section */}
      <FinalBannerSection />
      
      {/* Footer Section */}
      <FooterSection />
    </main>
  )
}
