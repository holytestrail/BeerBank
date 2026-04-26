import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t, i18n } = useTranslation('landing');
  return (
    <section className="bg-primary text-primary-foreground py-16 px-6 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-4xl md:text-4xl font-bold tracking-tight">{t("hero.logo")}</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-balance mb-4">
          {t("hero.title")}
        </h1>

        <p className="text-primary-foreground/80 text-lg mb-8">
          {t("hero.subtitle")}
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-base font-semibold px-8"
        >
          <a href="#try-app">{t("hero.try_button")}</a>
        </Button>

        {/* Down arrow indicator */}
        <div className="mt-10 animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-primary-foreground/60" />
        </div>
      </div>
    </section>
  )
}