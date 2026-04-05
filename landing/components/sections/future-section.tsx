import { Trophy, Sparkles, Apple, Globe } from "lucide-react"

const futureFeatures = [
  {
    icon: Trophy,
    text: "Adding regional and world leaderboards (who did the most push-ups and who bought the most beer)"
  },
  {
    icon: Sparkles,
    text: "Adding AI advisor on which beer is worthy of your miserable sport efforts"
  },
  {
    icon: Apple,
    text: "Making a built-in iPhone feature, if they agree of course: we can call it CiderBank (badoom-tsss)"
  },
  {
    icon: Globe,
    text: "Jokes apart - the full online integration is ready, so stay tuned for more (follow me on LinkedIn)"
  }
]

export default function FutureSection() {
  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
          In future releases, we plan...
        </h2>

        {/* Future features list */}
        <ul className="space-y-4">
          {futureFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-4"
            >
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
