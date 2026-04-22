import { Settings, User, Beer, ArrowLeft, CircleQuestionMark  } from 'lucide-react';
import { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage.jsx';
import { Checkbox } from '@/components/ui/checkbox';
import { Analytics } from "@vercel/analytics/next"
import { I18nProvider } from "./components/I18nProvider";
import { useTranslation } from 'react-i18next';


type Screen = 'main' | 'settings' | 'profile' | 'spend';
type SpendEvent = { date: string; amount: number };
type InstallState = 'waiting' | 'ready' | 'accepted' | 'dismissed' | 'ios' | 'standalone' | 'unsupported';

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
  const { t, i18n } = useTranslation('app');
  const randomAddMessage = () => t(`messages.add_${Math.floor(Math.random() * 3) + 1}`);
  const randomSpendMessage = () => t(`messages.spend_${Math.floor(Math.random() * 3) + 1}`);
  const [installState, setInstallState] = useState<InstallState>(() => {
    if (typeof window === 'undefined') return 'waiting';
    if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
    const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    if (isIos) return 'ios';
    return 'waiting';
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

// Skip welcome screen
//  const [hasWelcomed, setHasWelcomed] = useState(
//    () => typeof window !== 'undefined' && localStorage.getItem('beerbank_welcomed') === 'true'
//  );
  const [hasWelcomed, setHasWelcomed] = useState(true)
// *End skip welcome screen

  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [beerCredit, setBeerCredit] = useState<number>(() => getNumberFromStorage('beerCredit', 0));
  const [totalExercises, setTotalExercises] = useState<number>(() => getNumberFromStorage('totalExercises', 0));
  const [currentInput, setCurrentInput] = useState<number>(() => getNumberFromStorage('currentInput', 0));
  const [appliedConversionRate, setAppliedConversionRate] = useState<number>(() => {
  const raw = window.localStorage.getItem('appliedConversionRate');
  const parsed = Number(raw);
  return isNaN(parsed) ? 1 : parsed;
        });
  const [beerPriceInput, setBeerPriceInput] = useState<string>(() => getStringFromStorage('beerPriceInput', '1'));
  const [exForBeerInput, setExForBeerInput] = useState<string>(() => getStringFromStorage('exForBeerInput', '1'));
  const [conversionInput, setConversionInput] = useState<string>(() => getStringFromStorage('conversionInput', String(getNumberFromStorage('appliedConversionRate', 1))));
  const [username] = useState<string>(() => getStringFromStorage('username', 'JohnDoe'));
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

  // PWA install prompt listener
  useEffect(() => {
    if (installState !== 'waiting') return;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallState('ready');
    };
    window.addEventListener('beforeinstallprompt', handler);
    // Fallback: if no prompt after 5s, show "open in Chrome" instructions
    const timeout = setTimeout(() => {
      setInstallState('unsupported');
    }, 5000);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timeout);
    };
  }, [installState]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('beerCredit', String(toInt(beerCredit)));
    window.localStorage.setItem('totalExercises', String(toInt(totalExercises)));
    window.localStorage.setItem('currentInput', String(toInt(currentInput)));
    window.localStorage.setItem('appliedConversionRate', String(appliedConversionRate));
    window.localStorage.setItem('conversionInput', conversionInput);
    window.localStorage.setItem('beerPriceInput', beerPriceInput);
    window.localStorage.setItem('exForBeerInput', exForBeerInput);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('recentAdds', JSON.stringify(recentAdds.map((v) => toInt(v)).slice(0, 5)));
    window.localStorage.setItem('recentSpends', JSON.stringify(recentSpends.map((item) => ({ date: item.date, amount: toInt(item.amount) })).slice(0, 5)));
    window.localStorage.setItem('spendAmount', spendAmount);
    window.localStorage.setItem('balanceCorrectionInput', balanceCorrectionInput);
    window.localStorage.setItem('currentScreen', currentScreen);
  }, [beerCredit, totalExercises, currentInput, appliedConversionRate, conversionInput, username, recentAdds, recentSpends, spendAmount, balanceCorrectionInput, currentScreen, beerPriceInput, exForBeerInput]);

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
      showToast(t('messages.msg_05'));
      return;
    }

    if (toAdd < 0 && Math.abs(toAdd) > totalExercises) {
      showToast(t('messages.msg_07'));
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
      showToast(t('messages.msg_04'));
      return;
    }

    if (parsed > beerCredit) {
      showToast(t('messages.msg_03'));
      return;
    }

    const newBalance = toInt(beerCredit - parsed);
    setBeerCredit(newBalance);

    const now = new Date().toISOString().split('T')[0];
    setRecentSpends((prev) => [{ date: now, amount: toInt(parsed) }, ...prev].slice(0, 5));
    setSpendAmount('');
    showToast(randomSpendMessage());
  };


