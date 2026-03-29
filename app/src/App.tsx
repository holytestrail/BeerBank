import { useMemo, useState } from 'react';
import MainScreen from './screens/MainScreen';
import SpendScreen from './screens/SpendScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import Toast from './components/Toast';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'spend' | 'settings' | 'profile'>('main');
  const [state, setState] = useState({
    moneyBalance: 0,
    exTotal: 0,
    conversionRate: 1,
    exInput: 0,
    sessions: [] as { amount: number; ts: number }[],
    spendEvents: [] as { amount: number; ts: number }[],
    isFirstLogin: true,
    username: 'John'
  });
  const [toast, setToast] = useState({ message: '', visible: false, isError: false });

  const showToast = (message: string, isError = false) => {
    setToast({ message, visible: true, isError });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const screenComponent = useMemo(() => {
    switch (currentScreen) {
      case 'spend':
        return (
          <SpendScreen
            onNavigate={setCurrentScreen}
            state={state}
            updateState={updateState}
            showToast={showToast}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            onNavigate={setCurrentScreen}
            state={state}
            updateState={updateState}
            showToast={showToast}
          />
        );
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} state={state} showToast={showToast} />;
      case 'main':
      default:
        return (
          <MainScreen
            onNavigate={setCurrentScreen}
            state={state}
            updateState={updateState}
            showToast={showToast}
          />
        );
    }
  }, [currentScreen, state]);

  return (
    <div>
      {screenComponent}
      <Toast message={toast.message} visible={toast.visible} isError={toast.isError} onClose={hideToast} />
    </div>
  );
}

export default App;

