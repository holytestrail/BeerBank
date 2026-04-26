import { Trophy, Sparkles, Apple, Globe } from "lucide-react"
import { useTranslation } from 'react-i18next'

export default function FutureSection() {
  const { t } = useTranslation('landing');

  const futureFeatures = [
    { icon: Trophy, text: t("future.features.0") },
    { icon: Sparkles, text: t("future.features.1") },
    { icon: Apple, text: t("future.features.2") },
    { icon: Globe, text: t("future.features.3") }
  ]

  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
          {t("future.heading")}
        </h2>

        <ul className="space-y-4">
          {futureFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}