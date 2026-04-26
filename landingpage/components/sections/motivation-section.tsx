import { Button } from "@/components/ui/button"
import { useTranslation, Trans } from 'react-i18next'

export default function MotivationSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-center">
          {t("motivation.heading")}
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-8">
          <p>
            <Trans
              i18nKey="motivation.body"
              ns="landing"
              components={{ strong: <b /> }}
            />
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="w-auto md:w-auto text-base font-semibold"
        >
          <a href="#try-app">{t("motivation.cta_button")}</a>
        </Button>
      </div>
    </section>
  )
}