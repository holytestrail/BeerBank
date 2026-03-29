type ProfileScreenProps = {
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
  showToast: (message: string, isError?: boolean) => void;
};

export default function ProfileScreen({ onNavigate, state, showToast }: ProfileScreenProps) {
  const doLogout = () => {
    if (window.confirm('Log out?')) {
      showToast('Logged out');
    }
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
            onClick={() => onNavigate('main')}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Back"
          >
            ←
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </header>

        <div className="px-6 pb-8 flex flex-col gap-5 flex-1 items-center">
          <div className="text-2xl font-bold text-amber-950 self-start">Profile</div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 shadow-xl border-2 border-amber-400/50 flex items-center justify-center text-4xl mt-4">
            👤
          </div>
          <div className="bg-gradient-to-br from-amber-200 to-amber-300 shadow-xl px-8 py-6 border-2 border-amber-400/50 text-lg font-semibold text-amber-950 text-center w-full">
            {state.username}
          </div>
          <button
            onClick={doLogout}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            Log out
          </button>
          <button
            onClick={() => onNavigate('main')}
            className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 text-lg font-medium text-amber-900 shadow-md hover:bg-white transition-all active:scale-95 mt-auto"
          >
            Back to main
          </button>
        </div>
      </div>
    </div>
  );
}
