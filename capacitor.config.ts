import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mastermindqureshi.enterprise',
  appName: 'Master Mind Qureshi Enterprise',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
