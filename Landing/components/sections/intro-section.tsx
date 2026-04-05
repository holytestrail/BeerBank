export default function IntroSection() {
  return (
    <section className="py-12 px-6 md:py-20 bg-background">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-balance text-center">
          So, you love beer but don&apos;t have regular workouts
        </h2>

        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            You&apos;re just like me. I know sport is important, but have no{" "}
            <span className="line-through">willpower</span> time to go to the gym.
          </p>
          <p>
            However, I drink beer when I go to a bar quiz (love them both - quizzes and beer).
            So I thought - why not gamify the motivation part?
          </p>
        </div>
      </div>
    </section>
  )
}