const applyRate = () => {
  const price = Number(beerPriceInput);
  const exCount = Number(exForBeerInput);

  if (beerPriceInput.trim() === '' || !isNaturalNumber(price) ||
      exForBeerInput.trim() === '' || !isNaturalNumber(exCount)) {
    showToast(t('messages.msg_04'));
    return;
  }

  const conversionRate = Math.max(0.01, Math.round((price / exCount) * 100) / 100);
  setAppliedConversionRate(conversionRate);
  setBeerPriceInput(String(price));
  setExForBeerInput(String(exCount));
  showToast(t('messages.msg_02'));
  };


  const applyCorrection = () => {
    const parsed = Number(balanceCorrectionInput);
    if (balanceCorrectionInput.trim() === '' || !isWholeNumber(parsed)) {
      showToast(t('messages.msg_04'));
      return;
    }
    setBeerCredit(toInt(parsed));
    setBalanceCorrectionInput('');
    showToast(t('messages.msg_01'));
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setInstallState(outcome === 'accepted' ? 'accepted' : 'dismissed');
  };

  // Show install screen if not running as installed PWA
    if (!import.meta.env.DEV && installState !== 'standalone') {
    return <InstallScreen installState={installState} onInstall={handleInstall} />;
  }

if (!hasWelcomed) {
    return <WelcomePage onContinue={() => setHasWelcomed(true)} />;
  }

  return (
    <I18nProvider>
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
            appliedConversionRate={appliedConversionRate}
            setConversionInput={setConversionInput}
            beerPriceInput={beerPriceInput}          
            setBeerPriceInput={setBeerPriceInput}    
            exForBeerInput={exForBeerInput}          
            setExForBeerInput={setExForBeerInput}     
            balanceCorrectionInput={balanceCorrectionInput}
            setBalanceCorrectionInput={setBalanceCorrectionInput}
            currentCredit={beerCredit}
            onBack={() => setCurrentScreen('main')}
            applyRate={applyRate}
            applyCorrection={applyCorrection}
            i18n={i18n}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen onBack={() => setCurrentScreen('main')} />
        )}

        {currentScreen === 'help' && (
          <HelpScreen onBack={() => setCurrentScreen('main')} />
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
    </I18nProvider>
  );
}

