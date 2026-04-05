import { Settings, User, Beer, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage.jsx';

type Screen = 'main' | 'settings' | 'profile' | 'spend';
type SpendEvent = { date: string; amount: number };

const MESSAGES = {
  ADD_1: 'Excellent!',
  ADD_2: 'Well done!',
  ADD_3: 'Not bad!',
  MSG_01: 'Data corrected',
  MSG_02: 'New conversion rate applied',
  MSG_03: 'Not enough money :(',
  MSG_04: 'Enter a whole number greater than 0',
  MSG_05: 'Enter a whole number',
  MSG_07: 'You cannot take away more than you have. If you\'re not a tax official, of course.',
};

const randomAddMessage = () => {
  const options = [MESSAGES.ADD_1, MESSAGES.ADD_2, MESSAGES.ADD_3];
  return options[Math.floor(Math.random() * options.length)];
};

const isNaturalNumber = (value: number) => Number.isInteger(value) && value > 0;
const isWholeNumber = (value: number) => Number.isInteger(value) && value >= 0;
const formatSigned = (value: number) => (value >= 0 ? `+${value}` : `${value}`);
const toInt = (value: number) => Math.round(value);
const onlyDigits = (value: string) => value.replace(/[^0-9]/g, '');

const getNumberFromStorage = (key: string, fallback: number) => {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return fallback;
  return toInt(parsed);
};

const getStringFromStorage = (key: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  return raw ?? fallback;
};

export default function App() {
  const [hasWelcomed, setHasWelcomed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('beerbank_welcomed') === 'true'
  );
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [beerCredit, setBeerCredit] = useState<number>(() => getNumberFromStorage('beerCredit', 5));
  const [totalExercises, setTotalExercises] = useState<number>(() => getNumberFromStorage('totalExercises', 5));
  const [currentInput, setCurrentInput] = useState<number>(() => getNumberFromStorage('currentInput', 0));
  const [appliedConversionRate, setAppliedConversionRate] = useState<number>(() => getNumberFromStorage('appliedConversionRate', 1));
  const [conversionInput, setConversionInput] = useState<string>(() => getStringFromStorage('conversionInput', String(getNumberFromStorage('appliedConversionRate', 1))));
  const [username, setUsername] = useState<string>(() => getStringFromStorage('username', 'JohnDoe'));
  const [recentAdds, setRecentAdds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem('recentAdds') || 'null');
      if (Array.isArray(parsed)) return parsed.map((item: any) => toInt(Number(item))).slice(0, 5);
    } catch {
      // ignore
    }
    return [];
  });
  const [recentSpends, setRecentSpends] = useState<SpendEvent[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem('recentSpends') || 'null');
      if (Array.isArray(parsed)) {
        return parsed
          .map((item: any) => ({ date: String(item.date), amount: toInt(Number(item.amount)) }))
          .slice(0, 5);
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [spendAmount, setSpendAmount] = useState<string>(() => getStringFromStorage('spendAmount', ''));
  const [balanceCorrectionInput, setBalanceCorrectionInput] = useState<string>(() => getStringFromStorage('balanceCorrectionInput', ''));

  const [toast, setToast] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('beerCredit', String(toInt(beerCredit)));
    window.localStorage.setItem('totalExercises', String(toInt(totalExercises)));
    window.localStorage.setItem('currentInput', String(toInt(currentInput)));
    window.localStorage.setItem('appliedConversionRate', String(toInt(appliedConversionRate)));
    window.localStorage.setItem('conversionInput', conversionInput);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('recentAdds', JSON.stringify(recentAdds.map((v) => toInt(v)).slice(0, 5)));
    window.localStorage.setItem('recentSpends', JSON.stringify(recentSpends.map((item) => ({ date: item.date, amount: toInt(item.amount) })).slice(0, 5)));
    window.localStorage.setItem('spendAmount', spendAmount);
    window.localStorage.setItem('balanceCorrectionInput', balanceCorrectionInput);
    window.localStorage.setItem('currentScreen', currentScreen);
  }, [beerCredit, totalExercises, currentInput, appliedConversionRate, conversionInput, username, recentAdds, recentSpends, spendAmount, balanceCorrectionInput, currentScreen]);

  useEffect(() => {
    const storedScreen = getStringFromStorage('currentScreen', 'main') as Screen;
    if (storedScreen === 'main' || storedScreen === 'settings' || storedScreen === 'profile' || storedScreen === 'spend') {
      setCurrentScreen(storedScreen);
    }
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const adjustInput = (amount: number) => {
    setCurrentInput((prev) => toInt(prev + amount));
  };

  const handleAdd = () => {
    const toAdd = toInt(currentInput);
    if (toAdd === 0) {
      showToast(MESSAGES.MSG_05);
      return;
    }

    if (toAdd < 0 && Math.abs(toAdd) > totalExercises) {
      showToast(MESSAGES.MSG_07);
      return;
    }

    const newTotal = totalExercises + toAdd;
    const newBalance = beerCredit + toAdd * appliedConversionRate;

    setTotalExercises(toInt(newTotal < 0 ? 0 : newTotal));
    setBeerCredit(toInt(newBalance));
    setRecentAdds((prev) => [toAdd, ...prev].slice(0, 5));
    setCurrentInput(0);

    if (toAdd > 0) {
      showToast(randomAddMessage());
    }
  };

  const handleSpend = () => {
    const parsed = Number(spendAmount);
    if (!isNaturalNumber(parsed)) {
      showToast(MESSAGES.MSG_04);
      return;
    }

    if (parsed > beerCredit) {
      showToast(MESSAGES.MSG_03);
      return;
    }

    const newBalance = toInt(beerCredit - parsed);
    setBeerCredit(newBalance);

    const now = new Date().toISOString().split('T')[0];
    setRecentSpends((prev) => [{ date: now, amount: toInt(parsed) }, ...prev].slice(0, 5));
    setSpendAmount('');
    showToast(MESSAGES.ADD_2);
  };

  const applyRate = () => {
    const parsed = Number(conversionInput);
    if (conversionInput.trim() === '' || !isNaturalNumber(parsed)) {
      showToast(MESSAGES.MSG_04);
      return;
    }
    setAppliedConversionRate(toInt(parsed));
    setConversionInput(String(toInt(parsed)));
    showToast(MESSAGES.MSG_02);
  };

  const applyCorrection = () => {
    const parsed = Number(balanceCorrectionInput);
    if (balanceCorrectionInput.trim() === '' || !isWholeNumber(parsed)) {
      showToast(MESSAGES.MSG_04);
      return;
    }
    setBeerCredit(toInt(parsed));
    setBalanceCorrectionInput('');
    showToast(MESSAGES.MSG_01);
  };


  if (!hasWelcomed) {
    return <WelcomePage onContinue={() => setHasWelcomed(true)} />;
  }

  return (
    <div className="relative h-screen w-full max-w-[412px] mx-auto overflow-hidden bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <div className="absolute top-24 left-8 w-20 h-20 rounded-full bg-white/25 blur-lg"></div>
      <div className="absolute top-16 left-28 w-12 h-12 rounded-full bg-white/20 blur-md"></div>
      <div className="absolute top-48 right-10 w-32 h-32 rounded-full bg-white/25 blur-xl"></div>
      <div className="absolute top-80 left-12 w-16 h-16 rounded-full bg-white/20 blur-lg"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/25 blur-lg"></div>
      <div className="absolute bottom-56 right-16 w-14 h-14 rounded-full bg-white/20 blur-md"></div>
      <div className="absolute bottom-72 left-32 w-18 h-18 rounded-full bg-white/20 blur-lg"></div>
      <div className="absolute bottom-20 right-8 w-20 h-20 rounded-full bg-white/25 blur-lg"></div>
      <div className="absolute top-64 right-24 w-8 h-8 rounded-full bg-white/15 blur-sm"></div>
      <div className="absolute top-96 left-16 w-10 h-10 rounded-full bg-white/15 blur-sm"></div>
      <div className="absolute bottom-64 right-32 w-6 h-6 rounded-full bg-white/15 blur-sm"></div>

      <div className={`fixed left-1/2 top-6 transform -translate-x-1/2 rounded-full bg-amber-950/90 px-6 py-2 text-sm font-semibold text-amber-100 transition-all ${toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
        {toast}
      </div>

      <div className="relative z-10 h-full">
        {currentScreen === 'main' && (
          <MainScreen
            beerCredit={beerCredit}
            totalExercises={totalExercises}
            currentInput={currentInput}
            recentAdds={recentAdds}
            adjustInput={adjustInput}
            handleAdd={handleAdd}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            conversionInput={conversionInput}
            setConversionInput={setConversionInput}
            balanceCorrectionInput={balanceCorrectionInput}
            setBalanceCorrectionInput={setBalanceCorrectionInput}
            currentCredit={beerCredit}
            onBack={() => setCurrentScreen('main')}
            applyRate={applyRate}
            applyCorrection={applyCorrection}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen onBack={() => setCurrentScreen('main')} />
        )}

        {currentScreen === 'spend' && (
          <SpendScreen
            beerCredit={beerCredit}
            spendAmount={spendAmount}
            setSpendAmount={setSpendAmount}
            recentSpends={recentSpends}
            onBack={() => setCurrentScreen('main')}
            handleSpend={handleSpend}
          />
        )}
      </div>
    </div>
  );
}

function MainScreen({
  beerCredit,
  totalExercises,
  currentInput,
  recentAdds,
  adjustInput,
  handleAdd,
  onNavigate,
}: {
  beerCredit: number;
  totalExercises: number;
  currentInput: number;
  recentAdds: number[];
  adjustInput: (amount: number) => void;
  handleAdd: () => void;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-5 pt-5 pb-4">
        <button onClick={() => onNavigate('profile')} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label="Profile">
          <User className="w-6 h-6 text-amber-900" />
        </button>
        <button onClick={() => onNavigate('settings')} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label="Settings">
          <Settings className="w-6 h-6 text-amber-900" />
        </button>
      </header>

      <section className="px-6 mt-2">
        <h1 className="text-amber-900/80">Your beer credit</h1>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-8xl font-bold text-amber-950 tracking-tight">{beerCredit}</p>
          </div>
          <button onClick={() => onNavigate('spend')} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-5 py-5 hover:bg-white transition-all active:scale-95 min-w-[110px]" aria-label="Spend">
            <Beer className="w-9 h-9 text-amber-600 mx-auto" />
            <span className="block text-lg font-medium text-amber-900">Beer time!</span>
          </button>
        </div>
      </section>

      <section className="px-6 mt-8">
        <h2 className="text-amber-900/80 mb-2">Total exercises</h2>
        <p className="text-6xl font-bold text-amber-950 tracking-tight">{totalExercises}</p>
      </section>

      <section className="px-6 mt-10 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-amber-900/30" />
          <h2 className="text-amber-900/80 text-center">Add new session</h2>
          <div className="flex-1 h-px bg-amber-900/30" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-8xl font-bold text-amber-950 tracking-tight text-center">{currentInput}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ label: '+1', value: 1 }, { label: '+5', value: 5 }, { label: '+10', value: 10 }].map((btn) => (
                <button key={btn.label} onClick={() => adjustInput(btn.value)} className="text-lg bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">{btn.label}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ label: '-1', value: -1 }, { label: '-5', value: -5 }, { label: '-10', value: -10 }].map((btn) => (
                <button key={btn.label} onClick={() => adjustInput(btn.value)} className="text-lg bg-white/80 backdrop-blur-sm rounded-lg py-3 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">{btn.label}</button>
              ))}
            </div>
            <button onClick={handleAdd} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95">Add</button>
          </div>
        </div>
        {recentAdds.length > 0 ? (
          <div className="mt-2 px-2 text-base text-amber-900/60 font-medium">Last added: {recentAdds.slice().reverse().map(formatSigned).join(', ')}</div>
        ) : null}
      </section>
    </div>
  );
}

function SettingsScreen({
  conversionInput,
  setConversionInput,
  balanceCorrectionInput,
  setBalanceCorrectionInput,
  currentCredit,
  onBack,
  applyRate,
  applyCorrection,
}: {
  conversionInput: string;
  setConversionInput: (value: string) => void;
  balanceCorrectionInput: string;
  setBalanceCorrectionInput: (value: string) => void;
  currentCredit: number;
  onBack: () => void;
  applyRate: () => void;
  applyCorrection: () => void;
}) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label="Back">
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-3xl font-bold text-amber-950 mb-6">Settings</h1>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-amber-950 mb-2">Conversion rate</h2>
          <p className="text-base text-amber-900/70 mb-4">We don't know your local currency, so set your own rate based on your local beer prices and how lazy you feel</p>
          <p className="text-base text-amber-900/80 mb-3">1 exercise = <input
            type="text"
            inputMode="numeric"
            value={conversionInput}
            onChange={(e) => setConversionInput(onlyDigits(e.target.value))}
            onFocus={() => conversionInput === '0' && setConversionInput('')}
            placeholder="1"
            className="inline-block w-20 px-2 py-1 bg-amber-200/60 border border-amber-400/50 rounded text-amber-950 text-center"
          /> money</p>
          <button onClick={applyRate} className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-2.5 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">Apply new rate</button>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold text-amber-950 mb-2">Beer credit correction</h2>
          <p className="text-base text-amber-900/80 mb-2">Current beer credit: {currentCredit}. To amend it,</p>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              inputMode="numeric"
              value={balanceCorrectionInput}
              onChange={(e) => setBalanceCorrectionInput(onlyDigits(e.target.value))}
              placeholder="type in the new balance"
              className="flex-1 px-2 py-1 bg-amber-200/60 border border-amber-400/50 rounded text-amber-950 text-center text-base"
            />
          </div>
          <button onClick={applyCorrection} className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-2.5 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">Apply new credit</button>
        </section>
      </div>
    </div>
  );
}

function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label="Back">
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-amber-950 mb-8">Profile</h1>
        <div className="flex flex-col items-center">
          <img
            src="/BeerBank_icon.png"
            alt=""
            className="w-28 h-28 rounded-2xl shadow-lg object-contain bg-white/30"
          />
          <div className="w-full max-w-sm mt-8">
            <p className="text-left text-base text-amber-950/90 leading-relaxed">
              [Здесь будет текст 1]
            </p>
            <p className="text-left text-base text-amber-950/90 leading-relaxed mt-4">
              [Здесь будет текст 2]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpendScreen({
  beerCredit,
  spendAmount,
  setSpendAmount,
  recentSpends,
  onBack,
  handleSpend,
}: {
  beerCredit: number;
  spendAmount: string;
  setSpendAmount: (value: string) => void;
  recentSpends: SpendEvent[];
  onBack: () => void;
  handleSpend: () => void;
}) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label="Back">
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">It's beer time!</h1>
        <section className="mb-12">
          <h2 className="text-xl text-amber-900/80 mb-1">Your credit</h2>
          <p className="text-6xl font-bold text-amber-950 tracking-tight">{beerCredit}</p>
        </section>
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-px bg-amber-900/30" />
            <h2 className="text-amber-900/80 text-center">How much will you spend?</h2>
            <div className="flex-1 h-px bg-amber-900/30" />
          </div>
          <div className="mb-4">
            <input 
              type="text" 
              inputMode="numeric"
              value={spendAmount} 
              onChange={(e) => setSpendAmount(onlyDigits(e.target.value))} 
              onFocus={(e) => {
                e.currentTarget.select();
                setSpendAmount('');
              }}
              placeholder="?" 
              className="w-full text-8xl font-bold text-amber-950 tracking-tight text-center bg-transparent border-none outline-none" 
            />
          </div>
          <button onClick={handleSpend} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95">Let's do it!</button>
        </section>
        {recentSpends.length > 0 ? (
          <section>
            <h2 className="text-base text-amber-900/80 mb-3">You've recently spent:</h2>
            <div className="space-y-2">
              {recentSpends.slice().reverse().map((spend, idx) => (
                <div key={idx} className="flex justify-between text-sm text-amber-900/70">
                  <span>{spend.date}</span>
                  <span>{spend.amount}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
