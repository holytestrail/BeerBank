import { Beer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export default function FinalBannerSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="py-16 px-6 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-balance leading-relaxed">
          {t("final_banner.heading")}
        </h2>

        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-base font-semibold px-8"
        >
          <a href="#try-app">{t("final_banner.cta_button")}</a>
        </Button>
      </div>
    </section>
  )
}