function InstallScreen({ installState, onInstall }: {
  installState: InstallState;
  onInstall: () => void;
}) {
  const { t } = useTranslation('app');
  const [consentChecked, setConsentChecked] = useState(false);
  return (
    <div className="relative h-screen w-full max-w-[412px] mx-auto overflow-hidden bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 flex flex-col items-center justify-center px-8 text-center">
      {/* Background bubbles */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <div className="absolute top-24 left-8 w-20 h-20 rounded-full bg-white/25 blur-lg"></div>
      <div className="absolute top-48 right-10 w-32 h-32 rounded-full bg-white/25 blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-white/25 blur-lg"></div>
      <div className="absolute bottom-20 right-8 w-20 h-20 rounded-full bg-white/25 blur-lg"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <img src="/BeerBank_icon.png" alt="BeerBank" className="w-24 h-24 rounded-2xl shadow-lg mb-6" />

        {installState === 'waiting' && (
          <p className="text-amber-900/70 animate-pulse">{t('install.preparing')}</p>
        )}

        {/* Download Consent checkbox */}
        {installState === 'ready' && (
          <div className="bg-amber-800/20 rounded-xl p-4 mb-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked === true)}
                className="mt-0.5 border-amber-800/50 data-[state=checked]:bg-amber-800 data-[state=checked]:text-amber-100"
              />
              <span className="text-sm leading-relaxed text-amber-900">
                {t('install.consent')}
              </span>
            </label>
          </div>
        )}

        {installState === 'ready' && (
          <button
            onClick={onInstall}
            disabled={!consentChecked}
            className="w-full bg-amber-800 text-amber-100 text-xl font-semibold py-4 rounded-xl shadow-lg active:scale-95 transition-all hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {t('install.download_button')}
          </button>
        )}

        {installState === 'accepted' && (
          <div className="bg-white/20 rounded-xl p-5">
            <p className="text-amber-950 font-semibold text-lg mb-2">{t('install.accepted_title')}</p>
            <p className="text-amber-900/80">{t('install.accepted_body')}</p>
          </div>
        )}

        {installState === 'dismissed' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-amber-900/80">{t('install.dismissed')}</p>
            <button
              onClick={onInstall}
              className="w-full bg-amber-800 text-amber-100 text-lg font-semibold py-4 rounded-xl shadow-lg active:scale-95 transition-all hover:bg-amber-700"
            >
              {t('install.download_button')}
            </button>
          </div>
        )}

        {installState === 'ios' && (
          <div className="bg-white/20 rounded-xl p-5 text-left w-full">
            <p className="font-semibold text-amber-950 mb-3">{t('install.ios_title')}</p>
            <p className="text-amber-900/90" dangerouslySetInnerHTML={{ __html: t('install.ios_step1') }} />
            <p className="text-amber-900/90 mt-2" dangerouslySetInnerHTML={{ __html: t('install.ios_step2') }} />
          </div>
        )}

        {installState === 'unsupported' && (
          <div className="bg-white/20 rounded-xl p-5 text-left w-full">
            <p className="font-semibold text-amber-950 mb-3">{t('install.unsupported_title')}</p>
            <p className="text-amber-900/90" dangerouslySetInnerHTML={{ __html: t('install.unsupported_body') }} />
            <p className="text-amber-900/90" dangerouslySetInnerHTML={{ __html: t('install.unsupported_hint') }} />
          </div>
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
  const { t } = useTranslation('app');
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-5 pt-5 pb-4">
        <button onClick={() => onNavigate('help')} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.help')}>
          <CircleQuestionMark className="w-6 h-6 text-amber-900" />
        </button>
        <button onClick={() => onNavigate('settings')} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.settings')}>
          <Settings className="w-6 h-6 text-amber-900" />
        </button>
      </header>

{/* Beer credit */}

      <section className="px-6 mt-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-amber-900/30" />
           <h2 className="text-amber-900/80 text-center">{t('main.beer_credit')}</h2>
          <div className="flex-1 h-px bg-amber-900/30" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-8xl text-center font-bold text-amber-950 tracking-tight pb-2">{beerCredit}</p>
          </div>
          <button onClick={() => onNavigate('spend')} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-5 py-4 hover:bg-white transition-all active:scale-95 min-w-[110px]" aria-label={t('aria.spend')}>
            <Beer className="w-9 h-9 text-amber-600 mx-auto mt-1" />
            <span className="block text-lg font-medium text-amber-900">{t('main.beer_time_button')}</span>
          </button>
        </div>
      </section>


{/* Total exercises */}

      <section className="px-6 mt-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-amber-900/30" />
           <h2 className="text-amber-900/80 text-base text-center">{t('main.total_exercises')}</h2>
          <div className="flex-1 h-px bg-amber-900/30" />
        </div>
        <div className="flex-1">
          <p className="text-6xl text-center font-bold text-amber-950 tracking-tight pb-2">{totalExercises}</p>
        </div>
      </section>

{/* Add session */}

      <section className="px-6 mt-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-amber-900/30" />
          <h2 className="text-amber-900/80 text-base text-center">{t('main.add_session')}</h2>
          <div className="flex-1 h-px bg-amber-900/30" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-6xl font-bold text-amber-950 tracking-tight text-center">{currentInput}</p>
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
            <button onClick={handleAdd} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95">{t('main.add_button')}</button>
          </div>
        </div>
        {recentAdds.length > 0 ? (
          <div className="mt-2 px-2 text-base text-amber-900/60 font-medium">{t('main.last_added')} {recentAdds.slice().reverse().map(formatSigned).join(', ')}</div>
        ) : null}
      </section>
    </div>
  );
}

// Settings screen

function SettingsScreen({
  conversionInput,
  setConversionInput,
  appliedConversionRate,
  beerPriceInput,  
  setBeerPriceInput, 
  exForBeerInput,   
  setExForBeerInput,    
  balanceCorrectionInput,
  setBalanceCorrectionInput,
  currentCredit,
  onBack,
  applyRate,
  applyCorrection,
  i18n,
}: {
  appliedConversionRate: number; 
  conversionInput: string;
  setConversionInput: (value: string) => void;
  beerPriceInput: string;                        
  setBeerPriceInput: (value: string) => void;   
  exForBeerInput: string;                        
  setExForBeerInput: (value: string) => void;    
  balanceCorrectionInput: string;
  setBalanceCorrectionInput: (value: string) => void;
  currentCredit: number;
  onBack: () => void;
  applyRate: () => void;
  applyCorrection: () => void;
  i18n: any;
}) {
  const { t } = useTranslation('app');
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.back')}>
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-3xl text-amber-900 mb-6">{t('settings.title')}</h1>

{/* Set conversion rate */}

        <section className="mb-8">
          <h2 className="text-lg text-amber-900 mb-2">{t('settings.conversion_title')}</h2>
          <p className="text-sm text-amber-900/70 mb-1">{t('settings.conversion_final_rate_1')}<b>{appliedConversionRate}</b>{t('settings.conversion_final_rate_2')}</p>
          <p className="text-sm text-amber-900/70 mb-1">{t('settings.conversion_beer_price')}&ensp;
           <input
              type="text"
              inputMode="numeric"
              value={beerPriceInput}
              onChange={(e) => setBeerPriceInput(onlyDigits(e.target.value))}
              onFocus={() => beerPriceInput === '1' && setBeerPriceInput('')}
              placeholder="1"
              className="inline-block w-20 px-1 bg-amber-200/60 border border-amber-400/50 rounded text-amber-950 text-center"
            />
          </p>
          <p className="text-sm text-amber-900/70 mb-2">{t('settings.conversion_ex_for_beer')}&ensp;
            <input
              type="text"
              inputMode="numeric"
              value={exForBeerInput}
              onChange={(e) => setExForBeerInput(onlyDigits(e.target.value))}
              onFocus={() => exForBeerInput === '1' && setExForBeerInput('')}
              placeholder="1"
              className="inline-block w-20 px-1 bg-amber-200/60 border border-amber-400/50 rounded text-amber-950 text-center"
            />
          </p>
          <button onClick={applyRate} className="text-sm bg-white/80 backdrop-blur-sm rounded-lg px-6 py-2.5 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">{t('settings.apply_rate')}</button>
        </section>

{/* Set new beer credit */}

        <section className="mb-6">
          <h2 className="text-lg text-amber-900 mb-2">{t('settings.correction_title')}</h2>
          <p className="text-sm text-amber-900/80 mb-2">{t('settings.correction_current')} {currentCredit}. {t('settings.correction_current_2')}</p>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              inputMode="numeric"
              value={balanceCorrectionInput}
              onChange={(e) => setBalanceCorrectionInput(onlyDigits(e.target.value))}
              placeholder={t('settings.correction_placeholder')}
              className="w-auto px-2 py-1 bg-amber-200/60 border border-amber-400/50 rounded text-amber-900 text-center text-sm"
            />
          </div>
          <button onClick={applyCorrection} className="text-sm bg-white/80 backdrop-blur-sm rounded-lg px-6 py-2.5 font-semibold text-amber-900 shadow-md hover:bg-white transition-all active:scale-95">{t('settings.apply_correction')}</button>
        </section>

{/* Set language */}

        <section className="mb-8">
          <h2 className="text-lg text-amber-900 mb-2">{t('settings.language_title')}</h2>         
          <div className="relative inline-block">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm rounded-lg px-6 py-2.5 pr-10 font-semibold text-amber-900 text-sm shadow-md hover:bg-white transition-all cursor-pointer outline-none"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-900">▾</span>
          </div>
        </section>
      </div>
    </div>
  );
}

{/* Profile screen */}

function ProfileScreen({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation('app');
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.back')}>
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-amber-950 text-3xl mb-3">{t('profile.title')}</h1>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm mt-8">
            <p className="text-left text-base text-amber-950/90 leading-relaxed">
              {t('profile.placeholder')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


{/* Help screen */}

function HelpScreen({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation('app');
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.back')}>
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>
      <div className="px-6">
        <h1 className="text-amber-900 text-xl mb-3">{t('help.title')}</h1>
        <p className="text-left text-base text-amber-900/90 leading-relaxed">
          {t('help.intro')}
        </p>
        <h2 className="text-amber-900 text-lg mt-3">{t('help.h_1')}</h2>
        <p className="text-left text-base text-amber-900/90 leading-relaxed">
          {t('help.text_1')}
        </p>
        <h2 className="text-amber-900 text-lg mt-3">{t('help.h_2')}</h2>
        <p className="text-left text-base text-amber-900/90 leading-relaxed">
          {t('help.text_2')}
        </p>
        <h2 className="text-amber-900 text-lg mt-3">{t('help.h_3')}</h2>
        <p className="text-left text-base text-amber-900/90 leading-relaxed">
          {t('help.text_3')}
        </p>
        <h2 className="text-amber-900 text-lg mt-3">{t('help.h_4')}</h2>
        <p className="text-left text-base text-amber-900/90 leading-relaxed">
          {t('help.text_4')}
        </p>
        <h2 className="mb-4 text-center text-balance text-amber-900 text-lg mt-3">{t('help.final')}</h2>
      </div> 
    </div>
  );
}


{/* Spend screen */}

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
  const { t } = useTranslation('app');
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <header className="flex items-center px-5 pt-5 pb-4">
        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-95" aria-label={t('aria.back')}>
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
      </header>


      <div className="px-6">
        
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">{t('spend.title')}</h1>
        <section className="mb-12">

    {/* Spend screen Balance */}          
 
          <div className="flex items-center gap-3 mb-1">
            <div className="flex-1 h-px bg-amber-900/30" />
            <h2 className="text-amber-900/80 text-center">{t('spend.your_credit')}</h2>
            <div className="flex-1 h-px bg-amber-900/30" />
          </div>
          <p className="text-6xl font-bold text-center text-amber-950 tracking-tight">{beerCredit}</p>
        </section>
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-0">
            <div className="flex-1 h-px bg-amber-900/30" />
            <h2 className="text-amber-900/80 text-center">{t('spend.how_much')}</h2>
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
          <button onClick={handleSpend} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-95">{t('spend.confirm_button')}</button>
        </section>
        {recentSpends.length > 0 ? (
          <section>
            <h2 className="text-base text-amber-900/80 mb-3">{t('spend.recently_spent')}</h2>
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
