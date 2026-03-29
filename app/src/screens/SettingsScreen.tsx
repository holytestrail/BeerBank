import { useEffect, useState } from 'react';

type SettingsScreenProps = {
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

export default function SettingsScreen({ onNavigate, state, updateState, showToast }: SettingsScreenProps) {
  const [rateInput, setRateInput] = useState(state.conversionRate.toString());
  const [balanceInput, setBalanceInput] = useState('');

  useEffect(() => {
    setRateInput(state.conversionRate.toString());
    setBalanceInput('');
  }, [state.conversionRate]);

  const applyRate = () => {
    const rate = parseInt(rateInput, 10);
    if (!rateInput || isNaN(rate) || rate < 1 || String(rate) !== rateInput) {
      showToast('Enter a whole number greater than 0', true);
      return;
    }
    updateState({ conversionRate: rate });
    showToast('New conversion rate applied');
  };

  const applyBalanceCorrection = () => {
    const amount = parseInt(balanceInput, 10);
    if (!balanceInput || isNaN(amount) || amount < 0 || String(amount) !== balanceInput) {
      showToast('Enter a whole number', true);
      return;
    }
    updateState({ moneyBalance: amount });
    setBalanceInput('');
    showToast('Data corrected');
  };

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
            onClick={() => onNavigate('main')}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="px-6 pb-8 flex flex-col gap-6 flex-1">
          <div className="text-2xl font-bold text-amber-950">Settings</div>
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold text-amber-950">Conversion rate</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-amber-900/80">1 exercise =</span>
              <input
                type="number"
                min="1"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                className="bg-gradient-to-br from-amber-200 to-amber-300 shadow-xl px-4 py-2 border-2 border-amber-400/50 text-lg font-semibold text-amber-950 w-20 text-center outline-none"
              />
              <span className="text-amber-900/80">money</span>
            </div>
            <div className="text-sm text-amber-900/70 leading-relaxed">
              We don't know your local currency, so set your own rate based on your local beer prices and how lazy you feel
            </div>
            <button
              onClick={applyRate}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Apply new rate
            </button>
          </div>
          <div className="h-px bg-amber-400/50"></div>
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold text-amber-950">Money balance correction</div>
            <div className="text-amber-900/80">
              Current balance: <span className="font-bold text-amber-950">{state.moneyBalance}</span>
            </div>
            <div className="text-sm text-amber-900/70 leading-relaxed">
              If your balance is incorrect, type in the correct balance:
            </div>
            <input
              type="number"
              min="0"
              value={balanceInput}
              onChange={(e) => setBalanceInput(e.target.value)}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-2xl font-semibold text-amber-900 shadow-lg text-center outline-none placeholder:text-amber-900/60"
              placeholder="0"
            />
            <button
              onClick={applyBalanceCorrection}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Apply new balance
            </button>
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
