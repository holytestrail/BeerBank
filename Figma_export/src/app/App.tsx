import { Settings, User, Beer } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const [beerCredit, setBeerCredit] = useState(3256);
  const [totalExercises, setTotalExercises] = useState(4447);
  const [currentInput, setCurrentInput] = useState(12);
  const [recentAdds] = useState([8, 14, 2, 7, 3]);

  const adjustInput = (amount: number) => {
    setCurrentInput(prev => Math.max(0, prev + amount));
  };

  const handleAdd = () => {
    // This would update based on conversion rate
    // For now, just demonstrate the interaction
    setTotalExercises(prev => prev + currentInput);
    setCurrentInput(0);
  };

  return (
    <div className="relative h-screen w-full max-w-[412px] mx-auto overflow-hidden bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600">
      {/* Frosted glass overlay with beer bubbles effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      {/* Subtle bubble decorations */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute top-40 right-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-32 left-16 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-60 right-12 w-12 h-12 rounded-full bg-white/10 blur-xl"></div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-5 pb-4">
          <button
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Profile"
          >
            <User className="w-6 h-6 text-amber-900" />
          </button>

          <button
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6 text-amber-900" />
          </button>
        </header>

        {/* Beer Credit Section */}
        <section className="px-6 mt-2">
          <h2 className="text-amber-900/80 mb-2">Your beer credit</h2>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl shadow-xl px-6 py-5 border-2 border-amber-400/50">
              <p className="text-6xl font-bold text-amber-950 tracking-tight">{beerCredit}</p>
            </div>

            <button
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-5 py-5 hover:bg-white transition-all active:scale-95 min-w-[110px]"
              aria-label="Beer time"
            >
              <Beer className="w-7 h-7 text-amber-600 mx-auto mb-1" />
              <span className="block text-sm font-medium text-amber-900">Beer time!</span>
            </button>
          </div>
        </section>

        {/* Total Exercises Section */}
        <section className="px-6 mt-6">
          <h2 className="text-amber-900/80 mb-2">Total exercises</h2>
          <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl shadow-xl px-6 py-5 border-2 border-amber-400/50">
            <p className="text-6xl font-bold text-amber-950 tracking-tight">{totalExercises}</p>
          </div>
        </section>

        {/* Add Exercises Section */}
        <section className="px-6 mt-8 flex-1">
          <h2 className="text-amber-900/80 mb-3">Add exercises</h2>

          <div className="flex gap-3">
            {/* Recent adds sidebar */}
            <div className="flex flex-col gap-2 pt-1">
              {recentAdds.map((num, idx) => (
                <div
                  key={idx}
                  className="text-xs text-amber-900/60 font-medium bg-white/30 backdrop-blur-sm px-2 py-1 rounded"
                >
                  +{num}
                </div>
              ))}
            </div>

            {/* Main input area */}
            <div className="flex-1">
              {/* Current value display */}
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl shadow-xl px-8 py-6 border-2 border-amber-400/50 mb-4">
                <p className="text-6xl font-bold text-amber-950 tracking-tight text-center">{currentInput}</p>
              </div>

              {/* Increment/Decrement buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: '+1', value: 1 },
                  { label: '+5', value: 5 },
                  { label: '+10', value: 10 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => adjustInput(btn.value)}
                    className="bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: '-1', value: -1 },
                  { label: '-5', value: -5 },
                  { label: '-10', value: -10 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => adjustInput(btn.value)}
                    className="bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95"
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
