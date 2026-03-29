import { Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

type MainScreenProps = {
  onNavigate: (screen: string) => void;
  state: {
    moneyBalance: number;
    exTotal: number;
    conversionRate: number;
    exInput: number;
    sessions: { amount: number; ts: number }[];
    spendEvents: { amount: number; ts: number }[];
    isFirstLogin: boolean;
    username: string;
  };
  updateState: (updates: Partial<typeof state>) => void;
  showToast: (message: string, isError?: boolean) => void;
};

export default function MainScreen({ onNavigate, state, updateState, showToast }: MainScreenProps) {
  const [bannerVisible, setBannerVisible] = useState(state.isFirstLogin);

  useEffect(() => {
    setBannerVisible(state.isFirstLogin);
  }, [state.isFirstLogin]);

  const adjustInput = (delta: number) => {
    updateState({ exInput: state.exInput + delta });
  };

  const addExercises = () => {
    const amount = state.exInput;
    if (amount === 0) {
      showToast('Enter a whole number greater than 0', true);
      return;
    }
    if (amount < 0 && state.exTotal + amount < 0) {
      showToast("You cannot take away more than you have. If you're not a tax official, of course.", true);
      return;
    }
    const newExTotal = state.exTotal + amount;
    const newMoneyBalance = Math.max(0, state.moneyBalance + amount * state.conversionRate);
    updateState({
      exTotal: newExTotal,
      moneyBalance: newMoneyBalance,
      exInput: 0,
      sessions: [...state.sessions, { amount, ts: Date.now() }]
    });
    if (amount > 0) {
      const msgs = ['Excellent!', 'Well done!', 'Not bad!'];
      showToast(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  };

  const dismissBanner = () => {
    setBannerVisible(false);
    updateState({ isFirstLogin: false });
  };

  const recentSessions = state.sessions.slice(-5).reverse();

  return (
    <div className="relative h-screen w-full max-w-[412px] mx-auto overflow-hidden bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute top-40 right-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-32 left-16 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute bottom-60 right-12 w-12 h-12 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative z-10 h-full flex flex-col">
        <header className="flex items-center justify-between px-5 pt-5 pb-4">
          <button
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Profile"
          >
            👤
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </header>

        <section className="px-6 mt-2">
          <h1 className="text-amber-900/80">Your beer credit</h1>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-8xl font-bold text-amber-950 tracking-tight">{state.moneyBalance}</p>
            </div>

            <button
              onClick={() => onNavigate('spend')}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-5 py-5 hover:bg-white transition-all active:scale-95 min-w-[110px]"
              aria-label="Beer time"
            >
              🍺
              <span className="block text-lg font-medium text-amber-900">Beer time!</span>
            </button>
          </div>
        </section>

        <section className="px-6 mt-8">
          <h2 className="text-amber-900/80">Total exercises</h2>
          <div className="">
            <p className="text-6xl font-bold text-amber-950 tracking-tight">{state.exTotal}</p>
          </div>
        </section>

        <section className="px-6 mt-8 flex-1">
          <h2 className="text-amber-900/80 mb-3">Add new session</h2>

          <div className="flex gap-3">
            <div className="flex flex-col gap-2 pt-1">
              {recentSessions.map((s, i) => (
                <div
                  key={i}
                  className="text-xs text-amber-900/60 font-medium"
                >
                  +{s.amount}
                </div>
              ))}
            </div>

            <div className="flex-1">
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 shadow-xl px-8 py-6 border-2 border-amber-400/50 mb-4">
                <p className="text-8xl font-bold text-amber-950 tracking-tight text-center">{state.exInput}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: '+1', value: 1 },
                  { label: '+5', value: 5 },
                  { label: '+10', value: 10 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => adjustInput(btn.value)}
                    className="text-lg bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95"
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
                    className="text-lg bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <button
                onClick={addExercises}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95"
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

