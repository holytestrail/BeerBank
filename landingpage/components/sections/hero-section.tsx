import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16 px-6 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-4xl md:text-4xl font-bold tracking-tight">BeerBank:</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-balance mb-4">
          Enjoy beer without feeling like a lazy ass!
        </h1>

        <p className="text-primary-foreground/80 text-lg mb-8">
          The exercise-to-beer tracker that makes fitness fun 🍺
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-base font-semibold px-8"
        >
          <a href="#try-app">Try this amazing app</a>
        </Button>

        {/* Down arrow indicator */}
        <div className="mt-10 animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-primary-foreground/60" />
        </div>
      </div>
    </section>
  )
}
