import { Button } from "@/components/ui/button"

export default function MotivationSection() {
  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-center">
          Doing five push-ups is better than not doing fifty 💪
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-8">
          <p>
            Too lazy for 5 push-ups? Do 1 or 2. Too hard to do a push-up from the floor? Put your hands on a wall or table. Do a squat, raise a leg, nod your head. Do at least something: we all know regular workouts are better, but <b>moving your ass a little is better than nothing at all</b>.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="w-full md:w-auto text-base font-semibold"
        >
          <a href="#try-app">Try the freaking app already</a>
        </Button>
      </div>
    </section>
  )
}
