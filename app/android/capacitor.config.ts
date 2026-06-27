import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.beerbank.app',
  appName: 'BeerBank',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFC927',
      showSpinner: false,
    },
  },
};

export default config;