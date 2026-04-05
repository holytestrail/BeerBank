import Image from "next/image"

const testimonials = [
  {
    quote: "BeerBank is fun! Pure motivation! Even my hamster does push-ups with me!",
    name: "Jeffrey",
    title: "Sandwich Alignment Expert",
    image: "/testimonial-1.jpeg"
  },
  {
    quote: "Let's be honest: I'll never go to the gym. With BeerBank, I do at least a few squats a day!",
    name: "Pierre",
    title: "Lightbulb Replacement Consultant",
    image: "/testimonial-2.jpeg"
  },
  {
    quote: "I don't know BeerBank. Never tried it, never will.",
    name: "Some unknown asshole",
    title: "",
    image: "/testimonial-3.jpeg"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-6 md:py-20 bg-secondary">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center text-balance">
          Just look what these never-existing people* never said about BeerBank!
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
                &quot;{testimonial.quote}&quot;
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
        </div>
      </div>
    </section>
  )
}
