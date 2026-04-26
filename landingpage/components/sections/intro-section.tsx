import { useTranslation, Trans } from 'react-i18next'

export default function IntroSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-balance text-center">
          {t("intro.heading")}
        </h2>

        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            <Trans
              i18nKey="intro.p1"
              ns="landing"
              components={{ s: <span className="line-through" /> }}
            />
          </p>
          <p>
            {t("intro.p2")}
          </p>
        </div>
      </div>
    </section>
  )
}