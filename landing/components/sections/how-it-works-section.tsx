import { Dumbbell, PlusCircle, Beer, Ban } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    icon: Dumbbell,
    number: 1,
    title: "Step 1: Do a few quick exercises",
    description: "Do several push-ups (3, or 5, or even 1) when you have a minute during your day (or squats, or any other quick exercise). Come on, you always have a minute!",
    image: null
  },
  {
    icon: PlusCircle,
    number: 2,
    title: "Step 2: Log it in BeerBank",
    description: "Add the number and see your Beer credit grow.",
    image: "/beerbank_step2.png"
  },
  {
    icon: Beer,
    number: 3,
    title: "Step 3: Get your beer",
    description: "When you want to buy a beer, write off the beer price from your credit.",
    image: "/beerbank_step3.png"
  },
  {
    icon: Ban,
    number: 4,
    title: "Step 4: No credit? No beer!",
    description: "Out of credit? Be honest and skip that beer :( Next time, don't be a loser and move your butt more often to earn your drink!",
    image: null
  }
]

export default function HowItWorksSection() {
  return (
    <section className="py-12 px-6 md:py-20 bg-secondary">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-balance text-center">
          BeerBank helps you add A&nbsp;LITTLE motion to your daily life
        </h2>

        {/* Step-by-step guide */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-card rounded-xl p-5 border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                {/* Step number & icon */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {/* Image for steps 2 and 3 */}
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
