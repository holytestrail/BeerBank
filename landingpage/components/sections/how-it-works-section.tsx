import { Dumbbell, PlusCircle, Beer, Ban } from "lucide-react"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

export default function HowItWorksSection() {
  const { t } = useTranslation('landing');

  const steps = [
    {
      icon: Dumbbell,
      number: 1,
      title: t("how_it_works.steps.0.title"),
      description: t("how_it_works.steps.0.description"),
      image: null
    },
    {
      icon: PlusCircle,
      number: 2,
      title: t("how_it_works.steps.1.title"),
      description: t("how_it_works.steps.1.description"),
      image: "/beerbank_step2.png"
    },
    {
      icon: Beer,
      number: 3,
      title: t("how_it_works.steps.2.title"),
      description: t("how_it_works.steps.2.description"),
      image: "/beerbank_step3.png"
    },
    {
      icon: Ban,
      number: 4,
      title: t("how_it_works.steps.3.title"),
      description: t("how_it_works.steps.3.description"),
      image: null
    }
  ]

  return (
    <section className="py-12 px-6 md:py-20 bg-secondary">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-balance text-center">
          {t("how_it_works.heading")}
        </h2>

        {/* Step-by-step guide */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-card rounded-xl p-5 border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {step.image && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={300}
                    height={400}
                    className="rounded-lg border border-border"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}