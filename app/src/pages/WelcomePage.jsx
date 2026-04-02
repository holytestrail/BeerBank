import { Button } from '@/components/ui/button'

/**
 * @param {{ onContinue: () => void }} props
 */
export default function WelcomePage({ onContinue }) {
  const handleContinue = () => {
    localStorage.setItem('beerbank_welcomed', 'true')
    onContinue()
  }

  return (
    <div className="relative h-screen w-full max-w-[412px] mx-auto overflow-hidden bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      <div className="absolute top-24 left-8 w-20 h-20 rounded-full bg-white/25 blur-lg" />
      <div className="absolute top-16 left-28 w-12 h-12 rounded-full bg-white/20 blur-md" />
      <div className="absolute top-48 right-10 w-32 h-32 rounded-full bg-white/25 blur-xl" />
      <div className="absolute top-80 left-12 w-16 h-16 rounded-full bg-white/20 blur-lg" />
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/25 blur-lg" />
      <div className="absolute bottom-56 right-16 w-14 h-14 rounded-full bg-white/20 blur-md" />
      <div className="absolute bottom-72 left-32 w-18 h-18 rounded-full bg-white/20 blur-lg" />
      <div className="absolute bottom-20 right-8 w-20 h-20 rounded-full bg-white/25 blur-lg" />

      <div className="relative z-10 h-full flex flex-col items-center px-6 py-10">
        <img
          src="/BeerBank_icon.png"
          alt=""
          className="w-28 h-28 rounded-2xl shadow-lg object-contain bg-white/30"
        />
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-amber-950 text-center leading-tight">
          Добро пожаловать в BeerBank
        </h1>

        <div className="w-full max-w-sm mt-8 flex-1 flex flex-col justify-center">
          <p className="text-left text-base text-amber-950/90 leading-relaxed">
            [Здесь будет текст 1]
          </p>
          <p className="text-left text-base text-amber-950/90 leading-relaxed mt-4">
            [Здесь будет текст 2]
          </p>
        </div>

        <div className="w-full max-w-xs mt-auto pt-6 flex justify-center">
          <Button
            type="button"
            size="lg"
            className="w-full bg-amber-600 text-white hover:bg-amber-700 shadow-lg text-lg font-semibold h-14 rounded-xl"
            onClick={handleContinue}
          >
            На главный экран
          </Button>
        </div>
      </div>
    </div>
  )
}
