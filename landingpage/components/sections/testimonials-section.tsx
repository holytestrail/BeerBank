import Image from "next/image"
import { useTranslation } from 'react-i18next'



export default function TestimonialsSection() {
  const { t, i18n } = useTranslation('landing');
  const testimonials = [
  {
    quote: t("testimonials.0.quote"),
    name: t("testimonials.0.name"),
    title: t("testimonials.0.title"),
    image: "/testimonial-1.jpeg"
  },
  {
    quote: t("testimonials.1.quote"),
    name: t("testimonials.1.name"),
    title: t("testimonials.1.title"),
    image: "/testimonial-2.jpeg"
  },
  {
    quote: t("testimonials.2.quote"),
    name: t("testimonials.2.name"),
    title: t("testimonials.2.title"),
    image: "/testimonial-3.jpeg"
  }
]

  return (
    <section className="py-12 px-6 md:py-20 bg-secondary">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center text-balance">
          {t("testimonials.heading")}
        </h2>

        {/* Testimonial cards */}
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
            >
              {/* Photo */}
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote and attribution */}
              <p className="text-foreground text-center leading-relaxed mb-3 italic">
                {testimonial.quote}
              </p>
              <p className="text-sm text-center">
                <span className="text-muted-foreground">&mdash; </span>
                <span className="font-semibold text-foreground">{testimonial.name}</span>
                {testimonial.title && (
                  <span className="text-muted-foreground">, {testimonial.title}</span>
                )}
              </p>
            </div>
          ))}
          <p className="text-sm">{t("testimonials.footnote")}</p>
        </div>
      </div>
    </section>
  )
}
