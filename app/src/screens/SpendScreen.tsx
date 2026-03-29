import { useEffect, useState } from 'react';

type SpendScreenProps = {
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

export default function SpendScreen({ onNavigate, state, updateState, showToast }: SpendScreenProps) {
  const [spendAmount, setSpendAmount] = useState('');

  useEffect(() => {
    setSpendAmount('');
  }, []);

  const doSpend = () => {
    const amount = parseInt(spendAmount, 10);
    if (!spendAmount || isNaN(amount) || amount < 1 || String(amount) !== spendAmount) {
      showToast('Enter a whole number greater than 0', true);
      return;
    }
    if (amount > state.moneyBalance) {
      showToast('Not enough money :(', true);
      return;
    }
    updateState({
      moneyBalance: state.moneyBalance - amount,
      spendEvents: [...state.spendEvents, { amount, ts: Date.now() }]
    });
    setSpendAmount('');
    const msgs = ['Well done, you deserve that!', 'Enjoy!', "You've earned this!"];
    showToast(msgs[Math.floor(Math.random() * msgs.length)]);
  };

  const recentSpends = state.spendEvents.slice(-5).reverse();

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

        <div className="px-6 pb-8 flex flex-col gap-5 flex-1">
          <div className="text-3xl font-black text-amber-950">It's beer time!</div>
          <div>
            <div className="text-amber-900/80 mb-2">Your credit</div>
            <div className="bg-gradient-to-br from-amber-200 to-amber-300 shadow-xl px-8 py-6 border-2 border-amber-400/50 text-6xl font-bold text-amber-950 text-center">
              {state.moneyBalance}
            </div>
          </div>
          <div>
            <div className="text-amber-900/80 mb-2">How much will you spend?</div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                min="1"
                value={spendAmount}
                onChange={(e) => setSpendAmount(e.target.value)}
                className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 text-2xl font-semibold text-amber-900 shadow-lg outline-none placeholder:text-amber-900/60"
                placeholder="0"
              />
              <button
                onClick={doSpend}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
              >
                Let's do it!
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-amber-900/80 font-semibold">You've recently spent:</div>
            {recentSpends.length === 0 ? (
              <div className="text-amber-900/60">No spends yet</div>
            ) : (
              recentSpends.map((e, i) => {
                const d = new Date(e.ts);
                const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                return (
                  <div key={i} className="flex justify-between text-amber-900/70">
                    <span>{dateStr}</span>
                    <span>-{e.amount}</span>
                  </div>
                );
              })
            )}
          </div>
          <button
            onClick={() => onNavigate('main')}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-lg font-medium text-amber-900 shadow-md hover:bg-white transition-all active:scale-95 mt-auto"
          >
            Back to main
          </button>
        </div>
      </div>
    </div>
  );
}
